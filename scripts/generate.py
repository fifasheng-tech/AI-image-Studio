#!/usr/bin/env python3
import argparse
import base64
import json
import mimetypes
import os
import sys
import time
import uuid
import urllib.error
import urllib.request
from pathlib import Path

DEFAULT_PRIMARY = os.environ.get('FIGURE_BASE_URL', 'https://api.figure.jiangsuocean.cn').rstrip('/')
DEFAULT_FALLBACK = os.environ.get('FIGURE_FALLBACK_BASE_URL', 'https://figure.jiangsuocean.cn').rstrip('/')
DEFAULT_MODEL = os.environ.get('FIGURE_IMAGE_MODEL', 'gpt-image-2')
DEFAULT_KEY = os.environ.get('FIGURE_API_KEY', '')
DEFAULT_HEADERS = {
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 ImageStudio/1.0',
}
RETRYABLE_HTTP_CODES = {502, 503, 504, 524}
RETRYABLE_ERROR_SNIPPETS = (
    'stream disconnected before completion',
    'stream error:',
    'internal_server_error',
    'The read operation timed out',
    'timed out',
)
RAW_RESPONSE_LOG_LIMIT = 6000
MAX_ATTEMPTS_PER_BASE = max(1, int(os.environ.get('FIGURE_MAX_ATTEMPTS_PER_BASE', '3') or '3'))
DISABLE_FALLBACK = os.environ.get('FIGURE_DISABLE_FALLBACK', '').lower() in {'1', 'true', 'yes'}


def ensure_api_key():
    if not DEFAULT_KEY:
        print('Missing FIGURE_API_KEY environment variable.', file=sys.stderr)
        sys.exit(2)
    return DEFAULT_KEY


def build_generation_payload(args):
    payload = {
        'model': args.model,
        'prompt': args.prompt,
        'size': args.size,
        'response_format': 'b64_json',
    }
    if args.background:
        payload['background'] = args.background
    if args.quality:
        payload['quality'] = args.quality
    if args.n:
        payload['n'] = args.n
    return payload


def guess_mime(path: Path):
    mime, _ = mimetypes.guess_type(str(path))
    return mime or 'application/octet-stream'


def build_multipart_body(fields, files):
    boundary = f'----HermesFigure{uuid.uuid4().hex}'
    chunks = []

    for key, value in fields:
        chunks.append(f'--{boundary}\r\n'.encode())
        chunks.append(f'Content-Disposition: form-data; name="{key}"\r\n\r\n'.encode())
        chunks.append(str(value).encode('utf-8'))
        chunks.append(b'\r\n')

    for key, path in files:
        path = Path(path).expanduser().resolve()
        filename = path.name
        mime = guess_mime(path)
        chunks.append(f'--{boundary}\r\n'.encode())
        chunks.append(
            f'Content-Disposition: form-data; name="{key}"; filename="{filename}"\r\n'.encode()
        )
        chunks.append(f'Content-Type: {mime}\r\n\r\n'.encode())
        chunks.append(path.read_bytes())
        chunks.append(b'\r\n')

    chunks.append(f'--{boundary}--\r\n'.encode())
    return boundary, b''.join(chunks)


def post_json(base_url, api_key, payload, timeout):
    url = f"{base_url}/v1/images/generations"
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={
            **DEFAULT_HEADERS,
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode('utf-8'))


def post_edit(base_url, api_key, args):
    url = f"{base_url}/v1/images/edits"
    fields = [
        ('model', args.model),
        ('prompt', args.prompt),
        ('size', args.size),
        ('response_format', 'b64_json'),
    ]
    if args.background:
        fields.append(('background', args.background))
    if args.quality:
        fields.append(('quality', args.quality))
    if args.n:
        fields.append(('n', args.n))

    files = [('image', p) for p in args.image]
    if args.mask:
        files.append(('mask', args.mask))

    boundary, body = build_multipart_body(fields, files)
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            **DEFAULT_HEADERS,
            'Authorization': f'Bearer {api_key}',
            'Content-Type': f'multipart/form-data; boundary={boundary}',
            'Content-Length': str(len(body)),
        },
        method='POST',
    )
    with urllib.request.urlopen(req, timeout=args.timeout) as resp:
        return json.loads(resp.read().decode('utf-8'))


def save_b64_image(b64_data, outdir, prefix, index):
    outdir.mkdir(parents=True, exist_ok=True)
    ts = time.strftime('%Y%m%d-%H%M%S')
    suffix = '' if index == 1 else f'-{index}'
    path = outdir / f"{prefix}-{ts}{suffix}.png"
    path.write_bytes(base64.b64decode(b64_data))
    return path


