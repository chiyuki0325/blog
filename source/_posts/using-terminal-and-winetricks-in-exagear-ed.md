---
title: 🍷 在 ExaGear 模拟器中使用终端模拟器和 Winetricks
date: 2021-05-31 20:00:56
tags: 
- ExaGear
- Wine
category: 模拟器
---

#### 序言

[ExaGear](http://elbrus-technologies.com/product/exagear-mobile/)是一个可以在ARM架构安卓手机上游玩电脑游戏和使用电脑软件的模拟器，目前使用广泛者为ED版。然而当你在ExaGear里游玩需要VB6运行环境的SMBX，或是运行需要VC2005运行环境的Office2007时，总会因为确实运行环境而懊恼；当你在ExaGear里玩某些中文或日文游戏时缺了字体时，或是下了个游戏压缩包，而用手机的压缩软件解压时，文件名都是乱码时，总会看着满屏口口口或锟斤拷而头皮发麻。

{% image https://www.helloimg.com/images/2021/05/31/BuZ0ih.jpg 因为将语言设置为日语，运行中文游戏出现乱码 download:true %}

而ExaGear能运行Windows程序，是因为它内置了一个[Wine](//winehq.org)。众所周知在Linux下有一个好东西——Winetricks，可以很方便地补全Wine的运行环境、字体和常用工具，让Wine更好喝。既然ExaGear中也是通过模拟x86的Linux，在其中运行Wine，那能否使用Winetricks呢？

{% image https://www.helloimg.com/images/2021/05/31/BuZNzc.png Winetricks download:true %}

在一般情况下，答案是不能，因为Winetricks是一个Shell脚本，需要通过在终端里输入指令使用，或是通过[X11](//x.org)下的Zenity图形界面点击使用，而ExaGear中只能启动Wine，没有终端，也没有基于X11的桌面或窗口管理器。在此情况下，4PDA论坛的GFOXSH和Zhymabek_Roman两位大佬就想出了一个解决办法——在ExaGear中做一个终端模拟器。目前这个终端模拟器已无法在ED301模拟器中使用，所以GitHub的akbarri就制作了V2版本。

{% ghcard akbarri/ExaTermV2 %}

接下来开始教程吧！

-----

#### 教程

首先我们需要下载这个终端模拟器。

下载地址：

https://github.com/akbarri/ExaTermV2/releases/latest/

{% border %}

如果你无法访问GitHub，可以试试镜像站。

https://hub.fastgit.org/akbarri/ExaTermV2/releases/latest/

{% endborder %}

在其中点击“ExaTerm.exe”下载即可。

<img src="https://www.helloimg.com/images/2021/05/31/BuZpBq.png" alt="img" style="zoom: 67%;" />

之后需要下载Winetricks工具。

下载地址：

https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks

{% border %}
对于国内用户请使用镜像站
https://raw.fastgit.org/Winetricks/winetricks/master/src/winetricks
{% endborder %}

如果你点进去看到一堆不知所云的鬼画符，那么就将下载地址粘贴到```ADM Pro```之类的下载器。

然后将ExaTerm.exe和winetricks放入你ExaGear的游戏文件夹（比如原版ED301为```内部存储/Downloads```）。

现在启动ExaGear，将winetricks文件放到```Z:\usr\bin```文件夹（即Z盘usr文件夹中的bin文件夹）。

{% folding 如果你没有Z盘，请手动开启Z盘映射。方法如下： %}

点击左下角的“起点”按钮，输入```winecfg```点击确定，切换到“驱动器”标签点击“添加”，选择Z盘，将路径改为最上面硬盘图标的“/”，确定即可。

{% image https://www.helloimg.com/images/2021/05/31/BuZ6eK.jpg width:500px bg:black %}

{% endfolding %}

然后打开终端。这时候你可能就懵逼了：我是谁？我在哪？我现在要干什么？

{% image https://www.helloimg.com/images/2021/05/31/BuZDf1.jpg width:500px bg:black %}

别急，现在在最下面的输入框内输入```winetricks 软件包名```并回车，就可以安装缺失的东西了（请自备科学上网）。

比如我要安装VB6运行环境，那么就输入```winetricks vb6run```并回车，稍等几分钟（模拟器可能会多次黑屏重启），待出现了很多提示之后，提示不再滚动就是安装完成。

（```Executing mkdir -p /home/xdroid```和```WINEARCH=win32```时耗时较长，不要误以为安装完成。）

{% image https://www.helloimg.com/images/2021/05/31/BuZ8Tb.jpg width:500px bg:black %}

---

#### 副作用

副作用几乎为零。我目前发现的副作用只有文件管理器中多出Y盘。如果安装VC运行库时出现大量dll报错，请删除并重新添加环境。
