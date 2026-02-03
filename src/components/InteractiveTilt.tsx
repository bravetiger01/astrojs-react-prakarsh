import * as React from "react";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

type InteractiveTiltProps = {
  className?: string;
  children: React.ReactNode;
  /** CSS variable name containing HSL channels, e.g. "--neon-cyan" */
  accentVar?:
    | "--neon-cyan"
    | "--neon-pink"
    | "--neon-purple"
    | "--neon-orange"
    | "--neon-green"
    | "--neon-blue"
    | "--neon-red"
    | "--tech-accent";
};

export default function InteractiveTilt({
  className,
  children,
  accentVar = "--neon-cyan",
}: InteractiveTiltProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const transform = useMotionTemplate`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  const shine = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, hsl(var(${accentVar}) / 0.20), transparent 58%)`;

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);

    // tilt intensity
    const tilt = 10;
    rx.set((0.5 - py) * tilt);
    ry.set((px - 0.5) * tilt);
  };

  const onLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn("relative will-change-transform", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: shine }}
      />
      {children}
    </motion.div>
  );
}
