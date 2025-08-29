import React from 'react'
import { FolderOpen, Brain, Search, FileText } from 'lucide-react'
import SoftCard from './ui/SoftCard'
import { useStaggeredAnimation } from '../hooks/useScrollAnimation'

const HowItWorks: React.FC = () => {
  const { containerRef, visibleElements } = useStaggeredAnimation(4, 200)
  
  const steps = [
    {
      icon: FolderOpen,
      title: "Index Your Files",
      description: "Point FileHawk to your folders and let it intelligently index your documents, code, and files while maintaining complete privacy on your machine.",
      details: "Supports documents, PDFs, code files, and more"
    },
    {
      icon: Brain,
      title: "AI Understanding",
      description: "Our advanced AI models create semantic understanding of your content, going beyond simple keyword matching to understand meaning and context.",
      details: "Powered by transformer models trained for semantic search"
    },
    {
      icon: Search,
      title: "Natural Language Search",
      description: "Search using natural language like 'authentication bugs' or 'database connection code' and get relevant results based on meaning, not just keywords.",
      details: "Works with phrases, concepts, and technical terminology"
    },
    {
      icon: FileText,
      title: "Get Precise Results",
      description: "Receive ranked results with relevance scores, code snippets, and context. Click to open files directly in your preferred editor or application.",
      details: "Smart ranking with confidence scores"
    }
  ]

  return (
    <section id="how-it-works" className="py-8 relative overflow-hidden content-flow">
      {/* Subtle section overlay */}
      <div className="absolute inset-0 section-overlay" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight">
            <span style={{ color: 'var(--fg-primary)' }}>How</span>{' '}
            <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
              FileHawk
            </span>
            {' '}<span style={{ color: 'var(--fg-primary)' }}>Works</span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-xl leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
            From indexing to results in four simple steps. No cloud, no compromise on privacy.
          </p>
        </div>

        {/* Animated Steps Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isVisible = visibleElements.has(index)
            
            return (
              <div key={index} 
                   className={`group text-center transition-all duration-700 ${
                     isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                   }`}
                   style={{ transitionDelay: `${index * 200}ms` }}>
                {/* Step Card */}
                <div className="p-8 rounded-2xl border transition-all duration-300 group-hover:scale-[1.02] card-shadow group-hover:card-shadow-lg"
                     style={{
                       backgroundColor: 'var(--bg-elevated)',
                       borderColor: 'var(--border-subtle)',
                     }}>
                  
                  {/* Step Number */}
                  <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:scale-110"
                         style={{
                           backgroundColor: 'var(--accent-solid)',
                           color: 'var(--accent-contrast)'
                         }}>
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-xl transition-all duration-300 group-hover:scale-105"
                         style={{ backgroundColor: 'var(--accent-soft)' }}>
                      <Icon className="h-6 w-6" style={{ color: 'var(--accent-solid)' }} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--fg-secondary)' }}>
                    {step.description}
                  </p>
                  <p className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>
                    {step.details}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="p-8 rounded-2xl border card-shadow"
               style={{
                 backgroundColor: 'var(--bg-elevated)',
                 borderColor: 'var(--border-subtle)',
               }}>
            <p className="text-lg mb-4" style={{ color: 'var(--fg-secondary)' }}>
              Ready to experience semantic file search?
            </p>
            <div className="inline-flex items-center space-x-2 font-medium"
                 style={{ color: 'var(--accent-solid)' }}>
              <span>Download FileHawk and index your first folder in under 2 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
