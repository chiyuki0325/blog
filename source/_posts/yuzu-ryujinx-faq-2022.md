---
title: ❓ Yuzu / Ryujinx 模拟器常见问题解答（2022 - 持续更新）
date: 2022-04-06 19:01:48
tags:
- 模拟器
- Yuzu
- Ryujinx
category: 游戏
---

{% border %}

注：

- 本文中带 {% wavy 红色波浪线 %} 批注的外链可能需要 **「特殊的网络环境」** 才能访问。
- 本文中带 {% emp 红色点符号 %} 批注的资源受任天堂的版权保护。
- 正文部分只写关于 Windows 操作系统的内容，Linux 相关有专门的章节。
- 如遇到本文有错误或不严谨的地方，欢迎在评论区补充，会修改。
- 本文内容并非全部原创，部分文本来源于他人编写的教程或群内聊天记录。

{% endborder %}

### 通用/概念篇

{% folding 何为密钥&nbsp;(keys) %}

{% emp 密钥 %} 是 NS 系统的一部分，用于解读游戏，没有密钥就无法加载任何游戏。

它的文件名是 `prod.keys` 。

{% endfolding %}

{% folding 何为固件&nbsp;(Firmware) %}

{% emp 固件 %} 就是 NS 系统文件。

Yuzu 中固件用于提供字库，没有固件，游戏中的文字将显示为问号。如果不在意的话可以不装。

Ryujinx 中固件是运行游戏必装的。

它一般是一个文件名为 `Firmware XX.X.X.zip` 的压缩包。

