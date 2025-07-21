---
title: 🧱 《马里奥制造 2》全球关卡浏览工具 SMM2Helper 发布
date: 2023-02-03 18:24:42
category: 游戏
tags:
- 马里奥
- 马里奥制造
description: "SMM2Helper 是 TheGreatRambler 的《马里奥制造 2》API 的图形化前端，可以浏览全球关卡，查询用户信息，和从全球关卡中下载关卡，适用于 Windows 和 Linux。一年之前我曾经编写过名为「隐藏的无敌星」的工具，SMM2Helper 即为隐藏的无敌星的增强版。"
---

{% ghcard YidaozhanYa/SMM2Helper %}

SMM2Helper 是 TheGreatRambler 的《马里奥制造 2》API 的图形化前端，可以浏览全球关卡，查询用户信息，和从全球关卡中下载关卡，适用于 Windows 和 Linux。一年之前我曾经编写过名为「[隐藏的无敌星](/2021/12/12/smm2-mariodownloader/)」的工具，SMM2Helper 即为隐藏的无敌星的增强版。

#### 截图

{% image https://imgsrc.chyk.ink/5243fbf2b21193136f1f8b7520380cd790238d93.webp %}
{% image https://imgsrc.chyk.ink/5243fbf2b21193136f1b8b7520380cd790238d9f.webp %}
{% image https://imgsrc.chyk.ink/c8177f3e6709c93d48a67a32da3df8dcd000549a.webp %}

#### 功能

- 浏览全球关卡的「流行关卡」、「耐力挑战」和「超级世界」部分。
- 查看关卡和工匠的详细信息（*包括孬*）。
- 通过 ID 搜索关卡和工匠。
- 加载模拟器的马造 2 存档，往其中下载关卡。

#### 依赖

在 Windows 上，SMM2Helper 依赖 Microsoft Edge WebView2 Runtime，如果系统版本没有预装，可在[此处](https://go.microsoft.com/fwlink/p/?LinkId=2124703)下载。

#### 下载

[在 GitHub 上下载 SMM2Helper](https://github.com/YidaozhanYa/SMM2Helper/releases/latest)

如果系统中装有 Python，可以直接装好依赖，使用 standalone 版。

#### 谢志

- [TheGreatRambler](https://github.com/TheGreatRambler) 编写并维护的这个伟大的 [《马里奥制造 2》 API](https://github.com/TheGreatRambler/MariOver)
- [MarioPossamato](https://github.com/MarioPossamato) 的 [Python 《马里奥制造 2》存档处理库](https://github.com/JiXiaomai/SMM2#who-gets-credit-for-this)
- 来自 [微软](https://github.com/microsoft) [Fluent UI](https://github.com/microsoft/fluentui) 中的界面控件
