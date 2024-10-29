---
title: ❎ 一次与 C++ 未定义行为的斗智斗勇
date: 2024-10-22 17:36:55
tags:
- Qt
- KDE
- Linux
---

[Kvantum](https://github.com/tsujan/Kvantum) 是一个 Qt 主题引擎，可以用 SVG 方便地制作 Qt / KDE 主题，深受用户喜爱。大多数的 KDE 主题都使用了 Kvantum。

Kvantum 三年来在我主力电脑（x86_64）的 Arch Linux 系统上一直工作良好，但今年六月我购入了一台 arm64 的[平板电脑](https://blog.chyk.ink/2024/06/22/mipad5-archlinux/)并刷入 Arch Linux ARM 系统随身携带使用，在它上面 Kvantum 一直无法运行。`kvantummanager` 直接爆段错误，于是我便改环境变量强行 `QT_STYLE_OVERRIDE=kvantum`，结果，整个桌面直接爆了 ...

编译一个带调试符号的 Kvantum 和 Qt base（五个小时啊 ...），并用 gdb 调试，发现程序是在[对一个未初始化的 `QVariant` 进行 `toBool()` 操作](https://github.com/tsujan/Kvantum/blob/master/Kvantum/style/themeconfig/ThemeConfig.cpp#L164)时爆掉的。

{%image https://imgsrc.chyk.ink/9825bc315c6034a8ce414ba58d13495409237677.webp %}

{%image https://imgsrc.chyk.ink/00e93901213fb80e094092f370d12f2eb9389405.webp %}

并且，这似乎不是 Kvantum 代码的问题，而是更底层的问题。

因为，我在这行代码前面加上一个 `qDebug() << v <<;`，就莫名其妙地可以跑通了 ...

根据 [archlinuxcn 群友指出](https://t.me/ArchlinuxCN_Appearance/204050)，同一段代码在不同平台上编译出来的行为不一致，这肯定是一个未定义行为（Undefined behavior）。于是在群友的指导下，我分别打开 `UBSan` 和 `Asan` 又编译了两次 Kvantum（两个小时过去了...），结果莫名其妙的是 —— 软件就这么水灵灵地跑起来了。头疼 ...

后来 Kvantum 作者在 GitHub 讨论区[指出](https://github.com/tsujan/Kvantum/discussions/999#discussioncomment-10368058)，这很可能是编译器的锅。于是，我换用 clang 进行编译 ... 

跑起来了！

至于为什么会出现这个问题，是因为 C / C++ 并没有官方的编译器实现，只是发布了一份语言标准。在语言标准之外的某些[行为](https://zh.wikipedia.org/zh-hans/%E6%9C%AA%E5%AE%9A%E4%B9%89%E8%A1%8C%E4%B8%BA)上，各个编译器的实现都不一致，甚至也可能会出现我遇到的这种，在 x86_64 上编译出来是一种样子，在 arm64 上编译出来就是另外一种样子的情况。

所以，该启动 Ru  .... （被打跑
