import { motion } from "framer-motion";

import type { Event } from "@/data/event-types";
import InteractiveTilt from "./InteractiveTilt";

interface EventIdCardProps {
  event: Event;
  index: number;
}

const techAccentVar = "--tech-accent" as const;

function ChunkyQr() {
  // QR-ish decorative blocks (pure CSS, no images)
  return (
    <div
      aria-hidden
      className="grid h-16 w-16 grid-cols-7 gap-[2px] p-[2px]"
      style={{
        clipPath:
          "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
        border: "1px solid #3C2A56",
        background: "#FFFFFF",
      }}
    >
      {Array.from({ length: 49 }).map((_, i) => (
        <div
          // deterministic pattern
          key={i}
          className=""
          style={{
            background:
              i % 7 === 0 ||
              i % 7 === 6 ||
              Math.floor(i / 7) % 7 === 0 ||
              Math.floor(i / 7) % 7 === 6 ||
              i % 11 === 0
                ? "#3C2A56"
                : "#F1B5A2",
          }}
        />
      ))}
    </div>
  );
}

export default function TechEventCard({ event, index }: EventIdCardProps) {
  const accentVar = techAccentVar;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <a href={`/event/${event.id}`} className="block h-full">
        <InteractiveTilt accentVar={accentVar} className="group h-full">
          <motion.div
            whileTap={{ scale: 0.985 }}
            className="relative h-full"
            style={{
              ["--event-accent" as never]: `var(${accentVar})`,
              ["--tech-accent" as never]: "0 0% 100%",
            }}
          >
            {/* Transparent base: only frame + floating panels */}
            <div
              className="relative h-full overflow-hidden"
              style={{
                clipPath:
                  "polygon(30px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 40px), calc(100% - 40px) 100%, 22px 100%, 0 calc(100% - 22px), 0 30px)",
                boxShadow: "0 0 0 1px #3C2A56",
                background: "#FFFFFF",
              }}
            >
              {/* Inner frame line */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[10px]"
                style={{
                  clipPath:
                    "polygon(22px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 28px), calc(100% - 28px) 100%, 16px 100%, 0 calc(100% - 16px), 0 22px)",
                  boxShadow: "0 0 0 1px #3C2A56",
                }}
              />

              {/* Ambient glow (keeps center transparent) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "transparent",
                }}
              />

              {/* Content grid */}
              <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto] gap-4 p-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <ChunkyQr />
                    <div
                      className="h-16 w-12"
                      style={{
                        clipPath:
                          "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                        border: "1px solid #3C2A56",
                        background: "#F1B5A2",
                      }}
                    />
                  </div>

                  <div className="text-right">
                    <div
                      className="text-[10px] font-display tracking-[0.3em]"
                      style={{ color: "#3C2A56" }}
                    >
                      ID NUMBER
                    </div>
                    <div
                      className="mt-1 font-display text-xs font-black tracking-[0.22em]"
                      style={{ color: "#3C2A56" }}
                    >
                      PKR-{String(1000 + index * 7)}
                    </div>
                  </div>
                </div>

                {/* Portrait window (transparent base, floating glass panel) */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    clipPath:
                      "polygon(22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px), 0 22px)",
                    border: "1px solid #3C2A56",
                    background: "#F1B5A2",
                    boxShadow: "none",
                  }}
                >
                  <div className="absolute inset-0 hex-grid opacity-0 mix-blend-screen" />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0"
                    style={{
                      background: "transparent",
                    }}
                  />
                  {/* diagonal highlight */}
                  <div
                    aria-hidden
                    className="absolute -left-24 top-10 h-16 w-[140%] rotate-[-14deg]"
                    style={{
                      background: "transparent",
                    }}
                  />

                  <div className="relative z-10 flex h-full min-h-[240px] items-end justify-between p-4">
                    <div>
                      <div
                        className="text-[10px] font-display tracking-[0.3em]"
                        style={{ color: "#3C2A56" }}
                      >
                        NAME
                      </div>
                      <div className="mt-1 font-display text-3xl font-black tracking-[0.18em] uppercase text-tech-primary">
                        {event.name}
                      </div>
                      <div
                        className="mt-2 text-[11px]"
                        style={{ color: "#3C2A56" }}
                      >
                        <span className="font-display tracking-[0.22em]">
                          MISSION
                        </span>{" "}
                        <span style={{ color: "#3C2A56" }}>#{event.id}</span>
                      </div>
                    </div>

                    {/* Mark */}
                    <div className="text-right">
                      <div
                        className="inline-flex h-14 w-14 items-center justify-center"
                        style={{
                          clipPath:
                            "polygon(18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px), 0 18px)",
                          border: "1px solid #3C2A56",
                          background: "#FFFFFF",
                        }}
                      >
                        <div
                          className="h-7 w-7"
                          style={{
                            clipPath:
                              "polygon(50% 0, 88% 12%, 100% 50%, 88% 88%, 50% 100%, 12% 88%, 0 50%, 12% 12%)",
                            boxShadow: "0 0 0 2px #3C2A56",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer strip */}
                <div
                  className="relative flex items-center justify-between gap-4 px-4 py-3"
                  style={{
                    clipPath:
                      "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%, 0 20px)",
                    border: "1px solid #3C2A56",
                    background: "#FFFFFF",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-[2px] w-10"
                      style={{
                        background: "#3C2A56",
                      }}
                    />
                    <span
                      className="text-[10px] font-display tracking-[0.35em]"
                      style={{ color: "#3C2A56" }}
                    >
                      PRAKARSH.26
                    </span>
                  </div>
                  <motion.div
                    className="inline-flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100"
                    initial={{ x: -8 }}
                    whileHover={{ x: 0 }}
                  >
                    <span
                      className="text-[10px] font-display tracking-[0.35em]"
                      style={{ color: "#3C2A56" }}
                    >
                      OPEN
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "#3C2A56" }}
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </InteractiveTilt>
      </a>
    </motion.div>
  );
}
