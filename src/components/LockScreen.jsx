import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import { Lock, Unlock } from 'lucide-react'

const LockScreen = () => {
  const [answer, setAnswer] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [shake, setShake] = useState(false)
  const navigate = useNavigate()

  // TODO: Change this to your actual question and answer
  const QUESTION = "Where was our first date?"
  const CORRECT_ANSWER = "Burger king" // Make this case-insensitive

  const particlesInit = async (main) => {
    await loadSlim(main)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const normalizedAnswer = answer.toLowerCase().trim()
    const normalizedCorrect = CORRECT_ANSWER.toLowerCase().trim()

    if (normalizedAnswer === normalizedCorrect) {
      setIsUnlocked(true)
      setTimeout(() => {
        navigate('/gravity')
      }, 2000)
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setAnswer('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-dark-slate to-deep-violet">
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
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 50,
            },
            opacity: {
              value: 0.5,
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
              value: { min: 1, max: 3 },
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

      <motion.div
        className="relative z-10 w-full max-w-md px-6"
        animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-dark-slate/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-glowing-gold/30 glow-soft"
            >
              <div className="text-center mb-6">
                <Lock className="w-16 h-16 mx-auto mb-4 text-glowing-gold glow-text-gold" />
                <h1 className="text-3xl font-bold text-glowing-gold glow-text-gold mb-2">
                  Love Lock
                </h1>
                <p className="text-neon-pink text-lg">
                  {QUESTION}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full px-4 py-3 bg-deep-violet/50 border-2 border-glowing-gold/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-glowing-gold focus:glow-soft transition-all"
                  autoFocus
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-glowing-gold to-neon-pink text-dark-slate font-bold rounded-lg glow-gold hover:glow-pink transition-all"
                >
                  Unlock
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 1 }}
              >
                <Unlock className="w-24 h-24 mx-auto mb-4 text-glowing-gold glow-text-gold" />
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-glowing-gold glow-text-gold"
              >
                Unlocked! 💕
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default LockScreen

