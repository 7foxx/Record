# GIT 一次提交到两个仓库

第一个仓库 正常设置好后，第二个仓库按如下命令添加：

```
git remote set-url --add origin 另外一个仓库的地址
```

第一次提交的时候 依然是：`git push origin master -u`

以后 `git push ` 就可以了
