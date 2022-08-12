---
title: 🔎 在 KDE Dolphin 文件管理器上实现类苹果的「快速查看」
date: 2022-05-04 21:18:14
tags: 
- KDE
category: Arch折腾记
---

今天看到一个安利苹果电脑的视频，发现有个功能特别好用，就是「快速查看」，选中一个文件按空格就可以概览内容。而在 Linux 这边，GNOME 桌面有类似的功能，也有两个第三方软件包 `gloobus-preview` 和 `hawkeye-quicklook` 实现了类似的功能，但都并不完美，各自支持的 Mime Type 也不同，所以要自己实现。

在搜寻一番后发现，KDE Dolphin 文件管理器并没有向第三方开放获取当前选中文件的 DBus API，也不支持给 Service Menu 自定义快捷键，于是只能间接通过剪贴板解决，就写出了这个铸币脚本。

```bash
#!/bin/bash
# 通过某种奇怪方式实现类 Mac OS 的 「快速预览」
# 依赖：xclip xdotool sushi gloobus-preview hawkeye-quicklook-git (AUR)
# GitHub 已经不支持 git:// 克隆，于是需要修改 hawkeye-quicklook-git 的 PKGBUILD，git:// 改为 git+https:// 。


xclip -selection clipboard -o > /tmp/selection # 备份当前剪贴板
xdotool key  --delay 0 --clearmodifiers Ctrl+c # 复制选中文件

FILE_PATH=`xclip -selection clipboard -o | sed 's|^file://||'`
FILE_NAME="`basename "$FILE_PATH"`"
# 获取文件名

FILE_MIME=`file --mime-type "$FILE_PATH" | awk -F": " '{print $2}'`
FILE_MIME_1=`echo $FILE_MIME | awk -F"/" '{print $1}'`
FILE_MIME_2=`echo $FILE_MIME | awk -F"/" '{print $2}'`
# 获取 mimetype
if [ ${FILE_NAME: -3} == ".md" ]; then
    # markdown 使用 hawkeye 打开
    hawkeye --uri="file://${FILE_PATH}"
elif [ ${FILE_NAME: -4} == ".xml" ]; then
    # xml 使用 gloobus-preview 打开
    gloobus-preview "$FILE_PATH"
else
    if [ $FILE_MIME_1 == "text" ]; then
        if [ $FILE_MIME_2 == "plain" ]; then
            sushi "$FILE_PATH"
        else
            gloobus-preview "$FILE_PATH"
        fi
    else
        if [[ $FILE_MIME_1 == "image" ]] || [[ $FILE_MIME_1 == "audio" ]] || [[ $FILE_MIME_1 == "video" ]] || [[ $FILE_MIME_2 == "pdf" ]]; then
            sushi "$FILE_PATH"
        else
            gloobus-preview "$FILE_PATH"
        fi
    fi
fi
# 根据文件类型弹出不同预览窗口

xdotool keyup Ctrl # 松开 Ctrl
xdotool keyup space # 松开 Space
sleep 0.08s # 等待窗口开启
WINDOW_ID=`xdotool search --name "$FILE_NAME"` # 获取窗口 ID
WINDOW_ID=`echo $WINDOW_ID | sed "s/\n/ /"` # 没毛用，玄学东西，降低出错率
xdotool windowactivate $WINDOW_ID # 将窗口置于前台

xclip -i -selection clipboard < /tmp/selection # 导入备份的剪贴板文件
rm /tmp/selection # 删除备份，清理内存
```

之后绑定一个窗口范围的自定义快捷键到这个 shell 脚本就行了。

![http://imgsrc.baidu.com/super/pic/item/a71ea8d3fd1f4134524b9aa8601f95cad0c85eec.jpg](http://imgsrc.baidu.com/super/pic/item/a71ea8d3fd1f4134524b9aa8601f95cad0c85eec.jpg)

可以新建组，之后这么匹配 dolphin 窗口。

