# 在 `tsx` 文件中写 `jsx` 类型检测会不通过

![image-20220618173422200](The problem.assets/image-20220618173422200.png)

**原因：**

是和 TS 中泛型、类型的写法冲突了，把 <> 里面的当做了类型所以才会报错

**解决：**

`TypeScript` 官网对`JSX`的介绍

https://www.tslang.cn/docs/handbook/jsx.html

**解决一**

在 `.ts / .tsx / .d.ts` 中定义

```ts
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
```

**解决二**

简单粗暴

```json
yarn add @types/react
```
