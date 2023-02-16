---
title: 🐧 在 Linux 下愉快地玩《原神》
date: 2022-02-14 21:15:59
tags: 
- 原神
- Wine
category: Arch折腾记
cover: 'https://imgsrc.baidu.com/forum/pic/item/f636afc379310a55c267af35f24543a9832610ab.jpg'
---

众所周知，由于米忽悠的反作弊 `mhyprot2.sys`，原神一直不可以在 Wine 中运行，这时候可以使用 `Krock` 大佬的补丁来解决这个问题。本文只提供简要用法。

##### ⓪ 准备

确保使用 X11 显示协议和独显。Wayland 有图形问题。
尽量使用 `linux-zen` 或其它带有 `fsync` 和 `futex2` 补丁的内核。

##### ① 克隆仓库

```bash
git clone https://notabug.org/Krock/dawn
```

##### ② 安装 Lutris 和原神

```bash
yay -S lutris-git gamemode #安装最新版 Lutris（ArchLinux）
```

由于原版 dxvk 对于原神性能不佳，所以在 https://github.com/Sporif/dxvk-async/releases/latest 下载最新版 `dxvk-async`，解压备用。

打开 Lutris，右上角三点 - 首选项 - 运行环境 - Wine，安装 ``lutris-fshack-6.14-4`` (带全屏修复) 或 ``lutris-ge-6.16-1`` (不带全屏修复)，此过程需要特殊网络环境。

之后左上角加号 - Add localy installed game

![http://imgsrc.baidu.com/forum/pic/item/77094b36acaf2edd63100e3bc81001e93801937b.jpg](http://imgsrc.baidu.com/forum/pic/item/77094b36acaf2edd63100e3bc81001e93801937b.jpg)

![http://imgsrc.baidu.com/forum/pic/item/0b55b319ebc4b7458b4d5a0c92fc1e178b8215cb.jpg](http://imgsrc.baidu.com/forum/pic/item/0b55b319ebc4b7458b4d5a0c92fc1e178b8215cb.jpg)

![http://imgsrc.baidu.com/forum/pic/item/adaf2edda3cc7cd94ffa730b7c01213fb90e9109.jpg](http://imgsrc.baidu.com/forum/pic/item/adaf2edda3cc7cd94ffa730b7c01213fb90e9109.jpg)
（此处如果使用 `zen` 内核则使用 Fsync，否则使用 Esync）

![http://imgsrc.baidu.com/forum/pic/item/09fa513d269759ee41832719f7fb43166c22df15.jpg](http://imgsrc.baidu.com/forum/pic/item/09fa513d269759ee41832719f7fb43166c22df15.jpg)

![http://imgsrc.baidu.com/forum/pic/item/8b82b9014a90f6033e8fda957c12b31bb051ed21.jpg](http://imgsrc.baidu.com/forum/pic/item/8b82b9014a90f6033e8fda957c12b31bb051ed21.jpg)

（其中的 NVIDIA Prime 渲染卸载，如果你是笔记本电脑就打开，否则无法使用独显。）

之后准备原神安装包，菜单 - 在 Wine 容器中运行 exe 并正常安装原神。

安装完成后，打开终端，cd 到 `Genshin Impact game` 文件夹，之后 ``bash path_to_dawn/version_number/patch.sh``。

在同意协议之后，补丁会自动打进去。

然后编辑 `/etc/hosts`，加入这几行：

````
0.0.0.0 log-upload-os.mihoyo.com
0.0.0.0 overseauspider.yuanshen.com
0.0.0.0 log-upload.mihoyo.com
0.0.0.0 uspider.yuanshen.com
#如果怕封号，下面几行也可以加入，但会让你没法使用 Unity 编辑器
0.0.0.0 prd-lender.cdp.internal.unity3d.com
0.0.0.0 thind-prd-knob.data.ie.unity3d.com
0.0.0.0 thind-gke-usc.prd.data.corp.unity3d.com
0.0.0.0 cdp.cloud.unity3d.com
0.0.0.0 remote-config-proxy-prd.uca.cloud.unity3d.com
````

（其实如果在运行补丁脚本的时候使用了 `sudo` 的话，这几行会自动加进去）

返回 Lutris 游戏设置，更改启动路径。

![http://imgsrc.baidu.com/forum/pic/item/6f061d950a7b0208100f783327d9f2d3562cc81a.jpg](http://imgsrc.baidu.com/forum/pic/item/6f061d950a7b0208100f783327d9f2d3562cc81a.jpg)

在 `Genshin Impact game` 目录下创建 `dxvk.conf`内容如下：

````
#NVIDIA：
dxgi.nvapiHack = False
#AMD：
dxgi.nvapiHack = True

dxgi.numBackBuffers = 2
dxgi.syncInterval = 0
dxgi.tearFree = True
d3d11.constantBufferRangeCheck = False
d3d11.relaxedBarriers = True
d3d11.invariantPosition = False
d3d11.zeroWorkgroupMemory = False
````

之后就可以游玩了。

