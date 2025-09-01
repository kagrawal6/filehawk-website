import React, { useState } from 'react'
import { Zap, Shield, Brain, Database, ChevronRight } from 'lucide-react'

const CapabilityShowcase: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const capabilities = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Search thousands of files in milliseconds',
      metric: '<50ms',
      detail: 'Average search time',
      expanded: {
        features: ['Optimized indexing', 'Parallel processing', 'Smart caching'],
        benefit: 'Find any file faster than you can think of the query'
      }
    },
    {
      icon: Shield,
      title: '100% Local',
      description: 'Complete privacy with local AI processing',
      metric: '0%',
      detail: 'Data sent to cloud',
      expanded: {
        features: ['Local AI models', 'Offline operation', 'Zero telemetry'],
        benefit: 'Your files never leave your machine, ever'
      }
    },
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Understands meaning, not just keywords',
      metric: '15+',
      detail: 'File formats supported',
      expanded: {
        features: ['Semantic understanding', 'Context awareness', 'Natural language'],
        benefit: 'Search by describing what you need, not memorizing filenames'
      }
    },
    {
      icon: Database,
      title: 'Massive Scale',
      description: 'Index and search unlimited files',
      metric: '1M+',
      detail: 'Files searchable',
      expanded: {
        features: ['Efficient indexing', 'Incremental updates', 'Memory optimization'],
        benefit: 'Scale from hundreds to millions of files seamlessly'
      }
    }
  ]

  return (
    <section className="py-8 relative overflow-hidden content-flow">
      {/* Subtle section overlay for depth */}
      <div className="absolute inset-0 section-overlay" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-4">
            <span style={{ color: 'var(--fg-primary)' }}>Built for</span>{' '}
            <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
              performance
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
            Designed from the ground up for speed, privacy, and scale
          </p>
        </div>

        {/* Interactive Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon
            const isHovered = hoveredCard === index
            
            return (
              <div
                key={index}
                className="group relative overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient border effect */}
                <div className="gradient-border">
                  <div className={`gradient-border-content p-8 transition-all duration-500 card-shadow ${
                    isHovered ? 'scale-[1.05] card-shadow-lg' : 'group-hover:scale-[1.02] group-hover:card-shadow-lg'
                  }`}>
                    {/* Icon */}
                    <div className={`flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-all duration-300 ${
                      isHovered ? 'scale-125' : 'group-hover:scale-110'
                    }`}
                         style={{ backgroundColor: 'var(--accent-soft)' }}>
                      <Icon className="h-7 w-7" style={{ color: 'var(--accent-solid)' }} />
                    </div>
                    
                    {/* Metric */}
                    <div className="mb-4">
                      <div className="text-4xl font-bold mb-1 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
                        {capability.metric}
                      </div>
                      <div className="text-sm font-medium" style={{ color: 'var(--fg-muted)' }}>
                        {capability.detail}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 transition-colors duration-300"
                        style={{ color: 'var(--fg-primary)' }}>
                      {capability.title}
                    </h3>
                    
                    <p className="text-sm leading-relaxed transition-colors duration-300"
                       style={{ color: 'var(--fg-secondary)' }}>
                      {capability.description}
                    </p>

                    {/* Progressive Disclosure - Expanded Content */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      isHovered ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-4 border-t transition-colors duration-300"
                           style={{ borderColor: 'var(--border-subtle)' }}>
                        {/* Features */}
                        <div className="space-y-2 mb-3">
                          {capability.expanded.features.map((feature, featIndex) => (
                            <div key={featIndex} className="flex items-center space-x-2">
                              <ChevronRight className="h-3 w-3 flex-shrink-0" 
                                           style={{ color: 'var(--accent-solid)' }} />
                              <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Benefit */}
                        <p className="text-xs font-medium italic" style={{ color: 'var(--accent-solid)' }}>
                          {capability.expanded.benefit}
                        </p>
                      </div>
                    </div>

                    {/* Hover Indicator */}
                    <div className={`flex items-center justify-center mt-4 transition-all duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <span className="text-xs font-medium" style={{ color: 'var(--accent-solid)' }}>
                        Click to learn more
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CapabilityShowcase
