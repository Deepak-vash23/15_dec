import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Matter from 'matter-js'
import { ArrowRight, Zap, Heart } from 'lucide-react'

const GravityWorld = () => {
  const sceneRef = useRef(null)
  const engineRef = useRef(null)
  const renderRef = useRef(null)
  const [gravityEnabled, setGravityEnabled] = useState(true)
  const navigate = useNavigate()

  // Update gravity when state changes
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.world.gravity.y = gravityEnabled ? 1 : 0
    }
  }, [gravityEnabled])

  useEffect(() => {
    const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Events } = Matter

    // Create engine
    const engine = Engine.create()
    engine.world.gravity.y = gravityEnabled ? 1 : 0
    engineRef.current = engine

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio || 1,
      },
    })
    renderRef.current = render

    // Create ground
    const ground = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight - 20,
      window.innerWidth,
      40,
      {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      }
    )

    // Create walls
    const leftWall = Bodies.rectangle(
      10,
      window.innerHeight / 2,
      20,
      window.innerHeight,
      { isStatic: true, render: { fillStyle: 'transparent' } }
    )
    const rightWall = Bodies.rectangle(
      window.innerWidth - 10,
      window.innerHeight / 2,
      20,
      window.innerHeight,
      { isStatic: true, render: { fillStyle: 'transparent' } }
    )
    const topWall = Bodies.rectangle(
      window.innerWidth / 2,
      10,
      window.innerWidth,
      20,
      { isStatic: true, render: { fillStyle: 'transparent' } }
    )

    // Create text and shapes
    const elements = []
    const text = "HAPPY 4 MONTHS"
    const words = text.split(' ')

    // Add text letters as boxes
    let xOffset = 200
    words.forEach((word, wordIndex) => {
      word.split('').forEach((letter, letterIndex) => {
        const x = xOffset + letterIndex * 40
        const y = window.innerHeight - 100 - wordIndex * 60

        const letterBody = Bodies.rectangle(x, y, 35, 50, {
          render: {
            visible: false, // Hide default Matter.js rendering
            fillStyle: '#FCD34D',
            strokeStyle: '#F472B6',
            lineWidth: 2,
          },
          restitution: 0.6,
          friction: 0.1,
        })

        // Store letter for custom rendering
        letterBody.letter = letter
        elements.push(letterBody)
      })
      xOffset += word.length * 40 + 60
    })

    // Add hearts
    for (let i = 0; i < 8; i++) {
      const heart = Bodies.circle(
        100 + i * 100,
        window.innerHeight - 150,
        20,
        {
          render: {
            visible: false, // Hide default Matter.js rendering for custom drawing
            fillStyle: '#F472B6',
            strokeStyle: '#FCD34D',
            lineWidth: 2,
          },
          restitution: 0.8,
          friction: 0.1,
          label: 'heart',
        }
      )
      heart.isHeart = true
      heart.heartIndex = i // Store index for explosion effect
      elements.push(heart)
    }

    // Add butterflies (as rectangles for now, can be enhanced)
    for (let i = 0; i < 5; i++) {
      const butterfly = Bodies.rectangle(
        150 + i * 120,
        window.innerHeight - 200,
        30,
        20,
        {
          render: {
            visible: false, // Hide default Matter.js rendering for custom drawing
            fillStyle: '#FCD34D',
            strokeStyle: '#F472B6',
            lineWidth: 2,
          },
          restitution: 0.7,
          friction: 0.1,
          label: 'butterfly',
        }
      )
      butterfly.isButterfly = true
      elements.push(butterfly)
    }

    World.add(engine.world, [ground, leftWall, rightWall, topWall, ...elements])

    // Mouse interaction
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    })
    World.add(engine.world, mouseConstraint)

    // Custom rendering for text
    const canvas = render.canvas
    const ctx = canvas.getContext('2d')

    // Custom rendering function
    const renderCustom = () => {
      // Clear only the area we're drawing on (or use a separate canvas layer)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      elements.forEach((body) => {
        if (body.letter) {
          ctx.save()
          ctx.translate(body.position.x, body.position.y)
          ctx.rotate(body.angle)
          ctx.fillStyle = '#FCD34D'
          ctx.strokeStyle = '#F472B6'
          ctx.lineWidth = 2
          ctx.font = 'bold 40px Arial'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(body.letter, 0, 0)
          ctx.strokeText(body.letter, 0, 0)
          ctx.restore()
        } else if (body.isHeart) {
          ctx.save()
          ctx.translate(body.position.x, body.position.y)
          ctx.rotate(body.angle)
          // Draw heart shape
          ctx.fillStyle = '#F472B6'
          ctx.strokeStyle = '#FCD34D'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(0, 5)
          ctx.bezierCurveTo(-15, -10, -25, -10, -15, 5)
          ctx.bezierCurveTo(-15, 10, -5, 15, 0, 20)
          ctx.bezierCurveTo(5, 15, 15, 10, 15, 5)
          ctx.bezierCurveTo(25, -10, 15, -10, 0, 5)
          ctx.fill()
          ctx.stroke()
          ctx.restore()
        } else if (body.isButterfly) {
          ctx.save()
          ctx.translate(body.position.x, body.position.y)
          ctx.rotate(body.angle)
          ctx.fillStyle = '#FCD34D'
          ctx.strokeStyle = '#F472B6'
          ctx.lineWidth = 2
          // Draw butterfly shape
          ctx.beginPath()
          ctx.ellipse(-10, 0, 10, 8, 0, 0, Math.PI * 2)
          ctx.ellipse(10, 0, 10, 8, 0, 0, Math.PI * 2)
          ctx.ellipse(0, 0, 2, 8, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
          ctx.restore()
        }
      })
    }

    // Use beforeRender to draw custom elements on top
    Events.on(render, 'afterRender', renderCustom)

    // Handle explosion on heart click (first heart only)
    const handleCanvasClick = (event) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      elements.forEach((body) => {
        if (body.isHeart && body.heartIndex === 0) {
          const dx = body.position.x - x
          const dy = body.position.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 30) {
            // Explosion effect - remove the heart and push others away
            World.remove(engine.world, body)
            const explosionForce = 0.15
            const explosionRadius = 200

            elements.forEach((otherBody) => {
              if (otherBody !== body && !otherBody.isStatic) {
                const dx2 = otherBody.position.x - body.position.x
                const dy2 = otherBody.position.y - body.position.y
                const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

                if (distance2 < explosionRadius) {
                  const forceMagnitude = explosionForce * (1 - distance2 / explosionRadius)
                  Matter.Body.applyForce(otherBody, otherBody.position, {
                    x: (dx2 / distance2) * forceMagnitude,
                    y: (dy2 / distance2) * forceMagnitude,
                  })
                }
              }
            })
          }
        }
      })
    }

    canvas.addEventListener('click', handleCanvasClick)

    // Run engine
    Engine.run(engine)
    Render.run(render)

    return () => {
      canvas.removeEventListener('click', handleCanvasClick)
      Events.off(render, 'afterRender')
      Render.stop(render)
      Engine.clear(engine)
      if (render.canvas) {
        render.canvas.remove()
      }
    }
  }, [gravityEnabled])

  const toggleGravity = () => {
    setGravityEnabled(!gravityEnabled)
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-dark-slate to-deep-violet overflow-hidden">
      <div ref={sceneRef} className="absolute inset-0" />

      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex flex-col md:flex-row gap-2 md:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleGravity}
          className="px-4 py-2 md:px-6 md:py-3 bg-dark-slate/80 backdrop-blur-sm border-2 border-glowing-gold/50 rounded-lg text-glowing-gold text-sm md:text-base font-bold glow-soft flex items-center gap-2"
        >
          <Zap className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">{gravityEnabled ? 'Zero Gravity' : 'Normal Gravity'}</span>
          <span className="sm:hidden">{gravityEnabled ? 'Zero G' : 'Gravity'}</span>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/cards')}
          className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-glowing-gold to-neon-pink text-dark-slate text-sm md:text-base font-bold rounded-lg glow-gold flex items-center gap-2"
        >
          Next
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </motion.button>
      </motion.div>
    </div>
  )
}

export default GravityWorld

