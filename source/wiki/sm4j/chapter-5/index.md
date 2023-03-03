---
layout: wiki
wiki: 从零开始玩转 SM4J
order: 105
title: 五、游戏设置
---

--乱七八糟的设置都是什么？

------

SM4J的设置对于新人来说可能是十分繁杂了，而且还是外语。那么我们就一起来看看各个设置选项都是什么吧！

### 1.设置主界面

首先在主界面点击OPTIONES进入设置界面。（英文版为OPTIONS）。

<img src="https://www.helloimg.com/images/2020/12/21/image-2020112719562352671053b6e7d847072.png" alt="image-20201127195623526" style="zoom:80%;" />

可以看到有5个栏目，分别是**设置** CONFIGURATION (CONFIG), **按键设置 **TECALS CONFIG (KEY CONFIG), **手柄设置** MANDO CONFIG (GAMEPAD CONFIG), **检查更新（已经废掉）** CHECK UPDATE 和 **制作人员名单** CREDITOS (CREDITS)。

第一个CONFIGURATION是游戏设置，在这里可以设置一些游戏效果，材质包和声音选项。

第二个TECLAS CONFIG是键盘设置，可以设置游戏的操作按键。

第三个MANDO CONFIG是手柄设置，如果你有手柄，可以设置手柄操作。

第四个CHECK UPDATE为检查更新，检查更新国内用不了，所以这个选项目前基本是废掉了的。

第五个CREDITOS是游戏的谢志，包含制作人员和感谢名单。

### 2.游戏设置

首先我们来看CONFIGURATION（游戏设置）。

<img src="https://www.helloimg.com/images/2020/12/21/image-20201127195950337a4ef84f01a5067c7.png" alt="image-20201127195950337" style="zoom:80%;" />

一共有五栏：AUDIO CONFIG（**声音设置**）,GLOBAL CONFIG（**全局设置**）,TEXTURES（**加载材质包**）,EXTRA（**额外功能设置**）和DESCARGAR TEXTURAS（**下载材质包**），右侧还有一个小语言图标和返回键。  其中TEXTURES和DESCARGAR TEXTURAS到“**材质包之章**”再讲。这里先讲另外三个。

### 3.声音设置

<img src="https://www.helloimg.com/images/2020/12/21/image-2020112720003127939e68a5445580f81.png" alt="image-20201127200031279" style="zoom:150%;" />

AUDIO CONFIG（声音设置）：可以设置游戏的音量、音效音量等。

从上到下分别为主音量、音乐音量和音效音量，可以分别调节。右侧的MUTE是静音。

### 4.全局设置

全局设置一共有三页。由于内容太多，此处以西班牙语举例。（~~其实就是我懒~~）设置中的DESACTIVADO代表**关闭**，ACTIVADO代表**开启**。使用屏幕下方的ANTERIOR（**上一页**）和SIGUIENTE（**下一页**）可以切换页数。

#### 全局设置第一页

<img src="https://www.helloimg.com/images/2020/12/21/image-20201127200055857b3d557921275c271.png" alt="image-20201127200055857" style="zoom:150%;" />

第一页从上到下分别为：

PANTALLA COMPLETA（**全屏，仅电脑版**）。这个不用说也知道吧。SM4J电脑版中最大化窗口模式在每次回到标题画面的时候，会变成正常大小，而全屏就不会。所以相比于最大化，还是推荐全屏模式。在游戏中按**F4**可以快速切换全屏模式。

OPTIMIZAR EL JUEGO（**游戏优化**）。这个选项可以使用优化后的加载方式，让游戏关卡分块加载，可以缓解手机版的拖慢现象，不过可能出现 bug。

VER FPS（**显示FPS**）。开启之后你的游戏右上角就会有一个FPS显示。SM4J满FPS是60帧，还没有自动跳帧，所以FPS低于60帧，游戏中就会有拖慢现象~~，类似马造2多人的卡比~~。拖慢有时候极度影响操作。大部分手机运行SM4J都会保持在30-50FPS，而达不到满速，所以还是推荐使用电脑游玩。

参考：**游戏速度**：(FPS数) ÷ 60 x 100%

V-SINC（**垂直同步**）。电脑如果在显卡控制面板中没有开启垂直同步，SM4J的游戏速度会变得很快，有的甚至会超过300%，这时候开启垂直同步可以使游戏保持100%原速，只对60Hz刷新率的显示器生效。手机版虽然默认开启，但不推荐开启，会降低游戏速度。

