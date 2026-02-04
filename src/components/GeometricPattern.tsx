import { useEffect, useRef } from "react";

interface Symbol {
  x: number;
  y: number;
  type: string;
  size: number;
  opacity: number;
  color: string;
  phase: number;
}

interface GeometricPatternProps {
  backgroundColor?: string;
  primaryColor?: string;
  accentColors?: string[];
  opacity?: number;
}

const SYMBOLS = [
  "circle",
  "x",
  "dot",
  "square",
  "plus",
  "concentric",
  "diamond",
  "target",
];

// Default color set
const DEFAULT_COLORS = [
  "123, 123, 248", // #7B7BF8 - lavender
  "255, 103, 213", // #FF67D5 - pink
  "201, 201, 255", // #C9C9FF - light lavender
];

const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : hex;
};

const GeometricPattern = ({
  backgroundColor = "#fbdacc",
  primaryColor = "#7B7BF8",
  accentColors = ["#7B7BF8", "#FF67D5", "#C9C9FF"],
  opacity = 1,
}: GeometricPatternProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const symbolsRef = useRef<Symbol[]>([]);
  const blocksRef = useRef<
    {
      x: number;
      y: number;
      w: number;
      h: number;
      opacity: number;
      phase: number;
    }[]
  >([]);
  const animationRef = useRef<number>();
  const isVisibleRef = useRef(true);
  const cachedWidthRef = useRef(0);
  const cachedHeightRef = useRef(0);

  // Convert hex colors to RGB strings for canvas
  const colors = accentColors.map(hexToRgb);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    console.log("GeometricPattern mounted and canvas initialized");

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      cachedWidthRef.current = window.innerWidth;
      cachedHeightRef.current = window.innerHeight;

      canvas.width = cachedWidthRef.current * dpr;
      canvas.height = cachedHeightRef.current * dpr;
      canvas.style.width = cachedWidthRef.current + "px";
      canvas.style.height = cachedHeightRef.current + "px";
      ctx.scale(dpr, dpr);

      initPattern();
    };

    const initPattern = () => {
      const cellSize = 20;
      const cols = Math.ceil(cachedWidthRef.current / cellSize) + 2;
      const rows = Math.ceil(cachedHeightRef.current / cellSize) + 2;

      symbolsRef.current = [];
      blocksRef.current = [];

      // Create random blocks
      const blockCount = Math.floor((cols * rows) / 120);
      for (let i = 0; i < blockCount; i++) {
        blocksRef.current.push({
          x: Math.floor(Math.random() * cols) * cellSize,
          y: Math.floor(Math.random() * rows) * cellSize,
          w: (Math.floor(Math.random() * 6) + 3) * cellSize,
          h: (Math.floor(Math.random() * 6) + 3) * cellSize,
          opacity: (Math.random() * 0.3 + 0.15) * opacity,
          phase: Math.random() * Math.PI * 2,
        });
      }

      // Create symbols grid with varying density
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Skip some cells for organic feel
          if (Math.random() > 0.25) continue;

          // Check if inside a block - reduce density
          const inBlock = blocksRef.current.some(
            (b) =>
              col * cellSize >= b.x &&
              col * cellSize < b.x + b.w &&
              row * cellSize >= b.y &&
              row * cellSize < b.y + b.h,
          );
          if (inBlock && Math.random() > 0.2) continue;

          symbolsRef.current.push({
            x: col * cellSize + cellSize / 2,
            y: row * cellSize + cellSize / 2,
            type: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
            size: Math.random() * 6 + 4,
            opacity: (Math.random() * 0.6 + 0.3) * opacity,
            color: colors[Math.floor(Math.random() * colors.length)],
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const drawSymbol = (
      ctx: CanvasRenderingContext2D,
      symbol: Symbol,
      time: number,
    ) => {
      const { x, y, type, size, opacity, color, phase } = symbol;
      const animatedOpacity =
        opacity * (0.7 + 0.3 * Math.sin(time * 0.5 + phase));

      ctx.strokeStyle = `rgba(${color}, ${animatedOpacity})`;
      ctx.fillStyle = `rgba(${color}, ${animatedOpacity * 0.8})`;
      ctx.lineWidth = 1;

      switch (type) {
        case "circle":
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.stroke();
          break;

        case "dot":
          ctx.beginPath();
          ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
          ctx.fill();
          break;

        case "x":
          ctx.beginPath();
          ctx.moveTo(x - size, y - size);
          ctx.lineTo(x + size, y + size);
          ctx.moveTo(x + size, y - size);
          ctx.lineTo(x - size, y + size);
          ctx.stroke();
          break;

        case "plus":
          ctx.beginPath();
          ctx.moveTo(x, y - size);
          ctx.lineTo(x, y + size);
          ctx.moveTo(x - size, y);
          ctx.lineTo(x + size, y);
          ctx.stroke();
          break;

        case "square":
          ctx.strokeRect(x - size, y - size, size * 2, size * 2);
          break;

        case "concentric":
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, size * 0.2, 0, Math.PI * 2);
          ctx.fill();
          break;

        case "diamond":
          ctx.beginPath();
          ctx.moveTo(x, y - size);
          ctx.lineTo(x + size, y);
          ctx.lineTo(x, y + size);
          ctx.lineTo(x - size, y);
          ctx.closePath();
          ctx.stroke();
          break;

        case "target":
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x - size * 1.3, y);
          ctx.lineTo(x - size * 0.5, y);
          ctx.moveTo(x + size * 0.5, y);
          ctx.lineTo(x + size * 1.3, y);
          ctx.moveTo(x, y - size * 1.3);
          ctx.lineTo(x, y - size * 0.5);
          ctx.moveTo(x, y + size * 0.5);
          ctx.lineTo(x, y + size * 1.3);
          ctx.stroke();
          break;
      }
    };

    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let time = 0;
    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      time += 0.016;
      const width = cachedWidthRef.current;
      const height = cachedHeightRef.current;

      // Clear with background color
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Draw animated blocks with pulsing opacity using primary color
      const blocks = blocksRef.current;
      const blockCount = blocks.length;
      const blockRgb = hexToRgb(primaryColor);
      for (let i = 0; i < blockCount; i++) {
        const block = blocks[i];
        const pulseOpacity =
          block.opacity * (0.6 + 0.4 * Math.sin(time * 0.3 + block.phase));
        ctx.fillStyle = `rgba(${blockRgb}, ${pulseOpacity})`;
        ctx.fillRect(block.x, block.y, block.w, block.h);

        // Add glow border
        ctx.strokeStyle = `rgba(${blockRgb}, ${pulseOpacity * 1.5})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(block.x, block.y, block.w, block.h);
      }

      // Draw symbols - use for loop for better performance
      const symbols = symbolsRef.current;
      const symbolCount = symbols.length;
      for (let i = 0; i < symbolCount; i++) {
        drawSymbol(ctx, symbols[i], time);
      }

      // Add scan line effect using primary color
      const scanY = ((time * 50) % (height + 100)) - 50;
      const scanRgb = hexToRgb(primaryColor);
      const gradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      gradient.addColorStop(0, `rgba(${scanRgb}, 0)`);
      gradient.addColorStop(0.5, `rgba(${scanRgb}, 0.03)`);
      gradient.addColorStop(1, `rgba(${scanRgb}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 30, width, 60);

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
  }, [backgroundColor, primaryColor, accentColors, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundColor }}
    />
  );
};

export default GeometricPattern;
