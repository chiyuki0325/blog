---
layout: wiki
wiki: stellaris
title: ✨ 快速开始
---

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
