---
layout: wiki
wiki: stellaris
title: 🧮 自定义侧边栏组件
---

Stellaris 主题的侧边栏高度可定制化。组成侧边栏的单位是「组件」，可使用 Stellaris 内置的组件模板。

建立 `source/_data/widgets.yml`，即可使用组件模板创建自己的侧边栏组件。

```yaml blog/source/_data/widgets.yml
'我的小组件1':
  layout: 小组件布局模板
  ...(其它属性)
```

可在主题配置（`_config.stellaris.yml`）配置全局侧边栏组件，也可以在某页面 front-matter 中配置页面单独的侧边栏组件。

```yaml blog/source/_posts/xxx.md
---
sidebar: ['我的小组件1', '我的小组件2']
---
```

## 🗃️ 组件模板

### toc 文档目录树

```yaml blog/source/_data/widgets.yml
toc:
  layout: toc
  list_number: false # 是否显示序号
  min_depth: 2 # 建议不要低于 2 即从 H2 标签开始解析（H1标签用于文章大标题）
  max_depth: 5 # 5 代表最多解析到 H5 标签
  fallback: recent # 如果文档中没有层级标题，则使用另一个组件
```

`toc` 的 `fallback` 默认是 `recent`，即一篇文章没有 `TOC` 的时候会显示一个 `recent`。

### recent 最近更新的文章

```yaml blog/source/_data/widgets.yml
recent:
  layout: recent
  rss: # RSS 图标，/atom.xml # npm i hexo-generator-feed
  limit: 5 # 显示的文章数量
```

在 `wiki` 板块显示的是最近更新的 `wiki` 页面，其余地方显示最近更新的文章。

博客中默认存在一个 `recent` 组件，而 Hexo 的覆盖规则是合并而不是替换，所以若不想使用 `recent`，除了在 `_config.stellar.yml` 中删除 `recent` 你还需要将此处的 `recent` 置空，即

```yaml blog/source/_data/widgets.yml
recent:
#  layout: recent
#  rss: # /atom.xml # npm i hexo-generator-feed
#  limit: 5 # Count of posts
# 需要全部注释
```

然后在自己需要的地方，用自己另建的使用 `recent` 模板的组件。

```yaml blog/source/_data/widgets.yml
my_recent:
  layout: recent
  ...

```

### related 相关文档

只能在 `wiki` 板块中使用。

```yaml blog/source/_data/widgets.yml
related:
  layout: related
```

### markdown 文档段

这是一个自由度很高的标签，可以显示 [markdown](https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) 文本内容：

```yaml blog/source/_data/widgets.yml
welcome:
  layout: markdown
  title: 欢迎使用
  content: |
    欢迎使用 [Stellaris](https://github.com/chiyuki0325/hexo-theme-stellaris/) 主题，下面是您的入门指南，祝您使用愉快！
    <br>
    **第一步**
    创建 `blog/_config.stellaris.yml` 文件，在此文件中填写需要自定义的主题配置。
    <br>
    **第二步**
    创建 `blog/source/_data/widgets.yml` 文件，此文件中填写需要自定义的侧边栏组件，例如 `welcome` 组件。
    <br>
    如果有任何疑问，请先查阅 [文档](https://blog.chyk.ink/wiki/stellaris/)，如果文档中没有提供，请提 [issue](https://github.com/chiyuki0325/hexo-theme-stellaris/issues/) 向开发者询问。
```

### tagcloud 标签云

```yaml blog/source/_data/widgets.yml
tagcloud:
  layout: tagcloud
  title: 标签云
  # 标签云配置
  min_font: 12
  max_font: 24
  amount: 100
  orderby: name
  order: 1 # 1, sac 升序；-1, desc 降序
  color: false # 使用颜色
  start_color:  # 开始的颜色。您可使用十六进位值（'#b700ff'），rgba（rgba(183, 0, 255, 1)），hsla（hsla(283, 100%, 50%, 1)）或 颜色关键字。此变量仅在 color 参数开启时才有用。
  end_color:  # 结束的颜色。您可使用十六进位值（'#b700ff'），rgba（rgba(183, 0, 255, 1)），hsla（hsla(283, 100%, 50%, 1)）或 颜色关键字。此变量仅在 color 参数开启时才有用。
  show_count: false # 显示每个标签的文章总数

```

### ghuser GitHub 用户卡片

此组件未经测试，如果存在 Bug 请提 issue 汇报。

```yaml blog/source/_data/widgets.yml
ghuser:
  layout: ghuser
  username: github # your github login username
  avatar: true # show avatar or not
  menu: true # show menu or not
```

### ghrepo GitHub 仓库卡片

此组件未经测试，如果存在 Bug 请提 issue 汇报。

显示 GitHub 仓库基础信息，需要搭配 `repo` 一起使用：

```yaml blog/source/_data/widgets.yml
ghrepo:
  layout: ghrepo
```

需要在需要显示的文章页面的 `front-matter` 中按照如下格式写上仓库持有者和仓库名：

```yaml blog/source/_posts/xxx.md
---
repo: chiyuki0325/hexo-theme-stellaris
---
```

如果需要显示在 `wiki` 项目中，则在 `_data/wiki/projects.yml` 中填写到对应项目的信息中：

```yaml blog/source/_data/wiki/projects.yml
name: Stellaris
title: Stellaris
subtitle: '分叉自 Stellar 的 Hexo 博客主题'
repo: chiyuki0325/hexo-theme-stellaris
...
```

### 其他

`linklist` 和 `timeline` 还未移植。如果你需要使用这两个组件模板，请提 issue 汇报。

## 🖊️ 匿名组件

仅在使用时创建的组件。

适合仅在一个页面或项目中才需要用到的组件，例如在某个页面的侧边栏放一个公告：

```yaml blog/source/_posts/xxx.md
---
title: 某一篇文章
leftbar:
  - welcome # 只写一个字符串代表引用对应的通用组件
  - layout: markdown
    title: '本文侧边公告'
    content: |
		这是一些文档。
---
```
