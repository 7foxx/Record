# Node+TypeScript+Koa+Nodemon 开发一个服务

## 环境

1. typescript
2. nodemon
3. Koa
3. MySQL
4. ts-node
5. tsconfig-paths

## app.ts

```ts
import Koa from 'koa'
import { Router } from '@/router'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import { Server } from 'http'

const app = new Koa()

// 跨域
app.use(cors())

//要解析body里面的json或者urlencoded数据，要依赖第三方库koa-bodyparser
app.use(bodyParser())

// 路由中间件
app.use(Router)

const run = (port: number): Server => {
  return app.listen(port)
}

rum(9098) // 传入端口号
```

**安装 `ts-node` 来运行项目**


:::: code-group
::: code-group-item npm
```sh
npm install -g ts-node
```
:::
::: code-group-item yarn
```sh
yarn add -g ts-node
```
:::
::::

现在执行tsc 命令就会生成一个dist文件夹到你的项目里面了，也可以直接执行

```sh
ts-node ./src/app.ts
```

就启动服务了

现在还有一个需求就是每当我改动src目录项的ts文件的时候，系统服务会重新启动，这时候就要用到nodemon这个东西了，不了解的可以度娘一下，

**开始安装 nodemon**

:::: code-group
::: code-group-item npm
```sh
npm install -g nodemon
```
:::
::: code-group-item yarn
```sh
yarn add -g nodemon
```
:::
::::

在  `package.json`  中  `scripts` 配置

```json
"start": "nodemon --watch src/**/*.ts --exec \"ts-node -r tsconfig-paths/register\" src/app.ts --files",
```

`nodemon --watch src/**/*.ts ` nodemon 监听的入口文件

这个配置 `--exec \"ts-node -r tsconfig-paths/register\" src/app.ts --files` （ `src/app.ts` 是你的入口文件）如果你项目中使用了路径别名如 `@/` 在ts中他是不识别的，需要安装 `tsconfig-paths` ，加上`--files` 让 ` ts-node ` 编译识别

:::: code-group
::: code-group-item npm
```sh
npm install --save-dev tsconfig-paths
```
:::
::: code-group-item yarn
```sh
yarn add -dev tsconfig-paths
```
:::
::::

## MySQL

安装：
:::: code-group
::: code-group-item npm
```sh
npm install --save-dev mysql @types/mysql
```
:::
::: code-group-item yarn
```sh
yarn add -dev mysql @types/mysql
```
:::
::::



配置：

```ts
import mysql from 'mysql'

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'dome' // 表名
})

export default db
```

之后在文件中引用即可

## **`tsconfig.json` 配置项**

```json
{
  "compilerOptions": {
    "target": "es2018",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    // 改成 commonjs，我们就可以使用 import/export
    "module": "commonjs",
    // --- 开启装饰器功能 ----
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    // --- 结束         ----
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noEmit": true,
    "baseUrl": ".",
    // 路径别名
    "paths": {
      "@/*": ["./src/*"] 
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

