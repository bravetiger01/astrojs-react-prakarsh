import { memo, useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface TeamRingProps {
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
  statsBg: "#140B24",
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
        <div className="px-3.5 pt-2 pb-1 relative z-10">
          <div
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-center"
            style={{ color: C.gold }}
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
                  className="absolute inset-0 w-full h-full object-contain"
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
                    className="absolute w-24 h-24 rounded-full opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${C.pink}, ${C.blue})`,
                      top: "15%",
                      left: "10%",
                      transition: "transform 0.5s ease",
                      transform: hovered
                        ? "translate(5px, -5px) scale(1.1)"
                        : "translate(0, 0)",
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

        <div className="px-3.5 pt-2.5 pb-1.5 flex flex-col gap-0.5 relative z-10">
          <div
            className="text-[9px] font-semibold tracking-[0.15em] uppercase"
            style={{ color: C.gold }}
          >
            PRK-{String(index + 1).padStart(3, "0")}
          </div>

          <h3
            className="text-sm font-extrabold tracking-[0.06em] uppercase leading-tight"
            style={{ color: C.white }}
          >
            {member.name}
          </h3>

          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="text-[9px] font-semibold tracking-[0.12em] uppercase"
              style={{ color: `${C.white}80` }}
            >
              {member.role}
            </span>
          </div>
        </div>

        <div
          className="mx-3 mb-3 mt-1.5 rounded-lg px-3 py-2 flex items-center justify-between"
          style={{
            background: C.statsBg,
            border: `1px solid ${C.purple}40`,
          }}
        >
          <div className="flex flex-col">
            <span
              className="text-[7px] tracking-[0.2em] uppercase"
              style={{ color: `${C.white}50` }}
            >
              Sector
            </span>
            <span className="text-xs font-bold" style={{ color: C.white }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div
            className="w-[1px] h-6"
            style={{ background: `${C.purple}50` }}
          />

          <div className="flex flex-col items-end">
            <span
              className="text-[7px] tracking-[0.2em] uppercase"
              style={{ color: `${C.white}50` }}
            >
              Clearance
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: C.pink }}
                />
                <span
                  className="text-[9px] font-bold"
                  style={{ color: C.white }}
                >
                  A
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: C.blue }}
                />
                <span
                  className="text-[9px] font-bold"
                  style={{ color: C.white }}
                >
                  B
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function TeamRing({ members }: TeamRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentRotation = useRef(0);
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const animationRef = useRef<number>();
  const rafRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const numItems = members.length;
  const anglePerItem = 360 / numItems;
  const radius = Math.max(400, numItems * 32);

  const getActiveIndex = useCallback(
    (rot: number) => {
      const normalized = ((rot % 360) + 360) % 360;
      const idx = Math.round(normalized / anglePerItem) % numItems;
      return idx;
    },
    [anglePerItem, numItems],
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    if (containerRef.current) containerRef.current.style.cursor = "grabbing";
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }, []);

  const scheduleUpdate = useCallback(
    (nextRotation: number) => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setRotation(nextRotation);
        setActiveIndex(getActiveIndex(nextRotation));
      });
    },
    [getActiveIndex],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - startX.current;
      const newRotation = currentRotation.current - dx * 0.3;
      startX.current = e.clientX;
      currentRotation.current = newRotation;
      scheduleUpdate(newRotation);
    },
    [scheduleUpdate],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = "grab";
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const snapAngle =
      Math.round(currentRotation.current / anglePerItem) * anglePerItem;
    const startRot = currentRotation.current;
    const diff = snapAngle - startRot;
    const duration = 400;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const newRot = startRot + diff * eased;
      setRotation(newRot);
      currentRotation.current = newRot;
      setActiveIndex(getActiveIndex(newRot));
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animationRef.current = requestAnimationFrame(animate);
  }, [anglePerItem, getActiveIndex]);

  const animateToRotation = useCallback(
    (targetRotation: number) => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      if (reduceMotion) {
        setRotation(targetRotation);
        currentRotation.current = targetRotation;
        setActiveIndex(getActiveIndex(targetRotation));
        return;
      }

      const startRot = currentRotation.current;
      const diff = targetRotation - startRot;
      const duration = 280;
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const newRot = startRot + diff * eased;
        setRotation(newRot);
        currentRotation.current = newRot;
        setActiveIndex(getActiveIndex(newRot));
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      animationRef.current = requestAnimationFrame(animate);
    },
    [getActiveIndex, reduceMotion],
  );

  const stepRotation = useCallback(
    (direction: -1 | 1) => {
      const targetRotation = currentRotation.current + direction * anglePerItem;
      animateToRotation(targetRotation);
    },
    [anglePerItem, animateToRotation],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startX.current = e.touches[0].clientX;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const dx = e.touches[0].clientX - startX.current;
      const newRotation = currentRotation.current - dx * 0.3;
      setRotation(newRotation);
      setActiveIndex(getActiveIndex(newRotation));
      startX.current = e.touches[0].clientX;
      currentRotation.current = newRotation;
    };

    const onTouchEnd = () => {
      handlePointerUp();
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [getActiveIndex, handlePointerUp]);

  const activeMember = members[activeIndex] || members[0];

  return (
    <div className="relative w-full flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMember.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8 min-h-[80px]"
        >
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full"
              style={{
                border: `1px solid ${C.pink}50`,
                color: C.peach,
              }}
              onClick={() => stepRotation(-1)}
              aria-label="Previous member"
            >
              ‹
            </button>
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-[0.08em] uppercase"
              style={{
                background: `linear-gradient(135deg, ${C.white}, ${C.peach})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {activeMember.name}
            </h2>
            <button
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full"
              style={{
                border: `1px solid ${C.pink}50`,
                color: C.peach,
              }}
              onClick={() => stepRotation(1)}
              aria-label="Next member"
            >
              ›
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div
        ref={containerRef}
        className="relative w-full select-none"
        style={{
          height: "440px",
          perspective: "1200px",
          cursor: "grab",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: "240px",
            height: "360px",
            transform: `translate(-50%, -50%) rotateY(${-rotation}deg)`,
            transformStyle: "preserve-3d",
            transition: isDragging.current || reduceMotion ? "none" : undefined,
            willChange: "transform",
          }}
        >
          {members.map((member, i) => {
            const angle = i * anglePerItem;
            return (
              <div
                key={member.id}
                className="absolute inset-0"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <RingCard
                  member={member}
                  index={i}
                  isActive={i === activeIndex}
                />
              </div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-6 flex items-center gap-3"
      >
        <div
          className="h-px w-12"
          style={{
            background: `linear-gradient(90deg, transparent, ${C.pink}50)`,
          }}
        />
        <span
          className="text-[10px] font-semibold tracking-[0.3em] uppercase"
          style={{ color: `${C.peach}60` }}
        >
          Drag to rotate
        </span>
        <div
          className="h-px w-12"
          style={{
            background: `linear-gradient(90deg, ${C.pink}50, transparent)`,
          }}
        />
      </motion.div>
    </div>
  );
}
