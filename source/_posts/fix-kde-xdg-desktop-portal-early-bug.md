---
title: 🔧 修复 KDE 5 xdg-desktop-portal 过早启动的 bug
date: 2023-12-17 22:42:20
tags:
  - Linux
  - KDE
category: Arch折腾记
---

最近我在使用 KDE 的过程中遇到了一个问题：开机时 `xdg-dekstop-portal-kde` 未被正确启动，导致文件选择器出不来，Qt 应用也不会热响应夜间模式切换。Arch Linux CN 群友究其原因才发现是因为 `kapplymousetheme` 导致了 `xdg-dekstop-portal` 在不带 `xdg-desktop-portal-kde` 的时候过早启动导致。下文给出临时修复方案，到 KDE 6 时这个 bug 应该会被修好的。

<!--more-->

将下文内容写入 `/usr/loca/bin/kapplymousetheme`：

```bash
#!/bin/bash
bash -c 'sleep 1s; exec env QT_NO_XDG_DESKTOP_PORTAL=1 /usr/bin/kapplymousetheme '"$@"'' &
```

之后给这个文件以可执行权限即可，
