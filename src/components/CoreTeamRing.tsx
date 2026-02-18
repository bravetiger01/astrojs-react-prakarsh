import { memo, useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  nickname?: string;
  image: string;
}

interface CoreTeamRingProps {
  members: TeamMember[];
}

const C = {
  cardBg: "#1A0E2E",
  cardBgLight: "#2D1B4E",
  purple: "#6B3FA0",
  pink: "#E84FAA",
  blue: "#4A90D9",
  cyan: "#6CB4EE",
  gold: "#D4A574",
  peach: "#F1B5A2",
  white: "#FFFFFF",
} as const;

const RingCard = memo(function RingCard({
  member,
  index,
  isActive,
}: {
  member: TeamMember;
  index: number;
  isActive: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="w-full h-full relative select-none"
      style={{ backfaceVisibility: "hidden" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute -inset-[2px] rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: hovered || isActive ? 0.45 : 0,
          background: `linear-gradient(135deg, ${C.pink}, ${C.blue}, ${C.purple})`,
          filter: "blur(4px)",
        }}
      />

      <div
        className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: `linear-gradient(180deg, ${C.cardBgLight} 0%, ${C.cardBg} 100%)`,
          border: `1.5px solid ${hovered || isActive ? `${C.pink}90` : `${C.purple}50`}`,
          transition: "border-color 0.4s ease, transform 0.35s ease",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          boxShadow: hovered
            ? `0 0 20px -12px ${C.pink}50, 0 6px 20px -8px rgba(0,0,0,0.45)`
            : `0 3px 16px -10px rgba(0,0,0,0.55)`,
        }}
      >
        <div className="flex justify-center pt-3 pb-2 relative z-10">
          <div
            className="px-4 py-1 rounded-full text-[9px] font-bold tracking-[0.2em] uppercase"
            style={{
              background: `linear-gradient(135deg, ${C.blue}DD, ${C.purple}DD)`,
              color: C.white,
              boxShadow: `0 2px 10px ${C.blue}40`,
              transition: "box-shadow 0.3s ease",
              ...(hovered ? { boxShadow: `0 2px 18px ${C.blue}70` } : {}),
            }}
          >
            PRAKARSH '26
          </div>
        </div>

        <div
          className="relative mx-3 flex-1 min-h-0"
          style={{ maxHeight: "55%" }}
        >
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: `linear-gradient(160deg, ${C.pink}80, ${C.blue}80, ${C.purple}80)`,
              padding: "2px",
            }}
          >
            <div
              className="w-full h-full rounded-xl overflow-hidden relative"
              style={{ background: C.cardBg }}
            >
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  style={{
                    transition: reduceMotion ? "none" : "transform 0.5s ease",
                    transform:
                      hovered && !reduceMotion ? "scale(1.02)" : "scale(1)",
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, ${C.purple}60 0%, ${C.cardBg} 70%)`,
                    }}
                  />
                  <div
                    className="relative text-7xl font-bold select-none"
                    style={{
                      color: `${C.purple}40`,
                      transition: "color 0.4s ease",
                      ...(hovered ? { color: `${C.pink}50` } : {}),
                    }}
                  >
                    {member.name.charAt(0)}
                  </div>
                </div>
              )}

              {!reduceMotion && (hovered || isActive) && (
                <motion.div
                  className="absolute left-0 right-0 h-[1px] pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${C.pink}80, ${C.cyan}80, transparent)`,
                  }}
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="px-3.5 pt-2.5 pb-2 flex flex-col gap-1 relative z-10">
          <h3
            className="text-base md:text-lg font-extrabold tracking-[0.06em] uppercase leading-tight"
            style={{ color: C.white }}
          >
            {member.name}
          </h3>

          <div className="flex items-center gap-1.5">
            <span
              className="text-[11px] md:text-xs font-semibold tracking-[0.1em] uppercase leading-tight"
              style={{ color: `${C.white}80` }}
            >
              {member.role}
            </span>
          </div>

          {member.nickname && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="text-[10px] md:text-[11px] font-semibold tracking-[0.1em] uppercase"
                style={{ color: `${C.cyan}CC` }}
              >
                {member.nickname}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
RingCard.displayName = "RingCard";

export default function CoreTeamRing({ members }: CoreTeamRingProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumRaf = useRef<number | null>(null);
  const autoScrollRaf = useRef<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [grabbing, setGrabbing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const reduceMotion = useReducedMotion();

  // Create infinite loop by tripling the array
  const infiniteMembers = [...members, ...members, ...members];

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    
    // For infinite scroll, always show arrows
    setCanScrollLeft(true);
    setCanScrollRight(true);
    
    // Handle infinite loop - reset position when reaching boundaries
    const cardWidth = 280 + 12; // card width + gap
    const singleSetWidth = members.length * cardWidth;
    
    // If scrolled past second set, jump back to first set
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft = singleSetWidth;
    }
    // If scrolled before first set, jump to second set
    else if (el.scrollLeft <= 0) {
      el.scrollLeft = singleSetWidth;
    }
  }, [members.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    
    // Initialize scroll position to middle set
    const cardWidth = 280 + 12;
    const singleSetWidth = members.length * cardWidth;
    el.scrollLeft = singleSetWidth;
    
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, members.length]);

  const stopMomentum = useCallback(() => {
    if (momentumRaf.current !== null) {
      cancelAnimationFrame(momentumRaf.current);
      momentumRaf.current = null;
    }
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRaf.current !== null) {
      cancelAnimationFrame(autoScrollRaf.current);
      autoScrollRaf.current = null;
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduceMotion) return;

    if (isHovering && !isDragging.current) {
      const autoScroll = () => {
        if (!isDragging.current && isHovering) {
          el.scrollLeft += 0.5;
          autoScrollRaf.current = requestAnimationFrame(autoScroll);
        }
      };
      autoScrollRaf.current = requestAnimationFrame(autoScroll);
    } else {
      stopAutoScroll();
    }

    return () => stopAutoScroll();
  }, [isHovering, reduceMotion, stopAutoScroll]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      stopMomentum();
      stopAutoScroll();
      isDragging.current = true;
      startX.current = e.clientX;
      scrollStart.current = trackRef.current?.scrollLeft ?? 0;
      velocity.current = 0;
      lastX.current = e.clientX;
      lastTime.current = performance.now();
      setGrabbing(true);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [stopMomentum, stopAutoScroll],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const dx = e.clientX - startX.current;
    trackRef.current.scrollLeft = scrollStart.current - dx;

    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (e.clientX - lastX.current) / dt;
    }
    lastX.current = e.clientX;
    lastTime.current = now;
  }, []);

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setGrabbing(false);

    const el = trackRef.current;
    if (!el) return;
    let v = velocity.current * 1000;
    const friction = 0.95;

    const step = () => {
      if (Math.abs(v) < 0.5) return;
      el.scrollLeft -= v * 0.016;
      v *= friction;
      momentumRaf.current = requestAnimationFrame(step);
    };
    momentumRaf.current = requestAnimationFrame(step);
  }, []);

  const scrollBy = useCallback((direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let touchStartX = 0;
    let touchScrollStart = 0;

    const onTouchStart = (e: TouchEvent) => {
      stopMomentum();
      touchStartX = e.touches[0].clientX;
      touchScrollStart = el.scrollLeft;
    };

    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX;
      el.scrollLeft = touchScrollStart - dx;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [stopMomentum]);

  useEffect(() => {
    return () => {
      stopMomentum();
      stopAutoScroll();
    };
  }, [stopMomentum, stopAutoScroll]);

  return (
    <div className="relative w-full">
      {canScrollLeft && (
        <div
          className="absolute left-0 top-0 bottom-0 z-10 flex items-center"
          style={{ width: "60px" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to right, #1a0f2eEE 0%, transparent 100%)`,
            }}
          />
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="relative z-10 ml-2 inline-flex items-center justify-center w-9 h-9 rounded-full text-lg transition-all duration-300"
            style={{
              border: `1px solid ${C.pink}60`,
              color: C.peach,
              background: `${C.purple}40`,
              backdropFilter: "blur(8px)",
            }}
            aria-label="Scroll left"
          >
            ‹
          </button>
        </div>
      )}

      {canScrollRight && (
        <div
          className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-end"
          style={{ width: "60px" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to left, #1a0f2eEE 0%, transparent 100%)`,
            }}
          />
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="relative z-10 mr-2 inline-flex items-center justify-center w-9 h-9 rounded-full text-lg transition-all duration-300"
            style={{
              border: `1px solid ${C.pink}60`,
              color: C.peach,
              background: `${C.purple}40`,
              backdropFilter: "blur(8px)",
            }}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      )}

      <div
        ref={trackRef}
        className="core-carousel-track flex gap-3 overflow-x-auto pb-4"
        style={{
          cursor: grabbing ? "grabbing" : "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          paddingLeft: "16px",
          paddingRight: "16px",
          scrollSnapType: isHovering ? "none" : "x proximity",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <style>{`
          .core-carousel-track {
            scroll-padding-left: calc(50% - 140px);
            scroll-padding-right: calc(50% - 140px);
          }
          .core-carousel-track::-webkit-scrollbar { display: none; }
        `}</style>
        {infiniteMembers.map((member, i) => (
          <div
            key={`${member.id}-${i}`}
            className="flex-shrink-0"
            style={{
              width: "280px",
              height: "420px",
              scrollSnapAlign: "center",
              scrollSnapStop: "always",
            }}
          >
            <RingCard member={member} index={i} isActive={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
