// 组件导入
import Teek from "vitepress-theme-teek";
import TeekLayoutProvider from "./components/TeekLayoutProvider.vue";
import { defineComponent, h } from "vue";
import { useData } from "vitepress";


// Teek 在线主题包引用（需安装 Teek 在线版本）
import "vitepress-theme-teek/index.css"; // 引入主题样式
import "vitepress-theme-teek/theme-chalk/tk-code-block-mobile.css"; // 引入移动端代码块样式

import "vitepress-theme-teek/theme-chalk/tk-sidebar.css"; // 引入侧边栏样式

import "vitepress-theme-teek/theme-chalk/tk-nav.css"; // 引入导航栏样式

import "vitepress-theme-teek/theme-chalk/tk-aside.css"; // 文章目录样式
import "vitepress-theme-teek/theme-chalk/tk-doc-h1-gradient.css"; // 文档以及标题样式
import "vitepress-theme-teek/theme-chalk/tk-table.css"; // 表格样式
import "vitepress-theme-teek/theme-chalk/tk-mark.css"; // 文章 mark 标签样式
import "vitepress-theme-teek/theme-chalk/tk-blockquote.css"; //引用样式
import "vitepress-theme-teek/theme-chalk/tk-home-card-hover.css"; // 首页卡片悬停效果

import "vitepress-theme-teek/theme-chalk/tk-index-rainbow.css"; // Vitepress 首页彩虹渐变样式
import "vitepress-theme-teek/theme-chalk/tk-doc-fade-in.css"; // 文档淡入效果样式
import "vitepress-theme-teek/theme-chalk/tk-banner-desc-gradient.css"; // Banner 描述渐变样式

// 主题增强样式
import "vitepress-theme-teek/theme-chalk/tk-nav-blur.css"; // 导航栏毛玻璃样式
// import "vitepress-theme-teek/theme-chalk/tk-container.css"; // Markdown 容器样式
// import "vitepress-theme-teek/theme-chalk/tk-container-left.css"; // Markdown 容器左框样式
// import "vitepress-theme-teek/theme-chalk/tk-container-flow.css"; // Markdown 容器流体样式
import "vitepress-theme-teek/tk-plus/banner-full-img-scale.scss"; // Banner 全屏图片放大样式

import "./styles/code-bg.scss";
import "./styles/iframe.scss";
import "./style/index.scss"; // 引入One全局样式

// import "virtual:group-icons.css"; //代码组图标样式
import "vitepress-markdown-timeline/dist/theme/index.css"; // 引入时间线样式

//切换进度条
import { NProgress } from "nprogress-v2/dist/index.js"; // 进度条组件
import "nprogress-v2/dist/index.css"; // 进度条样式

import "vitepress-theme-teek/tk-plus/fade-up-animation.scss";// 首次加载的动画效果


// 引入复制事件（复制后弹窗提示）
import { useCopyEvent } from "./composables/useCopyEvent.ts";
import { trackVisit } from "./composables/useVisitTracker.ts";


import "./components/guangbiaoTX/guangbiaoTX.scss"; // ⬅️ 鼠标拖尾样式scss
import { useGuangbiaoTX } from "./components/guangbiaoTX/useGuangbiaoTX"; // ⬅️ 导入鼠标拖尾星星动画ts
import { initImageViewer } from "./style/dd-image/dd-image.ts" // 引入图片查看器功能（替换原版


// 友链头像在 SSR 期间就开始下载，等 hydration 挂上 onLoad 时往往已加载完，
// 事件不会再触发，.loaded 缺失会让 CSS 一直把图片压在 opacity: 0（只剩骨架屏）
function markLoadedAvatars() {
  requestAnimationFrame(() => {
    document
      .querySelectorAll<HTMLImageElement>(".tk-friend-link .skeleton-image > img")
      .forEach((img) => {
        if (img.complete) img.classList.add("loaded");
      });
  });
}

export default {
  extends: Teek,
  async enhanceApp({ app, router }) {
    // 非SSR环境下配置路由进度条
    // @ts-expect-error
    if (!import.meta.env.SSR) {
      NProgress.configure({ showSpinner: false });
      router.onBeforeRouteChange = () => NProgress.start();
      router.onAfterRouteChange = () => {
        setTimeout(() => {
          NProgress.done();
        }, 100);
        // 🔽 自建站点统计：每次路由切换记一次访问
        trackVisit();
        markLoadedAvatars();
      };

      // 首屏不会触发 onAfterRouteChange，单独上报一次
      trackVisit();
      markLoadedAvatars();

    // 🔽 鼠标拖尾星星动画
    if (typeof window !== "undefined") {
      useGuangbiaoTX();
    }  

    // 🔽 替换原版图片查看器
    initImageViewer();

    }
    
  },
  Layout: defineComponent({
    name: "LayoutProvider",
    setup() {
      if (typeof window !== 'undefined') {
            // 监听复制事件
            useCopyEvent();
          }

      const props: Record<string, any> = {};
      const { frontmatter } = useData();

      // 添加自定义 class 逻辑
      if (frontmatter.value?.layoutClass) {
        props.class = frontmatter.value.layoutClass;
      }

      return () => h(TeekLayoutProvider, props);
    },
  }),
};