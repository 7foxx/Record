// vite.config.js 或者 vite.config.ts

import { defineConfig } from 'vite'
import Watcher from 'vite-plugin-watcher'

export default defineConfig({
  plugins: [
    Watcher(w => {
      // 添加文件进入监听器
      w.add(['./docs/page'])

      // 监听文件添加
      w.on('add', path => {
        console.log(path) // 此时文件添加时将输出对应路径
      })
    })
  ]
})
