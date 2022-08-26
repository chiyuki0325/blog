---
title: ☁️ 免费白嫖云服务汇总，一分钱不花也可以搭建完整网站
date: 2022-04-12 20:23:19
tags: 
- 一刀斩の小窝
category: 网络
---

### 前端类

##### GitHub Pages 等 HTML 托管服务

这个不详细说了，已经烂大街了。GitHub Pages / Gitee Pages 等服务可以用来托管静态网站，只需要推到 Git 仓库即可部署。GitHub Pages 可以配合 Actions 实现自动部署博客，但它的线路在国内不是很好，有些地区可能龟速，所以不建议在里面直接放图。

官网： https://pages.github.com
白嫖攻略：不贴了，烂大街。

##### Vercel

Vercel 是一个很万能的云平台，前身是 ZEIT Now，支持托管静态网站以及 Python、Node.js、PHP、Go 语言的云函数。

其有很多特色功能，比如对于 JavaScript 类型的前端项目，导入源代码就可以自动构建出成品；Hexo、Hugo 等博客也可以自动构建。

其免费额度超级高，在国内速度也很快，~~超光速~~，所以目前是我的第一选择。

官网： https://vercel.com

### 后端类 / 容器云

##### ~~Heroku~~

支持多种编程语言（Node.js、Ruby、Java、PHP、Python、Go、Scala、Clojure）和 Docker 的老牌容器云。

免费限制：5 个容器，1 核心 512 MB 内存，每月 550 小时的总运行时间，30 分钟无人访问即休眠。
绑卡后可以延长到每月 1000 小时总运行时间，并且可以绑定自定义域名及添加 Redis 等扩展组件。不绑卡就只能使用 CloudFlare 代理了。

国内的连接速度只能说中规中矩，美国数据中心速度还不错，但延迟略高，欧洲数据中心速度一言难尽。

可以用于托管后端和一些纯无服务器项目。

官网： https://heroku.com
白嫖攻略： https://www.163.com/dy/article/GS5O4VB60519EA27.html https://www.hztdst.com/1489.html

**Heroku 将从 2022 年 11 月开始取消免费额度。**

##### Railway

不休眠的容器云，支持部署 Docker 镜像和 Postgres 等数据库。

该平台因为不休眠，配合上数据库几乎什么都可以部署，~~包括学术研究~~，**但不能注册多于一个账号，否则会封号。风控机制很迷惑，所以不能乱部署。**

该平台在国内速度很快。

免费限制参见官网，~~我被封了，官网打不开，请自行查看。~~

官网： https://railway.app

##### Render

对标 Heroku 的容器云平台，配置更高，有新加坡数据中心，在国内网速更快。适合用于托管那些对数据存储要求不高的服务。

免费版支持托管静态网站、 Docker 容器和编程语言容器，限制和 Heroku 类似，不过每月的总运行时长是 750 小时，15 分钟无人访问会休眠。

官网： https://render.com

##### IBM Cloud Foundry

IBM 旗下的容器云，顾名思义，可以基于 Cloud Foundry Buildpacks 部署后端服务。

我之前在它上面部署 QQ 机器人，该平台免费数据中心位于美国达拉斯，在国内速度很慢，延迟也高，但 **开放 ssh**（没有超级用户权限），所以基本可以随意搞。

免费限制：512 MB 总内存。10 天不进行开发（我的理解是 push）就会停机。

GitHub： https://github.com/cloudfoundry
官网： https://www.ibm.com/cn-zh/cloud/cloud-foundry

##### Koyeb

正在公测的容器云，小公司开的，估计活不长。

我有幸申请到了公测资格，其在公测期间基本无限额度，几乎是类似 VPS 的性能和速度了。但其文档不完善，比较折腾人，所以就没开始用。

官网：https://koyeb.com

### 服务器

##### Hax & Woiden VPS

Hax 和 Woiden 这两个平台师出同门，Hax 提供免费 IPv6 VPS，Woiden 提供免费 IPv4 NAT VPS（可选择要映射的端口）。其开放 ssh 并且有超级用户权限，可以用来托管后端等。

它速度快的数据中心已经被那些学术研究者薅烂了，所以只剩下一些比较慢的，但还不算特别慢。

免费限制：可以无限白嫖，需要每隔一周进行一次续期。

官网： https://hax.co.id https://woiden.id

##### IBM LinuxONE 社区云

由 IBM 公司和美国曼利斯特学院联合推出的免费 VPS 服务，可以领取 s390x 架构的免费 VPS。因为它是 IBM 自研架构，比较罕见，所以能托管的东西就比较少，但它网速很快且有公网 IPv4，性能也很强，所以托管网站还是挺不错的。
其开放 ssh 并且有超级用户权限。

