<script>
    export let url;
</script>

<svelte:head>
    <script async lang="javascript">
        var remark_config = {
            host: "https://comments.cloverta.top",
            site_id: "cloverta-blog",
            components: ["counter"],
            show_rss_subscription: false,
            theme: localStorage.getItem("color-theme") ?? "light",
        };
        !(function (e, n) {
            for (var o = 0; o < e.length; o++) {
                var r = n.createElement("script"),
                    c = ".js",
                    d = n.head || n.body;
                "noModule" in r
                    ? ((r.type = "module"), (c = ".mjs"))
                    : (r.async = !0),
                    (r.defer = !0),
                    (r.src = remark_config.host + "/web/" + e[o] + c),
                    d.appendChild(r);
            }
        })(remark_config.components || ["embed"], document);
    </script>
</svelte:head>

<span class="remark42__counter" data-url={url}></span>
