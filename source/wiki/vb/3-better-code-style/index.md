---
layout: wiki
order: 301
title: 🎼 改善你的 Visual Basic 代码风格
wiki: Visual Basic
---

### ↗️ GoTo

若非必要（如错误处理）时，不要使用 GoTo，这会让代码逻辑混乱，难以阅读，产生臭名昭著的意大利面条代码。

### ⛔ 严格模式

在文件的开头加上 `Option Explicit` 语句即可开启严格模式。

在严格模式中，不允许使用未声明的变量。

### 🔤 命名规则

在 VB 中推荐使用两种命名规则：[驼峰法](https://zh.wikipedia.org/zh-cn/%E9%A7%9D%E5%B3%B0%E5%BC%8F%E5%A4%A7%E5%B0%8F%E5%AF%AB)和[匈牙利命名法](https://zh.wikipedia.org/zh-hans/%E5%8C%88%E7%89%99%E5%88%A9%E5%91%BD%E5%90%8D%E6%B3%95)。

至于使用大驼峰还是小驼峰，可能全看库编写者的心情。比如，`Dictionary.Add` 有两个参数 `key` 和 `Item`，又比如 `IXMLHTTPRequest` 的方法全部为小驼峰，但其自身的命名法是匈牙利。

VB 允许使用下划线命名法，但不推荐。短横线命名法（串式命名法）是不允许使用的。

### ⏭️ 缩进

VB IDE 没有自动缩进的功能，可以用 [Smart Indenter](http://www.oaltd.co.uk/indenter/default.htm) 扩展进行自动代码缩进。

安装好扩展后，右键点击编辑器，就会出现 Smart Indent 菜单以缩进代码。

### 📑 函数调用中的参数

在函数调用中加上参数名，可以使得代码更美观。

```vb
MyDict.Add Key:="name", Item:="YidaozhanYa"
xhr.open bstrMethod:="GET", _
         bstrUrl:="http://my-awesome-api.com", _
         varAsync:=False
```

