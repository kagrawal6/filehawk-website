import React, { useState } from 'react'
import { 
  Monitor, 
  Database, 
  Brain, 
  Code, 
  FileText, 
  Zap,
  ArrowRight,
  Cpu,
  Globe,
  Shield,
  HardDrive
} from 'lucide-react'

const InteractiveArchitecture: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>('electron')
  const [activeFlow, setActiveFlow] = useState<string>('search')

  const architectureComponents = {
    electron: {
      title: 'Electron Desktop App',
      description: 'Cross-platform desktop application built with Electron, providing native file system access and seamless user experience.',
      technologies: ['Electron', 'TypeScript', 'Node.js'],
      details: [
        'Main process manages application lifecycle',
        'Renderer process hosts React UI',
        'IPC bridge for secure communication',
        'Native file dialogs and system integration'
      ],
      color: 'from-purple-500 to-purple-700',
      icon: Monitor
    },
    react: {
      title: 'React Frontend',
      description: 'Modern React application with TypeScript, providing real-time updates and responsive design.',
      technologies: ['React 18', 'TypeScript', 'Tailwind CSS'],
      details: [
        'Component-based architecture',
        'Real-time indexing progress',
        'Interactive search interface',
        'Responsive mobile-first design'
      ],
      color: 'from-blue-500 to-blue-700',
      icon: Code
    },
    flask: {
      title: 'Flask API Server',
      description: 'Python backend serving RESTful API endpoints for file processing and search operations.',
      technologies: ['Python', 'Flask', 'Threading'],
      details: [
        'RESTful API endpoints',
        'Background file processing',
        'Multi-threaded indexing',
        'Configuration management'
      ],
      color: 'from-green-500 to-green-700',
      icon: Globe
    },
    ai: {
      title: 'AI/ML Engine',
      description: 'Local semantic processing using state-of-the-art transformer models for content understanding.',
      technologies: ['SentenceTransformers', 'NumPy', 'Hugging Face'],
      details: [
        'all-MiniLM-L6-v2 embedding model',
        '384-dimensional vector space',
        'Local processing - no cloud',
        'Multi-language support'
      ],
      color: 'from-orange-500 to-orange-700',
      icon: Brain
    },
    chromadb: {
      title: 'ChromaDB Vector Store',
      description: 'High-performance vector database optimized for semantic similarity search and metadata filtering.',
      technologies: ['ChromaDB', 'SQLite', 'Vector Indices'],
      details: [
        'Dual collection architecture',
        'Cosine similarity search',
        'Metadata filtering',
        'Persistent storage'
      ],
      color: 'from-indigo-500 to-indigo-700',
      icon: Database
    },
    processing: {
      title: 'File Processing Engine',
      description: 'Multi-format text extraction engine supporting 15+ file types with specialized parsers.',
      technologies: ['pdfplumber', 'python-docx', 'BeautifulSoup'],
      details: [
        '15+ file format support',
        'Dual chunking strategy',
        'Content extraction pipelines',
        'Error handling & recovery'
      ],
      color: 'from-yellow-500 to-yellow-700',
      icon: FileText
    }
  }

  const dataFlows = {
    indexing: {
      title: 'File Indexing Flow',
      steps: [
        { from: 'electron', to: 'flask', label: 'Select folders' },
        { from: 'flask', to: 'processing', label: 'Process files' },
        { from: 'processing', to: 'ai', label: 'Extract text' },
        { from: 'ai', to: 'chromadb', label: 'Store embeddings' },
        { from: 'chromadb', to: 'react', label: 'Update progress' }
      ]
    },
    search: {
      title: 'Semantic Search Flow', 
      steps: [
        { from: 'react', to: 'flask', label: 'Search query' },
        { from: 'flask', to: 'ai', label: 'Generate embedding' },
        { from: 'ai', to: 'chromadb', label: 'Vector search' },
        { from: 'chromadb', to: 'flask', label: 'Return results' },
        { from: 'flask', to: 'react', label: 'Display matches' }
      ]
    }
  }

  const ComponentCard: React.FC<{ 
    id: string, 
    component: typeof architectureComponents.electron,
    isSelected: boolean,
    onClick: () => void 
  }> = ({ component, isSelected, onClick }) => {
    const Icon = component.icon
    
    return (
      <div
        className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
          isSelected 
            ? `bg-gradient-to-br ${component.color} transform scale-105 shadow-2xl` 
            : 'border transition-colors duration-300 hover:scale-105'
        }`}
        style={{
          backgroundColor: isSelected ? undefined : 'var(--bg-elevated)',
          borderColor: isSelected ? undefined : 'var(--border-subtle)'
        }}
        onClick={onClick}
      >
        <div className="flex items-center space-x-3 mb-3">
          <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : ''}`} 
                style={{ color: isSelected ? undefined : 'var(--accent-solid)' }} />
          <h3 className={`font-semibold ${isSelected ? 'text-white' : ''}`}
              style={{ color: isSelected ? undefined : 'var(--fg-primary)' }}>
            {component.title}
          </h3>
        </div>
        
        <p className={`text-sm mb-4 ${isSelected ? 'text-white/90' : ''}`}
           style={{ color: isSelected ? undefined : 'var(--fg-secondary)' }}>
          {component.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {component.technologies.map((tech, index) => (
            <span 
              key={index}
              className={`px-2 py-1 text-xs rounded ${
                isSelected 
                  ? 'bg-white/20 text-white' 
                  : ''
              }`}
              style={{
                backgroundColor: isSelected ? undefined : 'var(--accent-soft)',
                color: isSelected ? undefined : 'var(--accent-solid)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {isSelected && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-white/80">Key Features:</div>
            {component.details.map((detail, index) => (
              <div key={index} className="text-xs text-white/70 flex items-center space-x-2">
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Interactive Architecture Diagram */}
      <div className="p-8 rounded-xl transition-colors duration-300"
           style={{ backgroundColor: 'var(--bg-muted)' }}>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Interactive System Architecture
          </h3>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            Click on any component to explore its implementation details, technologies, and role in the system
          </p>
        </div>

        {/* Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(architectureComponents).map(([id, component]) => (
            <ComponentCard
              key={id}
              id={id}
              component={component}
              isSelected={selectedComponent === id}
              onClick={() => setSelectedComponent(selectedComponent === id ? null : id)}
            />
          ))}
        </div>

        {/* Data Flow Selector */}
        <div className="border-t pt-8 transition-colors duration-300"
             style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h4 className="text-lg font-semibold mb-4 md:mb-0" style={{ color: 'var(--fg-primary)' }}>
              Data Flow Visualization
            </h4>
            <div className="flex space-x-2">
              {Object.entries(dataFlows).map(([flowId, flow]) => (
                <button
                  key={flowId}
                  onClick={() => setActiveFlow(flowId)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeFlow === flowId ? 'transform scale-105' : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: activeFlow === flowId ? 'var(--accent-solid)' : 'var(--bg-elevated)',
                    color: activeFlow === flowId ? 'var(--accent-contrast)' : 'var(--fg-secondary)'
                  }}
                >
                  {flow.title}
                </button>
              ))}
            </div>
          </div>

          {/* Flow Steps */}
          <div className="p-6 rounded-lg transition-colors duration-300"
               style={{ backgroundColor: 'var(--bg-elevated)' }}>
            <h5 className="font-medium mb-4" style={{ color: 'var(--accent-solid)' }}>
              {dataFlows[activeFlow as keyof typeof dataFlows].title}
            </h5>
            <div className="flex flex-wrap items-center gap-3">
              {dataFlows[activeFlow as keyof typeof dataFlows].steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300"
                       style={{ backgroundColor: 'var(--bg-muted)' }}>
                    <span className="text-sm font-medium" style={{ color: 'var(--fg-primary)' }}>
                      {architectureComponents[step.from as keyof typeof architectureComponents].title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4" style={{ color: 'var(--accent-solid)' }} />
                    <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>{step.label}</span>
                    <ArrowRight className="h-4 w-4" style={{ color: 'var(--accent-solid)' }} />
                  </div>
                  {index === dataFlows[activeFlow as keyof typeof dataFlows].steps.length - 1 && (
                    <div className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300"
                         style={{ backgroundColor: 'var(--bg-muted)' }}>
                      <span className="text-sm font-medium" style={{ color: 'var(--fg-primary)' }}>
                        {architectureComponents[step.to as keyof typeof architectureComponents].title}
                      </span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Zap, label: 'Processing Speed', value: '10K files/2min', color: 'text-yellow-400' },
          { icon: Shield, label: 'Privacy', value: '100% Local', color: 'text-green-400' },
          { icon: Cpu, label: 'Search Latency', value: '<50ms', color: 'text-blue-400' },
          { icon: HardDrive, label: 'Formats Supported', value: '15+', color: 'text-purple-400' }
        ].map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} 
                 className="p-4 rounded-lg text-center transition-colors duration-300"
                 style={{ backgroundColor: 'var(--bg-elevated)' }}>
              <Icon className={`h-8 w-8 mx-auto mb-2 ${metric.color}`} />
              <div className="text-lg font-bold" style={{ color: 'var(--fg-primary)' }}>{metric.value}</div>
              <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{metric.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default InteractiveArchitecture
