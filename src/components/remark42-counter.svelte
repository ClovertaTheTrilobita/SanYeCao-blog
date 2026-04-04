<script>
    import { onMount } from "svelte";

    export let url;

    const host = import.meta.env.PUBLIC_REMARK42_HOST;
    const siteId = import.meta.env.PUBLIC_REMARK42_SITE_ID;

    onMount(() => {
        const remark_config = {
            host,
            site_id: siteId,
            components: ["counter"],
            show_rss_subscription: false,
            theme: localStorage.getItem("color-theme") ?? "light",
        };

        window.remark_config = remark_config;

        for (const name of remark_config.components || ["embed"]) {
            const script = document.createElement("script");
            let ext = ".js";

            if ("noModule" in script) {
                script.type = "module";
                ext = ".mjs";
            } else {
                script.async = true;
            }

            script.defer = true;
            script.src = `${remark_config.host}/web/${name}${ext}`;
            document.head.appendChild(script);
        }
    });
</script>

<span class="remark42__counter" data-url={url}></span>
