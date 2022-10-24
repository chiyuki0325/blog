---
title: 🕸️ 用 ADB 把手机或平板的 WiFi 共享给电脑
date: 2021-06-11 22:17:44
tags:
- WiFi
- adb
category: Arch折腾记
---

今天我的Arch挂了 —— wlan0网卡消失，无法上网。查了一下发现有个东西叫USB网络共享，可以把安卓设备的网络共享给电脑，但我是WiFi平板，设置里找了一圈都没有USB网络共享，只好求助于万能的群友。

注意此方法只为应急用，不适合长久上网方案。

在此感谢 @Eumeryx 提供的方法。

首先电脑下载ADB工具包，如果完全断网可以用连着网的其它设备下载，然后用数据线传到电脑上。

然后打开CMD/终端，切到ADB所在目录，并把手机/平板用数据线插上电脑。

再输入如下命令，启用网络共享：

```bash
adb shell settings put global ethernet_on 3
```

{% grid %}
（注：如果你是Linux，请在adb前面加上“./”。）
如果手机弹出窗口，那就在手机上允许USB调试，然后再执行上述命令。
{% endgrid %}

然后执行如下命令启动服务：

```bash
adb shell svc usb setFunctions rndis
```

这时候电脑中会多出一个有线网卡，可以上网了。可以自行下载无线网卡驱动，修复坏掉的系统。
