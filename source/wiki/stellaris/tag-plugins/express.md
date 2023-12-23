---
layout: wiki
wiki: stellaris
title: 🖊️ 表达类标签组件
---

## mark 标记标签

支持多彩标记，包括：{% mark 默认 %} {% mark 红 color:red %} {% mark 橙 color:orange %} {% mark 黄 color:yellow %} {% mark 绿 color:green %} {% mark 青 color:cyan %} {% mark 蓝 color:blue %} {% mark 紫 color:purple %} {% mark 亮 color:light %} {% mark 暗 color:dark %} {% mark 警告 color:warning %} {% mark 错误 color:error %} 一共 12 种颜色。

```markdown
支持多彩标记，包括：{% mark 默认 %} {% mark 红 color:red %} {% mark 橙 color:orange %} {% mark 黄 color:yellow %} {% mark 绿 color:green %} {% mark 青 color:cyan %} {% mark 蓝 color:blue %} {% mark 紫 color:purple %} {% mark 亮 color:light %} {% mark 暗 color:dark %} {% mark 警告 color:warning %} {% mark 错误 color:error %} 一共 12 种颜色。
```

## image 图片标签

图片标签是一个精心设计的应对各种尺寸插图的标签，对于大图，可以放置一个「下载」按钮，语法格式如下

```markdown
{% image src [description] [download:bool/string] [width] [height] [padding:px] [bg:hex] %}
```

```yaml 参数说明
src: 图片地址
description: 图片描述
download: href # 下载地址，设置此值后鼠标放在图片上会显示下载地址，如果下载地址为图片地址，可以设置为 true
width: 200px # 图片宽度（px / rem 等）
height: 200px # 图片高度（px / rem 等）
padding: 16px # 图片四周填充宽度
bg: '#ffffff' # 图片区域背景颜色，16进制
fancybox: true # 对某张图单独启用或禁用 Fancybox（点击大图）功能
```

### 大尺寸图片

无论在什么宽度的设备上都希望横向铺满的图片，一般不需要额外操作。可以在链接后面写上图片描述，如有必要，可以通过设置 `download:true` 使其显示一个「下载」按钮链接指向图片地址，如果下载链接与显示的图片地址不同，可以 `download:下载链接` 来使其能够下载原图。

