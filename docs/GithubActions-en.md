## Automatic Deployment with GitHub Actions

<p align="right">[<a href="GithubActions.md">中文</a> | <a href="GithubActions-en.md">English</a>]</p>

> [!NOTE]
>
> This project's GitHub Actions workflow listens for `git push` operations in the `src/blog` and `src/friends` directories on the `blog-content` branch. If either directory is updated, the build pipeline will be triggered.

> [!IMPORTANT]
>
> To use this feature, you need to fork this project into your own repository. The workflow can only run in your own repository.

### 0. Create a New Branch

Create a new branch named <b>`blog-content`</b> based on the `master` branch. Please push new articles to this branch in the future.

### 1. Set up SSH keys

In your repository, go to <b>`Settings > Secrets and variables > Actions`</b>, and add three `Repository secrets`:

| Secret Name          | Purpose                                          |
| -------------------- | ------------------------------------------------ |
| `DEPLOY_KNOWN_HOSTS` | Allows GitHub CI to recognize the target server |
| `DEPLOY_SSH_KEY`     | Used to log in to the target server             |
| `ENV_FILE`           | Private environment variables                    |

#### 1. `DEPLOY_KNOWN_HOSTS`

Run the following command in your terminal:

```shell
ssh-keyscan -H <your-server-ip>
````

Then copy all generated output into this environment variable.

#### 2. `DEPLOY_SSH_KEY`

It is recommended to generate a dedicated SSH key specifically for GitHub deployment.

Run this command on your local machine or server terminal:

```shell
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy
```

After running it, you will get two files:

```shell
~/.ssh/github_actions_deploy
~/.ssh/github_actions_deploy.pub
```

> **`github_actions_deploy`** → private key, put this into `DEPLOY_SSH_KEY`
>
> **`github_actions_deploy.pub`** → public key, add this to your server

##### ① Set the GitHub private key

View the private key content:

```shell
cat ~/.ssh/github_actions_deploy
```

Copy the full output into the variable value.

##### ② Set the server public key

Then log in to your server terminal and add the contents of `~/.ssh/github_actions_deploy.pub` to the server's `~/.ssh/authorized_keys`, so that GitHub CI can access the server.

#### 3. `ENV_FILE`

This variable is used to generate the `.env` file required for building.

If you have already configured your `.env`, it should contain the following:

```env
GITHUB_TOKEN=
GISCUS_REPO_OWNER=
GISCUS_REPO_NAME=
GISCUS_CATEGORY_ID=
GISCUS_DATA_REPO_ID=
```

If you have not configured these yet or do not know what they mean, please see: <b>[EnvVariables-en.md](EnvVariables-en.md)</b>

Simply copy all contents of your `.env` file into the variable value.

### 2. Set up repository variables

Also in <b>`Settings > Secrets and variables > Actions`</b>, add four `Repository variables`:

| Variable Name | Value Example                                                               |
| ------------- | --------------------------------------------------------------------------- |
| `DEPLOY_HOST` | Server IP address, for example `192.168.1.1`                                |
| `DEPLOY_PATH` | Deployment path on the server, for example `/www/wwwroot/blog.cloverta.top` |
| `DEPLOY_PORT` | SSH port of the server, usually `22`                                        |
| `DEPLOY_USER` | Login username, for example `root`                                          |

