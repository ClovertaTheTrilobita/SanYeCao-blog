## v1.1.0更新

添加完善的Locale支持，支持 `zh-CN` 和 `en-US`，上传文章时建议同时上传两种语言的文章到 `src/blog/zh` 和 `src/blog/en` 中。

- 将原本的`src/blog/posts.md` 重构为`src/blog/zh/posts.md`和`src/blog/en/posts.md`
- 在用户点击切换中英文图标时，文章列表会自动切换

## v1.2.0 更新

将原本基于`GISCUS`的评论区更新为基于自托管`Remark42`

- 删去`GISCUS`相关组件
- 删去`.env`中github和giscus相关字段
- 新增`Remark42`相关组件