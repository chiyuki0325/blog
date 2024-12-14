---
layout: wiki
wiki: stellaris
title: 📋 侧边栏配置
---

## ❇️ Logo

左上角的 logo 和标题取自站点根目录的配置文件：

```yaml blog/_config.yml
title: 网站名称
avatar: 头像
subtitle: 副标题  # 可选
```

副标题可以按如下方法设置两行，鼠标指上 `subtitle` 后翻转另一行字。

```yaml blog/_config.yml
subtitle:  标题1 | 标题2
```

如果您想用一个图片作为 logo，可以直接在主题配置文件 sidebar.logo.title 中设置：

```yaml blog/_config.stellaris.yml
sidebar:
  logo:
    title: '[<img no-lazy height="32px" src="xxx"/>](/)'
```

## 🗂️ 主导航栏

```yaml blog/_config.stellaris.yml
sidebar:
  menu:
    post: '[btn.blog](/)'
    wiki: '[btn.wiki](/wiki/)'
    notes: '[笔记](/notes/)'
    more: '[更多](/more/)'
```

侧边栏宽度有限，如何在不影响观感的情况下设置更多的主导航栏按钮呢？建议设置一个「更多」按钮，然后在「更多」页面的侧边栏放上列表组件。

如果想给独立页面配置导航栏高亮，参考[此处](/wiki/stellaris/pages/#更多的独立页面)。

## 🔍 文章搜索

```yaml blog/_config.stellaris.yml
search:
  service: local_search
  local_search: # 在 front-matter 中设置 indexing:false 来避免被搜索索引
    field: all # post, page, all
    path: /search.json # 索引文件存放位置
    content: true # 是否搜索内容
    codeblock: true # 是否搜索代码块（需要content: true)
```

在 `_config.stellaris.yml` 中设置搜索选项并配置你想在侧边栏中[显示的位置](/wiki/stellaris/widgets/)，
然后在 `widgets.yml` 文件中配置侧边栏搜索组件。

```yaml blog/source/_data/widgets.yml
search:
  layout: search
  filter: auto # auto or '/path'
  placeholder: 文章搜索 # 搜索框处显示的文字

search_blog:
  layout: search
  filter: /blog/ # or /posts/ ...
  placeholder: 文章搜索

search_docs:
  layout: search
  filter: /wiki/
  placeholder: 文档搜索
```

您可以设置 `filter` 按地址过滤搜索结果，默认 `auto` 是智能选择，规则如下：

- `layout: wiki`：只在 `/wiki/当前项目` 中搜索
- 其它：站内搜索

你可以在某些页面的 `front-matter` 中通过覆盖 search 组件的 `filter` 参数来定制化搜索范围，例如:

```yaml
---
sidebar:
  - toc
  - layout: search
    override: search
    filter: /path/to/some
---
```

如果想始终进行不加过滤的站内搜索，那么设置为 `filter: ''` 即可。

## 🦶 页脚

```yaml blog/_config.stellaris.yml
footer:
  social:
    github:
      icon: '<img src="/assets/placeholder/social/08a41b181ce68.svg"/>'
      url: https://
    music:
      icon: '<img src="/assets/placeholder/social/3845874.svg"/>'
      url: https://
    unsplash:
      icon: '<img src="/assets/placeholder/social/3616429.svg"/>'
      url: https://
    comments:
      icon: '<img src="/assets/placeholder/social/942ebbf1a4b91.svg"/>'
      url: https://
```

## 🔧 自定义组件

Stellaris 支持自定义侧边栏的组件和布局，详见[这篇文档](/wiki/stellaris/sidebar/widgets/)。
