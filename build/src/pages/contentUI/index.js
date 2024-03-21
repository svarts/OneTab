var m=function(){var n=typeof document<"u"&&document.createElement("link").relList;return n&&n.supports&&n.supports("modulepreload")?"modulepreload":"preload"}(),h=function(i){return"/"+i},u={},p=function(n,a,c){let o=Promise.resolve();if(a&&a.length>0){var s=document.getElementsByTagName("link");o=Promise.all(a.map(e=>{if(e=h(e),!(e in u)){u[e]=!0;var t=e.endsWith(".css"),d=t?'[rel="stylesheet"]':"",v=!!c;if(v)for(let l=s.length-1;l>=0;l--){var r=s[l];if(r.href===e&&(!t||r.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${d}`))return;var r=document.createElement("link");if(r.rel=t?"stylesheet":m,t||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),t)return new Promise((l,f)=>{r.addEventListener("load",l),r.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${e}`)))})}}))}return o.then(()=>n()).catch(e=>{var t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e})};p(()=>import("../../../assets/js/root.88avG-Fh.js"),__vite__mapDeps([]));
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