ANALOGO VIRTUAL PARA ANDROID（**虚拟摇杆，仅手机版**）。开启了之后左下角的十字键会变为一个摇杆，推荐使用平板设备和~~手柄玩多了~~不习惯十字键间有间隔的玩家使用。摇杆的中心点是固定的，所以你完全可以把它当做一个没有间隔的十字键使用。~~比隔壁SMMWE摇杆好多了~~。效果如图。

<img src="https://www.helloimg.com/images/2020/12/21/image-20201127200147927cc831b9f63c49734.png" alt="image-20201127200147927"/>

EFECTO DE ESTRELLA（**无敌星效果，默认开启**）。开启后人物如果吃到无敌星，身上会闪烁。不推荐低配手机开启。如果你在使用 Linux，并使用Wine玩SM4J，切勿开启此选项！此选项会让游戏崩溃。

<img src="https://www.helloimg.com/images/2020/12/21/image-202011272002242032a4eeff70ac9029e.png" alt="image-20201127200224203" style="zoom:80%;" />

#### 全局设置第二页

<img src="https://www.helloimg.com/images/2020/12/21/image-20201127200233501b81d76da55340cf4.png" alt="image-20201127200233501" style="zoom:150%;" />

第二页从上到下分别为：

PANTALLA VERTICAL PARA 2 JUGADORES（**2玩家垂直分屏**）。这是一机多人的相关选项。分别为NORMAL（**普通**）和AJUSTADO（**优化**）。开启优化可以不拉伸。推荐开启优化。

没开：<img src="https://www.helloimg.com/images/2020/12/21/image-20201127200303414808cf5d1ba89d033.png" alt="image-20201127200303414" style="zoom:80%;" />

这时候如果你是横屏，画面将会拉伸，非常不友好。

开了： <img src="https://www.helloimg.com/images/2020/12/21/image-20201127200317996b612869d7eecfe50.png" alt="image-20201127200317996" style="zoom:80%;" />

横屏画面将不会拉伸，多余的部分将会显示世界地图。

BOTON DE CAPTURA DE PANTALLA（**截图按键，仅手机**）。可以在屏幕上显示一个截图按键<img src="https://www.helloimg.com/images/2020/12/21/image-2020112720044599733e5c6c9636cc6d6.png" alt="image-20201127200445997" style="zoom:80%;" />。游玩过程中点击这个按钮，就可以截图。截图保存在**内部存储/SM4J/Screenshots**。电脑版要截图无需开启此选项，按下**F12**就能截图。

GUARDADO AUTOMATICO – CADA 5 MIN（**每5分钟自动保存**）。开启了，编辑器就会每5分钟自动保存你的关卡。如果有自动保存，进入编辑器前就会提示你是否加载草稿。

<img src="https://www.helloimg.com/images/2020/12/21/image-20201127200502971bbf54446362a6d4c.png" alt="image-20201127200502971" style="zoom:80%;" />

草稿保存在**内部存储/SM4J/Backups**。如果积攒了一堆草稿，记得清理哦~

CREACION EN MODO TACTIL（**编辑器触控，猜测仅手机版**）。此选项功能未知，估计也是作者预留的选项，开不开没区别。

SPIN JUMP AL PULSAR EL BOTON AL（**当按下AL时旋转跳，仅手机版，默认禁用**）。如果禁用，当按下AL（其他按键方案为X）键是开/关旋转跳，当AL是绿色时跳跃=旋转跳，适合使用小屏手机的玩家，如果启用，当按下AL时就会旋转跳，这样可以把旋转跳和普通跳跃分开，适合较大屏幕手机和平板。**啥时候作者也给电脑版出个单独旋转跳按键呢？**

#### 全局设置第三页

<img src="https://www.helloimg.com/images/2020/12/21/image-202011272005160434d33d871f09bc91c.png" alt="image-20201127200516043" style="zoom:150%;" />

  第三页只有三个选项。 IP DEL SERVIDOR MAESTRO（**自定义服务器IP**），CUSTOM SERVER（自定义GMnet服务器）和 QUICK LOAD。

