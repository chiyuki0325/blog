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

{% image https://imgsrc.chyk.ink/fd039245d688d43faf0bc631381ed21b0ff43b56.webp "文文最可爱了 w" download:https://imgsrc.chyk.ink/fd039245d688d43faf0bc631381ed21b0ff43b56.webp %}

```markdown 写法如下
{% image https://imgsrc.chyk.ink/fd039245d688d43faf0bc631381ed21b0ff43b56.webp "文文最可爱了 w" download:https://imgsrc.chyk.ink/fd039245d688d43faf0bc631381ed21b0ff43b56.webp %}
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

## hashtag 标签

{% hashtag color:cyan Stellaris https://blog.chyk.ink/wiki/stellaris %} {% hashtag color:blue Hexo https://hexo.io/ %} {% hashtag GitHub https://github.com/chiyuki0325 %}

默认颜色可在主题配置文件中设置。

如果没有指定颜色，且没有设置默认颜色，则随机取一个颜色，快来试试吧～

```markdown
{% hashtag color:cyan Stellaris https://blog.chyk.ink/wiki/stellaris %}
{% hashtag color:blue Hexo https://hexo.io/ %}
{% hashtag GitHub https://github.com/chiyuki0325 %}
```

## quot 引用

适合居中且醒目的引用：

{% quot 愿我们的意志化作群星，直达银河系的彼端 %}

`quot` 支持自定义引号图标，详见[原主题文档](https://xaoxuu.com/wiki/stellar/tag-plugins/express/#quot-%E5%BC%95%E7%94%A8)。

>  此外，加上 `el:h2/h3/h4/h5/h6` 参数，此组件可以作为标题使用。

在 2.1 之后，您可以通过 prefix 或 suffix 参数设置任意图标或图片，支持 URL 或 icons.yml 文件中配置，详见[原主题文档](https://xaoxuu.com/wiki/stellar/tag-plugins/express/#%E4%BD%BF%E7%94%A8%E4%BB%BB%E6%84%8F%E5%9B%BE%E6%A0%87)。

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

## paper 纸张标签

{%tabs%}

<!--tab 示例 -->

{% paper style:underline title:文言文 author:诸葛亮 date:三国 footer:节选 %}
<!-- line left -->
出师表
<!-- paragraph -->
先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。
<!-- line right -->
后出师表
<!-- paragraph -->
先帝深虑汉、贼不两立，王业不偏安，故托臣以讨贼也。以先帝之明，量臣之才，固知臣伐贼，才弱敌强也。然不伐贼，王业亦亡。惟坐而待亡，孰与伐之？是故托臣而弗疑也。
{% endpaper %}

<!--tab 写法 -->

```markdown
{% paper style:underline title:文言文 author:诸葛亮 date:三国 footer:节选 %}
<!-- line left -->
出师表
<!-- paragraph -->
先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。
<!-- line right -->
后出师表
<!-- paragraph -->
先帝深虑汉、贼不两立，王业不偏安，故托臣以讨贼也。以先帝之明，量臣之才，固知臣伐贼，才弱敌强也。然不伐贼，王业亦亡。惟坐而待亡，孰与伐之？是故托臣而弗疑也。
{% endpaper %}
```

```yaml 可选参数
style: underline/无 # 是否带下划线
title: # 标题
author: # 作者
date: # 日期
footer: # 页脚信息
```

正文中可以设置行段落格式以显示不同的效果

```html
<!-- section 小节标题 -->
小节标题，居中显示
<!-- paragraph -->
段落，首行缩进两个字符
<!-- line left -->
段落左对齐
<!-- line right -->
段落右对齐
```

{%endtabs%}

## reel 卷轴标签

{%tabs%}

<!--tab 示例-->

{% reel 滕王阁序 author:王勃 date:重九日 footer:节选 %}
时维九月，序属三秋。
潦水尽而寒潭清，烟光凝而暮山紫。
俨骖騑于上路，访风景于崇阿。
临帝子之长洲，得天人之旧馆。
层峦耸翠，上出重霄；
飞阁流丹，下临无地。
鹤汀凫渚，穷岛屿之萦回；
桂殿兰宫，即冈峦之体势。
{% endreel %}

<!--tab 写法-->

```markdown
{% reel 滕王阁序 author:王勃 date:重九日 footer:节选 %}
时维九月，序属三秋。
潦水尽而寒潭清，烟光凝而暮山紫。
俨骖騑于上路，访风景于崇阿。
临帝子之长洲，得天人之旧馆。
层峦耸翠，上出重霄；
飞阁流丹，下临无地。
鹤汀凫渚，穷岛屿之萦回；
桂殿兰宫，即冈峦之体势。
{% endreel %}
```

```yaml 可选参数
title: # 标题
author: # 作者
date: # 日期
footer: # 页脚信息
```

{%endtabs%}

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

{%link https://hexo.io/zh-cn/docs/ "文档 | Hexo" icon:https://imgsrc.chyk.ink/77c6a7efce1b9d16ba0cae56b5deb48f8c546439.webp %}


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
{%link https://hexo.io/zh-cn/docs/ "文档 | Hexo" icon:https://imgsrc.chyk.ink/77c6a7efce1b9d16ba0cae56b5deb48f8c546439.webp %}
{% link https://blog.chyk.ink/2023/06/08/generative-ai-first-year-is-far-from-coming/ desc:true %}
```

{%endtabs%}

随着网站流量的增加，使用主题默认的 `api` 很可能会导致流量超限，推荐使用自部署的 `api` 抓取网站信息。参见 [site-info-api](https://github.com/xaoxuu/site-info-api) 仓库的 README 部署，并在主题配置中设置 url。

```yaml blog/_config.stellaris.yml
tag_plugins:
  link:
    # 接口测试通过后，把 href 部分替换成 {href} 之后填写到下方，例如：https://api.vlts.cc/site_info/v1?url={href}
    siteinfo_api: 
```



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

这是一个 OKR（Objectives and Key Results）示例：

{% okr o1 %}

2023 年的小目标：完成 Stellaris 2.0 并发布上线
来自 2024 年的复盘：已「基本」实现目标！

<!-- okr kr1 percent:1 -->

同步上游的 tag-plugins 和 wiki 系统

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

<!-- okr kr4 status:at_risk -->
开发、测试和发布
{% image /static/stellar.svg height:64px 支持嵌套插入图片等其它简单组件 %}

{% endokr %}

{%folding child:codeblock 写法 %}

```markdown
{% okr o1 %}

2023 年的小目标：完成 Stellaris 2.0 并发布上线
来自 2024 年的复盘：已「基本」实现目标！

<!-- okr kr1 percent:1 -->
同步上游的 tag-plugins 和 wiki 系统

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

<!-- okr kr4 status:at_risk -->
开发、测试和发布
{% image /static/stellar.svg height:64px 支持嵌套插入图片等其它简单组件 %}

{% endokr %}
```

{%endfolding%}

## bvideo 哔哩哔哩视频

此组件移植自 [hexo-bilibili-card](https://github.com/maxchang3/hexo-bilibili-card)，可在文章中引用哔哩哔哩视频。

{%border ⚠️ 注意 color:yellow %}

为了解决跨域问题，使用此标签组件前，需要先在自己的服务器上部署 [stellaris-api](https://github.com/chiyuki0325/stellaris-api)。部署好后，在主题配置文件中填入对应的地址即可。

{%endborder%}

效果如下：

{% bvideo BV1ae4y127K5 %}

写法非常简单，参数填入 BV 号即可。

```
{% bvideo BV1ae4y127K5 %}
```

## video 内嵌视频播放器

使用此组件可在文章中嵌入一个视频播放器，支持引用 YouTube、哔哩哔哩的视频或外部视频直链。

```markdown
嵌入流媒体视频时的语法：
{% video [platform_name:video_id] [width:100%] [autoplay:0] %}

如：
{% video bilibili:BV1ae4y127K5 %}
{% video youtube:LB8KwiiUGy0 autoplay:1 %}

嵌入外链视频时的语法：
{% video src [poster] [ratio] [subtitle:subtitle-url] [subtitle_encoding:utf-8] [autoplay:false] [muted:false] [loop:false] [setting: true] [hotkey:true] [fullscreen_enabled:true] [mini_progress_bar:false] [mutex:true] [pip:false] %}
```



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

