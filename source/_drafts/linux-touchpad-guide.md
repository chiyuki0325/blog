---
title: "⬜ 在 Linux 下充分利用笔记本触控板"
date: 2022-12-06 18:19:31
tags: 
- Linux
- 笔记本
category: Arch折腾记
---

在之前的 [KDE 折腾技巧](/2022/10/24/my-kde-tricks-and-optimizations/) 那篇文章里，我就稍微提到过一点触控板，这次就专门写一篇指南，让你的触控板像 macOS 一样丝滑。

<!--more-->

> 本文属于笔记，比较杂乱，并且并不是最终稿，之后可能会加入新东西，请谅解。	
>
> 我使用 X11，不过 Wayland 也可以参考。

在 X11 下有两款触控驱动可以使用：**Synaptics** 和 **libinput**。

**Synaptics** 更老并停止维护，但拥有更多功能特性（比如惯性滚动）。其刷新率比 **libinput** 低一些。  
**libinput** 更新，和新的应用程序兼容得更好（比如在 Firefox 中就可以用手势前进后退），但它不支持惯性滚动。

如果两款驱动都安装了，KDE 会优先使用 **Synaptics**。我个人推荐使用 **libinput**。
