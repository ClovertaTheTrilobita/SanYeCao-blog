---
title: "(Tutorial) Installing NixOS Dual Boot Alongside Existing Windows"
pubDate: 2025-08-01
description: 'A beginner-friendly (hopefully) NixOS dual-boot installation tutorial.'
author: "Cloverta"
image:
    url: "https://files.seeusercontent.com/2026/03/25/zhK7/pasted-image-1774459137516.webp"
    alt: "baka"
tags:  ["Operating Systems", "NixOS"]
---

<p style="font-size: 0.85rem;"><i><sub>Content translated by <a href="https://www.deepseek.com/">DeepSeek</a>.</sub></i></p>

# Installing NixOS Dual Boot Alongside Existing Windows

I looked for existing NixOS installation tutorials online, but many are outdated/unusable.

So, I thought about integrating the blogs I previously referenced to create a beginner-friendly NixOS dual-boot installation tutorial.

## 1. Preparations Before Starting

Before installing NixOS, we need to make some settings adjustments to the existing Windows installation on the computer.

### Disable Fast Startup

If Windows Fast Startup is not disabled, it might cause NixOS to lose network connectivity.

Open Control Panel, navigate to:

```
Control Panel\Hardware and Sound\Power Options\System Settings
```

Find **Shutdown settings > Turn on fast startup (recommended)** and uncheck it.

