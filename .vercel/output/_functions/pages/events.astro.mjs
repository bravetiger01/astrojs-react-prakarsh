import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_G7kzBA19.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BWQ-0IDI.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useMotionValue, useMotionTemplate, motion } from 'framer-motion';
import * as React from 'react';
import { useState } from 'react';
import { P as ParticleField, e as esportsEvents, w as workshopEvents, n as nonTechnicalEvents, t as technicalEvents } from '../chunks/ParticleField_BUHVQeej.mjs';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Gamepad2, Zap } from 'lucide-react';
export { renderers } from '../renderers.mjs';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function InteractiveTilt({
  className,
  children,
  accentVar = "--neon-cyan"
}) {
  const ref = React.useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const transform = useMotionTemplate`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  const shine = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, hsl(var(${accentVar}) / 0.20), transparent 58%)`;
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    const tilt = 10;
    rx.set((0.5 - py) * tilt);
    ry.set((px - 0.5) * tilt);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      onMouseMove: onMove,
      onMouseLeave: onLeave,
      style: { transform },
      whileHover: { y: -6 },
      transition: { type: "spring", stiffness: 260, damping: 20 },
      className: cn("relative will-change-transform", className),
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0",
            style: { backgroundImage: shine }
          }
        ),
        children
      ]
    }
  );
}

