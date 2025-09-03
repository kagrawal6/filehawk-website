import React, { useState, useEffect } from 'react'
import { Search, ArrowRight, Play, Zap, Shield, FileText, Brain } from 'lucide-react'
import GoldButton from './ui/GoldButton'
import { useHawk } from './ui/HawkProvider'

// Sample search queries and results for demonstration
const searchScenarios = [
  {
    query: "Find the contract with ABC Corp about data processing",
    results: [
      { name: 'abc-corp-contract-2024.pdf', match: '95%', type: 'PDF', snippet: 'Data processing agreement between...' },
      { name: 'data-processing-agreement.docx', match: '87%', type: 'DOCX', snippet: 'GDPR compliance and data handling...' },
      { name: 'abc-negotiations-email.eml', match: '82%', type: 'EMAIL', snippet: 'Re: Data processing terms discussion...' }
    ]
  },
  {
    query: "Python function that handles user authentication",
    results: [
      { name: 'auth_service.py', match: '98%', type: 'PY', snippet: 'def authenticate_user(username, password):' },
      { name: 'user_management.py', match: '91%', type: 'PY', snippet: 'class UserAuthenticator:' },
      { name: 'login_utils.js', match: '85%', type: 'JS', snippet: 'function validateUserCredentials() {' }
    ]
  },
  {
    query: "Meeting notes from last week's marketing review",
    results: [
      { name: 'marketing-weekly-notes.md', match: '94%', type: 'MD', snippet: '# Marketing Review - Week of Nov 13th' },
      { name: 'q4-marketing-strategy.pptx', match: '88%', type: 'PPTX', snippet: 'Q4 Marketing Strategy Review' },
      { name: 'campaign-feedback.txt', match: '83%', type: 'TXT', snippet: 'Feedback from marketing team meeting...' }
    ]
  }
]

