---
title: 🛜 在无线网络环境下使用 PVE
date: 2026-06-24 10:38:52
tags:
- PVE
---

PVE 采用的网络管理器 `ifupdown2` 无法拉起部分无线网卡，报错 `wpasupplicant failed returned 1`。本文简述我在无线网络环境下部署 PVE 服务器，采用 NetworkManager 管理无线网络的折腾方案。

<!--more-->

## 🤔 方案简述

熟悉 PVE 的读者应该知道，`ifupdown2` 就是一整个大灵车。它在早期版本 IPv6 配不明白，现在无线网还是配不明白。然而 PVE 必须使用 `ifupdown2` 管理其网桥 `vmbrX`，如果强行换成 `ifupdown`，依赖关系不满足会把整个 PVE 卸掉。

在我的情况下，`ifupdown2` 在尝试拉起网卡时会吐出一大坨 Python 报错，并报 `wpasupplicant failed returned 1`，而 NetworkManager 在我的机器上运行良好，并且提供了 `nmtui` 以随时切网，相比起 `interfaces` 配置文件，更能应对无线网环境的变数。

于是本方案的核心就是 —— 用 NetworkManager 管理无线网卡，用 `ifupdown2` 管理 `vmbrX`，两者各司其职。

## 🫠 局限性

- PVE [安装指南](https://pve.proxmox.com/wiki/Install_Proxmox_VE_on_Debian_13_Trixie#Ensure_Hostname_Resolves_to_Hosts_IP_Address)中写到，主机名必须解析到真实的局域网 IP 地址。因此，所连接的 Wi-Fi 必须可以分配静态 IP。

- 由于 Wi-Fi 网络本身的限制，因此虚拟机和 LXC 容器不能使用桥接网络，需要手动配置 NAT。

  {%folding 为什么？%}

  WLAN（802.11）帧头部一般必须包含三个 MAC 地址：

  - 源地址（物理机无线网卡的 MAC 地址）
  - AP 地址（家里无线路由器的 MAC 地址）
  - 目标地址（目标主机无线网卡的 MAC 地址）

  如果虚拟机要走桥接模式上网，那么它必须拥有自己的 MAC 地址。Wi-Fi 网络与有线网络不同，它是「有状态的」，存在连接与断开的过程，而这个过程需要 MAC 地址的参与。如果连接该 Wi-Fi 网的是主机，而虚拟机尝试把自己的 MAC 地址填入「源地址」字段，那么这个帧会被路由器无情丢弃掉，而如果把主机的 MAC 地址填入「源地址」，那么虚拟机就会永远收不到回应。

  VirtualBox 手册中提到，大部分的无线网卡[不支持混杂模式](https://www.virtualbox.org/manual/ch06.html#network_bridged:~:text=do%20not%20support%20promiscuous%20mode)，也就是并不能采用虚拟机的 MAC 地址去连接到 Wi-Fi 网，联网过程只能由主机来进行。VirtualBox 对此的解决方案是一种「伪桥接」（在 L2 操作，类比 L3 的 NAT），即每次发包和收包时都改写 MAC 地址，然而这种方法并不通用，且稳定性堪忧，因此本文采用 NAT 方案。

  {%endfolding%}

## 🛠️ 配置流程

配置过程中会产生多次网络中断，确保你可以物理接触到服务器。

### 📡 连接至无线网

此段落的目标是，分离两个网络管理器的职责，采用 NetworkManager 管理无线网接口（以 `wlo1` 为例），采用 `ifupdown2` 管理 `vmbrX` 网桥。

① 安装 NetworkManager。

```bash
sudo apt install network-manager
```

② 从 `ifupdown2` 配置文件 `/etc/network/interfaces` 中去除无线网卡条目和（可能存在的）配置错误的网桥。

{% split %}

<!--cell left-->

{%border color:red child:codeblock %}

```bash 第一步修改后的配置文件
source /etc/network/interfaces.d/*

auto lo
iface lo inet loopback

auto wlo1
iface wlo1 inet dhcp
    wpa-ssid "StarNightSnow"
    wpa-psk  "REDACTED"

auto vmbr0
iface vmbr0 inet static
    address 192.168.1.123/24
    gateway 192.168.1.1
    bridge-ports wlo1
    bridge-stp off
    bridge-fd 0
```

{%endborder%}

<!--cell right-->

{%border color:green child:codeblock %}

```bash 第一步修改后的配置文件
source /etc/network/interfaces.d/*

auto lo
iface lo inet loopback

# 现在 interfaces 里暂时只有一个回环接口
# vmbrX 稍后再添加
```

{%endborder%}

{% endsplit %}

③ 限制 NetworkManager 管理 `vmbrX` 网桥。  
编辑 `/etc/NetworkManager/NetworkManager.conf`，改为：

```ini NetworkManager.conf
[main]
# 加入 ifupdown plugin
plugins=ifupdown,keyfile

[ifupdown]
# 让 NetworkManager 忽略 interfaces 中的设备
managed=false

[keyfile]
# 手动忽略 interfaces 之外动态创建的 vmbrX 和 vethX 等
unmanaged-devices=interface-name:vmbr*;interface-name:veth*;interface-name:tap*
# 多个配置项采用分号分隔
# 如果你的机器同时接入了有线网，还可以把有线网卡也加入其中
#（如interface-name:en*）
```

④ 立即启用 NetworkManager，并采用 `nmcli` / `nmtui` 联网。

```bash
sudo systemctl enable --now NetworkManager
nmtui
# 在 nmtui 操作界面中联网
```

### ⛓️ 配置 NAT

PVE 需要 `vmbrX` 来给虚拟机联网，而目前 `/etc/network/interfaces` 里还没有 `vmbr0`。接下来就来配置。

需要给虚拟机定下两个地址段，分别给 IPv4 和 IPv6 使用。这里我采用 `10.10.10.0/24` 和 `fd00::/64`。

```bash /etc/network/interfaces
source /etc/network/interfaces.d/*

auto lo
iface lo inet loopback

auto vmbr0
iface vmbr0 inet static
    # 刚刚决定的地址段，主机 IP 为 10.10.10.1
	address 10.10.10.1/24
	# 设置 bridge-ports none，不使用桥接
	bridge-ports none
	bridge-stp off
	bridge-fd 0	
	# 采用 post-up 和 post-down 来配置路由规则
	# 启用 IPv4 转发
	post-up echo 1 > /proc/sys/net/ipv4/ip_forward
	# 添加 NAT 规则，把该网络下所有数据转发到主机 wlo1 接口
	# 抄作业时替换为实际 Wi-Fi 接口名
	post-up iptables -t nat -A POSTROUTING -s '10.10.10.0/24' -o wlo1 -j MASQUERADE
	# wmbr0 down 后删除 NAT 规则
	post-down iptables -t nat -D POSTROUTING -s '10.10.10.0/24' -o wlo1 -j MASQUERADE

iface vmbr0 inet6 static
    # 参考 IPv4 配置。主机 IP 为 fd00::1
    address fd00::1/64
    post-up echo 1 > /proc/sys/net/ipv6/conf/all/forwarding
    post-up ip6tables -t nat -A POSTROUTING -s 'fd00::/64' -o wlo1 -j MASQUERADE
    post-down ip6tables -t nat -D POSTROUTING -s 'fd00::/64' -o wlo1 -j MASQUERADE
```

之后重启系统，虚拟机即可采用 Wi-Fi 联网。

## 🖼️ 效果

{%image https://imgsrc.chyk.ink/8fnFHPSrGRYpfzvR.webp 虚拟机采用 NAT 上网 %}
