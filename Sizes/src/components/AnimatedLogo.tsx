import React, { useState, useEffect, useRef } from 'react';
import './AnimatedLogo.css';

const AnimatedLogo: React.FC = () => {
  const letters = ['S', 'I', 'Z', 'E', 'S'];
  const waveSpeed = 200;           // ms per step
  const pauseDuration = 4000;       // ms pause after a full cycle
  const maxScale = 1.6;             // size of the largest letter
  const baseScale = 1.0;            // normal size
  const maxIndex = letters.length - 1; // = 4

  const [peakIndex, setPeakIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const directionRef = useRef<'forward' | 'backward'>('forward');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate scale for each letter based on its distance from the current peak
  const getScale = (index: number): number => {
    if (isPaused) return baseScale;
    const distance = Math.abs(index - peakIndex);
    const t = Math.min(distance / maxIndex, 1);
    return baseScale + (maxScale - baseScale) * (1 - t);
  };

  const moveWave = () => {
    setPeakIndex(prev => {
      let next = prev;
      if (directionRef.current === 'forward') {
        if (prev < maxIndex) {
          next = prev + 1;
        } else {
          // Reached the end – turn around
          directionRef.current = 'backward';
          next = prev - 1;
        }
      } else { // backward
        if (prev > 0) {
          next = prev - 1;
        } else {
          // Back to the beginning – pause and then restart
          clearInterval(intervalRef.current!);
          setIsPaused(true);
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            directionRef.current = 'forward';
            setPeakIndex(0);
            // Restart the interval
            intervalRef.current = setInterval(moveWave, waveSpeed);
          }, pauseDuration);
          next = prev; // will be overwritten by pause (but keep prev for now)
        }
      }
      return next;
    });
  };

  const startWave = () => {
    directionRef.current = 'forward';
    setPeakIndex(0);
    setIsPaused(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(moveWave, waveSpeed);
  };

  useEffect(() => {
    startWave();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="logo-container">
      {letters.map((letter, index) => (
        <div
          key={index}
          className="letter-box"
          style={{
            transform: `scale(${getScale(index)})`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default AnimatedLogo;