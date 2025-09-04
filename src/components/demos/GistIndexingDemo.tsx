import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  RotateCcw,
  FileText,
  Database,
  Brain,
  Layers,
  ChevronRight,
  Info,
  Settings
} from 'lucide-react'

interface Chunk {
  id: number
  text: string
  startLine: number
  endLine: number
  embedding: number[]
  color: string
  isOverlap: boolean
}

interface GistIndexingDemoProps {
  className?: string
}

const GistIndexingDemo: React.FC<GistIndexingDemoProps> = ({ className = '' }) => {
  const [inputText, setInputText] = useState('')
  const [chunkSize, setChunkSize] = useState(35)
  const [overlap, setOverlap] = useState(5)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [chunks, setChunks] = useState<Chunk[]>([])
  const [fileCentroid, setFileCentroid] = useState<number[]>([])
  const [topTerms, setTopTerms] = useState<string[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Default sample text
  const defaultText = `# FileHawk: Advanced Semantic Search Documentation

## Overview
FileHawk represents a breakthrough in local file search technology, combining cutting-edge AI models with sophisticated indexing strategies to deliver unprecedented search accuracy and speed.

## Core Architecture
The system implements a dual-mode search architecture that adapts to different use cases:

### Gist Mode
- Large contextual chunks (35 lines)
- Comprehensive semantic understanding
- Perfect for detailed content analysis
- Optimized for relevance over speed

### Pinpoint Mode  
- Small precise chunks (3 lines)
- Fast direct matching
- Ideal for quick searches
- Optimized for speed over context

## Technical Implementation
FileHawk leverages state-of-the-art embedding models including all-MiniLM-L6-v2 for semantic understanding and implements sophisticated chunking strategies with configurable overlap to maintain contextual coherence across chunk boundaries.

The indexing process involves several stages:
1. Text preprocessing and normalization
2. Intelligent chunking with overlap
3. Embedding generation using transformer models
4. Centroid calculation for file-level representation
5. Index optimization for fast retrieval`

  // Color palette for chunks
  const chunkColors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', 
    '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
  ]

  const getStepDescription = () => {
    switch (currentStep) {
      case 0:
        return 'Ready to process document'
      case 1:
        return 'Creating contextual chunks...'
      case 2:
        return 'Generating embeddings...'
      case 3:
        return 'Computing file centroid...'
      case 4:
        return 'Processing complete!'
      default:
        return 'Ready'
    }
  }

  // Simulate embedding generation
  const generateEmbedding = (text: string): number[] => {
    const embedding = new Array(384).fill(0).map(() => Math.random() * 2 - 1)
    
    // Add some semantic bias based on content
    const words = text.toLowerCase().split(/\s+/)
    words.forEach(word => {
      if (word.includes('filehawk') || word.includes('search')) {
        embedding[0] += 0.3
        embedding[1] += 0.2
      }
      if (word.includes('embedding') || word.includes('semantic')) {
        embedding[2] += 0.4
        embedding[3] += 0.3
      }
      if (word.includes('chunk') || word.includes('index')) {
        embedding[4] += 0.3
        embedding[5] += 0.4
      }
    })
    
    return embedding
  }

  // Calculate centroid from embeddings
  const calculateCentroid = (embeddings: number[][]): number[] => {
    if (embeddings.length === 0) return []
    
    const dimensions = embeddings[0].length
    const centroid = new Array(dimensions).fill(0)
    
    embeddings.forEach(embedding => {
      embedding.forEach((value, index) => {
        centroid[index] += value
      })
    })
    
    return centroid.map(value => value / embeddings.length)
  }

  // Extract top terms (simplified)
  const extractTopTerms = (text: string): string[] => {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
    
    const wordCount: { [key: string]: number } = {}
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1
    })
    
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([word]) => word)
  }

  // Process text into chunks
  const processText = async () => {
    if (!inputText.trim()) return
    
    setIsProcessing(true)
    setCurrentStep(1)
    setChunks([])
    setFileCentroid([])
    setTopTerms([])
    
    const lines = inputText.split('\n')
    const newChunks: Chunk[] = []
    
    // Create overlapping chunks
    let chunkId = 1
    let lineIndex = 0
    
    while (lineIndex < lines.length) {
      const endLine = Math.min(lineIndex + chunkSize, lines.length)
      const chunkText = lines.slice(lineIndex, endLine).join('\n')
      
      if (chunkText.trim()) {
        newChunks.push({
          id: chunkId,
          text: chunkText,
          startLine: lineIndex + 1,
          endLine: endLine,
          embedding: [],
          color: chunkColors[(chunkId - 1) % chunkColors.length],
          isOverlap: lineIndex > 0 && overlap > 0
        })
        chunkId++
      }
      
      lineIndex += Math.max(1, chunkSize - overlap)
    }
    
    setChunks(newChunks)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Generate embeddings
    setCurrentStep(2)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const chunksWithEmbeddings = newChunks.map(chunk => ({
      ...chunk,
      embedding: generateEmbedding(chunk.text)
    }))
    
    setChunks(chunksWithEmbeddings)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Calculate file centroid
    setCurrentStep(3)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const embeddings = chunksWithEmbeddings.map(chunk => chunk.embedding)
    const centroid = calculateCentroid(embeddings)
    setFileCentroid(centroid)
    
    // Extract terms
    const terms = extractTopTerms(inputText)
    setTopTerms(terms)
    
    setCurrentStep(4)
    setIsProcessing(false)
  }

  const resetDemo = () => {
    setIsProcessing(false)
    setCurrentStep(0)
    setChunks([])
    setFileCentroid([])
    setTopTerms([])
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
      ctx.fillText('Process text to see chunks visualization', canvas.width / 2, canvas.height / 2)
      return
    }

    // Draw chunks as rectangles
    const chunkHeight = 30
    const chunkSpacing = 35
    let yOffset = 20

    chunks.forEach((chunk, index) => {
      const x = 20
      const y = yOffset + index * chunkSpacing
      const width = canvas.width - 40
      const height = chunkHeight

      // Chunk rectangle
      ctx.fillStyle = chunk.color + '40' // Add transparency
      ctx.fillRect(x, y, width, height)
      
      ctx.strokeStyle = chunk.color
      ctx.lineWidth = chunk.isOverlap ? 2 : 1
      ctx.setLineDash(chunk.isOverlap ? [5, 5] : [])
      ctx.strokeRect(x, y, width, height)
      ctx.setLineDash([])

      // Chunk label
      ctx.fillStyle = '#ffffff'
      ctx.font = '11px Inter'
      ctx.textAlign = 'left'
      ctx.fillText(`Chunk ${chunk.id} (Lines ${chunk.startLine}-${chunk.endLine})`, x + 8, y + 16)
      
      // Preview text
      ctx.fillStyle = '#cccccc'
      ctx.font = '9px Inter'
      const previewText = chunk.text.substring(0, 60) + '...'
      ctx.fillText(previewText, x + 8, y + 26)
    })

    // Draw centroid representation
    if (fileCentroid.length > 0) {
      const centroidY = yOffset + chunks.length * chunkSpacing + 20
      ctx.fillStyle = '#d4a574'
      ctx.fillRect(20, centroidY, canvas.width - 40, 25)
      
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 12px Inter'
      ctx.textAlign = 'center'
      ctx.fillText('File Centroid (Average of all chunks)', canvas.width / 2, centroidY + 16)
    }
  }, [chunks, fileCentroid])

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
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 mr-3">
              <Brain className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white truncate">Gist Indexing</h3>
              <p className="text-xs text-gray-400">O(n)</p>
            </div>
          </div>
        </div>

        {/* Chunk Settings */}
        <div className="lg:col-span-2 p-4 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-white">Chunking Settings</h4>
            <div className="flex gap-2">
              <button
                onClick={processText}
                disabled={isProcessing || !inputText.trim()}
                className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs rounded-lg flex items-center transition-colors"
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
                min="10"
                max="50"
                value={chunkSize}
                onChange={(e) => setChunkSize(Number(e.target.value))}
                disabled={isProcessing}
                className="w-full h-1 bg-gray-700 rounded appearance-none cursor-pointer accent-blue-400"
              />
            </div>
            <div>
              <label className="text-gray-400">Overlap: {overlap} lines</label>
              <input
                type="range"
                min="0"
                max="10"
                value={overlap}
                onChange={(e) => setOverlap(Number(e.target.value))}
                disabled={isProcessing}
                className="w-full h-1 bg-gray-700 rounded appearance-none cursor-pointer accent-blue-400"
              />
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
            <FileText className="h-4 w-4 text-blue-400 mr-2" />
            Input Document
          </h4>
          <button
            onClick={() => setInputText(defaultText)}
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            Use Sample Text
          </button>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your text here to see how Gist mode creates contextual chunks..."
          rows={6}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white text-sm placeholder-gray-500 resize-none"
        />
      </div>

      {/* Full-Width Visualization Section */}
      <div className="space-y-6">
        {/* Canvas Visualization */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-6">
            <Layers className="h-6 w-6 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Chunk Structure Visualization</h3>
            <div className="ml-auto flex items-center text-sm text-gray-400">
              <Info className="h-4 w-4 mr-1" />
              Dashed lines = overlapping chunks
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
                <Database className="h-5 w-5 text-blue-400 mr-2" />
                <h4 className="font-semibold text-white">Chunk Statistics</h4>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded text-center" style={{ backgroundColor: '#1a1a1a' }}>
                  <div className="text-2xl font-bold text-blue-400">{chunks.length}</div>
                  <div className="text-gray-400 text-sm">Total Chunks</div>
                </div>
                <div className="p-3 rounded text-center" style={{ backgroundColor: '#1a1a1a' }}>
                  <div className="text-2xl font-bold text-blue-400">{chunks.filter(c => c.isOverlap).length}</div>
                  <div className="text-gray-400 text-sm">With Overlap</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Avg chunk length:</span>
                  <span className="text-white">{Math.round(chunks.reduce((sum, c) => sum + c.text.length, 0) / chunks.length)} chars</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Embedding dimensions:</span>
                  <span className="text-white">384</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Centroid computed:</span>
                  <span className="text-green-400">{fileCentroid.length > 0 ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            {/* Top Terms */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
              <div className="flex items-center mb-4">
                <ChevronRight className="h-5 w-5 text-blue-400 mr-2" />
                <h4 className="font-semibold text-white">Key Terms</h4>
              </div>

              {topTerms.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {topTerms.map((term, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: chunkColors[index % chunkColors.length] + '20',
                        color: chunkColors[index % chunkColors.length],
                        border: `1px solid ${chunkColors[index % chunkColors.length]}40`
                      }}
                    >
                      {term}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">Process text to extract key terms</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GistIndexingDemo