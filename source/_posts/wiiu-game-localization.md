---
title: '🔤 [转载] 新手 WiiU 游戏汉化研究入门'
date: 2023-02-14 17:51:48
tags:
- WiiU
- 任天堂
- 转载
category: 游戏
cover: https://imgsrc.baidu.com/super/pic/item/8326cffc1e178a8225286b67b303738da877e8e5.jpg
description: '近来 K大 发表了不少用来修改 WiiU 文件的工具软件介绍贴，合理的组合使用，可以修改到游戏的内容。这个贴是个人折腾了几个小时总结的经验方法，希望能对有兴趣汉化游戏的人有所帮助。自己动手还是蛮有意思跟成就的，期盼 WiiU 上能出来更多的游戏汉化 😄'
references:
- title: '[教程] 新手 WiiU 游戏汉化研究入门：字库篇'
  url: 'https://www.91tvg.com/thread-77777-1-1.html'
- title: '[教程] 新手 WiiU 游戏汉化研究入门：文本篇'
  url: 'https://www.91tvg.com/thread-77811-1-1.html'
---

### 🖊️ 前言

2017 年，正逢《塞尔达传说 旷野之息》大火，而游戏并未中文化，游侠网 LMAO 汉化组就自己汉化了游戏，而这份汉化较为劣质，于是 91wii 论坛的网友们就开始研究 WiiU 游戏汉化，并且成立了 91wii 汉化组，汉化了众多 WiiU 上的经典游戏。

这篇帖子是中国大陆网友对于 WiiU 游戏汉化的最早探索，其中的方法仍然适用于现在的 3DS 和 Nintendo Switch 第一方游戏汉化 (只是 SARC 大端序变成了小端序等)。

让我们向 fejich、螳螂虾等 WiiU 游戏汉化的先驱者和 kavid 等为中国大陆 Wii / WiiU 游戏社区做出重大贡献的人致敬。

原帖由 fejich 发布于 2017 年 5 月 16 日。

### 🉑 字库篇

近来 K大 发表了不少用来修改 WiiU 文件的工具软件介绍贴
 合理的组合使用，可以修改到游戏的内容
 这个贴是个人折腾了几个小时总结的经验方法，希望能对有兴趣汉化游戏的人有所帮助
 自己动手还是蛮有意思跟成就的，期盼 WiiU 上能出来更多的游戏汉化 ![lol](/static/lol.gif)

 教学以如今最火的 塞尔达传说：荒野之息 为例子
 替换 游侠LMAO汉化组 的出的 2.0 汉化字库

**完成后效果图：**

