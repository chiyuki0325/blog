---
title: '🪧 使用 TF 卡扩展安卓 6 以下手机的存储空间 —— Link2SD 不完全使用指北'
date: 2024-05-19 06:41:26
tags:
- 安卓
category: 其它
cover: https://imgsrc.chyk.ink/6a63f6246b600c33e5794af55c4c510fd9f9a18f.webp
---

安卓在 6.0 版本加入了 [Adoptable Storage](https://source.android.com/docs/core/storage/adoptable?hl=zh-cn) 功能，也就是通常所说的融卡。但如果你有一台运行着安卓 5，同时内部存储空间又小得可怜的设备，该怎么扩展它的存储空间，以安装更多 App 呢？这就要请出本文的主角 —— 上古神器 [Link2SD](https://play.google.com/store/apps/details?id=com.buak.Link2SD&hl=zh&gl=US) 了。

<!--more-->

{%ablock 注意%}

此操作可能需要一张规格较高的 TF 卡。如果你的 TF 卡速度很慢，那么使用体验将会卡到无法接受。

{%endablock%}

### 🍴 前置条件

Link2SD 需要 root 权限，不过旧版本安卓都可以用一些所谓的一键 root 工具获取权限，很多第三方 ROM 也都内置了 SuperSU。

### 🧮 分区

首先用读卡器把 TF 卡连接上电脑，然后使用任意分区工具创建两个**主分区**，一个使用 FAT32 文件系统，用来存放自己的文件，当作常规外接存储使用，一个使用 Ext3 文件系统，用来放置迁移后的 App。

至于为什么不是 Ext4？因为 Link2SD 这软件真的太古老了，根本不支持 Ext4。

注意，这里要使用**主分区**（Primary），一定不要使用**逻辑分区**（Logical）。

### 🔧 移动 App 包体

安装 Link2SD 后，在选择 TF 卡文件系统时选择 Ext3，之后它将会挂载 TF 卡并重启。之后就可以在 Link2SD 的界面中把一部分「国产 3A 大作」的包体移动到 TF 卡上了。

### **🔧 移动 App 数据**

这里需要用到 MT 管理器。

某些「国产 3A 大作」不仅 apk 包体很大，数据也奇大无比，如果不移动数据的话，存储空间根本不够用。

首先确保该 App 没有在运行，之后使用 MT 管理器，左屏打开 `/data/data` 文件夹，之后找到一款「3A 大作」的数据目录（比如 `com.tencent.mm`）；右屏打开 `/data/sdext2` 文件夹，这就是 Link2SD 挂载的 Ext3 分区。

找到该 App 数据中占用大的文件夹（如 `MicroMsg`），长按选择「移动」到右屏，之后再长按右屏移动好的文件夹，选择「链接」到左屏。这个肥硕的文件夹就被成功移动到 TF 卡上了。

### 🛤️ 总结

鉴于[老设备极其痛苦的使用体验](/2023/09/17/redmi-1s4g-notes/)，我觉得如果有条件的话，还是买台阳间的新手机更合适。
