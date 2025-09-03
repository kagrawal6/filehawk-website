import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, 
  Key, 
  CheckCircle,
  Copy,
  Settings,
  Search,
  Upload,
  GitBranch,
  Activity,
  BarChart3,
  Terminal,
  Send,
  Download
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import APIEndpointsDiagram from './APIEndpointsDiagram'

const APISection: React.FC = () => {
  const isAnimated = useScrollAnimation()
  const [activeEndpoint, setActiveEndpoint] = useState<string>('search')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedExample, setSelectedExample] = useState<string>('basic-search')

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const apiEndpoints = [
    {
      id: 'search',
      title: 'Semantic Search API',
      method: 'POST',
      path: '/api/search',
      description: 'Primary semantic search with dual-mode AI intelligence',
      icon: Search,
      category: 'Search Operations',
      usage: 'Primary search interface for natural language queries',
      examples: [
        {
          id: 'basic-search',
          title: 'Basic Semantic Search',
          request: `POST /api/search
Content-Type: application/json

{
  "query": "machine learning algorithms for data processing",
  "mode": "gist",
  "limit": 20,
  "include_snippets": true
}`,
          response: `{
  "status": "success",
  "results": [
    {
      "file_path": "/documents/ml-research/algorithms.pdf",
      "file_name": "algorithms.pdf",
      "file_type": "pdf",
      "confidence": 0.947,
      "score_components": {
        "s_max": 0.923,
        "s_topk_mean": 0.887,
        "s_centroid": 0.756,
        "s_bm25": 0.432,
        "composite_score": 0.947
      },
      "snippet": "Machine learning algorithms for large-scale data processing include distributed computing frameworks...",
      "file_size": 2847392,
      "last_modified": "2024-03-15T14:30:22Z",
      "chunk_matches": 7
    }
  ],
  "query_info": {
    "processed_query": "machine learning algorithms data processing",
    "embedding_model": "msmarco-MiniLM-L6-cos-v5",
    "search_mode": "gist",
    "total_files_searched": 12847
  },
  "performance": {
    "search_time_ms": 42,
    "embedding_time_ms": 8,
    "ranking_time_ms": 15
  },
  "pagination": {
    "current_page": 1,
    "total_results": 156,
    "has_more": true
  }
}`,
          description: 'Standard semantic search with confidence scoring and performance metrics'
        },
        {
          id: 'advanced-filters',
          title: 'Advanced Filtering & Pinpoint Mode',
          request: `POST /api/search
Content-Type: application/json

{
  "query": "API authentication implementation details",
  "mode": "pinpoint",
  "limit": 10,
  "filters": {
    "file_types": ["py", "js", "md"],
    "folders": ["/backend", "/docs"],
    "date_range": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    },
    "file_size": {
      "min_bytes": 1024,
      "max_bytes": 10485760
    }
  },
  "confidence_threshold": 0.6,
  "include_snippets": true,
  "snippet_length": 200
}`,
          response: `{
  "status": "success",
  "results": [
    {
      "file_path": "/backend/auth/oauth_handler.py", 
      "file_name": "oauth_handler.py",
      "file_type": "py",
      "confidence": 0.892,
      "snippet": "def implement_oauth_authentication():\\n    # OAuth 2.0 device flow implementation\\n    authorization_url = build_authorization_url()...",
      "line_number": 45,
      "chunk_text": "OAuth authentication implementation with device flow...",
      "file_size": 8192,
      "last_modified": "2024-03-10T09:15:33Z"
    }
  ],
  "filters_applied": {
    "file_types": ["py", "js", "md"],
    "folders_included": 2,
    "date_filtered": true,
    "size_filtered": true,
    "files_after_filtering": 3247
  },
  "query_info": {
    "processed_query": "API authentication implementation details", 
    "embedding_model": "all-MiniLM-L6-v2",
    "search_mode": "pinpoint"
  },
  "performance": {
    "search_time_ms": 28,
    "filter_time_ms": 5,
    "total_time_ms": 33
  }
}`,
          description: 'Pinpoint mode search with comprehensive filtering and exact line-level results'
        }
      ]
    },
    {
      id: 'index',
      title: 'Document Indexing API',
      method: 'POST',
      path: '/api/index',
      description: 'Index files and folders with AI embedding generation',
      icon: Upload,
      category: 'Content Management',
      usage: 'Add new content to the searchable index with dual-mode processing',
      examples: [
        {
          id: 'index-folder',
          title: 'Index Folder with Progress Tracking',
          request: `POST /api/index
Content-Type: application/json

{
  "paths": ["/documents/new-research", "/code/backend"],
  "options": {
    "recursive": true,
    "file_types": ["pdf", "docx", "py", "js", "md"],
    "max_file_size": 50000000,
    "chunk_strategy": "dual",
    "exclude_patterns": ["*.tmp", "node_modules/*"],
    "force_reindex": false
  },
  "webhook_url": "https://app.example.com/indexing-webhook"
}`,
          response: `{
  "status": "accepted",
  "indexing_job": {
    "job_id": "idx_20241203_142530_abc123",
    "status": "running",
    "started_at": "2024-12-03T14:25:30Z",
    "estimated_completion": "2024-12-03T14:28:45Z"
  },
  "discovery": {
    "total_files_found": 847,
    "supported_files": 731,
    "skipped_files": 116,
    "total_size_bytes": 127384576
  },
  "processing_config": {
    "gist_chunking": "35 lines + 5 overlap",
    "pinpoint_chunking": "10 lines + 2 overlap", 
    "ai_models": ["msmarco-MiniLM-L6", "all-MiniLM-L6-v2"],
    "batch_size": 50,
    "parallel_workers": 4
  },
  "progress_tracking": {
    "websocket_url": "ws://localhost:5000/ws/indexing/idx_20241203_142530_abc123",
    "polling_url": "/api/index/status/idx_20241203_142530_abc123"
  }
}`,
          description: 'Bulk folder indexing with real-time progress tracking and webhook notifications'
        }
      ]
    },
    {
      id: 'github',
      title: 'GitHub Integration API',
      method: 'POST',
      path: '/api/github/connect',
      description: 'OAuth device flow and repository management',
      icon: GitBranch,
      category: 'Integration Services',
      usage: 'Connect GitHub repositories for code search and branch management',
      examples: [
        {
          id: 'github-auth',
          title: 'GitHub OAuth Device Flow',
          request: `POST /api/github/connect
Content-Type: application/json

{
  "action": "initiate_auth",
  "scopes": ["repo", "read:user"],
  "device_name": "FileHawk Desktop"
}`,
          response: `{
  "status": "success",
  "device_flow": {
    "device_code": "AH-1Ng4cMVJ8KvMrEYaBV1bm",
    "user_code": "WDJB-MJHT", 
    "verification_uri": "https://github.com/login/device",
    "verification_uri_complete": "https://github.com/login/device?user_code=WDJB-MJHT",
    "expires_in": 900,
    "interval": 5
  },
  "instructions": {
    "step1": "Open verification_uri in browser",
    "step2": "Enter user_code: WDJB-MJHT",
    "step3": "Poll /api/github/auth/poll with device_code",
    "timeout": "15 minutes"
  },
  "polling": {
    "poll_url": "/api/github/auth/poll",
    "poll_interval_seconds": 5,
    "max_attempts": 180
  }
}`,
          description: 'Initiate GitHub OAuth device flow for secure repository access'
        },
        {
          id: 'repo-clone',
          title: 'Repository Cloning & Indexing',
          request: `POST /api/github/repositories
Content-Type: application/json
Authorization: Bearer github_token_here

{
  "repository": "microsoft/vscode",
  "clone_path": "/repositories/vscode",
  "options": {
    "branch": "main",
    "depth": 1,
    "include_patterns": ["*.ts", "*.js", "*.md", "*.json"],
    "exclude_patterns": ["node_modules/*", "*.test.*", "dist/*"],
    "auto_index": true,
    "index_config": {
      "chunk_strategy": "code-aware",
      "extract_functions": true,
      "preserve_structure": true
    }
  }
}`,
          response: `{
  "status": "success",
  "repository_info": {
    "full_name": "microsoft/vscode",
    "clone_path": "/repositories/vscode",
    "branch": "main",
    "commit_sha": "7f6ab5485bbc008386c4386d08766667e155244e",
    "last_updated": "2024-12-03T14:30:15Z"
  },
  "clone_stats": {
    "total_files": 15847,
    "indexed_files": 8293,
    "code_files": 6847,
    "documentation": 1446,
    "total_size_mb": 127.3
  },
  "indexing_job": {
    "job_id": "repo_idx_vscode_main_20241203",
    "status": "completed",
    "processing_time_seconds": 142,
    "chunks_created": {
      "gist_chunks": 12847,
      "pinpoint_chunks": 31293
    }
  },
  "search_capabilities": {
    "code_search": true,
    "semantic_search": true,
    "function_search": true,
    "documentation_search": true
  }
}`,
          description: 'Clone and automatically index GitHub repository with code-aware chunking'
        }
      ]
    },
    {
      id: 'status',
      title: 'System Status API',
      method: 'GET',
      path: '/api/status',
      description: 'System health and performance monitoring',
      icon: Activity,
      category: 'System Monitoring',
      usage: 'Monitor system health, database status, and performance metrics',
      examples: [
        {
          id: 'system-health',
          title: 'Complete System Health Check',
          request: `GET /api/status
Accept: application/json`,
          response: `{
  "status": "healthy",
  "timestamp": "2024-12-03T14:30:45Z",
  "version": "2.1.0",
  "uptime_seconds": 1847392,
  "system": {
    "cpu_usage_percent": 23.4,
    "memory_usage_mb": 1247,
    "memory_total_mb": 4096,
    "disk_usage_percent": 67.2,
    "active_connections": 12
  },
  "database": {
    "status": "connected",
    "collections": {
      "gist_chunks": {
        "document_count": 127384,
        "size_mb": 2847.2
      },
      "gist_centroids": {
        "document_count": 8472,
        "size_mb": 186.4  
      },
      "pinpoint_chunks": {
        "document_count": 284729,
        "size_mb": 4239.7
      }
    },
    "query_performance": {
      "avg_search_latency_ms": 42,
      "p95_search_latency_ms": 78,
      "searches_per_minute": 847
    }
  },
  "ai_models": {
    "msmarco_model": {
      "status": "loaded",
      "memory_usage_mb": 237,
      "inference_time_avg_ms": 8
    },
    "allmini_model": {
      "status": "loaded", 
      "memory_usage_mb": 198,
      "inference_time_avg_ms": 6
    }
  },
  "recent_activity": {
    "searches_last_hour": 2847,
    "indexing_jobs_active": 2,
    "files_indexed_today": 1847,
    "errors_last_hour": 0
  }
}`,
          description: 'Comprehensive system health including AI models, database, and performance metrics'
        }
      ]
    }
  ]

  const performanceMetrics = [
    {
      category: 'Search Performance',
      metrics: [
        { name: 'Semantic Search Latency', value: '25-50ms', description: 'P95 response time including AI inference' },
        { name: 'Concurrent Request Capacity', value: '100+ req/s', description: 'Sustained throughput with quality degradation <5%' },
        { name: 'Query Processing Speed', value: '8ms avg', description: 'Embedding generation time per query' },
        { name: 'Result Ranking Time', value: '15ms avg', description: 'Holistic scoring computation time' }
      ]
    },
    {
      category: 'Indexing Performance', 
      metrics: [
        { name: 'File Processing Rate', value: '5,000/min', description: 'Files indexed with full AI processing' },
        { name: 'Embedding Generation', value: '200 chunks/sec', description: 'AI model inference throughput' },
        { name: 'Bulk Import Speed', value: '50GB/hour', description: 'Large dataset processing capability' },
        { name: 'Real-time Sync Latency', value: '<100ms', description: 'File change detection and processing' }
      ]
    },
    {
      category: 'API Reliability',
      metrics: [
        { name: 'Uptime SLA', value: '99.9%', description: 'Production availability target' },
        { name: 'Error Rate', value: '<0.1%', description: 'Failed requests under normal load' },
        { name: 'Rate Limiting', value: '1000/hour', description: 'Default per-client request limit' },
        { name: 'Response Consistency', value: '100%', description: 'Identical queries return identical results' }
      ]
    }
  ]

  const authenticationMethods = [
    {
      type: 'API Key Authentication',
      description: 'Simple header-based authentication for development and testing',
      implementation: 'X-API-Key: your_api_key_here',
      useCases: ['Development environments', 'Testing', 'Simple integrations']
    },
    {
      type: 'GitHub OAuth 2.0',
      description: 'OAuth device flow for GitHub repository access',
      implementation: 'Authorization: Bearer github_oauth_token',
      useCases: ['Repository management', 'User authentication', 'Organization access']
    },
    {
      type: 'Session Authentication',
      description: 'Cookie-based sessions for web applications',
      implementation: 'Cookie: session_id=encrypted_session_token',
      useCases: ['Web applications', 'Browser-based clients', 'Persistent sessions']
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6" 
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <Globe className="h-5 w-5 mr-2 text-brand-gold-400" />
          <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
            Production REST API Documentation
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          <span style={{ color: 'var(--fg-primary)' }}>Enterprise API</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            Reference
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Comprehensive REST API providing programmatic access to FileHawk's semantic intelligence, 
          featuring 25+ endpoints for search, indexing, GitHub integration, and system monitoring 
          with enterprise-grade performance and reliability.
        </p>
      </motion.div>

      {/* Comprehensive API Endpoints Diagram */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <APIEndpointsDiagram />
      </motion.section>

      {/* API Overview */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--fg-primary)' }}>
          API Architecture Overview
        </h2>
        <p className="text-center mb-12 max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          RESTful API design with comprehensive endpoints covering all FileHawk capabilities, 
          from semantic search to repository management.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Search, title: 'Search APIs', count: '8 endpoints', description: 'Semantic search with AI intelligence', color: 'text-blue-400' },
            { icon: Upload, title: 'Indexing APIs', count: '6 endpoints', description: 'Document processing and management', color: 'text-green-400' },
            { icon: GitBranch, title: 'GitHub APIs', count: '7 endpoints', description: 'Repository integration and OAuth', color: 'text-purple-400' },
            { icon: Settings, title: 'System APIs', count: '4 endpoints', description: 'Configuration and monitoring', color: 'text-orange-400' }
          ].map((category, index) => (
            <motion.div 
              key={category.title}
              className="p-6 rounded-xl border text-center"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-gold-500/20 ${category.color} mb-4`}>
                <category.icon className="h-6 w-6" />
              </div>
              <div className="text-lg font-bold text-brand-gold-400 mb-2">
                {category.count}
              </div>
              <div className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                {category.title}
              </div>
              <div className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                {category.description}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Endpoint Navigation */}
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {apiEndpoints.map((endpoint) => (
            <button
              key={endpoint.id}
              onClick={() => setActiveEndpoint(endpoint.id)}
              className={`flex items-center px-6 py-3 rounded-lg border transition-all duration-300 ${
                activeEndpoint === endpoint.id
                  ? 'border-brand-gold-500 bg-brand-gold-500/20 text-brand-gold-400'
                  : 'border-gray-600 hover:border-brand-gold-500/50'
              }`}
              style={{ color: activeEndpoint === endpoint.id ? undefined : 'var(--fg-secondary)' }}
            >
              <endpoint.icon className="h-4 w-4 mr-2" />
              <span className="font-medium">{endpoint.title}</span>
            </button>
          ))}
        </div>
      </motion.section>

      {/* Active Endpoint Details */}
      {apiEndpoints.map((endpoint) => 
        activeEndpoint === endpoint.id && (
          <motion.section 
            key={endpoint.id}
            className="mb-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
              {/* Endpoint Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 mr-4">
                    <endpoint.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold mr-3 ${
                        endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                        endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-lg font-mono text-brand-gold-400">
                        {endpoint.path}
                      </code>
                    </div>
                    <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--fg-primary)' }}>
                      {endpoint.title}
                    </h3>
                    <p style={{ color: 'var(--fg-secondary)' }}>
                      {endpoint.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Example Selection */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4 flex items-center" style={{ color: 'var(--fg-primary)' }}>
                  <Terminal className="h-4 w-4 mr-2 text-brand-gold-400" />
                  Interactive Examples
                </h4>
                <div className="flex flex-wrap gap-3 mb-6">
                  {endpoint.examples.map((example) => (
                    <button
                      key={example.id}
                      onClick={() => setSelectedExample(example.id)}
                      className={`px-4 py-2 rounded-lg border text-sm transition-all duration-300 ${
                        selectedExample === example.id
                          ? 'border-brand-gold-500 bg-brand-gold-500/20 text-brand-gold-400'
                          : 'border-gray-600 hover:border-brand-gold-500/50'
                      }`}
                      style={{ color: selectedExample === example.id ? undefined : 'var(--fg-secondary)' }}
                    >
                      {example.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Example */}
              {endpoint.examples.map((example) => 
                selectedExample === example.id && (
                  <motion.div 
                    key={example.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <p className="text-sm mb-4" style={{ color: 'var(--fg-secondary)' }}>
                        {example.description}
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Request */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold flex items-center" style={{ color: 'var(--fg-primary)' }}>
                            <Send className="h-4 w-4 mr-2 text-green-400" />
                            Request
                          </h5>
                          <button
                            onClick={() => copyToClipboard(example.request, `${example.id}-request`)}
                            className="flex items-center text-xs text-brand-gold-400 hover:text-brand-gold-300 transition-colors"
                          >
                            {copiedCode === `${example.id}-request` ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Copy className="h-3 w-3 mr-1" />
                            )}
                            {copiedCode === `${example.id}-request` ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <div className="p-4 rounded-lg border overflow-x-auto" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)' }}>
                          <pre className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                            <code>{example.request}</code>
                          </pre>
                        </div>
                      </div>

                      {/* Response */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold flex items-center" style={{ color: 'var(--fg-primary)' }}>
                            <Download className="h-4 w-4 mr-2 text-blue-400" />
                            Response
                          </h5>
                          <button
                            onClick={() => copyToClipboard(example.response, `${example.id}-response`)}
                            className="flex items-center text-xs text-brand-gold-400 hover:text-brand-gold-300 transition-colors"
                          >
                            {copiedCode === `${example.id}-response` ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Copy className="h-3 w-3 mr-1" />
                            )}
                            {copiedCode === `${example.id}-response` ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <div className="p-4 rounded-lg border overflow-x-auto max-h-96 overflow-y-auto" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)' }}>
                          <pre className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                            <code>{example.response}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </motion.section>
        )
      )}

      {/* Authentication Methods */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--fg-primary)' }}>
          Authentication Methods
        </h2>
        <p className="text-center mb-12 max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Multiple authentication options supporting different integration patterns and security requirements.
        </p>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {authenticationMethods.map((auth, index) => (
            <motion.div 
              key={auth.type}
              className="p-6 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.0 + index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <Key className="h-5 w-5 mr-2 text-brand-gold-400" />
                <h3 className="text-lg font-bold" style={{ color: 'var(--fg-primary)' }}>
                  {auth.type}
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--fg-secondary)' }}>
                {auth.description}
              </p>
              <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: 'var(--bg-muted)' }}>
                <code className="text-sm text-brand-gold-400">
                  {auth.implementation}
                </code>
              </div>
              <div>
                <div className="text-xs font-medium mb-2" style={{ color: 'var(--fg-muted)' }}>
                  USE CASES
                </div>
                <div className="flex flex-wrap gap-2">
                  {auth.useCases.map((useCase, ucIndex) => (
                    <span 
                      key={ucIndex}
                      className="text-xs px-2 py-1 rounded border"
                      style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)', color: 'var(--fg-secondary)' }}
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Performance Metrics */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--fg-primary)' }}>
          API Performance Characteristics
        </h2>
        <p className="text-center mb-12 max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Production-validated performance metrics demonstrating enterprise-grade scalability and responsiveness.
        </p>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {performanceMetrics.map((category, categoryIndex) => (
            <motion.div 
              key={category.category}
              className="p-6 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.4 + categoryIndex * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center" style={{ color: 'var(--fg-primary)' }}>
                <BarChart3 className="h-5 w-5 mr-2 text-brand-gold-400" />
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
                        {metric.name}
                      </span>
                      <span className="text-lg font-bold text-brand-gold-400">
                        {metric.value}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                      {metric.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* API Summary */}
      <motion.section 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Enterprise-Ready API Platform
          </h3>
          <p className="mb-8 max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            FileHawk's REST API provides complete programmatic access to semantic intelligence capabilities 
            with production-grade performance, comprehensive documentation, and enterprise security standards.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: '25+', label: 'API Endpoints', description: 'Complete functionality coverage' },
              { metric: '99.9%', label: 'Uptime SLA', description: 'Production reliability target' },
              { metric: '<50ms', label: 'Response Time', description: 'P95 latency including AI inference' },
              { metric: '1000/hour', label: 'Rate Limit', description: 'Default per-client throughput' }
            ].map((metric) => (
              <div key={metric.metric} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}>
                <div className="text-2xl font-bold text-brand-gold-400 mb-2">
                  {metric.metric}
                </div>
                <div className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                  {metric.label}
                </div>
                <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default APISection