# 文件打包后如何本地运行


## http-server方法

1. 全局安装：

```sh
npm install http-server -g
```

2. 在打包后文件夹目录中打开终端执行命令

```sh
http-server
```

默认的是8080端口

通过命令`http-server -a 0.0.0.0 -p 8081` 可以修改端口号

