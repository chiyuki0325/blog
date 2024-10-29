---
title: 🚜 在 Arch Linux 上搭建并连入割草机服务器
date: 2022-05-01 14:36:19
tags:
- Grasscutter
- 原神
- Arch Linux
category: 游戏
cover: 'https://imgsrc.chyk.ink/c8ea15ce36d3d53967867e027f87e950342ab0bc.webp'
---

这篇文章教大家在 Arch Linux 上搭建「割草机」，即 ~~某二次元游戏~~ 的私服，并在游戏中连入割草机。

本教程可能不适用于 Arch Linux ARM。如果想在 Arch Linux ARM 上搭建，请参考 [这篇教程](https://www.chitang.tech/posts/grasscutter-android/)。

仅供学习交流，请在 24 小时内删除这些文件。

## 搭建服务器

### 获取割草机 jar 文件和某二次元游戏的 BinOutput

这里不再叙述，详见 [割草机 Wiki](https://github.com/Grasscutters/Grasscutter/wiki)

### 安装并启动 MongoDB

```bash
sudo pacman -S mongodb --needed
sudo systemctl enable --now mongodb
```

### 安装其它所需文件

```bash
sudo pacman -S mitmproxy python --needed # mitmproxy
sudo pacman -S jdk17-openjdk --needed # Java 17
```

### 启动服务器

```bash
cd /path/to/grasscutter
mitmdump -s proxy.py -k --set block_global=false & \
sudo /usr/lib/jvm/java-17-openjdk/bin/java -jar grasscutter.jar
```

## 连入服务器

### 安装证书

这些证书需要和服务器的相同。

```bash
certutil -A -n "mitmproxy" -t "TCu,Cu,Tuw" -i "$HOME/.mitmproxy/mitmproxy-ca-cert.cer" -d sql:$HOME/.pki/nssdb # 安装用户证书，可选
openssl x509 -inform PEM -in "$HOME/.mitmproxy/mitmproxy-ca-cert.pem" -out "$HOME/.mitmproxy/mitmproxy-ca-cert.crt" # 把 pem 证书转为 crt
sudo trust anchor "$HOME/.mitmproxy/mitmproxy-ca-cert.crt" --store
sudo cp "$HOME/.mitmproxy/mitmproxy-ca-cert.crt" /etc/ca-certificates/trust-source/anchors/
sudo update-ca-trust
```

### 启动游戏

如果使用启动脚本：

```bash
env http_proxy=http://localhost:8080 https_proxy=http://localhost:8080 /path/to/certain_anime_game_startup.sh
```

如果使用 Lutris：
添加两行环境变量，分别为：

| key | value |
| --- | --- |
| http_proxy | http://localhost:8080 |
| https_proxy | http://localhost:8080 |

其中 localhost 可以换为服务器的 IP 或绑定域名。

