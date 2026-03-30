---
title: "(Step-by-Step Code Explanation) Building a QQ Group Chat Bot with Nonebot2 + Official API"
pubDate: 2025-04-14
description: "Built a QQ bot with Nonebot2 and the official API, together with the group homies."
author: "Cloverta"
image:
    url: "https://files.seeusercontent.com/2026/03/30/oGv3/de040e63935cfba0864716e0e3577515.webp"
    alt: "img"
tags: ["Python", "Nonebot2", "QQ Bot", "Tutorial"]
---

<p style="font-size: 0.85rem;"><i><sub>Content translated by <a href="https://www.deepseek.com/">DeepSeek</a>.</sub></i></p>

Previously, together with the group homies, we built a group chat bot based on Nonebot2's QQ adapter.

Code Repository: [GitHub - ClovertaTheTrilobita/SanYeCao-Nonebot: A QQ group chat bot based on Nonebot + Official API](https://github.com/ClovertaTheTrilobita/SanYeCao-Nonebot)

For the basic configuration of the Nonebot2 QQ adapter + QQ Open Platform tutorial, **it's recommended to first follow this to get Nonebot configured**:

[(QQ Bot Setup) Building an Official QQ Bot with NoneBot2 - Easy to Get Started - CSDN Blog](https://blog.csdn.net/weixin_58403216/article/details/144715878)

Nonebot Official Documentation:

[Quick Start | NoneBot](https://nonebot.dev/docs/quick-start)

QQ Discussion Group: 710101225

Welcome to join the discussion~

# I. What You Need to Know Before Starting

### 0. First, an Editor (Required)

It is recommended to use [PyCharm](https://www.jetbrains.com/zh-cn/pycharm/) or [Visual Studio Code](https://code.visualstudio.com/)

If you are a vim master or a terrifying Notepad user, forget I said anything (jk).

### 1. Basic Python Syntax (Required)

If you are not familiar with Python or have no programming foundation, it is suggested to refer to:

[Python3 Tutorial](https://www.runoob.com/python3/python3-tutorial.html)

### 2. Basic Git Usage

[Git Installation and Configuration Tutorial (Beginner's Guide 2024 Latest Edition) - CSDN Blog](https://blog.csdn.net/weixin_44406127/article/details/137540031)

### 3. Anaconda Python Distribution (Recommended)

[Latest and Most Detailed Anaconda Beginner Installation + Configuration + Environment Creation Tutorial - CSDN Blog](https://blog.csdn.net/qq_44000789/article/details/142214660)

# II. Let's Get Started

As everyone knows, the hardest step in computing is setting up the environment. If you've completed the above steps, you're 90% of the way to success (not really).

## 1. Nonebot2 Project Structure

The typical Nonebot2 project structure is:

**bot.py # Program entry point**

and

**plugins # Plugins**

`bot.py` is the program we need to run when starting the bot backend. For specific events, like the command "/weather", we write the program in the `plugins` directory.

In `bot.py`, we generally configure it as follows:

```python
import nonebot
from nonebot.adapters.qq import Adapter as QQAdapter
from nonebot import logger
from nonebot.log import default_format, default_filter

nonebot.init() # Initialize nonebot

driver = nonebot.get_driver() # Set the driver
driver.register_adapter(QQAdapter)  # Register the QQ adapter

nonebot.load_builtin_plugins('echo', 'single_session') # Add some built-in plugins
nonebot.load_from_toml("pyproject.toml") # Load configuration file

logger.add("error.log", level="ERROR", format=default_format, rotation="1 week") # Log output

if __name__ == "__main__":
    nonebot.run()
```

Of course, just understand the above code. What we mainly need to figure out are Nonebot's event matchers and event handlers.

## 2. Event Matchers

When using a QQ group chat bot, we often see commands sent to the bot, like "/weather", and the bot replies with the corresponding content. How is this implemented?

### 1) The `on_command()` Matcher

Nonebot2 provides a very convenient matcher: `on_command()`

Here's the code:

```python
from nonebot import on_command
from nonebot.rule import to_me

weather = on_command("天气", rule=to_me(), aliases={"weather", "查天气"}, priority=10, block=True)
@weather.handle()
async def get_weather():
    await weather.send("The weather is...")
```

![](images/193b4709-1d76-48b0-8288-3b557e959773)

In the above code, we used the `on_command()` matcher to create the simplest bot command response function.

Its logic is:

After the bot receives the "/weather" command, it calls the `get_weather()` method: sends a message "The weather is..." to the QQ group.

> *Parameters in the `on_command()` matcher:*
>
>         *`"天气"`: When the "/weather" command is received, trigger the matcher.*
>
>         *`rule=to_me()`: The command is directed at me (the bot).*
>
>         *`aliases={"weather", "查天气"}`: Command aliases. When a user sends "/weather" or "/查天气", this matcher is also triggered.*
>
>         *`priority=10`: Priority is 10. The smaller the number, the higher the priority. For example, if there is another matcher for the same "/weather" command but with `priority=9`, then the matcher with `priority=9` will be triggered first.*
>
>         *`block=True`: After this matcher is triggered, other matchers will not be triggered. In the previous example, if the `priority=9` matcher is triggered and its `block=True`, then this `priority=10` matcher with the same name will not be triggered.*

### 2) The `on_keyword()` Matcher

It's quite similar to `on_command()`.

```python
from nonebot import on_keyword
from nonebot.rule import to_me

weather = on_keyword({"天气", "weather", "查天气"}, rule=to_me(), priority=10, block=True)
@weather.handle()
async def get_weather():
    await weather.send("The weather is...")
```

In the above example, **as long as** the message sent by the user **contains** **any one or more** of the three words "天气", "weather", "查天气", this matcher will be triggered.

### 3) The `on_message()` Matcher

This matcher is triggered whenever a user sends a message to the bot. We generally use it to handle non-standard user input.

```python
from nonebot import on_message
from nonebot.rule import Rule, to_me
from nonebot.adapters.qq import MessageEvent

menu = ["/天气", "/查天气", "/摸摸"]

async def check_value_in_menu(message: MessageEvent) -> bool:
    value = message.get_plaintext().strip().split(" ") # Get the plain text sent by the user and split it into a string array by spaces.
    if value[0] in menu: # If the first element in the array is in the 'menu' array, return False.
        return False
    else:
        return True

check = on_message(rule=to_me() & Rule(check_value_in_menu), block=True, priority=10)
@check.handle()
async def handle_function(message: MessageEvent):
    await check.finish("Please enter a valid command.")
```

We can see that the `on_message()` matcher no longer requires passing a string like the previous two matchers.

Suppose the user correctly inputs the command: "/天气"

`on_message()` receives the message at this point, so it calls the `check_value_in_menu()` method to check if the command is in the `menu` list.

Clearly it exists, so the `check_value_in_menu()` method returns `False`, which does not satisfy the trigger condition of `on_message()`, so this matcher will not be triggered.

Conversely, if the user sends "/天气是？", after `on_message()` receives the message, `check_value_in_menu()` detects that this command is not in the `menu` list and returns `True`.

At this point, the trigger condition for `on_message()` is satisfied, it sends "Please enter a valid command." to the user and terminates this session.

## 3. Getting Message Content

Our bot often needs to get the text content of the user's input in many applications.

For example, in the weather module mentioned above, our usual method is to send "/weather [location]" to the bot to query the weather for that area.

How do we get the text content of the user's message?

### 1) The Message Object

> The method of using dependency injection to obtain contextual information is very simple. We only need to declare the required dependencies in the function parameters and correctly add the function as an event handler dependency. In NoneBot, we can directly use the parameter types defined in the `nonebot.params` module to declare dependencies.

This is the explanation given by the Nonebot official documentation. It looks quite abstract, doesn't it?

Let's look at the code:

```python
from nonebot import on_command
from nonebot.rule import to_me
from nonebot.adapters import Message
from nonebot.params import CommandArg

weather = on_command("天气", rule=to_me(), aliases={"weather", "查天气"}, priority=10, block=True)

@weather.handle()
async def get_weather(args: Message = CommandArg()):
    # Extract the plain text parameter as the location and check if it's valid.
    if location := args.extract_plain_text():
        await weather.finish(f"Today's weather in {location} is...")
    else:
        await weather.finish("Please enter a location.")
```

This is a slight modification to the previous weather module. When the matcher receives the "/weather" command, we save the Message object in the `args` variable, allowing us to get the text information entered by the user.

> There can be no space between the command and the parameter. The information obtained by `CommandArg()` is the content following the command with leading whitespace removed. For example: the parameter for the message "/天气 上海" is `上海`.

If the user sends "/天气 海口" to the bot, the bot will reply in the group chat: "Today's weather in Haikou is..."

### 2) The MessageEvent Object

This is equivalent to a more versatile Message object. Through it, you can get the user's [member_openid and group_openid](https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/unique-id.html). The official documentation hasn't been updated for a long time; actually, user IDs are now like this:

> - Different `bots` in a group chat scenario obtain different group unique identifiers `openid`, called `group_openid`.
> - The same `bot` in different groups obtains the same unique identifier `openid` for the same user within the group, called `member_openid`.
> - Different `bots` in the same group chat obtain different unique identifiers `openid` for the same user within the group.

So don't think about doxxing others, because you have no idea who they are.

Getting the user's unique identifier ID has many uses. For example, you can send different daily fortunes (a bot fashion accessory) to different users, or get a group "waifu," etc.

How to get it:

```python
from nonebot.adapters.qq import MessageEvent
from nonebot.plugin import on_command
from nonebot.rule import to_me

test = on_command("/test", rule=to_me(), priority=10, block=True)
@test.handle()
async def test_method(message: MessageEvent):
    member_openid = message.get_user_id()
```

Use the `get_user_id()` method from the MessageEvent object. It returns a string storing the user ID, which looks like a bunch of gibberish.

## 4. Sending Messages

Actually, we've already mentioned message sending in our previous examples. The most commonly used sending methods are `send()` and `finish()`.

### 1) The `send()` Method

We can see its basic usage in the earliest example:

```python
await weather.send("The weather is...")
```

This means sending a message to the group chat with the content "The weather is..."

### 2) The `finish()` Method

It is used similarly to `send()`. The only difference is: after using the `finish()` method, this session ends, and no more messages can be sent in this session.

For example, using the `send` method:

```python
from nonebot import on_command
from nonebot.rule import to_me

weather = on_command("天气", rule=to_me(), aliases={"weather", "查天气"}, priority=10, block=True)
@weather.handle()
async def get_weather():
    await weather.send("Querying for you, please wait~")
    await weather.send("The weather is...")
    await weather.finish("Query complete!")
```

When the user sends the "/weather" command, the bot will reply with the above three messages in sequence.

Note: `finish()` is equivalent to a `return` statement within a method. Code after the `finish()` method will not be executed.

> Warning: Since `finish` ends the event by raising a `FinishedException`, the exception might be caught by an unrestricted `try-except`, affecting the normal processing flow of the event and preventing it from ending properly. Please be sure to specify the error type in the exception catch or exclude all exceptions of type [MatcherException](https://nonebot.dev/docs/api/exception#MatcherException), or move `finish` outside the catch scope for use.

### 3) The MessageSegment Object

We often see QQ bots sending pictures, videos, etc., in group chats. It looks really enviable. Let's implement this feature now.

① Sending Images

Nonebot provides two sending methods: sending local images and sending images via URL.

Let's first look at local sending: using `MessageSegment.file_image()`

```python
from pathlib import Path
from nonebot.rule import to_me
from nonebot.plugin import on_command
from nonebot.adapters.qq import MessageSegment

image = on_command("本地图", rule=to_me(), priority=10, block=True)

@image.handle()
async def handle_function():
    local_image_path = "path/to/your/image.jpg"
    await image.finish(MessageSegment.file_image(Path(local_image_path)))
```

Note: `MessageSegment.file_image()` does not receive a string, so we need to use `Path()` to convert it into a Path object.

Sending URL images is equally simple: use `MessageSegment.image()`

```python
from nonebot.rule import to_me
from nonebot.plugin import on_command
from nonebot.adapters.qq import MessageSegment

image = on_command("在线图", rule=to_me(), priority=10, block=True)

@image.handle()
async def handle_function():
    url = "www.example.com/image.jpg"
    await image.finish(MessageSegment.image(url))
```

Note that the link must be a direct link to the image, meaning the link ends with xxx.jpg or png.

② Sending Videos

Like images, Nonebot can send local videos and online videos.

Simply use:

```python
MessageSegment.video(video_url) # Send a video from a URL link

MessageSegment.file_video(Path("path/to/your/video.mp4")) # Send a local video
```

③ Image and Text Side-by-Side

Sometimes, we want to send a message with an image, just like in the QQ client. This is also very easy to implement:

```python
from nonebot.rule import to_me
from nonebot.plugin import on_command
from nonebot.adapters.qq import Message, MessageSegment

image_text = on_command("图文", rule=to_me(), priority=10, block=True)

@image_text.handle()
async def handle_function():
    url = "www.example.com/image.jpg"
    content = "Here's your picture"

    msg = Message([
            MessageSegment.image(url),
            MessageSegment.text(content),
        ])
    await image_text.send(msg)
```

## 5. Advanced Play (Actually Basic Play)

The above are several commonly used basic methods. Now we've reached the most exciting part: practical application.

For example, we can create a new `weather.py` in the project's `src/plugins/` directory.

Use a weather API to build a weather query function.

```python
from nonebot.rule import to_me
from nonebot.plugin import on_command
from nonebot.adapters import Message
from nonebot.params import CommandArg

weather = on_command("天气", rule=to_me(), aliases={"weather", "查天气"}, priority=10, block=True)

@weather.handle()
async def handle_function(args: Message = CommandArg()):

    # Extract the plain text parameter as the location and check if it's valid.
    if location := args.extract_plain_text():
        # Call the weather query API to get weather data.
        weather_data = format_weather(location)
        await weather.finish(weather_data)
    else:
        await weather.finish("Please enter a location.")

import requests

def get_weather(location):
    # Set the request URL and parameters.
    url = f'https://apis.juhe.cn/simpleWeather/query?key=50a3bd415158e186903d6e6994157589&city={location.rstrip("市").rstrip("县").rstrip("区")}'
    # Send a GET request.
    response = requests.get(url)
    # Check if the request was successful.
    if response.status_code == 200:
        # Parse the returned JSON data.
        data = response.json()

        # Check if the query was successful.
        if data['reason'] == '查询成功!' or data['reason'] == '查询成功':
            # Return the weather data.
            return data['result']
        else:
            return {"error": "Query failed: " + data['reason']}
    else:
        return {"error": "Request failed, status code: " + str(response.status_code)}

# Call the function and process the returned weather data.
def format_weather(location):
    # Assume you already have the URL-encoded city name here. Using '%E9%87%8D%E5%BA%86' as an example forqing.
    city_encoded = location  # URL-encoded for the city
    weather_data = get_weather(city_encoded)

    # Check if an error was returned.
    if 'error' in weather_data:
        return weather_data['error']
    else:
        # Real-time weather.
        realtime_weather = weather_data['realtime']
        result = "\n" + location.rstrip("市").rstrip("县").rstrip("区") + f" Real-time Weather:" + "\n" + f"{realtime_weather['info']}, Temperature: {realtime_weather['temperature']}℃, Humidity: {realtime_weather['humidity']}%, Wind Direction: {realtime_weather['direct']}, Wind Force: {realtime_weather['power']} level, AQI: {realtime_weather['aqi']}"
        # Weather for the next few days.
        result = result + "\n" + "Weather for the next few days:🌤⛈️☔️"
        for day in weather_data['future']:
            result = result + "\n" + f"Date: {day['date']}, Weather: {day['weather']}, Temperature: {day['temperature']}, Wind Direction: {day['direct']}"
        return result
```

After starting the bot, you can @ it in the group chat with "/weather Haikou" or other place names.

# III. You've Made It This Far

Why not join our QQ group (710101225) to chat and vibe with the code wizards and group homies? (doge)

If you liked this, we'd really appreciate a star on our [repository](https://github.com/ClovertaTheTrilobita/SanYeCao-Nonebot). 