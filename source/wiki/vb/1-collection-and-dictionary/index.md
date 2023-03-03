---
layout: wiki
wiki: Visual Basic
order: 102
title: 📓 集合和字典 - 处理现代数据
---

### 📑 概述

集合和字典不在 VB 标准库中。它们位于 Microsoft Scripting Runtime 库中，引入这个库即可使用集合和字典。

使用集合和字典，可以在 VB 中处理键值对和序列化数据。
集合更快，但缺失一些功能，比如不能检查某个键是否存在，并且因为集合是只读的，所以不能更改项目的值。所以在实际的应用中，一般使用字典存储键值对，用集合存储无序数据，代替数组。

### ✏️ 基本使用

```vb
Enum Sex
    Male = 1
    female = 2
End Enum

Sub Main()
    Dim Rand As New Dictionary, Ken As New Dictionary
    With Rand
        .Add key:="name", Item:="Rand McKinnon"
        .Add key:="age", Item:=33
        .Add key:="sex", Item:=Sex.Male
    End With
    With Ken
        .Add key:="name", Item:="Ken Jones"
        .Add key:="age", Item:=39
        .Add key:="sex", Item:=Sex.female
    End With
    
    Dim People As New Collection
    With People
        .Add Rand
        .Add Ken
    End With
    
    Dim MyDict As New Dictionary
    MyDict.Add key:="people", Item:=People

	'VB 中没有中括号语法，所以使用小括号访问字典的值
	Debug.Print	MyDict("people")(1)("name")  'Rand McKinnon
	'成坨的小括号会让代码难以阅读，所以可以使用另外一种语法
	'MsgBox MyDict.Item("people").Item(1).Item("name")  'Rand McKinnon

	MsgBox MyDict("people").Count  '2
	MsgBox MyDict("people")(1).Exists("name")  'True

	MyDict.Remove("people")
End Sub
```

上面的这个例子演示了集合和字典的基本使用。
`MyDict` 字典中存储的数据如下：

```json
{
    "people": [
        {
            "name": "Rand McKinnon",
            "age": 33,
            "sex": 1
        },
        {
            "name": "Ken Jones",
            "age": 39,
            "sex": 2
        }
    ]
}
```

### 🔤 不区分大小写

Windows 的特色是不区分大小写。

在字典刚刚创建时，将其 `CompareMode` 属性改为 `TextCompare` ，可以让字典的键不区分大小写。相应地，字典访问的速度也会变慢。

```vb
Dim Rand As New Dictionary
Rand.CompareMode = TextCompare
'...
Debug.Print Rand("name")  'Rand McKinnon
Debug.Print Rand("nAmE")  'Rand McKinnon
```

### 🔃 遍历

字典和集合有两种遍历方法：通过键和通过下标。

```vb
Dim k As Variant
For Each k In MyDict.Keys
	Debug.Print k, MyDict(k)
Next
```

```vb
Dim i As Integer
For i = 0 To (MyDict.Count - 1)
	Debug.Print MyDict.Keys(i), MyDict.Items(i)
Next i
```

### 📊 JSON

可以使用 [VBJSON](https://www.ediy.co.nz/vbjson-json-parser-library-in-vb6-xidc55680.html) 库把 JSON 解析为字典/集合，或是把字典/集合序列化为 JSON。

在仓库中引入 `JSON.bas` 和 `cStringBuilder.cls` 即可。建议删除掉 `JSON.bas` 中的 `RStoJSON` 和 `JsonRpcCall` 方法，以避免不必要的依赖。

```vb
Dim MyDict As New Dictionary

Set MyDict = JSON.parse("{""people"":[{""name"":""Rand McKinnon"",""age"":33,""sex"":1},{""name"":""Ken Jones"",""age"":39,""sex"":2}]}")

Debug.Print JSON.toString(MyDict)
'{"people":[{"name":"Rand McKinnon","age":33,"sex":1},{"name":"Ken Jones","age":39,"sex":2}]}
```

