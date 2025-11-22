// FriendLink用于在首页展示一些友链
export const FriendLink = {
  enabled: true, // 是否启用友情链接卡片
  limit: 3, // 一页显示的数量
  // autoScroll: true, // 是否自动滚动
  // scrollSpeed: 2500, // 滚动间隔时间，单位：毫秒。autoScroll 为 true 时生效

  autoPage: true, // 是否自动翻页
  pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
  // titleClick: (router) => router.go("/websites"), // 查看更多友链

  // 友情链接数据列表
  list: [
    {
      avatar: "/img/nav/upyun.png",
      name: "又拍云",
      desc: "本站由又拍云提供云存储服务",
      link: "https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral",
    }, 
    {
      avatar: "https://image.zhiyuanzhou.online/friendlink-0.png",
      name: "vitepress-theme-teek",
      desc: "Teek官网",
      link: "https://vp.teek.top/",
    },  
    {
      avatar: "https://image.zhiyuanzhou.online/friendlink-1.png",
      name: "Teeker",
      desc: "朝圣的使徒，正在走向编程的至高殿堂！",
      link: "http://notes.teek.top/",
    },     
    {
      avatar: "https://image.zhiyuanzhou.online/friendlink-2.webp",
      name: "One Blog",
      desc: "明心静性，爱自己",
      link: "https://onedayxyy.cn/",
    },
    {
      avatar: "https://image.zhiyuanzhou.online/friendlink-3.webp",
      name: "Hyde Blog",
      desc: "人心中的成见是一座大山",
      link: "https://teek.seasir.top/",
    } 
  ],
  // autoScroll: true,
};