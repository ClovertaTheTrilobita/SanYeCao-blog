# SanYeCao-Blog

<p align="right">[<a href="README.md">中文</a> | <a href="README-en.md">English</a>]</p>
<p align="center"><br>
    ✨三叶草Blog✨<br>
    🌊轻度/快速/美观🌊<br><br>
    Built With<br>
    <img alt="Static Badge" src="https://img.shields.io/badge/Astro-6.0-purple">
    <img alt="Static Badge" src="https://img.shields.io/badge/Nodejs-24-green">
    <img alt="Static Badge" src="https://img.shields.io/badge/Heart-♥️-pink">
    <br>
</p>

## 😋 特性

<br>

<div style="text-align: center;">
  <img width="700" alt="image" src="./docs/preview-zh.png" />
</div>

<br>

- 使用纯静态页面，响应迅速，轻盈美观
- 操作简易，Github Action自动部署
-  <del><i>Astro Is All You Need</i></del>

更多预览请移步：<b>[Images.md](docs/Images.md)</b>。

## 🧳 使用

### 1. Fork 这个仓库

<img width="294" height="155" alt="image" src="https://github.com/user-attachments/assets/6ffc9a32-c084-463f-8988-f7488baa44e0" />

并将其克隆到本地。

### 2. 运行/构建

> [!IMPORTANT]
>
> 在开始之前，请先<b>将根目录的`.env.example`重命名为`.env`并配置好环境变量</b>，否则功能会不完善

有关环境变量的说明详见：<b>[EnvVariables.md](docs/EnvVariables.md)</b>

- 本地调试

  ```shell
  npm run dev
  ```

- 本地构建

  ```shell
  npm run build
  ```

### 3. 部署

#### 使用Github Actions自动化部署

详情参见：<b>[GithubActions.md](docs/GithubActions.md)</b>。

#### 手动部署

将生成的`dist/`目录上传至你的服务器，使用`NGINX`指向index.html。

<hr>

## ⚖️ 许可

本仓库中的源代码部分采用 `MIT License` 开源。

除非另有说明，本仓库中的博客文章、其他原创的非代码内容采用 `CC BY-NC-ND 4.0` 协议。