const HeroV2: React.FC = () => {
  const { setMood } = useHawk()
  const [isVisible, setIsVisible] = useState(false)
  const [currentScenario, setCurrentScenario] = useState(0)
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    // Auto-cycle through scenarios every 6 seconds
    const interval = setInterval(() => {
      setCurrentScenario((prev) => (prev + 1) % searchScenarios.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const handleScenarioClick = (index: number) => {
    if (index !== currentScenario) {
      setIsSearching(true)
      setShowResults(false)
      setTimeout(() => {
        setCurrentScenario(index)
        setShowResults(true)
        setIsSearching(false)
      }, 800)
    }
  }

  const scenario = searchScenarios[currentScenario]

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full border mb-8 backdrop-blur-sm transition-colors duration-300"
                 style={{ 
                   backgroundColor: 'var(--accent-soft)', 
                   borderColor: 'var(--border-subtle)',
                   color: 'var(--fg-secondary)'
                 }}>
              <Brain className="mr-2 h-4 w-4" style={{ color: 'var(--accent-solid)' }} />
              <span className="text-sm font-medium">AI-Powered Local Search</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-8">
              <span style={{ color: 'var(--fg-primary)' }}>Stop hunting for files.</span>
              <br />
              <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
                Start finding.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl leading-relaxed mb-12 max-w-2xl" style={{ color: 'var(--fg-secondary)' }}>
              Search your files by describing what you're looking for. 
              Find documents instantly using natural language—no more hunting through endless folders.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <GoldButton
                variant="solid"
                size="lg"
                href="#download"
                className="group shadow-2xl shadow-brand-gold-500/25 hover:shadow-brand-gold-500/40 transition-all duration-300"
                onClick={() => setMood('search')}
              >
                <Search className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Download FileHawk
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </GoldButton>
              
              <button className="group flex items-center justify-center px-8 py-4 rounded-xl border-2 font-semibold transition-all duration-300 hover:scale-105"
                      style={{ 
                        borderColor: 'var(--border-subtle)', 
                        color: 'var(--fg-primary)',
                        backgroundColor: 'transparent'
                      }}>
                <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Shield, label: '100% Local', sublabel: 'Privacy-first AI' },
                { icon: Zap, label: '<50ms', sublabel: 'Search latency' },
                { icon: FileText, label: '15+', sublabel: 'File formats' },
                { icon: Brain, label: 'Semantic', sublabel: 'Understanding' }
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                       style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 transition-colors duration-300"
                         style={{ backgroundColor: 'var(--accent-soft)' }}>
                      <Icon className="h-6 w-6" style={{ color: 'var(--accent-solid)' }} />
                    </div>
                    <div className="text-lg font-bold" style={{ color: 'var(--fg-primary)' }}>{item.label}</div>
                    <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>{item.sublabel}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column - FileHawk Screenshot Placeholder */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              {/* Main App Screenshot Placeholder */}
              <div className="relative rounded-3xl overflow-hidden card-shadow-lg border transition-all duration-300 hover:scale-[1.02]"
                   style={{ 
                     backgroundColor: 'var(--bg-elevated)', 
                     borderColor: 'var(--border-subtle)' 
                   }}>
                
                {/* App Window Chrome */}
                <div className="flex items-center px-6 py-4 border-b transition-colors duration-300"
                     style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
                      FileHawk - Semantic File Search
                    </span>
                  </div>
                </div>

                {/* Interactive Demo Controls */}
                <div className="p-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="flex space-x-2">
                    {searchScenarios.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleScenarioClick(index)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
                          currentScenario === index 
                            ? 'scale-105' 
                            : 'hover:scale-105 opacity-60 hover:opacity-80'
                        }`}
                        style={{
                          backgroundColor: currentScenario === index ? 'var(--accent-solid)' : 'var(--accent-soft)',
                          color: currentScenario === index ? 'var(--accent-contrast)' : 'var(--accent-solid)'
                        }}
                      >
                        Demo {index + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* App Content Area */}
                <div className="p-8 space-y-6">
                  {/* Interactive Search Bar */}
                  <div className="relative">
                    <div className="flex items-center px-4 py-3 rounded-lg border transition-all duration-500"
                         style={{ 
                           backgroundColor: 'var(--bg-muted)', 
                           borderColor: isSearching ? 'var(--accent-solid)' : 'var(--border-subtle)' 
                         }}>
                      <Search className={`mr-3 h-5 w-5 transition-all duration-300 ${isSearching ? 'animate-pulse' : ''}`} 
                              style={{ color: 'var(--accent-solid)' }} />
                      <span className="text-base transition-all duration-500" 
                            style={{ color: 'var(--fg-primary)' }}>
                        "{scenario.query}"
                      </span>
                    </div>
                    {(isSearching || showResults) && (
                      <div className={`absolute -bottom-2 left-4 h-1 rounded-full transition-all duration-1000 ${
                        isSearching ? 'w-full animate-pulse' : 'w-32'
                      }`}
                           style={{ backgroundColor: 'var(--accent-solid)' }} />
                    )}
                  </div>

                  {/* Dynamic Search Results */}
                  {isSearching ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((index) => (
                        <div key={index} 
                             className="flex items-center justify-between p-4 rounded-lg border animate-pulse"
                             style={{ 
                               backgroundColor: 'var(--bg-app)', 
                               borderColor: 'var(--border-subtle)' 
                             }}>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg"
                                 style={{ backgroundColor: 'var(--accent-soft)' }} />
                            <div className="space-y-2">
                              <div className="h-4 w-32 rounded" style={{ backgroundColor: 'var(--accent-soft)' }} />
                              <div className="h-3 w-20 rounded" style={{ backgroundColor: 'var(--accent-soft)' }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : showResults && (
                    <div className="space-y-3">
                      {scenario.results.map((file, index) => (
                        <div key={index} 
                             className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-700 hover:scale-[1.01] ${
                               showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                             }`}
                             style={{ 
                               backgroundColor: 'var(--bg-app)', 
                               borderColor: 'var(--border-subtle)',
                               transitionDelay: `${index * 150}ms`
                             }}>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                                 style={{ 
                                   backgroundColor: 'var(--accent-soft)', 
                                   color: 'var(--accent-solid)' 
                                 }}>
                              {file.type}
                            </div>
                            <div>
                              <div className="font-medium" style={{ color: 'var(--fg-primary)' }}>{file.name}</div>
                              <div className="text-sm truncate max-w-xs" style={{ color: 'var(--fg-muted)' }}>
                                {file.snippet}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium" style={{ color: 'var(--accent-solid)' }}>
                            {file.match}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Interactive Status Bar */}
                  <div className="flex items-center justify-between pt-4 border-t transition-colors duration-300"
                       style={{ borderColor: 'var(--border-subtle)' }}>
                    <span className="text-sm transition-all duration-500" style={{ color: 'var(--fg-muted)' }}>
                      {isSearching ? 'Searching...' : `Searched ${(Math.random() * 400 + 100).toFixed(0)} files in ${(Math.random() * 30 + 25).toFixed(0)}ms`}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 bg-green-500 rounded-full ${isSearching ? 'animate-bounce' : 'animate-pulse'}`} />
                      <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                        {isSearching ? 'Processing...' : 'Local AI Processing'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full animate-bounce"
                   style={{ backgroundColor: 'var(--accent-solid)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroV2
