# ts报错元素隐式具有 “any“ 类型

![image-20220720085943742](https://picgo-1302703244.cos.ap-nanjing.myqcloud.com/202207200859822.png)

## 方案一，修改tsconfig

是修改tsconfig.json，加下面这行参数屏蔽检查，从而不报错。

```json
"suppressImplicitAnyIndexErrors":true,
```

官网解释：<https://www.typescriptlang.org/tsconfig#suppressImplicitAnyIndexErrors>

## 方案二，写一个函数转类型

```ts
export function isValidKey(key: string | number | symbol , object: object): key is keyof typeof object {
  return key in object;
}

for (const key in obejct) {
	if(isValidKey(key,obejct)){
		// 处理...
		obejct[key]
		....
	}
}

```

以上两种特别不优雅，非常不喜欢。在此我写一个比较优雅可靠的解决方法。

## 方案三：定义一个string作为key的类型

```ts
type stringKey = Record<string, boolean>
const accessDict: stringKey = {
    create: false,  // 创建
    receive: false,  // 接收
    ...
}

 for (const i of AccessList) {
      accessDict[i.authName] = true
  }

```

写一个类型，表明key是字符串，value要看各位自己的需要定义。
我的项目中value是boolean，所以写boolean。

后面再用字符串当key遍历对象，[typescript](https://so.csdn.net/so/search?q=typescript&spm=1001.2101.3001.7020)就不会报错了！
当然，如果仅仅为了解决报错，不用额外写一个类型，直接给变量注明类型即可：

```ts
const accessDict: Record<string, boolean> = {
    create: false,  // 创建
    receive: false,  // 接收
    ...
}

 for (const i of AccessList) {
      accessDict[i.authName] = true
  }

```

## 方案四：ts注解 @ts-ignore

![image-20220720090545545](https://picgo-1302703244.cos.ap-nanjing.myqcloud.com/202207200905569.png)
