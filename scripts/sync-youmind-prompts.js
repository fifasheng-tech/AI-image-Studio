#!/usr/bin/env node
/**
 * Sync all GPT Image 2 prompts from youmind.com
 * - Fetches sitemap to get all prompt URLs
 * - Scrapes each page for prompt data (title, prompt, image, categories)
 * - Merges with existing presets, deduplicating by upstreamId
 * - Outputs to data/prompt-presets.json
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'prompt-presets.json');
const CONCURRENCY = 5;
const DELAY_MS = 1000; // 1s between batches to be polite

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const doFetch = (u, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Too many redirects'));
      https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ImageStudio/1.0)' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          const next = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, u).toString();
          return doFetch(next, redirects + 1);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${u}`));
        }
        res.setEncoding('utf8');
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(body));
      }).on('error', reject);
    };
    doFetch(url);
  });
}

async function getSitemapUrls() {
  const urls = [];
  for (let i = 0; i < 3; i++) {
    try {
      const xml = await fetchText(`https://youmind.com/sitemaps/prompts/sitemap/${i}.xml`);
      const matches = xml.matchAll(/https:\/\/youmind\.com\/zh-CN\/prompts\/[^"<]+/g);
      for (const m of matches) {
        const url = m[0];
        if (!urls.includes(url)) urls.push(url);
      }
    } catch (e) {
      console.error(`Sitemap ${i} failed:`, e.message);
    }
  }
  return urls;
}

function extractPromptFromHTML(html, url) {
  // Extract ID from URL: /zh-CN/prompts/slug-12345 → 12345
  const idMatch = url.match(/-(\d+)$/);
  const upstreamId = idMatch ? idMatch[1] : null;

  // Extract title from og:title or h1
  const ogTitle = html.match(/og:title"\s+content="([^"]+?)(?:\s*-\s*GPT Image|$)/)?.[1];
  const h1 = html.match(/<h1[^>]*>([^<]+)<\/h1>/)?.[1];
  const title = ogTitle || h1 || 'Untitled';

  // Extract image from og:image
  const ogImage = html.match(/og:image"\s+content="([^"]+)"/)?.[1] || '';

  // Extract description from og:description
  const ogDesc = html.match(/og:description"\s+content="([^"]+)"/)?.[1] || '';

  // Extract prompt text - it's in a specific div with the prompt content
  // Look for the prompt in the RSC data or in the prompt box
  let prompt = '';

  // Method 1: Look for prompt in the monospace prompt box (bg-[#FFF2A8])
  const promptBoxMatch = html.match(/bg-\[#FFF2A8\]\s+p-4[^>]*>([\s\S]*?)<\/div>/);
  if (promptBoxMatch) {
    // Clean up HTML tags
    prompt = promptBoxMatch[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Method 2: Extract from RSC payload
  if (!prompt || prompt.length < 20) {
    // The RSC payload contains the prompt as a JSON string
    const rscMatch = html.match(/"prompt":"((?:[^"\\]|\\.)*)"/);
    if (rscMatch) {
      prompt = rscMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
    }
  }

  // Method 3: Look for longer text blocks in the prompt section
  if (!prompt || prompt.length < 20) {
    // Find the section after "提示词" heading
    const sectionMatch = html.match(/提示词[\s\S]{0,500}<div[^>]*>([\s\S]*?)<\/div>/);
    if (sectionMatch) {
      const cleaned = sectionMatch[1].replace(/<[^>]+>/g, '').trim();
      if (cleaned.length > 20) prompt = cleaned;
    }
  }

  // Extract categories from the tags
  const categories = [];
  const catRegex = /categories=([^"]+)"[^>]*>([^<]+)</g;
  let catMatch;
  while ((catMatch = catRegex.exec(html))) {
    categories.push(catMatch[2].trim());
  }

  // Detect mode
  const mode = /上传|参考图|参考图像|提供的图像|原始|保留|修复|增强|精修|替换|编辑/i.test(prompt) ? 'edit' : 'generate';

  return {
    id: upstreamId ? `youmind-${upstreamId}` : null,
    upstreamId,
    title,
    mode,
    prompt,
    image: ogImage,
    description: ogDesc,
    source: url,
    categories,
    featured: false,
  };
}

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchText(url);
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 2000 * (i + 1)));
    }
  }
}

async function processBatch(urls, batchIndex) {
  const results = [];
  for (const url of urls) {
    try {
      const html = await fetchWithRetry(url);
      const data = extractPromptFromHTML(html, url);
      if (data.prompt && data.prompt.length > 10) {
        results.push(data);
      } else {
        console.warn(`  [${batchIndex}] Low prompt quality for ${url}, skipping`);
      }
    } catch (e) {
      console.error(`  [${batchIndex}] Failed ${url}: ${e.message}`);
    }
  }
  return results;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function groupByCategory(items) {
  const groups = new Map();
  for (const item of items) {
    const cats = item.categories.length > 0 ? item.categories : ['未分类'];
    for (const cat of cats) {
      if (!groups.has(cat)) groups.set(cat, []);
      const { categories, ...rest } = item;
      // Only add once per category group
      if (cats.indexOf(cat) === 0) {
        groups.get(cat).push(rest);
      }
    }
  }
  // If no categories found, put in default group
  if (groups.size === 0) {
    groups.set('未分类', items.map(({ categories, ...rest }) => rest));
  }
  return [...groups.entries()].map(([category, groupedItems]) => ({
    category,
    items: groupedItems,
  }));
}

async function main() {
  console.log('Fetching sitemap...');
  const urls = await getSitemapUrls();
  console.log(`Found ${urls.length} prompt URLs`);

  // Load existing presets to merge
  let existing = [];
  try {
    const raw = fs.readFileSync(OUTPUT_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    existing = Array.isArray(parsed) ? parsed : [];
  } catch {}

  // Get existing IDs to skip
  const existingIds = new Set();
  for (const group of existing) {
    for (const item of group.items || []) {
      if (item.upstreamId) existingIds.add(item.upstreamId);
    }
  }

  // Filter out already-synced URLs
  const newUrls = urls.filter(u => {
    const m = u.match(/-(\d+)$/);
    return m ? !existingIds.has(m[1]) : true;
  });

  console.log(`Already synced: ${existingIds.size}, new to fetch: ${newUrls.length}`);

  // Process in batches
  const allNew = [];
  for (let i = 0; i < newUrls.length; i += CONCURRENCY) {
    const batch = newUrls.slice(i, i + CONCURRENCY);
    const batchNum = Math.floor(i / CONCURRENCY) + 1;
    const totalBatches = Math.ceil(newUrls.length / CONCURRENCY);
    console.log(`Batch ${batchNum}/${totalBatches} (${batch.length} URLs)...`);
    const results = await processBatch(batch, batchNum);
    allNew.push(...results);
    if (i + CONCURRENCY < newUrls.length) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`Fetched ${allNew.length} new prompts`);

  // Merge with existing
  const merged = [...existing];
  for (const item of allNew) {
    // Find if category exists
    const cat = item.categories[0] || '未分类';
    let group = merged.find(g => g.category === cat);
    if (!group) {
      group = { category: cat, items: [] };
      merged.push(group);
    }
    const { categories, ...rest } = item;
    group.items.push(rest);
  }

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(merged, null, 2)}\n`);
  const total = merged.reduce((sum, g) => sum + g.items.length, 0);
  console.log(`Total: ${total} prompts across ${merged.length} categories`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
