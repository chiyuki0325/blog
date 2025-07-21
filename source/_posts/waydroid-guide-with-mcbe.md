---
categories: []
category: Arch折腾记
date: '2022-06-26 13:34:14'
tags:
- Waydroid
- 安卓
title: 🤖 使用 Waydroid 安卓子系统愉快游玩我的世界基岩版
updated: '2022-08-05 15:25:52'
---
Waydroid 是一款新兴的安卓子系统软件，和先前的 Anbox 一样使用 LXC 运行安卓容器，但 Waydroid 对于 GPU 的支持更好，并且支持鼠标直通等，输入和音频延迟也几乎没有，所以可以用来打游戏！

在渲染龙到来之际，MCPELauncher 项目停止更新之后，可以使用 Waydroid 来游玩《我的世界》基岩版。

<!--more-->

## ⚠️ 用前须知

> - Waydroid 只支持 Wayland 图形环境，如果你在使用基于 X11 的桌面，请切换到 Wayland 会话或者使用 [Weston](https://wiki.archlinux.org/title/Weston) 。
> - Waydroid 目前不支持英伟达显卡和部分 AMD 显卡（比如 RX 6800），所以需要性能强大的核显，或者[使用软件渲染](#🖥-切换到软件渲染)。
> - Waydroid 在 5.18 以下内核需要 `ashmem` 和 `binder` 内核模块，官方软件仓库中的 `linux-zen` 和一些第三方内核（如 `linux-lily`）带了这两个模块。如果你使用的内核不带这两个模块，那么安装 `anbox-modules-dkms-git` 软件包。
> - Waydroid 在 5.18 以上内核仅需要 `binder` 内核模块。
> - Waydroid 目前不支持游戏中鼠标捕获，因此需要使用手柄游玩，或者使用全键盘玩法（~~正常人都不会用全键盘吧~~）。
> - Waydroid 不支持输入中文。

## 🪤 开始安装

首先从 AUR 安装 Waydroid 本体。

```bash
yay -S waydroid
```

之后安装 Waydroid 镜像。

```bash
yay -S waydroid-image
```

## 🔄 初始化

将如下内容写入到 `/etc/fstab` 以实现开机自动加载 binderfs：

```
binder /dev/binderfs binder defaults,nofail 0 
```

如果是 5.18+ 内核，参考[这条 issue](https://github.com/waydroid/waydroid/issues/406) 更改配置文件启用 `memfd`。

在使用 5.18+ 内核和 `memfd` 时，无法登录谷歌商店，所以登录时还请使用老内核。

如果是手动安装的内核模块，那么将以下内容写入 `/etc/modules-load.d/anbox.conf  ` ；

```
ashmem_linux
binder_linux
```

如果是 `linux-xanmod` 内核，那么将 `psi=1` 写到 `/etc/default/grub` 的 `GRUB_CMDLINE_LINUX_DEFAULT` 行末尾，之后重新生成 GRUB 配置文件（`sudo grub-mkconfig -o /boot/grub/grub.cfg ` 或你自己的 GRUB 配置文件位置）。

之后执行这些命令以初始化；

```bash
sudo sysctl kernel.unprivileged_bpf_disabled=0 # 我也看不懂，但估计是内核权限相关的东西
echo 'kernel.unprivileged_bpf_disabled = 0' | sudo tee /etc/sysctl.d/99-sysctl.conf # 使上一句永久生效
sudo systemctl enable --now waydroid-container.service # 开机自启动 Waydroid 后台服务（不连容器一起自启）
sudo waydroid init -f # 初始化镜像
```

如果你是带双显卡的电脑（比如游戏本），那么执行这个脚本，并选择你的核显。

```
https://github.com/Quackdoc/waydroid-scripts/raw/main/waydroid-choose-gpu.sh
```

## 🤖 进入安卓

```bash
waydroid session start 
waydroid show-full-ui
```

或从应用列表里直接启动 Waydroid。第一次启动需要解压镜像，时间很长，不过之后就快了。

在启动之后，系统界面将被全屏的安卓系统界面覆盖（可用 Alt+Tab 等键组合切回 Linux 桌面）。

在进入安卓之后首先将语言改为中文（可选），之后在 {% kbd 应用和通知 %} - {% kbd 应用信息 %} 中停用 `Android 设置向导` （需要开启显示系统应用），否则会反复弹出 Android 设置向导屡次停止运行的弹框。

{% image https://imgsrc.chyk.ink/cefc1e178a82b9019a5718ea368da9773812ef76.webp %}

由于镜像自带谷歌服务，所以之后可以进入谷歌商店下载游戏。

{% image https://imgsrc.chyk.ink/1ad5ad6eddc451da2427d732f3fd5266d1163212.webp %}

在安装完成后，就可以开始游玩了。

{% image https://imgsrc.chyk.ink/adaf2edda3cc7cd9c819ee007c01213fb80e9137.webp 最终，开源社区击败了渲染龙！ %}

## 💠 其它说明

#### 🖥 切换到软件渲染

如果你使用不支持的显卡，请把这两行写入 `/var/lib/waydroid/waydroid_base.prop` 来启用软件渲染：

```ini
ro.hardware.gralloc=default
ro.hardware.egl=swiftshader
```
