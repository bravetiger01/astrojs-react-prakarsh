import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_G7kzBA19.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_FC8zWwR5.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
export { renderers } from '../renderers.mjs';

function InteractiveTilt({ children, accentVar, className = "" }) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      whileHover: { scale: 1.02 },
      transition: { duration: 0.2 },
      className,
      style: {
        ["--event-accent"]: `var(${accentVar})`
      },
      children
    }
  );
}

const neonVars = {
  cyan: "--neon-cyan",
  blue: "--neon-blue",
  purple: "--neon-purple",
  pink: "--neon-pink",
  green: "--neon-green",
  orange: "--neon-orange",
  red: "--neon-red"
};
const neonTextClasses = {
  cyan: "text-neon-cyan",
  blue: "text-neon-blue",
  purple: "text-neon-purple",
  pink: "text-neon-pink",
  green: "text-neon-green",
  orange: "text-neon-orange",
  red: "text-neon-red"
};
function ChunkyQr() {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "aria-hidden": true,
      className: "grid h-16 w-16 grid-cols-7 gap-[2px] p-[2px]",
      style: {
        clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
        border: "1px solid hsl(var(--event-accent) / 0.55)",
        background: "hsl(var(--background) / 0.15)"
      },
      children: Array.from({ length: 49 }).map((_, i) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "",
          style: {
            background: i % 7 === 0 || i % 7 === 6 || Math.floor(i / 7) % 7 === 0 || Math.floor(i / 7) % 7 === 6 || i % 11 === 0 ? "hsl(var(--event-accent) / 0.9)" : "hsl(var(--event-accent) / 0.08)"
          }
        },
        i
      ))
    }
  );
}
function TechEventCard({ event, index }) {
  const accentVar = neonVars[event.neonColor || "cyan"];
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.5, delay: index * 0.08 },
      className: "h-full",
      children: /* @__PURE__ */ jsx(InteractiveTilt, { accentVar, className: "group h-full", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          whileTap: { scale: 0.985 },
          className: "relative h-full",
          style: {
            ["--event-accent"]: `var(${accentVar})`
          },
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "relative h-full overflow-hidden",
              style: {
                clipPath: "polygon(30px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 40px), calc(100% - 40px) 100%, 22px 100%, 0 calc(100% - 22px), 0 30px)",
                boxShadow: "0 0 0 1px hsl(var(--event-accent) / 0.75), 0 26px 70px -42px hsl(var(--event-accent) / 0.60)"
              },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    "aria-hidden": true,
                    className: "pointer-events-none absolute inset-[10px]",
                    style: {
                      clipPath: "polygon(22px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 28px), calc(100% - 28px) 100%, 16px 100%, 0 calc(100% - 16px), 0 22px)",
                      boxShadow: "0 0 0 1px hsl(var(--event-accent) / 0.35)"
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    "aria-hidden": true,
                    className: "pointer-events-none absolute inset-0",
                    style: {
                      backgroundImage: "radial-gradient(800px circle at 40% 25%, hsl(var(--event-accent) / 0.22), transparent 55%), radial-gradient(600px circle at 80% 90%, hsl(var(--secondary) / 0.12), transparent 60%)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10 grid h-full grid-rows-[auto_1fr_auto] gap-4 p-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                      /* @__PURE__ */ jsx(ChunkyQr, {}),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "h-16 w-12",
                          style: {
                            clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                            border: "1px solid hsl(var(--border))",
                            background: "linear-gradient(135deg, hsl(var(--event-accent) / 0.12), hsl(var(--secondary) / 0.08))"
                          }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-[10px] font-display tracking-[0.3em] text-foreground/55", children: "ID NUMBER" }),
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "mt-1 font-display text-xs font-black tracking-[0.22em]",
                          style: { color: "hsl(var(--event-accent) / 0.9)" },
                          children: [
                            "PKR-",
                            String(1e3 + index * 7)
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "relative overflow-hidden",
                      style: {
                        clipPath: "polygon(22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px), 0 22px)",
                        border: "1px solid hsl(var(--event-accent) / 0.45)",
                        background: "linear-gradient(135deg, hsl(var(--card) / 0.10), hsl(var(--background) / 0.02))",
                        boxShadow: "inset 0 0 0 1px hsl(var(--event-accent) / 0.10), 0 14px 40px -30px hsl(var(--event-accent) / 0.55)"
                      },
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 hex-grid opacity-25 mix-blend-screen" }),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            "aria-hidden": true,
                            className: "absolute inset-0 opacity-80",
                            style: {
                              backgroundImage: "radial-gradient(circle at 25% 20%, hsl(var(--event-accent) / 0.28), transparent 60%), radial-gradient(circle at 75% 80%, hsl(var(--neon-green) / 0.10), transparent 60%)"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            "aria-hidden": true,
                            className: "absolute -left-24 top-10 h-16 w-[140%] rotate-[-14deg]",
                            style: {
                              background: "linear-gradient(90deg, transparent 0%, hsl(var(--event-accent) / 0.18) 30%, transparent 70%)"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex h-full min-h-[240px] items-end justify-between p-4", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-display tracking-[0.3em] text-foreground/55", children: "NAME" }),
                            /* @__PURE__ */ jsx(
                              "div",
                              {
                                className: "mt-1 font-display text-3xl font-black tracking-[0.18em] uppercase " + neonTextClasses[event.neonColor || "cyan"],
                                children: event.name
                              }
                            ),
                            /* @__PURE__ */ jsxs("div", { className: "mt-2 text-[11px] text-foreground/60", children: [
                              /* @__PURE__ */ jsx("span", { className: "font-display tracking-[0.22em]", children: "MISSION" }),
                              " ",
                              /* @__PURE__ */ jsxs("span", { style: { color: "hsl(var(--neon-green) / 0.9)" }, children: [
                                "#",
                                event.id
                              ] })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "inline-flex h-14 w-14 items-center justify-center",
                              style: {
                                clipPath: "polygon(18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px), 0 18px)",
                                border: "1px solid hsl(var(--event-accent) / 0.55)",
                                background: "hsl(var(--event-accent) / 0.06)"
                              },
                              children: /* @__PURE__ */ jsx(
                                "div",
                                {
                                  className: "h-7 w-7",
                                  style: {
                                    clipPath: "polygon(50% 0, 88% 12%, 100% 50%, 88% 88%, 50% 100%, 12% 88%, 0 50%, 12% 12%)",
                                    boxShadow: "0 0 0 2px hsl(var(--event-accent) / 0.55)"
                                  }
                                }
                              )
                            }
                          ) })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "relative flex items-center justify-between gap-4 px-4 py-3",
                      style: {
                        clipPath: "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 20px)",
                        border: "1px solid hsl(var(--event-accent) / 0.45)",
                        background: "linear-gradient(90deg, hsl(var(--event-accent) / 0.10), hsl(var(--background) / 0.10))"
                      },
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsx("div", { className: "h-[2px] w-10 bg-gradient-to-r from-transparent via-primary/70 to-transparent" }),
                          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-display tracking-[0.35em] text-foreground/55", children: "PRAKARSH.26" })
                        ] }),
                        /* @__PURE__ */ jsxs(
                          motion.div,
                          {
                            className: "inline-flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100",
                            initial: { x: -8 },
                            whileHover: { x: 0 },
                            children: [
                              /* @__PURE__ */ jsx(
                                "span",
                                {
                                  className: "text-[10px] font-display tracking-[0.35em]",
                                  style: { color: "hsl(var(--event-accent))" },
                                  children: "OPEN"
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "svg",
                                {
                                  width: "14",
                                  height: "14",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  style: { color: "hsl(var(--event-accent))" },
                                  children: /* @__PURE__ */ jsx(
                                    "path",
                                    {
                                      d: "M9 18l6-6-6-6",
                                      stroke: "currentColor",
                                      strokeWidth: "2",
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round"
                                    }
                                  )
                                }
                              )
                            ]
                          }
                        )
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        }
      ) })
    }
  );
}

