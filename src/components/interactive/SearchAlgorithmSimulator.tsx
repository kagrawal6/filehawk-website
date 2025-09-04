import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Play, 
  RotateCcw, 
  Brain,
  Target,
  Clock,
  TrendingUp,
  Filter,
  Zap,
  Info
} from 'lucide-react'

interface MockFile {
  id: string
  name: string
  path: string
  centroid: number[]
  centroidSimilarity?: number
  chunks: Array<{
    id: string
    text: string
    embedding: number[]
    similarity?: number
    lineStart: number
    lineEnd: number
  }>
  gistScore?: {
    s_max: number
    s_topk_mean: number
    s_centroid: number
    s_bm25: number
    final: number
  }
  pinpointScore?: number
}

interface SearchAlgorithmSimulatorProps {
  mode?: 'gist' | 'pinpoint' | 'comparison'
  className?: string
}

const SearchAlgorithmSimulator: React.FC<SearchAlgorithmSimulatorProps> = ({ 
  mode = 'comparison', 
  className = '' 
}) => {
  const [selectedMode, setSelectedMode] = useState<'gist' | 'pinpoint'>('gist')
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchStep, setSearchStep] = useState<number>(-1)
  const [candidates, setCandidates] = useState<MockFile[]>([])
  const [finalResults, setFinalResults] = useState<MockFile[]>([])
  const [showComparison] = useState(mode === 'comparison')

  // Mock file database
  const mockFiles: MockFile[] = useMemo(() => [
    {
      id: 'file1',
      name: 'machine_learning_guide.md',
      path: '/docs/ai/machine_learning_guide.md',
      centroid: [0.8, 0.2, 0.9, 0.7, 0.5],
      chunks: [
        {
          id: 'chunk1-1',
          text: 'Machine learning algorithms are powerful tools for pattern recognition and data analysis.',
          embedding: [0.9, 0.1, 0.8, 0.6, 0.4],
          lineStart: 1,
          lineEnd: 3
        },
        {
          id: 'chunk1-2',
          text: 'Neural networks represent a subset of machine learning that mimics brain structure.',
          embedding: [0.7, 0.3, 0.9, 0.8, 0.2],
          lineStart: 4,
          lineEnd: 6
        },
        {
          id: 'chunk1-3',
          text: 'Decision trees and random forests are interpretable ML algorithms.',
          embedding: [0.6, 0.4, 0.7, 0.9, 0.3],
          lineStart: 7,
          lineEnd: 9
        }
      ]
    },
    {
      id: 'file2',
      name: 'project_management.md',
      path: '/docs/business/project_management.md',
      centroid: [0.2, 0.8, 0.3, 0.4, 0.9],
      chunks: [
        {
          id: 'chunk2-1',
          text: 'Agile methodology emphasizes iterative development and team collaboration.',
          embedding: [0.1, 0.9, 0.2, 0.3, 0.8],
          lineStart: 1,
          lineEnd: 3
        },
        {
          id: 'chunk2-2',
          text: 'Project management involves planning, executing, and monitoring tasks.',
          embedding: [0.3, 0.7, 0.4, 0.5, 0.9],
          lineStart: 4,
          lineEnd: 6
        }
      ]
    },
    {
      id: 'file3',
      name: 'neural_networks.py',
      path: '/src/ai/neural_networks.py',
      centroid: [0.9, 0.1, 0.8, 0.9, 0.3],
      chunks: [
        {
          id: 'chunk3-1',
          text: 'def create_neural_network(layers, activation="relu"):',
          embedding: [0.8, 0.2, 0.9, 0.7, 0.1],
          lineStart: 15,
          lineEnd: 15
        },
        {
          id: 'chunk3-2',
          text: 'Neural network training involves backpropagation and gradient descent.',
          embedding: [0.9, 0.1, 0.8, 0.9, 0.2],
          lineStart: 25,
          lineEnd: 27
        }
      ]
    },
    {
      id: 'file4',
      name: 'algorithms_overview.md',
      path: '/docs/technical/algorithms_overview.md',
      centroid: [0.7, 0.4, 0.8, 0.8, 0.4],
      chunks: [
        {
          id: 'chunk4-1',
          text: 'Sorting algorithms like quicksort and mergesort are fundamental CS concepts.',
          embedding: [0.5, 0.6, 0.7, 0.8, 0.3],
          lineStart: 10,
          lineEnd: 12
        },
        {
          id: 'chunk4-2',
          text: 'Graph algorithms including Dijkstra and A* are used in pathfinding.',
          embedding: [0.4, 0.5, 0.6, 0.9, 0.4],
          lineStart: 20,
          lineEnd: 22
        }
      ]
    }
  ], [])

  // Sample queries
  const sampleQueries = [
    'machine learning algorithms',
    'neural networks',
    'project management',
    'create_neural_network',
    'sorting algorithms'
  ]

  // Calculate cosine similarity
  const cosineSimilarity = (a: number[], b: number[]): number => {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
    return dotProduct / (magnitudeA * magnitudeB)
  }

  // Generate query embedding (mock)
  const generateQueryEmbedding = (query: string): number[] => {
    // Simple mock embedding based on query characteristics
    const words = query.toLowerCase().split(' ')
    const embedding = [0.5, 0.5, 0.5, 0.5, 0.5]
    
    if (words.some(w => ['machine', 'learning', 'neural', 'algorithm'].includes(w))) {
      embedding[0] += 0.4
      embedding[2] += 0.3
    }
    if (words.some(w => ['project', 'management', 'agile'].includes(w))) {
      embedding[1] += 0.4
      embedding[4] += 0.4
    }
    if (words.some(w => ['network', 'neural', 'deep'].includes(w))) {
      embedding[0] += 0.3
      embedding[3] += 0.4
    }
    
    return embedding
  }

  // Gist search algorithm simulation
  const performGistSearch = (queryEmbedding: number[]) => {
    // Stage 1: Find candidate files using centroids
    const candidatesWithScores = mockFiles.map(file => ({
      ...file,
      centroidSimilarity: cosineSimilarity(queryEmbedding, file.centroid)
    }))
    
    const topCandidates = candidatesWithScores
      .sort((a, b) => b.centroidSimilarity - a.centroidSimilarity)
      .slice(0, 3) // Top 3 candidates instead of 200 for demo

    // Stage 2: Detailed scoring for each candidate
    const detailedResults = topCandidates.map(file => {
      // Calculate chunk similarities
      const chunkSims = file.chunks.map(chunk => ({
        ...chunk,
        similarity: cosineSimilarity(queryEmbedding, chunk.embedding)
      }))
      
      // Holistic scoring
      const similarities = chunkSims.map(c => c.similarity)
      const s_max = Math.max(...similarities)
      const topK = Math.min(3, Math.ceil(0.3 * similarities.length))
      const s_topk_mean = similarities
        .sort((a, b) => b - a)
        .slice(0, topK)
        .reduce((sum, val) => sum + val, 0) / topK
      const s_centroid = cosineSimilarity(queryEmbedding, file.centroid)
      const s_bm25 = 0.1 + Math.random() * 0.1 // Mock BM25 score
      
      const weights = { s_max: 0.45, s_topk_mean: 0.25, s_centroid: 0.20, s_bm25: 0.10 }
      const finalScore = weights.s_max * s_max + 
                        weights.s_topk_mean * s_topk_mean + 
                        weights.s_centroid * s_centroid + 
                        weights.s_bm25 * s_bm25

      return {
        ...file,
        chunks: chunkSims,
        gistScore: {
          s_max: Math.round(s_max * 100) / 100,
          s_topk_mean: Math.round(s_topk_mean * 100) / 100,
          s_centroid: Math.round(s_centroid * 100) / 100,
          s_bm25: Math.round(s_bm25 * 100) / 100,
          final: Math.round(finalScore * 100) / 100
        }
      }
    })

    return detailedResults.sort((a, b) => (b.gistScore?.final || 0) - (a.gistScore?.final || 0))
  }

  // Pinpoint search algorithm simulation
  const performPinpointSearch = (queryEmbedding: number[]) => {
    // Direct chunk similarity search
    const allChunksWithSimilarity = mockFiles.flatMap(file =>
      file.chunks.map(chunk => ({
        ...chunk,
        file: file,
        similarity: cosineSimilarity(queryEmbedding, chunk.embedding)
      }))
    )

    // Group by file and rank by best chunk
    const fileScores = new Map<string, { file: MockFile, bestSimilarity: number, bestChunk: any }>()
    
    allChunksWithSimilarity.forEach(chunk => {
      const existing = fileScores.get(chunk.file.id)
      if (!existing || chunk.similarity > existing.bestSimilarity) {
        fileScores.set(chunk.file.id, {
          file: chunk.file,
          bestSimilarity: chunk.similarity,
          bestChunk: chunk
        })
      }
    })

    return Array.from(fileScores.values())
      .sort((a, b) => b.bestSimilarity - a.bestSimilarity)
      .map(({ file, bestSimilarity }) => ({
        ...file,
        pinpointScore: Math.round(bestSimilarity * 100) / 100,
        chunks: file.chunks.map(chunk => ({
          ...chunk,
          similarity: cosineSimilarity(queryEmbedding, chunk.embedding)
        }))
      }))
  }

  // Search execution
  const executeSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setSearchStep(0)
    setCandidates([])
    setFinalResults([])

    const queryEmbedding = generateQueryEmbedding(query)

    // Simulate search steps with delays
    const steps = selectedMode === 'gist' ? 4 : 2

    for (let step = 0; step < steps; step++) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSearchStep(step)

      if (selectedMode === 'gist') {
        if (step === 1) {
          // Stage 1: Candidate selection
          const candidatesWithScores = mockFiles.map(file => ({
            ...file,
            centroidSimilarity: cosineSimilarity(queryEmbedding, file.centroid)
          }))
          setCandidates(candidatesWithScores.sort((a, b) => b.centroidSimilarity - a.centroidSimilarity))
        } else if (step === 3) {
          // Stage 2: Final results
          const results = performGistSearch(queryEmbedding)
          setFinalResults(results)
        }
      } else {
        if (step === 1) {
          // Direct search results
          const results = performPinpointSearch(queryEmbedding)
          setFinalResults(results)
        }
      }
    }

    setIsSearching(false)
  }

  const resetSearch = () => {
    setIsSearching(false)
    setSearchStep(-1)
    setCandidates([])
    setFinalResults([])
  }

  const getStepDescription = (step: number, mode: 'gist' | 'pinpoint') => {
    if (mode === 'gist') {
      const steps = [
        'Generating query embedding vector...',
        'Finding candidate files using centroids...',
        'Analyzing chunks in candidate files...',
        'Computing holistic scores and ranking...'
      ]
      return steps[step] || 'Search complete'
    } else {
      const steps = [
        'Generating query embedding vector...',
        'Direct chunk similarity search and ranking...'
      ]
      return steps[step] || 'Search complete'
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
            Search Algorithm Simulator
          </h3>
          <p style={{ color: 'var(--fg-secondary)' }}>
            See how FileHawk's search algorithms find and rank documents
          </p>
        </div>
        
        {showComparison && (
          <div className="flex rounded-lg border" style={{ borderColor: 'var(--border-subtle)' }}>
            <button
              onClick={() => setSelectedMode('gist')}
              className={`px-4 py-2 rounded-l-lg transition-all ${
                selectedMode === 'gist' 
                  ? 'bg-blue-500/20 text-blue-400 border-r border-blue-500' 
                  : 'hover:bg-gray-700/50'
              }`}
              style={{ color: selectedMode === 'gist' ? '' : 'var(--fg-secondary)' }}
            >
              <Brain className="h-4 w-4 mr-2 inline" />
              Gist Search
            </button>
            <button
              onClick={() => setSelectedMode('pinpoint')}
              className={`px-4 py-2 rounded-r-lg transition-all ${
                selectedMode === 'pinpoint' 
                  ? 'bg-red-500/20 text-red-400 border-l border-red-500' 
                  : 'hover:bg-gray-700/50'
              }`}
              style={{ color: selectedMode === 'pinpoint' ? '' : 'var(--fg-secondary)' }}
            >
              <Target className="h-4 w-4 mr-2 inline" />
              Pinpoint Search
            </button>
          </div>
        )}
      </div>

      {/* Search Interface */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center mb-4">
          <Search className="h-5 w-5 text-brand-gold-400 mr-2" />
          <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
            Search Query
          </h4>
        </div>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your search query..."
            className="flex-1 p-3 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--bg-muted)', 
              borderColor: 'var(--border-subtle)',
              color: 'var(--fg-primary)'
            }}
            onKeyPress={(e) => e.key === 'Enter' && executeSearch()}
            disabled={isSearching}
          />
          
          <button
            onClick={executeSearch}
            disabled={isSearching || !query.trim()}
            className="px-6 py-3 bg-brand-gold-500/20 text-brand-gold-400 rounded-lg hover:bg-brand-gold-500/30 transition-colors disabled:opacity-50 flex items-center"
          >
            {isSearching ? <Clock className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
            {isSearching ? 'Searching...' : 'Search'}
          </button>
          
          <button
            onClick={resetSearch}
            className="px-4 py-3 border rounded-lg hover:bg-gray-700/50 transition-colors"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--fg-secondary)' }}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Sample Queries */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>Try:</span>
          {sampleQueries.map(sampleQuery => (
            <button
              key={sampleQuery}
              onClick={() => setQuery(sampleQuery)}
              disabled={isSearching}
              className="px-3 py-1 text-sm border rounded-full hover:bg-gray-700/50 transition-colors disabled:opacity-50"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--fg-secondary)' }}
            >
              {sampleQuery}
            </button>
          ))}
        </div>
      </div>

      {/* Search Progress */}
      {searchStep >= 0 && (
        <motion.div 
          className="p-6 rounded-xl border"
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-4">
            <Zap className="h-5 w-5 text-brand-gold-400 mr-2" />
            <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
              {selectedMode === 'gist' ? 'Gist Search' : 'Pinpoint Search'} Progress
            </h4>
          </div>

          <div className="space-y-4">
            {/* Progress Steps */}
            <div className="flex items-center space-x-4">
              {Array.from({ length: selectedMode === 'gist' ? 4 : 2 }).map((_, index) => (
                <React.Fragment key={index}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index <= searchStep 
                      ? 'bg-brand-gold-500 text-black' 
                      : index === searchStep + 1 && isSearching
                      ? 'bg-brand-gold-500/50 text-brand-gold-400 animate-pulse'
                      : 'bg-gray-600 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  {index < (selectedMode === 'gist' ? 3 : 1) && (
                    <div className={`flex-1 h-0.5 ${
                      index < searchStep ? 'bg-brand-gold-500' : 'bg-gray-600'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Current Step Description */}
            <div className="text-center">
              <p className="font-medium mb-2" style={{ color: 'var(--fg-primary)' }}>
                {getStepDescription(searchStep, selectedMode)}
              </p>
              {isSearching && (
                <div className="inline-flex items-center text-sm" style={{ color: 'var(--fg-muted)' }}>
                  <Clock className="h-4 w-4 mr-1 animate-spin" />
                  Processing...
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Gist Mode Candidates (Stage 1) */}
      {selectedMode === 'gist' && searchStep >= 1 && candidates.length > 0 && (
        <motion.div 
          className="p-6 rounded-xl border"
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-blue-400 mr-2" />
            <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
              Stage 1: Candidate Files (Top {candidates.length})
            </h4>
          </div>

          <div className="space-y-3">
            {candidates.map((file, index) => (
              <motion.div
                key={file.id}
                className="p-4 rounded-lg border flex items-center justify-between"
                style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div>
                  <div className="font-medium" style={{ color: 'var(--fg-primary)' }}>
                    {file.name}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                    {file.path}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-400">
                    {Math.round((file.centroidSimilarity || 0) * 100)}%
                  </div>
                  <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                    Centroid Similarity
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Final Results */}
      {finalResults.length > 0 && (
        <motion.div 
          className="p-6 rounded-xl border"
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-6">
            <TrendingUp className="h-5 w-5 text-brand-gold-400 mr-2" />
            <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
              {selectedMode === 'gist' ? 'Stage 2: Final Rankings' : 'Search Results'}
            </h4>
          </div>

          <div className="space-y-4">
            {finalResults.map((file, index) => (
              <motion.div
                key={file.id}
                className="p-6 rounded-lg border"
                style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-brand-gold-500 text-black text-sm font-bold flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-lg" style={{ color: 'var(--fg-primary)' }}>
                        {file.name}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                        {file.path}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-brand-gold-400">
                      {selectedMode === 'gist' 
                        ? Math.round((file.gistScore?.final || 0) * 100)
                        : Math.round((file.pinpointScore || 0) * 100)
                      }%
                    </div>
                    <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                      Final Score
                    </div>
                  </div>
                </div>

                {/* Gist Mode Score Breakdown */}
                {selectedMode === 'gist' && file.gistScore && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium mb-3" style={{ color: 'var(--fg-primary)' }}>
                      Score Components:
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(file.gistScore).filter(([key]) => key !== 'final').map(([key, value]) => (
                        <div key={key} className="p-2 rounded bg-gray-800 text-center">
                          <div className="text-sm font-medium" style={{ color: 'var(--fg-primary)' }}>
                            {value.toFixed(2)}
                          </div>
                          <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                            {key.replace('_', ' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Best Chunks */}
                <div>
                  <h5 className="text-sm font-medium mb-3" style={{ color: 'var(--fg-primary)' }}>
                    Best Matching Chunks:
                  </h5>
                  <div className="space-y-2">
                    {file.chunks
                      .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
                      .slice(0, 2)
                      .map(chunk => (
                        <div key={chunk.id} className="p-3 rounded bg-gray-800 border-l-4 border-brand-gold-500">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                              Lines {chunk.lineStart}-{chunk.lineEnd}
                            </span>
                            <span className="text-sm font-medium text-brand-gold-400">
                              {Math.round((chunk.similarity || 0) * 100)}% match
                            </span>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                            {chunk.text}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Algorithm Comparison */}
      {!isSearching && finalResults.length === 0 && searchStep === -1 && (
        <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-4">
            <Info className="h-5 w-5 text-brand-gold-400 mr-2" />
            <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
              Algorithm Overview
            </h4>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Brain className="h-6 w-6 text-blue-400 mr-3" />
                <h5 className="text-lg font-semibold" style={{ color: 'var(--fg-primary)' }}>
                  Gist Search
                </h5>
              </div>
              <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                <div>• Two-stage retrieval system</div>
                <div>• File centroid pre-filtering (200 candidates)</div>
                <div>• Holistic scoring with 4 components</div>
                <div>• Best for thematic and conceptual searches</div>
                <div>• Optimized for context preservation</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Target className="h-6 w-6 text-red-400 mr-3" />
                <h5 className="text-lg font-semibold" style={{ color: 'var(--fg-primary)' }}>
                  Pinpoint Search
                </h5>
              </div>
              <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                <div>• Direct chunk similarity matching</div>
                <div>• Single-stage retrieval process</div>
                <div>• Best chunk per file ranking</div>
                <div>• Ideal for exact phrase matching</div>
                <div>• Optimized for precision and speed</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchAlgorithmSimulator