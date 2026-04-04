<script>
  import { onMount } from "svelte";

  export let slug;

  let pagePath = `/posts/${slug}/`;

  onMount(() => {
    const scriptId = "remark42-script";

    window.remark_config = {
      host: "https://comments.cloverta.top",
      site_id: "cloverta-blog",
      components: ["embed"],
      show_rss_subscription: false,
      theme: localStorage.getItem("color-theme") ?? "light",
      url: pagePath,
      page_id: pagePath,
    };

    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.innerHTML = `
      !function(e,n){
        for(var o=0;o<e.length;o++){
          var r=n.createElement("script"),c=".js",d=n.head||n.body;
          "noModule"in r?(r.type="module",c=".mjs"):r.async=!0;
          r.defer=!0;
          r.src=window.remark_config.host+"/web/"+e[o]+c;
          d.appendChild(r);
        }
      }(window.remark_config.components||["embed"],document);
    `;
    document.body.appendChild(script);
  });
</script>

<div id="remark42"></div>
