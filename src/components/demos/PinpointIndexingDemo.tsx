import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause,
  RotateCcw,
  FileText,
  Database,
  Target,
  Layers,
  ChevronRight,
  Info,
  Settings,
  BarChart3,
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
  showComparison?: boolean
  comparisonData?: {
    gistChunks: number
    gistAvgSize: number
  }
}

const PinpointIndexingDemo: React.FC<PinpointIndexingDemoProps> = ({ 
  className = '', 
  showComparison = false,
  comparisonData 
}) => {
  const [inputText, setInputText] = useState('')
  const [precisionLevel, setPrecisionLevel] = useState<'sentence' | 'line'>('sentence')
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [chunks, setChunks] = useState<PrecisionChunk[]>([])
  const [boundaryMarkers, setBoundaryMarkers] = useState<Array<{line: number, type: string}>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Default sample text (same as Gist demo for comparison)
  const defaultText = `# FileHawk: Advanced Semantic Search Documentation

## Overview
FileHawk represents a breakthrough in local file search technology, combining cutting-edge AI models with sophisticated indexing strategies to deliver unprecedented search accuracy and speed.

## Core Architecture
The system implements a dual-mode search architecture that adapts to different use cases.

### Pinpoint Mode Processing
Pinpoint mode creates precise, small chunks optimized for exact matching. Each chunk contains approximately 3 lines of content with intelligent sentence boundary detection.

The embedding process uses the all-MiniLM-L6-v2 model, specifically tuned for precision matching and exact phrase detection.

Direct storage without centroid computation ensures maximum precision and minimal information loss.

### Technical Implementation Details
The indexing pipeline focuses on precision:
1. Text extraction and cleaning.
2. Sentence boundary detection.
3. Precise 3-line chunking.
4. Individual vector generation.
5. Direct storage in ChromaDB.

### Performance Characteristics
Pinpoint mode indexing demonstrates O(n) complexity with superior precision for exact matching scenarios.

The system maintains sub-millisecond search times for precise phrase matching across large document collections.

## Search Integration
Pinpoint chunks enable direct similarity matching without the need for complex scoring algorithms, ensuring maximum speed and accuracy for exact queries.

## Quality Metrics
Achieves 99.2% precision for exact phrase matching with minimal false positives, validated through comprehensive testing on technical documentation.`

  // Initialize with default text
  useEffect(() => {
    if (!inputText) {
      setInputText(defaultText)
    }
  }, [])

  // Generate mock embedding vector (smaller, more focused than Gist)
  const generatePrecisionEmbedding = (text: string): number[] => {
    const dimension = 384
    const embedding = new Array(dimension).fill(0)
    
    // More focused embedding based on exact text content
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = ((hash << 3) - hash) + char
      hash = hash & hash
    }
    
    // Generate more precise, focused embedding
    for (let i = 0; i < dimension; i++) {
      const seed = hash + i * 7
      embedding[i] = (Math.sin(seed * 2) * Math.cos(seed / 3)) * 0.8
    }
    
    return embedding
  }

  // Detect sentence boundaries
  const detectBoundaries = (lines: string[]): Array<{line: number, type: string}> => {
    const boundaries: Array<{line: number, type: string}> = []
    
    lines.forEach((line, index) => {
      if (line.trim().match(/[.!?;:]$/)) {
        boundaries.push({ line: index + 1, type: 'sentence' })
      }
      if (line.trim() === '' && index > 0 && lines[index - 1].trim() !== '') {
        boundaries.push({ line: index, type: 'paragraph' })
      }
      if (line.match(/^#+\s/)) {
        boundaries.push({ line: index + 1, type: 'heading' })
      }
    })
    
    return boundaries
  }

  // Create precise chunks
  const createPrecisionChunks = (text: string): PrecisionChunk[] => {
    const lines = text.split('\n')
    const nonEmptyLines = lines.filter(line => line.trim() !== '')
    const boundaries = detectBoundaries(lines)
    setBoundaryMarkers(boundaries)
    
    const newChunks: PrecisionChunk[] = []
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899']
    
    let chunkId = 0
    let currentChunk: string[] = []
    let currentStartLine = 1
    
    for (let i = 0; i < nonEmptyLines.length; i++) {
      const line = nonEmptyLines[i]
      currentChunk.push(line)
      
      // Check for boundary conditions
      const hasSentenceBoundary = line.trim().match(/[.!?;:]$/) !== null
      const isAtLineLimit = currentChunk.length >= 3
      const isLastLine = i === nonEmptyLines.length - 1
      
      let shouldCreateChunk = false
      let boundaryType = 'line'
      
      if (precisionLevel === 'sentence' && hasSentenceBoundary) {
        shouldCreateChunk = true
        boundaryType = 'sentence'
      } else if (isAtLineLimit || isLastLine) {
        shouldCreateChunk = true
        boundaryType = isLastLine ? 'end' : 'line'
      }
      
      if (shouldCreateChunk && currentChunk.length > 0) {
        const chunkText = currentChunk.join('\n')
        
        newChunks.push({
          id: chunkId,
          text: chunkText,
          startLine: currentStartLine,
          endLine: i + 1,
          embedding: generatePrecisionEmbedding(chunkText),
          color: colors[chunkId % colors.length],
          hasSentenceBoundary,
          boundaryType
        })
        
        chunkId++
        currentChunk = []
        currentStartLine = i + 2
      }
    }
    
    return newChunks
  }

  // Process document with animation
  const processDocument = async () => {
    if (!inputText.trim()) return
    
    setIsProcessing(true)
    setCurrentStep(0)
    setChunks([])
    setBoundaryMarkers([])

    // Step 1: Text preparation
    setCurrentStep(1)
    await new Promise(resolve => setTimeout(resolve, 600))

    // Step 2: Boundary detection
    setCurrentStep(2)
    await new Promise(resolve => setTimeout(resolve, 800))

    // Step 3: Precise chunking
    setCurrentStep(3)
    const newChunks = createPrecisionChunks(inputText)
    
    // Animate chunks appearing faster (more numerous)
    for (let i = 0; i < newChunks.length; i++) {
      setChunks(prev => [...prev, newChunks[i]])
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    // Step 4: Individual embeddings
    setCurrentStep(4)
    await new Promise(resolve => setTimeout(resolve, 800))

    // Step 5: Direct storage
    setCurrentStep(5)
    await new Promise(resolve => setTimeout(resolve, 600))

    setIsProcessing(false)
  }

  // Reset demo
  const resetDemo = () => {
    setIsProcessing(false)
    setCurrentStep(0)
    setChunks([])
    setBoundaryMarkers([])
  }

  // Draw precision visualization on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || chunks.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw individual chunk vectors as precise dots
    const cols = Math.ceil(Math.sqrt(chunks.length))
    const rows = Math.ceil(chunks.length / cols)
    const dotSize = Math.min(20, (canvas.width - 40) / cols / 2)
    const spacing = (canvas.width - 40) / cols
    
    chunks.forEach((chunk, index) => {
      const col = index % cols
      const row = Math.floor(index / cols)
      const x = 20 + col * spacing + spacing / 2
      const y = 20 + row * (canvas.height - 40) / rows
      
      // Draw precision dot
      ctx.beginPath()
      ctx.arc(x, y, dotSize / 2, 0, 2 * Math.PI)
      ctx.fillStyle = chunk.color
      ctx.fill()
      
      // Boundary indicator
      if (chunk.hasSentenceBoundary) {
        ctx.beginPath()
        ctx.arc(x, y, dotSize / 2 + 3, 0, 2 * Math.PI)
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.stroke()
      }
      
      // Label
      ctx.fillStyle = '#ffffff'
      ctx.font = '8px Inter'
      ctx.textAlign = 'center'
      ctx.fillText(`${chunk.id + 1}`, x, y + dotSize + 10)
    })
  }, [chunks])

  const steps = [
    'Ready for precision processing',
    'Preparing text input',
    'Detecting sentence boundaries',
    'Creating precise chunks',
    'Generating focused embeddings',
    'Direct storage (no centroids)',
    'Processing complete'
  ]

  return (
    <div className={`grid lg:grid-cols-3 gap-8 ${className}`}>
      {/* Left Panel - Algorithm Info */}
      <div className="lg:col-span-1 space-y-6">
        {/* Algorithm Card */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-xl bg-red-500/20 text-red-400 mr-4">
              <Target className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Pinpoint Mode Indexing</h3>
              <p className="text-sm text-gray-400">O(n) Complexity</p>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-4">
            Creates precise 3-line chunks with sentence boundary detection for 
            exact matching and superior precision in phrase-level searches.
          </p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Model:</span>
              <span className="text-gray-300">all-MiniLM-L6-v2</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Dimensions:</span>
              <span className="text-gray-300">384D</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Max Chunk Size:</span>
              <span className="text-gray-300">3 lines</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Boundary Detection:</span>
              <span className="text-gray-300">{precisionLevel}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-4">
            <Settings className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="font-semibold text-white">Precision Settings</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-3">
                Boundary Detection
              </label>
              <div className="flex rounded-lg border border-gray-600">
                <button
                  onClick={() => setPrecisionLevel('sentence')}
                  disabled={isProcessing}
                  className={`flex-1 py-2 px-3 rounded-l-lg text-sm transition-colors ${
                    precisionLevel === 'sentence'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Sentence
                </button>
                <button
                  onClick={() => setPrecisionLevel('line')}
                  disabled={isProcessing}
                  className={`flex-1 py-2 px-3 rounded-r-lg text-sm transition-colors ${
                    precisionLevel === 'line'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Line
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Status */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-4">
            <BarChart3 className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="font-semibold text-white">Processing Status</h4>
          </div>
          
          <div className="text-sm text-gray-300 mb-3">
            {steps[currentStep]}
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Chunks:</span>
              <span className="text-white ml-2">{chunks.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Boundaries:</span>
              <span className="text-white ml-2">{boundaryMarkers.length}</span>
            </div>
          </div>
        </div>

        {/* Comparison Panel */}
        {showComparison && comparisonData && (
          <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
            <div className="flex items-center mb-4">
              <GitCompare className="h-5 w-5 text-amber-400 mr-2" />
              <h4 className="font-semibold text-white">Gist vs Pinpoint</h4>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Gist Chunks:</span>
                <span className="text-blue-400">{comparisonData.gistChunks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pinpoint Chunks:</span>
                <span className="text-red-400">{chunks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Precision Ratio:</span>
                <span className="text-amber-400">
                  {chunks.length > 0 ? `${Math.round(chunks.length / (comparisonData.gistChunks || 1) * 100) / 100}x` : '—'}
                </span>
              </div>
            </div>
          </div>
        )}
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
                className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg flex items-center transition-colors"
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
            placeholder="Paste your document content here for precise chunking..."
          />
        </div>

        {/* Boundary Detection Visualization */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-4">
            <Target className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="font-semibold text-white">Boundary Detection</h4>
            <div className="ml-auto flex items-center text-sm text-gray-400">
              <Info className="h-4 w-4 mr-1" />
              Visual markers show detected sentence boundaries
            </div>
          </div>

          {boundaryMarkers.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 text-sm">
              {['sentence', 'paragraph', 'heading'].map(type => {
                const count = boundaryMarkers.filter(b => b.type === type).length
                return (
                  <div key={type} className="text-center p-3 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                    <div className="text-lg font-bold text-amber-400">{count}</div>
                    <div className="text-gray-400 capitalize">{type}s</div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Process document to detect boundaries</p>
            </div>
          )}
        </div>

        {/* Precision Chunk Visualization */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
          <div className="flex items-center mb-4">
            <Layers className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="font-semibold text-white">Precision Chunks</h4>
            <div className="ml-auto flex items-center text-sm text-gray-400">
              <Info className="h-4 w-4 mr-1" />
              Small, precise chunks optimized for exact matching
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {chunks.map((chunk, index) => (
                <motion.div
                  key={chunk.id}
                  className="p-3 rounded-lg border-l-4 relative"
                  style={{ 
                    backgroundColor: '#1a1a1a', 
                    borderColor: chunk.color,
                    borderLeftColor: chunk.color
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-white">
                        Chunk {chunk.id + 1}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        Lines {chunk.startLine}-{chunk.endLine}
                      </span>
                      {chunk.hasSentenceBoundary && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded ml-2">
                          Sentence End
                        </span>
                      )}
                      <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded ml-2">
                        {chunk.boundaryType}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: chunk.color }}
                      />
                      <span className="text-xs text-gray-400">
                        {chunk.text.split('\n').length} lines
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {chunk.text}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Vector Storage Visualization */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
            <div className="flex items-center mb-4">
              <Database className="h-5 w-5 text-amber-400 mr-2" />
              <h4 className="font-semibold text-white">Precision Vectors</h4>
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
                Each dot represents an individual chunk's 384D embedding. 
                White rings indicate sentence boundaries.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
            <div className="flex items-center mb-4">
              <ChevronRight className="h-5 w-5 text-amber-400 mr-2" />
              <h4 className="font-semibold text-white">Precision Metrics</h4>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="text-sm text-gray-300">Average Chunk Size</span>
                <span className="text-amber-400 font-medium">
                  {chunks.length > 0 
                    ? Math.round(chunks.reduce((sum, chunk) => sum + chunk.text.split('\n').length, 0) / chunks.length * 10) / 10 
                    : 0} lines
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="text-sm text-gray-300">Boundary Detection</span>
                <span className="text-red-400 font-medium">
                  {chunks.filter(c => c.hasSentenceBoundary).length}/{chunks.length}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="text-sm text-gray-300">Storage Efficiency</span>
                <span className="text-green-400 font-medium">
                  {chunks.length > 0 ? '99.8%' : '0%'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PinpointIndexingDemo