前两个是为GMnet服务端的预留选项，当游玩别人的GMnet服务器时可以启用和输入IP，GMnet服务器的使用方法详见[视频教程](https://js.sydzy.ga/-----https://www.youtube.com/embed/wKlfHCBdHQU)。

如果想玩在线对战，保持默认即可。

第三个选项**QUICK LOAD** 是一个实验性优化，会提升编辑器的帧数，但可能导致不稳定。

### 5.额外设置

<img src="https://www.helloimg.com/images/2020/12/21/image-202011272006302687bb52845e267c738.png" alt="image-20201127200630268" style="zoom:150%;" />

额外设置中一共只有4项。

MARIO NES（**FC马力欧**），MARIO WII（**Wii马力欧**）。此为实验性功能，在2.0.4中将被皮肤系统代替。两者只能启用一个，开启后可以使用FC或Wii版的马力欧进行游玩，不过只有小状态和蘑菇状态是对应皮肤（贴图不全）。而且Wii版马里奥贴图糊的一批。总之就是不推荐开启。~~不过部分材质包会在FC或Wii皮肤中埋彩蛋。~~

~~2.0.4~~在线对战的皮肤系统来源于此。

效果图：

<img src="https://www.helloimg.com/images/2020/12/21/image-2020112720064865495b05332bddf07da.png" alt="image-20201127200648654" style="zoom:80%;" />

BOTS EN VEZ DE JUGADORES（**多人游戏人机**）。开启后，选择4人游戏时，就可以和人机嗨皮啦！不过人机憨的一批，AI还没做好，甚至会一直踩你头~~，把你当做垫垫脚~~，部分场景人机还会卡没。真多人游戏时记得把人机关掉，否则人机会把其他玩家顶掉，无法进行多人游戏。闯关模式下开局3个人机会卡在一起，记得找空旷的地方给他们垫脚垫开。不过人机在乱斗模式可是很强悍的!可能它们就是为乱斗模式设计的吧。如果游玩在线对战或多人模式，请关闭人机。

在2.0.4中，这个选项有几率会让游戏崩溃，更新到2.0.5Fix就行了。

<img src="https://www.helloimg.com/images/2020/12/21/image-202011272008114529ea08fe2451acf05.png" alt="image-20201127200811452"/><img src="https://www.helloimg.com/images/2020/12/21/image-2020112720081991088c079dd6bdd46be.png" alt="image-20201127200819910"/>

### 6.操作设置

#### 键盘设置

TECLAS CONFIG。

<img src="https://www.helloimg.com/images/2020/12/21/image-20201127200957864325b1fab41a15e1a.png" alt="image-20201127200957864" style="zoom:150%;" />

在这里可以设置4个玩家的操作。点击各个按键可以更改。打开菜单的按键是回车（Enter），不可更改。

默认的玩家1按键是箭头上下左右为方向，左SHIFT跳跃，左CTRL跑步，Esc取回物品。对于国内使用中文输入法的玩家，SHIFT跳跃这点特别蛋疼，因为一不小心就变成中文导致其他玩家无法操作，所以建议更改。

点击 Restablecer 可重设按键回默认。

#### 手柄设置

MANDO CONFIG。

如果你使用了手柄，记得在打开游戏之前就插入手柄，否则游戏无法识别。

<img src="https://www.helloimg.com/images/2020/12/21/image-202011272010461637334d16b95403107.png" alt="image-20201127201046163" style="zoom:150%;" />

点<img src="https://www.helloimg.com/images/2020/12/21/image-20201127201055625db6772944369a321.png" alt="image-20201127201055625" style="zoom:80%;" />就可以设置按键。

<img src="https://www.helloimg.com/images/2020/12/21/image-20201127201100260002e4be20cd1785b.png" alt="image-20201127201130153" style="zoom: 80%;" />

正常应该是所有蓝色格子都有对应按键，如果有键位缺失，点击 Restablecer。

SALTAR是跳跃，CORRER是跑步，ITEM是取回物品。设置好之后点击保存，点击对应玩家下面的箭头，就可以切换使用键盘或手柄了。

<img src="https://www.helloimg.com/images/2020/12/21/image-20201127201130153f2361686e26d6ddf.png" alt="image-20201127201130153" style="zoom: 80%;" />

如果是4个人一起面基，推荐使用多个手柄而非键盘。对了，手柄也没单独旋转跳的按键，所以还是上+跳，对于使用合体十字键的手柄，这很难受，推荐使用分体十字键或十字键较的手柄。

### 7.语言

点击<img src="https://www.helloimg.com/images/2020/12/21/image-20201127201205457b9804bbada76d50b.png" alt="image-20201127201205457" style="zoom:67%;" />可以选择语言，目前只有西班牙语、英语**（未完成，大部分文本还是西班牙语）**。
