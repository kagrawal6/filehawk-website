import React from 'react'
import Header from './components/Header'
import HeroV2 from './components/HeroV2'
import Problem from './components/Problem'
import SolutionDemo from './components/SolutionDemo'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Download from './components/Download'
import Footer from './components/Footer'
import { HawkProvider } from './components/ui/HawkProvider'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <HawkProvider>
        <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-primary)' }}>
          <Header />
          <main>
            <HeroV2 />
            <Problem />
            <SolutionDemo />
            <HowItWorks />
            <Features />
            <Download />
          </main>
          <Footer />
        </div>
      </HawkProvider>
    </ThemeProvider>
  )
}

export default App
