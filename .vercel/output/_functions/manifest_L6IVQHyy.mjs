import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_G7kzBA19.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DpN_9yk9.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/astro-js/one-sprite-sheet-all-images/","cacheDir":"file:///D:/astro-js/one-sprite-sheet-all-images/node_modules/.astro/","outDir":"file:///D:/astro-js/one-sprite-sheet-all-images/dist/","srcDir":"file:///D:/astro-js/one-sprite-sheet-all-images/src/","publicDir":"file:///D:/astro-js/one-sprite-sheet-all-images/public/","buildClientDir":"file:///D:/astro-js/one-sprite-sheet-all-images/dist/client/","buildServerDir":"file:///D:/astro-js/one-sprite-sheet-all-images/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/events.CORSAipw.css"}],"routeData":{"route":"/events","isIndex":false,"type":"page","pattern":"^\\/events\\/?$","segments":[[{"content":"events","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/events.astro","pathname":"/events","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/navbar.Dao6cf6w.css"}],"routeData":{"route":"/navbar","isIndex":false,"type":"page","pattern":"^\\/navbar\\/?$","segments":[[{"content":"navbar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/navbar.astro","pathname":"/navbar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&display=swap\";[data-astro-cid-5w3lc6bc]{margin:0;padding:0;box-sizing:border-box}body{font-family:Bruno Ace SC,sans-serif;background:linear-gradient(135deg,#3c2a56,#1a1428,#3c2a56);color:#fff;min-height:100vh;overflow-x:hidden}body:before{content:\"\";position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle at 20% 50%,rgba(241,181,162,.1) 0%,transparent 50%),radial-gradient(circle at 80% 80%,rgba(241,181,162,.15) 0%,transparent 50%);pointer-events:none;z-index:0}main[data-astro-cid-5w3lc6bc]{position:relative;z-index:1}.hero[data-astro-cid-5w3lc6bc]{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:100px 20px 50px}.hero-content[data-astro-cid-5w3lc6bc] h1[data-astro-cid-5w3lc6bc]{font-size:4rem;margin-bottom:1rem;background:linear-gradient(135deg,#fff,#f1b5a2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.hero-content[data-astro-cid-5w3lc6bc] p[data-astro-cid-5w3lc6bc]{font-size:1.5rem;color:#f1b5a2}.content-section[data-astro-cid-5w3lc6bc]{min-height:100vh;padding:100px 20px;display:flex;align-items:center}.content-section[data-astro-cid-5w3lc6bc].alt{background:#f1b5a208}.container[data-astro-cid-5w3lc6bc]{max-width:1200px;margin:0 auto;width:100%}h2[data-astro-cid-5w3lc6bc]{font-size:3rem;margin-bottom:2rem;color:#f1b5a2;text-align:center}h3[data-astro-cid-5w3lc6bc]{font-size:1.8rem;margin-bottom:1rem;color:#fff}h4[data-astro-cid-5w3lc6bc]{font-size:1.3rem;margin-bottom:.5rem;color:#f1b5a2}p[data-astro-cid-5w3lc6bc]{font-size:1.1rem;line-height:1.8;margin-bottom:1.5rem;color:#ffffffe6}.glass-card[data-astro-cid-5w3lc6bc]{background:#ffffff0d;backdrop-filter:blur(12px) saturate(1.8) brightness(1.2);-webkit-backdrop-filter:blur(12px) saturate(1.8) brightness(1.2);border:1px solid rgba(241,181,162,.2);border-radius:20px;padding:2rem;box-shadow:0 8px 32px #3c2a564d,inset 0 1px #ffffff1a;transition:all .3s ease}.glass-card[data-astro-cid-5w3lc6bc]:hover{transform:translateY(-5px);border-color:#f1b5a266;box-shadow:0 12px 40px #3c2a5666,inset 0 1px #fff3}.card-grid[data-astro-cid-5w3lc6bc]{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;margin-top:3rem}.event-list[data-astro-cid-5w3lc6bc]{display:flex;flex-direction:column;gap:2rem;margin-top:3rem}.event-card[data-astro-cid-5w3lc6bc]{padding:2.5rem}.event-date[data-astro-cid-5w3lc6bc]{color:#f1b5a2;font-size:1rem;margin-bottom:1rem}.register-card[data-astro-cid-5w3lc6bc]{text-align:center;padding:3rem;max-width:600px;margin:3rem auto 0}.register-button[data-astro-cid-5w3lc6bc]{background:linear-gradient(135deg,#f1b5a2,#3c2a56);color:#fff;border:2px solid rgba(255,255,255,.3);padding:1rem 3rem;font-size:1.2rem;font-family:Bruno Ace SC,sans-serif;border-radius:30px;cursor:pointer;transition:all .3s ease;box-shadow:0 4px 15px #f1b5a266}.register-button[data-astro-cid-5w3lc6bc]:hover{transform:translateY(-2px);box-shadow:0 6px 20px #f1b5a299;background:linear-gradient(135deg,#3c2a56,#f1b5a2)}.features[data-astro-cid-5w3lc6bc]{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;margin-top:3rem}.footer[data-astro-cid-5w3lc6bc]{background:#3c2a5680;padding:2rem;text-align:center;border-top:1px solid rgba(241,181,162,.2)}@media(max-width:768px){.hero-content[data-astro-cid-5w3lc6bc] h1[data-astro-cid-5w3lc6bc]{font-size:2.5rem}.hero-content[data-astro-cid-5w3lc6bc] p[data-astro-cid-5w3lc6bc]{font-size:1.2rem}h2[data-astro-cid-5w3lc6bc]{font-size:2rem}h3[data-astro-cid-5w3lc6bc]{font-size:1.5rem}.content-section[data-astro-cid-5w3lc6bc]{padding:80px 20px}.card-grid[data-astro-cid-5w3lc6bc],.features[data-astro-cid-5w3lc6bc]{grid-template-columns:1fr}}\n"},{"type":"external","src":"/_astro/navbar.Dao6cf6w.css"}],"routeData":{"route":"/sample","isIndex":false,"type":"page","pattern":"^\\/sample\\/?$","segments":[[{"content":"sample","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sample.astro","pathname":"/sample","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.D8EGqh2_.css"},{"type":"external","src":"/_astro/navbar.Dao6cf6w.css"},{"type":"external","src":"/_astro/events.CORSAipw.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/astro-js/one-sprite-sheet-all-images/src/pages/sample.astro",{"propagation":"none","containsHead":true}],["D:/astro-js/one-sprite-sheet-all-images/src/pages/index.astro",{"propagation":"none","containsHead":true}],["D:/astro-js/one-sprite-sheet-all-images/src/pages/events.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/events@_@astro":"pages/events.astro.mjs","\u0000@astro-page:src/pages/navbar@_@astro":"pages/navbar.astro.mjs","\u0000@astro-page:src/pages/sample@_@astro":"pages/sample.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_L6IVQHyy.mjs","D:/astro-js/one-sprite-sheet-all-images/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C6H5nGsu.mjs","D:/astro-js/one-sprite-sheet-all-images/src/components/UnifiedEventsPage":"_astro/UnifiedEventsPage.CImcGHKs.js","D:/astro-js/one-sprite-sheet-all-images/src/components/GlassSurface/GlassSurface":"_astro/GlassSurface.e0vMklq2.js","@astrojs/react/client.js":"_astro/client.Dc9Vh3na.js","D:/astro-js/one-sprite-sheet-all-images/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.XIlFY9hN.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["D:/astro-js/one-sprite-sheet-all-images/src/pages/index.astro?astro&type=script&index=0&lang.ts","const e=window.matchMedia(\"(min-width: 1024px) and (pointer: fine)\").matches;document.documentElement.dataset.device=e?\"desktop\":\"mobile\";"]],"assets":["/_astro/OPSpriteSheet.DCwDcb1C.svg","/_astro/events.CORSAipw.css","/_astro/navbar.Dao6cf6w.css","/_astro/index.D8EGqh2_.css","/favicon.svg","/assets/coordinates.txt","/assets/FullSpriteSheet.svg","/assets/logo.svg","/assets/OPSpriteSheet.svg","/sprites/coin.png","/sprites/knight.avif","/_astro/client.Dc9Vh3na.js","/_astro/GlassSurface.e0vMklq2.js","/_astro/index.DiEladB3.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/UnifiedEventsPage.CImcGHKs.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"hgtw5rs+BTDnrjZIQmCbUWDw3ItDosDS7H7HHFVZncM="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
