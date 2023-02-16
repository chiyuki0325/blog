---
title: 🔤 Noto Fonts 充满字体列表的解决方案
date: 2022-05-10 22:19:46
tags:
- Google
- 字体
category: Arch折腾记
---

近来我正为 Noto Sans XXX 和 Noto Serif XXX 充满各大软件的字体列表而苦恼，作为 Arch Linux 用户，当然就要想个办法来解决这个问题。

<!-- more -->

![](http://imgsrc.baidu.com/forum/pic/item/d01373f082025aaf3b88471cbeedab64024f1aaa.jpg)

![](http://imgsrc.baidu.com/forum/pic/item/b7003af33a87e95038a2cabb55385343faf2b4ab.jpg)

... 好吧，我不会写 fontconfig，不过还可以用一些土办法解决问题。

### 屏蔽 Noto Serif

Noto Serif CJK （思源宋体）我并不常用，于是就需要想个办法屏蔽掉。

于是我创建了一个 pacman 钩子，内容如下：

```ini
[Trigger]
Operation = Install
Operation = Upgrade
Type = Package
Target = noto-fonts-cjk
[Action]
When = PostTransaction
Exec = rename 'NotoSerif' '.NotoSerif' /usr/share/fonts/noto-cjk/NotoSerif*.ttc
```

大意就是在安装或更新 `noto-fonts-cjk` 软件包时隐藏所有 Noto Serif CJK 字体。

如果需要使用的时候，这些隐藏的字体还可以在 KDE 字体管理器里手动启用。

### 删除 Noto 小语种字体

首先，使用 AUR 中的 `noto-fonts-lite` 软件包来替换掉桌面环境依赖的 `noto-fonts` 。

这个包中只有拉丁字母、符号以及小部分欧洲字母，于是还需要一种「回落字体」负责小语种文字。

B 站 UP 主 [綿雲飴里](https://space.bilibili.com/273931293) 曾经制作过一款回落字体 Noto Unicode，只包含字形而不包含笔画、字重等信息，可以保证大部分小语种文字 **能显示**，但仅仅是能显示。

{% ghcard MY1L/Unicode %}

可以在本仓库的 release 中下载 Noto Unicode 字体。

但此字体的文字还是不全，为保证 **全部** 文字都可以正常显示，还可以安装 GNU Unifont（`ttf-unifont` `bdf-unifont`）来确保其它罕见文字得以显示。

### 效果展示

{% image http://imgsrc.baidu.com/forum/pic/item/d043ad4bd11373f01f7c5648e10f4bfbfaed04a1.jpg 清爽的字体列表www width:350px %}

{% image http://imgsrc.baidu.com/forum/pic/item/3801213fb80e7bec7a643a366a2eb9389a506bae.jpg 颜文字可以勉强渲染出来 width:200px %}

