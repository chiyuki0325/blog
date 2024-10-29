---
title: ⌚ 在小米手环 9 上安装第三方 rpk 快应用
date: 2024-08-05 23:19:32
tags:
- 小米
- 小米手环
cover: https://imgsrc.chyk.ink/08f790529822720e098823da3dcb0a46f21fab48.webp
---

昨天购入了小米手环 9，因为是第一次使用这种智能穿戴设备，因此倍感新奇，自然是要进行一番折腾。

<!--more-->

{%ablock color:red ⚠️ 注意%}

安装第三方快应用具有一定风险，请做好应用未按预期工作的心理准备。

此方法来源于网络，感谢模块开发者的贡献。

此操作需要一部 root 后的安卓手机。如果你未 root，也可以尝试 LSPatch 等方案。

{%endablock%}

### 📥 安装国际版小米运动健康

需要先在 [Google Play 商店](https://play.google.com/store/apps/details?id=com.xiaomi.wearable) 安装国际版的小米运动健康（版本号末带 i）。

如果你没有 Play 商店，或此方法已经被官方在新版本修复，可以在 [APKMirror](https://www.apkmirror.com/apk/xiaomi-inc/mi-health/mi-health-3-30-1-release/) 下载 3.30.1i 版本。

如果已经安装了国内版本，需要先卸载。

### 🛠️ 安装 Xposed 模块

使用 Android Studio 编译 [Wearable Debug](https://github.com/A5245/Wearable-Debug) 模块并安装到你的手机上。

如果不方便编译，可以[下载我编译好的版本](https://file.chyk.ink/%E5%AE%89%E5%8D%93%E8%BD%AF%E4%BB%B6/Wearable%20Debug.apk)（为文章发布当天的版本，不含签名，请自行签名）。

### 👀 查看包名

将欲安装的 rpk 包当作 zip 解压，`manifest.json` 中 `package` 键的值即为包名。

### 🛠️ 安装 apk

打开挂载了模块的国际版小米运动健康，进入关于 - 用户协议，在弹出的子菜单中选择 App，输入包名即可安装。

要卸载的话，输入相同包名并点击卸载即可。
