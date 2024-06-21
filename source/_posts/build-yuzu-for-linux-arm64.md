---
title: 🐧 在 ARM64 Linux 系统上编译安装 Yuzu 模拟器
date: 2024-06-21 19:26:19
tags:
- Yuzu
- Linux
category: 模拟器
cover: https://imgsrc.baidu.com/forum/pic/item/2f738bd4b31c8701462061d8617f9e2f0708ff7f.jpg
references:
  - title: "Building for Linux - yuzu"
    url: "https://git.tardis.systems/mirrors/yuzu/wiki/Building-for-Linux.md"
---

Yuzu 模拟器在 [PR #12074](http://web.archive.org/web/20240227234130/https://github.com/yuzu-emu/yuzu/pull/12074) 中加入了 Native Code Execution 功能，使其在 ARM64 平台运行的性能提高了五倍以上，能以几乎 100% 的性能游玩 NS 游戏。然而，Yuzu 并没有官方的 ARM64 Linux 构建版本。本文就给出在 ARM64 平台编译 Yuzu 模拟器的一种方法。

<!--more-->

### 🗄️ 获取源码

一封律师函让 Yuzu 的 GitHub 仓库变成了 404，但万幸的是，Internet Archive 上存档了 Yuzu 的完整源代码。[点此](https://archive.org/download/yuzu-windows-msvc-20240304-537296095_20240305_1340/Source/Yuzu%20recursive.zip)即可下载。  
如果你无法访问 Internet Archive，可以在[千雪的文件站](https://file.chyk.ink/%E6%A8%A1%E6%8B%9F%E5%99%A8%E6%B8%B8%E6%88%8F/NS/Yuzu%20recursive.zip)下载。

此压缩包包含所有的 git 子模块，直接解压即可，不需要再手动拉取子模块。

### 🔧 安装依赖

根据对应的发行版安装依赖。

Arch Linux / Manjaro:  
```bash
sudo pacman -Sy --needed base-devel boost catch2 cmake ffmpeg fmt git glslang libzip lz4 mbedtls ninja nlohmann-json openssl opus qt6{,-webengine,-multimedia} sdl2 zlib zstd zip unzip
```

Ubuntu / Linux Mint / Debian:  
```bash
sudo apt-get install autoconf cmake g++-11 gcc-11 git glslang-tools libasound2 libboost-context-dev libglu1-mesa-dev libhidapi-dev libpulse-dev libtool libudev-dev libxcb-icccm4 libxcb-image0 libxcb-keysyms1 libxcb-render-util0 libxcb-xinerama0 libxcb-xkb1 libxext-dev libxkbcommon-x11-0 mesa-common-dev nasm ninja-build qtbase6-dev qtbase6-private-dev qtwebengine6-dev qtmultimedia6-dev libmbedtls-dev catch2 libfmt-dev liblz4-dev nlohmann-json3-dev libzstd-dev libssl-dev libavfilter-dev libavcodec-dev libswscale-dev
```

Fedora:  
```bash
sudo dnf install autoconf ccache cmake fmt-devel gcc{,-c++} glslang hidapi-devel json-devel libtool libusb1-devel libzstd-devel lz4-devel nasm ninja-build openssl-devel pulseaudio-libs-devel qt6-linguist qt6-qtbase{-private,}-devel qt6-qtwebengine-devel qt6-qtmultimedia-devel speexdsp-devel wayland-devel zlib-devel ffmpeg-devel libXext-devel
```

### 🛠️ 编译

```bash
export VCPKG_FORCE_SYSTEM_BINARIES=1
mkdir build; cd build
cmake .. -GNinja -DYUZU_DOWNLOAD_TIME_ZONE_DATA=ON -DYUZU_TESTS=OFF -DYUZU_USE_BUNDLED_VCPKG=OFF -DENABLE_QT6=ON -DENABLE_QT_TRANSLATION=ON -DYUZU_USE_BUNDLED_QT=OFF -DYUZU_USE_QT_MULTIMEDIA=ON -DYUZU_USE_QT_WEB_ENGINE=ON -DYUZU_USE_FASTER_LD=OFF -DYUZU_USE_EXTERNAL_SDL2=OFF -DYUZU_USE_EXTERNAL_VULKAN_HEADERS=OFF -DYUZU_USE_BUNDLED_FFMPEG=OFF -Wno-dev -DYUZU_ENABLE_LTO=ON -DENABLE_COMPATIBILITY_LIST_DOWNLOAD=OFF -DUSE_DISCORD_PRESENCE=OFF -DSIRIT_USE_SYSTEM_SPIRV_HEADERS=ON
ninja
```

之后即可在 bin 文件夹中找到 `yuzu` `yuzu-cmd` `yuzu-room` 等可执行文件。

dist 文件夹中有 svg 格式的图标和 desktop 文件，放到对应文件夹即可把 Yuzu 添加到应用列表。

### ℹ️ 游玩注意事项

尽管 Native Code Execution 可以带来很高的性能，但根据该 pr 的说明，它在部分游戏（特别是 32 位游戏）不可用，并且根据我实际测试，在 Linux 平台不会自动 fallback 到 Dynarmic。在玩这些游戏时，仍然需要手动把 CPU 后端切换为 Dynarmic。

### 🖼️ 运行效果

设备为小米平板 5（高通骁龙 860）。

{%image https://imgsrc.baidu.com/forum/pic/item/6a600c338744ebf8059ab7019ff9d72a6059a721.jpg 超级马里奥兄弟 惊奇，Native Code Execution %}

{%image https://imgsrc.baidu.com/forum/pic/item/e7cd7b899e510fb3b5eba4a99f33c895d1430c1a.jpg 超级马里奥 3D 世界 + 狂怒世界，Dynarmic %}
