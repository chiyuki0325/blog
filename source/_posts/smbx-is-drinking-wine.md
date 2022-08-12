---
title: 🍷 SMBX 喝了 Wine！
date: 2021-05-30 16:09:52
tags: 
- SMBX
- Wine
- Linux
category: 游戏
---

喝了，最近装了ArchLinux，想在上面玩SMBX，却发现直接用Wine运行有重重BUG，后来经过一番调教终于能玩，来分享一下经验，争取让各位Linux SMBX玩家都能正常地喝上Wine!

---

#### VB6运行环境

SMBX是用VB6语言编写而成（TheXTech除外），Wine不像Windows一样自带VB6运行环境，如果你想游玩需要手动安装。如果你装有Winetricks，可以直接在对应Wine容器中安装```vb6run```软件包。

```bash
env WINEPREFIX="/home/[你的用户名]/.[Wine容器名字]" winetricks vb6run
```

{% grid %}
注：此处创建 Wine 容器的时候推荐创建 64 位容器而不是 32 位容器，这样可以提高 38A 版本的帧数。
{% endgrid %}

也可以使用图形界面安装。因为```vb6run```包需要从Internet Archive下载，所以记得开启科学上网。

如果你没有安装Winetricks，可以安装后使用其进行安装，也可以从网上下载VB6运行库文件。

{% folding 文件信息如下，记得别下错了 %}
文件名：vb6run.exe
大小：1020.7KiB
MD5：3f079faa9cffc8ee518309a03fcaa742
{% endfolding %}

---

#### 1.3版本 / TheXTech

老R的1.3版本能直接使用Wine运行，无需特殊调教，只需要使用Winetricks或Lutris开启DXVK环境即可。（不开亦可，只是性能稍差）。

俄狐移植的TheXTech有Linux原生版本，可以直接玩。

{% folding 效果图，好喝 %}
{% image https://www.helloimg.com/images/2021/05/30/BjNB8q.png %}
{% endfolding %}

---

#### 2.0版本 / LunaLua

这个难喝。SMBX Launcher运行正常，但不支持游戏内的自定义素材功能，所以会看到下面图二的情景。无法通过调教解决。

如果LunaLua脚本不正常，可以在Wine的函数库顶替中添加

{% grid %}
LunaDLL.dll
opengl32.dll
{% endgrid %}

然后重启游戏即可。

{% folding 效果图 %}
{% image https://www.helloimg.com/images/2021/05/30/BjNRST.png %}
{% image https://www.helloimg.com/images/2021/05/30/BjNGZr.png %}
{% endfolding %}

---

#### 38A版本

这个还比较正常，经过一番调教终于可以正常游玩。

首先需要准备：

{% grid %}

- 一个干净的Wine容器

注：此处创建 Wine 容器的时候推荐创建 64 位容器而不是 32 位容器，这样可以提高 38A 版本的帧数。

{% folding 可通过如下指令创建 %}

```bash
env WINEPREFIX="/home/[你的用户名]/.[Wine容器名字]" WINEARCH="win32" winecfg
```

{% endfolding %}

- Windows下的Tahoma和宋体字体
  可从百度下载，也可自行从Windows系统中拿出。
- 推荐准备一个Wine主题，否则编辑器会很违和
  {% endgrid %}

然后打开这个容器中的Wine设置（可通过刚才那步的指令打开，如果觉得麻烦，推荐使用Lutris）。

打开设置之后，更改Windows版本为```Windows XP```，然后加载主题（如果有的话），再添加如下几条函数库顶替。

```
fmodex.dll
FreeImage.dll
SciLexer.dll
SDL2MixerVB.dll
D3dx9_39.dll
```

之后用文件管理器打开```/home/[你的用户名]/.[Wine容器名字]/drive_c/windows/fonts```（如果没有fonts文件夹就新建），将Tahoma字体（tahoma.ttf）和宋体（simsun.ttc）粘贴进去。

粘贴之后，打开注册表编辑器。

{% folding 可通过如下指令打开，也可通过Lutris %}

```bash
env WINEPREFIX="/home/[你的用户名]/.[Wine容器名字]" wine "C:\windows\regedit.exe"
```

{% endfolding %}

在注册表编辑器中，打开
```HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\FontLink\SystemLink```
键，删除原来的 ```Lucida Sans Unicode```、```Microsoft Sans Serif```、```Tahoma```条目中的内容，并将其内容改为```simsun.ttc```。

再打开```HKEY_USERS\S-1-5-21-0-0-0-1000\Software\Wine\Fonts\Replacements ```键（如果没有Replacements就手动新建），添加一条字符串值```Tahoma```，值为```SimSun```。

这样就解决编辑器和游戏内中文乱码问题了，可以正常游玩喽！

（如果使用非点阵字体的话，游戏内的字号会非常小，所以使用宋体。）

{% folding 效果图 %}
{% image https://www.helloimg.com/images/2021/05/30/BjNgTS.png %}
{% image https://www.helloimg.com/images/2021/05/30/BjNVFQ.png %}
{% endfolding %}

---

#### 38A 1.4.5 启动崩溃的解决办法

2021.6.29补充：按照此方法，SMBX 1.4.5会启动崩溃并且报错Unable to Run，dll不全相关报错或者是“实时错误6：溢出”，可以按照如下方法解决：

首先[点我](https://pan.yidaozhan.gq/ali/PC%E6%B8%B8%E6%88%8F/Linux%20SMBX%E7%94%A8wineprefix%E6%89%80%E9%9C%80%E6%96%87%E4%BB%B6.tar.gz)下载所需文件，然后复制其中“3d”文件夹中的所有文件到```/home/[你的用户名]/.[Wine容器名字]/drive_c/windows/system32```目录下，然后执行 ``` env WINEPREFIX="/home/[你的用户名]/.[Wine容器名字]" wine regedit``` 命令，导入文件夹中的“d3d.reg”（如出现问题就也导入“d3doptimized_with_hardware.reg“，正常不必导入），然后退出即可。

---

#### Super Mario ReInvent

这个版本在Windows会爆帧，Linux也不例外，为避免爆帧，开启桌面环境的垂直同步即可，也可以在Lutris中设置。

---

#### 非 TheXTech 版本的全屏优化

如果你很反感全屏拉伸画面，那么可以给Wine容器开启虚拟桌面来避免拉伸，实现（伪）窗口化全屏。

只需要在Wine设置或Lutris设置中打开虚拟桌面，并按需调整分辨率就可以了。

{% folding 设置方法 %}
{% image https://www.helloimg.com/images/2021/05/30/BjNutE.png %}
{% image https://www.helloimg.com/images/2021/05/30/BjNjBv.png %}
{% endfolding %}

---

祝各位都能愉快地喝上Wine！

