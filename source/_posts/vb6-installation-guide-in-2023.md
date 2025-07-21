---
title: 🧱 在 2023 年安装 Visual Basic 的正确姿势
date: 2023-03-04 18:06:02
tags:
- VB
category: 编程
---

Visual Basic 是一门虽然已经停更多年但经久不衰的编程语言，根据微软官方给出的「[It Just Works](https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-basic-6/visual-basic-6-support-policy)」——「能跑就行」支持原则，VB 的 IDE 在新系统上的兼容性[越来越差](https://www.bilibili.com/video/BV1rA4y1Z7N1/)，甚至达到了某种「不能跑」的地步。本文就教大家如何正确地在新系统上安装并调教 VB6 IDE。

<!--more-->

### 🔤 将默认编码改回 GBK

在 21H2 及更新版本的 Windows 11 中，系统默认的字符编码为 UTF-8，而要跑 VB6 这种化石的话，就需要把字符编码改回之前的 GBK。在 {%kbd 设置%} - {%kbd 语言设置%} - {%kbd 语言与区域%} - {%kbd 管理语言设置%} - {%kbd 更改系统区域设置%} 中取消勾选 {%kbd 使用Unicode UTF-8提供全球语言支持%} 即可。

{%image https://imgsrc.chyk.ink/267f9e2f070828389911a7dcfd99a9014d08f1de.webp 字符编码设置%}

### 📥 安装本体

下载 Visual Basic 6.0 中文企业版 安装光盘: [📥 脚本之家](https://www.jb51.net/softs/44280.html#downintro2) | [📥 本站](https://file.chyk.ink/OneDrive/PC%E8%BD%AF%E4%BB%B6/VB/VB6.0%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%E4%BC%81%E4%B8%9A%E7%89%88.rar)

#### 运行安装程序

运行 SETUP.EXE。如无问题，正常安装即可。

{%image https://imgsrc.chyk.ink/a50f4bfbfbedab6462a53608b236afc378311e26.webp %}

#### ACME 错误解决

{%image https://imgsrc.chyk.ink/2f738bd4b31c8701de8fc82e627f9e2f0708ff39.webp %}

{%image https://imgsrc.chyk.ink/0e2442a7d933c8958749e2b3941373f0830200c6.webp %}

解决方法：

- 编辑 `setupwiz.ini`，把 `acme=acmboot.exe` 改为 `acme=setup/acmsetup.exe`，把 `STF=setup\vb98ent.stf` 改为 `STF=setup\acmsetup.stf`。
- 把 `setup` 文件夹中的 `vb98ent.stf` 重命名为 `acmsetup.stf`。
- 把 `setup` 文件夹中的所有文件复制到安装盘根目录（`SETUP.EXE` 所在目录）。

#### 序列号

由于在 2023 年已经很难购买到正版的 Visual Basic 6.0 安装光盘，因此可以利用[这个序列号 bug](https://www.bilibili.com/video/BV1Kp4y1p7LF/)，输入 `111-1111111` 序列号即可安装。

### 🛄 安装 Service Pack 6

在[这里](https://file.chyk.ink/OneDrive/PC%E8%BD%AF%E4%BB%B6/VB)下载如下四个文件并按顺序安装：

- `Vs6sp6B.exe`（微软已经从官网删除）
- `Vs6sp6.exe`（微软已经从官网删除）
- `VB60SP6-KB2708437-x86-CHS.msi`
- `VB60SP6-KB3096896-x86-CHS.msi`

按顺序装好这些文件后，即可得到一个 SP6 简体中文版的 Visual Basic 6.0，并带有最新的 KB3096896 安全补丁。

如果在运行 `setupsp6.exe` 时仍然遇到 ACME 错误，按照之前的方法解决即可。

### 🔧 修改兼容性设置

把 `C:\Program Files (x86)\Microsoft Visual Studio\VB98\VB6.EXE` 的兼容性设置改为 Windows XP SP3，否则将无法拖动控件。

### ⚙️ 安装扩展程序

下面的扩展程序可以让 VB6 古老的 IDE 更「现代」。

[CodeHelp](https://github.com/clayreimann/CodeHelp)：给 VB6 IDE 添加鼠标滚轮支持和多标签。

[CodeSMART for VB6](https://www.axtools.com/products-codesmart-vb6.php)：重做 VB6 IDE 的大部分界面，加入了很多工具窗格。该软件是专有付费软件，并且同样在现代已经无法购买，不过你可以[在此](https://file.chyk.ink/OneDrive/PC%E8%BD%AF%E4%BB%B6/codesmart.rar)下载。

[ModernVB](https://github.com/VykosX/ModernVB)：这个扩展程序本身不适用于中文版 VB，替换图标等功能不再可用，但仍然可以用于使 VB6 IDE 跟随新 Windows 窗体风格，并且也可以修改代码编辑器的配色。**如许安装，必须在 Vs6sp6B.exe 安装之后，Vs6sp6.exe 安装之前安装。**

[CodeFold](https://shagratt.github.io/VB6ideAddins/)：给 VB6 IDE 添加代码折叠功能。

[DocumentMap](https://shagratt.github.io/VB6ideAddins/)：在编辑器右侧加入类似 VSCode 的现代滚动条。

[Comment Display+Highlight+Hotkeys](https://shagratt.github.io/VB6ideAddins/)：加入 docstring 支持和 docstring 悬浮窗、加入选择高亮。

[Smart Indenter](http://www.oaltd.co.uk/indenter/default.htm)：代码一键缩进。
