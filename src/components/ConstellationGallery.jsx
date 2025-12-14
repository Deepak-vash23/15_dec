import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'

const ConstellationGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [photos, setPhotos] = useState([])
  const containerRef = useRef(null)
  const navigate = useNavigate()

  // All images from Resources folder
  const imageFiles = [
    '1765724949115.jpg', '1765724949121.jpg', '1765724949131.jpg', '1765724949139.jpg',
    '1765724949146.jpg', '1765724949153.jpg', '1765724949160.jpg', '1765724949167.jpg',
    '1765724949174.jpg', '1765724949184.jpg', '1765724949194.jpg', '1765724949201.jpg',
    '1765724949207.jpg', '1765724949213.jpg', '1765724949219.jpg', '1765724949227.jpg',
    '1765724949233.jpg', '1765724949238.jpg', '1765724949244.jpg', '1765724949250.jpg',
    '1765724949257.jpg', '1765724949262.jpg', '1765724949268.jpg', '1765724949275.jpg',
    '1765724949281.jpg', '1765724949288.jpg', '1765724949298.jpg', '1765724949305.jpg',
    '1765724949314.jpg', '1765724949320.jpg', '1765724949331.jpg', '1765724949339.jpg',
    '1765724949345.jpg', '1765724949351.jpg', '1765724949357.jpg'
  ]

  // Initialize photos with random dispersed positions and movement paths
  useEffect(() => {
    const initializePhotos = () => {
      const padding = 80
      const maxX = window.innerWidth - padding
      const maxY = window.innerHeight - padding

      const newPhotos = imageFiles.map((filename, index) => {
        const initialX = padding + Math.random() * (maxX - padding)
        const initialY = padding + Math.random() * (maxY - padding)

        // Generate random keyframe positions for chaotic movement
        const numKeyframes = 6 + Math.floor(Math.random() * 4) // 6-9 keyframes
        const keyframes = []

        for (let i = 0; i < numKeyframes; i++) {
          keyframes.push({
            x: padding + Math.random() * (maxX - padding) - initialX,
            y: padding + Math.random() * (maxY - padding) - initialY,
          })
        }

        return {
          id: index + 1,
          initialX,
          initialY,
          caption: `Memory ${index + 1}`,
          image: `/Resources/${filename}`,
          keyframes,
          duration: 25 + Math.random() * 25, // Random duration 25-50 seconds (slower for mobile)
        }
      })

      setPhotos(newPhotos)
    }

    initializePhotos()
    window.addEventListener('resize', initializePhotos)
    return () => window.removeEventListener('resize', initializePhotos)
  }, [])

  const handleMouseDown = (e) => {
    if (e.target === containerRef.current || e.target.closest('.photo-star')) {
      return
    }
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart])


  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-slate to-deep-violet relative overflow-hidden">
      {/* Title text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-30 text-center px-4 max-w-[95%] md:max-w-none"
      >
        <h2 className="text-base md:text-2xl lg:text-3xl font-handwriting text-glowing-gold glow-text-gold mb-2 leading-tight">
          Every best moment we had, and find the pic where I kissed you first time
        </h2>
      </motion.div>

      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        {/* Photo stars with random haywire movement */}
        {photos.map((photo) => {
          if (!photo.keyframes || photo.keyframes.length === 0) return null

          const xKeyframes = [
            ...photo.keyframes.map(k => k.x),
            photo.keyframes[0].x, // Loop back to start
          ]
          const yKeyframes = [
            ...photo.keyframes.map(k => k.y),
            photo.keyframes[0].y, // Loop back to start
          ]
          const numFrames = xKeyframes.length
          const times = Array.from({ length: numFrames }, (_, i) => i / (numFrames - 1))

          return (
            <motion.div
              key={photo.id}
              className="photo-star absolute cursor-pointer z-10 touch-manipulation"
              style={{
                left: photo.initialX || 0,
                top: photo.initialY || 0,
                padding: '12px', // Larger touch target for mobile
              }}
              animate={{
                x: xKeyframes,
                y: yKeyframes,
              }}
              transition={{
                duration: photo.duration || 30,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
                times,
              }}
              whileHover={{
                scale: 1.5,
                zIndex: 50,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 1.2 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-glowing-gold rounded-full glow-gold flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-dark-slate rounded-full border-2 border-neon-pink overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Full screen photo view */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-sm w-full mx-4 bg-dark-slate rounded-2xl overflow-hidden border-2 border-glowing-gold/50 glow-soft flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-dark-slate/90 rounded-full flex items-center justify-center text-white hover:bg-neon-pink transition-colors z-10 shadow-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom- safe-bottom right-4 md:bottom-8 md:right-8 z-50 mb-4 md:mb-0"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/wish')}
          className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-glowing-gold to-neon-pink text-dark-slate text-sm md:text-base font-bold rounded-lg glow-gold flex items-center gap-2"
        >
          Next
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </motion.button>
      </motion.div>
    </div>
  )
}

export default ConstellationGallery

