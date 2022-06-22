import { defineUserConfig, defaultTheme } from 'vuepress'
import Sidebar from './fileData'
const path = require('path')
const { copyCodePlugin } = require('vuepress-plugin-copy-code2')
const { searchPlugin } = require('@vuepress/plugin-search')
export default defineUserConfig({
  lang: 'zh-CN',
  title: '你好， 打工人 ！',
  port: 8082,
  // description: '这是我的第一个 VuePress 站点',
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: '学习',
        children: ['/page/Native/A-Preface', '/page/Record/A-Preface']
      },
      {
        text: '记录',
        link: '/page/TheProblem/A-Preface'
      },
      {
        text: '面试题',
        link: '/page/TheInterview/A-Preface'
      }
    ],
    sidebar: Sidebar(),
    // sidebarDepth:3,
    // sidebar: {
    //   '/page/Record/': [
    //     {
    //       children: ['/page/Record/A-Preface/README.md'],
    //       text: '前言',
    //       collapsible: true
    //     },
    //     {
    //       children: ['/page/Record/Git/README.md'],
    //       text: 'Git',
    //       collapsible: true
    //     },
    //     {
    //       children: ['/page/Record/HTTP/README.md'],
    //       text: 'HTTP',
    //       collapsible: true
    //     },
    //     {
    //       children: [
    //         '/page/Record/Node/README.md',
    //         '/page/Record/Node/nodeTs.md'
    //       ],
    //       text: 'NodeJS',
    //       collapsible: true
    //     },
    //     {
    //       children: ['/page/Record/React/README.md'],
    //       text: 'React系列',
    //       collapsible: true
    //     },
    //     {
    //       children: ['/page/Record/TypeScript/README.md'],
    //       text: 'TypeScript',
    //       collapsible: true
    //     },
    //     {
    //       children: ['/page/Record/Vue/README.md'],
    //       text: 'Vue系列',
    //       collapsible: true
    //     },
    //     {
    //       text: 'Webpack',
    //       collapsible: true,
    //       children: [
    //         {
    //           text: 'Webpack基础',
    //           children: [
    //             '/page/Record/Webpack/Webpack-base/README.md',
    //             '/page/Record/Webpack/Webpack-base/clean.md',
    //             '/page/Record/Webpack/Webpack-base/config.md',
    //             '/page/Record/Webpack/Webpack-base/css.md',
    //             '/page/Record/Webpack/Webpack-base/development.md',
    //             '/page/Record/Webpack/Webpack-base/font.md',
    //             '/page/Record/Webpack/Webpack-base/html.md',
    //             '/page/Record/Webpack/Webpack-base/image.md',
    //             '/page/Record/Webpack/Webpack-base/javascript.md',
    //             '/page/Record/Webpack/Webpack-base/minifyHtml.md',
    //             '/page/Record/Webpack/Webpack-base/optimizeCss.md',
    //             '/page/Record/Webpack/Webpack-base/other.md',
    //             '/page/Record/Webpack/Webpack-base/output.md',
    //             '/page/Record/Webpack/Webpack-base/production.md',
    //             '/page/Record/Webpack/Webpack-base/server.md',
    //             '/page/Record/Webpack/Webpack-base/summary.md'
    //           ]
    //         },
    //         {
    //           children: [
    //             '/page/Record/Webpack/Webpack-origin/README.md',
    //             '/page/Record/Webpack/Webpack-origin/loader.md',
    //             '/page/Record/Webpack/Webpack-origin/plugin.md',
    //             '/page/Record/Webpack/Webpack-origin/summary.md'
    //           ],
    //           text: 'Webpack原理'
    //         },
    //         {
    //           children: [
    //             '/page/Record/Webpack/Webpack-senior/README.md',
    //             '/page/Record/Webpack/Webpack-senior/enhanceExperience.md',
    //             '/page/Record/Webpack/Webpack-senior/liftingSpeed.md',
    //             '/page/Record/Webpack/Webpack-senior/optimizePerformance.md',
    //             '/page/Record/Webpack/Webpack-senior/reduceVolume.md',
    //             '/page/Record/Webpack/Webpack-senior/summary.md'
    //           ],
    //           text: 'Webpack优化'
    //         }
    //       ]
    //     }
    //   ]
    // },
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
