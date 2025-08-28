import React, { useState } from 'react'
import { Play, Image, Code, BookOpen, Search, Users, Timer } from 'lucide-react'
import SoftCard from './ui/SoftCard'
import GoldButton from './ui/GoldButton'

const RealWorldScenarios: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState(0)

  const scenarios = [
    {
      id: 'developer',
      title: 'Developer Workflow',
      persona: 'Software Engineer',
      challenge: 'Finding authentication code across a 50,000+ line codebase',
      icon: Code,
      videoPlaceholder: '/screenshots/developer-scenario.mp4',
      screenshotPlaceholder: '/screenshots/developer-search.png',
      searchQuery: 'JWT token validation middleware',
      resultCount: '12 files found',
      timeToFind: '3 seconds',
      description: 'Watch how FileHawk helps developers instantly locate relevant code patterns, functions, and documentation across large repositories.',
      benefits: [
        'Skip endless file browsing',
        'Find code by functionality, not filename',
        'Discover related files and dependencies'
      ]
    },
    {
      id: 'researcher',
      title: 'Research & Documentation',
      persona: 'Technical Writer / Researcher',
      challenge: 'Organizing and finding relevant papers and notes across multiple projects',
      icon: BookOpen,
      videoPlaceholder: '/screenshots/researcher-scenario.mp4',
      screenshotPlaceholder: '/screenshots/research-search.png',
      searchQuery: 'machine learning model evaluation',
      resultCount: '28 documents found',
      timeToFind: '2 seconds',
      description: 'See how researchers use FileHawk to connect ideas across papers, notes, and documentation using semantic understanding.',
      benefits: [
        'Connect related research topics',
        'Find relevant quotes and citations',
        'Organize knowledge across projects'
      ]
    },
    {
      id: 'team',
      title: 'Team Collaboration',
      persona: 'Project Manager / Team Lead',
      challenge: 'Finding team documents, meeting notes, and project files across shared folders',
      icon: Users,
      videoPlaceholder: '/screenshots/team-scenario.mp4', 
      screenshotPlaceholder: '/screenshots/team-search.png',
      searchQuery: 'quarterly planning meeting notes',
      resultCount: '8 documents found',
      timeToFind: '1 second',
      description: 'Discover how teams use FileHawk to maintain knowledge continuity and find important decisions buried in meeting notes.',
      benefits: [
        'Never lose important decisions',
        'Find context across team communications',
        'Onboard new team members faster'
      ]
    }
  ]

  const currentScenario = scenarios[activeScenario]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-brand-onyx to-brand-coal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            See FileHawk in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-300 to-brand-gold-500">
              Real Action
            </span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
            Real scenarios, real workflows, real time savings. Watch how different professionals use FileHawk to transform their daily search tasks.
          </p>
        </div>

        {/* Scenario Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon
            return (
              <button
                key={scenario.id}
                onClick={() => setActiveScenario(index)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeScenario === index
                    ? 'bg-brand-gold-600 text-brand-onyx shadow-gold-glow'
                    : 'bg-brand-coal text-gray-300 hover:bg-gray-700 border border-brand-border'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{scenario.title}</span>
              </button>
            )
          })}
        </div>

        {/* Active Scenario Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video/Screenshot Placeholder */}
          <div className="order-2 lg:order-1">
            <SoftCard className="p-2 bg-gradient-to-br from-brand-coal to-brand-onyx border-brand-gold-700/20">
              <div className="aspect-video bg-brand-onyx rounded-lg relative overflow-hidden group">
                {/* Video Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-brand-gold-600/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-brand-gold-600/30 transition-colors">
                      <Play className="h-8 w-8 text-brand-gold-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Demo Video Coming Soon</h4>
                      <p className="text-gray-400 text-sm">
                        {currentScenario.persona} using FileHawk
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Screenshot Overlay */}
                <div className="absolute top-4 right-4">
                  <div className="bg-brand-onyx/80 px-3 py-2 rounded-lg border border-brand-border/50">
                    <div className="flex items-center space-x-2 text-sm">
                      <Image className="h-4 w-4 text-brand-gold-400" />
                      <span className="text-gray-300">Screenshot Preview</span>
                    </div>
                  </div>
                </div>

                {/* Search Query Simulation */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-brand-onyx/90 p-3 rounded-lg border border-brand-border/50">
                    <div className="flex items-center space-x-3 text-sm">
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{currentScenario.searchQuery}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{currentScenario.resultCount}</span>
                      <span className="flex items-center space-x-1">
                        <Timer className="h-3 w-3" />
                        <span>{currentScenario.timeToFind}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SoftCard>
          </div>

          {/* Scenario Details */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-brand-gold-600/20 text-brand-gold-300 rounded-lg">
                    <currentScenario.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{currentScenario.title}</h3>
                    <p className="text-brand-gold-400 text-sm font-medium">{currentScenario.persona}</p>
                  </div>
                </div>

                <div className="bg-red-500/10 border-l-4 border-red-500 p-4 mb-6">
                  <h4 className="text-red-400 font-semibold mb-2">The Challenge</h4>
                  <p className="text-gray-300 text-sm">{currentScenario.challenge}</p>
                </div>

                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  {currentScenario.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {currentScenario.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-brand-gold-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <GoldButton
                  variant="solid"
                  size="lg"
                  href="#download"
                  className="w-full sm:w-auto"
                >
                  Try This Workflow Yourself
                </GoldButton>
                <p className="text-gray-500 text-sm mt-2">
                  See immediate results with your own files
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Banner */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 bg-brand-gold-600/10 text-brand-gold-400 px-6 py-3 rounded-full border border-brand-gold-600/20">
            <Play className="h-5 w-5" />
            <span className="font-medium">Live demo videos coming soon</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RealWorldScenarios
