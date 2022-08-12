---
title: 📥 修复 OneManager 阿里云盘下载失效的方法
date: 2021-04-10 20:55:55
tags: 
- OneManager
- Heroku
category: 其它
---



今天用 OneManager 分享文件的时候，发现阿里云盘的下载和上传又双叒叕挂了，于是这边参考了github的issue，写了篇修复方法。

<img src="https://www.helloimg.com/images/2021/06/06/ByuM1g.jpg" style="zoom:80%;" />

挂掉的情况如图。



----

修复方法：

- ① 打开安卓阿里云盘客户端，并且登录你的账号。

<img src="https://www.helloimg.com/images/2021/06/06/ByuOLn.jpg" style="zoom:10%;" />

-----

- ② 用你手机的文件管理器打开

```
内部存储或SD卡/Android/data/com.alicloud.databox/files/logs/trace/（用户ID，一串数字加英文的文件夹）/yunpan/
```

这个文件夹。在里面你会看到一堆log后缀的日志。

<img src="https://www.helloimg.com/images/2021/06/06/Byu2lM.jpg" style="zoom:10%;" />

-----

- ③ 用一个支持查找的文本编辑器（比如`QuickEdit`）打开最后一条log，然后使用查找功能找到`refreshToken`项。

  <img src="https://www.helloimg.com/images/2021/06/06/ByuOLn.jpg" style="zoom:10%;" />

复制这串登录口令，然后用`QQ`之类的工具发送到你的电脑。

-----

- ④ 打开你部署OneManager的平台，比如`Heroku`，然后打开`平台变量`界面。

  比如`Heroku`就是`Settings - Reveal Config Vars`。

  在变量中找到你的阿里云盘配置信息，即`Aliyundrive`开头的，然后点击编辑。

  <img src="https://www.helloimg.com/images/2021/06/06/ByubrX.jpg" style="zoom:80%;" />

<img src="https://www.helloimg.com/images/2021/06/06/Byu9R6.jpg" style="zoom:60%;" />

找到`refresh_token`一项，并把它改成刚刚你在手机上获取到的口令，再保存就行了。

-----

- ⑤ 现在打开你的OneManager，已经可以正常下载和上传文件啦！

-----

#### 另外一种方法

由于OneManager三月一号的更新加入了导出配置功能，所以如果你用的不是heroku部署，可以在OneManager后台选择导出配置，找到你的阿里云盘配置信息并修改，最后导入回去即可。