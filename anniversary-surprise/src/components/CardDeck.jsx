import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const Card = ({ text, onSwipe }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (event, info) => {
        if (Math.abs(info.offset.x) > 100) {
            onSwipe();
        }
    };

    return (
        <motion.div
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute w-72 h-96 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl flex items-center justify-center p-8 cursor-grab active:cursor-grabbing border-4 border-midnight-gold"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.05 }}
        >
            <p className="text-2xl font-handwriting text-midnight-violet text-center leading-relaxed">
                {text}
            </p>
        </motion.div>
    );
};

const CardDeck = ({ onNext }) => {
    const [cards, setCards] = useState([
        "Your smile lights up my darkest days.",
        "How you always support my dreams.",
        "The way you laugh at my bad jokes.",
        "Our late night conversations.",
        "Just being you."
    ]);

    const handleSwipe = () => {
        setCards((prev) => prev.slice(1));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
            <h2 className="text-4xl font-handwriting text-midnight-pink mb-12 text-glow-pink z-10">
                Why I Love You
            </h2>

            <div className="relative w-72 h-96 z-10">
                <AnimatePresence>
                    {cards.length > 0 ? (
                        cards.map((text, index) => (
                            index === 0 && (
                                <Card key={text} text={text} onSwipe={handleSwipe} />
                            )
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center h-full text-center"
                        >
                            <p className="text-2xl font-handwriting text-white mb-8">
                                And a million more reasons...
                            </p>
                            <button
                                onClick={onNext}
                                className="px-8 py-3 bg-midnight-gold text-midnight-slate font-bold rounded-full shadow-glow-gold hover:bg-yellow-400 transition-all"
                            >
                                See Our Stars
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Background Stack Effect */}
                {cards.length > 1 && (
                    <div className="absolute top-4 left-4 w-full h-full bg-white/10 rounded-2xl -z-10 border border-white/20" />
                )}
            </div>

            <p className="mt-12 text-gray-400 font-sans text-sm animate-pulse">
                Swipe cards to reveal more
            </p>
        </div>
    );
};

export default CardDeck;
