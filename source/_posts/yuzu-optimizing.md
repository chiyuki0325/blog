---
title: 💻 优化Yuzu模拟器，达到最优性能和效果
date: 2021-07-23 19:35:37
tags:
- Yuzu
category: 模拟器
---

### 〇、菜单汉化

打开设置界面（Emulation - Configure）找到UI一页，将Interface Language改为Chinese。

[![CEV6oc.png](https://www.helloimg.com/images/2021/07/23/CEV6oc.png)](https://www.helloimg.com/image/CEV6oc)

----

### 一、性能优化

首先要确保模拟器的多核优化打开。打开设置界面，将多核CPU仿真一项打勾。

[![CEV8iq.png](https://www.helloimg.com/images/2021/07/23/CEV8iq.png)](https://www.helloimg.com/image/CEV8iq)

然后切换到CPU页，根据你的电脑配置选择，如果是低配就选择低精度，而配置相对好的就选择Auto（自动）。

[![CEVks1.png](https://www.helloimg.com/images/2021/07/23/CEVks1.png)](https://www.helloimg.com/image/CEVks1)

然后切换到图形页。

如果你是N卡，那么API选择OpenGL，Shader Backend（着色器后端）选择GLASM。如果你是A卡，那么API选Vulkan，设备改为你的独立显卡。如果你是英特尔核显，那么API使用OpenGL，Shader Backend（着色器后端）选择SPIR-V或GLSL。

然后勾选“使用磁盘着色器缓存”、“使用GPU异步模拟”、“Use NVDEC emulation（模拟NVDEC）”和“Accelerate ASTC texture decoding（加速ASTC材质解码）”。

[![CEVVYb.png](https://www.helloimg.com/images/2021/07/23/CEVVYb.png)](https://www.helloimg.com/image/CEVVYb)

然后切换到高级选项那页，将启用异步着色器编译、启用快速GPU时钟和Enable GPU cache garbage collection。

如果你对配置足够自信，想要减少一些游戏的画面bug，那么就勾选启用垂直同步，并且把模拟精度改为高（High）。

{% note color:red 如果在玩游戏的时候遇到画面BUG，把启用异步着色器编译关掉，因为这是实验性选项。 %}

[![CEVfeo.png](https://www.helloimg.com/images/2021/07/23/CEVfeo.png)](https://www.helloimg.com/image/CEVfeo)

之后切换到声音那页，勾选启用音频拉伸。

[![CEVh2D.png](https://www.helloimg.com/images/2021/07/23/CEVh2D.png)](https://www.helloimg.com/image/CEVh2D)

### 二、游戏汉化

切换到系统页，将语言改为简体中文（是”简体中文“不是”中文“！），然后将时区改为中国标准时间。如果时区不改的话，动物森友会等依赖系统时间的游戏会不正常。

[![CEVjKS.png](https://www.helloimg.com/images/2021/07/23/CEVjKS.png)](https://www.helloimg.com/image/CEVjKS)