const EventCard = ({ event, index }) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.5, delay: index * 0.08 },
      className: "h-full",
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          whileHover: { x: -4, y: -4 },
          whileTap: { x: 0, y: 0 },
          className: "relative h-full group cursor-pointer",
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: "bg-background border-2 border-foreground p-6 shadow-md dark:shadow-md-dark \r\n                          group-hover:shadow-lg dark:group-hover:shadow-lg-dark transition-all duration-150 ease-out h-full flex flex-col",
              children: [
                /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-foreground text-background px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider", children: event.category }) }),
                /* @__PURE__ */ jsx("h3", { className: "font-sans text-2xl font-bold mb-3 uppercase tracking-tighter", children: event.name }),
                /* @__PURE__ */ jsx("div", { className: "h-0.5 w-16 bg-foreground mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-foreground font-serif text-sm leading-relaxed mb-4 flex-1", children: event.tagline || (Array.isArray(event.description) ? event.description[0] : event.description) }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: event.keywords.slice(0, 3).map((keyword) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "px-2 py-1 text-xs font-mono border border-foreground uppercase",
                    children: keyword
                  },
                  keyword
                )) }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-auto pt-4 border-t-2 border-foreground", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-foreground/60 font-mono uppercase tracking-wider", children: event.category }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-mono font-bold", children: "→" })
                ] })
              ]
            }
          )
        }
      )
    }
  );
};

