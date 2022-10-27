---
title: '⚙️ 我在使用 KDE 过程中的技巧 / 优化方案'
date: 2022-10-24 12:09:36
tags:
- KDE
- Linux
category: Arch折腾记
cover: 'https://imgsrc.baidu.com/super/pic/item/91529822720e0cf36ffd383a4f46f21fbf09aaed.jpg'
---

KDE Plasma 桌面之所以有如此高的用户量，很大程度上在于它的高自定义性。本文就记载一些我在使用过程中的小技巧 / 优化方案。但如果已经是烂大街的修复技巧，我就不记载了。

> 本文属于笔记，比较杂乱，并且并不是最终稿，之后可能会加入新东西，请谅解。	

<!--more-->

### ⚙️ 版本

截止本文写成时，Arch Linux 上 KDE Plasma 的最新版本是 5.26.1。

由于 KDE Plasma 5.26 (KWin 5.25.90) 做出了大量破坏性改动，所以不是很稳定。在 Arch Linux 这种不方便降级整个Plasma 的滚动发行版上，可以在这个版本内，把 KWin 单独降级回 5.25.5。

### 📂 文件选择器

相比 GNOME，KDE 的文件选择器可以说是 ~~百花齐放，百家争鸣~~，各种文件选择器都有，并且也存在各种 bug，此段记载怎么修复。

**✳️ Qt6**

Qt 6 的文件选择器在我的 KDE 上卡到离谱，受影响的软件有 Telegram Desktop、OBS、Dolphin 模拟器等，在它们中选择文件时，每半分钟才响应一下，并且也不跟系统主题。此时可以用 XDG desktop portal 中文件选择器的 Qt 5 后端来替代之。

```bash
sudo pacman -S xdg-desktop-portal xdg-desktop-portal-kde --needed  # 安装 XDG desktop portal 及其 Qt 5 后端
```

安装好后，可以在对应程序的 desktop 文件 `Exec=` 行开头加上 `/usr/bin/env QT_QPA_PLATFORMTHEME=xdgdesktopportal`，也可以把 `export QT_QPA_PLATFORMTHEME="xdgdesktopportal"` 写入到环境变量 profile 中以使其全局生效。

**❇️ Qt5**

