import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Layers,
  Database,
  Server,
  Bot,
  FileText,
  GitBranch,
  Zap,
  Monitor,
  Code,
  HardDrive,
  Target
} from 'lucide-react'

interface DiagramProps {
  title: string
  description: string
  height?: string
  interactive?: boolean
}

// Main System Architecture Diagram
export const SystemArchitectureDiagram: React.FC<DiagramProps> = ({ 
  title = "FileHawk System Architecture", 
  description = "Complete local-first semantic search architecture",
  height = "800px",
  interactive = true 
}) => {
  const [activeLayer, setActiveLayer] = useState<string>('all')
  const [isAnimated, setIsAnimated] = useState(false)

  const layers = {
    all: 'All Components',
    frontend: 'Frontend Layer',
    api: 'API Layer', 
    ai: 'AI/ML Layer',
    storage: 'Storage Layer'
  }

  const components = [
    // Frontend Layer
    { id: 'desktop-app', name: 'Desktop App', layer: 'frontend', x: 100, y: 100, icon: Monitor, color: 'blue' },
    { id: 'react-ui', name: 'React UI', layer: 'frontend', x: 250, y: 100, icon: Code, color: 'blue' },
    
    // API Layer
    { id: 'flask-api', name: 'Flask API', layer: 'api', x: 100, y: 250, icon: Server, color: 'green' },
    { id: 'rest-endpoints', name: 'REST Endpoints', layer: 'api', x: 250, y: 250, icon: GitBranch, color: 'green' },
    { id: 'websocket', name: 'WebSocket', layer: 'api', x: 400, y: 250, icon: Zap, color: 'green' },
    
    // AI/ML Layer
    { id: 'gist-model', name: 'Gist Model', layer: 'ai', x: 100, y: 400, icon: Bot, color: 'purple' },
    { id: 'pinpoint-model', name: 'Pinpoint Model', layer: 'ai', x: 250, y: 400, icon: Bot, color: 'purple' },
    { id: 'ranking-algo', name: 'Ranking Algorithm', layer: 'ai', x: 400, y: 400, icon: Target, color: 'purple' },
    
    // Storage Layer
    { id: 'chromadb', name: 'ChromaDB', layer: 'storage', x: 100, y: 550, icon: Database, color: 'orange' },
    { id: 'vector-store', name: 'Vector Store', layer: 'storage', x: 250, y: 550, icon: HardDrive, color: 'orange' },
    { id: 'file-system', name: 'File System', layer: 'storage', x: 400, y: 550, icon: FileText, color: 'orange' }
  ]

  const connections = [
    { from: 'desktop-app', to: 'flask-api', animated: true },
    { from: 'react-ui', to: 'rest-endpoints', animated: true },
    { from: 'react-ui', to: 'websocket', animated: true },
    { from: 'flask-api', to: 'gist-model', animated: true },
    { from: 'rest-endpoints', to: 'pinpoint-model', animated: true },
    { from: 'gist-model', to: 'ranking-algo', animated: true },
    { from: 'pinpoint-model', to: 'ranking-algo', animated: true },
    { from: 'ranking-algo', to: 'chromadb', animated: true },
    { from: 'chromadb', to: 'vector-store', animated: true },
    { from: 'vector-store', to: 'file-system', animated: true }
  ]

  const getComponentPosition = (id: string) => {
    const component = components.find(c => c.id === id)
    return component ? { x: component.x, y: component.y } : { x: 0, y: 0 }
  }

  const shouldShowComponent = (layer: string) => {
    return activeLayer === 'all' || activeLayer === layer
  }

  return (
    <div className="w-full" style={{ height }}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-brand-gold-400 mb-2">{title}</h3>
        <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{description}</p>
      </div>

      {interactive && (
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            {/* Layer Filter */}
            <div className="flex rounded-lg border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
              {Object.entries(layers).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveLayer(key)}
                  className={`px-3 py-2 text-xs font-medium transition-all duration-300 ${
                    activeLayer === key ? 'text-brand-gold-400 bg-brand-gold-500/20' : ''
                  }`}
                  style={{ color: activeLayer === key ? 'var(--brand-gold-400)' : 'var(--fg-secondary)' }}
                >
                  <Layers className="h-3 w-3 mr-1 inline" />
                  {label}
                </button>
              ))}
            </div>

            {/* Animation Controls */}
            <button
              onClick={() => setIsAnimated(!isAnimated)}
              className="p-2 rounded-lg border transition-all duration-300 hover:border-brand-gold-500/40"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
            >
              {isAnimated ? <Pause className="h-4 w-4 text-brand-gold-400" /> : <Play className="h-4 w-4 text-brand-gold-400" />}
            </button>
          </div>
        </div>
      )}

      <div className="relative w-full h-full border rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 700">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--brand-gold-400)" opacity="0.6" />
            </marker>
            
            {/* Animated gradient for connections */}
            <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="var(--brand-gold-400)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
              {isAnimated && (
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  values="0 0; 100 0; 0 0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </linearGradient>
          </defs>

          {/* Layer Backgrounds */}
          <rect x="50" y="50" width="500" height="100" rx="10" fill="rgba(59, 130, 246, 0.1)" 
                style={{ display: shouldShowComponent('frontend') ? 'block' : 'none' }} />
          <rect x="50" y="200" width="500" height="100" rx="10" fill="rgba(34, 197, 94, 0.1)"
                style={{ display: shouldShowComponent('api') ? 'block' : 'none' }} />
          <rect x="50" y="350" width="500" height="100" rx="10" fill="rgba(147, 51, 234, 0.1)"
                style={{ display: shouldShowComponent('ai') ? 'block' : 'none' }} />
          <rect x="50" y="500" width="500" height="100" rx="10" fill="rgba(249, 115, 22, 0.1)"
                style={{ display: shouldShowComponent('storage') ? 'block' : 'none' }} />

          {/* Connections */}
          {connections.map((conn, index) => {
            const from = getComponentPosition(conn.from)
            const to = getComponentPosition(conn.to)
            const fromComponent = components.find(c => c.id === conn.from)
            const toComponent = components.find(c => c.id === conn.to)
            
            if (!fromComponent || !toComponent || 
                !shouldShowComponent(fromComponent.layer) || 
                !shouldShowComponent(toComponent.layer)) {
              return null
            }

            return (
              <line
                key={index}
                x1={from.x + 40}
                y1={from.y + 40}
                x2={to.x + 40}
                y2={to.y + 40}
                stroke={conn.animated && isAnimated ? "url(#animatedGradient)" : "var(--brand-gold-400)"}
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                opacity="0.6"
              />
            )
          })}

          {/* Components */}
          {components.map((component) => {
            if (!shouldShowComponent(component.layer)) return null

            const colorMap: Record<string, string> = {
              blue: 'rgb(59, 130, 246)',
              green: 'rgb(34, 197, 94)', 
              purple: 'rgb(147, 51, 234)',
              orange: 'rgb(249, 115, 22)'
            }

            return (
              <g key={component.id}>
                <motion.rect
                  x={component.x}
                  y={component.y}
                  width="80"
                  height="80"
                  rx="8"
                  fill="var(--bg-elevated)"
                  stroke={colorMap[component.color]}
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: components.indexOf(component) * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                />
                
                <foreignObject x={component.x + 10} y={component.y + 10} width="60" height="60">
                  <div className="flex flex-col items-center justify-center h-full">
                    <component.icon className="h-6 w-6 mb-1" style={{ color: colorMap[component.color] }} />
                    <span className="text-xs font-semibold text-center leading-tight" style={{ color: 'var(--fg-primary)' }}>
                      {component.name}
                    </span>
                  </div>
                </foreignObject>
              </g>
            )
          })}

          {/* Layer Labels */}
          <text x="20" y="110" className="text-sm font-semibold fill-current" style={{ fill: 'rgb(59, 130, 246)' }}>
            Frontend
          </text>
          <text x="20" y="260" className="text-sm font-semibold fill-current" style={{ fill: 'rgb(34, 197, 94)' }}>
            API Layer
          </text>
          <text x="20" y="410" className="text-sm font-semibold fill-current" style={{ fill: 'rgb(147, 51, 234)' }}>
            AI/ML Layer
          </text>
          <text x="20" y="560" className="text-sm font-semibold fill-current" style={{ fill: 'rgb(249, 115, 22)' }}>
            Storage
          </text>
        </svg>
      </div>

      {interactive && (
        <div className="mt-4 text-center">
          <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
            Use layer filters to explore different system components • Toggle animation to see data flow
          </p>
        </div>
      )}
    </div>
  )
}

