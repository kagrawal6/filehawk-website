import React, { useState, useEffect } from 'react'
import { Search, ArrowRight, Play, Zap, Shield, FileText, Brain } from 'lucide-react'
import GoldButton from './ui/GoldButton'
import { useHawk } from './ui/HawkProvider'

const HeroV2: React.FC = () => {
  const { setMood } = useHawk()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-app)' }}>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_var(--accent-soft)_0%,_transparent_50%)]" />
        
        {/* Animated particles for light mode */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-brand-gold-400/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
              Revolutionary semantic search that understands <em>what you mean</em>, not just what you type. 
              Find any file by describing its content, purpose, or context—all processed locally with complete privacy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
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
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border transition-colors duration-300"
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

                {/* App Content Area */}
                <div className="p-8 space-y-6">
                  {/* Search Bar */}
                  <div className="relative">
                    <div className="flex items-center px-4 py-3 rounded-lg border transition-colors duration-300"
                         style={{ 
                           backgroundColor: 'var(--bg-muted)', 
                           borderColor: 'var(--border-subtle)' 
                         }}>
                      <Search className="mr-3 h-5 w-5" style={{ color: 'var(--accent-solid)' }} />
                      <span className="text-base" style={{ color: 'var(--fg-muted)' }}>
                        "Find the contract with ABC Corp about data processing"
                      </span>
                    </div>
                    <div className="absolute -bottom-2 left-4 w-32 h-1 rounded-full animate-pulse"
                         style={{ backgroundColor: 'var(--accent-solid)' }} />
                  </div>

                  {/* Search Results */}
                  <div className="space-y-3">
                    {[
                      { name: 'abc-corp-contract-2024.pdf', match: '95% match', type: 'PDF' },
                      { name: 'data-processing-agreement.docx', match: '87% match', type: 'DOCX' },
                      { name: 'abc-negotiations-email.eml', match: '82% match', type: 'EMAIL' }
                    ].map((file, index) => (
                      <div key={index} 
                           className="flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02]"
                           style={{ 
                             backgroundColor: 'var(--bg-app)', 
                             borderColor: 'var(--border-subtle)' 
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
                            <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>Semantic match</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium" style={{ color: 'var(--accent-solid)' }}>
                          {file.match}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Status Bar */}
                  <div className="flex items-center justify-between pt-4 border-t transition-colors duration-300"
                       style={{ borderColor: 'var(--border-subtle)' }}>
                    <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                      Searched 12,847 files in 47ms
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>Local AI Processing</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full animate-bounce"
                   style={{ backgroundColor: 'var(--accent-solid)' }} />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-lg rotate-12 animate-pulse"
                   style={{ backgroundColor: 'var(--accent-soft)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroV2
