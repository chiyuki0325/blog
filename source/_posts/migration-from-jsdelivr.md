---
title: ⚡ 从 jsDelivr 免费迁移至其它静态资源托管，加快网站访问速度
date: 2022-05-09 19:57:57
updated: 2022-05-09 19:57:57
tags:
- jsDelivr
- 网站
- CDN
category: 网络
cover: 'https://imgsrc.chyk.ink/3ac79f3df8dcd100802b89e0378b4710b8122fbf.webp'
---

jsDelivr 之前是唯一在国内有 ICP 备案的海外 CDN，所以很多面向国内的海外网站和网站源码都在使用，但它近来一天比一天慢，上个月还被某种世界东方的神秘力量阻挡了，之前本站一直在使用 jsDelivr 作为静态资源 CDN，但近来也跟着 jsDelivr 变慢了，部分地区甚至 **无法刷出文章列表** 。那么本文咱就来分享一下从 jsDelivr 迁移走的经验。
本文分享的其它托管服务全部免费，但要迁移过去可能得费些功夫。

**P.S.** 因为某些资源实在是太 ~~罕见~~ 了，所以并没有完美免费迁移到国内其它服务的方法，可以用一些速度快的海外服务取代。

---

## 服务推荐

对于那些用户量大的开源前端库，可以使用国内的一些公用前端 CDN 取代。

- BootCDN： https://www.bootcdn.cn/
- 七牛云 Staticfile： https://staticfile.org/
- 字节跳动： https://cdn.bytedance.com/
- 知乎： https://unpkg.zhimg.com/
- 360 75CDN： https://cdn.baomitu.com/
- CDNJS： https://cdnjs.net/

这些 CDN 支持的库各不相同，可以各取所需，优势互补。

对于图片，如果是 jpg / png / webp 等格式，则可以迁移到图床。

- 路过图床： https://imgtu.com/
- SM.MS： https://sm.ms/
- Hello 图床： https://helloimg.com/

如果这些图床的免费额度都被你薅光了的话，可以上网寻求其它图床或使用本站之前介绍过的 [百度 bug 图床](/2022/03/16/baidu-picbed/) 。

如果是 SVG 格式，则因为其体积够小，可以选择保留在 jsDelivr，也可以考虑迁移至 [七牛云](https://www.qiniu.com/) 。

对于其它格式的资源或罕见的 JS / CSS，可以考虑迁移至 [七牛云](https://www.qiniu.com/)，也可以考虑直接放在 Vercel 或源站。因为 Vercel 在国内访问速度足够快，在某些地区甚至可以媲美国内服务器，并且也有全球边缘网络节点缓存，所以可以充当 CDN。但拿 Vercel 当作 CDN 可能会违反 ToS，所以慎用。

---

## 个人经验

在文章发布之日，我把 [博客](https://blog.yidaozhan.top/) 主题 Stellar 和 [网盘 (OneManager)](https://pan.yidaozhan.top/) 主题 Renexmoe 所用的开源库迁移到了 BootCDN，把博客所用的其它 CSS / JS / SVG 迁移到了 Vercel （源站）。迁移之后，博客首页的冷加载时间从原来的五六秒缩短到了现在的一秒多，甚至比位于国内的 [资源管理器博客](https://zyglq.cn) 还快！

### 迁移过程中遇到的问题

因为 LeanCloud 后端修改，我曾经修改过本站所用的 Valine 并放在 jsDelivr 托管，由于七牛云需要实名认证，所以我直接放在 Vercel。

因为博客主题所用的 Valine 表情包位于 jsDelivr，于是我直接将 git 仓库克隆下来托管在 Vercel，迁移之后表情列表加载速度仍然较慢，但相比之前还是快了很多的。

上述资源我都托管在了 https://blog.yidaozhan.top/cdn/ ，不知道会不会违反 ToS .... (害怕)

对于部分迁移困难的资源，比如 pdf.js 所需的一些 cmap 文件，我选择将其留在原处，毕竟网站里也没几个 pdf wwwwww

