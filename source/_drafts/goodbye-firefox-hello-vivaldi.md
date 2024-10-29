---
title: "🦊 用了一年半的 Firefox，我最终又回到了 Chromium 系的怀抱"
date: 2023-08-13 12:06:37
tags:
- Firefox
category: 日常
cover: https://imgsrc.chyk.ink/7dd98d1001e9390193fc3c0f3dec54e736d19601.webp
---

Firefox 固然好用，但其性能和流畅度一直不如 Chromium，在 Chromium 最近更新了节省内存模式之后，Firefox 唯一的优势现在也不如 Chromium 了。于是在用了一年半的 Firefox 之后，我决定回归 Chromium 系的怀抱。

<!--more-->

我在开始用 Firefox 时便一直在使用 Tab Center Reborn 扩展，这是一个高度可自定义化的垂直标签栏扩展。主流的 Chromium 系浏览器，比如 Chromium (Chrome)、Brave 等的垂直标签栏都十分蹩脚，只有 Edge 的垂直标签栏差强人意，但 Edge 闭源并且过于臃肿，着实难用。

在对比了众多浏览器之后，我选择了 [Vivaldi](https://vivaldi.com)。Vivaldi 是由原 Opera 团队开发的开源浏览器，其和 Firefox 一样拥有出色的隐私保护功能和可自定义性。Vivaldi 不仅支持垂直标签栏，还有类似 Edge，但比 Edge 更好用的面板功能，也像 Firefox 一样可以用 CSS 自定义浏览器界面，还内置一个类似 Thunderbird 的邮件客户端。

{%image https://imgsrc.chyk.ink/a08b87d6277f9e2f4b13ad395930e924b899f3d9.webp 我简单配置的 Vivaldi %}

{%image https://imgsrc.chyk.ink/37d12f2eb9389b50f6cf5063c335e5dde7116ecb.webp Vivaldi 的面板 %}

在一番配置之后，我决定使用 Vivaldi 当作我的主力浏览器。但相比于我之前使用的 Firefox 方案，它仍有一些不足：

- 滚动条不美观。我用 Modern Scrollbar 扩展替换了原本的滚动条。

- Linux 上不支持触控板手势。我用 swipe-back 扩展解决了不能用触控板前进后退的问题，但仍然不能用触控板放大缩小。
- Linux 上不支持硬件加速视频解码。原版 Chromium 可以开启 VA-API，但 Vivaldi 不能开启。但根据我目前的使用体验，Chromium 的软件视频解码器仍然比 Firefox 使用核显解码视频要快很多。

最后，我希望 Firefox 继续优化其性能，打破 Chromium 一家独大的局面。
