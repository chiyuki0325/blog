---
title: 🏰 引擎部落兴衰史
date: 2023-02-02 18:21:34
tags:
- SMMWE
category: 其它
cover: https://imgsrc.baidu.com/super/pic/item/96dda144ad3459829aedd15549f431adcaef8495.png
---

由我发起的引擎部落项目，前身为 SMMWE Cloud，旨在创建一个开源的、灵活的、国际化的和高拓展性的 SMM:WE 在线服务器。本文来回顾一下引擎部落的兴衰史。

<!--more-->

### ☁️ 起 · SMMWE Cloud

2021 年 6 月，SMMWE 还没有全球关卡，我使用 OneManager 在 Vercel 平台搭建了一个简单的关卡存储和分享网站，命名为 SMMWE Cloud。

{% image https://imgsrc.baidu.com/super/pic/item/a8ec8a13632762d08827f979e5ec08fa503dc6df.jpg SMMWE Cloud %}

网站一直不温不火，到了 8 月份，SMMWE 出了全球关卡，但那时他们使用免费的 php 虚拟主机，一天 24 个小时中得有 23.5 个小时是爆炸的，基本等于不能玩。于是我编写了 SMMWE Cloud 关卡管理器，可以管理本地关卡并从 SMMWE Cloud 下载和上传关卡，相当于一个外置的“全球关卡”。

{% ghcard EngineTribe/SMMWECloudLevelManager %}

{% image https://imgsrc.baidu.com/super/pic/item/b151f8198618367abaf8221b6b738bd4b21ce587.jpg 本地关卡 %}

{% image https://imgsrc.baidu.com/super/pic/item/34fae6cd7b899e5137fe67d207a7d933c9950d87.jpg 关卡详情 %}

{% image https://imgsrc.baidu.com/super/pic/item/dbb44aed2e738bd4d753eff7e48b87d6267ff982.jpg 菜单 %}

{% image https://imgsrc.baidu.com/super/pic/item/b21bb051f8198618692ab2420fed2e738ad4e683.jpg 消失的“全球关卡” %}

后来我还开设了 SMMWE Cloud 的 WebDAV 服务，并用 WebDAV Xplorer 改出了一个“安卓版关卡管理器”。

{% image https://imgsrc.baidu.com/super/pic/item/b3119313b07eca80dee66b21d42397dda0448311.jpg 安卓版关卡管理器 width:30% %}

在 10 月国庆假期，我抓到了 SMMWE 的 API 地址，并且编写了一个简单的私服。因为我那时没有服务器，所以它需要在本地托管，并使用 LeanCloud 存储关卡信息。我实现了最基本的关卡索引和搜索 API。当时我和群里的朋友们挂了好几天，才把所有关卡信息缓存了下来。

{% ghcard EngineTribe/SMMWECloudPrivateServer %}

{% image https://imgsrc.baidu.com/super/pic/item/908fa0ec08fa513da2e13118786d55fbb3fbd9a9.jpg 启动器和配置文件 %}

{% image https://imgsrc.baidu.com/super/pic/item/0eb30f2442a7d933f4e8b9b5e84bd11372f001b7.jpg 游戏内 %}

> 关于 SMMWE Cloud，我留下了几个私享视频便于大家考古
>
> https://youtu.be/uZfrrkgVLQQ
>
> https://youtu.be/1kNpzYCflyE
>
> https://youtu.be/Dslq0ij9Jkg

可惜好景不长，没到一个月，在 11 月 SMMWE 发布了 3.1.5 版本，使用了全新服务器，之后官方服务器稳定运行了十个月。

### 🏰 承 · 引擎部落之始

2022 年 8 月，SMMWE 主作者 Franyer Farías 宣布不再开发 SMMWE，之后官方 Discord 服务器解散，全球关卡系统关闭。

10 月国庆假期，也就是 SMMWE Cloud 私服发布的一年后，我发起了引擎部落项目，旨在创建 SMMWE 3.1.5+ 全球关卡系统的完整开源替代品，并且加入本地化、跨 IM 等更多特性。

{% bilicard BV1cd4y1B7z2 %}

{% bilicard BV1ue4y1t7UH %}

{% image https://imgsrc.baidu.com/super/pic/item/7c1ed21b0ef41bd585d1b53214da81cb38db3d71.jpg 壮观的请求日志 %}

在之后，引擎部落磕磕绊绊地运行了两个月，期间在不断完善各种 API 和 QQ / Discord 机器人。 期间，引擎部落还和粉丝创建的新引擎王国 Discord 服务器合并，成为~~大引擎部落及引擎王国联合王国~~，玩家显著增加，达到 6k+ 人。最后因为一次 CC 攻击，引擎部落“结束”了。

此时引擎部落的各项基本功能已经完善，但还是不「生产完备」，比如一切的请求都是同步的，玩家多时还是会发生和 3.0.0 官服一样的挤地铁现象。并且为了跨 IM 注册账号，并且在 QQ 机器人上避免私聊临时会话，我设计了一套[非常糟糕的注册码机制](https://github.com/EngineTribe/web)，注册体验稀烂。

之后 DangerousZone (原官服开发者) 回归团队，设法重启了官服，并发布了 3.2.5 版本 ~~(还是用的引擎部落的补丁程序)~~

### 🔃 转 · 引擎部落的第二春

在 2023 年 1 月，官服续费到期，引擎部落被迫赶鸭子上架重新开始服务。

因为引擎部落尚未完善，所以我开始重构引擎部落，将数据访问等重写为完全异步，之后效率提升了很多，但仍然存在巨大问题：数据库没有索引。因为这个问题，MySQL 吃满了 CPU，服务器仍然像死王八一样慢。

{% image https://imgsrc.baidu.com/super/pic/item/dc54564e9258d1094b02f4749458ccbf6d814d17.jpg 哈人 %}

1 月 27 日，我发现了这个问题，并且给数据库加上了索引。但这时已经晚了。DangerousZone 回归了团队，并且重新续费了服务器。引擎部落的第二春也结束了。

### 🤔 合 · 大局未定，蓄势待发

之后引擎王国社区如何发展，SMMWE 后续版本使用谁的服务器，我也不得而知。但我将暂时继续更新引擎部落，也希望之后的引擎王国发展得越来越好。