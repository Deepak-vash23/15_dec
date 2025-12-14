import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';

const ButterflyBackground = ({ isReleased }) => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const butterfliesRef = useRef([]);

    useEffect(() => {
        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Events = Matter.Events,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            World = Matter.World;

        // Create engine
        const engine = Engine.create();
        engine.gravity.y = 0; // No gravity initially for floating effect
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

        // Create butterflies
        const butterflyCount = 30;
        const butterflies = [];
        const colors = ['#FFD1DC', '#E6E6FA', '#FFFDD0', '#C1E1C1', '#A7C7E7'];

        for (let i = 0; i < butterflyCount; i++) {
            const x = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
            const y = window.innerHeight / 2 + (Math.random() - 0.5) * 300;

            const butterfly = Bodies.circle(x, y, 10, {
                restitution: 0.9,
                friction: 0.005,
                frictionAir: 0.02,
                render: {
                    fillStyle: colors[Math.floor(Math.random() * colors.length)],
                    // You could add a sprite here if you have an image
                    // sprite: { texture: '/butterfly.png', xScale: 0.5, yScale: 0.5 }
                }
            });

            // Add a custom property to track original velocity for "chaotic" movement
            butterfly.customId = i;
            butterflies.push(butterfly);
        }
        butterfliesRef.current = butterflies;

        // Create Jar Walls (Invisible constraints)
        const wallOptions = {
            isStatic: true,
            render: { visible: false }
        };

        const jarWidth = 300;
        const jarHeight = 400;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const leftWall = Bodies.rectangle(centerX - jarWidth / 2, centerY, 20, jarHeight, wallOptions);
        const rightWall = Bodies.rectangle(centerX + jarWidth / 2, centerY, 20, jarHeight, wallOptions);
        const topWall = Bodies.rectangle(centerX, centerY - jarHeight / 2, jarWidth, 20, wallOptions);
        const bottomWall = Bodies.rectangle(centerX, centerY + jarHeight / 2, jarWidth, 20, wallOptions);

        const jarWalls = [leftWall, rightWall, topWall, bottomWall];

        Composite.add(engine.world, [...butterflies, ...jarWalls]);

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

        // Chaotic movement inside jar
        Events.on(engine, 'beforeUpdate', () => {
            butterflies.forEach(body => {
                if (!isReleased) {
                    // Random small impulses to simulate chaotic flying
                    if (Math.random() < 0.05) {
                        Matter.Body.applyForce(body, body.position, {
                            x: (Math.random() - 0.5) * 0.002,
                            y: (Math.random() - 0.5) * 0.002
                        });
                    }
                }
            });
        });

        // Run the engine
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Handle resize
        const handleResize = () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Run once on mount

    // Effect to handle release
    useEffect(() => {
        if (isReleased && engineRef.current) {
            const engine = engineRef.current;
            const world = engine.world;

            // Remove walls
            const bodies = Composite.allBodies(world);
            const walls = bodies.filter(b => b.isStatic && !b.label?.includes('Mouse')); // Simple filter
            // Better way: keep reference to walls. 
            // For now, let's just remove all static bodies except maybe ground if we had one (we don't)

            // Actually, let's just clear the world and re-add butterflies? No, we want them to fly out.
            // Let's find the walls by their properties or keep a ref.
            // Since I didn't keep a ref in a state/ref accessible here easily without prop drilling or context, 
            // I'll just rely on the fact that walls are static.

            const staticBodies = bodies.filter(b => b.isStatic);
            Composite.remove(world, staticBodies);

            // Apply explosive force to butterflies
            butterfliesRef.current.forEach(body => {
                Matter.Body.applyForce(body, body.position, {
                    x: (Math.random() - 0.5) * 0.05,
                    y: (Math.random() - 0.5) * 0.05
                });
            });
        }
    }, [isReleased]);

    return (
        <div
            ref={sceneRef}
            className="fixed inset-0 pointer-events-none z-0"
        />
    );
};

export default ButterflyBackground;
