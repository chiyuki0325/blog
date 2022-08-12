---
title: 📜 Qexo - 给你的 Hexo 网站加上后台
date: 2022-02-25 20:21:48
tags: 
- Hexo
- Vercel
category: 网络
---

众所周知，Hexo 是没有后台的，想要增删改查文章只能通过修改源 markdown 实现，如果在多设备之间编辑，需要反复克隆仓库并 `npm install` ~~并且 packages.json 可能随时炸掉~~，很不方便。于是在这里推荐 Qexo，一款开源的 Hexo 后台。

Qexo 可以部署在 Vercel + MongoDB Atlas 上，支持对位于 GitHub 仓库里的 Hexo 博客的操作，比如写文章等等，支持 Typora 类的所见即所得编辑模式，保存草稿功能，还支持 API 图床，可以直接粘贴图片到图床而不用担心 GitHub / Vercel 缓慢的网速，可以极大改善 Hexo 的使用体验。实际使用体验不输 WordPress 等动态博客。

它和 GitHub Actions、Vercel 都完美兼容，可以直接无缝过渡。

仓库：https://github.com/am-abudu/Qexo

Tips：使用时不要保存过于频繁，因为会触发多次 CI 部署，可能涉及到额度问题。

