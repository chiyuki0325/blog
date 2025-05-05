---
layout: wiki
wiki: stellaris
title: 🗨️ 接入评论系统
---

Stellaris 支持接入不同的评论系统，方便博客读者留言，增加互动性。

{% ablock ⚠️ 注意 color:yellow %}

- 我只测试过 Waline 评论系统，其余评论系统的支持均原封不动地从上游 Stellar 移植，若要使用请先自己做好测试。
- 如果您的网站需要备案，则接入评论系统会导致您的网站被视为交互型站点，请**谨慎接入评论系统**。

{%endablock%}

## Waline

```yaml blog/_config.stellaris.yml
comments:
  service: waline
  # Waline
  # https://waline.js.org/
  waline:
    js: https://unpkg.com/@waline/client@v3/dist/waline.umd.js
    css: https://unpkg.com/@waline/client@v3/dist/waline.css
    # Waline 服务器地址
    serverURL:

    ### 以下配置可能 **已经过时**。请参考 Waline 官方文档。
    # https://waline.js.org/reference/client/props.html

    # If false, comment count will only be displayed in post page, not in home page
    commentCount: true

    # Pageviews count
    pageview: false

    # 表情互动功能，可以直接设置 true 以启用默认表情，或是设置为自定义图片
    # reaction: true

    # Custom locales
    # locale:
    #   placeholder: Welcome to comment # Comment box placeholder

    # Custom emoji
    # emoji:
    #   - https://unpkg.com/@waline/emojis@1.2.0/weibo
    #   - https://unpkg.com/@waline/emojis@1.2.0/alus
    #   - https://unpkg.com/@waline/emojis@1.2.0/bilibili
    #   - https://unpkg.com/@waline/emojis@1.2.0/qq
    #   - https://unpkg.com/@waline/emojis@1.2.0/tieba
    #   - https://unpkg.com/@waline/emojis@1.2.0/tw-emoji

    # Comment infomation, valid meta are nick, mail and link
    # meta:
    #   - nick
    #   - mail
    #   - link

    # Set required meta field, e.g.: [nick] | [nick, mail]
    # requiredMeta:
    #   - nick
```

## 其它评论系统

Stellaris 还从上游 Stellar 移植了 Beaudar、Utterances、Giscus、Artalk 和 Twikoo 的支持。不过我未经测试，不确保可用性。

参见 [上游文档](https://xaoxuu.com/wiki/stellar/comments/#Beaudar) 以接入这些评论系统之一，如有发现 Bug，请提 [issue](https://github.com/chiyuki0325/hexo-theme-stellaris/issues) 反馈。
