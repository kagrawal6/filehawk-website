import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  RotateCcw,
  FileText,
  Database,
  Target,
  Layers,
  Info,
  Settings,
  GitCompare
} from 'lucide-react'

interface PrecisionChunk {
  id: number
  text: string
  startLine: number
  endLine: number
  embedding: number[]
  color: string
  hasSentenceBoundary: boolean
  boundaryType: string
}

interface PinpointIndexingDemoProps {
  className?: string
}

const PinpointIndexingDemo: React.FC<PinpointIndexingDemoProps> = ({ className = '' }) => {
  const [inputText, setInputText] = useState('')
  const [chunkSize, setChunkSize] = useState(3)
  const [respectSentences, setRespectSentences] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [chunks, setChunks] = useState<PrecisionChunk[]>([])
  const [statistics, setStatistics] = useState<{[key: string]: number}>({})
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Default sample text with mixed content types
  const defaultText = `# FileHawk Search Engine

## Quick Start Guide

FileHawk enables instant search across your entire codebase. Here's how to get started:

### Installation
1. Download FileHawk from our website
2. Run the installer
3. Launch the application

The search algorithm uses semantic embeddings. Neural networks process your queries.

### Basic Usage
Type your search query. Press Enter to search. Results appear instantly.

## Advanced Features

### Pinpoint Mode
- Ultra-fast search
- 3-line chunks 
- Direct matching
- Perfect for specific queries

### Gist Mode
- Contextual search
- 35-line chunks
- Semantic understanding
- Best for complex queries

## Configuration

Set your preferences in the settings panel. Choose between search modes. Customize indexing options.

## Troubleshooting

If search seems slow, rebuild the index. Check your file permissions. Restart the application if needed.

For technical support, visit our documentation website. Join our community forum for tips and tricks.`

  // Color palette for chunks
  const chunkColors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', 
    '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
    '#f59e0b', '#10b981', '#6366f1', '#e11d48'
  ]

  const getStepDescription = () => {
    switch (currentStep) {
      case 0:
        return 'Ready to process document'
      case 1:
        return 'Creating precise chunks...'
      case 2:
        return 'Analyzing sentence boundaries...'
      case 3:
        return 'Generating embeddings...'
      case 4:
        return 'Processing complete!'
      default:
        return 'Ready'
    }
  }

  // Detect sentence boundaries
  const detectSentenceBoundary = (text: string): boolean => {
    return /[.!?]$/.test(text.trim())
  }

  // Determine boundary type
  const getBoundaryType = (text: string): string => {
    if (text.trim().startsWith('#')) return 'heading'
    if (text.trim().match(/^\d+\./)) return 'list'
    if (detectSentenceBoundary(text)) return 'sentence'
    if (text.trim().length === 0) return 'paragraph'
    return 'fragment'
  }

  // Simulate embedding generation
  const generateEmbedding = (text: string): number[] => {
    const embedding = new Array(384).fill(0).map(() => Math.random() * 2 - 1)
    
    // Add semantic bias based on content
    const words = text.toLowerCase().split(/\s+/)
    words.forEach(word => {
      if (word.includes('search') || word.includes('query')) {
        embedding[0] += 0.4
        embedding[1] += 0.3
      }
      if (word.includes('chunk') || word.includes('pinpoint')) {
        embedding[2] += 0.5
        embedding[3] += 0.4
      }
      if (word.includes('fast') || word.includes('instant')) {
        embedding[4] += 0.3
        embedding[5] += 0.5
      }
    })
    
    return embedding
  }

  // Process text into precision chunks
  const processText = async () => {
    if (!inputText.trim()) return
    
    setIsProcessing(true)
    setCurrentStep(1)
    setChunks([])
    setStatistics({})
    
    const lines = inputText.split('\n').filter(line => line.trim())
    const newChunks: PrecisionChunk[] = []
    
    // Create small, precise chunks
    let chunkId = 1
    let lineIndex = 0
    
    while (lineIndex < lines.length) {
      const endLine = Math.min(lineIndex + chunkSize, lines.length)
      const chunkLines = lines.slice(lineIndex, endLine)
      const chunkText = chunkLines.join('\n')
      
      if (chunkText.trim()) {
        const lastLine = chunkLines[chunkLines.length - 1]
        const hasBoundary = detectSentenceBoundary(lastLine)
        const boundaryType = getBoundaryType(lastLine)
        
        newChunks.push({
          id: chunkId,
          text: chunkText,
          startLine: lineIndex + 1,
          endLine: endLine,
          embedding: [],
          color: chunkColors[(chunkId - 1) % chunkColors.length],
          hasSentenceBoundary: hasBoundary,
          boundaryType: boundaryType
        })
        chunkId++
      }
      
      lineIndex += chunkSize
    }
    
    setChunks(newChunks)
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // Analyze sentence boundaries
    setCurrentStep(2)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Generate embeddings
    setCurrentStep(3)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const chunksWithEmbeddings = newChunks.map(chunk => ({
      ...chunk,
      embedding: generateEmbedding(chunk.text)
    }))
    
    setChunks(chunksWithEmbeddings)
    
    // Calculate statistics
    const stats = {
      total: chunksWithEmbeddings.length,
      withBoundaries: chunksWithEmbeddings.filter(c => c.hasSentenceBoundary).length,
      headings: chunksWithEmbeddings.filter(c => c.boundaryType === 'heading').length,
      sentences: chunksWithEmbeddings.filter(c => c.boundaryType === 'sentence').length,
      lists: chunksWithEmbeddings.filter(c => c.boundaryType === 'list').length,
      fragments: chunksWithEmbeddings.filter(c => c.boundaryType === 'fragment').length
    }
    
    setStatistics(stats)
    setCurrentStep(4)
    setIsProcessing(false)
  }

  const resetDemo = () => {
    setIsProcessing(false)
    setCurrentStep(0)
    setChunks([])
    setStatistics({})
    setInputText('')
  }

  // Canvas visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (chunks.length === 0) {
      ctx.fillStyle = '#666666'
      ctx.font = '14px Inter'
      ctx.textAlign = 'center'
      ctx.fillText('Process text to see precise chunks visualization', canvas.width / 2, canvas.height / 2)
      return
    }

    // Draw chunks as small, precise blocks
    const chunkWidth = 60
    const chunkHeight = 25
    const chunkSpacing = 5
    const rowHeight = chunkHeight + chunkSpacing
    const chunksPerRow = Math.floor((canvas.width - 40) / (chunkWidth + chunkSpacing))
    
    let xOffset = 20
    let yOffset = 20

    chunks.forEach((chunk, index) => {
      const col = index % chunksPerRow
      const row = Math.floor(index / chunksPerRow)
      
      const x = xOffset + col * (chunkWidth + chunkSpacing)
      const y = yOffset + row * rowHeight

      // Chunk rectangle
      ctx.fillStyle = chunk.color + '60'
      ctx.fillRect(x, y, chunkWidth, chunkHeight)
      
      // Border style based on boundary type
      ctx.strokeStyle = chunk.color
      if (chunk.boundaryType === 'heading') {
        ctx.lineWidth = 3
        ctx.setLineDash([])
      } else if (chunk.hasSentenceBoundary) {
        ctx.lineWidth = 2
        ctx.setLineDash([])
      } else {
        ctx.lineWidth = 1
        ctx.setLineDash([2, 2])
      }
      
      ctx.strokeRect(x, y, chunkWidth, chunkHeight)
      ctx.setLineDash([])

      // Chunk ID
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 10px Inter'
      ctx.textAlign = 'center'
      ctx.fillText(chunk.id.toString(), x + chunkWidth/2, y + chunkHeight/2 + 3)

      // Boundary indicator
      if (chunk.boundaryType === 'heading') {
        ctx.fillStyle = '#fbbf24'
        ctx.fillRect(x + chunkWidth - 8, y + 2, 6, 6)
      } else if (chunk.hasSentenceBoundary) {
        ctx.fillStyle = '#22c55e'
        ctx.beginPath()
        ctx.arc(x + chunkWidth - 5, y + 5, 3, 0, 2 * Math.PI)
        ctx.fill()
      }
    })

    // Legend
    const legendY = yOffset + Math.ceil(chunks.length / chunksPerRow) * rowHeight + 30
    
    ctx.fillStyle = '#ffffff'
    ctx.font = '12px Inter'
    ctx.textAlign = 'left'
    ctx.fillText('Legend:', 20, legendY)
    
    // Heading indicator
    ctx.fillStyle = '#fbbf24'
    ctx.fillRect(80, legendY - 8, 6, 6)
    ctx.fillStyle = '#cccccc'
    ctx.fillText('Heading', 95, legendY)
    
    // Sentence boundary
    ctx.fillStyle = '#22c55e'
    ctx.beginPath()
    ctx.arc(160, legendY - 3, 3, 0, 2 * Math.PI)
    ctx.fill()
    ctx.fillStyle = '#cccccc'
    ctx.fillText('Sentence End', 175, legendY)
    
    // Fragment
    ctx.strokeStyle = '#888888'
    ctx.lineWidth = 1
    ctx.setLineDash([2, 2])
    ctx.strokeRect(280, legendY - 8, 12, 6)
    ctx.setLineDash([])
    ctx.fillStyle = '#cccccc'
    ctx.fillText('Fragment', 300, legendY)
  }, [chunks])

  useEffect(() => {
    setInputText(defaultText)
  }, [])

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Compact Controls Row */}
      <div className="grid lg:grid-cols-4 gap-4">
        {/* Algorithm Info */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-lg bg-red-500/20 text-red-400 mr-3">
              <Target className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white truncate">Pinpoint Indexing</h3>
              <p className="text-xs text-gray-400">O(n)</p>
            </div>
          </div>
        </div>

        {/* Chunk Settings */}
        <div className="lg:col-span-2 p-4 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-white">Precision Settings</h4>
            <div className="flex gap-2">
              <button
                onClick={processText}
                disabled={isProcessing || !inputText.trim()}
                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs rounded-lg flex items-center transition-colors"
              >
                {isProcessing ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Settings className="h-3 w-3 mr-1" />
                    </motion.div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 mr-1" />
                    Process
                  </>
                )}
              </button>
              <button
                onClick={resetDemo}
                className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-lg flex items-center transition-colors"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-gray-400">Chunk size: {chunkSize} lines</label>
              <input
                type="range"
                min="2"
                max="5"
                value={chunkSize}
                onChange={(e) => setChunkSize(Number(e.target.value))}
                disabled={isProcessing}
                className="w-full h-1 bg-gray-700 rounded appearance-none cursor-pointer accent-red-400"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={respectSentences}
                  onChange={(e) => setRespectSentences(e.target.checked)}
                  disabled={isProcessing}
                  className="mr-2 accent-red-400"
                />
                <span className="text-gray-400">Respect sentences</span>
              </label>
            </div>
          </div>
        </div>

        {/* Quick Status */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <h4 className="text-sm font-semibold text-white mb-2">Progress</h4>
          <div className="text-xs text-gray-300">{getStepDescription()}</div>
          <div className="mt-2 text-xs">
            <span className="text-amber-400">{chunks.length} chunks</span>
          </div>
        </div>
      </div>

      {/* Input Text Area - More Compact */}
      <div className="p-4 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-white flex items-center">
            <FileText className="h-4 w-4 text-red-400 mr-2" />
            Input Document
          </h4>
          <button
            onClick={() => setInputText(defaultText)}
            className="text-xs text-red-400 hover:text-red-300"
          >
            Use Sample Text
          </button>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your text here to see how Pinpoint mode creates precise chunks..."
          rows={6}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white text-sm placeholder-gray-500 resize-none"
        />
      </div>

      {/* Full-Width Visualization Section */}
      <div className="space-y-6">
        {/* Canvas Visualization */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-6">
            <Layers className="h-6 w-6 text-red-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Precision Chunk Grid</h3>
            <div className="ml-auto flex items-center text-sm text-gray-400">
              <Info className="h-4 w-4 mr-1" />
              Each block = 3-line chunk
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full rounded border"
            style={{ backgroundColor: '#1a1a1a', borderColor: '#404040', minHeight: '400px' }}
          />
        </div>

        {/* Processing Results */}
        {chunks.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Chunk Statistics */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
              <div className="flex items-center mb-4">
                <Database className="h-5 w-5 text-red-400 mr-2" />
                <h4 className="font-semibold text-white">Chunk Analysis</h4>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded text-center" style={{ backgroundColor: '#1a1a1a' }}>
                  <div className="text-2xl font-bold text-red-400">{statistics.total || 0}</div>
                  <div className="text-gray-400 text-sm">Total Chunks</div>
                </div>
                <div className="p-3 rounded text-center" style={{ backgroundColor: '#1a1a1a' }}>
                  <div className="text-2xl font-bold text-green-400">{statistics.withBoundaries || 0}</div>
                  <div className="text-gray-400 text-sm">Clean Boundaries</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Avg chunk length:</span>
                  <span className="text-white">{chunks.length > 0 ? Math.round(chunks.reduce((sum, c) => sum + c.text.length, 0) / chunks.length) : 0} chars</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Embedding dimensions:</span>
                  <span className="text-white">384</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Boundary detection:</span>
                  <span className="text-green-400">{respectSentences ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>

            {/* Boundary Types */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
              <div className="flex items-center mb-4">
                <GitCompare className="h-5 w-5 text-red-400 mr-2" />
                <h4 className="font-semibold text-white">Boundary Types</h4>
              </div>

              {Object.keys(statistics).length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(statistics)
                    .filter(([key]) => !['total', 'withBoundaries'].includes(key))
                    .map(([type, count]) => {
                      const colors = {
                        headings: '#fbbf24',
                        sentences: '#22c55e', 
                        lists: '#3b82f6',
                        fragments: '#ef4444'
                      }
                      const color = colors[type as keyof typeof colors] || '#6b7280'
                      
                      return (
                        <div key={type} className="text-center p-3 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                          <div className="text-lg font-bold" style={{ color }}>
                            {count}
                          </div>
                          <div className="text-gray-400 capitalize text-sm">{type}</div>
                        </div>
                      )
                    })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">Process text to analyze boundaries</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PinpointIndexingDemo