{% image https://imgsrc.baidu.com/super/pic/item/503d269759ee3d6d9baf930c06166d224e4ade88.jpg %}

{% image https://imgsrc.baidu.com/super/pic/item/f9198618367adab4e2b80f84ced4b31c8601e489.jpg %}

---

**教学正文：**

**需要用到电脑软件：<font color="blue">Hxd</font> ，<font color="blue">Uwizard</font> 跟 <font color="blue">NW4F Font Converter</font>**

 1）首先的找到相应字库文件，每个游戏的字库文件都不一样。一般观察文件路径名称判断，具体游戏具体分析

{% image https://imgsrc.baidu.com/super/pic/item/8d5494eef01f3a291dafc109dc25bc315d607c95.jpg %}

 2）判断文件的加密/压缩方式，~~这个靠观察文件名 + 经验 尝试不同的工具（我不会看代码只能给出多尝试的意见了）~~
 ~~几种解包方式测试下来，判定出字库为 Yaz0 算法压缩， SARC 算法打包而成~~
 通过 <font color="blue">HxD</font> 观察文件头，看到首行 Yaz0 ，第二行 SARC 。确认文件格式为 Yaz0 压缩 SARC 打包的 SARC.SZS

{% image https://imgsrc.baidu.com/super/pic/item/0b55b319ebc4b745d4f2a3d18afc1e178b821596.jpg %}

 运行 <font color="blue">Uwizard</font> 按 1 所指向的按钮解包文件，看图操作

{% image https://imgsrc.baidu.com/super/pic/item/d62a6059252dd42ac468156c463b5bb5c8eab890.jpg %}

{% image https://imgsrc.baidu.com/super/pic/item/09fa513d269759eef030740cf7fb43166c22df91.jpg %}

{% image https://imgsrc.baidu.com/super/pic/item/bba1cd11728b4710d84ce90b86cec3fdfd032391.jpg %}

 3）接下来就可以进行替换操作了，不过首先的制作用作替换的 .bffnt 字体文件
    这个时候就得用到 <font color="blue">NW4F Font Converter</font> 这个软件

{% image https://imgsrc.baidu.com/super/pic/item/1e30e924b899a901fb684ff158950a7b0308f59c.jpg %}

 4）得到 .bffnt 字体后的替换操作就不详细说明了，按个人喜好替换
   **<font color="red">值得注意的是游戏主机有严格的文件大小限制，请尽量用体积贴近原字体的文件。文件过大很可能造成死机</font>**

{% image https://imgsrc.baidu.com/super/pic/item/0eb30f2442a7d9334bf3f0b4e84bd11372f00199.jpg %}

 5）替换完就到文件封包了，再次打开 <font color="blue">Uwizard</font> 选择选择 2

 6）最后得到的 .szs 就是最终成品。
    修改名字为 <font color="green">Font_JP.sbfarc</font> 覆盖原文件就完成所有教学

[📥 下载字库篇的相关工具](https://file.yidaozhan.top/OneDrive/%E6%A8%A1%E6%8B%9F%E5%99%A8%E6%B8%B8%E6%88%8F/WiiU/WiiU%E7%9B%B8%E5%85%B3%E5%B7%A5%E5%85%B7/Uwizard%20NW4F%20Font%20Converter.zip)

### 🔡 文本篇

 接着字库篇的流程走下来，就到提取文本的阶段了


 总体思路也是 <font color="red">定位文件→ 解包 →编辑替换→封包 </font>


 虽然不同的游戏文件压缩/打包方式各不相同，但是反向编辑的操作流程是一样的。


 关键是要找到相应的能处理这些文件的工具软件，一般情况下通过资料搜集都能找到一些破解大神写的相关软件跟文档（少不鸟爬点外文）

 顺利的话就能实现汉化的目的 ～(￣▽￣～)~

 **教学开始前，惯例贴上成果：**

{% image https://imgsrc.baidu.com/super/pic/item/023b5bb5c9ea15cec4bcf4cef3003af33b87b2a3.jpg %}

{% image https://imgsrc.baidu.com/super/pic/item/1e30e924b899a901fb784ff158950a7b0308f5ac.jpg %}


 图片是 WiiU 的马造，替换了字库修改了一开始的教学关的文本测试了下效果

 最后期盼大伙研究游戏汉化顺利，遇到问题发贴一起讨论吧 \(////)\

---

 **教学正文：**


 还是以 游侠_荒野之息2.0汉化 为例，方便理解

 需要用到的软件：<font color="blue">HxD + Uwizard + MsbtEditor</font>

 1）定位到疑似文本的文件

{% image https://imgsrc.baidu.com/super/pic/item/8644ebf81a4c510f3e8af6dd2559252dd52aa5af.jpg %}

 2）运行 <font color="blue">HxD</font> 打开文件观察文件头，以确认文件压缩/打包方式

{% image https://imgsrc.baidu.com/super/pic/item/c8ea15ce36d3d53942741b047f87e950342ab0a8.jpg %}

 3）看到首行以 SARC 开始，确认文件格式为 SARC，利用 <font color="blue">Uwizard</font> 来处理

{% image https://imgsrc.baidu.com/super/pic/item/622762d0f703918f6899290d143d269758eec4a9.jpg %}

 4）得到 <font color="orange">Message</font> 文件夹跟里边的 <font color="green">Msg_JPja.product.ssarc</font> 文件
    从文件名上判断这个还是压缩/打包过的文件，继续用 <font color="blue">HxD</font> 观察文件头

{% image https://imgsrc.baidu.com/super/pic/item/d01373f082025aaf2e766a0cbeedab64024f1ab4.jpg %}

 5）看到首行 Yaz0 ，第二行 SARC 。确认文件格式为 Yaz0 压缩 SARC 打包的 SARC.SZS，继续用 <font color="blue">Uwizard</font> 解包

{% image https://imgsrc.baidu.com/super/pic/item/0b55b319ebc4b745d4f2a3d18afc1e178b821596.jpg %}

{% image https://imgsrc.baidu.com/super/pic/item/91ef76c6a7efce1bba6adc0dea51f3deb58f65b7.jpg %}

 6）终于解包出来得到的 .msbt 格式可编辑的文本，翻译可以走起

{% image https://imgsrc.baidu.com/super/pic/item/4a36acaf2edda3cc6ea4ace744e93901203f92b0.jpg %}

 7）使用 <font color="blue">MsbtEditor</font> 打开 .msbt 文件，通过搜索定位文本
      就能简便的翻译

{% image https://imgsrc.baidu.com/super/pic/item/9f2f070828381f305d5a996eec014c086f06f0b2.jpg %}

{% image https://imgsrc.baidu.com/super/pic/item/9c16fdfaaf51f3de9ff0ada3d1eef01f3b2979b2.jpg %}

 8）翻译好文本，最后就是反向封包文件测试。
     具体流程就不在本篇细述，相信教学看到这个部分封包应该不会难得到你。

[📥 文本编辑: MsbtEditor](https://file.yidaozhan.top/OneDrive/%E6%A8%A1%E6%8B%9F%E5%99%A8%E6%B8%B8%E6%88%8F/WiiU/WiiU%E7%9B%B8%E5%85%B3%E5%B7%A5%E5%85%B7/MsbtEditor.zip)

[📥 解包封包: SARCTools (Python 2.7)](https://file.yidaozhan.top/OneDrive/%E6%A8%A1%E6%8B%9F%E5%99%A8%E6%B8%B8%E6%88%8F/WiiU/WiiU%E7%9B%B8%E5%85%B3%E5%B7%A5%E5%85%B7/%5B%E8%A7%A3%E5%8C%85%E5%B0%81%E5%8C%85%5DSARCTools%20%28Python2.7%29.zip)

### 📝 后记

其实文中提到的很多工具已经有了更现代的替代品，比如 Uwizard 可以使用 [SARC-Tool](https://github.com/aboood40091/SARC-Tool) 替用，也可以使用帖子文末的 SARCTools；MsbtEditor 也有了支持显示控制字符的替代品 [MsbtEditorPro](https://github.com/KinTamashii/MSBTEditorPro)。虽然工具变了，但汉化的思路大差不差。

希望这篇教程能帮到更多的人。
