---
title: 🕹️ 舞萌 DX 2023 更新后可用的一种查分器数据更新方法
date: 2023-06-23 18:56:33
tags:
- maimai
category: 游戏
description: 所以华立能不能修下你那土豆服务器
---

新版 maimai NET 更改了「我的记录」的数据获取方式，由一次获取全部改为前端请求分段获取，并且由于华立的土豆服务器导致经常获取失败。截止 2023.6.23，我测试过不可用 / 不好用的更新方式如下：

{%border README 中的方法 1，代理工具更新%}

代理工具没有错误处理机制 ([#35](https://github.com/Diving-Fish/maimaidx-prober/issues/35))，导致更着更着 panic。

{%image https://imgsrc.baidu.com/forum/pic/item/2cf5e0fe9925bc310d4530571bdf8db1ca1370e0.jpg height:12rem %}

{%endborder%}

{%border README 中的方法 2：通过网页版微信导入%}

由于网页版微信现在已经几乎不向用户开放了，所以默认此方法为寄。

{%endborder%}

{%border README 中的方法 3：通过手机微信 vConsole 导入%}

新版微信虽然可以通过 XPosed 模块 [WebViewPP](https://github.com/WankkoRee/WebViewPP) 开启 vConsole，但 README 中的那段简短的 js **貌似**仍然用的是之前旧版 maimai NET 获取成绩的方法，至少我挂了半个小时未见有效。

{%endborder%}

{%border README 中的方法 4：Chrome DevTools%}

仍然是通过那段 js，所以寄。

{%endborder%}

{%border 非官方方法 1 %}

https://github.com/huajip/dx-prober-updater

是通过在旧版 maimai NET 中注入 js 实现，所以寄。

{%endborder%}

{%border 非官方方法 2 %}

https://github.com/bakapiano/maimaidx-prober-proxy-update

采用 HTTP 代理截获成绩页面源码以更新，思路很好，可是其服务器在境外。一周之前貌似可以用，但因为网络原因，就当它不可用吧。

{%image https://imgsrc.baidu.com/forum/pic/item/b64543a98226cffca9288e7dfc014a90f703eafb.jpg height:12rem %}

现在它是这个样子的：

{%image https://imgsrc.baidu.com/forum/pic/item/5fdf8db1cb1349545e1ad9ab134e9258d0094afc.jpg height:12rem %}

可能是由于华立更改了验证方式，或是明文 HTTP 代理服务器被 GFW 屏蔽导致。

{%endborder%}

现在我来介绍一种**融合了官方方法 2 和 4 的方法**：通过 Chrome DevTools 获取源码，之后提交到查分器网页。

所需材料如下：

- 一台安卓系统的手机
- Google Chrome，或其它基于 Chromium 的浏览器
- 手

首先在微信任意聊天中发送 http://debugxweb.qq.com/?inspector=true，点进该链接。

{%folding 或扫描下面的二维码 %}

![img](data:image/png;base64,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)

{%endfolding%}

之后开启手机的 {%kbd USB 调试 %} 功能并把手机连接到电脑。

在电脑端浏览器中打开 [chrome://inspect/](chrome://inspect/)，并在手机微信舞萌中二公众号打开「我的记录」页面，即可在 DevTools 中看到。

{%image https://imgsrc.baidu.com/forum/pic/item/810a19d8bc3eb135569d8674e31ea8d3fc1f44a2.jpg %}

然后在手机上依次点开「记录」-「乐曲成绩」，选择一个难度，然后**拼命往下滑**直到滑到底为止。

{%image https://imgsrc.baidu.com/forum/pic/item/4d086e061d950a7bda657f0b4fd162d9f3d3c9a9.jpg height:40rem %}

确认滑到底后，在电脑上点击 inspect 打开调试器，右键选中 `<html lang="zh">` 标签之后点击「以 HTML 格式修改」，复制其中的全部源码。

{%image https://imgsrc.baidu.com/forum/pic/item/d4628535e5dde711d0987239e2efce1b9c1661b2.jpg height:15rem %}

前往 [查分器官网](https://www.diving-fish.com/maimaidx/prober/) 点击「导入数据」，粘贴源码即可导入。

{%image https://imgsrc.baidu.com/forum/pic/item/0df431adcbef7609604aa8506bdda3cc7dd99ebf.jpg %}

如果需要导入多个难度的分数，重复上述操作即可。

---

{%image https://imgsrc.baidu.com/forum/pic/item/d50735fae6cd7b89052e0b4c4a2442a7d8330eba.jpg 我目前的 b50，有没有大佬浇浇 QAQ %}