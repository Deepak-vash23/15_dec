import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ButterflyBackground from './ButterflyBackground'
import PhotoCard from './PhotoCard'

const MemoryLane = () => {
  const navigate = useNavigate()

  // TODO: Replace these placeholder images with your actual photos
  // Example: import photo1 from '../assets/photos/photo1.jpg'
  // Then use: imageSrc={photo1}
  const memories = [
    {
      id: 1,
      // Replace this URL with your local image path
      // Example: imageSrc: require('../assets/photos/memory1.jpg')
      imageSrc: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop',
      caption: 'Our first date 💕',
    },
    {
      id: 2,
      imageSrc: 'https://images.unsplash.com/photo-1518568814500-bf0f88dffdb8?w=400&h=400&fit=crop',
      caption: 'A beautiful sunset together',
    },
    {
      id: 3,
      imageSrc: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
      caption: 'Adventures await',
    },
    {
      id: 4,
      imageSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      caption: 'Laughing together',
    },
    {
      id: 5,
      imageSrc: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop',
      caption: 'Sweet moments',
    },
    {
      id: 6,
      imageSrc: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop',
      caption: 'More memories to come',
    },
  ]

  return (
    <div className="min-h-screen py-12 px-4 relative">
      <ButterflyBackground count={25} floating={true} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-handwriting text-center mb-12 text-soft-pink"
        >
          Memory Lane 🦋
        </motion.h1>

        {/* Masonry/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PhotoCard imageSrc={memory.imageSrc} caption={memory.caption} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => navigate('/surprise')}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-soft-pink to-lavender text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-handwriting text-xl"
          >
            See the Final Surprise
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default MemoryLane