![pasted-image-1774459292989.webp](https://files.seeusercontent.com/2026/03/25/pXg9/pasted-image-1774459292989.webp)

### Free Up Disk Space for NixOS

You can use software like DiskGenius, Partition Assistant, etc., to manage the free space on your hard drive. For daily use, it's recommended to allocate at least 200GB of hard drive space for NixOS.

![pasted-image-1774459307930.webp](https://files.seeusercontent.com/2026/03/25/6xIx/pasted-image-1774459307930.webp)

### Create Bootable Media

It's recommended to use [Rufus](https://rufus.ie/zh/) to create a bootable USB drive. It's very simple and easy to use. Of course, other software like [Ventoy](https://www.ventoy.net/cn/download.html) will also work.

First, download the official ISO from the [NixOS website](https://nixos.org/download/).

It's recommended to use the Minimal ISO image, as the graphical installer can introduce many complications.

![pasted-image-1774459311524.webp](https://files.seeusercontent.com/2026/03/25/Wgc9/pasted-image-1774459311524.webp)

Choose the appropriate type based on your CPU. For example, if you have an x86 architecture CPU (Intel or AMD), choose the Intel/AMD option above.

After downloading, insert a USB drive (at least 2GB in size) and open Rufus.

- Device: Select the USB drive you just inserted.
- Boot selection: Choose the ISO file you just downloaded.
- Partition scheme: Select GPT.
- Target system type: Select UEFI.

![pasted-image-1774459315299.webp](https://files.seeusercontent.com/2026/03/25/lZv1/pasted-image-1774459315299.webp)

Click **Start**. In the pop-up window, select **Write in ISO image mode (Recommended)**.

![pasted-image-1774459318819.webp](https://files.seeusercontent.com/2026/03/25/l2Hy/pasted-image-1774459318819.webp)

Click **OK**.

Wait a moment, sit back and relax.

Once the writing is complete, we can proceed to the next step.

## 2. Adjust Boot Order

### Enter Computer BIOS

Restart your computer and press `F2` (or the key for your manufacturer) when the manufacturer's logo appears on the screen to enter the BIOS.

Of course, the BIOS key and interface vary by manufacturer, so you'll need to look up the specifics for your device.

### Disable Secure Boot

Here's an image borrowed from another blog.

![pasted-image-1774459322972.webp](https://files.seeusercontent.com/2026/03/25/ys4V/pasted-image-1774459322972.webp)

Enter the BIOS Advanced settings (the name may vary). Find **Security > Secure Boot** and disable it.

Save and restart the computer. Usually, the computer will restart automatically after saving.

Press the key again at the manufacturer's logo to enter the BIOS. If your bootable USB is properly inserted, you should see a corresponding boot option like **UEFI: USB, Partition 1 (USB)**. Set its priority to the highest, i.e., drag it to the top.

![pasted-image-1774459326764.webp](https://files.seeusercontent.com/2026/03/25/j9Kz/pasted-image-1774459326764.webp)

Since I already have a NixOS installed on my computer, please ignore the top NixOS-boot entry. If your computer hasn't installed other systems, you should only see `Windows Boot Manager` and the `UEFI: USB` entry below.

## Enter Live CD Installation Mode

First, you'll enter a NixOS boot menu, roughly asking you to choose what type of NixOS to install. We'll choose the default first option. Then, you'll see a CLI interface like this:

![pasted-image-1774459330911.webp](https://files.seeusercontent.com/2026/03/25/8eUs/pasted-image-1774459330911.webp)

Similarly, the image above is borrowed from someone else (because I'm lazy). We are installing NixOS 25.05, so the version number is different from the ancient image above, which is normal.

Since we chose the minimal installation, there is no clickable UI. The interface we are currently in is the famous `tty`.

Note: The current system is running entirely from the USB drive. What we need to do next is install it onto the computer's hard drive.

### Enable WiFi

The first thing we need to do is—connect to the network.

If you have an Ethernet cable connected to your computer, you can skip this step.

Start the `wpa_supplicant` service:

```shell
sudo systemctl start wpa_supplicant
```

Enter interactive mode:

```shell
sudo wpa_cli
```

In the command line, enter sequentially:

```shell
> add_network
0
> set_network 0 ssid "Your WiFi Name"
OK
> set_network 0 psk "WiFi Password"
OK
> set_network 0 key_mgmt WPA-PSK
OK
> enable_network 0
OK
```

If you see output similar to:

```shell
<3>CTRL-EVENT-CONNECTED - Connection to 32:85:ab:ef:24:5c completed [id=0 id_str=]
```

And there are continuous send/receive packet logs output in the terminal, it means the connection is successful.

You can now type `quit` and press Enter to exit.

If you're not sure, you can ping this blog:

```shell
ping blog.cloverta.top
```

If you receive most or all packets, the connection is normal.

### Switch to a Domestic Mirror Source

As we all know, due to certain reasons, we may not be able to connect to NixOS's official sources reliably.

```shell
sudo -i
nix-channel --add https://mirrors.ustc.edu.cn/nix-channels/nixos-unstable nixos
nix-channel --update  # Update and unpack the channel
```

Add the University of Electronic Science and Technology of China source.

## Partitioning

Remember the disk space we freed up for NixOS earlier? Now we need to make good use of it.

Enter the command:

```shell
lsblk
```

You should get output similar to this:

```shell
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    1  57.3G  0 disk 
└─sda1        8:1    1  57.3G  0 part /run/media/cloverta/NIXOS-MINIM
nvme0n1     259:0    0 953.9G  0 disk 
├─nvme0n1p1 259:1    0 113.1G  0 part 
└─nvme0n1p2 259:2    0   512G  0 part
```

Here, `sda` corresponds to your USB drive, `nvme0n1` corresponds to your computer's SSD, and `nvme0n1p1`, `nvme0n1p2` are the existing disk partitions on your computer.

If you have multiple hard drives installed, there might also be `nvme1n1`, etc.

**Make absolutely sure which hard drive you are operating on!! Don't accidentally delete your Windows C drive (**

If you performed partitioning on `nvme0n1` (clearly, the size of the two partitions in the above information is much smaller than the total hard drive size), then enter:

```shell
cfdisk /dev/nvme0n1
```

We will see an interface similar to the following:

![pasted-image-1774459338907.webp](https://files.seeusercontent.com/2026/03/25/tE7b/pasted-image-1774459338907.webp)

Of course, what you see will be in English.

The selection box at the bottom of your interface should have options like:

```
[ Delete ] [ New ] [ Quit ] [ Help ] [ Write ] [ Dump ]
```

First, select the free disk space, choose New to create a partition, and manually enter the size.

We need to create two partitions: one main partition and another boot partition. The boot partition is recommended to be 512MB.

Set the type of both partitions to `Primary`. After creating the partitions, enter `lsblk` again to check the partition status. You should see these two new partitions:

```shell
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

Next, we need to format these two new partitions. **Pay attention to the partition numbers!**

For example, the two new partitions above are `nvme0n1p3` and `nvme0n1p4`. But if your new partitions are `nvme0n1p5`, you need to change the corresponding partition numbers in subsequent operations. Don't get it wrong (

Let's take the above partition numbers as an example.

We can see that `nvme0n1p3` is planned to be used as the boot partition. Let's format it to FAT32:

```shell
mkfs.fat -F 32 -n boot /dev/nvme0n1p3
```

Then, format the main partition to btrfs format:

```shell
mkfs.btrfs -L nixos /dev/nvme0n1p4
```

Then mount these two partitions to the NixOS filesystem:

```shell
mount /dev/nvme0n1p4 /mnt
mkdir -p /mnt/boot
mount /dev/nvme0n1p3 /mnt/boot
```

Now check if the mounting was successful:

```shell
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

## Edit System Configuration

You must have heard of Nix's famous declarative system configuration method, so I won't elaborate much here.

NixOS saves all system configurations in a file called `configuration.nix`. Any changes to the system, management, software installation, etc., you only need to modify this `configuration.nix`! You don't need to manually configure complex dependencies and headaches caused by conflicts. NixOS will handle everything for you!

If something goes wrong, you can always revert `configuration.nix` back, fundamentally avoiding a broken system (looking at you, Arch).

Now, let's generate a default system configuration file:

```shell
nixos-generate-config --root /mnt
```

Then edit the configuration:

```shell
vim /mnt/etc/nixos/configuration.nix
```

You should see a configuration file similar to this:

```nix
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

This is the most minimal NixOS configuration file. Now let's install a desktop environment:

### Basic Configuration

#### 0. Grub for Dual Boot

Find the following section in the configuration file:

```
  # Use the systemd-boot EFI boot loader.
  # boot.loader.systemd-boot.enable = true;
  # boot.loader.efi.canTouchEfiVariables = true;
```

We'll add our own grub configuration:

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

#### 1. Configure Language

Find the following in the configuration file:

```
  # Select internationalisation properties.
  i18n.defaultLocale = "en_US.UTF-8";
```

If it's not `en_US.UTF-8`, set it to English first.

#### 2. Configure Network

Find:

```
  # Pick only one of the below networking options.
  # networking.wireless.enable = true;  # Enables wireless support via wpa_supplicant.
  # networking.networkmanager.enable = true;  # Easiest to use and most distros use this by default.
```

Here we'll use networkmanager (easier to use), so uncomment the second line:

```
  # Pick only one of the below networking options.
  # networking.wireless.enable = true;  # Enables wireless support via wpa_supplicant.
  networking.networkmanager.enable = true;  # Easiest to use and most distros use this by default.
```

#### 3. Configure Time Zone

Find:

```
 # Set your time zone.
 # time.timeZone = "";
```

Change it to:

```
  # Set your time zone.
  time.timeZone = "Asia/Shanghai"
```

#### 4. Configure Sound

Find:

```
  # Enable sound.
  # services.pulseaudio.enable = true;
  # OR
  # services.pipewire = {
  #  enable = true;
  #  pulse.enable = true;
  # };
```

We'll use pipewire:

```
  # Enable sound.
  # services.pulseaudio.enable = true;
  # OR
  services.pipewire = {
   enable = true;
   pulse.enable = true;
  };
```

#### 5. Configure User

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

Uncomment the above section and configure your username.

For example, I want my username to be cloverta, so:

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

#### 6. Enable Firefox

```
 programs.firefox.enable = true;
```

#### 7. Enable SSH

```
  # Enable the OpenSSH daemon.
  # services.openssh.enable = true;
```

Uncomment the second line:

```
  # Enable the OpenSSH daemon.
  services.openssh.enable = true;
```

#### 8. Configure Mirror Source

Add the following to the configuration file:

```
nix.settings.substituters = [ "https://mirror.sjtu.edu.cn/nix-channels/store" ];
```

You can also look at what's in the default configuration file and enable some small features according to your preferences, but

#### Caution!!

**Do NOT change the value of the last line `system.stateVersion = "25.05";`. If you must change it, be prepared to face the consequences.**

Now let's choose from two classic graphical desktops:

### GNOME

Add the following to the configuration file:

```
  services.displayManager.gdm.enable = true;
  services.desktopManager.gnome.enable = true;
```

And in the block:

```
environment.systemPackages = with pkgs;
[
  vim
]
```

Add:

```
gnomeExtensions.blur-my-shell
gnomeExtensions.just-perfection
gnomeExtensions.arc-menu
```

These are some useful GNOME extensions.

### KDE Plasma

Do not add the above content. Instead, add the following to the configuration file:

```
  services.xserver.enable = true; # optional
  services.displayManager.sddm.enable = true;
  services.displayManager.sddm.wayland.enable = true;
  services.desktopManager.plasma6.enable = true;
```

And add the following to `environment.systemPackages = with pkgs;[]`:

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

## Deploy the System

Finally! We've completed the configuration! Yay (ﾉ>ω<)ﾉ

Now install the system:

```
sudo nixos-install --option substituters "https://mirror.sjtu.edu.cn/nix-channels/store"
```

Afterwards, set the password:

Note: My username is cloverta. You need to change it to the username you set in the configuration file.

```
nixos-enter  # Enter the deployed system, similar to arch's chroot
passwd root  # Reset root password
useradd -m -G wheel cloverta  # Add a regular user and add to the wheel group
passwd cloverta  # Set the regular account password
```

Then shut down. You'll likely still need to go into the BIOS to adjust the boot order. It's recommended to move the NixOS boot entry to the top, as you'll be able to choose between booting into NixOS or Windows from the GRUB menu.

Now! Witness the miracle! The screen lights up! ｷﾀ━━━━(ﾟ∀ﾟ)━━━━!!

## Some Post-Installation Configuration

Now that you have a desktop environment, copying and pasting to modify the configuration file is much more convenient.

I won't elaborate on the rest. After modifying `configuration.nix`, use:

```
sudo nixos-rebuild switch
```

to apply the latest changes.

### Chinese Input Method

We'll install fcitx5. Find the `i18n` variable we modified earlier and change it to:

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

### Fonts

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

### Use Zsh and Beautify the Terminal

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

And after `sudo nixos-rebuild switch`:

```
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
```

If it prompts that omz cannot find a plugin, search for the plugin name on Bing, find their GitHub repository, and follow the steps in the README to install it.

### Install NVIDIA Drivers

Please refer to the wiki: [Nvidia - NixOS Wiki](https://nixos.wiki/wiki/Nvidia)

* * *

That's it for the blog. My installation was several weeks ago, so if there are any errors in the blog content, I welcome you to leave a comment below or contact me at: cloverta@petalmail.com

* * *

## References:

[Installation - NixOS Chinese](https://nixos-cn.org/tutorials/installation)

[Beginner Installation (NixOS from 0 Complete Collection Dream OS) - Xiao Lei's Random Notes](https://dev.leiyanhui.com/nixos/1base-install)

[Archlinux+Windows Dual Boot Installation Tutorial (UEFI) 2023.7 - NexusXian](https://www.cnblogs.com/NexusXian/p/17570030.html)

[KDE - NixOS Wiki](https://wiki.nixos.org/wiki/KDE)

[GNOME - NixOS Wiki](https://wiki.nixos.org/wiki/GNOME)

[Setup Zsh + Oh-my-zsh + PowerLevel10K - NixOS (without Home-manager) - NixOS Discourse](https://discourse.nixos.org/t/setup-zsh-oh-my-zsh-powerlevel10k-nixos-without-home-manager/58868)

[NixOS Manual](https://nixos.org/manual/nixos/stable/#sec-changing-config) 