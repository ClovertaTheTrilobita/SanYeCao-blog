import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('blog');

    const enPosts = posts
        .filter((post) => post.id.startsWith('en/'))
        .sort(
            (a, b) =>
                new Date(b.data.pubDate).getTime() -
                new Date(a.data.pubDate).getTime()
        );

    return rss({
        title: "Cloverta's Blog",
        description:
            "Discover more here. Welcome to Cloverta's blog 🥳",
        site: context.site,

        items: enPosts.map((post) => {
            const [, ...slugParts] = post.id.split('/');
            const slug = slugParts.join('/');

            return {
                title: post.data.title,
                pubDate: post.data.pubDate,
                description: post.data.description,
                link: `/en/posts/${slug}/`,
            };
        }),

        customData: '<language>en-US</language>',
    });
}