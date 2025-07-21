---
title: 🔠 修复 Arch Linux 上 electron 应用不跟系统字体的问题
date: 2022-04-18 21:41:47
tags:
- electron
- Arch Linux
- Icalingua
category: Arch折腾记
---

昨天心血来潮把电脑字体换成了[霞鹜文楷](https://github.com/lxgw/LxgwWenKai)，于是就发现了一个问题，如果系统中安装了微软雅黑或 Noto Sans，那么那些 electron 应用会优先使用微软雅黑或 Noto Sans，而不是用自定义的字体。现在就使用 [bubblewrap](https://wiki.archlinux.org/title/Bubblewrap) 沙盒程序来解决这个问题。

### desktop 篇

依赖：`bubblewrap`

desktop 文件方法适用于 desktop 文件不变的 electron 应用，比如 ElectronNCM、百度网盘、微信、希沃白板等（不适用于 Discord 和 Icalingua++）。Chromium 和 Chrome 浏览器也可以用此方法让部分网页 {% psw 百度贴吧 %} 不显示微软雅黑和思源宋体。
此处以 ElectronNCM 为例。

首先把 ElectronNCM 的 desktop 文件复制到自己家里，便于修改。

```bash
cp /usr/share/applications/electron-netease-cloud-music.desktop ~/.local/share/applications/electron-netease-cloud-music.desktop
```

之后更改该 desktop 文件，并且修改 `Exec=` 一行如下：

```
Exec=/usr/bin/bwrap --dev-bind / / --tmpfs /usr/share/fonts --tmpfs /usr/local/share/fonts --tmpfs /etc/fonts/conf.d --ro-bind /usr/share/fonts/lxwk /usr/share/fonts/lxwk electron-netease-cloud-music /usr/bin/electron-netease-cloud-music
```

{% border %}

此启动命令使用 bubblewrap 创建了一个临时沙盒，以「可访问设备」的模式挂载全盘（``--dev-bind / /``），并屏蔽掉 Noto 和 Noto CJK 字体文件夹（``--tmpfs /usr/share/fonts/noto-cjk --tmpfs /usr/share/fonts/noto``，即在沙盒中把这两个文件夹挂载到 tmpfs 而非原有文件夹），这样就实现了字体的屏蔽。

{% endborder %}

这样只要这个家里的 desktop 文件不被删除，系统就会优先使用这个 desktop 文件而非 `/usr/share` 中的。

### 钩子篇

依赖：`bubblewrap`

Arch Linux 的包管理器 pacman 有[钩子（Hooks）功能](https://wiki.archlinux.org/title/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#Hooks)，可以让包管理器在安装或删除指定软件包的时候执行特定操作。

钩子方法适用于大部分 electron 应用，比如 ElectronNCM、百度网盘、微信、希沃白板等（不适用于 Discord 和 Icalingua++）。Chromium 和 Chrome 浏览器也可以用此方法让部分网页 {% psw 百度贴吧 %} 不显示微软雅黑和思源宋体。
此处也以 ElectronNCM 为例。

首先创建一个 shell 脚本，位置随意。

```bash
vim /usr/local/share/pacman-hooks/electron-ncm.sh # 名字和路径随意
```

内容如下：

```
#!/bin/bash
sed -i 's/Exec\=/Exec\=\/usr\/bin\/bwrap --dev-bind \/ \/ --tmpfs \/usr\/share\/fonts\/noto-cjk --tmpfs \/usr\/share\/fonts\/noto /' /usr/share/applications/electron-netease-cloud-music.desktop
```

{% border %}

此脚本更改了 ElectronNCM 的桌面启动文件，使用 bubblewrap 创建了一个临时沙盒，以「可访问设备」的模式挂载全盘（``--dev-bind / /``），并屏蔽掉 Noto 和 Noto CJK 字体文件夹（``--tmpfs /usr/share/fonts/noto-cjk --tmpfs /usr/share/fonts/noto``，即在沙盒中把这两个文件夹挂载到 tmpfs 而非原有文件夹），这样就实现了字体的屏蔽。

该 shell 脚本将会以 root 权限运行，所以不用担心权限问题。

{% endborder %}

并将这个脚本赋予可执行权限。

之后，用创建一个 pacman 钩子。

```bash
sudo vim /etc/pacman.hooks/electron-netease-cloud-music.hook # 钩子名称随意，不一定是包名
```

写入如下内容。

```
[Trigger]
Operation = Install
Operation = Upgrade
Type = Package
Target = electron-netease-cloud-music

[Action]
When = PostTransaction
Exec = /usr/local/share/pacman-hooks/electron-ncm.sh
```

{% border %}
Target 中填写软件包包名，可以填写多个，用空格分割；Exec 中填写之前创建的 shell 脚本路径。
{% endborder %}

之后在下次更新该软件包时，这个钩子就会被触发，进而执行之前的 shell 脚本，实现在软件启动时屏蔽字体。

{% border %}
当然，还可以使用更极端的做法，比如屏蔽掉几乎所有字体文件夹（`/usr/share/fonts`、`/usr/local/share/fonts` 等），只留一个字体文件夹，并且把需要的字体放在其中。
{% endborder %}

### Icalingua++

依赖：`bubblewrap`、`asar`

Icalingua++ 在软件包内置了微软雅黑和 Circular Spotify TxT 字体，因此无法通过上述方法屏蔽，只能修改包体来进行屏蔽。

{% folding child:codeblock open:false 这是shell脚本 %}

```bash
#!/bin/bash
mkdir -p "/tmp/icalingua.d"
asar e "/usr/lib/icalingua/icalingua.asar" "/tmp/icalingua.d"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Black--fonts.eot"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Black--fonts.ttf"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Black--fonts.woff"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Black--fonts.woff2"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-BlackItalic--fonts.eot"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-BlackItalic--fonts.ttf"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-BlackItalic--fonts.woff"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-BlackItalic--fonts.woff2"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Bold--fonts.eot"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Bold--fonts.ttf"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Bold--fonts.woff"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Bold--fonts.woff2"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-BoldItalic--fonts.eot"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-BoldItalic--fonts.ttf"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-BoldItalic--fonts.woff"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-BoldItalic--fonts.woff2"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Book--fonts.eot"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Book--fonts.ttf"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Book--fonts.woff"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Book--fonts.woff2"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-BookItalic--fonts.eot"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-BookItalic--fonts.ttf"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-BookItalic--fonts.woff"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-BookItalic--fonts.woff2"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Light--fonts.eot"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Light--fonts.ttf"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Light--fonts.woff"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Light--fonts.woff2"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-LightItalic--fonts.eot"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-LightItalic--fonts.ttf"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-LightItalic--fonts.woff"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-LightItalic--fonts.woff2"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Medium--fonts.eot"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Medium--fonts.ttf"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Medium--fonts.woff"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-Medium--fonts.woff2"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-MediumItalic--fonts.eot"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-MediumItalic--fonts.ttf"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-MediumItalic--fonts.woff"
rm "/tmp/icalingua.d/dist/electron/fonts/CircularSpotifyTxT-MediumItalic--fonts.woff2"
rm "/tmp/icalingua.d/dist/electron/fonts/msyh--assets.ttf"
ls "/tmp/icalingua.d/dist/electron/fonts"
sed -i "s/font, 'CircularSpotifyTxT Book Web', msyh, twemoji, 'PingFang SC', /'LXGW Bold WenKai','Noto Sans CJK SC',/" "/tmp/icalingua.d/dist/electron/renderer.js"
sed -i "s/'CircularSpotifyTxT Light Web'/'LXGW Bold WenKai','Noto Sans CJK SC'/" "/tmp/icalingua.d/dist/electron/renderer.js"
sed -i "s/'msyh'/'LXGW Bold WenKai','Noto Sans CJK SC'/" "/tmp/icalingua.d/dist/electron/renderer.js"

mv "/usr/lib/icalingua/icalingua.asar" "/usr/lib/icalingua/icalingua.asar.bak"
asar p "/tmp/icalingua.d" "/usr/lib/icalingua/icalingua.asar"
rm -rf "/tmp/icalingua.d"

######此处 LXGW Bold WenKai 请换成自己所需的字体

```

{% endfolding %}

pacman 钩子可以按照上文方法创建。

{% border %}
该脚本使用 asar 工具解包 Icalingua++，删除其中的字体并且替换指定的 css，让 Icalingua++ 只加载指定字体（本文中为 LXGW Bold WenKai）和 Noto Sans CJK SC（为了显示特殊符号）。

只适用于 icalingua++ icalingua++-electron icalingua++-electron-git 包，不适用于 icalingua++-git 包。
{% endborder %}

附件：[我修改好的霞鹜文楷粗体字独立版](https://pan.yidaozhan.top/ali/%E6%9D%82%E4%B8%83%E6%9D%82%E5%85%AB/%E9%9C%9E%E9%B9%9C%E6%96%87%E6%A5%B7%E5%8A%A0%E7%B2%97%E7%8B%AC%E7%AB%8B%E7%89%88/)，可以当作系统字体使用。

---

2022.4.19 更新日志：勘误，并且增加了 desktop 文件方法。

