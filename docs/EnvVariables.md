## 环境变量说明

<p align="right">[<a href="EnvVariables.md">中文</a> | <a href="EnvVariables-en.md">English</a>]</p>

在项目的`.env.example`中，列举了如下环境变量

| 变量名                | 内容                                                         |
| --------------------- | ------------------------------------------------------------ |
| `GITHUB_TOKEN`        | 填写你的 <b>[Personal access tokens](https://github.com/settings/personal-access-tokens)</b> |
| `GISCUS_REPO_OWNER`   | 你的Github账号名，如`ClovertaTheTrilobita`                   |
| `GISCUS_REPO_NAME`    | 你的代码仓库，如`SanYeCao-blog`                              |
| `GISCUS_CATEGORY_ID`  | `GISCUS`的栏目ID,详见下方说明                                |
| `GISCUS_DATA_REPO_ID` | `GISCUS`的仓库ID,详见下方说明                                |

### 1. `GITHUB_TOKEN`

它可以大幅增加你的Github API访问限度，打开此链接：<b>[Personal access tokens](https://github.com/settings/personal-access-tokens)</b>

选择 <b>`Generate new token`</b>。

并将生成的Token复制到.env相应位置。

### 2. `GISCUS`

博客使用基于`GISCUS API`的评论区，它可以将github仓库的Discussion区域部分映射到网页中以作为评论区使用。

#### ①启用你仓库的Discussion

在仓库的<b>`Settings > General > Features`</b>中找到<b>`Discussions`</b>勾选以启用它。

之后进入<b>`Discussion`</b>页面，点击页面左边<b>`Categories`</b>旁边的铅笔按钮，随后点击<b>`New category`</b>，新建一个名为<b>`Comments`</b>的栏目。

#### ②安装Giscus的Github App

点击此链接：<b>[Github App - giscus](https://github.com/apps/giscus)</b>

将其安装到你Fork的博客代码仓库中。

随后进入：<b>[giscus.app](https://giscus.app)</b>

在<b>`Repository`</b>栏中填写你的仓库地址，并在<b>`Page ↔️ Discussions Mapping`</b>中选择<b>`Discussion title contains a specific term`</b>

在<b>`Discussion Category`</b>处选择我们刚刚新建的<b>`Comments`</b>。

最后在下面生成的代码中找到<b>`data-category-id`</b>和<b>`data-repo-id`</b>，将其填写到环境变量中。

