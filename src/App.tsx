import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DocumentationPage from './pages/DocumentationPage'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/documentation/*" element={<DocumentationPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
