---
layout: wiki
wiki: stellaris
title: 📏 MathJax 数学公式支持
---

在配置文件中启用 MathJax，以提供数学公式支持。与 KaTeX 只能二选一。

与 KaTeX 不同的是，MathJax 会在用户的浏览器中渲染数学公式，因此加载需要一定时间，但兼容性 _或许_ 会优于 KaTeX。

```yaml blog/_config.stellaris.yml
plugins:
  # 使用 MathJax 提供数学公式支持
  # 需在 Markdown 文件开头加入 mathjax: true
  # 推荐使用 Pandoc: npm uninstall hexo-renderer-marked --save & npm install hexo-renderer-pandoc --save
  mathjax:
    enabled: false # 设置为 true 以启用
    per_page: false # 启用后无需在文章开头加 mathjax: true 即可启用
    js: https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.6/MathJax.js?config=TeX-AMS-MML_HTMLorMML
```

之后，在某页面的 front-matter 中，设置 `mathjax: true` 即可对该页面启用 MathJax。

把你的数学公式，用 `$$` 符号包裹即可。
