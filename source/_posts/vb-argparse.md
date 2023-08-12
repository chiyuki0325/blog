---
title: "📋 ArgParse: Visual Basic 6 的命令行参数解析库"
date: 2023-08-12 18:42:50
tags:
- VB
category: 编程
description: "使用 Visual Basic 6 编写的命令行参数解析库"
---

### 📦 依赖

- Microsoft Scripting Runtime (`sccrun.dll`)

### 🔧 使用方法

#### UNIX 式参数解析

```vb
Dim Args As New ArgParser
With Args
    .MarkAsOption "option1", "option2", "option3"
    '--option1, --option2 和 --option3 将会被标记为“选项”，即键值对

    .SetAlias "option3", "o3"
    '你也可以给“开关”和“选项”设置简短的别名

    .Parse "verb1 verb2 ""C:\path\to\example folder"" --option1 value1 --option2=value2 -o3 value3 --flag1 --flag2"
	'在实际使用中你可以传入“Command$”
    
    '显示结果
    Dim PlainArg As Variant
    For Each PlainArg In .PlainArgs
        Debug.Print PlainArg
    Next

    Debug.Print .Options("option3")
    Debug.Print .FlagEnabled("flag1")
End With
```

#### DOS 式参数解析

ArgParse 还支持 MS-DOS 式的参数，使用斜杠当作标记符号，并且大小写不敏感。

```vb
Dim Args As New ArgParser
With Args
    .OptionsStyle = DOS
    .SetAlias "Option3", "O3"
    .Parse "Verb1 Verb2 ""C:\path\to\example folder"" /Option1 Value1 /Option2:Value2 /O3 Value3 /Flag1 /Flag2"

    Dim PlainArg As Variant
    For Each PlainArg In .PlainArgs
        Debug.Print PlainArg
    Next

    Debug.Print .Options("option3")
    Debug.Print .FlagEnabled("flag1")
	'DOS 模式是非大小写敏感的
End With
```

#### 遍历参数

调用 `Args.NextArg` 和 `Args.ThisArg` 可以遍历所有非“选项”和“开关”的参数。

这个函数在 `Select Case ...` 中很有用，可以用来选择模式。

```vb
Dim Args As New ArgParser
Args.Parse "bisect bad"
Select Case Args.NextArg
    Case "init"
    Case "clone"
    Case "commit"
    Case "bisect"
    Select Case Args.NextArg
        Case "start"
        Case "good"
        Case "bad"
        Case Else
        '...
    End Select
    Case Else
        Debug.Print "不支持的操作: " + Args.ThisArg
End Select
```

### GitHub

{%ghcard https://github.com/YidaozhanYa/ArgParse %}
