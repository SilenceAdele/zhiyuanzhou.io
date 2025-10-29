// nav导航栏配置
import { TeekIcon, VdoingIcon, SSLIcon, BlogIcon } from "./icon/NavIcon";
import { SITE_BASE } from "../constants"

export const Nav = [
    { text: "首页", link: "/" },
    // 知识库
    {
      text: '知识库',
      items: [
        {
          text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="${SITE_BASE}img/nav/kubernetes.svg" alt="" style="width: 16px; height: 16px;">
              <span>云原生(kubernetes)</span>
            </div>
            `,
          link: '/kubernetes/kubernetes-index',
        },
        {
          text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="${SITE_BASE}img/nav/Prometheus.png" alt="" style="width: 16px; height: 16px;">
              <span>云原生可观测(prometheus)</span>
            </div>
            `,
          link: '/observability/observability-index',
        },
        {
          text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="${SITE_BASE}img/nav/cloud-storage.svg" alt="" style="width: 16px; height: 16px;">
              <span>云存储</span>
            </div>
            `,
          link: '/cloud-storage/cloud-storage-index',
        },
        {
          text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="${SITE_BASE}img/nav/operating-system.svg" alt="" style="width: 16px; height: 16px;">
              <span>操作系统</span>
            </div>
            `,
          link: '/operating-system/operating-system-index',
        },
        {
          text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="${SITE_BASE}img/nav/computer-network.svg" alt="" style="width: 16px; height: 16px;">
              <span>计算机网络</span>
            </div>
            `,
          link: '/computer-network/computer-network-index',
        },
        {
          text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="${SITE_BASE}img/nav/coding.svg" alt="" style="width: 16px; height: 16px;">
              <span>计算机编程</span>
            </div>
            `,
          link: '/coding/coding-index',
        },
      ],
    },  

    // 杂记
    {
      text: '杂记',
      items: [
        {
          text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <span>🛠️ 故障排查(troubleshooting)</span>
            </div>
            `,
          link: '/troubleshooting/troubleshooting-index',
        },        
        {
          text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="${SITE_BASE}img/nav/note.svg" alt="" style="width: 16px; height: 16px;">
              <span>折腾日记</span>
            </div>
            `,
          link: '/toss-note/toss-note-index',
        }
        ]
    },  

    // 生活
    {
      text: '生活',
      items: [
        {
          // 分组标题1
          text: '分享',
          items: [
            {
              text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="${SITE_BASE}img/nav/picture.svg" alt="" style="width: 16px; height: 16px;">
                  <span>相册</span>
                </div>
                `,
              link: '/share/photo',
            },
            {
              text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="${SITE_BASE}img/nav/movie.svg" alt="" style="width: 16px; height: 16px;">
                  <span>电影</span>
                </div>
                `,
              link: '/share/movie',
            },
            {
              text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="${SITE_BASE}img/nav/music.svg" alt="" style="width: 16px; height: 16px;">
                  <span>音乐</span>
                </div>
                `,
              link: '/share/music',
            },
          ],
        },
        {
          // 分组标题2
          text: '心情',
          items: [
            {
              text: `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <img src="${SITE_BASE}img/nav/essay.svg" alt="" style="width: 16px; height: 16px;">
                  <span>随笔</span>
                </div>
                `,
              link: '/mood/essay',
            }
          ],
        }
      ],
    },
    
    // 索引
    {
      text: '导航',
      items: [
        {
          text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="${SITE_BASE}img/nav/categorie.svg" alt="" style="width: 16px; height: 16px;">
              <span>分类页</span>
            </div>
            `,
          link: '/categories',
        },
        {
          text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="${SITE_BASE}img/nav/tag.svg" alt="" style="width: 16px; height: 16px;">
              <span>标签页</span>
            </div>
            `,
          link: '/tags',
        },
        {
          text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="${SITE_BASE}img/nav/archive.svg" alt="" style="width: 16px; height: 16px;">
              <span>归档页</span>
            </div>
            `,
          link: '/archives',
        },
        {
          text: `
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="${SITE_BASE}img/nav/list.svg" alt="" style="width: 16px; height: 16px;">
              <span>清单页</span>
            </div>
            `,
          link: '/articleOverview',
        }
      ],
    },

    // 关于
    { text: "关于我", link: "/about/me" },       
  ]
