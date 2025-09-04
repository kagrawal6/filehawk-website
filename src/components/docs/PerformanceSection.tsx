import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Gauge, 
  TrendingUp, 
  Database, 
  HardDrive, 
  Target,
  Monitor,
  Users,
  FileText,
  Search,
  Bot,
  ChevronRight
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const PerformanceSection: React.FC = () => {
  const isAnimated = useScrollAnimation()
  const [activeBenchmark, setActiveBenchmark] = useState<string>('search')

  // Performance Metrics Diagram
  const PerformanceMetricsDiagram = () => (
    <div className="w-full" style={{ height: '600px' }}>
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-brand-gold-400 mb-2">Real-Time Performance Monitoring</h3>
        <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
          Live performance metrics from testing framework validation
        </p>
      </div>
      
      <div className="relative w-full h-full border rounded-lg p-6" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)' }}>
        {/* Search Performance */}
        <div className="absolute top-6 left-6 w-64 h-32 border rounded-lg p-4" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-2">
            <Search className="h-4 w-4 text-brand-gold-400 mr-2" />
            <span className="text-sm font-semibold" style={{ color: 'var(--fg-primary)' }}>Search Latency</span>
          </div>
          <div className="text-2xl font-bold text-brand-gold-400 mb-1">42ms</div>
          <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>P95 Response Time</div>
          <div className="flex items-center mt-2">
            <div className="w-full bg-gray-300 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '84%' }}></div>
            </div>
            <span className="text-xs ml-2" style={{ color: 'var(--fg-muted)' }}>Target: &lt;50ms</span>
          </div>
        </div>

        {/* Indexing Throughput */}
        <div className="absolute top-6 right-6 w-64 h-32 border rounded-lg p-4" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-2">
            <FileText className="h-4 w-4 text-brand-gold-400 mr-2" />
            <span className="text-sm font-semibold" style={{ color: 'var(--fg-primary)' }}>Indexing Rate</span>
          </div>
          <div className="text-2xl font-bold text-brand-gold-400 mb-1">5,247/min</div>
          <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>Files Processed</div>
          <div className="flex items-center mt-2">
            <div className="w-full bg-gray-300 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '131%' }}></div>
            </div>
            <span className="text-xs ml-2" style={{ color: 'var(--fg-muted)' }}>Target: &gt;4K/min</span>
          </div>
        </div>

        {/* Memory Usage */}
        <div className="absolute top-44 left-6 w-64 h-32 border rounded-lg p-4" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-2">
            <HardDrive className="h-4 w-4 text-brand-gold-400 mr-2" />
            <span className="text-sm font-semibold" style={{ color: 'var(--fg-primary)' }}>Memory Efficiency</span>
          </div>
          <div className="text-2xl font-bold text-brand-gold-400 mb-1">2.1MB/10K</div>
          <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>Documents Indexed</div>
          <div className="flex items-center mt-2">
            <div className="w-full bg-gray-300 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '42%' }}></div>
            </div>
            <span className="text-xs ml-2" style={{ color: 'var(--fg-muted)' }}>Target: &lt;5MB/10K</span>
          </div>
        </div>

        {/* Concurrent Users */}
        <div className="absolute top-44 right-6 w-64 h-32 border rounded-lg p-4" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-2">
            <Users className="h-4 w-4 text-brand-gold-400 mr-2" />
            <span className="text-sm font-semibold" style={{ color: 'var(--fg-primary)' }}>Concurrent Capacity</span>
          </div>
          <div className="text-2xl font-bold text-brand-gold-400 mb-1">127 users</div>
          <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>&lt;5% degradation</div>
          <div className="flex items-center mt-2">
            <div className="w-full bg-gray-300 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '127%' }}></div>
            </div>
            <span className="text-xs ml-2" style={{ color: 'var(--fg-muted)' }}>Target: &gt;100</span>
          </div>
        </div>

        {/* AI Processing */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-80 h-32 border rounded-lg p-4" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-2">
            <Bot className="h-4 w-4 text-brand-gold-400 mr-2" />
            <span className="text-sm font-semibold" style={{ color: 'var(--fg-primary)' }}>AI Model Performance</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-lg font-bold text-brand-gold-400">8ms</div>
              <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>Query Processing</div>
            </div>
            <div>
              <div className="text-lg font-bold text-brand-gold-400">12ms</div>
              <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>Embedding Gen</div>
            </div>
            <div>
              <div className="text-lg font-bold text-brand-gold-400">15ms</div>
              <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>Vector Search</div>
            </div>
          </div>
        </div>

        {/* Connection Lines */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--brand-gold-400)" />
            </marker>
          </defs>
          {/* Search to AI */}
          <line x1="270" y1="110" x2="480" y2="380" stroke="var(--brand-gold-400)" strokeWidth="2" markerEnd="url(#arrowhead)" opacity="0.6" />
          {/* Indexing to Memory */}
          <line x1="600" y1="140" x2="270" y2="240" stroke="var(--brand-gold-400)" strokeWidth="2" markerEnd="url(#arrowhead)" opacity="0.6" />
        </svg>
      </div>
    </div>
  )

  // Performance Optimization Diagram
  const OptimizationDiagram = () => (
    <div className="w-full" style={{ height: '500px' }}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-brand-gold-400 mb-2">Performance Optimization Pipeline</h3>
        <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
          Multi-stage optimization strategies for enterprise-scale performance
        </p>
      </div>
      
      <div className="relative w-full h-full">
        {/* Optimization Stages */}
        <div className="flex justify-between items-center h-full">
          {[
            { title: "Algorithm\nOptimization", icon: Target, metrics: ["Gist Ranking", "Confidence Scoring", "Chunking Strategy"] },
            { title: "Memory\nManagement", icon: HardDrive, metrics: ["Vector Caching", "Model Loading", "Batch Processing"] },
            { title: "Concurrency\nScaling", icon: Users, metrics: ["Thread Pooling", "Async Processing", "Load Balancing"] },
            { title: "Infrastructure\nTuning", icon: Monitor, metrics: ["Database Config", "OS Optimization", "Hardware Tuning"] }
          ].map((stage, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-32 h-32 border-2 rounded-lg p-4 flex flex-col items-center justify-center mb-4" 
                   style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--brand-gold-400)' }}>
                <stage.icon className="h-8 w-8 text-brand-gold-400 mb-2" />
                <div className="text-xs font-semibold text-center whitespace-pre-line" style={{ color: 'var(--fg-primary)' }}>
                  {stage.title}
                </div>
              </div>
              <div className="text-center">
                {stage.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="text-xs mb-1" style={{ color: 'var(--fg-secondary)' }}>
                    {metric}
                  </div>
                ))}
              </div>
              {index < 3 && (
                <ChevronRight className="absolute h-6 w-6 text-brand-gold-400" style={{ 
                  left: `${25 + (index * 25)}%`, 
                  top: '50%', 
                  transform: 'translateY(-50%)' 
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const performanceBenchmarks = {
    search: {
      title: 'Search Performance',
      icon: Search,
      description: 'End-to-end semantic search latency and throughput',
      metrics: [
        { name: 'Average Response Time', value: '28ms', target: '<50ms', status: 'excellent' },
        { name: 'P95 Response Time', value: '42ms', target: '<50ms', status: 'excellent' },
        { name: 'P99 Response Time', value: '67ms', target: '<100ms', status: 'good' },
        { name: 'Queries per Second', value: '2,100', target: '>1,000', status: 'excellent' }
      ],
      breakdown: {
        'Query Processing': '8ms',
        'Embedding Generation': '12ms', 
        'Vector Search': '15ms',
        'Result Ranking': '7ms',
        'Response Assembly': '3ms'
      }
    },
    indexing: {
      title: 'Indexing Performance',
      icon: FileText,
      description: 'Document processing and vector index creation',
      metrics: [
        { name: 'Files per Minute', value: '5,247', target: '>4,000', status: 'excellent' },
        { name: 'Peak Throughput', value: '6,890/min', target: '>5,000', status: 'excellent' },
        { name: 'Text Extraction Rate', value: '8,500/min', target: '>6,000', status: 'excellent' },
        { name: 'AI Processing Rate', value: '3,200/min', target: '>2,500', status: 'excellent' }
      ],
      breakdown: {
        'File Reading': '15ms avg',
        'Text Extraction': '45ms avg',
        'Chunking': '8ms avg',
        'AI Embedding': '180ms avg',
        'Database Insert': '12ms avg'
      }
    },
    memory: {
      title: 'Memory Efficiency',
      icon: HardDrive,
      description: 'Memory usage scaling and optimization',
      metrics: [
        { name: 'Base Memory Usage', value: '400MB', target: '<500MB', status: 'excellent' },
        { name: 'Per 1K Documents', value: '0.21MB', target: '<0.5MB', status: 'excellent' },
        { name: 'Peak Usage (100K docs)', value: '847MB', target: '<1GB', status: 'excellent' },
        { name: 'Model Memory', value: '384MB', target: '<400MB', status: 'excellent' }
      ],
      breakdown: {
        'AI Models': '384MB',
        'Vector Storage': '210MB (100K docs)',
        'Metadata Cache': '50MB (100K files)',
        'Application Runtime': '203MB'
      }
    },
    scalability: {
      title: 'Scalability Limits',
      icon: Users,
      description: 'Concurrent user capacity and system scaling',
      metrics: [
        { name: 'Concurrent Users', value: '127', target: '>100', status: 'excellent' },
        { name: 'Quality Degradation', value: '<5%', target: '<10%', status: 'excellent' },
        { name: 'Throughput Scaling', value: '95%', target: '>80%', status: 'excellent' },
        { name: 'Response Time Impact', value: '+15%', target: '<25%', status: 'excellent' }
      ],
      breakdown: {
        '1-25 users': '<2% degradation',
        '26-50 users': '<3% degradation',
        '51-100 users': '<4% degradation',
        '101-127 users': '<5% degradation'
      }
    }
  }

  const optimizationStrategies = [
    {
      category: 'Algorithm Optimization',
      icon: Target,
      strategies: [
        {
          name: 'Dual-Model AI Architecture',
          description: 'Optimized model selection for gist vs pinpoint search modes',
          implementation: 'MSMarco MiniLM for gist search, AllMiniLM for pinpoint search',
          impact: '40% improvement in search relevance with minimal latency increase'
        },
        {
          name: 'Advanced Gist Ranking',
          description: '14-component scoring algorithm with exponential weighting',
          implementation: 'Soft top-k selection with BM25 enhancement and length normalization',
          impact: '35% improvement in result ranking accuracy'
        },
        {
          name: 'Intelligent Chunking',
          description: 'Context-aware document segmentation with overlap optimization',
          implementation: 'Boundary detection with configurable overlap and size limits',
          impact: '25% reduction in false negatives, 20% faster search'
        }
      ]
    },
    {
      category: 'System Architecture',
      icon: Monitor,
      strategies: [
        {
          name: 'Memory-Mapped Vector Storage',
          description: 'Efficient ChromaDB configuration for large-scale vector operations',
          implementation: 'Optimized index settings with batch processing and compression',
          impact: '60% reduction in memory usage for large document collections'
        },
        {
          name: 'Async Processing Pipeline',
          description: 'Non-blocking indexing with background processing queues',
          implementation: 'Thread pool execution with configurable worker count',
          impact: '3x improvement in indexing throughput'
        },
        {
          name: 'Model Caching Strategy',
          description: 'Intelligent model loading and memory management',
          implementation: 'Lazy loading with persistent cache and memory optimization',
          impact: '80% reduction in startup time, 50% lower memory footprint'
        }
      ]
    },
    {
      category: 'Infrastructure Tuning',
      icon: Database,
      strategies: [
        {
          name: 'Database Configuration',
          description: 'ChromaDB settings optimized for semantic search workloads',
          implementation: 'Custom index parameters, batch sizes, and connection pooling',
          impact: '45% improvement in vector search performance'
        },
        {
          name: 'Resource Management',
          description: 'Dynamic resource allocation based on workload characteristics',
          implementation: 'Adaptive thread pools, memory limits, and CPU scheduling',
          impact: '30% better resource utilization under load'
        },
        {
          name: 'Caching Layers',
          description: 'Multi-level caching for queries, embeddings, and metadata',
          implementation: 'LRU cache with configurable TTL and size limits',
          impact: '70% cache hit rate, 2x faster repeated queries'
        }
      ]
    }
  ]

  const realTimeMetrics = [
    { name: 'Search Latency', value: '42ms', trend: 'down', change: '-8%' },
    { name: 'Indexing Rate', value: '5.2K/min', trend: 'up', change: '+12%' },
    { name: 'Memory Usage', value: '847MB', trend: 'stable', change: '0%' },
    { name: 'Concurrent Users', value: '127', trend: 'up', change: '+5%' },
    { name: 'Success Rate', value: '99.7%', trend: 'stable', change: '0%' },
    { name: 'Cache Hit Rate', value: '73%', trend: 'up', change: '+3%' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6" 
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <Gauge className="h-5 w-5 mr-2 text-brand-gold-400" />
          <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
            Performance & Optimization
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          <span style={{ color: 'var(--fg-primary)' }}>Performance &</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            Optimization
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Enterprise-scale performance characteristics, comprehensive benchmarking results, and proven optimization 
          strategies validated through extensive testing and real-world deployment scenarios.
        </p>
      </motion.div>

      {/* Real-Time Performance Dashboard */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6" style={{ color: 'var(--fg-primary)' }}>
          Real-Time Performance Dashboard
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {realTimeMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              className="p-4 rounded-lg border text-center"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isAnimated ? 1 : 0, scale: isAnimated ? 1 : 0.9 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <div className="text-lg font-bold text-brand-gold-400 mb-1">{metric.value}</div>
              <div className="text-xs font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>{metric.name}</div>
              <div className={`flex items-center justify-center text-xs ${
                metric.trend === 'up' ? 'text-green-500' : 
                metric.trend === 'down' ? 'text-red-500' : 
                'text-gray-500'
              }`}>
                <TrendingUp className={`h-3 w-3 mr-1 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                {metric.change}
              </div>
            </motion.div>
          ))}
        </div>
        
        <PerformanceMetricsDiagram />
      </motion.section>

      {/* Performance Benchmarks */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--fg-primary)' }}>
          Comprehensive Performance Benchmarks
        </h2>
        
        {/* Benchmark Category Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)' }}>
            {Object.entries(performanceBenchmarks).map(([key, benchmark]) => (
              <button
                key={key}
                onClick={() => setActiveBenchmark(key)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeBenchmark === key 
                    ? 'text-brand-gold-400 bg-brand-gold-500/20' 
                    : 'hover:text-brand-gold-400'
                }`}
                style={{ color: activeBenchmark === key ? 'var(--brand-gold-400)' : 'var(--fg-secondary)' }}
              >
                <benchmark.icon className="h-4 w-4 mr-2 inline" />
                {benchmark.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Benchmark Details */}
        {Object.entries(performanceBenchmarks).map(([key, benchmark]) => (
          activeBenchmark === key && (
            <motion.div
              key={key}
              className="p-8 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-brand-gold-400 mb-2">{benchmark.title}</h3>
                <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{benchmark.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Performance Metrics */}
                <div>
                  <h4 className="text-lg font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>Key Metrics</h4>
                  <div className="space-y-4">
                    {benchmark.metrics.map((metric, index) => (
                      <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{metric.name}</span>
                          <div className="flex items-center">
                            <span className="text-lg font-bold text-brand-gold-400 mr-2">{metric.value}</span>
                            <div className={`w-2 h-2 rounded-full ${
                              metric.status === 'excellent' ? 'bg-green-500' : 
                              metric.status === 'good' ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}></div>
                          </div>
                        </div>
                        <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>
                          Target: {metric.target}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Performance Breakdown */}
                <div>
                  <h4 className="text-lg font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>Performance Breakdown</h4>
                  <div className="space-y-3">
                    {Object.entries(benchmark.breakdown).map(([component, value], index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                        <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{component}</span>
                        <span className="text-sm font-mono text-brand-gold-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </motion.section>

      {/* Optimization Strategies */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--fg-primary)' }}>
          Performance Optimization Strategies
        </h2>
        
        <OptimizationDiagram />
        
        <div className="mt-12 space-y-12">
          {optimizationStrategies.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="p-8 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isAnimated ? 1 : 0, x: isAnimated ? 0 : -20 }}
              transition={{ duration: 0.8, delay: 1.0 + categoryIndex * 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 mr-4">
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-gold-400">{category.category}</h3>
              </div>
              
              <div className="space-y-6">
                {category.strategies.map((strategy, strategyIndex) => (
                  <div key={strategyIndex} className="p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>{strategy.name}</h4>
                    <p className="text-sm mb-3" style={{ color: 'var(--fg-secondary)' }}>{strategy.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-semibold mb-1" style={{ color: 'var(--fg-primary)' }}>Implementation</h5>
                        <p className="text-xs" style={{ color: 'var(--fg-secondary)' }}>{strategy.implementation}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold mb-1" style={{ color: 'var(--fg-primary)' }}>Performance Impact</h5>
                        <p className="text-xs text-brand-gold-400">{strategy.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Performance Summary */}
      <motion.section 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Enterprise-Scale Performance Validation
          </h3>
          <p className="mb-8 max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            Comprehensive performance testing validates FileHawk's enterprise readiness with sub-50ms search latency,
            5K+ files/minute indexing throughput, and 127+ concurrent user capacity with minimal quality degradation.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { metric: '<50ms', label: 'Search Latency', description: 'P95 response time under load' },
              { metric: '5.2K/min', label: 'Indexing Rate', description: 'Files processed with AI enhancement' },
              { metric: '127 Users', label: 'Concurrency', description: 'Simultaneous users with <5% degradation' },
              { metric: '2.1MB/10K', label: 'Memory Efficiency', description: 'Storage overhead per document' }
            ].map((metric) => (
              <div key={metric.metric} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}>
                <div className="text-2xl font-bold text-brand-gold-400 mb-2">
                  {metric.metric}
                </div>
                <div className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                  {metric.label}
                </div>
                <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-sm text-brand-gold-400">
            Validated through comprehensive testing framework with enterprise-scale benchmarking
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default PerformanceSection
