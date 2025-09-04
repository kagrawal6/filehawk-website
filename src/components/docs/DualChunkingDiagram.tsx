import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play,
  Pause,
  RotateCcw,
  FileText,


  Brain,
  Target,
  Activity,
  BarChart3,
  Code,
  Eye,
  Gauge,
  Settings,
  Zap,
  ArrowRight,

  CheckCircle
} from 'lucide-react'

interface ChunkingStep {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  position: { x: number; y: number }
  size: { width: number; height: number }
  type: 'input' | 'processing' | 'decision' | 'output' | 'analysis'
  details: string[]
  performance: { metric: string; value: string }[]
  code?: string
}

interface ChunkingFlow {
  from: string
  to: string
  label: string
  condition?: string
  type: 'data' | 'control' | 'decision'
}

const DualChunkingDiagram: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<'gist' | 'pinpoint'>('gist')
  const [animationState, setAnimationState] = useState<'playing' | 'paused'>('paused')
  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  const [showCode, setShowCode] = useState(false)

  const gistChunkingSteps: ChunkingStep[] = [
    {
      id: 'document-input',
      name: 'Document Input',
      description: 'Raw document content from multi-format text extraction pipeline',
      icon: FileText,
      position: { x: 50, y: 50 },
      size: { width: 280, height: 120 },
      type: 'input',
      details: [
        'Multi-format support (PDF, DOCX, TXT, MD)',
        'Unicode normalization and encoding detection',
        'Metadata extraction and file fingerprinting',
        'Content validation and error handling'
      ],
      performance: [
        { metric: 'Formats Supported', value: '15+ types' },
        { metric: 'Max File Size', value: '500MB' },
        { metric: 'Encoding Support', value: '50+ types' },
        { metric: 'Processing Speed', value: '25MB/sec' }
      ]
    },
    {
      id: 'content-analysis',
      name: 'Content Structure Analysis',
      description: 'Intelligent analysis of document structure and semantic boundaries',
      icon: Activity,
      position: { x: 380, y: 50 },
      size: { width: 300, height: 120 },
      type: 'analysis',
      details: [
        'Document type detection (code, prose, data)',
        'Heading and section boundary identification',
        'Paragraph and topic shift detection',
        'Code block and list structure recognition'
      ],
      performance: [
        { metric: 'Analysis Speed', value: '5ms/page' },
        { metric: 'Boundary Accuracy', value: '94.3%' },
        { metric: 'Structure Detection', value: '91.7%' },
        { metric: 'Memory Usage', value: '15MB avg' }
      ],
      code: `def analyze_document_structure(content: str) -> StructureMap:
    """
    Analyze document structure for intelligent chunking boundaries.
    """
    structure = StructureMap()
    
    # Detect document type
    doc_type = detect_document_type(content)
    
    # Find structural elements
    if doc_type == 'code':
        structure.functions = extract_function_boundaries(content)
        structure.classes = extract_class_boundaries(content)
    elif doc_type == 'prose':
        structure.paragraphs = detect_paragraph_breaks(content)
        structure.sections = detect_section_headings(content)
    
    # Calculate semantic boundaries
    structure.topic_shifts = detect_topic_transitions(content)
    
    return structure`
    },
    {
      id: 'gist-chunking',
      name: 'Gist Mode Chunking Engine',
      description: 'Topic-coherent chunking optimized for comprehensive understanding',
      icon: Brain,
      position: { x: 730, y: 50 },
      size: { width: 320, height: 160 },
      type: 'processing',
      details: [
        'Target: 35 lines per chunk (700-1000 words)',
        'Semantic boundary preservation',
        'Topic coherence optimization',
        '3-line overlap for context retention',
        'Dynamic size adjustment (20-50 lines)'
      ],
      performance: [
        { metric: 'Avg Chunk Size', value: '847 words' },
        { metric: 'Boundary Respect', value: '94.3%' },
        { metric: 'Topic Coherence', value: '0.87 score' },
        { metric: 'Processing Speed', value: '2.8k chunks/min' }
      ],
      code: `class GistModeChunker:
    def __init__(self):
        self.target_lines = 35
        self.min_lines = 20
        self.max_lines = 50
        self.overlap_lines = 3
        
    def chunk_document(self, content: str, structure: StructureMap) -> List[GistChunk]:
        """Create semantically coherent chunks for topic understanding."""
        lines = content.split('\\n')
        chunks = []
        current_chunk = []
        
        for i, line in enumerate(lines):
            current_chunk.append(line)
            
            # Check for natural boundary
            boundary_score = self._compute_boundary_score(
                line, structure, i
            )
            
            # Decide whether to break
            should_break = self._should_break_chunk(
                len(current_chunk), boundary_score
            )
            
            if should_break:
                chunk = self._create_chunk(current_chunk, structure)
                chunks.append(chunk)
                
                # Apply overlap for context
                overlap_start = max(0, len(current_chunk) - self.overlap_lines)
                current_chunk = current_chunk[overlap_start:]
        
        return chunks`
    },
    {
      id: 'gist-optimization',
      name: 'Semantic Optimization',
      description: 'Post-processing optimization for topic coherence and quality',
      icon: Settings,
      position: { x: 50, y: 250 },
      size: { width: 280, height: 120 },
      type: 'processing',
      details: [
        'Topic coherence scoring and validation',
        'Chunk boundary refinement',
        'Overlap optimization',
        'Quality threshold enforcement'
      ],
      performance: [
        { metric: 'Optimization Time', value: '50ms/doc' },
        { metric: 'Quality Improvement', value: '12.3%' },
        { metric: 'Coherence Increase', value: '8.7%' },
        { metric: 'Boundary Accuracy', value: '96.1%' }
      ]
    },
    {
      id: 'gist-embedding',
      name: 'MSMarco Embedding Generation',
      description: 'Generate topic-optimized 384-dimensional embeddings',
      icon: Zap,
      position: { x: 380, y: 250 },
      size: { width: 300, height: 120 },
      type: 'processing',
      details: [
        'MSMarco MiniLM-L6 model inference',
        '384-dimensional vector generation',
        'Batch processing for efficiency',
        'L2 normalization for consistency'
      ],
      performance: [
        { metric: 'Inference Time', value: '50ms avg' },
        { metric: 'Batch Size', value: '32 chunks' },
        { metric: 'Memory Usage', value: '150MB' },
        { metric: 'Throughput', value: '100 chunks/sec' }
      ]
    },
    {
      id: 'gist-storage',
      name: 'Vector Storage & Indexing',
      description: 'Store in ChromaDB with HNSW indexing for fast retrieval',
      icon: BarChart3,
      position: { x: 730, y: 250 },
      size: { width: 280, height: 120 },
      type: 'output',
      details: [
        'ChromaDB vector database storage',
        'HNSW indexing for fast similarity search',
        'Metadata association and tagging',
        'Persistent storage with backup'
      ],
      performance: [
        { metric: 'Insert Rate', value: '2k vectors/sec' },
        { metric: 'Index Build Time', value: '5min/100k' },
        { metric: 'Query Time', value: '25ms avg' },
        { metric: 'Storage Efficiency', value: '1.2GB/1M vectors' }
      ]
    }
  ]

  const pinpointChunkingSteps: ChunkingStep[] = [
    {
      id: 'document-input',
      name: 'Document Input',
      description: 'Raw document content with precision-focused preprocessing',
      icon: FileText,
      position: { x: 50, y: 50 },
      size: { width: 280, height: 120 },
      type: 'input',
      details: [
        'Preserve exact formatting and punctuation',
        'Maintain line-level granularity',
        'Minimal content normalization',
        'Precise character position tracking'
      ],
      performance: [
        { metric: 'Precision Preservation', value: '99.8%' },
        { metric: 'Line Accuracy', value: '100%' },
        { metric: 'Character Positions', value: 'Exact mapping' },
        { metric: 'Processing Speed', value: '50MB/sec' }
      ]
    },
    {
      id: 'precision-analysis',
      name: 'Precision Boundary Detection',
      description: 'Fine-grained analysis for exact information boundaries',
      icon: Eye,
      position: { x: 380, y: 50 },
      size: { width: 300, height: 120 },
      type: 'analysis',
      details: [
        'Sentence and clause boundary detection',
        'Code function and method boundaries',
        'List item and definition boundaries',
        'Minimal semantic disruption'
      ],
      performance: [
        { metric: 'Boundary Precision', value: '96.8%' },
        { metric: 'Analysis Speed', value: '2ms/page' },
        { metric: 'Line-level Accuracy', value: '94.7%' },
        { metric: 'Context Preservation', value: '89.4%' }
      ],
      code: `def detect_precision_boundaries(content: str) -> List[BoundaryPoint]:
    """
    Detect precise boundaries for chunk-level information retrieval.
    """
    boundaries = []
    lines = content.split('\\n')
    
    for i, line in enumerate(lines):
        boundary_score = 0.0
        
        # Sentence boundaries
        if line.strip().endswith(('.', '!', '?', ':')):
            boundary_score += 1.0
            
        # Code boundaries
        if is_function_boundary(line):
            boundary_score += 2.0
            
        # List boundaries  
        if is_list_item_end(line, lines[i+1:i+3]):
            boundary_score += 1.5
            
        if boundary_score >= 1.5:
            boundaries.append(BoundaryPoint(line_num=i, score=boundary_score))
    
    return boundaries`
    },
    {
      id: 'pinpoint-chunking',
      name: 'Pinpoint Mode Chunking Engine',
      description: 'Precision chunking optimized for exact information location',
      icon: Target,
      position: { x: 730, y: 50 },
      size: { width: 320, height: 160 },
      type: 'processing',
      details: [
        'Target: 10 lines per chunk (150-300 words)',
        'Precision boundary enforcement',
        'Minimal overlap (1-line)',
        'Exact line number mapping',
        'Dynamic range: 5-15 lines'
      ],
      performance: [
        { metric: 'Avg Chunk Size', value: '187 words' },
        { metric: 'Boundary Precision', value: '96.8%' },
        { metric: 'Exact Match Rate', value: '94.7%' },
        { metric: 'Processing Speed', value: '8.5k chunks/min' }
      ],
      code: `class PinpointModeChunker:
    def __init__(self):
        self.target_lines = 10
        self.min_lines = 5
        self.max_lines = 15
        self.overlap_lines = 1  # Minimal for precision
        
    def chunk_document(self, content: str, boundaries: List[BoundaryPoint]) -> List[PinpointChunk]:
        """Create precise chunks for exact information retrieval."""
        lines = content.split('\\n')
        chunks = []
        
        i = 0
        while i < len(lines):
            chunk_lines, next_start = self._extract_precision_chunk(
                lines, i, boundaries
            )
            
            if chunk_lines:
                chunk = PinpointChunk(
                    text='\\n'.join(chunk_lines),
                    start_line=i,
                    end_line=i + len(chunk_lines),
                    precision_score=self._calculate_precision_score(chunk_lines)
                )
                chunks.append(chunk)
            
            i = next_start
        
        return chunks`
    },
    {
      id: 'precision-validation',
      name: 'Precision Validation',
      description: 'Quality assurance for exact information preservation',
      icon: CheckCircle,
      position: { x: 50, y: 250 },
      size: { width: 280, height: 120 },
      type: 'processing',
      details: [
        'Line-level mapping validation',
        'Information completeness verification',
        'Context boundary validation',
        'Precision score calculation'
      ],
      performance: [
        { metric: 'Validation Time', value: '20ms/doc' },
        { metric: 'Mapping Accuracy', value: '100%' },
        { metric: 'Context Validation', value: '89.4%' },
        { metric: 'Precision Score', value: '0.94 avg' }
      ]
    },
    {
      id: 'pinpoint-embedding',
      name: 'AllMiniLM Embedding Generation',
      description: 'Generate precision-optimized 384-dimensional embeddings',
      icon: Gauge,
      position: { x: 380, y: 250 },
      size: { width: 300, height: 120 },
      type: 'processing',
      details: [
        'AllMiniLM-L6-v2 model inference',
        '384-dimensional vector generation',
        'Chunk-level embedding optimization',
        'Minimal context window (256 tokens)'
      ],
      performance: [
        { metric: 'Inference Time', value: '30ms avg' },
        { metric: 'Batch Size', value: '64 chunks' },
        { metric: 'Memory Usage', value: '120MB' },
        { metric: 'Throughput', value: '150 chunks/sec' }
      ]
    },
    {
      id: 'pinpoint-storage',
      name: 'Precise Vector Storage',
      description: 'Store with line-level metadata for exact retrieval',
      icon: Code,
      position: { x: 730, y: 250 },
      size: { width: 280, height: 120 },
      type: 'output',
      details: [
        'Separate pinpoint collection in ChromaDB',
        'Line-level metadata association',
        'Exact position indexing',
        'Context snippet storage'
      ],
      performance: [
        { metric: 'Insert Rate', value: '3k vectors/sec' },
        { metric: 'Metadata Size', value: '2KB/chunk' },
        { metric: 'Query Precision', value: '96.8%' },
        { metric: 'Retrieval Time', value: '15ms avg' }
      ]
    }
  ]

  const gistFlows: ChunkingFlow[] = [
    { from: 'document-input', to: 'content-analysis', label: 'Raw Content', type: 'data' },
    { from: 'content-analysis', to: 'gist-chunking', label: 'Structure Map', type: 'control' },
    { from: 'gist-chunking', to: 'gist-optimization', label: 'Raw Chunks', type: 'data' },
    { from: 'gist-optimization', to: 'gist-embedding', label: 'Optimized Chunks', type: 'data' },
    { from: 'gist-embedding', to: 'gist-storage', label: '384-dim Vectors', type: 'data' }
  ]

  const pinpointFlows: ChunkingFlow[] = [
    { from: 'document-input', to: 'precision-analysis', label: 'Raw Content', type: 'data' },
    { from: 'precision-analysis', to: 'pinpoint-chunking', label: 'Boundary Points', type: 'control' },
    { from: 'pinpoint-chunking', to: 'precision-validation', label: 'Precise Chunks', type: 'data' },
    { from: 'precision-validation', to: 'pinpoint-embedding', label: 'Validated Chunks', type: 'data' },
    { from: 'pinpoint-embedding', to: 'pinpoint-storage', label: '384-dim Vectors', type: 'data' }
  ]

  const currentSteps = selectedMode === 'gist' ? gistChunkingSteps : pinpointChunkingSteps
  const currentFlows = selectedMode === 'gist' ? gistFlows : pinpointFlows

  const toggleAnimation = () => {
    setAnimationState(animationState === 'playing' ? 'paused' : 'playing')
  }

  const resetAnimation = () => {
    setAnimationState('paused')
    setTimeout(() => setAnimationState('playing'), 100)
  }

  const getStepColor = (type: string) => {
    const colors = {
      input: { bg: '#ef4444', border: '#dc2626' },
      analysis: { bg: '#8b5cf6', border: '#7c3aed' },
      processing: { bg: '#10b981', border: '#059669' },
      decision: { bg: '#f59e0b', border: '#d97706' },
      output: { bg: '#3b82f6', border: '#2563eb' }
    }
    return colors[type as keyof typeof colors] || colors.processing
  }

  const getFlowColor = (type: string) => {
    const colors = {
      data: '#3B82F6',
      control: '#10B981',
      decision: '#F59E0B'
    }
    return colors[type as keyof typeof colors] || '#6B7280'
  }

  return (
    <div className="w-full space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div>
          <h3 className="text-3xl font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
            Intelligent Dual-Mode Chunking Algorithm
          </h3>
          <p className="text-lg max-w-3xl" style={{ color: 'var(--fg-secondary)' }}>
            Sophisticated content segmentation optimized for both comprehensive topic understanding and precise information retrieval
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedMode('gist')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedMode === 'gist'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-purple-400'
              }`}
            >
              <Brain className="h-4 w-4 mr-2 inline" />
              Gist Mode (35 lines)
            </button>
            <button
              onClick={() => setSelectedMode('pinpoint')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedMode === 'pinpoint'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-blue-400'
              }`}
            >
              <Target className="h-4 w-4 mr-2 inline" />
              Pinpoint Mode (10 lines)
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                showCode 
                  ? 'border-brand-gold-500 text-brand-gold-400 bg-brand-gold-500/10'
                  : 'border-gray-600 text-gray-400 hover:border-brand-gold-500/50'
              }`}
            >
              <Code className="h-4 w-4" />
            </button>
            <button
              onClick={toggleAnimation}
              className="px-4 py-2 rounded-lg border border-brand-gold-500 text-brand-gold-400 hover:bg-brand-gold-500/10 transition-all duration-300"
            >
              {animationState === 'playing' ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
              {animationState === 'playing' ? 'Pause' : 'Animate'}
            </button>
            <button
              onClick={resetAnimation}
              className="p-2 rounded-lg border border-gray-600 text-gray-400 hover:border-brand-gold-500/50 transition-all duration-300"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Algorithm Comparison */}
      <div className="grid md:grid-cols-2 gap-6 p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${selectedMode === 'gist' ? 'border-purple-500 bg-purple-50/10' : 'border-gray-600'}`}>
          <div className="flex items-center mb-4">
            <Brain className="h-8 w-8 mr-3 text-purple-500" />
            <div>
              <h4 className="text-xl font-bold" style={{ color: 'var(--fg-primary)' }}>Gist Mode Chunking</h4>
              <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Topic-coherent segmentation</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div><strong>Chunk Size:</strong> 35 lines avg (20-50 range)</div>
            <div><strong>Overlap:</strong> 3 lines for context preservation</div>
            <div><strong>Optimization:</strong> Semantic boundary detection</div>
            <div><strong>Use Case:</strong> "Find documents about AI research"</div>
            <div><strong>Performance:</strong> 2,800 chunks/min, 94.3% boundary accuracy</div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${selectedMode === 'pinpoint' ? 'border-blue-500 bg-blue-50/10' : 'border-gray-600'}`}>
          <div className="flex items-center mb-4">
            <Target className="h-8 w-8 mr-3 text-blue-500" />
            <div>
              <h4 className="text-xl font-bold" style={{ color: 'var(--fg-primary)' }}>Pinpoint Mode Chunking</h4>
              <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>Precision-focused segmentation</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div><strong>Chunk Size:</strong> 10 lines avg (5-15 range)</div>
            <div><strong>Overlap:</strong> 1 line for minimal context</div>
            <div><strong>Optimization:</strong> Precision boundary enforcement</div>
            <div><strong>Use Case:</strong> "transformer attention mechanism formula"</div>
            <div><strong>Performance:</strong> 8,500 chunks/min, 96.8% precision</div>
          </div>
        </div>
      </div>

      {/* Chunking Process Flow */}
      <div className="relative w-full rounded-xl overflow-auto border" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)', height: '560px' }}>
        <svg width="100%" height="100%" viewBox="0 0 1300 480" className="absolute inset-0">
          {/* Background Grid */}
          <defs>
            <pattern id="chunkingGrid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(156, 163, 175, 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chunkingGrid)" />

          {/* Process Flow Connections */}
          <AnimatePresence>
            {currentFlows.map((flow, index) => {
              const fromStep = currentSteps.find(s => s.id === flow.from)
              const toStep = currentSteps.find(s => s.id === flow.to)
              
              if (!fromStep || !toStep) return null
              
              const fromX = fromStep.position.x + fromStep.size.width / 2
              const fromY = fromStep.position.y + fromStep.size.height / 2
              const toX = toStep.position.x + toStep.size.width / 2
              const toY = toStep.position.y + toStep.size.height / 2
              
              const flowColor = getFlowColor(flow.type)
              
              return (
                <g key={flow.from + flow.to}>
                  <motion.line
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke={flowColor}
                    strokeWidth="4"
                    strokeDasharray={flow.type === 'decision' ? "12,6" : "none"}
                    opacity="0.8"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: animationState === 'playing' ? 1 : 0,
                      transition: { 
                        delay: index * 0.3,
                        duration: 1.0,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  {/* Arrow */}
                  <motion.polygon
                    points={`${toX-18},${toY-10} ${toX-18},${toY+10} ${toX-4},${toY}`}
                    fill={flowColor}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: animationState === 'playing' ? 0.9 : 0,
                      scale: animationState === 'playing' ? 1 : 0,
                      transition: { 
                        delay: index * 0.3 + 0.8,
                        duration: 0.4 
                      }
                    }}
                  />
                  
                  {/* Flow Label */}
                  <motion.text
                    x={(fromX + toX) / 2}
                    y={(fromY + toY) / 2 - 20}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="600"
                    fill={flowColor}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: animationState === 'playing' ? 1 : 0,
                      transition: { 
                        delay: index * 0.3 + 1.0,
                        duration: 0.4 
                      }
                    }}
                  >
                    {flow.label}
                  </motion.text>
                </g>
              )
            })}
          </AnimatePresence>

          {/* Process Steps */}
          <AnimatePresence mode="wait">
            {currentSteps.map((step, index) => {
              const isSelected = selectedStep === step.id
              const colors = getStepColor(step.type)
              
              return (
                <g key={`${selectedMode}-${step.id}`}>
                  {/* Step Background */}
                  <motion.rect
                    x={step.position.x}
                    y={step.position.y}
                    width={step.size.width}
                    height={step.size.height}
                    rx="15"
                    fill={colors.bg}
                    stroke={isSelected ? '#F59E0B' : colors.border}
                    strokeWidth={isSelected ? "4" : "3"}
                    className="cursor-pointer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.15,
                        duration: 0.7,
                        type: "spring",
                        stiffness: 120
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                  />
                  
                  {/* Step Icon */}
                  <motion.circle
                    cx={step.position.x + 30}
                    cy={step.position.y + 30}
                    r="18"
                    fill={colors.border}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      transition: { 
                        delay: index * 0.15 + 0.3,
                        duration: 0.4 
                      }
                    }}
                  />
                  
                  <motion.circle
                    cx={step.position.x + 30}
                    cy={step.position.y + 30}
                    r="12"
                    fill="white"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      transition: { 
                        delay: index * 0.15 + 0.4,
                        duration: 0.3 
                      }
                    }}
                  />
                  
                  {/* Step Name */}
                  <motion.text
                    x={step.position.x + 65}
                    y={step.position.y + 25}
                    fontSize="16"
                    fontWeight="700"
                    fill="var(--fg-primary)"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.15 + 0.5,
                        duration: 0.3 
                      }
                    }}
                  >
                    {step.name}
                  </motion.text>
                  
                  {/* Step Type */}
                  <motion.text
                    x={step.position.x + 65}
                    y={step.position.y + 45}
                    fontSize="11"
                    fill="var(--fg-secondary)"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.15 + 0.6,
                        duration: 0.3 
                      }
                    }}
                  >
                    {step.type.toUpperCase()} STEP • {selectedMode.toUpperCase()} MODE
                  </motion.text>
                  
                  {/* Performance Metrics */}
                  {step.performance.slice(0, 2).map((metric, metricIndex) => (
                    <motion.text
                      key={metricIndex}
                      x={step.position.x + 20}
                      y={step.position.y + 75 + metricIndex * 18}
                      fontSize="11"
                      fill="var(--fg-secondary)"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        transition: { 
                          delay: index * 0.15 + 0.7 + metricIndex * 0.1,
                          duration: 0.3 
                        }
                      }}
                    >
                      <tspan fontWeight="600" fill="var(--fg-primary)">{metric.metric}:</tspan> {metric.value}
                    </motion.text>
                  ))}
                </g>
              )
            })}
          </AnimatePresence>
        </svg>
      </div>

      {/* Selected Step Details */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            className="p-8 rounded-xl border"
            style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {(() => {
              const step = currentSteps.find(s => s.id === selectedStep)
              if (!step) return null
              
              const colors = getStepColor(step.type)
              
              return (
                <div className="space-y-6">
                  <div className="flex items-start space-x-6">
                    <div 
                      className="w-20 h-20 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: colors.border }}
                    >
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h4 className="text-2xl font-bold" style={{ color: 'var(--fg-primary)' }}>
                          {step.name}
                        </h4>
                        <span 
                          className="px-3 py-1 text-xs font-bold rounded-full uppercase"
                          style={{ backgroundColor: colors.bg, color: colors.border }}
                        >
                          {step.type}
                        </span>
                        <span 
                          className={`px-3 py-1 text-xs font-bold rounded-full uppercase border-2 ${
                            selectedMode === 'gist' 
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' 
                              : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          }`}
                        >
                          {selectedMode}
                        </span>
                      </div>
                      <p className="text-lg mb-6" style={{ color: 'var(--fg-secondary)' }}>
                        {step.description}
                      </p>
                      
                      <div className="grid gap-8">
                        <div>
                          <h5 className="text-lg font-semibold mb-4 text-brand-gold-400">
                            Implementation Details
                          </h5>
                          <div className="grid md:grid-cols-2 gap-4">
                            {step.details.map((detail, i) => (
                              <div
                                key={i}
                                className="flex items-start space-x-3 p-3 rounded-lg"
                                style={{ backgroundColor: 'var(--bg-muted)' }}
                              >
                                <ArrowRight className="h-4 w-4 mt-0.5 text-brand-gold-400 flex-shrink-0" />
                                <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                                  {detail}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h5 className="text-lg font-semibold mb-4 text-brand-gold-400">
                              Performance Metrics
                            </h5>
                            <div className="space-y-3">
                              {step.performance.map((metric, i) => (
                                <div key={i} className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                                  <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
                                    {metric.metric}
                                  </span>
                                  <span className="text-sm font-bold text-green-400">
                                    {metric.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {showCode && step.code && (
                            <div>
                              <h5 className="text-lg font-semibold mb-4 text-brand-gold-400">
                                Implementation Code
                              </h5>
                              <div className="p-4 rounded-lg font-mono text-xs overflow-x-auto" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-primary)' }}>
                                <pre className="whitespace-pre-wrap">{step.code}</pre>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DualChunkingDiagram
