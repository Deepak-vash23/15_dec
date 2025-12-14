import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FinalSurprise = () => {
    const [name, setName] = useState("My Love"); // Variable for her name

    return (
        <motion.div
            className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="mb-8"
            >
                <Heart className="w-32 h-32 text-red-400 fill-current drop-shadow-lg" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-handwriting text-pastel-pink mb-6">
                Happy 4 Months, {name}!
            </h1>

            <p className="text-xl font-sans text-gray-600 max-w-md mx-auto">
                Here's to many more butterflies, memories, and months together.
            </p>
        </motion.div>
    );
};

export default FinalSurprise;
