---
title: "🔊 在 Linux 上迁移到全新的音频系统，PipeWire 使用攻略"
date: 2022-08-18 19:33:55
tags:
- Linux
- PipeWire
category: Arch折腾记
cover: 'https://imgsrc.baidu.com/super/pic/item/0b7b02087bf40ad1fe99b122122c11dfa8eccef6.jpg'
---

{% grid %}

[PipeWire](https://pipewire.org) 是一个新的底层多媒体框架。 它旨在以 **最小的延迟** 为音频和视频提供捕获和播放，并支持 PulseAudio、JACK、ALSA 和 基于 GStreamer 的应用程序。

基于该框架的守护进程可以配置为音频服务器 (具有 PulseAudio 和 JACK 特性) 和视频捕获服务器。

PipeWire 还支持像 Flatpak 这样的容器，不依赖于 `audio` 和 `video` 用户组。 相反，它采用了类似于 Polkit 的安全模式，请求 Flatpak 或 Wayland 允许录制屏幕或音频。

—— 摘自 ArchWiki
{% endgrid %}



<!-- more -->



PipeWire 的性能虽然还不如 ALSA，但它 ~~又新又好~~，支持很多新标准，并且在部分设备上音质也更好，值得一试。



### 📦 安装 PipeWire

```bash
sudo pacman -S pipewire pipewire-audio pipewire-pulse pipewire-alsa \
               pipewire-jack wireplumber lib32-pipewire lib32-pipewire-jack \
               --needed
```

这条命令可以安装 PipeWire，并且用其代替 PulseAudio 作为音频服务器。
如果提示和 `pulseaudio-bluetooth` 之类的包冲突，无法安装，就先卸载。

```bash
sudo pacman -S helvum easyeffects
```

使用这条命令安装 Helvum 和 EasyEffects，稍后会用到。
如果 EasyEffects 的依赖产生了大量应用菜单项，就安装[这个 pacman hook](https://raw.githubusercontent.com/YidaozhanYa/dotfiles/main/etc/pacman.d/hooks/lsp-plugins.hook)。

之后启用 PipeWire 相关服务。

```bash
systemctl enable pipewire --user
systemctl enable pipewire-pulse --user
```
---

安装 `xdg-desktop-portal` 及其后端，可以使用 PipeWire 改善 WebRTC 的性能。
Firefox 会默认使用 PipeWire 作为 WebRTC 后端，而 Chromium 需要开启 `chrome://flags/#enable-webrtc-pipewire-capturer` flag。

```bash
sudo pacman -S xdg-desktop-portal --needed
sudo pacman -S xdg-desktop-portal-kde #KDE
sudo pacman -S xdg-desktop-portal-gnome #GNOME
sudo pacman -S xdg-desktop-portal-wlr #Sway, Wayfire 等
```

### 🦷 使用 PipeWire 蓝牙音频

安装 `pipewire-pulse` 后，PipeWire 会代替 PulseAudio 处理蓝牙音频设备。使用方法基本无差别。

值得注意的是，和 PulseAudio 一样，在使用 A2DP 信宿（SBC 或 SBC-XQ 编码器）时，蓝牙耳机的麦克风无法使用，需要改成只支持单声道且码率超低的 HFP 信宿（比如 mSBC 编码器）。

### 🎛️「接线盒」—— Helvum

在使用 PipeWire 的过程中，有可能会遇到在和别人语音通话时，自己电脑的音频输出回环到了语音通话中的情况，或者如果你有多个音频设备，想让每个设备输出不同的音频，那么你需要 Helvum。

在上述步骤中，已经安装了 Helvum。通过在这个界面拖音频线，可以指定音频输入输出。

{% image https://imgsrc.baidu.com/super/pic/item/42166d224f4a20a49ea0141ad5529822730ed0b5.jpg %}

比如在此图中，我就让外置喇叭播放音乐，耳机播放浏览器中的视频。

### 🎚️「均衡器」—— EasyEffects

{% image https://imgsrc.baidu.com/super/pic/item/1c950a7b02087bf4cb447f34b7d3572c10dfcf47.jpg %}

{% image https://imgsrc.baidu.com/super/pic/item/9345d688d43f8794ca5460f3971b0ef41ad53a47.jpg %}

EasyEffects 可以修改 PipeWire 的音频流，作为均衡器或效果器。
