---
title: 🖥️ 能用，但未来可期 —— 2024 年触屏 Linux 桌面的现状与思考
date: 2024-12-15 19:57:02
tags:
- Linux
category: Arch折腾记
---

在使用了半年触屏 Linux 桌面之后，现在我来写一篇简短的博文总结一下 2024 年触屏 Linux 桌面的支持和生态现状。

<!--more-->

## 𝕏 旧时代的残党 —— X11

[termux-x11](https://github.com/termux/termux-x11) 项目在大概 2022 年的某个版本曾经支持过触屏直通，当时有用它在安卓的 proot 容器上使用过纯触屏的 Xfce 桌面。Xfce 是我从前很喜欢的一个桌面环境，不过嘛 ... 「X」fce，自然不支持 Wayland 了。

总体使用体验就像一团糨糊。在少数适配了 X Input 2.0 的软件（比如设置了 `MOZ_USE_XINPUT2=1` 的 Firefox 以及大部分用 Qt 编写的软件）上，可以使用手指滚动视图、缩放画面；然而在绝大部分软件，甚至是桌面本体上，触屏的点触操作都被直接简单粗暴地映射到了鼠标左键。

比如，在 Thunar 文件管理器中，如果想习惯性地通过在窗口上拖动来滚动视图，最后只会把某个文件夹拖到另一个文件夹中。正确的使用方法，是拖动窗口最右边那像微雕一样的滚动条... 用起来特别令人无语。右键更是完全没法点击。即使按住屏幕再长时间，也不会弹出任何菜单，KDE 在 X11 上倒是做了这个适配，不过，仅限于 Qt 软件。 

至于打字，Xfce 上只能用 Onboard，它的按键同样也是小得和微雕一样。多指手势？更是想都不要想。配合 Touchegg 等第三方工具，才能勉强让它「能跑」，而不是「能用」。

这个使用体验，甚至远远不如 Windows XP。被打扮得极其现代化的桌面，配上如此糟糕的触控体验，就会显得非常不协调。

4202 年，KDE 和 GNOME 两个重量级桌面环境都已经迈向 Wayland，那么我们来把目光转向 Wayland 吧。

## ѡ 新时代到来了吗 —— Wayland

新时代到来了吗？答案是，到来了，但没完全到来。

### 👣 GNOME

在买了新平板并装好 Linux 之后，我第一个开始用的桌面环境是 GNOME。毕竟 GNOME 有[良好的触摸手势支持](https://help.gnome.org/users/gnome-help/stable/touchscreen-gestures.html.zh_CN)、硕大的窗口额头和 UI 元素以及看上去就像为平板设计的整体界面风格。

使用体验 ... 能用，细节打磨方面还是远远不及安卓。确实有三指在桌面、多任务和启动台之间切换的手势，切换动画也非常顺滑；绝大部分软件的滚动、双指缩放等手势也都支持良好。输入文字方面，GNOME Shell 有一个功能非常完善的虚拟键盘，iBus 和 Fcitx5 输入法都支持，还能通过 GJS OSK 插件实现更高程度的自定义。

{%video https://file.chyk.ink/d/%E6%9D%82%E4%B8%83%E6%9D%82%E5%85%AB/Blog%E9%99%84%E4%BB%B6/GNOME1.mp4 %}

从视频也可以看出，体验已经比 X11 下好了不知道多少倍。

然而，有时候进入多任务视图之后，可能会吞操作，或者桌面整体会进入一种「卡死」状态，不会响应任何触控操作。这时候可以按 Esc 键脱离卡死。但是，我都用触屏了，你总不能指望着我时刻都有 Esc 键可以按吧 ...  另外，Nautilus 文件管理器的触屏适配极其糟糕，截止到 46 版本还没法用拖动来滚动视图。47 版本倒是修复了这个问题，然而右键菜单又变得很难按出。

抛开文件管理器和卡死不谈，GNOME 的触摸体验确实非常非常优秀，甚至完全可以拿来日用。但还有更重要的一点 —— 性能。由于 Wayland 的一体化设计，在我的平板上，窗口开多了之后，整个桌面就会变得奇卡无比。所以，在用了三个月之后我立刻转到了 KDE。

### ⚙️ KDE

KDE 6 版本大幅改善了触摸支持，因此虽然它的 UI 设计可能不是特别贴合触屏，但实际的使用体验是好很多的。这极大地归功于 Dolphin 文件管理器的「选择模式」。这是一套专门给触屏设计的 UI，长按任一文件即可进入。

{%video https://file.chyk.ink/d/%E6%9D%82%E4%B8%83%E6%9D%82%E5%85%AB/Blog%E9%99%84%E4%BB%B6/KDE1.mp4 %}

整体界面虽然略有掉帧（~~毕竟是 the Krash Desktop Environment~~），但是不影响使用体验的顺滑。起码不会出现像 GNOME 那样整体卡死的现象，也没有窗口开多了之后奇卡无比的问题。

截止目前的 KDE Plasma 6.2（KDE Gear 24.12，KDE Frameworks 6.9）版本，除了 Gwenview，其它 KDE 组件对触屏的适配都很优秀，不会出现像 5.x 一样，部分 QtQuick 界面元素完全无法点击的问题。

然而，KDE 的触屏适配也是有两面性的。KDE 使用 Maliit 作为虚拟键盘，它本身的使用体验很好。然而 —— Fcitx 5 在 Wayland 上会[挤占虚拟键盘的位置](https://bbs.archlinuxcn.org/viewtopic.php?id=14203)，这就导致完全没法用触屏来打中文。UKUI 桌面有独立的[虚拟键盘](https://gitee.com/openkylin/kylin-virtual-keyboard)程序，可以拿来在 KDE 上用，但问题是它完全不能在 Wayland 上用，只能用卡卡的 XWayland [勉强作为过渡](https://gitee.com/openkylin/kylin-virtual-keyboard/pulls/116)。好在我有实体键盘，这方面对我的体验影响不算大。

{%image https://imgsrc.chyk.ink/nX6SEPvgdsp-eyk4.webp 去问设计&nbsp;Wayland&nbsp;输入法协议的人吧！ %}

## 🗃️ 第三方软件

这里的「第三方软件」是指桌面环境套件之外的软件。分成几个方面来说。

对于使用系统 Qt 的软件，需要看 Qt 版本以及软件开发者心情。得益于 Qt 优异的触摸支持，一般适配都相当不错，但部分的视图可能需要用 **双指** 而不是单指滚动。（在 x-d-p 的文件选择器中就是这样）

对于使用系统 GTK 3 / 4 的软件，触摸适配开箱即用。

对于 Chromium 以及 QQ、VSCode 之类的 Electron 软件，触屏的适配非常完美，但部分手势可能无法使用。用参数使其原生在 Wayland 运行即可。对于我这种高 DPI 设备，可能还需要再处理一下缩放问题。

最终我在使用的参数是 `--enable-features=UseOzonePlatform,WaylandWindowDecorations --ozone-platform=wayland --disable-features=WaylandFractionalScaleV1 --enable-wayland-ime`。

对于 JetBrains 系列 IDE，它们应该原生跑在 Wayland 上，触摸支持也是开箱即用。

对于使用 Waydroid 安装的安卓软件，触控体验和在安卓上基本一致。但在我用的 KDE 桌面上，触控延迟可能有些大（100ms+），所以不适合用来玩某些游戏，但基本的软件使用还是 OK 的。

对于微信、WPS Office 之类 bundle 了 Qt 库的闭源软件，可能要看软件开发者的心情。微信的触屏完全不能用，WPS 有基本的触屏适配，但图片周围的定位点、表格右下角的定位点等都不能用触屏拖动，仍然需要掏鼠标。

对于 wiliwili 之类使用 SDL / Cairo 等库自绘制图形界面的软件，也需要看软件开发者的心情。我用过的几款软件中也只有 Steam 的适配比较差，其它的都还好。

对于终端模拟器，我用过的 GNOME Terminal、GNOME Console、Konsole 和 Alacritty 均支持触屏滚动界面。Tilix、Xfce Terminal 等支持得可能不算好。当然，要在终端模拟器上选择文字的话，鼠标仍然是最优解。

对于在 Wine 中运行的 Windows 软件，触控体验远不及在原生 Windows 下良好，只能说是凑合。这种情况下鼠标是更优解。

## 🖊️ 笔和手写

Linux 上如果驱动支持，触控笔、压感级别支持应该是开箱即用的，并且使用体验比 Windows 更好。在 KDE 上，6.2 版本优化了手写笔支持，使用体验还会比其它桌面好一些。

在大部分的 UI 中，电容笔的光标可以作为鼠标指针使用，在专门适配的软件中则会变成笔尖。

{%video https://file.chyk.ink/d/%E6%9D%82%E4%B8%83%E6%9D%82%E5%85%AB/Blog%E9%99%84%E4%BB%B6/KDE2.mp4 %}

视频中的绘板软件是 [Rnote](https://rnote.flxzt.net/)。

## 🤔 分析和展望

感觉 Linux 触屏生态差的很大一个原因是 —— 因为没人用，所以没人做；因为没人做，所以又没人用，形成了恶性循环。这里的「没人做」既指硬件厂商很少推出可以安装 Linux 的触屏设备，也指社区的开源软件开发者很少专门为触屏设计软件。这也是很多「小众」软硬件生态的通病。

曾经的 JingPad 就是一个典型的例子：厂商推出了平板，很少有消费者买账，于是厂商没办法盈利，就更少有人做了。KDE 上的触屏中文输入也是一个典型的例子：KDE、触屏、中文用户这三个集合可能都很大，但它们的交集是很小的，而这很小的几个人，也未必有开发 C++ 软件 / KDE 组件的能力，所以 KDE Wayland 触屏没法输入这个问题摆了这么久也没人去做。

Linux 开源社区终究是社区，「没人用，所以没人做」是一个很现实的问题。不过 2024 一年随着两大桌面环境迈向 Wayland，以及 KDE 社区的 [We care about your Input 计划](https://invent.kde.org/teams/goals/we-care-about-your-input)，作为一个没有 C++ 开发能力的最终用户，我相信 Linux 的触屏支持也能像 Windows 一样变好。
