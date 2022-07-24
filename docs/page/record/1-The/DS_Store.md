# Mac OS X系统产生.DS_Store文件的方法

Mac经常会产生`.DS_Store`的隐藏文件，虽然在Mac上看不到，但是有时用了人家的U盘或把U盘拿到Windows系统上用，就会看到，不但麻烦而且会泄露隐私，文件名都会历历在目。

`.DS_Store`是`Mac OS`保存文件夹的自定义属性的隐藏文件，如文件的图标位置或背景色，相当于Windows的`desktop.ini`。

1，禁止`.DS_store`生成：
 打开   “终端” ，复制黏贴下面的命令，回车执行，重启Mac即可生效。

```bash
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool TRUE
```

2，恢复`.DS_store`生成：

```bash
defaults delete com.apple.desktopservices DSDontWriteNetworkStores
```

3，删除电脑中所有的 `.DS_Store` 文件

```bash
sudo find / -name ".DS_Store" -depth -exec rm {} \;
```

4，删除当前文件下的

```bash
find . -name '.DS_Store' -type f -delete
```

