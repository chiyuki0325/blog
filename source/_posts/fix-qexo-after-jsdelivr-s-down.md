---
title:  💧 在 jsDelivr 挂掉后修复 Qexo 无法加载的问题
date: 2022-05-22 12:55:04
tags:
- Qexo
- jsDelivr
- 干饭王
---

很简单，在设置 - 高级设置中把 `CDN_PREV` 从原来的 `https://cdn.jsdelivr.net/npm/` 改为 `https://fastly.jsdelivr.net/npm/` 即可。（ {% psw 就是想水一下www %}

对于其它网站、主题或源码，也可以通过把 `cdn.jsdelivr.net` 改为 `fastly.jsdelivr.net` 来解决（比如 Bilibili Evolved 的插件更新源等）。

