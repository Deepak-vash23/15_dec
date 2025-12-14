import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Heart } from 'lucide-react'

const CardDeck = () => {
  const [cards] = useState([
    { id: 1, text: "Your beautiful smile that lights up my world" },
    { id: 2, text: "How you always support me in everything I do" },
    { id: 3, text: "Your laugh that makes my heart skip a beat" },
    { id: 4, text: "The way you make every day feel special" },
    { id: 5, text: "Your kindness and compassion for others" },
    { id: 6, text: "How you understand me like no one else" },
    { id: 7, text: "Your intelligence and the way you think" },
    { id: 8, text: "The way you make me feel loved and cherished" },
  ])

  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [exitX, setExitX] = useState(0)

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? 1000 : -1000
      setExitX(direction)
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
        setExitX(0)
      }, 50)
    }
  }

  const currentCard = cards[currentIndex]

  if (!currentCard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-slate to-deep-violet">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Heart className="w-24 h-24 mx-auto mb-6 text-neon-pink glow-text-pink" />
          <h2 className="text-4xl font-bold text-glowing-gold glow-text-gold mb-4">
            That's why I love you! 💕
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/constellation')}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-glowing-gold to-neon-pink text-dark-slate font-bold rounded-lg glow-gold flex items-center gap-2 mx-auto"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-slate to-deep-violet relative overflow-hidden">
      <div className="relative w-full max-w-md h-[600px]">
        <AnimatePresence>
          {cards.slice(currentIndex, currentIndex + 3).map((card, index) => {
            const isTop = index === 0

            return (
              <motion.div
                key={card.id}
                style={{
                  zIndex: cards.length - currentIndex - index,
                }}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: -200, right: 200 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => isTop && handleDragEnd(e, info)}
                initial={{ scale: 0.9, y: 50, opacity: 0, rotate: 0 }}
                animate={{
                  scale: 1 - index * 0.05,
                  y: index * -10,
                  opacity: 1 - index * 0.1,
                  rotate: 0,
                }}
                exit={{
                  x: exitX,
                  opacity: 0,
                  transition: { duration: 0.3 },
                }}
                whileDrag={{ 
                  rotate: (_, info) => info.offset.x * 0.1,
                  scale: 1.05,
                }}
                className="absolute w-full h-full bg-dark-slate/90 backdrop-blur-sm border-2 border-glowing-gold/50 rounded-2xl p-8 glow-soft cursor-grab active:cursor-grabbing"
              >
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Heart className="w-16 h-16 mb-6 text-neon-pink glow-text-pink" />
                  <p className="text-2xl font-handwriting text-glowing-gold glow-text-gold">
                    {card.text}
                  </p>
                  {isTop && (
                    <p className="mt-8 text-neon-pink text-sm">
                      Swipe or drag to reveal more...
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CardDeck

