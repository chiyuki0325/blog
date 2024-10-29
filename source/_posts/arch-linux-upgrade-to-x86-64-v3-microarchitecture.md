---
title: "📈 给 Arch Linux 「大脑升级」到 x86-64-v3 / v4 架构，获得性能提升"
date: 2022-08-11 22:19:00
tags:
- Arch Linux
category: Arch折腾记
cover: 'https://imgsrc.chyk.ink/7a899e510fb30f241d999ac28d95d143ac4b03eb.webp'
---

[x86-64-v3 / v4](https://en.wikipedia.org/wiki/X86-64#Microarchitecture_levels) 是 x86-64 处理器架构的「微架构」，x86-64-v3 搭载于 Haswell 及其之后的处理器，x86-64-v4 搭载于 Skylake-X 及其之后的处理器。其支持 AVX2 等新指令集。据传将程序编译为 x86-64-v3 / v4 架构可以获得大约 10% 的性能提升 {% sup (不确定) %}。

Arch Linux [支持](https://gitlab.archlinux.org/archlinux/rfcs/-/blob/master/rfcs/0002-march.rst) x86-64-v3 / v4 架构，因此将内核、编译器等软件包更换为 x86-64-v3 / v4 架构可以提升性能，虽然~~这是 Gentoo 偏执狂才会干的事~~，但我们 Arch 也可以尝试一下。

<!--more-->

> 在本文编写时期，Arch Linux 还没有支持 x86-64-v4 架构，因此下文全部使用 v3。如果你的 CPU 支持 x86-64-v4，就把所有 `v3` 替换为 `v4` 即可。

### ⚠️ 操作前须知

<font color="red">用第三方软件仓库替代官方软件仓库有风险，请谨慎执行！</font>

本文提到的第三方软件仓库没有国内镜像源，所以速度很慢，请使用透明代理或提高 `pacman.conf` 中的 `ParallelDownloads` 值。

{% ablock color:red %}

cachyos 仓库和 archlinuxcn 等第三方 Arch Linux 扩展软件仓库并不兼容，请谨慎使用！

{% endablock %}

### 🔍 检查是否支持 x86-64-v3 架构

在终端中执行 `/lib/ld-linux-x86-64.so.2 --help | grep "x86-64-v"`，如果输出中有 `x86-64-v3 (supported, searched)` 字样，即代表支持 x86-64-v3 架构。v4 架构同理。

### 🗃️ 更换 x86-64-v3 架构软件仓库

#### CachyOS

CachyOS 是一个基于 Arch Linux 的发行版，其使用 x86-64-v3 架构，并且提供开启了 `-O3`、`thinlto` 优化的软件包。

- 执行如下命令：

  ```bash
  sudo pacman-key --recv-keys F3B607488DB35A47 --keyserver keyserver.ubuntu.com
  sudo pacman-key --lsign-key F3B607488DB35A47
  sudo pacman -U 'https://mirror.cachyos.org/repo/x86_64/cachyos/cachyos-keyring-2-1-any.pkg.tar.zst' 'https://mirror.cachyos.org/repo/x86_64/cachyos/cachyos-mirrorlist-17-1-any.pkg.tar.zst' 'https://mirror.cachyos.org/repo/x86_64/cachyos/cachyos-v3-mirrorlist-17-1-any.pkg.tar.zst' 'https://mirror.cachyos.org/repo/x86_64/cachyos/cachyos-v4-mirrorlist-5-1-any.pkg.tar.zst' 'https://mirror.cachyos.org/repo/x86_64/cachyos/pacman-6.0.2-10-x86_64.pkg.tar.zst'
  ```

- 编辑 `/etc/pacman.conf`，用 `Architecture = x86_64 x86_64_v3` 替换掉原有的 `#Architecture = auto`，并在原版软件仓库 (core、extra、community) 上方加入 `cachyos-v3` 仓库：

  ```ini
  [cachyos-core-v3]
  Include = /etc/pacman.d/cachyos-v3-mirrorlist
  
  [cachyos-extra-v3]
  Include = /etc/pacman.d/cachyos-v3-mirrorlist
  
  [cachyos-v3]
  Include = /etc/pacman.d/cachyos-v3-mirrorlist
  ```

#### ALHP

ALHP 是社区发起的 x86-64-v3 软件仓库，其提供使用 x86-64-v3 架构编译，并开启了 `-O3` 和 `lto` 优化的软件包。但仍有一些软件包未被加入此仓库（比如 `vim`），所以不能删掉原版的仓库，而是将此仓库放在原版仓库上方。

- 从 AUR 安装 `alhp-keyring alhp-mirrorlist` 这两个软件包。

- 编辑 `/etc/pacman.conf`，在原版软件仓库 (core、extra、community) 上方加入如下内容：

  ```ini
  [core-x86-64-v3]
  Include = /etc/pacman.d/alhp-mirrorlist
  
  [extra-x86-64-v3]
  Include = /etc/pacman.d/alhp-mirrorlist
  
  [community-x86-64-v3]
  Include = /etc/pacman.d/alhp-mirrorlist
  ```

{% note color:red 注意：ALHP 仓库的有些重要软件包（比如 `icu` `openssl`）可能会更新不及时，请把 CachyOS 放在 ALHP 上方。 %}

在添加完成之后，`sudo pacman -Syyu` 强制刷新数据库并更新系统。此时你的内核也会被替换为 x86-64-v3 架构，所以如果你使用 `nvidia`，就换为 `nvidia-dkms` (`virtualbox-host-modules-arch` 也需要换为 `virtualbox-host-dkms`)，并且还需要 [重建引导配置](#♻️-重建引导配置注意事项)。

### 🔥 (可选) 使用 CachyOS 的优化内核

- `linux-cachyos` 内核有搭载了不同调度器的不同版本，可以先 `sudo pacman -Ss linux-cachyos` 查看所有版本，之后选择安装。如果你选择困难症，直接安装 `linux-cachyos linux-cachyos-headers` 就好。

### 🔥 (可选) 使用 CachyOS 的优化 32 位库

CachyOS 软件仓库中，32 位库也启用了 `thinlto` 优化。确保 `cachyos-v3` 在 `multilib` 上方即可。

---

### 📦 如何编译出 x86-64-v3 软件包

如果使用正常的 make 编译，则需要加入 `-march=x86-64-v3 -mtune=native` CFLAGS。

如果使用 Arch 构建系统 makepkg 编译 (如从 AUR 安装软件包)，则需要更改 makepkg 配置文件。

首先把原版 makepkg 配置文件复制到用户目录下：

```bash
install -D /etc/makepkg.conf ~/.config/pacman/makepkg.conf
```

之后编辑之：

首先将 CFLAGS 中的 `-march=x86-64 -mtune=generic` 改为 `-march=x86-64-v3 -mtune=native`。

如果有更高的性能需求，可以把 `-O2` 改为 `-O3`，不过这会导致小部分软件包无法正常编译，并且会导致更高内存占用。

然后在 CFLAGS 末尾加入 ` -mpclmul` 参数以启用 PCLMUL 指令集。

根据 CPU 不同，还可以选择以下扩展指令集：

```
-mcx16 -msahf -mpopcnt -msse3 -msse4.1 -msse4.2 -mssse3 -mavx -mavx2 -mbmi -mbmi2 -mf16c -mfma -mlzcnt -mmovbe -mxsave
```

再把 OPTIONS 中的 `!lto` 改为 `lto`，加入 `LTOFLAGS="-flto=thin -falign-functions=32"` 以启用 `thinlto` 优化。

如果需要编译 Rust 软件包，则加入 `RUSTFLAGS="-Copt-level=3 -Ctarget-cpu=x86-64-v3"`，如果需要编译 Go 软件包，则加入 `GOAMD64="v3"`。