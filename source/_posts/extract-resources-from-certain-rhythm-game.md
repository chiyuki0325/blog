---
title: 🎼 某款心胸狭窄的公司开发的音乐游戏的资源提取小记
date: 2023-05-21 18:44:50
tags:
- 音游
- 逆向
category: 游戏
references:
- title: '六、获取密钥 – UNI’S ON AIR资源提取逆向全记录'
  url: 'http://web.archive.org/web/20220528140408/https://blog.touuki.com/archives/287'
cover: 'https://imgsrc.baidu.com/forum/pic/item/241f95cad1c8a786f57546c32209c93d71cf509b.jpg'
---

最近解包了某款心胸狭窄的公司开发的音乐游戏，从里面提取出了所有歌曲的无损音频和 BGA。那么在此记录一下解包的大致过程，和其中遇到的小问题。

<!--more-->

> ⚠️ 请注意：本文及作者与该公司及该音乐游戏没有任何关系。
>
> 下文的路径及代码中用 TheGame 代指这款游戏。
>
> 如果您认为此文章侵犯了您的版权，请 [联系我](mailto:ydz@yidaozhan.top) 删除。

### ▶️ 概览

我的目的是提取所有歌曲和曲绘，并合并成带信息的 flac 文件以收藏。

这款游戏使用 Unity 引擎开发，其中视频和音乐文件都使用了 CriWare 开发的容器格式，并使用密钥加密，图片文件使用了 Unity 的 assets bundle 容器格式。需要使用不同方法提取资源。

### 🗃️ 0. 得到资产文件夹

如果你拿到的游戏是 vhd 格式，请先使用 `guestmount` 命令行工具或打了特定补丁的 7-zip 从中提取出资产文件夹（`TheGame_Data`）。

### 🔐 1. 获取 CriWare 密钥

