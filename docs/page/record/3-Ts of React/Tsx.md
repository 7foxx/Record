# 在 `tsx` 文件中写 `jsx` 语法类型检测会不通过

![image-20220618173422200](https://picgo-1302703244.cos.ap-nanjing.myqcloud.com/202206201015367.png)

**原因：**

在自己搭建的 `Webpack` 中 如果没有配置 `JSX.IntrinsicElements` 接口是无法在 `tsx` 文件中使用的。

如果是在 `React`  的脚手架搭建的项目他会自动配置好的所以不会报错。

**解决：**

`TypeScript` 官网对 `JSX` 的介绍

<https://www.tslang.cn/docs/handbook/jsx.html>

**方案一**

在 `.d.ts` 中定义

```ts
// 声明（含有子属性的）全局对象
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
```

**方案二**

简单粗暴，不过这样只是解决了问题原因，并没有达到最终的目的。

```sh
yarn add @types/react
```
