---
title: "(Tutorial) Installing Sunshine on Raspberry Pi 5 for LAN Streaming"
pubDate: 2025-04-21
description: 'Installing Sunshine on a Raspberry Pi'
author: "Cloverta"
image:
    url: "https://files.seeusercontent.com/2026/03/25/t2zJ/pasted-image-1774456500701.webp"
    alt: "img"
tags: ["Raspberry Pi", "Linux", "Tutorial"]
---

<p style="font-size: 0.85rem;"><i><sub>Content translated by <a href="https://www.deepseek.com/">DeepSeek</a>.</sub></i></p>

## 0. Before We Start

What we need to understand is that the Raspberry Pi 5 uses an arm64 architecture processor, so we need to make sure we get the correct Sunshine version for it.

Also, configuring Sunshine in a Linux environment can be a bit of a hassle, but it shouldn't be too bad (probably).

Let's get started.

## 1. Installing Sunshine

Link: [LizardByte: Sunshine for Linux](https://github.com/LizardByte/Sunshine/releases)

The Raspberry Pi uses a Debian-based operating system, so we need to find **sunshine-debian-bookworm-arm64.deb**. Click to download.

![pasted-image-1774456393003.webp](https://files.seeusercontent.com/2026/03/25/r9Ot/pasted-image-1774456393003.webp)

Transfer the downloaded .deb installation package to your Raspberry Pi (or just download it directly on the Pi).

Navigate to the directory containing the package and enter the following in the terminal:

```shell
dpkg -i sunshine-debian-bookworm-arm64.deb
```

to manually install Sunshine. Use the actual filename of your package.

If you encounter missing dependency issues, enter:

```shell
sudo apt-get install -f
```

to install the missing dependencies. After installing the dependencies, try installing the Sunshine .deb package again.

In the terminal, enter:

```shell
sunshine
```

and press Enter to check if the installation was successful.

**Note:** At this point, Sunshine will most likely fail to start because necessary configurations are missing.

So, let's move on to the next step.

## 2. Configuring the Raspberry Pi

### ① Update the System

Ensure your Raspberry Pi's software is up-to-date by running:

```shell
sudo apt update && sudo apt full-upgrade -y
```

This step is necessary because Wayland support might depend on system updates.

### ② Enable Wayland Support

In newer versions of Raspberry Pi OS, Wayland is enabled by default. However, if you encounter an error when using Sunshine like:

> Error: Environment variable WAYLAND_DISPLAY has not been defined

Then first, modify the boot configuration:

```shell
sudo nano /boot/firmware/config.txt
```

to open the boot configuration file. Add the following two lines at the end:

```shell
dtoverlay=vc4-fkms-v3d
max_framebuffers=2
```

to enable hardware acceleration. Save, exit, and reboot the device.

Afterwards, enter:

```shell
sudo raspi-config
```

to enter the Raspberry Pi system configuration. Navigate sequentially to:

>   6 Advanced Options
>
>   A6 Wayland
>
>   W3 Labwc (This is the recommended Wayland compositor for Raspberry Pi)

After configuration, reboot.

Open the VNC remote desktop (**make sure not to use an SSH terminal for this**). In the terminal, enter:

```shell
echo $XDG_SESSION_TYPE
```

If the output is `wayland`, the setup was successful.

### ③ Enable avahi-daemon

If you encounter an error:

> Error: Failed to create client: Daemon not running

Enter the following in the terminal:

```shell
systemctl enable avahi-daemon
```

## 3. Starting Sunshine

Excellent! All configurations should now be complete!

In the terminal of your VNC remote desktop, enter:

```shell
sunshine
```

to start Sunshine.

**Note:** If you don't have a virtual display installed, you need to ensure the Raspberry Pi has at least one desktop session active, whether via VNC or connected to a physical monitor. It's best not to start Sunshine via an SSH terminal.

If successful, you should see something like this in the terminal:

![pasted-image-1774456462002.webp](https://files.seeusercontent.com/2026/03/25/Cn4m/pasted-image-1774456462002.webp)

Ctrl + Left-click on `https://localhost:47990` to access the Sunshine Web UI through your browser. You should see the familiar interface.

![pasted-image-1774456481966.webp](https://files.seeusercontent.com/2026/03/25/Xk6z/pasted-image-1774456481966.webp)

The subsequent steps for connecting are the same as for the Windows version of Sunshine.

![pasted-image-1774456500701.webp](https://files.seeusercontent.com/2026/03/25/t2zJ/pasted-image-1774456500701.webp) 