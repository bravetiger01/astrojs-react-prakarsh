import { e as createComponent, m as maybeRenderHead, k as renderComponent, r as renderTemplate, g as addAttribute } from './astro/server_G7kzBA19.mjs';
import 'piccolore';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useId, useRef, useState, useEffect } from 'react';
/* empty css                          */

const GlassSurface = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.9,
  blur = 11,
  displace = 1,
  backgroundOpacity = 0.2,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = "R",
  yChannel = "G",
  mixBlendMode = "difference",
  className = "",
  style = {}
}) => {
  const id = useId();
  const filterId = `glass-filter-${id}`;
  const redGradId = `red-grad-${id}`;
  const blueGradId = `blue-grad-${id}`;
  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const redChannelRef = useRef(null);
  const greenChannelRef = useRef(null);
  const blueChannelRef = useRef(null);
  const gaussianBlurRef = useRef(null);
  const [supportsSvg, setSupportsSvg] = useState(false);
  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);
    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };
  const updateDisplacementMap = () => {
    feImageRef.current?.setAttribute("href", generateDisplacementMap());
  };
  useEffect(() => {
    updateDisplacementMap();
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset }
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute(
          "scale",
          (distortionScale + offset).toString()
        );
        ref.current.setAttribute("xChannelSelector", xChannel);
        ref.current.setAttribute("yChannelSelector", yChannel);
      }
    });
    gaussianBlurRef.current?.setAttribute("stdDeviation", displace.toString());
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode
  ]);
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });
    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });
    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    setTimeout(updateDisplacementMap, 0);
  }, [width, height]);
  useEffect(() => {
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    if (isWebkit || isFirefox) {
      setSupportsSvg(false);
      return;
    }
    const div = document.createElement("div");
    div.style.backdropFilter = `url(#${filterId})`;
    setSupportsSvg(div.style.backdropFilter !== "");
  }, [filterId]);
  const containerStyle = {
    ...style,
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    "--glass-frost": backgroundOpacity,
    "--glass-saturation": saturation,
    "--filter-id": `url(#${filterId})`,
    "boxShadow": "15px 15px 25px #000000c7"
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: `glass-surface ${supportsSvg ? "glass-surface--svg" : "glass-surface--fallback"} ${className}`,
      style: containerStyle,
      children: [
        /* @__PURE__ */ jsx("svg", { className: "glass-surface__filter", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
          "filter",
          {
            id: filterId,
            colorInterpolationFilters: "sRGB",
            x: "0%",
            y: "0%",
            width: "100%",
            height: "100%",
            children: [
              /* @__PURE__ */ jsx(
                "feImage",
                {
                  ref: feImageRef,
                  x: "0",
                  y: "0",
                  width: "100%",
                  height: "100%",
                  preserveAspectRatio: "none",
                  result: "map"
                }
              ),
              /* @__PURE__ */ jsx(
                "feDisplacementMap",
                {
                  ref: redChannelRef,
                  in: "SourceGraphic",
                  in2: "map",
                  id: "redchannel",
                  result: "dispRed"
                }
              ),
              /* @__PURE__ */ jsx(
                "feColorMatrix",
                {
                  in: "dispRed",
                  type: "matrix",
                  values: "1 0 0 0 0\r\n                      0 0 0 0 0\r\n                      0 0 0 0 0\r\n                      0 0 0 1 0",
                  result: "red"
                }
              ),
              /* @__PURE__ */ jsx(
                "feDisplacementMap",
                {
                  ref: greenChannelRef,
                  in: "SourceGraphic",
                  in2: "map",
                  id: "greenchannel",
                  result: "dispGreen"
                }
              ),
              /* @__PURE__ */ jsx(
                "feColorMatrix",
                {
                  in: "dispGreen",
                  type: "matrix",
                  values: "0 0 0 0 0\r\n                      0 1 0 0 0\r\n                      0 0 0 0 0\r\n                      0 0 0 1 0",
                  result: "green"
                }
              ),
              /* @__PURE__ */ jsx(
                "feDisplacementMap",
                {
                  ref: blueChannelRef,
                  in: "SourceGraphic",
                  in2: "map",
                  id: "bluechannel",
                  result: "dispBlue"
                }
              ),
              /* @__PURE__ */ jsx(
                "feColorMatrix",
                {
                  in: "dispBlue",
                  type: "matrix",
                  values: "0 0 0 0 0\r\n                      0 0 0 0 0\r\n                      0 0 1 0 0\r\n                      0 0 0 1 0",
                  result: "blue"
                }
              ),
              /* @__PURE__ */ jsx("feBlend", { in: "red", in2: "green", mode: "screen", result: "rg" }),
              /* @__PURE__ */ jsx("feBlend", { in: "rg", in2: "blue", mode: "screen", result: "output" }),
              /* @__PURE__ */ jsx(
                "feGaussianBlur",
                {
                  ref: gaussianBlurRef,
                  in: "output",
                  stdDeviation: "0.7"
                }
              )
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "glass-surface__content", children })
      ]
    }
  );
};

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const navLinks = [
    { name: "HOME", href: "#home", highlight: false },
    { name: "ABOUT", href: "#about", highlight: false },
    { name: "EVENTS", href: "/events", highlight: false }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="navbar" data-astro-cid-y4mxed4f> <div class="navbar-border-wrapper" data-astro-cid-y4mxed4f> ${renderComponent($$result, "GlassSurface", GlassSurface, { "client:load": true, "width": "100%", "height": "auto", "borderRadius": 50, "blur": 10, "opacity": 0.6, "backgroundOpacity": 0.1, "saturation": 1.8, "brightness": 50, "className": "navbar-glass", "client:component-hydration": "load", "client:component-path": "D:/astro-js/one-sprite-sheet-all-images/src/components/GlassSurface/GlassSurface", "client:component-export": "default", "data-astro-cid-y4mxed4f": true }, { "default": ($$result2) => renderTemplate` <div class="navbar-content" data-astro-cid-y4mxed4f> <div class="navbar-logo" data-astro-cid-y4mxed4f> <img src="/assets/logo.svg" alt="Logo" data-astro-cid-y4mxed4f> </div> <div class="navbar-links" data-astro-cid-y4mxed4f> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(`nav-link ${link.highlight ? "nav-link-highlight" : ""}`, "class")} data-astro-cid-y4mxed4f> ${link.name} </a>`)} </div> <a href="#register" class="nav-button" data-astro-cid-y4mxed4f> <span data-astro-cid-y4mxed4f>REGISTER NOW</span> </a> </div> ` })} </div> </nav> `;
}, "D:/astro-js/one-sprite-sheet-all-images/src/pages/navbar.astro", void 0);

const $$file = "D:/astro-js/one-sprite-sheet-all-images/src/pages/navbar.astro";
const $$url = "/navbar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Navbar,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Navbar as $, _page as _ };
