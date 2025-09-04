import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronRight, 
  Book, 
  Hash,
  ArrowUp,
  Menu,
  X
} from 'lucide-react'

interface NavSection {
  id: string
  title: string
  level: number
  isActive?: boolean
}

interface DocumentationNavigationProps {
  sections: NavSection[]
  onSectionChange?: (sectionId: string) => void
}

export const TableOfContents: React.FC<DocumentationNavigationProps> = ({
  sections,
  onSectionChange
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight
      setScrollProgress(Math.min(progress * 100, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Mobile TOC Toggle */}
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
        fixed top-20 right-4 z-40 w-80 max-h-[calc(100vh-6rem)] overflow-y-auto
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div 
          className="p-6 rounded-xl border shadow-lg"
          style={{ 
            backgroundColor: 'var(--bg-elevated)', 
            borderColor: 'var(--border-subtle)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Book className="h-5 w-5 mr-2 text-brand-gold-400" />
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

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs mb-2" style={{ color: 'var(--fg-muted)' }}>
              <span>Reading Progress</span>
              <span>{Math.round(scrollProgress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-brand-gold-400 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  onSectionChange?.(section.id)
                  setIsOpen(false)
                }}
                className={`
                  w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center
                  ${section.isActive 
                    ? 'bg-brand-gold-500/20 text-brand-gold-300 border-l-2 border-brand-gold-400' 
                    : 'hover:bg-gray-700/50'
                  }
                `}
                style={{ 
                  paddingLeft: `${0.75 + (section.level - 1) * 0.75}rem`,
                  color: section.isActive ? 'var(--brand-gold-300)' : 'var(--fg-secondary)'
                }}
              >
                <Hash className="h-3 w-3 mr-2 opacity-50" />
                <span className="text-sm font-medium truncate">{section.title}</span>
                {section.isActive && (
                  <ChevronRight className="h-3 w-3 ml-auto text-brand-gold-400" />
                )}
              </button>
            ))}
          </nav>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-full mt-6 px-4 py-2 text-sm rounded-lg border border-brand-gold-500 text-brand-gold-400 hover:bg-brand-gold-500/10 transition-all duration-300 flex items-center justify-center"
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

// Enhanced Section Container with consistent styling
export const DocumentationSection: React.FC<{
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}> = ({ id, title, subtitle, children, className = '' }) => {
  return (
    <section id={id} className={`mb-16 scroll-mt-20 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg max-w-4xl" style={{ color: 'var(--fg-secondary)' }}>
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </motion.div>
    </section>
  )
}

// Tabbed Content Component for organizing complex sections
export const TabbedContent: React.FC<{
  tabs: Array<{
    id: string
    label: string
    icon?: React.ComponentType<{ className?: string }>
    content: React.ReactNode
  }>
  defaultTab?: string
}> = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '')

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b mb-8" style={{ borderColor: 'var(--border-subtle)' }}>
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-300
                ${activeTab === tab.id
                  ? 'border-brand-gold-400 text-brand-gold-400'
                  : 'border-transparent hover:text-brand-gold-300 hover:border-brand-gold-300/50'
                }
              `}
              style={{ 
                color: activeTab === tab.id ? 'var(--brand-gold-400)' : 'var(--fg-secondary)'
              }}
            >
              {tab.icon && <tab.icon className="h-4 w-4 mr-2" />}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`
              transition-all duration-300 
              ${activeTab === tab.id ? 'opacity-100 block' : 'opacity-0 hidden'}
            `}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: activeTab === tab.id ? 1 : 0, y: activeTab === tab.id ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              {tab.content}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Expandable Content for progressive disclosure
export const ExpandableSection: React.FC<{
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
  level?: 'info' | 'warning' | 'success'
}> = ({ title, children, defaultExpanded = false, level = 'info' }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const levelColors = {
    info: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    warning: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    success: 'text-green-400 bg-green-500/10 border-green-500/20'
  }

  return (
    <div className={`border rounded-lg ${levelColors[level]}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold">{title}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 pt-2">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export default {
  TableOfContents,
  DocumentationSection,
  TabbedContent,
  ExpandableSection
}
