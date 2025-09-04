import React from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  Cpu, 
  Network, 
  Monitor, 
  Brain,
  Shield,
  Gauge,
  Activity
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { 
  DocumentationSection, 
  TabbedContent, 
  ExpandableSection 
} from './DocumentationNavigation'
import { SystemArchitectureDiagram, DataFlowDiagram } from './InteractiveDiagrams'
import ExpandedArchitectureDiagram from './ExpandedArchitectureDiagram'

const RevisedArchitectureSection: React.FC = () => {
  const isAnimated = useScrollAnimation()

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
          <Database className="h-5 w-5 mr-2 text-brand-gold-400" />
          <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
            Enterprise System Architecture
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          <span style={{ color: 'var(--fg-primary)' }}>Production-Grade</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            Architecture
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Explore FileHawk's enterprise-ready architecture that combines advanced AI intelligence, 
          production-ready scalability, and local-first privacy to deliver semantic search capabilities 
          that <strong>transform organizational knowledge discovery</strong>.
        </p>
      </motion.div>

      {/* Architecture Overview */}
      <DocumentationSection 
        id="introduction"
        title="System Architecture Overview"
        subtitle="Local-first, AI-powered architecture designed for enterprise scalability and privacy"
      >
        <div className="mb-12">
          <SystemArchitectureDiagram 
            title="Interactive System Architecture"
            description="Explore FileHawk's complete local-first architecture with layer filtering and animation controls"
            height="800px"
            interactive={true}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Frontend Layer", desc: "Electron + React desktop app", icon: Monitor, color: "text-blue-400" },
            { title: "API Layer", desc: "Flask REST + WebSocket", icon: Network, color: "text-green-400" },
            { title: "AI/ML Layer", desc: "Dual embedding models", icon: Brain, color: "text-purple-400" },
            { title: "Storage Layer", desc: "ChromaDB + file system", icon: Database, color: "text-orange-400" }
          ].map((layer, index) => (
            <motion.div 
              key={index}
              className="p-6 rounded-xl border text-center"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-gold-500/20 mb-4`}>
                <layer.icon className={`h-6 w-6 ${layer.color}`} />
              </div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>{layer.title}</h4>
              <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{layer.desc}</p>
            </motion.div>
          ))}
        </div>
      </DocumentationSection>

      {/* System Design */}
      <DocumentationSection 
        id="system-design"
        title="Detailed System Design"
        subtitle="Comprehensive architecture breakdown with component interactions and data flow"
      >
        <TabbedContent
          tabs={[
            {
              id: 'component-architecture',
              label: 'Component Architecture',
              icon: Database,
              content: (
                <div className="space-y-8">
                  <ExpandedArchitectureDiagram />
                  
                  <ExpandableSection title="🏗️ Core Components" defaultExpanded>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Desktop Application",
                          tech: "Electron + React + TypeScript",
                          responsibilities: [
                            "User interface and interaction",
                            "Real-time search display", 
                            "File system integration",
                            "Local API communication"
                          ]
                        },
                        {
                          title: "API Server",
                          tech: "Flask + Python + ChromaDB",
                          responsibilities: [
                            "Search query processing",
                            "Document indexing pipeline",
                            "AI model inference",
                            "Vector database management"
                          ]
                        },
                        {
                          title: "AI Processing Engine",
                          tech: "SentenceTransformers + PyTorch",
                          responsibilities: [
                            "Dual-model embeddings",
                            "Semantic similarity computation",
                            "Confidence scoring",
                            "Content chunking strategies"
                          ]
                        }
                      ].map((component, index) => (
                        <div key={index} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                          <h5 className="font-semibold text-brand-gold-400 mb-2">{component.title}</h5>
                          <div className="text-sm font-mono text-purple-400 mb-4">{component.tech}</div>
                          <ul className="space-y-1">
                            {component.responsibilities.map((resp, respIndex) => (
                              <li key={respIndex} className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </ExpandableSection>
                </div>
              )
            },
            {
              id: 'technology-stack',
              label: 'Technology Stack',
              icon: Cpu,
              content: (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      {
                        category: "Frontend Technologies",
                        icon: Monitor,
                        technologies: [
                          { name: "Electron", version: "Latest", purpose: "Cross-platform desktop framework" },
                          { name: "React", version: "18+", purpose: "UI component library" },
                          { name: "TypeScript", version: "5.0+", purpose: "Type-safe JavaScript" },
                          { name: "Tailwind CSS", version: "3.3+", purpose: "Utility-first styling" }
                        ]
                      },
                      {
                        category: "Backend Technologies", 
                        icon: Network,
                        technologies: [
                          { name: "Python", version: "3.8+", purpose: "Core application language" },
                          { name: "Flask", version: "2.3+", purpose: "Web framework and API server" },
                          { name: "ChromaDB", version: "Latest", purpose: "Vector database for embeddings" },
                          { name: "SentenceTransformers", version: "2.2+", purpose: "AI embedding models" }
                        ]
                      }
                    ].map((stack, index) => (
                      <div key={index} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                        <div className="flex items-center mb-4">
                          <div className="p-3 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 mr-4">
                            <stack.icon className="h-6 w-6" />
                          </div>
                          <h5 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{stack.category}</h5>
                        </div>
                        <div className="space-y-3">
                          {stack.technologies.map((tech, techIndex) => (
                            <div key={techIndex} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{tech.name}</span>
                                <span className="text-xs font-mono text-brand-gold-400">{tech.version}</span>
                              </div>
                              <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{tech.purpose}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
          ]}
        />
      </DocumentationSection>

      {/* Data Flow */}
      <DocumentationSection 
        id="data-flow"
        title="Data Processing Pipeline"
        subtitle="End-to-end data flow from document indexing to search result delivery"
      >
        <div className="mb-12">
          <DataFlowDiagram 
            title="Interactive Data Processing Flow"
            description="Real-time visualization of document indexing and search query processing with performance metrics"
            height="700px"
            interactive={true}
          />
        </div>

        <ExpandableSection title="📊 Processing Pipeline Details" defaultExpanded>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h5 className="font-semibold mb-4 text-brand-gold-400">Document Indexing Flow</h5>
              <div className="space-y-3">
                {[
                  { step: "1", title: "File Discovery", time: "~5ms", desc: "Recursive directory scanning and file type detection" },
                  { step: "2", title: "Content Extraction", time: "~45ms", desc: "Multi-format text extraction (PDF, DOCX, MD, etc.)" },
                  { step: "3", title: "Intelligent Chunking", time: "~8ms", desc: "Context-aware content segmentation" },
                  { step: "4", title: "AI Embedding", time: "~180ms", desc: "Dual-model semantic embedding generation" },
                  { step: "5", title: "Vector Storage", time: "~12ms", desc: "ChromaDB indexing and metadata storage" }
                ].map((process, index) => (
                  <div key={index} className="flex items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center mr-4">
                      {process.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{process.title}</span>
                        <span className="text-sm font-mono text-blue-400">{process.time}</span>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{process.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-brand-gold-400">Search Query Flow</h5>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Query Processing", time: "~8ms", desc: "Natural language parsing and intent analysis" },
                  { step: "2", title: "Embedding Generation", time: "~12ms", desc: "Query vectorization using appropriate model" },
                  { step: "3", title: "Vector Search", time: "~15ms", desc: "Similarity computation against document vectors" },
                  { step: "4", title: "Confidence Scoring", time: "~7ms", desc: "14-component relevance assessment" },
                  { step: "5", title: "Result Assembly", time: "~3ms", desc: "Response formatting and snippet generation" }
                ].map((process, index) => (
                  <div key={index} className="flex items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white text-sm font-bold flex items-center justify-center mr-4">
                      {process.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{process.title}</span>
                        <span className="text-sm font-mono text-green-400">{process.time}</span>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{process.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ExpandableSection>
      </DocumentationSection>

      {/* Enterprise Principles */}
      <DocumentationSection 
        id="enterprise-principles"
        title="Enterprise Architecture Principles"
        subtitle="Design philosophy and principles that ensure scalability, security, and maintainability"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Shield, title: 'Local-First Privacy', description: '100% local processing, zero data transmission' },
            { icon: Gauge, title: 'High Performance', description: 'Sub-50ms response times with AI inference' },
            { icon: Database, title: 'Scalable Design', description: '1M+ documents, 500+ concurrent users' },
            { icon: Activity, title: 'Production Ready', description: 'Enterprise-grade monitoring and reliability' }
          ].map((principle, index) => (
            <motion.div 
              key={index}
              className="p-6 rounded-xl border text-center"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 mb-4">
                <principle.icon className="h-6 w-6" />
              </div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                {principle.title}
              </h4>
              <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>

        <ExpandableSection title="🏢 Enterprise Deployment Scenarios">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Fortune 500 Multi-Organization",
                scale: "1M+ documents, 500+ users",
                features: ["Advanced GitHub integration", "Multi-tenant security", "Enterprise monitoring", "High-availability deployment"]
              },
              {
                title: "Startup Development Team",
                scale: "10K documents, 25 users", 
                features: ["Rapid setup and deployment", "Code repository integration", "Team collaboration tools", "Cost-effective scaling"]
              },
              {
                title: "Research Institution",
                scale: "100K documents, 100 users",
                features: ["Academic content processing", "Research paper integration", "Citation management", "Knowledge discovery tools"]
              }
            ].map((scenario, index) => (
              <div key={index} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                <h5 className="font-semibold text-brand-gold-400 mb-2">{scenario.title}</h5>
                <div className="text-sm font-mono text-purple-400 mb-4">{scenario.scale}</div>
                <ul className="space-y-1">
                  {scenario.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ExpandableSection>
      </DocumentationSection>
    </div>
  )
}

export default RevisedArchitectureSection
