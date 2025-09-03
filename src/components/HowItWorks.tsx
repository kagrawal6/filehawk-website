import React, { useState } from 'react'
import { FolderOpen, Brain, Search, FileText, ChevronRight } from 'lucide-react'

const HowItWorks: React.FC = () => {
  
  const steps = [
    {
      icon: FolderOpen,
      title: "Index Your Files",
      description: "Point FileHawk to your folders and index intelligently.",
      expanded: {
        details: "Processes documents, code, and files while maintaining complete privacy.",
        features: [
          "Supports documents, PDFs, code files",
          "Local processing only",
          "Smart content extraction",
          "Privacy-first architecture"
        ]
      }
    },
    {
      icon: Brain,
      title: "AI Understanding", 
      description: "Advanced AI creates semantic understanding of content.",
      expanded: {
        details: "Transformer models go beyond keyword matching to understand meaning and context in your files.",
        features: [
          "Semantic content analysis",
          "Context-aware processing",
          "Multi-format text extraction",
          "Intelligent chunking algorithms"
        ]
      }
    },
    {
      icon: Search,
      title: "Natural Language Search",
      description: "Search using natural language for relevant results.",
      expanded: {
        details: "Ask questions like 'authentication bugs' or 'database connection code' and get meaningful results.",
        features: [
          "Conversational search queries",
          "Technical terminology support", 
          "Concept-based matching",
          "Context-aware results"
        ]
      }
    },
    {
      icon: FileText,
      title: "Get Precise Results",
      description: "Receive ranked results with relevance scores and context.",
      expanded: {
        details: "Smart ranking system delivers the most relevant matches with confidence scores and file previews.",
        features: [
          "Relevance confidence scoring",
          "Code snippet previews",
          "Direct file opening",
          "Context highlighting"
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

          {/* Expanded Content - Better sized to prevent overflow */}
          {isHovered && (
            <div className="absolute top-36 left-4 right-4 bottom-6 p-3 rounded-lg shadow-lg overflow-hidden"
                 style={{ 
                   backgroundColor: 'var(--bg-elevated)', 
                   border: '1px solid var(--border-subtle)',
                   backdropFilter: 'blur(8px)'
                 }}>
              <div className="space-y-1 mb-1">
                {step.expanded.features.map((feature: string, featIndex: number) => (
                  <div key={featIndex} className="flex items-center space-x-2">
                    <ChevronRight className="h-3 w-3 flex-shrink-0" 
                                 style={{ color: 'var(--accent-solid)' }} />
                    <span className="text-xs font-medium leading-tight" style={{ color: 'var(--fg-primary)' }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              
              <p className="text-xs font-bold italic text-brand-gold-400 leading-tight">
                {step.expanded.details}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

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

        {/* Clean Steps Grid - No Animation, Consistent Sizing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-16">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
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
