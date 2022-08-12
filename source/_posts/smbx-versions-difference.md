---
title: 🍄 SMBX 各分支版本间的差异（转载，熟肉）
date: 2021-05-30 17:08:04
tags: 
- SMBX
- 转载
category: 游戏
---


{% image https://www.helloimg.com/images/2021/05/30/BjQRUM.png “SMBX世界”图&nbsp;by&nbsp;亨少 download:true  width:200px padding:16px bg:white %}

{% image https://www.helloimg.com/images/2021/05/30/BjQoPP.png “SMBX进化树”&nbsp;by&nbsp;Olhi download:true  width:300px padding:16px bg:white %}


**超级马里奥兄弟X** (简称**SMBX)** 是一个《超级马里奥》同人游戏引擎，最初于2009年由 Andrew "Redigit" Spinks 制作。该游戏使用 VB6 语言开发。在游戏的开发被停止之后，另外一些不同的人开始尝试续写SMBX的传奇。

### 主要分支版本

下面这些是SMBX的主要分支版本，它们都处于积极的开发和维护中（除了Redigit于2011年放弃开发的原始版本）。


#### 超级马里奥兄弟 X 1.3



<img src="https://www.helloimg.com/images/2021/05/30/BjQFn6.png" alt="img" style="zoom:67%;" />

这是游戏的主要版本，是一切 SMBX 分支的起源。它于 2009 年发布，直到 2011 年停止开发（游戏的最终版本于2010年10月发布）。这个版本定义了 “SMBX64” 标准，用于判断不同分支版本之间的兼容性。2020年2月2日之前，游戏一直是闭源的。在此期间， SMBX 吸引了很多游戏修改者和破解者，他们给 SMBX 本体开发了各种插件和模组。在这些插件中，最出名的是由Kil制作，发布在 Talkhaus 论坛上的 LunaDLL 。之后， LunaDLL 被 Kevsoft 所改善，引入了对 Lua 脚本语言的支持，至此 LunaDLL 被更名为 LunaLua 。这个插件后来成为了 SMBX2 项目的基础。



#### 平台游戏引擎 / 月尘引擎



<img src="https://www.helloimg.com/images/2021/05/30/BjQP7n.png" alt="img" style="zoom: 67%;" />


{% image https://www.helloimg.com/images/2021/05/30/BjQsPc.png PGE&nbsp;编辑器 download:true  width:400px padding:16px bg:white %}

**平台游戏引擎** (又叫**月尘引擎**) 项目，简称 PGE ，是由 Wohlstand (@WohlstandFox) 在完成对 SMBX64 标准的研究工作的第一步后，于 2014 年发起的项目，包括游戏引擎和开发工具。这是第一个 SMBX 后续作品，与原版 SMBX 完全兼容。使用 PGE 编辑器以及 The XTech 引擎或正在开发中的 PGE 引擎，你可以编辑或游玩 SMBX 的关卡和世界。你可以创作新的关卡、世界地图、NPC，并在原版 SMBX 中使用它们。这个项目本身的重点是基于PGE 创作新的游戏，而不仅仅局限于 SMBX 作品。与其它的 SMBX 后续作品不同，PGE 使用 C++ 编写并跨平台：Linux、Windows、Mac OS X 和高版本安卓都可以使用。与 SMBX 不同， PGE 更加模块化，引擎、编辑器和其它工具都是单独的。现在引擎处于开发状态时，人们就用这个比原版更高级的 PGE 编辑器来创作 SMBX 的关卡和世界。



#### 超级马里奥兄弟 X 38A版



<img src="https://www.helloimg.com/images/2021/05/30/BjQeh5.png" alt="img" style="zoom: 67%;" />




{% image https://www.helloimg.com/images/2021/05/30/BjQJUh.png SMBX-38A的主界面 download:true  width:400px padding:16px bg:white %}


**SMBX-38A** (又名**SMBX 1.4**) 是由国人 5438A38A 制作的SMBX引擎后续作品。38A 对SMBX 1.3 进行了完全重制，并加入了很多新东西，做出了这个非官方 SMBX。一开始人们都以为这是个假版本。2015年9月13日，吧友 @史努比游览 在 SMBX 论坛转发了 SMBX 1.4.1 在贴吧的发布帖子，但没人相信。之后 Kevsoft 找到原帖，从百度网盘下载了游戏，并在他的 64位 Win7 电脑上试运行，但是失败了。他把这个版本发给了 Wohlstand，发现可以使用虚拟机中的 WinXP 游玩。在成功运行之后，Wohlstand 联系了 38A 并与他合作。这个分支版本添加了超多元素，主要包括世界地图的功能拓展，并拥有自己的脚本系统 “茶脚本” (TeaScript)，可以使用类似 VB 的语言编写脚本。



#### 超级马里奥兄弟 X2



<img src="https://www.helloimg.com/images/2021/05/30/BjQXwA.png" alt="img" style="zoom:67%;" />


{% image https://www.helloimg.com/images/2021/05/30/BjQtHq.png SMBX2&nbsp;随机挑战模式 download:true  width:400px padding:16px bg:white %}

**超级马里奥兄弟 X2 (SMBX2)** 是 SMBX 1.3 的一个大型扩展模组，由 LunaLua 框架、PGE工具（主要是编辑器）和一个新的启动器组成。启动器一开始使用 Qt 和 WebKit 开发，后来被换为 QWebEngine 。它于 2015年12月 由 Horikawa Otane 开发（在这之前进行了一些秘密准备工作）。这个项目已经在国外成为主流 SMBX 版本，淘汰了之前的 1.3 ，即使它还在用 1.3 的核心，只是使用 LunaLua 进行了大量破解和修改。自从 SMBX2 发布以来，LunaLua 就不再单独发布了，并成为 SMBX2 项目的主要部分。这个分支版本添加了大量元素，并支持强大灵活的 Lua 脚本语言，可自定义很多东西。



#### TheXTech 引擎



<img src="https://www.helloimg.com/images/2021/05/30/BjQ47r.png" alt="img" style="zoom:67%;" />


{% image https://www.helloimg.com/images/2021/05/30/BjQLCT.png TheXTech download:true  width:400px padding:16px bg:white %}

**TheXTech** 是一个用 C++ 编写的 SMBX 引擎，将用 VB6 编写的 SMBX 1.3 完全用 C++ 重写，由 Wohlstand 制作。原版 SMBX 在2020年3月14日开源一个月后，它就发布了。它主要有两个目的：一是让 SMBX 变得开源、跨平台和少 BUG，在不同平台游玩 SMBX 原版的关卡和世界，并且与原版游戏表现别无二致，二是给 PGE 引擎提供一个研究对象。此外，TheXTech 还拥有许多改进，例如支持 PNG 素材、GIF 录制、LVLX 和 WLDX 格式关卡的游玩、使用 MixerX 音频库、支持 sounds.ini 和 music.ini、支持自定义玩家素材尺寸、修复了原版 SMBX 的常见 BUG 等。与原版 SMBX 不同，它支持 Windows 以外的其它平台，比如 Linux、macOS、Haiku、Emscripten 和安卓，也提供了 Windows 的 64 位版和 ARM64 版。



#### 超级马里奥 重新发明（Super Mario ReInvent）



<img src="https://www.helloimg.com/images/2021/05/30/BjQS41.png" alt="img" style="zoom:67%;" />

 **超级马里奥 重新发明**，又名 **新SMBX**，是一个由 Core 开发的开源马里奥同人游戏。它是 TheXTech ，那个 C++ 移植版 SMBX 引擎 的改编版本，并向下兼容。



### 关卡兼容性

大多数分支版本都有与其它分支不同的特色功能，然而遵循 SMBX64 标准的 1.3 关卡和世界能在每一个分支版本上正常游玩。至于因为不同分支之间的不同，有些关卡和世界要求在指定分支版本中游玩。如果你用不兼容的分支版本游玩，可能会出现意外的 BUG （举个例子，SMBX2 和 SMBX-38A 的物品集不同且不兼容，但装载正确配置包的 PGE 引擎却能够按预期效果正常游玩这两个分支版本的关卡）。



#### 兼容性

![img](https://www.helloimg.com/images/2021/05/30/BjQnhb.png)

\* The Invasion 系列的第一作在 1.3 上的水中关卡会发生 BUG（前景会跑到背景去），而且库巴大王也会无法打败，因为“区域扩展”功能被禁用了。这些 BUG 已经在 TheXTech 中修复，可以无 BUG 地游玩 1.3 之前的作品。

\*\* TheXTech 不支持 SMBX-38A 的茶脚本系统和大部分功能，然而，一些 SMBX-38A 作品可玩，因为它们遵循 SMBX64 标准，其中没有 1.4 的新东西。

\*\*\* TheXTech 不支持 Lua 脚本系统以及 SMBX2 中成千上万的新要素（任何 1.3 以外的物品在打开关卡时会显示为板栗仔和无效方块）。然而 TheXTech 支持小部分由 SMBX2 和 PGE 编辑器制作的作品。



### 废弃分支

曾有一些值得注意的项目，它们也想过重做游戏，但都被它们的主人放弃或取消了。



#### 超级马里奥兄弟：重制  (Super Mario Bros : Remastered)



<img src="https://www.helloimg.com/images/2021/05/30/BjQbxo.png" alt="img" style="zoom:67%;" />

**超级马里奥兄弟：重制**（曾经也叫 新SMBX，又名SMBX:R）是 Redigit 放弃 SMBX 后第一个尝试的接班人。在2011年六月到九月，SMBX:R曾大肆宣传，因此它已经形成了论坛中最大的小圈子了，尽管除了宣传的内容之外并没多大进展。

【这段是机翻】这个大型社区最终在是否与Knux论坛合并的争议中与Cloud的论坛合并，成为SMBX Revived，但继续发展，并成为（帖子和流量方面）第二大SMBX论坛。与Cloud的论坛合并后，SMBX Revived成为最活跃的论坛，击败了Knux的论坛。不幸的是，项目已经在2012年1月被取消。NSMBX论坛作为一个备份讨论平台被保留了下来，有时会在SMBX官方论坛服务器瘫痪时使用。



#### 可视化超级马里奥兄弟 X（Visual Super Mario Bros. X)

![img](https://www.helloimg.com/images/2021/05/30/BjQlWD.png)

<img src="https://www.helloimg.com/images/2021/05/30/BjQTaC.png" alt="img" style="zoom:50%;" />

**Visual Super Mario Bros.X** 是由 Aero（又名 AeroMatter 或 GhostHawk ）于2012年3月/4月成立的项目。该项目是在 .NET Framework 4 平台上使用 VisualBasic.NET 语言编写的。VSMBX 的目标是首先重构 SMBX ，然后添加新的功能和内容，使其更加灵活。VSMBX 将开源，从2014年12月25日开始，任何人都可以构建适合自己和他人需求的版本，并在论坛上分享，在 VSMBX 论坛（vsmbxforums.prophpbb.com，现在已经没有了），任何人都可以下载。VSMBX 将主要为 Windows 设计，除非大多数人想跨平台。。自2016年8月4日起，AeroMatter 在他的官方论坛帖子宣布停运。

原作者：@WohlstandFox

出处：[PGE Wiki](https://wohlsoft.ru/wiki/)

原链接：https://wohlsoft.ru/pgewiki/Branches_of_the_Super_Mario_Bros._X
