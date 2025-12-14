import { motion } from 'framer-motion'
import ButterflyBackground from './ButterflyBackground'

// TODO: Change this to your girlfriend's name
const HER_NAME = '[Her Name]'

const FinalSurprise = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <ButterflyBackground count={30} floating={true} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        className="relative z-10 text-center"
      >
        {/* Beating Heart Animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-8"
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#FF6B9D"
              stroke="#FFB6C1"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-6xl font-handwriting text-soft-pink mb-4"
        >
          Happy 4 Months,
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-5xl md:text-7xl font-handwriting text-soft-pink font-bold mb-8"
        >
          {HER_NAME}!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xl md:text-2xl font-handwriting text-gray-700 max-w-2xl mx-auto"
        >
          Thank you for being the most amazing person in my life. 
          Here's to many more beautiful months together! 💕🦋
        </motion.p>

        {/* Floating hearts */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: -100,
              x: (Math.random() - 0.5) * 200,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut',
            }}
            className="absolute text-soft-pink text-2xl"
            style={{
              left: `${20 + i * 15}%`,
              bottom: '10%',
            }}
          >
            💕
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default FinalSurprise

