import React from 'react'
import { Clock, Search, Brain, Shield, Zap, Users } from 'lucide-react'
import SoftCard from './ui/SoftCard'

const WhyFileHawk: React.FC = () => {
  const problems = [
    {
      icon: Clock,
      title: "Wasted Time",
      problem: "Developers spend 30+ minutes daily searching for code, docs, and files using outdated search tools",
      solution: "FileHawk finds files in seconds using natural language queries"
    },
    {
      icon: Search,
      title: "Limited Search",
      problem: "Traditional search only matches exact keywords, missing contextually relevant results",
      solution: "AI-powered semantic understanding finds files by meaning and context"
    },
    {
      icon: Shield,
      title: "Privacy Concerns",
      problem: "Cloud-based search tools expose sensitive code and documents to third parties",
      solution: "100% local processing keeps your data private and secure"
    }
  ]

  const benefits = [
    {
      icon: Brain,
      title: "Semantic Intelligence",
      description: "Advanced transformer models understand code context, documentation relationships, and conceptual connections",
      metric: "95% accuracy in finding relevant files"
    },
    {
      icon: Zap,
      title: "Lightning Performance", 
      description: "Optimized indexing and search algorithms deliver results faster than traditional file explorers",
      metric: "< 50ms average search time"
    },
    {
      icon: Users,
      title: "Developer-Focused",
      description: "Built by developers, for developers. Understands code patterns, documentation structure, and project workflows",
      metric: "Supports 20+ file types"
    }
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-brand-coal to-brand-onyx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Why{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-300 to-brand-gold-500">
              FileHawk?
            </span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
            We identified critical inefficiencies in how developers search for files and built a solution that addresses real workflow pain points.
          </p>
        </div>

        {/* Clean benefits grid - Cursor style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-3 bg-brand-gold-600/10 text-brand-gold-400 rounded-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                  <div className="mt-3 text-xs text-brand-gold-400 font-medium">
                    {benefit.metric}
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

export default WhyFileHawk
