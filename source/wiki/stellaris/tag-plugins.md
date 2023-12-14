---
layout: wiki
wiki: stellaris
title: 🏷️ 使用标签组件增强阅读体验
---

Stellar 内置的标签组件语法和 Hexo 官方的一样，使用类 [Jinja2 语法](http://jinja.pocoo.org/docs/templates/)，用空格分隔多个参数。

如果参数内容中需要出现的空格被意外分隔开了的时候，请使用 `&nbsp;` 代替，或者使用英文双引号包裹参数。

为了方便理解，本文档语法格式中的可选参数用方括号括起来，键值对参数用冒号分隔开，例如：

```jinja2
{% image src [description] [download:bool/string] %}
```

就表明第一个参数是图片链接，第二个参数是图片描述，而 `download` 是可选参数，并且值是布尔或字符串类型，第二三个参数为可选参数。

{%ablock%}

**了解参数解析规则**

以图片标签为例，使用空格分隔开之后得到一个数组，如果图片描述文字中有空格，多分出来的这些「参数」被合并到最后一个「非键值对参数」中，什么是「非键值对参数」呢？举个例子您就明白了：

```jinja2
{% image /assets/wiki/stellar/photos/183e71e0ad995.jpg 来自印度的 Rohit Vohra 使用 iPhone 12 Pro Max 拍摄。 download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/Apple_ShotoniPhone-rohit_vohra_12172020.zip %}
```

这个例子中，`download:https://xxxx` 是有冒号分隔开的，`download` 为键，后面的网址为值，所以叫做「键值对参数」；与此相对的，没有冒号分隔的就叫做「非键值对参数」。键值对参数可以放在任何位置，我可以通过匹配键来解析，而非键值对参数则只能通过顺序解析，所以它们必须和文档中要求的前后顺序一致。

一般核心的、重要的参数会设置成非键值对参数，而可选参数设置成键值对参数。

{%endablock%}
