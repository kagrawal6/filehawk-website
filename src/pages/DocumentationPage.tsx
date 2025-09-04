import React, { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Book,
  Zap,
  Brain,
  GitBranch,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Download
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'


import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { HawkProvider } from '../components/ui/HawkProvider'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import StickyTableOfContents from '../components/ui/StickyTableOfContents'

// Import new documentation section components
import FeatureCapabilitiesSection from '../components/docs/FeatureCapabilitiesSection'
import AIAlgorithmsSection from '../components/docs/AIAlgorithmsSection'

interface DocSection {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  path: string
  component: React.ComponentType
  featured?: boolean
  category: 'getting-started' | 'core' | 'advanced' | 'reference'
}

const docSections: DocSection[] = [
  {
    id: 'features',
    title: 'Features & Capabilities',
    description: 'Comprehensive overview of FileHawk\'s semantic search capabilities, dual-mode search, GitHub integration, and intelligent file management',
    icon: Zap,
    path: '/documentation/features',
    component: FeatureCapabilitiesSection,
    featured: true,
    category: 'core'
  },
  {
    id: 'algorithms',
    title: 'AI Algorithms & Math',
    description: 'Deep dive into FileHawk\'s AI algorithms with interactive visualizations, mathematical formulas, and technical implementations',
    icon: Brain,
    path: '/documentation/algorithms',
    component: AIAlgorithmsSection,
    featured: true,
    category: 'core'
  }
]

const DocumentationPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()

  // Get current section from URL
  const getCurrentSection = () => {
    const path = location.pathname
    return docSections.find(s => s.path === path) || docSections[0]
  }

  const currentSection = getCurrentSection()
  const isHomePage = location.pathname === '/documentation' || location.pathname === '/documentation/'

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    if (isHomePage) {
      return [{ label: 'Documentation', path: '/documentation' }]
    }
    
    return [
      { label: 'Documentation', path: '/documentation' },
      { 
        label: currentSection.title, 
        path: currentSection.path, 
        icon: currentSection.icon 
      }
    ]
  }

  // Generate table of contents sections (this would be expanded based on current section)
  const getTocSections = () => {
    // For now, return empty array. Each section component could provide its own TOC
    return []
  }

  return (
    <HawkProvider>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-primary)' }}>
        <Header />

      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0 lg:sticky lg:top-0 lg:h-screen
          ${sidebarCollapsed ? 'w-16' : 'w-80'}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex h-full flex-col overflow-y-auto" style={{ backgroundColor: 'var(--bg-elevated)', borderRight: '1px solid var(--border-subtle)' }}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center space-x-3">
                <Book className="h-6 w-6 text-brand-gold-400" />
                {!sidebarCollapsed && (
                  <h2 className="text-lg font-semibold" style={{ color: 'var(--fg-primary)' }}>
                    Documentation
                  </h2>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {/* Collapse Button (Desktop Only) */}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="hidden lg:block p-2 rounded-md hover:bg-gray-700 transition-colors"
                  title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="h-4 w-4 text-brand-gold-400" />
                  ) : (
                    <ChevronLeft className="h-4 w-4 text-brand-gold-400" />
                  )}
                </button>
                {/* Mobile Close Button */}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <X className="h-5 w-5" style={{ color: 'var(--fg-secondary)' }} />
                </button>
              </div>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
              {/* Documentation Sections */}
              <div>
                {!sidebarCollapsed && (
                  <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--fg-muted)' }}>
                    TECHNICAL DOCUMENTATION
                  </h3>
                )}
                <div className="space-y-2">
                  {docSections.map((section) => (
                    <Link
                      key={section.id}
                      to={section.path}
                      className={`
                        flex items-center ${sidebarCollapsed ? 'px-2 py-3 justify-center' : 'px-3 py-3'} text-sm rounded-lg transition-all duration-200 group relative
                        ${currentSection.id === section.id 
                          ? 'bg-gradient-to-r from-brand-gold-500/20 to-transparent text-brand-gold-300 border-r-2 border-brand-gold-500' 
                          : 'hover:bg-gray-700/50'
                        }
                      `}
                      style={{ color: currentSection.id === section.id ? 'var(--accent-solid)' : 'var(--fg-secondary)' }}
                    >
                      <section.icon className={`h-5 w-5 group-hover:text-brand-gold-400 transition-colors ${sidebarCollapsed ? '' : 'mr-3'}`} />
                      
                      {sidebarCollapsed ? (
                        /* Tooltip for collapsed state */
                        <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg border border-gray-600">
                          <div className="font-medium">{section.title}</div>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{section.title}</div>
                          </div>
                          <ChevronRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* External Links */}
              <div>
                {!sidebarCollapsed && (
                  <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--fg-muted)' }}>
                    RESOURCES
                  </h3>
                )}
                <div className="space-y-2">
                  <a
                    href="https://github.com/kagrawal6/filehawk-website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${sidebarCollapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2'} text-sm rounded-lg transition-colors hover:bg-gray-700/50 group relative`}
                    style={{ color: 'var(--fg-secondary)' }}
                  >
                    <GitBranch className={`h-4 w-4 group-hover:text-brand-gold-400 transition-colors ${sidebarCollapsed ? '' : 'mr-3'}`} />
                    {sidebarCollapsed ? (
                      <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg border border-gray-600">
                        GitHub Repository
                      </div>
                    ) : (
                      <>
                        GitHub Repository
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </>
                    )}
                  </a>
                  <a
                    href="#download"
                    className={`flex items-center ${sidebarCollapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2'} text-sm rounded-lg transition-colors hover:bg-gray-700/50 group relative`}
                    style={{ color: 'var(--fg-secondary)' }}
                  >
                    <Download className={`h-4 w-4 group-hover:text-brand-gold-400 transition-colors ${sidebarCollapsed ? '' : 'mr-3'}`} />
                    {sidebarCollapsed ? (
                      <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg border border-gray-600">
                        Download FileHawk
                      </div>
                    ) : (
                      'Download FileHawk'
                    )}
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center h-16 px-4 border-b sticky top-0 z-30" 
               style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <Menu className="h-5 w-5" style={{ color: 'var(--fg-secondary)' }} />
            </button>
            <h1 className="ml-3 text-lg font-semibold truncate" style={{ color: 'var(--fg-primary)' }}>
              {isHomePage ? 'Documentation' : currentSection.title}
            </h1>
          </div>

          {/* Breadcrumbs */}
          {!isHomePage && (
            <div className="sticky top-16 lg:top-0 z-20 border-b" 
                 style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className="px-4 py-3">
                <Breadcrumbs items={getBreadcrumbs()} />
              </div>
            </div>
          )}

          {/* Table of Contents (when not on home page) */}
          {!isHomePage && (
            <StickyTableOfContents 
              sections={getTocSections()}
              onSectionChange={() => {
                // Handle section change if needed
              }}
            />
          )}

          {/* Content Area */}
          <div className="min-h-screen">
            {isHomePage ? (
              <DocumentationHome sections={docSections} />
            ) : (
              <Routes>
                {docSections.map((section) => (
                  <Route 
                    key={section.id} 
                    path={section.path.replace('/documentation', '')} 
                    element={<section.component />} 
                  />
                ))}
              </Routes>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}


        <Footer />
      </div>
    </HawkProvider>
  )
}

// Documentation Home Page
const DocumentationHome: React.FC<{ sections: DocSection[] }> = ({ sections }) => {
  const isAnimated = useScrollAnimation()
  const featuredSections = sections.filter(s => s.featured)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6" 
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <Book className="h-5 w-5 mr-2 text-brand-gold-400" />
          <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
            Complete Technical Documentation
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          <span style={{ color: 'var(--fg-primary)' }}>FileHawk</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            Documentation
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8" style={{ color: 'var(--fg-secondary)' }}>
          Comprehensive technical documentation for FileHawk's AI-powered semantic search platform. 
          Explore our <strong>Features & Capabilities</strong> for business insights and <strong>AI Algorithms & Math</strong> for deep technical understanding with 
          <strong> interactive visualizations, algorithm playgrounds, and mathematical demonstrations</strong>.
        </p>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {[
            { metric: "95.7%", label: "Semantic Accuracy", description: "Natural language understanding" },
            { metric: "<50ms", label: "Search Latency", description: "Sub-second response times" },
            { metric: "25+", label: "API Endpoints", description: "Complete REST interface" },
            { metric: "1M+", label: "Files Supported", description: "Enterprise-scale collections" }
          ].map((stat, index) => (
            <motion.div 
              key={stat.metric}
              className="text-center p-4 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            >
              <div className="text-2xl font-bold text-brand-gold-400 mb-1">
                {stat.metric}
              </div>
              <div className="font-semibold mb-1" style={{ color: 'var(--fg-primary)' }}>
                {stat.label}
              </div>
              <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Documentation */}
      <motion.div 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--fg-primary)' }}>
          Quick Start Guide
        </h2>
        <p className="text-center mb-12 max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Get up and running with FileHawk's core features. These essential guides cover everything 
          from system architecture to advanced AI algorithms.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {featuredSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            >
              <Link 
                to={section.path}
                className="block p-8 rounded-xl border transition-all duration-300 hover:border-brand-gold-500/40 hover:shadow-2xl hover:shadow-brand-gold-500/20 hover:-translate-y-1 group h-full"
                style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-center mb-6">
                  <div className="p-4 rounded-xl bg-brand-gold-500/20 text-brand-gold-400 group-hover:bg-brand-gold-500/30 transition-colors">
                    <section.icon className="h-8 w-8" />
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-semibold group-hover:text-brand-gold-300 transition-colors mb-2" style={{ color: 'var(--fg-primary)' }}>
                      {section.title}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-sm text-brand-gold-400 font-medium">
                        {section.category.replace('-', ' ').toUpperCase()}
                      </span>
                      <ChevronRight className="h-4 w-4 ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
                <p style={{ color: 'var(--fg-secondary)' }} className="group-hover:text-gray-300 transition-colors leading-relaxed">
                  {section.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* All Documentation */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--fg-primary)' }}>
          📚 Complete Documentation
        </h2>
        <p className="text-center mb-12 max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Comprehensive reference documentation covering every aspect of the FileHawk platform, 
          from installation to advanced configuration and development.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.filter(s => !s.featured).map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.0 + index * 0.05 }}
            >
              <Link 
                to={section.path}
                className="block p-6 rounded-xl border transition-all duration-300 hover:border-brand-gold-500/40 hover:shadow-lg hover:-translate-y-1 group h-full"
                style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-gray-700 text-gray-300 group-hover:bg-brand-gold-500/20 group-hover:text-brand-gold-400 transition-colors">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold group-hover:text-brand-gold-300 transition-colors mb-1" style={{ color: 'var(--fg-primary)' }}>
                      {section.title}
                    </h3>
                    <span className="text-xs font-medium text-brand-gold-400 opacity-75">
                      {section.category.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: 'var(--fg-secondary)' }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
                  {section.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Ready to Experience AI-Powered Search?
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            Transform your document discovery with enterprise-grade semantic intelligence that understands human intent and delivers precise results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#download"
              className="px-8 py-4 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-gold-500/25 transition-all duration-300 flex items-center justify-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Download FileHawk
            </a>
            <a 
              href="https://github.com/kagrawal6/filehawk-website"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-brand-gold-500 text-brand-gold-400 font-semibold rounded-lg hover:bg-brand-gold-500/10 transition-all duration-300 flex items-center justify-center"
            >
              <GitBranch className="mr-2 h-5 w-5" />
              View Source Code
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DocumentationPage
