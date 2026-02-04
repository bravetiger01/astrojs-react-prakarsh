import { useEffect, useRef } from "react";

interface Line {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  thickness: number;
  glowing: boolean;
}

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<Line[]>([]);
  const animationRef = useRef<number>();
  const isVisibleRef = useRef(true);
  const colorCacheRef = useRef<Map<string, string>>(new Map());
  const timeRef = useRef(0);
  const sparkleFrameRef = useRef(0);
  const lastLineCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      willReadFrequently: false,
    });
    if (!ctx) return;

    // Cache window dimensions to avoid repeated access
    let cachedWidth = window.innerWidth;
    let cachedHeight = window.innerHeight;

    const resizeCanvas = () => {
      cachedWidth = window.innerWidth;
      cachedHeight = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = cachedWidth * dpr;
      canvas.height = cachedHeight * dpr;
      canvas.style.width = cachedWidth + "px";
      canvas.style.height = cachedHeight + "px";
      ctx.scale(dpr, dpr);
      initLines();
    };

    const initLines = () => {
      // Adaptive line count - fewer on mobile/low-end devices
      const lineCount = Math.max(
        15,
        Math.min(Math.floor(cachedWidth / 8), 150),
      );

      // Only recreate lines if count changed
      if (lastLineCountRef.current !== lineCount) {
        const lines: Line[] = [];
        for (let i = 0; i < lineCount; i++) {
          lines.push(createLine(cachedHeight, true));
        }
        linesRef.current = lines;
        lastLineCountRef.current = lineCount;
      }
    };

    // Helper to get cached color string
    const getCachedColor = (key: string, value: string): string => {
      if (!colorCacheRef.current.has(key)) {
        colorCacheRef.current.set(key, value);
      }
      return colorCacheRef.current.get(key) || value;
    };

    const createLine = (
      canvasHeight: number,
      randomY: boolean = false,
    ): Line => ({
      x: Math.random() * cachedWidth,
      y: randomY ? Math.random() * canvasHeight : -Math.random() * 100,
      length: Math.random() * 60 + 15,
      speed: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.5 + 0.25,
      thickness: Math.random() * 1.2 + 0.4,
      glowing: Math.random() > 0.88,
    });

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Pre-calculate shadow colors
    const glowingShadowColor = `rgba(168, 168, 248, 0.2)`;
    const lineColor = `rgba(60, 42, 86`;

    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      timeRef.current += 0.016;

      // Clear canvas
      ctx.fillStyle = getCachedColor("bg", "#fbdacc");
      ctx.fillRect(0, 0, cachedWidth, cachedHeight);

      // Draw lines - batch similar operations
      const lines = linesRef.current;
      const lineCount = lines.length;
      let lastGlowingState = false;

      for (let i = 0; i < lineCount; i++) {
        const line = lines[i];
        line.y += line.speed;

        if (line.y - line.length > cachedHeight) {
          lines[i] = createLine(cachedHeight);
          continue;
        }

        // Optimize shadow state changes - only update when glowing state changes
        if (line.glowing !== lastGlowingState) {
          if (line.glowing) {
            ctx.shadowColor = glowingShadowColor;
            ctx.shadowBlur = 6;
          } else {
            ctx.shadowBlur = 0;
          }
          lastGlowingState = line.glowing;
        }

        // Draw line
        ctx.beginPath();
        ctx.moveTo(line.x, line.y - line.length);
        ctx.lineTo(line.x, line.y);
        ctx.strokeStyle = `${lineColor}, ${line.opacity})`;
        ctx.lineWidth = line.thickness;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Ensure shadow is off
      ctx.shadowBlur = 0;

      // Draw head dots - batch all dots together with reduced quality
      ctx.fillStyle = `rgba(255, 255, 255, 0.7)`;
      for (let i = 0; i < lineCount; i++) {
        const line = lines[i];
        ctx.globalAlpha = line.opacity;
        ctx.beginPath();
        ctx.arc(line.x, line.y, line.thickness * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Render sparkles less frequently - every 4 frames for better performance
      sparkleFrameRef.current++;
      if (sparkleFrameRef.current > 3) {
        sparkleFrameRef.current = 0;
        ctx.fillStyle = `rgba(255, 103, 213, 0.15)`;
        // Render only 2 sparkles instead of 3
        for (let i = 0; i < 2; i++) {
          const angle = (timeRef.current + i) * 0.5;
          const sparkleX =
            cachedWidth / 2 + Math.cos(angle) * cachedWidth * 0.3;
          const sparkleY =
            cachedHeight / 2 + Math.sin(angle) * cachedHeight * 0.3;
          ctx.beginPath();
          ctx.arc(sparkleX, sparkleY, 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundColor: "#fbdacc" }}
    />
  );
};

export default MatrixRain;
