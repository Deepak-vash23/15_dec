import React from 'react';
import { motion } from 'framer-motion';
import PhotoCard from './PhotoCard';

const MemoryLane = ({ onNext }) => {
    // Placeholder data - REPLACE with your actual photos
    const memories = [
        {
            id: 1,
            src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop',
            caption: 'Our First Date',
            rotation: -3
        },
        {
            id: 2,
            src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600&auto=format&fit=crop',
            caption: 'That Weekend Trip',
            rotation: 2
        },
        {
            id: 3,
            src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop',
            caption: 'Coffee Mornings',
            rotation: -1
        },
        {
            id: 4,
            src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600&auto=format&fit=crop',
            caption: 'Just Us',
            rotation: 4
        },
    ];

    return (
        <motion.div
            className="relative z-10 min-h-screen flex flex-col items-center py-20 px-4 overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h2 className="text-5xl font-handwriting text-pastel-lavender mb-12 drop-shadow-sm">
                Our Beautiful Memories
            </h2>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-6xl mb-16">
                {memories.map((memory) => (
                    <PhotoCard
                        key={memory.id}
                        imageSrc={memory.src}
                        caption={memory.caption}
                        rotation={memory.rotation}
                    />
                ))}
            </div>

            <motion.button
                onClick={onNext}
                className="px-8 py-3 bg-pastel-pink text-white font-bold rounded-full shadow-lg hover:bg-pastel-lavender transition-all duration-300 font-sans"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                One Last Surprise...
            </motion.button>
        </motion.div>
    );
};

export default MemoryLane;
