import React, { useEffect, useRef } from 'react';

// ===== ADJUSTABLE GRAIN PARAMETERS =====
// Change these numbers to tweak the effect:
const GRAIN_COUNT = 40;          // Number of grains (fewer = larger feel)
const MIN_SIZE = 1;              // Minimum grain size in pixels
const MAX_SIZE = 4;             // Maximum grain size in pixels
const SPEED = 0.4;               // Movement speed (0 = static, higher = faster)
const OPACITY = 0.2;             // Grain opacity (0-1, 0.1 is subtle)
// =======================================

interface Grain {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
}

const GrainBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainsRef = useRef<Grain[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reinitialize grains when canvas resizes
      initGrains();
    };

    const initGrains = () => {
      const grains: Grain[] = [];
      for (let i = 0; i < GRAIN_COUNT; i++) {
        grains.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
        });
      }
      grainsRef.current = grains;
    };

    const updateGrains = () => {
      const grains = grainsRef.current;
      for (let g of grains) {
        g.x += g.vx;
        g.y += g.vy;

        // Wrap around edges
        if (g.x < 0) g.x = canvas.width;
        if (g.x > canvas.width) g.x = 0;
        if (g.y < 0) g.y = canvas.height;
        if (g.y > canvas.height) g.y = 0;
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grains = grainsRef.current;
      for (let g of grains) {
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${OPACITY})`;
        ctx.fill();
      }

      updateGrains();
      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default GrainBackground;
