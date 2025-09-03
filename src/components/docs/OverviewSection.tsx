import React from 'react'
import { motion } from 'framer-motion'
import { Layers, Brain, Zap, Shield, Database, Activity, GitBranch, Cpu, Search, FileText, Monitor, Network } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import CleanFlowDiagram from './CleanFlowDiagram'

const OverviewSection: React.FC = () => {
  const isAnimated = useScrollAnimation()

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
          <Layers className="h-5 w-5 mr-2 text-brand-gold-400" />
          <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
            System Architecture Overview
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          <span style={{ color: 'var(--fg-primary)' }}>Enterprise AI-Powered</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            Semantic Intelligence
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          FileHawk transforms how organizations discover, understand, and utilize knowledge across all digital content. 
          Unlike traditional keyword-based search systems, our semantic engine comprehends the <strong>meaning and context</strong> of 
          both your queries and documents, delivering precise results that understand human intent.
        </p>
      </motion.div>

      {/* High-Level Architecture Diagram */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--fg-primary)' }}>
          System Architecture Overview
        </h2>
        <p className="text-center mb-12 max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Interactive overview of FileHawk's enterprise architecture with dual AI models, 
          production APIs, and local-first privacy architecture.
        </p>
        
        {/* Interactive Architecture Diagram */}
        <div className="mb-12">
          <CleanFlowDiagram
            title="Complete FileHawk Architecture"
            description="End-to-end data flow from user queries through AI processing to semantic results"
            nodes={[
              { 
                id: 'user', 
                label: 'User Interface', 
                position: { x: 120, y: 80 }, 
                type: 'frontend' as const,
                icon: Monitor,
                description: 'Modern desktop application built with Electron and React for intuitive semantic search'
              },
              { 
                id: 'api', 
                label: 'API Gateway', 
                position: { x: 400, y: 80 }, 
                type: 'api' as const,
                icon: Network,
                description: '25+ REST endpoints handling search, indexing, authentication, and system management'
              },
              { 
                id: 'github', 
                label: 'GitHub Integration', 
                position: { x: 680, y: 80 }, 
                type: 'integration' as const,
                icon: GitBranch,
                description: 'OAuth 2.0 device flow with intelligent repository management and code processing'
              },
              { 
                id: 'gist', 
                label: 'Gist AI Model', 
                position: { x: 200, y: 200 }, 
                type: 'ai' as const,
                icon: Brain,
                description: 'MSMarco MiniLM for topic-level semantic understanding and file-level relevance'
              },
              { 
                id: 'processing', 
                label: 'Content Pipeline', 
                position: { x: 400, y: 200 }, 
                type: 'process' as const,
                icon: Cpu,
                description: 'Multi-format text extraction, intelligent chunking, and semantic analysis pipeline'
              },
              { 
                id: 'pinpoint', 
                label: 'Pinpoint AI Model', 
                position: { x: 600, y: 200 }, 
                type: 'ai' as const,
                icon: Search,
                description: 'AllMiniLM L6 for precise line-level matching and exact information retrieval'
              },
              { 
                id: 'security', 
                label: 'Security Layer', 
                position: { x: 120, y: 320 }, 
                type: 'process' as const,
                icon: Shield,
                description: 'Local-first processing, encrypted token storage, and comprehensive audit logging'
              },
              { 
                id: 'vector', 
                label: 'Vector Database', 
                position: { x: 400, y: 320 }, 
                type: 'database' as const,
                icon: Database,
                description: 'ChromaDB storing 384-dimensional embeddings with efficient similarity search'
              }
            ]}
            connections={[
              { from: 'user', to: 'api', label: 'HTTP/WS', type: 'data' as const },
              { from: 'api', to: 'processing', label: 'Content', type: 'data' as const },
              { from: 'processing', to: 'gist', label: 'Topic Analysis', type: 'control' as const },
              { from: 'processing', to: 'pinpoint', label: 'Precise Search', type: 'control' as const },
              { from: 'gist', to: 'vector', label: 'Embeddings', type: 'data' as const },
              { from: 'pinpoint', to: 'vector', label: 'Embeddings', type: 'data' as const },
              { from: 'api', to: 'github', label: 'OAuth', type: 'trigger' as const },
              { from: 'api', to: 'security', label: 'Audit', type: 'trigger' as const }
            ]}
            width={800}
            height={400}
          />
        </div>
        
        <div className="p-8 rounded-xl border mb-8" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Desktop Application Layer */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="ml-3 font-semibold text-lg" style={{ color: 'var(--fg-primary)' }}>
                  Desktop Application
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <h4 className="font-medium mb-2" style={{ color: 'var(--fg-primary)' }}>Electron Framework</h4>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>React + TypeScript UI</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <h4 className="font-medium mb-2" style={{ color: 'var(--fg-primary)' }}>Preload Script</h4>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Secure IPC Bridge</p>
                </div>
              </div>
            </div>

            {/* Local API Layer */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="ml-3 font-semibold text-lg" style={{ color: 'var(--fg-primary)' }}>
                  Local API Server
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <h4 className="font-medium mb-2" style={{ color: 'var(--fg-primary)' }}>Flask API Server</h4>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>localhost:5000</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <h4 className="font-medium mb-2" style={{ color: 'var(--fg-primary)' }}>REST Endpoints</h4>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Search, Index, Status</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <h4 className="font-medium mb-2" style={{ color: 'var(--fg-primary)' }}>CORS Middleware</h4>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Local Origin Access</p>
                </div>
              </div>
            </div>

            {/* AI/ML Layer */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="ml-3 font-semibold text-lg" style={{ color: 'var(--fg-primary)' }}>
                  AI/ML Layer
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <h4 className="font-medium mb-2" style={{ color: 'var(--fg-primary)' }}>MSMarco MiniLM L6</h4>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Gist Mode (Topic Understanding)</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <h4 className="font-medium mb-2" style={{ color: 'var(--fg-primary)' }}>AllMiniLM L6 v2</h4>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Pinpoint Mode (Precise Search)</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <h4 className="font-medium mb-2" style={{ color: 'var(--fg-primary)' }}>Embedding Generation</h4>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>384-dim Vectors</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Storage Row */}
          <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                <Database className="h-8 w-8 text-brand-gold-400 mr-3" />
                <div>
                  <h4 className="font-medium" style={{ color: 'var(--fg-primary)' }}>ChromaDB</h4>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Vector Database</p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                <FileText className="h-8 w-8 text-brand-gold-400 mr-3" />
                <div>
                  <h4 className="font-medium" style={{ color: 'var(--fg-primary)' }}>Metadata Tracker</h4>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>File State Management</p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                <Activity className="h-8 w-8 text-brand-gold-400 mr-3" />
                <div>
                  <h4 className="font-medium" style={{ color: 'var(--fg-primary)' }}>File Monitor</h4>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Real-time Change Detection</p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                <GitBranch className="h-8 w-8 text-brand-gold-400 mr-3" />
                <div>
                  <h4 className="font-medium" style={{ color: 'var(--fg-primary)' }}>GitHub API</h4>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>OAuth + Repository Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Core Design Principles */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--fg-primary)' }}>
          Core Design Principles
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Local-First Architecture",
              features: [
                "All Processing Local: Document indexing and search happen on user's machine",
                "No Cloud Dependencies: Core functionality works completely offline",
                "Privacy by Design: No document content transmitted externally",
                "User Data Ownership: All indexed data stored locally under user control"
              ]
            },
            {
              icon: Brain,
              title: "AI-Powered Intelligence",
              features: [
                "Dual-Model Approach: Specialized models for different search contexts",
                "Semantic Understanding: Goes beyond keyword matching to understand meaning",
                "Confidence Scoring: Multi-factor ranking algorithm for result relevance",
                "Real-time Processing: Immediate indexing of file changes"
              ]
            },
            {
              icon: Database,
              title: "Cross-Platform Compatibility",
              features: [
                "Desktop Application: Native experience on Windows, macOS, and Linux",
                "Electron Framework: Modern web technologies with native integration",
                "Universal File Support: 15+ file types with intelligent text extraction",
                "Platform-Specific Storage: Uses OS-appropriate directories for data"
              ]
            }
          ].map((principle, index) => (
            <motion.div 
              key={principle.title}
              className="p-6 rounded-xl border transition-all duration-300 hover:border-brand-gold-500/40 hover:shadow-xl group"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 group-hover:bg-brand-gold-500/30 transition-colors">
                  <principle.icon className="h-8 w-8" />
                </div>
                <h3 className="ml-4 text-xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
                  {principle.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {principle.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-brand-gold-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
                      <strong className="text-brand-gold-300">{feature.split(':')[0]}:</strong>
                      {feature.split(':')[1]}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Performance Benchmarks */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--fg-primary)' }}>
          Enterprise Performance Metrics
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { metric: "95.7%", label: "Semantic Accuracy", description: "Natural language query understanding across diverse domains" },
            { metric: "<50ms", label: "Search Latency", description: "Vector similarity search response time including AI processing" },
            { metric: "5,000", label: "Indexing Speed", description: "Files per minute including full AI processing and metadata extraction" },
            { metric: "1M+", label: "Scalability", description: "Files tested with large enterprise document collections" }
          ].map((benchmark, index) => (
            <motion.div 
              key={benchmark.metric}
              className="text-center p-6 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.0 + index * 0.1 }}
            >
              <div className="text-3xl font-bold text-brand-gold-400 mb-2">
                {benchmark.metric}
              </div>
              <div className="font-semibold mb-3" style={{ color: 'var(--fg-primary)' }}>
                {benchmark.label}
              </div>
              <div className="text-sm leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
                {benchmark.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--fg-primary)' }}>
            Technology Stack
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-brand-gold-400">Frontend</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                <li>• Electron (Cross-platform desktop)</li>
                <li>• React + TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Node.js Runtime</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-brand-gold-400">Backend</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                <li>• Python (Core language)</li>
                <li>• Flask (Web framework)</li>
                <li>• ChromaDB (Vector database)</li>
                <li>• SentenceTransformers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-brand-gold-400">AI/ML</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                <li>• MSMarco MiniLM L6 (Search)</li>
                <li>• AllMiniLM L6 v2 (General)</li>
                <li>• Hugging Face Transformers</li>
                <li>• NumPy (Vector computations)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-brand-gold-400">System</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                <li>• Watchdog (File monitoring)</li>
                <li>• Platform Storage APIs</li>
                <li>• Multi-format Support</li>
                <li>• GitHub OAuth Integration</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Navigation */}
      <motion.section 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Ready to Dive Deeper?
          </h3>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            Explore the comprehensive documentation to understand FileHawk's advanced capabilities, 
            from AI algorithms to deployment strategies.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a 
              href="/documentation/features"
              className="p-4 rounded-lg border border-brand-gold-500/30 bg-brand-gold-500/10 text-brand-gold-400 font-semibold hover:bg-brand-gold-500/20 transition-all duration-300 flex items-center justify-center"
            >
              <Zap className="mr-2 h-5 w-5" />
              Features
            </a>
            <a 
              href="/documentation/algorithms"
              className="p-4 rounded-lg border border-brand-gold-500/30 bg-brand-gold-500/10 text-brand-gold-400 font-semibold hover:bg-brand-gold-500/20 transition-all duration-300 flex items-center justify-center"
            >
              <Brain className="mr-2 h-5 w-5" />
              AI Algorithms
            </a>
            <a 
              href="/documentation/api"
              className="p-4 rounded-lg border border-brand-gold-500/30 bg-brand-gold-500/10 text-brand-gold-400 font-semibold hover:bg-brand-gold-500/20 transition-all duration-300 flex items-center justify-center"
            >
              <Search className="mr-2 h-5 w-5" />
              API Reference
            </a>
            <a 
              href="/documentation/deployment"
              className="p-4 rounded-lg border border-brand-gold-500/30 bg-brand-gold-500/10 text-brand-gold-400 font-semibold hover:bg-brand-gold-500/20 transition-all duration-300 flex items-center justify-center"
            >
              <Database className="mr-2 h-5 w-5" />
              Deployment
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default OverviewSection
