---
title: 💠 使用 KVM 在 Linux 上无缝运行 Windows 应用
date: 2022-04-20 21:40:40
tags:
- KVM
- Linux
category: Arch折腾记
cover: 'https://imgsrc.chyk.ink/d009b3de9c82d15863d0d864c50a19d8bd3e4291.webp'
---

**看前须知：不支持图形加速**

在日用 Linux 的过程中，总有必须使用某些 Windows 独占软件（比如 Microsoft 365、Adobe 全家桶、FL Studio 等）的场景，这时候大部分人会选择双系统，其实虚拟机也可以解决，并且可能体验更好。

效果预览：![p](https://imgsrc.chyk.ink/d009b3de9c82d15863d0d864c50a19d8bd3e4291.webp)
![p](https://imgsrc.chyk.ink/241f95cad1c8a786086ecbdb2209c93d71cf509b.webp)

[KVM](https://baike.baidu.com/item/KVM%E8%99%9A%E6%8B%9F%E6%9C%BA/11016451?fr=aladdin) 是 Linux 内核自带的虚拟化模块，效率很高，可以使用 libvirt 进行管理，配合 RDP 可以实现无缝运行 Windows 应用。
本文将使用 WinApps 脚本配置 RDP。

#### 0、配置硬件虚拟化并下载好所需文件

关于如何开启硬件虚拟化，请自行百度。

首先需要一个 Win10 的镜像（新版可能无法使用 VirtIO Windows 驱动程序，所以这里我推荐 LTSC2019 版），还需要 [VirtIO Windows 驱动程序](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.217-1/virtio-win.iso) 镜像。

之后克隆 WinApps 脚本的 Git 仓库。

```bash
git clone https://github.com/Fmstrat/winapps
```

#### 1、安装所需软件并配置 libvirt 权限

```bash
sudo pacman -S libvirt qemu edk2-ovmf freerdp
sudo systemctl enable --now libvirtd virtstoraged virtnetworkd
```

```bash
sudo sed -i "s/#user = "root"/user = "$(id -un)"/g" /etc/libvirt/qemu.conf
sudo sed -i "s/#group = "root"/group = "$(id -gn)"/g" /etc/libvirt/qemu.conf
sudo usermod -a -G kvm $(id -un)
sudo usermod -a -G libvirt $(id -un)
sudo systemctl restart libvirtd
sudo ln -s /etc/apparmor.d/usr.sbin.libvirtd /etc/apparmor.d/disable/ # 如果有 AppArmor 的话
sudo echo 'unix_sock_group = "libvirt"' >> /etc/libvirt/libvirtd.conf
sudo echo 'unix_sock_rw_perms = "0770"' >> /etc/libvirt/libvirtd.conf
echo "export LIBVIRT_DEFAULT_URI=qemu:///system" >> ~/.xprofile
export LIBVIRT_DEFAULT_URI=qemu:///system
sudo systemctl restart libvirtd
```

```bash
virsh net-list --all # 如果看见表中有 default 则继续，否则重启
virsh net-autostart default
virsh net-start default
```

#### 2、安装 Win10 虚拟机并配置好远程桌面

此处省略，可以按照 [WinApps 官方说明](https://github.com/Fmstrat/winapps/blob/main/docs/KVM.md) 进行操作。

注意：主机名需要为 RDPWindows，并且最好要有密码。

#### 3、配置 WinApps

按照第二步配置好虚拟机之后，在虚拟机中安装 [SPICE Guest Tools](https://www.spice-space.org/download/windows/spice-guest-tools/spice-guest-tools-latest.exe)，可以使鼠标更加流畅。

用文本编辑器打开 ``~/.config/winapps/winapps.conf``（若文件夹不存在就自行创建），加入如下内容：

```bash
RDP_USER="用户名"
RDP_PASS="密码"
#RDP_SCALE=100 #可选，可以改为所需缩放比，如 125
#MULTIMON="true" #如果为多显示器就开启此行
```

如果你还开着虚拟系统管理器，就从虚拟机中注销，关掉管理器，使虚拟机在后台运行。然后 cd 到 WinApps 仓库文件夹，执行如下命令：

```bash
./bin/winapps check
```

如果弹出一个 RDP 远程桌面，则说明没问题了，可以进行下一步。

#### 4、在虚拟机中安装需要运行的软件

#### 5、配置快捷方式（desktop）

cd 到 WinApps 仓库文件夹，执行 `./installer.sh` ，这会自动在宿主 Linux 系统中创建虚拟机内软件的快捷方式。

#### 6、后续维护

如果你后续又安装了软件，并且该软件 [在支持列表中](https://github.com/Fmstrat/winapps) 或有开始菜单快捷方式，则还可以运行 `installer.sh` ，会重新配置所有快捷方式（包括以前的和新的）。如果后续安装的软件没有快捷方式，则可以建立一个 shell 脚本，内容为

```bash
#!/bin/sh
$HOME/.local/bin/winapps manual "exe在虚拟机中的路径"
```

之后执行这个脚本即可。

#### 附录：图形优化

如果部分软件不能在 Microsoft 基本显示适配器中运行，可以使用 Mesa 3D 的 llvmpipe 渲染器进行渲染。

可以在 [这里](https://fdossena.com/?p=mesa/index.frag) 下载 Mesa 3D For Windows。

如果只需要顶替 OpenGL 渲染器，在 exe 位置放入 opengl32.dll 即可。

如果还需要顶替 Direct3D 渲染器，则还需要下载 [WineD3D For Windows](https://fdossena.com/?p=wined3d/index.frag)，并按照压缩包 README 内的说法放置 dll（opengl32.dll 也要放进去）。

#### 附录：一些常用命令

```bash
virsh start RDPWindows #启动虚拟机
virsh shutdown RDPWindows #关闭虚拟机
virsh net-dhcp-leases default |grep RDPWindows |awk '{print $5}' #查看虚拟机的 IP 地址
```

有了虚拟机的 IP 地址，就可以配置 SMB 共享（其实脚本已经共享了你的家目录）等服务。

