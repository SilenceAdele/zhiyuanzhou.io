// 自建评论服务（edgeone-s3-comments）的接口配置
const DEFAULT_ENDPOINT = "https://comments.zhiyuanzhou.top";

const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env || {};

/**
 * 空串表示「本地调试且没显式指定后端」：组件不发任何请求，只显示一行提示。
 * 想在本地跑完整流程就显式接上，例如
 *   VITE_COMMENTS_API=http://localhost:8788 pnpm docs:dev
 */
export const commentsEndpoint = (
  env.VITE_COMMENTS_API || (env.DEV ? "" : DEFAULT_ENDPOINT)
).replace(/\/+$/, "");

/** 一次加载的顶层评论数，和服务端默认值保持一致 */
export const COMMENTS_PAGE_SIZE = 20;
