import { ref } from "vue";
import { isClient } from "vitepress-theme-teek";

// 构建期固定为 0，SSR 仍按构建时刻计算；浏览器端水合完成后再开始走时，避免水合文本不一致
export const clientNow = ref(0);

if (isClient) {
  const tick = () => {
    clientNow.value = Date.now();
  };

  // 水合不会纠正文本差异，等 load 之后再推一次，之后每分钟刷新
  setTimeout(() => {
    if (document.readyState === "complete") tick();
    else window.addEventListener("load", tick, { once: true });
  }, 0);
  setInterval(tick, 60 * 1000);
}