def execute_with_fallback(callable_factory):
    attempts = [DEFAULT_PRIMARY]
    if not DISABLE_FALLBACK and DEFAULT_FALLBACK and DEFAULT_FALLBACK != DEFAULT_PRIMARY:
        attempts.append(DEFAULT_FALLBACK)

    last_err = None
    for base in attempts:
        for attempt in range(1, MAX_ATTEMPTS_PER_BASE + 1):
            try:
                response = callable_factory(base)
                retry_reason = get_retryable_response_reason(response)
                if retry_reason:
                    last_err = f'{base} attempt {attempt}: {retry_reason}\n{format_response_for_stderr(response)}'
                    if attempt < MAX_ATTEMPTS_PER_BASE:
                        time.sleep(attempt)
                        continue
                    break
                return base, response
            except urllib.error.HTTPError as e:
                body = e.read().decode('utf-8', errors='ignore')
                last_err = f'HTTP {e.code} from {base}: {body}'
                if e.code in RETRYABLE_HTTP_CODES and attempt < MAX_ATTEMPTS_PER_BASE:
                    time.sleep(attempt)
                    continue
                if e.code in RETRYABLE_HTTP_CODES:
                    break
                print(last_err, file=sys.stderr)
                sys.exit(1)
            except Exception as e:
                last_err = f'{base}: {e}'
                if is_retryable_exception_message(last_err) and attempt < MAX_ATTEMPTS_PER_BASE:
                    time.sleep(attempt)
                    continue
                break

    print(last_err or 'Image request failed.', file=sys.stderr)
    sys.exit(1)


def summarize_response(response, outdir, prefix):
    data = response.get('data') or []
    if not data:
        print(json.dumps(response, ensure_ascii=False, indent=2), file=sys.stderr)
        print('No image data returned.', file=sys.stderr)
        sys.exit(1)

    saved = []
    remote_urls = []
    revised_prompts = []
    for idx, item in enumerate(data, start=1):
        if item.get('b64_json'):
            saved.append(str(save_b64_image(item['b64_json'], outdir, prefix, idx)))
        if item.get('url'):
            remote_urls.append(item['url'])
        if item.get('revised_prompt'):
            revised_prompts.append(item['revised_prompt'])
    return saved, remote_urls, revised_prompts


def get_retryable_response_reason(response):
    if not isinstance(response, dict):
        return None
    error = response.get('error') or {}
    message = str(error.get('message') or '')
    code = str(error.get('code') or '')
    haystack = f'{message}\n{code}'
    if any(snippet.lower() in haystack.lower() for snippet in RETRYABLE_ERROR_SNIPPETS):
        return f'retryable response error: {message or code}'
    data = response.get('data') or []
    if not data:
        return 'retryable empty data response'
    return None


def format_response_for_stderr(response):
    try:
        text = json.dumps(response, ensure_ascii=False, indent=2)
    except TypeError:
        text = repr(response)
    if len(text) > RAW_RESPONSE_LOG_LIMIT:
        return f'raw response: {text[:RAW_RESPONSE_LOG_LIMIT]}...<truncated>'
    return f'raw response: {text}'


def is_retryable_exception_message(message):
    lowered = str(message).lower()
    return any(snippet.lower() in lowered for snippet in RETRYABLE_ERROR_SNIPPETS)


def main():
    parser = argparse.ArgumentParser(description='Generate or edit images via Figure GPT-Image-2 endpoints.')
    parser.add_argument('prompt', help='Prompt text')
    parser.add_argument('--edit', action='store_true', help='Use /v1/images/edits instead of /v1/images/generations')
    parser.add_argument('--image', action='append', default=[], help='Input image path for edits; can be repeated')
    parser.add_argument('--mask', help='Optional mask image path for local edits mode')
    parser.add_argument('--model', default=DEFAULT_MODEL)
    parser.add_argument('--size', default='1536x1024')
    parser.add_argument('--background', default='opaque')
    parser.add_argument('--quality', default='high')
    parser.add_argument('--n', type=int, default=1)
    parser.add_argument('--timeout', type=int, default=180)
    parser.add_argument('--output-dir', default=str(Path.home() / 'Pictures' / 'figure-generations'))
    parser.add_argument('--prefix', default='figure-gpt-image-2')
    parser.add_argument('--print-json', action='store_true')
    args = parser.parse_args()

    api_key = ensure_api_key()
    outdir = Path(args.output_dir)

    if args.edit and not args.image:
        print('--edit requires at least one --image path.', file=sys.stderr)
        sys.exit(2)

    if args.edit:
        for p in args.image + ([args.mask] if args.mask else []):
            rp = Path(p).expanduser()
            if not rp.exists():
                print(f'File not found: {rp}', file=sys.stderr)
                sys.exit(2)
        used_base, response = execute_with_fallback(lambda base: post_edit(base, api_key, args))
    else:
        payload = build_generation_payload(args)
        used_base, response = execute_with_fallback(lambda base: post_json(base, api_key, payload, args.timeout))

    saved, remote_urls, revised_prompts = summarize_response(response, outdir, args.prefix)
    result = {
        'mode': 'edits' if args.edit else 'generations',
        'endpoint_used': used_base,
        'model': args.model,
        'size': args.size,
        'input_images': args.image,
        'mask': args.mask,
        'saved_files': saved,
        'remote_urls': remote_urls,
        'revised_prompts': revised_prompts,
        'raw_response_keys': sorted(response.keys()),
    }

    text = json.dumps(result, ensure_ascii=False, indent=2 if args.print_json else None)
    print(text)


if __name__ == '__main__':
    main()
