import { defineUserConfig, defaultTheme } from 'vuepress'
import Sidebar from './fileData'
const { copyCodePlugin } = require('vuepress-plugin-copy-code2')
export default defineUserConfig({
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: '记录',
        link: '/page/record/JavaScript'
      },
      {
        text: '问题',
        link: '/page/TheProblem/The'
      }
    ],
    sidebar: Sidebar()
  }),
  plugins: [
    // https://vuepress-theme-hope.github.io/v2/copy-code/zh/
    copyCodePlugin({
      // 插件选项
      pure: true,
      duration: 2000
    }),
    // 要申请以后在搞
    [
      '@vuepress/search',
      {
        locales: {
          '/': {
            placeholder: 'Search'
          },
          '/zh/': {
            placeholder: '搜索'
          }
        }
      }
    ]
  ]
})
