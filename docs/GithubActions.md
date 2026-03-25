## Github Actions自动部署

> [!NOTE]
>
> 此项目的Github Actions监听`src/blog`和`src/friends`两个目录的`git push`操作，两个目录有更新则触发构建流水线。

> [!IMPORTANT]
>
> 需要使用这个功能请自行Fork一份代码到自己的仓库，在你自己的仓库才能跑流水线。

### 一、设置SSH密钥

在仓库的<b>`Settings > Secrets and variables > Actions`</b>中，添加三个`Repository secrets`，分别为：

| 密钥名               | 用途                         |
| -------------------- | ---------------------------- |
| `DEPLOY_KNOWN_HOSTS` | 用于让Gihub CI识别目标服务器 |
| `DEPLOY_SSH_KEY`     | 用于登录目标服务器           |
| `ENV_FILE`           | 私有环境变量                 |

#### 1.`DEPLOY_KNOWN_HOSTS`

在终端执行命令

```shell
ssh-keyscan -H <你的服务器IP>
```

并将生成的所有内容放入该环境变量中

#### 2.`DEPLOY_SSH_KEY`

推荐在你本地新生成一把专门用于 GitHub 部署的 key

本地或服务器终端执行：

```
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy
```

执行后会得到两个文件：

```
~/.ssh/github_actions_deploy
~/.ssh/github_actions_deploy.pub
```

> **`github_actions_deploy`** → 私钥，填到 `DEPLOY_SSH_KEY`
>
> **`github_actions_deploy.pub`** → 公钥，要加到服务器上

##### ① 设置Github私钥

查看私钥内容：

```
cat ~/.ssh/github_actions_deploy
```

把完整输出复制到变量值中。

##### ② 设置服务器公钥

随后，登录服务器终端，将`~/.ssh/github_actions_deploy.pub`中的内容添加到服务器的`~/.ssh/authorized_keys`，以实现Github CI访问服务器。

#### 3.`ENV_FILE`

这个变量用于生成构建所需的`.env`文件。

如果你已经设置好`.env`，它里面应该有如下内容

```env
GITHUB_TOKEN=
GISCUS_REPO_OWNER=
GISCUS_REPO_NAME=
GISCUS_CATEGORY_ID=
GISCUS_DATA_REPO_ID=
```

如果你还没配置好或不知道这些是干什么的，请详见：<b>[EnvVariables.md](EnvVariables.md)</b>

直接把`.env`中的所有内容复制到变量值中。

### 二、设置环境变量

同样，在<b>`Settings > Secrets and variables > Actions`</b>中，添加四个`Repository variables`，分别为：

| 密钥名        | 内容                                                     |
| ------------- | -------------------------------------------------------- |
| `DEPLOY_HOST` | 服务器IP地址，如`192.168.1.1`                            |
| `DEPLOY_PATH` | 在服务器上的部署路径，如`/www/wwwroot/blog.cloverta.top` |
| `DEPLOY_PORT` | 服务器SSH端口，一般是`22`                                |
| `DEPLOY_USER` | 登录用户，例如`root`                                     |

