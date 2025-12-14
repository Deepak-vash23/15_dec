import { useState } from 'react'
import { motion } from 'framer-motion'

const PhotoCard = ({ imageSrc, caption }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Polaroid frame */}
      <div className="bg-white p-3 pb-8 shadow-xl rounded-sm transform rotate-1 hover:rotate-0 transition-transform duration-300">
        <div className="relative">
          <img
            src={imageSrc}
            alt={caption}
            className="w-full h-64 object-cover"
          />
          
          {/* Butterfly that lands on hover */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0, x: -20, y: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="absolute -top-2 -right-2"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left upper wing */}
                <ellipse cx="8" cy="8" rx="6" ry="8" fill="#FFD1DC" stroke="#FFB6C1" strokeWidth="0.5" opacity="0.8" />
                {/* Right upper wing */}
                <ellipse cx="16" cy="8" rx="6" ry="8" fill="#FFD1DC" stroke="#FFB6C1" strokeWidth="0.5" opacity="0.8" />
                {/* Left lower wing */}
                <ellipse cx="7" cy="12" rx="5" ry="6" fill="#FFD1DC" stroke="#FFB6C1" strokeWidth="0.5" opacity="0.7" />
                {/* Right lower wing */}
                <ellipse cx="17" cy="12" rx="5" ry="6" fill="#FFD1DC" stroke="#FFB6C1" strokeWidth="0.5" opacity="0.7" />
                {/* Body */}
                <ellipse cx="12" cy="12" rx="1.5" ry="8" fill="#FFB6C1" opacity="0.9" />
                {/* Antennae */}
                <line x1="11" y1="4" x2="10" y2="6" stroke="#FFB6C1" strokeWidth="1" opacity="0.8" />
                <line x1="13" y1="4" x2="14" y2="6" stroke="#FFB6C1" strokeWidth="1" opacity="0.8" />
                <circle cx="10" cy="6" r="0.5" fill="#FFB6C1" opacity="0.8" />
                <circle cx="14" cy="6" r="0.5" fill="#FFB6C1" opacity="0.8" />
              </svg>
            </motion.div>
          )}
        </div>
        
        {/* Caption area */}
        <div className="mt-2 px-2">
          <p className="font-handwriting text-gray-700 text-sm">{caption}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default PhotoCard

