import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConstellationGallery = ({ onNext }) => {
    const [selectedId, setSelectedId] = useState(null);

    // Placeholder data - scattered positions
    const photos = [
        { id: 1, x: 20, y: 30, caption: "First Spark" },
        { id: 2, x: 70, y: 20, caption: "Adventure Time" },
        { id: 3, x: 40, y: 60, caption: "Cozy Vibes" },
        { id: 4, x: 80, y: 70, caption: "Unforgettable" },
        { id: 5, x: 30, y: 80, caption: "Us Against World" },
    ];

    return (
        <div className="relative w-full h-screen overflow-hidden bg-midnight-slate">
            {/* Infinite Sky Container (Simulated with fixed size for now) */}
            <div className="absolute inset-0 w-full h-full overflow-auto">
                <div className="relative w-[150%] h-[150%] min-w-[1000px] min-h-[800px]">

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                        <polyline
                            points={photos.map(p => `${p.x}%,${p.y}%`).join(' ')}
                            fill="none"
                            stroke="#FCD34D"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                        />
                    </svg>

                    {/* Stars / Photos */}
                    {photos.map((photo) => (
                        <motion.div
                            key={photo.id}
                            layoutId={`photo-${photo.id}`}
                            onClick={() => setSelectedId(photo.id)}
                            className="absolute w-16 h-16 bg-white rounded-full shadow-glow-white cursor-pointer hover:scale-125 transition-transform flex items-center justify-center border-2 border-midnight-gold z-10"
                            style={{ left: `${photo.x}%`, top: `${photo.y}%` }}
                            whileHover={{ scale: 1.2 }}
                        >
                            <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                                {/* Placeholder Image */}
                                <img src={`https://picsum.photos/seed/${photo.id}/100`} alt="" className="w-full h-full object-cover" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Expanded View */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        layoutId={`photo-${selectedId}`}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            className="bg-white p-4 rounded-xl max-w-lg w-full shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                                <img src={`https://picsum.photos/seed/${selectedId}/600/400`} alt="" className="w-full h-full object-cover" />
                            </div>
                            <button
                                onClick={() => setSelectedId(null)}
                                className="mt-4 w-full py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
                <button
                    onClick={onNext}
                    className="pointer-events-auto px-8 py-3 bg-midnight-pink text-white font-bold rounded-full shadow-glow-pink hover:bg-pink-600 transition-all"
                >
                    Make a Wish →
                </button>
            </div>

            <div className="absolute top-8 left-8 pointer-events-none">
                <h2 className="text-3xl font-handwriting text-white text-glow-white">
                    Our Constellation
                </h2>
                <p className="text-sm text-gray-300">Drag to explore the sky • Click stars to view</p>
            </div>
        </div>
    );
};

export default ConstellationGallery;
