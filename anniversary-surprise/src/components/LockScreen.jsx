import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const LockScreen = ({ onUnlock }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hardcoded answer: "Coffee Shop" (case insensitive)
        if (input.toLowerCase().trim() === 'coffee shop') {
            onUnlock();
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen z-10 p-4">
            {/* Background Particles */}
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
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 100,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#FCD34D",
                        },
                        links: {
                            color: "#FCD34D",
                            distance: 150,
                            enable: true,
                            opacity: 0.2,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 40,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 3 },
                        },
                    },
                    detectRetina: true,
                }}
                className="absolute inset-0 -z-10"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="glass-panel p-8 md:p-12 text-center max-w-md w-full"
            >
                <h1 className="text-3xl md:text-4xl font-handwriting text-midnight-gold mb-8 text-glow-gold">
                    Love Lock
                </h1>

                <p className="text-lg text-gray-200 mb-6 font-sans">
                    Where was our first date?
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <motion.input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your answer..."
                        className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-midnight-pink transition-all text-center text-lg"
                        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />

                    <motion.button
                        type="submit"
                        className="px-6 py-3 bg-midnight-pink text-white font-bold rounded-lg shadow-glow-pink hover:bg-pink-500 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Unlock My Heart
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default LockScreen;
