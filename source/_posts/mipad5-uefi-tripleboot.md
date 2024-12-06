---
title: 🐮 在小米平板 5 上配置 UEFI 和三系统启动
date: 2024-11-29 10:57:07
tags:
- 小米
- 安卓
- Linux
- AOSC
cover: https://imgsrc.chyk.ink/JGOvZmc9LCmKK7Ik.webp
---

之前在小米平板 5 上装了 Linux 和 Win11 三系统，但每次切换都需要反复刷写 `boot` 和 `dtbo` 分区，极为消耗闪存寿命，那么有没有一种方法， 可以像 PC 上的 GRUB 启动菜单那样，开机时选择多系统呢？

答案是有的，本文我就来记录我的折腾过程。

<!--more-->

## 🪟 折腾背景

微软于 2018 年[发起了](https://blogs.windows.com/windowsdeveloper/2018/12/19/%E2%80%AFintroducing-project-mu/) [Project Mu](https://microsoft.github.io/mu/)，是一款基于 TianoCore [edk2](https://microsoft.github.io/mu/) 的 UEFI 固件。微软在自家的 Hyper-V 和 Surface 二合一笔记本上都使用了这个 UEFI 固件。

等等 ... Surface？Surface 确实有搭载高通骁龙处理器的产品线 Surface Pro X，但它一直使用的都是高通骁龙 8cx 平台，但 GitHub 上有神人开发者开发出了 [SurfaceDuoPkg](https://github.com/WOA-Project/mu_andromeda_platforms) 项目，它把 Project Mu 移植到了 Surface Duo 折叠手机上，在 Surface Duo 上跑起了 Windows 10X 和 Windows 11。这款手机使用的是骁龙 835 SoC，离我们的折腾目标：搭载骁龙 855 的小米平板 5 已经很接近了。

于是，以 SurfaceDuoPkg 为基础，一群开发者又发起了 [Project Aloha](https://github.com/Project-Aloha/mu_aloha_platforms) (原名为 msmnilePkg) 项目，把 Project Mu 带到了骁龙 845 和 855 平台上，还给很多设备移植了对应的驱动程序。小米平板 5 之所以能流畅地跑起 Win11，就是这个项目的功劳。这就是本文要折腾的项目。

{%ablock color:orange ❓ 问题%}

看到这里，读者可能要提出疑问了：“我记得 MIX 2S 那些骁龙 845 的手机刷 Win11 靠的是那个非常 🐮🍺 的 [Renegade Project](https://renegade-project.tech) 项目啊？它也支持米板 5，那为什么不直接拿来用呢？”

它的确**支持**米板 5，开源社区也折腾出了用它在米板 5 上启动 Linux 的一套[方案](https://www.cnblogs.com/terrasse/p/18461726/linux_on_nabu)，但我的米板 5 扩容了 12G 运存和 512G 存储，Renegade 的 UEFI 在我的平板上存在兼容性问题，根本**[找不到 UFS](https://imgsrc.chyk.ink/jekmCHsyXWH3LB2n.webp)**，也就没法启动系统了。

不过本文的折腾方案要用到 [Simple Init](https://github.com/BigfootACA/simple-init/)，Renegade 就用了 Simple Init 当作启动菜单，因此折腾好后你可能会有似曾相识的感觉。如果你的动手能力很强，也可以使用 GRUB 或 systemd-boot。

{%endablock%}

{%ablock color:warning ⚠️ 注意 %}

折腾本文需要一台**性能强大的电脑**和**高速的国际网络连接**，否则等待的过程将会非常痛苦。

本文的折腾存在**很大的变砖风险**，如果你没有做好心理准备，或者没有 9008 救砖的能力，就不要往下阅读。

折腾本文需要打开 Windows 的驱动测试模式。打开驱动测试模式后，验证系统安全性的游戏和反作弊软件将会无法启动，比如腾讯 ACE 反作弊系统。请自行斟酌。

本文的折腾需要 Ubuntu 22.04 系统环境，如果电脑上没有对应环境，可以使用虚拟机或 Distrobox 等容器方案。

本 UEFI 固件的内存映射尚不完善，运行一些软件时可能会直接爆段错误退出。对稳定性有要求请勿折腾本方案。

{%endablock%}

## 🗄️ 进行分区

按照 [Renegade Project 文档](https://renegade-project.tech/zh/install#h-12-%E4%BF%AE%E6%94%B9ufs%E5%88%86%E5%8C%BA) 的分区部分或[我之前的文章](/2024/06/22/mipad5-archlinux/#💽-对-UFS-进行分区)给平板新建一个 `esp` 分区，大小建议大一点，我分了 1G。

如果你折腾过 Win11，这个分区应该已经存在，应该名为 `esp` 或者 `ESPNABU`。

> 注意：「分区名称」和「卷标」是两个不同的概念，以下均给 ESP 分区使用 `esp` 这个分区名称。

## 🔌 编译 UEFI 固件

```bash
# 安装依赖
sudo apt update && sudo apt -y upgrade
sudo apt -y install python3-venv pip git mono-devel build-essential nuget build-essential uuid-dev iasl nasm gcc-aarch64-linux-gnu python3 python3-distutils python3-git python3-pip gettext locales gnupg ca-certificates python3-venv git git-core clang llvm curl jq
sudo apt install -y libc6-arm64-cross libc6-dev-arm64-cross

# 获取适用于小米平板 5 的 Project Aloha UEFI 源码
git clone https://github.com/map220v/MU-sm8150pkg --branch=nabu-secureboot --recursive
```

克隆这个仓库是一个极其漫长的过程。

在获取好源码后，打开 `Platforms/SurfaceDuo1Pkg/SurfaceDuo1.fdf` 文件，注释掉第 92 行。这行的内容如下：

`INF SurfaceDuoFamilyPkg/Driver/SecureBootProvisioningDxe/SecureBootProvisioningDxe.inf`

如果读者有在 x86 UEFI 平台安装过 Linux，那应该会知道，开着安全启动是没法启动 Linux 的（自己配置过证书的除外）。注释这行，就是为了禁用掉这个 UEFI 固件的安全启动。

打开 `Platforms/SurfaceDuo1Pkg/Device/xiaomi-nabu/Library/PlatformMemoryMapLib/PlatformMemoryMapLib.c`，将 `"Kernel"` 一行的 `Conv` 改为 `Reserv`。这是为了修复一个内存 Bug。

之后开始编译。

```bash
cd MU-sm8150pkg
python3 -m venv venv
source venv/bin/activate
pip install -r pip-requirements.txt
python3 build_uefi.py -d xiaomi-nabu
```

漫长的编译过程后，可在 `Build/SurfaceDuo1Pkg/RELEASE_CLANG38/FV/` 文件夹中找到 `SM8150_EFI.fd`，拿到一旁备用。

## 🔌 编译 Simple Init

本文将使用 Simple Init 作为引导加载程序。

按照[此工作流](https://github.com/rodriguezst/simple-init/blob/master/.github/workflows/master-edk2.yml)所述的编译方法进行编译。

```bash
# 安装依赖
sudo apt update
sudo apt install --yes --no-install-recommends build-essential uuid-dev iasl nasm gcc-aarch64-linux-gnu gcc-arm-none-eabi gcc-i686-linux-gnu gettext
```

```bash
# 获取源码
git clone https://github.com/BigfootACA/simple-init --recursive
cd simple-init
git clone https://github.com/tianocore/edk2 --recursive
pushd edk2
git checkout fff6d81270b57ee786ea18ad74f43149b9f03494
popd
```

在获取源码后可以对源码树进行一些定制。

我在使用 [AOSC OS](https://aosc.io/)，Simple Init 的启动菜单没有包含它的图标，所以手动下载并放到其中。

```bash
wget 'https://raw.githubusercontent.com/AOSC-Dev/logo/05268213521f168aedb96dc1f4573b64e1f205a1/aosc-os.svg' -O root/usr/share/pixmaps/simple-init/aosc-os.svg
```

```bash
# 进行编译
bash scripts/build-edk2.sh AARCH64
```

在漫长的编译过程结束后，可在 `build-edk2/Build/SimpleInit/RELEASE_GCC5/AARCH64` 中找到一个 8MB 的 `SimpleInitMain.efi`。把它放到一旁，改名为 `BOOTAA64.EFI` 备用。

## 🐧 放置启动 Linux 所需的文件

首先要把所需的文件放置到 `esp` 分区中。

在编译内核时，我使用的安装命令如下：

```bash
make zinstall modules_install dtbs_install INSTALL_MOD_PATH=../modules_install INSTALL_PATH=../modules_install/boot INSTALL_MOD_STRIP=1 INSTALL_DTBS_PATH=../modules_install/boot/dtbs
```

因此可以在 `../modules_install/boot` 中找到 `vmlinuz` 开头的内核镜像文件，在 `dtbs` 文件夹中找到 `sm8150-xiaomi-nabu.dtb`。

把内核镜像文件（我这里为 `vmlinuz-6.12.0-1-sm8150-chiyuki+` 和 dtb 文件（`sm8150-xiaomi-nabu.dtb`）放到 `esp` 分区的根目录中。这步可以使用之前文章提到过的大容量存储模式（msc），或者直接在 Linux 上操作。

## 🪟 配置 Windows Boot Manager

### ☣️ 启用测试模式

米板 5 的 WoA，如果在没开安全启动的情况下，想要开机，就必须要打开驱动测试模式，否则将会[直接蓝屏](https://imgsrc.chyk.ink/SDwQXuorMDPD5NiQ.webp)（我的翻车经历...）

打开驱动测试模式后，验证系统安全性的游戏和反作弊软件将会无法启动，比如腾讯 ACE 反作弊系统。

按照 [Renegade 的文档](https://renegade-project.tech/zh/install#h-215-%E5%90%AF%E7%94%A8%E6%B5%8B%E8%AF%95%E6%A8%A1%E5%BC%8F)操作即可。

### 🖥️ 使用 Simple Init 替换 Boot Manager EFI

把 `esp` 分区中原有的的 `Boot/EFI/BootAA64.efi` 重命名（我这里为 `windows.efi`），并把之前编译好的 Simple Init `BOOTAA64.EFI` 放入 `Boot/EFI` 文件夹中，以取代 Windows Boot Manager。

## 🔌 配置 Simple Init

在 Linux 中（或使用大容量存储模式 msc）挂载 `LOGFS` 分区，在其中创建一个 `simpleinit.uefi.cfg`。

参考 [Simple Init 文档](https://github.com/BigfootACA/simple-init/blob/master/docs/zh/config/index.md) 配置引导加载程序。这里贴一下我的配置，仅供参考。

`boot.configs.linux.extra.kernel` 和`boot.configs.linux.extra.dtb` 即为之前放置的两个文件，`boot.configs.linux.extra.cmdline` 为之前安装 Linux 时在 `mkbootimg` 那步配置的内核命令行参数。

`boot.configs.win11.extra.efi_file` 即为之前移走的 Windows Boot Manager。

{%folding child:codeblock 我的 Simple Init 配置%}

```ini
language = "zh_CN"
boot.configs.linux.mode = 8
boot.configs.linux.desc = "AOSC OS"
boot.configs.linux.show = true
boot.configs.linux.enabled = true
boot.configs.linux.icon = "aosc-os.svg"
boot.configs.linux.extra.use_uefi = true
boot.configs.linux.extra.kernel = "@part_esp:\\vmlinuz-6.12.0-1-sm8150-chiyuki+"
boot.configs.linux.extra.dtb = "@part_esp:\\sm8150-xiaomi-nabu.dtb"
boot.configs.linux.extra.skip_kernel_fdt_cmdline = true
boot.configs.linux.extra.update_splash = false
boot.configs.linux.extra.cmdline = "pd_ignore_unused clk_ignore_unused console=tty0 console=ttyGS0 root=PARTLABEL=aosc rw rootwait nowatchdog"
boot.configs.win11.mode = 9
boot.configs.win11.desc = "Windows 11"
boot.configs.win11.show = true
boot.configs.win11.enabled = true
boot.configs.win11.icon = "distributor-logo-windows.svg"
boot.configs.win11.extra.efi_file = "@part_esp:\\EFI\\Boot\\windows.efi"
boot.default = "linux"
boot.second = "simple-init"
boot.uefi_probe = false
boot.title = "选择操作系统"
boot.timeout = 5
boot.timeout_text = "倒计时: %d"
sw = 8
locates.part_logfs.by_disk_label = "gpt"
locates.part_logfs.by_gpt_name = "logfs"
locates.part_esp.by_disk_label = "gpt"
locates.part_esp.by_gpt_name = "esp"
gui.show_background = true
gui.background = ""
gui.dark = true
w = 8
```

{%endfolding%}

## 💿 修补并刷入启动镜像

如果直接把第一步编译出来的 `xiaomi-nabu.img` 刷入平板的 `boot` 分区，可以在 Simple Init 的启动菜单中选择 Linux 和 Windows 启动，但我们目前仍然没法启动安卓。

SurfaceDuoPkg 项目有一个 [内核修补工具](https://github.com/WOA-Project/SurfaceDuoDualBootKernelImagePatcher)，可以把这个 UEFI 固件直接注入到安卓内核中，并在开机时通过一小段简单的代码来判断该引导 UEFI 还是安卓。Project Aloha 也存在对应的工具，并且支持米板 5。

```bash
# 获取 DualBootKernelPatcher 源码
git clone https://github.com/Project-Aloha/DualBootKernelPatcher
cd DualBootKernelPatcher
cmake -B output -S .
cmake --build output -j
pushd ShellCode
cmake .
make
popd
```

之后需要使用  `magiskboot` 工具从安卓启动镜像中分离出内核，以进行修补。这步可以在装有 Magisk 的安卓机上操作，也可以自行[在电脑上编译之](https://github.com/xiaoxindada/magiskboot_ndk_on_linux)并操作。

```bash
magiskboot unpack boot.img
```

```bash
./output/DualBootKernelPatcher kernel SM8150_EFI.fd patchedkernel Config/DualBoot.Sm8150.cfg ShellCode/ShellCode.Nabu.bin
```

这里的 `kernel` 文件为上一步解包出的内核，`SM8150_EFI.fd` 之前已经编译好。

把 `patchedkernel` 改名为 `kernel`，与 `boot.img` 放在同一文件夹，并重新生成新的启动镜像。

```bash
magiskboot repack boot.img
```

现在就可以把生成的 `new-boot.img` 直接刷入平板了。

```bash
fastboot flash boot new-boot.img
```

大功告成！

## ▶️ 如何切换三系统

- 合着盖子开机 —— 引导安卓。
- 开着盖子开机 —— 引导 UEFI 固件，可以在 Simple Init 启动菜单中选择 Windows 和 Linux。

如果没有官方保护套，使用带磁吸的第三方保护套也是一样的效果。
