---
title: 📢 彻底干掉 systemd 251 关机蜂鸣器响声
date: 2022-06-06 22:12:09
tags:
- systemd
category: Arch折腾记
cover: 'https://imgsrc.baidu.com/forum/pic/item/267f9e2f070828388f45add5fd99a9014d08f1a3.jpg'
---
Arch Linux 上的 systemd 251 更新之后，在关机和重启的时候都会在 tty 打印 wall message 并伴有震耳的蜂鸣器响声，貌似是一个远古的 bug 又被触发了。本文就来教大家如何禁用此特性。

<!--more-->

### 卸载蜂鸣器内核模块

```bash
echo "blacklist pcspkr" | sudo tee /etc/modprobe.d/nobeep.conf
sudo rmmod pcspkr
```

### 禁用桌面环境 wall message

本方法和下面方法来自 https://github.com/systemd/systemd/issues/23520#issuecomment-1141290377

```
# 将如下内容写到 /etc/systemd/system/disable-wall.service
[Unit]
Requires=systemd-logind.service
After=systemd-logind.service
Description=Disable logind wall messages
[Service]
Type=oneshot
ExecStart=/usr/bin/busctl set-property org.freedesktop.login1 /org/freedesktop/login1 org.freedesktop.login1.Manager EnableWallMessages b false
[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now disable-wall.service
```

### 禁用终端关机 wall message

```bash
# 通过创建 alias 的方法来禁用终端关机 wall message
# 将如下内容写到你 shell 的 rc 文件
alias poweroff="systemctl poweroff --no-wall"
alias reboot="systemctl reboot --no-wall"
```

### 禁用当前用户终端写入权限

```bash
echo "mesg n" > ~/.bash_login
# 如果为别的 shell 则为对应文件
```