{% image https://imgsrc.baidu.com/forum/pic/item/fd039245d688d43faf0bc631381ed21b0ff43b56.jpg "文文最可爱了 w" download:https://imgsrc.baidu.com/forum/pic/item/fd039245d688d43faf0bc631381ed21b0ff43b56.png %}

```markdown 写法如下
{% image https://imgsrc.baidu.com/forum/pic/item/fd039245d688d43faf0bc631381ed21b0ff43b56.jpg "文文最可爱了 w" download:https://imgsrc.baidu.com/forum/pic/item/fd039245d688d43faf0bc631381ed21b0ff43b56.png %}
```

### 小尺寸图片优化

宽度较小而高度较大的图片，可以设置宽、高、填充间距、背景色等对其布局进行优化，使得它在不同宽度的屏幕下都能获得不错的视觉体验：

{% image https://q1.qlogo.cn/g?b=qq&nk=3526514925&s=640 这是我的头像。 width:200px %}

```markdown
{% image https://q1.qlogo.cn/g?b=qq&nk=3526514925&s=640 这是我的头像。 width:200px %}
```

{%folding 如果不进行约束，在宽屏设备上阅读体验很糟糕%}

{% image https://q1.qlogo.cn/g?b=qq&nk=3526514925&s=640 %}

{%endfolding%}

### 支持 Fancybox 插件点击放大

由于 Stellar 主题的插件具有按需加载的特性，所以 Fancybox 插件默认也是已经配置好了的，在任意 `image` 标签中增加 `fancybox:true` 参数即可为特定图片开启缩放功能。如果一个页面没有任何地方使用，则不会加载 Fancybox 插件。

如果您希望全站所有的 `image` 标签都开启此功能，可在主题配置文件中修改以下参数：

```yaml blog/_config.stellaris.yml
tag_plugins:
  # {% image %}
  image:
    fancybox: true
plugins:
  fancybox:
    enabled: true
    selector: .swiper-slide img, .tag-plugin.image img # 多个选择器用英文逗号隔开
```

## icon 小图标

✨ 用于显示行内小图标。效果如下：

这是 {% icon /static/system-file-manager.svg %} Dolphin，KDE Plasma 桌面的默认文件管理器。

```markdown
这是 {% icon /static/system-file-manager.svg %} Dolphin，KDE Plasma 桌面的默认文件管理器。
```

## quot 引用

适合居中且醒目的引用：

{% quot 愿我们的意志化作群星，直达银河系的彼端 %}

`quot` 支持自定义引号图标，详见[原主题文档](https://xaoxuu.com/wiki/stellar/tag-plugins/express/#quot-%E5%BC%95%E7%94%A8)。

>  此外，加上 `el:h2/h3/h4/h5/h6` 参数，此组件可以作为标题使用。

## poetry 诗词

由于 Stellaris 把 markdown 的引文 `>` 改成了卡片样式，因此你可以使用原主题的 `poetry` 组件来引用大段文本。

{% poetry 定风波·莫听穿林打叶声 author:苏轼 %}
莫听穿林打叶声，何妨吟啸且徐行。
竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。
料峭春风吹酒醒，微冷，山头斜照却相迎。
回首向来萧瑟处，归去，也无风雨也无晴。
{% endpoetry %}

```markdown
{% poetry 定风波·莫听穿林打叶声 author:苏轼 %}
莫听穿林打叶声，何妨吟啸且徐行。
竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。
料峭春风吹酒醒，微冷，山头斜照却相迎。
回首向来萧瑟处，归去，也无风雨也无晴。
{% endpoetry %}
```

## note 单行备注块

```
{% note [title] content [color:color] %}
```

### 具有标题的备注块

直接写备注内容，默认是和代码块一样的样式，第一个空格前面的是标题，后面的是正文，如果标题中需要显示空格，请使用 `&nbsp;`代替，或者用英文双引号围住正文。

{%tabs%}

<!--tab 示例-->

{% note "Stellaris 是什么？" "Stellaris 是一款 Hexo 博客主题，派生自 [Stellar](https://github.com/xaoxuu/hexo-theme-stellar)，支持丰富的标签和动态数据组件，帮助您简单从容地应对各种表达需求。" %}

<!--tab 写法-->

```markdown
{% note "Stellaris 是什么？" "Stellaris 是一款 Hexo 博客主题，派生自 [Stellar](https://github.com/xaoxuu/hexo-theme-stellar)，支持丰富的标签和动态数据组件，帮助您简单从容地应对各种表达需求。" %}
```

{%endtabs%}

### 彩色备注块

{%tabs%}

<!--tab 示例-->

{% note color:cyan 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}

<!--tab 写法-->

```markdown
{% note color:cyan 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
```

{%endtabs%}

{%folding 查看所有颜色%}

{% note color:red 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}

{% note color:orange 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}

{% note color:yellow 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}

{% note color:green 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}

{% note color:cyan 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}

{% note color:blue 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}

{% note color:purple 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}

{% note color:light 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}

{% note color:dark 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}

{% note color:warning 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}

{% note color:error 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}

{%endfolding%}

## link 链接卡片

{%tabs%}

<!--tab 示例-->

{%link https://hexo.io/zh-cn/docs/ "文档 | Hexo" icon:https://imgsrc.baidu.com/forum/pic/item/77c6a7efce1b9d16ba0cae56b5deb48f8c546439.png %}


{% link https://blog.chyk.ink/2023/06/08/generative-ai-first-year-is-far-from-coming/ desc:true %}

<!--tab 写法-->

外链卡片标签的语法格式为：

```markdown
{% link href [title] [icon:src] [desc:true/false] %}
```

参数含义：

```yaml
href: 链接
title: 可选，手动设置标题（为空时会自动抓取页面标题）
icon: 可选，手动设置图标（为空时会自动抓取页面图标）
desc: 可选，是否显示摘要描述，为true时将会显示页面描述
```

```markdown
{%link https://hexo.io/zh-cn/docs/ "文档 | Hexo" icon:https://imgsrc.baidu.com/forum/pic/item/77c6a7efce1b9d16ba0cae56b5deb48f8c546439.png %}
{% link https://blog.chyk.ink/2023/06/08/generative-ai-first-year-is-far-from-coming/ desc:true %}
```

{%endtabs%}

## copy 复制行

{%tabs%}

<!--tab 示例-->

对于单行内容，可以使用 `copy` 标签来实现复制功能：

{% copy curl -s https://git.io/neofetch | sh %}

您可以设置 `git:https` 或者 `git:ssh` 或者 `git:gh` 来快速放置一个 GitHub 仓库链接：

{% copy git:https chiyuki0325/hexo-theme-stellaris %}

<!--tab 写法-->

{% copy curl -s https://git.io/neofetch | sh %}

{% copy width:max curl -s https://git.io/neofetch | sh %}

{% copy git:https chiyuki0325/hexo-theme-stellaris %}

{% copy git:ssh chiyuki0325/hexo-theme-stellaris %}

{% copy git:gh chiyuki0325/hexo-theme-stellaris %}

{%endtabs%}

## radio 单选

{%tabs%}

<!--tab 示例-->

{% radio 没有勾选的单选框 %}
{% radio checked:true 已勾选的单选框 %}

<!--tab 写法-->

```markdown
{% radio 没有勾选的单选框 %}
{% radio checked:true 已勾选的单选框 %}
```

```yaml 支持的参数
checked: true/false
color: red/orange/yellow/green/cyan/blue/purple
```

{%endtabs%}

## checkbox 复选

{%tabs%}

<!--tab 示例-->

{% checkbox 普通的没有勾选的复选框 %}
{% checkbox checked:true 普通的已勾选的复选框 %}
{% checkbox symbol:plus color:green checked:true 显示为加号的绿色的已勾选的复选框 %}
{% checkbox symbol:minus color:yellow checked:true 显示为减号的黄色的已勾选的复选框 %}
{% checkbox symbol:times color:red checked:true 显示为乘号的红色的已勾选的复选框 %}

<!--tab 写法-->

```markdown
{% checkbox 普通的没有勾选的复选框 %}
{% checkbox checked:true 普通的已勾选的复选框 %}
{% checkbox symbol:plus color:green checked:true 显示为加号的绿色的已勾选的复选框 %}
{% checkbox symbol:minus color:yellow checked:true 显示为减号的黄色的已勾选的复选框 %}
{% checkbox symbol:times color:red checked:true 显示为乘号的红色的已勾选的复选框 %}
```

```yaml 支持的参数
checked: true/false
color: red/orange/yellow/green/cyan/blue/purple
symbol: plus/minus/times
```

{%endtabs%}

## navbar 导航栏

文章内也可以插入一个导航栏：

{% navbar  [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/chiyuki0325/) %}

```markdown
{% navbar active:/wiki/ [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/chiyuki0325/) %}
```

## okr 目标管理

这个功能在 1.8 版本后开始支持，这是一个 OKR（Objectives and Key Results）示例：

{% okr o1 %}

2024年的小目标：完成 Stellaris 2.0 并发布上线
来自2025年的复盘：已《基本》实现目标！

<!-- okr kr1 percent:1 -->
重构 tag-plugins 和 wiki 系统
- 当 {% mark KR %} 进度为 100% 时，标签默认显示为 {% mark color:green 已完成 %}
- 当 {% mark KR %} 未设置进度时，默认为 {% mark 0% %}
- 当 {% mark O %} 未设置进度时，则显示所有 {% mark KR %} 进度平均值

<!-- okr kr2 percent:0.9 status:off_track -->
完成主要页面设计稿
{% tabs align:left %}
<!-- tab 小提示1 -->
您可以在 _config.yml 文件中修改标签的颜色和文案
<!-- tab 小提示2 -->
您可以在 _config.yml 文件中增加任意的标签配置
{% endtabs %}

<!-- okr kr3 percent:-0.12 status:unfinished -->
完成前置准备工作（如果你知道答案，请在留言区帮帮我！🥹）
{% checkbox 在咸水和海滩之间找一亩地 %}
{% checkbox 求出圆周率后15位 %}
{% checkbox 找出宇宙的终极逻辑 %}
{% checkbox 去地狱里走两步 %}

<!-- okr kr-4 status:at_risk -->
开发、测试和发布
{% image /static/stellar.svg height:64px 支持嵌套插入图片等其它简单组件 %}

{% endokr %}

{%folding child:codeblock 写法 %}

```markdown
{% okr o1 %}

2024年的小目标：完成 Stellaris 2.0 并发布上线
来自2025年的复盘：已《基本》实现目标！

<!-- okr kr1 percent:1 -->
重构 tag-plugins 和 wiki 系统

- 当 {% mark KR %} 进度为 100% 时，标签默认显示为 {% mark color:green 已完成 %}
- 当 {% mark KR %} 未设置进度时，默认为 {% mark 0% %}
- 当 {% mark O %} 未设置进度时，则显示所有 {% mark KR %} 进度平均值

<!-- okr kr2 percent:0.9 status:off_track -->
完成主要页面设计稿
{% tabs align:left %}
<!-- tab 小提示1 -->
您可以在 _config.yml 文件中修改标签的颜色和文案
<!-- tab 小提示2 -->
您可以在 _config.yml 文件中增加任意的标签配置
{% endtabs %}

<!-- okr kr3 percent:-0.12 status:unfinished -->
完成前置准备工作（如果你知道答案，请在留言区帮帮我！🥹）
{% checkbox 在咸水和海滩之间找一亩地 %}
{% checkbox 求出圆周率后15位 %}
{% checkbox 找出宇宙的终极逻辑 %}
{% checkbox 去地狱里走两步 %}

<!-- okr kr-4 status:at_risk -->
开发、测试和发布
{% image /static/stellar.svg height:64px 支持嵌套插入图片等其它简单组件 %}

{% endokr %}
```

{%endfolding%}

## 文本修饰标签集

- 这是 {% psw 隐秘 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd 🐧 %} + {% kbd D %}

```markdown 写法
- 这是 {% psw 密码 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd 🐧 %} + {% kbd D %}
```

