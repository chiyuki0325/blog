---
title: ✌️ 入门现代前端，使用 Vue.js 编写简单的响应式 HTML 网页
date: 2023-02-12 21:09:21
tags:
- JavaScript
- 前端
category: 网络
---

Vue.js 是一个易学易用，性能出色，适用场景丰富的**渐进式** Web 前端框架。 它适用于各种场景，可以配合*基于 Node.js 的构建系统*编写大型前端项目和单页应用程序，也可以用于渐进式增强静态 HTML。

对比传统的 HTML + JS，Vue 可以直接面向数据操作，而不用操作 DOM。

<!--more-->

<style>
.html-frame {
border: 1px solid grey;
border-radius: 4px;
padding: 8px;
}
</style>


### 🌐 古代的原始代码

下面是一个用 jQuery 编写的计数按钮和计时器。本文就要用比较现代的方式，把它用 Vue 改造一遍。

<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.3/jquery.min.js"></script>

<div class="html-frame">
<button id="counter" data-click-times="0">Click Times: 0</button>
<div id="timer">0</div>
</div>

<script>
    $('#counter').click(() => {
        const newClickTimes = parseInt($('#counter').attr('data-click-times')) + 1;
        $('#counter').attr('data-click-times', newClickTimes);
        $('#counter').text('Click Times: ' + newClickTimes);
    })
    setInterval(() => {
        const newTimer = parseInt($('#timer').text()) + 1;
        $('#timer').text(newTimer);
    }, 1000);
</script>

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.3/jquery.min.js"></script>

<button id="counter" data-click-times="0">Click Times: 0</button>
<div id="timer">0</div>
<script>
    $('#counter').click(() => {
        const newClickTimes = parseInt($('#counter').attr('data-click-times')) + 1;
        $('#counter').attr('data-click-times', newClickTimes);
        $('#counter').text('Click Times: ' + newClickTimes);
    })
    setInterval(() => {
        const newTimer = parseInt($('#timer').text()) + 1;
        $('#timer').text(newTimer);
    }, 1000);
</script>
```

### 📥 引入 Vue.js

相比于传统的 `<script>` 标签，**现代**浏览器支持另一种引入 JavaScript 的方式：ES 模块。

首先把原来的脚本改为 ES 模块：`<script>` -> `<script type="module">`

之后用 ES 模块的方式导入 Vue：

```javascript
import { createApp } from 'https://cdn.bootcdn.net/ajax/libs/vue/3.2.47/vue.esm-browser.min.js';
```

### 📔 创建 Vue 应用

使用 `createApp` 创建 Vue 应用。


```javascript
const vm = createApp(); // 创建 Vue 应用
```

<font size="2">(虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。—— Vue.js 文档)</font>

之后，在这个应用中填入数据。

```javascript
const vm = createApp({
    data() {
        return {
            clickTimes: 0,  // 按钮的点击次数
            timer: 0  // 计时器走过的秒数
        }
    }
});
```

Vue 使用一种[模板语法](https://cn.vuejs.org/guide/essentials/template-syntax.html)，可以很轻松地把数据套到 HTML 中，所以只需要修改数据，而并不需要直接操作 HTML DOM。

使用模板语法改写原来的 HTML 元素：

```html
<button>Click Times: {{clickTimes}}</button>
<div>{{timer}}</div>
```

<font size="2">(此时 id 就没什么用了，因为我们是直接操作数据，所以不需要通过 id 选中元素，也不需要通过 data 变量修改元素)</font>

之后，把这些元素装入一个叫 app 的 div 中，并且，把 Vue 应用装载到这个 div 上。之后，这个 div 中的内容就会被 Vue 全面接管。

```html
<div id="app">
	<button id="counter">Click Times: {{clickTimes}}</button>
	<div id="timer">{{timer}}</div>
