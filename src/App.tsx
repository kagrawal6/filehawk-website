import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DocumentationPage from './pages/DocumentationPage'
import { ThemeProvider } from './contexts/ThemeContext'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/documentation/*" element={<DocumentationPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
