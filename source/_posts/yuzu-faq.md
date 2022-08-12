---
title: ❓ Yuzu 常见问题解答
date: 2021-07-27 10:37:20
tags:
- Yuzu
category: 模拟器
---

请在左侧目录查找你想问的问题。

## 本文档所用名词解释

- Yuzu数据目录——即模拟器存放数据的目录，Windows上默认为```C:\Users\你的用户名\AppData\Roaming\Yuzu```。

---

## 系统相关

### - Yuzu可以运行于哪些系统？

解答：64位的 Windows 7 及以上或 Linux (最好内核版本5.4以上)。

Windows XP 、 Mac OS 以及内核版本过旧的 Linux 不可以使用 Yuzu 。

32位系统也不可以使用Yuzu。



### - 提示缺少MSVCP140.dll怎么办？

{% image https://www.helloimg.com/images/2021/07/27/CJi5Vq.png %}

解答：下载Microsoft Visual C++ 2019运行库安装即可。



### - 提示缺少MSVCP140_ATOMIC_WAIT.dll怎么办？

{% image https://www.helloimg.com/images/2021/07/27/CJiC3r.png %}

解答：是因为你的Microsoft Visual C++ 2019运行库版本太旧。这个DLL只在14.28以后的运行库有。

点[此处](https://pan.yidaozhan.gq/ali/PC%E8%BD%AF%E4%BB%B6/MSVC2019/)下载新版Microsoft Visual C++ 2019运行库。

不要自作主张去网上下载这个DLL，可能会和你的系统版本/架构不同。

---

## 模拟器相关

### - 提示缺少组件无法运行怎么办？

{% image https://www.helloimg.com/images/2021/07/27/CJiToz.png %}

解答：下载NS系统密钥（keys）并解压，将```prod.keys```文件放到```Yuzu数据目录\keys```即可。

{% grid %}

传播NS系统密钥虽然违反任天堂的使用协定，但你可以在一些模拟器相关的交流群找到密钥。

{% endgrid %}



### - 某群Yuzu搬运太慢了，我想体验最新版Yuzu，在哪下载？

解答：首先打开这个链接：

https://hub.fastgit.org/pineappleea/pineapple-src/releases/latest

然后点击```Assets```一栏中的```Windows-Yuzu-EA-(版本号).7z```就开始下载了。



### - 我下载了新版本Yuzu，如何更新？

解答：直接解压缩后覆盖在旧版模拟器安装目录上即可。不需要做额外操作。



### - 游玩过程中模拟器突然闪退

解答：你的运行内存不够大。请增大你虚拟内存的大小。方法请自行百度。

{% note color:red 使用虚拟内存会影响硬盘（特别是固态硬盘）的寿命，如果你不想让硬盘受损，就给你的电脑增加内存条。 %}

另外开启Enable GPU cache garbage collection选项，可以大大降低闪退概率。

也有可能是Yuzu团队还没适配该游戏，请等待适配。



### - 无法进入游戏，一直卡在启动中

解答：这种问题有两种成因。

一是模拟器语言设置错误。请确保你模拟器的游戏语言设置为「简体中文」，而非「中文」。

二是你要游玩的游戏模拟器尚未支持，请去相关群里询问是否能通过加载mod的方法来游玩该游戏，或者静静等待Yuzu适配该游戏。



### - 界面和游戏都是英文的，怎么调成中文？

解答：请见另一篇文章[Yuzu优化指南](/2021/07/23/yuzu-optimizing/)。



### - Yuzu的分支版本区别

解答：Yuzu主要有两个分支版本。

<img src="https://cdn.jsdelivr.net/gh/yuzu-emu/yuzu@latest/dist/yuzu.svg" width='24' height='24' />1、Mainline（即主线版/稳定版)。Mainline的图标为红色和蓝色，通常比Early Access更新慢一些，新特性少一些，但也更稳定。

<img src="https://cdn.jsdelivr.net/gh/pineappleEA/pineapple-src@latest/dist/yuzu.svg" width='24' height='24' />2、Early Access（即抢先体验版/捐赠付费版）Early Access的图标为黄色和灰色，一般每天都有更新，会加入正在测试的新特性，因此性能一般比Mainline好。

正常情况下你需要给Yuzu团队每月付捐赠费用才能使用Early Access，但已经有老外帮咱们破解好了，所以咱们才能用上Early Access。~~真可谓黑吃黑~~



### - Yuzu在C盘占用了太多空间，我想释放一下C盘

解答：将Yuzu数据目录移动到你的模拟器(yuzu.exe)所在文件夹，并改名为user。



### - Yuzu如何安装别人的着色器缓存？

解答：在Yuzu中右键点击某游戏，点击「打开可转移着色器缓存」，然后使用别人缓存中的```opengl.bin```文件替换你的```opengl.bin```即可。

Tips：由于本次的Project Hades更新，旧的缓存已经全部失效，请使用EA1900或更高版本模拟器编译出来的缓存。

---

## 显卡相关

### - 为什么只能使用OpenGL，不能使用Vulkan？

如 https://tieba.baidu.com/p/7464287383 。

解答：你的显卡不支持Vulkan图形API。更新显卡驱动可能会解决，如果更新了驱动还是无法解决，那么就更换显卡吧。

英伟达显卡请去 www.nvidia.cn 的「驱动程序下载」版块下载新版驱动安装，AMD/ATI显卡请去 www.amd.com 的「驱动与支持」版块下载新版驱动安装。



### - 提示显卡不支持OpenGL 4.6

具体报错：

```your GPU may not support OpenGL4.6，or you do not have the latest graphics driver.```

解答：这个问题是你的显卡不支持OpenGL的新特性，有两种可能的成因，一是你的显卡太旧，二是你的显卡驱动太旧。

比如 https://tieba.baidu.com/p/7461531018 的情况就是典型的显卡太旧。

要更新显卡驱动的话，英伟达显卡请去 www.nvidia.cn 的「驱动程序下载」版块下载新版驱动安装，AMD/ATI显卡请去 www.amd.com 的「驱动与支持」版块下载新版驱动安装。

{% note color:red 显卡驱动请去官网下载，尽量别用驱动精灵之类的软件！ %}

{% folding Tips %}

![](https://www.helloimg.com/images/2021/07/27/CJijnE.png)

如果你「过度小心谨慎」，那么就不要玩模拟器了。

{% endfolding %}



### - AMD显卡运行太卡慢

解答：请使用Vulkan图形API。

(如果你有一定计算机水平可以安装Linux发行版，并且使用Linux版本Yuzu。)

---

## 游戏运行相关

### - 在哪里可以下载到NS游戏？

解答：不提倡传播盗版游戏，请自行寻找资源网站。

### - 为什么部分游戏中的文字无法显示？

<img src="https://www.helloimg.com/images/2021/07/27/CJitSY.png" alt="CJitSY.png" style="zoom: 50%;" />

<img src="https://www.helloimg.com/images/2021/07/27/CJnmqc.png" style="zoom: 33%;" />

解答：请下载一份```user文件夹```（大概几百MB，其中是NS的系统文件），并且将其中的所有文件夹```覆盖```到你的Yuzu数据目录。

<img src="https://www.helloimg.com/images/2021/07/27/CJiL5X.png" alt="CJiL5X.png" style="zoom:80%;" />

并且其中sysdata文件夹里面应该有这些东西。

<img src="https://www.helloimg.com/images/2021/07/27/CJibX6.png" alt="CJibX6.png" style="zoom:80%;" />

覆盖之后，再次启动游戏，字体就正常了。

{% grid %}

传播NS系统文件虽然违反任天堂的使用协定，但你可以在一些模拟器相关的交流群找到它。

{% endgrid %}



### - 为什么比较新的游戏会无法识别？

![](https://www.helloimg.com/images/2021/07/27/CJwpSg.png)

解答：请下载更新的NS系统密钥，然后覆盖掉原来的。



### - 为什么比较新的游戏会点开就崩溃？

解答：请等待Yuzu团队适配该游戏。



### - 游戏帧数太低，运行卡慢，如何优化？

解答：如果你的电脑配置比较低，就请升级你的电脑配置。如果你对你的电脑配置足够自信，那么请见另一篇文章[Yuzu优化指南](/2021/07/23/yuzu-optimizing/)，或者关掉模拟NS的主机模式（点击底栏DOCK按钮，变灰即为关闭）。

（如果不知道你电脑是什么水平，那么就问问[鲁大师](https://www.ludashi.com/)。



### - 为什么无法游玩在线模式？

解答：你用模拟器玩，本身就是违反了任天堂的使用协议，也就相当于盗版。盗版还想联机？可笑！



### - 有些游戏没有官方中文，但是有汉化补丁，该如何使用？

解答：首先在Yuzu主界面对游戏点击右键，然后点击「打开MOD数据位置」，在弹出的窗口中新建一个文件夹，名字随意，然后把汉化补丁的exefs（或romfs）文件夹放在你刚新建的文件夹中，重启模拟器，看到该游戏的“附加项“一栏出现了你刚刚新建的文件夹，这时候打开游戏就是汉化了。



### - Yuzu可以玩某某游戏吗？

解答：建议去官网「游戏兼容性」版块查询。

https://yuzu-emu.org/game/

Tips：使用Ctrl+F快捷键来查找。



### - 某游戏在别的平台和NS上都有，我该选择哪个？

解答：如果那个游戏有PC版，那么就尽量不要用模拟器玩了。

如果那个游戏在别的主机和NS都有，并且都可以用模拟器来玩，那么就优先选择发展更成熟的模拟器玩。

举个例子：《塞尔达传说 旷野之息》有WiiU版和NS版，那么就推荐使用Cemu模拟WiiU版。



### - 游戏中部分元素会闪烁/花掉

如 https://tieba.baidu.com/p/7466079180 。

解答：这种情况有3种成因。

一是因为你使用Intel核显，Intel驱动不完善出现的图形错误，更换独立显卡即可。

二是因为Yuzu的某种图形API尚不完善，更换另一种图形API即可。（通常Vulkan比较爱出bug，不过有时候OpenGL也会出bug。）

另外「异步着色器编译」也不完善，如果开启了该选项发生图形错误，那么就关掉。

三是Yuzu尚未适配该游戏，请等待适配。



### - 游玩过程中每次遇到新东西都会卡顿

解答：卡顿的时候，其实是模拟器在「编译着色器」，将该物件从「NS的语言」翻译成「你电脑看得懂的语言」，所以这个过程会卡顿。而之后再次遇到这个物件就不会卡顿，是因为这个物件已经被缓存下来了。

解决方法：下载别人已经编译好的缓存即可。[此为安装方法。](./#Yuzu如何安装别人的着色器缓存？)如果你完整通关了某个游戏，也欢迎把你的缓存分享出来。

Tips：由于本次的Project Hades更新，旧的缓存已经全部失效，请使用EA1900或更高版本模拟器编译出来的缓存。

---

## 具体游戏运行相关

### - 《塞尔达传说 织梦岛DX》中镜头聚焦错误

{% folding 图片 %}

![](https://www.helloimg.com/images/2021/07/27/CJvT9z.png)

{% endfolding %}

解答：请使用Vulkan图形API。



### - 《纸片马力欧 折纸国王》中奇诺比奥镇格外卡顿

解答：请用较新的模拟器并且使用Vulkan图形API。



### - 《超级马力欧 奥德赛》中击败酷霸王后崩溃

如 https://tieba.baidu.com/p/7460391341 。

解答：更换较旧的模拟器即可，如EA 10xx的版本。



### - 每次进入《超级马力欧 奥德赛》都要选择用户

解答：这是该游戏本身的设定。如果你NS里有多个用户，进游戏之前都会选择。

如果某个用户里没有重要的存档，你可以直接删除，删到一个为止。



### - 灾厄无双/异度之刃2/风花雪月 画质差，有很多锯齿

解答：这是因为这些游戏优化不行/同屏元素过多，在NS上本来画质就有缩水，放到模拟器上也是一样。除非你找到了和你游玩版本对应的画质补丁。



### - 《集合啦！动物森友会》每次启动都检查数据

解答：这可能是由于你某一回强制退出，也有可能是你从不同的模拟器数据目录之间 (或Yuzu和Ryujinx间) 迁移存档导致。这并不影响什么，无视就好。



### - 《超级马力欧 3D收藏辑》无法进入游戏

解答：3D收藏辑里的三款游戏《超级马力欧64》《超级马力欧阳光》《超级马力欧银河》各自的平台都已经有成熟的模拟器了，所以Yuzu团队压根没有适配。

---

## Linux相关

### - 为什么从archlinuxcn源下载的YuzuEA会无法启动？

![](https://www.helloimg.com/images/2021/07/27/CJipKT.jpg)

解答：那个版本有问题，如果想用YuzuEA，请自行编译。

https://github.com/pineappleea/pineapple-linux

---

本文中的问题均来源于相关交流群/百度贴吧。如果还有问题，或者我的解答错误，欢迎在下面的评论区提问/更正！
