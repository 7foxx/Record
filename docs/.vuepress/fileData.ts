const fs = require('fs')
const pathDir = require('path')

// 自动读取文件添加路由
// 只支持到三级目录
// 目录文件里不要方文件
export default (function getJsonFiles() {
  const arr: any = []
  // 先获取所有文件夹名称
  function fileFun(path) {
    const files = fs.readdirSync(pathDir.resolve(__dirname, `../${path}`))
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      let fPath: string = pathDir.join(path, file)
      let stat = fs.statSync(pathDir.resolve(__dirname, `../${fPath}`))
      if (stat.isDirectory()) {
        let flag = true
        arr.map(item => {
          if (item[path]) {
            item[path].push(fPath)
            flag = false
          }
        })
        if (flag) {
          arr.push({
            [path]: [fPath]
          })
        }
        fileFun(fPath)
      }
    }
  }
  fileFun('page')
  arr.shift()

  let newArr = [] as any
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i]
    const key = Object.keys(ele)[0]
    for (let j = 0; j < arr.length; j++) {
      const elem = arr[j]
      const arras = Object.values(elem)[0] as any
      if ([...arras].includes(key)) {
        const index = arras.findIndex(e => e === key)
        const objK = Object.keys(elem)[0]
        elem[objK][index] = ele
        newArr = arr.filter(v => !v[key])
      }
    }
  }
  // 递归读取内容
  function isValues(item) {
    const values = Object.values(item)[0] as any
    const key = Object.keys(item)[0] as any
    if (typeof values === 'object') {
      values.map(path => {
        if (typeof path === 'string') {
          const files = fs.readdirSync(pathDir.resolve(__dirname, `../${path}`))
          const index = values.findIndex(i => i === path)
          item[key].some(e => {
            if (e === path && typeof e === 'string') {
              const children = files
                .map(v => {
                  if (!/txt/.test(v)) {
                    return `/${path}\\${v}`.replace(/\\/g, '/')
                  }
                })
                .filter(v => v)
              // 将README文件放在第一个
              const value = children.find(e => /README/g.test(e))
              if (value) {
                const I = children.findIndex(e => /README/g.test(e))
                children.splice(I, 1)
                children.unshift(value)
              }
              item[key][index] = {
                text: files
                  .map(v => {
                    if (/txt/.test(v)) {
                      return v.replace(/\.txt/gi, '')
                    }
                  })
                  .filter(v => v)[0],
                children
              }
            }
          })
        } else {
          isValues(path)
        }
      })
    }
  }
  for (let i = 0; i < newArr.length; i++) {
    const element = newArr[i]
    isValues(element)
  }
  // 最后处理成路由
  const router = {}
  newArr.map((item, i) => {
    const keys = Object.keys(item)[0]
    const values = Object.values(item)[0]
    for (const key in item) {
      const value = item[key]
      if (typeof value === 'object') {
        for (let iterator of value) {
          if (iterator['text']) {
            iterator['collapsible'] = true
          } else {
            const kye = Object.keys(iterator)[0]
            const text = kye.split('\\')
            iterator['text'] = text[text.length - 1]?.replace(/[\d]+\-/gi, '')
            iterator['collapsible'] = true
            iterator['children'] = Object.values(iterator)[0]
            delete iterator[kye]
            iterator['children'].forEach(function (chivas) {
              if (!chivas['collapsible']) {
                chivas['collapsible'] = true
              }
            })
          }
        }
      }
    }
    router[`/${keys.replace(/\\/g, '/')}/`] = values
  })
  // console.log(JSON.stringify(router))
  return router
})()
