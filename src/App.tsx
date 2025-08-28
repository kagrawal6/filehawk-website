import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Problem from './components/Problem'
import SolutionDemo from './components/SolutionDemo'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Download from './components/Download'
import Footer from './components/Footer'
import { HawkProvider } from './components/ui/HawkProvider'

function App() {
  return (
    <HawkProvider>
      <div className="min-h-screen bg-brand-onyx text-gray-100">
        <Header />
        <main>
          <Hero />
          <Problem />
          <SolutionDemo />
          <HowItWorks />
          <Features />
          <Download />
        </main>
        <Footer />
      </div>
    </HawkProvider>
  )
}

export default App
