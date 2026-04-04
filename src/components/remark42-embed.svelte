<script>
  import { onMount } from "svelte";

  export let slug;

  let pagePath = `/posts/${slug}/`;

  function getTheme() {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }

  function applyRemark42Theme() {
    if (window.REMARK42 && typeof window.REMARK42.changeTheme === "function") {
      window.REMARK42.changeTheme(getTheme());
      return true;
    }
    return false;
  }

  onMount(() => {
    const scriptId = "remark42-script";

    window.remark_config = {
      host: import.meta.env.PUBLIC_REMARK42_HOST,
      site_id: import.meta.env.PUBLIC_REMARK42_SITE_ID,
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

    const applyWhenReady = setInterval(() => {
      if (applyRemark42Theme()) {
        clearInterval(applyWhenReady);
      }
    }, 200);

    const observer = new MutationObserver(() => {
      applyRemark42Theme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      clearInterval(applyWhenReady);
      observer.disconnect();
    };
  });
</script>

<div id="remark42"></div>
