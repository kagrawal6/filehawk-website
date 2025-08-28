import React, { useState } from 'react'
import { 
  Code2, 
  Brain, 
  Database, 
  Layers, 
  Zap, 
  FileText, 
  Monitor,
  GitBranch,
  Cpu,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

const TechnicalShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('architecture')

  const tabs = [
    { id: 'architecture', label: 'System Architecture', icon: Layers },
    { id: 'ai-ml', label: 'AI/ML Engine', icon: Brain },
    { id: 'processing', label: 'File Processing', icon: FileText },
    { id: 'performance', label: 'Performance', icon: Zap }
  ]

  const architectureComponents = [
    {
      title: 'Electron Desktop App',
      description: 'Cross-platform application with native file system access',
      technologies: ['Electron', 'TypeScript', 'Node.js'],
      highlights: ['Native OS integration', 'IPC communication', 'Auto-updater support'],
      color: 'purple'
    },
    {
      title: 'React Frontend',
      description: 'Modern UI with real-time updates and responsive design',
      technologies: ['React 18', 'TypeScript', 'Tailwind CSS'],
      highlights: ['Component architecture', 'Real-time state', 'Dark/light themes'],
      color: 'blue'
    },
    {
      title: 'Python Backend',
      description: 'High-performance API server with background processing',
      technologies: ['Python 3.8+', 'Flask', 'Threading'],
      highlights: ['RESTful API', 'Background tasks', 'Error handling'],
      color: 'green'
    },
    {
      title: 'AI/ML Pipeline',
      description: 'Local semantic processing with transformer models',
      technologies: ['SentenceTransformers', 'NumPy', 'Hugging Face'],
      highlights: ['384-dim embeddings', 'Local inference', 'Multi-language'],
      color: 'orange'
    },
    {
      title: 'Vector Database',
      description: 'ChromaDB for high-performance similarity search',
      technologies: ['ChromaDB', 'SQLite', 'Vector indices'],
      highlights: ['Dual collections', 'Cosine similarity', 'Metadata filters'],
      color: 'indigo'
    },
    {
      title: 'File Engine',
      description: 'Multi-format text extraction with specialized parsers',
      technologies: ['pdfplumber', 'python-docx', 'pandas'],
      highlights: ['15+ formats', 'Dual chunking', 'Error recovery'],
      color: 'yellow'
    }
  ]

  const aimlDetails = {
    model: {
      name: 'all-MiniLM-L6-v2',
      dimensions: 384,
      languages: '100+',
      inference: 'Local CPU/GPU'
    },
    pipeline: [
      { step: 'Text Extraction', description: 'Multi-format content parsing' },
      { step: 'Chunking Strategy', description: 'Dual-mode: Gist + Granular' },
      { step: 'Embedding Generation', description: 'Transformer-based encoding' },
      { step: 'Vector Storage', description: 'ChromaDB persistence' },
      { step: 'Similarity Search', description: 'Cosine distance ranking' }
    ]
  }

  const performanceMetrics = [
    { label: 'Indexing Speed', value: '~5,000 files/min', description: 'Including AI processing' },
    { label: 'Search Latency', value: '<50ms', description: 'Vector similarity search' },
    { label: 'Memory Usage', value: '~200MB', description: 'Efficient model loading' },
    { label: 'Storage Overhead', value: '~15%', description: 'Of original file sizes' }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
      blue: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
      green: 'bg-green-500/10 border-green-500/20 text-green-300',
      orange: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
      indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
      yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

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
            <Code2 className="mr-2 h-4 w-4" style={{ color: 'var(--accent-solid)' }} />
            <span className="text-sm font-medium">Technical Deep Dive</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-6" 
              style={{ color: 'var(--fg-primary)' }}>
            Built for
            <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
              {' '}Performance
            </span>
          </h2>
          
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            A sophisticated full-stack architecture combining modern web technologies, 
            AI/ML processing, and desktop application frameworks for seamless file discovery.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'shadow-lg transform scale-105'
                    : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? 'var(--accent-solid)' : 'var(--bg-elevated)',
                  color: activeTab === tab.id ? 'var(--accent-contrast)' : 'var(--fg-secondary)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <Icon className="mr-2 h-5 w-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          
          {/* Architecture Tab */}
          {activeTab === 'architecture' && (
            <div className="space-y-8">
              {/* Architecture Diagram */}
              <div className="relative p-8 rounded-2xl border transition-colors duration-300"
                   style={{ 
                     backgroundColor: 'var(--bg-elevated)', 
                     borderColor: 'var(--border-subtle)' 
                   }}>
                <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--fg-primary)' }}>
                  System Architecture Overview
                </h3>
                
                {/* Interactive Architecture Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {architectureComponents.map((component, index) => (
                    <div key={index} 
                         className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${getColorClasses(component.color)}`}>
                      <h4 className="font-bold text-lg mb-3">{component.title}</h4>
                      <p className="text-sm mb-4 opacity-80">{component.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs font-medium mb-2">Technologies:</div>
                          <div className="flex flex-wrap gap-1">
                            {component.technologies.map((tech, techIndex) => (
                              <span key={techIndex} 
                                    className="px-2 py-1 text-xs rounded-md bg-black/20">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs font-medium mb-2">Key Features:</div>
                          <ul className="text-xs space-y-1">
                            {component.highlights.map((highlight, highlightIndex) => (
                              <li key={highlightIndex} className="flex items-center">
                                <ChevronRight className="h-3 w-3 mr-1" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI/ML Tab */}
          {activeTab === 'ai-ml' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Model Details */}
                <div className="p-8 rounded-2xl border transition-colors duration-300"
                     style={{ 
                       backgroundColor: 'var(--bg-elevated)', 
                       borderColor: 'var(--border-subtle)' 
                     }}>
                  <h3 className="text-xl font-bold mb-6 flex items-center" style={{ color: 'var(--fg-primary)' }}>
                    <Brain className="mr-3 h-6 w-6" style={{ color: 'var(--accent-solid)' }} />
                    Embedding Model
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries(aimlDetails.model).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-700/30">
                        <span className="font-medium capitalize" style={{ color: 'var(--fg-secondary)' }}>
                          {key.replace(/([A-Z])/g, ' $1')}:
                        </span>
                        <span className="font-mono" style={{ color: 'var(--accent-solid)' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Processing Pipeline */}
                <div className="p-8 rounded-2xl border transition-colors duration-300"
                     style={{ 
                       backgroundColor: 'var(--bg-elevated)', 
                       borderColor: 'var(--border-subtle)' 
                     }}>
                  <h3 className="text-xl font-bold mb-6 flex items-center" style={{ color: 'var(--fg-primary)' }}>
                    <GitBranch className="mr-3 h-6 w-6" style={{ color: 'var(--accent-solid)' }} />
                    Processing Pipeline
                  </h3>
                  
                  <div className="space-y-4">
                    {aimlDetails.pipeline.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                             style={{ backgroundColor: 'var(--accent-solid)', color: 'var(--accent-contrast)' }}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium" style={{ color: 'var(--fg-primary)' }}>{item.step}</div>
                          <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>{item.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* File Processing Tab */}
          {activeTab === 'processing' && (
            <div className="p-8 rounded-2xl border transition-colors duration-300"
                 style={{ 
                   backgroundColor: 'var(--bg-elevated)', 
                   borderColor: 'var(--border-subtle)' 
                 }}>
              <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--fg-primary)' }}>
                Multi-Format File Processing Engine
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    category: 'Documents',
                    formats: ['PDF', 'DOCX', 'PPTX', 'RTF', 'ODT'],
                    description: 'Advanced text extraction from complex documents'
                  },
                  {
                    category: 'Code & Text',
                    formats: ['Python', 'JavaScript', 'TypeScript', 'Markdown', 'JSON'],
                    description: 'Syntax-aware processing for development files'
                  },
                  {
                    category: 'Data Files',
                    formats: ['CSV', 'XLSX', 'Email', 'EPUB', 'HTML'],
                    description: 'Structured data parsing and content extraction'
                  }
                ].map((group, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                         style={{ backgroundColor: 'var(--accent-soft)' }}>
                      <FileText className="h-8 w-8" style={{ color: 'var(--accent-solid)' }} />
                    </div>
                    <h4 className="text-lg font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
                      {group.category}
                    </h4>
                    <p className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>
                      {group.description}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {group.formats.map((format, formatIndex) => (
                        <span key={formatIndex} 
                              className="px-3 py-1 text-xs font-medium rounded-full"
                              style={{ 
                                backgroundColor: 'var(--accent-soft)', 
                                color: 'var(--accent-solid)' 
                              }}>
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} 
                       className="p-6 rounded-xl border transition-colors duration-300"
                       style={{ 
                         backgroundColor: 'var(--bg-elevated)', 
                         borderColor: 'var(--border-subtle)' 
                       }}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium" style={{ color: 'var(--fg-secondary)' }}>{metric.label}</h4>
                      <Zap className="h-5 w-5" style={{ color: 'var(--accent-solid)' }} />
                    </div>
                    <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent-solid)' }}>
                      {metric.value}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                      {metric.description}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Performance Chart Placeholder */}
              <div className="p-8 rounded-2xl border-2 border-dashed transition-colors duration-300"
                   style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="text-center">
                  <Monitor className="mx-auto h-16 w-16 mb-4" style={{ color: 'var(--accent-solid)' }} />
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                    Performance Benchmarks
                  </h3>
                  <p className="mb-4" style={{ color: 'var(--fg-muted)' }}>
                    Interactive charts showing real-world performance data across different file types and collection sizes
                  </p>
                  <div className="text-sm" style={{ color: 'var(--accent-solid)' }}>
                    PLACEHOLDER: Performance visualization charts
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--accent-solid)', 
                    color: 'var(--accent-contrast)' 
                  }}>
            View Source Code
            <ExternalLink className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default TechnicalShowcase