const colors = [
  "195, 100%, 44%",
  // cyan
  "330, 100%, 61%",
  // pink
  "270, 65%, 46%"
  // purple
];
const ParticleField = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const particleCount = 60;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.color}, ${particle.opacity})`;
        ctx.fill();
      });
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(195, 100%, 44%, ${0.08 * (1 - distance / 120)})`;
            ctx.stroke();
          }
        });
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "fixed inset-0 pointer-events-none z-0",
      style: { opacity: 0.5 }
    }
  );
};

const neonColors = ["cyan", "blue", "purple", "pink", "orange", "red"];
function UnifiedEventsPage({
  technicalEvents,
  nonTechnicalEvents,
  workshopEvents
}) {
  const [activeTab, setActiveTab] = useState("all");
  const allEvents = [
    ...technicalEvents.map((e) => ({ ...e, displayCategory: "tech" })),
    ...nonTechnicalEvents.map((e) => ({ ...e, displayCategory: "non-tech" })),
    ...workshopEvents.map((e) => ({ ...e, displayCategory: "workshops" }))
  ];
  const filteredEvents = activeTab === "all" ? allEvents : allEvents.filter((e) => e.displayCategory === activeTab);
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(ParticleField, {}),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-32 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/30 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-32 right-8 w-20 h-20 border-r-2 border-t-2 border-accent/30 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-accent/30 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/30 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "pt-32 pb-16 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsx("h1", { className: "font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-primary", children: "All Events" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4 mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "h-[2px] w-24 bg-gradient-to-r from-transparent to-primary" }),
                /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rotate-45 border-2 border-primary" }),
                /* @__PURE__ */ jsx("div", { className: "h-[2px] w-24 bg-gradient-to-l from-transparent to-accent" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8", children: "Explore all technical events, non-technical challenges, and workshops at Prakarsh '26" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4", children: [
                { id: "all", label: "All Events", count: allEvents.length },
                { id: "tech", label: "Technical", count: technicalEvents.length },
                { id: "non-tech", label: "Non-Technical", count: nonTechnicalEvents.length },
                { id: "workshops", label: "Workshops", count: workshopEvents.length }
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
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative",
            children: filteredEvents.map((event, index) => /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4, delay: index * 0.05 },
                children: event.displayCategory === "tech" ? /* @__PURE__ */ jsx("a", { href: `/event/${event.id}`, className: "block h-full", children: /* @__PURE__ */ jsx(
                  TechEventCard,
                  {
                    event: {
                      ...event,
                      neonColor: neonColors[index % neonColors.length]
                    },
                    index
                  }
                ) }) : /* @__PURE__ */ jsx("a", { href: `/event/${event.id}`, className: "block h-full", children: /* @__PURE__ */ jsx(
                  EventCard,
                  {
                    event,
                    index
                  }
                ) })
              },
              event.id
            ))
          }
        ),
        filteredEvents.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "No events available in this category." }) })
      ] }) })
    ] })
  ] });
}

