import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Layers, 
  Brain, 
  Zap, 
  Shield, 
  Database, 
  GitBranch, 
  Search, 
  FileText, 
  Monitor, 
  Network,
  Target,
  BarChart3,
  Users
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { 
  TableOfContents, 
  DocumentationSection, 
  TabbedContent, 
  ExpandableSection 
} from './DocumentationNavigation'
import { SystemArchitectureDiagram } from './InteractiveDiagrams'

const RevisedOverviewSection: React.FC = () => {
  const isAnimated = useScrollAnimation()
  const [currentSection, setCurrentSection] = useState('introduction')

  // Define page sections for TOC
  const sections = [
    { id: 'introduction', title: 'Introduction', level: 1, isActive: currentSection === 'introduction' },
    { id: 'key-capabilities', title: 'Key Capabilities', level: 1, isActive: currentSection === 'key-capabilities' },
    { id: 'architecture-overview', title: 'Architecture Overview', level: 1, isActive: currentSection === 'architecture-overview' },
    { id: 'core-features', title: 'Core Features', level: 1, isActive: currentSection === 'core-features' },
    { id: 'enterprise-features', title: 'Enterprise Features', level: 1, isActive: currentSection === 'enterprise-features' },
    { id: 'getting-started', title: 'Getting Started', level: 1, isActive: currentSection === 'getting-started' }
  ]

  // Update current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduction', 'key-capabilities', 'architecture-overview', 'core-features', 'enterprise-features', 'getting-started']
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setCurrentSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSectionChange = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Table of Contents */}
      <TableOfContents 
        sections={sections}
        onSectionChange={handleSectionChange}
      />

      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6" 
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <Layers className="h-5 w-5 mr-2 text-brand-gold-400" />
          <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
            FileHawk System Overview
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          <span style={{ color: 'var(--fg-primary)' }}>AI-Powered Semantic</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            File Discovery
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          FileHawk revolutionizes document discovery with enterprise-grade AI that understands <strong>meaning and context</strong>, 
          not just keywords. Transform how your organization finds, accesses, and utilizes knowledge across all digital content.
        </p>
      </motion.div>

      {/* Introduction Section */}
      <DocumentationSection 
        id="introduction"
        title="What is FileHawk?"
        subtitle="A comprehensive semantic search platform that brings AI intelligence to document discovery"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <ExpandableSection title="🎯 The Problem We Solve" defaultExpanded level="info">
              <div className="space-y-4">
                <p style={{ color: 'var(--fg-secondary)' }}>
                  Traditional file search is broken. Finding specific information across thousands of documents, 
                  repositories, and file formats remains a daily struggle for knowledge workers and developers.
                </p>
                <ul className="list-disc list-inside space-y-2" style={{ color: 'var(--fg-secondary)' }}>
                  <li><strong>Keyword Limitations:</strong> Exact matches miss semantically related content</li>
                  <li><strong>Context Loss:</strong> Search doesn't understand document meaning or relationships</li>
                  <li><strong>Scale Challenges:</strong> Performance degrades with large document collections</li>
                  <li><strong>Privacy Concerns:</strong> Cloud-based solutions expose sensitive organizational data</li>
                </ul>
              </div>
            </ExpandableSection>
            
            <ExpandableSection title="💡 Our Solution" defaultExpanded level="success">
              <div className="space-y-4">
                <p style={{ color: 'var(--fg-secondary)' }}>
                  FileHawk uses advanced AI models to understand the semantic meaning of both your queries and documents, 
                  delivering precise results while maintaining complete data privacy through local-first architecture.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { metric: "95.7%", label: "Accuracy", desc: "Semantic understanding" },
                    { metric: "<50ms", label: "Speed", desc: "Average search time" },
                    { metric: "1M+", label: "Scale", desc: "Documents supported" },
                    { metric: "100%", label: "Privacy", desc: "Local processing" }
                  ].map((stat) => (
                    <div key={stat.metric} className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                      <div className="text-xl font-bold text-brand-gold-400">{stat.metric}</div>
                      <div className="text-sm font-semibold" style={{ color: 'var(--fg-primary)' }}>{stat.label}</div>
                      <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{stat.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ExpandableSection>
          </div>
          
          <div className="relative">
            <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--fg-primary)' }}>
                🚀 Live Demo
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                  <div className="flex items-center mb-2">
                    <Search className="h-4 w-4 mr-2 text-brand-gold-400" />
                    <span className="text-sm font-mono" style={{ color: 'var(--fg-secondary)' }}>
                      Query: "machine learning algorithms for data processing"
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                    Semantic search finds relevant content even without exact keyword matches
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { file: "ml_research/neural_networks.pdf", confidence: "92.4%", snippet: "Deep learning architectures for processing..." },
                    { file: "projects/data_pipeline/README.md", confidence: "87.9%", snippet: "ETL pipeline using ML techniques..." },
                    { file: "algorithms/clustering.py", confidence: "84.3%", snippet: "K-means implementation for data..." }
                  ].map((result, index) => (
                    <motion.div 
                      key={index}
                      className="p-3 rounded-lg border"
                      style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-mono text-brand-gold-400">{result.file}</span>
                        <span className="text-xs font-semibold text-green-400">{result.confidence}</span>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--fg-secondary)' }}>{result.snippet}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentationSection>

      {/* Key Capabilities */}
      <DocumentationSection 
        id="key-capabilities"
        title="Key Capabilities"
        subtitle="Enterprise-grade features that transform how teams discover and access knowledge"
      >
        <TabbedContent
          tabs={[
            {
              id: 'semantic-search',
              label: 'Semantic Search',
              icon: Brain,
              content: (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-brand-gold-400">Dual AI Models</h4>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                          <div className="flex items-center mb-2">
                            <Target className="h-5 w-5 mr-2 text-purple-400" />
                            <span className="font-semibold" style={{ color: 'var(--fg-primary)' }}>Gist Mode</span>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                            MSMarco MiniLM for broad topic discovery and file-level relevance assessment
                          </p>
                        </div>
                        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                          <div className="flex items-center mb-2">
                            <Zap className="h-5 w-5 mr-2 text-blue-400" />
                            <span className="font-semibold" style={{ color: 'var(--fg-primary)' }}>Pinpoint Mode</span>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                            AllMiniLM L6 for precise content location and granular matching
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-brand-gold-400">Advanced Features</h4>
                      <ul className="space-y-3">
                        {[
                          "14-component confidence scoring system",
                          "Soft top-k mathematical ranking",
                          "Filename semantic enhancement",
                          "Multi-format content extraction",
                          "Real-time result streaming"
                        ].map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            },
            {
              id: 'enterprise-integration',
              label: 'Enterprise Integration',
              icon: GitBranch,
              content: (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        icon: GitBranch,
                        title: "GitHub Integration",
                        features: ["OAuth 2.0 device flow", "Repository management", "Branch intelligence", "Real-time sync"]
                      },
                      {
                        icon: Database,
                        title: "API-First Design",
                        features: ["25+ REST endpoints", "WebSocket real-time", "OpenAPI specification", "Rate limiting & auth"]
                      },
                      {
                        icon: Shield,
                        title: "Security & Privacy",
                        features: ["Local-first processing", "Zero data transmission", "Encrypted token storage", "GDPR compliant"]
                      }
                    ].map((feature, index) => (
                      <div key={index} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
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
                      </div>
                    ))}
                  </div>
                </div>
              )
            },
            {
              id: 'performance',
              label: 'Performance',
              icon: BarChart3,
              content: (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { metric: "<50ms", label: "Search Latency", desc: "P95 response time", color: "text-green-400" },
                      { metric: "5K+/min", label: "Indexing Rate", desc: "Files processed", color: "text-blue-400" },
                      { metric: "127+", label: "Concurrent Users", desc: "Tested capacity", color: "text-purple-400" },
                      { metric: "2.1MB/1K", label: "Memory Efficiency", desc: "Per 1000 documents", color: "text-orange-400" }
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
                        <div className={`text-2xl font-bold mb-2 ${stat.color}`}>
                          {stat.metric}
                        </div>
                        <div className="font-semibold mb-1" style={{ color: 'var(--fg-primary)' }}>
                          {stat.label}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                          {stat.desc}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <ExpandableSection title="📊 Detailed Performance Metrics">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-brand-gold-400">Search Performance</h5>
                        <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                          <div>• Semantic similarity computation: 25-40ms</div>
                          <div>• Vector database query: 8-15ms</div>
                          <div>• Result ranking & assembly: 5-12ms</div>
                          <div>• Confidence scoring: 3-8ms</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-brand-gold-400">Scalability Limits</h5>
                        <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                          <div>• Maximum documents: 1M+ tested</div>
                          <div>• Vector database size: ~400MB/100K docs</div>
                          <div>• Memory usage: ~400MB AI models</div>
                          <div>• Concurrent API requests: 100+</div>
                        </div>
                      </div>
                    </div>
                  </ExpandableSection>
                </div>
              )
            }
          ]}
        />
      </DocumentationSection>

      {/* Architecture Overview */}
      <DocumentationSection 
        id="architecture-overview"
        title="System Architecture"
        subtitle="Interactive exploration of FileHawk's local-first, AI-powered architecture"
      >
        <div className="space-y-8">
          <SystemArchitectureDiagram 
            title="Interactive System Architecture"
            description="Explore FileHawk's complete architecture with layer filtering and component details"
            height="700px"
            interactive={true}
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Frontend Layer", desc: "Electron + React desktop app", icon: Monitor, color: "text-blue-400" },
              { title: "API Layer", desc: "Flask REST + WebSocket", icon: Network, color: "text-green-400" },
              { title: "AI/ML Layer", desc: "Dual embedding models", icon: Brain, color: "text-purple-400" },
              { title: "Storage Layer", desc: "ChromaDB + file system", icon: Database, color: "text-orange-400" }
            ].map((layer, index) => (
              <div key={index} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center mb-2">
                  <layer.icon className={`h-5 w-5 mr-2 ${layer.color}`} />
                  <span className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{layer.title}</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </DocumentationSection>

      {/* Getting Started */}
      <DocumentationSection 
        id="getting-started"
        title="Getting Started"
        subtitle="Quick start guide to begin using FileHawk in your organization"
      >
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Installation",
                desc: "Download and install FileHawk",
                details: ["System requirements check", "AI model download", "Initial configuration"],
                action: "Install Now"
              },
              {
                step: "2", 
                title: "Index Documents",
                desc: "Point FileHawk to your files",
                details: ["Select directories", "Configure file types", "Start indexing process"],
                action: "Start Indexing"
              },
              {
                step: "3",
                title: "Search & Discover",
                desc: "Experience semantic search",
                details: ["Natural language queries", "Explore results", "Discover insights"],
                action: "Try Search"
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="p-6 rounded-xl border"
                style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-brand-gold-500 text-black font-bold flex items-center justify-center mr-4">
                    {step.step}
                  </div>
                  <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{step.title}</h4>
                </div>
                <p className="mb-4" style={{ color: 'var(--fg-secondary)' }}>{step.desc}</p>
                <ul className="space-y-1 mb-6">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{detail}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full px-4 py-2 rounded-lg border border-brand-gold-500 text-brand-gold-400 hover:bg-brand-gold-500/10 transition-all duration-300">
                  {step.action}
                </button>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
              <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--fg-primary)' }}>
                Need Help Getting Started?
              </h4>
              <p className="mb-6" style={{ color: 'var(--fg-secondary)' }}>
                Explore our comprehensive documentation or join our community for support and best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-brand-gold-500 text-black font-semibold rounded-lg hover:bg-brand-gold-400 transition-colors">
                  <FileText className="mr-2 h-5 w-5 inline" />
                  View Full Documentation
                </button>
                <button className="px-6 py-3 border border-brand-gold-500 text-brand-gold-400 font-semibold rounded-lg hover:bg-brand-gold-500/10 transition-colors">
                  <Users className="mr-2 h-5 w-5 inline" />
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </DocumentationSection>
    </div>
  )
}

export default RevisedOverviewSection
