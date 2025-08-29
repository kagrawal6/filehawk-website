import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TechnicalPage from './pages/TechnicalPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/technical" element={<TechnicalPage />} />
    </Routes>
  )
}

export default App
