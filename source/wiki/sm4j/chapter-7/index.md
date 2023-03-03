---
layout: wiki
wiki: 从零开始玩转 SM4J
order: 107
title: 七、材质包
---

——贴图？改他！

------

SM4J这个游戏，是有丰富的自定义素材功能的，在安卓端数一数二。其中就包括材质包。

### 1.何为材质包

玩过MC或者其他支持材质包的同学们应该很熟悉材质包是什么。材质包本质上就是一个压缩包，只不过里面包含了游戏的贴图，我们可以自定义它。

SM4J也是支持材质包的。材质包是一个zip格式的压缩包，比如<img src="https://www.helloimg.com/images/2020/12/21/image-20201127214625875fd018b0f0ec90cc4.png" alt="image-20201127214625875" style="zoom:80%;" />。

### 2.安装材质包

把材质包的压缩包放到 **%AppData%\SM4JLegacy\Texturas** 中，手机版是 **内部存储\SM4J\Texturas** 。

在SM4J的OPTIONES - CONFIGURATION - TEXTURES 即可选中材质包，点击即可加载。

<img src="https://www.helloimg.com/images/2020/12/21/image-2020112721512618309bc8d8303044399.png" alt="image-20201127215126183" style="zoom:80%;" />

左侧的问号是材质包图标，比如<img src="https://www.helloimg.com/images/2020/12/21/image-20201127215347298f8192c56a1bb5305.png" alt="image-20201127215347298" style="zoom:67%;" />。部分材质包会有图标。

VERSION后面是材质包的版本号，AUTOR是作者。

材质包里面是可以放置一个链接的，如果材质包有<img src="https://www.helloimg.com/images/2020/12/21/image-202011272152569218086c7fc77e4035e.png" alt="image-20201127215256921" style="zoom: 67%;" />图标，点击就可以查看作者设定好的链接（比如作者的youtube频道）。

注：**不要**打开Cargar texturas automaticamente al iniciar 这个选项，因为这会导致游戏在每次进入标题画面的时候都会加载一次材质包，导致返回标题画面需要很长的时间！

------

### 旧版材质包在新版会出现的问题

2.0.3中，材质包的多帧贴图名为“类型_物品ID_strip帧数.png”，而2.0.5中改为了“类型_物品ID.png”。如果你下载了2.0.3的材质包，记得使用[转换器](/docs/dl?id=材质包转换器)来转换为2.0.5的。

---

## 制作材质包简略小教程

**制作材质包需要对图片制作软件（如Photoshop / Krita）有一定了解。**

**材质包文件结构每个版本都在变化，本教程制作2.0.4/2.0.5材质包，旧的2.0.2和1.9.2材质包制作不讲解。**

如果你开始阅读此章节，那么说明你想学习做材质包，并且有毅力做完一整个材质包。