const technicalEvents = [
  {
    id: "shark-tank-ssip-startup-pitch",
    name: "Shark Tank: SSIP Startup Pitch",
    tagline: "Pitch bold ideas to SSIP mentors and investors.",
    description: [
      "An open innovation pitch platform focusing on originality and entrepreneurial thinking for startup ideas or early-stage solutions."
    ],
    eventHighlights: [
      "Open innovation pitch in front of SSIP mentors",
      "Emphasis on originality, market validation, and feasibility",
      "Feedback on business model, risks, and prototype readiness"
    ],
    keywords: ["startup", "pitch", "innovation"],
    colors: "Neon pink highlights on a deep charcoal backdrop.",
    category: "tech",
    neonColor: "cyan"
  },
  {
    id: "urban-genesis-estate-empire",
    name: "Urban Genesis / Estate Empire",
    tagline: "Build and survive in a collapsing city sim.",
    description: [
      "An intense offline strategy simulation involving market crashes and tech limits where teams build and manage a city."
    ],
    eventHighlights: [
      "Offline strategy with sudden market crashes",
      "Balance tech limits, resources, and expansion",
      "Team-based city building with risk trade-offs"
    ],
    keywords: ["strategy", "simulation", "city"],
    colors: "Graphite grids with neon pink accents for city overlays.",
    category: "tech",
    neonColor: "blue"
  },
  {
    id: "designx-ultimate-design-challenge",
    name: "DesignX - The Ultimate Design Challenge",
    tagline: "Speed-run design rounds that test fundamentals.",
    description: [
      "A multi-round design showdown testing creativity, design fundamentals, and presentation skills using tools like Figma and Canva."
    ],
    eventHighlights: [
      "Rapid design briefs across multiple rounds",
      "Judging on fundamentals, clarity, and creativity",
      "Pitch your concepts with tight storytelling"
    ],
    keywords: ["design", "figma", "pitch"],
    colors: "Clean dark canvas with neon pink callouts and grids.",
    category: "tech",
    neonColor: "purple"
  },
  {
    id: "techtonic",
    name: "TechTonic",
    tagline: "Timelines, tech trivia, and rapid pitching.",
    description: [
      "A fast-paced team event involving technology timelines, concept explanations, and pitching unconventional technologies."
    ],
    eventHighlights: [
      "Technology timeline face-offs",
      "Explain and demo unfamiliar concepts under time",
      "Pitch unconventional technologies with flair"
    ],
    keywords: ["trivia", "pitch", "timeline"],
    colors: "Neon pink signal lines over dim gradients.",
    category: "tech",
    neonColor: "pink"
  },
  {
    id: "techtrash",
    name: "TechTrash",
    tagline: "Turn e-waste into impact-focused builds.",
    description: [
      "An event where participants transform e-waste and discarded tech materials into innovative models to address environmental problems."
    ],
    eventHighlights: [
      "Hands-on build using e-waste and scraps",
      "Judge on creativity, feasibility, and impact",
      "Highlight sustainability and reuse at every step"
    ],
    keywords: ["sustainability", "hardware", "maker"],
    colors: "Recycled metallics with neon pink edge lighting.",
    category: "tech",
    neonColor: "green"
  },
  {
    id: "stealscape-think-steal-escape",
    name: "STEALSCAPE: THINK STEAL ESCAPE",
    tagline: "Race through a digital heist and escape.",
    description: [
      "A high-octane tech heist involving a digital maze and AI-powered escape challenges across three rounds."
    ],
    eventHighlights: [
      "AI-assisted clues across a digital maze",
      "Three escalating rounds with timed escapes",
      "Blend puzzles, stealth, and quick decision making"
    ],
    keywords: ["puzzle", "ai", "escape"],
    colors: "Dark heist palette lit with neon pink traces.",
    category: "tech",
    neonColor: "orange"
  },
  {
    id: "ghostbusters",
    name: "GhostBusters",
    tagline: "Hunt hidden Wi-Fi beacons with ESP32 rigs.",
    description: [
      "A hands-on cybersecurity challenge to hunt hidden Wi-Fi beacons using ESP32 microcontrollers and RSSI data analysis."
    ],
    eventHighlights: [
      "Use ESP32 kits to sweep for rogue beacons",
      "Analyze RSSI signals to triangulate sources",
      "Score on accuracy, speed, and clean reporting"
    ],
    keywords: ["cybersecurity", "wifi", "esp32"],
    colors: "Signal maps in neon pink with radar rings.",
    category: "tech",
    neonColor: "red"
  },
  {
    id: "feud-exe",
    name: "Feud.exe",
    tagline: "Predict the crowd to stay in the game.",
    description: [
      "A team-based showdown powered by real student survey data where teams predict crowd responses in elimination rounds."
    ],
    eventHighlights: [
      "Gameplay driven by real survey datasets",
      "Elimination rounds that reward sharp instincts",
      "Teams debate, lock answers, and climb the board"
    ],
    keywords: ["survey", "strategy", "game"],
    colors: "Neon pink scoreboards on a smoky backdrop.",
    category: "tech",
    neonColor: "cyan"
  },
  {
    id: "sync-or-sink",
    name: "Sync or Sink",
    tagline: "Navigate branching storylines to the true ending.",
    description: [
      "A story-driven decision game where teams navigate interactive storylines and branching paths to find a true ending."
    ],
    eventHighlights: [
      "Interactive narrative with multiple branches",
      "Consequences stack across every decision",
      "Find the authentic ending before time runs out"
    ],
    keywords: ["story", "decision", "puzzle"],
    colors: "Neon pink path highlights over deep indigo.",
    category: "tech",
    neonColor: "blue"
  },
  {
    id: "hydrohustle",
    name: "HydroHustle",
    tagline: "Build and launch water rockets for distance wins.",
    description: [
      "A water rocket workshop and competition focusing on aerodynamics, propulsion, and distance-based launching."
    ],
    eventHighlights: [
      "Workshop on fins, stability, and propulsion",
      "Hands-on build followed by launch trials",
      "Score on distance, consistency, and safety"
    ],
    keywords: ["rocketry", "aero", "workshop"],
    colors: "Night sky blues with neon pink exhaust trails.",
    category: "tech",
    neonColor: "purple"
  },
  {
    id: "ctf-capture-the-flag",
    name: "CTF (Capture the Flag)",
    tagline: "Crack web, crypto, reversing, and forensics challenges.",
    description: [
      "A cybersecurity competition involving web security, cryptography, reverse engineering, and digital forensics."
    ],
    eventHighlights: [
      "Diverse categories with beginner to advanced flags",
      "Time-boxed challenges with live scoreboard",
      "Collaboration-heavy team play and writeups"
    ],
    keywords: ["security", "ctf", "hacking"],
    colors: "Terminal greens blended with neon pink highlights.",
    category: "tech",
    neonColor: "pink"
  },
  {
    id: "game-of-prompts",
    name: "Game of Prompts",
    tagline: "Use AI prompting to build and repair game ideas.",
    description: [
      "A multi-round AI-powered game creation challenge where teams use prompt engineering to build and repair game concepts."
    ],
    eventHighlights: [
      "Prompt engineering to craft game loops",
      "Fix broken mechanics across rounds",
      "Blend creativity with AI tooling for speed"
    ],
    keywords: ["ai", "prompt", "game-dev"],
    colors: "Neon pink HUD elements over dark UI panels.",
    category: "tech",
    neonColor: "green"
  },
  {
    id: "tradex-2-quiz-stock-market",
    name: "TradeX 2.0 - Quiz-Based Stock Market Simulation",
    tagline: "Trade smarter as quiz outcomes move the market.",
    description: [
      "A stock market simulation where trading is influenced by quiz outcomes, market news, and risk-taking decisions."
    ],
    eventHighlights: [
      "Live quiz results drive market swings",
      "Balance risk, liquidity, and timing",
      "Leaderboard tracks gains across volatile rounds"
    ],
    keywords: ["finance", "simulation", "quiz"],
    colors: "Market tickers in neon pink with grid backdrops.",
    category: "tech"
  },
  {
    id: "vr-arena-ultimate-experience",
    name: "VR Arena: The Ultimate AR-VR Experience",
    tagline: "Step into immersive AR and VR worlds.",
    description: [
      "An immersive experience using VR headsets and consoles to explore virtual worlds and interactive games."
    ],
    eventHighlights: [
      "Curated VR and AR experiences with guides",
      "Safe play zones with quick rotations",
      "Mix of exploration, rhythm, and action titles"
    ],
    keywords: ["vr", "ar", "immersive"],
    colors: "Holographic gradients with neon pink glow.",
    category: "tech",
    neonColor: "red"
  },
  {
    id: "the-hangar-room",
    name: "The Hangar Room",
    tagline: "Experience aviation fundamentals up close.",
    description: [
      "An experiential aviation event covering aerodynamics, aircraft structures, and remote flight operations."
    ],
    eventHighlights: [
      "Demos on lift, drag, and stability",
      "Hands-on with model aircraft structures",
      "Remote flight sessions under supervision"
    ],
    keywords: ["aviation", "aerodynamics", "flight"],
    colors: "Runway slate with neon pink runway lights.",
    category: "tech",
    neonColor: "cyan"
  },
  {
    id: "case-closed",
    name: "CASE CLOSED?",
    tagline: "Solve an AI-assisted murder mystery over two days.",
    description: [
      "A two-day AI-powered murder mystery using Google NotebookLM to build and solve crime narratives."
    ],
    eventHighlights: [
      "Use NotebookLM to stitch clues and evidence",
      "Collaborative narrative building across days",
      "Present the final theory with proof to win"
    ],
    keywords: ["ai", "mystery", "investigation"],
    colors: "Noir palettes punctuated by neon pink threads.",
    category: "tech",
    neonColor: "blue"
  },
  {
    id: "dreamflow",
    name: "Dreamflow",
    tagline: "Build mobile apps with natural language prompts.",
    description: [
      "An AI-first mobile app building session using natural language prompts and the FlutterFlow platform."
    ],
    eventHighlights: [
      "Prompt-driven UI and logic generation",
      "Iterate fast with visual previews in FlutterFlow",
      "Ship polished app flows without deep coding"
    ],
    keywords: ["no-code", "ai", "flutterflow"],
    colors: "Soft gradients with bright neon pink edges.",
    category: "tech"
  }
];

