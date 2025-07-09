---
title: 🏹 在小米平板 5 上安装 Arch Linux
date: 2024-06-22 21:09:50
tags:
- Linux
category: Arch折腾记
cover: https://imgsrc.chyk.ink/a1ec08fa513d2697a5abcd6313fbb2fb4316d891.webp
references:
  - title: It's Linux, On Mi Pad 5. The fastest mainline tablet all the time.
    url: https://linux-on-nabu.gitbook.io/
  - title: map220v/ubuntu-xiaomi-nabu - GitHub
    url: https://github.com/map220v/ubuntu-xiaomi-nabu
---

小米平板 5 是一款发布于 2021 年的传奇安卓平板，它不仅能几乎完美地安装 Windows 11，还可以安装 Arch Linux 并满足日用需求。本文就来简述如何在小米平板 5 上安装 Arch Linux，并配置双系统。

<!--more-->

> 我们厌倦了在购买新平板电脑后很快就无法收到更新。厌倦了深度集成在 Android 和 iOS 之类的封闭系统中，以及设备厂商发布的老旧、过时的内核。这就是为什么我们正在开发一个可持续的、注重隐私和安全的自由软件移动操作系统，它基于 Linux 发行版，以权限分离为设计思路。让我们保持平板电脑的实用性和安全性，直到它物理损坏为止！
>
> —— Linux for Mi Pad 5

> 2024.11.29 更新 —— 使用最新最热的 Linux 6.12 内核

### ⚠️ 请注意

{% ablock color:red %}

刷入第三方系统需要解锁平板的 bootloader，这会使平板**失去保修**和一部分售后支持。

{% endablock %}

{%ablock%}

截止 2024 年 11 月，小米平板 5 上的主线 Linux 内核支持**仍然不是很完善**，所以部分硬件（如喇叭、传感器等）仍然无法正常运作。请先阅读下面的「硬件支持」一节。

{%endablock%}

{%ablock%}

本文假设您正在使用 Arch Linux 桌面系统，并且对 Linux 和安卓刷机都有一定了解。

本文**仅为我个人折腾经验**，并非尽善尽美的安装指南，会有些啰唆。

{%endablock%}

{%ablock%}

在 ARM 平台上运行的 **Arch Linux ARM** 为社区用户把 Arch Linux 移植到 ARM 上的发行版，并不受 Arch Linux 官方开发团队支持。并且，在使用过程中遇到问题，向社区提问时，一定要注明使用的是 Arch Linux ARM 而非 Arch Linux。

{%endablock%}

### 🛠️ 硬件支持

本文将使用（截止文章编写时）最新最热的 Linux 6.12 内核。该内核的硬件支持最好，但仍然有些硬件无法正常工作。

- GPU：不支持硬件视频编解码。

- 扬声器：只有左上、左下和右下三个扬声器可以正常运作，右上扬声器不能出声。

