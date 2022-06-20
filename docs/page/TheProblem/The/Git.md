# Git 实现本地库关联多个远程库

在国内使用码云（Gitee）进行项目管理，下载速度会快许多。但是，用Gitee又显得很小众，不主流。所以，如何实现GitHub，Gitee与本地仓库三者之间的同步管理呢？

## 关联远程库

1. 假设远程有一个仓库 `learn_git`,本地有一个`learn_git`的仓库（两个仓库可以不同名）

2. 将本地库关联远程库：`git remote add origin git@server-name:path/repo-name.git` "origin"是给这个远程库命名，可以是其他任意词，主要是为了方便记忆,如：

   - ```
      git remote add origin git@github.com:ajream/learn_git.gi
     ```

3. 这样就关联了，接下来推送：

   - 第⼀次推送 `master` 分⽀的所有内容：`git push -u origin master`； #"-u"表示更新（update）远程库为orgin
   - 此后，每次本地提交后，只要有必要，就可以使⽤命令 `git push origin master` 推送最新修

## 关联多个远程库

在本地仓库执行`git remote -v`，可以查看当前本地仓库与远程仓库的关联信息，如下图所示：

