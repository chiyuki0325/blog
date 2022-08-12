---
title: 🍷 让 Wine 应用程序 (exe) 在文件管理器中显示图标
date: 2021-12-12 21:00:26
tags:
- Linux
- Wine
category: Arch折腾记
---

我使用 KDE 桌面，文件管理器是 Dolphin，支持预览部分文件内容，包括 Wine exe/ocx/lnk 图标。

本文讲一讲配置方法。

① 安装 `wine-staging` 包，这个包中包含了某些主线版没有的新特性，其中就包括图标预览。

② 安装 `icoutils` 包。

③ 在 Dolphin 的设置中开启 `Microsoft Windows 可执行文件` 和 `Microsoft Windows 图像` 的预览。

🎉 大功告成！
