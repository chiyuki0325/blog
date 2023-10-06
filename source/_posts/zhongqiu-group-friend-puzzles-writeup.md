---
title: 🌝 2023 中秋节 池塘铸币厂群友解谜游戏题解合集
date: 2023-09-30 21:45:50
category: 日常
description: '群友的红包小解谜，都挺有趣的'
---

### 日落果

初始线索为 `libredpack.so`，一个安卓 aarch64 的动态链接库文件
打开手机，在 Termux 上使用 `objdump -s libredpack.so` 可看到其导出了一个 `redpack` 函数，调用即可

（咱不懂 C 语言所以捣鼓了大半天 QAQ）

以下为官方题解

{%image https://imgsrc.baidu.com/forum/pic/item/f11f3a292df5e0fe105b75321a6034a85edf7246.jpg %}

### KimmyXYC

初始线索：https://t.me/HoshinoRubii_c/101

1、`odw.ywaamlmq.hcd/{hcysb}/dkr=lll`
凯撒密码后移十二位
`api.kimmyxyc.top/{token}/pwd=xxx`

2、一个 mp3 文件

strings "Never Gonna Give You Up.mp3"

```
Magic IP Check Website
https://api.kimmyxyc.top/ip
Only Provide Magic Result When Use the Magic Proxy
```

mp3 封面右上角拉高对比度可看到隐藏文字
https://t.me/KimmyXYC_Soliloquize/2698

该消息中的 github 链接
https://github.com/KimmyXYC/BiliRoaming/commit/209e5ff8539b9d847c6cdbbe76a2fd3a1a406875
打开可在评论区看到 `₿2bP4pJr4wVin4NozhAiBaL8nEkV62F1KGCPcoYGpVGu`

之后 `| base58 -d`
得到链接 https://t.me/FontsCollection/22

/c/1576311492/6，加上 t.me 后得到如下链接
https://t.me/NachoNekoX_bot?start=zGLamTDcZxqXTY

点击之后 bot 会返回如下链接
https://www.kimmyxyc.top/default/magicpage.html
密码为上文的 `zGLamTDcZxqXTY`

页面中看到的十六进制 `70 77 64 3D 44 54 58 4C 46 6E 54 37 4E 39 63 63 70 58` 转换为字节数组
`pwd=DTXLFnT7N9ccpX`

合成链接 `api.kimmyxyc.top/zGLamTDcZxqXTY/pwd=DTXLFnT7N9ccpX`
加上一个问号改为合法链接 https://api.kimmyxyc.top/zGLamTDcZxqXTY/?pwd=DTXLFnT7N9ccpX

跳转到 https://kimcos.zyglq.cn/img/2023/09/IMG_20230930_095341_706.jpg?password=6b2be993-5c44-4cad-8159-e56800209fc6
拿到一个二维码得到
`ss://{此处暂时删除}@ap-s.hinetwork.tw:37026#Magic%20Proxy`
之后在代理客户端中填入密码 `6b2be993-5c44-4cad-8159-e56800209fc6`

连接 Magic Proxy，访问 ip api 得到

```
Check up Magic Record On xxxxxxxxxxxxxx.mahiron.moe
Tips: Token
```

```
zglamtdczxqxty.mahiron.moe
xxxxxxxxxxxxxx.mahiron.moe
```

字数一致

`dog zglamtdczxqxty.mahiron.moe TXT` 得到
`wNtygt5Ar3wgt3`

https://api.kimmyxyc.top/zGLamTDcZxqXTY/?pwd=wNtygt5Ar3wgt3
得到最终答案，吃，都可以吃

### 资源管理器

初始线索 https://t.me/+sRYB55y7oZNiYmI1 进入第一个频道
进行严金炜行为，在 html 中可以看到一个隐藏链接

打开隐藏链接 https://t.me/+0Cv75RWUieM4NzY9 进入第二个频道

三条线索
1、`75207265616C6C7920736D6F7274`

看上去是十六进制字节数组，其实并不需要解开

3、提示：`具有<strong>中国</strong><em>特色</em>`

2、一首歌，导出封面图后拉高对比度可看到隐藏的文字
`cos.*****.*n/music00001.mp3`
https://cos.zyglq.cn/music00001.mp3

这个链接使用了国内外分流
首先关掉代理打开链接，file 命令可看出这是一个 zip 文件，解压后可拿到第二张封面图

使用十六进制编辑器打开之可以发现文件尾的几个 zip 文件头 `50 4B`
改后缀为 zip 之后解压
得到 pgp 私钥

打开代理打开链接，得到密文
`aHR0cHM6Ly9wYXN0ZS5nZy9wL2Fub255bW91cy9jYzMxNzNmYWZhZTM0OTQwYWMzZDBkYjFjODNjZjQ1Mw==`
base64 解码得到 https://paste.gg/p/anonymous/cc3173fafae34940ac3d0db1c83cf453

从该链接中得到 PGP MESSAGE 密文，使用私钥和前面那一坨 hex（不是解密出来的字符串！）解密
得到信息

```
提示：和office三件套有关
家点两个吸血鬼点中国冒号宝塔默认端口斜杠XogPsvo.nymh
```

恺撒密码 16 位
`home.zeroyuki.cn:8888/NewFile.docx`

> （虽然不知道跟两个吸血鬼有啥关系，草）
> （zyglq：我记得那好像是俩吸血鬼）

拉走挡视线的图片得到最终结果

### 青墨

初始线索 https://111.qingmo.moe 

1、全选 获得莫尔斯电码
`.... - - .--. ... ---... -..-. -..-. - .-.-.- -... .. .-.. .. -... .. .-.. .. .-.-.- -.-. --- -- -..-. ---.. ....- -.... ---.. ..... ..--- ..... ..... --... ...-- ....- -.... .---- --... --... ----- ..--- .....`
解码得
https://t.bilibili.com/846852557346177025
动态图片为 R、C、4 三个字符组成的字符画

2、F12 之后可看到注释：` Hidden text: DNS  `

`dog 111.qingmo.moe TXT` 得到密钥 `1921831322`

之后使用 RC4 解密评论区的密文得到最终结果

### 池塘

https://t.me/+E-Lvxk6K9yIxMWNl

初始线索：

1、`Robin Schulz,David Guetta,Cheat Codes - Shed a Light.flac` 和线索 `SSTV`

2、`dGhlcmUgaXMgbm90aGluZwo=` base64 解码可得 `there is nothing`

3、`my photo.png`

flac 信息头中可得到一个 pgp 私钥

`strings "my photo.jpg"` 可得到一个 pgp 密文

https://pub-b82be80347bd4d9e9bb9ec49c3958e41.r2.dev/20230929_215011.wav

使用 QSSTV 解码这段 wav 得到下一个线索 `@f5146c5f`

在这个频道中得到一个 gpg 文件，解密之后得到答案

### Takami

初始线索：https://playground.rikko.moe/start?token=kimmyxyc

过掉 captcha 之后得到三条 AES

```
U2FsdGVkX1+UbqRnuQdTtrgnnFx4AXb3HHYgie4NTgo=
U2FsdGVkX18+S9AmVTp/pOskMerYiyeWqWLDJ5gp6VwzbtFuteIaSAXu0Efa7DsaS5UU9i9+sb3NhY3zOx80Ug==
U2FsdGVkX18b65DhhAvFlZ5SDevtTnn43KjZJpA1UQo=
```

直接用 base64 解码可看到前面有 Salted 字样，说明为 https://www.sojson.com/encrypt_aes.html 网页加密

前两条使用 `kimmyxyc` 密钥解密可得到

```
s5fq8c6sd
playground.rikko.moe/solve?token
```

第三条使用 `s5fq8c6sd ` 密钥解密可得到

```
d8e6sdc45
```

访问 https://playground.rikko.moe/solve?token=d8e6sdc45 之后又得到两条 Salted AES 密文

```
U2FsdGVkX1+dv4wEaLF04vW5AwnXzB67AgTDMQb8gUEAJ8yRKkVfSrKplYMSe+Tm
U2FsdGVkX19qeZU+JNEcTD+dAMluppd5a1WrMvIvsG8=
```

使用 `d8e6sdc45` 解密可得到

```
GO TO alist.rikko.moe
TOKEN2:s8d5rew2
```

访问 https://playground.rikko.moe/solve?token=s8d5rew2 之后得到一段不知所云的 base64 文本，base64 解码后看到一个邮箱地址，说明这是私钥，于是导入

然后在 alist.rikko.moe 得到如下文件

1、`SOMETING STRANGE`

pgp 解密后得到 `6ZSf5pak5ou354Or54Or54Or`

2、`DEHBERFCHTBELGBIDLFNITGITEKNGRL/Unnamed.txt`
内容 Unicode 解码之后得到 `playground.rikko.moe/finish?token`

3、`DEHBERFCHTBELGBIDLFNITGITEKNGRL/PLEASE ENJOY THE MUSIC`
内容为密文

```
U2FsdGVkX1+Htk3YITXMIHo0VybnEsKLVN1TT3y0vwxBSWLSyQd9nPCBmY2zIYem
```

使用 `6ZSf5pak5ou354Or54Or54Or` 解密后得到

```
网易云音乐是傻逼
```

4、`DEHBERFCHTBELGBIDLFNITGITEKNGRL/U2FsdGVkX18DvrU3yUiPTwh1mBrM+djVv7WrKHnKWgw=.flac`
在信息头中可得到伪装成网易云用户标识的密文

```
U2FsdGVkX19eXCMpvGFgVhC/mTsWTcmem0Vrk6eFp28=
```

使用文件名当 key 解密之后得到最终密钥 `f5sd6fdcsadfxZ`

访问 https://playground.rikko.moe/finish?token=f5sd6fdcsadfxZ 得到最终答案是
