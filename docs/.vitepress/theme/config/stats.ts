// 自建站点统计（edgeone-s3-site-statistics）的读取配置
// 注意：teek 内部是 `data.site_pv || 9999`，真实的 0 会被当成缺省值，这里兜底成 1
const STATS_ENDPOINT = "https://stats.zhiyuanzhou.top";

const atLeastOne = (n: unknown) => Math.max(1, Number(n) || 0);

export const statisticsConfig = {
  url: `${STATS_ENDPOINT}/api/stats`,
  requestFn: async (url?: string) => {
    const base = url || `${STATS_ENDPOINT}/api/stats`;
    const path = typeof location === "undefined" ? "/" : location.pathname;
    const res = await fetch(`${base}?p=${encodeURIComponent(path)}`, {
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`stats request failed: ${res.status}`);
    const d = await res.json();
    return {
      site_pv: atLeastOne(d.site_pv),
      site_uv: atLeastOne(d.site_uv),
      page_pv: atLeastOne(d.page_pv),
      page_uv: atLeastOne(d.page_uv),
      today: d.today,
      yesterday: d.yesterday,
    };
  },
  tryRequest: true,
  tryCount: 5,
  tryIterationTime: 2000,
};
