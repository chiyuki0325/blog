---
title: 🎧 从喜马拉雅 xm 加密音频文件中的信息反推得到 mp3
date: 2023-04-23 22:31:23
tags:
- 喜马拉雅
category: 安全
description: '事情是这样的：今天老师给了我一个从喜马拉雅听书平台下载的 xm 文件，想要转换成 mp3 文件用一般的播放器播放。但我经过一番搜索，得知现在的 xm 文件采用了非对称加密，根本就不是改了后缀的 m4a 格式，需要老师上提取的私钥才能解密。但采用一些特殊的搜索技巧，我得以下载到原本的 mp3 音频。'
---

事情是这样的：今天老师给了我一个从喜马拉雅听书平台下载的 xm 文件，想要转换成 mp3 文件用一般的播放器播放。但我经过[一番搜索](https://github.com/yinzixie/HimalayaRename)，得知现在的 xm 文件采用了非对称加密，根本就不是改了后缀的 m4a 格式，需要手机上提取的私钥才能解密。

但采用一些特殊的搜索技巧，我得以下载到原本的 mp3 音频。

<!--more-->

首先，我直接去网上搜索这条音频，看看能不能直接从在线播放页面中抓到音频文件。但是搜素后无果，因为这个文章有太多人读过了，根本找不到想要的那个。

{%image https://imgsrc.chyk.ink/503d269759ee3d6d7bae730006166d224e4ade95.webp %}

之后我使用十六进制编辑器等软件打开这个 xm 文件，发现它具有一个 ID3 标头。标头内虽然没有专辑图片，但它直接把专辑图片的 URL 写了进去。

{%image https://imgsrc.chyk.ink/023b5bb5c9ea15ce64b814c2f3003af33b87b2a3.webp %}

{%image http://imagev2.xmcdn.com/storages/5c91-audiofreehighqps/70/3E/CKwRIDoEhjP5AAETLACxl_QL.jpg width:20rem 专辑图片%}

根据 ID3 信息在网上搜索[这个专辑](https://www.ximalaya.com/album/49621027)，并对应好专辑图片，就找到了[这条音频](https://www.ximalaya.com/sound/454538558)。

{%image https://imgsrc.chyk.ink/bba1cd11728b47107867090786cec3fdfd0323b5.webp %}

在专辑中找到对应的音频，使用从这个仓库找到的 API，成功获取到了「高音质」（其实只有 64Kbps！）音频的 mp3 源文件。

{%ghcard smallmuou/xmlyfetcher %}

{%image https://imgsrc.chyk.ink/c9fcc3cec3fdfc0354c11773913f8794a5c22644.webp %}
