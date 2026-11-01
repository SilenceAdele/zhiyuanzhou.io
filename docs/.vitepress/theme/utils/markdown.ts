// 评论正文按 Markdown 渲染。
//
// 安全前提：markdown-it 关闭了原始 HTML（html: false），链接与图片的协议由它
// 内置的 validateLink 过滤（javascript:、vbscript:、data: 一律拒绝）。因此渲染
// 结果不需要额外的 HTML 清洗，但也不能把 html 打开。
//
// markdown-it 体积不小，只在第一次需要渲染时才动态加载，不进入首屏包。

import type MarkdownIt from "markdown-it";

let loading: Promise<MarkdownIt> | null = null;

export function loadMarkdown(): Promise<MarkdownIt> {
  if (!loading) {
    loading = import("markdown-it").then(({ default: MarkdownItCtor }) => {
      const md = new MarkdownItCtor({ html: false, linkify: true, breaks: true });

      const linkOpen = md.renderer.rules.link_open;
      md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        tokens[idx].attrSet("target", "_blank");
        tokens[idx].attrSet("rel", "noopener noreferrer nofollow");
        return linkOpen
          ? linkOpen(tokens, idx, options, env, self)
          : self.renderToken(tokens, idx, options);
      };

      // 外链图片按需加载，并且不带 Referer，避免把读者来源泄露给图床
      const image = md.renderer.rules.image;
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        tokens[idx].attrSet("loading", "lazy");
        tokens[idx].attrSet("referrerpolicy", "no-referrer");
        return image ? image(tokens, idx, options, env, self) : self.renderToken(tokens, idx, options);
      };

      return md;
    });
  }
  return loading;
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
