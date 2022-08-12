---
title: 🔧 SMM:WE API 文档（中文）
date: 2022-02-26 17:03:58
tags:
- SMMWE
category: 游戏
---

本文介绍《SMM:WE》 的全球关卡 API。
如不特别说明，请求方法均为 `POST` ，POST 的数据类型均为 `application/x-www-form-urlencoded` ，服务器响应数据类型均为 `application/json` 。

由于 SMM:WE 是 32 位游戏，因此 `int64` 在游戏内部可能存储为 `string`。

## 连接服务器

### 服务器 IP

{% folding 3.1.5 - 3.2.1 %}

{% psw 172.93.102.10:25833 %}

{% endfolding %}

{% folding 3.1.5 - 3.2.2 %}

{% psw 199.127.62.242:25506 %}

{% endfolding %}

### 客户端令牌

客户端令牌（token）为一串数字，代表当前使用的客户端版本。服务器通过客户端令牌判断游戏版本是否为最新。

{% folding 3.2.2 %}

{% psw 282041415 %}

{% endfolding %}

## 数据类型

### 验证码

验证码（auth_code）是一个六位 `string`，包含大写字母和数字，代表本次登录（session）。登录时服务器会下发新的验证码，除了登录之外的操作均需要带上验证码，如果你在玩的时候帐号异地登录，验证码会刷新，所以就没法继续玩下去，需要重新登录。	

### 游戏风格

游戏风格是一个 `string`，内容为数字，对照下表：

`"0"=>"SMB1"` ` "1"=>"SMB3"` ` "2"=>"SMW"` ` "3"=>"NSMBU"`

### 关卡场景

关卡场景是一个 `string`，内容为数字，对照下表：

| ID   | 英文        | 中文 | ID   | 英文   | 中文 |
| ---- | ----------- | ---- | ---- | ------ | ---- |
| 0    | Overworld   | 地面 | 7    | Sky    | 天空 |
| 1    | Underground | 地下 | 8    | Desert | 沙漠 |
| 2    | Castle      | 城堡 | 9    | Snow   | 雪原 |
| 3    | Underwater  | 水中 | 10   | Autumn | 枫林 |
| 4    | Ghost House | 鬼屋 | 11   | Beach  | 海滩 |
| 5    | Airship     | 飞船 |      |        |      |
| 6    | Forest      | 丛林 |      |        |      |

关卡场景在全球关卡中存储为数字（ID），在存档中存储为英文名第一个单词的的小写，不过枫林为 `fall`。

### 标签

标签是一个 `string`，格式为 `"标签1,标签2"` 的西班牙文 。如果没有，则用 `---` 代替。

|ID| 西班牙文           | 中文       |ID| 西班牙文     | 中文   |
|--| ------------------ | ---------- | --|------------ | ------ |
|0| Tradicional        | 标准       |8| Musica       | 音乐   |
|1| Puzles             | 解谜       |9| Artistico    | 美术   |
|2| Contrarreloj       | 计时挑战   |10| Habilidad    | 技巧   |
|3| Autoavance         | 自动卷轴   |11| Disparos     | 射击   |
|4| Automatismos       | 自动马力欧 |12| Contra jefes | BOSS战 |
|5| Corto pero intenso | 一次通过   |13| En solitario | 单打   |
|6| Competitivo        | 多人对战   |14| Link         | 林克   |
|7| Tematico           | 机关设计   ||              |        |

### 关卡元数据

关卡元数据是一个 JSON，包含关卡基本信息。

```json
{
	"name": "关卡名字 | string，不可以使用特殊字符",
	"likes": "点赞数量 | stirng",
	"comments": "评论数量 | string，WIP",
	"dislikes": "点孬数量 | string",
	"intentos": "游玩数量 | string",
	"muertes": "死亡命数 | string",
	"victorias": "胜利命数 | string",
	"apariencia": "游戏风格 | string",
	"entorno": "关卡场景 | string",
	"etiquetas": "标签 | string",
	"featured": "是否上了推荐 | string，0或1",
	"user_data": {
		"completed": "自己是否通关 | string，yes或no",
		"liked": "点赞数量 | string"
	},
	"record": {
		"record": "是否被别人通关 | string，yes或no",
		"alias": "通关者用户名 | string",
		"id": "通关者 Discord ID | string，内容为 int64",
		"time": "通关时间 | int，为通关所用的 ticks"
	},
	"date": "上传日期 | string DD/MM/YYYY",
	"author": "作者用户名 | string",
	"description": "简介 | string，WIP，内容为 Sin Descripción",
	"archivo": "关卡文件链接 | string，由 https://cdn.discordapp.com 开始",
	"id": "关卡 ID | string"
}
```

