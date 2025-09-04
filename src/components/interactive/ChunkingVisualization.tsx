import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FileText,
  Brain,
  Target,
  Layers,
  Info,
  BarChart3
} from 'lucide-react'

interface ChunkData {
  id: number
  text: string
  startLine: number
  endLine: number
  mode: 'gist' | 'pinpoint'
  overlap?: boolean
}

interface ChunkingVisualizationProps {
  mode?: 'gist' | 'pinpoint' | 'comparison'
  className?: string
}

const ChunkingVisualization: React.FC<ChunkingVisualizationProps> = ({ 
  mode = 'comparison', 
  className = '' 
}) => {
  const [selectedMode, setSelectedMode] = useState<'gist' | 'pinpoint'>('gist')
  const [inputText, setInputText] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentChunk, setCurrentChunk] = useState<number>(-1)
  const [showComparison] = useState(mode === 'comparison')

  // Default sample text
  const defaultText = `# FileHawk Documentation

## Overview
FileHawk is an advanced local semantic file search tool that leverages cutting-edge AI models to understand and index your documents with unprecedented accuracy.

## Core Features
The platform implements a dual-mode search architecture:

### Gist Mode
Gist mode is designed for conceptual and thematic searches. It creates larger context windows that preserve the semantic relationships between ideas and concepts.

This mode excels at finding documents based on topics, themes, and conceptual similarity rather than exact text matches.

### Pinpoint Mode  
Pinpoint mode focuses on precision and exact matching. It creates smaller, more focused chunks that are optimized for finding specific phrases, code snippets, or technical terms.

The algorithm uses sentence boundary detection to create meaningful segments that maintain readability while maximizing search precision.

## Technical Implementation
Both modes utilize transformer-based embedding models to convert text into high-dimensional vector representations.

The embedding process transforms human language into mathematical vectors that capture semantic meaning and relationships.

## Search Algorithms
FileHawk implements sophisticated ranking algorithms that combine multiple similarity metrics to deliver relevant results.

The system uses holistic scoring that considers chunk similarity, file-level context, and term frequency analysis.

## Performance Optimization
Real-time indexing ensures that your search results are always current and comprehensive.

File system monitoring detects changes automatically and updates the index incrementally for optimal performance.`

  // Initialize with default text
  useEffect(() => {
    if (!inputText) {
      setInputText(defaultText)
    }
  }, [])

  // Generate chunks based on mode
  const generateChunks = (text: string, mode: 'gist' | 'pinpoint'): ChunkData[] => {
    const lines = text.split('\n').filter(line => line.trim() !== '')
    const chunks: ChunkData[] = []
    
    if (mode === 'gist') {
      const chunkSize = 35
      const overlap = 5
      let chunkId = 0
      
      for (let i = 0; i < lines.length; i += (chunkSize - overlap)) {
        const endIndex = Math.min(i + chunkSize, lines.length)
        const chunkLines = lines.slice(i, endIndex)
        
        chunks.push({
          id: chunkId++,
          text: chunkLines.join('\n'),
          startLine: i + 1,
          endLine: endIndex,
          mode: 'gist',
          overlap: i > 0 // First chunk has no overlap
        })
        
        if (endIndex >= lines.length) break
      }
    } else {
      // Pinpoint mode - 3-line chunks with sentence boundaries
      const chunkSize = 3
      let chunkId = 0
      let currentChunk: string[] = []
      let currentStartLine = 1
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        currentChunk.push(line)
        
        // Check for sentence boundary or chunk size limit
        const hasSentenceEnd = line.trim().match(/[.!?;:]$/)
        
        if (hasSentenceEnd || currentChunk.length >= chunkSize) {
          if (currentChunk.length > 0) {
            chunks.push({
              id: chunkId++,
              text: currentChunk.join('\n'),
              startLine: currentStartLine,
              endLine: i + 1,
              mode: 'pinpoint'
            })
          }
          
          currentChunk = []
          currentStartLine = i + 2
        }
      }
      
      // Add remaining chunk if any
      if (currentChunk.length > 0) {
        chunks.push({
          id: chunkId++,
          text: currentChunk.join('\n'),
          startLine: currentStartLine,
          endLine: lines.length,
          mode: 'pinpoint'
        })
      }
    }
    
    return chunks
  }

  const gistChunks = useMemo(() => generateChunks(inputText, 'gist'), [inputText])
  const pinpointChunks = useMemo(() => generateChunks(inputText, 'pinpoint'), [inputText])
  
  const currentChunks = selectedMode === 'gist' ? gistChunks : pinpointChunks

  // Animation control
  const startAnimation = () => {
    setIsAnimating(true)
    setCurrentChunk(0)
  }

  const stopAnimation = () => {
    setIsAnimating(false)
    setCurrentChunk(-1)
  }

  const resetAnimation = () => {
    setIsAnimating(false)
    setCurrentChunk(-1)
  }

  // Auto-advance animation
  useEffect(() => {
    if (isAnimating && currentChunk < currentChunks.length - 1) {
      const timer = setTimeout(() => {
        setCurrentChunk(prev => prev + 1)
      }, 2000) // 2 seconds per chunk
      
      return () => clearTimeout(timer)
    } else if (isAnimating && currentChunk >= currentChunks.length - 1) {
      // Animation finished
      setTimeout(() => {
        setIsAnimating(false)
        setCurrentChunk(-1)
      }, 2000)
    }
  }, [isAnimating, currentChunk, currentChunks.length])

  const getChunkColor = (chunkIndex: number, mode: 'gist' | 'pinpoint') => {
    if (mode === 'gist') {
      const colors = ['bg-blue-500/20', 'bg-indigo-500/20', 'bg-purple-500/20', 'bg-pink-500/20']
      return colors[chunkIndex % colors.length]
    } else {
      const colors = ['bg-red-500/20', 'bg-orange-500/20', 'bg-yellow-500/20', 'bg-green-500/20']
      return colors[chunkIndex % colors.length]
    }
  }

  const getBorderColor = (chunkIndex: number, mode: 'gist' | 'pinpoint') => {
    if (mode === 'gist') {
      const colors = ['border-blue-500', 'border-indigo-500', 'border-purple-500', 'border-pink-500']
      return colors[chunkIndex % colors.length]
    } else {
      const colors = ['border-red-500', 'border-orange-500', 'border-yellow-500', 'border-green-500']
      return colors[chunkIndex % colors.length]
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with mode toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
            Text Chunking Visualization
          </h3>
          <p style={{ color: 'var(--fg-secondary)' }}>
            See how FileHawk splits text into chunks for different search modes
          </p>
        </div>
        
        <div className="flex items-center gap-3">
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
                Gist Mode
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
                Pinpoint Mode
              </button>
            </div>
          )}
          
          <div className="flex gap-2">
            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className="p-2 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 hover:bg-brand-gold-500/30 transition-colors disabled:opacity-50"
            >
              <Play className="h-4 w-4" />
            </button>
            <button
              onClick={stopAnimation}
              disabled={!isAnimating}
              className="p-2 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 hover:bg-brand-gold-500/30 transition-colors disabled:opacity-50"
            >
              <Pause className="h-4 w-4" />
            </button>
            <button
              onClick={resetAnimation}
              className="p-2 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 hover:bg-brand-gold-500/30 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center mb-4">
          <FileText className="h-5 w-5 text-brand-gold-400 mr-2" />
          <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
            Sample Text Input
          </h4>
        </div>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full h-32 p-3 rounded-lg border font-mono text-sm resize-none"
          style={{ 
            backgroundColor: 'var(--bg-muted)', 
            borderColor: 'var(--border-subtle)',
            color: 'var(--fg-primary)'
          }}
          placeholder="Paste your text here to see how it gets chunked..."
        />
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-sm" style={{ color: 'var(--fg-muted)' }}>
            <Info className="h-4 w-4 mr-1" />
            {inputText.split('\n').filter(l => l.trim()).length} lines of text
          </div>
          
          <button
            onClick={() => setInputText(defaultText)}
            className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-700/50 transition-colors"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--fg-secondary)' }}
          >
            Reset to Default
          </button>
        </div>
      </div>

      {/* Chunking Configuration */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-4">
            <Brain className="h-5 w-5 text-blue-400 mr-2" />
            <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
              Gist Mode Configuration
            </h4>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span style={{ color: 'var(--fg-muted)' }}>Chunk Size:</span>
              <span style={{ color: 'var(--fg-primary)' }}>35 lines</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--fg-muted)' }}>Overlap:</span>
              <span style={{ color: 'var(--fg-primary)' }}>5 lines</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--fg-muted)' }}>Generated Chunks:</span>
              <span className="text-blue-400 font-medium">{gistChunks.length}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--fg-muted)' }}>Model:</span>
              <span className="font-mono text-xs" style={{ color: 'var(--fg-primary)' }}>msmarco-MiniLM-L6</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-4">
            <Target className="h-5 w-5 text-red-400 mr-2" />
            <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
              Pinpoint Mode Configuration
            </h4>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span style={{ color: 'var(--fg-muted)' }}>Chunk Size:</span>
              <span style={{ color: 'var(--fg-primary)' }}>3 lines (max)</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--fg-muted)' }}>Boundaries:</span>
              <span style={{ color: 'var(--fg-primary)' }}>Sentence endings</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--fg-muted)' }}>Generated Chunks:</span>
              <span className="text-red-400 font-medium">{pinpointChunks.length}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--fg-muted)' }}>Model:</span>
              <span className="font-mono text-xs" style={{ color: 'var(--fg-primary)' }}>all-MiniLM-L6-v2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Layers className="h-5 w-5 text-brand-gold-400 mr-2" />
            <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
              {selectedMode === 'gist' ? 'Gist Mode' : 'Pinpoint Mode'} Chunking Result
            </h4>
          </div>
          
          <div className="flex items-center text-sm" style={{ color: 'var(--fg-muted)' }}>
            {currentChunk >= 0 && (
              <span>
                Chunk {currentChunk + 1} of {currentChunks.length}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {currentChunks.map((chunk, index) => (
              <motion.div
                key={`${selectedMode}-${chunk.id}`}
                className={`p-4 rounded-lg border-2 ${getChunkColor(index, selectedMode)} ${
                  currentChunk === index ? getBorderColor(index, selectedMode) : 'border-transparent'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: currentChunk === -1 ? 1 : currentChunk >= index ? 1 : 0.3,
                  y: 0,
                  scale: currentChunk === index ? 1.02 : 1
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full ${
                      selectedMode === 'gist' ? 'bg-blue-500' : 'bg-red-500'
                    } text-white text-xs flex items-center justify-center font-medium mr-3`}>
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--fg-primary)' }}>
                      Lines {chunk.startLine}-{chunk.endLine}
                    </span>
                    {chunk.overlap && (
                      <span className="ml-2 px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
                        Overlap
                      </span>
                    )}
                  </div>
                  
                  <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                    {chunk.text.split('\n').length} lines
                  </div>
                </div>
                
                <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto" 
                     style={{ color: 'var(--fg-secondary)' }}>
                  {chunk.text}
                </pre>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Statistics and Insights */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center mb-4">
          <BarChart3 className="h-5 w-5 text-brand-gold-400 mr-2" />
          <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
            Chunking Analysis
          </h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">{gistChunks.length}</div>
            <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>Gist Chunks</div>
            <div className="text-xs mt-1" style={{ color: 'var(--fg-secondary)' }}>
              Context-preserving
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">{pinpointChunks.length}</div>
            <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>Pinpoint Chunks</div>
            <div className="text-xs mt-1" style={{ color: 'var(--fg-secondary)' }}>
              Precision-focused
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-gold-400 mb-1">
              {Math.round((gistChunks.length / pinpointChunks.length) * 100) / 100}x
            </div>
            <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>Chunk Ratio</div>
            <div className="text-xs mt-1" style={{ color: 'var(--fg-secondary)' }}>
              Gist vs Pinpoint
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {inputText.split('\n').filter(l => l.trim()).length}
            </div>
            <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>Total Lines</div>
            <div className="text-xs mt-1" style={{ color: 'var(--fg-secondary)' }}>
              Input text
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChunkingVisualization