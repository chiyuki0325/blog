---
title: 🍄 SM4J 远程联机教程
date: 2022-01-02 22:06:24
tags: 
- SM4J
category: 游戏
cover: 'https://imgsrc.baidu.com/forum/pic/item/f603918fa0ec08faf68b62661cee3d6d54fbda6c.jpg'
---

之前的教程用到了公网 IP，考虑到大多数人都没有公网 IP，这次重新来做一个教程，使用了 ZeroTier 映射工具。

### 联机前准备

- SM4J 电脑版的联机存在问题，不使用默认键位会导致 1P 无法操作，所以如果你使用电脑版，就调回默认键位。但还是推荐使用手机端游玩。

- 显然，对战人机和联机功能冲突，所以你需要关闭人机。

### ① 下载 ZeroTier 客户端

你可以在 [ZeroTier 的官网](https://www.zerotier.com) 下载（https://www.zerotier.com/download/）。

如果是手机版且无法访问谷歌 Play 商店，可以从 [这里](https://pan.yidaozhan.gq/ali/%E5%AE%89%E5%8D%93%E8%BD%AF%E4%BB%B6/ZeroTier%20One_v1.8.1-1_apkpure.com.apk) 下载。

### ② 创建和加入虚拟局域网

如果你是单纯来白嫖的，可以直接用我建好的虚拟局域网（ID 为 ``a0cbf4b62a9735dc``），一个虚拟局域网只能有 50 台设备（无论在线或不在线，~~比蒲公英强多了~~）。

#### 创建虚拟局域网

注册并登录 [ZeroTier 官网](https://www.zerotier.com)，之后创建一个虚拟局域网，记下网络 ID 即可。

#### 加入虚拟局域网

这里以手机端为例。首先在 ZeroTier 中点击右上角加号，粘贴网络 ID，之后点页面底部的添加。

之后点进刚才添加的虚拟局域网，勾上 ``Route via ZeroTier``。

### ③ 启动 ZeroTier

回到 ZeroTier 主界面，打开开关，把它挂在后台即可。

**P.S.** 要确保 ZeroTier 不被杀后台，可以用设置中的禁用电池优化、上后台「锁」、允许后台静默运行等操作实现。

### ④ 在游戏中创建和加入房间

#### 如果你是房主

首先房主记下 ZeroTier 虚拟局域网中的 IP（就是 ``Managed IPs`` 下面，斜杠前面的 xxx.xx.xx.xxx），发给其他玩家。

然后房主进入游戏，依次点击 ``MODOS EXTRA`` (英文版为  ``EXTRA``) --> (右下角的) ``WiFi`` --> (左边的) ``Network LAN``。

进入到联机菜单之后，如果是第一次，点击屏幕顶部白色的 ``USUARIO``，修改为自己的名字（仅大写英文/数字）。

改好名字之后，点击 (绿色的) ``CREAR PARTIDA`` --> (最右面的) ``Modo Espejo``，之后等待玩家即可。

玩家都连进来了之后，点击 ``INICIAR PARTIDA``，接下来选择模式就可以开始玩了。

#### 如果你是其他玩家

首先进入游戏，依次点击 ``MODOS EXTRA`` (英文版为  ``EXTRA``) --> (右下角的) ``WiFi`` --> (左边的) ``Network LAN``。

进入到联机菜单之后，如果是第一次，点击屏幕顶部白色的 ``USUARIO``，修改为自己的名字（仅大写英文/数字）。

改好名字之后，点击 (红色的) ``UNIRSE`` --> (最下面的大按钮) ``CONECTAR MANUALMENTE``，之后输入房主给的 IP，``OK`` 然后等待房主开始游戏即可。

### 手机注意事项

- ZeroTier 一定要保持在后台运行，无论用何种方法（包括用浮窗/分屏），保持其在后台即可。
- 玩的时候如果你的手机没有给 SM4J 关闭电池优化，当切到其它 App 的时候，SM4J 就会掉线，所以如果想聊天，建议使用浮窗或给 SM4J 关闭电池优化。

### 视频

{% bilicard BV1gt4y1E7Vy %}