const nonTechnicalEvents = [
  {
    id: "forensiq",
    name: "FORENSiQ",
    tagline: "Can you catch the killer before time runs out?",
    description: [
      "An immersive forensic murder mystery where participants step into the role of investigators to analyze clues, decode evidence, and uncover the truth before time runs out.",
      "The event simulates real-life criminal investigations where teams must base their conclusions strictly on evidence released during progressive rounds."
    ],
    eventHighlights: [
      "Collect and analyze staged crime-scene evidence",
      "Decode timelines and interrogate suspects",
      "Fast-paced deduction with team coordination"
    ],
    keywords: ["mystery", "forensics", "team"],
    colors: "Smoky dark backdrop with neon orange evidence markers.",
    category: "non-tech"
  },
  {
    id: "bech-ke-dikha",
    name: "Bech ke Dikha",
    tagline: "from pitch to profit",
    description: [
      "Inspired by reality-show style challenges, this event tests participants' sales skills, creativity, confidence, communication, and persuasion under unusual and high-pressure conditions.",
      "Participants are challenged to sell a basket of unusual and low-value items to people across the college campus while keeping the activity fun and campus-appropriate."
    ],
    eventHighlights: [
      "Sell unusual and low-value items across campus",
      "High-pressure sales and persuasion challenges",
      "Creative and humorous presentation styles encouraged"
    ],
    keywords: ["sales", "marketing", "creativity", "persuasion"],
    colors: "",
    category: "non-tech"
  },
  {
    id: "human-foosball",
    name: "Human Foosball",
    tagline: "Play like a table, think like a team!",
    description: [
      "Human Foosball is a fun, high-energy sports event where participants play football while restricted to fixed horizontal positions, mimicking a real foosball table.",
      "Players are tied to horizontal ropes and can only move left or right, focusing on teamwork and strategy to score the maximum number of goals."
    ],
    eventHighlights: [
      "Life-sized foosball lanes and rods",
      "Quick passing and synchronized movement",
      "Short, energetic matches for fast brackets"
    ],
    keywords: ["sports", "team", "speed"],
    colors: "Turf textures with neon orange lane dividers.",
    category: "non-tech"
  },
  {
    id: "high-on-hogwarts",
    name: "High on Hogwarts",
    tagline: "Earn the glory.",
    description: [
      "House Cup is a two-day immersive wizarding event inspired by the magical world of Harry Potter, where participants are grouped into houses based on personality traits and compete in magical trials to earn points and claim ultimate victory.",
      "The event includes multiple magical challenges such as wizarding trivia, potion mixing, spell decoding rounds, and a campus-wide Horcrux hunt."
    ],
    eventHighlights: [
      "House-based challenges across two days",
      "Spellbinding puzzles and physical trials",
      "Live scoreboard with point swings"
    ],
    keywords: ["fantasy", "puzzle", "house"],
    colors: "Midnight halls with neon orange crest accents.",
    category: "non-tech"
  },
  {
    id: "commando-fitness",
    name: "Commando Fitness",
    tagline: "Strength. Stability. Control.",
    description: [
      "A college-level physical fitness challenge designed to test strength, endurance, and body control through timed drills."
    ],
    eventHighlights: [
      "Structured stations for endurance and strength",
      "Time-bound heats with judges on form",
      "Solo leaderboard with progressive difficulty"
    ],
    keywords: ["fitness", "endurance", "strength"],
    colors: "Steely gradients with neon orange pace lines.",
    category: "non-tech"
  },
  {
    id: "project-polaris",
    name: "PROJECT POLARIS",
    tagline: "Navigate the lies. Uncover the truth.",
    description: [
      "Project Polaris is a live-action mystery experience that translates the suspense and strategy of 'Among Us' into a physical campus event.",
      "Participants are secretly assigned roles as Crew Members or Impostors, with Crew Members completing tasks while Impostors attempt to sabotage the mission and eliminate players."
    ],
    eventHighlights: [
      "Role-based play with hidden impostors",
      "Campus-wide tasks and sabotage alerts",
      "Rapid debriefs and vote-outs each round"
    ],
    keywords: ["mystery", "social", "deduction"],
    colors: "Dark space backdrop with neon orange mission pings.",
    category: "non-tech"
  },
  {
    id: "human-ludo",
    name: "Human Ludo",
    tagline: "Roll big, run fast, reach home.",
    description: [
      "A real-life adaptation of the classic board game where participants act as live game pieces on a large ground-based board.",
      "The event blends traditional movement based on dice rolls with interactive twists like riddles and advantage-disadvantage challenges."
    ],
    eventHighlights: [
      "Life-sized board with color-coded lanes",
      "Dice-driven moves and safe zones",
      "Team relays to capture and reach home"
    ],
    keywords: ["ludo", "race", "team"],
    colors: "Playful board colors under a neon orange glow.",
    category: "non-tech"
  },
  {
    id: "rc-rush",
    name: "RC Rush",
    tagline: "Control the speed. Rule the track.",
    description: [
      "An exciting time-trial RC car challenge where participants navigate a specially designed obstacle track.",
      "The focus is on driving skill, control, and precision as participants use a common RC car provided by organizers to ensure fair competition."
    ],
    eventHighlights: [
      "Custom obstacle track with jumps and banks",
      "Timed solo runs with penalties for hits",
      "Tuning tips and quick practice laps"
    ],
    keywords: ["rc", "racing", "speed"],
    colors: "Asphalt textures with neon orange track lights.",
    category: "non-tech"
  },
  {
    id: "unbound-creative-carnival",
    name: "Unbound: The Creative Carnival",
    tagline: "Where fun has no limits and creativity has no rules.",
    description: [
      "A creative sanctuary that invites participants to explore art through activities like pottery, quilling, and painting without prior skills or pressure.",
      "The event is designed as a relaxation-focused carnival where teams can rotate through different artistic stations."
    ],
    eventHighlights: [
      "Multiple craft corners: pottery, quilling, painting",
      "Guides to help beginners get started",
      "Showcase area for finished creations"
    ],
    keywords: ["art", "craft", "creative"],
    colors: "Warm studio tones with neon orange highlights on tools.",
    category: "non-tech"
  },
  {
    id: "box-cricket",
    name: "Box Cricket",
    tagline: "Fast games. Fierce rivalries.",
    description: [
      "A fast-paced and compact version of traditional cricket played in a small enclosed 'box' area.",
      "Designed for maximum excitement, the format emphasizes speed, strategy, and teamwork in a high-energy arena."
    ],
    eventHighlights: [
      "Enclosed pitch with boundary rules",
      "Short innings for rapid brackets",
      "Focus on power hitting and sharp fielding"
    ],
    keywords: ["cricket", "fast", "tournament"],
    colors: "Indoor court palette lit with neon orange seam lines.",
    category: "non-tech"
  },
  {
    id: "stranger-things-upside-down-quest",
    name: "Stranger Things: The Upside-Down Quest",
    tagline: "The gate is open. Will your team escape?",
    description: [
      "A theme-based treasure hunt and elimination event inspired by the 'Stranger Things' universe.",
      "Teams must decode clues and survive progressive challenges across campus locations reimagined as the Upside Down."
    ],
    eventHighlights: [
      "Story-led clues across multiple locations",
      "Puzzle locks and code breaking",
      "Race against time to seal the gate"
    ],
    keywords: ["treasure", "puzzle", "stranger-things"],
    colors: "Neon orange rift effects over dark Hawkins-inspired maps.",
    category: "non-tech"
  },
  {
    id: "pickleball",
    name: "Pickleball Showdown",
    tagline: "Fast hands, smart shots, pure fun!",
    description: [
      "Pickleball Showdown is a fast-paced paddle sport that blends elements of tennis, badminton, and table tennis into one exciting game.",
      "Played on a compact court with quick rallies and sharp reflexes, the event emphasizes strategy, communication, and precision over raw power."
    ],
    eventHighlights: [
      "Compact court with bold boundary lines",
      "Rapid volleys and tactical dinks at the net",
      "Short, competitive matches for high-energy brackets"
    ],
    keywords: ["sports", "racket", "team", "strategy"],
    colors: "Clean court blues and greens with neon yellow highlights.",
    category: "non-tech",
    rules: {
      singles: {
        title: "SINGLES PICKLEBALL RULES",
        sections: [
          {
            number: "1",
            title: "Match Format:",
            items: [
              {
                subtitle: "Scoring System:",
                points: [
                  "Games are played to 11 points, and a player must win by 2 points.",
                  "Only the server can score points."
                ]
              }
            ]
          },
          {
            number: "2",
            title: "Serve Rotation & Rules",
            items: [
              {
                subtitle: "Serving Rules:",
                points: [
                  "Serve must be underhand with the paddle.",
                  "The ball must be served diagonally to the opponent's service area.",
                  "The serve must clear the non-volley zone (kitchen)."
                ]
              },
              {
                subtitle: "Rotation:",
                points: [
                  "Serve starts from the right-hand side when the score is even and the left-hand side when odd.",
                  "The server continues serving until they commit a fault, then the opponent gets to serve."
                ]
              }
            ]
          },
          {
            number: "3",
            title: "Court Rules & Gameplay",
            items: [
              {
                subtitle: "Double-Bounce Rule:",
                points: [
                  "After the serve, each side must let the ball bounce once before hitting it."
                ]
              },
              {
                subtitle: "Non-Volley Zone (Kitchen) Rule:",
                points: [
                  "Players cannot hit the ball out of the air while standing inside the kitchen."
                ]
              },
              {
                subtitle: "Out of Bounds:",
                points: [
                  "If the ball lands outside the court lines, it is out, and the other player earns the point."
                ]
              }
            ]
          },
          {
            number: "4",
            title: "Other Rules:",
            items: [
              {
                subtitle: "Faults:",
                points: [
                  "The serve is out of bounds, touches the kitchen, or doesn't clear the net.",
                  "Volleying from the kitchen.",
                  "Failing to follow the double-bounce rule."
                ]
              },
              {
                subtitle: "Timeouts:",
                points: [
                  "Each player is allowed 1 timeout (60 seconds) per game."
                ]
              },
              {
                subtitle: "Fair Play:",
                points: [
                  "Line calls are made in good faith using the honor system."
                ]
              }
            ]
          }
        ]
      },
      doubles: {
        title: "DOUBLES PICKLEBALL RULES",
        sections: [
          {
            number: "1",
            title: "Match Format:",
            items: [
              {
                subtitle: "Scoring System:",
                points: [
                  "Games are played to 11 points, and a player must win by 2 points.",
                  "Only the server can score points."
                ]
              }
            ]
          },
          {
            number: "2",
            title: "Serve Rotation & Rules",
            items: [
              {
                subtitle: "Serving Rules:",
                points: [
                  "Serve must be underhand with the paddle.",
                  "The ball must be served diagonally to the opponent's service area.",
                  "The serve must clear the non-volley zone (kitchen)."
                ]
              },
              {
                subtitle: "Rotation:",
                points: [
                  "Both teammates get to serve before the serve rotates to the other team.",
                  "Each player serves once, alternating every 2 points.",
                  "At the start of the game, only one player from the first-serving team serves before a side-out occurs."
                ]
              }
            ]
          },
          {
            number: "3",
            title: "Court Rules & Gameplay",
            items: [
              {
                subtitle: "Double-Bounce Rule:",
                points: [
                  "After the serve, each side must let the ball bounce once before hitting it."
                ]
              },
              {
                subtitle: "Non-Volley Zone (Kitchen) Rule:",
                points: [
                  "Players cannot hit the ball out of the air while standing inside the kitchen."
                ]
              },
              {
                subtitle: "Positioning:",
                points: [
                  "Players must stick to their starting positions and switch sides only after a point is scored."
                ]
              }
            ]
          },
          {
            number: "4",
            title: "Other Rules:",
            items: [
              {
                subtitle: "Faults:",
                points: [
                  "The serve is out of bounds, touches the kitchen, or doesn't clear the net.",
                  "Volleying from the kitchen.",
                  "Failing to follow the double-bounce rule."
                ]
              },
              {
                subtitle: "Timeouts:",
                points: [
                  "Each player is allowed 1 timeout (60 seconds) per game."
                ]
              },
              {
                subtitle: "Fair Play:",
                points: [
                  "Line calls are made in good faith using the honor system."
                ]
              }
            ]
          }
        ]
      }
    }
  }
];

