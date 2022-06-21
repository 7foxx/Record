import { defineUserConfig, defaultTheme } from 'vuepress'
import Sidebar from './fileData'
const { copyCodePlugin } = require('vuepress-plugin-copy-code2')
const { searchPlugin } = require('@vuepress/plugin-search')
export default defineUserConfig({
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: '笔记',
        link: '/page/record/JavaScript'
      },
      {
        text: '记录',
        link: '/page/TheProblem/The'
      },
      {
        text: '面试题',
        link: '/page/TheInterview/JavaScript'
      },
      {
        text: 'Github',
        link: 'https://github.com/7foxx/Record'
      }
    ],
    sidebar: Sidebar()
  }),
  plugins: [
    // 代码复制
    // https://vuepress-theme-hope.github.io/v2/copy-code/zh/
    copyCodePlugin({
      // 插件选项
      pure: true,
      duration: 2000
    }),
    // 搜索
    // https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html#hotkeys
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/zh/': {
          placeholder: '搜索',
        },
      },
      maxSuggestions: 10,
    }),
  ]
})
