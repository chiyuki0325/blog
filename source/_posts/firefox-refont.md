---
title: 🔤 使用 ReFont 扩展统一 Firefox 网页中的字体，告别微软雅黑
date: 2022-11-08 10:36:51
tags:
- 字体
- Firefox
category: 其它
---

各种各样的网站都会使用各种不同的字体，比如必应喜欢微软雅黑，百度贴吧偏爱宋体，谷歌又会使用 Roboto。作为一个重度强迫症，使用 [ReFont](https://addons.mozilla.org/zh-CN/firefox/addon/refont/) 扩展可以统一这些字体。

<!--more-->

ReFont 可以针对全局、网站和页面分别配置字体。它会用选中的字体和 FontAwesome 替换掉页面原本的字体。

ReFont 自带的配置显然不能满足我的需求，比如无法在 Office 中启用，会覆盖掉原本的 FabricMDL2Icons 图标字体，导致图标变成口口口，因此需要自定义配置。点击扩展右下角的「三个点」->「Library」，点击「Export Library」导出 ReFont 的配置文件。

需要保留 `disabled`，除此之外可以自定义每条配置。可以在常用的字体配置中增加一些网站的图标字体以保证兼容性。

```json
[{
	"name": "",
	"type": "disabled",
	"use": [""]
}, {
	"name": "HarmonyOS",
	"type": "preinstalled",
	"use": ["HarmonyOS Sans SC"],
	"weight": "normal"
}, {
	"name": "HarmonyOS + Icons",
	"type": "preinstalled",
	"use": ["HarmonyOS Sans SC", "Material Icons Extended", "FabricMDL2Icons", "FabricMDL2Icons-18", "Emoji Icon"],
	"weight": "normal"
}, {
	"name": "sans-serif",
	"type": "preinstalled",
	"use": ["sans-serif"],
	"weight": "normal"
}]
```

修改好配置之后，点击「Import Library」即可导入配置文件，之后重启浏览器即可。

对于一些自带全局字体的网站（比如 B 站），可以针对该网站禁用自定义字体（把网站字体改回 Default Font），以保证文字排版和谐不错位。