const workshopEvents = [
  {
    id: "open-r-ssip-innovation-showcase",
    name: "OPEN-R: SSIP Innovation Showcase",
    tagline: "Solve real rural problems with bold prototypes.",
    description: [
      "A challenge for students to tackle rural problems using engineering solutions, pitching ideas and prototypes for impact."
    ],
    eventHighlights: [
      "Identify rural pain points and propose solutions",
      "Build quick prototypes to demonstrate feasibility",
      "Pitch to mentors for feedback and refinement"
    ],
    keywords: ["innovation", "prototype", "ssip"],
    colors: "Clean workshop whites with neon green accent lines.",
    category: "workshops"
  },
  {
    id: "music-workshop-enlive",
    name: "Workshop for Music by Enlive",
    tagline: "Sing it. Play it. Feel it.",
    description: [
      "A hands-on music experience to explore instruments, rhythm basics, posture, and coordination through practical sessions."
    ],
    eventHighlights: [
      "Instrument discovery across multiple stations",
      "Rhythm, posture, and coordination fundamentals",
      "Guided mini-sessions to pick your learning path"
    ],
    keywords: ["music", "rhythm", "hands-on"],
    colors: "Studio blacks with neon green equalizer bars.",
    category: "workshops"
  }
];

const $$Events = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Events - Prakarsh '26" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "UnifiedEventsPage", UnifiedEventsPage, { "client:load": true, "technicalEvents": technicalEvents, "nonTechnicalEvents": nonTechnicalEvents, "workshopEvents": workshopEvents, "client:component-hydration": "load", "client:component-path": "D:/astro-js/one-sprite-sheet-all-images/src/components/UnifiedEventsPage", "client:component-export": "default" })} ` })}`;
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
