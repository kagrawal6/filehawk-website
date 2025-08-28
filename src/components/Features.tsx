import React from 'react'
import { Brain, Shield, Zap, FileText, Code, Database, Search, Settings } from 'lucide-react'
import SoftCard from './ui/SoftCard'

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Semantic Search',
      description: 'Find files by meaning and context, not just keywords. Our advanced AI understands what you\'re looking for.',
      highlight: true
    },
    {
      icon: Shield,
      title: '100% Local & Private',
      description: 'All processing happens on your machine. Your files never leave your computer, ensuring complete privacy.',
      highlight: true
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized search algorithms deliver results in milliseconds, even across large file collections.',
      highlight: false
    },
    {
      icon: FileText,
      title: 'Multiple File Types',
      description: 'Search through documents, PDFs, text files, and more with intelligent content understanding.',
      highlight: false
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'Perfect for searching through codebases with syntax-aware semantic understanding.',
      highlight: false
    },
    {
      icon: Database,
      title: 'Smart Indexing',
      description: 'Intelligent file indexing that learns from your search patterns and improves over time.',
      highlight: false
    },
    {
      icon: Search,
      title: 'Natural Language Queries',
      description: 'Search using natural language like "authentication code" or "database connection issues".',
      highlight: false
    },
    {
      icon: Settings,
      title: 'Customizable Filters',
      description: 'Fine-tune your search with file type filters, date ranges, and folder-specific searches.',
      highlight: false
    }
  ]

  return (
    <section id="features" className="py-16 sm:py-24 bg-brand-onyx relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Everything you need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-300 to-brand-gold-500">
              never lose a file again
            </span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
            FileHawk isn't just another search tool. It's your intelligent file assistant 
            that actually understands what you're looking for.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <SoftCard 
                key={index} 
                className={`p-6 transition-all duration-300 hover:border-brand-gold-500/30 group ${
                  feature.highlight ? 'ring-1 ring-brand-gold-500/20 bg-gradient-to-br from-brand-coal to-brand-onyx' : ''
                }`}
                hover
              >
                <div className="flex flex-col items-start space-y-4">
                  <div className={`p-3 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                    feature.highlight 
                      ? 'bg-brand-gold-600/20 text-brand-gold-300' 
                      : 'bg-gray-800 text-gray-300 group-hover:bg-brand-gold-600/10 group-hover:text-brand-gold-400'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-gold-200 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </SoftCard>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-brand-gold-300 text-sm font-medium">
            <span>Ready to transform your file search experience?</span>
            <Search className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