- 麦克风、前后摄像头、光线传感器、加速度计、陀螺仪无法运作。

  6.12 内核可以使用 [Hexagonrpcd](https://github.com/linux-msm/hexagonrpc) 以驱动起一部分传感器，但我并没有折腾这个。

### 🔑 解锁 bootloader

如果你正在认真阅读此文，那你大概率在用 Linux。但是，此步骤必须在 Windows 系统上完成。

使用[官方解锁工具](https://www.miui.com/unlock/index.html)解锁 bootloader。如果系统已经更新到了 HyperOS，请使用 [MlgmXyysd 的解锁脚本](https://github.com/MlgmXyysd/Xiaomi-HyperOS-BootLoader-Bypass)绕过答题限制，之后再使用官方解锁工具。

### 🔧 准备工作

需要在电脑上安装以下依赖：

```bash
sudo pacman -S android-tools base-devel git llvm qemu-user-static qemu-user-static-binfmt
```
从 xiaomirom.com 下载小米平板 5 的官方卡刷包，并解压出 `boot.img` 和 `vbmeta.img`。  
如果觉得官方下载太慢，可以试试把下载地址中的域名改成 `bkt-sgp-miui-ota-update-alisgp.oss-ap-southeast-1.aliyuncs.com`。

在镜像下载完成后，在平板上安装 Magisk 并对 `boot.img` 打补丁。之后，把打好补丁的 `boot.img` （`magisk_patched-27000_XXXXX.img`）拷回电脑。

还需要准备一个 U盘，一个 Type-C 转 USB-A 转接头 / 拓展坞和一个 USB 键盘或官方触点键盘。

### 💽 对 UFS 进行分区

{% ablock color:red %}

此步骤具有很高的危险性，在操作时请务必注意。  
一旦出现失误，可能导致平板变砖，需要 9008 深刷修复。

此步骤可能会清除安卓全部数据。请提前备份平板数据。

{% endablock %}

下载[包含分区工具的 recovery 镜像](https://drive.google.com/file/d/1gCNtoDMNCAmMR61xegvCC3mxv28gMJbi/view?usp=drive_link)（如果无法访问谷歌，可在[本站](https://file.chyk.ink/%E5%AE%89%E5%8D%93%E8%BD%AF%E4%BB%B6/nabu/xiaomi-nabu-orangefox.img)下载）。使平板进入 fastboot 模式并连接电脑，引导进入 recovery。

```bash
fastboot boot xiaomi-nabu-orangefox.img
```

待平板屏幕完全变成蓝色后，进入 parted 分区工具。

```bash
adb shell
# 此时会进入该 recovery 的 shell
parted /dev/block/sda
```

在 parted 中运行 `print` 查看当前的分区布局。  
将看到类似以下内容：

```parted parted
(parted) print
print
Model: SAMSUNG KLUDG4UHDC-B0E1 (scsi)
Disk /dev/block/sda: 126GB
Sector size (logical/physical): 4096B/4096B
Partition Table: gpt
Disk Flags:
Number  Start   End     Size    File system  Name             Flags
 1      24.6kB  32.8kB  8192B                switch
 2      32.8kB  65.5kB  32.8kB               ssd
 3      65.5kB  98.3kB  32.8kB               dbg
 4      98.3kB  131kB   32.8kB               bk01
 5      131kB   262kB   131kB                bk02
 6      262kB   524kB   262kB                bk03
 7      524kB   1049kB  524kB                bk04
 8      1049kB  1573kB  524kB                keystore
 9      1573kB  2097kB  524kB                frp
10      2097kB  4194kB  2097kB               countrycode
11      4194kB  8389kB  4194kB               misc
12      8389kB  12.6MB  4194kB               vm-data
13      12.6MB  16.8MB  4194kB               bk06
14      16.8MB  25.2MB  8389kB               logfs
15      25.2MB  33.6MB  8389kB               ffu
16      33.6MB  50.3MB  16.8MB               oops
17      50.3MB  67.1MB  16.8MB               devinfo
18      67.1MB  83.9MB  16.8MB               oem_misc1
19      83.9MB  101MB   16.8MB  ext4         metadata
20      101MB   134MB   32.9MB               bk08
21      134MB   168MB   34.2MB               splash
22      168MB   201MB   33.6MB               bk09
23      201MB   9328MB  9127MB               super
24      9328MB  9328MB  131kB                vbmeta_system_a
25      9328MB  9328MB  131kB                vbmeta_system_b
26      9328MB  9396MB  67.1MB               logdump
27      9396MB  9530MB  134MB                minidump
28      9530MB  9664MB  134MB                rawdump
29      9664MB  10.7GB  1074MB  ext4         cust
30      10.7GB  10.9GB  134MB   ext4         rescue
31      10.9GB  126GB   115GB                userdata
```

其中分区 31 就是安卓的 userdata 分区。我们需要缩小 userdata 分区，给 Linux 提供空间。

输入 `rm 31` 暂时删除 userdata 分区。

```parted parted
(parted) rm 31
rm 31
```

再运行 `print` 时，userdata 分区应该会消失。

```parted parted
(parted) print
print
Model: SAMSUNG KLUDG4UHDC-B0E1 (scsi)
Disk /dev/block/sda: 126GB
Sector size (logical/physical): 4096B/4096B
Partition Table: gpt
Disk Flags:
Number  Start   End     Size    File system  Name             Flags
 1      24.6kB  32.8kB  8192B                switch
 2      32.8kB  65.5kB  32.8kB               ssd
 3      65.5kB  98.3kB  32.8kB               dbg
 4      98.3kB  131kB   32.8kB               bk01
 5      131kB   262kB   131kB                bk02
 6      262kB   524kB   262kB                bk03
 7      524kB   1049kB  524kB                bk04
 8      1049kB  1573kB  524kB                keystore
 9      1573kB  2097kB  524kB                frp
10      2097kB  4194kB  2097kB               countrycode
11      4194kB  8389kB  4194kB               misc
12      8389kB  12.6MB  4194kB               vm-data
13      12.6MB  16.8MB  4194kB               bk06
14      16.8MB  25.2MB  8389kB               logfs
15      25.2MB  33.6MB  8389kB               ffu
16      33.6MB  50.3MB  16.8MB               oops
17      50.3MB  67.1MB  16.8MB               devinfo
18      67.1MB  83.9MB  16.8MB               oem_misc1
19      83.9MB  101MB   16.8MB  ext4         metadata
20      101MB   134MB   32.9MB               bk08
21      134MB   168MB   34.2MB               splash
22      168MB   201MB   33.6MB               bk09
23      201MB   9328MB  9127MB               super
24      9328MB  9328MB  131kB                vbmeta_system_a
25      9328MB  9328MB  131kB                vbmeta_system_b
26      9328MB  9396MB  67.1MB               logdump
27      9396MB  9530MB  134MB                minidump
28      9530MB  9664MB  134MB                rawdump
29      9664MB  10.7GB  1074MB  ext4         cust
30      10.7GB  10.9GB  134MB   ext4         rescue
```

之后重新创建 userdata 分区。

`mkpart userdata   10.9GB 50GB`

其中，`10.9GB` 为上一分区的结尾（参见 `print` 的输出），`50GB` 为安卓 userdata 分区的新大小。

{%ablock color:red ⚠️&nbsp;注意 %}

`userdata` 和 `10.9GB` 中间有三个空格。这样才可以确保 userdata 分区不被重新格式化。 

如果你不小心在 `userdata` 和 `10.9GB` 之间添加了 ext4，那么 userdata 分区会被格式化。这就相当于在 recovery 中选择「清除数据」了。

{% endablock %}

```parted parted
(parted) mkpart userdata   10.9GB 50GB
mkpart userdata   10.9GB 50GB    #If you added "ext4" behind the "userdata" text, your data will be erased when you reboot. 
```

之后就可以创建 Linux 分区了。

输入 `print free` 可以查看磁盘的剩余空间，并且在之上创建一个新分区给 Linux 使用。

`mkpart archlinux ext4 50.0GB 126GB`

其中，`50.0GB` 为 Linux 分区的起点，`126GB` 为 Linux 分区的**终点**（不是大小）。

```parted parted
(parted) mkpart archlinux ext4 50.0GB 126GB
mkpart archlinux ext4 50.0GB 126GB

(parted) print free
print free
Model: SAMSUNG KLUDG4UHDC-B0E1 (scsi)
Disk /dev/block/sda: 126GB
Sector size (logical/physical): 4096B/4096B
Partition Table: gpt
Disk Flags:
Number  Start   End     Size    File system  Name             Flags
        12.3kB  24.6kB  12.3kB  Free Space
 1      24.6kB  32.8kB  8192B                switch
 2      32.8kB  65.5kB  32.8kB               ssd
 3      65.5kB  98.3kB  32.8kB               dbg
 4      98.3kB  131kB   32.8kB               bk01
 5      131kB   262kB   131kB                bk02
 6      262kB   524kB   262kB                bk03
 7      524kB   1049kB  524kB                bk04
 8      1049kB  1573kB  524kB                keystore
 9      1573kB  2097kB  524kB                frp
10      2097kB  4194kB  2097kB               countrycode
11      4194kB  8389kB  4194kB               misc
12      8389kB  12.6MB  4194kB               vm-data
13      12.6MB  16.8MB  4194kB               bk06
14      16.8MB  25.2MB  8389kB               logfs
15      25.2MB  33.6MB  8389kB               ffu
16      33.6MB  50.3MB  16.8MB               oops
17      50.3MB  67.1MB  16.8MB               devinfo
18      67.1MB  83.9MB  16.8MB               oem_misc1
19      83.9MB  101MB   16.8MB  ext4         metadata
20      101MB   134MB   32.9MB               bk08
21      134MB   168MB   34.2MB               splash
22      168MB   201MB   33.6MB               bk09
23      201MB   9328MB  9127MB               super
24      9328MB  9328MB  131kB                vbmeta_system_a
25      9328MB  9328MB  131kB                vbmeta_system_b
26      9328MB  9396MB  67.1MB               logdump
27      9396MB  9530MB  134MB                minidump
28      9530MB  9664MB  134MB                rawdump
29      9664MB  10.7GB  1074MB  ext4         cust
30      10.7GB  10.9GB  134MB   ext4         rescue
        10.9GB  10.9GB  786kB   Free Space
31      10.9GB  50.0GB  39.1GB               userdata
32      50.0GB  126.0GB  76.0GB  ext4        archlinux
```

之后，输入 `quit` 退出 parted 工具，输入 `poweroff` 命令关机。  
此时可以把平板调回到 fastboot 模式备用。

### 🐧 编译内核

回到电脑上操作。

可以克隆 postmarketOS 开发者维护的 6.12-rc7 内核树，并打上[充电器和 RTC 的修复补丁](https://file.chyk.ink/Linux/nabu-patches)。

```bash
git clone https://gitlab.postmarketos.org/panpanpanpan/sm8150-mainline --branch=6.12-wip
```

也可以克隆我自己分叉出来的 6.12.0 内核树，已经打好了这两个补丁。

```bash
git clone https://github.com/chiyuki0325/sm8150-mainline --branch=6.12-wip
```

```bash
pushd sm8150-mainline

# 设置必要的环境变量。
export ARCH=arm64 LLVM=1 LLVM_IAS=1

# 此时可以使用 git apply 命令打上需要的补丁。

# 加载 defconfig 配置文件
make defconfig sm8150.config

# 调整内核配置。
make nconfig
# 进入 nconfig 配置界面后，根据实际的使用需求调整配置。之后按 F9 保存配置并退出。
# 这里给出几个可能有用的设置：

# 要在 Clash、NekoBox 等代理工具中使用透明代理需要打开以下选项：
# Networking support -> Networking options -> 打开 IP: tunneling
# File systems -> 打开 Ext4 Security Labels
# Cryptographic API 中根据使用的协议酌情开启

# 如果有插 U 盘的需求建议开启以下选项：
# File systems -> DOS/FAT/EXFAT/NT Filesystems
# 打开 exFAT filesystem support 和 NTFS Read-Write file system support

# 如果对键盘的按键布局不满意，需要使用 xremap 等按键映射工具
# 需要打开此选项：
# Device Drivers -> Input device support -> Miscellaneous devices
# 打开 User level driver support

# 编译内核。建议关闭电脑上运行的其它程序。
make Image Image.gz dtbs modules -j $(nproc)

# 导出模块文件。
make modules_install INSTALL_MOD_PATH=./modules_install

popd
```

```bash
cat sm8150-mainline/arch/arm64/boot/Image.gz sm8150-mainline/arch/arm64/boot/dts/qcom/sm8150-xiaomi-nabu.dtb > zImage
mkbootimg --kernel zImage --cmdline "pd_ignore_unused clk_ignore_unused console=tty0 root=/dev/sda32 rw rootwait" --base 0x00000000 --kernel_offset 0x00008000 --tags_offset 0x00000100 --pagesize 4096 --id -o linux.boot.img
```

此处的 sda32 即为上一步创建的，给 Linux 使用的第 32 号分区。

### 📂 制作 rootfs

首先下载一个全新的 Arch Linux ARM rootfs，并使用 root 权限解压。

```bash
wget https://mirrors.tuna.tsinghua.edu.cn/archlinuxarm/os/ArchLinuxARM-aarch64-latest.tar.gz
sudo tar -xf ArchLinuxARM-aarch64-latest.tar.gz -C rootfs
```

把刚编译好的模块文件夹移到 rootfs 中。

```bash
sudo rm -rf rootfs/usr/lib/modules
sudo mv sm8150-mainline/modules_install/lib/modules rootfs/usr/lib/
```

之后安装固件。

在 https://github.com/map220v/ubuntu-xiaomi-nabu/actions 中下载最新的 xiaomi-nabu-debs_6.7-working 文件，之后自行解压 firmware-xiaomi-nabu.deb 和 alsa-xiaomi-nabu.deb 并安装到 rootfs 即可。

挂载 rootfs 并使用 chroot 进入其中。

```bash
sudo mount --bind rootfs rootfs
sudo cp /usr/bin/qemu-aarch64-static rootfs/usr/bin/qemu-aarch64-static
sudo arch-chroot rootfs
```

之后简单配置系统。  
以下步骤参考了 Arch Wiki。

```bash 在 rootfs 中
nano /etc/pacman.conf
# 参照 https://mirrors.tuna.tsinghua.edu.cn/help/archlinuxcn/ 的说明
# 加入 archlinuxcn 镜像仓库
nano /etc/pacman.d/mirrorlist
# 配置镜像源

pacman-key --init
pacman-key --populate
pacman-key --lsign-key "farseerfc@archlinux.org"
pacman -Syu archlinux-keyring archlinuxarm-keyring archlinuxcn-keyring
pacman -S base-devel wpa_supplicant networkmanager bluez bluez-utils
pacman -S vim git sudo openssh bash-completion iproute2
pacman -S yay  # 也可使用 paru 等 AUR helper
pacman -Rdd linux
systemctl enable NetworkManager
systemctl enable bluetooth

echo "mipad5" >> /etc/hostname  # 此处请更改为自己的主机名
echo "127.0.0.1 localhost" >> /etc/hosts
echo "127.0.0.1 mipad5" >> /etc/hosts
echo "::1 localhost" >> /etc/hosts
echo "PARTLABEL=archlinux / ext4 errors=remount-ro,x-systemd.growfs,discard,relatime 0 1" > /etc/fstab

# 部分必须的基本软件包在 AUR 上，所以必须先创建一个普通用户
useradd -m -G wheel -s /bin/bash youruser  # 此处请更改为自己的用户名
passwd youruser
EDITOR=vim visudo  # 取消注释 %wheel ALL=(ALL:ALL) ALL 行

su youruser
yay -S qrtr-git libqrtr-glib rmtfs-git tqftpserv-git
exit

systemctl enable qrtr-ns rmtfs tqftpserv
```

```bash
exit
sudo umount -R rootfs
sudo rm rootfs/usr/bin/qemu-aarch64-static
sudo chown -R 0:0 rootfs
sudo chown -R 1000:1000 rootfs/home/youruser
```

把 rootfs 打包成 img 镜像。

```bash
dd if=/dev/zero of=./rootfs.img bs=1M count=3072
mkfs -t ext4 ./rootfs.img
mkdir mnt
sudo mount -o loop rootfs.img ./mnt
sudo cp ./rootfs/* ./mnt -avrf
sudo umount ./mnt
rmdir ./mnt
e2fsck -p -f rootfs.img
resize2fs -M rootfs.img
```

至此，我们已经得到了三个镜像：`magisk_patched-27000_XXXXX.img`、`linux.boot.img` 和 `rootfs.img`。

### 📲  刷写镜像

在平板上安装 [linuxswitch](https://github.com/timoxa0/Switch2Linux-Nabu/releases/download/v1.0.2/linuxswitch.apk)，并在该软件中点击 "Dump android images"。  
之后把 `linux.boot.img` 放入平板内部存储中的 `linux` 文件夹，并且从该文件夹中取出 `android.boot.img` 和 `android.dtbo.img`。

然后，切到 fastboot 模式，运行以下命令，刷入 Arch Linux 系统：

```bash
fastboot flash vbmeta_ab --disable-verification --disable-verity vbmeta.img
fastboot erase dtbo_ab
fastboot flash boot_ab linux.boot.img
fastboot flash archlinux rootfs.img
```

重启平板即可进入 Linux 系统，之后登录，插入键盘，即可使用 `nmtui` 连接网络，安装桌面环境等。

```bash
nmtui
ping baidu.com
rm /etc/locale.gen
echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
echo "zh_CN.UTF-8 UTF-8" >> /etc/locale.gen
locale-gen
echo "LANG=zh_CN.UTF-8" > /etc/locale.conf
pacman -S noto-fonts noto-fonts-cjk gnome gdm firefox
# 安装时可以手动排除 gnome-boxes 以节省空间
systemctl enable --now gdm
```

在 Linux 侧下载 [s2a](https://github.com/timoxa0/Switch2Linux-Nabu/releases/download/v1.0.1/s2a.zip) 工具，解压，并用 U 盘把之前的 `android.boot.img` 和 `android.dtbo.img` 拷到平板中，放到 s2a 文件夹里。

运行 `sudo bash ./install.sh` 安装 s2a，注销并重新登录，即可在全部应用中找到 Switch2Android 条目。

在安卓侧可以从 Switch to Linux 这个 app 切换到 Linux。

至此，安卓 + Arch Linux 双系统已经安装完成。

### 🎚️ 桌面调优

由于骁龙 860 的性能不足以带动优化很差的原版 GNOME，因此需要做一些优化。

```bash
yay -S mutter-performance
echo "GSK_RENDERER=gl" | sudo tee /etc/profile.d/environment.sh
```

之后动画就不会再卡顿了。

虚拟键盘可以使用 GNOME 自带的 maliit 或 OpenKylin 的 kylin-virtual-keyboard。扩展可以安装 Disable Gestures 2021 来在全屏游戏中禁用手势。

### 🖼️ 效果图

{%image https://imgsrc.chyk.ink/e7cd7b899e510fb3a072b3a99f33c895d1430ca1.webp %}

> 此截图已经过时，但可以大概作为参考。
