---
title: 📤 修改 OneManager 使其支持访客上传文件名
date: 2021-07-12 13:38:01
tags:
- OneManager
category: 其它
---

众所周知， OneManager 可以设置允许访客在某个文件夹中上传文件，但上传的文件默认会以其 MD5 校验码命名（阿里云盘为 SHA-1 ）。蘑菇（作者）的态度是“游客就是游客”，和站长不能有相同权限，所以我们如果想用 OneManager 征集文件，只能自己动手丰衣足食，来解决文件名问题。

---

这里我以OneDrive为例。首先 Fork 一份 OneManager 的仓库，并且编辑```disk/Onedrive.php```。

在函数```bigfileupload```中找到下面这段代码：

```php
        $tmp = splitlast($_POST['upbigfilename'], '/');
        if ($tmp[1]!='') {
            $fileinfo['name'] = $tmp[1];
            if ($_SERVER['admin']) $fileinfo['path'] = $tmp[0];
        } else {
            $fileinfo['name'] = $_POST['upbigfilename'];
        }
        $fileinfo['size'] = $_POST['filesize'];
        $fileinfo['filelastModified'] = $_POST['filelastModified'];
        if ($_SERVER['admin']) {
            $filename = spurlencode($_POST['upbigfilename'], '/');
        } else {
            $tmp1 = splitlast($fileinfo['name'], '.');
            if ($tmp1[0]==''||$tmp1[1]=='') $filename = $_POST['filemd5'];
            else $filename = $_POST['filemd5'] . '.' . $tmp1[1];
        }
```

按照如下修改：

```php
        $tmp = splitlast($_POST['upbigfilename'], '/');
        if ($tmp[1]!='') {
            $fileinfo['name'] = $tmp[1];
            $fileinfo['path'] = $tmp[0];
        } else {
            $fileinfo['name'] = $_POST['upbigfilename'];
        }
        $fileinfo['size'] = $_POST['filesize'];
        $fileinfo['filelastModified'] = $_POST['filelastModified'];
        $filename = spurlencode($_POST['upbigfilename'], '/');
```

点击下方 Commit Changes 保存即可。

Tips：最好保留原代码缩进。

接着再来修改你想用的主题，我这里使用默认主题```theme/classic```，在```<!--OnedriveUploadJsStart-->```和```<!--OnedriveUploadJsEnd-->```中间找到

```js
upbigfilename = filemd5+ext;
```

改为

```js
upbigfilename = encodeURIComponent((file.webkitRelativePath||file.name));
```

保存即可。

然后在 OneManager 管理面板中，“更新”为你的 Fork 。

![](https://www.helloimg.com/images/2021/07/12/C38LKY.png)

---

Tips：OneDrive 和 SharePoint 共用同一个后端 Onedrive.php。如果你使用阿里云盘，那么就修改Aliyundrive.php，并在修改主题时，在```<!--AliyundriveUploadJsStart-->```和```<!--AliyundriveUploadJsEnd-->```中间找到```upbigfilename = filesha1 + ext;```改为```upbigfilename = encodeURIComponent((file.webkitRelativePath||file.name));```即可。
