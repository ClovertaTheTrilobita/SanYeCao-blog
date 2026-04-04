## v1.1.0 Update

Added improved locale support, with support for `zh-CN` and `en-US`. When uploading articles, it is recommended to upload both language versions to `src/blog/zh` and `src/blog/en`.

- Refactored the original `src/blog/posts.md` into `src/blog/zh/posts.md` and `src/blog/en/posts.md`
- When users click the language switch icon, the article list will automatically switch between Chinese and English

## v1.2.0 Update

Replaced the original `GISCUS`-based comment system with a self-hosted `Remark42`-based comment system.

- Removed `GISCUS`-related components
- Removed GitHub- and Giscus-related fields from `.env`
- Added `Remark42`-related components