---
title: 🎺 NS 模拟器助手一百星了
date: 2022-05-22 17:31:09
tags:
- VB
- 模拟器
category: 其它
---

正如你所看到的，我所制作的 [🕹 NS 模拟器助手](https://tieba.baidu.com/p/7708487837) 在 [GitHub](https://github.com/YidaozhanYa/NSEmuHelper) 获得 100 颗星啦，感谢大家的支持！

本文就来说说我在编写 NS 模拟器助手时遇到的一些问题以及获得的经验。

<!-- more -->

如果你还不知道 NS 模拟器助手是什么，这里先简单介绍一下，NS 模拟器助手是一个 NS 模拟器 Yuzu / Ryujinx 的第三方安装 / 配置工具，可以在线更新 Yuzu / Ryujinx 模拟器和固件等。

{% ghcard YidaozhanYa/NSEmuHelper %}

{% image https://imgsrc.chyk.ink/3c6d55fbb2fb431663fdabad65a4462308f7d303.webp width:300px NS 模拟器助手第一版的主菜单，到现在还没怎么变化 %}



### NS 模拟器助手的由来

这件事说来话长。

#### 缘起

大家都知道，Yuzu 模拟器的版本更迭非常快，基本一天发布两三个版本，并且时不时就会在新版加入新功能和新特性。这时候作为重度玩家，我需要一种可以无脑快速更新 Yuzu 的工具。
当时我只会批处理，所以就编写了一个简单的更新小脚本。

{% image https://imgsrc.chyk.ink/0eb30f2442a7d933086e35a4e84bd11372f00127.webp 因为批处理的特性实在不太行，所以塞了一堆 exe wwwww %}

当时由于 FastGit 连接不太行的，并且批处理没有图形化，一堆人不会敲回车，所以这个脚本并没有多少人用。

#### Yuzu Tool

不久后，贴吧吧友 [@浅时光°Triste](https://tieba.baidu.com/home/main?id=tb.1.49499a8d.blf4ca32-Qw58GSaOp6ihg?t=1642557514&fr=pb) (当时的 ID 为 @Luminary0000) 制作了一款工具，名为 [Yuzu Tool](https://tieba.baidu.com/p/7482949878)，使用 Visual Basic .NET 语言编写，当时这个界面我一眼就心动了。后来 Yuzu Tool 经过多次迭代，但仍然不是很好用，很多都需要手动操作，并且是直接访问 GitHub，网络问题很严重。

{% image https://imgsrc.chyk.ink/91ef76c6a7efce1bfe3d181dea51f3deb58f65d7.webp Yuzu Tool %}

#### ......

因为我觉得 Yuzu Tool 并不是很好用，没用的功能也挺多（比如多版本共存，完全走错了方向），所以想制作一款更方便的工具。

因为当时受《SMBX》的吸引，正在学 Visual Basic 语言，所以就开始制作了，终于在做了一天之后，NS 模拟器助手 Beta 0.1 发布了。

当时正值 FastGit 被封锁，于是我用刚学的 shell 脚本和 GitHub Actions 制作了[自动同步镜像](https://github.com/YidaozhanYa/ActionsMirror)，每天定时同步几次最新版 Yuzu 和 Ryujinx 模拟器到阿里云盘，并且也会 ~~不定期手动~~ (现在是自动啦www) 同步固件。

#### Ryuzu Tool

那天我把模拟器助手的截图发到了 Yuzu Tool 的群中，浅时光大受震撼，当场宣布 Yuzu Tool 停更，并开始制作新的工具 [Ryuzu Tool](https://tieba.baidu.com/p/7723977771)。在重制并且使用我的下载源之后，工具质量提高了很多。

不过 ... 既然开坑了，NS 模拟器助手还是要继续做下去的！

### 在编写过程中遇到的几个大问题

首先是资料缺乏。Visual Basic **（不带 .NET）** 语言年久失修，现在也很冷门，虽然有很多人学习，但也只是为了考二级浅尝辄止。所以作为彻头彻尾的编程萌新，为了编写出这款工具，我在 VBForums 等网站上搜索了很多教程和示例代码，但仍然碰头了好几次。

#### 网络问题

因为曾经的域名 yidaozhan.gq 遭受严重的 DNS 污染，导致很多人无法访问，后续增添了几个下载镜像解决。本工具使用的 Vercel、Heroku 等云函数平台在各个地区也被不同程度封锁，所以访问依然有困难。

在此感谢 [池塘](https://www.chitang.tech) ~~姐姐~~ 送我的服务器，一定程度上缓解了下载问题。

#### 解压问题

一开始我使用的是 [VszLib](https://github.com/wqweto/VszLib) 解压库，在安装 Ryujinx 模拟器的时候需要解压大量文件，所以总会漏掉几个文件（COM 的性能还是不行啊！）。当时我还以为是文件复制出了问题，然后反复更换安装方式，从 `FileCopy` 到 `FileSystemObject`，甚至直接用了 cmd 命令，还是不行，最后排查出是解压问题，更换 `7z.exe` 后解决。~~shell yyds！~~

#### Windows 7 兼容

虽说 VB 是自 Windows 98 以来就存在的远古语言，但它在 Windows 7 上的兼容性依然很糟。比如图标问题，在没有 KB 补丁的 Win7 上使用非 72*72 的图标时，会报错 Unexpected Error 莫名其妙地崩溃，这个错误我一直没能复现，后来在 VBForums 上发现了解决方法。还有字体，在没有 SP1 补丁的 Windows 7 上界面字体会莫名变成宋体，这个一直没修复。除此之外，还有各种玄学问题，这里不一一列举。

**~~你都能带动 NS 模拟器了，不能换个 Win10 嘛？~~**

### 1.2.1 版本的新界面

在 1.2.1 时，我曾经花费大量精力用 YFUI 控件库重做了界面，做完后效果很好，感觉就像在用 WinUI3 应用一样。但这个控件库在 Win7 和 Win11 上都有莫名其妙的兼容问题（比如标题栏一直闪烁），之后弃用这套新界面改回 Win32 自带控件。

### 关于 Ryujinx 汉化版的移除

Ryujinx 在最近的 release 中合入了 AvaloniaUI 分支（Ava 版），为了合入这个分支，开发团队改动了很多代码中的字符串，导致又得重新汉化，并且正好开学了，我也没有精力维护了，就看看别人能不能维护吧！

据我所知除非开发者手动修改，否则 AvaloniaUI 不能显示中文字体 {% sub 至少在 Linux 上如此，Windows 不知道 %}，所以 Ava 版也不能汉化。

### 关于注册表

我本人是很讨厌注册表的，所以把设置选项写在了配置文件里，不过为了方便从 Yuzu Tool 过渡，还是开了个工程用来迁移。

### 未来的发展路线

未来嘛 ... 停更也说不定。因为今天我看见一款软件「[51Switch](https://www.51switch.cn)」，感觉比我的工具和 Ryuzu Tool 更人性化，所以不一定做得下去了，不过说不定哪天有灵感就更新了呢～ {% psw 欸嘿～ %}

并且 NS 模拟器助手的下载源违反了阿里云盘的使用协议，说不定哪天就挂了，希望能坚持得久一点吧！

