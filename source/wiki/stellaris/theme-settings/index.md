---
layout: wiki
wiki: stellaris
title: 🔧 网站和主题基本信息配置
---

## 站点信息

Hexo 会读取站点根目录下的 `_config.yml` 文件中的一些信息来生成您的网站，所以您需要修改以下值：

```yaml blog/_config.yml
title: 您的网站名称
avatar: 您的头像链接
favicon: 您的网站icon
subtitle: 您的网站副标题
# 多语言
language:
  - zh-CN
  - en
```

更多关于 Hexo 文件的配置请移步官方文档。

{%link https://hexo.io/zh-cn/docs/configuration "配置 | Hexo" icon:https://imgsrc.chyk.ink/77c6a7efce1b9d16ba0cae56b5deb48f8c546439.webp %}

### 多语言设置

主题中的默认文案支持简体中文 (`zh-CN`)、繁体中文 (`zh-TW`) 和英文 (`en`) 三种语言。

更改网站优先语言，需要在站点根目录下的配置文件中进行修改：

```yaml blog/_config.yml
language:
  - zh-CN
  - zh-TW
  - en
```

若要创建你自己的翻译文件，请复制一份[默认的语言文件](blog/_config.yml)到站点根目录下的 `languages` 文件夹，之后改名为对应的语言 ID，编辑内容即可。

## 创建主题配置文件

在博客根目录的 `_config.yml` 文件旁边新建一个文件： `_config.stellaris.yml` ，在这个文件中，你可以配置 Stellaris 主题中的各项功能特性。

## 定制主题功能特性

请参考 [默认配置文件](https://github.com/chiyuki0325/hexo-theme-stellaris/blob/main/_config.yml)。如果有想修改的条目，直接按照 yaml 格式把对应条目写到 `_config.stellaris.yml` 即可。
