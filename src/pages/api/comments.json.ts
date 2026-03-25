import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const token = import.meta.env.GITHUB_TOKEN;
const owner = import.meta.env.GISCUS_REPO_OWNER ?? "ClovertaTheTrilobita";
const name = import.meta.env.GISCUS_REPO_NAME ?? "SanYeCao-blog";
const categoryId = import.meta.env.GISCUS_CATEGORY_ID ?? "DIC_kwDORvuVpM4C5MDE";

export function getStaticPaths() {
    return [{ params: { lang: "zh" } }, { params: { lang: "en" } }];
}

type CommentAuthor = {
    login?: string;
    avatarUrl?: string;
    url?: string;
};

type RawReply = {
    id: string;
    body?: string;
    updatedAt: string;
    author?: CommentAuthor | null;
};

type RawComment = {
    id: string;
    body?: string;
    updatedAt: string;
    author?: CommentAuthor | null;
    replies?: {
        nodes?: RawReply[];
    };
};

type DiscussionNode = {
    title: string;
    comments?: {
        nodes?: RawComment[];
    };
};

type LatestCommentItem = {
    id: string;
    body?: string;
    updatedAt: string;
    author?: CommentAuthor | null;
    postId: string;
    postTitle: string;
    localUrl: string;
    isReply: boolean;
    replyTo?: string;
};

function normalizePath(path: string) {
    return path.replace(/^\/+|\/+$/g, "");
}

function excerpt(text = "", max = 110) {
    const plain = text.replace(/\s+/g, " ").trim();
    if (plain.length <= max) return plain;
    return plain.slice(0, max) + "…";
}

async function fetchLatestComments(lang: string, limit: number): Promise<LatestCommentItem[]> {
    if (!token) return [];

    const allPosts = await getCollection("blog");

    const query = `
    query($owner: String!, $name: String!, $categoryId: ID!) {
      repository(owner: $owner, name: $name) {
        discussions(
          first: 20
          categoryId: $categoryId
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
          nodes {
            title
            comments(last: 10) {
              nodes {
                id
                body
                updatedAt
                author {
                  ... on User {
                    login
                    avatarUrl
                    url
                  }
                  ... on Organization {
                    login
                    avatarUrl
                    url
                  }
                }
                replies(first: 10) {
                  nodes {
                    id
                    body
                    updatedAt
                    author {
                      ... on User {
                        login
                        avatarUrl
                        url
                      }
                      ... on Organization {
                        login
                        avatarUrl
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            query,
            variables: { owner, name, categoryId },
        }),
    });

    const json = await res.json();
    const discussions = (json?.data?.repository?.discussions?.nodes ?? []) as DiscussionNode[];

    const postMap = new Map(
        allPosts.map((post: any) => [
            normalizePath(post.id),
            {
                title: post.data.title,
                url: `/${lang}/posts/${post.id}/#comments`,
            },
        ]),
    );

    const comments: LatestCommentItem[] = [];

    for (const discussion of discussions) {
        const discussionKey = normalizePath(discussion.title);

        let matchedPostId: string | undefined;

        if (postMap.has(discussionKey)) {
            matchedPostId = discussionKey;
        } else {
            matchedPostId = [...postMap.keys()].find(
                (postId) =>
                    discussionKey === postId ||
                    discussionKey.includes(postId) ||
                    postId.includes(discussionKey),
            );
        }

        if (!matchedPostId) continue;

        const postInfo = postMap.get(matchedPostId);
        if (!postInfo) continue;

        for (const comment of discussion.comments?.nodes ?? []) {
            comments.push({
                id: comment.id,
                body: excerpt(comment.body),
                updatedAt: comment.updatedAt,
                author: comment.author,
                postId: matchedPostId,
                postTitle: postInfo.title,
                localUrl: postInfo.url,
                isReply: false,
            });

            for (const reply of comment.replies?.nodes ?? []) {
                comments.push({
                    id: reply.id,
                    body: excerpt(reply.body),
                    updatedAt: reply.updatedAt,
                    author: reply.author,
                    postId: matchedPostId,
                    postTitle: postInfo.title,
                    localUrl: postInfo.url,
                    isReply: true,
                    replyTo: comment.author?.login ?? "Unknown",
                });
            }
        }
    }

    return comments
        .sort(
            (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
        )
        .slice(0, limit);
}

export const GET: APIRoute = async ({ params, url }) => {
    try {
        const lang = params.lang === "en" ? "en" : "zh";
        const limit = Number(url.searchParams.get("limit") ?? 5);

        const comments = await fetchLatestComments(lang, limit);

        return new Response(JSON.stringify({ comments }), {
            status: 200,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Cache-Control": "public, max-age=300",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ comments: [], error: "Failed to load comments" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });
    }
};