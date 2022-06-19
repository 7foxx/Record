const fs = require('fs')
const pathDir = require('path')

// 自动读取文件添加路由
export default function getJsonFiles() {
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
        arr.pop()
        const path = arr.join('/')
        if (/README/.test(fileItem)) {
          filesObj.push({
            children: ['/' + fPath.replace(/\\/g, '/')]
          })
        } else {
          filesObj.map(item => {
            const arr: string[] = item.children[0].split('/')
            arr.pop()
            const path2 = arr.join('/')
            if ('/' + path === path2 && !/txt/gi.test(fPath)) {
              item.children.push('/' + fPath.replace(/\\/g, '/'))
            }
          })
        }
      }
    })
  }
  findJsonFile('page')
  jsonFiles.map(item => {
    filesObj.map(val => {
      const arr: string[] = item.split('\\')
      const text = arr.pop() as string
      const path = arr.join('/')
      val.children.some(val2 => {
        const arr2: string[] = val2.split('/')
        arr2.pop()
        const path2 = arr2.join('/')
        if (/\.txt/.test(text) && '/' + path === path2) {
          val.text = text.replace(/\.txt/, '')
          return true
        }
      })
    })
  })

  const objs = {}
  // 兜底如果没有 text 则添加为空
  filesObj.map(item => {
    if (!item.text) item['text'] = ''
    item['collapsible'] = true
    const text = item.children[0].split('/').filter(val => val)
    const path = `/${text[0]}/${text[1]}/`
    const reg = new RegExp(`${path}`, 'gi')
    if (reg.test(item.children[0])) {
      if (Array.isArray(objs[path])) {
        objs[path] = [...objs[path], item]
      } else {
        objs[path] = [item]
      }
    }
  })
  return objs
}
