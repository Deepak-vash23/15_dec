import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LockScreen from './components/LockScreen'
import GravityWorld from './components/GravityWorld'
import CardDeck from './components/CardDeck'
import ConstellationGallery from './components/ConstellationGallery'
import FutureWish from './components/FutureWish'
import LetterPage from './components/LetterPage'

function App() {
  return (
    <Router>
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

