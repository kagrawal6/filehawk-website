import React from 'react'
import { motion } from 'framer-motion'
import { 
  Layers, 
  Database, 
  GitBranch, 
  Monitor,
  HardDrive,
  Cpu,
  Network,
  FileText
} from 'lucide-react'

interface SystemArchitectureSectionProps {
  className?: string
}

const SystemArchitectureSection: React.FC<SystemArchitectureSectionProps> = ({ className = '' }) => {

  const techStackData = [
    {
      layer: 'Frontend',
      technologies: [
        { name: 'Electron', version: 'v28.0', description: 'Cross-platform desktop application framework' },
        { name: 'React', version: 'v18.2', description: 'Component-based UI library for interactive interfaces' },
        { name: 'TypeScript', version: 'v5.1', description: 'Type-safe JavaScript for robust development' }
      ]
    },
    {
      layer: 'Backend',
      technologies: [
        { name: 'Flask', version: 'v3.0', description: 'Python web framework for REST API endpoints' },
        { name: 'Python', version: 'v3.11', description: 'Core processing language for AI operations' },
        { name: 'Watchdog', version: 'v3.0', description: 'File system monitoring for real-time updates' }
      ]
    },
    {
      layer: 'Processing',
      technologies: [
        { name: 'SentenceTransformers', version: 'v2.2', description: 'Neural embedding models for semantic understanding' },
        { name: 'FAISS', version: 'v1.7', description: 'Efficient similarity search and clustering' },
        { name: 'spaCy', version: 'v3.6', description: 'Natural language processing and text chunking' }
      ]
    }
  ]

  const storageArchitecture = [
    {
      name: 'ChromaDB Vector Store',
      icon: Database,
      description: 'Vector database storing document embeddings and metadata',
      details: [
        'gist_centroids: Hierarchical cluster centers for efficient retrieval',
        'gist_chunks: Individual document chunks with metadata',
        'pinpoint_embeddings: Full-text semantic vectors'
      ]
    },
    {
      name: 'File Metadata Store', 
      icon: HardDrive,
      description: 'JSON-based tracking of file states and changes',
      details: [
        'File paths, modification timestamps, content hashes',
        'Chunk boundaries and hierarchical relationships', 
        'Indexing status and change detection'
      ]
    },
    {
      name: 'App Data Storage',
      icon: Network,
      description: 'Application settings and user preferences',
      details: [
        'User configuration and search preferences',
        'Folder selections and indexing settings',
        'Search history and usage analytics'
      ]
    }
  ]

  const processingPipelines = [
    {
      title: 'Indexing Pipeline',
      color: 'amber',
      steps: [
        'Frontend (folder selection) → Flask API → Core Processing → Metadata Tracker',
        'Core Processing → Text Chunking → SentenceTransformer Models → ChromaDB Storage', 
        'File System Monitor continuously watches for changes and triggers re-indexing'
      ]
    },
    {
      title: 'Search Pipeline', 
      color: 'green',
      steps: [
        'Frontend (user query) → Flask API → ChromaDB (vector search) → Ranking & Scoring',
        'Ranking & Scoring → Flask API → Frontend (display results)',
        'Bidirectional flow with clear request and response paths'
      ]
    }
  ]

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 ${className}`}>
      {/* Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-6">
          <Layers className="h-8 w-8 text-amber-400 mr-3" />
          <h1 className="text-4xl font-bold" style={{ color: 'var(--fg-primary)' }}>
            System Architecture
          </h1>
        </div>
        <p className="text-xl max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          FileHawk's sophisticated multi-layer architecture enabling semantic search across your 
          codebase with real-time indexing and intelligent ranking algorithms.
        </p>
      </motion.div>

      {/* System Architecture Diagram */}
      <motion.div 
        className="p-8 rounded-xl border"
        style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-center mb-6">
          <Layers className="h-6 w-6 text-amber-400 mr-3" />
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
            System Architecture Diagram
          </h2>
        </div>


        {/* System Architecture Diagram */}
        <div className="border rounded-lg p-8" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-muted)' }}>
          <div className="space-y-8">
            {/* Frontend Layer */}
            <div className="layer-container" data-layer="frontend">
              <h3 className="text-sm font-semibold mb-4 text-gray-400">Frontend Layer</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-lg shadow-lg" data-component="electron-app">
                  Electron Desktop App<br/>
                  <span className="text-xs opacity-80">(React UI, Search Interface, Settings)</span>
                </div>
              </div>
            </div>

            {/* Backend Layer */}
            <div className="layer-container" data-layer="backend">
              <h3 className="text-sm font-semibold mb-4 text-gray-400">Backend Layer</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="px-6 py-3 bg-orange-500 text-white text-sm font-medium rounded-lg shadow-lg" data-component="flask-api">
                  Flask API Server
                </div>
                <div className="px-6 py-3 bg-orange-500 text-white text-sm font-medium rounded-lg shadow-lg" data-component="core-processing">
                  Core Processing Engine
                </div>
                <div className="px-6 py-3 bg-orange-500 text-white text-sm font-medium rounded-lg shadow-lg" data-component="file-monitor">
                  File System Monitor
                </div>
                <div className="px-6 py-3 bg-orange-500 text-white text-sm font-medium rounded-lg shadow-lg" data-component="metadata-tracker">
                  Metadata Tracker
                </div>
              </div>
            </div>

            {/* Processing Layer */}
            <div className="layer-container" data-layer="processing">
              <h3 className="text-sm font-semibold mb-4 text-gray-400">Processing Layer</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="px-6 py-3 bg-pink-500 text-white text-sm font-medium rounded-lg shadow-lg" data-component="embedding-models">
                  SentenceTransformer Models
                </div>
                <div className="px-6 py-3 bg-pink-500 text-white text-sm font-medium rounded-lg shadow-lg" data-component="text-chunking">
                  Text Chunking Engine
                </div>
                <div className="px-6 py-3 bg-pink-500 text-white text-sm font-medium rounded-lg shadow-lg" data-component="ranking">
                  Ranking & Scoring
                </div>
              </div>
            </div>

            {/* Storage Layer */}
            <div className="layer-container" data-layer="storage">
              <h3 className="text-sm font-semibold mb-4 text-gray-400">Storage Layer</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="px-6 py-3 bg-purple-600 text-white text-sm font-medium rounded-lg shadow-lg" data-component="chromadb">
                  ChromaDB Vector Store
                </div>
                <div className="px-6 py-3 bg-purple-600 text-white text-sm font-medium rounded-lg shadow-lg" data-component="metadata-store">
                  File Metadata Store
                </div>
                <div className="px-6 py-3 bg-purple-600 text-white text-sm font-medium rounded-lg shadow-lg" data-component="app-storage">
                  App Data Storage
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span style={{ color: 'var(--fg-secondary)' }}>Frontend Layer</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
            <span style={{ color: 'var(--fg-secondary)' }}>Backend Layer</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-pink-500 rounded mr-2"></div>
            <span style={{ color: 'var(--fg-secondary)' }}>Processing Layer</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-600 rounded mr-2"></div>
            <span style={{ color: 'var(--fg-secondary)' }}>Storage Layer</span>
          </div>
        </div>
      </motion.div>

      {/* Technology Stack */}
      <motion.div 
        className="p-8 rounded-xl border"
        style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center mb-6">
          <Cpu className="h-6 w-6 text-blue-400 mr-3" />
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
            Technology Stack
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {techStackData.map((layer) => (
            <div key={layer.layer} className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-400">{layer.layer} Layer</h3>
              <div className="space-y-3">
                {layer.technologies.map((tech) => (
                  <div 
                    key={tech.name}
                    className="p-3 rounded border"
                    style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium" style={{ color: 'var(--fg-primary)' }}>
                        {tech.name}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-gray-600/30 text-gray-300">
                        {tech.version}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                      {tech.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Storage Architecture */}
      <motion.div 
        className="p-8 rounded-xl border"
        style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center mb-6">
          <Database className="h-6 w-6 text-purple-400 mr-3" />
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
            Storage Architecture
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {storageArchitecture.map((storage, index) => (
            <motion.div 
              key={storage.name}
              className="p-6 rounded-lg border"
              style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <storage.icon className="h-6 w-6 text-purple-400 mr-3" />
                <h3 className="text-lg font-semibold" style={{ color: 'var(--fg-primary)' }}>
                  {storage.name}
                </h3>
              </div>
              <p className="mb-4" style={{ color: 'var(--fg-secondary)' }}>
                {storage.description}
              </p>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--fg-muted)' }}>
                {storage.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Processing Pipelines */}
      <motion.div 
        className="p-8 rounded-xl border"
        style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center mb-6">
          <Network className="h-6 w-6 text-green-400 mr-3" />
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
            Processing Pipelines
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {processingPipelines.map((pipeline, index) => (
            <motion.div 
              key={pipeline.title}
              className="p-6 rounded-lg border"
              style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <h3 className={`text-lg font-semibold mb-4 text-${pipeline.color}-400`}>
                {pipeline.title}
              </h3>
              <div className="space-y-3">
                {pipeline.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className={`text-${pipeline.color}-400 mr-2 font-bold`}>
                      {idx + 1}.
                    </span>
                    <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* External Integrations */}
      <motion.div 
        className="p-8 rounded-xl border"
        style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <GitBranch className="h-6 w-6 text-indigo-400 mr-3" />
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
            External Integrations
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'GitHub Integration', icon: GitBranch, description: 'Repository cloning and sync' },
            { name: 'File System', icon: Monitor, description: 'Local directory monitoring' },
            { name: 'Document Processing', icon: FileText, description: 'Multi-format text extraction' },
            { name: 'API Endpoints', icon: Network, description: 'REST API for external access' }
          ].map((integration, index) => (
            <motion.div 
              key={integration.name}
              className="text-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <integration.icon className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                {integration.name}
              </h3>
              <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                {integration.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default SystemArchitectureSection