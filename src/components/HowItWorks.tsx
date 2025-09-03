import React, { useState } from 'react'
import { FolderOpen, Brain, Search, FileText, ChevronRight } from 'lucide-react'

const HowItWorks: React.FC = () => {
  
  const steps = [
    {
      icon: FolderOpen,
      title: "Index Your Files",
      description: "Point FileHawk to your folders and index intelligently.",
      expanded: {
        details: "Fast, local, private.",
        features: [
          "Documents, PDFs, code",
          "100% local processing",
          "Smart extraction",
          "Privacy-first"
        ]
      }
    },
    {
      icon: Brain,
      title: "AI Understanding", 
      description: "Advanced AI creates semantic understanding of content.",
      expanded: {
        details: "True understanding, not keywords.",
        features: [
          "Semantic analysis",
          "Context-aware",
          "Multi-format support",
          "Smart chunking"
        ]
      }
    },
    {
      icon: Search,
      title: "Natural Language Search",
      description: "Search using natural language for relevant results.",
      expanded: {
        details: "Ask naturally, find instantly.",
        features: [
          "Conversational queries",
          "Technical terms", 
          "Concept matching",
          "Smart results"
        ]
      }
    },
    {
      icon: FileText,
      title: "Get Precise Results",
      description: "Receive ranked results with relevance scores and context.",
      expanded: {
        details: "Ranked, scored, ready to use.",
        features: [
          "Confidence scoring",
          "Snippet previews",
          "Direct file access",
          "Context highlights"
        ]
      }
    }
  ]

  // Step Card Component with hover state matching CapabilityShowcase
  const StepCard: React.FC<{ step: typeof steps[0], index: number }> = ({ step, index }) => {
    const [isHovered, setIsHovered] = useState(false)
    const Icon = step.icon

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
          
          {/* Step Number */}
          <div className="flex justify-center mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
              isHovered ? 'scale-110' : ''
            }`}
                 style={{
                   backgroundColor: 'var(--accent-solid)',
                   color: 'var(--accent-contrast)'
                 }}>
              {index + 1}
            </div>
          </div>
          
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-xl transition-all duration-300 ${
              isHovered ? 'scale-110' : ''
            }`}
                 style={{ backgroundColor: 'var(--accent-soft)' }}>
              <Icon className="h-5 w-5" style={{ color: 'var(--accent-solid)' }} />
            </div>
          </div>
          
          {/* Content */}
          <h3 className="text-lg font-bold mb-3 text-center" style={{ color: 'var(--fg-primary)' }}>
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-center"
             style={{ color: 'var(--fg-secondary)' }}>
            {step.description}
          </p>

          {/* Expanded Content - Positioned at bottom like performance section */}
          {isHovered && (
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg transition-all duration-300 origin-center scale-105"
                 style={{
                   backgroundColor: 'var(--bg-elevated)',
                   border: '1px solid var(--border-subtle)',
                   backdropFilter: 'blur(8px)'
                 }}>
              <div className="space-y-2 mb-3">
                {step.expanded.features.map((feature: string, featIndex: number) => (
                  <div key={featIndex} className="flex items-center space-x-2">
                    <ChevronRight className="h-3 w-3 flex-shrink-0" 
                                 style={{ color: 'var(--accent-solid)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--fg-primary)' }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              
              <p className="text-xs font-bold text-brand-gold-400">
                {step.expanded.details}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <section id="how-it-works" className="py-16 relative overflow-hidden content-flow">
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

        {/* Clean Steps Grid - No Animation, Consistent Sizing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>


      </div>
    </section>
  )
}

export default HowItWorks
