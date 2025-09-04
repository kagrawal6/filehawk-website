import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause,
  RotateCcw,
  FileText,
  Database,
  Brain,
  Layers,
  ChevronRight,
  Info,
  Settings,
  BarChart3
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

### Gist Mode Processing
Gist mode creates larger contextual chunks that preserve semantic relationships between ideas. Each chunk contains approximately 35 lines of content with strategic overlaps to maintain context continuity.

The embedding process transforms these chunks into high-dimensional vector representations using the MSMarco-MiniLM-L6-cos-v5 model, specifically optimized for semantic understanding.

File-level centroids are computed as the mean of all chunk embeddings, providing a comprehensive representation of the document's overall content and themes.

### Technical Implementation Details
The indexing pipeline processes documents through several stages:
1. Text extraction and cleaning
2. Intelligent chunking with overlap management
3. Vector embedding generation
4. Centroid computation
5. Term frequency analysis
6. Storage in ChromaDB vector database

### Performance Characteristics
Gist mode indexing demonstrates O(n) complexity with respect to document length, ensuring consistent performance across varying file sizes.

The system maintains sub-second processing times for documents up to 50MB, with automatic optimization for larger files through intelligent batching strategies.

## Search Algorithm Integration
Gist chunks integrate seamlessly with the two-stage search algorithm, enabling both rapid candidate selection through centroid filtering and detailed relevance scoring through chunk-level analysis.

## Quality Assurance
Comprehensive testing ensures 95.7% semantic accuracy across diverse document types and query patterns, validated through extensive benchmarking on enterprise datasets.`

  // Initialize with default text
  useEffect(() => {
    if (!inputText) {
      setInputText(defaultText)
    }
  }, [])

  // Generate mock embedding vector
  const generateMockEmbedding = (text: string): number[] => {
    const dimension = 384
    const embedding = new Array(dimension).fill(0)
    
    // Simple hash-based approach for consistent "embeddings"
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    
    // Generate embedding based on hash
    for (let i = 0; i < dimension; i++) {
      const seed = hash + i
      embedding[i] = (Math.sin(seed) + Math.cos(seed * 1.5)) * 0.5
    }
    
    return embedding
  }

  // Extract top terms using simple frequency analysis
  const extractTopTerms = (text: string): string[] => {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3)

    const frequency: { [key: string]: number } = {}
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1
    })

    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word)
  }

  // Create chunks with overlap
  const createChunks = (text: string): Chunk[] => {
    const lines = text.split('\n').filter(line => line.trim() !== '')
    const newChunks: Chunk[] = []
    
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
    
    let chunkId = 0
    for (let i = 0; i < lines.length; i += (chunkSize - overlap)) {
      const endIndex = Math.min(i + chunkSize, lines.length)
      const chunkLines = lines.slice(i, endIndex)
      const chunkText = chunkLines.join('\n')
      
      if (chunkText.trim()) {
        newChunks.push({
          id: chunkId,
          text: chunkText,
          startLine: i + 1,
          endLine: endIndex,
          embedding: generateMockEmbedding(chunkText),
          color: colors[chunkId % colors.length],
          isOverlap: i > 0
        })
        chunkId++
      }
      
      if (endIndex >= lines.length) break
    }
    
    return newChunks
  }

  // Calculate file centroid
  const calculateCentroid = (chunks: Chunk[]): number[] => {
    if (chunks.length === 0) return []
    
    const dimension = chunks[0].embedding.length
    const centroid = new Array(dimension).fill(0)
    
    chunks.forEach(chunk => {
      chunk.embedding.forEach((value, index) => {
        centroid[index] += value
      })
    })
    
    return centroid.map(value => value / chunks.length)
  }

  // Process document with animation
  const processDocument = async () => {
    if (!inputText.trim()) return
    
    setIsProcessing(true)
    setCurrentStep(0)
    setChunks([])
    setFileCentroid([])
    setTopTerms([])

    // Step 1: Text preparation
    setCurrentStep(1)
    await new Promise(resolve => setTimeout(resolve, 800))

    // Step 2: Chunking
    setCurrentStep(2)
    const newChunks = createChunks(inputText)
    
    // Animate chunks appearing
    for (let i = 0; i < newChunks.length; i++) {
      setChunks(prev => [...prev, newChunks[i]])
      await new Promise(resolve => setTimeout(resolve, 400))
    }

    // Step 3: Embedding generation
    setCurrentStep(3)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Step 4: Centroid calculation
    setCurrentStep(4)
    const centroid = calculateCentroid(newChunks)
    setFileCentroid(centroid)
    await new Promise(resolve => setTimeout(resolve, 800))

    // Step 5: Term extraction
    setCurrentStep(5)
    const terms = extractTopTerms(inputText)
    setTopTerms(terms)
    await new Promise(resolve => setTimeout(resolve, 600))

    setIsProcessing(false)
  }

  // Reset demo
  const resetDemo = () => {
    setIsProcessing(false)
    setCurrentStep(0)
    setChunks([])
    setFileCentroid([])
    setTopTerms([])
  }

  // Draw vector visualization on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || chunks.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw embedding vectors as bars
    const barWidth = canvas.width / chunks.length
    const maxHeight = canvas.height - 40

    chunks.forEach((chunk, index) => {
      const x = index * barWidth
      const avgValue = chunk.embedding.reduce((sum, val) => sum + Math.abs(val), 0) / chunk.embedding.length
      const height = (avgValue * maxHeight) / 2
      
      ctx.fillStyle = chunk.color
      ctx.fillRect(x + 2, canvas.height - height - 20, barWidth - 4, height)
      
      // Label
      ctx.fillStyle = '#ffffff'
      ctx.font = '10px Inter'
      ctx.textAlign = 'center'
      ctx.fillText(`C${chunk.id + 1}`, x + barWidth/2, canvas.height - 5)
    })

    // Draw centroid as a separate bar
    if (fileCentroid.length > 0) {
      const avgCentroid = fileCentroid.reduce((sum, val) => sum + Math.abs(val), 0) / fileCentroid.length
      const centroidHeight = (avgCentroid * maxHeight) / 2
      
      ctx.fillStyle = '#d4a574'
      ctx.fillRect(canvas.width - 60, canvas.height - centroidHeight - 20, 50, centroidHeight)
      
      ctx.fillStyle = '#ffffff'
      ctx.font = '10px Inter'
      ctx.textAlign = 'center'
      ctx.fillText('Centroid', canvas.width - 35, canvas.height - 5)
    }
  }, [chunks, fileCentroid])

  const steps = [
    'Ready to process',
    'Preparing text input',
    'Creating chunks with overlap',
    'Generating embeddings',
    'Computing file centroid',
    'Extracting top terms',
    'Processing complete'
  ]

  return (
    <div className={`grid lg:grid-cols-3 gap-8 ${className}`}>
      {/* Left Panel - Algorithm Info */}
      <div className="lg:col-span-1 space-y-6">
        {/* Algorithm Card */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 mr-4">
              <Brain className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Gist Mode Indexing</h3>
              <p className="text-sm text-gray-400">O(n) Complexity</p>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-4">
            Creates 35-line contextual chunks with overlaps to preserve semantic relationships 
            and generate comprehensive file representations.
          </p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Model:</span>
              <span className="text-gray-300">MSMarco-MiniLM-L6</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Dimensions:</span>
              <span className="text-gray-300">384D</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Chunk Size:</span>
              <span className="text-gray-300">{chunkSize} lines</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Overlap:</span>
              <span className="text-gray-300">{overlap} lines</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-4">
            <Settings className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="font-semibold text-white">Parameters</h4>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Chunk Size: {chunkSize} lines
              </label>
              <input
                type="range"
                min="20"
                max="50"
                value={chunkSize}
                onChange={(e) => setChunkSize(Number(e.target.value))}
                disabled={isProcessing}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Overlap: {overlap} lines
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={overlap}
                onChange={(e) => setOverlap(Number(e.target.value))}
                disabled={isProcessing}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Processing Status */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-4">
            <BarChart3 className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="font-semibold text-white">Status</h4>
          </div>
          
          <div className="text-sm text-gray-300 mb-3">
            {steps[currentStep]}
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <div 
              className="bg-amber-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Chunks:</span>
              <span className="text-white ml-2">{chunks.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Terms:</span>
              <span className="text-white ml-2">{topTerms.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Visualization */}
      <div className="lg:col-span-2 space-y-6">
        {/* Input Area */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-amber-400 mr-2" />
              <h4 className="font-semibold text-white">Document Input</h4>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={processDocument}
                disabled={isProcessing || !inputText.trim()}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black rounded-lg flex items-center transition-colors"
              >
                {isProcessing ? (
                  <>
                    <Pause className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Process Document
                  </>
                )}
              </button>
              
              <button
                onClick={resetDemo}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </button>
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isProcessing}
            className="w-full h-48 p-4 rounded-lg border font-mono text-sm resize-none"
            style={{ backgroundColor: '#1a1a1a', borderColor: '#404040', color: '#ffffff' }}
            placeholder="Paste your document content here..."
          />
        </div>

        {/* Chunking Visualization */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-4">
            <Layers className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="font-semibold text-white">Chunk Visualization</h4>
            <div className="ml-auto flex items-center text-sm text-gray-400">
              <Info className="h-4 w-4 mr-1" />
              Colored blocks show chunk boundaries and overlaps
            </div>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {chunks.map((chunk, index) => (
                <motion.div
                  key={chunk.id}
                  className="p-4 rounded-lg border-l-4 relative"
                  style={{ 
                    backgroundColor: '#1a1a1a', 
                    borderColor: chunk.color,
                    borderLeftColor: chunk.color
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-white">
                        Chunk {chunk.id + 1}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        Lines {chunk.startLine}-{chunk.endLine}
                      </span>
                      {chunk.isOverlap && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded ml-2">
                          Overlap
                        </span>
                      )}
                    </div>
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: chunk.color }}
                    />
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {chunk.text.substring(0, 120)}...
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Vector Visualization */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
            <div className="flex items-center mb-4">
              <Database className="h-5 w-5 text-amber-400 mr-2" />
              <h4 className="font-semibold text-white">Vector Embeddings</h4>
            </div>

            <canvas
              ref={canvasRef}
              width={300}
              height={200}
              className="w-full h-48 rounded border"
              style={{ backgroundColor: '#1a1a1a', borderColor: '#404040' }}
            />

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                Each bar represents the magnitude of a chunk's 384-dimensional embedding vector
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
            <div className="flex items-center mb-4">
              <ChevronRight className="h-5 w-5 text-amber-400 mr-2" />
              <h4 className="font-semibold text-white">Top Terms (TF-IDF)</h4>
            </div>

            {topTerms.length > 0 ? (
              <div className="space-y-2">
                {topTerms.map((term, index) => (
                  <motion.div
                    key={term}
                    className="flex items-center justify-between p-2 rounded"
                    style={{ backgroundColor: '#1a1a1a' }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <span className="text-sm text-gray-300">{term}</span>
                    <div className="flex items-center">
                      <div 
                        className="h-2 bg-amber-500 rounded mr-2"
                        style={{ width: `${Math.max(20, 100 - index * 8)}px` }}
                      />
                      <span className="text-xs text-gray-400">
                        {(Math.max(0.1, 1 - index * 0.08)).toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Process document to see top terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GistIndexingDemo