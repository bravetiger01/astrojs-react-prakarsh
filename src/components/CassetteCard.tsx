

import { memo } from "react";
import { motion } from "framer-motion";

import type { Event } from "@/data/event-types";
import InteractiveTilt from "./InteractiveTilt";

interface CassetteCardProps {
  event: Event;
  index: number;
  totalEvents?: number;
}

const COLORS = {
  white: "#FFFFFF",
  peach: "#F1B5A2",
  accent: "#3C2A56",
} as const;

// Wireframe globe icon
function GlobeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="18" stroke={COLORS.peach} strokeWidth="1.5" />
      <ellipse
        cx="20"
        cy="20"
        rx="8"
        ry="18"
        stroke={COLORS.peach}
        strokeWidth="1"
      />
      <line
        x1="2"
        y1="20"
        x2="38"
        y2="20"
        stroke={COLORS.peach}
        strokeWidth="1"
      />
      <line
        x1="20"
        y1="2"
        x2="20"
        y2="38"
        stroke={COLORS.peach}
        strokeWidth="1"
      />
      <ellipse
        cx="20"
        cy="12"
        rx="14"
        ry="5"
        stroke={`${COLORS.peach}60`}
        strokeWidth="0.75"
      />
      <ellipse
        cx="20"
        cy="28"
        rx="14"
        ry="5"
        stroke={`${COLORS.peach}60`}
        strokeWidth="0.75"
      />
    </svg>
  );
}

// Asterisk/star burst shape - optimized
const StarBurst = memo(function StarBurst() {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      whileInView={{ rotate: 360 }}
      viewport={{ once: false }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="relative w-8 h-8"
    >
      {[0, 45, 90, 135].map((deg) => (
        <div
          key={deg}
          className="absolute top-1/2 left-1/2 w-full h-[2px]"
          style={{
            background: COLORS.peach,
            transform: `translate(-50%, -50%) rotate(${deg}deg)`,
          }}
        />
      ))}
    </motion.div>
  );
});

