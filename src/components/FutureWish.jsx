import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import { Heart, Send, Check } from 'lucide-react'

const FutureWish = () => {
  const [wish, setWish] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [wishes, setWishes] = useState([])
  const navigate = useNavigate()

  const particlesInit = async (main) => {
    await loadSlim(main)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (wish.trim()) {
      const newWish = {
        id: Date.now(),
        text: wish,
      }
      setWishes([...wishes, newWish])
      setSubmitted(true)
      setWish('')
    }
  }

  const handleDone = () => {
    navigate('/letter')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-slate to-deep-violet relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#FCD34D",
            },
            links: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 0.3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.4,
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.1,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 },
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.5,
                sync: false,
              },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 w-full max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-6 md:mb-8 px-4"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-neon-pink glow-text-pink" />
          </motion.div>
          <h1 className="text-2xl md:text-4xl font-bold text-glowing-gold glow-text-gold mb-4">
            The Future Wish Jar
          </h1>
          <p className="text-neon-pink text-base md:text-lg">
            Share a wish for our next month together
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="bg-dark-slate/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-glowing-gold/50 glow-soft"
            >
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Type your wish here..."
                className="w-full h-32 px-4 py-3 bg-deep-violet/50 border-2 border-glowing-gold/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-glowing-gold focus:glow-soft transition-all resize-none"
                autoFocus
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full py-3 bg-gradient-to-r from-glowing-gold to-neon-pink text-dark-slate font-bold rounded-lg glow-gold hover:glow-pink transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Wish
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-dark-slate/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-glowing-gold/50 glow-soft"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl mb-4"
              >
                🦋
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-glowing-gold glow-text-gold mb-4">
                Your wish has been captured!
              </h2>
              <p className="text-neon-pink text-base md:text-lg mb-6">
                It's now floating in the jar, ready to come true 💕
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-glowing-gold to-neon-pink text-dark-slate text-sm md:text-base font-bold rounded-lg glow-gold"
                >
                  Add Another Wish
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDone}
                  className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-neon-pink to-glowing-gold text-dark-slate text-sm md:text-base font-bold rounded-lg glow-pink flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                  Done
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Jar visualization with floating wishes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-12 flex justify-center"
        >
          <div className="relative w-32 h-48 md:w-48 md:h-72">
            <svg width="100%" height="100%" viewBox="0 0 200 300" className="butterfly-glow" preserveAspectRatio="xMidYMid meet">
              {/* Jar body */}
              <path
                d="M 50 50 Q 50 30 70 30 L 130 30 Q 150 30 150 50 L 150 250 Q 150 270 130 270 L 70 270 Q 50 270 50 250 Z"
                fill="rgba(30, 27, 75, 0.5)"
                stroke="#FCD34D"
                strokeWidth="3"
                className="glow-soft"
              />
              {/* Jar rim */}
              <ellipse
                cx="100"
                cy="30"
                rx="40"
                ry="8"
                fill="rgba(252, 211, 77, 0.3)"
                stroke="#FCD34D"
                strokeWidth="2"
              />
            </svg>
            
            {/* Floating wishes inside jar */}
            <div className="absolute inset-0 pointer-events-none">
              {wishes.map((wishItem, index) => (
                <motion.div
                  key={wishItem.id}
                  initial={{ opacity: 0, y: 200, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0.7],
                    y: [200, 100 + index * 20, 80 + index * 15, 60 + index * 10],
                    x: [0, Math.sin(index) * 10, Math.cos(index) * 15, Math.sin(index * 2) * 8],
                    scale: [0, 1, 1, 0.9],
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                  className="absolute left-1/2 transform -translate-x-1/2"
                  style={{
                    top: `${60 + index * 15}%`,
                  }}
                >
                  <div className="bg-glowing-gold/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-glowing-gold/50 glow-soft max-w-[150px]">
                    <p className="text-xs text-glowing-gold font-handwriting text-center line-clamp-2">
                      {wishItem.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FutureWish

