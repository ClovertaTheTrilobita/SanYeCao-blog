---
title: "（教程）树莓派5安装sunshine实现局域网串流"
pubDate: 2025-04-21
description: '在树莓派上安装sunshine'
author: "三叶"
image: 
    url: "https://files.seeusercontent.com/2026/03/25/t2zJ/pasted-image-1774456500701.webp"
    alt: "img"
tags: ["树莓派", "Linux", "教程"]
---

**This blog post also has an English version, click here: [(tutorial) How to Stream Via Sunshine on Your Raspberry Pi 5](https://blog.cloverta.top/archives/203)**​

## 0.在开始之前

我们需要理解的是，树莓派5是arm64架构处理器，需要看准安装的sunshine版本。

并且Linux环境下配置sunshine会稍微有些麻烦，不过不会太麻烦（大概）

那我们开始吧。 

## 1.安装sunshine

链接：[LizardByte: Sunshine for Linux](https://github.com/LizardByte/Sunshine/releases)

树莓派使用的是基于Debian发行版的操作系统，所以我们需要找到 **sunshine-debian-bookworm-arm64.deb 。**单击下载

![pasted-image-1774456393003.webp](https://files.seeusercontent.com/2026/03/25/r9Ot/pasted-image-1774456393003.webp)

将下载好的deb安装包传入树莓派（或者直接在树莓派中下载也一样）。

进入安装包所在的目录，并在终端输入

```shell
dpkg -i sunshine-debian-bookworm-arm64.deb
```

```shell
dpkg -i sunshine-debian-bookworm-arm64.deb
```

以手动安装sunshine，具体包名请以你的文件名为准。

如果出现缺少依赖的问题，输入

```shell
sudo apt-get install -f
```

```shell
sudo apt-get install -f
```

安装缺失的依赖。安装好依赖后再安装一次sunshine的deb安装包。

终端输入

```shell
sunshine
```

```shell
sunshine
```

并回车，检查是否安装成功。

**注意：**到这一步，sunshine很有可能是没法启动的，因为缺失必要的配置。

那么紧接着下一步

## 2.配置树莓派

### ①更新系统

确保树莓派的软件是全新的，运行以下命令：

```shell
sudo apt update && sudo apt full-upgrade -y
```

```shell
sudo apt update && sudo apt full-upgrade -y
```

这一步是必要的，因为 Wayland 的支持可能依赖于系统更新。

### ②启用Wayland支持

在较新的 Raspberry Pi OS 版本中，Wayland 已默认启用。但如果你使用sunshine时出现报错

> Error: Environment variable WAYLAND\_DISPLAY has not been defined

 那么首先修改启动配置：

```shell
sudo nano /boot/firmware/config.txt
```

```shell
sudo nano /boot/firmware/config.txt
```

打开启动配置文件，在最后面添加两行

```shell
dtoverlay=vc4-fkms-v3d
max_framebuffers=2
```

```shell
dtoverlay=vc4-fkms-v3d
max_framebuffers=2
```

以启动硬件加速，保存并退出后重启设备。

之后，输入

```shell
sudo raspi-config
```

```shell
sudo raspi-config
```

进入树莓派系统配置，依次选择

>   6 Advanced Options
>
>   A6 Wayland 
>
>   W3 Labwc （这是树莓派推荐的 Wayland 合成器）

 配置完成后重启。

打开VNC远程桌面（切记不要用ssh终端），在终端中输入

```shell
echo $XDG_SESSION_TYPE
```

```shell
echo $XDG_SESSION_TYPE
```

如果输出结果是wayland说明设定成功。

### ③启用avahi-daemon

如果出现报错

> Error: Failed to create client: Daemon not running

 在终端中输入

```shell
systemctl enable avahi-daemon
```

```shell
systemctl enable avahi-daemon
```

## 3.启动sunshine

非常好！现在应当完成了所有配置！

在VNC远程桌面的终端输入

```shell
sunshine
```

```shell
sunshine
```

以启动sunshine。

**注意：**如果你没有安装虚拟显示器，需要保证树莓派至少开启了一个桌面，无论是VNC还是连接物理显示器。最好不要通过ssh终端启动sunshine。

成功的话应该能在终端看到

![pasted-image-1774456462002.webp](https://files.seeusercontent.com/2026/03/25/Cn4m/pasted-image-1774456462002.webp)

ctrl+鼠标左键单击https://localhost:47990，通过浏览器访问sunshine的Web UI，我们就能看到熟悉的界面啦。

![pasted-image-1774456481966.webp](https://files.seeusercontent.com/2026/03/25/Xk6z/pasted-image-1774456481966.webp)

之后的步骤和Windows端sunshine一样连接就可以了

![pasted-image-1774456500701.webp](https://files.seeusercontent.com/2026/03/25/t2zJ/pasted-image-1774456500701.webp)