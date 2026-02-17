import { memo, useState, useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  nickname?: string;
  image: string;
}

interface CoreTeamCarouselProps {
  members: TeamMember[];
}

/* ── Prakarsh poster palette ── */
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

/* ── Individual card ── */
const CarouselCard = memo(function CarouselCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="h-full relative select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-[2px] rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 0.45 : 0,
          background: `linear-gradient(135deg, ${C.pink}, ${C.blue}, ${C.purple})`,
          filter: "blur(4px)",
        }}
      />

      {/* Card body */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: `linear-gradient(180deg, ${C.cardBgLight} 0%, ${C.cardBg} 100%)`,
          border: `1.5px solid ${hovered ? `${C.pink}90` : `${C.purple}50`}`,
          transition: "border-color 0.4s ease, transform 0.35s ease",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          boxShadow: hovered
            ? `0 0 20px -12px ${C.pink}50, 0 6px 20px -8px rgba(0,0,0,0.45)`
            : `0 3px 16px -10px rgba(0,0,0,0.55)`,
        }}
      >
        {/* Top badge */}
        <div className="flex justify-center pt-3 pb-2 relative z-10">
          <div
            className="px-3 py-1 rounded-full text-[8px] font-bold tracking-[0.2em] uppercase"
            style={{
              background: `linear-gradient(135deg, ${C.blue}DD, ${C.purple}DD)`,
              color: C.white,
              boxShadow: `0 2px 10px ${C.blue}40`,
            }}
          >
            PRAKARSH '26
          </div>
        </div>

        {/* Image area */}
        <div
          className="relative mx-2.5 flex-1 min-h-0"
          style={{ maxHeight: "60%" }}
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, ${C.purple}60 0%, ${C.cardBg} 70%)`,
                    }}
                  />
                  <div
                    className="relative text-6xl font-bold select-none"
                    style={{ color: `${C.purple}40` }}
                  >
                    {member.name.charAt(0)}
                  </div>
                </div>
              )}

              {/* Scan line */}
              {!reduceMotion && hovered && (
                <motion.div
                  className="absolute left-0 right-0 h-[1px] pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${C.pink}80, ${C.cyan}80, transparent)`,
                  }}
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="px-3.5 pt-2.5 pb-3 flex flex-col gap-1 relative z-10">
          <h3
            className="text-sm md:text-base font-extrabold tracking-[0.06em] uppercase leading-tight"
            style={{ color: C.white }}
          >
            {member.name}
          </h3>
          <span
            className="text-[10px] md:text-xs font-semibold tracking-[0.08em] uppercase leading-tight"
            style={{ color: `${C.white}80` }}
          >
            {member.role}
          </span>
          {member.nickname && (
            <span
              className="text-[9px] md:text-[10px] font-semibold tracking-[0.1em] uppercase mt-0.5"
              style={{ color: `${C.cyan}CC` }}
            >
              {member.nickname}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
CarouselCard.displayName = "CarouselCard";

/* ── Main draggable carousel ── */
export default function CoreTeamCarousel({ members }: CoreTeamCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumRaf = useRef<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [grabbing, setGrabbing] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Stop momentum
  const stopMomentum = useCallback(() => {
    if (momentumRaf.current !== null) {
      cancelAnimationFrame(momentumRaf.current);
      momentumRaf.current = null;
    }
  }, []);

  // Pointer down — start drag
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      stopMomentum();
      isDragging.current = true;
      startX.current = e.clientX;
      scrollStart.current = trackRef.current?.scrollLeft ?? 0;
      velocity.current = 0;
      lastX.current = e.clientX;
      lastTime.current = performance.now();
      setGrabbing(true);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [stopMomentum],
  );

  // Pointer move — drag scroll
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const dx = e.clientX - startX.current;
    trackRef.current.scrollLeft = scrollStart.current - dx;

    // Track velocity for momentum
    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = (e.clientX - lastX.current) / dt;
    }
    lastX.current = e.clientX;
    lastTime.current = now;
  }, []);

  // Pointer up — release with momentum
  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setGrabbing(false);

    // Apply momentum scrolling
    const el = trackRef.current;
    if (!el) return;
    let v = velocity.current * 1000; // px/sec
    const friction = 0.95;

    const step = () => {
      if (Math.abs(v) < 0.5) return;
      el.scrollLeft -= v * 0.016;
      v *= friction;
      momentumRaf.current = requestAnimationFrame(step);
    };
    momentumRaf.current = requestAnimationFrame(step);
  }, []);

  // Arrow navigation — scroll by one "page"
  const scrollBy = useCallback((direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  }, []);

  // Touch support (mobile)
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

  // Cleanup momentum on unmount
  useEffect(() => () => stopMomentum(), [stopMomentum]);

  return (
    <div className="relative w-full">
      {/* Left fade + arrow */}
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

      {/* Right fade + arrow */}
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

      {/* Scrollable track */}
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
          scrollSnapType: "x mandatory",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Hide scrollbar via inline style */}
        <style>{`
          .core-carousel-track {
            scroll-padding-left: calc(50% - 140px);
            scroll-padding-right: calc(50% - 140px);
          }
          .core-carousel-track::-webkit-scrollbar { display: none; }
        `}</style>
        {members.map((member, i) => (
          <div
            key={member.id}
            className="flex-shrink-0"
            style={{
              width: "280px",
              height: "420px",
              scrollSnapAlign: "center",
              scrollSnapStop: "always",
            }}
          >
            <CarouselCard member={member} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
