---
title: '⚙️ 我在使用 KDE 过程中的技巧 / 优化方案'
date: 2022-10-24 12:09:36
tags:
- KDE
- Linux
category: Arch折腾记
cover: 'https://imgsrc.baidu.com/forum/pic/item/91529822720e0cf36ffd383a4f46f21fbf09aaed.jpg'
---

KDE Plasma 桌面之所以有如此高的用户量，很大程度上在于它的高自定义性。本文就记载一些我在使用过程中的小技巧 / 优化方案。但如果已经是烂大街的修复技巧，我就不记载了。

> 本文属于笔记，比较杂乱，并且并不是最终稿，之后可能会加入新东西，请谅解。	

<!--more-->

### ⚙️ 版本

截止本文最后更改时，Arch Linux 上 KDE Plasma 的最新版本是 5.26.2。

### 📂 文件选择器

相比 GNOME，KDE 的文件选择器可以说是 ~~百花齐放，百家争鸣~~，各种文件选择器都有，并且也存在各种 bug，此段记载怎么修复。

**✳️ Qt6**

Qt 6 的文件选择器在我的 KDE 上卡到离谱，受影响的软件有 Telegram Desktop、OBS、Dolphin 模拟器等。其文件选择器每半分钟才响应一下，并且也不跟系统主题。此时可以用 **XDG desktop portal** 中文件选择器的 Qt 5 后端来替代之。

```bash
sudo pacman -S xdg-desktop-portal xdg-desktop-portal-kde --needed  # 安装 XDG desktop portal 及其 Qt 5 后端
```

安装好后，可以在对应程序的 desktop 文件 `Exec=` 行开头加上 `/usr/bin/env QT_QPA_PLATFORMTHEME=xdgdesktopportal`，也可以把 `export QT_QPA_PLATFORMTHEME="xdgdesktopportal"` 写入到环境变量 profile 中以使其全局生效（同时也作用于其它 Qt 5 文件选择器）。

**🦊 Firefox**

在 `about:config` 中，把 `widget.use-xdg-desktop-portal.file-picker` 更改为 `1` 即可使用 **XDG desktop portal** 的文件选择器。

{% image https://imgsrc.baidu.com/forum/pic/item/b17eca8065380cd77382d52ce444ad3458828157.jpg %}

当然也可以像我这样，打开全部相关的选项，让风格更统一。

**🎨 Kvantum 兼容**

做上述配置后，需要在 Kvantum 的排除窗口列表中加入 `xdg-desktop-portal-kde,xdg-desktop-portal,xdg-document-portal`，否则文件选择器会变为半透明，在背景灰化时很难看。

**🐞 KDE Plasma 更新导致的 Bug**

在更新 KDE Plasma 5.26 后我遇到了一个 bug：Qt 5 的文件选择器需要大概半分钟才能打开，并且还可能崩掉对应的软件。按照 [这个帖子](https://bbs.archlinux.org/viewtopic.php?id=279464) 的解决方法，删除 `$HOME/.config/QtProject.conf` 和 `$HOME/.config/QtProject.conf.lock` 即可解决。

另外，KDE Plasma 5.26.2 会导致 **XDG desktop portal** 文件选择器的主题变为默认的 **微风**，很违和，此时在开机自启动中加入 `/usr/bin/killall xdg-desktop-portal-kde` 即可。

### 🪟 毛玻璃

KWin 的混成器也可以给非 Qt 应用程序加上毛玻璃效果。

**🪟 单独开启**

使用 `xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -set _KDE_NET_WM_BLUR_BEHIND_REGION 0` 命令就可以单独给指定窗口开启毛玻璃效果。

**🔧 使用插件**

在 系统设置 - 窗口管理 - KWin 脚本 中下载 **Force Blur** 脚本并开启，把想要模糊的窗口加进去，即可自动给特定窗口开启模糊效果。

如果电脑性能够强，可以考虑使用第二种模式，即白名单模式，此模式会给不在白名单内的全部窗口强制启用毛玻璃效果，如果性能不够可能导致 KWin 掉帧。

{% image https://imgsrc.baidu.com/forum/pic/item/11385343fbf2b2114854f48f8f8065380dd78efd.jpg width:500 %}

**🪟 效果展示**

{% image https://imgsrc.baidu.com/forum/pic/item/203fb80e7bec54e7ced56cdffc389b504fc26a32.jpg 带背景模糊的 Alacritty %}

{% image https://imgsrc.baidu.com/forum/pic/item/42a98226cffc1e17f38bfaf00f90f603738de93f.jpg 带背景模糊的 GTK 程序，需要主题支持 Blur Me %}

### ❄️ 全黑窗口和卡死 bug

在 KDE Plasma 5.26 之后，经常会出现一个通知或窗口变全黑，紧接着整个桌面环境彻底卡死的情况。在这种时候，可以把彻底杀死并重启 KWin 的命令 `killall kwin_x11 && kwin_x11 --replace &`绑定到快捷键上，当出现崩溃前兆（如菜单和通知开始黑掉，Latte Dock 开始闪烁）时，及时按下快捷键重启它即可。

如果已经卡死了，不要强制关机，按下 Ctrl+S 或 F12 之类的快捷键保存未保存的工作（此时部分键盘快捷键还是能用的），之后切到 tty2 执行 `kill -KILL "$(ps -e | grep kwin_x11 | awk -F' ' '{print $1}')"`，再切回 tty1 （图形环境）执行 `kwin_x11 --replace &` 即可。

### 🔘 圆角

GNOME 有一个第三方的爆改窗口管理器 `mutter-rounded`，可以在窗口管理器层面实现圆角，非常流畅。KDE 可以通过窗口装饰勉强实现圆角，但还是不完美，且会有灰色的阴影方角「Korners」bug。不过通过 **LightlyShaders** 桌面特效，可以实现和 macOS 类似的圆角效果。

**LightlyShaders** 仓库地址： https://github.com/a-parhom/LightlyShaders ，按照 README 中的说明安装即可。

**LightlyShaders** 目前有两个分支：**master** 和 **v2.0**。

**master** 分支适用于 KWin 5.25.5 及其之前的版本，实现方法是在窗口上「糊上」圆角，比较吃资源，不过也不像 README 写得那么离谱，Intel 超核芯显卡就可以流畅带动。**master** 分支画出来的圆角清晰流畅，已经和 macOS 差不多了。

**v2.0** 分支是用 5.25.90 新引入的特性完全重构的，所以不适用于旧版 KWin。此分支性能消耗小得多，但存在 bug，还需等待后续更新。并且 **v2.0** 分支还需要配合兼容的窗口装饰（如  `SierraBreezeEnhanced`）使用。
根据 KWin 版本选择即可。

可以在 `lightlyshaders.cpp` 中自定义要排除的窗口。建议把 Wine 应用和部分离谱窗口（比如网易云音乐的桌面歌词）加入其中。

**🪟 效果展示**

{% image https://imgsrc.baidu.com/forum/pic/item/f2deb48f8c5494eefc6f79d868f5e0fe98257ea5.jpg README 中的图片 %}

### 🔗 使用命令调用快捷操作

使用 `qdbus` 命令可以调用 Qt 程序 (比如 KDE) 的快捷操作，这个命令可以在脚本中使用，以快捷配置 KDE，也可以和其它程序结合使用。  
使用 Qt QDBusViewer 可以查看各个程序可用的快捷操作。

比如，显示桌面网格的快捷命令是 `qdbus org.kde.kglobalaccel /component/kwin invokeShortcut ShowDesktopGrid`。

### 🌚 夜间模式

KDE Plasma 并没有统一的夜间模式实现。但如果装了某款主题的对应深色和浅色变种，切换起来就容易得多。

如果像我一样懒，可以写个脚本实现一键切换夜间模式。（壁纸还得自己切换 ww）

**此脚本需要系统中装有 Python 和 PyQt5。**

https://github.com/YidaozhanYa/kde-dark-mode

{% image https://imgsrc.baidu.com/forum/pic/item/d000baa1cd11728b798afae38dfcc3cec2fd2c4f.jpg 日间 %}

{% image https://imgsrc.baidu.com/forum/pic/item/8d5494eef01f3a29236aa30fdc25bc315d607c54.jpg 夜间 %}

### 🔠 fcitx5 集成

在新版中，**fcitx5** 可以使用 KDE Plasma 的主题，这样就可以不那么违和了。

{% image https://imgsrc.baidu.com/forum/pic/item/4e4a20a4462309f724fddbd3370e0cf3d6cad665.jpg width:500 %}

在 配置附加组件 - 经典用户界面 中把主题改为 **KDE Plasma** 即可。

### ↩️ 配置文件重定向

在环境变量中加入 `export KDEHOME="${XDG_CONFIG_HOME}/.kde4"` 即可把 `~/.kde` 和 `~/.kde4` 重定向到 `~/.config/kde4`。

### 🕰️更高级的日历时钟

可以使用 **Event Calendar** 小部件替换掉原本的数字时钟。

**Event Calendar** 支持单行显示，并且有丰富的配置选项和快捷操作，还可以显示天气。

{% image https://imgsrc.baidu.com/forum/pic/item/b812c8fcc3cec3fdbe4ad6b49388d43f869427fe.jpg %}

{% image https://imgsrc.baidu.com/forum/pic/item/cdbf6c81800a19d89f7bf5c476fa828ba71e46f2.jpg width:550 %}

### 🎼 顶栏媒体播放器

KDE Plasma 自带的媒体播放器挂件在一行的顶栏面板上使用体验不是很好（特别是右对齐的时候），此时可以用第三方的媒体播放器挂件替换之。

并排摆上 **Media Controller Plus** (在添加挂件界面中也称为媒体播放器) 和 **Current Playing** 即可。

如果不喜欢 No media 字样，可以修改 **Current Playing** 的源码解决。详见我修改的版本 https://github.com/YidaozhanYa/kde-currently-playing-custom 。

{% image https://imgsrc.baidu.com/forum/pic/item/a686c9177f3e67093baef63e7ec79f3df9dc5541.jpg width:300 %}

### ➿ 更好的动画效果

可以使用非线性动画代替原版的部分线性动画。

**Maximize Kinetic** 可替换掉 **最大化过渡动画**
**Minimize Kinetic** 或 **Scale OutExpo** 可替换掉 **最小化过渡动画（收缩）**
**Fading Popups Kinetic** 可替换掉 **对话框显隐过渡**
**Open/Close Kinetic** 可替换掉 **窗口打开/关闭动效 渐入渐出**

也可以安装 **Slide tooltips** 来给 tooltip （鼠标悬浮提示条）加上动画。
