## Environment Variables

<p align="right">[<a href="EnvVariables.md">中文</a> | <a href="EnvVariables-en.md">English</a>]</p>

The following environment variables are listed in the project's `.env.example` file:

| Variable Name         | Description |
| --------------------- | ----------- |
| `GITHUB_TOKEN`        | Enter your <b>[Personal access token](https://github.com/settings/personal-access-tokens)</b> |
| `GISCUS_REPO_OWNER`   | Your GitHub username, for example `ClovertaTheTrilobita` |
| `GISCUS_REPO_NAME`    | Your code repository name, for example `SanYeCao-blog` |
| `GISCUS_CATEGORY_ID`  | The category ID of `GISCUS`, see the explanation below |
| `GISCUS_DATA_REPO_ID` | The repository ID of `GISCUS`, see the explanation below |

### 1. `GITHUB_TOKEN`

It can greatly increase your GitHub API rate limit. Open this link: <b>[Personal access tokens](https://github.com/settings/personal-access-tokens)</b>

Choose <b>`Generate new token`</b>.

Then copy the generated token into the corresponding place in your `.env` file.

### 2. `GISCUS`

This blog uses a comment section based on the `GISCUS API`, which can map part of the GitHub repository's Discussions section onto your webpage as a comment area.

#### ① Enable Discussions in your repository

Go to <b>`Settings > General > Features`</b> in your repository and check <b>`Discussions`</b> to enable it.

Then go to the <b>`Discussions`</b> page, click the pencil icon next to <b>`Categories`</b> on the left side of the page, and then click <b>`New category`</b> to create a new category named <b>`Comments`</b>.

#### ② Install the Giscus GitHub App

Open this link: <b>[GitHub App - giscus](https://github.com/apps/giscus)</b>

Install it into the blog code repository you forked.

Then go to: <b>[giscus.app](https://giscus.app)</b>

In the <b>`Repository`</b> field, enter your repository address, and in <b>`Page ↔️ Discussions Mapping`</b>, choose <b>`Discussion title contains a specific term`</b>.

In <b>`Discussion Category`</b>, select the <b>`Comments`</b> category you just created.

Finally, in the generated code below, find <b>`data-category-id`</b> and <b>`data-repo-id`</b>, and fill them into the environment variables.