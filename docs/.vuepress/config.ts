import { defineUserConfig, defaultTheme } from 'vuepress'
import sidebar from './fileData'
const { copyCodePlugin } = require('vuepress-plugin-copy-code2')
const { searchPlugin } = require('@vuepress/plugin-search')
export default defineUserConfig({
  lang: 'zh-CN',
  title: '你好， 打工人 ！',
  port: 8082,
  open: true,
  description: 'Help every worker！！！',
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: '学习',
        children: ['/page/Native/0-Preface', '/page/Extension/0-Preface']
      },
      {
        text: '记录',
        link: '/page/Record/0-Preface'
      },
      {
        text: '面试题',
        link: '/page/TheInterview/0-Preface'
      }
    ],
    sidebar,
    // sidebarDepth:3,
    // https://vuepress.vuejs.org/zh/theme/default-theme-config.html#git-%E4%BB%93%E5%BA%93%E5%92%8C%E7%BC%96%E8%BE%91%E9%93%BE%E6%8E%A5
    repo: 'https://github.com/7foxx/Record',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 默认为 "Edit this page"
    editLinkText: '在 GitHub 上编辑此页'
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
          placeholder: 'Search'
        },
        '/zh/': {
          placeholder: '搜索'
        }
      },
      maxSuggestions: 10
    })
  ]
})
