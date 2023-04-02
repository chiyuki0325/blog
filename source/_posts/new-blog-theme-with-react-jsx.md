---
title: ⚛️ 使用 React JSX 重构我的博客主题
date: 2023-04-02 07:32:10
tags:
- React
- JavaScript
- 前端
category: 编程
cover: https://imgsrc.baidu.com/forum/pic/item/d50735fae6cd7b8991db9f494a2442a7d8330e40.jpg
---

一直以来，我的博客一直在使用 fork 的 [Stellar](https://xaoxuu.com/wiki/stellar/) 主题，它的页面布局部分使用 EJS 语言编写，既不优雅，可维护性又不高。后来接触了现代前端技术之后，我便尝试用 React JSX 语言重构了博客主题，定名为 [Stellaris](https://github.com/YidaozhanYa/hexo-theme-stellaris)。<!--more-->
本文就来回顾一下，我在重构博客主题过程中，遇到的几个问题。

{%image https://imgsrc.baidu.com/forum/pic/item/d50735fae6cd7b8991db9f494a2442a7d8330e40.jpg JSX 语言 %}

### ⚛️ JSX 渲染器的选择

Hexo 官方提供了两种 JSX 渲染器: [hexo-renderer-inferno](https://github.com/hexojs/hexo-renderer-inferno) 和 [hexo-renderer-jsx](https://github.com/hexojs/hexo-renderer-jsx)。因为对 Inferno 不熟悉，我便选择了基于 React 的后者。

### 🔮 Hexo 特定问题的处理

在重构主题的过程中，我遇到了一些问题：

- Hexo 的配置、页面属性等无法访问。

  在 hexo-renderer-jsx 的设计中，这些东西被一股脑塞进了组件 props 中。

  只需要从 props 中把这些东西解包出来即可。

  ```jsx
  const {config, page} = props;
  ```

- Hexo 自带的 helper 函数无法使用。

  因为这些函数是纯 js 拼接字符串，所以不能直接塞进 JSX。

  小部分 helper 函数可以直接用 `dangerouslySetInnerHTML` 重新包装一下。虽然不怎么优雅，但可算是能跑了。

  还有一些比较复杂，或者是生成多个标签的 helper 函数，需要整体重构成 JSX（比如生成 `<head>` 中 Open Graph 部分的[函数](https://github.com/YidaozhanYa/hexo-theme-stellaris/blob/main/layout/components/head/open_graph.jsx)。）

  helper 函数也可以直接从 props 中解包。

  ```jsx
  const {scroll_reveal, __} = props;
  ```

- 组件属性的继承问题。

  Hexo 中，这些属性、函数等原本是全局变量，但在 React 组件中是 props，所以直接无脑继承 props 即可（什）

  ```jsx
  <Comments {...props}/>
  ```

- 渲染好的页面内容不是组件，无法在全局布局 `layout.jsx` 中直接使用。

  那还能怎么办，`dangerouslySetInnerHTML` 呗。一堆组件中夹杂着一个 `dangerouslySetInnerHTML`，虽然难看点，但也不是不能跑。

  （[Icarus 主题也是这么干的](https://github.com/ppoffice/hexo-theme-icarus/blob/master/layout/layout.jsx#L31)。）

  ```jsx
  {/* layout.jsx */}
  <div className={"l_main" + (page.content ? "" : " list")}>
      <Header {...props}/>
      <div dangerouslySetInnerHTML={{__html: body}}/>
      <Footer {...props}/>
      <MenuButton />
  </div>
  ```

### 🚀 使用 pjax 加快加载速度

Stellar 中使用 [instant.page](https://instant.page) 实现了网页预加载，但在切换页面的时候，仍会有短暂的白屏，体验相对较差。pjax 方案可以在换页的时候，让页面不刷新，阅读体验更好（特别是在夜间模式的时候）。

我使用了 [InstantClick](http://instantclick.io/) 这个 pjax 实现。

```jsx
{/*scripts.jsx*/}
<script src={theme.plugins.instant_click.js} data-no-instant="true"/>
<script data-no-instant="true" type="text/javascript">
    {"InstantClick.init();"}
</script>
{/*...*/}
<script src='/js/main.js' type="text/javascript" async={true} data-no-instant="true"/>
```

Stellar 中在 main.js 中创建了一个 `init` 对象，之后调用其初始化网页上的功能（如触发 Scroll Reveal 的动画效果和侧边栏的显示隐藏）。在引入 InstantClick 后，这个方法不再有用，因为这些代码只会在网页第一次加载的时候被执行。

使用 InstantClick 中的事件可以解决这个问题。

```javascript
const initAll = () => {
    init.toc();
    init.sidebar();
    init.hydrate();  // 见下文
    init.relativeDate(document.querySelectorAll('#post-meta time'));
    init.registerTabsTag();
    console.log(`New page loaded: ${window.location.pathname}`);
}

// init
InstantClick.on('change', () => {
    initAll();
});
initAll();
```

### 🌐 过旧浏览器检查

Stellar 主题本身使用了很多 CSS3 / ES6 新特性，并不和 IE 兼容，用 IE 打开的时候只有网站 logo，剩下就是一片白。

我用一个简单的小脚本，在 IE 和其他不支持 ES6 的浏览器上弹出警告。

```javascript
function checkOutdatedBrowser(){
    "use strict";
    if ("ActiveXObject" in window) {
        return false;
    }
    if (typeof Symbol == "undefined") return false;
    try {
        eval("class Foo {}");
        eval("var bar = (x) => x+1");
    } catch (e) {
        return false;
    }
    return true;
}

if (checkOutdatedBrowser() === false) {
    document.getElementById("start").innerHTML = '<div style="margin-top: 32px"><h1>喔唷!</h1><p><span>你的浏览器太老了，无法正常浏览本站。</span><br/><span>请升级你的浏览器。</span></p><hr/><p><span>支持的浏览器版本如下:</span><ul><li>Chrome 58+</li><li>Firefox 52+</li><li>Edge 14+</li><li>Opera 45+</li><li>Safari 10+</li></ul></p></div>';
}
```

### 🌊 前端的响应式问题

ReactDOMServer 在渲染 JSX 的时候，`onClick` 之类的事件并不会被渲染进 HTML，而是被写进 JS 中，通过一个名为 [hydration](https://www.gatsbyjs.com/docs/conceptual/react-hydration/) 的过程在前端注册事件。Hexo 只生成静态 HTML，所以即使在前端引入庞大的 React，也不能解决任何问题。

Stellar 主题使用了比较轻量的 jQuery 编写前端事件，所以我用 jQuery 变相实现了 React 的 hydration。先在后端用 `data-on-click` 写好事件，之后在前端处理，根据 `data-on-click` 属性值注册事件。

```jsx
{/*JSX 部分*/}
<a className="social share-item link on-click-event"
   data-on-click={`util.copy('copy-link', "${__('message.copied')}")`}
   key={item}
>
    <img src='/images/link_icon.svg' alt='link'/>
</a>
```

```javascript
/*前端部分*/
const init = {
    // ...
    hydrate: () => {
        stellar.jQuery(() => {
            const elements = $('.on-click-event');
            elements.each((e) => {
                const el = $(elements[e]);
                el.attr(
                    'onclick',
                    el.attr('data-on-click')
                )
                el.removeAttr('data-on-click')
            })
        })
    }
}
```

### 🌟 总结

最终，我得到了一个由现代技术驱动、语法<font size="2">相对</font>优雅、<font size="2">相对</font>易于维护的 Hexo 主题！

{%ghcard YidaozhanYa/hexo-theme-stellaris %}

欢迎试毒，并给我一颗 star！🌟
