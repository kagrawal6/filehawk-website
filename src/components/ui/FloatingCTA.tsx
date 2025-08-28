import React, { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'
import GoldButton from './GoldButton'

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const heroHeight = window.innerHeight
      
      // Show CTA after scrolling past hero section
      if (scrolled > heroHeight * 0.8 && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  if (isDismissed) return null

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
    }`}>
      <div className="relative group">
        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ 
            backgroundColor: 'var(--bg-elevated)', 
            borderColor: 'var(--border-subtle)',
            color: 'var(--fg-muted)'
          }}
        >
          <X className="h-3 w-3" />
        </button>

        {/* CTA Button */}
        <GoldButton
          variant="solid"
          size="lg"
          href="#download"
          className="shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
        >
          <Download className="mr-2 h-5 w-5" />
          Download FileHawk
        </GoldButton>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-xl animate-ping opacity-20"
             style={{ backgroundColor: 'var(--accent-solid)' }} />
      </div>
    </div>
  )
}

export default FloatingCTA
