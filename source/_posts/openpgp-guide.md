---
title: '🔐 OpenPGP 加密入坑指南'
date: 2022-11-27 19:12:04
tags:
- OpenPGP
- 加密
category: 其它
cover: https://imgsrc.baidu.com/forum/pic/item/dcc451da81cb39dbcd2e489595160924aa183002.jpg
---

PGP（Pretty Good Privacy，优良保密协议）是一套用于讯息加密、验证的应用程序。使用 PGP，可以进行加密与解密，对消息或文件进行签名，还可以用来「加密通话」。本文就教你来入坑 OpenPGP。

<!--more-->

### 📥 安装 PGP 应用程序

在不同平台上，有很多种不同的 PGP 应用程序实现。  
本文推荐以下几种，点击对应的链接以下载安装。

🪟 **Windows**: **Kleopatra** for Windows (在 [Gpg4win 工具包](https://www.gpg4win.org/thanks-for-download.html) 中)  
🐧 **Linux**: **[Kleopatra](https://apps.kde.org/zh-cn/kleopatra/)**  
🤖 **安卓**: **[OpenKeychain](https://f-droid.org/packages/org.sufficientlysecure.keychain/)**

### 🗝️ 创建个人密钥对

在 Kleopatra 中，点击{% kbd 文件 %} - {% kbd 新建密钥对 %}，选择 {% kbd 创建个人 OpenPGP 密钥对 %} 。  
在 OpenKeychain 中，点击右上角三点 - {% kbd 管理我的密钥 %}。

输入你的**英文名**和**电子邮件地址**即可创建你的个人密钥对。

在创建好个人密钥对之后，一定要{% mark color:red 妥善备份好 %}自己的公钥和私钥文件，防止丢失。

{% border 🛈 Tips %}

在创建密钥时点击设置，将加密算法更改为 `EdDSA`，可创建出体积更小的密钥，在发送加密消息时更方便。

{% endborder %}

{% border %}

在一份 PGP 密钥对中，包含公钥和私钥。私钥用于以你的身份加密或签名信息，公钥用于让别人解密或验证你的信息。

**千万不要公开发布你的私钥！**

详见 [百度百科](https://baike.baidu.com/item/pgp%E5%8A%A0%E5%AF%86/9868918?fr=aladdin)

{% endborder %}

### 📤 上传公钥

**🗄️ 上传到 OpenPGP 密钥服务器**

可以把自己的公钥上传到 OpenPGP 密钥服务器，方便大家导入。

在 Kleopatra 中，右键点击你的个人密钥，点击 {% kbd 在服务器上发布 %} 。   
在 OpenKeychain 中，选中你的个人密钥，点击右上角三点 - {% kbd 更多密钥详情 %} - {% kbd 分享 %} - {% kbd 上传至密钥服务器 %}。

**⤴️ 使用其它渠道分享**

直接分享你的公钥文件即可。

在 OpenKeychain 中可以点击右上角三点 - {% kbd 更多密钥详情 %} - {% kbd 分享 %} - {% kbd 分享到… %} 以把你的公钥发送给别人。

### 📝 导入他人的公钥

**Kleopatra**

要从 OpenPGP 密钥服务器导入公钥，直接点击 {% kbd 在服务器上查找 %} ，输入对方的邮箱地址即可。

要导入公钥文件，点击 {% kbd 导入 %}，之后右键点击导入的公钥，选择 {% kbd 认证 %} 即可。

**OpenKeychain**

点击主页右下角的加号即可在 OpenPGP 密钥服务器中导入，或是选择公钥文件。

### 🔏 加密和解密文本

**Kleopatra**

点击主页的 {% kbd 记事本 %}，输入文本内容或密文，之后点击加密或解密即可。

**OpenKeychain**

要加密，点击主页左上角菜单 - {% kbd 加密 / 解密 %} - {% kbd 加密文本 %}，在 `加密到` 中输入并选择对方的邮箱地址，输入文本内容，点击右上角复制即可。

要解密，先复制密文，然后点击主页左上角菜单 - {% kbd 加密 / 解密 %} - {% kbd 从剪贴板导入 %} 即可。

### 🔐 加密和解密文件

操作方法和文本大体相同。

Kleopatra 使用主页的 {% kbd 签名/加密 %} 和 {% kbd 解密/校验 %} 即可。  
OpenKeychain 使用 {% kbd 加密文件 %} 和 {% kbd 从文件导入 %} 即可。

---

PGP 的其它玩法，请自行探索 ~
