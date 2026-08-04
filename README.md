# zhiyuanzhou.io

我的个人技术博客，主要写云原生、可观测性和故障排查相关的内容。

在线访问：[blog.zhiyuanzhou.online](https://blog.zhiyuanzhou.online)

## 技术栈

博客基于 [VitePress](https://vitepress.dev/) 搭建，使用了 [vitepress-theme-teek](https://github.com/Kele-Bingtang/vitepress-theme-teek) 主题。

另外集成了 Algolia 搜索、不蒜子站点统计和 Twikoo 评论。

## 目录结构

```
docs/
├── 01.云原生/            # Kubernetes
├── 02.云原生可观测/       # Prometheus · TSDB
├── 03.云存储/
├── 04.中间件/
├── 05.操作系统/
├── 06.计算机网络/
├── 07.计算机编程/         # Golang
├── 08.故障排查/           # Kubernetes 故障诊断实战
├── 09.折腾日记/
├── 10.分享/              # 相册 · 电影 · 音乐
├── 11.心情/
└── 12.关于我/
```

## 本地开发

```bash
pnpm install          # 安装依赖
pnpm docs:dev         # 启动开发服务器
pnpm docs:build       # 构建静态站点
pnpm docs:preview     # 预览构建产物
```

## 许可

文章内容采用 [CC BY-NC-SA 4.0](http://www.suncai.net/PubLicense/CCBY40.html) 许可协议。
