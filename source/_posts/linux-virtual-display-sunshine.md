---
title: "📲 在 Linux 上使用 Sunshine 把安卓平板作为虚拟副屏，画面清晰延迟极低"
date: 2024-05-12 15:46:12
tags:
- Linux
- Wayland
category: Arch折腾记
cover: https://imgsrc.baidu.com/forum/pic/item/8b82b9014a90f60312d2f77a7f12b31bb051eda9.jpg
---

两年前我曾经发表过使用 X11 虚拟显示器和 Deskreen 的 WebRTC 虚拟副屏方案，该方案有较多缺陷，如画面码率低延迟高、挑显卡、不支持 Wayland 等。随着开源串流工具 [Sunshine](https://app.lizardbyte.dev/Sunshine) 的完善，可以使用该工具来把安卓平板当作虚拟副屏了。

<!--more-->

### 🌞 安装 Sunshine

前往 https://github.com/LizardByte/Sunshine/releases/nightly-dev 选择对应发行版的安装包安装即可。

比如我是 Arch Linux，就可以使用这条命令安装：

```bash
sudo pacman -U https://github.com/LizardByte/Sunshine/releases/download/nightly-dev/sunshine.pkg.tar.zst
```

{%ablock color:red ⚠️ 注意%}

如果你的虚拟副屏是竖屏，就不要安装稳定版 Sunshine（如 latest release 中的版本或 AUR / chaotic-aur 软件仓库的 `sunshine` 或 `sunshine-bin` 软件包），因为**稳定版的 Sunshine 不支持竖屏串流。**请使用 `sunshine-git` 或上面 GitHub 链接中的版本。

{%endablock%}

### 🌝 安装 Moonlight

前往[这期视频](https://www.bilibili.com/video/BV1Si4y1Y7Jb/)的简介获取 UP 主“阿西西的日常”修改版的 Moonlight，该版本支持竖屏串流。

{%bvideo BV1Si4y1Y7Jb %}

### 🔌 配置虚拟显示器

#### 🔌 显卡欺骗器

如果你使用 X11，请参考[往期博客](/2022/07/17/linux-virtual-display/#%F0%9F%94%8C-%E6%89%BE%E5%88%B0%E8%A6%81%E4%BD%BF%E7%94%A8%E7%9A%84%E8%99%9A%E6%8B%9F%E6%98%BE%E7%A4%BA%E5%99%A8)。

在 Wayland 下并不能使用修改 X11 配置文件的方法创建虚拟显示器，`krfb-virtualmonitor` 创建的虚拟显示器也不能被 Sunshine 检测到，于是之前的方法悉数失效。

我的解决方案是花几块钱买一个显卡欺骗器，有的商家也称之为虚拟显示器。

{% image https://imgsrc.baidu.com/forum/pic/item/9922720e0cf3d7cae53d574bb41fbe096a63a9c0.jpg width:100px %}

把它插上电脑，在弹出的提示框中选择“向左扩展”或“向右扩展”即可。

#### 🛠️ 覆盖 EDID

由于显卡欺骗器内置的分辨率都为横屏，且并不能满足我的需求（我想使用 800x1280），所以需要覆盖它的 [EDID](https://en.wikipedia.org/wiki/Extended_Display_Identification_Data)。
EDID 可以理解为显示器的身份信息，包含该显示器的型号、支持的分辨率等。需要用一个 800x1280 分辨率显示器的 EDID 文件覆盖显卡欺骗器的，以让其支持 800x1280 分辨率。

万幸的是，已经有人整理好了各型号显示器的 EDID 文件，我们可以直接下载。

首先在[此网页](https://github.com/linuxhw/EDID/raw/master/DigitalDisplay.md)中找到需要的分辨率，然后前往 [GitHub 仓库](https://github.com/linuxhw/EDID)的 Digital 文件夹中下载对应的 EDID 文件。

<center>{%ghcard linuxhw/EDID %}</center>

提到 800x1280 这个分辨率，我第一反应就是某阀门公司的游戏掌机，而这个仓库中也恰好有[对应的 EDID 文件](https://github.com/linuxhw/EDID/blob/master/Digital/Valve/VLV3001/25C545529ECB)。

在找到 EDID 文件之后，复制该文件中 `edid-decode (hex)` 部分的十六进制码，使用任意十六进制编辑器（如 [hexed.it](https://hexed.it)）将其写入一个 bin 后缀的文件。
之后把得到的这个 128B 大小的 bin 文件放到 `/usr/lib/firmware/edid` 文件夹中。若文件夹不存在请自行创建。

最后，编辑[内核参数](https://wiki.archlinuxcn.org/wiki/%E5%86%85%E6%A0%B8%E5%8F%82%E6%95%B0)，加入一行`drm.edid_firmware=HDMI-A-2:edid/vlv3001.bin`。
其中，`HDMI-A-2` 为显卡欺骗器对应的显示器编号（可用 `xrandr` 命令查看）， `vlv3001.bin` 为上一步得到的 bin 文件。

{%image https://imgsrc.baidu.com/forum/pic/item/54fbb2fb43166d22db537ea9002309f79052d2e3.jpg %}

覆盖 EDID 之后的效果如图所示。可以看到，系统已经成功地把我的显卡欺骗器当成了某阀门掌机的显示器。

### 🌻 配置 Sunshine

接下来就可以配置 Sunshine 了。在启动 Sunshine 后点击托盘图标即可打开配置界面。

首先是常规的设置用户名密码，之后打开 Configuration 进行配置。

- 关闭 Input 中的手柄、键盘和鼠标选项，因为把 Sunshine 当作虚拟显示器的话，触摸会错位，所以需要关掉来避免误触。

- 在 Audio/Video 中设置好显示器编号（Display Number）和分辨率（Advertised Resolutions）。
- 在 Advanced 中设置好屏幕捕获方式（Force a Specifig Capture Method），如果你是台式电脑，只使用 NVIDIA 独立显卡，那么可以安装 [nvlax 补丁](https://github.com/illnyang/nvlax) 并使用 NvFBC 模式，否则就使用 KMS 模式。

### 🥮 配置 Moonlight

在安卓平板端 Moonlight 的设置中找到“自定义分辨率”，并输入需要使用的分辨率（我这里使用 800x1280），并且按需开启“竖屏显示模式”。之后，重启一次 Moonlight，就可以在设置界面最上面的“视频分辨率”中找到刚才设置的分辨率。

之后打开“将画面拉伸至全屏”，关掉“输入设置”的三个选项。

Moonlight 可以自动检测到局域网下的电脑，直接连接上就可以使用了。

### 🖼️ 效果图

{%image https://imgsrc.baidu.com/forum/pic/item/0df431adcbef76099b0ff2a268dda3cc7cd99e83.jpg %}
