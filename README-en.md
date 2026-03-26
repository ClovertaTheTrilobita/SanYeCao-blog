# SanYeCao-Blog
<p align="right">[<a href="README.md">中文</a> | <a href="README-en.md">English</a>]</p>
<p align="center"><br>
    ✨SanYeCao Blog✨<br>
    🌊Lightweight / Fast / Beautiful🌊<br><br>
    Built With<br>
    <img alt="Static Badge" src="https://img.shields.io/badge/Astro-6.0-purple">
    <img alt="Static Badge" src="https://img.shields.io/badge/Nodejs-24-green">
    <img alt="Static Badge" src="https://img.shields.io/badge/Heart-♥️-pink">
    <br>
</p>

## 😋 Features

<br>

<img width="2879" height="1853" alt="image" src="https://github.com/user-attachments/assets/9f6f7018-c8a4-46f7-9d30-1132fcea53da" style="zoom:25%;" />

<br>

- Built with purely static pages, responsive, lightweight, and visually pleasing
- Easy to use, with automatic deployment via GitHub Actions
- <del><i>Astro Is All You Need</i></del>

For more previews, please see: <b>[Images.md](docs/Images.md)</b>.

## 🧳 Usage

### 1. Fork this repository

<img width="294" height="155" alt="image" src="https://github.com/user-attachments/assets/6ffc9a32-c084-463f-8988-f7488baa44e0" />

Then clone it to your local machine.

### 2. Run / Build

> [!IMPORTANT]
>
> Before getting started, please <b>rename `.env.example` in the root directory to `.env` and configure the environment variables</b>, otherwise some features may not work properly.

For details about environment variables, see: <b>[EnvVariables.md](docs/EnvVariables.md)</b>

- Local development

  ```shell
  npm run dev
  ```

- Local build

  ```shell
  npm run build
  ```

### 3. Deployment

#### Deploy automatically with GitHub Actions

For details, see: <b>[GithubActions.md](docs/GithubActions.md)</b>.

#### Manual deployment

Upload the generated `dist/` directory to your server, and configure `NGINX` to point to `index.html`.

