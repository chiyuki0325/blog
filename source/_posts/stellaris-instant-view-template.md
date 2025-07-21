---
title: ✈️ Stellaris 主题的 Telegram Instant View 模板
date: 2023-07-15 22:17:07
tags:
- Telegram
category: 建站小记
description: '本主题适配了 Telegram Instant View，你可以在此获取模板，并查阅官方文档了解如何使用。'
---

```
~version: "2.1"

?path: /20.+
body: //article

# 文章信息
title: $body//h1[@class="article-title"]/span
author: /html/head/meta[@property="article:author"]
channel: @yidaozhan_channel
published_date: $body//div[@id="post-meta"]/time[1]

# 删除不需要的元素
@remove: $body//div[has-class("article-footer")]

# 处理基本 HTML 元素
<strong>: $body//font[@color]

# 处理图片框
@set_attrs(src, @data-src): $body//img[@class="lazy"]
@wrap_inner(<sup>): $body//div[@class="image-meta"]//span
@split_parent($body//div[@class="tag-plugin image"]/div[@class="image-bg"])
@remove: $body//img[starts-with(@src, "data:")]

# 处理其它标签插件
<blockquote>: $body//div[@class="tag-plugin note"]
$bilicard: $body//div[@class="bvideo"]
@remove: $bilicard//p[@class="card-status"]
@remove: $bilicard//span[@class="duration"]
@inline: $body//iframe

# 处理 GitHub 卡片
~allowed_origin: "https://api.github.com"
@map($body//div[has-class("ghcard")]) {
  $card: $@
  $url: $card/a/@href
  @remove: $card/a
  @replace("https://github.com/", "https://api.github.com/repos/"): $url
  @load: $url
  $repo_info: $@
  
  $repo_name: $repo_info/full_name
  @wrap_inner(<span>): $repo_name
  @prepend(<div>, class, "ghcard-name-bar"): $card
  $name_bar: $@
  @prepend(<span>, class, "ghcard-github"): $name_bar
  @prepend_to($card//span[@class="ghcard-github"]): "GitHub: "
  @append(<a>, href, $url, class, "ghcard-name"): $name_bar
  @append_to($card//a[@class="ghcard-name"]): $repo_name
  
  $repo_desc: $repo_info/description
  @wrap_inner(<span>): $repo_desc
  @append(<div>, class, "ghcard-desc"): $card
  @append_to($card//div[@class="ghcard-desc"]): $repo_desc
  
  $repo_stars: "☆: "
  $repo_stars+: $repo_info/stargazers_count
  @append(<div>, class, "ghcard-stars"): $card
  @append_to($card//div[@class="ghcard-stars"]): $repo_stars
  
  <blockquote>: $card
  @debug: $card
}

# 再次处理图片框
@split_parent: //a/img
@split_parent: //p/img
@while(//blockquote//img) {
  @split_parent: //blockquote//img
}

# 处理代码框
$code_blocks: $body//figure[has-class("highlight")]
@split_parent: $code_blocks//td[@class="code"]//pre
@remove: $code_blocks//td[@class="gutter"]
@repeat(2) {
  @split_parent: $code_blocks//pre
}
@remove: $code_blocks/table/*[not(self::pre)]
@replace_tag(<span>): $code_blocks/table
@remove: $code_blocks/span
@set_attr(data-codeblock, "true"): $code_blocks
@replace_tag(<div>): $code_blocks
$code_blocks: $body//div[@data-codeblock="true"]

@map($code_blocks) {
  $block: $@
  @set_attr(class, null): $block//span
  @while($block//span/span) {
    @split_parent: $block//span/span
  }
  @combine: $block//span/following-sibling::*[1]/self::span
  @debug: $block
}
```
