import React from 'react'
import Header from '../components/Header'
import HeroV2 from '../components/HeroV2'
import CapabilityShowcase from '../components/CapabilityShowcase'
import HowItWorks from '../components/HowItWorks'
import Download from '../components/Download'
import Footer from '../components/Footer'
import ScrollIndicator from '../components/ui/ScrollIndicator'
import FloatingCTA from '../components/ui/FloatingCTA'
import { HawkProvider } from '../components/ui/HawkProvider'

const HomePage: React.FC = () => {
  return (
    <HawkProvider>
      <div className="min-h-screen transition-colors duration-300 page-gradient" style={{ color: 'var(--fg-primary)' }}>
        <ScrollIndicator />
        <Header />
        <main>
          <HeroV2 />
          <CapabilityShowcase />
          <HowItWorks />
          <Download />
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </HawkProvider>
  )
}

export default HomePage
