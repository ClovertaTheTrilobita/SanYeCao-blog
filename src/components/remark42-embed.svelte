<script>
  import { onMount } from "svelte";

  export let slug;

  let pagePath = `/posts/${slug}/`;

  function getTheme() {
    return localStorage.getItem("color-theme") === "dark" ? "dark" : "light";
  }

  function syncRemark42Theme() {
    if (window.REMARK42?.changeTheme) {
      window.REMARK42.changeTheme(getTheme());
    }
  }

  onMount(() => {
    const scriptId = "remark42-script";

    window.remark_config = {
      host: "https://comments.cloverta.top",
      site_id: "cloverta-blog",
      components: ["embed"],
      show_rss_subscription: false,
      theme: getTheme(),
      url: pagePath,
      page_id: pagePath,
    };

    if (!document.getElementById(scriptId)) {
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
    }

    syncRemark42Theme();

    const observer = new MutationObserver(() => {
      syncRemark42Theme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("storage", syncRemark42Theme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", syncRemark42Theme);
    };
  });
</script>

<div id="remark42"></div>
