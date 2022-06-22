const fs = require('fs')
const pathDir = require('path')

;(() => {
  const arr: any = []
  function fileFun(path) {
    const files = fs.readdirSync(pathDir.resolve(__dirname, `../${path}`))
    // console.log(files)
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

  let newArr = []
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
  // console.log(JSON.stringify(newArr));
  // console.log(newArr);
  
})()

throw 1

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
  // 从 page 文件夹开始
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
  // console.log(JSON.stringify(obj));
  return obj
}
