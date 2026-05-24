# AI Image Studio

An AI-powered image generation workbench built on gpt-image-2, featuring Apple's Liquid Glass design language with a conversational interface.

![Light Theme](https://img.shields.io/badge/theme-Liquid_Glass-007aff) ![Node.js](https://img.shields.io/badge/runtime-Node.js-339933) ![License](https://img.shields.io/badge/license-MIT-green)

[中文文档](./README_ZH.md)

## Features

- **Liquid Glass UI** — Frosted glass panels, multi-layer lighting, spring animations, Apple design language
- **Conversational Interface** — Prompts and results displayed as a chat thread with full context
- **Text-to-Image / Image Editing** — Generate from text or upload reference images for editing, mode auto-detected
- **Up to 4K Output** — 9 aspect ratio options from 1024x1024 to 4096x4096
- **32+ Visual Templates** — Covering product marketing, portrait photography, anime, 3D, social media, creative, photo restoration, e-commerce across 9 categories
- **`/` Command Palette** — Type `/` to quickly invoke preset scenes (portrait, product, poster, anime, photography, etc.)
- **`@` Style Modifiers** — Type `@` to layer style keywords (cinematic, cyberpunk, watercolor, minimal, etc.)
- **AI Prompt Enhancement** — One-click LLM optimization of your current prompt, or fine-grained control via full form
- **Progressive Disclosure** — Reference images, templates, and settings tucked into bottom-sheet drawers for a clean workspace

## Quick Start

```bash
git clone https://github.com/fifasheng-tech/AI-image-Studio.git
cd AI-image-Studio
npm install
npm start
```

Open your browser at: `http://localhost:3487`

## Environment Variables

### Image Generation (Required)

The server loads environment variables via `source ~/.zshrc` before calling the Python generation script:

- `FIGURE_API_KEY` — Image generation API key
- `FIGURE_BASE_URL` — Image generation API endpoint
- `FIGURE_FALLBACK_BASE_URL` — Fallback endpoint (optional)
- `FIGURE_IMAGE_MODEL` — Model name (optional)

### Prompt Assistant (Optional)

Powers the AI prompt enhancement feature. Multiple configuration methods supported:

- `OPENAI_API_KEY` — LLM API key
- `OPENAI_BASE_URL` — LLM API endpoint (optional)
- `GPT_PROMPT_MODEL` — Model name (optional, defaults to gpt-5.4)

Also reads from `~/.hermes/config.yaml` automatically if available.

## Supported Output Sizes

| Size | Aspect Ratio | Resolution |
|------|-------------|-----------|
| 1536 x 1024 | 3:2 Landscape | 1.5K |
| 1024 x 1536 | 2:3 Portrait | 1.5K |
| 1024 x 1024 | 1:1 Square | 1K |
| 2048 x 1536 | 4:3 Landscape | 2K |
| 1536 x 2048 | 3:4 Portrait | 2K |
| 2048 x 2048 | 1:1 Square | 2K |
| 3840 x 2160 | 16:9 Landscape | 4K |
| 2160 x 3840 | 9:16 Portrait | 4K |
| 4096 x 4096 | 1:1 Square | 4K |

## Project Structure

```
├── server.js              # Express backend, API routes
├── public/
│   ├── index.html         # Page structure
│   ├── styles.css         # Liquid Glass design system
│   └── app.js             # Frontend interaction logic
├── data/
│   └── prompt-presets.json # Categorized prompt template data
└── tmp/
    ├── uploads/           # Uploaded reference image cache
    ├── outputs/           # Generated image output
    └── logs/              # Runtime logs
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd + Enter` | Submit generation |
| `Escape` | Close drawer/panel |
| `/` | Open command palette |
| `@` | Open style modifiers |
| `Ctrl + Shift + D` | Toggle debug logs |

## Tech Stack

- **Frontend**: Vanilla HTML / CSS / JavaScript, zero build dependencies
- **Backend**: Node.js + Express
- **Image Generation**: gpt-image-2 (via Python script)
- **Prompt Enhancement**: OpenAI-compatible LLM API

## License

MIT
