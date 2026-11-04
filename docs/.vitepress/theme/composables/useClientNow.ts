import { ref } from "vue";
import { isClient } from "vitepress-theme-teek";

// 构建期固定为 0，让水合时算出的文案与 SSR 完全一致；挂载后再换成真实时间
export const clientNow = ref(0);

let started = false;

export const startClientNow = () => {
  if (!isClient || started) return;

  started = true;
  clientNow.value = Date.now();
  setInterval(() => {
    clientNow.value = Date.now();
  }, 60 * 1000);
};
