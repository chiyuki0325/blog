---
title: 📦 用 Yuzu/Ryujinx 模拟器游玩马造 2 全球中的关卡！
date: 2021-12-11 23:18:02
tags: 
- 马里奥制造
- Yuzu
category: 游戏
---

众所周知，在模拟器中游玩马造 2 虽然运行很完美，可惜没图可玩。之前老外有 dump 过地图包，但也好久没有更新了。今天我看到麦神把它的马造 2 地图查看器（~~隐形无敌星~~）开源了，于是就在里面发现了马造 2 全球关卡的 API。

下载关卡的方法为：
浏览器访问 ``http://tgrcode.com/mm2/level_data/`` 后接全大写不带杠的关卡 ID
比如 ``http://tgrcode.com/mm2/level_data/9DRSLN1LG``

使用方法为：
在模拟器中做一张空白图，之后用下载下来的文件替换存档文件夹里新生成的 ``course_data_xxx.dat`` 即可。

---

白嫖 API 的同时，也别忘了给季小麦的原仓库点个 🌟 ～

https://github.com/JiXiaomai/SMM2LevelViewer
