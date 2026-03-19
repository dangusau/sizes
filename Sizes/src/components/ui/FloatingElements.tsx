import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// ===== ADJUSTABLE FLOATING ELEMENTS PARAMETERS =====
const ELEMENT_COUNT = 12;          // Number of floating circles
const MIN_SIZE = 40;              // Minimum size in pixels (w-10 = 40px)
const MAX_SIZE = 100;              // Maximum size in pixels (w-20 = 80px)
const MIN_DURATION = 6;           // Minimum animation duration (seconds)
const MAX_DURATION = 12;          // Maximum animation duration (seconds)
const OPACITY = 0.8;              // Opacity of circles
// ===================================================

const FloatingElements = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    size: number;
    initialX: number;
    initialY: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Generate random elements only on client
    const newElements = [];
    for (let i = 0; i < ELEMENT_COUNT; i++) {
      newElements.push({
        id: i,
        size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        duration: MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION),
      });
    }
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute border border-gray-300 rounded-full"
          style={{
            left: `${el.initialX}%`,
            top: `${el.initialY}%`,
            width: el.size,
            height: el.size,
            opacity: OPACITY,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 20, -20, 10, 0],
            rotate: [0, 15, -15, 10, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
