# 在 webpack 中 console 打印的行数与代码行数一致

在开发环境下，可以再`webpack.config.js`中添加以下配置，则可以保证在运行时报错的行数与源代码行数一致：

```js
module.exports = {
  //eval-source-map 仅限在“开发模式下使用”，不建议在“生产模式”下使用
  devtool: 'eval-source-map',
}
```
在生产环境下，建议关闭`Source Map `或将 `devtool` 的值设置为 `nosources-source-map`,