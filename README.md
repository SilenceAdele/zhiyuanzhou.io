# zhiyuanzhou.io

The source of [zhiyuan.zhou&#39;s blog](https://blog.zhiyuanzhou.top) — notes on cloud native, observability and production troubleshooting, plus a few side projects and life records.

## What's in here

- A static, article-first site built with [VitePress](https://vitepress.dev/) and the [vitepress-theme-teek](https://github.com/Kele-Bingtang/vitepress-theme-teek) theme.
- Algolia-backed search.
- A self-hosted comment section, page-view counter and image proxy, all running on EdgeOne Pages Functions with S3-compatible object storage.
- Reading-experience extras: route progress bar, image viewer, copy notification, dark mode, friend links, a contribution chart, and a home sidebar with a clock, calendar, festival countdown and site statistics.

## Tech stack

| Area            | Choice                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Site framework  | VitePress 1.6 (Vue 3, TypeScript)                                                                        |
| Theme           | vitepress-theme-teek 1.5                                                                                 |
| Styling         | SCSS via `sass-embedded`                                                                               |
| Search          | Algolia                                                                                                  |
| Markdown extras | `vitepress-markdown-timeline`, `vitepress-plugin-group-icons`, `vitepress-plugin-auto-frontmatter` |
| Widgets         | ECharts, NProgress                                                                                       |
| Package manager | pnpm 10                                                                                                  |

## Getting started

Requires Node.js 18 or newer and pnpm 10 (the version is pinned in `package.json`; enable it with `corepack enable`).

```bash
pnpm install        # install dependencies
pnpm docs:dev       # start the dev server on http://localhost:5173
pnpm docs:build     # build the static site into docs/.vitepress/dist
pnpm docs:preview   # serve the build output locally
```

## Repository layout

```
docs/
├── 01.云原生/            # Kubernetes
├── 02.云原生可观测/       # Prometheus, TSDB
├── 03.云存储/
├── 04.中间件/
├── 05.操作系统/
├── 06.计算机网络/
├── 07.计算机编程/         # Go
├── 08.故障排查/           # Kubernetes troubleshooting in practice
├── 09.折腾日记/
├── 10.分享/              # Photos, films, music
├── 11.心情/
├── 12.关于我/
├── @pages/              # Archives, categories, tags and article overview pages
├── public/              # Static assets served as-is
├── index.md             # Home page
└── .vitepress/
    ├── config.mts       # Site config: nav, search, markdown, sitemap, frontmatter rules
    ├── ConfigHyde/      # Nav, social links, head tags, footer, friend links, covers
    └── theme/
        ├── index.ts     # Theme entry: extends teek, registers styles and plugins
        ├── components/  # Home widgets, comment box, 404, layout provider
        ├── composables/ # Visit tracking, copy notification, frontmatter rules
        ├── config/      # teek options, statistics and comment endpoints
        ├── style/       # SCSS tokens and global overrides
        └── utils/       # Markdown pipeline helpers
```

## How the site is put together

- **Theme entry** (`theme/index.ts`) extends the teek theme, imports the chunk styles that are in use, and wires in the route progress bar, visit tracking, copy notification, image viewer and cursor trail.
- **Home widgets** (`theme/components`) are regular Vue components: a greeting card, clock, calendar, contribution chart, festival countdown, notice card, friend links and the comment box.
- **Date-driven widgets** (calendar, clock) render on the client only. The site is pre-rendered, so anything that depends on "today" is mounted after load to stay correct across day and month boundaries.
- **Theme tokens** live in `theme/style`; global overrides and component styles sit next to the components they affect.

## Deployment

The build output (`docs/.vitepress/dist`) is published as a static site behind Tencent Cloud EdgeOne. Pushing to `master` stores the code; a build needs to be triggered for the change to reach production. Asset filenames carry content hashes, so a new build never collides with cached files from an older one.

## License

Articles are licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/): share and adapt them with attribution, for non-commercial use, under the same license.
