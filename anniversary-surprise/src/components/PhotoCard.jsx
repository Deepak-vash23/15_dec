import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const PhotoCard = ({ imageSrc, caption, rotation }) => {
    return (
        <motion.div
            className="relative bg-white p-4 pb-12 shadow-lg rounded-sm w-64 md:w-72 flex-shrink-0 transform transition-all duration-500 hover:z-20 hover:scale-110"
            style={{ rotate: rotation }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
        >
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-4 relative group">
                <img
                    src={imageSrc}
                    alt={caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Butterfly Icon on Hover */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Simple butterfly shape using Lucide Heart for now, or SVG */}
                    <Heart className="text-pastel-pink fill-current w-6 h-6 animate-bounce" />
                </div>
            </div>
            <p className="font-handwriting text-xl text-center text-gray-700">{caption}</p>
        </motion.div>
    );
};

export default PhotoCard;
