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

但是，以上命令只是针对网络磁盘，想要阻止本地磁盘中 DS_Store 文件的自动生成？

唯一的方式就是停止使用「访达」，不过我想大家应该不会考虑这么做。

3，删除电脑中所有的 `.DS_Store` 文件

```bash
sudo find / -name ".DS_Store" -depth -exec rm {} \;
```

4，删除当前文件下的

```bash
find . -name '.DS_Store' -type f -delete
```

## Git仓库管理忽略 DS_Store 文件

作为一名使用Mac的开发者，在日常开发过程中，经常会使用Git来对代码文件夹进行版本控制。而在默认情况下，Git会把 DS_Store 文件带入版本控制的范围内。所以，可以手动将其踏入 Git 的版本管理忽略列表。

1，将 . DS_Store 加入全局的 .gitignore 文件，执行命令：

```bash
echo .DS_Store >> ~/.gitignore_global
```

2，将这个全局的 .gitignore 文件加入Git的全局config文件中，执行命令：

```bash
git config --global core.excludesfile ~/.gitignore_global
```

哦了，. DS_Store 再也不会出现在你项目的Git代码仓库中了！
