import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Matter from 'matter-js'
import ButterflyBackground from './ButterflyBackground'

const LandingPage = () => {
  const jarRef = useRef(null)
  const butterflyCanvasRef = useRef(null)
  const engineRef = useRef(null)
  const renderRef = useRef(null)
  const butterfliesRef = useRef([])
  const [isReleased, setIsReleased] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isReleased) return

    const { Engine, Render, World, Bodies, Events } = Matter

    // Create engine
    const engine = Engine.create()
    engine.world.gravity.y = 0.3
    engineRef.current = engine

    // Create renderer
    const render = Render.create({
      element: jarRef.current,
      engine: engine,
      options: {
        width: 400,
        height: 500,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio || 1,
      },
    })
    renderRef.current = render

    // Jar walls (invisible boundaries)
    const jarWidth = 400
    const jarHeight = 500
    const wallThickness = 10

    const walls = [
      // Bottom
      Bodies.rectangle(jarWidth / 2, jarHeight - wallThickness / 2, jarWidth, wallThickness, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      }),
      // Left
      Bodies.rectangle(wallThickness / 2, jarHeight / 2, wallThickness, jarHeight, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      }),
      // Right
      Bodies.rectangle(jarWidth - wallThickness / 2, jarHeight / 2, wallThickness, jarHeight, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      }),
      // Top (with opening)
      Bodies.rectangle(jarWidth / 4, wallThickness / 2, jarWidth / 2, wallThickness, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      }),
      Bodies.rectangle((jarWidth * 3) / 4, wallThickness / 2, jarWidth / 2, wallThickness, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      }),
    ]

    // Create butterflies (small circular bodies - invisible, we'll draw them separately)
    const butterflies = []
    const butterflyCount = 8
    const colors = ['#FFD1DC', '#E6E6FA', '#FFFDD0', '#FFE4E1']

    for (let i = 0; i < butterflyCount; i++) {
      const x = 100 + Math.random() * 200
      const y = 100 + Math.random() * 300
      const size = 10 + Math.random() * 6

      const butterfly = Bodies.circle(x, y, size, {
        restitution: 0.8,
        friction: 0.1,
        density: 0.001,
        render: {
          visible: false, // Hide Matter.js default rendering
        },
        label: 'butterfly',
      })

      // Store color with butterfly
      butterfly.color = colors[Math.floor(Math.random() * colors.length)]
      butterflies.push(butterfly)
    }

    butterfliesRef.current = butterflies
    World.add(engine.world, [...walls, ...butterflies])

    // Draw butterflies on separate canvas
    const butterflyCanvas = butterflyCanvasRef.current
    
    if (butterflyCanvas) {
      const ctx = butterflyCanvas.getContext('2d')
      
      const drawButterfly = (body, ctx) => {
        const { position, angle } = body
        ctx.save()
        ctx.translate(position.x, position.y)
        ctx.rotate(angle)
        
        const color = body.color || '#FFD1DC'
        ctx.fillStyle = color
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        
        // Draw butterfly shape
        ctx.beginPath()
        // Left wing
        ctx.ellipse(-8, 0, 8, 12, 0, 0, Math.PI * 2)
        // Right wing
        ctx.ellipse(8, 0, 8, 12, 0, 0, Math.PI * 2)
        // Body
        ctx.ellipse(0, 0, 2, 10, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        
        ctx.restore()
      }

      // Use Matter.js Events to sync rendering with physics
      Events.on(engine, 'afterUpdate', () => {
        if (!isReleased && butterflyCanvas) {
          ctx.clearRect(0, 0, 400, 500)
          butterflies.forEach(butterfly => {
            drawButterfly(butterfly, ctx)
          })
        }
      })
    }

    // Run the engine
    Engine.run(engine)
    Render.run(render)

    return () => {
      Events.off(engine, 'afterUpdate')
      Render.stop(render)
      Engine.clear(engine)
      if (render.canvas) {
        render.canvas.remove()
      }
      render.textures = {}
    }
  }, [isReleased])

  const handleRelease = () => {
    setIsReleased(true)
    
    // Remove constraints and let butterflies float away
    setTimeout(() => {
      navigate('/letter')
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <ButterflyBackground count={0} floating={false} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <AnimatePresence>
          {!isReleased && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Jar SVG */}
              <svg
                width="400"
                height="500"
                viewBox="0 0 400 500"
                className="drop-shadow-2xl"
              >
                {/* Glass jar body */}
                <path
                  d="M 50 100 Q 50 50 100 50 L 300 50 Q 350 50 350 100 L 350 450 Q 350 480 320 480 L 80 480 Q 50 480 50 450 Z"
                  fill="rgba(255, 255, 255, 0.3)"
                  stroke="#E6E6FA"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Jar rim */}
                <ellipse
                  cx="200"
                  cy="50"
                  rx="125"
                  ry="15"
                  fill="rgba(255, 255, 255, 0.5)"
                  stroke="#E6E6FA"
                  strokeWidth="2"
                />
                {/* Highlights */}
                <path
                  d="M 80 120 Q 100 100 120 120"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.6)"
                  strokeWidth="2"
                />
              </svg>

              {/* Matter.js canvas (invisible, just for physics) */}
              <div
                ref={jarRef}
                className="absolute top-0 left-0 opacity-0"
                style={{ width: '400px', height: '500px', pointerEvents: 'none' }}
              />
              
              {/* Canvas for drawing butterflies */}
              <canvas
                ref={butterflyCanvasRef}
                width={400}
                height={500}
                className="absolute top-0 left-0 pointer-events-none"
                style={{ zIndex: 1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isReleased && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.p
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-2xl font-handwriting text-soft-pink mb-8"
            >
              The butterflies are free! 💕
            </motion.p>
          </motion.div>
        )}
      </motion.div>

      {!isReleased && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleRelease}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-soft-pink to-lavender text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-handwriting text-xl z-20 relative"
        >
          Release the Butterflies 🦋
        </motion.button>
      )}
    </div>
  )
}

export default LandingPage

