---
title: "🎯 在 Yuzu 上远程联机《超级马里奥制造2》"
date: 2022-08-18 20:36:14
tags:
- Yuzu
- 马里奥
- 马里奥制造
category: 游戏
cover: 'https://imgsrc.baidu.com/forum/pic/item/48540923dd54564ed2dccfe4f6de9c82d0584fb5.jpg'
---


{% note color:red 免责声明 Nintendo Switch 是任天堂的商标，Yuzu 和任天堂及其任何商业伙伴都没有任何关联 %}

### 📦 安装 Yuzu 模拟器

网上已有很多教程，此处不再赘述。

确保联机成员的模拟器版本相近即可。

模拟器、固件、密钥都可以在我的[文件分享站](https://file.chyk.ink)找到。

### 📡 检查网络环境

首先确保你的 [NAT 类型](https://blog.csdn.net/s2603898260/article/details/118755474)为完全圆锥型，受限圆锥型或端口受限圆锥型。

检测 NAT 类型最方便的办法是使用 Windows 设置中「游戏」-「Xbox 网络」中的选项，或者在 HMCL 中查看。

{% image https://imgsrc.baidu.com/forum/pic/item/55e736d12f2eb938bbdd512f90628535e4dd6fbe.jpg %}

{% image https://imgsrc.baidu.com/forum/pic/item/b3119313b07eca8060c1113ad42397dda0448322.jpg %}

网络环境最好是路由器拨号并使用 DMZ 主机，或者可以打开光猫的 UPnP 功能。

{% image https://imgsrc.baidu.com/forum/pic/item/9358d109b3de9c82955fd2522981800a19d84330.jpg %}

如果你的 NAT 类型为对称型，IP 经过了好几层 NAT，那么可以找有公网 IP 或服务器的小伙伴作为 [ZeroTier Moon](https://blog.csdn.net/JohnGene/article/details/122412705)。

### ⛓️ 安装 ZeroTier

我使用 Arch Linux，于是 `yay -S zerotier-one zerotier-gui-git`。如果你使用 Windows，可以去 ZeroTier 的[官网](https://zerotier.com)下载。

之后让一个小伙伴去 [My ZeroTier](https://my.zerotier.com) 创建一个虚拟局域网，其它成员加入。

{% image https://imgsrc.baidu.com/forum/pic/item/b58f8c5494eef01f08313318a5fe9925bd317dc1.jpg %}

如果成员之间可以互相 ping，并且延迟很正常，就可以开始下一步了。

~~如果延迟不正常，那么就关掉代理。~~

### 🔧 配置模拟器

如果你使用 Linux，那么在 ZeroTier GUI 中查看你要加入的网络的「网卡设备名」。如果是 Windows 可以忽略。

{% image width:300 https://imgsrc.baidu.com/forum/pic/item/d01373f082025aaf29135516beedab64024f1acd.jpg %}

之后在 Yuzu 的「模拟」-「设置」-「系统」-「网络」中，选择对应的虚拟局域网或「网卡设备名」。

{% image https://imgsrc.baidu.com/forum/pic/item/500fd9f9d72a6059c80ecac76d34349b023bbad5.jpg %}

### 📇 安装存档

要想卡进「全球关卡」界面以进行本地联机，需要一份在实机上进过全球关卡的存档。
如果没有存档，模拟器就会直接崩溃。

{% image https://imgsrc.baidu.com/forum/pic/item/6c224f4a20a44623d1978ebfdd22720e0df3d78a.jpg %}

这种存档极其罕见，之前有一些老外在 GBATemp 论坛分享过存档，不过后来帖子都被删除了。

我保存了一些存档，你可以从[这里](https://file.chyk.ink/%E4%B8%80%E5%88%80%E6%96%A9%E3%81%AE%E5%B0%8F%E7%AA%9D/%E6%A8%A1%E6%8B%9F%E5%99%A8%E6%B8%B8%E6%88%8F/%E9%A9%AC%E9%80%A02%E8%B6%85%E5%A4%A7%E7%A6%BB%E7%BA%BF%E5%85%B3%E5%8D%A1%E5%8C%85)下载。

{% image width:300 https://imgsrc.baidu.com/forum/pic/item/aa64034f78f0f7363b9867dc4f55b319eac4138c.jpg 正好够四个人玩！%}

在 Yuzu 模拟器首页，右键点击马造 2，打开存档文件夹，覆盖即可。
一个压缩包中会有 1-3 个存档，看情况覆盖。

### 🗺️ 下载关卡

可以使用 [TheGreatRambler](https://github.com/TheGreatRambler) 的马造 2 API 直接下载关卡。访问 https://tgrcode.com/mm2/docs/ (一定要带上末尾的斜杠) 就可以下载指定的关卡、世界或查询信息等。

{% image https://imgsrc.baidu.com/forum/pic/item/d009b3de9c82d15889d1726cc50a19d8bd3e429f.jpg %}

把下载下来的文件重命名为 `course_data_数字.bcd`，覆盖存档中原有的关卡即可。

马造 2 的关卡列表支持热更新，所以可以边打对战边下图。

覆盖好的关卡只有名称和简介会改变，在游戏内显示的缩略图、作者、ID 等都不会变，因为这些信息储存在对应的 `course_thumb_数字.btl` 文件中，没被更改。

### 🕹️ 开始游玩

在「以连接方式游玩」的界面按下 L + R + 左摇杆按下，就会进入被任天堂隐藏的「局域网游戏」模式。

{% image https://imgsrc.baidu.com/forum/pic/item/c8177f3e6709c93d2bb0252ada3df8dcd00054a8.jpg 不是键盘上的LR字母哦 %}

如果一切顺利，就可以看到对方的房间并进行游玩了。

{% image https://imgsrc.baidu.com/forum/pic/item/35a85edf8db1cb1375d517ce9854564e93584baa.jpg %}

{% image https://imgsrc.baidu.com/forum/pic/item/48540923dd54564ed2dccfe4f6de9c82d0584fb5.jpg YOU WIN! %}
