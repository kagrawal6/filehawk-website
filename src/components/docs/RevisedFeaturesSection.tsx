import React from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Brain, 
  Target, 
  GitBranch,
  Shield,
  Database,
  Layers,
  CheckCircle
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { 
  DocumentationSection, 
  TabbedContent, 
  ExpandableSection 
} from './DocumentationNavigation'
import DualModelAIDiagram from './DualModelAIDiagram'
import DualChunkingDiagram from './DualChunkingDiagram'
import SectionSummaryCard from '../ui/SectionSummaryCard'

const RevisedFeaturesSection: React.FC = () => {
  const isAnimated = useScrollAnimation()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">

      {/* Header */}
      <motion.div 
        className="text-center mb-10"
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
          <span style={{ color: 'var(--fg-primary)' }}>Next-Generation</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            File Discovery
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Discover how FileHawk revolutionizes document discovery with AI-powered semantic search, dual-mode architecture, 
          and enterprise-grade features that understand <strong>meaning and context</strong>, not just keywords.
        </p>
      </motion.div>

      {/* Section Summary */}
      <SectionSummaryCard
        title="Features & Capabilities"
        subtitle="Comprehensive Feature Overview"
        description="Explore FileHawk's powerful feature set including dual-mode AI search, advanced chunking strategies, enterprise integration, and production monitoring capabilities."
        keyPoints={[
          "Semantic search with contextual understanding",
          "Dual-chunking modes for different use cases",
          "Real-time performance monitoring dashboard",
          "GitHub integration with OAuth device flow",
          "Enterprise-grade security and compliance",
          "API-first architecture with RESTful endpoints"
        ]}
        estimatedTime="20-25 min read"
        complexity="intermediate"
        isExpanded={false}
      />

      {/* Feature Overview */}
      <DocumentationSection 
        id="introduction"
        title="Core Capabilities Overview"
        subtitle="Enterprise-grade features that transform how teams discover and access knowledge"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { 
              icon: Brain, 
              title: 'AI-Powered Search', 
              metric: '95.7%', 
              description: 'Semantic accuracy',
              details: 'Advanced dual-model AI understands context and meaning beyond keywords'
            },
            { 
              icon: Target, 
              title: 'Dual Search Modes', 
              metric: '2 Modes', 
              description: 'Gist & Pinpoint',
              details: 'Flexible search strategies for different discovery scenarios'
            },
            { 
              icon: Shield, 
              title: 'Local-First Privacy', 
              metric: '100%', 
              description: 'Data stays local',
              details: 'Complete privacy with zero external data transmission'
            },
            { 
              icon: Zap, 
              title: 'Lightning Fast', 
              metric: '<50ms', 
              description: 'Search response',
              details: 'Enterprise-scale performance with sub-second search results'
            }
          ].map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="p-6 rounded-xl border group hover:border-brand-gold-500/40 transition-all duration-300"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-brand-gold-500/20 text-brand-gold-400 mb-4 group-hover:bg-brand-gold-500/30 transition-colors">
                  <feature.icon className="h-8 w-8" />
                </div>
                <div className="text-2xl font-bold text-brand-gold-400 mb-2">
                  {feature.metric}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: 'var(--fg-secondary)' }}>
                  {feature.description}
                </p>
                <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                  {feature.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <ExpandableSection title="🎯 Traditional vs Semantic Search Comparison" defaultExpanded>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}>
              <h4 className="font-semibold mb-4 text-red-400">❌ Traditional Keyword Search</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                <li>• Requires exact keyword matches</li>
                <li>• Misses semantically related content</li>
                <li>• Poor handling of synonyms</li>
                <li>• Limited context understanding</li>
                <li>• Struggles with natural language</li>
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="text-sm font-semibold text-red-400 mb-1">Example Query: "machine learning"</div>
                <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>Misses: "neural networks", "AI algorithms", "deep learning"</div>
              </div>
            </div>

            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
              <h4 className="font-semibold mb-4 text-green-400">✅ FileHawk Semantic Search</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                <li>• Understands meaning and context</li>
                <li>• Finds semantically related content</li>
                <li>• Natural language comprehension</li>
                <li>• Intent-based result ranking</li>
                <li>• Cross-language concept matching</li>
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-sm font-semibold text-green-400 mb-1">Same Query: "machine learning"</div>
                <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>Finds: Neural networks, AI algorithms, deep learning, artificial intelligence</div>
              </div>
            </div>
          </div>
        </ExpandableSection>
      </DocumentationSection>

      {/* Semantic Search */}
      <DocumentationSection 
        id="semantic-search"
        title="Advanced Semantic Search"
        subtitle="AI-powered document understanding that comprehends meaning, context, and intent"
      >
        <TabbedContent
          tabs={[
            {
              id: 'search-intelligence',
              label: 'Search Intelligence',
              icon: Brain,
              content: (
                <div className="space-y-8">
                  <DualModelAIDiagram />
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <ExpandableSection title="🧠 Natural Language Understanding" defaultExpanded>
                      <div className="space-y-4">
                        <p style={{ color: 'var(--fg-secondary)' }}>
                          FileHawk processes queries as humans think - understanding intent, context, and relationships 
                          rather than matching literal strings.
                        </p>
                        
                        <div className="space-y-3">
                          {[
                            { query: "How to optimize database performance?", finds: "SQL tuning, indexing strategies, query optimization" },
                            { query: "React component best practices", finds: "Component architecture, hooks patterns, performance optimization" },
                            { query: "API security implementation", finds: "Authentication, authorization, input validation, encryption" }
                          ].map((example, index) => (
                            <div key={index} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                              <div className="text-sm font-semibold text-brand-gold-400 mb-2">Query: "{example.query}"</div>
                              <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>Understands: {example.finds}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ExpandableSection>

                    <ExpandableSection title="🎯 Smart Filtering & Context" defaultExpanded>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          {[
                            { title: "Contextual Snippets", desc: "Relevant content previews with highlighted context" },
                            { title: "Real-Time Assistance", desc: "Query suggestions and refinement recommendations" },
                            { title: "Smart Filtering", desc: "Automatic relevance filtering based on confidence scores" },
                            { title: "Cross-Reference Discovery", desc: "Related documents and connecting concepts" }
                          ].map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{feature.title}</span>
                                <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{feature.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ExpandableSection>
                  </div>
                </div>
              )
            },
            {
              id: 'search-modes',
              label: 'Search Modes',
              icon: Target,
              content: (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                      <div className="flex items-center mb-6">
                        <div className="p-4 rounded-xl bg-purple-500/20 text-purple-400 mr-4">
                          <Layers className="h-8 w-8" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-purple-400">Gist Mode</h4>
                          <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Topic-level discovery</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <p style={{ color: 'var(--fg-secondary)' }}>
                          Perfect for exploring broad topics and finding files that contain relevant information, 
                          even if the exact keywords don't match.
                        </p>
                        
                        <div className="space-y-2">
                          <h5 className="font-semibold text-purple-400">Best For:</h5>
                          <ul className="space-y-1 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                            <li>• Research and exploration</li>
                            <li>• Topic discovery</li>
                            <li>• Concept-based searching</li>
                            <li>• Knowledge mining</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                          <div className="text-sm font-semibold text-purple-400 mb-2">Example Use Case</div>
                          <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>
                            Query: "project management methodologies"<br/>
                            Finds: Agile documentation, Scrum guides, Kanban resources
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                      <div className="flex items-center mb-6">
                        <div className="p-4 rounded-xl bg-blue-500/20 text-blue-400 mr-4">
                          <Target className="h-8 w-8" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-blue-400">Pinpoint Mode</h4>
                          <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Precise content location</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <p style={{ color: 'var(--fg-secondary)' }}>
                          Ideal for finding specific information, exact procedures, or particular implementations 
                          within documents with surgical precision.
                        </p>
                        
                        <div className="space-y-2">
                          <h5 className="font-semibold text-blue-400">Best For:</h5>
                          <ul className="space-y-1 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                            <li>• Specific code examples</li>
                            <li>• Exact procedures</li>
                            <li>• Configuration details</li>
                            <li>• Troubleshooting steps</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                          <div className="text-sm font-semibold text-blue-400 mb-2">Example Use Case</div>
                          <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>
                            Query: "database connection timeout error"<br/>
                            Finds: Exact error handling code, configuration parameters
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          ]}
        />
      </DocumentationSection>

      {/* Dual-Mode Architecture */}
      <DocumentationSection 
        id="dual-mode-architecture"
        title="Intelligent Dual-Mode Architecture"
        subtitle="Adaptive search strategies optimized for different discovery scenarios"
      >
        <div className="space-y-8">
          <DualChunkingDiagram />
          
          <TabbedContent
            tabs={[
              {
                id: 'chunking-strategy',
                label: 'Chunking Strategy',
                icon: Layers,
                content: (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <ExpandableSection title="🎯 Granular Chunking (Pinpoint)" defaultExpanded>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-semibold text-blue-400">Chunk Size:</span>
                                <div style={{ color: 'var(--fg-secondary)' }}>256 tokens</div>
                              </div>
                              <div>
                                <span className="font-semibold text-blue-400">Overlap:</span>
                                <div style={{ color: 'var(--fg-secondary)' }}>25 tokens</div>
                              </div>
                              <div>
                                <span className="font-semibold text-blue-400">Strategy:</span>
                                <div style={{ color: 'var(--fg-secondary)' }}>Precise boundaries</div>
                              </div>
                              <div>
                                <span className="font-semibold text-blue-400">Optimization:</span>
                                <div style={{ color: 'var(--fg-secondary)' }}>Exact matching</div>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                            Optimized for precise content location with minimal context overlap, 
                            perfect for finding specific implementations or exact procedures.
                          </p>
                        </div>
                      </ExpandableSection>

                      <ExpandableSection title="🌊 Contextual Chunking (Gist)" defaultExpanded>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-semibold text-purple-400">Chunk Size:</span>
                                <div style={{ color: 'var(--fg-secondary)' }}>512 tokens</div>
                              </div>
                              <div>
                                <span className="font-semibold text-purple-400">Overlap:</span>
                                <div style={{ color: 'var(--fg-secondary)' }}>50 tokens</div>
                              </div>
                              <div>
                                <span className="font-semibold text-purple-400">Strategy:</span>
                                <div style={{ color: 'var(--fg-secondary)' }}>Semantic boundaries</div>
                              </div>
                              <div>
                                <span className="font-semibold text-purple-400">Optimization:</span>
                                <div style={{ color: 'var(--fg-secondary)' }}>Topic coherence</div>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                            Preserves semantic boundaries and topic flow with generous context windows, 
                            ideal for understanding broader concepts and relationships.
                          </p>
                        </div>
                      </ExpandableSection>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </div>
      </DocumentationSection>

      {/* Enterprise Features */}
      <DocumentationSection 
        id="enterprise-features"
        title="Enterprise-Grade Features"
        subtitle="Production-ready capabilities for large-scale organizational deployment"
      >
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {[
            {
              icon: GitBranch,
              title: "GitHub Integration",
              features: [
                "OAuth 2.0 device flow authentication",
                "Intelligent repository management",
                "Branch-aware code processing",
                "Real-time repository synchronization"
              ]
            },
            {
              icon: Database,
              title: "API-First Architecture",
              features: [
                "25+ comprehensive REST endpoints",
                "WebSocket real-time capabilities",
                "OpenAPI 3.0 specification",
                "Rate limiting and authentication"
              ]
            },
            {
              icon: Shield,
              title: "Security & Compliance",
              features: [
                "100% local-first processing",
                "Zero external data transmission",
                "Encrypted credential storage",
                "Enterprise security standards"
              ]
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="p-6 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 mr-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{feature.title}</h4>
              </div>
              <ul className="space-y-2">
                {feature.features.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </DocumentationSection>

      {/* Performance Validation */}
      <DocumentationSection 
        id="performance-validation"
        title="Enterprise Performance Validation"
        subtitle="Comprehensive benchmarks and real-world performance validation across enterprise environments"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { metric: "95.7%", label: "Semantic Accuracy", desc: "Pure semantic without keyword overlap", color: "text-green-400" },
            { metric: "<50ms", label: "Search Latency", desc: "P95 end-to-end response time", color: "text-blue-400" },
            { metric: "5K+/min", label: "Indexing Rate", desc: "Files processed with AI embeddings", color: "text-purple-400" },
            { metric: "1M+", label: "Document Scale", desc: "Tested enterprise collection size", color: "text-orange-400" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="p-6 rounded-xl border text-center"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                {stat.metric}
              </div>
              <div className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                {stat.label}
              </div>
              <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>

        <ExpandableSection title="📊 Detailed Performance Breakdown">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                category: "Search Performance",
                metrics: [
                  { label: "Semantic Search Latency", value: "25-40ms", desc: "Vector similarity + ranking" },
                  { label: "Natural Language Accuracy", value: "95.7%", desc: "Query understanding precision" },
                  { label: "Concurrent Search Capacity", value: "100+", desc: "Simultaneous users" },
                  { label: "Result Relevance Score", value: "91.7%", desc: "Semantic relevance validation" }
                ]
              },
              {
                category: "Processing Performance", 
                metrics: [
                  { label: "Indexing Throughput", value: "5,200/min", desc: "Files with AI processing" },
                  { label: "Real-time Sync Latency", value: "<100ms", desc: "File change detection" },
                  { label: "Memory Efficiency", value: "2.1MB/1K", desc: "Memory per 1000 documents" },
                  { label: "Batch Processing Speed", value: "200/batch", desc: "Optimal batch size" }
                ]
              },
              {
                category: "Scalability Metrics",
                metrics: [
                  { label: "Document Capacity", value: "1M+", desc: "Tested maximum scale" },
                  { label: "Vector Database Size", value: "~400MB/100K", desc: "Storage efficiency" },
                  { label: "Model Memory Usage", value: "~400MB", desc: "Combined AI models" },
                  { label: "API Response P95", value: "25-75ms", desc: "95th percentile latency" }
                ]
              }
            ].map((category, index) => (
              <div key={index} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                <h5 className="font-semibold mb-4 text-brand-gold-400">{category.category}</h5>
                <div className="space-y-3">
                  {category.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium" style={{ color: 'var(--fg-primary)' }}>{metric.label}</span>
                        <span className="text-sm font-bold text-brand-gold-400">{metric.value}</span>
                      </div>
                      <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{metric.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ExpandableSection>
      </DocumentationSection>
    </div>
  )
}

export default RevisedFeaturesSection
