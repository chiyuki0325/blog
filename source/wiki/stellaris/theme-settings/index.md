---
layout: wiki
wiki: stellaris
title: 🔧 网站和主题基本信息配置
---

## 🔢 站点信息

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

### 🔠 多语言设置

主题中的默认文案支持简体中文 (`zh-CN`)、繁体中文 (`zh-TW`) 和英文 (`en`) 三种语言。

更改网站优先语言，需要在站点根目录下的配置文件中进行修改：

```yaml blog/_config.yml
language:
  - zh-CN
  - zh-TW
  - en
```

若要创建你自己的翻译文件，请复制一份[默认的语言文件](blog/_config.yml)到站点根目录下的 `languages` 文件夹，之后改名为对应的语言 ID，编辑内容即可。

## 🖊️ 创建主题配置文件

在博客根目录的 `_config.yml` 文件旁边新建一个文件： `_config.stellaris.yml` ，在这个文件中，你可以配置 Stellaris 主题中的各项功能特性。可从主题源代码中的 `_config.yml` 中复制内容，也可以直接从零开始编写。

## 🤚 定制主题功能特性

请参考 [默认配置文件](https://github.com/chiyuki0325/hexo-theme-stellaris/blob/main/_config.yml)。如果有想修改的条目，直接按照 yaml 格式把对应条目写到 `_config.stellaris.yml` 即可。

## 🏷️ 头部标签自定义

### 👀 Open Graph

主题默认会在页面头部生成 Open Graph 标签，以在 X、Telegram 等社媒上获得更好的链接预览体验。  
如果您不希望生成它，可以在主题配置文件中关闭：

```yaml blog/_config.stellaris.yml
head:
  open_graph:
    # 设置为 false 以关闭
    enabled: true
  twitter_id:

```

## 🎨 定制主题样式

在主题配置文件的 style 小节，可自定义主题选用的字体和配色方案等样式。

```blog/_config.stellaris.yml
######## 样式 ########
style:
  darkmode: auto # auto / always / false / auto-switch
  smooth_scroll: true # true / false
  font-size:
    root: 16px
    body: .9375rem # 15px
    code: 85% # 14px
    codeblock: 0.8125rem # 13px
  text-align: left
  color:
    common:
      accent: '#0078d4' # 强调色
      button: '#0078d4' # 按钮颜色
      hover: '#0078d4' # 按钮高亮颜色
    light:
      theme: '#0078d4' # 主题色
      mix: '#eff4f9' # 浅色背景颜色
      block: '#EEF0F2' # 块背景颜色
      card: '#fafbfd' # 卡片背景颜色
      title: '#000' # 标题文本颜色
      text: '#1a1a1a' # 正文文本颜色
      code: 'black' # 行内代码颜色
      background: '#f3f3f3 radial-gradient(#eff4f9 75%, #f3f3f3 100%) no-repeat fixed' # 网站背景颜色
    dark:
      theme: '#4cc2ff' # 主题色
      mix: '#313438' # 深色背景颜色
      background-mobile: black # 移动端深色背景（OLED调成纯黑可以省电）
      block: '#2B2F33' # 块背景颜色
      card: '#282a39' # 卡片背景颜色
      title: '#fff' # 标题文本颜色
      text: '#eee' # 正文文本颜色
      code: '#eee' # 行内代码颜色
      background: '#202020 radial-gradient(#1a1f35 25%, #202020 100%) no-repeat fixed' # 网站背景颜色
  animated_avatar:
    animate: auto # auto, always
    background: https://fastly.jsdelivr.net/gh/cdn-x/placeholder@1.0.2/avatar/round/rainbow64@3x.webp
  codeblock:
    scrollbar: 4px
    highlightjs_theme: https://fastly.jsdelivr.net/gh/highlightjs/cdn-release@11.5.0/build/styles/atom-one-dark.min.css
  font-family:
    logo: 'HarmonyOS_Regular, system-ui, -apple-system, sans-serif'
    body: 'HarmonyOS_Regular, system-ui, -apple-system, sans-serif'
    code: 'Menlo, Monaco, Consolas, "Courier New", monospace, sans-serif'
    codeblock: 'Menlo, Monaco, Consolas, "Courier New", monospace, sans-serif'
  custom_font_css:
    # 自定义字体
    enabled: true
    css: 'https://s1.hdslb.com/bfs/static/jinkela/long/font/regular.css'
```

## 👍 部分 Hexo 增强包推荐

使用 [hexo-all-minifier](https://github.com/chenzhutian/hexo-all-minifier) 可以对生成的 HTML、JS 和 CSS 文件进行压缩，加快访客的加载速度。

使用 [hexo-renderer-markdown-it-plus](https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus) 渲染器，支持数学公式渲染。需要在主题配置文件中启用 `katex`。
