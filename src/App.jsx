import { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Music, VolumeX } from 'lucide-react'
import LockScreen from './components/LockScreen'
import GravityWorld from './components/GravityWorld'
import CardDeck from './components/CardDeck'
import ConstellationGallery from './components/ConstellationGallery'
import FutureWish from './components/FutureWish'
import LetterPage from './components/LetterPage'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/Resources/Hua Hain Aaj Pehli Baar From _Sanam Re_.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.5

    const playAudio = async () => {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.log("Autoplay blocked:", error)
        setIsPlaying(false)
      }
    }

    playAudio()

    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        playAudio()
      }
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }

    window.addEventListener('click', handleInteraction)
    window.addEventListener('keydown', handleInteraction)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(e => console.error("Play failed:", e))
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <Router>
      <button
        onClick={toggleMusic}
        className="fixed bottom-4 left-4 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all shadow-lg group"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <Music className="w-6 h-6 animate-pulse text-pastel-pink" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-400" />
        )}
        <span className="absolute left-full ml-2 px-2 py-1 bg-black/50 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {isPlaying ? "Pause Music" : "Play Music"}
        </span>
      </button>

      <Routes>
        <Route path="/" element={<LockScreen />} />
        <Route path="/gravity" element={<GravityWorld />} />
        <Route path="/cards" element={<CardDeck />} />
        <Route path="/constellation" element={<ConstellationGallery />} />
        <Route path="/wish" element={<FutureWish />} />
        <Route path="/letter" element={<LetterPage />} />
      </Routes>
    </Router>
  )
}

export default App