根据 [此博文](http://web.archive.org/web/20220528140408/https://blog.touuki.com/archives/287) 的介绍，可以使用 Il2cppDumper 和 AssetStudio 获取 CriWare 密钥。

这款游戏的目标平台是 Windows，没有使用 il2cpp，所以只需要使用 AssetStudio 就可以获得密钥。

> Tips: 由于该游戏资产文件夹过大（40GB+），可以先复制一份不带 `StreamingAssets` 的资产文件夹，在 AssetStudio 中进行操作。

当 AssetStudio 提示 Select Assembly Folder 时，直接选择 Managed 文件夹即可。

{%image https://imgsrc.baidu.com/forum/pic/item/55e736d12f2eb9389e59763f90628535e4dd6fc2.jpg 成功地得到了密钥！ %}

### 🎵 2. 解密并转换歌曲

游戏的所有音频资源位于 `TheGame_Data/StreamingAssets/A000/SoundData` 文件夹下，使用 AFS2 (*.acb / *.awb) 格式进行打包。

`Voice` 开头的为界面语音，`Voice_Partner` 开头的为旅行伙伴语音，`music` 开头的为歌曲文件，剩下的是界面背景音乐。这里我只取歌曲，其它音频资源同理。

使用 [CriTools](https://github.com/kohos/CriTools) 就可以把这些歌曲文件转换为 wav。

```bash
node index.js acb2wavs '/path/to/SoundData' -k THE_GAME_KEY
```

转换为 wav 之后，我使用了下面几条命令整理文件，并转换为 flac 格式。

```bash
for sound in ./SoundData/*; do mv "./SoundData/${sound}/stream_1.wav" "./sound/${sound}.wav"; done
cd sound
for sound in ./*; do ffmpeg -i "${sound}" "${sound/wav/flac}"; done
```

我们就得到了以 `music00XXXX.flac` 为文件名的歌曲文件。可以直接播放，也便于后续操作。

其码率为 1024 Kbit/s，采样率为 44.1 KHz。

### 🖼️ 3. 转换曲绘

游戏的图像资源位于 `TheGame_Data/StreamingAssets/A000/AssetBundleImages` 文件夹中。

曲绘位于 `jacket` 文件夹中。这里我只取曲绘，其它图像资源同理。

使用 AssetStudio 可以直接把这些 ab 文件中的 png 图片文件提取出来。

{%image https://imgsrc.baidu.com/forum/pic/item/71cf3bc79f3df8dc9530835c8811728b461028e9.jpg %}

### ℹ️ 4. 给 flac 添加歌曲信息和曲绘

游戏的歌曲信息储存于 `music`、`musicVersion`、`musicGenre` 几个文件夹中的 XML 文件中。

我编写了如下的 Python 脚本以给 flac 添加歌曲信息和曲绘。

```python
#!/usr/bin/env python3

from pathlib import Path
from xml.dom.minidom import parse as parse_xml
from mutagen.flac import FLAC, Picture
import shutil

# 常量
MUSIC_VERSION_DIR = Path('./StreamingAssets/A000/musicVersion/') 
MUSIC_GENRE_DIR = Path('./StreamingAssets/A000/musicGenre/') 
MUSIC_DATA_DIR = Path('./StreamingAssets/A000/music/')
SOUND_FLAC_DIR = Path('/home/yidaozhan/sound/')
JACKET_PNG_DIR = Path('/home/yidaozhan/jackets/')
OUTPUT_DIR = Path('/home/yidaozhan/output')

# 数据
music_version = {}
music_genre = {}
music_data = {}

for dir in MUSIC_VERSION_DIR.iterdir():
    if dir.is_dir():
        document = parse_xml(open(dir / 'MusicVersion.xml')).documentElement
        music_version[document.getElementsByTagName('version')[0].childNodes[0].data] = document.getElementsByTagName('genreName')[0].childNodes[0].data

for dir in MUSIC_GENRE_DIR.iterdir():
    if dir.is_dir():
        document = parse_xml(open(dir / 'MusicGenre.xml')).documentElement
        music_genre[document.getElementsByTagName('name')[0].getElementsByTagName('id')[0].childNodes[0].data] = document.getElementsByTagName('genreName')[0].childNodes[0].data

for dir in MUSIC_DATA_DIR.iterdir():
    if dir.is_dir():
        if (dir / 'Music.xml').exists():
            document = parse_xml(open(dir / 'Music.xml')).documentElement
            id = (document.getElementsByTagName('name')[0].getElementsByTagName('id')[0].childNodes[0].data).zfill(6)[-4:].zfill(6)
            song_name = document.getElementsByTagName('name')[0].getElementsByTagName('str')[0].childNodes[0].data
            artist_name = document.getElementsByTagName('artistName')[0].getElementsByTagName('str')[0].childNodes[0].data
            if '曲：' in artist_name:
                artist_name = artist_name.replace('曲：', '').replace('／歌：', ' feat. ').split('[')[0]
            # 防止超过文件名字符上限
            genre_id = document.getElementsByTagName('genreName')[0].getElementsByTagName('id')[0].childNodes[0].data
            version = (document.getElementsByTagName('version')[0].childNodes[0].data)[0:3]+'00'
            music_data[id] = {
                'song': song_name,
                'artist': artist_name,
                'album': music_genre[genre_id] + ' (' + music_version[version] + ')',
            }

for music_file_orig in SOUND_FLAC_DIR.iterdir():
    if music_file_orig.is_file():
        id = music_file_orig.stem[-6:]
        music_file = OUTPUT_DIR / ('Music ' + id[2:] + '.flac')
        # 界面曲和某些歌曲没有信息，直接命名为「Music 00xx.flac」
        shutil.copy(
            music_file_orig,
            music_file
        )

        if id in music_data:
            # 重命名歌曲
            new_filename = music_data[id]['artist'] + ' - ' + music_data[id]['song'] + '.flac'
            # 删除不兼容的字符
            new_filename = new_filename.replace('/', '／').replace('\\', '＼').replace(':', '：').replace('*', '＊').replace('?', '？').replace('"', '＂').replace('<', '＜').replace('>', '＞').replace('|', '｜')
            if 'CV.' in new_filename:
                new_filename = new_filename.split('／CV')[0]
            music_file.rename(
                OUTPUT_DIR / new_filename
                )
            music_file = OUTPUT_DIR / new_filename

        if id in music_data:
            # 添加头部信息
            audio_file = FLAC(music_file)
            audio_file['title'] = music_data[id]['song']
            audio_file['artist'] = music_data[id]['artist']
            audio_file['album'] = music_data[id]['album']
            audio_file['albumartist'] = music_data[id]['artist']
            audio_file.save()
        
        jacket_file = JACKET_PNG_DIR / f'UI_Jacket_{id}.png'
        if jacket_file.exists():
            # 添加曲绘
            picture = Picture()
            picture.type = 3
            picture.mime = 'image/png'
            if id in music_data:
                picture.desc = music_data[id]['song']
            picture.data = open(jacket_file, 'rb').read()
            audio_file.add_picture(picture)
            audio_file.save()
```

### 🤗 5. 成果

提取成功！

{%image https://imgsrc.baidu.com/forum/pic/item/f703738da9773912392489acbd198618377ae2f9.jpg %}

你可以在一刀斩の小窝的 Telegram 频道中获取这些歌曲。

### 📽️ 6. 解密并转换 BGA

游戏的 BGA 使用 CriWare 的 USM 格式加密，位于 `TheGame_Data/StreamingAssets/A000/MovieData` 中。

使用 [WannaCRI](https://github.com/donmai-me/WannaCRI) 工具可以把这些 USM 文件 (后缀名实际上为 dat) 转换为 ivf 格式视频。

```bash
python -m wannacri extractusm ./StreamingAssets/A000/MovieData -k THE_GAME_KEY
```

之后就可以使用 ffmeg 将其转换为 mp4 了。其分辨率为 1080*650，帧率为 30 FPS，码率为 2 Mbit/s。

转换 BGA 极其吃 CPU，速度也很慢，并且大部分 BGA 都可以在视频网站上找到。这是个吃力不讨好的工作，所以我并没有转换，只是将方法写在这里。感兴趣的可以自己转换试试。
