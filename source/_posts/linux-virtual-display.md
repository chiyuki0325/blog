---
abbrlink: ''
categories: []
category: Arch折腾记
cover: http://imgsrc.baidu.com/forum/pic/item/a8014c086e061d95b32820e33ef40ad163d9cafb.jpg
date: '2022-07-17 12:13:24'
tags:
- Linux
- X11
title: 📲 在 Linux 上把手机/平板当作虚拟副屏，游戏聊天两不误
updated: '2022-09-25 17:52:19'
---

在 Windows 系统中，可以使用 Spacedesk 软件来把手机/平板当作电脑的虚拟副屏使用，在 Linux 下也可以通过 X11 虚拟显示器实现类似的效果。

<!--more-->

## 🔩 前置需求

如果您使用台式机，首先尽量让桌面在核显上运行，笔记本可以忽略这步。
一般把显示器接到主板上，就可以做到。

如果不在核显上运行桌面，可能创建虚拟显示器失败。

## 🔌 找到要使用的虚拟显示器

### 🖥️ 使用现成的闲置显示接口 (X11)

输入 `xrandr` 命令，然后查看哪个显示接口没有使用（disconnected）。

⚠️ 此方法比创建新的虚拟显示器更方便，但有可能出现 X Error 报错导致无法使用。

{% image http://imgsrc.baidu.com/forum/pic/item/ca1349540923dd546d10b0b39409b3de9d82488d.jpg 此处就可以使用 HDMI-1-0 显示接口 %}

### 🎞️ 创建英特尔虚拟显示器 (X11)

> ⚠️ 此方法在 NVIDIA Optimus 笔记本上无法使用，会导致 Wine 无法运行。
> 我没有其它双显卡的机器，无法尝试，请自行测试。
> ⚠️ 此方法需要英特尔核显，并且由于 `intel` 驱动年久失修，在小部分设备上可能导致画面轻微撕裂。

此方法需要更改 Xorg 配置文件，有一定风险，可在操作之前禁用登录管理器（Display Manager），操作成功之后再启用。

如果未安装，则安装 `xf86-video-intel` 显示驱动。

创建 `/usr/share/X11/xorg.conf.d/20-intel.conf`，内容如下：

```
Section "Device"
Identifier "intelgpu0"
Driver "intel"
Option "VirtualHeads" "1"
EndSection
```

此配置文件的作用是把核显切换到 `intel` 显示驱动，并且创建一个虚拟显示器。

创建完成后重启电脑或重新登录，在 `xrandr` 中就可以看见 VIRTUAL1 显示器了。

### 🎞️ 使用 NVIDIA xconfig (X11)

参照这条 issue：

https://github.com/dianariyanto/virtual-display-linux/issues/9#issuecomment-786389065

### 🎞️ 使用 evdi 内核模块 (X11)

如果上面三种方法都无法使用，那可以试试 evdi 内核模块。
此方法可以在 NVIDIA Optimus 笔记本上使用。

根据所使用的发行版的不同，安装 `evdi` 或 `evdi-dkms` 包。

之后把 `options evdi initial_device_count=1` 写到 `/etc/modprobe.d/evdi.conf` 之后，重启就可以在 `xrandr` 中看见多出来的虚拟显示器。

### 🛤️ 使用 XDG Desktop Portal 虚拟显示器 (Wayland)

在经由 XDG Desktop Portal 捕获屏幕时，就可以创建虚拟显示器。

{% image https://www.helloimg.com/images/2022/10/19/Zkv7aM.png width:500 %}

此方法不太稳定，已知在 KDE 上可能导致崩溃。

### 🛤️ 使用 Krfb 创建虚拟显示器 (Wayland)

Krfb 提供了 `krfb-virtualmonitor` 命令行工具，可以直接使用以创建虚拟显示器。

---

如果上述方法都不行，只能搜索然后自求多福了。

## 🖥️ 配置虚拟显示器 (X11)

首先确定要使用的设备的屏幕比例和分辨率，建议使用目标设备分辨率的二分之一或四分之一大小，因为 Xorg 不支持在不同显示器上使用不同 DPI。

然后输入 `gtf 宽 高 刷新率` 命令生成一个 `xrandr` 配置。

![http://imgsrc.baidu.com/forum/pic/item/4afbfbedab64034ff652d5ddeac379310b551d49.jpg](http://imgsrc.baidu.com/forum/pic/item/4afbfbedab64034ff652d5ddeac379310b551d49.jpg)

然后将此配置导入到 `xrandr` 中，并且将其添加到虚拟显示器。

```bash
# 此处以 800x1280 为例
# VIRTUAL1 即上文提到的虚拟显示器 ID，自行更改
xrandr --newmode "800x1280_60.00"  86.50  800 856 944 1088  1280 1281 1284 1325  -HSync +Vsync
xrandr --addmode VIRTUAL1 "800x1280_60.00"
```

接下来激活虚拟显示器。

```bash
# 此处 eDP1 是正在使用的主显示器的 ID，可在 xrandr 中查看，并且根据情况自行更改
xrandr --output VIRTUAL1 --mode "800x1280_60.00" --right-of eDP1
# 之所以把虚拟显示器放在主显示器右侧，是因为如果放在左侧的话，KDE 桌面上新打开的窗口尺寸会变得很小。
# 如果使用 GNOME 桌面并且想放在左侧的话，就改成 --left-of 。
```

之后就可以在 KDE 显示设置中看见这个虚拟显示器了。
如果看不见，也可以把鼠标一直往右移，看看能否移出主显示器。

上面的三条命令可以保存在一个 shell 脚本中，然后开机自启之，解放双手。

## 📨 将画面投送到手机或平板

为了把虚拟显示器的画面投送到手机或平板，需要一个跨平台投屏软件 Deskreen，可在 https://www.deskreen.com 下载。

<!-- 为保证性能，接收端建议使用基于 Chromium 内核的浏览器，不建议火狐。 -->

如果发热较为严重，可以尝试将接收端更换为 Chromium 内核的浏览器。

非 Debian 系发行版建议下载 AppImage，然后用 `appimagelauncher` 集成到系统应用列表。不要试图用系统 electron 运行，会导致无法投屏。

Deskreen 的使用方法很简单，这里不再赘述。

## ⛓️ 有线连接

Deskreen 可以使用有线连接。

把手机或平板用 USB 线连接上电脑，输入 `adb reverse tcp:3131 tcp:3131`，在 Deskreen 扫完二维码之后，把浏览器地址栏中你电脑的局域网 IP 改成 `localhost`，就是有线连接了。

## 🖼️ 效果图

{% image http://imgsrc.baidu.com/forum/pic/item/a8014c086e061d95b32820e33ef40ad163d9cafb.jpg %}

{% image http://imgsrc.baidu.com/forum/pic/item/18d8bc3eb13533faca4484f5edd3fd1f40345b7e.jpg %}

{% image http://imgsrc.baidu.com/forum/pic/item/a9d3fd1f4134970a7e9d07f4d0cad1c8a6865d7a.jpg 感谢池塘姐姐友情出演( %}
