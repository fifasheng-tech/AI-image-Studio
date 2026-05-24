# Figure Image Studio

一个本地自用的 Figure GPT-Image-2 Web UI，现在已接入 GPT-5.4 做 prompt 辅助。

## 功能
- 纯文字生图
- 上传原图改图
- 可选上传 mask
- 支持使用 `gpt-image-2`
- 页面直接预览结果
- 同时显示接口返回 JSON，方便排查
- GPT-5.4 帮你从需求生成 prompt
- GPT-5.4 帮你优化当前 prompt
- 按分类内置常用 prompt 模板

## 启动

```bash
cd /Users/lee/Projects/figure-image-studio
npm install
npm start
```

打开：`http://localhost:3487`

## 前提

需要本机 `~/.zshrc` 里已有这些环境变量：

### 图片生成
- `FIGURE_API_KEY`
- `FIGURE_BASE_URL`
- `FIGURE_FALLBACK_BASE_URL`
- `FIGURE_IMAGE_MODEL`

### Prompt 助手（GPT-5.4）
- `OPENAI_API_KEY`
- 可选：`OPENAI_BASE_URL`
- 可选：`OPENAI_MODEL`
- 可选：`GPT_PROMPT_MODEL`（不填默认走 `gpt-5.4`）
- 可选：`PROMPT_LLM_BASE_URL`
- 可选：`PROMPT_LLM_API_KEY`

服务端会自动 `source ~/.zshrc` 后再调用 Python 脚本，所以会沿用你现在本机已有配置。

## 目录
- `server.js`：后端接口
- `data/prompt-presets.json`：分类 prompt 模板
- `public/`：前端页面
- `tmp/uploads`：上传原图缓存
- `tmp/outputs`：生成结果

## 当前内置分类
- 照片修复
- 电商主图
- 海报封面
- 创意生图

## 备注
- 当前是单机本地版，适合自己电脑直接用
- 还没做账号系统、任务队列、历史记录数据库
- 如果你要，下一步可以继续加：历史记录、批量队列、自定义模板管理、一键复制返回图链接、局部重绘工作流
