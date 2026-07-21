# AI Image Studio

基于 gpt-image-2 的 AI 图片生成工作台，采用 Apple Liquid Glass 风格设计，对话式交互体验。

![Light Theme](https://img.shields.io/badge/theme-Liquid_Glass-007aff) ![Node.js](https://img.shields.io/badge/runtime-Node.js-339933) ![License](https://img.shields.io/badge/license-MIT-green)

## 特性

- **Liquid Glass UI** — 毛玻璃质感面板、多层光影、弹性动画，Apple 设计语言
- **对话式交互** — Prompt 与生成结果以对话流形式呈现，上下文清晰
- **文字生图 / 图片编辑** — 纯文字生成或上传参考图进行编辑，自动检测模式
- **最高 4K 输出** — 支持 9 种尺寸比例，从 1024x1024 到 4096x4096
- **32+ 可视化模板** — 涵盖产品营销、人像摄影、动漫、3D、社交媒体、创意、照片修复、电商等 9 大分类
- **`/` 命令面板** — 输入 `/` 快速调用预设场景（人像、产品、海报、动漫、摄影等）
- **`@` 风格修饰** — 输入 `@` 叠加风格关键词（电影感、赛博朋克、水彩、极简等）
- **AI Prompt 优化** — 一键调用 LLM 优化当前 prompt，或通过完整表单精细控制
- **渐进式披露** — 参考图、模板、设置等功能收纳在底部抽屉中，保持界面简洁

## 快速开始

```bash
git clone https://github.com/fifasheng-tech/AI-image-Studio.git
cd AI-image-Studio
npm install
npm start
```

打开浏览器访问：`http://localhost:3487`

## 环境变量

### 图片生成（必需）

服务端通过 `.env` 加载环境变量后调用 Python 脚本，需要配置：

- `FIGURE_API_KEY` — 图片生成 API Key
- `FIGURE_BASE_URL` — 图片生成 API 地址
- `FIGURE_FALLBACK_BASE_URL` — 备用地址（可选）
- `FIGURE_IMAGE_MODEL` — 模型名称（可选）

### Prompt 助手（可选）

用于 AI 优化 prompt 功能，支持多种配置方式：

- `OPENAI_API_KEY` — LLM API Key
- `OPENAI_BASE_URL` — LLM API 地址（可选）
- `GPT_PROMPT_MODEL` — 模型名称（可选，默认 gpt-5.4）

也支持从 `~/.hermes/config.yaml` 自动读取配置。

## 支持的输出尺寸

| 尺寸 | 比例 | 分辨率级别 |
|------|------|-----------|
| 1536 x 1024 | 3:2 横图 | 1.5K |
| 1024 x 1536 | 2:3 竖图 | 1.5K |
| 1024 x 1024 | 1:1 方图 | 1K |
| 2048 x 1536 | 4:3 横图 | 2K |
| 1536 x 2048 | 3:4 竖图 | 2K |
| 2048 x 2048 | 1:1 方图 | 2K |
| 3840 x 2160 | 16:9 横图 | 4K |
| 2160 x 3840 | 9:16 竖图 | 4K |
| 4096 x 4096 | 1:1 方图 | 4K |

## 项目结构

```
├── server.js              # Express 后端，API 路由
├── public/
│   ├── index.html         # 页面结构
│   ├── styles.css         # Liquid Glass 样式系统
│   └── app.js             # 前端交互逻辑
├── data/
│   └── prompt-presets.json # 分类 prompt 模板数据
└── tmp/
    ├── uploads/           # 上传的参考图缓存
    ├── outputs/           # 生成的图片输出
    └── logs/              # 运行日志
```

## 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `Cmd + Enter` | 提交生成 |
| `Escape` | 关闭抽屉/面板 |
| `/` | 打开命令面板 |
| `@` | 打开风格修饰面板 |
| `Ctrl + Shift + D` | 打开调试日志 |

## 技术栈

- **前端**：原生 HTML / CSS / JavaScript，零构建依赖
- **后端**：Node.js + Express
- **图片生成**：gpt-image-2（通过 Python 脚本调用）
- **Prompt 优化**：兼容 OpenAI API 的 LLM

## License

MIT
