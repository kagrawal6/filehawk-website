import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DocumentationPage from './pages/DocumentationPage'
import { ThemeProvider } from './contexts/ThemeContext'
import ScrollToTop from './components/ScrollToTop'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/documentation/*" element={<DocumentationPage />} />
      </Routes>
      <Analytics />
    </ThemeProvider>
  )
}

export default App