![http://imgsrc.baidu.com/super/pic/item/f7246b600c338744c538cda8140fd9f9d62aa061.jpg](http://imgsrc.baidu.com/super/pic/item/f7246b600c338744c538cda8140fd9f9d62aa061.jpg)

{% endfolding %}

{% folding 如何获取密钥（keys）文件？ %}

{% emp 密钥 %} 可以从相关交流群中获取，或上网查找碰运气。

{% endfolding %}

{% folding 模拟器不流畅，各种卡顿 %}
通俗解释：有这么一句话，「模拟一个机器需要十倍于它的功力」，虽然Yuzu优化很好，但想要流畅模拟NS，你的电脑起码得是NS的五六倍性能才行。如果你电脑是八年前或更旧的，那么就算了。
{% endfolding %}

{% folding 模拟器为何如此费电 %}

![http://imgsrc.baidu.com/super/pic/item/810a19d8bc3eb135a137556fe31ea8d3fc1f4476.jpg](http://imgsrc.baidu.com/super/pic/item/810a19d8bc3eb135a137556fe31ea8d3fc1f4476.jpg)
模拟一个东西需要十倍于他的机能，所以要么做好电表倒转的心理准备，要么就买NS。
笔记本电脑的话尽量插上电源游玩。
{% endfolding %}

{% folding 为什么比较新的游戏会无法识别？ %}
![](https://www.helloimg.com/images/2021/07/27/CJwpSg.png)
下载更新的密钥，然后覆盖掉原来的。
{% endfolding %}

{% folding 游玩过程中每次遇到新东西都会卡顿 %}
卡顿的时候，其实是模拟器在「编译着色器」，将该物件从「NS的语言」翻译成「你电脑看得懂的语言」（俗称“跑缓存”），所以这个过程会卡顿。而之后再次遇到这个物件就不会卡顿，是因为这个物件已经被缓存下来了。

所以多玩玩就不会卡了。

或者也可以去 Yuzu / Ryujinx 贴吧找找有没有吧友预先跑好的缓存。
{% endfolding %}

{% folding 关于“联网” %}
1.是NS模拟器现在根本无法「联网」，只能「联机」。

2.是实现「联机」需要很高的网速以及支持UPnP协议和公网IP，而这在国内基本不可能，只有少数幸运儿有。

如果乐于折腾并且满足条件可以尝试。
{% endfolding %}

### Yuzu 篇

https://www.bilibili.com/read/cv15405863

也可以参考这篇文章。

{% folding Yuzu如何安装？ %}
可以参考[这篇文章](https://www.bilibili.com/read/cv15405863)，本文不再赘述。
关于Yuzu安装固件的部分请参考本文。
也可以使用贴吧中的安装工具。

{% endfolding %}

{% folding 提示缺少组件，无法载入游戏 %}

![](https://www.helloimg.com/images/2021/07/27/CJiToz.png)

获取 {% emp 密钥 %} 并且安装。

{% endfolding %}

{% folding Yuzu&nbsp;的密钥安装到何处？ %}

安装到 `数据文件夹/keys` 。

{% endfolding %}

{% folding Yuzu&nbsp;的固件安装到何处？ %}

将固件中的 nca 文件放置到 `数据文件夹/nand/system/Contents/registered/`。

如文件夹不存在就自行建立。

{% endfolding %}

{% folding Yuzu&nbsp;的数据文件夹在何处？ %}

点击 `文件` - `打开 yuzu 文件夹` 就可以打开。

在 Windows 上，一般在 `C:/users/用户/AppData/Roaming/yuzu`（位于 C 盘）。

如果嫌它占用过多 C 盘空间，就在模拟器文件夹中建立 `user` 文件夹，并且把旧数据文件夹中的所有东西移动过来即可。

因为它叫 user，因此也被称作 user 文件夹。

{% endfolding %}

{% folding 如何安装升级档和 DLC %}
选择**文件**->**安装文件到NAND...**

![http://imgsrc.baidu.com/super/pic/item/738b4710b912c8fc6fd31b19b9039245d78821c6.jpg](http://imgsrc.baidu.com/super/pic/item/738b4710b912c8fc6fd31b19b9039245d78821c6.jpg)

![http://imgsrc.baidu.com/super/pic/item/b7003af33a87e95074341eb855385343faf2b4c7.jpg](http://imgsrc.baidu.com/super/pic/item/b7003af33a87e95074341eb855385343faf2b4c7.jpg)

转自 https://www.bilibili.com/read/cv15405863

{% endfolding %}

{% folding Yuzu&nbsp;支持哪些操作系统？ %}

64位的 Windows 7 及以上或 Linux (最好内核版本5.4以上)。

Windows XP 、 Mac OS 以及内核版本过旧的 Linux 不可以使用 Yuzu 。

32位系统也不可以使用Yuzu。

{% endfolding %}

{% folding 提示缺少&nbsp;MSVCP&nbsp;开头的&nbsp;dll %}

![](https://www.helloimg.com/images/2021/07/27/CJiC3r.png)

安装 [Visual C++ 2019/2022 运行库](https://aka.ms/vs/17/release/vc_redist.x64.exe)即可。

{% endfolding %}

{% folding 如何获取 mod 并安装 %}
常见mod下载地址： https://github.com/yuzu-emu/yuzu/wiki/Switch-Mods
安装方法：右键某个游戏，选择 **打开MOD数据位置**

![http://imgsrc.baidu.com/super/pic/item/6d81800a19d8bc3e2113eb1ec78ba61ea9d345cf.jpg](http://imgsrc.baidu.com/super/pic/item/6d81800a19d8bc3e2113eb1ec78ba61ea9d345cf.jpg)

![http://imgsrc.baidu.com/super/pic/item/d62a6059252dd42a1d13ec7f463b5bb5c8eab8c8.jpg](http://imgsrc.baidu.com/super/pic/item/d62a6059252dd42a1d13ec7f463b5bb5c8eab8c8.jpg)

放进去之后在模拟器界面，右键某个游戏，选择 **属性** 就可以看到放进去的mod了

![http://imgsrc.baidu.com/super/pic/item/8cb1cb134954092359738eaad758d109b2de49c8.jpg](http://imgsrc.baidu.com/super/pic/item/8cb1cb134954092359738eaad758d109b2de49c8.jpg)
如果你放进去了mod但是这里没有显示，那么可能是因为mod的目录结构不对，**mod的目录结构**一般都是**mod名字\exefs\xxx.pchtxt**，例如**Disable FXAA\exefs\1.0.0.pchtxt**，如果你只有pchtxt文件或者，可以自己创建一个这种目录结构放进去，试试会不会生效。

同时mod也有版本，如果游戏更新了，mod可能也需要更新才能使用。

转载自 https://www.bilibili.com/read/cv15405863

{% endfolding %}

{% folding Yuzu如何联机？ %}
首先确保所有玩家都在同局域网内（或使用 ZeroTier 等虚拟局域网），之后在 Yuzu 网络设置中选好自己的网卡（虚拟局域网的话选虚拟网卡），之后进入游戏隐藏的局域网模式（可自行百度）就可以玩了。
{% endfolding %}

{% folding Yuzu 的红蓝版和预先测试版有什么区别？ %}
1、Mainline（即主线版/稳定版)。Mainline的图标为红色和蓝色，通常比Early Access更新慢一些，新特性少一些，但也更稳定。

2、Early Access（即抢先体验版/捐赠付费版）Early Access的图标为黄色和灰色，一般每天都有更新，会加入正在测试的新特性，因此性能一般比Mainline好。

正常情况下你需要给Yuzu团队每月付捐赠费用才能使用Early Access，但已经有老外帮咱们破解好了，所以咱们才能用上Early Access。~真可谓黑吃黑~

{% endfolding %}

{% folding 如何安装金手指 %}
金手指的安装方法与mod一致，也是先右键某个游戏，选择**打开MOD数据位置**，然后把金手指放进去就可以了，只不过金手指的目录结构一般都是**金手指名字\cheats\xxx.txt**，例如**剑盾金手指\cheats\剑盾金手指.txt**。

如果你有一段金手指代码，可以在mod目录下创建一个**金手指目录**，然后在里面再创建一个**cheats**目录，进去再创建一个**txt文件**，把代码复制进去保存就可以了

通常一个金手指txt文件里面包含很多功能，这些功能在一个文件里只能全部启用或者全部不启用(启用或者不启用的方法与mod一致，都是在模拟器中右键某个游戏，然后在弹出的窗口中勾选或者不勾选)，如果你想把每个功能分开，可以在mod目录下创建多个金手指目录，然后每个txt文件里只放一个功能就行了。例如 阿尔宙斯无限金钱\cheats\阿尔宙斯无限金钱.txt，阿尔宙斯无限生命\cheats\阿尔宙斯无限生命.txt，其中两个txt文件各自放各自的代码。

转载自 https://www.bilibili.com/read/cv15405863

{% endfolding %}

{% folding 如何安装着色器缓存 %}
右键某个游戏，选择**打开可转移着色器缓存**，即可弹出缓存所在文件夹，然后放入你下载的别人的缓存就行了

转载自 https://www.bilibili.com/read/cv15405863

{% endfolding %}

{% folding 游戏中部分元素会闪烁/花掉 %}
如 [https://tieba.baidu.com/p/7466079180](https://tieba.baidu.com/p/7466079180) 。
这种情况有3种成因。

一是因为你使用Intel核显，Intel驱动不完善出现的图形错误，更换独立显卡即可。

二是因为Yuzu的某种图形API尚不完善，更换另一种图形API即可。（通常Vulkan比较爱出bug，不过有时候OpenGL也会出bug。）

另外「异步着色器编译」也不完善，如果开启了该选项发生图形错误，那么就关掉。

三是Yuzu尚未适配该游戏，请等待适配。
{% endfolding %}

{% folding Yuzu如何改善画质 %}
新版Yuzu已经支持倍增分辨率，并且可以使用 AMD FSR （N卡也可以哦，只要渲染器是Vulkan就可以）改善画质，如果游戏画质不佳可以使用FSR或者2倍分辨率食用。
{% endfolding %}

### Ryujinx 篇

除了本文之外也可以参考这两篇文章。

https://www.bilibili.com/read/cv5008505

https://www.bilibili.com/read/cv9561850

{% folding Ryujinx&nbsp;支持哪些操作系统？ %}

详见 [.NET Core 支持的操作系统版本](https://www.cnblogs.com/twinhead/p/8280871.html?ivk_sa=1024320u) 。

部分 Ryujinx 版本不支持 Windows 7。

{% endfolding %}

{% folding 控制台窗口红字报错&nbsp;Unable&nbsp;to&nbsp;decrypt&nbsp;NCA&nbsp;section %}

![http://imgsrc.baidu.com/super/pic/item/1e30e924b899a9014daab9e258950a7b0308f543.jpg](http://imgsrc.baidu.com/super/pic/item/1e30e924b899a9014daab9e258950a7b0308f543.jpg)
{% endfolding %}

### 显卡驱动篇

{% folding 提示不支持 OpenGL 4.6 或 Vulkan %}
“ `your GPU may not support OpenGL4.6，or you do not have the latest graphics driver.`”
更新显卡驱动即可。
英伟达显卡请去 [www.nvidia.cn](http://www.nvidia.cn/) 的「驱动程序下载」版块下载新版驱动安装，AMD/ATI显卡请去 [www.amd.com](http://www.amd.com/) 的「驱动与支持」版块下载新版驱动安装。
{% endfolding %}

{% folding AMD显卡为什么效率这么低 %}
Yuzu 可以切换到 Vulkan API，Ryujinx的话就无解了。
AMD 的 Windows 驱动对 OpenGL 优化实在是太差了。

“前几年A卡太垃圾，模拟器作者基本都是N卡适配，就好像手机都是高通适配一样”
{% endfolding %}

### 游戏文件篇

{% folding 如何获取游戏资源？ %}
不提倡传播{% emp 盗版游戏 %}，不过可以去 [Switch520全球白嫖网](https://switch520.com) 等网站，
{% endfolding %}

{% folding NS的游戏一般是什么格式？%}

`nsp` 或 `xci`。

`nsp` 是任天堂 eShop 数字版游戏文件，一般本体和升级档分开。

`xci` 是 NS 卡带文件，一般是一整个文件。

{% endfolding %}

{% folding xci整合版游戏被模拟器识别为1&#46;0&#46;0版本 %}

使用NSCB工具把xci拆成若干NSP（本体和升级档）并且依次安装。

{% endfolding %}

{% folding nsz游戏如何转换为nsp？ %}

使用NSCB工具的压缩解压模式即可。

{% endfolding %}

{% folding 魔改XCI和原版XCI有什么不同 %}
switch520的魔改游戏是给破解机的旧固件用的，不建议新模拟器使用。
不过你还在用老的keys（比如9.0，11.0）的话就用魔改游戏。

{% endfolding %}

### 游戏支持篇

{% folding 某某游戏可以在 Yuzu 上玩吗？ %}
去[官网](https://yuzu-emu.org/game/)查询。
Tips：使用Ctrl+F快捷键来查找游戏英文名。
{% endfolding %}

{% folding 某某游戏可以在 Ryujinx 上玩吗？ %}
去[官网](https://github.com/Ryujinx/Ryujinx-Games-List/issues)查询。
{% endfolding %}

对于具体游戏的支持可以前往 `yuzu模拟器吧` / `ryujinx吧`，或看 2021 旧版文章。

https://blog.yidaozhan.top/2021/07/27/yuzu-faq/#%E5%85%B7%E4%BD%93%E6%B8%B8%E6%88%8F%E8%BF%90%E8%A1%8C%E7%9B%B8%E5%85%B3

### 操作系统 (Windows) 篇

### Linux 篇

### 辅助工具篇

{% folding Yuzu&nbsp;Tool、Ryuzu&nbsp;Tool与NS模拟器助手 %}

[Yuzu Tool](https://tieba.baidu.com/p/7707387158) 最早由贴吧吧友[浅时光°Triste](https://tieba.baidu.com/home/main?id=tb.1.49499a8d.blf4ca32-Qw58GSaOp6ihg?t=1642557514&fr=pb)（当时的 ID 为 Luminary0000）编写，提供安装 Yuzu 模拟器的功能。
[Ryuzu Tool](https://tieba.baidu.com/p/7724666241) ~~为 Yuzu Tool 的正统续作~~ 是浅时光嫌 Yuzu Tool 写的太烂之后推倒重写的工具，这次加入了 Ryujinx 的安装，支持众多分支版本模拟器。其使用了 NS 模拟器助手的高速下载源，并支持更新等功能。

[NS 模拟器助手](https://tieba.baidu.com/p/7712446946) 最早是 [是一刀斩哒](https://space.bilibili.com/485832788?spm_id_from=..0.0) （即本帖作者）在 Ryuzu Tool 开发时临时编写，引入[基于阿里云盘的高速下载](https://github.com/YidaozhanYa/ActionsMirror)，后来也经过几次完善，可以在 Ryuzu Tool 不能用的情况下使用。

{% endfolding %}

{% folding Ryuzu&nbsp;Tool&nbsp;无法打开（无响应） %}

![http://imgsrc.baidu.com/super/pic/item/2e2eb9389b504fc2be9750d1a0dde71191ef6d1e.jpg](http://imgsrc.baidu.com/super/pic/item/2e2eb9389b504fc2be9750d1a0dde71191ef6d1e.jpg)

Ryuzu Tool 不兼容 Win7。

{% endfolding %}

{% folding NS模拟器助手打开出现注册表错误 %}

NS 模拟器助手的主程序是 `NSEmuHelper.exe` 而不是 `ImportRegistry.exe` 。这个但凡会那么一点点英语都能知道吧

{% endfolding %}

2021 旧版文章：https://blog.yidaozhan.top/2021/07/27/yuzu-faq/

