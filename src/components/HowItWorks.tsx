import React from 'react'
import { FolderOpen, Brain, Search, FileText } from 'lucide-react'
import SoftCard from './ui/SoftCard'

const HowItWorks: React.FC = () => {
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
    <section className="py-16 sm:py-24 bg-gradient-to-b from-brand-onyx to-brand-coal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            How{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-300 to-brand-gold-500">
              FileHawk
            </span>
            {' '}Works
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
            From indexing to results in four simple steps. No cloud, no compromise on privacy.
          </p>
        </div>

        {/* Clean Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 bg-brand-gold-600 text-brand-onyx rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <div className="p-2 bg-brand-gold-600/10 text-brand-gold-400 rounded-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <h3 className="text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Ready to experience semantic file search?
          </p>
          <div className="inline-flex items-center space-x-2 text-brand-gold-300 text-sm font-medium">
            <span>Download FileHawk and index your first folder in under 2 minutes</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
