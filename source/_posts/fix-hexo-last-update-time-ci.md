---
title: ⏰ 修复 Hexo 博客在 CI 部署时，文章更新时间不正确的问题
date: 2023-04-05 22:19:42
tags:
- Hexo
category: 建站小记
---

我的 Hexo 博客近期出现了一个问题：文章的最近更新时间不正确，会导致显示出错、RSS bot 发癫等一系列问题。经过查询，发现是 CI 部署的锅。

<!--more-->

根据[这个 issue](https://github.com/theme-next/hexo-theme-next/issues/893) 的说法，CI 在执行 git clone 或 git pull 时，文件的修改日期会变为部署时的时间。可以通过自己写 `updated` 时间来修复，也可以使用一个脚本，读取 git 仓库中的修改日期，来覆盖实际文件的修改日期。

```bash
#!/usr/bin/env bash
git ls-files -z | while read -d '' path; do
    touch -d "$(git log -1 --format="@%ct" "$path")" "$path"
done
```

文中给了 Travis CI 的使用例，如下：

```yaml
# Restore last modified time
 - "git ls-files -z | while read -d '' path; do touch -d \"$(git log -1 --format=\"@%ct\" \"$path\")\" \"$path\"; done"
```

我的博客使用 Vercel 部署，所以我将这个脚本直接写到 `package.json` 中，并且在部署时执行该脚本。

```json
// package.json
{
  "scripts": {
    "fix-last-update": "./fix-last-update.sh",
    // ...
  },
  // ...
}
```

{%image https://imgsrc.baidu.com/forum/pic/item/77c6a7efce1b9d167cc567abb6deb48f8d5464fe.jpg %}

运行好脚本之后，修改日期就不会出错啦~
