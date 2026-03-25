---
title: "（教程）在已有Windows的情况下安装NixOS双系统"
pubDate: 2025-08-01
description: '一个萌新友好（应该）的NixOS双系统安装教程。'
author: "三叶"
image: 
    url: "https://files.seeusercontent.com/2026/03/25/zhK7/pasted-image-1774459137516.webp"
    alt: "baka"
tags:  ["操作系统", "NixOS"]

---

# 在已有Windows的情况下安装NixOS双系统

在网上找了些现有的NixOS安装教程，但其中很多已过时/不可用。

所以便想着将之前参考的博客整合一下，制作一个萌新友好的NixOS双系统安装教程。

## 1.开始前的准备

在安装NixOS之前，我们需要对计算机上已有的Windows进行一些设置。

### 关闭快速启动

若不关闭 Windows 的快速启动，可能会导致 NixOS 掉网卡。

打开控制面板，在

```
控制面板\硬件和声音\电源选项\系统设置
```

中，找到 **关机设置>快速启动(推荐)** 将其取消勾选

![pasted-image-1774459292989.webp](https://files.seeusercontent.com/2026/03/25/pXg9/pasted-image-1774459292989.webp)

### 腾出NixOS需要的磁盘空间

可以使用DiskGenius、分区助手等软件操作硬盘剩余空间，如果需要日常使用，建议给NixOS分200GB以上的硬盘空间。

![pasted-image-1774459307930.webp](https://files.seeusercontent.com/2026/03/25/6xIx/pasted-image-1774459307930.webp)

### 制作引导媒介

制作引导盘推荐使用[Rufus](https://rufus.ie/zh/)，非常简洁易用，当然[Ventoy](https://www.ventoy.net/cn/download.html)之类的其它软件都行。

首先，我们从[NixOS官网](https://nixos.org/download/)下载官方镜像。

这边推荐使用Minimal ISO image，图形界面在安装上会出现很多麻烦。

![pasted-image-1774459311524.webp](https://files.seeusercontent.com/2026/03/25/Wgc9/pasted-image-1774459311524.webp)

根据你的CPU选择合适的类型。例如你是x86架构的CPU（Intel或者AMD）就选择上方的Intel/AMD。

下载好后，插入U盘（至少2GB大小），打开Rufus。

- 设备选择你刚插入的U盘

- 引导类型选择你刚刚下好的iso文件

- 分区类型选择GPT

- 目标系统类型选择UEFI

![pasted-image-1774459315299.webp](https://files.seeusercontent.com/2026/03/25/lZv1/pasted-image-1774459315299.webp)

点击 **开始** 。并在弹窗中选择 **以 ISO 镜像 模式写入(推荐)** 。

![pasted-image-1774459318819.webp](https://files.seeusercontent.com/2026/03/25/l2Hy/pasted-image-1774459318819.webp)

点击 **OK** 。

稍等片刻，坐和放宽。

等写入完成后，我们就可以进行下一步啦。

## 2\. 调整启动项

### 进入计算机BIOS

重启电脑，并在电脑制造商标识在屏幕上亮起时长按 `F2` 以进入BIOS。

当然每个厂商的BIOS键不同，具体BIOS界面也不同，具体是啥还得自己去查询一下。

### 关闭Secure Boot

下面贴一个从别的博客扒来的图。

![pasted-image-1774459322972.webp](https://files.seeusercontent.com/2026/03/25/ys4V/pasted-image-1774459322972.webp)

进入BIOS的高级设置（Advanced），当然不同的电脑对此的称呼不一样，找到 **Security>Secure Boot** 将其关闭。

保存并重启计算机，一般来说点击保存后计算机会自动重启。

在厂商LOGO处再次长按进入BIOS，此时如果你的引导U盘正常插入电脑，你应该可以看到一个对应的启动项 **UEFI: USB, Partition 1 (USB)** ，将其调整为优先级最高，即拖拽到最上面。

![pasted-image-1774459326764.webp](https://files.seeusercontent.com/2026/03/25/j9Kz/pasted-image-1774459326764.webp)

因为我的电脑上已经装过一个NixOS了，所以请忽略最上面的NixOS-boot。如果你的电脑没安装过其他系统，应该只能看到 `Windows Boot Manager` 和下面的 `UEFI: USB` 。

## 进入Live CD安装模式

首先你会进入一个NixOS的引导界面，内容大致是让你选择要安装什么类型的nixos，我们选择默认的第一个就好，接着，你将看到如下CLI界面：

![pasted-image-1774459330911.webp](https://files.seeusercontent.com/2026/03/25/8eUs/pasted-image-1774459330911.webp)

同样，上图是我从别人那里搞过来的（因为我懒），我们要安装的是NixOS25.05，版本号和上面的上古老图不一样很正常。

因为我们选择的是最小化安装，是没有让你点击的UI的，我们当前进入的界面就是大名鼎鼎的`tty`。

注意：当前的系统是完全运行在U盘上的，我们接下来要做的就是将其安装至电脑的硬盘上。

### 启用WiFi

首先我们要做的是——联网。

如果你有网线连接电脑可以跳过这一步。

启动`wpa_supplicant`服务：

```
sudo systemctl start wpa_supplicant 
```

进入交互模式：

```
sudo wpa_cli
```

在 命令行中依次输入：

```
> add_network
0
> set_network 0 ssid "你家 WIFI 的 名字"
OK
> set_network 0 psk "WIFI 密码"
OK
> set_network 0 key_mgmt WPA-PSK
OK
> enable_network 0
OK
```

如果出现类似如下输出

```
<3>CTRL-EVENT-CONNECTED - Connection to 32:85:ab:ef:24:5c completed [id=0 id_str=]
```

并一直有收发包日志在终端输出就说明连接成功。

此时可以直接在终端输入quit并回车退出。

如果你不放心，可以ping一下这个博客

```
ping blog.cloverta.top
```

如果受到了大部分或全部的包说明连接正常。

### 更换国内镜像源

众所周知，由于不可抗力，NixOS的官方源我们不一定连的上。

```
sudo -i
nix-channel --add https://mirrors.ustc.edu.cn/nix-channels/nixos-unstable nixos
nix-channel --update  # 更新并解包频道
```

添加电子科大源。

## 分区

还记得我们之前为NixOS分出的磁盘空间吗，现在我们要利用好它。

在命令行中输入

```
lsblk 
```

你大概能得到一个类似这样的输出：

```
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    1  57.3G  0 disk 
└─sda1        8:1    1  57.3G  0 part /run/media/cloverta/NIXOS-MINIM
nvme0n1     259:0    0 953.9G  0 disk 
├─nvme0n1p1 259:1    0 113.1G  0 part 
└─nvme0n1p2 259:2    0   512G  0 part
```

其中`sda`对应的是你的U盘，`nvme0n1`对应的是你的计算机固态硬盘，`nvme0n1p1`、`nvme0n1p2`是你电脑上已有的磁盘分区。

假设你电脑里装了好几个硬盘，那么还会有`nvme1n1`之类的。

**一定要看准了你是在哪个硬盘上进行操作！！别一不小心把windows的C盘删了（**

如果你分区是在`nvme0n1`上进行的（很明显上述信息中两个分区的大小远小于硬盘总大小），那么输入

```
cfdisk /dev/nvme0n1
```

我们就能看到一个类似如下的界面

![pasted-image-1774459338907.webp](https://files.seeusercontent.com/2026/03/25/tE7b/pasted-image-1774459338907.webp)

当然，你看到的肯定是英文的。

你界面上的下方的选择框应该有如下选项

```
[ Delete ] [ New ] [ Quit ] [ Help ] [ Write ] [ Dump ]
```

先选中free的磁盘空间，选择New新建分区，手动输入大小。

我们需要建立两个分区，一个主分区，另一个是boot分区。boot分区建议512MB的空间。

两个分区类型都选择`Primary`，建立好分区之后，再次输入`lsblk`查看分区情况，应该能看到这两个分区

```
❯ lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    1  57.3G  0 disk 
└─sda1        8:1    1  57.3G  0 part /run/media/cloverta/NIXOS-MINIM
nvme0n1     259:0    0 953.9G  0 disk 
├─nvme0n1p1 259:1    0 113.1G  0 part 
├─nvme0n1p2 259:2    0   512G  0 part 
├─nvme0n1p3 259:3    0   0.5G  0 part 
└─nvme0n1p4 259:4    0 327.8G  0 part 
```

接下来我们需要格式化这两个新增的分区，**注意看准了分区号！**

例如上述新增的两个分区为`nvme0n1p3`和`nvme0n1p4`，但如果你新增的分区为`nvme0n1p5`，在后续操作中要更改对应的分区号，千万别输错了（

那我们以上述分区号为例。

我们可以看到`nvme0n1p3`是我们计划作为boot分区使用的，那我们现在格式化它为FAT32格式

```
mkfs.fat -F 32 -n boot /dev/nvme0n3
```

接着，我们将主分区格式化为btrfs格式

```
mkfs.btrfs -L nixos /dev/nvme0n1p4
```

之后将这两个分区挂载到NixOS的文件系统上

```
mount /dev/nvme0n1p4 /mnt
mkdir -p /mnt/boot
mount /dev/nvme0n1p3 /mnt/boot
```

接下来检查一下是否挂在成功

```
❯ lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    1  57.3G  0 disk 
└─sda1        8:1    1  57.3G  0 part /run/media/cloverta/NIXOS-MINIM
nvme0n1     259:0    0 953.9G  0 disk 
├─nvme0n1p1 259:1    0 113.1G  0 part 
├─nvme0n1p2 259:2    0   512G  0 part 
├─nvme0n1p3 259:3    0   0.5G  0 part /boot
└─nvme0n1p4 259:4    0 327.8G  0 part /nix/store
```

## 编辑系统配置

想必你肯定听说过大名鼎鼎的Nix声明式的系统配置方式，那我这里就不多赘述。

NixOS将所有的系统配置保存在一个名为`configuration.nix`的文件下，任何对系统的更改、管理和安装软件等等，你只需要修改这个`configuration.nix`就行，不需要手动去配置复杂的依赖和令人头疼的冲突，NixOS会帮你全都做好！

如果做不好你也可以随时把`configuration.nix`改回来，从根源上避免了滚挂（说你呢Arch

现在，我们生成一个系统默认配置文件：

```
nixos-generate-config --root /mnt
```

然后编辑配置

```
vim /mnt/etc/nixos/configuration.nix
```

你应该会看到一个类似这样的配置文件:

```
{ config, lib, pkgs, ... }:

{
  imports =
    [ # Include the results of the hardware scan.
      ./hardware-configuration.nix
    ];

  # Use the systemd-boot EFI boot loader.
  # boot.loader.systemd-boot.enable = true;
  # boot.loader.efi.canTouchEfiVariables = true;

  networking.hostName = "nixos"; # Define your hostname.
  # Pick only one of the below networking options.
  # networking.wireless.enable = true;  # Enables wireless support via wpa_supplicant.
  # networking.networkmanager.enable = true;  # Easiest to use and most distros use this by default.

  # Set your time zone.
  # time.timeZone = "";

  # Configure network proxy if necessary
  # networking.proxy.default = "http://user:password@proxy:port/";
  # networking.proxy.noProxy = "127.0.0.1,localhost,internal.domain";

  # Select internationalisation properties.
  i18n = "en_US.UTF-8";

  # Enable the X11 windowing system.
  # services.xserver.enable = true;

  
  # Configure keymap in X11
  # services.xserver.xkb.layout = "us";
  # services.xserver.xkb.options = "eurosign:e,caps:escape";

  # Enable CUPS to print documents.
  # services.printing.enable = true;

  # Enable sound.
  # services.pulseaudio.enable = true;
  # OR
  # services.pipewire = {
  #  enable = true;
  #  pulse.enable = true;
  # };

  # Enable touchpad support (enabled default in most desktopManager).
  # services.libinput.enable = true;

  # Define a user account. Don't forget to set a password with ‘passwd’.
  # users.users.Alice = {
  # isNormalUser = true;
  # extraGroups = [ "wheel" ]; # Enable ‘sudo’ for the user.
  # packages = with pkgs; [
  #   tree
  # ];
  # };

  # programs.firefox.enable = true;

  # List packages installed in system profile.
  # You can use https://search.nixos.org/ to find more packages (and options).
  environment.systemPackages = with pkgs; 
    [
      vim # Do not forget to add an editor to edit configuration.nix! The Nano editor is also installed by default.
    ];

  # Some programs need SUID wrappers, can be configured further or are
  # started in user sessions.
  # programs.mtr.enable = true;
  # programs.gnupg.agent = {
  #   enable = true;
  #   enableSSHSupport = true;
  # };

  # List services that you want to enable:

  # Enable the OpenSSH daemon.
  # services.openssh.enable = true;

  # Open ports in the firewall.
  # networking.firewall.allowedTCPPorts = [ ... ];
  # networking.firewall.allowedUDPPorts = [ ... ];
  # Or disable the firewall altogether.
  # networking.firewall.enable = false;

  # Copy the NixOS configuration file and link it from the resulting system
  # (/run/current-system/configuration.nix). This is useful in case you
  # accidentally delete configuration.nix.
  # system.copySystemConfiguration = true;
  
  # This option defines the first version of NixOS you have installed on this particular machine,
  # and is used to maintain compatibility with application data (e.g. databases) created on older NixOS versions.
  #
  # Most users should NEVER change this value after the initial install, for any reason,
  # even if you've upgraded your system to a new NixOS release.
  #
  # This value does NOT affect the Nixpkgs version your packages and OS are pulled from,
  # so changing it will NOT upgrade your system - see https://nixos.org/manual/nixos/stable/#sec-upgrading for how
  # to actually do that.
  #
  # This value being lower than the current NixOS release does NOT mean your system is
  # out of date, out of support, or vulnerable.
  #
  # Do NOT change this value unless you have manually inspected all the changes it would make to your configuration,
  # and migrated your data accordingly.
  #
  # For more information, see `man configuration.nix` or https://nixos.org/manual/nixos/stable/options#opt-system.stateVersion .
  system.stateVersion = "25.05"; # Did you read the comment?

}
```

这是最最最简的NixOS配置文件，现在我们来安装桌面环境：

### 基础配置

#### 0.配置Grub以引导多系统开机

找到上述配置文件的

```
  # Use the systemd-boot EFI boot loader.
  # boot.loader.systemd-boot.enable = true;
  # boot.loader.efi.canTouchEfiVariables = true;
```

我们添加自己的grub配置

```
  # Use the systemd-boot EFI boot loader.
  # boot.loader.systemd-boot.enable = true;
  boot.loader = {
    efi = {
      canTouchEfiVariables = true;
      efiSysMountPoint = "/boot";
    };
    grub = {
      enable = true;
      device = "nodev";
      useOSProber = true;
      efiSupport = true;
    };
  };
```

#### 1.配置语言

找到上述配置文件中的

```
  # Select internationalisation properties.
  i18n.defaultLocale = "en_US.UTF-8";
```

如果不是`en_US.UTF-8`我们先将其设置为英文。

#### 2.配置网络

找到配置文件中的

```
  # Pick only one of the below networking options.
  # networking.wireless.enable = true;  # Enables wireless support via wpa_supplicant.
  # networking.networkmanager.enable = true;  # Easiest to use and most distros use this by default.
```

这里我们使用networkmanager（更好用），就将下面那个解除注释

```
  # Pick only one of the below networking options.
  # networking.wireless.enable = true;  # Enables wireless support via wpa_supplicant.
  networking.networkmanager.enable = true;  # Easiest to use and most distros use this by default.
```

#### 3.配置时区

找到

```
 # Set your time zone.
 # time.timeZone = "";
```

将其改为

```
  # Set your time zone.
  time.timeZone = "Asia/Shanghai"
```

#### 4.配置声音

找到

```
  # Enable sound.
  # services.pulseaudio.enable = true;
  # OR
  # services.pipewire = {
  #  enable = true;
  #  pulse.enable = true;
  # };
```

我们使用pipwire

```
  # Enable sound.
  # services.pulseaudio.enable = true;
  # OR
  services.pipewire = {
   enable = true;
   pulse.enable = true;
  };
```

#### 5.配置用户

```
  # Define a user account. Don't forget to set a password with ‘passwd’.
  # users.users.alice = {
  # isNormalUser = true;
  # extraGroups = [ "wheel" ]; # Enable ‘sudo’ for the user.
  # packages = with pkgs; [
  #   tree
  # ];
  # };
```

将上面这段解除注释，并配置好你的用户名

例如我想给我的用户起名为cloverta，那么

```
  # Define a user account. Don't forget to set a password with ‘passwd’.
  users.users.cloverta = {
    isNormalUser = true;
    extraGroups = [ "wheel" ]; # Enable ‘sudo’ for the user.
    packages = with pkgs; [
      tree
    ];
  };
```

#### 6.启用firefox

programs.firefox.enable = true;

```
 programs.firefox.enable = true;
```

#### 7.启用SSH

```
  # Enable the OpenSSH daemon.
  # services.openssh.enable = true;
```

将下面那个解除注释

```
  # Enable the OpenSSH daemon.
  services.openssh.enable = true;
```

#### 8.配置镜像源

在上述配置文件中加入

```
nix.settings.substituters = [ "https://mirror.sjtu.edu.cn/nix-channels/store" ];
```

你还可以看看默认配置文件里有啥，可以根据你的喜好启用一些小功能，但是

#### 注意！！

千万不可以修改最后一行`system.stateVersion = "25.05";`的值，如果你一定要修改，准备好承担后果。

接下来我们选择两大经典图形桌面：

### GNOME

在配置文件中加入

```
  services.displayManager.gdm.enable = true;
  services.desktopManager.gnome.enable = true;
```

并在

```
environment.systemPackages = with pkgs;
[
  vim
]
```

这个区块中加入

```
gnomeExtensions.blur-my-shell
gnomeExtensions.just-perfection
gnomeExtensions.arc-menu
```

这些是一些实用的GNOME插件。

### KDE Plasma

不要加入上述内容，在配置文件中加入

```
  services.xserver.enable = true; # optional
  services.displayManager.sddm.enable = true;
  services.displayManager.sddm.wayland.enable = true;
  services.desktopManager.plasma6.enable = true;
```

并在`environment.systemPackages = with pkgs;[]`中加入

```
wget
kitty
kdePackages.kcalc
kdePackages.kcharselect
kdePackages.kcolorchooser
kdePackages.kolourpaint
kdePackages.ksystemlog
kdePackages.sddm-kcm
kdiff3
kdePackages.isoimagewriter
kdePackages.partitionmanager
hardinfo2
haruna
wayland-utils
```

## 部署系统

终于！我们完成了配置！好耶(ﾉ>ω<)ﾉ

现在安装系统：

```
sudo nixos-install --option substituters "https://mirror.sjtu.edu.cn/nix-channels/store"
```

之后，设置密码：

注意我的用户名是cloverta，你需要改成你自己在配置文件中设定的用户名。

nixos-enter # 进入部署好的系统，类似 arch 的 chroot passwd root # 重置 root 密码 useradd -m -G wheel cloverta # 添加普通用户，并加入 wheel 组 passwd cloverta # 设置普通账户密码

```
nixos-enter  # 进入部署好的系统，类似 arch 的 chroot
passwd root  # 重置 root 密码
useradd -m -G wheel cloverta  # 添加普通用户，并加入 wheel 组
passwd cloverta  # 设置普通账户密码
```

然后关机，不出意外的话还是需要你去 BIOS 调整一下启动项，推荐把 NixOS 的启动项拉到最前面，因为在 GRUB 的界面你能选择引导至 NixOS 还是 Windows。

现在！见证奇迹！屏幕亮起！ｷﾀ━━━━(ﾟ∀ﾟ)━━━━!!

## 一些后续配置

现在你有了桌面环境，那么修改配置文件的复制粘贴便方便了很多。

那么剩下的我便不再赘述。修改完`configuration.nix`后使用

```
sudo nixos-rebuild switch
```

即可应用最新更改

### 中文输入法

我们安装fcitx5，找到我们之前修改过的`i18n`变量，将其改为

```
  i18n = {
    defaultLocale = "zh_CN.UTF-8";
    supportedLocales = [ "zh_CN.UTF-8/UTF-8" "en_US.UTF-8/UTF-8" ];

    # Fcitx5
    inputMethod = {
      type = "fcitx5";
      enable = true;
      fcitx5 = {
        waylandFrontend = true;
        plasma6Support = true;
      };
      fcitx5.addons = with pkgs; [
        fcitx5-chinese-addons
        fcitx5-pinyin-moegirl
        fcitx5-pinyin-zhwiki
        fcitx5-configtool
        fcitx5-fluent
      ];
    }; 
  };
```

### 字体

```
  fonts = {
    packages = with pkgs; [
      noto-fonts
      noto-fonts-cjk-sans
      noto-fonts-emoji
      liberation_ttf
      fira-code
      fira-code-symbols
      mplus-outline-fonts.githubRelease
      dina-font
      proggyfonts
      wqy_microhei
      wqy_zenhei
      hack-font
      nerd-font-patcher
      jetbrains-mono
    ];
  };
```

### 使用zsh并进行终端美化

```
  # Install zsh
  programs.zsh = {
    enable = true;
    # enableCompletions = true;
    autosuggestions.enable = true;
    syntaxHighlighting.enable = true;

    shellAliases = {
      ll = "ls -l";
      update = "sudo nixos-rebuild switch";
    };
    # history.size = 10000;

    ohMyZsh = { # "ohMyZsh" without Home Manager
      enable = true;
      plugins = [ "git" "dirhistory" "history" "autojump" "catimg" "colorize" "sudo"  ];
      custom = "$HOME/.oh-my-zsh/custom/";
      theme = "powerlevel10k/powerlevel10k";
    };
  };
```

并在`sudo nixos-rebuild switch`后

```
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
```

如果提示omz找不到插件，去bing上搜索插件名称，找到他们的github仓库，根据README中的步骤安装就行。

### 安装英伟达驱动

请参考wiki：[Nvidia - NixOS Wiki](https://nixos.wiki/wiki/Nvidia)

* * *

那么，博客就先到这里啦，我安装毕竟也是好几个星期之前了，如果博客内容有误，非常欢迎在下方留言，或者联系我：cloverta@petalmail.com

* * *

## 参考文献：

[Installation - NixOS中文](https://nixos-cn.org/tutorials/installation)

[入门安装（nixos 从0实现全集 梦中情os ） - 小类随手记](https://dev.leiyanhui.com/nixos/1base-install)

[Archlinux+Windows 双系统安装教程（UEFI）2023.7 - NexusXian](https://www.cnblogs.com/NexusXian/p/17570030.html)

[KDE - NixOS Wiki](https://wiki.nixos.org/wiki/KDE)

[GNOME - NixOS Wiki](https://wiki.nixos.org/wiki/GNOME)

[Setup Zsh + Oh-my-zsh + PowerLevel10K - NixOS (without Home-manager) - NixOS Discourse](https://discourse.nixos.org/t/setup-zsh-oh-my-zsh-powerlevel10k-nixos-without-home-manager/58868)

[NixOS Manual](https://nixos.org/manual/nixos/stable/#sec-changing-config)