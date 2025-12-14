import React from 'react';
import { motion } from 'framer-motion';

const LandingPage = ({ onRelease }) => {
    return (
        <motion.div
            className="relative z-10 flex flex-col items-center justify-center min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
        >
            {/* Jar SVG */}
            <div className="relative w-[300px] h-[400px] mb-8">
                <svg
                    viewBox="0 0 300 400"
                    className="w-full h-full drop-shadow-xl"
                >
                    {/* Jar Body */}
                    <path
                        d="M 50 20 L 250 20 L 270 50 L 270 380 Q 270 400 250 400 L 50 400 Q 30 400 30 380 L 30 50 L 50 20 Z"
                        fill="rgba(255, 255, 255, 0.2)"
                        stroke="rgba(255, 255, 255, 0.6)"
                        strokeWidth="4"
                    />
                    {/* Jar Lid (Optional, maybe it's open or corked) */}
                    <rect x="40" y="0" width="220" height="20" rx="5" fill="#C0C0C0" opacity="0.8" />

                    {/* Reflections */}
                    <path d="M 40 60 Q 50 200 40 340" stroke="rgba(255,255,255,0.4)" strokeWidth="3" fill="none" />
                </svg>
            </div>

            <motion.button
                onClick={onRelease}
                className="px-8 py-3 bg-white/80 backdrop-blur-sm text-pastel-pink font-bold rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all duration-300 text-xl font-handwriting"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Release the Butterflies
            </motion.button>
        </motion.div>
    );
};

export default LandingPage;
