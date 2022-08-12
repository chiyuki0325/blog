---
title: 📄 近期 Valine 不能显示和发布评论的解决方案
date: 2021-12-19 13:53:20
tags: 
- Valine
category: 网络
---

{% grid %}

Valine 诞生于2017年8月7日，是一款基于[LeanCloud](https://leancloud.cn/)的快速、简洁且高效的~~无后端~~评论系统。

理论上支持但不限于静态博客，目前已有[Hexo](https://valine.js.org/hexo.html)、[Jekyll](https://valine.js.org/jekyll.html)、[Typecho](http://typecho.org/)、[Hugo](https://gohugo.io/)、[Ghost](https://ghost.org/)、[Docsify](https://github.com/daidi/docsify-valine/) 等博客和文档程序在使用Valine。

{% endgrid %}

近期 Valine 出现了不能显示评论和不能发送评论的 bug，在 F12 控制台中频频报错，使用国际版 LeanCloud 的我已经中招。此 bug 是由于 LeanCloud 国际版更换 API Url 导致的，原来的 ``us.leancloud.cn`` 和 ``us-api.leancloud.cn`` 已经停用，换为了 ``APPID前八位.api.lncldglobal.com`` 。

---

解决方案如下：

① 在 ``Valine.min.js`` 中更换 LeanCloud 对象存储 SDK 为 最新的 ``4.12.0`` 版本。

{% grid %}

``leancloud-storage@3/`` --> ``leancloud-storage@4.12.0/``，查找替换即可。

如果你使用 CDN，可以 Fork 一份 Valine 的 GitHub 仓库，然后自行更改并使用 jsdelivr CDN 。

我已经改好了一份：https://cdn.jsdelivr.net/gh/YidaozhanYa/Valine@test/dist/Valine.min.js ，如有需要可以自取。

{% endgrid %}

② 在引用 Valine 的 js 或 YAML 中设置 ``serverURLs`` 字段为 ``APPID前八位.api.lncldglobal.com`` 。

{% grid %}

比如 ``serverURLs: 'https://xxxxxxxx.api.lncldglobal.com'``

{% endgrid %}

之后，你的 Valine 就复活啦！
