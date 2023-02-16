---
title: '⛏️ 《我的世界》网易国服在 Linux 下的折腾笔记'
date: 2022-12-24 20:05:11
tags:
- 我的世界
- Wine
category: 其它
cover: https://imgsrc.baidu.com/forum/pic/item/f9198618367adab429d34887ced4b31c8601e4f7.jpg
description: '《我的世界》网易国服的启动器使用 WPF 编写，并带有反作弊系统，想要让它跑起来还需要费一番功夫。注意：可以运行，但仍然不能正常游玩。'
---

《我的世界》网易国服的启动器使用 WPF 编写，并带有反作弊系统，想要让它跑起来还需要费一番功夫。

**⚠️ 注意：可以运行，但仍然不能正常游玩。**

### 🍷 配置 Wine 和 .NET 框架

网易启动器的界面是用 WPF 编写的（连主程序都叫 WPFLauncher.exe），想要在 Wine 中运行复杂的 WPF 应用程序，需要 Wine staging 7.x 或更高。我使用了 Bottles 的 caffe 7.20。

我的世界启动器（MCLauncher）需要 .NET Framework 4.0.30319，使用 winetricks 或 Bottles 安装 `dotnet40` 即可，五分钟内就可以装好。我的世界开发者启动器（MCStudio）需要 .NET Framework 4.5.2，需要安装 `dotnet452`，安装过程奇慢无比，需要一个小时才能装好。