// Algorithm Flow Diagram
export const AlgorithmFlowDiagram: React.FC<DiagramProps> = ({ 
  title = "Advanced Gist Ranking Algorithm Flow", 
  description = "14-component scoring system with mathematical precision",
  height = "600px",
  interactive = true 
}) => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const steps = [
    { id: 'input', title: 'Query Input', description: 'User search query processing', formula: 'Q = tokenize(query)' },
    { id: 'embedding', title: 'Embedding Generation', description: 'Convert query to vector representation', formula: 'E_q = model(Q)' },
    { id: 'retrieval', title: 'Initial Retrieval', description: 'ChromaDB similarity search', formula: 'C = chromadb.query(E_q, n)' },
    { id: 'confidence', title: 'Confidence Scoring', description: 'Distance to confidence transformation', formula: 'conf = 1 - (d / d_max)' },
    { id: 'smax', title: 'S_max Calculation', description: 'Maximum confidence identification', formula: 'S_max = max(conf_i)' },
    { id: 'topk', title: 'Soft Top-K', description: 'Exponential weighted top-k selection', formula: 'S_topk = soft_topk(conf, k=5, α=2)' },
    { id: 'centroid', title: 'Centroid Similarity', description: 'File-level semantic coherence', formula: 'S_centroid = cosine(E_q, centroid)' },
    { id: 'bm25', title: 'BM25 Enhancement', description: 'Keyword-based relevance scoring', formula: 'S_bm25 = BM25(Q, chunks)' },
    { id: 'length', title: 'Length Normalization', description: 'Document length bias correction', formula: 'L_factor = length_norm(chunk_count)' },
    { id: 'composite', title: 'Composite Score', description: 'Weighted combination of all factors', formula: 'Score = Σ(w_i × S_i)' }
  ]

  const playAnimation = () => {
    setIsPlaying(true)
    let currentStep = 0
    const interval = setInterval(() => {
      setActiveStep(currentStep)
      currentStep++
      if (currentStep >= steps.length) {
        clearInterval(interval)
        setIsPlaying(false)
        setActiveStep(0)
      }
    }, 1000)
  }

  return (
    <div className="w-full" style={{ height }}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-brand-gold-400 mb-2">{title}</h3>
        <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{description}</p>
      </div>

      {interactive && (
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={playAnimation}
              disabled={isPlaying}
              className="px-4 py-2 rounded-lg border transition-all duration-300 hover:border-brand-gold-500/40 disabled:opacity-50"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
            >
              <Play className="h-4 w-4 mr-2 inline text-brand-gold-400" />
              <span className="text-sm font-medium" style={{ color: 'var(--fg-primary)' }}>
                {isPlaying ? 'Playing...' : 'Play Algorithm Flow'}
              </span>
            </button>
            <button
              onClick={() => setActiveStep(0)}
              className="p-2 rounded-lg border transition-all duration-300 hover:border-brand-gold-500/40"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
            >
              <RotateCcw className="h-4 w-4 text-brand-gold-400" />
            </button>
          </div>
        </div>
      )}

      <div className="relative w-full h-full border rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)' }}>
        {/* Algorithm Steps */}
        <div className="absolute inset-4 flex flex-wrap justify-between items-start">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`w-40 p-4 rounded-lg border m-2 cursor-pointer transition-all duration-300 ${
                activeStep === index ? 'border-brand-gold-500 shadow-lg' : ''
              }`}
              style={{ 
                backgroundColor: activeStep === index ? 'var(--bg-elevated)' : 'var(--bg-muted)',
                borderColor: activeStep === index ? 'var(--brand-gold-400)' : 'var(--border-subtle)'
              }}
              onClick={() => setActiveStep(index)}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-center">
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold border-2 ${
                  activeStep === index 
                    ? 'bg-brand-gold-500 text-white border-brand-gold-500' 
                    : 'border-gray-500/50'
                }`}
                style={{ 
                  backgroundColor: activeStep === index ? undefined : 'var(--bg-elevated)', 
                  color: activeStep === index ? undefined : 'var(--fg-primary)' 
                }}>
                  {index + 1}
                </div>
                <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--fg-primary)' }}>
                  {step.title}
                </h4>
                <p className="text-xs mb-2" style={{ color: 'var(--fg-secondary)' }}>
                  {step.description}
                </p>
                <div className="text-xs font-mono p-2 rounded" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--brand-gold-400)' }}>
                  {step.formula}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flow Arrows */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <marker id="flowArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="var(--brand-gold-400)" opacity="0.6" />
            </marker>
          </defs>
          
          {/* Draw arrows between consecutive steps */}
          {steps.slice(0, -1).map((_, index) => {
            const isActive = activeStep >= index
            return (
              <line
                key={index}
                x1={`${10 + (index % 5) * 20}%`}
                y1={`${30 + Math.floor(index / 5) * 40}%`}
                x2={`${10 + ((index + 1) % 5) * 20}%`}
                y2={`${30 + Math.floor((index + 1) / 5) * 40}%`}
                stroke="var(--brand-gold-400)"
                strokeWidth="2"
                markerEnd="url(#flowArrow)"
                opacity={isActive ? "0.8" : "0.3"}
                className="transition-opacity duration-300"
              />
            )
          })}
        </svg>
      </div>

      {interactive && (
        <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-elevated)' }}>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
            Current Step: {steps[activeStep]?.title}
          </h4>
          <p className="text-sm mb-2" style={{ color: 'var(--fg-secondary)' }}>
            {steps[activeStep]?.description}
          </p>
          <div className="text-sm font-mono p-2 rounded" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--brand-gold-400)' }}>
            {steps[activeStep]?.formula}
          </div>
        </div>
      )}
    </div>
  )
}

// Data Flow Diagram
export const DataFlowDiagram: React.FC<DiagramProps> = ({ 
  title = "FileHawk Data Processing Flow", 
  description = "End-to-end document processing and search pipeline",
  height = "700px",
  interactive = true 
}) => {
  const [activeFlow, setActiveFlow] = useState<string>('indexing')
  const [showPerformance, setShowPerformance] = useState(false)

  const flows: Record<string, string> = {
    indexing: 'Document Indexing',
    searching: 'Search Query',
    github: 'GitHub Integration'
  }

  const indexingSteps = [
    { id: 'file-input', name: 'File Input', time: '0ms', x: 50, y: 100 },
    { id: 'text-extract', name: 'Text Extraction', time: '45ms', x: 200, y: 100 },
    { id: 'chunking', name: 'Chunking', time: '8ms', x: 350, y: 100 },
    { id: 'embedding', name: 'AI Embedding', time: '180ms', x: 500, y: 100 },
    { id: 'storage', name: 'Vector Storage', time: '12ms', x: 350, y: 250 },
    { id: 'indexing', name: 'Index Update', time: '5ms', x: 200, y: 250 }
  ]

  const searchingSteps = [
    { id: 'query-input', name: 'Query Input', time: '0ms', x: 50, y: 100 },
    { id: 'query-process', name: 'Query Processing', time: '8ms', x: 200, y: 100 },
    { id: 'embedding-gen', name: 'Embedding Generation', time: '12ms', x: 350, y: 100 },
    { id: 'vector-search', name: 'Vector Search', time: '15ms', x: 500, y: 100 },
    { id: 'ranking', name: 'Result Ranking', time: '7ms', x: 350, y: 250 },
    { id: 'response', name: 'Response Assembly', time: '3ms', x: 200, y: 250 }
  ]

  const getCurrentSteps = () => {
    switch (activeFlow) {
      case 'indexing': return indexingSteps
      case 'searching': return searchingSteps
      default: return indexingSteps
    }
  }

  return (
    <div className="w-full" style={{ height }}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-brand-gold-400 mb-2">{title}</h3>
        <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{description}</p>
      </div>

      {interactive && (
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            {/* Flow Type Selector */}
            <div className="flex rounded-lg border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
              {Object.entries(flows).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveFlow(key)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeFlow === key ? 'text-brand-gold-400 bg-brand-gold-500/20' : ''
                  }`}
                  style={{ color: activeFlow === key ? 'var(--brand-gold-400)' : 'var(--fg-secondary)' }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Performance Toggle */}
            <button
              onClick={() => setShowPerformance(!showPerformance)}
              className="flex items-center px-3 py-2 rounded-lg border transition-all duration-300 hover:border-brand-gold-500/40"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
            >
              {showPerformance ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
              <span className="text-sm" style={{ color: 'var(--fg-primary)' }}>Performance</span>
            </button>
          </div>
        </div>
      )}

      <div className="relative w-full h-full border rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 350">
          <defs>
            <marker id="dataArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--brand-gold-400)" />
            </marker>
          </defs>

          {/* Flow Steps */}
          {getCurrentSteps().map((step, index) => (
            <g key={step.id}>
              <motion.rect
                x={step.x - 40}
                y={step.y - 25}
                width="80"
                height="50"
                rx="8"
                fill="var(--bg-elevated)"
                stroke="var(--brand-gold-400)"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              />
              
              <text x={step.x} y={step.y - 5} textAnchor="middle" className="text-xs font-semibold fill-current" style={{ fill: 'var(--fg-primary)' }}>
                {step.name}
              </text>
              
              {showPerformance && (
                <text x={step.x} y={step.y + 10} textAnchor="middle" className="text-xs fill-current" style={{ fill: 'var(--brand-gold-400)' }}>
                  {step.time}
                </text>
              )}

              {/* Connection to next step */}
              {index < getCurrentSteps().length - 1 && (
                <motion.line
                  x1={step.x + 40}
                  y1={step.y}
                  x2={getCurrentSteps()[index + 1].x - 40}
                  y2={getCurrentSteps()[index + 1].y}
                  stroke="var(--brand-gold-400)"
                  strokeWidth="2"
                  markerEnd="url(#dataArrow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                />
              )}
            </g>
          ))}
        </svg>
      </div>

      {showPerformance && (
        <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-elevated)' }}>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
            Performance Metrics: {flows[activeFlow]}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {getCurrentSteps().map((step) => (
              <div key={step.id} className="text-center">
                <div className="text-lg font-bold text-brand-gold-400">{step.time}</div>
                <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>{step.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default {
  SystemArchitectureDiagram,
  AlgorithmFlowDiagram,
  DataFlowDiagram
}
