---
title: 📦 在 Arch Linux 上使用 Pamac 提示未找到软件包的解决办法
date: 2021-07-04 16:52:40
tags:
- ArchLinux
- Manjaro
- Linux
category: Arch折腾记
---

~~水一篇文章~~

Pamac是Manjaro自带的包管理器，既能图形化也能命令行，既可搜索仓库软件，也可搜索AUR软件，非常好用，但是我在Arch使用Pamac的时候，提示“未找到软件包”，也没法搜索东西。

其实这是yay搞的鬼。当输入yay -S pamac的时候，会安装“pamac-aur”，而这个包在Arch会有BUG，也无法搜索snap的软件，只需要卸载，然后安装“pamac-all”就行了。
