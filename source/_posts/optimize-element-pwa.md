---
title: '♻️ 优化 Element PWA 的使用体验'
date: 2023-01-07 13:31:02
tags:
- Matrix
- Electron
category: Arch折腾记
cover: https://imgsrc.chyk.ink/6d81800a19d8bc3ed336350fc78ba61ea8d3453c.webp
---

Element 桌面客户端的启动速度很慢，响应也很慢，而 PWA 可以做到几乎秒开，再配合上托盘图标和扩展程序，应该是 Linux 桌面端体验最佳的 Matrix 客户端了。

<!--more-->

### 📥 托盘图标

KDE 使用 [KDocker](https://github.com/user-none/KDocker)，就可以把 PWA 最小化到托盘。

下面是我写的脚本，使用 Firefox 启动 Element 的 PWA 后，使用 KDocker 添加托盘图标。KDocker 支持使用自定义的图标文件，所以可以直接用自己做的单色图标。

```bash ~/.local/bin/element
#!/usr/bin/env bash
/usr/bin/firefoxpwa site launch 01GP517Z25TZYY7XDTQKFYR58A &
sleep 4
for window in $(xdotool search --class FFPWA-01GP517Z25TZYY7XDTQKFYR58A); do
    title="$(xdotool getwindowname $window | awk -F' | ' '{print $1}')"
    if [[ $title == "Element" || $title == "新标签页" ]]; then
        kdocker -w $window -m -q -i '~/.local/share/icons/hicolor/256x256/apps/element-symbolic.svg'
    fi
done
```

之后直接把 Element PWA 的 desktop 文件中的启动条目替换为这个脚本即可。

美中不足的是，和现版本的 QQ NT 类似，KDocker 并不支持点击关闭之后最小化到托盘，想要最小化，只能点击它的托盘图标。

GNOME 使用 [Minimize to Tray](https://extensions.gnome.org/extension/1750/minimize-to-tray/) 扩展，也可以达到类似的效果。

### 🎴 扩展程序

给 PWA 安装 Stylus 扩展程序，就可以自定义样式，以更换颜色和布局。比如更换底色，避免原版 Element 日间主题过于瞎眼等界面问题。

这是[我编写的自定义样式](https://github.com/YidaozhanYa/my-scripts/tree/main/element-themes)，可供参考。

也可以安装其它扩展程序，比如 Tampermonkey。

{% image https://imgsrc.chyk.ink/cefc1e178a82b901f2a8f0f6368da9773812efea.webp %}
