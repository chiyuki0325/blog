---
layout: wiki
wiki: stellaris
title: 📰 数据集合类标签组件
---

## timeline 时间线

支持静态和动态时间线数据源：

- 写死在 Markdown 中的静态数据
- github issues，支持多种筛选参数，详见 [API](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-issues-assigned-to-the-authenticated-user)
- github releases，支持多种筛选参数，详见 [API](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#list-releases)
- gitea issues，支持多种筛选参数，详见 [API](https://docs.gitea.com/zh-cn/api/1.20/#tag/issue/operation/issueListIssues)
- gitea releases，支持多种筛选参数，详见 [API](https://docs.gitea.com/zh-cn/api/1.20/#tag/repository/operation/repoListReleases)

静态数据：

{%split%}

<!--cell left-->

{%timeline%}

<!-- node 第一步：打开 GitHub -->
打开 [Stellaris](https://github.com/chiyuki0325/hexo-theme-stellaris/) 的 GitHub 页面。
<!-- node 第二步：点击 Star -->
如果发现右上角的 Star 还没点亮，就点亮它！

{%endtimeline%}

<!--cell right -->

```markdown
{%timeline%}
<!-- node 第一步：打开 GitHub -->
打开 [Stellaris](https://github.com/chiyuki0325/hexo-theme-stellaris/) 的 GitHub 页面。
<!-- node 第二步：点击 Star -->
如果发现右上角的 Star 还没点亮，就点亮它！
{%endtimeline%}
```

{%endsplit%}

动态数据：

{%split%}

<!--cell left-->

{% timeline user:chiyuki0325 api:https://api.github.com/repos/chiyuki0325/hexo-theme-stellaris/issues %}
{% endtimeline %}

<!--cell right -->

```markdown
{% timeline user:chiyuki0325 api:https://api.github.com/repos/chiyuki0325/hexo-theme-stellaris/issues %}
{% endtimeline %}
```

{%endsplit%}

## sites 网站卡片

可用于制作友链页面。

在对应位置创建 yaml 配置文件，之后在其中写入站点信息即可。

```yaml blog/source/_data/links.yml
examples:
  - title: "風雪城"
    description: "这是本站！"
    url: https://blog.chyk.ink/
    avatar: https://q1.qlogo.cn/g?b=qq&nk=3526514925&s=640
    screenshot: https://imgsrc.chyk.ink/PTO28QW7YIwRkwzx.webp
  - title: "东北大学"
    description: "自强不息，知行合一"
    url: https://www.neu.edu.cn/
    avatar: https://www.neu.edu.cn/favicon.ico
    screenshot: https://imgsrc.chyk.ink/c6mYmDuwweKmzdRi.webp
```

```markdown
{% sites examples %}
参数写分组名。
```

{%sites examples%}

## friends 友链

可用于制作友链页面。

用法同 `sites`。

```markdown
{% friends examples %}
参数写分组名。
```

{% friends examples %}

## ghcard GitHub 卡片

```markdown 使用方法
{% ghcard chiyuki0325 %}
{% ghcard chiyuki0325/hexo-theme-stellaris theme:dark %}
```

加载需要一段时间，请耐心等待。

{% ghcard chiyuki0325 %}
{% ghcard chiyuki0325/hexo-theme-stellaris theme:dark %}

## toc 文档目录树

显示某 Wiki 的文档目录。

```markdown
{% toc wiki:xxx [open:true] title %}
```

{%tabs%}

<!--tab 示例-->

{% toc wiki:stellaris Stellaris 文档目录 %}

<!--tab 写法-->

```markdown
{% toc wiki:stellaris Stellaris 文档目录 %}
```

{%endtabs%}
