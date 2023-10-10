---
title: 🗄️ 在 Azure VPS 上安装 Arch Linux
date: 2023-10-10 19:40:28
tags:
category: Arch折腾记
---

使用 vps2arch 脚本和一些额外操作。可以在 Azure VPS 上安装 Arch Linux。

<!--more-->

```bash
sudo su
wget felixc.at/vps2arch
chmod +x ./vps2arch
./vps2arch
```

```bash
sync; reboot -f
```

```bash
ssh root@your.ip.address # 密码为 vps2arch
install -Dm700 /boot/efi/EFI/GRUB/grubx64.efi /boot/efi/EFI/BOOT/BOOTX64.EFI
# 这一步一定要做，否则从面板关机再开机时，或有时候使用 reboot 命令时会无法再开机
# 只能删机重建，非常痛苦
pacman -Sy linux-lts base-devel vim sudo --needed --noconfirm
pacman -R linux --noconfirm
grub-mkconfig -o /boot/grub/grub.cfg
reboot
```

接下来自行配置即可。
