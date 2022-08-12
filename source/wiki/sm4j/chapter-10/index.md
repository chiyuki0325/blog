---
layout: wiki
wiki: SM4J
order: 110
title: 十、自定义敌怪
---

——SM4J在2.0.4版本更新中，加入了自定义敌怪。

-----

### 1.自定义敌怪制作

自定义敌怪的文件结构类似材质包。

文件夹【自定义敌怪名字，英文/数字/符号】

> spr_custom_enemy.png（敌怪贴图）
>
> spr_custom_enemy_ded.png（敌怪死亡贴图）
>
> custom.ini（敌怪配置文件）
>
> .nomedia（可选，照顾手机版相册）

你可以下载[官方示例敌怪-AquaGoomba](https://sydzy.lanzoux.com/iQmLAln072d)。

.nomedia文件是空白文件，为可选，因为自定义敌怪不是压缩包，因此会被收录进安卓系统的相册，导致发送图片的时候很不方便，加入这个空文件可以让你的自定义敌怪不被收录进相册。

如果Windows系统提示不能重命名为这个名字，就在开始-运行（Win10为右键开始-运行） 中输入：

```
cmd /c echo.>d:/.nomedia
```

然后确定，把D盘下生成的.nomedia文件放到你的自定义敌怪文件夹就行了。

#### 自定义敌怪参数表

先来一张默认的参数表。

```ini
[options]
fly="0"
hyper="0"
is_koopa="0"
item="0"
item_x="0"
item_y="0"
enemy_summon="0"
enemy_x="0"
enemy_y="0"
life="1"
fire_type="0"
fire_time="0"
fire_xplus="0"
fire_yplus="0"
invul="0"
chargenow="0"
hardness="0"
stomp="0"
[sprite]
mask="0"
img_numb="2"
xorig="0"
yorig="0"
[dedsprite]
img_numb="1"
xorig="0"
yorig="0"
```

一些诸如img_numb，XXX_x，XXX_y的参数和材质包用法相同，此处不再赘述。

这里给出其他属性的说明书。

```ini
[是否飞行 fly]
0是不能 1是能

[是否发狂 hyper]
0是不发狂 1是发狂（类似黄色龟龟）

[是否是乌龟类敌人 is_koopa]
0不是 1是（会掉落龟壳）

[掉落物品 item]
死后掉落一个物品。（物品ID表 官方暂未给出）

[召唤小怪 enemy_summon]
行走的时候召唤小怪。（敌人ID表 官方暂未给出）

[射弹类型 fire_type]
1:凯瑟琳的蛋
2:火球 1
3:圆形魔法 1
4:圆形魔法 2
5:火球哥的火球
6:锤子哥的锤子
7:飞镖哥的回旋镖
8:冰球哥的冰球
9:炸弹 1
10:火球 2
11:炸弹 2
12:吐火花的火焰
13:库巴的火焰
14:骨头库巴的蓝色火焰
15:炮弹
16:火焰喷射器的火焰

[射弹时间 fire_time]
发射出的射弹存活的时间。

[生命值 life]
这个数值决定了敌人踩几下会死。


[碰撞箱类型 mask]
0=普通 16*16
1=（不知道）
2=大型 32*32
3=高 16*32
4=长 32*16

[属性免疫 hardness]
0:无
1:免疫火球
2:免疫耀西舌头/冰球
99:无敌
100:更加无敌（掉出场景也不会死）

[踩踏属性 stomp]
0:普通
1:带刺，但是会被旋转跳踩死
2:带刺，不会被旋转跳踩死
3:普通，不会被旋转跳踩死
4:美版，可以被拔起来
5:普通，踩下不会积累分数
-1: 友好，对玩家无伤害
```

尝试制作自己的自定义敌怪吧！

-----

### 2.自定义敌怪安装

将自定义敌怪文件夹（如果是压缩包，请解压）放入

```
电脑版：%AppData%\SM4JLegacy\Custom_Enemy
手机版：内部存储或SD卡/SM4J/custom/Custom_Enemy
```

然后进入游戏即可看到。