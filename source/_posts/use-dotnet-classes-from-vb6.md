---
title: 🔼 从 VB6 里调用 .NET Framework 的类
date: 2023-06-18 09:32:31
tags:
- VB
category: 编程
description: '.NET Framework 中设为 [ComVisible(true)] 的类，都可以在 Visual Basic 6 中直接引用。使用这些更现代的类，可以极大地增强 VB6 的功能，比如进行长字符串连接、哈希值计算、UTF-8 编解码等。'
---

.NET Framework 中设为 `[ComVisible(true)]` 的类，都可以在 Visual Basic 6 中直接引用。使用这些更现代的类，可以极大地增强 VB6 的功能，比如进行长字符串连接、哈希值计算、UTF-8 编解码等。

**需要在「启用或关闭 Windows 功能」中打开 .NET Framework 3.5。**

#### 创建对象

可以在项目的引用中添加 mscorlib.dll，之后使用 `New` 关键字创建对象。

```vb
Set UTF8Encoding = New mscorlib.UTF8Encoding
```

也可以使用 CreateObject 函数直接创建对象。使用此方法需要知道该类在 .NET Framework 中对应的类名。

```vb
Set UTF8Encoding = CreateObject("System.Text.UTF8Encoding")
```

两种创建方法没有区别，因为 VB IDE 不支持对 .NET 类的补全。用 CreateObject 来创建反而会使代码更美观一些。

.NET Framework 中的很多对象都设为了 `[ComVisible(true)]`，具体可以在 [.NET Framework 的源代码](https://referencesource.microsoft.com/#mscorlib/system/)中查看。

### 使用对象

这里给出几个例子。

#### StringBuilder

使用 `System.Text.StringBuilder` 可以更快速地连接字符串，比 VB 原生的字符串相加操作运行速度高得多。

```vb
Dim SB As Object
Set SB = CreateObject("System.Text.StringBuilder")
SB.Append_3 "Hello, "
SB.Append_3 "world!"
MsgBox SB.ToString  'Hello, world!
```

因为 StringBuilder 类的 Append 方法在 .NET Framework 中进行了重载，而我们需要使用第三个 Append 方法（即添加字符串），所以使用 Append_3。

这些方法也可以在源代码中查看。

#### UTF-8 编码解码

VB 原生只支持 ANSI 字符编码（在简体中文系统上对应 GBK）文件读取，配合 `System.Text.UTF8Encoding` 可实现读取 UTF-8 文件。

虽然 `ADODB.RecordSet` 也可以实现类似的功能，但不如 `System.Text.UTF8Encoding` 优雅和快速。

```vb
Dim UTF8Encoding As Object
Set UTF8Encoding = CreateObject("System.Text.UTF8Encoding")
```
```vb
'解码
Dim FileByteArray() As Byte, FileContent As String
Open (App.Path + "\SomeUTF8Text.txt") For Binary Access Read As #1
	ReDim FileByteArray(LOF(1) - 1)
	Get #1, , FileByteArray
Close #1
FileContent = UTF8Encoding.GetString(FileByteArray)
'即可把 UTF-8 编码的文件内容解码为 UTF-16 (Unicode) 编码的 VB 字符串
```
```vb
'编码
Dim FileByteArray() As Byte, FileContent As String
FileContent = "你好中国！"
FileByteArray = UTF8Encoding.GetBytes_4(FileContent)
'即可把字符串编码为 UTF-8 字节数组
Open (App.Path + "\SomeUTF8Text.txt") For Output As #1
	Print #1, vbNullString  '先清空文件内容
Close #1
Open (App.Path + "\SomeUTF8Text.txt") For Binary Lock Write As #1
	Put #1, , FileByteArray
Close #1
'字符串以 UTF-8 编码成功写入文件
```

#### MD5 哈希值计算

```vb
Dim MD5CryptoServiceProvider As Object, MD5Hash() As Byte, MD5HashString As String
Set MD5CryptoServiceProvider = CreateObject("System.Security.Cryptography.MD5CryptoServiceProvider")
MD5Hash = MD5CryptoServiceProvider.ComputeHash_2(UTF8Encoding.GetBytes_4("你好中国！"))

'以 16 进制的字符串输出
'使用 MSXML 的 nodeTypedValue 功能来编码 16 进制
With CreateObject("MSXML2.DOMDocument")
    .LoadXML "<root />"
    .documentelement.DataType = "bin.Hex"
    .documentelement.nodeTypedValue = MD5Hash
    MD5HashString = LCase$(Replace(.documentelement.Text, vbLf, ""))
End With
```

#### 数组排序

.NET Framework 中的 `System.Collections.ArrayList` 对象支持排序。

```vb
Dim MyArrayList As Object, i
Set MyArrayList = CreateObject("System.Collections.ArrayList")

For Each i In Array(2, 3, 5, 4, 1)
	MyArrayList.Add i
Next
MyArrayList.Sort  '此时 MyArrayList 的内容即为 1, 2, 3, 4, 5
```

### 将自己编写的 .NET 类导入到 VB6 中

可以使用更现代的 .NET Framework 版本。

参考 https://learn.microsoft.com/en-us/previous-versions/dotnet/articles/ms973802(v=msdn.10)?redirectedfrom=MSDN 。
