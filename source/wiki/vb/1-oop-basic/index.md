---
layout: wiki
wiki: Visual Basic
order: 101
title: 🛄 类模块、引用对象 —— VB 面向对象编程基础
---

在开始之前，首先声明一下：[Visual Basic **不是**一门真正的面向对象编程语言](https://www.vbforums.com/showthread.php?607028-Object-Oriented-Programming-in-VB6&p=3751210&viewfull=1#post3751210)。Visual Basic 直到 VB4 开始才有了对对象的初步支持，并且直到最后的 VB6 仍然不支持构造函数、类的继承、静态类等这些在真正的面向对象语言中稀松平常的概念。尽管这样，我们仍然可以在 VB 里进行基本的面向对象编程，并且调用其它任何支持 [COM](https://learn.microsoft.com/en-us/windows/win32/com/component-object-model--com--portal) 的编程语言中的对象。

### 🛄 类型和类模块

#### 📊 自定义数据类型

在任意文件中，使用 `Type` 关键字可定义一个类型。

类型不是对象，只是用于存储序列化数据。

```vb
Private Type Student
    Name As String
    ID As String
End Type
```

```vb
Dim LiHua As Student
With LiHua  '可以使用 With 语句充当「构造函数」
    .Name = "李华"
    .ID = 1
End With

MsgBox LiHua.Name  '李华
```

与对象不同的是，自定义数据类型可以被存放在数组中。

```vb
Dim Students(1 To 10) As Student
```

#### 🛄 类模块

在工程资源管理器中，右键点击，点击「添加」-「添加类模块」即可创建一个类。

使用类模块编写的类是真正的对象，但因为操作略微蛋疼，并且不能被存放在数组中，因此不适合存储数据，但适合进行一些更复杂的操作。

下面是一个存储颜色值的类。

*Color.cls*

```vb
'类的属性
Public R As Integer
Public G As Integer
Public B As Integer

'VB 还支持使用 getter / setter 定义属性
Public Property Let HexValue(HexValueString As String)
    Dim StrippedHexValue As String
    StrippedHexValue = Replace(HexValueString, "#", "")
    'VB 中使用 Me 而不是 this 或者 self
    Me.R = Int("&H" & Mid(StrippedHexValue, 1, 2))
    Me.G = Int("&H" & Mid(StrippedHexValue, 3, 2))
    Me.B = Int("&H" & Mid(StrippedHexValue, 5, 2))
End Property

Public Property Get HexValue() As String
    HexValue = "#" & Hex(Me.R) & Hex(Me.G) & Hex(Me.B)
End Property

Public Function ToVBColor() As Long
    ToVBColor = RGB(Me.R, Me.G, Me.B)
End Function
```

*Main.bas*

```vb
Sub Main()
    '声明变量时，使用 New 关键字创建对象
    Dim GreatColor As New Color
    With GreatColor
        .HexValue = "66ccff"
    End With
    MsgBox GreatColor.HexValue  '#66CCFF
    MsgBox GreatColor.ToVBColor  '16764006
	'如果你有内存洁癖的话
	Set GreatColor = Nothing
	'不过现在是 2023 年了谁还手动释放内存啊 (
	'除非这个函数比较长，否则在函数结束时
	'VB 会自动释放掉内存
End Sub
```

#### ✏️ 给对象赋值

使用 `Set` 语句以给对象赋值。

上面的 `Dim GreatColor As New Color` 其实也可以用 `Set` 赋值语句来写。

```vb
Dim GreatColor As Color
Set GreatColor = New Color
```

`Set` 语句不应过多使用，因为这个语句是传递引用。

```vb
Dim Greatcolor2 As Color
Set GreatColor2 = GreatColor
GreatColor2.HexValue = "39c5bb"
MsgBox GreatColor.HexValue  '#39C5BB，因为是传引用，GreatColor 的值也会更改
```

#### 🚮 初始化方法和销毁方法

VB 的类提供了两个方法 `Initialize` 和 `Terminate`。

初始化方法 `Initialize` 可以用于给类中的数据设置默认值、建立连接等。

```vb
Private Sub Class_Initialize()
    Me.R = 102
    Me.G = 204
    Me.B = 255
End Sub
```

销毁方法 `Terminate` 类似现代编程语言中的「生命周期方法」或「解构函数」，可以在对象被销毁时执行，用于释放资源、关闭连接等。

#### ℹ️ 更多高级用法

对于默认值持久化等高级用法，参见[微软官方文档](https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-basic-6/aa261324(v=vs.60))。

### 📥 引用外部对象

Visual Basic 是基于 COM 的，因此可以引用任何 COM 库中的对象（即「调库」）。

#### 📥 引用

点击「工程」-「引用」，勾选需要引用的库即可。

例：使用「引用」创建一个 WScript Shell：

- 在「引用」中勾选 Windows Script Host Object Model。
- `Dim Wsh As New WshShell`

如果某个库没有使用 `regsvr32` 注册，可以点击「浏览」直接从文件引用。

#### 🔍 对象浏览器

点击「视图」-「对象浏览器」打开对象浏览器。在对象浏览器里，可以查看标准库和所有引入的库中的对象，以及它们的所有方法。

{% image https://imgsrc.baidu.com/forum/pic/item/b3b7d0a20cf431ad309044f10e36acaf2fdd98bc.png 对象浏览器 %}

对象浏览器虽不及现代的 IDE 那么智能，但也给我们提供了浏览库中内容的一种相对方便的手段。

#### 🅰️ ActiveX

当你不知道某个对象在哪个库里时，可以直接使用 `CreateObject` 函数引用 ActiveX 对象。

例：使用 `CreateObject` 创建一个 WScript Shell：

```vb
Dim Wsh As Object
Set Wsh = CreateObject("WScript.Shell")
```

因为 VB 的 IDE 过于陈旧，所以这种方法有一定局限性，比如补全不再可用，并且对象浏览器也不能用。但使用 `CreateObject` 引入对象时，可以避免潜在的命名空间污染。