// Dot matrix pattern - optimized with viewport detection
const DotMatrix = memo(function DotMatrix({ count = 1 }: { count?: number }) {
  const cols = Math.min(count, 6);
  return (
    <div
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${cols}, 4px)` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 h-1 rounded-full"
          style={{
            background: i % 2 === 0 ? COLORS.peach : `${COLORS.white}40`,
          }}
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: [0.3, 1, 0.3] }}
          viewport={{ once: false }}
          transition={{ duration: 2, delay: i * 0.05, repeat: Infinity }}
        />
      ))}
    </div>
  );
});

// Animated scan line - only animate when in view
const ScanLine = memo(function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[1px] pointer-events-none"
      style={{
        background: `linear-gradient(90deg, transparent, ${COLORS.peach}60, transparent)`,
      }}
      initial={{ top: 0, opacity: 0 }}
      whileInView={{ top: "100%", opacity: [0, 1, 1, 0] }}
      viewport={{ once: false }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  );
});

const CassetteCardComponent = function CassetteCard({
  event,
  index,
  totalEvents = 26,
}: CassetteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="h-full"
    >
      <a href={`/event/${event.id}`} className="block h-full">
        <InteractiveTilt accentVar="--neon-orange" className="group h-full">
          <motion.div
            whileTap={{ scale: 0.985 }}
            className="relative h-full flex flex-col"
          >
            {/* Main card container */}
            <div
              className="relative flex flex-col h-full overflow-hidden"
              style={{
                boxShadow: `0 0 0 1px ${COLORS.peach}, 0 0 40px -15px ${COLORS.peach}50`,
                background: COLORS.accent,
                minHeight: "400px",
              }}
            >
              <ScanLine />

              {/* Top section - Title area */}
              <div className="relative p-4 pb-3 flex-shrink-0">
                {/* Top row - Globe and numbers */}
                <div className="flex items-start justify-between mb-3">
                  <div />
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileInView={{ rotate: 360 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <GlobeIcon />
                    </motion.div>
                    <div className="text-right">
                      <div
                        className="font-display text-2xl font-black tracking-tight"
                        style={{ color: COLORS.white }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div
                        className="font-display text-xs tracking-[0.2em]"
                        style={{ color: `${COLORS.white}60` }}
                      >
                        /{totalEvents.toString().padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main title - Large stacked text - LIMITED to 2 lines */}
                <div className="mb-2">
                  <div
                    className="font-display text-2xl md:text-2xl font-black tracking-tight leading-[0.9] uppercase line-clamp-2"
                    style={{ color: COLORS.white }}
                  >
                    {event.name}
                  </div>
                </div>

                {/* Wave label with decorative line */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-display text-[10px] tracking-[0.3em] uppercase"
                    style={{ color: `${COLORS.white}70` }}
                  >
                    Event {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 flex items-center gap-1">
                    <div
                      className="flex-1 h-[1px]"
                      style={{ background: `${COLORS.white}30` }}
                    />
                    <div
                      className="w-2 h-2 rotate-45"
                      style={{ border: `1px solid ${COLORS.peach}` }}
                    />
                    <div
                      className="flex-1 h-[1px]"
                      style={{ background: `${COLORS.white}30` }}
                    />
                  </div>
                </div>

                {/* Dot matrix on right edge */}
                <div className="absolute top-4 right-4">
                  <DotMatrix count={index + 1} />
                </div>
              </div>

              {/* Middle section - Pills and indicators */}
              <div className="px-4 py-3 flex items-center gap-2 flex-wrap flex-shrink-0">
                {/* ID pill */}
                <div
                  className="px-3 py-1 font-display text-[10px] tracking-[0.2em]"
                  style={{
                    background: COLORS.accent,
                    border: `1px solid ${COLORS.peach}`,
                    color: COLORS.peach,
                  }}
                >
                  PKR{String(index + 26).slice(-2)}
                </div>

                {/* Orange accent pills */}
                <div
                  className="px-3 py-1 font-display text-[10px] tracking-[0.15em] font-bold"
                  style={{
                    background: COLORS.peach,
                    color: COLORS.accent,
                    clipPath:
                      "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
                  }}
                >
                  OP{String((index + 1) * 7).padStart(2, "0")}
                </div>

                <div
                  className="px-3 py-1 font-display text-[10px] tracking-[0.15em] font-bold"
                  style={{
                    background: COLORS.peach,
                    color: COLORS.accent,
                    clipPath:
                      "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
                  }}
                >
                  EV#{String(index + 1).padStart(2, "0")}
                </div>

                {/* Arrow indicator */}
                <div
                  className="ml-auto flex items-center justify-center w-8 h-8"
                  style={{
                    background: COLORS.peach,
                    clipPath:
                      "polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke={COLORS.accent}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Star burst */}
                <StarBurst />
              </div>

              {/* Bottom section - Info bar */}
              <div
                className="px-4 py-3 mt-auto flex-shrink-0"
                style={{ borderTop: `1px solid ${COLORS.peach}40` }}
              >
                <div className="flex items-end justify-between gap-4">
                  {/* Left side - Tags */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2">
                      {(event.keywords && event.keywords.length > 0
                        ? event.keywords
                        : [event.category]
                      ).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider"
                          style={{
                            background: COLORS.peach,
                            color: COLORS.accent,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right side - Vertical text */}
                  <div
                    className="text-[8px] font-display tracking-[0.35em] uppercase flex-shrink-0"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      color: `${COLORS.white}50`,
                      height: "60px",
                    }}
                  >
                    Prakarsh 2026
                  </div>
                </div>
              </div>

              {/* Footer strip - Barcode style */}
              <div
                className="px-4 py-2 flex items-center justify-between flex-shrink-0"
                style={{ background: `${COLORS.peach}15` }}
              >
                {/* Mini barcode */}
                <div className="flex gap-[1px]">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-4"
                      style={{
                        width: i % 3 === 0 ? "2px" : "1px",
                        background:
                          i % 4 === 0 ? COLORS.peach : `${COLORS.white}60`,
                      }}
                    />
                  ))}
                </div>

                {/* Year badge */}
                <div
                  className="px-2 py-1 font-display text-[10px] tracking-[0.2em] font-bold"
                  style={{
                    background: COLORS.peach,
                    color: COLORS.accent,
                  }}
                >
                  2026
                </div>

                {/* Sound wave decoration */}
                <div className="flex items-center gap-[2px]">
                  {[3, 6, 4, 8, 5, 7, 3, 5, 4].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-[2px]"
                      style={{ background: COLORS.peach }}
                      initial={{ height: h }}
                      whileInView={{ height: [h, h + 4, h] }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.peach}08, transparent 50%, ${COLORS.peach}05)`,
                }}
              />

              {/* Corner notches */}
              <div
                className="absolute top-0 left-0 w-4 h-4"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.accent} 50%, transparent 50%)`,
                  boxShadow: `inset -1px -1px 0 ${COLORS.peach}`,
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-4 h-4"
                style={{
                  background: `linear-gradient(-45deg, ${COLORS.accent} 50%, transparent 50%)`,
                  boxShadow: `inset 1px 1px 0 ${COLORS.peach}`,
                }}
              />
            </div>
          </motion.div>
        </InteractiveTilt>
      </a>
    </motion.div>
  );
};

export default memo(CassetteCardComponent);
