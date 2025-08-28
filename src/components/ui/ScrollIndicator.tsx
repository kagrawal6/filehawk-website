import React, { useState, useEffect } from 'react'

const ScrollIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = (scrolled / scrollHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-800/30">
      <div 
        className="h-full transition-all duration-150 ease-out"
        style={{ 
          width: `${scrollProgress}%`,
          backgroundColor: 'var(--accent-solid)'
        }}
      />
    </div>
  )
}

export default ScrollIndicator