{% image width:30rem https://imgsrc.baidu.com/forum/pic/item/cc11728b4710b912d570a53a86fdfc0393452244.jpg 终于安装完成了！ %}

> 装好 .NET 4.5.2 之后 Wine Windows 版本会被 winetricks 改成 Windows 2003，会出现 `wine: Call from 7BC2C280 to unimplemented function MSVCR100_CLR0400.dll._except_handler4_common, aborting` 报错，改成  Windows 7 即可。
>
> 如果懒得折腾 .NET，可以[下载我配置好的 wineprefix](https://file.yidaozhan.top/d/OneDrive/Linux/dotnet45-caffe720.tar.gz)。

### 📥 安装启动器

启动器的安装程序会抢焦点，并且在「安装准备中」之后动画会卡住，之后彻底无响应，这时候其实已经装好了，只需要杀掉进程，并彻底杀死 WIne（运行 `wineserver -k`）即可。

安装之后启动启动器主程序，可以正常更新。

{% image width:30rem https://imgsrc.baidu.com/forum/pic/item/d058ccbf6c81800a194cdacaf43533fa838b474c.jpg 可以正常更新 %}

### 🏷️ 登录

在 Wine 6 时代登录窗口本体会直接花屏，只剩后糊上去的 8+ 分级标签，现在渲染终于正常了。

{% image width:30rem https://imgsrc.baidu.com/forum/pic/item/aec379310a55b319bb6fd1b106a98226cefc175b.jpg 我的世界启动器登录窗口 %}

{% image height:15rem https://imgsrc.baidu.com/forum/pic/item/b7fd5266d016092498b6f1df910735fae7cd3466.jpg 开发者启动器登录窗口 %}

账号框中有时会无法输入文字，粘贴就行了。

### 🪟 主窗口

可能会出现 `CefSharp.BrowserSubprocess.exe` 崩溃的提示，不管即可。

{% image https://imgsrc.baidu.com/forum/pic/item/bf096b63f6246b60919ae1b0aef81a4c500fa25a.jpg 我的世界启动器主窗口 %}

{% image https://imgsrc.baidu.com/forum/pic/item/838ba61ea8d3fd1f4983f1fe754e251f94ca5f6f.jpg 开发者启动器主窗口 %}

在焦点在启动器中时切窗口会导致启动器直接卡死，需要彻底杀死 Wine（`wineserver -k`）之后重新打开。

### 🪦 基岩版

**⛏️ 原版**

可以在网易启动器中直接启动。因为 Wine 网易启动器很吃资源，所以性能表现一般。

{% image https://imgsrc.baidu.com/forum/pic/item/3b87e950352ac65ca59835b7bef2b21192138a51.jpg 基岩版运行截图 %}

**🔨 开发者版 (modpc)**

因为开发者启动器的外部调试工具无法运行，所以需要在开发者启动器中下载好 modpc 之后，使用 wine 单独运行。

如果只是想体验游戏，不是为了调试或不想申请开发者资格，这里是[我下载好的 modpc 包](https://file.yidaozhan.top/OneDrive/PC%E6%B8%B8%E6%88%8F/%E7%BD%91%E6%98%93%E5%9F%BA%E5%B2%A9)，但不推荐。基岩版还是推荐使用 [MCPELauncher](https://github.com/minecraft-linux/mcpelauncher-manifest) 原生游玩。

{% image https://imgsrc.baidu.com/forum/pic/item/faf2b2119313b07e711d03cc49d7912396dd8c56.jpg modpc 运行截图 %}

### 🌅 光线追踪版

{% image height:15rem https://imgsrc.baidu.com/forum/pic/item/0b46f21fbe096b636de50d9449338744eaf8ac72.jpg 网易现在的版本列表，1.10、1.13、1.14 都没了 %}

我不知道网易所谓的「光线追踪版」是什么东西，可能只是启用了 RTX 的基岩版。我没有 RTX 显卡，就没去尝试。

如果真的如此的话，安装 dxvk-nvapi，应该就能正常游玩了。

### ☕ Java 版

#### 🍷 Wine

Java 版可以使用 Wine 在启动器里直接_运行_，但会出现 socket 断开连接的 error，之后崩溃。

{% image https://imgsrc.baidu.com/forum/pic/item/0ff41bd5ad6eddc47d14e73f7cdbb6fd53663306.jpg Java 版加载过程 %}

```
[18:24:03] [Sender/INFO] [STDERR]: [com.netease.mc.mod.network.socket.NetworkSocket$Sender:run:146]: java.net.SocketException: Socket closed
[18:24:03] [Sender/INFO] [STDERR]: [com.netease.mc.mod.network.socket.NetworkSocket$Sender:run:146]:   at java.net.SocketOutputStream.socketWrite(Unknown Source)
[18:24:03] [Sender/INFO] [STDERR]: [com.netease.mc.mod.network.socket.NetworkSocket$Sender:run:146]:   at java.net.SocketOutputStream.write(Unknown Source)
[18:24:03] [Sender/INFO] [STDERR]: [com.netease.mc.mod.network.socket.NetworkSocket$Sender:run:146]:   at java.io.DataOutputStream.writeShort(Unknown Source)
[18:24:03] [Sender/INFO] [STDERR]: [com.netease.mc.mod.network.socket.NetworkSocket$Sender:run:146]:   at com.netease.mc.mod.network.socket.NetworkSocket$Sender.run(NetworkSocket.java:139)
[18:24:03] [Sender/INFO] [STDERR]: [com.netease.mc.mod.network.socket.NetworkSocket$Sender:run:146]:   at java.lang.Thread.run(Unknown Source)
[18:24:03] [Sender/INFO] [com.netease.mc.mod.network.socket.NetworkSocket]: Socket Close!
```

有时还会因为越权访问（「该内存不能为 read」）报错而崩溃。

{% image https://imgsrc.baidu.com/forum/pic/item/5882b2b7d0a20cf4f762ad1b33094b36adaf9900.jpg 完整的崩溃日志 %}

{% image https://imgsrc.baidu.com/forum/pic/item/562c11dfa9ec8a131cf20424b203918fa1ecc00e.jpg 卡出的主界面 %}

#### 🐧 原生尝试

Wine 崩溃，我便尝试原生在 Linux 上运行。

我用 VB 写了个小程序替换掉原本的 javaw.exe，以把参数传出来，之后复制并加以修改（比如反斜杠换成正斜杠，分号换成冒号），就做成了启动脚本（账号信息已打码为 `[QWQ]`）。

```bash
cd /home/yidaozhan/.local/share/wineprefixes/163/drive_c/MCLDownload/Game/.minecraft/

/usr/lib/jvm/zulu-8/bin/java -DlauncherControlPort=[QWQ] -DlauncherGameId=77114517833647104 -DuserId=[QWQ] -DToken=[QWQ] -DServer=RELEASE \
    -Djava.library.path="/home/yidaozhan/.minecraft/versions/1.12.2/natives-linux-x86_64" -Xmx4000M -Xmn128M -XX:PermSize=64M -XX:MaxPermSize=128M -XX:+UseConcMarkSweepGC -XX:+DisableAttachMechanism -XX:+CMSIncrementalMode -XX:-UseAdaptiveSizePolicy \
    -cp "libraries/net/minecraftforge/forge/1.12.2-14.23.5.2768/forge-1.12.2-14.23.5.2768.jar:libraries/net/minecraft/javassist/1.12/javassist-1.12.jar:libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar:libraries/org/ow2/asm/asm-all/5.2/asm-all-5.2.jar:libraries/org/jline/jline/3.5.1/jline-3.5.1.jar:libraries/net/java/dev/jna/jna/4.4.0/jna-4.4.0.jar:libraries/com/typesafe/akka/akka-actor_2.11/2.3.3/akka-actor_2.11-2.3.3.jar:libraries/com/typesafe/config/1.2.1/config-1.2.1.jar:libraries/org/scala-lang/scala-actors-migration_2.11/1.1.0/scala-actors-migration_2.11-1.1.0.jar:libraries/org/scala-lang/scala-compiler/2.11.1/scala-compiler-2.11.1.jar:libraries/org/scala-lang/plugins/scala-continuations-library_2.11/1.0.2/scala-continuations-library_2.11-1.0.2.jar:libraries/org/scala-lang/plugins/scala-continuations-plugin_2.11.1/1.0.2/scala-continuations-plugin_2.11.1-1.0.2.jar:libraries/org/scala-lang/scala-library/2.11.1/scala-library-2.11.1.jar:libraries/org/scala-lang/scala-parser-combinators_2.11/1.0.1/scala-parser-combinators_2.11-1.0.1.jar:libraries/org/scala-lang/scala-reflect/2.11.1/scala-reflect-2.11.1.jar:libraries/org/scala-lang/scala-swing_2.11/1.0.1/scala-swing_2.11-1.0.1.jar:libraries/org/scala-lang/scala-xml_2.11/1.0.2/scala-xml_2.11-1.0.2.jar:libraries/lzma/lzma/0.0.1/lzma-0.0.1.jar:libraries/net/sf/jopt-simple/jopt-simple/5.0.3/jopt-simple-5.0.3.jar:libraries/java3d/vecmath/1.5.2/vecmath-1.5.2.jar:libraries/net/sf/trove4j/trove4j/3.0.3/trove4j-3.0.3.jar:libraries/org/apache/maven/maven-artifact/3.5.3/maven-artifact-3.5.3.jar:libraries/net/minecraftforge/MercuriusUpdater/1.12.2/MercuriusUpdater-1.12.2.jar:libraries/com/mojang/patchy/1.1/patchy-1.1.jar:libraries/oshi-project/oshi-core/1.1/oshi-core-1.1.jar:libraries/net/java/dev/jna/jna/4.4.0/jna-4.4.0.jar:libraries/com/ibm/icu/icu4j-core-mojang/51.2/icu4j-core-mojang-51.2.jar:libraries/net/sf/jopt-simple/jopt-simple/5.0.3/jopt-simple-5.0.3.jar:libraries/com/paulscode/codecjorbis/20101023/codecjorbis-20101023.jar:libraries/com/paulscode/codecwav/20101023/codecwav-20101023.jar:libraries/com/paulscode/libraryjavasound/20101123/libraryjavasound-20101123.jar:libraries/com/paulscode/librarylwjglopenal/20100824/librarylwjglopenal-20100824.jar:libraries/com/paulscode/soundsystem/20120107/soundsystem-20120107.jar:libraries/io/netty/netty-all/4.1.9.Final/netty-all-4.1.9.Final.jar:libraries/com/google/guava/guava/21.0/guava-21.0.jar:libraries/org/apache/commons/commons-lang3/3.5/commons-lang3-3.5.jar:libraries/commons-io/commons-io/2.5/commons-io-2.5.jar:libraries/commons-codec/commons-codec/1.10/commons-codec-1.10.jar:libraries/net/java/jinput/jinput/2.0.5/jinput-2.0.5.jar:libraries/net/java/jutils/jutils/1.0.0/jutils-1.0.0.jar:libraries/com/google/code/gson/gson/2.8.0/gson-2.8.0.jar:libraries/com/mojang/authlib/1.5.25/authlib-1.5.25.jar:libraries/com/mojang/realms/1.10.17/realms-1.10.17.jar:libraries/org/apache/commons/commons-compress/1.8.1/commons-compress-1.8.1.jar:libraries/org/apache/httpcomponents/httpclient/4.3.3/httpclient-4.3.3.jar:libraries/commons-logging/commons-logging/1.1.3/commons-logging-1.1.3.jar:libraries/org/apache/httpcomponents/httpcore/4.3.2/httpcore-4.3.2.jar:libraries/it/unimi/dsi/fastutil/7.1.0/fastutil-7.1.0.jar:libraries/org/apache/logging/log4j/log4j-api/2.15.1/log4j-api-2.15.1.jar:libraries/org/apache/logging/log4j/log4j-core/2.15.1/log4j-core-2.15.1.jar:libraries/org/lwjgl/lwjgl/lwjgl/2.9.4-nightly-20150209/lwjgl-2.9.4-nightly-20150209.jar:libraries/org/lwjgl/lwjgl/lwjgl_util/2.9.4-nightly-20150209/lwjgl_util-2.9.4-nightly-20150209.jar:libraries/com/mojang/text2speech/1.10.3/text2speech-1.10.3.jar:libraries/com/mojang/text2speech/1.10.3/text2speech-1.10.3.jar:versions/1.12.2/1.12.2.jar:" \
    net.minecraft.launchwrapper.Launch \
    --username [QWQ] --version 1.12.2 --assetsDir assets/ --assetIndex 1.12.2 --uuid [QWQ] --accessToken [QWQ] --tweakClass net.minecraftforge.fml.common.launcher.FMLTweaker --versionType Forge -userProperties "{\"uid\":[115316094,0],\"gameid\":[2,0],\"launcherport\":[11330,0],\"filterkey\":[\"[QWQ]\",\"0\"],\"filterpath\":[\"/home/yidaozhan/.local/share/wineprefixes/163/drive_c/users/yidaozhan/AppData/Local/Netease/MCLauncher/config/fltmp\",\"0\"],\"timedelta\":[0,0],\"launchversion\":[\"1.9.1.3399\",\"0\"]}" --userPropertiesEx '{"GameType":2,"isFilter":false,"channel":"netease","timedelta":0}' \
    --server hytpc.mc.netease.com --port 25565 
```

在假的 javaw.exe 被启动后，立刻运行启动脚本，游戏便成功启动了 ... 吗？

{% image https://imgsrc.baidu.com/forum/pic/item/55e736d12f2eb9384388293690628535e4dd6f09.jpg 原生加载过程 %}

{% image https://imgsrc.baidu.com/forum/pic/item/6c224f4a20a44623990ef6a6dd22720e0df3d72a.jpg 单人模式可以游玩 %}

{% image https://imgsrc.baidu.com/forum/pic/item/4e4a20a4462309f701affed6370e0cf3d6cad636.jpg 多人模式当场暴毙 %}

{% image width:40rem https://imgsrc.baidu.com/forum/pic/item/c2fdfc039245d688f63fe060e1c27d1ed21b2430.jpg 鍔犺浇楠岃瘉妯″潡澶辫触 %}

把这句乱码翻译成人话，是「加载验证模块失败」。

### 📑 笔记

通过这次原生运行的尝试，我也大概明白了网易版的启动流程。

- 启动器打开后，在本地运行 Minecraft 验证服务器，以让中文用户名运作。
- 启动器准备启动游戏，打开一个 socket，以连接游戏，使防沉迷、屏蔽词过滤、反作弊机制运作。
- 启动器运行 javaw.exe 判断 Java 版本并切换。
- 启动器运行 javaw.exe 启动游戏，此时也传入了用户名、验证服务器 token（`-DToken`）、启动器 socket 端口（`-DlauncherControlPort`）、要游玩的服务器（`-DlauncherGameId`、`server`）等参数。
- 游戏连接一次启动器的验证服务器，登录账号。
- 游戏连接启动器的 socket，启用防沉迷等机制。
- 游戏启动后，连接要游玩的服务器并验证。我就是栽在了这步。

在 javaw.exe 被第二次运行的时候（游戏被启动的时候），立刻运行我的启动脚本，同时保持假的 javaw.exe 不关闭，就可以让启动器里的那个 socket 不关闭，让游戏保持运行了。

验证服务器的 token 每次打开启动器都会变，socket 的端口每次启动游戏都会变，所以脚本不是一成不变的，要经常更改。

网易我的世界中加载的那一大坨 mod，就是用来连接启动器，以及让那些机制运作的。

网易我的世界中的 natives 库是 Windows 的，所以要在本地准备好 Linux 的 natives 库。

等以后如果有某种方法能让服务器的验证机制运作，就真的能玩了。

---

{% image https://imgsrc.baidu.com/forum/pic/item/c995d143ad4bd11332efe5f61fafa40f4afb05d7.jpg 在官方论坛中只看到一名 Linux 玩家，看来我们的阵营还不够大 %}
