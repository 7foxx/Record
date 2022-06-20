const fs = require('fs')
const pathDir = require('path')

// 自动读取文件添加路由
export default function getJsonFiles() {
  const fileArr: any = []
  function fileFun(path) {
    const files = fs.readdirSync(pathDir.resolve(__dirname, `../${path}`))
    files.map(file => {
      let fPath: string = pathDir.join(path, file)
      let stat = fs.statSync(pathDir.resolve(__dirname, `../${fPath}`))
      if (stat.isDirectory()) {
        fileArr.push({
          fileName: fPath
        })
        fileFun(fPath)
      }
      if (stat.isFile()) {
        const arr: string[] = fPath.split('\\')
        arr.pop() as string
        const path = arr.join('\\')
        for (let i = 0; i < fileArr.length; i++) {
          for (let j = i; j < fileArr.length; j++) {
            const item = fileArr[j]
            if (path === item.fileName) {
              if (item.children?.length) {
                !item.children.includes(fPath) && item.children.push(fPath)
              } else {
                item.children = [fPath]
              }
            }
          }
        }
      }
    })
  }
  fileFun('page')
  const obj = {}
  const newFileArr = fileArr.filter(item => {
    if (item.children) {
      const arr = item.children.find(v => /txt/gi.test(v)).split('\\')
      item.text = arr[arr.length - 1].replace(/.txt/gi, '')
      item.children = item.children.filter(v => {
        if (!/txt/gi.test(v)) return v
      })
      return item
    } else {
      obj[`/${item.fileName.replace(/\\/gi, '/')}/`] = []
    }
  })
  newFileArr.map(item => {
    for (const key in obj) {
      const arr: string[] = item?.fileName?.split('\\')
      arr?.pop() as string
      const path = arr?.join('/')
      if (key === `/${path}/`) {
        delete item.fileName
        item.children = item.children.map(e => `/${e.replace(/\\/gi, '/')}`)
        // 折叠展开属性
        item['collapsible'] = true
        obj[key].push(item)
      }
    }
  })
  for (const key in obj) {
    const item = obj[key]
    item.map(v => {
      if (v.children?.length) {
        const val = v.children.find(e => /README/gi.test(e))
        const arr = v.children.filter(e => !/README/gi.test(e))
        arr.unshift(val)
        v.children = arr
      }
    })
  }
  return obj
}
