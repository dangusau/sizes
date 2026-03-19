import React, { useState, useEffect, useRef } from 'react'

const HeaderLogo: React.FC = () => {
  const letters = ['S', 'I', 'Z', 'E', 'S']
  // Base scale gradient: first box largest, decreasing to the right
  const baseScales = [1.4, 1.3, 1.2, 1.1, 1.0]

  const [peakIndex, setPeakIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const directionRef = useRef<'forward' | 'backward'>('forward')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const waveSpeed = 250           // ms per step (fast)
  const pauseDuration = 8000     // 10 seconds pause
  const waveAmplitude = 0.4       // extra scale added at peak

  const getScale = (index: number): number => {
    if (isPaused) return baseScales[index]
    const distance = Math.abs(index - peakIndex)
    const waveFactor = 1 + waveAmplitude * (1 - distance / (letters.length - 1))
    return baseScales[index] * waveFactor
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const startWave = () => {
    setIsPaused(false)
    directionRef.current = 'forward'
    setPeakIndex(0)

    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setPeakIndex(prev => {
        const direction = directionRef.current
        if (direction === 'forward') {
          if (prev < letters.length - 1) {
            return prev + 1
          } else {
            // reached end, reverse direction
            directionRef.current = 'backward'
            return prev - 1
          }
        } else { // backward
          if (prev > 0) {
            return prev - 1
          } else {
            // back to start – pause
            clearInterval(intervalRef.current!)
            setIsPaused(true)
            timeoutRef.current = setTimeout(() => {
              startWave()
            }, pauseDuration)
            return 0
          }
        }
      })
    }, waveSpeed)
  }

  useEffect(() => {
    startWave()
    // Cleanup handled above
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex items-center gap-1">
      {letters.map((letter, index) => (
        <div
          key={index}
          className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-md bg-white/80 backdrop-blur-sm transition-transform duration-200 ease-in-out"
          style={{
            transform: `scale(${getScale(index)})`,
          }}
        >
          <span className="text-sm font-bold text-gray-800">{letter}</span>
        </div>
      ))}
    </div>
  )
}

export default HeaderLogo
