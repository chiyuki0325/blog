---
layout: wiki
wiki: stellaris
title: 💼 容器类标签组件
---

容器类标签组件中可嵌套其它的标签，容器类标签和其它类的标签均可。

## border 盒子容器

最简单的盒子容器，但可搭配您的内容，实现丰富的表达效果。

```
{% border [title] [color:color] [child:codeblock] %}
你的内容...
{% endborder %}
```

{%border 这是一个盒子容器。 color:blue %}
此组件有多种颜色可选，可选的颜色和 [标记标签](/wiki/stellaris/tag-plugins/express/#mark-标记标签) 组件相同。
{%endborder%}

> 此组件在 Stellar 中曾经被多次更名，因此写 `border` 和 `ablock` 都指代这个组件。

### 彩色代码块

激活 `child:codeblock` 参数并指定颜色后，可实现彩色代码块的效果。  
彩色代码块一般可以用在代码正确与错误的示范对比场景。

{%tabs%}
<!-- tab 示例 -->
{% split %}
<!-- cell left -->
**推荐的写法**
{% border child:codeblock color:green %}
```kotlin
fun main() {
    // ...
}
```
{% endborder %}
<!-- cell right -->
**不推荐的写法**
{% border child:codeblock color:red %}
```kotlin
fun main(): Unit {
    // ...
}
```
{% endborder %}
{% endsplit %}
<!-- tab 写法 -->
````markdown
{% split %}
<!-- cell left -->
**推荐的写法**
{% border child:codeblock color:green %}
```kotlin
fun main() {
    // ...
}
```
{% endborder %}
<!-- cell right -->
**不推荐的写法**
{% border child:codeblock color:red %}
```kotlin
fun main(): Unit {
    // ...
}
```
{% endborder %}
{% endsplit %}
````
{%endtabs%}

## folding 折叠容器

折叠块标签的语法格式为：

```
{% folding title [codeblock:bool] [open:bool] [color:color] %}
content
{% endfolding %}
```

参数用法可参考 `border` 标签，`open` 参数为是否默认展开。

{%tabs%}
<!-- tab 示例 -->
{% folding 危险，请不要运行这个 color:yellow %}
通过设置颜色，以实现更醒目的作用，但不要滥用色彩哦～
{% folding 警告，真的很危险 color:orange %}
通过设置颜色，以实现更醒目的作用，但不要滥用色彩哦～
{% folding 最后一次警告，千万不要运行这个 color:red child:codeblock %}
```bash
sudo rm -rf /* --no-preserve-root
```
{% endfolding %}
{% endfolding %}
{% endfolding %}
<!-- tab 写法 -->
````markdown
{% folding 危险，请不要运行这个 color:yellow %}
通过设置颜色，以实现更醒目的作用，但不要滥用色彩哦～
{% folding 警告，真的很危险 color:orange %}
通过设置颜色，以实现更醒目的作用，但不要滥用色彩哦～
{% folding 最后一次警告，千万不要运行这个 color:red child:codeblock %}
```bash
sudo rm -rf /* --no-preserve-root
```
{% endfolding %}
{% endfolding %}
{% endfolding %}
````
{%endtabs%}

## tabs 标签分栏容器

在前面的示例代码中，已经多次使用过这个容器。

{% tabs align:center active:2 %}
<!-- tab 对齐 -->
使用 `align` 参数以设置居中对齐（`center`）或左对齐（`left`）。
<!-- tab 默认标签 -->
设置 `active` 参数以设置默认打开的标签。
<!-- tab 其它 -->
`tabs` 中同样支持嵌套其它标签组件，{% mark 比如这个 color:yellow %}。
{% endtabs %}

写法如下：

```
{% tabs align:center active:2 %}
<!-- tab 对齐 -->
使用 `align` 参数以设置居中对齐（`center`）或左对齐（`left`）。
<!-- tab 默认标签 -->
设置 `active` 参数以设置默认打开的标签。
<!-- tab 其它 -->
`tabs` 中同样支持嵌套其它标签组件，{% mark 比如这个 color:yellow %}。
{% endtabs %}
```


## 🚧 更多文档正在施工中...
