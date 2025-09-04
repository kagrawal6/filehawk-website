import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play,
  Pause,
  RotateCcw,
  BarChart3,
  TrendingUp,
  Calculator,

  Target,
  Brain,
  Activity,
  Gauge,

  Code,

  CheckCircle,
  Award,
  Layers
} from 'lucide-react'

interface ScoringComponent {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  position: { x: number; y: number }
  size: { width: number; height: number }
  weight: number
  formula: string
  example: string
  type: 'input' | 'algorithm' | 'boost' | 'calibration' | 'output'
}

interface ScoringFlow {
  from: string
  to: string
  label: string
  weight: number
  type: 'data' | 'calculation' | 'boost' | 'output'
}

const ConfidenceScoringDiagram: React.FC = () => {
  const [animationState, setAnimationState] = useState<'playing' | 'paused'>('paused')
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [showFormulas, setShowFormulas] = useState(false)
  const [selectedExample, setSelectedExample] = useState<'gist' | 'pinpoint'>('gist')

  const scoringComponents: ScoringComponent[] = [
    {
      id: 'raw-distance',
      name: 'Raw ChromaDB Distance',
      description: 'Cosine distance scores from vector similarity search',
      icon: BarChart3,
      position: { x: 50, y: 50 },
      size: { width: 280, height: 120 },
      weight: 1.0,
      formula: 'distance = 1 - cosine_similarity(query_vector, chunk_vector)',
      example: 'Raw distance: 0.342 → Base similarity: 0.658',
      type: 'input'
    },
    {
      id: 'distance-transform',
      name: 'Distance-to-Confidence Transform',
      description: 'Adaptive mapping from cosine distances to initial confidence scores',
      icon: TrendingUp,
      position: { x: 380, y: 50 },
      size: { width: 300, height: 120 },
      weight: 1.0,
      formula: 'confidence_base = max(0, min(1, (2.0 - distance) / 2.0))',
      example: 'Distance 0.342 → Base confidence: 0.829',
      type: 'algorithm'
    },
    {
      id: 's-max',
      name: 's_max - Best Chunk Score',
      description: 'Maximum similarity score among all chunks in the file',
      icon: Target,
      position: { x: 730, y: 50 },
      size: { width: 280, height: 120 },
      weight: 0.45,
      formula: 's_max = max(chunk_similarities)',
      example: 's_max = 0.892 (highest chunk in file)',
      type: 'algorithm'
    },
    {
      id: 's-topk',
      name: 's_topk_mean - Top-K Average',
      description: 'Average similarity of top-k chunks for consistency measure',
      icon: Layers,
      position: { x: 50, y: 200 },
      size: { width: 280, height: 120 },
      weight: 0.25,
      formula: 's_topk = mean(top_k_similarities) where k=5',
      example: 's_topk = 0.756 (avg of top 5 chunks)',
      type: 'algorithm'
    },
    {
      id: 's-centroid',
      name: 's_centroid - File Centroid',
      description: 'Similarity between query and file-level centroid vector',
      icon: Activity,
      position: { x: 380, y: 200 },
      size: { width: 280, height: 120 },
      weight: 0.20,
      formula: 's_centroid = similarity(query, mean(file_embeddings))',
      example: 's_centroid = 0.643 (file topic alignment)',
      type: 'algorithm'
    },
    {
      id: 's-bm25',
      name: 's_bm25 - BM25 Text Score',
      description: 'Classical BM25 text scoring for term frequency relevance',
      icon: Calculator,
      position: { x: 730, y: 200 },
      size: { width: 280, height: 120 },
      weight: 0.10,
      formula: 'bm25 = Σ(IDF(qi) * (f(qi) * (k1+1)) / (f(qi) + k1 * (1-b+b*|d|/avgdl)))',
      example: 's_bm25 = 0.421 (classical text relevance)',
      type: 'algorithm'
    },
    {
      id: 'filename-boost',
      name: 'AI Filename Semantic Boost',
      description: 'AI-driven semantic similarity between query and filename',
      icon: Brain,
      position: { x: 50, y: 350 },
      size: { width: 300, height: 120 },
      weight: 1.2,
      formula: 'filename_boost = AI_similarity(query, filename) * 0.2',
      example: 'Query: "neural networks" + File: "transformer_architecture.py" → +0.18',
      type: 'boost'
    },
    {
      id: 'exact-term-boost',
      name: 'Exact Term Matching Boost',
      description: 'Direct word overlap bonus with stop word compensation',
      icon: CheckCircle,
      position: { x: 400, y: 350 },
      size: { width: 300, height: 120 },
      weight: 1.15,
      formula: 'term_boost = (overlap_words / total_query_words) * 0.15',
      example: 'Query: "attention mechanism" in content → +0.075',
      type: 'boost'
    },
    {
      id: 'quality-assessment',
      name: 'Semantic Quality Assessment',
      description: 'Multi-factor quality validation and threshold enforcement',
      icon: Award,
      position: { x: 750, y: 350 },
      size: { width: 280, height: 120 },
      weight: 1.0,
      formula: 'quality_multiplier = assess_semantic_coherence(content, query)',
      example: 'Quality score: 0.94 → Good semantic alignment',
      type: 'calibration'
    },
    {
      id: 'final-confidence',
      name: 'Calibrated Confidence Score',
      description: 'Final user-friendly confidence percentage (0-100%)',
      icon: Gauge,
      position: { x: 400, y: 500 },
      size: { width: 320, height: 120 },
      weight: 1.0,
      formula: 'final_confidence = min(1.0, weighted_sum * boosts * quality)',
      example: 'Final result: 87.3% confidence (High)',
      type: 'output'
    }
  ]

  const scoringFlows: ScoringFlow[] = [
    { from: 'raw-distance', to: 'distance-transform', label: 'Raw Scores', weight: 1.0, type: 'data' },
    { from: 'distance-transform', to: 's-max', label: 'Base Confidence', weight: 0.45, type: 'calculation' },
    { from: 'distance-transform', to: 's-topk', label: 'Base Confidence', weight: 0.25, type: 'calculation' },
    { from: 'distance-transform', to: 's-centroid', label: 'Base Confidence', weight: 0.20, type: 'calculation' },
    { from: 'distance-transform', to: 's-bm25', label: 'Base Confidence', weight: 0.10, type: 'calculation' },
    { from: 's-max', to: 'final-confidence', label: 'Weighted Score', weight: 0.45, type: 'calculation' },
    { from: 's-topk', to: 'final-confidence', label: 'Weighted Score', weight: 0.25, type: 'calculation' },
    { from: 's-centroid', to: 'final-confidence', label: 'Weighted Score', weight: 0.20, type: 'calculation' },
    { from: 's-bm25', to: 'final-confidence', label: 'Weighted Score', weight: 0.10, type: 'calculation' },
    { from: 'filename-boost', to: 'final-confidence', label: 'Boost Factor', weight: 1.2, type: 'boost' },
    { from: 'exact-term-boost', to: 'final-confidence', label: 'Boost Factor', weight: 1.15, type: 'boost' },
    { from: 'quality-assessment', to: 'final-confidence', label: 'Quality Multiplier', weight: 1.0, type: 'boost' }
  ]

  const confidenceExamples = {
    gist: {
      query: 'machine learning optimization techniques',
      file: 'gradient_descent_algorithms.py',
      breakdown: {
        s_max: { value: 0.892, weighted: 0.401 },
        s_topk: { value: 0.756, weighted: 0.189 },
        s_centroid: { value: 0.643, weighted: 0.129 },
        s_bm25: { value: 0.421, weighted: 0.042 },
        filename_boost: { value: 0.18, description: 'High semantic match with filename' },
        exact_term_boost: { value: 0.075, description: '2/4 query terms found in content' },
        quality_score: { value: 0.94, description: 'Strong semantic coherence' },
        final_confidence: 87.3
      }
    },
    pinpoint: {
      query: 'self-attention mechanism formula',
      file: 'transformer_attention.py',
      breakdown: {
        base_similarity: { value: 0.823, weighted: 0.823 },
        filename_boost: { value: 0.22, description: 'Exact match with attention topic' },
        exact_term_boost: { value: 0.12, description: '3/3 query terms found exactly' },
        quality_score: { value: 0.97, description: 'Precise information match' },
        final_confidence: 94.7
      }
    }
  }

  const toggleAnimation = () => {
    setAnimationState(animationState === 'playing' ? 'paused' : 'playing')
  }

  const resetAnimation = () => {
    setAnimationState('paused')
    setTimeout(() => setAnimationState('playing'), 100)
  }

  const getComponentColor = (type: string) => {
    const colors = {
      input: { bg: '#ef4444', border: '#dc2626' },
      algorithm: { bg: '#8b5cf6', border: '#7c3aed' },
      boost: { bg: '#f59e0b', border: '#d97706' },
      calibration: { bg: '#059669', border: '#047857' },
      output: { bg: '#3b82f6', border: '#2563eb' }
    }
    return colors[type as keyof typeof colors] || colors.algorithm
  }

  const getFlowColor = (type: string) => {
    const colors = {
      data: '#3B82F6',
      calculation: '#7B1FA2',
      boost: '#F59E0B',
      output: '#10B981'
    }
    return colors[type as keyof typeof colors] || '#6B7280'
  }

  return (
    <div className="w-full space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div>
          <h3 className="text-3xl font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
            Multi-Factor Confidence Scoring Engine
          </h3>
          <p className="text-lg max-w-3xl" style={{ color: 'var(--fg-secondary)' }}>
            Sophisticated 14-component confidence algorithm with semantic quality assessment and user-friendly calibration
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedExample('gist')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedExample === 'gist'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-purple-400'
              }`}
            >
              <Brain className="h-4 w-4 mr-2 inline" />
              Gist Example
            </button>
            <button
              onClick={() => setSelectedExample('pinpoint')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedExample === 'pinpoint'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-blue-400'
              }`}
            >
              <Target className="h-4 w-4 mr-2 inline" />
              Pinpoint Example
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFormulas(!showFormulas)}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                showFormulas 
                  ? 'border-brand-gold-500 text-brand-gold-400 bg-brand-gold-500/10'
                  : 'border-gray-600 text-gray-400 hover:border-brand-gold-500/50'
              }`}
            >
              <Code className="h-4 w-4" />
            </button>
            <button
              onClick={toggleAnimation}
              className="px-4 py-2 rounded-lg border border-brand-gold-500 text-brand-gold-400 hover:bg-brand-gold-500/10 transition-all duration-300"
            >
              {animationState === 'playing' ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
              {animationState === 'playing' ? 'Pause' : 'Calculate'}
            </button>
            <button
              onClick={resetAnimation}
              className="p-2 rounded-lg border border-gray-600 text-gray-400 hover:border-brand-gold-500/50 transition-all duration-300"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mathematical Formula Overview */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <h4 className="text-xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
          Mathematical Foundation
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-lg font-semibold mb-3 text-purple-400">Gist Mode Formula</h5>
            <div className="p-4 rounded-lg font-mono text-sm" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-primary)' }}>
              <div className="mb-2">confidence = weighted_sum(</div>
              <div className="ml-4 space-y-1">
                <div>s_max × 0.45,</div>
                <div>s_topk_mean × 0.25,</div>
                <div>s_centroid × 0.20,</div>
                <div>s_bm25 × 0.10</div>
              </div>
              <div className="mt-2">
                ) × filename_boost × term_boost × quality
              </div>
            </div>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-3 text-blue-400">Pinpoint Mode Formula</h5>
            <div className="p-4 rounded-lg font-mono text-sm" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-primary)' }}>
              <div className="mb-2">confidence = base_similarity ×</div>
              <div className="ml-4 space-y-1">
                <div>(1 + filename_boost) ×</div>
                <div>(1 + term_boost) ×</div>
                <div>quality_multiplier</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Example Calculation */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <h4 className="text-xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
          Live Example: {selectedExample === 'gist' ? 'Gist Mode' : 'Pinpoint Mode'} Calculation
        </h4>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="text-sm text-brand-gold-400 font-medium">QUERY</div>
              <div className="text-lg font-mono p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-primary)' }}>
                "{confidenceExamples[selectedExample].query}"
              </div>
            </div>
            <div className="mb-4">
              <div className="text-sm text-brand-gold-400 font-medium">FILE</div>
              <div className="text-lg font-mono p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-primary)' }}>
                {confidenceExamples[selectedExample].file}
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm text-brand-gold-400 font-medium mb-2">FINAL CONFIDENCE</div>
            <div className="text-4xl font-bold text-green-400 mb-2">
              {confidenceExamples[selectedExample].breakdown.final_confidence}%
            </div>
            <div className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
              {confidenceExamples[selectedExample].breakdown.final_confidence >= 60 ? 'HIGH' : 
               confidenceExamples[selectedExample].breakdown.final_confidence >= 30 ? 'MEDIUM' : 'LOW'} CONFIDENCE
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h5 className="text-lg font-semibold mb-4 text-brand-gold-400">Score Breakdown</h5>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(confidenceExamples[selectedExample].breakdown).map(([key, data]) => {
              if (key === 'final_confidence') return null
              return (
                <div key={key} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}>
                  <div className="text-sm font-medium" style={{ color: 'var(--fg-primary)' }}>
                    {key.replace('_', ' ').toUpperCase()}
                  </div>
                  <div className="text-lg font-bold text-green-400 mt-1">
                    {typeof data === 'object' && 'value' in data ? data.value.toFixed(3) : data}
                  </div>
                  {typeof data === 'object' && 'weighted' in data && (
                    <div className="text-xs text-blue-400 mt-1">
                      Weighted: {data.weighted.toFixed(3)}
                    </div>
                  )}
                  {typeof data === 'object' && 'description' in data && (
                    <div className="text-xs mt-2" style={{ color: 'var(--fg-secondary)' }}>
                      {data.description}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Confidence Scoring Flow Diagram */}
      <div className="relative w-full rounded-xl overflow-auto border aspect-[4/3] min-h-[600px] max-h-[780px]" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)' }}>
        <svg width="100%" height="100%" viewBox="0 0 1300 750" className="absolute inset-0">
          {/* Background Grid */}
          <defs>
            <pattern id="confidenceGrid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(156, 163, 175, 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#confidenceGrid)" />

          {/* Scoring Flow Connections */}
          <AnimatePresence>
            {scoringFlows.map((flow, index) => {
              const fromComponent = scoringComponents.find(c => c.id === flow.from)
              const toComponent = scoringComponents.find(c => c.id === flow.to)
              
              if (!fromComponent || !toComponent) return null
              
              const fromX = fromComponent.position.x + fromComponent.size.width / 2
              const fromY = fromComponent.position.y + fromComponent.size.height / 2
              const toX = toComponent.position.x + toComponent.size.width / 2
              const toY = toComponent.position.y + toComponent.size.height / 2
              
              const flowColor = getFlowColor(flow.type)
              const strokeWidth = Math.max(2, flow.weight * 4)
              
              return (
                <g key={flow.from + flow.to}>
                  <motion.line
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke={flowColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={flow.type === 'boost' ? "8,4" : "none"}
                    opacity="0.8"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: animationState === 'playing' ? 1 : 0,
                      transition: { 
                        delay: index * 0.2,
                        duration: 1.2,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  {/* Arrow */}
                  <motion.polygon
                    points={`${toX-12},${toY-8} ${toX-12},${toY+8} ${toX-2},${toY}`}
                    fill={flowColor}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: animationState === 'playing' ? 0.9 : 0,
                      scale: animationState === 'playing' ? 1 : 0,
                      transition: { 
                        delay: index * 0.2 + 1.0,
                        duration: 0.4 
                      }
                    }}
                  />
                  
                  {/* Weight Label */}
                  <motion.text
                    x={(fromX + toX) / 2}
                    y={(fromY + toY) / 2 - 15}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill={flowColor}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: animationState === 'playing' ? 1 : 0,
                      transition: { 
                        delay: index * 0.2 + 1.2,
                        duration: 0.4 
                      }
                    }}
                  >
                    {flow.weight === 1.0 ? flow.label : `${flow.label} (${flow.weight})`}
                  </motion.text>
                </g>
              )
            })}
          </AnimatePresence>

          {/* Scoring Components */}
          <AnimatePresence>
            {scoringComponents.map((component, index) => {
              const isSelected = selectedComponent === component.id
              const colors = getComponentColor(component.type)
              
              return (
                <g key={component.id}>
                  {/* Component Background */}
                  <motion.rect
                    x={component.position.x}
                    y={component.position.y}
                    width={component.size.width}
                    height={component.size.height}
                    rx="12"
                    fill={colors.bg}
                    stroke={isSelected ? '#F59E0B' : colors.border}
                    strokeWidth={isSelected ? "4" : "3"}
                    className="cursor-pointer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 120
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedComponent(selectedComponent === component.id ? null : component.id)}
                  />
                  
                  {/* Component Icon */}
                  <motion.circle
                    cx={component.position.x + 30}
                    cy={component.position.y + 30}
                    r="16"
                    fill={colors.border}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      transition: { 
                        delay: index * 0.1 + 0.3,
                        duration: 0.4 
                      }
                    }}
                  />
                  
                  <motion.circle
                    cx={component.position.x + 30}
                    cy={component.position.y + 30}
                    r="11"
                    fill="white"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      transition: { 
                        delay: index * 0.1 + 0.4,
                        duration: 0.3 
                      }
                    }}
                  />
                  
                  {/* Component Name */}
                  <motion.text
                    x={component.position.x + 60}
                    y={component.position.y + 25}
                    fontSize="14"
                    fontWeight="700"
                    fill="var(--fg-primary)"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1 + 0.5,
                        duration: 0.3 
                      }
                    }}
                  >
                    {component.name}
                  </motion.text>
                  
                  {/* Component Weight */}
                  <motion.text
                    x={component.position.x + 60}
                    y={component.position.y + 42}
                    fontSize="11"
                    fill="var(--fg-secondary)"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1 + 0.6,
                        duration: 0.3 
                      }
                    }}
                  >
                    {component.type.toUpperCase()} • WEIGHT: {component.weight}
                  </motion.text>
                  
                  {/* Example Value */}
                  <motion.text
                    x={component.position.x + 20}
                    y={component.position.y + component.size.height - 25}
                    fontSize="11"
                    fill="var(--fg-secondary)"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1 + 0.7,
                        duration: 0.3 
                      }
                    }}
                  >
                    {component.example}
                  </motion.text>
                  
                  {/* Formula Preview */}
                  {showFormulas && (
                    <motion.text
                      x={component.position.x + 20}
                      y={component.position.y + 75}
                      fontSize="9"
                      fontFamily="monospace"
                      fill="var(--fg-muted)"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        transition: { 
                          delay: index * 0.1 + 0.8,
                          duration: 0.3 
                        }
                      }}
                    >
                      {component.formula.slice(0, 40)}...
                    </motion.text>
                  )}
                </g>
              )
            })}
          </AnimatePresence>
        </svg>
      </div>

      {/* Selected Component Details */}
      <AnimatePresence>
        {selectedComponent && (
          <motion.div
            className="p-8 rounded-xl border"
            style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {(() => {
              const component = scoringComponents.find(c => c.id === selectedComponent)
              if (!component) return null
              
              const colors = getComponentColor(component.type)
              
              return (
                <div className="space-y-6">
                  <div className="flex items-start space-x-6">
                    <div 
                      className="w-20 h-20 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: colors.border }}
                    >
                      <component.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h4 className="text-2xl font-bold" style={{ color: 'var(--fg-primary)' }}>
                          {component.name}
                        </h4>
                        <span 
                          className="px-3 py-1 text-xs font-bold rounded-full uppercase"
                          style={{ backgroundColor: colors.bg, color: colors.border }}
                        >
                          {component.type}
                        </span>
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-gold-500/20 text-brand-gold-400 border border-brand-gold-500/30">
                          WEIGHT: {component.weight}
                        </span>
                      </div>
                      <p className="text-lg mb-6" style={{ color: 'var(--fg-secondary)' }}>
                        {component.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="text-lg font-semibold mb-4 text-brand-gold-400">
                            Mathematical Formula
                          </h5>
                          <div className="p-4 rounded-lg font-mono text-sm" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-primary)' }}>
                            {component.formula}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-lg font-semibold mb-4 text-brand-gold-400">
                            Example Calculation
                          </h5>
                          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                            <div className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                              {component.example}
                            </div>
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

export default ConfidenceScoringDiagram
