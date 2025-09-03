import React, { useState } from 'react'
import { Zap, Shield, Brain, Database, ChevronRight } from 'lucide-react'

interface CapabilityCardProps {
  capability: any
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({ capability }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = capability.icon

  return (
    <div
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative h-full min-h-[320px] p-6 rounded-xl transition-all duration-300 cursor-pointer ${
        isHovered ? 'z-20' : ''
      }`}
      style={{ 
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        boxShadow: isHovered ? '0 0 0 2px var(--accent-solid)' : 'none'
      }}>
        {/* Icon */}
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-all duration-300 ${
          isHovered ? 'scale-110' : ''
        }`}
             style={{ backgroundColor: 'var(--accent-soft)' }}>
          <Icon className="h-6 w-6" style={{ color: 'var(--accent-solid)' }} />
        </div>
        
        {/* Metric */}
        <div className="mb-4">
          <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            {capability.metric}
          </div>
          <div className="text-sm font-medium" style={{ color: 'var(--fg-muted)' }}>
            {capability.detail}
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-lg font-bold mb-3"
            style={{ color: 'var(--fg-primary)' }}>
          {capability.title}
        </h3>
        
        <p className="text-sm leading-relaxed"
           style={{ color: 'var(--fg-secondary)' }}>
          {capability.description}
        </p>

        {/* Expanded Content - Absolutely positioned overlay */}
        {isHovered && (
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300"
               style={{ 
                 backgroundColor: 'var(--bg-elevated)', 
                 border: '1px solid var(--border-subtle)',
                 backdropFilter: 'blur(8px)'
               }}>
            <div className="space-y-2 mb-3">
              {capability.expanded.features.map((feature: string, featIndex: number) => (
                <div key={featIndex} className="flex items-center space-x-2">
                  <ChevronRight className="h-3 w-3 flex-shrink-0" 
                               style={{ color: 'var(--accent-solid)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--fg-primary)' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            
            <p className="text-xs font-bold italic text-brand-gold-400">
              {capability.expanded.benefit}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const CapabilityShowcase: React.FC = () => {

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
      title: 'Smart Memory',
      description: 'Efficient processing with minimal overhead',
      metric: '~200MB',
      detail: 'Memory usage',
      expanded: {
        features: ['Efficient indexing', 'Smart caching', 'Memory optimization'],
        benefit: 'Process thousands of files without slowing down your computer'
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-4">
            <span style={{ color: 'var(--fg-primary)' }}>Built for</span>{' '}
            <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
              performance
            </span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-xl leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
            Designed from the ground up for speed, privacy, and scale
          </p>
        </div>

        {/* Interactive Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-16">
          {capabilities.map((capability, index) => (
            <CapabilityCard 
              key={index}
              capability={capability}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CapabilityShowcase
