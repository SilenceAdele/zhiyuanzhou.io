// 站点访问统计上报（edgeone-s3-site-statistics）
// 用 text/plain 的 Blob 发送，属于 CORS 简单请求，不会触发预检
const STATS_ENDPOINT = "https://stats.zhiyuanzhou.top";

export function trackVisit(path: string = location.pathname): void {
  // 本地开发不上报，避免污染线上数据
  if (import.meta.env.DEV) return;

  const url = `${STATS_ENDPOINT}/api/hit`;
  const body = `p=${encodeURIComponent(path)}`;
  const payload = new Blob([body], { type: "text/plain" });

  if (navigator.sendBeacon?.(url, payload)) return;

  fetch(url, {
    method: "POST",
    body,
    headers: { "content-type": "text/plain" },
    keepalive: true,
  }).catch(() => {});
}
