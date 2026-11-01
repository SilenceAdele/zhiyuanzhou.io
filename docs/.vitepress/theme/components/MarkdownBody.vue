<template>
  <!-- 渲染器是 markdown-it 生成的（已关闭原始 HTML），不是用户直接传入的字符串 -->
  <div class="zc-md" v-html="html"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type MarkdownIt from "markdown-it";
import { escapeHtml, loadMarkdown } from "../utils/markdown";

const props = defineProps<{ text: string }>();

const md = ref<MarkdownIt | null>(null);

onMounted(async () => {
  md.value = await loadMarkdown();
});

// 加载完成前用转义后的纯文本顶上，避免闪烁空白，也绝不把原文当 HTML 插入
const html = computed(() => {
  if (md.value) return md.value.render(props.text);
  return `<p>${escapeHtml(props.text).replace(/\n/g, "<br>")}</p>`;
});
</script>

<style scoped>
.zc-md {
  font-size: 14px;
  line-height: 1.75;
  overflow-wrap: anywhere;
}

.zc-md :deep(> :first-child) {
  margin-top: 0;
}

.zc-md :deep(> :last-child) {
  margin-bottom: 0;
}

.zc-md :deep(p) {
  margin: 6px 0;
}

/* 全局 reset 把标题压成正文、把 list-style 清成 none，VitePress 只在 .vp-doc 内恢复；
   评论区不在 .vp-doc 里，所以这里要自己声明回来 */
.zc-md :deep(h1),
.zc-md :deep(h2),
.zc-md :deep(h3),
.zc-md :deep(h4),
.zc-md :deep(h5),
.zc-md :deep(h6) {
  margin: 10px 0 4px;
  font-weight: 600;
  line-height: 1.4;
}

.zc-md :deep(h1) {
  font-size: 1.5em;
}

.zc-md :deep(h2) {
  font-size: 1.3em;
}

.zc-md :deep(h3) {
  font-size: 1.15em;
}

.zc-md :deep(h4),
.zc-md :deep(h5),
.zc-md :deep(h6) {
  font-size: 1.05em;
}

.zc-md :deep(a) {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.zc-md :deep(code) {
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.88em;
}

.zc-md :deep(pre) {
  margin: 8px 0;
  padding: 10px 12px;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  overflow-x: auto;
}

.zc-md :deep(pre code) {
  padding: 0;
  background: none;
}

.zc-md :deep(blockquote) {
  margin: 8px 0;
  padding: 2px 12px;
  border-left: 3px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.zc-md :deep(ul),
.zc-md :deep(ol) {
  margin: 6px 0;
  padding-left: 20px;
}

.zc-md :deep(ul) {
  list-style: disc;
}

.zc-md :deep(ol) {
  list-style: decimal;
}

.zc-md :deep(li + li) {
  margin-top: 2px;
}

.zc-md :deep(img) {
  max-width: 100%;
  border-radius: 6px;
}

.zc-md :deep(hr) {
  margin: 12px 0;
  border: none;
  border-top: 1px solid var(--vp-c-divider);
}

.zc-md :deep(table) {
  display: block;
  width: max-content;
  max-width: 100%;
  margin: 8px 0;
  border-collapse: collapse;
  overflow-x: auto;
  font-size: 13px;
}

.zc-md :deep(th),
.zc-md :deep(td) {
  padding: 4px 10px;
  border: 1px solid var(--vp-c-divider);
}

.zc-md :deep(th) {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
}
</style>
