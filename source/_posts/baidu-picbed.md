---
title: 🐾 白嫖某度CDN当博客图床
date: 2022-03-17 07:52:01
category: 网络
tags:
- 百度
---

某度的首页存在一个 bug，「自定义换肤」上传的图片会留在云端不删除，并且图片直链不会鉴定 cookie 和 referer。

### HTML版

（需要事先在浏览器中登录某度账号）

```html
<!DOCTYPE html><html><head>
<meta charset="utf-8">

<title>图片上传</title></head><body>

<form enctype="multipart/form-data" action="https://sp0.baidu.com/6_R1fD_bAAd3otqbppnN2DJv/Pic/upload?pid=super&app=skin&logid=2915142959" method="post">

<input type="file" name="file"><br/>

<input type="submit" value="上传">

</form></body></html>
```

### API

URL：`https://sp0.baidu.com/6_R1fD_bAAd3otqbppnN2DJv/Pic/upload?pid=super&app=skin&logid=2915142959`

POST方法为在表单的`file`中放入图片文件。

需要携带 BDUSS 和 BAIDUID cookie。

返回的图片 URL 就在 JSON 中的 `data.pic_water` 值中。

此 API 可以做成脚本放到 Typora 中，也可以填入 Qexo 后台，实现直接粘贴图片。

---

参考： https://www.52pojie.cn/thread-1081260-1-1.html

