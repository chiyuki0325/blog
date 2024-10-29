---
{
  "title": "🚩 Hackergame 2023 赛后总结 + 个人思路",
  "date": "2023-11-04 19:14:54",
  "tags": ["CTF"],
  "cover": "https://imgsrc.chyk.ink/0ff41bd5ad6eddc46f22d2ce7fdbb6fd52663339.webp"
}
---

Hackergame 2023 算是我第一次正经参加 CTF 比赛，使我学到了很多东西。于是现在我就来写一点想说的话。

<!--more-->

去年从群友那里得知了 Hackergame 2022，然而当时的我连 JavaScript 都一窍不通，只做出来了签到题，然后用 VB 手写大数字计算[解出来了 Xcaptcha](https://github.com/YidaozhanYa/MyVBMag1c/tree/main/Hackergame%202022/Xcaptcha)，之后在比赛结束之后我看了题解，就打开了新世界的大门。

一年之后，Hackergame 2023 如期举行。现在的我已经掌握了一些 JavaScript，就想着去混一混，把简单的 web 题的分都拿到手再说，然后做着做着就顺手拿下了几道 general 题，随着搜索，又学到了很多东西。我并没有学过计算机网络、算法和二进制逆向方面的知识，放弃了绝大部分 math 和 binary 题目，然而最终还是拿到了 216 / 2386 的排名，属实是意料之外。

>  由于本文并不属于严格意义上的题解，也并不会提交到题解仓库~~去丢人~~，因此我只写我在解题过程中遇到的问题和部分「碰了壁」的思路。并且因为我一开始没有打算写这篇文章，因此解开很多题的代码都没有留下来，而是放在 tmpfs 中随着关机一起消失了。显然如果作为「题解」，**官方的还是更具参考和学习价值**。

### 🚩 ✅ 签到题

Hackergame，启动！

和去年一样，签到题的套路依旧是改 url 参数，不过这次的签到题确实略显抽象了，直接致敬二字游戏可还行。

{%image https://imgsrc.chyk.ink/dbb44aed2e738bd4c409d304e78b87d6277ff9df.webp %}

### 🐱 ✅ 猫咪小测

~~这次居然不是叫猫咪问答）~~

第四问我直接搜索了 `Python type hints dead loop`（由于并不知道 `halting` 一词 ww），于是搜索到了[/这篇文章](https://drops.dagstuhl.de/opus/volltexte/2023/18237/pdf/LIPIcs-ECOOP-2023-44.pdf)，我能在文章信息处发现的缩写只有 DROPS、LIPIcs 和 ECOOP。依次尝试，最后发现 ECOOP 是正确答案。

在解这道题的过程中，我也是第一次拜访了学术网站 arXiv，之前在很多 AI 的仓库中见到过 arXiv 的链接，这次也是头一回一睹真容。~~不过我感觉它的站内搜索并不是很好用，第二问的信息最终还是通过谷歌搜到的。~~

### 🚢 ✅ 更深更暗

由于页面是随着滚动往下无限生成的，所以即使用 Ctrl+F 搜索 `flag{` 也不可能翻到底，网页会直接继续生成下去。解法就是不滚动，在 F12 的「搜索 HTML」中搜索 `flag{` 即可。~~当然也可以高速滚动配合录屏，然后一眼盯帧~~

### ♟️ ✅ 赛博井字棋

在 F12 中能直接看到点击棋子发送请求。我并没有使用[官方题解](https://github.com/USTC-Hackergame/hackergame2023-writeups/tree/master/official/%E8%B5%9B%E5%8D%9A%E4%BA%95%E5%AD%97%E6%A3%8B)的「吃子法」而是直接在 F12 中发请求落子。于是很简单地就通过了。

不过顺带一提，这道题的官方题解写得是真的详细，~~很适合用来入门？~~

### 🈸 ✅ 组委会模拟器

[官方的解法](https://github.com/USTC-Hackergame/hackergame2023-writeups/tree/master/official/%E7%BB%84%E5%A7%94%E4%BC%9A%E6%A8%A1%E6%8B%9F%E5%99%A8)是直接使用 `setInterval()` 来定时点击含有 `hack[` 的消息，而我显然是多虑了，采用了 `MutationObserver` 来点击。

但由于「**方括号**内均为小写英文字母」，可能存在含有数字的干扰选项，第一次并没有成功，于是我又加了个正则判断来检测是否全为小写英文字母。事实证明，我还是多虑了，~~第一次只是因为把浏览器切到了后台，F12 中的 js 暂停执行从而漏掉了几条而已。~~

```javascript
(new MutationObserver((mutationList,observer) => {
    const regex = /hack\[(\b[a-z]+\b)\]/
    const nodes = document.querySelector(".fakeqq-container").childNodes
    const element = nodes[nodes.length - 3].firstChild.childNodes[1].childNodes[1]
    const text = element.innerText
    if (regex.exec(text) != null) {
        const event = document.createEvent('Event')
        event.initEvent('click', true, true)
        setTimeout(() => element.dispatchEvent(event), 100)
    }
})).observe(
    document.querySelector(".fakeqq-container"),
    {attributes: false, childList: true, subtree: false}
)
```

### 📡 ✅ 虫

这道题和之前[池塘铸币厂的群友赛](/2023/09/30/zhongqiu-group-friend-puzzles-writeup/#%E6%B1%A0%E5%A1%98)撞了思路，于是我上来想都没想直接打开 QSSTV，轻松拿下。

再次感谢池塘让我知道了 SSTV。

### 📤 ✅ Git? Git!

我解出这道题竟然是通过 [CSDN 上的文章](https://blog.csdn.net/logan_LG/article/details/81531796) ... 没想到啊。因为搜索「git 恢复撤销的提交」第一个出来的中文文章就是 CSDN。不过，CSDN 终于难得管用了一回。

看来 git 还有好多我没发现的神奇操作啊。

### 🧮 ✅ JSON ⊂ YAML?

翻阅 [YAML 1.2 官方文档](http://yaml.org/spec/1.2-old/spec.html#id2759572)，我先解出了第二问。经过一番搜索后，也搜出了[第一问的答案](https://stackoverflow.com/questions/21584985/what-valid-json-files-are-not-valid-yaml-1-1-files)。

难得和官方的解题思路对上一回。

### 📦 ✅ Docker for Everyone

我不喜欢 Docker，然而这道题排在前面，说不定很简单，我就尝试做了一下，没想到真的很简单 ... 用了一下之前打包 linuxqq-nt-bwrap 得出的经验，把 `/dev/shm` 文件夹 mount 到容器内就可以直接访问到了。

[官方题解](https://github.com/USTC-Hackergame/hackergame2023-writeups/tree/master/official/Docker%20for%20Everyone)中还提到了 rootless container 之类的现代概念，不过我并不是很想去了解。~~毕竟我自己的 vps 上，Docker 容器还在用 systemd 管理呢，哪管他什么 rootful 不 rootless 的。~~

### 📨 ✅ 高频率星球

因为 `less` 的输出中包含很多的 ANSI 控制字符，于是我写了个脚本把每个带 ANSI 控制字符的行都打上了注释，然后去除掉出现了很多很多遍的带 ESC 的行，之后手动去除剩下的行。

这个过程真的很繁琐，并且因为高频率星人输出太快，带 ESC 的行还有没来得及加上回车的，还得手动排查。搞了 2 个小时终于得出了结果。

不过 huige 佬直接使用了[现成的库](https://github.com/USTC-Hackergame/hackergame2023-writeups/blob/master/players/huige233/wp.md#-%E9%AB%98%E9%A2%91%E7%8E%87%E6%98%9F%E7%90%83)，很好地照应了「**现代编程的本质就是调库**」这句话，唉，现代技术 ...

### 🆒 ✅ 惜字如金 2.0

这道题的分类是 math，考过数学班级倒第一的我本想放弃，但是群友和我说「其实没有多复杂的」，于是我就试了一试。虽然没写出「反惜字如金」的算法，但我通过手动输入每一个 `cod_dict` 条目的「creat 原则」可能解（五条，每条大概五六种吧），然后用脚本生成「referer 原则」的可能解，最后拼合成最终的 `cod_dict`，还是碰出了最终的 flag。

另外，我不是很喜欢惜字如金原则，因此我写代码的时候还是会尽可能使用 create 和 referrer 等正确拼写的英文单词。

### 🤳 ✅ 奶奶的睡前 flag 故事

这道题要求从一张被裁剪过的截图中获取 flag。做这道题一共花了我四天。

第一天：我以为题目会很简单地在 PNG 的文件尾部用明文写 flag，于是用十六进制编辑器拉到底，发现明晃晃的四个大字 IEND，只好*暂时*放弃。

第二天：截图的大小是约 400 KB，大得有些不正常，于是我怀疑是图片的尺寸信息被经过了修改。

在查阅[相关资料](https://blog.csdn.net/qq_60131542/article/details/123450382)（怎么又是 CSDN ...）得知，PNG 的每个数据块都有 CRC32 校验。我把尺寸改回去之后，死活算不出正确的 CRC32。在 [CTF Wiki](https://ctf-wiki.org/misc/picture/png/#ihdr) 上我发现 Windows 图片和传真查看器并不会进行 CRC32 校验，而我当时还在学校用[破烂红米](/2023/09/17/redmi-1s4g-notes/)解题，只好*暂时*休整等待使用电脑的机会。

第三天：第三天晚上拿到了电脑，于是我修改了尺寸，然后使用图片和传真查看器打开，结果发现下面是一片白。

按照昨天看的 [CTF Wiki 条目](https://ctf-wiki.org/misc/picture/png/#idat)，我安装了 `pngcheck`，`pngcheck` 提示 `additional data after IEND chunk`。唔 ... IEND 块后面明明没有东西啊 ... 不死心的我用十六进制编辑器再看了一遍，发现有两个 IEND 数据块，第一个 IEND 块后面还有一个残缺的 PNG 文件。

之后我尝试了各种不同的 PNG 头部数据块，都没有成功打开这张残缺的 PNG。

第四天：这天晚上我按照题目里的提示（**谷歌『亲儿子』**的老手机），把电脑挂着下载 Android Studio 和 Android SDK 准备去 AVD 里一探究竟，然后开始刷起了视频。突然，我刷到了这条视频 ...

{%bilicard av698750249 %}

原来这竟然是一个谷歌 Pixel 截图软件的漏洞。重看了一遍题目，我豁然开朗。在我印象里，谷歌这种国际大厂是不可能犯出这张低级错误的啊？

使用漏洞发现者的[恢复工具](https://acropalypse.app/)，我顺利地从图片里拿到了 flag。如果不是 B 站给我推这条视频，我怕不是跳不出「谷歌这种大厂不可能犯低级错误」的思维定式，从而彻底做不出这道题了。

### 📶 ✅ HTTP 集邮册

在做这道题时，我查阅了 [Mozilla 的文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)，然后按照文档里的状态码挨个尝试（~~我甚至尝试了发送 BREW 请求来让 nginx 煮咖啡~~），最终还得到了一个比较意外的解。我在此写几个令我印象深刻的状态码。

**431 Request Header Fields Too Large**（❌） & **413 Content Too Large**

我本以为要触发这个状态码真的要塞很大很大的请求头 / 请求体，于是真的复制粘贴了很长很长的请求头和请求体，卡得我的破烂红米都开始发烫，直到 400 为止都没有触发这两个代码。
结果，只需要写一个很大的 `Content-Length` 请求头，就可以触发 413 了。

**304 Not Modified**（❌）

我尝试过使用 `If-Modified-Since` 请求头（就像[官方题解](https://github.com/USTC-Hackergame/hackergame2023-writeups/tree/master/official/HTTP%20%E9%9B%86%E9%82%AE%E5%86%8C#%E9%A2%98%E8%A7%A3)那样），然而并没有成功触发 304。本以为这个代码只有在请求者是浏览器的时候才能触发，结果后来发现，只是我的日期写得太新了。

**101 Switching Protocol**（❌）& **无状态码**

本来我想尝试通过发送一个 WebSocket 请求来触发 101（我并不懂 WebSocket 起始请求该怎么发送，于是瞎写了如下的内容）：

```
GET /\r\n
Connection: upgrade\r\n
Upgrade: websocket\r\n
Host: example.com\r\n\r\n
```

但是，由于第一行未写明 HTTP 版本号，而被 nginx 识别出 HTTP 0.9，结果意外地触发了无状态码的响应。

**415 Unsupported Media Type**（❌）& **501 Not Implemented**

我本来是想触发 415，结果又是阴差阳错地输入了 `Transfer-Encoding: deflate` 这个请求头，而它并未被 nginx 所支持，所以就意外地触发了 501。本来是需要看源码才能解出的状态码，直接被我撞上了。

### 📹 ✅ 流式星球

我并不懂 numpy / OpenCV 代码的写法，因此这是这次比赛我唯一一道用 VB 解出的题，就是读取 `video.bin` 文件然后按顺序画到屏幕上。

视频宽度是慢慢试的，视频往左歪斜就调低一像素，往右歪斜就调高一像素。

不过 VB 标准库的绘图性能极其低下，画出 1 帧大概要 1 秒的样子。~~懒得用 gdi / directx 导致的~~

{%image https://imgsrc.chyk.ink/b2de9c82d158ccbf6245d50f5fd8bc3eb135410d.webp %}

[在此](https://github.com/YidaozhanYa/MyVBMag1c/tree/main/Hackergame%202023/%E6%B5%81%E5%BC%8F%E6%98%9F%E7%90%83)可获得源码。

>在之前折腾破烂红米的时候，我加入了该开发者的群，群里有一个佬的昵称就叫做「为什么要演奏春日影」。因此看到「为什么要」和 flag 中的 haruhikage 的时候，我即使没看过 MyGO!!!!!，也释怀地笑了。
>
>[结果出题人，甚至整场比赛的成分都是如此...](https://github.com/USTC-Hackergame/hackergame2023-writeups/tree/master/official/%F0%9F%AA%90%20%E6%B5%81%E5%BC%8F%E6%98%9F%E7%90%83#%E5%85%B6%E4%BB%96)。

### 🗂️ ⭕ 低带宽星球

{%image https://imgsrc.chyk.ink/bd3eb13533fa828bb0b9fcd6bb1f4134970a5a68.webp %}

打开图片可以看到，图片只是三个大色块，于是我想到了使用 svg 解决。

```xml
<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="385" height="1024" fill="#DB4E46" />
  <rect x="385" y="0" width="335" height="1024" fill="#8DD79D" />
  <rect x="720" y="0" width="304" height="1024" fill="#86F4E8" />
</svg>
```

这个 svg 有 266 字节大小，于是成功通过第一问。

使用[在线工具](https://jakearchibald.github.io/svgomg/)对 svg 进行极致压缩后，得到如下 svg：

```xml
<svg><path fill="#DB4E46" d="M0 0h385v1024H0z"/><path fill="#8DD79D" d="M385 0h335v1024H385z"/><path fill="#86F4E8" d="M720 0h304v1024H720z"/></svg>
```

然而这个 svg 还是很大，即使经过 gzip 压缩，大小仍然有 118 字节，远大于题目要求的 50 字节，看来基于 XML 的语言是没戏了。

在查看[官方题解](https://github.com/USTC-Hackergame/hackergame2023-writeups/tree/master/official/%F0%9F%AA%90%20%E4%BD%8E%E5%B8%A6%E5%AE%BD%E6%98%9F%E7%90%83)后，我才知道 JPEG XL 竟然也可以用来绘制简单的矢量图形 ... 我那 1.44MB 的脑子一下就被现代技术创个半死不活。

{%image https://imgsrc.chyk.ink/b21c8701a18b87d65cd4ca2a410828381f30fd75.webp %}

今年 3 月的时候，热衷于 Web 新技术的小 MBR 就和我提到过 JPEG XL，不过当时我以为这只是 JPEG 的一个超集，所以就并没往这方面想。没想到它竟然在 Hackergame 出现了，强行让我接受了这个现代技术。

### 😡 ⭕ 为什么要打开 /flag

这道题我算是发现了一个**非预期解**。

Stage 1 的 `lib.c` 中对 `fopen`、`freopen`、`open`、`creat` ~~(真是惜字如金啊)~~ 等打开文件的函数都做了手脚，而唯独 `open64` 函数被落下了，因此 ...

```c
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>

int main() {
    const char *filename = "/flag";
    int fd = open64(filename, O_RDONLY);
    char buffer[114];
    ssize_t flag;
    flag = read(fd, buffer, sizeof(buffer));
    write(STDOUT_FILENO, buffer, flag);
    close(fd);
    return 0;
}
```

于是 flag 1 偷鸡成功。

### 🧠 ⭕ 小型大语言模型星球

{%bilicard BV1qM411s7QM%}

从这个视频可知，GPT-4 模型在经过了一些神奇的脑回路之后，会循环输出同一条信息或类似的信息。合理推测题目中的 TinyStories-33M 模型也具有类似的特性，因此可以轻易解出第一问。

{%image https://imgsrc.chyk.ink/b58f8c5494eef01fc1fb79f0a6fe9925bc317d1c.webp %}

查看[官方题解](https://github.com/USTC-Hackergame/hackergame2023-writeups/tree/master/official/%F0%9F%AA%90%20%E5%B0%8F%E5%9E%8B%E5%A4%A7%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B%E6%98%9F%E7%90%83)得知，第二问和第三问涉及到 LLM 的工作原理，我就放弃了。

### 🖼️ ❌ 旅行照片 3.0

由于这次的照片没有了 EXIF 信息，我一上来直接碰壁。

不过通过阅读题解，才知道了有 Google Lens 这个好东西。不禁感叹，AI 真的是造福人类啊 ...

### 🌐 ❌ Komm, süsser Flagge

看到题目中三个 TCP 的 iptables 规则，我的第一反应是使用基于 UDP 的 HTTP/3，然而 ...

```bash
curl3 --http3-only -X POST -d "114514:asdfgh==" http://202.38.93.111:18080
curl: (3) HTTP/3 requested for non-HTTPS URL
```

不愧是新技术啊，真安全。

在查看[官方题解](https://github.com/USTC-Hackergame/hackergame2023-writeups/tree/master/official/Komm%2C%20s%C3%BCsser%20Flagge)后，我才发现 HTTP 请求居然可以拆到不同的 TCP 包里去发送 ... 奇怪的姿势又增加了。至于第二问和第三问的解法，就等到以后再系统性学习吧。

### ⛔ ❌ 微积分计算小练习 2.0

这是唯一一道我没有做出来的 web 题。在这道题中难倒我的是曾经我初学 JavaScript 时令我深恶痛绝的 CORS。使用 `iframe` 和 `window.open` 直接打开新窗口，然后使用 `contentDocument` 都会直接提示无权限而被浏览器拒绝。

而我想当然地以为评论处特殊字符的检测是在前端进行的（由于弹了个 alert），当天放学回家后就兴冲冲打开浏览器测试，结果 alert 的脚本是服务器端检测到特殊字符之后写到 html 里的。

而我并没有顺着这个思路走下去发现 `updateElement` 的引号逃逸漏洞，所以并没有在比赛结束之前解出这道题。

排在后面的题目难度真的不是盖的。

### 💸 ❌ 链上猎手

我对 web3 的了解仅限于~~骗过 tg 哈希博彩广告号的体验金然后充了一个月的 tg 大会员~~，并没有深入去了解 web3（原因是感觉 web3「做什么都提钱」，太没有人情味，因为这个我也没有使用 xlog 之类的 web3 博客平台），因此看到真正的 web3 题，直接放弃了。（笑）