在更新 KDE Plasma 5.25 后我遇到了一个 bug：Qt 5 的文件选择器需要大概半分钟才能打开，并且还可能崩掉对应的软件。按照 [这个帖子](https://bbs.archlinux.org/viewtopic.php?id=279464) 的解决方法，删除 `$HOME/.config/QtProject.conf` 和 `$HOME/.config/QtProject.conf.lock` 即可解决。

**🦊 Firefox**

在 `about:config` 中，把 `widget.use-xdg-desktop-portal.file-picker` 更改为 `1` 即可使用 XDG desktop portal 的文件选择器。

{% image https://imgsrc.baidu.com/super/pic/item/b17eca8065380cd77382d52ce444ad3458828157.jpg %}

当然也可以像我这样，打开全部相关的选项，让风格更统一。

**🎨 Kvantum 兼容**

做上述配置后，需要在 Kvantum 的排除窗口列表中加入 `xdg-desktop-portal-kde,xdg-desktop-portal,xdg-document-portal`，否则文件选择器会变为半透明，在背景灰化时很难看。

### 🪟 毛玻璃

KWin 的混成器也可以给非 Qt 应用程序加上毛玻璃效果。

**🪟 单独开启**

使用 `xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -set _KDE_NET_WM_BLUR_BEHIND_REGION 0` 命令就可以单独给指定窗口开启毛玻璃效果。

**🔧 使用插件**

在 系统设置 - 窗口管理 - KWin 脚本 中下载 **Force Blur** 脚本并开启，把想要模糊的窗口加进去，即可自动给特定窗口开启模糊效果。

{% image https://imgsrc.baidu.com/super/pic/item/11385343fbf2b2114854f48f8f8065380dd78efd.jpg width:500 %}

**🪟 效果展示**

{% image https://imgsrc.baidu.com/super/pic/item/203fb80e7bec54e7ced56cdffc389b504fc26a32.jpg 带背景模糊的 Alacritty %}

{% image https://imgsrc.baidu.com/super/pic/item/42a98226cffc1e17f38bfaf00f90f603738de93f.jpg 带背景模糊的 GTK 程序，需要主题支持 Blur Me %}

### 💥 「黑窗口」崩溃

在 KDE Plasma 5.26 之后，经常会出现一个通知或窗口变全黑，紧接着整个桌面环境崩掉的情况。在这种时候，可以把彻底杀死并重启 plasmashell 和 KWin 的命令绑定到快捷键上，当出现崩溃前兆（如菜单和通知开始黑掉，Latte Dock 开始闪烁）时，及时按下快捷键重启它们即可。

附上脚本：

```bash
#!/bin/bash
killall plasmashell
killall kwin_x11
plasmashell --replace &
kwin_x11 --replace &
```

如果已经崩溃了，不要强制关机，按下 Ctrl+S 或 F12 之类的快捷键保存未保存的工作（此时部分键盘快捷键还是能用的），之后使用 SysRq 关机或切到其它 tty `reboot` 即可。

### 🔘 圆角

GNOME 有一个第三方的爆改窗口管理器 `mutter-rounded`，可以在窗口管理器层面实现圆角，非常流畅。KDE 可以通过窗口装饰勉强实现圆角，但还是不完美，且会有灰色的阴影方角「Korners」bug。不过通过 LightlyShaders 桌面特效，可以实现和 macOS 类似的圆角效果。

LightlyShaders 仓库地址： https://github.com/a-parhom/LightlyShaders ，按照 README 中的说明安装即可。

LightlyShaders 目前有两个分支：master 和 v2.0。
master 分支适用于 KWin 5.25.5 及其之前的版本，实现方法是在窗口上「糊上」圆角，比较吃资源，不过也不像 README 写得那么离谱，Intel 超核芯显卡就可以流畅带动。master 分支画出来的圆角清晰流畅，已经和 macOS 差不多了。
v2.0 分支是用 5.25.90 新引入的特性完全重构的，所以不适用于旧版 KWin。此分支性能消耗更小，但存在 bug，还需等待后续更新。并且 v2.0 分支还需要配合兼容的窗口装饰（如 `SierraBreezeEnhanced`）使用。
根据 KWin 版本选择即可。

可以在 `lightlyshaders.cpp` 中自定义要排除的窗口。建议把 Wine 应用和部分离谱窗口（比如网易云音乐的桌面歌词）加入其中。

我个人建议降级 KWin，使用 master 分支。

**🪟 效果展示**

{% image https://imgsrc.baidu.com/super/pic/item/f2deb48f8c5494eefc6f79d868f5e0fe98257ea5.jpg README 中的图片 %}

### 🐭 触控板和触摸屏

在 KDE Plasma X11 下有两款触控驱动可以使用：Synaptics 和 libinput。

Synaptics 更老并停止维护，但拥有更多功能特性（比如惯性滚动）。其刷新率比 libinput 低一些。

libinput 更新，和新的应用程序适配得更好（比如在 Firefox 中就可以用手势前进后退），但它不支持惯性滚动。

如果两款驱动都安装了，KDE 会优先使用 Synaptics。我个人推荐使用 libinput，所以并没有安装。

### 🌚 夜间模式

KDE Plasma 并没有统一的夜间模式实现。但如果装了某款主题的对应深色和浅色变种，切换起来就容易得多。

如果像我一样懒，可以写个脚本实现一键切换夜间模式。（壁纸还得自己切换 ww）

**此脚本需要系统中装有 Python 和 PyQt5。**

```bash
#!/bin/bash

# $HOME/.local/bin/dark-theme-switch
# By YidaozhanYa

LIGHT_KVANTUM_THEME="Fluent-round"  # 亮色 Kvantum 主题
DARK_KVANTUM_THEME="Fluent-roundDark"  # 暗色 Kvantum 主题
LIGHT_GTK_THEME="Fluent-round-Light"  # 亮色 GTK2/3 主题
DARK_GTK_THEME="Fluent-round-Dark"  # 暗色 GTK2/3 主题
LIGHT_GTK4_THEME="Fluent-round-Light"  # 亮色 GTK4 主题
DARK_GTK4_THEME="Fluent-round-Dark"  # 暗色 GTK4 主题
LIGHT_COLOR_SCHEME="FluentLight"  # 亮色配色方案
DARK_COLOR_SCHEME="FluentDark"  # 暗色配色方案
DARK_ICON_THEME="Win10Sur-dark"  # 暗色图标主题
LIGHT_ICON_THEME="Win10Sur"   # 暗色图标主题

CURRENT_KVANTUM_THEME="$(kreadconfig5 --group "General" --file "$XDG_CONFIG_HOME/Kvantum/kvantum.kvconfig" --key "theme")"

if [ "$CURRENT_KVANTUM_THEME" == "$LIGHT_KVANTUM_THEME" ]; then
    plasma-apply-colorscheme "$DARK_COLOR_SCHEME"
    /usr/lib/plasma-changeicons "$DARK_ICON_THEME"
    gsettings set org.gnome.desktop.interface gtk-theme "$DARK_GTK_THEME"
    gsettings set org.gnome.desktop.interface color-scheme "prefer-dark"
    cp "$HOME/.themes/$DARK_GTK4_SCHEME/gtk-4.0/gtk.css" "$XDG_CONFIG_HOME/gtk-4.0/gtk.css"
    kvantummanager --set "$DARK_KVANTUM_THEME"
else
    plasma-apply-colorscheme "$LIGHT_COLOR_SCHEME"
    /usr/lib/plasma-changeicons "$LIGHT_ICON_THEME"
    gsettings set org.gnome.desktop.interface gtk-theme "$LIGHT_GTK_THEME"
    gsettings set org.gnome.desktop.interface color-scheme "prefer-light"
    cp "$HOME/.themes/$LIGHT_GTK4_THEME/gtk-4.0/gtk.css" "$XDG_CONFIG_HOME/gtk-4.0/gtk.css"
    kvantummanager --set "$LIGHT_KVANTUM_THEME"
fi

python -c 'from PyQt5 import QtDBus as qd; StyleChanged = 2; SETTINGS_STYLE = 7; message: qd.QDBusMessage = qd.QDBusMessage.createSignal("/KGlobalSettings", "org.kde.KGlobalSettings","notifyChange"); message.setArguments({StyleChanged, SETTINGS_STYLE}); qd.QDBusConnection.sessionBus().send(message)'  # 重新加载 Qt Widgets 主题
qdbus org.kde.KWin /KWin reconfigure  # 重新加载 KWin
latte-dock --replace &  # 重新加载 Latte Dock
```

{% image https://imgsrc.baidu.com/super/pic/item/d000baa1cd11728b798afae38dfcc3cec2fd2c4f.jpg 日间 %}

{% image https://imgsrc.baidu.com/super/pic/item/8d5494eef01f3a29236aa30fdc25bc315d607c54.jpg 夜间 %}

### 🔠 fcitx5 集成

在新版中，fcitx5 可以使用 KDE Plasma 的主题，这样就可以不那么违和了。

{% image https://imgsrc.baidu.com/super/pic/item/4e4a20a4462309f724fddbd3370e0cf3d6cad665.jpg width:500 %}

在 配置附加组件 - 经典用户界面 中把主题改为 KDE Plasma 即可。

### ↩️ 配置文件重定向

在环境变量中加入 `export KDEHOME="${XDG_CONFIG_HOME}/.kde4"` 即可把 `~/.kde` 和 `~/.kde4` 重定向到 `~/.config/kde4`。

### 🕰️更高级的日历时钟

可以使用 Event Calendar 小部件替换掉原本的数字时钟。

Event Calendar 支持单行显示，并且有丰富的配置选项和快捷操作，还可以显示天气。

{% image https://imgsrc.baidu.com/super/pic/item/b812c8fcc3cec3fdbe4ad6b49388d43f869427fe.jpg %}

{% image https://imgsrc.baidu.com/super/pic/item/cdbf6c81800a19d89f7bf5c476fa828ba71e46f2.jpg width:550 %}

### 🎨 我使用的第三方主题和插件

全局主题：`Fluent-round`
应用程序风格：`kvantum`（Kvantum 主题：`Fluent-round`）
Plasma 视觉风格：`Fluent-round`
窗口装饰元素：`SierraBreezeEnhanced`
配色方案：`FluentLight`
字体：`HarmonyOS Sans SC` 11pt
图标主题：`Win10Sur`
光标：`Future-cyan Cursors`
欢迎屏幕：`Arch`

桌面特效：`Fading Popupsp Kinetic`、`LightlyShaders`、`Maximize Kinetic`、`Sliding tooltips`、`Scale OutExpo`、`Open/Close Kinetic`

KWin 脚本：`Force Blur`、`KDE Snap Assist`
