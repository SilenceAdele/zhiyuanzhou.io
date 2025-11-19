// 底部信息配置
import { version } from "vitepress-theme-teek/es/version"; // 导入版本号

export const FooterInfo = {
  topMessage: [
    `<a target="_blank" href="https://vitepress.dev/" title="本站框架基于 VitePress_v1.6.3" ><img alt="VitePress" src="https://img.shields.io/badge/Frame-VitePress-4868C2?logo=vitepress&amp;logoColor=fff" ></a>

    <a target="_blank" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" title="本站内容采用 CC BY-NC-SA 4.0 国际许可协议进行许可"><img alt="Copyright" src="https://img.shields.io/badge/Copyright-BY--NC--SA%204.0-d42328?logo=coursera&amp;logoColor=fff"></a>
    
    <a target="_blank" href="https://twikoo.js.org/" title="本站评论系统使用 Twikoo" ><img alt="Twikoo" src="https://img.shields.io/badge/Comments-Twikoo-0072F9"></a>
    
    <a target="_blank" href="https://www.algolia.com/" title="本站搜索服务使用 Algolia"><img alt="Algolia" src="https://img.shields.io/badge/Search-Algolia-3095FA?logo=Algolia"></a>
    
    <a target="_blank" href="https://github.com/" title="本站部署服务使用 GitHub" rel="noopener noreferrer"><img alt="github" src="https://img.shields.io/static/v1?label=Server&message=GitHub&color=181717&logo=github&logoColor=white"></a>
    
    <a target="_blank" href="https://www.cloudflare.com/" title="本站 CDN 服务由 Cloudflare 提供" rel="noopener noreferrer"><img alt="Cloudflare CDN" src="https://img.shields.io/badge/CDN-Cloudflare-FF6A00?logo=cloudflare"></a>
    
    <a target="_blank" href="https://www.busuanzi.cc/" title="本站统计服务使用 Busuanzi"><img alt="busuanzi" src="https://img.shields.io/badge/Count-Busuanzi-9b59b6?logo=busuanzi&logoColor=white"></a>`,
  ],
  theme: {
    name: `Theme By Teek@${version}-2025.10.19`,
  },
  bottomMessage: [
    `<script id="LA-DATA-WIDGET" crossorigin="anonymous" charset="UTF-8" src="https://v6-widget.51.la/v6/3LmZHLhDZIDpMaT0/quote.js?theme=#1690FF,#333333,#999999,#007BFF,#FFFFFF,#1690FF,12&f=12&display=0,0,1,1,1,1,1,1"></script>`,
    // `<span id="runtime"></span>(●'◡'●)`,
    "",
  ],
  copyright: {
    createYear: 2025,
    suffix: "zhiyuan.zhou",
  },
  customHtml: ``, // 搭配 ./theme/composables/useRuntime.ts
};
