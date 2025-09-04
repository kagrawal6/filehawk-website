import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  Layers, 
  Search,
  Target,
  BarChart3,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Info,
  Lightbulb,
  Activity
} from 'lucide-react'

interface Point {
  id: string
  x: number
  y: number
  label: string
  type: 'gist' | 'pinpoint' | 'centroid' | 'query'
  similarity?: number
  fileId?: string
  chunkText?: string
}

interface EmbeddingSpaceVisualizationProps {
  className?: string
}

const EmbeddingSpaceVisualization: React.FC<EmbeddingSpaceVisualizationProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedQuery, setSelectedQuery] = useState('')
  const [queryPoint, setQueryPoint] = useState<Point | null>(null)
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [showGrid, setShowGrid] = useState(true)
  const [selectedCollection, setSelectedCollection] = useState<'all' | 'gist' | 'pinpoint' | 'centroids'>('all')

  const canvasSize = { width: 600, height: 400 }

  // Sample queries for demonstration
  const sampleQueries = [
    'machine learning algorithms',
    'neural networks',
    'data structures',
    'web development',
    'database design'
  ]

  // Generate mock embedding points
  const mockPoints = useMemo((): Point[] => {
    const points: Point[] = []
    
    // File centroids (gist mode)
    const fileCentroids = [
      { label: 'ml_guide.md', cluster: 'ai', color: '#3b82f6' },
      { label: 'neural_nets.py', cluster: 'ai', color: '#3b82f6' },
      { label: 'algorithms.cpp', cluster: 'cs', color: '#10b981' },
      { label: 'data_structures.js', cluster: 'cs', color: '#10b981' },
      { label: 'web_dev.html', cluster: 'web', color: '#f59e0b' },
      { label: 'database_design.sql', cluster: 'db', color: '#ef4444' },
      { label: 'api_docs.md', cluster: 'web', color: '#f59e0b' }
    ]

    fileCentroids.forEach((file, index) => {
      const clusterCenters = {
        ai: { x: 150, y: 100 },
        cs: { x: 450, y: 120 },
        web: { x: 200, y: 300 },
        db: { x: 400, y: 280 }
      }
      const clusterCenter = clusterCenters[file.cluster as keyof typeof clusterCenters]

      points.push({
        id: `centroid-${index}`,
        x: clusterCenter.x + (Math.random() - 0.5) * 60,
        y: clusterCenter.y + (Math.random() - 0.5) * 60,
        label: file.label,
        type: 'centroid',
        fileId: `file-${index}`
      })

      // Add chunk points around each centroid
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * 2 * Math.PI
        const radius = 20 + Math.random() * 30
        points.push({
          id: `${file.label}-chunk-${i}`,
          x: clusterCenter.x + Math.cos(angle) * radius + (Math.random() - 0.5) * 20,
          y: clusterCenter.y + Math.sin(angle) * radius + (Math.random() - 0.5) * 20,
          label: `Chunk ${i + 1}`,
          type: file.cluster === 'ai' || file.cluster === 'cs' ? 'gist' : 'pinpoint',
          fileId: `file-${index}`,
          chunkText: `Sample chunk text from ${file.label}...`
        })
      }
    })

    return points
  }, [])

  // Filter points based on selected collection
  const filteredPoints = useMemo(() => {
    if (selectedCollection === 'all') return mockPoints
    return mockPoints.filter(point => {
      if (selectedCollection === 'centroids') return point.type === 'centroid'
      return point.type === selectedCollection
    })
  }, [mockPoints, selectedCollection])

  // Generate query embedding and calculate similarities
  const processQuery = (query: string) => {
    if (!query.trim()) {
      setQueryPoint(null)
      return
    }

    // Mock query embedding position based on query content
    let queryPos = { x: 300, y: 200 }
    
    if (query.toLowerCase().includes('machine') || query.toLowerCase().includes('neural')) {
      queryPos = { x: 150 + Math.random() * 50, y: 100 + Math.random() * 50 }
    } else if (query.toLowerCase().includes('algorithm') || query.toLowerCase().includes('data')) {
      queryPos = { x: 450 + Math.random() * 50, y: 120 + Math.random() * 50 }
    } else if (query.toLowerCase().includes('web') || query.toLowerCase().includes('html')) {
      queryPos = { x: 200 + Math.random() * 50, y: 300 + Math.random() * 50 }
    } else if (query.toLowerCase().includes('database')) {
      queryPos = { x: 400 + Math.random() * 50, y: 280 + Math.random() * 50 }
    }

    const newQueryPoint: Point = {
      id: 'query',
      x: queryPos.x,
      y: queryPos.y,
      label: query,
      type: 'query'
    }

    // Calculate similarities to all points (for display purposes)
    mockPoints.forEach(point => {
      const distance = Math.sqrt(
        Math.pow(point.x - newQueryPoint.x, 2) + 
        Math.pow(point.y - newQueryPoint.y, 2)
      )
      point.similarity = Math.max(0, 1 - distance / 200) // Normalize distance to similarity
    })

    setQueryPoint(newQueryPoint)
    // You could update mockPoints here if needed for similarity display
  }

  // Canvas drawing function
  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

    // Apply transform
    ctx.save()
    ctx.translate(pan.x, pan.y)
    ctx.scale(zoom, zoom)

    // Draw grid if enabled
    if (showGrid) {
      ctx.strokeStyle = '#374151'
      ctx.lineWidth = 0.5
      const gridSize = 50
      
      for (let x = 0; x <= canvasSize.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvasSize.height)
        ctx.stroke()
      }
      
      for (let y = 0; y <= canvasSize.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvasSize.width, y)
        ctx.stroke()
      }
    }

    // Draw similarity circles if query exists
    if (queryPoint) {
      const rings = [50, 100, 150, 200]
      rings.forEach((radius, index) => {
        ctx.beginPath()
        ctx.arc(queryPoint.x, queryPoint.y, radius, 0, 2 * Math.PI)
        ctx.strokeStyle = `rgba(251, 191, 36, ${0.3 - index * 0.05})`
        ctx.lineWidth = 1
        ctx.stroke()
      })
    }

    // Draw points
    filteredPoints.forEach(point => {
      let color = '#6b7280'
      let size = 4
      
      switch (point.type) {
        case 'gist':
          color = '#3b82f6'
          size = 3
          break
        case 'pinpoint':
          color = '#ef4444'
          size = 3
          break
        case 'centroid':
          color = '#10b981'
          size = 6
          break
        case 'query':
          color = '#f59e0b'
          size = 8
          break
      }

      // Highlight similar points
      if (queryPoint && point.similarity && point.similarity > 0.7) {
        size += 2
        ctx.beginPath()
        ctx.arc(point.x, point.y, size + 4, 0, 2 * Math.PI)
        ctx.fillStyle = `${color}33`
        ctx.fill()
      }

      // Draw point
      ctx.beginPath()
      ctx.arc(point.x, point.y, size, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()

      // Draw border
      ctx.beginPath()
      ctx.arc(point.x, point.y, size, 0, 2 * Math.PI)
      ctx.strokeStyle = '#1f2937'
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw label for centroids and query
      if (point.type === 'centroid' || point.type === 'query') {
        ctx.fillStyle = '#f3f4f6'
        ctx.font = '10px Inter'
        ctx.textAlign = 'center'
        ctx.fillText(point.label, point.x, point.y - size - 5)
      }
    })

    // Draw query point last (on top)
    if (queryPoint) {
      ctx.beginPath()
      ctx.arc(queryPoint.x, queryPoint.y, 8, 0, 2 * Math.PI)
      ctx.fillStyle = '#f59e0b'
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(queryPoint.x, queryPoint.y, 8, 0, 2 * Math.PI)
      ctx.strokeStyle = '#1f2937'
      ctx.lineWidth = 2
      ctx.stroke()

      // Query label
      ctx.fillStyle = '#f59e0b'
      ctx.font = 'bold 12px Inter'
      ctx.textAlign = 'center'
      ctx.fillText('Query', queryPoint.x, queryPoint.y - 15)
    }

    ctx.restore()
  }

  // Handle canvas mouse events
  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX - rect.left - pan.x) / zoom
    const y = (event.clientY - rect.top - pan.y) / zoom

    // Find hovered point
    const hoveredPoint = filteredPoints.find(point => {
      const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2))
      return distance <= 10
    })

    setHoveredPoint(hoveredPoint || null)
  }

  // Animation loop
  useEffect(() => {
    const animate = () => {
      drawCanvas()
      if (isAnimating) {
        requestAnimationFrame(animate)
      }
    }
    animate()
  }, [filteredPoints, queryPoint, zoom, pan, showGrid, hoveredPoint])

  // Handle query submission
  const handleQuerySubmit = () => {
    if (selectedQuery.trim()) {
      processQuery(selectedQuery)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
    }
  }

  const resetVisualization = () => {
    setQueryPoint(null)
    setSelectedQuery('')
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setIsAnimating(false)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
            2D Embedding Space Explorer
          </h3>
          <p style={{ color: 'var(--fg-secondary)' }}>
            Visualize how FileHawk represents documents and queries in high-dimensional space
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border" style={{ borderColor: 'var(--border-subtle)' }}>
            <button
              onClick={() => setSelectedCollection('all')}
              className={`px-3 py-2 rounded-l-lg text-sm transition-all ${
                selectedCollection === 'all' 
                  ? 'bg-brand-gold-500/20 text-brand-gold-400' 
                  : 'hover:bg-gray-700/50'
              }`}
              style={{ color: selectedCollection === 'all' ? '' : 'var(--fg-secondary)' }}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCollection('gist')}
              className={`px-3 py-2 border-x text-sm transition-all ${
                selectedCollection === 'gist' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'hover:bg-gray-700/50'
              }`}
              style={{ 
                borderColor: 'var(--border-subtle)',
                color: selectedCollection === 'gist' ? '' : 'var(--fg-secondary)' 
              }}
            >
              Gist
            </button>
            <button
              onClick={() => setSelectedCollection('pinpoint')}
              className={`px-3 py-2 border-r text-sm transition-all ${
                selectedCollection === 'pinpoint' 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'hover:bg-gray-700/50'
              }`}
              style={{ 
                borderColor: 'var(--border-subtle)',
                color: selectedCollection === 'pinpoint' ? '' : 'var(--fg-secondary)' 
              }}
            >
              Pinpoint
            </button>
            <button
              onClick={() => setSelectedCollection('centroids')}
              className={`px-3 py-2 rounded-r-lg text-sm transition-all ${
                selectedCollection === 'centroids' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'hover:bg-gray-700/50'
              }`}
              style={{ color: selectedCollection === 'centroids' ? '' : 'var(--fg-secondary)' }}
            >
              Centroids
            </button>
          </div>
          
          <button
            onClick={resetVisualization}
            className="px-4 py-2 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 hover:bg-brand-gold-500/30 transition-colors flex items-center"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </button>
        </div>
      </div>

      {/* Query Interface */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center mb-4">
          <Search className="h-5 w-5 text-brand-gold-400 mr-2" />
          <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
            Query Explorer
          </h4>
        </div>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={selectedQuery}
            onChange={(e) => setSelectedQuery(e.target.value)}
            placeholder="Enter search query to see semantic positioning..."
            className="flex-1 p-3 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--bg-muted)', 
              borderColor: 'var(--border-subtle)',
              color: 'var(--fg-primary)'
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleQuerySubmit()}
          />
          
          <button
            onClick={handleQuerySubmit}
            disabled={!selectedQuery.trim()}
            className="px-6 py-3 bg-brand-gold-500/20 text-brand-gold-400 rounded-lg hover:bg-brand-gold-500/30 transition-colors disabled:opacity-50 flex items-center"
          >
            <Target className="h-4 w-4 mr-2" />
            Visualize
          </button>
        </div>

        {/* Sample Queries */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>Try:</span>
          {sampleQueries.map(query => (
            <button
              key={query}
              onClick={() => {
                setSelectedQuery(query)
                processQuery(query)
              }}
              className="px-3 py-1 text-sm border rounded-full hover:bg-gray-700/50 transition-colors"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--fg-secondary)' }}
            >
              {query}
            </button>
          ))}
        </div>
      </div>

      {/* Visualization Canvas */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Canvas */}
        <div className="lg:col-span-3 p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Database className="h-5 w-5 text-brand-gold-400 mr-2" />
              <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
                Vector Space Visualization
              </h4>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded-lg transition-colors ${
                  showGrid ? 'bg-brand-gold-500/20 text-brand-gold-400' : 'hover:bg-gray-700/50'
                }`}
                style={{ color: showGrid ? '' : 'var(--fg-secondary)' }}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => setZoom(Math.min(3, zoom + 0.2))}
                className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                style={{ color: 'var(--fg-secondary)' }}
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
                className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                style={{ color: 'var(--fg-secondary)' }}
              >
                <ZoomOut className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              className="border rounded-lg cursor-crosshair"
              style={{ 
                backgroundColor: 'var(--bg-muted)', 
                borderColor: 'var(--border-subtle)',
                width: '100%',
                maxWidth: canvasSize.width
              }}
              onMouseMove={handleCanvasMouseMove}
            />
            
            {/* Hover tooltip */}
            {hoveredPoint && (
              <div 
                className="absolute bg-gray-900 text-white p-2 rounded shadow-lg text-sm pointer-events-none z-10"
                style={{ 
                  left: hoveredPoint.x * (zoom) + pan.x - 50,
                  top: hoveredPoint.y * (zoom) + pan.y - 40
                }}
              >
                <div className="font-medium">{hoveredPoint.label}</div>
                <div className="text-xs opacity-75">Type: {hoveredPoint.type}</div>
                {hoveredPoint.similarity && (
                  <div className="text-xs text-brand-gold-400">
                    Similarity: {Math.round(hoveredPoint.similarity * 100)}%
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
              <span style={{ color: 'var(--fg-secondary)' }}>Gist Chunks</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
              <span style={{ color: 'var(--fg-secondary)' }}>Pinpoint Chunks</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
              <span style={{ color: 'var(--fg-secondary)' }}>File Centroids</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
              <span style={{ color: 'var(--fg-secondary)' }}>Query Vector</span>
            </div>
          </div>
        </div>

        {/* Controls and Info */}
        <div className="space-y-6">
          {/* Collection Stats */}
          <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center mb-4">
              <Layers className="h-5 w-5 text-brand-gold-400 mr-2" />
              <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
                Collections
              </h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Gist Chunks</span>
                <span className="text-sm font-medium text-blue-400">
                  {mockPoints.filter(p => p.type === 'gist').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Pinpoint Chunks</span>
                <span className="text-sm font-medium text-red-400">
                  {mockPoints.filter(p => p.type === 'pinpoint').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>File Centroids</span>
                <span className="text-sm font-medium text-green-400">
                  {mockPoints.filter(p => p.type === 'centroid').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Total Vectors</span>
                <span className="text-sm font-medium text-brand-gold-400">
                  {mockPoints.length}
                </span>
              </div>
            </div>
          </div>

          {/* Query Results */}
          {queryPoint && (
            <motion.div 
              className="p-6 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <Activity className="h-5 w-5 text-brand-gold-400 mr-2" />
                <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
                  Similar Vectors
                </h4>
              </div>
              
              <div className="space-y-2">
                {mockPoints
                  .filter(p => p.similarity && p.similarity > 0.6)
                  .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
                  .slice(0, 5)
                  .map((point) => (
                    <div key={point.id} className="flex items-center justify-between text-sm">
                      <span className="truncate" style={{ color: 'var(--fg-secondary)' }}>
                        {point.label}
                      </span>
                      <span className="text-brand-gold-400 font-medium ml-2">
                        {Math.round((point.similarity || 0) * 100)}%
                      </span>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* Technical Info */}
          <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center mb-4">
              <Info className="h-5 w-5 text-brand-gold-400 mr-2" />
              <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
                Vector Space
              </h4>
            </div>
            
            <div className="space-y-3 text-sm" style={{ color: 'var(--fg-secondary)' }}>
              <div>• <strong>Dimensions:</strong> 384D (displayed as 2D projection)</div>
              <div>• <strong>Distance Metric:</strong> Cosine similarity</div>
              <div>• <strong>Clustering:</strong> Semantic grouping</div>
              <div>• <strong>Updates:</strong> Real-time incremental</div>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center mb-4">
          <Lightbulb className="h-5 w-5 text-brand-gold-400 mr-2" />
          <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
            Understanding the Visualization
          </h4>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-3" style={{ color: 'var(--fg-primary)' }}>
              What You're Seeing:
            </h5>
            <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
              <div>• Each point represents a text chunk or file in 384-dimensional space</div>
              <div>• Similar content clusters together (semantic neighborhoods)</div>
              <div>• Query vectors show where your search lands in this space</div>
              <div>• Concentric circles show similarity radii around queries</div>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium mb-3" style={{ color: 'var(--fg-primary)' }}>
              How Search Works:
            </h5>
            <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
              <div>• FileHawk converts your query into a vector representation</div>
              <div>• It finds the closest vectors using cosine similarity</div>
              <div>• Files with nearby chunks get higher relevance scores</div>
              <div>• Multiple similarity signals combine for final ranking</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmbeddingSpaceVisualization