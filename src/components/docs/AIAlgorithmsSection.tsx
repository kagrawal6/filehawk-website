import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain,
  Code,
  Database,
  Zap,
  BarChart3,
  PlayCircle,
  Settings,
  Target,
  Layers,
  TrendingUp,
  Clock,
  Cpu,
  Activity,
  Search,
  ChevronRight,
  Info
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

// Import interactive components
import SyncingDashboard from '../interactive/SyncingDashboard'

// Import algorithm demo components
import GistIndexingDemo from '../demos/GistIndexingDemo'
import PinpointIndexingDemo from '../demos/PinpointIndexingDemo'
import GistSearchDemo from '../demos/GistSearchDemo'
import PinpointSearchDemo from '../demos/PinpointSearchDemo'

const AIAlgorithmsSection: React.FC = () => {
  const isAnimated = useScrollAnimation()
  const [activeAlgorithm, setActiveAlgorithm] = useState<string>('gist-indexing')

  const algorithms = [
    {
      id: 'gist-indexing',
      title: 'Gist Mode Indexing',
      subtitle: 'Context-Preserving Text Chunking',
      icon: Brain,
      color: 'blue',
      description: 'Creates 35-line overlapping chunks that preserve semantic context and generate file-level centroids.',
      complexity: 'O(n)',
      model: 'sentence-transformers/msmarco-MiniLM-L6-cos-v5',
      component: GistIndexingDemo,
      technicalSpecs: {
        'Chunk Size': '35 lines',
        'Chunk Overlap': '5 lines',
        'Embedding Dimension': '384',
        'Deduplication': 'Cosine similarity threshold',
        'File Centroid': 'Mean of chunk embeddings',
        'File Maxpool': 'Element-wise maximum'
      },
      mathFormula: `
        // Chunk Creation
        for i in range(0, len(lines), chunk_size - overlap):
          chunk = lines[i:i+chunk_size]
          embedding = model.encode(chunk)
        
        // File Centroid Calculation
        file_centroid = normalize(mean(chunk_embeddings))
        file_maxpool = normalize(max(chunk_embeddings, axis=0))
      `
    },
    {
      id: 'pinpoint-indexing',
      title: 'Pinpoint Mode Indexing',
      subtitle: 'Precision Text Segmentation',
      icon: Target,
      color: 'red',
      description: 'Creates 3-line precise chunks with sentence boundary detection for exact matching.',
      complexity: 'O(n)',
      model: 'all-MiniLM-L6-v2',
      component: PinpointIndexingDemo,
      technicalSpecs: {
        'Chunk Size': '3 lines',
        'Boundary Detection': 'Sentence endings (.!?;:)',
        'Embedding Dimension': '384',
        'Precision Focus': 'Small chunks for exact matching',
        'Storage Format': 'Direct chunk-to-vector mapping'
      },
      mathFormula: `
        // Precision Chunking
        current_chunk = []
        for line in lines:
          current_chunk.append(line)
          if sentence_end(line) or len(current_chunk) >= 3:
            embedding = model.encode(current_chunk)
            store_chunk(embedding, line_numbers)
      `
    },
    {
      id: 'gist-search',
      title: 'Gist Search Algorithm',
      subtitle: 'Two-Stage Holistic Retrieval',
      icon: Search,
      color: 'green',
      description: 'Two-stage retrieval system with file centroid filtering and holistic scoring.',
      complexity: 'O(log n + k)',
      model: 'Hybrid retrieval strategy',
      component: GistSearchDemo,
      technicalSpecs: {
        'Stage 1': 'File centroid similarity',
        'Candidates': '200 files maximum',
        'Stage 2': 'Detailed chunk analysis',
        'Scoring Components': '4 weighted factors',
        'Top-k Selection': 'Dynamic based on file size'
      },
      mathFormula: `
        // Two-Stage Retrieval
        candidates = search_centroids(query, n=200)
        
        for file in candidates:
          chunks = search_chunks(query, file)
          score = holistic_score(chunks, file_metadata)
        
        // Holistic Scoring
        score = w1*s_max + w2*s_topk + w3*s_centroid + w4*s_bm25
      `
    },
    {
      id: 'pinpoint-search',
      title: 'Pinpoint Search Algorithm',
      subtitle: 'Direct Similarity Matching',
      icon: Zap,
      color: 'purple',
      description: 'Direct cosine similarity search with best-chunk-per-file ranking.',
      complexity: 'O(log n)',
      model: 'Direct vector similarity',
      component: PinpointSearchDemo,
      technicalSpecs: {
        'Search Type': 'Direct vector similarity',
        'Ranking': 'Best chunk per file',
        'Similarity Metric': 'Cosine similarity',
        'Result Grouping': 'By file path',
        'Performance': 'Optimized for speed'
      },
      mathFormula: `
        // Direct Search
        results = vector_db.query(query_embedding, n=top_files*10)
        
        // Group by file and rank by best similarity
        file_scores = {}
        for chunk in results:
          file = chunk.metadata.path
          if file not in file_scores:
            file_scores[file] = chunk.similarity
          else:
            file_scores[file] = max(file_scores[file], chunk.similarity)
      `
    },
    {
      id: 'syncing',
      title: 'Real-Time Sync Engine',
      subtitle: 'File System Event Processing',
      icon: Activity,
      color: 'indigo',
      description: 'Intelligent file monitoring with debouncing and incremental processing.',
      complexity: 'O(1) per event',
      model: 'Event-driven architecture',
      component: SyncingDashboard,
      technicalSpecs: {
        'File Watchers': 'System-level monitoring',
        'Debounce Time': '500ms intelligent delay',
        'Event Types': 'Create, modify, delete, move',
        'Queue Management': 'Per-mode processing queues',
        'Optimization': 'Stat caching and batching'
      },
      mathFormula: `
        // Event Processing
        def on_file_event(path, event_type):
          if should_ignore(path): return
          
          event = FileChangeEvent(path, event_type, timestamp)
          for mode in matching_modes(path):
            sync_queue[mode][path] = event
            schedule_processing(mode)
        
        // Batch Processing
        def process_queue(mode):
          events = sync_queue[mode].values()
          for event in events:
            if event.type in ['created', 'modified']:
              reindex_file(event.path, mode)
            elif event.type == 'deleted':
              remove_from_index(event.path, mode)
      `
    }
  ]

  const activeAlgorithmData = algorithms.find(a => a.id === activeAlgorithm) || algorithms[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6" 
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <Brain className="h-5 w-5 mr-2 text-brand-gold-400" />
          <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
            AI Algorithms & Mathematics
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          <span style={{ color: 'var(--fg-primary)' }}>Deep Learning</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            Architecture
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8" style={{ color: 'var(--fg-secondary)' }}>
          Explore FileHawk's sophisticated AI algorithms through interactive visualizations, 
          mathematical formulations, and technical deep-dives into our dual-model semantic search architecture.
        </p>

        {/* Algorithm Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {[
            { icon: Cpu, metric: "2 Models", label: "Embedding Networks", description: "Specialized for different search modes" },
            { icon: Database, metric: "384D", label: "Vector Space", description: "High-dimensional semantic embeddings" },
            { icon: TrendingUp, metric: "95.7%", label: "Accuracy Rate", description: "Validated on enterprise datasets" },
            { icon: Clock, metric: "<50ms", label: "Query Time", description: "Optimized retrieval algorithms" }
          ].map((stat, index) => (
            <motion.div 
              key={stat.metric}
              className="p-6 rounded-xl border text-center"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            >
              <stat.icon className="h-8 w-8 text-brand-gold-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-brand-gold-400 mb-1">
                {stat.metric}
              </div>
              <div className="font-semibold mb-1" style={{ color: 'var(--fg-primary)' }}>
                {stat.label}
              </div>
              <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interactive Algorithm Explorer */}
      <motion.div 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Algorithm Deep Dive
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            Explore each algorithm's implementation through interactive demonstrations, 
            mathematical formulas, and performance characteristics.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Algorithm Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {algorithms.map((algorithm, index) => (
                <motion.button
                  key={algorithm.id}
                  onClick={() => setActiveAlgorithm(algorithm.id)}
                  className={`
                    w-full text-left p-4 rounded-xl border transition-all duration-300 group
                    ${activeAlgorithm === algorithm.id 
                      ? 'bg-gradient-to-r from-brand-gold-500/20 to-transparent border-brand-gold-500 shadow-lg' 
                      : 'hover:border-gray-600 hover:shadow-md'
                    }
                  `}
                  style={{ 
                    backgroundColor: activeAlgorithm === algorithm.id ? 'var(--accent-soft)' : 'var(--bg-elevated)', 
                    borderColor: activeAlgorithm === algorithm.id ? 'var(--accent-solid)' : 'var(--border-subtle)' 
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isAnimated ? 1 : 0, x: isAnimated ? 0 : -20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-lg mr-3 ${
                      activeAlgorithm === algorithm.id ? 'bg-brand-gold-500/30' : 'bg-gray-700'
                    }`}>
                      <algorithm.icon className={`h-4 w-4 ${
                        activeAlgorithm === algorithm.id ? 'text-brand-gold-400' : 'text-gray-300'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-sm leading-tight mb-1 ${
                        activeAlgorithm === algorithm.id ? 'text-brand-gold-300' : ''
                      }`} 
                      style={{ color: activeAlgorithm === algorithm.id ? 'var(--accent-solid)' : 'var(--fg-primary)' }}>
                        {algorithm.title}
                      </div>
                      <div className="text-xs leading-tight" style={{ color: 'var(--fg-muted)' }}>
                        {algorithm.subtitle}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2 py-1 rounded-full ${
                      activeAlgorithm === algorithm.id ? 'bg-brand-gold-500/20 text-brand-gold-400' : 'bg-gray-700 text-gray-300'
                    }`}>
                      {algorithm.complexity}
                    </span>
                    <ChevronRight className={`h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ${
                      activeAlgorithm === algorithm.id ? 'opacity-100' : ''
                    }`} />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Algorithm Detail Panel */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeAlgorithm}
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Algorithm Header */}
              <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-start mb-4">
                  <div className="p-3 rounded-xl bg-brand-gold-500/20 text-brand-gold-400 mr-4 flex-shrink-0">
                    <activeAlgorithmData.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
                      {activeAlgorithmData.title}
                    </h3>
                    <p className="text-lg mb-4" style={{ color: 'var(--fg-secondary)' }}>
                      {activeAlgorithmData.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        {activeAlgorithmData.complexity}
                      </div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                        <Cpu className="h-4 w-4 mr-2" />
                        {activeAlgorithmData.model}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Visualization */}
              <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center mb-6">
                  <PlayCircle className="h-6 w-6 text-brand-gold-400 mr-3" />
                  <h4 className="text-xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
                    Interactive Demonstration
                  </h4>
                </div>
                
                {/* Interactive Algorithm Demo */}
                <div className="min-h-[600px]">
                  <activeAlgorithmData.component />
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center mb-6">
                  <Settings className="h-6 w-6 text-brand-gold-400 mr-3" />
                  <h4 className="text-xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
                    Technical Specifications
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(activeAlgorithmData.technicalSpecs).map(([key, value]) => (
                    <div key={key} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                      <div className="text-sm font-medium mb-2" style={{ color: 'var(--fg-muted)' }}>
                        {key}
                      </div>
                      <div className="font-mono text-sm" style={{ color: 'var(--fg-primary)' }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mathematical Formula */}
              <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center mb-6">
                  <Code className="h-6 w-6 text-brand-gold-400 mr-3" />
                  <h4 className="text-xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
                    Implementation Details
                  </h4>
                </div>
                
                <div className="p-4 rounded-lg font-mono text-sm overflow-x-auto" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <pre style={{ color: 'var(--fg-primary)' }}>
                    {activeAlgorithmData.mathFormula.trim()}
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* System Architecture Overview */}
      <motion.div 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            System Architecture
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            FileHawk's architecture combines multiple AI models and optimized data structures 
            for maximum performance and accuracy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Data Flow */}
          <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center mb-6">
              <Layers className="h-8 w-8 text-brand-gold-400 mr-3" />
              <h3 className="text-xl font-bold" style={{ color: 'var(--fg-primary)' }}>Data Flow</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { step: '1', title: 'File Ingestion', description: 'Text extraction from 25+ formats' },
                { step: '2', title: 'Chunking', description: 'Dual-mode text segmentation' },
                { step: '3', title: 'Embedding', description: '384D vector generation' },
                { step: '4', title: 'Indexing', description: 'ChromaDB storage with metadata' },
                { step: '5', title: 'Search', description: 'Multi-stage retrieval algorithms' }
              ].map((item) => (
                <div key={item.step} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center text-sm font-bold mr-4">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{item.title}</h4>
                    <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center mb-6">
              <Database className="h-8 w-8 text-brand-gold-400 mr-3" />
              <h3 className="text-xl font-bold" style={{ color: 'var(--fg-primary)' }}>Technology Stack</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3" style={{ color: 'var(--fg-primary)' }}>AI/ML Layer</h4>
                <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                  <div>• SentenceTransformers (Gist mode)</div>
                  <div>• MiniLM-L6-v2 (Pinpoint mode)</div>
                  <div>• Custom holistic scoring</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3" style={{ color: 'var(--fg-primary)' }}>Data Layer</h4>
                <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                  <div>• ChromaDB vector database</div>
                  <div>• Persistent local storage</div>
                  <div>• Metadata indexing</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3" style={{ color: 'var(--fg-primary)' }}>Application Layer</h4>
                <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                  <div>• Python Flask backend</div>
                  <div>• Electron desktop app</div>
                  <div>• Real-time file monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Ready to Experience Advanced AI Search?
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            See FileHawk's sophisticated algorithms in action and discover how AI-powered 
            semantic search can transform your document workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#download"
              className="px-8 py-4 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-gold-500/25 transition-all duration-300 flex items-center justify-center"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Download FileHawk
            </a>
            <a 
              href="/documentation/features"
              className="px-8 py-4 border border-brand-gold-500 text-brand-gold-400 font-semibold rounded-lg hover:bg-brand-gold-500/10 transition-all duration-300 flex items-center justify-center"
            >
              <Info className="mr-2 h-5 w-5" />
              View Features
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AIAlgorithmsSection