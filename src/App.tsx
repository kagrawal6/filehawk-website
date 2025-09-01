import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TechnicalPage from './pages/TechnicalPage'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/technical" element={<TechnicalPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
