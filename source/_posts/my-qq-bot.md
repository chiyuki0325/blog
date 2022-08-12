---
title: 🐧 自制了一个 QQ 机器人
date: 2021-12-26 16:31:17
tags: QQ
category: 其它
---

用 ``go-cqhttp`` 框架，自制了一个 QQ 机器人。

https://github.com/YidaozhanYa/MyQQBot

使用方法：

① 下载最新版 go-cqhttp 框架，放入文件夹，并且安装 PHP 框架。

② 将 ``config_sample.yml`` 改名为 ``config.yml``，``config_sample.php`` 同理。

③ 在 ``config.yml`` 中填入自己的 QQ 号和密码。

④ 在 ``config.php`` 中填入其他设置，并进入 ``workers`` 文件夹删除不需要的插件。

⑤ 建立 ``data_store`` 文件夹和 ``cooldown`` 文件夹，用于存放插件配置。

⑥ 运行 ``start.sh`` ，打开 ``localhost:5580/phpinfo.php``，如出现 PHP 版本信息则成功。

P.S. 结束 ``start.sh`` 脚本并运行 ``killall go-cqhttp`` 来退出。
