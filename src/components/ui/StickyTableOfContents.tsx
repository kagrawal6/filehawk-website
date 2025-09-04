import React, { useState, useEffect } from 'react'
import { Hash, ArrowUp, Menu, X } from 'lucide-react'

interface TocSection {
  id: string
  title: string
  level: number
  isActive?: boolean
}

interface StickyTableOfContentsProps {
  sections: TocSection[]
  onSectionChange?: (sectionId: string) => void
  className?: string
}

export const StickyTableOfContents: React.FC<StickyTableOfContentsProps> = ({
  sections,
  onSectionChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight
      setScrollProgress(Math.min(progress * 100, 100))

      // Find active section
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      })).filter(item => item.element)

      let current = ''
      for (const { id, element } of sectionElements) {
        const rect = element!.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 0) {
          current = id
        }
      }
      
      if (current !== activeSection) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections, activeSection])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      onSectionChange?.(sectionId)
      setIsOpen(false)
    }
  }

  if (sections.length === 0) return null

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-20 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full border shadow-lg transition-all duration-300 hover:shadow-xl"
          style={{ 
            backgroundColor: 'var(--bg-elevated)', 
            borderColor: 'var(--border-subtle)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Table of Contents */}
      <div className={`
        fixed top-20 right-4 z-40 w-72 max-h-[calc(100vh-6rem)] 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        ${className}
      `}>
        <div 
          className="p-6 rounded-xl border shadow-lg overflow-y-auto max-h-full"
          style={{ 
            backgroundColor: 'var(--bg-elevated)', 
            borderColor: 'var(--border-subtle)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Hash className="h-5 w-5 mr-2 text-brand-gold-400" />
              <h3 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
                On This Page
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 rounded hover:bg-gray-700 transition-colors"
            >
              <X className="h-4 w-4" style={{ color: 'var(--fg-secondary)' }} />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs mb-2" style={{ color: 'var(--fg-muted)' }}>
              <span>Reading Progress</span>
              <span>{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full rounded-full h-1.5" style={{ backgroundColor: 'var(--bg-muted)' }}>
              <div 
                className="bg-brand-gold-400 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 mb-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center text-sm
                  ${activeSection === section.id
                    ? 'bg-brand-gold-500/20 text-brand-gold-300 border-l-2 border-brand-gold-400' 
                    : 'hover:bg-gray-700/50'
                  }
                `}
                style={{ 
                  paddingLeft: `${0.75 + (section.level - 1) * 0.75}rem`,
                  color: activeSection === section.id ? 'var(--brand-gold-300)' : 'var(--fg-secondary)'
                }}
              >
                <Hash className="h-3 w-3 mr-2 opacity-50" />
                <span className="font-medium truncate">{section.title}</span>
              </button>
            ))}
          </nav>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-full px-4 py-2 text-sm rounded-lg border border-brand-gold-500 text-brand-gold-400 hover:bg-brand-gold-500/10 transition-all duration-300 flex items-center justify-center"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Back to Top
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default StickyTableOfContents