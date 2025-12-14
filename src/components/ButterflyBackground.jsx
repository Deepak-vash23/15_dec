import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ButterflyBackground = ({ count = 15, floating = true }) => {
  const butterflies = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }))

  const ButterflySVG = ({ x, y, delay, duration }) => {
    const colors = [
      { fill: '#FFD1DC', stroke: '#FFB6C1' },
      { fill: '#E6E6FA', stroke: '#DDA0DD' },
      { fill: '#FFFDD0', stroke: '#F0E68C' },
      { fill: '#FFE4E1', stroke: '#FFB6C1' },
    ]
    const color = colors[Math.floor(Math.random() * colors.length)]

    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${x}%`,
          top: `${y}%`,
        }}
        animate={
          floating
            ? {
                y: [0, -20, 0],
                x: [0, 10, -10, 0],
                rotate: [0, 5, -5, 0],
              }
            : {}
        }
        transition={{
          duration: duration,
          repeat: Infinity,
          delay: delay,
          ease: 'easeInOut',
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left upper wing */}
          <ellipse cx="8" cy="8" rx="6" ry="8" fill={color.fill} stroke={color.stroke} strokeWidth="0.5" opacity="0.8" />
          {/* Right upper wing */}
          <ellipse cx="16" cy="8" rx="6" ry="8" fill={color.fill} stroke={color.stroke} strokeWidth="0.5" opacity="0.8" />
          {/* Left lower wing */}
          <ellipse cx="7" cy="12" rx="5" ry="6" fill={color.fill} stroke={color.stroke} strokeWidth="0.5" opacity="0.7" />
          {/* Right lower wing */}
          <ellipse cx="17" cy="12" rx="5" ry="6" fill={color.fill} stroke={color.stroke} strokeWidth="0.5" opacity="0.7" />
          {/* Body */}
          <ellipse cx="12" cy="12" rx="1.5" ry="8" fill={color.stroke} opacity="0.9" />
          {/* Antennae */}
          <line x1="11" y1="4" x2="10" y2="6" stroke={color.stroke} strokeWidth="1" opacity="0.8" />
          <line x1="13" y1="4" x2="14" y2="6" stroke={color.stroke} strokeWidth="1" opacity="0.8" />
          <circle cx="10" cy="6" r="0.5" fill={color.stroke} opacity="0.8" />
          <circle cx="14" cy="6" r="0.5" fill={color.stroke} opacity="0.8" />
        </svg>
      </motion.div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {butterflies.map((butterfly) => (
        <ButterflySVG
          key={butterfly.id}
          x={butterfly.x}
          y={butterfly.y}
          delay={butterfly.delay}
          duration={butterfly.duration}
        />
      ))}
    </div>
  )
}

export default ButterflyBackground

