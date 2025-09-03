import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Brain, 
  Search, 
  Target, 
  Layers, 
  GitBranch, 
  Activity, 
  Database,
  FileText,
  Code,
  PlayCircle,
  Pause,
  RefreshCw,
  Download
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const FeaturesSection: React.FC = () => {
  const isAnimated = useScrollAnimation()
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const coreFeatures = [
    {
      id: 'semantic-search',
      icon: Brain,
      title: 'Semantic Search Intelligence',
      description: 'AI-powered understanding that goes beyond keywords to comprehend meaning and context',
      details: [
        'Natural language query processing with 95.7% accuracy',
        'Context-aware result ranking with confidence scoring',
        'Supports conversational and technical queries',
        'Handles typos, synonyms, and conceptual relationships'
      ],
      demo: {
        query: 'documents about keeping computers safe from hackers',
        results: [
          { file: 'cybersecurity-framework.pdf', confidence: 96.3, snippet: 'Enterprise cybersecurity protocols and threat prevention...' },
          { file: 'network-security-guide.docx', confidence: 94.7, snippet: 'Network protection strategies for organizational security...' }
        ]
      }
    },
    {
      id: 'dual-chunking',
      icon: Layers,
      title: 'Dual-Mode Chunking Strategy',
      description: 'Intelligent content segmentation optimized for both topic understanding and precise location',
      details: [
        'Gist Mode: 35-line chunks for comprehensive topic understanding',
        'Pinpoint Mode: 10-line chunks for precise information location',
        'Semantic boundary detection for natural content breaks',
        'Context preservation with intelligent overlap strategies'
      ],
      demo: {
        gistChunk: 'Large context chunk capturing complete thoughts and arguments for topic-level understanding...',
        pinpointChunk: 'Precise 10-line segment for exact information location and detailed fact finding...'
      }
    },
    {
      id: 'confidence-scoring',
      icon: Target,
      title: 'Advanced Confidence Scoring',
      description: 'Multi-factor algorithmic confidence assessment with user-friendly calibration',
      details: [
        '14-component scoring system with semantic analysis',
        'Distance-to-confidence transformation with adaptive mapping',
        'Filename semantic matching using AI models',
        'User-friendly 0-100% confidence badges'
      ],
      demo: {
        scores: [
          { label: 'Semantic Similarity', value: 87, color: 'text-green-400' },
          { label: 'Filename Match', value: 92, color: 'text-blue-400' },
          { label: 'Term Overlap', value: 76, color: 'text-yellow-400' },
          { label: 'Final Confidence', value: 89, color: 'text-brand-gold-400' }
        ]
      }
    },
    {
      id: 'realtime-sync',
      icon: Activity,
      title: 'Real-time File Monitoring',
      description: 'Instant synchronization with file system changes and automatic re-indexing',
      details: [
        'Cross-platform file system monitoring with <100ms latency',
        'Intelligent change detection using SHA-256 hashing',
        'Incremental updates for modified content only',
        'Background processing without search interruption'
      ],
      demo: {
        events: [
          { type: 'created', file: 'new-report.pdf', time: '10:34:12' },
          { type: 'modified', file: 'project-notes.md', time: '10:34:15' },
          { type: 'deleted', file: 'old-draft.docx', time: '10:34:18' }
        ]
      }
    },
    {
      id: 'github-integration',
      icon: GitBranch,
      title: 'GitHub Enterprise Integration',
      description: 'Seamless repository indexing with OAuth authentication and branch intelligence',
      details: [
        'OAuth device flow for secure authentication',
        'Repository-wide semantic search across all branches',
        'Automatic synchronization with repository changes',
        'Code-aware chunking for programming languages'
      ],
      demo: {
        repos: [
          { name: 'enterprise-api', branches: 8, files: 1247, lastSync: '2 min ago' },
          { name: 'ml-algorithms', branches: 3, files: 892, lastSync: '5 min ago' }
        ]
      }
    },
    {
      id: 'multi-format',
      icon: FileText,
      title: 'Universal File Support',
      description: 'Intelligent text extraction from 15+ file formats with format-specific optimization',
      details: [
        'PDF, Office documents, text files, code files, archives',
        'OCR support for image-based content',
        'Metadata extraction and format-specific parsing',
        'Large file streaming for memory efficiency'
      ],
      demo: {
        formats: [
          { type: 'PDF', icon: 'PDF', count: '2,847 files', speed: '1,500/min' },
          { type: 'Code', icon: 'CODE', count: '5,932 files', speed: '8,000/min' },
          { type: 'Office', icon: 'XLSX', count: '1,234 files', speed: '800/min' },
          { type: 'Text', icon: 'TXT', count: '8,765 files', speed: '10,000/min' }
        ]
      }
    }
  ]

  const toggleDemo = (featureId: string) => {
    setActiveDemo(activeDemo === featureId ? null : featureId)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            Core Features & Capabilities
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          <span style={{ color: 'var(--fg-primary)' }}>Enterprise-Grade</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            Semantic Intelligence
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          FileHawk combines cutting-edge AI algorithms with enterprise reliability to deliver 
          semantic document understanding that transforms how organizations discover and utilize knowledge.
        </p>
      </motion.div>

      {/* Core Features Grid */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="space-y-12">
          {coreFeatures.map((feature, index) => (
            <motion.div 
              key={feature.id}
              className="grid lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
            >
              {/* Feature Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center mb-6">
                  <div className="p-4 rounded-xl bg-brand-gold-500/20 text-brand-gold-400">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
                      {feature.title}
                    </h3>
                    <p className="text-lg" style={{ color: 'var(--fg-secondary)' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-brand-gold-400 mt-2 mr-3 flex-shrink-0"></div>
                      <span style={{ color: 'var(--fg-secondary)' }}>{detail}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => toggleDemo(feature.id)}
                  className="flex items-center px-6 py-3 rounded-lg border border-brand-gold-500 text-brand-gold-400 hover:bg-brand-gold-500/10 transition-all duration-300"
                >
                  {activeDemo === feature.id ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Hide Demo
                    </>
                  ) : (
                    <>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      View Interactive Demo
                    </>
                  )}
                </button>
              </div>

              {/* Feature Demo */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                  {/* Demo content based on feature type */}
                  {feature.id === 'semantic-search' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                        <div className="flex items-center mb-2">
                          <Search className="h-4 w-4 mr-2 text-brand-gold-400" />
                          <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>Query</span>
                        </div>
                        <p className="font-mono text-sm" style={{ color: 'var(--fg-primary)' }}>
                          "{feature.demo.query}"
                        </p>
                      </div>
                      {activeDemo === feature.id && (
                        <motion.div 
                          className="space-y-3"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {feature.demo.results?.map((result, idx) => (
                            <div key={idx} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)' }}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium" style={{ color: 'var(--fg-primary)' }}>{result.file}</span>
                                <span className="text-sm px-2 py-1 rounded bg-green-500/20 text-green-400">
                                  {result.confidence}%
                                </span>
                              </div>
                              <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{result.snippet}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  )}

                  {feature.id === 'dual-chunking' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                          <h4 className="text-sm font-medium mb-2 text-purple-400">Gist Mode (35 lines)</h4>
                          <div className="h-20 bg-gradient-to-b from-purple-500/20 to-transparent rounded border-l-2 border-purple-400 pl-3">
                            <p className="text-xs" style={{ color: 'var(--fg-secondary)' }}>
                              Large context chunks for topic understanding...
                            </p>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                          <h4 className="text-sm font-medium mb-2 text-green-400">Pinpoint Mode (10 lines)</h4>
                          <div className="h-20 bg-gradient-to-b from-green-500/20 to-transparent rounded border-l-2 border-green-400 pl-3">
                            <p className="text-xs" style={{ color: 'var(--fg-secondary)' }}>
                              Precise segments for exact location...
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {feature.id === 'confidence-scoring' && (
                    <div className="space-y-4">
                      {feature.demo.scores?.map((score, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{score.label}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <motion.div 
                                className={`h-full ${score.color.replace('text-', 'bg-')}`}
                                initial={{ width: 0 }}
                                animate={{ width: activeDemo === feature.id ? `${score.value}%` : '0%' }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                              />
                            </div>
                            <span className={`text-sm font-medium ${score.color}`}>{score.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {feature.id === 'realtime-sync' && (
                    <div className="space-y-3">
                      <div className="flex items-center mb-4">
                        <Activity className="h-4 w-4 mr-2 text-green-400" />
                        <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>Live File Events</span>
                        <div className="ml-auto">
                          <RefreshCw className="h-4 w-4 text-brand-gold-400 animate-spin" />
                        </div>
                      </div>
                      {activeDemo === feature.id && feature.demo.events?.map((event, idx) => (
                        <motion.div 
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-lg" 
                          style={{ backgroundColor: 'var(--bg-muted)' }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.2 }}
                        >
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-3 ${
                              event.type === 'created' ? 'bg-green-400' : 
                              event.type === 'modified' ? 'bg-yellow-400' : 'bg-red-400'
                            }`} />
                            <span className="text-sm" style={{ color: 'var(--fg-primary)' }}>{event.file}</span>
                          </div>
                          <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>{event.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {feature.id === 'github-integration' && (
                    <div className="space-y-4">
                      <div className="flex items-center mb-4">
                        <GitBranch className="h-4 w-4 mr-2 text-blue-400" />
                        <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>Connected Repositories</span>
                      </div>
                      {activeDemo === feature.id && feature.demo.repos?.map((repo, idx) => (
                        <motion.div 
                          key={idx}
                          className="p-4 rounded-lg border" 
                          style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium" style={{ color: 'var(--fg-primary)' }}>{repo.name}</span>
                            <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
                              Synced {repo.lastSync}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                            <span>{repo.branches} branches</span>
                            <span>{repo.files} files indexed</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {feature.id === 'multi-format' && (
                    <div className="grid grid-cols-2 gap-4">
                      {feature.demo.formats?.map((format, idx) => (
                        <motion.div 
                          key={idx}
                          className="p-4 rounded-lg text-center" 
                          style={{ backgroundColor: 'var(--bg-muted)' }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: activeDemo === feature.id ? 1 : 0.7, scale: activeDemo === feature.id ? 1 : 0.9 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                          <div className="text-2xl mb-2">{format.icon}</div>
                          <div className="font-medium mb-1" style={{ color: 'var(--fg-primary)' }}>{format.type}</div>
                          <div className="text-xs mb-1" style={{ color: 'var(--fg-secondary)' }}>{format.count}</div>
                          <div className="text-xs text-brand-gold-400">{format.speed}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Performance Summary */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Feature Performance Benchmarks
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            Enterprise-grade performance metrics demonstrating FileHawk's production readiness 
            and scalability across diverse organizational environments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { feature: 'Semantic Search', metric: '95.7%', description: 'Natural language understanding accuracy' },
            { feature: 'Dual Chunking', metric: '94.3%', description: 'Semantic boundary detection precision' },
            { feature: 'Confidence Scoring', metric: '0.87', description: 'Correlation with human relevance ratings' },
            { feature: 'Real-time Sync', metric: '<100ms', description: 'File change detection latency' },
            { feature: 'GitHub Integration', metric: '99.9%', description: 'Repository synchronization reliability' },
            { feature: 'Multi-format Processing', metric: '5,000', description: 'Files per minute indexing speed' }
          ].map((benchmark, index) => (
            <motion.div 
              key={benchmark.feature}
              className="p-6 rounded-xl border text-center"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
            >
              <div className="text-3xl font-bold text-brand-gold-400 mb-2">
                {benchmark.metric}
              </div>
              <div className="font-semibold mb-3" style={{ color: 'var(--fg-primary)' }}>
                {benchmark.feature}
              </div>
              <div className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                {benchmark.description}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Next Steps */}
      <motion.section 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Explore Advanced Capabilities
          </h3>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            Dive deeper into FileHawk's technical architecture and discover how our AI algorithms 
            deliver enterprise-grade semantic intelligence.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a 
              href="/documentation/algorithms"
              className="p-4 rounded-lg border border-brand-gold-500/30 bg-brand-gold-500/10 text-brand-gold-400 font-semibold hover:bg-brand-gold-500/20 transition-all duration-300 flex items-center justify-center"
            >
              <Brain className="mr-2 h-5 w-5" />
              AI Algorithms
            </a>
            <a 
              href="/documentation/architecture"
              className="p-4 rounded-lg border border-brand-gold-500/30 bg-brand-gold-500/10 text-brand-gold-400 font-semibold hover:bg-brand-gold-500/20 transition-all duration-300 flex items-center justify-center"
            >
              <Database className="mr-2 h-5 w-5" />
              Architecture
            </a>
            <a 
              href="/documentation/api"
              className="p-4 rounded-lg border border-brand-gold-500/30 bg-brand-gold-500/10 text-brand-gold-400 font-semibold hover:bg-brand-gold-500/20 transition-all duration-300 flex items-center justify-center"
            >
              <Code className="mr-2 h-5 w-5" />
              API Reference
            </a>
            <a 
              href="#download"
              className="p-4 rounded-lg bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-black font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Download
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default FeaturesSection