免费限制：申请需要人工审核，并且流量过大会封号。开通的 VPS 有效期三个月，到期了可以再续三个月，再到期了就只能删除重新开了。

官网： https://linuxone.cloud.marist.edu

### 数据库

##### LeanCloud

综合性后端云服务，免费额度几乎无限，其数据库（结构化数据存储）可以免费白嫖。
特点是提供 SDK，SDK 支持的编程语言有限，但比 REST API 调用更方便，前后端均可以使用，并且速度也不错。

国内版需要实名认证，国际版不需要，但需要绑定域名。

国内版： https://leancloud.cn
国际版： https://leancloud.app

##### DB4Free

免费 MySQL 数据库，小于 200 MB 可以无限白嫖。

官网: https://db4free.net

##### PlanetScale

提供免费的 MySQL 数据库，可与 Vercel、Render 等紧密集成。

官网: https://planetscale.com

### 域名及 DNS

##### Freenom

老牌的免费域名提供商，提供免费的 cf、ml、tk、ga、gq 免费顶级域名，一年续期一次。

官网： https://www.freenom.com
白嫖攻略： https://zhuanlan.zhihu.com/p/109553641

##### DNSPOD

腾讯云旗下的 DNS 服务商，~~需要身份认证，未成年，没用过。~~

官网： https://dnspod.cn

### 存储类

##### Hello 图床

国内的免费图床，提供无限的免费额度，我已经用了两年多了，不知道什么时候会跑路（近几年大概不会）。

官网： https://helloimg.com

##### 百度 ~~bug~~ 图床

具体可以参照我[之前的文章](https://blog.yidaozhan.top/2022/03/16/baidu-picbed/)。

##### OneDrive

微软家的云盘，~~历史悠久~~，配合 OneManager、Alist 等云盘程序可以实现高速（但在国内不稳定）的直链存储。

网上有许多途径可以帮你白嫖到 1T / 5T 的 OneDrive，这里不再赘述。

官网： https://onedrive.live.com （个人版 5-15GB） https://sharepoint.com （商业版 2-50TB，视你白嫖的帐号而定）

##### 阿里云盘

阿里家的云盘，最近两年刚出，配合 OneManager、Alist 等云盘程序可以实现高速的直链存储。

~~资本的嘴，骗人的鬼~~，尽管阿里云盘现在有免费高速大容量，但谁又知道它以后会不会限速限容量，或者封禁非官方客户端呢？

官网： https://aliyundrive.com

### CloudFlare

CloudFlare 太强大了，以至于我把它单独拿出来放一章节。它对于免费用户有十分强大的 DNS、CDN ~~减速器~~、攻击防护、访问量分析、无服务器函数 Workers等功能。

~~它实在是太强大了，想细说还怕写不下~~，具体可以自行去搜索引擎搜索。

### 其它

##### GitHub Actions

GitHub 提供的免费 CI 服务，可以用于编译软件，自动发布 release 等自动化操作，懒狗必备。
同时它也被各种花式白嫖，比如当作 ArchLinux 软件源、安装远程桌面、编译 Linux 内核 ... 只要不超过 6 小时，嗯造就完了。

免费限制： https://docs.github.com/cn/actions/learn-github-actions/usage-limits-billing-and-administration

官方文档： https://docs.github.com/cn/actions

##### Replit

Replit 将自身定位于在线代码编辑器，你可以用它提供的低配容器在线编写代码或托管自己的项目，也支持多人协作共同编写，支持很多语言和库。目前 Replit 给免费用户提供无限数量代码库、500 MB 免费存储。它不仅支持静态网站，还支持 Node.js / PHP 等后端托管，但后端半小时到一小时不访问就会休眠，放一些自己写的小东西还是很不错的。

免费限制： https://replit.com/pricing

官网： https://repl.it

##### Glitch

Glitch 的功能和上文说过的 Replit 功能很像，提供无限数量的静态站点或五分钟不访问就会休眠的后端托管，具体代码库数量我不清楚（还没注册），但和 Replit 一样可以导入 GitHub 仓库。

免费限制： https://glitch.com/pricing

官网： https://glitch.com

##### Uptimerobot

Uptimerobot 用于监控网站运行状态，它几分钟会往指定网站发一次请求，并且记下当时的运行状态以供日后统计。如果不介意上述容器云的免费额度的话，也可以用 Uptimerobot 让那些爱睡觉的容器云保持清醒。

---

2022.5.3 加入 Glitch、 Replit 和 Uptimerobot。

2022.8.26 修正部分过时内容。