</div>
```

```javascript
vm.mount('#app');
```

刷新页面之后，Vue 中的数据就被装载到了这两个 HTML 元素上。

### ✅ 添加响应式事件

在应用中加入一个方法，用于修改按钮点击次数的数据。

```javascript
methods: {
    clickTimesIncrement() {
        this.clickTimes++;
        // 此处的 this 表示的就是 vm
        // 如果有用到 xhr.onreadystatechange = () => {}
        // 之类套函数的情况，可以在嵌套函数外面 const vm = this;
    }
}
```

给刚才的按钮加入事件，在点击时执行这个方法：

```html
<button @click="clickTimesIncrement()">
    Click Times: {{clickTimes}}
</button>
```

<font size="2">(`@click` 实际上是 `v-on:click` 的简写)</font>

这样按钮在点击时，就会激活应用的 `clickTimesIncrement` 方法，之后修改数据，按钮上的文字也随着数据被自动修改。

### ⏰ 生命周期中的计时器

每个 Vue 应用和组件都有自己的生命周期，我们可以在特定的生命周期阶段执行自己的函数。

```javascript
mounted() {
    setInterval(
        () => {this.timer++},
        1000
    );
}
```

在 Vue 应用被装载的阶段，我们执行 `setInterval`，每秒钟把计时器的秒数 +1。

### 🕰️ 阶段小结

现在整个 HTML 文件看起来像这样：

```html
<div id="app">
    <button id="counter" @click="clickTimesIncrement">Click Times: {{clickTimes}}</button>
    <div id="timer">{{timer}}</div>
</div>

<script type="module">
    import { createApp } from 'https://cdn.bootcdn.net/ajax/libs/vue/3.2.47/vue.esm-browser.min.js';
    const vm = createApp({
        data() {
            return {
                clickTimes: 0,
                timer: 0
            }
        },
        methods: {
            clickTimesIncrement() {
                this.clickTimes++;
            }
        },
        mounted() {
            setInterval(
                () => {this.timer++},
                1000
            )
        }
    })
    vm.mount('#app')
</script>
```

Vue.js 中，不需要直接操作 HTML，一切操作都是在操作数据，之后 HTML 跟随数据更新。这就是现代前端框架的魅力。

### 🧩 组件化以复用代码

作为一个现代前端框架，Vue.js 可以把 UI 的各个部分封装成组件，以最大化地复用代码。

Vue.js 支持两种组件格式：单文件组件 (`.vue`) 和普通的 js 组件 (`.js`)。单文件组件需要*基于 Node.js 的构建系统*，在编译期间被编译成 JavaScript。此处以普通 js 组件为例。

一个 js 组件也是一个 ES 模块，所以使用 export 和 import 语法。

组件以大驼峰法命名。

```javascript
//CounterButton.js
export default {
    data() {
        return {
            clickTimes: 0
        }
    },
    methods: {
        clickTimesIncrement() {
            this.clickTimes++;
        }
    },
    template: (
        `<button id="counter" @click="clickTimesIncrement">
            Click Times: {{clickTimes}}
        </button>`
    )
} 
```

```javascript
//Timer.js
export default {
    data() {
        return {
            timer: 0
        }
    },
    mounted() {
        setInterval(
            () => {this.timer++},
            1000
        )
    },
    template: (
        `<div id="timer">
            {{timer}}
        </div>`
    )
} 
```

组件化之后的主 HTML 变得很小，只需要导入组件即可。

```html
<div id="app">
    <counter-button></counter-button>
    <timer></timer>
</div>

<script type="module">
    import { createApp } from 'https://cdn.bootcdn.net/ajax/libs/vue/3.2.47/vue.esm-browser.min.js';
    import CounterButton from './CounterButton.js';
    import Timer from './Timer.js';

    const vm = createApp({
        components: {
            CounterButton,
            Timer
        }
    })
    vm.mount('#app')
</script>
```

### 🌐 现代的全新代码

<iframe src="/static/vue.html" class="html-frame"></iframe>

