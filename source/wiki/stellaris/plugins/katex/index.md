---
layout: wiki
wiki: stellaris
title: 📐 KaTeX 数学公式支持
---

启用 KaTeX 以提供数学公式支持。与 MathJax 只能二选一。

首先，卸载原本的 `marked` 渲染器，之后安装 `markdown-it-plus` 渲染器。它会使用 Katex 在 `hexo generate` 期间把所有数学公式渲染为 HTML。

```bash
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-markdown-it-plus --save
# 如果你使用其它的包管理器，请自行搜索用法
```

之后在配置文件中启用。

```yaml blog/_config.stellaris.yml
plugins:
  # 使用 KaTeX 提供数学公式支持
  # 使用 hexo-renderer-markdown-it-plus 在服务端进行渲染 KaTeX 公式
  # 需要先卸载原本的渲染器，安装 hexo-renderer-markdown-it-plus 作为新的渲染器
  katex:
    enabled: true # 设置为 true 以启用
    css: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css
```

把你的数学公式，用 `$$` 符号包裹即可。

{%tabs%}

<!-- tab 效果 -->

$$f(x) = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \cdots + \frac{f^{(n)}(a)}{n!}(x - a)^n + R_n(x)$$

$$\int \frac{1}{\sqrt{1 - x^2}} \, dx = \arcsin x + C$$

<!-- tab 写法 -->

```markdown posts/xxx.md
$$f(x) = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \cdots + \frac{f^{(n)}(a)}{n!}(x - a)^n + R_n(x)$$
$$\int \frac{1}{\sqrt{1 - x^2}} \, dx = \arcsin x + C$$
```

{%endtabs %}