import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Unlock } from 'lucide-react'

const LetterPage = () => {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [shake, setShake] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const CORRECT_PASSWORD = 'saundesh'

  const handleSubmit = (e) => {
    e.preventDefault()
    const normalizedPassword = password.toLowerCase().trim()
    const normalizedCorrect = CORRECT_PASSWORD.toLowerCase().trim()

    if (normalizedPassword === normalizedCorrect) {
      setIsUnlocked(true)
      setTimeout(() => {
        setIsOpen(true)
      }, 1000)
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-slate to-deep-violet relative overflow-hidden p-4">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed-letter"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative w-full max-w-md"
          >
            {/* Closed Letter */}
            <motion.div
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Letter envelope */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={isUnlocked ? { rotateY: 180 } : { rotateY: 0 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <svg width="400" height="300" viewBox="0 0 400 300" className="w-full">
                  {/* Envelope back */}
                  <path
                    d="M 50 50 L 200 150 L 350 50 L 350 250 L 50 250 Z"
                    fill="rgba(252, 211, 77, 0.9)"
                    stroke="#FCD34D"
                    strokeWidth="3"
                    className="glow-gold"
                  />
                  {/* Envelope flap */}
                  <motion.path
                    d="M 50 50 L 200 150 L 350 50"
                    fill="rgba(244, 114, 182, 0.7)"
                    stroke="#F472B6"
                    strokeWidth="3"
                    animate={isUnlocked ? { d: "M 50 50 L 200 200 L 350 50" } : {}}
                    transition={{ duration: 1 }}
                  />
                  {/* Seal/Wax */}
                  {!isUnlocked && (
                    <motion.circle
                      cx="200"
                      cy="150"
                      r="20"
                      fill="#F472B6"
                      stroke="#FCD34D"
                      strokeWidth="2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </svg>
              </motion.div>

              {/* Password input */}
              {!isUnlocked && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.form
                    onSubmit={handleSubmit}
                    className="bg-dark-slate/90 backdrop-blur-sm rounded-lg p-4 md:p-6 border-2 border-glowing-gold/50 glow-soft w-full max-w-xs md:w-3/4"
                  >
                    <Lock className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-glowing-gold glow-text-gold" />
                    <p className="text-glowing-gold text-center mb-4 font-handwriting text-base md:text-lg">
                      Enter the secret word to open the letter
                    </p>
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Secret word..."
                      className="w-full px-4 py-2 rounded-lg bg-deep-violet/50 border-2 border-glowing-gold/50 text-white placeholder-gray-400 focus:outline-none focus:border-glowing-gold text-center"
                      autoFocus
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full py-2 bg-gradient-to-r from-glowing-gold to-neon-pink text-dark-slate font-bold rounded-lg glow-gold"
                    >
                      Open Letter
                    </motion.button>
                  </motion.form>
                </motion.div>
              )}

              {/* Unlocking animation */}
              {isUnlocked && !isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1 }}
                  >
                    <Unlock className="w-16 h-16 mx-auto text-neon-pink glow-pink" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-20 text-glowing-gold glow-text-gold font-handwriting text-xl"
                  >
                    Opening...
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ) : (
            <motion.div
              key="open-letter"
              initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              className="w-full max-w-2xl bg-gradient-to-br from-dark-slate/95 to-deep-violet/95 backdrop-blur-sm rounded-2xl p-4 md:p-8 lg:p-12 border-2 border-glowing-gold/50 glow-soft shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Letter content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white space-y-4 md:space-y-6"
              >
                <div className="text-right mb-4 md:mb-6">
                  <p className="text-glowing-gold font-handwriting text-base md:text-lg">To: My Love</p>
                </div>

                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-glowing-gold glow-text-gold mb-2 text-center">
                  Subject: For the girl who owns my heart
                </h1>

                <div className="space-y-3 md:space-y-4 text-sm md:text-lg leading-relaxed font-handwriting">
                <p className="text-glowing-gold">My Love,</p>

                <p className="text-white">Happy 4 months.</p>

                <p className="text-white">
                  I was thinking back to how we got here, and I realized something important. You know about those two months where we didn't talk? I need you to know that even in the silence, there wasn't a single day where I didn't love you. Not one. missing you was the only thing I did consistently. The distance didn't make my feelings fade; it only made me realize how empty my world is without you in it.
                </p>

                <p className="text-white">
                  I still remember the moment I finally asked you to be mine. I don't think I've ever been that nervous in my entire life. My hands were shaking and my heart was beating out of my chest—not because I was unsure, but because I knew exactly how much you meant to me. I was terrified of losing the best thing that ever happened to me.
                </p>

                <p className="text-white">
                  I know things haven't always been perfect, and I know I've made mistakes. But I am making a promise to you right now, in writing, so you can keep it forever: I will not lie to you again. You deserve the truth, always, and I will give that to you.
                </p>

                <p className="text-white">
                  I want you to be certain of one thing: It is you. It has always been you. There is no other girl, and there never will be. My eyes, my heart, and my loyalty belong entirely to you.
                </p>

                <p className="text-white">
                  Thank you for giving me a chance to love you. I promise to make every day worth it.
                </p>

                <div className="mt-6 md:mt-8 text-right">
                  <p className="text-glowing-gold font-handwriting text-lg md:text-xl">Yours,</p>
                  <p className="text-glowing-gold font-handwriting text-xl md:text-2xl">Deepak</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LetterPage
