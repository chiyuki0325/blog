---
title: 📱 在 Termux 上使用硬件 GPU 加速的 proot 容器
date: 2023-03-19 19:11:55
tags:
- Termux
category: 其它
references:
- title: 'Termux以virglrenderer達成GPU 3D硬體加速'
  url: https://ivonblog.com/posts/termux-virglrenderer/
description: 'Termux 最近推出了适用于安卓原生的 virglrenderer-android 软件包，可以运行安卓原生的 VirGL 渲染器给 proot 容器硬件加速。'
cover: https://imgsrc.baidu.com/forum/pic/item/e61190ef76c6a7efbfb74befb8faaf51f2de6662.jpg
---

>  VirGL 是一种用于 QEMU 虚拟机内部的虚拟 3D GPU，它允许客户操作系统使用主机 GPU 的功能来加速 3D 渲染。计划是拥有一个完全独立于主机 GPU 的客户 GPU。  
> -- Mesa 3D 官网

Termux 最近推出了适用于安卓原生的 virglrenderer-android 软件包，可以运行安卓原生的 VirGL 渲染器给 proot 容器硬件加速。

```bash
pkg i virglrenderer-android	  # 安装 virglrenderer-android
```

安装好之后通过以下命令启动一个带有 VirGL 图形加速的 X 服务器：

```bash
# Session 1
Xvfb :0 -ac  # 启动 X 服务器
# Session 2
DISPLAY=:0 termux-x11  # 启动 Termux:X11
# Session 3
virglrenderer-android  # 启动 VirGL 渲染器
```

（三者在不同虚拟终端运行是方便直接 Ctrl+C 退出，如果不退出它们，直接关掉 Termux 的话，它们还会留在后台耗电。）

```bash
ls -a $TMPDIR
```

如果能看到 `termux-x11` 和 `.virgl_test` 套接字文件，就说明成功了。

通过以下命令进入 proot 容器：

```bash
proot-distro login <容器名> --shared-tmp
```

使用这条命令进入容器，会把 Termux 的 `$TMPDIR` 挂载到容器的 `/tmp`，这样就可以把套接字通入容器。

```bash
export DISPLAY=:0 \
       GALLIUM_DRIVER=virpipe \
       MESA_GL_VERSION_OVERRIDE=3.2  # 设置必须的环境变量
```

```bash
glxgears  # 运行 OpenGL 测试程序
```

如果此时 Termux:X11 的显示器窗口上出现了齿轮动画，就说明 GPU 加速一切正常。🎉

GPU 加速的玩法有很多，比如配合 Box86 / Box64 和 Wine 运行一些简单的 Windows 3D 游戏等。
