---
title: 📱 红米 1S 移动 4G 版折腾笔记
date: 2023-09-17 08:53:17
tags:
- 安卓
- 小米
---

{%image https://imgsrc.chyk.ink/8435e5dde71190ef563d83ec881b9d16fdfa603a.webp%}

最近从家里翻出来一台[红米手机 1S 移动 4G 版](https://www.mi.com/hongmi1s4g)，想着拿出来当备用机，但是它搭载的是基于安卓 4.4 的 MIUI 9，很多现代软件都没法运行，于是我就来想个办法折腾一下这台手机。

<!--more-->

红米 1S 这台手机分为三个版本：联通 / 电信 3G 版  {%sub (armani) %}、移动 3G 版 {%sub (wt93807 / HM2014011) %} 和移动 4G 版 {%sub (wt96007 / HM2014501) %}，其中 armani 使用的是高通骁龙处理器，所以在 2023 年仍有人为其制作刷机包，在 XDA 上甚至可以找到最新最热安卓 14 的刷机包，而 wt96007 使用的是联发科 MT6852 处理器，并且内核和设备树也没有开源，为其制作第三方系统的方法只能是从别的手机（比如荣耀 3C）上移植。

目前红米 1S 4G 可用的，相对现代的安卓刷机包有三款，均由 [Minimal-W](https://xtremedev.top/) (rote66 / wanyikai0791) 制作，感谢这位大佬的辛苦付出。

📥 [魔趣 (安卓 5.1)](https://file.chyk.ink/%E5%AE%89%E5%8D%93%E8%BD%AF%E4%BB%B6/HM2014501/HM1S4G_Mokee5.1_V2_wanyikai0791.zip): HM1S4G_Mokee5.1_V2_wanyikai0791.zip

[📥 Resurrection Remix 5.7.1 (安卓 6.0)](https://file.chyk.ink/%E5%AE%89%E5%8D%93%E8%BD%AF%E4%BB%B6/HM2014501/HM1S4G_RR5.7.1_Alpha1_wanyikai0791.zip): HM1S4G_RR5.7.1_Alpha1_wanyikai0791.zip

[📥 LineageOS 14.1 (安卓 7.1.2)](https://file.chyk.ink/%E5%AE%89%E5%8D%93%E8%BD%AF%E4%BB%B6/HM2014501/HM1S4G_Los14.1_beta1_wanyikai0791.zip): HM1S4G_Los14.1_beta1_wanyikai0791.zip

[😺 TWRP 3.3.1 (GitHub)](https://github.com/rote66/twrp_device_Xiaomi_HM2014501): TWRP3.3.1.0_HM2014501_rote66.img

其中安卓 5.1 魔趣 ROM 是最流畅的，而另外两款在系统 UI 中均有卡顿，所以如果没有特殊要求的话，建议使用安卓 5.1。前两款 ROM 的主要功能并无缺陷，而安卓 7.1.2 ROM 缺失很多功能（比如基带、蓝牙音频、自动亮度、录像、TF 卡融卡等），所以如果没有特殊要求的话尽量不要使用。

另外，我注意到的三款 ROM 的一些细微功能区别如下：

- 安卓 5.1 的 DHCP 客户端有一些小毛病，连接 WiFi 时可能需要手动输入 ip。

- 安卓 6.0 以上可以使用 Swift Backup。

- 安卓 6.0 以上可以使用权限管理。

- 安卓 6.0 以上可以开启勿扰模式，避免媒体音量出声引起惨剧。

- 安卓 7.1.2 的系统主界面 (启动器) 可以横屏。

首先刷入 TWRP (`fastboot flash recovery TWRP3.3.1.0_HM2014501_rote66.img`)，然后在 TWRP 中清除 Cache、Dalvik Cache、Data、System，之后选择「安装」并选择已经拷到 TF 卡上的刷机包即可。

如果没有 TF 卡，可以在「高级」中打开 ADB 侧载，之后在电脑上用 ADB 刷入 (`adb sideload HM1S4G_Mokee5.1_V2_wanyikai0791.zip `)。

{%image https://imgsrc.chyk.ink/e7cd7b899e510fb3741c67a49f33c895d1430cff.webp height:45rem %}

三款 ROM 均已内置 SuperSU，并且 Magisk / Zygisk / Riru 均不能正常使用，所以装模块大概是别想了。

如果你遇到了[如这个视频所示](https://t.me/yidaozhan_channel/4834)的幽灵关机条，可以尝试三清，或者使用 SP Flash Tool v5.2032.00 以下的版本刷入[📥 官方线刷救砖包](https://file.chyk.ink/%E5%AE%89%E5%8D%93%E8%BD%AF%E4%BB%B6/HM2014501/wt96007_images_V9.2.2.0.KHHCNEK_20180102.0000.00_4.4_cn_074353be8c.tgz) 解决。

~~最后，大家一起喊出：天翼 3G 太快啦！！！~~
