<script>
    import { onMount } from "svelte";

    export let lang = "zh";
    let loaded = false;

    function rewriteLinks() {
        const links = document.querySelectorAll(
            ".latest-comments .comment__title-link",
        );

        links.forEach((link) => {
            const href = link.getAttribute("href");
            if (!href) return;

            // 只改 /posts/... 这种相对路径
            if (href.startsWith("/posts/")) {
                link.setAttribute("href", `/${lang}${href}`);
            }
        });
    }

    onMount(() => {
        window.remark_config = {
            host: "https://comments.cloverta.top",
            site_id: "cloverta-blog",
            components: ["last-comments"],
            theme: localStorage.getItem("color-theme") ?? "light",
            max_last_comments: 10,
            no_footer: true,
        };

        const loaderId = "remark42-last-comments-loader";
        if (!document.getElementById(loaderId)) {
            const init = document.createElement("script");
            init.id = loaderId;
            init.innerHTML = `
        !function(e,n){
          for(var o=0;o<e.length;o++){
            var r=n.createElement("script"),c=".js",d=n.head||n.body;
            "noModule"in r?(r.type="module",c=".mjs"):r.async=!0;
            r.defer=!0;
            r.src=window.remark_config.host+"/web/"+e[o]+c;
            d.appendChild(r);
          }
        }(window.remark_config.components||["last-comments"],document);
      `;
            document.body.appendChild(init);
        }

        const timer = setInterval(() => {
            const root = document.querySelector(".remark42__last-comments");
            if (root && root.children.length > 0) {
                rewriteLinks();
                loaded = true;
                clearInterval(timer);
            }
        }, 200);

        return () => clearInterval(timer);
    });
</script>

<section class="latest-comments">
    <h2>最新评论</h2>

    {#if !loaded}
        <div class="comments-loading" aria-hidden="true">
            <div class="loading-card"></div>
            <div class="loading-card"></div>
            <div class="loading-card"></div>
        </div>
    {/if}

    <div class="remark42__last-comments" data-max="10"></div>
</section>

<style>
    .loading-card {
        height: 92px;
        margin: 0 0 14px 0;
        padding: 0.9rem 1rem;
        border: 1px dashed #aeb8c2;
        background: linear-gradient(
            90deg,
            rgba(160, 175, 190, 0.06) 25%,
            rgba(160, 175, 190, 0.16) 50%,
            rgba(160, 175, 190, 0.06) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.2s infinite linear;
    }

    @keyframes shimmer {
        from {
            background-position: 200% 0;
        }
        to {
            background-position: -200% 0;
        }
    }

    .latest-comments {
        margin-top: 1.5rem;
    }

    .latest-comments h2 {
        margin-bottom: 0.8rem;
    }

    .latest-comments :global(.remark42__last-comments) {
        display: block;
    }

    .latest-comments :global(article.comment.list-comments__item) {
        display: block;
        margin: 0 0 14px 0;
        padding: 0.9rem 1rem;
        border: 1px dashed #aeb8c2;
        background: rgba(160, 175, 190, 0.06);
    }

    .latest-comments :global(article.comment.list-comments__item:last-child) {
        margin-bottom: 0;
    }

    :global(.dark)
        .latest-comments
        :global(article.comment.list-comments__item) {
        background: #2a3138;
        border-color: #7f8c97;
    }

    .latest-comments :global(.comment__body) {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 320px;
        grid-template-areas:
            "info title"
            "text title";
        gap: 0.35rem 1rem;
        align-items: start;
    }

    .latest-comments :global(.comment__title) {
        grid-area: title;
        text-align: right;
        min-width: 0;
        white-space: normal;
    }

    .latest-comments :global(.comment__title-link) {
        color: #6f8090;
        text-decoration: none;
        font-size: 0.87rem;
        font-weight: 700;
        line-height: 1.45;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
    }

    .latest-comments :global(.comment__title-link:hover) {
        text-decoration: underline;
    }

    .latest-comments :global(.comment__info) {
        grid-area: info;
        font-weight: 700;
        line-height: 1.3;
        color: inherit;
        min-width: 0;
        overflow-wrap: anywhere;
        word-break: break-word;
        font-style: italic;
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            "PingFang SC",
            "Hiragino Sans GB",
            "Microsoft YaHei",
            "Noto Sans CJK SC",
            "Source Han Sans SC",
            sans-serif;
    }

    .latest-comments :global(.comment__info)::before {
        content: "@";
        margin-right: 0.08em;
        opacity: 0.85;
    }

    .latest-comments :global(.comment__text) {
        grid-area: text;
        margin: 0;
        color: #555;
        line-height: 1.7;
        font-size: 1.03rem;
        min-width: 0;
        overflow-wrap: anywhere;
        word-break: break-word;
        white-space: pre-wrap;
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            "PingFang SC",
            "Hiragino Sans GB",
            "Microsoft YaHei",
            "Noto Sans CJK SC",
            "Source Han Sans SC",
            sans-serif;
    }

    :global(.dark)
        .latest-comments
        :global(article.comment.list-comments__item) {
        border-color: #7f8c97;
        background: rgba(180, 190, 200, 0.06);
    }

    :global(.dark) .latest-comments :global(.comment__title-link) {
        color: #c8d2dc;
    }

    :global(.dark) .latest-comments :global(.comment__text) {
        color: #d3d7db;
    }

    @media (max-width: 640px) {
        .latest-comments :global(.comment__body) {
            grid-template-columns: 1fr;
            grid-template-areas:
                "info"
                "title"
                "text";
        }

        .latest-comments :global(.comment__title) {
            text-align: left;
            min-width: 0;
        }

        .latest-comments :global(.comment__title-link) {
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>
