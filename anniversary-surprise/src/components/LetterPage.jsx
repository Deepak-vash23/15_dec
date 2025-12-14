import React from 'react';
import { motion } from 'framer-motion';

const LetterPage = ({ onNext }) => {
    return (
        <motion.div
            className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.8 } }}
            transition={{ duration: 1, delay: 0.5 }}
        >
            <div className="max-w-2xl bg-white/60 backdrop-blur-md p-10 rounded-lg shadow-xl border border-white/50">
                <h1 className="text-4xl md:text-6xl font-handwriting text-pastel-pink mb-8">
                    My Dearest Love,
                </h1>
                <p className="text-xl md:text-2xl font-handwriting text-gray-700 leading-relaxed mb-6">
                    Happy 4 Months Anniversary!
                </p>
                <p className="text-lg md:text-xl font-sans text-gray-600 leading-relaxed mb-8">
                    These past four months have been the most magical time of my life.
                    Every moment with you feels like a beautiful dream I never want to wake up from.
                    You bring so much joy, laughter, and love into my world.
                </p>
                <p className="text-lg md:text-xl font-sans text-gray-600 leading-relaxed mb-10">
                    I wanted to capture a little bit of that magic for you today.
                </p>

                <motion.button
                    onClick={onNext}
                    className="px-8 py-3 bg-pastel-lavender text-white font-bold rounded-full shadow-md hover:bg-pastel-pink transition-colors duration-300 font-sans"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Walk Down Memory Lane
                </motion.button>
            </div>
        </motion.div>
    );
};

export default LetterPage;
