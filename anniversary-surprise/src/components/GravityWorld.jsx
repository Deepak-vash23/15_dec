import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';

const GravityWorld = ({ onNext }) => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const [gravityEnabled, setGravityEnabled] = useState(true);

    useEffect(() => {
        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Events = Matter.Events;

        // Create engine
        const engine = Engine.create();
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: 'transparent',
                wireframes: false,
                pixelRatio: window.devicePixelRatio
            }
        });

        // Create boundaries
        const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, { isStatic: true, render: { visible: false } });
        const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true, render: { visible: false } });
        const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true, render: { visible: false } });

        Composite.add(engine.world, [ground, leftWall, rightWall]);

        // Create "HAPPY 4 MONTHS" bodies
        const words = ["HAPPY", "4", "MONTHS"];
        const bodies = [];

        words.forEach((word, index) => {
            const x = window.innerWidth / 2 + (index - 1) * 200;
            const y = 200;
            // Using rectangles for words for simplicity, could be SVG paths for better shape
            const body = Bodies.rectangle(x, y, 180, 80, {
                chamfer: { radius: 10 },
                render: {
                    fillStyle: '#FCD34D',
                    strokeStyle: '#F472B6',
                    lineWidth: 2,
                    // Text rendering is tricky in Matter.js directly. 
                    // Usually we render text on top or use sprites.
                    // For this demo, we'll use a simple color block and overlay DOM elements or just rely on the shape color.
                    // Let's try to use a sprite or just color for now and maybe overlay text if needed.
                    // Actually, let's just use colored blocks that represent the words.
                }
            });
            body.label = word; // Store word in label to maybe render text later (custom render loop needed for text)
            bodies.push(body);
        });

        // Add Hearts
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight / 2);
            const heart = Bodies.circle(x, y, 20, {
                restitution: 0.8,
                render: {
                    fillStyle: '#F472B6'
                }
            });
            bodies.push(heart);
        }

        Composite.add(engine.world, bodies);

        // Add mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // Run the engine
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Custom Render Loop for Text (Overlaying text on bodies)
        // Since Matter.js Render doesn't support text, we can use an 'afterRender' event
        Events.on(render, 'afterRender', function () {
            const context = render.context;
            context.font = "bold 24px 'Inter'";
            context.fillStyle = "#1e1b4b";
            context.textAlign = "center";
            context.textBaseline = "middle";

            bodies.forEach(body => {
                if (body.label && words.includes(body.label)) {
                    const { x, y } = body.position;
                    context.save();
                    context.translate(x, y);
                    context.rotate(body.angle);
                    context.fillText(body.label, 0, 0);
                    context.restore();
                }
            });
        });

        // Cleanup
        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
        };
    }, []);

    const toggleGravity = () => {
        if (engineRef.current) {
            engineRef.current.gravity.y = gravityEnabled ? 0 : 1;
            setGravityEnabled(!gravityEnabled);
        }
    };

    const explode = () => {
        if (engineRef.current) {
            const bodies = Composite.allBodies(engineRef.current.world);
            bodies.forEach(body => {
                if (!body.isStatic) {
                    Matter.Body.applyForce(body, body.position, {
                        x: (Math.random() - 0.5) * 0.2,
                        y: (Math.random() - 0.5) * 0.2
                    });
                }
            });
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div ref={sceneRef} className="absolute inset-0" />

            {/* Controls */}
            <div className="absolute top-8 left-0 right-0 flex justify-center gap-4 pointer-events-none">
                <motion.button
                    onClick={toggleGravity}
                    className="pointer-events-auto px-6 py-2 bg-midnight-violet/80 border border-midnight-gold text-midnight-gold rounded-full font-bold shadow-glow-gold hover:bg-midnight-slate transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {gravityEnabled ? "Zero Gravity" : "Restore Gravity"}
                </motion.button>

                <motion.button
                    onClick={explode}
                    className="pointer-events-auto px-6 py-2 bg-midnight-pink/80 border border-white text-white rounded-full font-bold shadow-glow-pink hover:bg-pink-600 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Explode!
                </motion.button>
            </div>

            <motion.button
                onClick={onNext}
                className="absolute bottom-10 right-10 px-8 py-3 bg-white text-midnight-slate font-bold rounded-full shadow-glow-white hover:bg-gray-200 transition-all z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Next Surprise →
            </motion.button>
        </div>
    );
};

export default GravityWorld;
