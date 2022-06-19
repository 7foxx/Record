import { defineUserConfig, defaultTheme } from 'vuepress'
const { copyCode } = require('vuepress-plugin-copy-code2')
const fs = require('fs')
const pathDir = require('path')

// 自动读取文件添加路由
const routes = (
  text: string,
  path: string
): {
  text: string
  children: string[]
} => {
  if (!path || !text) throw new Error('path of text is null')
  return {
    text,
    children: fs
      .readdirSync(pathDir.resolve(__dirname, `../${path}`))
      .map(file => `/${path}/${file}`)
  }
}

function getJsonFiles() {
  const jsonFiles: string[] = []
  const filesObj: any = []
  function findJsonFile(path) {
    let files = fs.readdirSync(pathDir.resolve(__dirname, `../${path}`))
    files.map(fileItem => {
      let fPath: string = pathDir.join(path, fileItem)
      let stat = fs.statSync(pathDir.resolve(__dirname, `../${fPath}`))
      if (stat.isDirectory()) {
        findJsonFile(fPath)
      }
      if (stat.isFile()) {
        jsonFiles.push(fPath)
        const arr: string[] = fPath.split('\\')
        const text = arr.pop() as string
        const path = arr.join('/')
        if (/README/.test(fileItem)) {
          filesObj.push({
            children: ['/' + fPath.replace(/\\/g, '/')]
          })
        } else {
          filesObj.map(item => {
            const reg = new RegExp(`${path}`, 'gi')
            if (reg.test(item.children) && !/txt/gi.test(fPath)) {
              item.children.push('/' + fPath.replace(/\\/g, '/'))
            }
          })
        }
      }
    })
  }
  findJsonFile('page')
  jsonFiles.map(item => {
    const arr: string[] = item.split('\\')
    const text = arr.pop() as string
    const path = arr.join('/')
    filesObj.map(val => {
      val.children.some(val2 => {
        const reg = new RegExp(`${path}`, 'gi')
        if (/\.txt/.test(text) && reg.test(val2)) {
          val.text = text.replace(/\.txt/, '')
          return true
        }
      })
    })
  })
  console.log(filesObj)
}
getJsonFiles()
// console.log(routes("首页", "web"))

export default defineUserConfig({
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: '笔记',
        link: '/page/web/'
      },
      {
        text: '问题',
        link: '/page/intro/'
      }
    ],
    sidebar: {
      '/page/web/': [
        {
          text: 'web',
          children: ['/page/web/README.md', '/page/web/web1.md']
        }
      ]
    }
  }),
  plugins: [
    // https://vuepress-theme-hope.github.io/v2/copy-code/zh/
    copyCode({
      // 插件选项
      pure: true
    }),
    [
      '@vuepress/plugin-external-link-icon',
      {
        locales: {
          '/': {
            openInNewWindow: 'open in new window'
          },
          '/zh/': {
            openInNewWindow: '在新窗口打开'
          }
        }
      }
    ],
    [
      '@vuepress/plugin-search',
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
