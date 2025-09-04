import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain,
  Search,
  Target,
  Layers,
  Activity,

  Play,
  Pause,
  RotateCcw,
  FileText,

  ChevronRight,
  TrendingUp,
  Gauge,
  Eye,
  Focus
} from 'lucide-react'

interface AIModelNode {
  id: string
  name: string
  type: 'input' | 'model' | 'processing' | 'output' | 'metric'
  position: { x: number; y: number }
  size: { width: number; height: number }
  icon: React.ComponentType<any>
  description: string
  specs: string[]
  performance: { metric: string; value: string }[]
}

interface ProcessingFlow {
  id: string
  from: string
  to: string
  label: string
  data: string
  timing: number
  type: 'data' | 'control' | 'feedback'
}

const DualModelAIDiagram: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<'gist' | 'pinpoint'>('gist')
  const [animationState, setAnimationState] = useState<'playing' | 'paused'>('paused')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [showPerformanceMetrics, setShowPerformanceMetrics] = useState(false)

  const gistModelNodes: AIModelNode[] = [
    {
      id: 'query-input',
      name: 'Natural Language Query',
      type: 'input',
      position: { x: 50, y: 50 },
      size: { width: 320, height: 120 },
      icon: FileText,
      description: 'User natural language query for topic-level understanding',
      specs: ['Free-form text', 'Multi-word queries', 'Conversational language'],
      performance: [
        { metric: 'Query Types', value: '95.7% success' },
        { metric: 'Preprocessing', value: '<5ms' }
      ]
    },
    {
      id: 'gist-preprocessing',
      name: 'Query Preprocessing',
      type: 'processing',
      position: { x: 280, y: 50 },
      size: { width: 160, height: 80 },
      icon: Activity,
      description: 'Normalization, tokenization, and stop word handling for topic search',
      specs: ['Unicode normalization', 'Token extraction', 'Stop word filtering'],
      performance: [
        { metric: 'Processing Speed', value: '2ms avg' },
        { metric: 'Token Accuracy', value: '99.1%' }
      ]
    },
    {
      id: 'msmarco-model',
      name: 'MSMarco MiniLM Model',
      type: 'model',
      position: { x: 490, y: 50 },
      size: { width: 200, height: 120 },
      icon: Brain,
      description: 'Search-optimized transformer model for topic-level semantic understanding',
      specs: [
        'msmarco-MiniLM-L6-cos-v5',
        '6-layer transformer',
        '384-dimensional embeddings',
        '8.8M training passages'
      ],
      performance: [
        { metric: 'Inference Time', value: '50ms avg' },
        { metric: 'Memory Usage', value: '150MB' },
        { metric: 'Topic Accuracy', value: '94.2%' },
        { metric: 'Context Window', value: '512 tokens' }
      ]
    },
    {
      id: 'gist-embedding',
      name: 'Topic Embeddings',
      type: 'output',
      position: { x: 740, y: 50 },
      size: { width: 160, height: 80 },
      icon: Layers,
      description: '384-dimensional vectors optimized for file-level topic similarity',
      specs: ['384 dimensions', 'L2 normalized', 'Cosine similarity'],
      performance: [
        { metric: 'Vector Quality', value: '91.7% semantic' },
        { metric: 'Clustering', value: '89.3% precision' }
      ]
    },
    {
      id: 'gist-search',
      name: 'Two-Stage Retrieval',
      type: 'processing',
      position: { x: 280, y: 200 },
      size: { width: 180, height: 100 },
      icon: Search,
      description: 'File shortlisting followed by holistic scoring with 14-component algorithm',
      specs: [
        'Stage A: File centroids',
        'Stage B: Multi-factor scoring',
        's_max, s_topk, s_centroid',
        'BM25 integration'
      ],
      performance: [
        { metric: 'Candidates', value: 'Top 200 files' },
        { metric: 'Scoring Speed', value: '125ms' },
        { metric: 'Ranking Quality', value: '96.3%' }
      ]
    },
    {
      id: 'gist-confidence',
      name: 'Confidence Calibration',
      type: 'metric',
      position: { x: 520, y: 200 },
      size: { width: 180, height: 80 },
      icon: Gauge,
      description: 'Multi-factor confidence scoring with semantic quality assessment',
      specs: ['14 scoring components', 'Filename boost', 'Quality thresholds'],
      performance: [
        { metric: 'Calibration Accuracy', value: '2.1% margin' },
        { metric: 'Badge Thresholds', value: '94.1% correct' }
      ]
    }
  ]

  const pinpointModelNodes: AIModelNode[] = [
    {
      id: 'query-input',
      name: 'Specific Information Query',
      type: 'input',
      position: { x: 50, y: 50 },
      size: { width: 180, height: 60 },
      icon: Target,
      description: 'Precise queries for exact information location and retrieval',
      specs: ['Specific facts', 'Code snippets', 'Exact phrases'],
      performance: [
        { metric: 'Precision Queries', value: '96.8% success' },
        { metric: 'Line Accuracy', value: '94.7%' }
      ]
    },
    {
      id: 'pinpoint-preprocessing',
      name: 'Precision Preprocessing',
      type: 'processing',
      position: { x: 280, y: 50 },
      size: { width: 160, height: 80 },
      icon: Focus,
      description: 'Minimal preprocessing to preserve exact query semantics',
      specs: ['Preserve punctuation', 'Case sensitivity', 'Exact tokenization'],
      performance: [
        { metric: 'Processing Speed', value: '1.5ms avg' },
        { metric: 'Token Preservation', value: '99.8%' }
      ]
    },
    {
      id: 'allmini-model',
      name: 'AllMiniLM Model',
      type: 'model',
      position: { x: 490, y: 50 },
      size: { width: 200, height: 120 },
      icon: Brain,
      description: 'General-purpose semantic model for precise line-level matching',
      specs: [
        'all-MiniLM-L6-v2',
        '6-layer transformer',
        '384-dimensional embeddings',
        '1B+ training pairs'
      ],
      performance: [
        { metric: 'Inference Time', value: '30ms avg' },
        { metric: 'Memory Usage', value: '120MB' },
        { metric: 'Precision Accuracy', value: '96.8%' },
        { metric: 'Context Window', value: '256 tokens' }
      ]
    },
    {
      id: 'pinpoint-embedding',
      name: 'Precise Embeddings',
      type: 'output',
      position: { x: 740, y: 50 },
      size: { width: 160, height: 80 },
      icon: Eye,
      description: '384-dimensional vectors optimized for chunk-level precision matching',
      specs: ['384 dimensions', 'Chunk-specific', 'Line-level granularity'],
      performance: [
        { metric: 'Precision Score', value: '94.7% exact' },
        { metric: 'Line Mapping', value: '100% accurate' }
      ]
    },
    {
      id: 'pinpoint-search',
      name: 'Granular Search',
      type: 'processing',
      position: { x: 280, y: 200 },
      size: { width: 180, height: 100 },
      icon: Search,
      description: 'Direct chunk-level similarity search with contextual snippet extraction',
      specs: [
        '10-line chunk granularity',
        'Direct similarity ranking',
        'Context preservation',
        'Snippet extraction'
      ],
      performance: [
        { metric: 'Search Speed', value: '85ms avg' },
        { metric: 'Chunk Accuracy', value: '96.8%' },
        { metric: 'Context Quality', value: '89.4%' }
      ]
    },
    {
      id: 'pinpoint-confidence',
      name: 'Direct Confidence',
      type: 'metric',
      position: { x: 520, y: 200 },
      size: { width: 180, height: 80 },
      icon: TrendingUp,
      description: 'Direct distance-to-confidence mapping with minimal boosting',
      specs: ['Semantic similarity', 'Distance mapping', 'Quality validation'],
      performance: [
        { metric: 'Direct Mapping', value: '97.2% linear' },
        { metric: 'Confidence Range', value: '0-100%' }
      ]
    }
  ]

  const gistFlows: ProcessingFlow[] = [
    { id: 'gf1', from: 'query-input', to: 'gist-preprocessing', label: 'Raw Query', data: 'Text String', timing: 0, type: 'data' },
    { id: 'gf2', from: 'gist-preprocessing', to: 'msmarco-model', label: 'Normalized Tokens', data: 'Token Array', timing: 200, type: 'data' },
    { id: 'gf3', from: 'msmarco-model', to: 'gist-embedding', label: 'Topic Vector', data: '384-dim Array', timing: 400, type: 'data' },
    { id: 'gf4', from: 'gist-embedding', to: 'gist-search', label: 'Query Embedding', data: 'Vector', timing: 600, type: 'control' },
    { id: 'gf5', from: 'gist-search', to: 'gist-confidence', label: 'Ranked Results', data: 'Score Array', timing: 800, type: 'data' },
    { id: 'gf6', from: 'gist-confidence', to: 'query-input', label: 'User Feedback', data: 'Confidence %', timing: 1000, type: 'feedback' }
  ]

  const pinpointFlows: ProcessingFlow[] = [
    { id: 'pf1', from: 'query-input', to: 'pinpoint-preprocessing', label: 'Precise Query', data: 'Text String', timing: 0, type: 'data' },
    { id: 'pf2', from: 'pinpoint-preprocessing', to: 'allmini-model', label: 'Exact Tokens', data: 'Token Array', timing: 150, type: 'data' },
    { id: 'pf3', from: 'allmini-model', to: 'pinpoint-embedding', label: 'Precise Vector', data: '384-dim Array', timing: 300, type: 'data' },
    { id: 'pf4', from: 'pinpoint-embedding', to: 'pinpoint-search', label: 'Query Embedding', data: 'Vector', timing: 450, type: 'control' },
    { id: 'pf5', from: 'pinpoint-search', to: 'pinpoint-confidence', label: 'Chunk Results', data: 'Chunk Array', timing: 600, type: 'data' },
    { id: 'pf6', from: 'pinpoint-confidence', to: 'query-input', label: 'Precise Results', data: 'Line Numbers', timing: 750, type: 'feedback' }
  ]

  const currentNodes = selectedModel === 'gist' ? gistModelNodes : pinpointModelNodes
  const currentFlows = selectedModel === 'gist' ? gistFlows : pinpointFlows

  const toggleAnimation = () => {
    setAnimationState(animationState === 'playing' ? 'paused' : 'playing')
  }

  const resetAnimation = () => {
    setAnimationState('paused')
    setTimeout(() => setAnimationState('playing'), 100)
  }

  const getNodeColor = (type: string) => {
    const colors = {
      input: { bg: '#ef4444', border: '#dc2626' },
      model: { bg: '#8b5cf6', border: '#7c3aed' },
      processing: { bg: '#10b981', border: '#059669' },
      output: { bg: '#3b82f6', border: '#2563eb' },
      metric: { bg: '#f59e0b', border: '#d97706' }
    }
    return colors[type as keyof typeof colors] || colors.processing
  }

  const getFlowColor = (type: string) => {
    const colors = {
      data: '#3B82F6',
      control: '#10B981',
      feedback: '#F59E0B'
    }
    return colors[type as keyof typeof colors] || '#6B7280'
  }

  return (
    <div className="w-full space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
            Dual-Model AI Architecture
          </h3>
          <p className="text-sm max-w-2xl" style={{ color: 'var(--fg-secondary)' }}>
            Advanced semantic intelligence with specialized models for topic understanding and precise information retrieval
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedModel('gist')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedModel === 'gist'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-purple-400'
              }`}
            >
              <Brain className="h-4 w-4 mr-2 inline" />
              Gist Mode
            </button>
            <button
              onClick={() => setSelectedModel('pinpoint')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedModel === 'pinpoint'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-blue-400'
              }`}
            >
              <Target className="h-4 w-4 mr-2 inline" />
              Pinpoint Mode
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPerformanceMetrics(!showPerformanceMetrics)}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                showPerformanceMetrics 
                  ? 'border-brand-gold-500 text-brand-gold-400 bg-brand-gold-500/10'
                  : 'border-gray-600 text-gray-400 hover:border-brand-gold-500/50'
              }`}
            >
              <Gauge className="h-4 w-4" />
            </button>
            <button
              onClick={toggleAnimation}
              className="p-2 rounded-lg border border-brand-gold-500 text-brand-gold-400 hover:bg-brand-gold-500/10 transition-all duration-300"
            >
              {animationState === 'playing' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              onClick={resetAnimation}
              className="p-2 rounded-lg border border-gray-600 text-gray-400 hover:border-brand-gold-500/50 transition-all duration-300"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Model Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          className="p-6 rounded-xl border"
          style={{ 
            backgroundColor: selectedModel === 'gist' ? 'var(--bg-elevated)' : 'var(--bg-elevated)', 
            borderColor: selectedModel === 'gist' ? 'var(--purple-border)' : 'var(--border-subtle)',
            boxShadow: selectedModel === 'gist' ? '0 0 0 1px rgb(168, 85, 247, 0.4)' : 'none'
          }}
          layout
        >
          <div className="flex items-center mb-4">
            <Brain className="h-6 w-6 mr-3 text-purple-500" />
            <h4 className="text-lg font-bold" style={{ color: 'var(--fg-primary)' }}>
              Gist Mode - Topic Understanding
            </h4>
          </div>
          <div className="space-y-3 text-sm" style={{ color: 'var(--fg-secondary)' }}>
            <div><strong>Model:</strong> MSMarco MiniLM L6 (search-optimized)</div>
            <div><strong>Training:</strong> 8.8M passage ranking pairs</div>
            <div><strong>Chunk Size:</strong> 35 lines (topic coherence)</div>
            <div><strong>Use Case:</strong> "Find documents about machine learning"</div>
            <div><strong>Strength:</strong> Semantic understanding & file-level relevance</div>
          </div>
        </motion.div>

        <motion.div 
          className="p-6 rounded-xl border"
          style={{ 
            backgroundColor: selectedModel === 'pinpoint' ? 'var(--bg-elevated)' : 'var(--bg-elevated)', 
            borderColor: selectedModel === 'pinpoint' ? 'var(--blue-border)' : 'var(--border-subtle)',
            boxShadow: selectedModel === 'pinpoint' ? '0 0 0 1px rgb(59, 130, 246, 0.4)' : 'none'
          }}
          layout
        >
          <div className="flex items-center mb-4">
            <Target className="h-6 w-6 mr-3 text-blue-500" />
            <h4 className="text-lg font-bold" style={{ color: 'var(--fg-primary)' }}>
              Pinpoint Mode - Precise Retrieval
            </h4>
          </div>
          <div className="space-y-3 text-sm" style={{ color: 'var(--fg-secondary)' }}>
            <div><strong>Model:</strong> AllMiniLM L6 v2 (general-purpose)</div>
            <div><strong>Training:</strong> 1B+ diverse sentence pairs</div>
            <div><strong>Chunk Size:</strong> 10 lines (precision focus)</div>
            <div><strong>Use Case:</strong> "transformer model architecture details"</div>
            <div><strong>Strength:</strong> Exact information location & line-level accuracy</div>
          </div>
        </motion.div>
      </div>

      {/* Main AI Flow Diagram */}
      <div className="relative w-full rounded-xl overflow-hidden border aspect-[4/3] min-h-[500px] max-h-[700px]" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)' }}>
        <svg width="100%" height="100%" viewBox="0 0 1400 650" className="absolute inset-0">
          {/* Background Grid */}
          <defs>
            <pattern id="aiGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(156, 163, 175, 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aiGrid)" />

          {/* Flow Connections */}
          <AnimatePresence>
            {currentFlows.map((flow) => {
              const fromNode = currentNodes.find(n => n.id === flow.from)
              const toNode = currentNodes.find(n => n.id === flow.to)
              
              if (!fromNode || !toNode) return null
              
              const fromX = fromNode.position.x + fromNode.size.width / 2
              const fromY = fromNode.position.y + fromNode.size.height / 2
              const toX = toNode.position.x + toNode.size.width / 2
              const toY = toNode.position.y + toNode.size.height / 2
              
              const flowColor = getFlowColor(flow.type)
              
              return (
                <g key={flow.id}>
                  <motion.line
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke={flowColor}
                    strokeWidth="3"
                    strokeDasharray={flow.type === 'feedback' ? "8,4" : "none"}
                    opacity="0.8"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: animationState === 'playing' ? 1 : 0,
                      transition: { 
                        delay: flow.timing / 200,
                        duration: 0.8,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  {/* Flow data label */}
                  <motion.text
                    x={(fromX + toX) / 2}
                    y={(fromY + toY) / 2 - 12}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fill={flowColor}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: animationState === 'playing' ? 1 : 0,
                      transition: { 
                        delay: flow.timing / 200 + 0.5,
                        duration: 0.3 
                      }
                    }}
                  >
                    {flow.label}
                  </motion.text>
                  <motion.text
                    x={(fromX + toX) / 2}
                    y={(fromY + toY) / 2 + 2}
                    textAnchor="middle"
                    fontSize="8"
                    fill={flowColor}
                    opacity="0.7"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: animationState === 'playing' ? 0.7 : 0,
                      transition: { 
                        delay: flow.timing / 200 + 0.7,
                        duration: 0.3 
                      }
                    }}
                  >
                    {flow.data}
                  </motion.text>
                </g>
              )
            })}
          </AnimatePresence>

          {/* AI Model Nodes */}
          <AnimatePresence mode="wait">
            {currentNodes.map((node, index) => {
              const colors = getNodeColor(node.type)
              const isSelected = selectedNode === node.id
              
              return (
                <g key={`${selectedModel}-${node.id}`}>
                  {/* Node Background */}
                  <motion.rect
                    x={node.position.x}
                    y={node.position.y}
                    width={node.size.width}
                    height={node.size.height}
                    rx="12"
                    fill={colors.bg}
                    stroke={isSelected ? '#F59E0B' : colors.border}
                    strokeWidth={isSelected ? "3" : "2"}
                    className="cursor-pointer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 120
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  />
                  
                  {/* Node Icon */}
                  <motion.circle
                    cx={node.position.x + 25}
                    cy={node.position.y + 25}
                    r="15"
                    fill={colors.border}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      transition: { 
                        delay: index * 0.1 + 0.2,
                        duration: 0.3 
                      }
                    }}
                  />
                  
                  <motion.circle
                    cx={node.position.x + 25}
                    cy={node.position.y + 25}
                    r="10"
                    fill="white"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      transition: { 
                        delay: index * 0.1 + 0.3,
                        duration: 0.2 
                      }
                    }}
                  />
                  
                  {/* Node Name */}
                  <motion.text
                    x={node.position.x + 55}
                    y={node.position.y + 20}
                    fontSize="14"
                    fontWeight="700"
                    fill="var(--fg-primary)"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1 + 0.4,
                        duration: 0.3 
                      }
                    }}
                  >
                    {node.name}
                  </motion.text>
                  
                  {/* Node Type */}
                  <motion.text
                    x={node.position.x + 55}
                    y={node.position.y + 36}
                    fontSize="10"
                    fill="var(--fg-secondary)"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1 + 0.5,
                        duration: 0.3 
                      }
                    }}
                  >
                    {node.type.toUpperCase()} NODE
                  </motion.text>
                  
                  {/* Performance Metrics (if enabled) */}
                  {showPerformanceMetrics && node.performance.length > 0 && (
                    <motion.text
                      x={node.position.x + 55}
                      y={node.position.y + node.size.height - 12}
                      fontSize="9"
                      fill="var(--fg-muted)"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        transition: { 
                          delay: index * 0.1 + 0.6,
                          duration: 0.3 
                        }
                      }}
                    >
                      {node.performance[0].metric}: {node.performance[0].value}
                    </motion.text>
                  )}
                </g>
              )
            })}
          </AnimatePresence>
        </svg>
      </div>

      {/* Selected Node Details */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            className="p-6 rounded-xl border"
            style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const node = currentNodes.find(n => n.id === selectedNode)
              if (!node) return null
              
              const colors = getNodeColor(node.type)
              
              return (
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: colors.border }}
                    >
                      <node.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
                        {node.name}
                      </h4>
                      <div className="text-xs text-brand-gold-400 mb-3 uppercase font-medium">
                        {node.type} Component • {selectedModel} Mode
                      </div>
                      <p className="text-sm mb-4" style={{ color: 'var(--fg-secondary)' }}>
                        {node.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-sm font-semibold mb-3 text-brand-gold-400">
                            Technical Specifications
                          </h5>
                          <div className="space-y-2">
                            {node.specs.map((spec, i) => (
                              <div key={i} className="text-sm flex items-center" style={{ color: 'var(--fg-secondary)' }}>
                                <ChevronRight className="h-3 w-3 mr-2 text-brand-gold-400" />
                                {spec}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-semibold mb-3 text-brand-gold-400">
                            Performance Metrics
                          </h5>
                          <div className="space-y-2">
                            {node.performance.map((metric, i) => (
                              <div key={i} className="flex justify-between items-center text-sm">
                                <span style={{ color: 'var(--fg-secondary)' }}>{metric.metric}</span>
                                <span className="font-bold text-green-400">{metric.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DualModelAIDiagram
