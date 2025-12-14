import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LockScreen from './components/LockScreen';
import GravityWorld from './components/GravityWorld';
import CardDeck from './components/CardDeck';
import ConstellationGallery from './components/ConstellationGallery';
import FutureWish from './components/FutureWish';

function App() {
  const [step, setStep] = useState(1); // 1: Lock, 2: Gravity, 3: Cards, 4: Gallery, 5: Wish

  const nextStep = () => setStep(prev => prev + 1);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-midnight-slate to-midnight-violet text-white font-sans selection:bg-midnight-pink selection:text-white">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <LockScreen key="lock" onUnlock={nextStep} />
        )}

        {step === 2 && (
          <GravityWorld key="gravity" onNext={nextStep} />
        )}

        {step === 3 && (
          <CardDeck key="cards" onNext={nextStep} />
        )}

        {step === 4 && (
          <ConstellationGallery key="gallery" onNext={nextStep} />
        )}

        {step === 5 && (
          <FutureWish key="wish" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
