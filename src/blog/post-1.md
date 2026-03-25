---
title: "（保姆级代码详解）使用Nonebot2+官方API搭建QQ群聊机器人"
pubDate: 2025-04-14
description: "使用Nonebot2和官方API,与群u一起搭了个qq机器人。"
author: "三叶"
Image: 
    url: "de040e63935cfba0864716e0e3577515ef9a8590.jpg"
    alt: "img"
tags: ["Python", "Nonebot", "QQ机器人"]
---

之前和群u一起基于nonbot2的qq适配器搭了个群聊机器人。

代码仓库：[GitHub - ClovertaTheTrilobita/SanYeCao-Nonebot: 一个基于Nonebot+官方API的QQ群聊机器人](https://github.com/ClovertaTheTrilobita/SanYeCao-Nonebot)

关于Nonebot2 QQ适配器的基本配置+QQ开放平台使用教程，**推荐先跟着这个把nonebot配置好**：

[（QQ机器人搭建）NoneBot2搭建官方QQ机器人-简单易上手-CSDN博客](https://blog.csdn.net/weixin_58403216/article/details/144715878)

Nonebot官方文档：

[快速上手 | NoneBot](https://nonebot.dev/docs/quick-start)

QQ交流群：710101225

欢迎一起来讨论~

# 一、在开始之前，你需要了解的

### 0.首先是，编辑器（必要）

推荐使用[PyCharm](https://www.jetbrains.com/zh-cn/pycharm/)或者[Visual Studio Code](https://code.visualstudio.com/)

如果您是vim大佬或者是恐怖如斯的记事本使用者，当我没说（

### 1.基本python语法（必要）

如果您未了解过python，或您没有程序设计基础，建议参考：

[Python3 教程](https://www.runoob.com/python3/python3-tutorial.html)

### 2.Git的基本使用

[git安装配置教程(小白保姆教程2024最新版)-CSDN博客](https://blog.csdn.net/weixin_44406127/article/details/137540031)

### 3.Anaconda的Python发行版（推荐）

[最新版最详细Anaconda新手安装+配置+环境创建教程-CSDN博客](https://blog.csdn.net/qq_44000789/article/details/142214660)

# 二、让我们开始吧

总所周知，计算机最难的一步是配环境，如果完成了以上几步距离成功也达到90%了（不是

## 1\. Nonebot2项目结构

Nonebot2的项目结构一般为

**bot.py # 程序入口**

和

**plugins # 插件**

bot.py是我们启动机器人后端的时候需要启动的程序，而针对某一特定事件，如指令“/天气”，我们写在plugins中的程序里。

bot.py中我们一般如下配置

```
import nonebot
from nonebot.adapters.qq import Adapter as QQAdapter
from nonebot import logger
from nonebot.log import default_format, default_filter

nonebot.init() # 初始化nonebot

driver = nonebot.get_driver() # 设定驱动
driver.register_adapter(QQAdapter)  # 注册QQ适配器

nonebot.load_builtin_plugins('echo', 'single_session') # 添加一些自带插件
nonebot.load_from_toml("pyproject.toml") # 加载配置文件

logger.add("error.log", level="ERROR", format=default_format, rotation="1 week") # 日志输出

if __name__ == "__main__":
    nonebot.run()
```

当然，上述代码了解即可，我们主要需要搞清楚的是nonebot的事件响应器和事件处理。

## 2.事件响应器

我们在使用QQ群聊机器人时，总能看到对机器人发送指令，如 “/天气” 机器人便会回复响应的内容。这是怎么实现的呢？

### 1）on\_command() 响应器

Nonebot2提供一种非常方便的响应器：_on\_command()_

上代码：

```
from nonebot import on_command
from nonebot.rule import to_me

weather = on_command("天气", rule=to_me(), aliases={"weather", "查天气"}, priority=10, block=True)
@weather.handle()
asnyc def get_weather():
    weather.send("天气是……")
```

![](images/193b4709-1d76-48b0-8288-3b557e959773)

在上述代码中我们用on\_command()响应器制作了一个最最简单的机器人响应指令的功能。

其逻辑为：

机器人收到“/天气”指令后，调用get\_weather()方法：向QQ群发送一句 “天气是……”。

> _on\_command()响应器中的参数：_
> 
>         _**"天气"**: 当接收到 “/天气” 指令时，触发响应器。_
> 
>         _**rule=to\_me()**: 该指令的对象是我_
> 
>         _**aliases={"weather", "查天气"}**: 命令别名，当用户发送“/weather”或“/查天气”时，一样触发此响应器_
> 
>         _**priority=10**: 优先级为10，数字越小优先级越高，例如有另一个响应器的指令同样是“/天气”，但是它的priority=9，那么优先触发priority=9的这个响应器。_
> 
>         _**block=True**: 触发此响应器后不会触发其它响应器。如上个例子，priority=9的响应器被触发后，如果它的block=True，那就不会继续触发这个priority=10的同名响应器。_

###  2）on\_keyword() 响应器

其实和on\_command()差不多。

```
from nonebot import on_command
from nonebot.rule import to_me

weather = on_keyword({"天气", "weather", "查天气"}, rule=to_me(), priority=10, block=True)
@weather.handle()
asnyc def get_weather():
    weather.send("天气是……")
```

在上述示例中，**只要**用户发送的消息**包括**"天气", "weather", "查天气"这三个词的**任意一个或多个**，便会触发此响应器。

### 3）on\_message() 响应器

只要有用户对机器人发送消息，就会触发此响应器。我们一般将其用于处理用户的非规范输入。

```
from nonebot import  on_message
from nonebot.rule import Rule, to_me

menu = ["/天气", "/查天气", "/摸摸"]

async def check_value_in_menu(message: MessageEvent) -> bool:
    value = message.get_plaintext().strip().split(" ") # 获取用户发送的文本，并将其按照空格分为字符串数组
    if value[0] in menu: # 如果数组中的第一个元素在menu数组中，返回False
        return False
    else:
        return True

check = on_message(rule=to_me() & Rule(check_value_in_menu) ,block=True, priority=10)
@check.handle()
async def handle_function(message: MessageEvent):
    await check.finish("请输入正确的指令。")
```

我们可以看到，on\_message()响应器中不再像之前两个响应器那样需要传递字符串。

假如用户正确地输入了指令：“/天气”

on\_message()此时接收到了消息，于是它调用check\_value\_in\_menu()方法，检测该指令是否在menu列表中。

很显然它存在，于是check\_value\_in\_menu()方法返回False，不满足on\_message()的触发条件，那么该响应器不会被触发。

相反，如果用户发送“/天气是？”，on\_message()接收到消息后，经check\_value\_in\_menu()检测，发现该指令不在menu列表中，返回True。

此时，on\_message()的触发条件满足，向用户发送“请输入正确的指令。”并终止本次会话。

## 3.获取消息内容

我们的机器人在很多应用情况下需要获取用户输入的文本消息内容。

例如上述天气模块，我们通常的使用方法是向机器人发送 “/天气 地名” 查询该地区的天气。

怎么获取用户的消息的文本内容呢？

### 1）Message对象

> 使用依赖注入获取上下文信息的方法十分简单，我们仅需要在函数的参数中声明所需的依赖，并正确的将函数添加为事件处理依赖即可。在 NoneBot 中，我们可以直接使用 `nonebot.params` 模块中定义的参数类型来声明依赖。

 这是Nonebot官方文档给出的接释，看起来挺抽象的不是么（

那我们上代码：

```
from nonebot import on_command
from nonebot.rule import to_me
from nonebot.adapters import Message
from nonebot.params import CommandArg

weather = on_command("天气", rule=to_me(), aliases={"weather", "查天气"}, priority=10, block=True)

@weather.handle()
async def get_weather(args: Message = CommandArg()):
    # 提取参数纯文本作为地名，并判断是否有效
    if location := args.extract_plain_text():
        await weather.finish(f"今天{location}的天气是...")
    else:
        await weather.finish("请输入地名")
```

这是对之前的天气模块稍稍做出了一些修改，当响应器接收到指令 “/天气” 时，我们将Message对象保存在args变量中，这样，便可以获取到用户输入的文本信息了。

> 命令与参数之间可以不需要空格，`CommandArg()` 获取的信息为命令后跟随的内容并去除了头部空白符。例如：`/天气 上海` 消息的参数为 `上海`。

 如果用户对机器人发送 “/天气 海口”，那机器人便会在群聊中回应“今天海口的天气是……”

### 2）MessageEvent对象

这相当于一个用途更多的Message对象，通过它，可以获取用户的[member\_openid和group\_openid](https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/unique-id.html)，官方文档很久没更新了，其实现在用户id是这样的

> - 不同 `bot` 在群聊场景，获取到的群唯一识别号 `openid` 不一样，称为 `group_openid`
> 
> - 相同 `bot` 在不同的群，获取到同一个用户在群内的唯一识别号 `openid` 一样，称为 `member_openid`
> 
> - 不同 `bot` 在同一群聊，获取到同一个用户在群内的唯一识别号 `openid` 不同

 所以别想着开盒别人，因为你根本不知道他是谁。

获取用户唯一标识id的用处很多，例如你可以针对不同的用户发送不同的今日运势（机器人时尚单品）、获取群老婆等。

获取方式：

```
from nonebot.adapters.qq import MessageEvent
from nonebot.plugin import on_command
from nonebot.rule import to_me

test = on_command("/test", rule=to_me(), priority=10, block=True)
@test.handle()
async def test_method(message: MessageEvent):
    member_openid = message.get_user_id()
```

使用MessageEvent对象中的get\_user\_id()方法，它会返回一个存储着用户id的字符串，看起来像一堆乱码。

## 4.发送消息

其实在我们之前的例子中我们也提及过消息发送，最常用的发送方法有send()和finish()。

### 1）send()方法

在最开始的示例中我们可以看到它的基本用法：

```
weather.send("天气是……")
```

这句的意思便是，向群聊中发送一条消息，其内容是“天气是……”

### 2）finish()方法

它和send使用方法相近，唯一不同是：使用finish()方法之后，本次会话结束，不可以在此次会话中发送更多消息。

例如，使用send方法：

```
from nonebot import on_command
from nonebot.rule import to_me

weather = on_command("天气", rule=to_me(), aliases={"weather", "查天气"}, priority=10, block=True)
@weather.handle()
asnyc def get_weather():
    weather.send("正在为您查询，请稍等~")
    weather.send("天气是……")
    weather.finish("查询完毕！")
```

当用户发送 “/天气” 指令后，bot会先后回复上述三条信息。

注意：finish()在方法中和return语句等效，finish()方法之后的代码不会执行。

> 警告：由于 `finish` 是通过抛出 `FinishedException` 异常来结束事件的，因此异常可能会被未加限制的 `try-except` 捕获，影响事件处理流程正确处理，导致无法正常结束此事件。请务必在异常捕获中指定错误类型或排除所有 [MatcherException](https://nonebot.dev/docs/api/exception#MatcherException) 类型的异常，或将 `finish` 移出捕获范围进行使用。

###  3）MessageSegment对象

我们经常看到QQ bot在群聊里发图片、视频等等，看着真让人眼馋，那我们现在来实现这个功能。

①发送图片

nonebot提供两种发送方式：发送本地图片和通过URL发送图片.

我们先来看看本地发送：使用MessageSegment.file\_image()

```
from pathlib import Path
from nonebot.rule import to_me
from nonebot.plugin import on_command
from nonebot.adapters.qq import  MessageSegment

image = on_command("本地图", rule=to_me(), priority=10, block=True)

@image.handle()
async def handle_function():
    local_image_path = "path/to/your/image.jpg"
    await image.finish(MessageSegment.file_image(Path(local_image_path)))
```

注意，MessageSegment.file\_image()方法接收的并不是字符串，所以我们需要使用Path()将其转换为Path对象。

发送URL图片同样简单：使用MessageSegment.image()

```
from pathlib import Path
from nonebot.rule import to_me
from nonebot.plugin import on_command
from nonebot.adapters.qq import MessageSegment

image = on_command("在线图", rule=to_me(), priority=10, block=True)

@image.handle()
async def handle_function():
    url = "www.example.com/image.jpg"
    await image.finish(MessageSegment.image(url))
```

注意链接一定要是图片的直链，即链接结尾是xxx.jpg或png。

②发送视频

和图片一样，nonebot可以发送本地视频和在线视频。

仅需使用

```
MessageSegment.video(video_url) # 发送url链接的视频

MessageSegment.file_video(Path("path/to/your/video.mp4")) # 发送本地视频
```

③图文并排

有些时候，我们想像qq客户端一样，发送一条带图片的消息，这也非常好实现：

```
from nonebot.rule import to_me
from nonebot.plugin import on_command
from nonebot.adapters.qq import  MessageSegment

image_text = on_command("图文", rule=to_me(), priority=10, block=True)

@image_text.handle()
async def handle_function():
    url = "www.example.com/image.jpg"
    content = "这是你的图片哦"
    
    msg = Message([
            MessageSegment.image(url),
            MessageSegment.text(content),
        ])
    await image_text.send(msg)
```

## 5.高阶玩法（其实是基础玩法）

以上便是几个常用的基础用法啦，现在我们到了最激动人心的实战环节。

比如说我们可以在项目src/plugins/目录下新建一个weather.py

使用天气api来搭建一个查询天气的功能。

```
from nonebot.rule import to_me
from nonebot.plugin import on_command
from nonebot.adapters import Message
from nonebot.params import CommandArg

weather = on_command("天气", rule=to_me(), aliases={"weather", "查天气"}, priority=10, block=True)

@weather.handle()
async def handle_function(args: Message = CommandArg()):

    # 提取参数纯文本作为地名，并判断是否有效
    if location := args.extract_plain_text():
        # 调用天气查询API获取天气数据
        weather_data = format_weather(location)
        await weather.finish(weather_data)
    else:
        await weather.finish("请输入地名")

import requests

def get_weather(location):
    # 设置请求的URL和参数
    url = f'https://apis.juhe.cn/simpleWeather/query?key=50a3bd415158e186903d6e6994157589&city={location.rstrip("市").rstrip("县").rstrip("区")}'
    # 发送GET请求
    response = requests.get(url)
    # 检查请求是否成功
    if response.status_code == 200:
        # 解析返回的JSON数据
        data = response.json()

        # 检查是否查询成功
        if data['reason'] == '查询成功!' or data['reason'] == '查询成功':
            # 返回天气数据
            return data['result']
        else:
            return {"error": "查询失败: " + data['reason']}
    else:
        return {"error": "请求失败，状态码: " + str(response.status_code)}

# 调用函数并处理返回的天气数据
def format_weather(location):
    # 假设这里你已经有了城市的URL编码，这里用'%E9%87%8D%E5%BA%86'作为示例
    city_encoded = location  # 重庆的URL编码
    weather_data = get_weather(city_encoded)

    # 检查是否返回了错误
    if 'error' in weather_data:
        return weather_data['error']
    else:
        # 实时天气
        realtime_weather = weather_data['realtime']
        result = "\n" + location.rstrip("市").rstrip("县").rstrip("区") + f"实时天气:" + "\n" +  f"{realtime_weather['info']}, 温度: {realtime_weather['temperature']}℃, 湿度: {realtime_weather['humidity']}%, 风向: {realtime_weather['direct']}, 风力: {realtime_weather['power']}级, AQI: {realtime_weather['aqi']}"
        # 未来几天的天气
        result = result + "\n" + "未来几天的天气:🌤⛈️☔️"
        for day in weather_data['future']:
            result = result + "\n" + f"日期: {day['date']}, 天气: {day['weather']}, 温度: {day['temperature']}, 风向: {day['direct']}"
        return result

```

在启动bot之后，便可以在群聊中at它 “/天气 海口” 或者其它地名啦。

# 三、你都看到这儿了

为什么不加一下我们的QQ群(710101225)来和代码领域大神群u们一起吹水呢（doge）

如果你喜欢，非常感谢能给我们的[仓库](https://github.com/ClovertaTheTrilobita/SanYeCao-Nonebot)点个star。 ​
