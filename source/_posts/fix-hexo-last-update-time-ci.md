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
export TZ='Asia/Shanghai'
git ls-files -z | while read -d '' path; do
    if [[ $path == source/_posts/* ]]; then
        touch -d "$(git log -1 --format="@%ct" "$path")" "$path"
        printf "$(git log -1 --format="%ct" "$path" | xargs -I{} date -d @{} "+%Y-%m-%d %H:%M:%S")"
        printf \\t
        echo "$path"
    fi
done
```

之后根据你的部署方式，将这个脚本加入到工作流文件或其他配置文件中。

**注意：Vercel 尚不支持深层克隆，所以只能在 GitHub Actions 中部署。**

为方便调用，可以直接将这个脚本直接写到 `package.json` 中，并且在部署时执行该脚本。

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
