---
title: ⚙️ 我在使用 KDE Plasma 6 过程中的拓荒经验
date: 2024-05-03 14:58:47
tags:
- KDE
- Linux
category: Arch折腾记
cover: https://imgsrc.baidu.com/forum/pic/item/d1a20cf431adcbef5d31493beaaf2edda3cc9f81.jpg
---

随着今年二月份 KDE Plasma 6 大版本的更新，基础框架更新到了 Qt 6，默认图形环境也变为了 Wayland，之前在 KDE 5 上的一些技巧和优化方案已经不再管用，因此本文就记载一些我在 KDE Plasma 6 刚推出几个月内，进行「拓荒」的经验。

<!--more-->

{%ablock ⚠️ 请注意%}

- 本文写作时 KDE Plasma 的最新版本为 6.0.4，因此当你阅读此文时，其中的部分信息**很可能已经过时**。
- 目前 KDE Plasma 6 仍然处于早期版本，其仍然会继续更新，所以随着未来的更新，本文中的一些小修复可能就不需要了。
- 查阅本文时请注意[蓝字]()。
- 下文将会用 KDE 代指 KDE Plasma。

{%endablock%}

### 🛤️ Wayland

KDE 6 的默认图形环境变为了 Wayland，Wayland 的底层设计逻辑和 X11 大为不同，并且其权限管控很严格。  
在此我简略列出几点我想到的、需要手动进行更改的不同点：

