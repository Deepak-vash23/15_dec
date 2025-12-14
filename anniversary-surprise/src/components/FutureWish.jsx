import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const FutureWish = () => {
    const [wish, setWish] = useState('');
    const [sent, setSent] = useState(false);

    const handleSend = (e) => {
        e.preventDefault();
        if (wish.trim()) {
            setSent(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative z-10 p-4">
            <h2 className="text-4xl font-handwriting text-midnight-gold mb-8 text-glow-gold text-center">
                A Wish for Our Future
            </h2>

            <div className="relative w-64 h-80 mb-12 flex items-center justify-center">
                {/* Glowing Jar SVG */}
                <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-[0_0_30px_rgba(252,211,77,0.4)]">
                    <path
                        d="M 40 20 L 160 20 L 180 50 L 180 280 Q 180 300 160 300 L 40 300 Q 20 300 20 280 L 20 50 L 40 20 Z"
                        fill="rgba(255, 255, 255, 0.1)"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeWidth="2"
                    />
                    {/* Lid */}
                    <rect x="30" y="0" width="140" height="20" rx="5" fill="#FCD34D" opacity="0.8" />

                    {/* Particles inside if sent */}
                    {sent && (
                        <motion.circle
                            cx="100" cy="150" r="5" fill="#FCD34D"
                            animate={{
                                cx: [100, 120, 80, 100],
                                cy: [150, 100, 200, 150],
                                opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    )}
                </svg>

                {/* Success Message inside Jar */}
                {sent && (
                    <motion.div
                        className="absolute text-white font-handwriting text-xl text-center"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Wish Captured! ✨
                    </motion.div>
                )}
            </div>

            {!sent ? (
                <motion.form
                    onSubmit={handleSend}
                    className="w-full max-w-md relative"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.5, y: -100 }}
                >
                    <input
                        type="text"
                        value={wish}
                        onChange={(e) => setWish(e.target.value)}
                        placeholder="Type a wish for next month..."
                        className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-midnight-gold pr-16 backdrop-blur-sm"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 bottom-2 w-12 h-12 bg-midnight-gold rounded-full flex items-center justify-center text-midnight-slate hover:bg-yellow-400 transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </motion.form>
            ) : (
                <motion.p
                    className="text-gray-300 font-sans text-center max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Your wish is now a star in our galaxy. <br />
                    Happy 4 Months, my love. ❤️
                </motion.p>
            )}
        </div>
    );
};

export default FutureWish;
