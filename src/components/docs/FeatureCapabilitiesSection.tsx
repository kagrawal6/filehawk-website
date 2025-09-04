import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Brain, 
  Target, 
  GitBranch,
  Database,
  CheckCircle,
  Filter,
  RefreshCw,
  History,
  Code,
  Eye,
  Lightbulb,
  ArrowRight,
  PlayCircle,
  Users,
  Building,
  TrendingUp,
  Clock,
  HardDrive,
  Workflow
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const FeatureCapabilitiesSection: React.FC = () => {
  const isAnimated = useScrollAnimation()
  const [activeFeature, setActiveFeature] = useState<string>('gist')

  const features = [
    {
      id: 'gist',
      title: 'Gist Mode',
      subtitle: 'Topic-Level Understanding',
      icon: Brain,
      color: 'blue',
      description: 'Find documents by theme, concept, or general topic with AI-powered contextual understanding.',
      businessValue: 'Perfect for exploring content, discovering related documents, and understanding information landscapes.',
      useCases: [
        'Research teams finding all documents related to "project management methodologies"',
        'Legal teams discovering contracts mentioning specific compliance requirements',
        'Engineering teams locating architecture discussions across multiple repositories'
      ],
      technicalDetails: {
        chunkSize: '35 lines',
        overlap: '5 lines',
        model: 'sentence-transformers/msmarco-MiniLM-L6-cos-v5',
        approach: 'Two-stage retrieval with holistic scoring'
      }
    },
    {
      id: 'pinpoint',
      title: 'Pinpoint Mode',
      subtitle: 'Exact Phrase Matching',
      icon: Target,
      color: 'red',
      description: 'Locate specific code snippets, precise technical terms, or exact phrases with surgical precision.',
      businessValue: 'Critical for debugging, finding specific implementations, and locating exact references.',
      useCases: [
        'Developers finding the exact function "calculateTotalRevenue" across codebases',
        'Support teams locating specific error messages in documentation',
        'Compliance teams finding exact regulatory text references'
      ],
      technicalDetails: {
        chunkSize: '3 lines',
        overlap: 'Sentence boundaries',
        model: 'all-MiniLM-L6-v2',
        approach: 'Direct similarity matching'
      }
    },
    {
      id: 'github',
      title: 'GitHub Connector',
      subtitle: 'Seamless Repository Integration',
      icon: GitBranch,
      color: 'green',
      description: 'One-click authentication and automatic repository syncing with branch switching capabilities.',
      businessValue: 'Eliminates manual repository management and enables instant codebase exploration.',
      useCases: [
        'Engineering teams onboarding new developers with instant codebase access',
        'Product managers researching feature implementations across repositories',
        'Security teams auditing code patterns across multiple projects'
      ],
      technicalDetails: {
        auth: 'OAuth device flow',
        sync: 'Real-time with file watchers',
        branches: 'Automatic branch detection',
        limits: 'Configurable repository size limits'
      }
    },
    {
      id: 'filtering',
      title: 'Advanced Filtering',
      subtitle: 'Smart File Management',
      icon: Filter,
      color: 'purple',
      description: 'Intelligent file discovery with customizable exclusion patterns and format support.',
      businessValue: 'Optimizes performance and focuses search results on relevant content.',
      useCases: [
        'Large enterprises excluding cache directories and build artifacts',
        'Research teams focusing on specific document formats (PDF, DOCX)',
        'Development teams filtering by programming languages'
      ],
      technicalDetails: {
        patterns: 'Glob patterns, regex support',
        formats: '25+ file types supported',
        limits: 'Configurable size limits (default 50MB)',
        exclusions: 'Hidden files, system directories'
      }
    },
    {
      id: 'syncing',
      title: 'Real-Time Syncing',
      subtitle: 'Instant Change Detection',
      icon: RefreshCw,
      color: 'orange',
      description: 'System-level file monitoring with intelligent debouncing and incremental updates.',
      businessValue: 'Ensures search results are always current without manual intervention.',
      useCases: [
        'Active development teams with rapidly changing codebases',
        'Documentation teams with frequent content updates',
        'Research environments with continuous data collection'
      ],
      technicalDetails: {
        monitoring: 'File system watchers',
        debouncing: '500ms intelligent delays',
        operations: 'Create, modify, delete, move',
        optimization: 'Stat caching, incremental processing'
      }
    },
    {
      id: 'history',
      title: 'Search History',
      subtitle: 'Persistent Query Intelligence',
      icon: History,
      color: 'indigo',
      description: 'Save queries, bookmark results, and get smart suggestions based on search patterns.',
      businessValue: 'Improves workflow efficiency and enables knowledge sharing across teams.',
      useCases: [
        'Researchers building knowledge bases from repeated queries',
        'Support teams maintaining common search patterns',
        'Consultants tracking client-specific search histories'
      ],
      technicalDetails: {
        storage: 'Persistent local database',
        suggestions: 'ML-powered query completion',
        bookmarks: 'Organized result collections',
        analytics: 'Usage pattern tracking'
      }
    }
  ]

  const activeFeatureData = features.find(f => f.id === activeFeature) || features[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6" 
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <Zap className="h-5 w-5 mr-2 text-brand-gold-400" />
          <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
            Features & Capabilities
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          <span style={{ color: 'var(--fg-primary)' }}>Intelligent File</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            Discovery Platform
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8" style={{ color: 'var(--fg-secondary)' }}>
          FileHawk transforms how teams discover and interact with their digital content through 
          AI-powered semantic search, intelligent file management, and seamless integration workflows.
        </p>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {[
            { icon: Users, metric: "10x Faster", label: "Document Discovery", description: "Find relevant files in seconds, not minutes" },
            { icon: Building, metric: "95.7%", label: "Search Accuracy", description: "AI understands context and intent" },
            { icon: TrendingUp, metric: "Zero Setup", label: "Local-First Privacy", description: "No cloud dependencies or data exposure" }
          ].map((stat, index) => (
            <motion.div 
              key={stat.metric}
              className="p-6 rounded-xl border text-center"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            >
              <stat.icon className="h-8 w-8 text-brand-gold-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-brand-gold-400 mb-1">
                {stat.metric}
              </div>
              <div className="font-semibold mb-1" style={{ color: 'var(--fg-primary)' }}>
                {stat.label}
              </div>
              <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interactive Feature Explorer */}
      <motion.div 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Core Capabilities
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            Explore FileHawk's key features through interactive demonstrations. 
            Click on any feature to see detailed explanations and real-world use cases.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feature Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`
                    w-full text-left p-4 rounded-xl border transition-all duration-300 group
                    ${activeFeature === feature.id 
                      ? 'bg-gradient-to-r from-brand-gold-500/20 to-transparent border-brand-gold-500 shadow-lg' 
                      : 'hover:border-gray-600 hover:shadow-md'
                    }
                  `}
                  style={{ 
                    backgroundColor: activeFeature === feature.id ? 'var(--accent-soft)' : 'var(--bg-elevated)', 
                    borderColor: activeFeature === feature.id ? 'var(--accent-solid)' : 'var(--border-subtle)' 
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isAnimated ? 1 : 0, x: isAnimated ? 0 : -20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-lg mr-3 ${
                      activeFeature === feature.id ? 'bg-brand-gold-500/30' : 'bg-gray-700'
                    }`}>
                      <feature.icon className={`h-5 w-5 ${
                        activeFeature === feature.id ? 'text-brand-gold-400' : 'text-gray-300'
                      }`} />
                    </div>
                    <div>
                      <div className={`font-semibold ${
                        activeFeature === feature.id ? 'text-brand-gold-300' : ''
                      }`} 
                      style={{ color: activeFeature === feature.id ? 'var(--accent-solid)' : 'var(--fg-primary)' }}>
                        {feature.title}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                        {feature.subtitle}
                      </div>
                    </div>
                    <ArrowRight className={`h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${
                      activeFeature === feature.id ? 'opacity-100' : ''
                    }`} />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Feature Detail Panel */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeFeature}
              className="p-8 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start mb-6">
                <div className="p-3 rounded-xl bg-brand-gold-500/20 text-brand-gold-400 mr-4 flex-shrink-0">
                  <activeFeatureData.icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
                    {activeFeatureData.title}
                  </h3>
                  <p className="text-lg mb-4" style={{ color: 'var(--fg-secondary)' }}>
                    {activeFeatureData.description}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-gold-500/20 text-brand-gold-400 text-sm font-medium">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Business Value
                  </div>
                  <p className="mt-3" style={{ color: 'var(--fg-secondary)' }}>
                    {activeFeatureData.businessValue}
                  </p>
                </div>
              </div>

              {/* Use Cases */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center" style={{ color: 'var(--fg-primary)' }}>
                  <PlayCircle className="h-5 w-5 mr-2 text-brand-gold-400" />
                  Real-World Use Cases
                </h4>
                <div className="space-y-3">
                  {activeFeatureData.useCases.map((useCase, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span style={{ color: 'var(--fg-secondary)' }}>{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specs */}
              <div className="border-t pt-6" style={{ borderColor: 'var(--border-subtle)' }}>
                <h4 className="text-lg font-semibold mb-4 flex items-center" style={{ color: 'var(--fg-primary)' }}>
                  <Code className="h-5 w-5 mr-2 text-brand-gold-400" />
                  Technical Implementation
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(activeFeatureData.technicalDetails).map(([key, value]) => (
                    <div key={key} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                      <div className="text-sm font-medium capitalize mb-1" style={{ color: 'var(--fg-muted)' }}>
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="font-mono text-sm" style={{ color: 'var(--fg-primary)' }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Feature Comparison */}
      <motion.div 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Gist vs Pinpoint: When to Use Each Mode
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            Understanding the difference between our dual search modes helps you choose 
            the right approach for your specific needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Gist Mode */}
          <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 mr-4">
                <Brain className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--fg-primary)' }}>Gist Mode</h3>
                <p style={{ color: 'var(--fg-muted)' }}>Conceptual Discovery</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>Best For:</h4>
                <ul className="space-y-1" style={{ color: 'var(--fg-secondary)' }}>
                  <li>• Research and exploration</li>
                  <li>• Finding related documents</li>
                  <li>• Topic-based searches</li>
                  <li>• Understanding content themes</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>Example Query:</h4>
                <div className="p-3 rounded-lg font-mono text-sm bg-blue-500/10" style={{ color: 'var(--fg-primary)' }}>
                  "machine learning algorithms"
                </div>
                <p className="text-sm mt-2" style={{ color: 'var(--fg-muted)' }}>
                  Finds documents about neural networks, decision trees, regression models, etc.
                </p>
              </div>
            </div>
          </div>

          {/* Pinpoint Mode */}
          <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-red-500/20 text-red-400 mr-4">
                <Target className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--fg-primary)' }}>Pinpoint Mode</h3>
                <p style={{ color: 'var(--fg-muted)' }}>Exact Matching</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>Best For:</h4>
                <ul className="space-y-1" style={{ color: 'var(--fg-secondary)' }}>
                  <li>• Debugging and troubleshooting</li>
                  <li>• Finding specific code</li>
                  <li>• Exact phrase matching</li>
                  <li>• Technical precision</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>Example Query:</h4>
                <div className="p-3 rounded-lg font-mono text-sm bg-red-500/10" style={{ color: 'var(--fg-primary)' }}>
                  "function calculateRevenue"
                </div>
                <p className="text-sm mt-2" style={{ color: 'var(--fg-muted)' }}>
                  Finds the exact function definition and calls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Enterprise-Grade Performance
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            FileHawk delivers consistent performance across large-scale document collections 
            with optimized indexing and intelligent caching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Clock, metric: "<50ms", label: "Average Search Time", description: "Sub-second responses" },
            { icon: HardDrive, metric: "1M+", label: "Files Supported", description: "Massive collections" },
            { icon: Database, metric: "25+", label: "File Formats", description: "Universal compatibility" },
            { icon: Workflow, metric: "99.9%", label: "Uptime Reliability", description: "Always available" }
          ].map((stat, index) => (
            <motion.div 
              key={stat.metric}
              className="p-6 rounded-xl border text-center hover:border-brand-gold-500/40 transition-colors"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.0 + index * 0.1 }}
            >
              <stat.icon className="h-8 w-8 text-brand-gold-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-brand-gold-400 mb-2">
                {stat.metric}
              </div>
              <div className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                {stat.label}
              </div>
              <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Ready to Transform Your File Discovery?
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            Experience the power of AI-driven semantic search with FileHawk's intelligent 
            file discovery platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#download"
              className="px-8 py-4 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-gold-500/25 transition-all duration-300 flex items-center justify-center"
            >
              <Eye className="mr-2 h-5 w-5" />
              Try FileHawk
            </a>
            <a 
              href="/documentation/algorithms"
              className="px-8 py-4 border border-brand-gold-500 text-brand-gold-400 font-semibold rounded-lg hover:bg-brand-gold-500/10 transition-all duration-300 flex items-center justify-center"
            >
              <Code className="mr-2 h-5 w-5" />
              Explore AI Algorithms
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default FeatureCapabilitiesSection