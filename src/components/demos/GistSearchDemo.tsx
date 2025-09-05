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
      name: 'algorithms_overview.md',
      path: '/docs/technical/algorithms_overview.md',
      centroid: [0.45, 0.32, 0.48, 0.41, 0.29], // Moderate algorithm similarity - mostly non-ML algorithms
      chunks: [
        { id: 'chunk3-1', text: 'Sorting algorithms like quicksort and mergesort are fundamental CS concepts.', embedding: [0.42, 0.29, 0.45, 0.38, 0.26] },
        { id: 'chunk3-2', text: 'Graph algorithms including Dijkstra and A* are used in pathfinding.', embedding: [0.48, 0.35, 0.51, 0.44, 0.32] }
      ]
    },
    {
      id: 'file4',
      name: 'recipe_collection.md',
      path: '/docs/personal/recipe_collection.md',
      centroid: [0.08, 0.12, 0.06, 0.09, 0.11], // Very low similarity - cooking content
      chunks: [
        { id: 'chunk4-1', text: 'Chocolate chip cookies require butter, flour, sugar, and vanilla extract.', embedding: [0.06, 0.10, 0.04, 0.07, 0.09] },
        { id: 'chunk4-2', text: 'Bake at 350°F for 12 minutes until golden brown around the edges.', embedding: [0.10, 0.14, 0.08, 0.11, 0.13] }
      ]
    },
    {
      id: 'file5',
      name: 'meeting_notes.txt',
      path: '/docs/business/meeting_notes.txt',
      centroid: [0.15, 0.18, 0.12, 0.16, 0.14], // Low similarity - business content
      chunks: [
        { id: 'chunk5-1', text: 'Quarterly sales meeting scheduled for next Tuesday at 2 PM in conference room B.', embedding: [0.13, 0.16, 0.10, 0.14, 0.12] },
        { id: 'chunk5-2', text: 'Action items: Update budget spreadsheet, review client contracts, prepare presentation.', embedding: [0.17, 0.20, 0.14, 0.18, 0.16] }
      ]
    },
    {
      id: 'file6',
      name: 'vacation_photos.json',
      path: '/media/vacation_photos.json',
      centroid: [0.03, 0.05, 0.02, 0.04, 0.06], // Very low similarity - photo metadata
      chunks: [
        { id: 'chunk6-1', text: '{"filename": "beach_sunset.jpg", "location": "Malibu", "date": "2023-07-15"}', embedding: [0.01, 0.03, 0.00, 0.02, 0.04] },
        { id: 'chunk6-2', text: '{"filename": "mountain_hike.jpg", "camera": "Canon EOS R5", "iso": 200}', embedding: [0.05, 0.07, 0.04, 0.06, 0.08] }
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
    const embedding = [0.3, 0.3, 0.3, 0.3, 0.3]  // Start with lower baseline
    const words = query.toLowerCase().split(' ')
    
    // Strong boost for ML/AI terms
    if (words.some(w => ['machine', 'learning', 'neural', 'network'].includes(w))) {
      embedding[0] += 0.6  // High ML similarity
      embedding[2] += 0.5
    }
    
    // Moderate boost for general algorithms
    if (words.some(w => ['algorithm', 'algorithms'].includes(w))) {
      embedding[1] += 0.2  // Some algorithmic similarity
      embedding[3] += 0.3
    }
    
    // No boost for non-tech terms (these files should score very low)
    // This ensures recipe, meeting notes, and vacation photos get low scores
    
    return embedding
  }

  // Calculate BM25 score (simplified but more realistic)
  const calculateBM25 = (queryTerms: string[], fileText: string): number => {
    const k1 = 1.2
    const b = 0.75
    const avgDocLength = 80
    const docLength = fileText.split(' ').length
    
    let score = 0
    queryTerms.forEach(term => {
      // More nuanced term matching
      const regex = new RegExp(`\\b${term.toLowerCase()}\\b`, 'gi')
      const matches = fileText.toLowerCase().match(regex)
      const tf = matches ? matches.length : 0
      
      if (tf > 0) {
        // Calculate how many documents contain this term for IDF
        const docsWithTerm = mockDatabase.filter(file => 
          file.chunks.some(chunk => 
            chunk.text.toLowerCase().includes(term.toLowerCase())
          )
        ).length
        
        const idf = Math.log((mockDatabase.length + 1) / (docsWithTerm + 1))
        score += idf * (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (docLength / avgDocLength)))
      }
    })
    
    // More realistic normalization based on query length
    return Math.min(1, score / (queryTerms.length * 1.5))
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

    // Filter candidates with similarity > 0.3 threshold, then take top 4
    const filteredCandidates = candidatesWithSimilarity
      .filter(file => file.centroidSimilarity > 0.3) // Only keep reasonably similar files
      .sort((a, b) => b.centroidSimilarity - a.centroidSimilarity)
    
    // Take top candidates (max 4) or all if fewer than 4 pass the threshold
    const topCandidates = filteredCandidates.slice(0, Math.min(4, filteredCandidates.length))

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

    // Draw file centroids with better spacing
    mockDatabase.forEach((file, index) => {
      // Use 3x2 grid with more spacing - 3 files per row, 2 rows
      const x = 120 + (index % 3) * 200  // More horizontal spacing
      const y = 80 + Math.floor(index / 3) * 120   // More vertical spacing
      
      const isCandidate = candidateFiles.some(c => c.id === file.id)
      
      // Draw dotted line from query to candidate files
      if (queryEmbedding.length > 0 && isCandidate) {
        ctx.strokeStyle = '#d4a574'
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height - 60)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.setLineDash([])
      }
      
      // Centroid dot
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, 2 * Math.PI)
      ctx.fillStyle = isCandidate ? '#10b981' : '#6b7280'
      ctx.fill()
      
      // File label with better text handling
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px Inter'
      ctx.textAlign = 'center'
      const fileName = file.name.split('.')[0]
      // Split long names into multiple lines if needed
      if (fileName.length > 15) {
        const parts = fileName.split('_')
        if (parts.length > 1) {
          ctx.fillText(parts[0], x, y + 30)
          ctx.fillText(parts.slice(1).join('_'), x, y + 45)
        } else {
          ctx.fillText(fileName.substring(0, 15), x, y + 30)
          ctx.fillText(fileName.substring(15), x, y + 45)
        }
      } else {
        ctx.fillText(fileName, x, y + 30)
      }
    })

    // Draw query vector
    if (queryEmbedding.length > 0) {
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height - 60, 14, 0, 2 * Math.PI)
      ctx.fillStyle = '#d4a574'
      ctx.fill()
      
      ctx.fillStyle = '#d4a574'
      ctx.font = 'bold 14px Inter'
      ctx.textAlign = 'center'
      ctx.fillText('Query Vector', canvas.width / 2, canvas.height - 25)
    }
  }, [candidateFiles, queryEmbedding])


  const weightSum = Object.values(scoringWeights).reduce((sum, val) => sum + val, 0)

  const getSearchStatus = () => {
    switch (searchStage) {
      case 0:
        return "Ready to search";
      case 1:
        return "Filtering candidates...";
      case 2:
        return "Calculating holistic scores...";
      case 3:
        return "Search complete";
      default:
        return "Ready";
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Algorithm Steps - First */}
      <div className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <h4 className="font-medium text-amber-400 mb-2">Algorithm Steps:</h4>
        <ol className="list-decimal list-inside text-sm space-y-1" style={{ color: 'var(--fg-secondary)' }}>
          <li>Generate query embedding using transformer model</li>
          <li>Stage 1: Filter files by centroid similarity (top 200)</li>
          <li>Stage 2: Search chunks within candidate files</li>
          <li>Calculate holistic score (s_max + s_topk + s_centroid + s_bm25)</li>
          <li>Rank files by weighted combination of all scores</li>
        </ol>
      </div>

      {/* Compact Controls Row */}
      <div className="grid lg:grid-cols-4 gap-4">
        {/* Algorithm Info */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-lg bg-green-500/20 text-green-400 mr-3">
              <Search className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-primary truncate">Gist Search</h3>
              <p className="text-xs text-muted">O(log n + k)</p>
            </div>
          </div>
        </div>

        {/* Demo Query */}
        <div className="lg:col-span-2 p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-primary">Demo Query</h4>
            <div className="flex gap-2">
              <button
                onClick={performSearch}
                disabled={isSearching}
                className="px-3 py-1.5 bg-green-500 hover:bg-green-600 disabled:bg-elevated disabled:cursor-not-allowed text-primary text-xs rounded-lg flex items-center transition-colors"
              >
                {isSearching ? (
                  <>
                    <Zap className="h-3 w-3 mr-1 animate-pulse" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 mr-1" />
                    Run Demo
                  </>
                )}
              </button>
              <button
                onClick={resetSearch}
                className="px-3 py-1.5 bg-elevated hover:bg-elevated text-primary text-xs rounded-lg flex items-center transition-colors"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </button>
            </div>
          </div>
          <div className="p-2 rounded bg-muted" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="font-mono text-amber-400 text-sm">"{query}"</div>
          </div>
        </div>

        {/* Quick Status */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h4 className="text-sm font-semibold text-primary mb-2">Progress</h4>
          <div className="text-xs text-secondary">{getSearchStatus()}</div>
          <div className="mt-2 flex justify-between text-xs">
            <span className="text-muted">Stage: {searchStage}/2</span>
            <span className="text-amber-400">{finalResults.length} results</span>
          </div>
        </div>
      </div>

      {/* Vector Space Visualization - Right after controls */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center mb-6">
          <Database className="h-6 w-6 text-amber-400 mr-3" />
          <h3 className="text-xl font-semibold text-primary">Vector Space Visualization</h3>
          <div className="ml-auto flex items-center text-sm text-muted">
            <Info className="h-4 w-4 mr-1" />
            Green dots = selected candidates
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="w-full rounded border"
          style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)', minHeight: '500px' }}
        />
      </div>

      {/* Scoring Weights - More Compact */}
      <div className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-primary flex items-center">
            <Settings className="h-4 w-4 text-amber-400 mr-2" />
            Scoring Weights
          </h4>
          <span className="text-xs text-muted">Total: {weightSum.toFixed(2)}</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(scoringWeights).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-xs">
                <label className="text-muted">{key.replace('_', ' ')}:</label>
                <span className="text-primary font-mono">{value.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={value}
                onChange={(e) => updateWeight(key as keyof ScoringWeights, Number(e.target.value))}
                disabled={isSearching}
                className="w-full h-1 bg-elevated rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Stage 1: Candidate Files */}
      {searchStage >= 1 && candidateFiles.length > 0 && (
        <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="font-semibold text-primary">Stage 1: Candidate Files</h4>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidateFiles.map((file) => (
              <div
                key={file.id}
                className="p-4 rounded-lg border"
                style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium text-primary text-sm">{file.name}</div>
                  <div className="text-lg font-bold text-green-400 ml-2">
                    {Math.round((file.centroidSimilarity || 0) * 100)}%
                  </div>
                </div>
                <div className="text-xs text-muted">{file.path}</div>
                <div className="text-xs text-muted mt-1">Centroid Match</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stage 2: Final Results */}
      {searchStage >= 2 && finalResults.length > 0 && (
        <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-6">
            <TrendingUp className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="font-semibold text-primary">Stage 2: Ranked Results</h4>
          </div>

          <div className="space-y-4">
            {finalResults.map((file, index) => (
              <div
                key={file.id}
                className="p-6 rounded-lg border"
                style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-black text-sm font-bold flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-lg text-primary">{file.name}</div>
                      <div className="text-sm text-muted">{file.path}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-400">
                      {Math.round((file.holisticScore?.final || 0) * 100)}%
                    </div>
                    <div className="text-xs text-muted">Final Score</div>
                  </div>
                </div>

                {/* Score Breakdown */}
                {file.holisticScore && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {Object.entries(file.holisticScore)
                      .filter(([key]) => key !== 'final')
                      .map(([component, value]) => (
                        <div key={component} className="p-3 rounded text-center" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                          <div className="text-sm font-medium text-primary">
                            {(value * scoringWeights[component as keyof ScoringWeights] * 100).toFixed(1)}%
                          </div>
                          <div className="text-xs text-muted">{component.replace('_', ' ')}</div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Best Chunks */}
                <div>
                  <h5 className="text-sm font-medium text-primary mb-3">Best Matching Chunks:</h5>
                  <div className="space-y-2">
                    {file.chunks
                      .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
                      .slice(0, 2)
                      .map(chunk => (
                        <div key={chunk.id} className="p-3 rounded border-l-4 border-amber-500" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-muted">Chunk {chunk.id.split('-')[1]}</span>
                            <span className="text-sm font-medium text-amber-400">
                              {Math.round((chunk.similarity || 0) * 100)}% match
                            </span>
                          </div>
                          <p className="text-sm text-secondary">{chunk.text}</p>
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
  )
}

export default GistSearchDemo