const COLORS = {
  white: "#FFFFFF",
  peach: "#F1B5A2",
  accent: "#3C2A56"
};
function GlobeIcon() {
  return /* @__PURE__ */ jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", fill: "none", "aria-hidden": true, children: [
    /* @__PURE__ */ jsx("circle", { cx: "20", cy: "20", r: "18", stroke: COLORS.peach, strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx(
      "ellipse",
      {
        cx: "20",
        cy: "20",
        rx: "8",
        ry: "18",
        stroke: COLORS.peach,
        strokeWidth: "1"
      }
    ),
    /* @__PURE__ */ jsx(
      "line",
      {
        x1: "2",
        y1: "20",
        x2: "38",
        y2: "20",
        stroke: COLORS.peach,
        strokeWidth: "1"
      }
    ),
    /* @__PURE__ */ jsx(
      "line",
      {
        x1: "20",
        y1: "2",
        x2: "20",
        y2: "38",
        stroke: COLORS.peach,
        strokeWidth: "1"
      }
    ),
    /* @__PURE__ */ jsx(
      "ellipse",
      {
        cx: "20",
        cy: "12",
        rx: "14",
        ry: "5",
        stroke: `${COLORS.peach}60`,
        strokeWidth: "0.75"
      }
    ),
    /* @__PURE__ */ jsx(
      "ellipse",
      {
        cx: "20",
        cy: "28",
        rx: "14",
        ry: "5",
        stroke: `${COLORS.peach}60`,
        strokeWidth: "0.75"
      }
    )
  ] });
}
function StarBurst() {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      animate: { rotate: 360 },
      transition: { duration: 20, repeat: Infinity, ease: "linear" },
      className: "relative w-8 h-8",
      children: [0, 45, 90, 135].map((deg) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-1/2 left-1/2 w-full h-[2px]",
          style: {
            background: COLORS.peach,
            transform: `translate(-50%, -50%) rotate(${deg}deg)`
          }
        },
        deg
      ))
    }
  );
}
function DotMatrix({ count = 1 }) {
  const cols = Math.min(count, 6);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "grid gap-[3px]",
      style: { gridTemplateColumns: `repeat(${cols}, 4px)` },
      children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "w-1 h-1 rounded-full",
          style: {
            background: i % 2 === 0 ? COLORS.peach : `${COLORS.white}40`
          },
          initial: { opacity: 0.3 },
          animate: { opacity: [0.3, 1, 0.3] },
          transition: { duration: 2, delay: i * 0.05, repeat: Infinity }
        },
        i
      ))
    }
  );
}
function ScanLine() {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "absolute left-0 right-0 h-[1px] pointer-events-none",
      style: {
        background: `linear-gradient(90deg, transparent, ${COLORS.peach}60, transparent)`
      },
      initial: { top: 0, opacity: 0 },
      animate: { top: "100%", opacity: [0, 1, 1, 0] },
      transition: { duration: 3, repeat: Infinity, ease: "linear" }
    }
  );
}
function CassetteCard({
  event,
  index,
  totalEvents = 26
}) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.5, delay: index * 0.08 },
      className: "h-full",
      children: /* @__PURE__ */ jsx("a", { href: `/event/${event.id}`, className: "block h-full", children: /* @__PURE__ */ jsx(InteractiveTilt, { accentVar: "--neon-orange", className: "group h-full", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          whileTap: { scale: 0.985 },
          className: "relative h-full flex flex-col",
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "relative flex flex-col h-full overflow-hidden",
              style: {
                boxShadow: `0 0 0 1px ${COLORS.peach}, 0 0 40px -15px ${COLORS.peach}50`,
                background: COLORS.accent,
                minHeight: "400px"
              },
              children: [
                /* @__PURE__ */ jsx(ScanLine, {}),
                /* @__PURE__ */ jsxs("div", { className: "relative p-4 pb-3 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                    /* @__PURE__ */ jsx("div", {}),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                      /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          animate: { rotate: [0, 360] },
                          transition: {
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                          },
                          children: /* @__PURE__ */ jsx(GlobeIcon, {})
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "font-display text-2xl font-black tracking-tight",
                            style: { color: COLORS.white },
                            children: String(index + 1).padStart(2, "0")
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          "div",
                          {
                            className: "font-display text-xs tracking-[0.2em]",
                            style: { color: `${COLORS.white}60` },
                            children: [
                              "/",
                              totalEvents.toString().padStart(2, "0")
                            ]
                          }
                        )
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "font-display text-2xl md:text-2xl font-black tracking-tight leading-[0.9] uppercase line-clamp-2",
                      style: { color: COLORS.white },
                      children: event.name
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ jsxs(
                      "span",
                      {
                        className: "font-display text-[10px] tracking-[0.3em] uppercase",
                        style: { color: `${COLORS.white}70` },
                        children: [
                          "Event ",
                          String(index + 1).padStart(2, "0")
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "flex-1 h-[1px]",
                          style: { background: `${COLORS.white}30` }
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "w-2 h-2 rotate-45",
                          style: { border: `1px solid ${COLORS.peach}` }
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "flex-1 h-[1px]",
                          style: { background: `${COLORS.white}30` }
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsx(DotMatrix, { count: index + 1 }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 flex items-center gap-2 flex-wrap flex-shrink-0", children: [
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "px-3 py-1 font-display text-[10px] tracking-[0.2em]",
                      style: {
                        background: COLORS.accent,
                        border: `1px solid ${COLORS.peach}`,
                        color: COLORS.peach
                      },
                      children: [
                        "PKR",
                        String(index + 26).slice(-2)
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      className: "px-3 py-1 font-display text-[10px] tracking-[0.15em] font-bold",
                      style: {
                        background: COLORS.peach,
                        color: COLORS.accent,
                        clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)"
                      },
                      whileHover: { scale: 1.05 },
                      children: [
                        "OP",
                        String((index + 1) * 7).padStart(2, "0")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      className: "px-3 py-1 font-display text-[10px] tracking-[0.15em] font-bold",
                      style: {
                        background: COLORS.peach,
                        color: COLORS.accent,
                        clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)"
                      },
                      whileHover: { scale: 1.05 },
                      children: [
                        "EV#",
                        String(index + 1).padStart(2, "0")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      className: "ml-auto flex items-center justify-center w-8 h-8",
                      style: {
                        background: COLORS.peach,
                        clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)"
                      },
                      whileHover: { x: 4 },
                      children: /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          d: "M2 6h8M7 3l3 3-3 3",
                          stroke: COLORS.accent,
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      ) })
                    }
                  ),
                  /* @__PURE__ */ jsx(StarBurst, {})
                ] }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "px-4 py-3 mt-auto flex-shrink-0",
                    style: { borderTop: `1px solid ${COLORS.peach}40` },
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "font-display text-lg font-black tracking-[0.08em] uppercase truncate",
                            style: { color: COLORS.white },
                            children: event.name
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "font-display text-[9px] tracking-[0.25em] uppercase flex-shrink-0",
                              style: { color: `${COLORS.white}60` },
                              children: "Cat:"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "font-display text-[10px] tracking-[0.15em] uppercase font-medium truncate",
                              style: { color: COLORS.peach },
                              children: event.category
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "text-[8px] font-display tracking-[0.35em] uppercase flex-shrink-0",
                          style: {
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                            color: `${COLORS.white}50`,
                            height: "60px"
                          },
                          children: "Prakarsh 2026"
                        }
                      )
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "px-4 py-2 flex items-center justify-between flex-shrink-0",
                    style: { background: `${COLORS.peach}15` },
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "flex gap-[1px]", children: Array.from({ length: 20 }).map((_, i) => /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "h-4",
                          style: {
                            width: i % 3 === 0 ? "2px" : "1px",
                            background: i % 4 === 0 ? COLORS.peach : `${COLORS.white}60`
                          }
                        },
                        i
                      )) }),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "px-2 py-1 font-display text-[10px] tracking-[0.2em] font-bold",
                          style: {
                            background: COLORS.peach,
                            color: COLORS.accent
                          },
                          children: "2026"
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-[2px]", children: [3, 6, 4, 8, 5, 7, 3, 5, 4].map((h, i) => /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          className: "w-[2px]",
                          style: { background: COLORS.peach },
                          initial: { height: h },
                          animate: { height: [h, h + 4, h] },
                          transition: {
                            duration: 0.8,
                            delay: i * 0.1,
                            repeat: Infinity
                          }
                        },
                        i
                      )) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    className: "absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    style: {
                      background: `linear-gradient(135deg, ${COLORS.peach}08, transparent 50%, ${COLORS.peach}05)`
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute top-0 left-0 w-4 h-4",
                    style: {
                      background: `linear-gradient(135deg, ${COLORS.accent} 50%, transparent 50%)`,
                      boxShadow: `inset -1px -1px 0 ${COLORS.peach}`
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute bottom-0 right-0 w-4 h-4",
                    style: {
                      background: `linear-gradient(-45deg, ${COLORS.accent} 50%, transparent 50%)`,
                      boxShadow: `inset 1px 1px 0 ${COLORS.peach}`
                    }
                  }
                )
              ]
            }
          )
        }
      ) }) })
    }
  );
}

const defaultColorScheme = {
  border: "#3c2a56",
  text: "#3c2a56",
  accent: "#f1b5a2",
  accentDark: "#2a1e3d",
  glow: "#f1b5a2"
};
const colorSchemes = [
  {
    border: "#3c2a56",
    text: "#3c2a56",
    accent: "#f1b5a2",
    accentDark: "#2a1e3d",
    glow: "#f1b5a2"
  },
  {
    border: "#7B7BF8",
    text: "#2C0060",
    accent: "#FF67D5",
    accentDark: "#4a3a8a",
    glow: "#FF67D5"
  },
  {
    border: "#FF67D5",
    text: "#3c2a56",
    accent: "#7B7BF8",
    accentDark: "#4a3a8a",
    glow: "#FF67D5"
  },
  {
    border: "#C9C9FF",
    text: "#2C0060",
    accent: "#FF67D5",
    accentDark: "#4a3a8a",
    glow: "#C9C9FF"
  },
  {
    border: "#2C0060",
    text: "#F1B5A2",
    accent: "#7B7BF8",
    accentDark: "#1a0040",
    glow: "#7B7BF8"
  },
  {
    border: "#F1B5A2",
    text: "#2C0060",
    accent: "#C9C9FF",
    accentDark: "#3c2a56",
    glow: "#F1B5A2"
  }
];
const ConsoleCard = ({
  title,
  edition,
  description,
  category,
  className,
  colorScheme = defaultColorScheme
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative w-[380px] cursor-pointer transition-all duration-500",
        isHovered ? "scale-[1.02]" : "scale-100",
        className
      ),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative h-[200px] overflow-hidden",
            style: {
              background: `linear-gradient(145deg, #e8e8e8 0%, #ffffff 20%, #c0c0c0 40%, #d8d8d8 60%, #ffffff 80%, #b8b8b8 100%)`,
              border: `3px solid ${colorScheme.border}`
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute inset-0 transition-all duration-700",
                  style: {
                    background: `linear-gradient(${isHovered ? 135 : 90}deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)`,
                    transform: isHovered ? "translateX(100%)" : "translateX(-100%)"
                  }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute top-6 left-6 right-28 pr-4", children: /* @__PURE__ */ jsxs(
                "h2",
                {
                  className: "text-3xl font-black tracking-tight leading-tight line-clamp-3",
                  style: { color: colorScheme.text },
                  children: [
                    title,
                    edition && /* @__PURE__ */ jsx("div", { className: "text-lg font-bold mt-1", children: edition })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "absolute top-[140px] left-8 flex gap-1.5", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-2 h-2 rounded-full transition-all duration-300",
                  style: {
                    backgroundColor: colorScheme.border,
                    opacity: isHovered ? 0.6 : 0.3,
                    transform: isHovered ? `scale(${1 + i * 0.1})` : "scale(1)",
                    transitionDelay: `${i * 50}ms`
                  }
                },
                i
              )) }),
              /* @__PURE__ */ jsx("div", { className: "absolute top-6 right-6 flex flex-col gap-0.5", children: [...Array(8)].map((_, i) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-8 h-1 transition-all duration-300",
                  style: {
                    backgroundColor: colorScheme.border,
                    opacity: isHovered ? 0.6 : 0.3,
                    transitionDelay: `${i * 30}ms`
                  }
                },
                i
              )) }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute right-3 top-16 bottom-4 flex items-center",
                  style: { writingMode: "vertical-rl" },
                  children: /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "text-xs font-black tracking-[0.3em] uppercase",
                      style: { color: colorScheme.border },
                      children: category
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-16 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-6 h-3 rounded-sm",
                    style: { backgroundColor: colorScheme.border }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-2 h-2 rounded-full transition-all duration-300",
                    style: {
                      backgroundColor: colorScheme.accent,
                      boxShadow: isHovered ? `0 0 8px ${colorScheme.accent}` : "none"
                    }
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative h-[180px] overflow-hidden",
            style: {
              backgroundColor: colorScheme.accentDark,
              clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)"
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 50%)"
                  }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute left-8 top-8 right-32", children: /* @__PURE__ */ jsx(
                "p",
                {
                  className: "text-m font-medium leading-relaxed line-clamp-4",
                  style: { color: "#ffffff", opacity: 0.9 },
                  children: description
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "absolute right-12 top-12 flex flex-col gap-2", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-8 h-16 rounded-full",
                    style: { backgroundColor: colorScheme.border }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-10 h-4 rounded-full",
                    style: { backgroundColor: colorScheme.border }
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 right-4 flex gap-6", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-2 h-2 rounded-full transition-all duration-300",
                  style: {
                    backgroundColor: colorScheme.accent,
                    boxShadow: isHovered ? `0 0 ${8 + i * 4}px ${colorScheme.glow}` : `0 0 2px ${colorScheme.glow}`,
                    transitionDelay: `${i * 100}ms`
                  }
                },
                i
              )) }),
              /* @__PURE__ */ jsxs("div", { className: "absolute bottom-8 right-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "h-[2px] transition-all duration-500",
                    style: {
                      backgroundColor: colorScheme.accent,
                      width: isHovered ? "60px" : "30px",
                      opacity: 0.6
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-1 h-1 rounded-full",
                    style: { backgroundColor: colorScheme.accent }
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.02) 2px,
              rgba(255,255,255,0.02) 4px
            )`
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute -inset-2 pointer-events-none transition-opacity duration-500 rounded-lg",
            style: {
              boxShadow: `0 0 60px ${colorScheme.glow}40`,
              opacity: isHovered ? 1 : 0
            }
          }
        )
      ]
    }
  );
};

const EsportsCard = ({
  gameName,
  tournamentName,
  prizePool,
  teamSize,
  date,
  posterImage,
  accentColor,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative w-[280px] sm:w-[320px] h-[390px] sm:h-[450px] rounded-lg overflow-hidden cursor-pointer transition-all duration-500 group",
        isHovered ? "scale-[1.02]" : "scale-100",
        className
      ),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      style: {
        boxShadow: isHovered ? `0 0 40px ${accentColor}50, 0 0 80px ${accentColor}30, inset 0 0 60px ${accentColor}20` : `0 10px 40px rgba(0,0,0,0.5)`
      },
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: posterImage,
            alt: "Game poster",
            className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700",
            style: {
              transform: isHovered ? "scale(1.1)" : "scale(1)"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 transition-opacity duration-500",
            style: {
              background: `linear-gradient(180deg, 
            transparent 0%, 
            transparent 30%,
            rgba(0,0,0,0.6) 60%,
            rgba(0,0,0,0.95) 100%
          )`
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 transition-opacity duration-500",
            style: {
              background: `linear-gradient(135deg, ${accentColor}20 0%, transparent 50%, ${accentColor}10 100%)`,
              opacity: isHovered ? 1 : 0.5
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none overflow-hidden",
            style: {
              opacity: isHovered ? 1 : 0
            },
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute w-full h-1 animate-pulse",
                style: {
                  background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                  top: "30%",
                  boxShadow: `0 0 20px ${accentColor}`,
                  animation: isHovered ? "scanLine 2s ease-in-out infinite" : "none"
                }
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-0 left-0 w-12 sm:w-20 h-12 sm:h-20 transition-all duration-500",
            style: {
              borderTop: `3px solid ${accentColor}`,
              borderLeft: `3px solid ${accentColor}`,
              opacity: isHovered ? 1 : 0.5,
              boxShadow: isHovered ? `inset 10px 10px 20px ${accentColor}30` : "none"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-0 right-0 w-12 sm:w-20 h-12 sm:h-20 transition-all duration-500",
            style: {
              borderTop: `3px solid ${accentColor}`,
              borderRight: `3px solid ${accentColor}`,
              opacity: isHovered ? 1 : 0.5,
              boxShadow: isHovered ? `inset -10px 10px 20px ${accentColor}30` : "none"
            }
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm flex items-center gap-1 sm:gap-2 transition-all duration-300",
            style: {
              backgroundColor: `${accentColor}dd`,
              boxShadow: `0 0 15px ${accentColor}80`,
              transform: isHovered ? "translateX(5px)" : "translateX(0)"
            },
            children: [
              /* @__PURE__ */ jsx(Gamepad2, { className: "w-3 h-3 sm:w-4 sm:h-4 text-white flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden sm:inline", children: gameName }),
              /* @__PURE__ */ jsx("span", { className: "text-white text-[10px] sm:hidden font-bold uppercase", children: gameName.substring(0, 3) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-1 sm:gap-2 transition-opacity duration-300",
            style: { opacity: isHovered ? 1 : 0.7 },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-2 h-2 rounded-full animate-pulse",
                  style: {
                    backgroundColor: accentColor,
                    boxShadow: `0 0 10px ${accentColor}`
                  }
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-white text-[10px] sm:text-xs font-mono uppercase hidden sm:inline", children: "Registering" }),
              /* @__PURE__ */ jsx("span", { className: "text-white text-[10px] sm:hidden font-mono uppercase", children: "Live" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-3 sm:p-5", children: [
          /* @__PURE__ */ jsx(
            "h3",
            {
              className: "text-lg sm:text-2xl font-black uppercase tracking-tight mb-2 sm:mb-3 transition-all duration-300 line-clamp-2",
              style: {
                color: "#ffffff",
                textShadow: `0 0 20px ${accentColor}80, 0 2px 4px rgba(0,0,0,0.8)`,
                transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                fontSize: "clamp(0.875rem, 2vw, 1.5rem)"
              },
              children: tournamentName
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "w-full py-2 sm:py-3 rounded-sm font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 overflow-hidden relative",
              style: {
                backgroundColor: isHovered ? accentColor : "transparent",
                border: `2px solid ${accentColor}`,
                color: isHovered ? "#ffffff" : accentColor,
                boxShadow: isHovered ? `0 0 30px ${accentColor}60` : "none"
              },
              children: [
                /* @__PURE__ */ jsx(Zap, { className: "w-3 h-3 sm:w-4 sm:h-4" }),
                /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Register Now" }),
                /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Join" }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute inset-0 transition-transform duration-700",
                    style: {
                      background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                      transform: isHovered ? "translateX(200%)" : "translateX(-200%)"
                    }
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute bottom-0 left-0 w-10 sm:w-16 h-10 sm:h-16 transition-all duration-500",
            style: {
              borderBottom: `3px solid ${accentColor}`,
              borderLeft: `3px solid ${accentColor}`,
              opacity: isHovered ? 1 : 0.5
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute bottom-0 right-0 w-10 sm:w-16 h-10 sm:h-16 transition-all duration-500",
            style: {
              borderBottom: `3px solid ${accentColor}`,
              borderRight: `3px solid ${accentColor}`,
              opacity: isHovered ? 1 : 0.5
            }
          }
        ),
        isHovered && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none animate-pulse",
            style: {
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                ${accentColor}08 2px,
                ${accentColor}08 4px
              )`
            }
          }
        ) }),
        /* @__PURE__ */ jsx("style", { children: `
        @keyframes scanLine {
          0%, 100% { top: 20%; opacity: 0; }
          50% { top: 80%; opacity: 1; }
        }
      ` })
      ]
    }
  );
};

function UnifiedEventsPage({
  technicalEvents,
  nonTechnicalEvents,
  workshopEvents,
  esportsEvents = []
}) {
  const [activeTab, setActiveTab] = useState("all");
  const allEvents = [
    ...technicalEvents.map((e) => ({ ...e, displayCategory: "tech" })),
    ...nonTechnicalEvents.map((e) => ({ ...e, displayCategory: "non-tech" })),
    ...workshopEvents.map((e) => ({ ...e, displayCategory: "workshops" })),
    ...esportsEvents.map((e) => ({ ...e, displayCategory: "esports" }))
  ];
  const filteredEvents = activeTab === "all" ? allEvents : allEvents.filter((e) => e.displayCategory === activeTab);
  const accentColors = [
    "#ff006e",
    "#00f5ff",
    "#ffbe0b",
    "#8338ec",
    "#3a86ff",
    "#06ffa5"
  ];
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(ParticleField, {}),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-32 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/30 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-32 right-8 w-20 h-20 border-r-2 border-t-2 border-accent/30 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-accent/30 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/30 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "pt-32 pb-16 px-6 bg-[#FBDACC]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3 },
            className: "mb-12",
            children: /* @__PURE__ */ jsx(
              "a",
              {
                href: "/",
                className: "inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider hover:gap-4 transition-all text-foreground hover:text-primary",
                children: "← Back to Home"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsx("h1", { className: "font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-neon-cyan", children: "All Events" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4 mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "h-[2px] w-24 bg-gradient-to-r from-transparent to-primary" }),
                /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rotate-45 border-2 border-neon-green" }),
                /* @__PURE__ */ jsx("div", { className: "h-[2px] w-24 bg-gradient-to-l from-transparent to-accent" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8", children: "Explore all technical events, non-technical challenges, workshops, and esports tournaments at Prakarsh '26" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4", children: [
                { id: "all", label: "All Events", count: allEvents.length },
                { id: "tech", label: "Technical", count: technicalEvents.length },
                { id: "non-tech", label: "Non-Technical", count: nonTechnicalEvents.length },
                { id: "workshops", label: "Workshops", count: workshopEvents.length },
                { id: "esports", label: "Esports", count: esportsEvents.length }
              ].map((tab) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveTab(tab.id),
                  className: `px-6 py-3 font-display text-sm tracking-wider transition-all ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-background/50 text-foreground/70 hover:bg-background/80 border border-border"}`,
                  style: {
                    clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
                  },
                  children: [
                    tab.label,
                    " (",
                    tab.count,
                    ")"
                  ]
                },
                tab.id
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "relative",
            children: [
              activeTab === "tech" || activeTab === "all" ? /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
                activeTab === "all" && technicalEvents.length > 0 && /* @__PURE__ */ jsx("h2", { className: "text-3xl font-display font-black mb-6 text-neon-cyan", children: "Technical Events" }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: (activeTab === "tech" ? technicalEvents : technicalEvents).map((event, index) => /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.4, delay: index * 0.05 },
                    children: /* @__PURE__ */ jsx(CassetteCard, { event, index, totalEvents: technicalEvents.length })
                  },
                  event.id
                )) })
              ] }) : null,
              activeTab === "non-tech" || activeTab === "all" ? /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
                activeTab === "all" && nonTechnicalEvents.length > 0 && /* @__PURE__ */ jsx("h2", { className: "text-3xl font-display font-black mb-6 text-neon-pink", children: "Non-Technical Events" }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-6", children: (activeTab === "non-tech" ? nonTechnicalEvents : nonTechnicalEvents).map((event, index) => /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.4, delay: index * 0.05 },
                    children: /* @__PURE__ */ jsx("a", { href: `/event/${event.id}`, className: "block", children: /* @__PURE__ */ jsx(
                      ConsoleCard,
                      {
                        title: event.name,
                        description: event.tagline,
                        category: "non-tech",
                        colorScheme: colorSchemes[index % colorSchemes.length]
                      }
                    ) })
                  },
                  event.id
                )) })
              ] }) : null,
              activeTab === "workshops" || activeTab === "all" ? /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
                activeTab === "all" && workshopEvents.length > 0 && /* @__PURE__ */ jsx("h2", { className: "text-3xl font-display font-black mb-6 text-neon-green", children: "Workshops" }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-6", children: (activeTab === "workshops" ? workshopEvents : workshopEvents).map((event, index) => /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.4, delay: index * 0.05 },
                    children: /* @__PURE__ */ jsx("a", { href: `/event/${event.id}`, className: "block", children: /* @__PURE__ */ jsx(
                      ConsoleCard,
                      {
                        title: event.name,
                        description: event.tagline,
                        category: "workshops",
                        colorScheme: colorSchemes[index % colorSchemes.length]
                      }
                    ) })
                  },
                  event.id
                )) })
              ] }) : null,
              activeTab === "esports" || activeTab === "all" ? /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
                activeTab === "all" && esportsEvents.length > 0 && /* @__PURE__ */ jsx("h2", { className: "text-3xl font-display font-black mb-6 text-neon-purple", children: "Esports" }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-6", children: (activeTab === "esports" ? esportsEvents : esportsEvents).map((event, index) => /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.4, delay: index * 0.05 },
                    children: /* @__PURE__ */ jsx("a", { href: `/event/${event.id}`, className: "block", children: /* @__PURE__ */ jsx(
                      EsportsCard,
                      {
                        gameName: event.name.split(" ")[0],
                        tournamentName: event.name,
                        prizePool: "TBA",
                        teamSize: "Squad",
                        date: "Prakarsh '26",
                        posterImage: event.posterImage || "",
                        accentColor: accentColors[index % accentColors.length]
                      }
                    ) })
                  },
                  event.id
                )) })
              ] }) : null
            ]
          }
        ),
        filteredEvents.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "No events available in this category." }) })
      ] }) })
    ] })
  ] });
}

const $$Events = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Events - Prakarsh '26" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "UnifiedEventsPage", UnifiedEventsPage, { "client:load": true, "technicalEvents": technicalEvents, "nonTechnicalEvents": nonTechnicalEvents, "workshopEvents": workshopEvents, "esportsEvents": esportsEvents, "client:component-hydration": "load", "client:component-path": "D:/astro-js/one-sprite-sheet-all-images/src/components/UnifiedEventsPage", "client:component-export": "default" })} ` })}`;
}, "D:/astro-js/one-sprite-sheet-all-images/src/pages/events.astro", void 0);

const $$file = "D:/astro-js/one-sprite-sheet-all-images/src/pages/events.astro";
const $$url = "/events";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Events,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
