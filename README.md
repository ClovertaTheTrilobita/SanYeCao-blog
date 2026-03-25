# SanYeCao-Blog

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

[screenshots]

- 使用纯静态页面，相应迅速，轻盈美观
- 操作简易，Github Action自动部署
-  <del><i>Astro Is All You Need</i></del>



## 🧳 使用

### 1. Fork 这个仓库

[screenshot]

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