🆎 Fcitx 5 输入法的启用方式发生了变化，现在不需要再设置繁多的环境变量，只需要设定一个 `XMODIFIERS` 即可。具体设置请参阅 [Fcitx 5 Wiki](https://fcitx-im.org/wiki/Using_Fcitx_5_on_Wayland#KDE_Plasma)。

但需要注意的是：这里的设置方法对部分运行在 XWayland 下的 X11 专有软件（比如 WPS Office 和一些 Wine 软件）的输入法无效，需要给它们单独设置 `QT_IM_MODULE` 等环境变量。

🔧 Wayland 无法读取 `.xprofile` 文件内的环境变量，因此需要把环境变量写在 `~/.config/environment.d` 中的任意 `.conf` 文件。

🔧 包括 `xprop`、`xdotool` 以及 `wmctrl` 在内的很多管理窗口的实用程序都已经不再可用，现在需要使用 KWin 自带的脚本功能。如果有需求的话，还可以在脚本内使用 DBus 与外部程序沟通。

关于 KWin 脚本，请参阅以下文档：

- [KWin 脚本教程（英文）](https://develop.kde.org/docs/plasma/kwin/)

- [KWin 脚本 API（英文）](https://develop.kde.org/docs/plasma/kwin/api/)

📹 截图和录屏方式发生了变化。不过主流的截图工具（如 Spectacle、火焰截图）以及录屏工具（如 OBS Studio）都已经支持了 Wayland。但是 KDE 自带的屏幕取色器 KColorChooser 截至目前版本仍然无法正常使用，可以使用截图工具的取色功能解决。

### ✳️ Qt 6 以及主题变化

KDE 6 基于 Qt 6 框架编写，所以 Kvantum 之类的主题工具都需要更换为 Qt 6 版本。

Arch Linux 官方软件仓库中的 `kvantum` 软件包会吃掉所有的毛玻璃效果，目前我安装了 AUR 的 `kvantum-git` 和 `kvantum-qt5-git` 两个软件包，这两个包安装后，Qt 6 和 Qt 5 软件的主题就都会正常生效。

另外，KDE 6 中对第三方图标主题的处理方式也发生了较大变化，比如 Plasma Shell 不再从 Plasma 主题中读取图标（你可能会发现任务栏托盘区的图标各种抽风）。如果图标主题的开发者没有及时适配，那你只能参考[这篇 KDE 开发者的博客](https://pointieststick.com/2023/08/12/how-all-this-icon-stuff-is-going-to-work-in-plasma-6/)自行适配解决了。

### 📂 文件选择器

**✳️ Qt6 和 XDG Desktop Portal**

如果遇到了 Qt 6 软件的文件选择器奇卡无比的问题，可以通过设置如下配置文件解决：

```ini ~/.config/systemd/user/plasma-xdg-desktop-portal-kde.service.d/override.conf
[Service]
Environment="QT_QPA_PLATFORMTHEME=KDE"
```

{%ablock%}

🪃 请注意：如果你之前参照过我 KDE 5 的那篇文章设置过`QT_QPA_PLATFORMTHEME` 变量和 `/usr/bin/killall xdg-desktop-portal-kde` 开机自启脚本，那么真的很抱歉，到了 KDE 6，这个配置踩了一个大坑。你需要把这两个配置全部删除。

{%endablock%}

**👣 GNOME / GTK**

在 Wayland 下，仍然可以使用 `GTK_USE_PORTAL` 来让 GTK 跟随 XDG Desktop Portal 文件选择器，但是一旦这样设置了，你的鼠标指针就会变成默认主题并且奇大无比。目前除了 Firefox 提供了[配置选项](/2022/10/24/my-kde-tricks-and-optimizations/#%F0%9F%93%82-%E6%96%87%E4%BB%B6%E9%80%89%E6%8B%A9%E5%99%A8)之外，其它的大部分 GTK / Electron 软件都只能用 GTK 文件选择器了。

### 🪟 窗口圆角和毛玻璃

窗口圆角插件 [LightlyShaders](https://github.com/a-parhom/LightlyShaders) 在 KDE 6 下仍然可用，编译安装 `plasma6` 分支即可。

为了给 Alacritty 之类本身并不支持 KDE 毛玻璃效果的窗口应用毛玻璃，在 KDE 5 时需要使用 Force Blur 脚本。但它由于使用了 `xprop` ，在 Wayland 下并不能用。不过可以安装 [kwin-effects-forceblur](https://github.com/taj-ny/kwin-effects-forceblur) 解决，它直接魔改了 KDE 自带的**窗口背景虚化**特效，加入了给指定窗口强行应用毛玻璃的功能。

安装 kwin-effects-forceblur 后你必须 **禁用** KDE 自带的 **窗口背景虚化** 和 LightlyShaders 的 **窗口背景虚化 (LightlyShaders)** 。

{%image https://imgsrc.baidu.com/forum/pic/item/a5c27d1ed21b0ef4974aaf639bc451da81cb3e68.png 应用了这两个效果之后的窗口 %}

### ❄️ 重启桌面

KDE 6 中可能仍然有什么东西在漏内存，用久了可能会发生严重卡顿，但 Wayland 下的窗口管理器和混成器是一体的，并且在重启窗口管理器后，非 Qt 6 的软件都会被杀掉。

据 Arch Linux CN 群友的说法，各大框架已经在积极适配，但目前只有 Qt 6 适配良好，不会被杀掉。

可以使用 `qdbus org.kde.KWin /KWin replace` 来重启窗口管理器。

### 🌚 夜间模式

如果使用自带的微风主题，那么 KDE 6 下的夜间模式体验特别良好。

如果使用第三方主题，可以使用[阴阳](https://github.com/oskarsh/Yin-Yang)切换夜间模式，或者参考[我的实现](https://github.com/chiyuki0325/KDEQuickSwitches/blob/main/switches/dark.py)自行编写脚本。

{%image https://imgsrc.baidu.com/forum/pic/item/50da81cb39dbb6fdc1cbd21b4f24ab18972b377e.jpg KDE 6 的夜间模式开关 %}

### 🤞 触控板手势

KDE 6 中硬编码了几个触控板手势，正常无法修改。

可以打上我的 [kwin-without-gestures](https://github.com/chiyuki0325/arch-packages/tree/main/kwin-without-gestures) 补丁编译安装 KWin 以禁用掉 KDE 原本的手势，之后使用 libinput-gestures，touchegg 等工具设置自己的手势。至于使用哪款工具就看个人习惯的手感了。

touchegg 在 X11 下支持给不同软件设置不同的手势，但在 Wayland 下不支持。可以自己编写程序，比如参考我的实现。

<center>{%ghcard chiyuki0325/gestures_helper %}</center>

### 🧮 Dock 和小组件

Latte Dock 不能在 KDE 6 上使用。不过，KDE 6 的面板经过一番配置也能达到类似 Latte Dock 的效果。

可以安装这款小组件实现对面板的自定义配置。

<center>{%ghcard luisbocanegra/plasma-panel-colorizer %}</center>

在本文编写时，KDE 6 的小组件生态并不丰富，很多老牌的小组件都没有移植到 KDE 6 上。所以为了保持原本的桌面布局和使用习惯，我只能自己学习并编写了几个小组件。

我很期待 KDE 6 日后发展起来的，像 KDE 5 一样欣欣向荣的小组件生态。

### 🖼️ 我的截图

{%image https://imgsrc.baidu.com/forum/pic/item/08f790529822720efb30d5c73dcb0a46f21fab15.jpg 壁纸：<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2239430876">璃月港</a> %}

{%image https://imgsrc.baidu.com/forum/pic/item/ae51f3deb48f8c54df2cf2127c292df5e0fe7f0b.jpg 壁纸：<a href="https://www.pixiv.net/artworks/68686407">星星坠落的傍晚</a>%}