### 统计类型

统计类型为 `string`，代表一种统计。

点赞：`likes`，点孬：`dislikes`，游玩：`intentos`，死亡：`muertes`，过关：`victorias`。

## 请求

### 登录

终结点：`/user/login`	

请求内容：

```
token=客户端令牌 | int
alias=用户名 | string
password=密码 | string
```

响应：

```json
{
	"alias": "用户名 | string",
	"id": "用户的 Discord ID | string，内容为 int64",
	"uploads": "关卡上传数 | int",
	"auth_code": "验证码 | string",
	"admin": "是否为 GM | bool",
	"booster": "是否为捐赠者 | bool",
	"mod": "是否为管理员 | bool",
	"goomba": "帐号是否可用 | bool",
	"mobile": "是否为手机版 | bool"
}
```

### 获取全球关卡列表

终结点：`/stages/detailed_search`

#### 最新关卡

请求内容：

```
token=客户端令牌 | int
discord_id=用户的 Discord ID | int64
auth_code=验证码 | string
page=页码 | string
```

#### 榜单关卡

请求内容：

```
token=客户端令牌 | int
discord_id=用户的 Discord ID | int64
auth_code=验证码 | string
page=页码 | string
featured=notpromising
sort=popular
last=天数 | string，天数+d
```

#### 推荐关卡

请求内容：

```
token=客户端令牌 | int
discord_id=用户的 Discord ID | int64
auth_code=验证码 | string
page=页码 | string
featured=promising
```

#### 点赞关卡

请求内容：

```
token=客户端令牌 | int
discord_id=用户的 Discord ID | int64
auth_code=验证码 | string
page=页码 | string
liked=用户的 Discord ID | int64
```

也就是说，理论上此 API 还可以看到其他用户点赞的关卡。

#### 筛选或搜索

请求内容：

```
token=客户端令牌 | int
discord_id=用户的 Discord ID | int64
auth_code=验证码 | string
page=页码 | string
liked=用户的 Discord ID | int64
title=关卡标题 | string，非全字匹配，可选
author=作者名字 | string，非全字匹配，可选
aparience=游戏风格 | int，可选
entorno=关卡场景 | int，可选
dificultad=难度 | int，可选
last=日期 | string，可选，天数+d
historial=是否被自己通关 | int，0为被自己通关过，1反之
liked=是否被点赞，为用户的 Discord ID | int64，可选，不可以和disliked共存
disliked=是否被点赞，为用户的 Discord ID | int64，可选，不可以和liked共存
sort=是否倒序 | string，内容为antiguos，可选
```

其实获取其它关卡列表也是这个 API，只不过条件不同。

#### 响应

```json
{
	"type": "detailed_search",
	"num_rows": "总关卡数量 | string",
	"rows_perpage": "每页关卡数量 | string，固定为 32",
	"pages": "页面数量 | string",
	"result": "各个关卡的元数据 | array"
}
```

### 通过 ID 搜索

终结点：`/stages/关卡 ID | string`

请求内容：

```
token=客户端令牌 | int
discord_id=用户的 Discord ID | int64
auth_code=验证码 | string
```

响应：关卡元数据 JSON

### 统计信息

终结点：`/stage/关卡ID |string/stats/统计类型 | string`

请求内容：

```
token=客户端令牌 | int
discord_id=用户的 Discord ID | int64
auth_code=验证码 | string
```

响应：

```json
{
	"success": "Se ha actualizado los 统计类型 correctamente.",
	"type": "stats",
	"id": "关卡ID | string"
}
```

## 报错

| ID   | 西班牙文                   | 中文       |
| ---- | -------------------------- | ---------- |
| 029  | No se encontró resultados. | 找不到关卡 |
| 007  | Contraseña incorrecta.     | 密码不正确 |
|      |                            |            |
|      |                            |            |
|      |                            |            |
|      |                            |            |
|      |                            |            |

待完善~
