---
title: 📨 加速 AUR 的软件下载和安装
date: 2021-12-26 18:37:51
tags:
- ArchLinux
- AUR
---

### 一、网络加速

AUR 的软件经常需要用到 GitHub 的仓库、Raw 或 Releases，所以需要替换部分 ``makepkg`` 脚本解决。

- ##### 下载加速
  
  ``makepkg`` 可以自定义下载器，所以可以做一个下载脚本，替换原本的 ``curl``。
  
  首先从这里下载我制作好的脚本（使用 aria2 加速一般文件的下载，并且把 GitHub 域名替换为 FastGit），放在一个自定义位置（我这里使用 ``/usr/local/bin/aurdl``）并且赋予可执行权限。
  
  ```bash
  sudo pacman -S --needed aria2 # 安装 aria2
  sudo curl -L "https://file.yidaozhan.top/d/OneDrive/Linux/aurdl.sh" -o /usr/local/bin/aurdl
  sudo chmod +x /usr/local/bin/aurdl
  ```
  
  之后将 ``makepkg`` HTTP / HTTPS 下载协议的下载器改为刚刚的下载脚本。
  
  先创建一份本地 makepkg 配置文件 (``install -D /etc/makepkg.conf ~/.config/pacman/makepkg.conf``)，然后用任意文本编辑器打开 ``~/.config/pacman/makepkg.conf``，之后将 DLAGENTS 数组中原有的 ``'https::/usr/bin/curl -gqb "" -fLC - --retry 3 --retry-delay 3 -o %o %u'``一行替换为``'https::/usr/local/bin/aurdl %o %u'``。
- ##### Git 加速
  
  ``makepkg`` 不能自定义 Git 客户端，所以需要修改 ``makepkg`` 本体。
  
  {% border  color:red %}
  
  此操作需要修改 ``makepkg`` 本体，具有一定危险性，请谨慎操作！
  
  另外此操作会随着 ``pacman`` 包的更新而复原，所以当 ``pacman`` 更新的时候，需要重新操作。
  
  {% endborder %}
  
  首先下载我制作的 Git 脚本（替换 GitHub 域名为 FastGit），放在自定义位置（我这里使用 ``/usr/local/bin/fakegit``）并且赋予可执行权限。
  
  ```bash
  sudo curl -L "https://file.yidaozhan.top/d/OneDrive/Linux/fakegit.sh" -o /usr/local/bin/fakegit
  sudo chmod +x /usr/local/bin/fakegit
  ```
  
  之后修改 ``makepkg`` ，将所有 Git 命令行替换为修改的脚本，并且去除上游地址校验。
  
  ```bash
  sudo sed -i 's/git clone/\/usr\/local\/bin\/fakegit clone/' /usr/share/makepkg/source/git.sh
  sudo sed -i 's/(git config --get remote.origin.url)/url/' /usr/share/makepkg/source/git.sh
  ```

---

### 二、编译加速

#### ① 多线程编译

用文本编辑器修改 ``~/.config/pacman/makepkg.conf``，修改 ``MAKEFLAGS`` 变量为``-j``。

修改后该行为 ``MAKEFLAGS="-j"``。

#### ② 多线程压缩

{% border %}

参考：https://www.limstash.com/articles/202004/1597

{% endborder %}

先安装 `pigz` 和 `pbzip2`，这两个包支持多线程压缩。

```bash
sudo pacman -S pigz pbzip2
```

之后用文本编辑器修改 ``~/.config/pacman/makepkg.conf``，修改以下几个变量。

```bash
COMPRESSXZ=(xz -c -z - --threads=0)
COMPRESSGZ=(pigz -c -f -n)
COMPRESSBZ2=(pbzip2 -c -f)
COMPRESSZST=(zstd -c -z -q - --threads=0)
```

