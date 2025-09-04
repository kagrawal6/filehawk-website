import React, { useState, useEffect, useRef } from 'react'
import { 
  Search, 
  Play,
  RotateCcw,
  Database,
  Filter,
  TrendingUp,
  Info,
  Settings,
  BarChart3,
  Zap
} from 'lucide-react'

interface MockFile {
  id: string
  name: string
  path: string
  centroid: number[]
  chunks: Array<{
    id: string
    text: string
    embedding: number[]
    similarity?: number
  }>
  centroidSimilarity?: number
  holisticScore?: {
    s_max: number
    s_topk_mean: number
    s_centroid: number
    s_bm25: number
    final: number
  }
}

interface ScoringWeights {
  s_max: number
  s_topk_mean: number
  s_centroid: number
  s_bm25: number
}

interface GistSearchDemoProps {
  className?: string
}

const GistSearchDemo: React.FC<GistSearchDemoProps> = ({ className = '' }) => {
  const [query] = useState('machine learning algorithms neural networks')
  const [isSearching, setIsSearching] = useState(false)
  const [searchStage, setSearchStage] = useState(0)
  const [queryEmbedding, setQueryEmbedding] = useState<number[]>([])
  const [candidateFiles, setCandidateFiles] = useState<MockFile[]>([])
  const [finalResults, setFinalResults] = useState<MockFile[]>([])
  const [scoringWeights, setScoringWeights] = useState<ScoringWeights>({
    s_max: 0.45,
    s_topk_mean: 0.25,
    s_centroid: 0.20,
    s_bm25: 0.10
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock file database with realistic scoring for "machine learning algorithms neural networks"
  const mockDatabase: MockFile[] = [
    {
      id: 'file1',
      name: 'machine_learning_guide.md',
      path: '/docs/ai/machine_learning_guide.md',
      centroid: [0.95, 0.88, 0.92, 0.85, 0.78], // Very high ML similarity
      chunks: [
        { id: 'chunk1-1', text: 'Machine learning algorithms are powerful tools for pattern recognition and data analysis.', embedding: [0.98, 0.85, 0.89, 0.82, 0.75] },
        { id: 'chunk1-2', text: 'Neural networks represent a subset of machine learning that mimics brain structure.', embedding: [0.94, 0.91, 0.96, 0.88, 0.81] },
        { id: 'chunk1-3', text: 'Decision trees and random forests are interpretable ML algorithms.', embedding: [0.87, 0.79, 0.84, 0.76, 0.69] }
      ]
    },
    {
      id: 'file2',
      name: 'neural_networks.py',
      path: '/src/ai/neural_networks.py',
      centroid: [0.91, 0.94, 0.87, 0.89, 0.83], // High neural network similarity
      chunks: [
        { id: 'chunk2-1', text: 'def create_neural_network(layers, activation="relu"):', embedding: [0.89, 0.96, 0.84, 0.87, 0.80] },
        { id: 'chunk2-2', text: 'Neural network training involves backpropagation and gradient descent.', embedding: [0.93, 0.92, 0.90, 0.91, 0.86] }
      ]
    },
    {
      id: 'file3',
      name: 'deep_learning_models.py',
      path: '/src/ai/deep_learning_models.py',
      centroid: [0.88, 0.90, 0.85, 0.86, 0.79], // High deep learning similarity
      chunks: [
        { id: 'chunk3-1', text: 'Convolutional neural networks excel at image recognition tasks.', embedding: [0.86, 0.88, 0.83, 0.84, 0.77] },
        { id: 'chunk3-2', text: 'Recurrent neural networks process sequential data like text and time series.', embedding: [0.90, 0.92, 0.87, 0.88, 0.81] }
      ]
    },
    {
      id: 'file4',
      name: 'algorithms_overview.md',
      path: '/docs/technical/algorithms_overview.md',
      centroid: [0.65, 0.45, 0.58, 0.52, 0.41], // Moderate algorithm similarity
      chunks: [
        { id: 'chunk4-1', text: 'Sorting algorithms like quicksort and mergesort are fundamental CS concepts.', embedding: [0.62, 0.42, 0.55, 0.49, 0.38] },
        { id: 'chunk4-2', text: 'Graph algorithms including Dijkstra and A* are used in pathfinding.', embedding: [0.68, 0.48, 0.61, 0.55, 0.44] }
      ]
    },
    {
      id: 'file5',
      name: 'project_management.md',
      path: '/docs/business/project_management.md',
      centroid: [0.25, 0.18, 0.22, 0.19, 0.15], // Very low ML similarity
      chunks: [
        { id: 'chunk5-1', text: 'Agile methodology emphasizes iterative development and team collaboration.', embedding: [0.23, 0.16, 0.20, 0.17, 0.13] },
        { id: 'chunk5-2', text: 'Project management involves planning, executing, and monitoring tasks.', embedding: [0.27, 0.20, 0.24, 0.21, 0.17] }
      ]
    },
    {
      id: 'file6',
      name: 'database_design.sql',
      path: '/src/db/database_design.sql',
      centroid: [0.15, 0.12, 0.18, 0.14, 0.10], // Very low ML similarity
      chunks: [
        { id: 'chunk6-1', text: 'CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));', embedding: [0.12, 0.09, 0.15, 0.11, 0.07] },
        { id: 'chunk6-2', text: 'Database normalization reduces data redundancy and improves integrity.', embedding: [0.18, 0.15, 0.21, 0.17, 0.13] }
      ]
    }
  ]


  // Calculate cosine similarity
  const cosineSimilarity = (a: number[], b: number[]): number => {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
    return dotProduct / (magnitudeA * magnitudeB)
  }

  // Generate query embedding
  const generateQueryEmbedding = (query: string): number[] => {
    const embedding = [0.5, 0.5, 0.5, 0.5, 0.5]
    const words = query.toLowerCase().split(' ')
    
    if (words.some(w => ['machine', 'learning', 'neural', 'algorithm'].includes(w))) {
      embedding[0] += 0.4
      embedding[2] += 0.3
    }
    if (words.some(w => ['project', 'management', 'agile'].includes(w))) {
      embedding[1] += 0.4
      embedding[4] += 0.4
    }
    if (words.some(w => ['database', 'sql', 'design'].includes(w))) {
      embedding[1] += 0.3
      embedding[4] += 0.3
    }
    if (words.some(w => ['sort', 'algorithm', 'quicksort'].includes(w))) {
      embedding[2] += 0.4
      embedding[3] += 0.4
    }
    
    return embedding
  }

  // Calculate BM25 score (simplified)
  const calculateBM25 = (queryTerms: string[], fileText: string): number => {
    const k1 = 1.2
    const b = 0.75
    const avgDocLength = 100
    const docLength = fileText.split(' ').length
    
    let score = 0
    queryTerms.forEach(term => {
      const tf = (fileText.toLowerCase().match(new RegExp(term, 'g')) || []).length
      if (tf > 0) {
        const idf = Math.log(mockDatabase.length / 1) // Simplified IDF
        score += idf * (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (docLength / avgDocLength)))
      }
    })
    
    return Math.min(1, score / 3) // Normalize to 0-1
  }

  // Perform two-stage Gist search
  const performSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setSearchStage(0)
    setCandidateFiles([])
    setFinalResults([])

    const queryEmb = generateQueryEmbedding(query)
    setQueryEmbedding(queryEmb)

    // Stage 1: Centroid filtering
    setSearchStage(1)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const candidatesWithSimilarity = mockDatabase.map(file => ({
      ...file,
      centroidSimilarity: cosineSimilarity(queryEmb, file.centroid)
    }))

    const topCandidates = candidatesWithSimilarity
      .sort((a, b) => b.centroidSimilarity - a.centroidSimilarity)
      .slice(0, 4) // Top 4 candidates for demo

    setCandidateFiles(topCandidates)
    await new Promise(resolve => setTimeout(resolve, 800))

    // Stage 2: Detailed scoring
    setSearchStage(2)
    await new Promise(resolve => setTimeout(resolve, 1200))

    const detailedResults = topCandidates.map(file => {
      // Calculate chunk similarities
      const chunkSimilarities = file.chunks.map(chunk => 
        cosineSimilarity(queryEmb, chunk.embedding)
      )

      // Holistic scoring components
      const s_max = Math.max(...chunkSimilarities)
      const topK = Math.min(3, Math.ceil(0.3 * chunkSimilarities.length))
      const s_topk_mean = chunkSimilarities
        .sort((a, b) => b - a)
        .slice(0, topK)
        .reduce((sum, val) => sum + val, 0) / topK
      const s_centroid = file.centroidSimilarity || 0
      const s_bm25 = calculateBM25(query.split(' '), file.chunks.map(c => c.text).join(' '))

      const finalScore = 
        scoringWeights.s_max * s_max +
        scoringWeights.s_topk_mean * s_topk_mean +
        scoringWeights.s_centroid * s_centroid +
        scoringWeights.s_bm25 * s_bm25

      return {
        ...file,
        chunks: file.chunks.map((chunk, i) => ({ ...chunk, similarity: chunkSimilarities[i] })),
        holisticScore: {
          s_max: Math.round(s_max * 100) / 100,
          s_topk_mean: Math.round(s_topk_mean * 100) / 100,
          s_centroid: Math.round(s_centroid * 100) / 100,
          s_bm25: Math.round(s_bm25 * 100) / 100,
          final: Math.round(finalScore * 100) / 100
        }
      }
    })

    setFinalResults(detailedResults.sort((a, b) => (b.holisticScore?.final || 0) - (a.holisticScore?.final || 0)))
    setSearchStage(3)
    setIsSearching(false)
  }

  // Reset search
  const resetSearch = () => {
    setIsSearching(false)
    setSearchStage(0)
    setQueryEmbedding([])
    setCandidateFiles([])
    setFinalResults([])
  }

  // Handle weight changes
  const updateWeight = (component: keyof ScoringWeights, value: number) => {
    setScoringWeights(prev => ({ ...prev, [component]: value }))
  }

  // Draw vector space visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw file centroids
    mockDatabase.forEach((file, index) => {
      const x = 50 + (index % 3) * 80
      const y = 50 + Math.floor(index / 3) * 60
      
      // Centroid dot
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, 2 * Math.PI)
      ctx.fillStyle = candidateFiles.some(c => c.id === file.id) ? '#10b981' : '#6b7280'
      ctx.fill()
      
      // File label
      ctx.fillStyle = '#ffffff'
      ctx.font = '10px Inter'
      ctx.textAlign = 'center'
      ctx.fillText(file.name.split('.')[0], x, y + 25)
    })

    // Draw query vector
    if (queryEmbedding.length > 0) {
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height - 40, 12, 0, 2 * Math.PI)
      ctx.fillStyle = '#d4a574'
      ctx.fill()
      
      ctx.fillStyle = '#d4a574'
      ctx.font = 'bold 12px Inter'
      ctx.textAlign = 'center'
      ctx.fillText('Query', canvas.width / 2, canvas.height - 15)
    }
  }, [candidateFiles, queryEmbedding])

  const searchStages = [
    'Ready to search',
    'Stage 1: Centroid filtering',
    'Stage 2: Detailed scoring', 
    'Search complete'
  ]

  const weightSum = Object.values(scoringWeights).reduce((sum, val) => sum + val, 0)

  return (
    <div className={`grid lg:grid-cols-3 gap-8 ${className}`}>
      {/* Left Panel - Algorithm Info */}
      <div className="lg:col-span-1 space-y-6">
        {/* Algorithm Card */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-xl bg-green-500/20 text-green-400 mr-4">
              <Search className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Gist Search Algorithm</h3>
              <p className="text-sm text-gray-400">O(log n + k) Complexity</p>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-4">
            Two-stage retrieval system with centroid filtering and holistic scoring 
            for comprehensive semantic relevance ranking.
          </p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Stage 1:</span>
              <span className="text-gray-300">Centroid similarity</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Candidates:</span>
              <span className="text-gray-300">200 files max</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Stage 2:</span>
              <span className="text-gray-300">Holistic scoring</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Components:</span>
              <span className="text-gray-300">4 weighted factors</span>
            </div>
          </div>
        </div>

        {/* Scoring Weights */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-4">
            <Settings className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="font-semibold text-white">Scoring Weights</h4>
          </div>
          
          <div className="space-y-4">
            {Object.entries(scoringWeights).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-2">
                  <label className="text-gray-400">
                    {key.replace('_', ' ')}:
                  </label>
                  <span className="text-white">{value.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={value}
                  onChange={(e) => updateWeight(key as keyof ScoringWeights, Number(e.target.value))}
                  disabled={isSearching}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            ))}
            
            <div className="pt-2 border-t border-gray-600">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total:</span>
                <span className={`font-medium ${Math.abs(weightSum - 1) < 0.001 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {weightSum.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Status */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-4">
            <BarChart3 className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="font-semibold text-white">Search Progress</h4>
          </div>
          
          <div className="text-sm text-gray-300 mb-3">
            {searchStages[searchStage]}
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(searchStage / (searchStages.length - 1)) * 100}%` }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Candidates:</span>
              <span className="text-white ml-2">{candidateFiles.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Results:</span>
              <span className="text-white ml-2">{finalResults.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Visualization */}
      <div className="lg:col-span-2 space-y-6">
        {/* Search Demo Controls */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Search className="h-5 w-5 text-amber-400 mr-2" />
              <h4 className="font-semibold text-white">Demo Query</h4>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={performSearch}
                disabled={isSearching}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg flex items-center transition-colors"
              >
                {isSearching ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-pulse" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Demo
                  </>
                )}
              </button>
              
              <button
                onClick={resetSearch}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </button>
            </div>
          </div>

          <div className="p-3 rounded-lg border bg-gray-800" style={{ borderColor: '#404040' }}>
            <div className="text-sm text-gray-400 mb-1">Search Query:</div>
            <div className="font-mono text-amber-400 text-lg">"{query}"</div>
          </div>
        </div>

        {/* Vector Space Visualization */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-4">
            <Database className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="font-semibold text-white">Vector Space (Stage 1: Centroid Filtering)</h4>
            <div className="ml-auto flex items-center text-sm text-gray-400">
              <Info className="h-4 w-4 mr-1" />
              Green dots = selected candidates
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="w-full h-48 rounded border"
            style={{ backgroundColor: '#1a1a1a', borderColor: '#404040' }}
          />
        </div>

        {/* Stage 1: Candidate Files */}
        {searchStage >= 1 && candidateFiles.length > 0 && (
          <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-amber-400 mr-2" />
              <h4 className="font-semibold text-white">Stage 1: Candidate Files</h4>
            </div>

            <div className="space-y-3">
              {candidateFiles.map((file) => (
                <div
                  key={file.id}
                  className="p-4 rounded-lg border flex items-center justify-between"
                  style={{ backgroundColor: '#1a1a1a', borderColor: '#404040' }}
                >
                  <div>
                    <div className="font-medium text-white">{file.name}</div>
                    <div className="text-sm text-gray-400">{file.path}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">
                      {Math.round((file.centroidSimilarity || 0) * 100)}%
                    </div>
                    <div className="text-xs text-gray-400">Centroid Match</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stage 2: Final Results */}
        {searchStage >= 2 && finalResults.length > 0 && (
          <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
            <div className="flex items-center mb-6">
              <TrendingUp className="h-5 w-5 text-amber-400 mr-2" />
              <h4 className="font-semibold text-white">Stage 2: Ranked Results</h4>
            </div>

            <div className="space-y-4">
              {finalResults.map((file, index) => (
                <div
                  key={file.id}
                  className="p-6 rounded-lg border"
                  style={{ backgroundColor: '#1a1a1a', borderColor: '#404040' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-black text-sm font-bold flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-lg text-white">{file.name}</div>
                        <div className="text-sm text-gray-400">{file.path}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-400">
                        {Math.round((file.holisticScore?.final || 0) * 100)}%
                      </div>
                      <div className="text-xs text-gray-400">Final Score</div>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  {file.holisticScore && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {Object.entries(file.holisticScore)
                        .filter(([key]) => key !== 'final')
                        .map(([component, value]) => (
                          <div key={component} className="p-3 rounded text-center" style={{ backgroundColor: '#2a2a2a' }}>
                            <div className="text-sm font-medium text-white">
                              {(value * scoringWeights[component as keyof ScoringWeights] * 100).toFixed(1)}%
                            </div>
                            <div className="text-xs text-gray-400">{component.replace('_', ' ')}</div>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Best Chunks */}
                  <div>
                    <h5 className="text-sm font-medium text-white mb-3">Best Matching Chunks:</h5>
                    <div className="space-y-2">
                      {file.chunks
                        .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
                        .slice(0, 2)
                        .map(chunk => (
                          <div key={chunk.id} className="p-3 rounded border-l-4 border-amber-500" style={{ backgroundColor: '#2a2a2a' }}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-400">Chunk {chunk.id.split('-')[1]}</span>
                              <span className="text-sm font-medium text-amber-400">
                                {Math.round((chunk.similarity || 0) * 100)}% match
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">{chunk.text}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GistSearchDemo