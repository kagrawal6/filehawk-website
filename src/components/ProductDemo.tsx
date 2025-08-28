import React, { useState } from 'react'
import { 
  Play, 
  Monitor, 
  Users, 
  Briefcase, 
  GraduationCap,
  Search,
  FileText,
  Clock,
  ArrowRight,
  Zap
} from 'lucide-react'

const ProductDemo: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState('developer')

  const scenarios = [
    {
      id: 'developer',
      title: 'Developer Workflow',
      icon: Monitor,
      description: 'Finding bugs and implementation details across large codebases',
      query: 'authentication bug in login system',
      videoTitle: 'Debug Like a Pro',
      results: [
        { file: 'auth/login-handler.js', type: 'JavaScript', relevance: 95 },
        { file: 'tests/auth-error-test.js', type: 'Test', relevance: 87 },
        { file: 'docs/auth-troubleshooting.md', type: 'Docs', relevance: 82 }
      ],
      stats: { files: '847', time: '0.3s', accuracy: '94%' },
      color: 'blue'
    },
    {
      id: 'business',
      title: 'Business Intelligence',
      icon: Briefcase,
      description: 'Locating contracts, agreements, and business documents',
      query: 'contract with ABC Corp about data processing',
      videoTitle: 'Smart Document Discovery',
      results: [
        { file: 'contracts/abc-corp-2024.pdf', type: 'PDF', relevance: 98 },
        { file: 'legal/data-processing-agreement.docx', type: 'Word', relevance: 89 },
        { file: 'emails/abc-negotiations.eml', type: 'Email', relevance: 76 }
      ],
      stats: { files: '1,247', time: '0.2s', accuracy: '97%' },
      color: 'green'
    },
    {
      id: 'research',
      title: 'Academic Research',
      icon: GraduationCap,
      description: 'Finding research papers and academic materials by topic',
      query: 'machine learning paper about transformer architecture',
      videoTitle: 'Research Made Easy',
      results: [
        { file: 'papers/attention-is-all-you-need.pdf', type: 'Paper', relevance: 96 },
        { file: 'notes/transformer-summary.md', type: 'Notes', relevance: 91 },
        { file: 'code/transformer-implementation.py', type: 'Code', relevance: 85 }
      ],
      stats: { files: '2,156', time: '0.4s', accuracy: '92%' },
      color: 'purple'
    }
  ]

  const getColorClasses = (color: string, variant: 'bg' | 'text' | 'border' = 'bg') => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/30'
      },
      green: {
        bg: 'bg-green-500/10',
        text: 'text-green-400',
        border: 'border-green-500/30'
      },
      purple: {
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
        border: 'border-purple-500/30'
      }
    }
    return colorMap[color as keyof typeof colorMap]?.[variant] || colorMap.blue[variant]
  }

  const activeScenarioData = scenarios.find(s => s.id === activeScenario)!

  return (
    <section className="py-20 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-app)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
               style={{ 
                 backgroundColor: 'var(--accent-soft)', 
                 borderColor: 'var(--border-subtle)',
                 color: 'var(--fg-secondary)'
               }}>
            <Play className="mr-2 h-4 w-4" style={{ color: 'var(--accent-solid)' }} />
            <span className="text-sm font-medium">Product Demonstrations</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-6" 
              style={{ color: 'var(--fg-primary)' }}>
            See FileHawk in
            <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
              {' '}Action
            </span>
          </h2>
          
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            Watch how FileHawk transforms file discovery across different professional workflows. 
            From debugging code to finding contracts, semantic search makes it effortless.
          </p>
        </div>

        {/* Scenario Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon
            return (
              <button
                key={scenario.id}
                onClick={() => setActiveScenario(scenario.id)}
                className={`group flex items-center px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                  activeScenario === scenario.id
                    ? `${getColorClasses(scenario.color, 'border')} ${getColorClasses(scenario.color, 'bg')} transform scale-105`
                    : 'border-gray-700/50 hover:border-gray-600/50 hover:scale-105'
                }`}
                style={{ backgroundColor: activeScenario === scenario.id ? 'var(--accent-soft)' : 'var(--bg-elevated)' }}
              >
                <Icon className={`mr-3 h-6 w-6 transition-colors ${
                  activeScenario === scenario.id ? getColorClasses(scenario.color, 'text') : ''
                }`} 
                style={{ color: activeScenario === scenario.id ? 'var(--accent-solid)' : 'var(--fg-muted)' }} />
                <div className="text-left">
                  <div className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{scenario.title}</div>
                  <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>{scenario.description}</div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Main Demo Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Video Placeholder */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border transition-colors duration-300"
                 style={{ 
                   backgroundColor: 'var(--bg-elevated)', 
                   borderColor: 'var(--border-subtle)' 
                 }}>
              
              {/* Video Placeholder */}
              <div className="aspect-video relative overflow-hidden"
                   style={{ backgroundColor: 'var(--bg-muted)' }}>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors cursor-pointer group">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-white/80 group-hover:scale-110 transition-transform"
                       style={{ backgroundColor: 'var(--accent-solid)' }}>
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>

                {/* Video Preview Content */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="text-white font-semibold text-lg">
                    {activeScenarioData.videoTitle}
                  </div>
                  <div className="text-white/80 text-sm">
                    {activeScenarioData.description}
                  </div>
                </div>

                {/* Bottom Info Bar */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-white text-sm font-mono">
                      "{activeScenarioData.query}"
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Description */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
                  {activeScenarioData.videoTitle}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>
                  PLACEHOLDER: Video demonstration of {activeScenarioData.title.toLowerCase()} workflow
                  showing FileHawk's semantic search capabilities in real-world scenarios.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold" style={{ color: 'var(--accent-solid)' }}>
                      {activeScenarioData.stats.files}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>Files Searched</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold" style={{ color: 'var(--accent-solid)' }}>
                      {activeScenarioData.stats.time}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>Search Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold" style={{ color: 'var(--accent-solid)' }}>
                      {activeScenarioData.stats.accuracy}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Preview */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
                Search Results Preview
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--fg-muted)' }}>
                See how FileHawk's semantic understanding delivers precise results 
                for the query: <span className="font-mono" style={{ color: 'var(--accent-solid)' }}>
                  "{activeScenarioData.query}"
                </span>
              </p>
            </div>

            {/* Search Results */}
            <div className="space-y-3">
              {activeScenarioData.results.map((result, index) => (
                <div key={index} 
                     className="flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02]"
                     style={{ 
                       backgroundColor: 'var(--bg-elevated)', 
                       borderColor: 'var(--border-subtle)' 
                     }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
                         style={{ 
                           backgroundColor: 'var(--accent-soft)', 
                           color: 'var(--accent-solid)' 
                         }}>
                      {result.type.slice(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: 'var(--fg-primary)' }}>
                        {result.file}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                        Semantic match • {result.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold" style={{ color: 'var(--accent-solid)' }}>
                      {result.relevance}%
                    </div>
                    <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                      Relevance
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Benefits */}
            <div className="p-6 rounded-xl border transition-colors duration-300"
                 style={{ 
                   backgroundColor: 'var(--bg-elevated)', 
                   borderColor: 'var(--border-subtle)' 
                 }}>
              <h4 className="font-bold mb-4 flex items-center" style={{ color: 'var(--fg-primary)' }}>
                <Zap className="mr-2 h-5 w-5" style={{ color: 'var(--accent-solid)' }} />
                Why This Works
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--fg-muted)' }}>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-solid)' }} />
                  Understands context and intent, not just keywords
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-solid)' }} />
                  Processes content semantically for accurate matches
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-solid)' }} />
                  Works across multiple file formats and languages
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Video Placeholder Grid */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12" style={{ color: 'var(--fg-primary)' }}>
            Additional Demo Scenarios
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Performance Comparison',
                description: 'FileHawk vs traditional keyword search',
                duration: '2:30',
                type: 'Benchmark'
              },
              {
                title: 'Multi-Language Support',
                description: 'Searching across different languages',
                duration: '1:45',
                type: 'Feature'
              },
              {
                title: 'Large Dataset Handling',
                description: 'Processing 10,000+ files efficiently',
                duration: '3:15',
                type: 'Performance'
              }
            ].map((video, index) => (
              <div key={index} 
                   className="p-6 rounded-xl border transition-all duration-300 hover:scale-105 cursor-pointer"
                   style={{ 
                     backgroundColor: 'var(--bg-elevated)', 
                     borderColor: 'var(--border-subtle)' 
                   }}>
                <div className="aspect-video rounded-lg mb-4 flex items-center justify-center"
                     style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <Play className="h-12 w-12" style={{ color: 'var(--accent-solid)' }} />
                </div>
                <h4 className="font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
                  {video.title}
                </h4>
                <p className="text-sm mb-3" style={{ color: 'var(--fg-muted)' }}>
                  {video.description}
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: 'var(--accent-soft)', 
                          color: 'var(--accent-solid)' 
                        }}>
                    {video.type}
                  </span>
                  <span style={{ color: 'var(--fg-muted)' }}>{video.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDemo
