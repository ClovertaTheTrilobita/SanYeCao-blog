import rss from '@astrojs/rss';
import { pagesGlobToRssItems } from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection("blog");
    const [postLang, ...slugParts] = post.id.split("/");
    const slug = slugParts.join("/");

    return rss({
        title: 'Cloverta的博客',
        description: '在这里，发现更多（雾）欢迎来到三叶的博客🥳',
        site: context.site,
        items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/zh/posts/${slug}/`,
        })),
        customData: `<language>en-us</language>`,
    })
}