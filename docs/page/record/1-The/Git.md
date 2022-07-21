# Git 实现本地库关联多个远程库

在国内使用码云（Gitee）进行项目管理，下载速度会快许多。但是，用Gitee又显得很小众，不主流。所以，如何实现GitHub，Gitee与本地仓库三者之间的同步管理呢？

## 关联远程库

1. 假设远程有一个仓库 `learn_git`,本地有一个`learn_git`的仓库（两个仓库可以不同名）

2. 将本地库关联远程库：`git remote add origin git@server-name:path/repo-name.git` "origin"是给这个远程库命名，可以是其他任意词，主要是为了方便记忆,如：

```powershell
 git remote add origin git@github.com:ajream/learn_git.git
```

3. 这样就关联了，接下来推送：

   - 第⼀次推送 `master` 分⽀的所有内容：`git push -u origin master`； #"-u"表示更新（update）远程库为orgin
   - 此后，每次本地提交后，只要有必要，就可以使⽤命令 `git push origin master` 推送最新修

## 关联多个远程库

在本地仓库执行`git remote -v`，可以查看当前本地仓库与远程仓库的关联信息，如下图所示：

![img](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202206201054266.png)

可以看到当前项目与远程名为origin的GitHub仓库相关联（两条信息）。

之前在学习git推送的时候，都是按照教程将远程名字起名为origin，当然在只有一个仓库的时候这个通俗易懂的名字没有任何问题。但是现在我们要同时同步Gitee和GitHub，为了区分Gitee和GitHub，我们将Gitee的远程仓库起名为Gitee，GitHub远程仓库起名为GitHub。

**具体操作如下：**

1. 在gitee和Github都分别创建一个仓库
2. 返回本地库，删除之前设置的名为origin的远程分支：`git remote rm origin`
3. 将本地库与2个远程库分别关联

```powershell
git remote add github git@github.com/learngit.git
git remote add gitee git@gitee.com:ajream/java_reflect.git
```
4. 执行`git remote -v` ，可以看到当前本地仓库同时和两个远程仓库都关联了，名字分别为github和gitee:
4. 将本地库推送到远程库的master分支：

```
git push github master
git push gitee master
```

再回到GitHub和Gitee，刷新页面，可以看到两个远程仓库和本地都已经同步。
