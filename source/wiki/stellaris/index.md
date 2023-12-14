---
layout: wiki
wiki: stellaris
title: ✨ 欢迎来到 Stellaris 的世界
---

Stellaris 是一款 Hexo 博客主题，派生自 [Stellar](https://github.com/xaoxuu/hexo-theme-stellar)，支持丰富的标签和动态数据组件，帮助您简单从容地应对各种表达需求。

{%note color:cyan "🔧 此文档绝赞施工中，欢迎[提交 pull request](https://github.com/chiyuki0325/blog/tree/main/source/wiki/stellaris)。" %}

{% border color:warning ⚠️ 用前须知 %}

- 本主题为我为了个人博客 [千雪的咖啡厅](https://blog.chyk.ink) 而专门开发，因此部分原主题的功能可能并未支持。

{%endborder%}

## 开始前的准备工作

尽管我们致力于降低使用门槛，但是自建独立博客仍然需要一定的相关知识，[markdown](https://www.runoob.com/markdown/md-tutorial.html) 常用语法是必须要掌握的，除此之外，您还需要知道 `yaml` 文件格式、简单的 `git` 知识，最最重要的是，遇到问题知道该如何高效地寻找答案：

{%checkbox checked:true 翻阅和搜索文档 %}
{%checkbox checked:true 搜索 issues 中是否已经有解决办法 %}
{%checkbox checked:true 如果没有，新建 issue 并按照要求进行操作，详尽地描述您遇到的问题 %}

**如果您没有使用过 Hexo 也不要着急，我十分建议您去通读一遍 [Hexo](https://hexo.io/zh-cn/docs/) 中文文档**。
{%link https://hexo.io/zh-cn/docs/ "文档 | Hexo" icon:https://imgsrc.baidu.com/forum/pic/item/77c6a7efce1b9d16ba0cae56b5deb48f8c546439.png %}

此外，如果您从旧版本更新或者其它主题迁移，请确保环境版本不要太低，否则会产生兼容性问题：

```
- 建议的 Hexo 版本: 6.0.0 ~ 7.0.0
- hexo-cli: 4.3.0 ~ latest
- node.js: 18.0.0 ～ 21.4.0
- 你喜欢的 Node.js 包管理工具（如自带的 npm 或第三方的 yarn、pnpm。）
```

## 安装与更新

与原主题不同的是，Stellaris 不存在稳定版和开发版之别。你可以直接体验到最新的功能特性，但相对应地，也有潜在地 bug 存在。

{%border%}

{%tabs %}

<!-- tab NPM 软件包 -->

**安装**

使用你喜欢的 Node.js 包管理器安装即可。

{%copy npm install hexo-theme-stellaris --save %}

{%copy yarn add hexo-theme-stellaris --save %}

{%copy pnpm add hexo-theme-stellaris --save %}

<br/>

**更新**

{%copy npm update hexo-theme-stellaris %}

{%copy yarn update hexo-theme-stellaris %}

{%copy pnpm update hexo-theme-stellaris %}

<!-- tab Git 子模块 -->

**安装**

{%copy git submodule add https://github.com/chiyuki0325/hexo-theme-stellaris.git themes/stellaris %}

<br/>

**更新**

{%copy git submodule update --remote --merge %}

<!-- tab 引用源码 -->

下载源码放到 `themes/` 文件夹下面试用。

{%note color:red 适用范围 仅适合测试，无法获得更新。%}

{%endtabs%}

{%endborder%}

## Star History

本项目永久开源免费，如果您喜欢本项目，请[点个 Star](https://github.com/chiyuki-325/hexo-theme-stellaris/)支持一下吧～

{%image https://starchart.cc/chiyuki0325/hexo-theme-stellaris.svg %}

## 开源许可协议

{%quot 项目中的许可声明文件应包含在所有副本中 %}

原本的 Stellar 主题由 [@xaoxuu](https://github.com/xaoxuu) 设计和开发，后期也合并了 [开源贡献者](https://xaoxuu.com/wiki/stellar/contributors/) 提交的代码。
Stellaris 主题由 [斬風·千雪](https://blog.chyk.ink/) 修改和开发，后期也合并了 [开源贡献者](https://github.com/chiyuki0325/hexo-theme-stellaris/graphs/contributors) 提交的代码。

此项目使用 [MIT License](https://raw.github.xaox.cc/xaoxuu/hexo-theme-stellar/main/LICENSE) 开源许可协议进行授权，拷贝、分享或基于此进行创作时请遵守协议内容：

```
MIT License

Copyright (c) 2021 xaoxuu, 2022-2023 Kirikaze Chiyuki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
