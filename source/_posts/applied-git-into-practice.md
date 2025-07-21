---
title: 🎣 记两次简单的 Git 实际应用
date: 2024-12-06 08:50:22
tags: 
- Git
category: 编程
---

Git 是一个功能非常强大的版本管理系统，但我之前只会无脑 commit pull push。今年跟着学长学了一些 Git 知识之后，终于发掘出它更加强大的用法了。

本文记录最近两次我在实际学习生活中应用 Git 的经历。

<!--more-->

## 🍵 搭建 Git 服务器

由于国内糟糕的网络环境，GitHub 不能满足我的 ~~折腾~~ 实际使用需求了，于是我开始着手建立自己的 Git 服务器。

在众多 Git 服务器中我最终选择了 [Gitea](https://about.gitea.com/products/gitea/)，一款用 Go 编写的自托管 Git 服务。它的操作界面和我熟悉的 GitHub 很相似，并且部署起来非常的简单。

按照官网的[文档](https://docs.gitea.com/installation/install-with-docker)，我用 Docker 搭建起了 Gitea。真的很方便，不到一分钟就搭建好了。

在面板上添加管理员账号，设置网站信息之后，最终效果如图所示。

{%image https://imgsrc.chyk.ink/sCiji72pRqb5pv4N.webp %}

再使用 acme.sh 为其申请 HTTPS 证书，再使用 Caddy 反代，在路由器中添加端口映射，就这样，一个属于自己的 Git 服务就搭建好了。

## 🤒 一、检漏，止漏

由于现在我有两台电脑，所以在写一些不能提前公开内容的[博文](/2024/11/10/hackergame-2024/)时，如果我写一半，之后如果想转到另外一台设备继续写，就会非常的麻烦。

之前我在写 wp 时，是用的 U 盘在两台电脑间来回拷 ... 这显然过于糟心了。

现在我发现一种简单得多的办法 —— 使用两个远程仓库。

原有的 https://github.com/chiyuki0325/blog 继续作为公开仓库，再在自己的服务器上建立一个私有仓库 https://gitea.home.chyk.ink/chiyuki/blog 。

> 读者大可不必尝试访问 https://gitea.home.chyk.ink ，因为它在内网。（笑）
>
> Detects leaks, STOPS leaks.

把博客仓库克隆到本地后，输入 `git remote -vv`，结果如下：

```
origin	https://github.com/chiyuki0325/blog.git (fetch)
origin	https://github.com/chiyuki0325/blog.git (push)
```

现在来添加第二个私有远程仓库：

```bash
git remote add private https://gitea.home.chyk.ink/chiyuki/blog.git
git push private
```

此时再来 `git remote -vv` 就会发现多出了这个私有仓库：

```
origin	https://github.com/chiyuki0325/blog.git (fetch)
origin	https://github.com/chiyuki0325/blog.git (push)
private	https://gitea.home.chyk.ink/chiyuki/blog.git (fetch)
private	https://gitea.home.chyk.ink/chiyuki/blog.git (push)
```

在写一些可能会漏的内容时，可以在提交后直接把它推到 `private` 远程仓库。

```bash
git add source
git commit -m '[draft] Xxxxxxxxxx 2024 writeup with possible leaks'
git push private main
```

在另一台电脑 `git pull home main` 即可。

写完之后，把这几次提交用 `rebase` 功能合并为一个，直接推到 `origin` 远程，一气呵成。

```bash
git rebase -i HEAD~2
# 把之前的几个提交的 pick 改为 s
# :wq
# 输入提交信息
git push origin main
```

## 😋 二、真正的团队合作

临近期末，学校的程序设计基础（C 语言）课程要求提交一份以小组为单位的大作业。

在别的小组还在往自己的微信群里来回发 .txt / .c 文件 / 代码压缩包「加密通话」时，我已经在带着组员们用 GIt 了。考虑到大家都没接触过命令行，我直接强行推荐了 VSCode 作为开发工具，而不是用学校教的老旧的 Code::Blocks。VSCode 界面的左侧就有 Git 的图形化操作界面，非常的好上手。

在本文发布时，大作业项目已将近完成。回望和舍友挑灯夜战 Bug 的夜晚，再看着这个提交树，就感觉到非常的舒服和有成就感 —— 我们组的大作业从未在群里发过任何一个 .c 文件，全程使用 Git 完成版本管理和代码同步。

{%image https://imgsrc.chyk.ink/JjHU55WqKsuXoSHX.webp %}

期间倒是遇到过很多问题，比如 UTF-8 和 GBK 编码的转换，Windows 和 Linux 对于 sleep 的不同实现等，果然我还是需要锻炼啊！