制作材质包有三种方式，一是下载[原版材质包](https://sydzy.lanzoux.com/iZjlMinefaf)然后修改对应贴图，二是从[原版材质包](https://sydzy.lanzoux.com/iZjlMinefaf)中按照文件结构复制出你要改的贴图，单独创建材质包，或者用方法一制作的材质包删去没有改动的贴图，这样的材质包可以和别的材质包一起使用。如果你对材质包文件目录结构足够熟悉，那么你可以自己创建贴图，然后改成对应名字即可。

------

### 1.文件结构

还记得我在讲编辑器时放的图吗？

<img src="https://www.helloimg.com/images/2020/12/06/image-20201125211407452ceaaa1229317d74c.png" alt="image-20201125211407452" style="zoom:80%;" />

这里的英文名就是材质包的基本文件结构。

SM4J的材质包基本文件夹结构如下：

材质包.zip/

 ┌ Backgrounds/   游戏关卡背景

 ├ Blocks/   机关方块，即编辑器<img src="https://www.helloimg.com/images/2020/12/21/image-202011272158454193d5595b2e7efbe08.png" alt="image-20201127215845419" style="zoom:67%;" />组中的方块

​     ├ Grayblocks/   <img src="https://www.helloimg.com/images/2020/12/21/image-20201127215905050c4c001bf2b33cfce.png" alt="image-20201127215905050" style="zoom:80%;" />一类的屏障方块

​     └ Items/   各种问号方块

 ├ Boss/   大型敌怪（BOSS），即编辑器中<img src="https://www.helloimg.com/images/2020/12/21/image-20201127215957425229a00eb8f982db4.png" alt="image-20201127215957425" style="zoom:67%;" />组中的敌怪贴图

 ├ Decoration/   装饰物，即编辑器中<img src="https://www.helloimg.com/images/2020/12/21/image-20201127220019848607a56f41b5de3b0.png" alt="image-20201127220019848" style="zoom:67%;" />组的物品

 ├ Enemies/   敌怪，即编辑器中<img src="https://www.helloimg.com/images/2020/12/21/image-20201127220155154aeadba25c21f30fb.png" alt="image-20201127220155154" style="zoom:67%;" />组的敌怪。Enemies内分多个文件夹，如Airship,Land等。

​     这些子文件夹是用来存放不同场景的敌人的。

 ├ Extra/    游戏界面

 ├ hud/   游戏界面

 ├ Items/   道具，即编辑器中<img src="https://www.helloimg.com/images/2020/12/21/image-20201127220230914f6c53bc7e12fd05b.png" alt="image-20201127220230914" style="zoom:67%;" />组的物品

 ├ mario_custom/    马力欧的贴图

 ├ marioP2_custom/    马力欧第二玩家的贴图

 ├ marioP3_custom/    马力欧第三玩家的贴图

 ├ marioP4_custom/    马力欧第四玩家的贴图

 ├ Misc/    杂项，编辑器中<img src="https://www.helloimg.com/images/2020/12/21/image-2020112722044690437a7fed4357a5eca.png" alt="image-20201127220230914" style="zoom:67%;" />的部分物品

 ├ NPC/   游戏NPC，即编辑器中<img src="https://www.helloimg.com/images/2020/12/21/image-20201127220414590aac074de7adf6ce3.png" alt="image-20201127220414590" style="zoom:67%;" />组

 ├ Projectiles/   玩家/敌怪打出的射弹

 ├ Special/   编辑器部分界面以及<img src="https://www.helloimg.com/images/2020/12/21/image-2020112722044690437a7fed4357a5eca.png" alt="image-20201127220446904" style="zoom:67%;" />组中的特殊道具

 ├ Tiles/   编辑器<img src="https://www.helloimg.com/images/2020/12/21/image-202011272205043079e1dd93199d4d646.png" alt="image-20201127220504307" style="zoom:67%;" />组的“自动衔接图块”（第1、2页）

 ├ Tilesets/   编辑器<img src="https://www.helloimg.com/images/2020/12/21/image-202011272205043079e1dd93199d4d646.png" alt="image-20201127220504307" style="zoom:67%;" />组的“瓦片图块”（第3页）

 ├ WorldMap/   大地图中的所有贴图

 ├ image.png   材质包图标，大小为44*44像素（迫害？）

 └ texture_v3.ini   材质包的作者等信息，以及点赞后的链接

知道了文件结构，你就可以去改对应的贴图啦！

这些贴图你可以直接用图片制作软件（如Photoshop）直接修改。

------

### 2.基本概念及命名格式

这里需要补一点GameMaker Studio中的基本概念。

**精灵**（Sprite，简写spr），这个精灵可不是会魔法的那个小精灵啊！此处“精灵”是游戏制作术语，即**会动的物体**。

SM4J中除了Tiles和Tilesets文件夹中的贴图，和Extra，Special文件夹中的部分贴图，其余的贴图都是精灵。~~怪不得SM4J在手机上那么卡~~ 

比如spr_qblock.png

**对象**（Object，简称obj），这个对象也不是你想的那个对象，是指**屏幕上不会动的物体**。

SM4J中，Extra文件夹中的虚拟按键贴图和Special文件夹中的几个按钮贴图为对象。

比如obj_botonA.png

**背景**（Background，简称bg），这个就很通俗易懂了，就是**游戏中的背景**。SM4J中，瓦片贴图也使用bg。

比如bg_logo2018.png。

这里先讲这么多。

SM4J中的贴图命名格式为“类型_物品ID.png”。

（注：旧版本中，多帧贴图命名格式为“类型_物品ID_strip帧数.png”。

------

### 3.贴图

SM4J中贴图为png格式。

物品贴图为16x16尺寸，比如<img src="https://www.helloimg.com/images/2020/12/21/image-20201128192614274c0e385ffb5126d4a.png" alt="image-20201128192614274" style="zoom:50%;" />。

那你可能就要问了，为什么大部分都不是16x16？

这些尺寸都是16的倍数，因为这些图块可能是多帧贴图，比如<img src="https://www.helloimg.com/images/2020/12/21/image-202011281928281715c32c116f312ce4c.png" alt="image-20201128192828171" style="zoom:33%;" />，还有可能是这个方块有多个面，比如<img src="https://www.helloimg.com/images/2020/12/21/image-2020112819293198929c43aea560cf743.png" alt="image-20201128192931989" style="zoom:67%;" />。

这些方块你也只需要修改对应的帧就好。

而非方块/物品的贴图，以及大部分的异形贴图（比如<img src="https://www.helloimg.com/images/2020/12/21/spr_cloud_strip4-1606563356579866f680948fad16e.png" alt="spr_cloud_strip4" style="zoom:80%;" />）尺寸都非16的倍数，修改保存时注意尺寸。

**注意，你用来修改图片的软件一定要支持透明色，不然你修改的贴图，在游戏内周围会有一圈白框！**

**千万不要用Windows自带的“画图”！**

小提示：画好的贴图要记得保存多个版本。如果这张贴图你改了觉得不满意，可以换回上个版本。

------

### 4.配置文件

细心的同学可能注意到了，材质包的精灵和对象贴图旁边，都会有一个和它同名的ini配置文件。

此文件是用来设置多帧贴图的，用任意文本编辑器都可以修改。

格式为：

```
[spr/obj_物品ID]
yorig="纵向扩展像素数"
xorig="横向扩展像素数"
image_number="帧数量"
```

举个例子，问号砖块（spr_qblock.png）的配置文件为：

```
[spr_qblock]
yorig="0"
xorig="0"
image_number="5"
```

#### 4.1 贴图尺寸改变

此处以实例讲解。我现在有一张24x23的“蘑菇”贴图，而蘑菇贴图<img src="https://www.helloimg.com/images/2020/12/21/image-20201128192614274c0e385ffb5126d4a.png" alt="image-20201128192614274" style="zoom:50%;" />的默认大小为16x16，直接放入32x32的贴图虽然显示上没什么毛病，但碰撞判定会出现问题，这个时候我们就需要修改配置文件了。

蘑菇的贴图名字是“spr_mushroom.png”，那我就打开“spr_mushroom.ini”。

这是蘑菇的默认配置文件：

```
[spr_mushroom]
yorig="0"
xorig="0"
image_number="1"
```

蘑菇的默认贴图大小为16x16，而我们要改成24x23，所以就需要修改配置文件的yorig和xorig两个参数。

这里举一个错误例子：

```
yorig="23"
xorig="24"
```

这样填写肯定是不行的。这两个参数需要填写偏移量，24-16=8，23-16=7，所以正确的填写方法应该是

```
yorig="7"
xorig="8"
```

填写好就是

```
[spr_mushroom]
yorig="7"
xorig="8"
image_number="1"
```

保存，就会发现大蘑菇的碰撞判定和大小正确了。

#### 4.2 多帧贴图设置

这里也举实例教学。

SM4J中的超级橡栗<img src="https://www.helloimg.com/images/2020/12/21/spr_acorn786b3e1d981af006.png" alt="spr_acorn" style="zoom:150%;" />是静态的，不会动，被顶出来时是左右移动，并不会滚动，这显然是不符合超马原作的。我们的目标是通过材质包让它动起来。

首先我们画好多帧贴图，我这里使用32帧（32幅图）。

多帧贴图 1帧好像是对应游戏里十分之一秒（这个我也不确定，估测的），所以如果要让他滚动慢一点，就重复绘制几帧。

<img src="https://www.helloimg.com/images/2020/12/21/spr_acorn-1606566358748956351a7038c6463.png" alt="spr_acorn" style="zoom:150%;" />

橡栗的贴图是”spr_acorn.png“，我们就修改同名配置文件”spr_acorn.ini“。

```
[spr_acorn]
yorig="0"
xorig="0"
image_number="1"
```

默认的image_number参数是1，也就是只有1帧（静态）。如果只把贴图放进去，而不改参数，放置一个橡栗将会出现长长的一串橡栗串，因为系统把它当成静态贴图了。我把这个参数改成32，保存。

```
[spr_acorn]
yorig="0"
xorig="0"
image_number="32"
```

这样，就可做出动态贴图啦！

当然，用这种方法可以使其他带配置文件的贴图“动”起来，原来的多帧贴图也可以扩展，使动画更平滑。

------

### 5.扩展素材

如果你已经熟悉了编辑器进阶技巧中的”瓦片贴图“，不妨来试试扩展素材，在SM4J里不改变原有的方块而用自己的方块。

打开Tilesets文件夹，会看到有一个”bg_tiles_Custom.png“，尺寸是1600x1600，里面除了一个大大的draw，啥都没有。

在这里画上你的自定义贴图吧！然后在游戏内瓦片贴图的Custom页，就可以看见放入的扩展素材了。

------

### 制作心得

——这里放一点制作心得，给新人看看。

·一定要注意异形贴图的尺寸，否则可能边角上多一两像素。

·sm4j里不要给方块加上马造样式的阴影，否则违和感爆棚。

·bg_cave_X，bg_darksky_X，bg_ghost_house_X，bg_night_X，bg_starrynight_X，这几个贴图看似一样，其实是同一张背景的不同帧。是的，sm4j支持动态背景。

·背景没有配置文件，修改的背景尺寸最好不要比原背景小，否则少数背景会出现严重图形bug。

·最好不要动原来的瓦片贴图文件，除非你想不兼容自带地图和其他用瓦片制作的地图。

·Tiles/bg_arbolnieve.png，是“雪松”的贴图，很少有人会在地图中装饰雪松，所以可以把它改成指示牌或者其它物品（雾）

·Tiles文件夹中更改的图块一定要与原图块主题相同，否则还是违和，比如原版是一个地下的贴图，非要改成城堡砖块系，那违和感爆炸。

·bg_coralblock.png不是什么外太空岩石，只是水下地面的贴图。

·所有怪物射弹，特别是酷霸王火焰，最好不要改尺寸，会有判定问题。

·boss被踩的受伤贴图、弹簧系列、虚拟按键不要改帧数。

·城堡过关斧子spr_axe.png的尺寸最好不要动。

·spr_jelectro.png是水母的贴图，当然也很适合改成刺，因为水母不常用

·如果你的门锁和门一样大（比如马造里的红色门锁），不妨试试yorig="12"

·耀西的贴图不好处理，而且从1.9.2移植的耀西贴图帧数和新版不一样。

·文件（夹）名字的大小写可以变化。

·红鞋子spr_baburushoe不像smbx那样防火，所以别想着把它改成碎碎乌龟壳了。

·游戏标题文件名是bg_logo2018.png！bg_logotipo.png是1.9.2的标题贴图。

·带nes的，比如spr_mario_big_jumpNes.png，spr_goombaNes.png，是FC皮肤下的贴图、

·带Wii的，比如spr_marioWii_jump.png，是Wii皮肤下的贴图。

------

希望大家都能做出好康的材质包~也可以下载原版材质包或youtube大佬的材质包参考学习~
