---
layout: wiki
wiki: stellaris
title: 🖊️ 编写文章以及独立页面
---

## 新建文章和页面

使用 Hexo CLI 即可。

```bash
hexo new post "文章 ID"
hexo new page "页面路径"
```

之后你就可以在 `_post` 文件夹或对应路径找到文章的 markdown 文件。

文章的 markdown 文件开头有一段用 `---`包裹的 yaml 代码，称之为 `front-matter`。
在此你可以配置文章的标题、发布日期、标签、分类、封面等信息。
下面是[这篇文章](/2023/05/21/extract-resources-from-certain-rhythm-game/)的 `front-matter`，以作为示例：

```yaml
---
title: 🎼 某款心胸狭窄的公司开发的音乐游戏的资源提取小记
date: 2023-05-21 18:44:50
tags: [ 音游, 逆向 ]
category: 游戏
cover: 'https://imgsrc.baidu.com/forum/pic/item/241f95cad1c8a786f57546c32209c93d71cf509b.jpg'
references:
- title: '六、获取密钥 – UNI’S ON AIR资源提取逆向全记录'
  url: 'http://web.archive.org/web/20220528140408/https://blog.touuki.com/archives/287'
---
```



## 文章封面

在文章列表页面或者其他位置显示的文章摘要卡片上面的图片称之为「文章封面」。

### 自动生成封面

根据 `tags` 作为关键词，从 Unsplash 为每一篇文章在线搜索封面：

```yaml blog/_config.stellar.yml
article:
  auto_cover: true
```

此方式下你可以给每篇文章设置关键词，以提高搜索的精确度。

```yaml blog/source/_posts/xxx.md
---
cover: workout,strava
---
```

### 引用外部图片

在文章的 `front-matter` 中写上 `cover: xxx` 即可。例如：

```yaml blog/source/_posts/xxx.md
---
# 可以使用本地图片路径，为相对于 source 文件夹的相对路径
# 也可以直接引用图片直链 https://xxx.jpg
cover: /assets/blog/some_picture.webp
---
```

{%folding 显示效果 %}

{%image https://imgsrc.baidu.com/forum/pic/item/8b13632762d0f70374ffa2eb4efa513d2697c5bc.jpg %}

{%endfolding %}

### 全图封面卡片

这是另一种样式的封面。

```yaml blog/source/_posts/xxx.md
---
cover: /assets/xaoxuu/blog/2020-0927a@1x.svg # 必选
poster: # 海报（可选，全图封面卡片）
  topic: 标题上方的小字 # 可选
  headline: 大标题 # 必选
  caption: 标题下方的小字 # 可选
  color: 标题颜色 # 可选，默认为跟随主题的动态颜色 # white,red...
---
```

> 为了显示美观，建议 `topic` 和 `caption` 选择其一与 `headline` 搭配使用。

{%folding 显示效果%}

{%image https://imgsrc.baidu.com/forum/pic/item/a50f4bfbfbedab64af337af7b136afc379311e47.jpg %}

{%endfolding%}

## 内容摘要

### 自动生成摘要

建议您通过 `description` 或者 `excerpt` 方式生成摘要，但如果您希望自动从文章内容截取一定字数的文字作为摘要，可以这样设置：

```yaml blog/_config.stellar.yml
article:
  auto_excerpt: 200
```

### 手动设置摘要

一篇文章开头一段文字描述就是摘要，摘要和正文用 `<!-- more -->` 隔开，前后一定要有空行。例如：

```markdown blog/source/_posts/xxx.md
这是文章的第一段，同时也将作为文章的摘要显示。

<!-- more -->

这是文章的第二段，后面是正文部分，在主页看不到。
```

如果你不想截取文章首段作为摘要，也可以在 `front-matter` 中设置：

```markdown blog/source/_posts/xxx.md
---
description: "这是文章的摘要，会在首页中显示。"
---

这是文章的第一段，
```

## 文章模板

使用 Hexo 自带模板，可以实现命令行创建新文章时，自动生成相关 `front-matter` 条目。

根目录下 `scaffolds` 文件夹中编辑 `post.md` 的 `font-matter`：

```yaml blog/scaffolds/post.md
---
title: {{ title }}
date: {{ date }}
tags: []
categories: []
description: 
cover: 
banner: 
poster: # 海报（可选，全图封面卡片）
  topic: 标题上方的小字 # 可选
  headline: 大标题 # 必选
  caption: 标题下方的小字 # 可选
  color: 标题颜色 # 可选
---
```

## 文章页

### 横幅图片

文章页面顶部区域可以显示长长的横幅图片，设置方法如下：

```yaml blog/source/_posts/xxx.md
---
banner: /assets/blog/some_picture.webp
---
```

如果您想使用 Unsplash 搜索图片作为横幅，可以在 `banner` 中设置搜索关键词（用英文逗号隔开）：

```yaml blog/source/_posts/xxx.md
---
banner: workout,strava
---
```

### 指定一级标题

默认的一级标题是文章的 `title`，如果希望使用别的文字作为一级标题，可以指定 `h1`，例如：

```yaml blog/source/_posts/xxx.md
---
h1: 快速开始
---
```

## 文章索引与推荐

文章如果有分类和标签就会自动在主页出现「分类」、「标签」选项卡实现分类浏览，不需要手动添加页面。

### 文章分类

在文章列表页面会显示文章所属的第一级分类，例如：

```yaml blog/source/_posts/xxx.md
---
categories: [编程, Python]
---
```

这样写就只会显示「设计开发」一级分类，而在文章页面顶部则会显示完整的面包屑导航。

### 文章标签

文章标签并不在页面上可见，仅用于关键词、搜索、按标签检索、相关文章推荐等功能，例如：

```yaml blog/source/_posts/xxx.md
---
tags: [游戏, 音游, "舞萌 DX"]
---
```

### 相关文章推荐

要实现相关文章推荐功能，您需要安装插件：

{% copy npm i hexo-related-popular-posts %}

然后在主题配置文件中开启：

```yaml blog/_config.stellar.yml
article:
  # npm i hexo-related-popular-posts
  related_posts:
    enable: true
    title: 您可能感兴趣的文章
```

开启后会在每篇文章的下方，根据标签和分类推荐相同类型的文章。

## 参考资料

填写引用文章的标题和链接：

```yaml
---
references:
  - title: '六、获取密钥 – UNI’S ON AIR资源提取逆向全记录'
    url: 'http://web.archive.org/web/20220528140408/https://blog.touuki.com/archives/287'
  # ...
---
```

效果见[这篇文章](/2023/05/21/extract-resources-from-certain-rhythm-game/)。

## 更多的独立页面

Stellaris 同时具有博客和 Wiki 两个大模块，为了能够正确进行导航栏高亮，引入了 `menu_id` 来进行区分，通常情况下，`layout: post` 和 `layout: wiki` 两种布局模板可以自动为 `sidebar.menu.post` 和 `sidebar.menu.wiki` 的导航栏按钮高亮。自己创建的独立页面也可以在 `front-matter` 中指定 `menu_id` 来使某个按钮处于选中状态。

例如您有关于、友链两个页面，都希望高亮「更多」按钮：

```yaml blog/source/about/index.md
---
menu_id: more
title: 关于
---
```

```yaml blog/source/friends/index.md
---
menu_id: more
title: 友链
---
```

在主题配置文件中设置导航栏：

```yaml blog/_config.stellar.yml
sidebar:
  menu:
    # ...
    more: '[更多](/more/)'
```

## 友链页面

友链页面被设计成了标签组件。详见 [📰 数据集合类标签组件](/wiki/stellaris/tag-plugins/data)。
