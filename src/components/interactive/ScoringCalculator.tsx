import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  BarChart3, 
  TrendingUp,
  Settings,
  Info,
  Target,
  Layers,
  FileText,
  Search,
  RotateCcw,
  Code,
  Lightbulb
} from 'lucide-react'

interface ScoringWeights {
  s_max: number
  s_topk_mean: number
  s_centroid: number
  s_bm25: number
}

interface MockFileScore {
  id: string
  name: string
  path: string
  components: {
    s_max: number
    s_topk_mean: number
    s_centroid: number
    s_bm25: number
  }
  finalScore: number
  description: string
  bestChunk: string
}

interface ScoringCalculatorProps {
  className?: string
}

const ScoringCalculator: React.FC<ScoringCalculatorProps> = ({ className = '' }) => {
  const [weights, setWeights] = useState<ScoringWeights>({
    s_max: 0.45,
    s_topk_mean: 0.25,
    s_centroid: 0.20,
    s_bm25: 0.10
  })
  
  const [selectedPreset, setSelectedPreset] = useState<string>('default')
  const [showFormula, setShowFormula] = useState(false)

  // Weight presets
  const presets = {
    default: { s_max: 0.45, s_topk_mean: 0.25, s_centroid: 0.20, s_bm25: 0.10 },
    precise: { s_max: 0.60, s_topk_mean: 0.20, s_centroid: 0.15, s_bm25: 0.05 },
    contextual: { s_max: 0.30, s_topk_mean: 0.35, s_centroid: 0.30, s_bm25: 0.05 },
    balanced: { s_max: 0.35, s_topk_mean: 0.30, s_centroid: 0.25, s_bm25: 0.10 },
    semantic: { s_max: 0.25, s_topk_mean: 0.25, s_centroid: 0.45, s_bm25: 0.05 }
  }

  // Mock file data with varying score components
  const mockFiles: Omit<MockFileScore, 'finalScore'>[] = [
    {
      id: 'file1',
      name: 'machine_learning_guide.md',
      path: '/docs/ai/machine_learning_guide.md',
      components: { s_max: 0.89, s_topk_mean: 0.76, s_centroid: 0.82, s_bm25: 0.65 },
      description: 'Comprehensive ML guide with algorithm explanations',
      bestChunk: 'Machine learning algorithms are powerful tools for pattern recognition and predictive modeling in data science applications.'
    },
    {
      id: 'file2', 
      name: 'neural_networks.py',
      path: '/src/ai/neural_networks.py',
      components: { s_max: 0.95, s_topk_mean: 0.68, s_centroid: 0.71, s_bm25: 0.42 },
      description: 'Python implementation of neural network architectures',
      bestChunk: 'def create_neural_network(layers, activation="relu", optimizer="adam"): # Core neural network implementation'
    },
    {
      id: 'file3',
      name: 'deep_learning_theory.pdf',
      path: '/research/papers/deep_learning_theory.pdf',
      components: { s_max: 0.78, s_topk_mean: 0.85, s_centroid: 0.88, s_bm25: 0.73 },
      description: 'Academic paper on deep learning theoretical foundations',
      bestChunk: 'Deep neural networks demonstrate remarkable capabilities in learning hierarchical representations from high-dimensional data.'
    },
    {
      id: 'file4',
      name: 'project_management.md', 
      path: '/docs/business/project_management.md',
      components: { s_max: 0.32, s_topk_mean: 0.41, s_centroid: 0.28, s_bm25: 0.85 },
      description: 'Project management methodologies and best practices',
      bestChunk: 'Agile methodologies emphasize iterative development cycles and continuous collaboration between cross-functional teams.'
    },
    {
      id: 'file5',
      name: 'algorithm_analysis.cpp',
      path: '/src/algorithms/algorithm_analysis.cpp', 
      components: { s_max: 0.67, s_topk_mean: 0.59, s_centroid: 0.45, s_bm25: 0.38 },
      description: 'C++ implementation of various sorting algorithms',
      bestChunk: '// Quicksort implementation with average O(n log n) complexity and excellent cache performance characteristics'
    }
  ]

  // Calculate final scores based on current weights
  const rankedFiles = useMemo(() => {
    return mockFiles.map(file => ({
      ...file,
      finalScore: weights.s_max * file.components.s_max +
                 weights.s_topk_mean * file.components.s_topk_mean +
                 weights.s_centroid * file.components.s_centroid +
                 weights.s_bm25 * file.components.s_bm25
    })).sort((a, b) => b.finalScore - a.finalScore)
  }, [weights])

  // Handle weight changes
  const handleWeightChange = (component: keyof ScoringWeights, value: number) => {
    setWeights(prev => ({ ...prev, [component]: value }))
    setSelectedPreset('custom')
  }

  // Apply preset
  const applyPreset = (presetName: string) => {
    if (presetName in presets) {
      setWeights(presets[presetName as keyof typeof presets])
      setSelectedPreset(presetName)
    }
  }

  // Reset to default
  const resetToDefault = () => {
    applyPreset('default')
  }

  // Ensure weights sum to 1.0
  const weightSum = Object.values(weights).reduce((sum, val) => sum + val, 0)
  const isValidWeights = Math.abs(weightSum - 1.0) < 0.001

  // Component descriptions
  const componentDescriptions = {
    s_max: {
      title: 'Maximum Similarity (s_max)',
      description: 'Highest similarity score between query and any chunk in the file',
      icon: Target,
      color: 'text-red-400',
      explanation: 'Represents the "bullseye" chunk - the most relevant piece of content in the file'
    },
    s_topk_mean: {
      title: 'Top-K Mean (s_topk_mean)', 
      description: 'Average similarity of the top-k most relevant chunks',
      icon: BarChart3,
      color: 'text-blue-400',
      explanation: 'Measures consistent relevance across multiple sections of the file'
    },
    s_centroid: {
      title: 'File Centroid (s_centroid)',
      description: 'Similarity between query and file\'s overall semantic representation',
      icon: Layers,
      color: 'text-green-400',
      explanation: 'Captures the general thematic alignment between query and file content'
    },
    s_bm25: {
      title: 'BM25 Score (s_bm25)',
      description: 'Traditional term-frequency based relevance score',
      icon: FileText,
      color: 'text-yellow-400',
      explanation: 'Ensures exact keyword matches are properly weighted in the final score'
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
            Holistic Scoring Calculator
          </h3>
          <p style={{ color: 'var(--fg-secondary)' }}>
            Experiment with scoring weights to see how they affect search result rankings
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFormula(!showFormula)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              showFormula ? 'bg-brand-gold-500/20 text-brand-gold-400 border-brand-gold-500' : 'hover:bg-gray-700/50'
            }`}
            style={{ borderColor: showFormula ? '' : 'var(--border-subtle)', color: showFormula ? '' : 'var(--fg-secondary)' }}
          >
            <Code className="h-4 w-4 mr-2" />
            {showFormula ? 'Hide Formula' : 'Show Formula'}
          </button>
          
          <button
            onClick={resetToDefault}
            className="px-4 py-2 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 hover:bg-brand-gold-500/30 transition-colors"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </button>
        </div>
      </div>

      {/* Mathematical Formula */}
      {showFormula && (
        <motion.div 
          className="p-6 rounded-xl border"
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-4">
            <Calculator className="h-5 w-5 text-brand-gold-400 mr-2" />
            <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
              Holistic Scoring Formula
            </h4>
          </div>
          
          <div className="p-4 rounded-lg font-mono text-sm overflow-x-auto" style={{ backgroundColor: 'var(--bg-muted)' }}>
            <div style={{ color: 'var(--fg-primary)' }}>
              <div className="mb-4">
                <span className="text-brand-gold-400">final_score</span> = 
                <span className="text-red-400"> w₁ × s_max</span> +
                <span className="text-blue-400"> w₂ × s_topk_mean</span> +
                <span className="text-green-400"> w₃ × s_centroid</span> +
                <span className="text-yellow-400"> w₄ × s_bm25</span>
              </div>
              
              <div className="text-xs space-y-1" style={{ color: 'var(--fg-muted)' }}>
                <div>where:</div>
                <div>• w₁ = {weights.s_max.toFixed(2)} (max chunk similarity weight)</div>
                <div>• w₂ = {weights.s_topk_mean.toFixed(2)} (top-k mean similarity weight)</div>
                <div>• w₃ = {weights.s_centroid.toFixed(2)} (file centroid similarity weight)</div>
                <div>• w₄ = {weights.s_bm25.toFixed(2)} (BM25 term matching weight)</div>
                <div>• Σwᵢ = {weightSum.toFixed(3)} {isValidWeights ? '✓' : '⚠️'}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Weight Configuration */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Presets */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-4">
            <Settings className="h-5 w-5 text-brand-gold-400 mr-2" />
            <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
              Weight Presets
            </h4>
          </div>
          
          <div className="space-y-2">
            {Object.entries(presets).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedPreset === key 
                    ? 'bg-brand-gold-500/20 text-brand-gold-400 border border-brand-gold-500' 
                    : 'hover:bg-gray-700/50 border border-transparent'
                }`}
                style={{ color: selectedPreset === key ? '' : 'var(--fg-secondary)' }}
              >
                <div className="font-medium capitalize">{key}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>
                  max: {preset.s_max} | topk: {preset.s_topk_mean} | centroid: {preset.s_centroid} | bm25: {preset.s_bm25}
                </div>
              </button>
            ))}
            
            {selectedPreset === 'custom' && (
              <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500">
                <div className="font-medium text-purple-400">Custom</div>
                <div className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>
                  User-defined weights
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Weight Sliders */}
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(componentDescriptions).map(([key, info]) => {
            const component = key as keyof ScoringWeights
            const Icon = info.icon
            
            return (
              <div key={key} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center flex-1">
                    <Icon className={`h-5 w-5 mr-3 ${info.color}`} />
                    <div className="flex-1">
                      <h5 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
                        {info.title}
                      </h5>
                      <p className="text-sm mt-1" style={{ color: 'var(--fg-secondary)' }}>
                        {info.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold" style={{ color: 'var(--fg-primary)' }}>
                      {weights[component].toFixed(2)}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                      {Math.round(weights[component] * 100)}%
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={weights[component]}
                    onChange={(e) => handleWeightChange(component, parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div className="flex items-start">
                  <Lightbulb className="h-4 w-4 text-brand-gold-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                    {info.explanation}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Weight Sum Validation */}
      {!isValidWeights && (
        <motion.div 
          className="p-4 rounded-lg border border-yellow-500 bg-yellow-500/10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <Info className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-medium">
              Weight sum is {weightSum.toFixed(3)} (should equal 1.0 for optimal scoring)
            </span>
          </div>
        </motion.div>
      )}

      {/* Results Ranking */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center mb-6">
          <TrendingUp className="h-5 w-5 text-brand-gold-400 mr-2" />
          <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
            Live Ranking Results
          </h4>
          <div className="ml-auto flex items-center text-sm" style={{ color: 'var(--fg-muted)' }}>
            <Search className="h-4 w-4 mr-1" />
            Query: "machine learning algorithms"
          </div>
        </div>

        <div className="space-y-4">
          {rankedFiles.map((file, index) => (
            <motion.div
              key={file.id}
              className="p-5 rounded-lg border"
              style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
              layout
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center flex-1">
                  <div className="w-8 h-8 rounded-full bg-brand-gold-500 text-black text-sm font-bold flex items-center justify-center mr-4">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-lg" style={{ color: 'var(--fg-primary)' }}>
                      {file.name}
                    </h5>
                    <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                      {file.path}
                    </p>
                    <p className="text-sm mt-1" style={{ color: 'var(--fg-secondary)' }}>
                      {file.description}
                    </p>
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-brand-gold-400">
                    {Math.round(file.finalScore * 100)}%
                  </div>
                  <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                    Final Score
                  </div>
                </div>
              </div>

              {/* Score Components Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {Object.entries(file.components).map(([component, value]) => {
                  const contribution = weights[component as keyof ScoringWeights] * value
                  const componentInfo = componentDescriptions[component as keyof typeof componentDescriptions]
                  
                  return (
                    <div key={component} className="p-3 rounded bg-gray-800 text-center">
                      <div className={`text-sm font-medium ${componentInfo.color}`}>
                        {(contribution * 100).toFixed(1)}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                        {component.replace('_', ' ')}
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>
                        {value.toFixed(2)} × {weights[component as keyof ScoringWeights].toFixed(2)}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Best Chunk Preview */}
              <div className="p-3 rounded bg-gray-800 border-l-4 border-brand-gold-500">
                <div className="text-xs mb-2" style={{ color: 'var(--fg-muted)' }}>
                  Best Matching Chunk:
                </div>
                <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                  {file.bestChunk}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center mb-4">
          <Lightbulb className="h-5 w-5 text-brand-gold-400 mr-2" />
          <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
            Scoring Insights
          </h4>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-3" style={{ color: 'var(--fg-primary)' }}>
              Current Configuration Impact:
            </h5>
            <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
              <div>• <strong>s_max ({Math.round(weights.s_max * 100)}%)</strong>: 
                {weights.s_max > 0.4 ? ' Prioritizes files with highly relevant chunks' : ' De-emphasizes single chunk relevance'}
              </div>
              <div>• <strong>s_topk_mean ({Math.round(weights.s_topk_mean * 100)}%)</strong>: 
                {weights.s_topk_mean > 0.3 ? ' Values consistent relevance across chunks' : ' Less weight on overall consistency'}
              </div>
              <div>• <strong>s_centroid ({Math.round(weights.s_centroid * 100)}%)</strong>: 
                {weights.s_centroid > 0.3 ? ' Emphasizes thematic alignment' : ' Focuses less on general topic match'}
              </div>
              <div>• <strong>s_bm25 ({Math.round(weights.s_bm25 * 100)}%)</strong>: 
                {weights.s_bm25 > 0.15 ? ' Considers exact keyword matches' : ' Relies primarily on semantic similarity'}
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium mb-3" style={{ color: 'var(--fg-primary)' }}>
              Recommended Use Cases:
            </h5>
            <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
              {weights.s_max > 0.5 && <div>• Perfect for finding files with specific, highly relevant content</div>}
              {weights.s_topk_mean > 0.3 && <div>• Good for comprehensive documents with consistent themes</div>}
              {weights.s_centroid > 0.35 && <div>• Ideal for thematic and conceptual searches</div>}
              {weights.s_bm25 > 0.15 && <div>• Balanced approach including exact term matching</div>}
              {Object.values(weights).every(w => w >= 0.2 && w <= 0.3) && <div>• Well-balanced configuration for general use</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoringCalculator