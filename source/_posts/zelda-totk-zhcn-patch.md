---
title: 🕹️《塞尔达传说：王国之泪》简体中文汉化优化补丁
date: 2023-07-27 12:34:50
tags:
- 塞尔达传说
- Switch
category: 游戏
---

在本作，游戏内的译名出现了“繁吃简”的情况，《旷野之息》中繁体中文的译名被用于本作的简体译名，比如“阿陨”被修改为“阿沅”，“璐菊”被修改为“露珠”等。

中文字体也被修改，在《旷野之息》的简体中文语言中，统一使用华康黑体，而本作中的中英文字体不统一，导致了观感上的不和谐。

本补丁旨在修复上述问题，使**游戏内的译名与《旷野之息》保持一致**，同时**统一中英文字体**，让《旷野之息》的老玩家能够更好地适应本作。

#### 效果如图

{%image https://imgsrc.baidu.com/forum/pic/item/b21bb051f8198618280472b40ced2e738bd4e6bb.jpg %}

{%image https://imgsrc.baidu.com/forum/pic/item/d1a20cf431adcbeff377e336eaaf2edda3cc9fbb.jpg %}

{%image https://imgsrc.baidu.com/forum/pic/item/6609c93d70cf3bc74d4350dc9700baa1cd112abb.jpg %}

#### 获取补丁

因为《王国之泪》使用了资源表机制，**不可能**做出全版本适用的补丁，所以本补丁与游戏版本强关联。

我玩的是 1.1 版本，可以自行下载我打好的补丁文件：https://sydzy.lanzouk.com/iDGu913m29tc ，**仅适用于 1.1 版本**。

如果你的游戏是其它版本，那么就需要按照下方的方法，打出适用于该版本游戏的补丁。

GitHub 项目: https://github.com/YidaozhanYa/TotKzhCNPatch

可以在 GitHub 网页上点击“Code” -> “Download ZIP”下载，也可以使用 Git 克隆。

#### 如何打出适用于其它版本游戏的补丁

首先，你需要安装 Python 3.10 或以上版本，之后获取《塞尔达传说：王国之泪》的 romfs 文件夹。romfs 可以从模拟器或 NS 破解系统中解包。

以 Yuzu 模拟器为例，在模拟器的主菜单对《塞尔达传说：王国之泪》点击右键。选择“转储 RomFS”->“转储 RomFS”，点击确定，等待转储完成后，会打开生成的 romfs 文件夹。

从 GitHub 下载好项目之后，在项目文件夹中创建名为 *binaries* 的文件夹，把这个 romfs 文件夹移动到其中，然后在命令行中执行以下命令：

```bash
# 创建并激活 Python 虚拟环境
python3 -m venv venv
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 执行补丁
python3 main.py
```

待补丁操作完成后，你可以在 *dist* 目录中找到“*汉化优化补丁*”文件夹。

打好的补丁是 LayeredFS 格式，如果你使用模拟器游玩，就把它放到模拟器的 mod 数据文件夹中，就可以在游戏中看到汉化效果了。

如果你使用破解 NS，就自行搜索如何加载。我并没有 NS，所以没法测试大气层及其它加载器的兼容性。

#### 论坛帖子

发布于品技论坛：https://www.tekqart.com/thread-351481-1-1.html
