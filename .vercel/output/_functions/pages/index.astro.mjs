import { e as createComponent, l as renderHead, k as renderComponent, r as renderTemplate, m as maybeRenderHead, n as renderScript, h as createAstro } from '../chunks/astro/server_G7kzBA19.mjs';
import 'piccolore';
import { $ as $$Navbar } from '../chunks/navbar_IhL5JWfG.mjs';
/* empty css                                 */
import 'clsx';
import { $ as $$Layout } from '../chunks/Layout_BWQ-0IDI.mjs';
export { renderers } from '../renderers.mjs';

const $$Desktop = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-ivynbwyi> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Spritesheet Demo</title>${renderHead()}</head> <body data-astro-cid-ivynbwyi> ${renderComponent($$result, "Navbar", $$Navbar, { "data-astro-cid-ivynbwyi": true })} <div class="HomePage" data-astro-cid-ivynbwyi> <div class="HeroSection" data-astro-cid-ivynbwyi> <div class="sprite title" data-astro-cid-ivynbwyi></div> <div class="sprite baseClouds" data-astro-cid-ivynbwyi></div> <div class="WindMillParent" data-astro-cid-ivynbwyi> <div class="sprite staticWindMill" data-astro-cid-ivynbwyi></div> <div class="sprite rotatingWindMill" data-astro-cid-ivynbwyi></div> </div> <div class="WaterMillParent" data-astro-cid-ivynbwyi> <div class="sprite rotatingWaterMill1" data-astro-cid-ivynbwyi></div> <div class="sprite rotatingWaterMill2" data-astro-cid-ivynbwyi></div> <div class="sprite staticWaterMill" data-astro-cid-ivynbwyi></div> </div> <div class="sprite titleCloud1" data-astro-cid-ivynbwyi></div> <div class="sprite titleCloud2" data-astro-cid-ivynbwyi></div> <div class="sprite stars" data-astro-cid-ivynbwyi></div> <div class="sprite geometricCircleGrid" data-astro-cid-ivynbwyi></div> <div class="sprite babbageMachine" data-astro-cid-ivynbwyi></div> </div> <div class="hourGlassLeftParent" data-astro-cid-ivynbwyi> <div class="sprite hourGlassLeftPillar" data-astro-cid-ivynbwyi></div> </div> <div class="hourGlassRightParent" data-astro-cid-ivynbwyi> <div class="sprite hourGlassRightPillar" data-astro-cid-ivynbwyi></div> </div> <div class="hourGlassTopParent" data-astro-cid-ivynbwyi> <div class="sprite hourGlassTop" data-astro-cid-ivynbwyi></div> </div> <div class="hourGlassBaseParent" data-astro-cid-ivynbwyi> <div class="sprite hourGlassBase" data-astro-cid-ivynbwyi></div> </div> <div class="MiddleSection" data-astro-cid-ivynbwyi> <div class="sprite purpleClouds1" data-astro-cid-ivynbwyi></div> <div class="sprite purpleClouds2" data-astro-cid-ivynbwyi></div> <!-- <div class="sprite purpleClouds3"></div> --> <div class="sprite girlFall" data-astro-cid-ivynbwyi></div> <div class="sprite guyFall" data-astro-cid-ivynbwyi></div> <div class="sprite peachClouds1" data-astro-cid-ivynbwyi></div> <div class="sprite peachClouds2" data-astro-cid-ivynbwyi></div> </div> <div class="FutureParent" data-astro-cid-ivynbwyi> <div class="sprite bgFutureBuild" data-astro-cid-ivynbwyi></div> <div class="sprite bgFutureBuild2" data-astro-cid-ivynbwyi></div> <div class="sprite foreGroundRoad" data-astro-cid-ivynbwyi></div> <div class="BridgeAndTrainParent" data-astro-cid-ivynbwyi> <div class="sprite train" data-astro-cid-ivynbwyi></div> <div class="sprite bridge" data-astro-cid-ivynbwyi></div> </div> </div> </div> </body></html>`;
}, "D:/astro-js/one-sprite-sheet-all-images/src/components/Desktop.astro", void 0);

const $$Mobile = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mobile-container" data-astro-cid-qkchunau> <h1 data-astro-cid-qkchunau>🚀 Mobile Experience</h1> <p data-astro-cid-qkchunau>Optimized animation coming soon</p> </div>`;
}, "D:/astro-js/one-sprite-sheet-all-images/src/components/Mobile.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const ua = Astro2.request.headers.get("user-agent") ?? "";
  const isMobile = /Android|iPhone|iPod/i.test(ua) || /iPad/i.test(ua) && !/Macintosh/i.test(ua);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${isMobile ? renderTemplate`${renderComponent($$result2, "Mobile", $$Mobile, {})}` : renderTemplate`${renderComponent($$result2, "Desktop", $$Desktop, {})}`}` })} <!-- Optional: client-side correction for edge cases --> ${renderScript($$result, "D:/astro-js/one-sprite-sheet-all-images/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/astro-js/one-sprite-sheet-all-images/src/pages/index.astro", void 0);

const $$file = "D:/astro-js/one-sprite-sheet-all-images/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
