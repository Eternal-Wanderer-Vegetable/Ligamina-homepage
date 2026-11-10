# Ligamina Homepage

静态展示页（Showcase）for [Ligamina](https://github.com/Eternal-Wanderer-Vegetable/Ligamina) — a Rust-based runtime that runs native Koishi / NoneBot / AstrBot chatbot plugins unchanged behind one MCP-style interface.

## 特性 / Features

- **中英双语 / Bilingual (zh/en)** — header toggle, persisted in `localStorage`, auto-detected on first visit
- **Vue 3** — vendored locally at `assets/vendor/vue.global.prod.js` (no build step, no CDN)
- **瑞士风格 / Swiss typographic style** — strict grid, Helvetica stack, black/white/red, numbered sections
- **完全静态 / Fully static** — deploy anywhere (GitHub Pages works as-is)

## 本地预览 / Local preview

```bash
python -m http.server 8137
# open http://localhost:8137
```

(Opening `index.html` directly via `file://` also works — all assets are local and relative.)

## 部署到 GitHub Pages / Deploy to GitHub Pages

Fully automatic via CI (`.github/workflows/deploy.yml`): every push to `main` (or a manual `workflow_dispatch` run) publishes the latest version with the official Actions flow — `checkout → upload-pages-artifact → deploy-pages`. Repo only needs **Settings → Pages → Source: GitHub Actions** (already configured). Relative asset paths (`./assets/...`) mean project-pages subpaths work too.

## 结构 / Structure

```
index.html                  # markup + Vue in-DOM template
assets/css/style.css        # Swiss-style stylesheet
assets/js/app.js            # Vue app + zh/en dictionaries
assets/vendor/vue.global.prod.js  # Vue 3.5.13 (vendored)
```

Content (features, status, quick start) is transcribed from the Ligamina README; update `assets/js/app.js` dictionaries when the project evolves.

## License

Site content mirrors the described project; code snippets on the page follow the upstream repo. Site itself: MIT-free — do whatever.
