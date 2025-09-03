import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play,
  Pause,
  RotateCcw,
  Globe,




  Shield,
  Copy,
  CheckCircle,
  AlertTriangle,



  Code,

} from 'lucide-react'

interface APIEndpoint {
  id: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  name: string
  description: string
  category: 'search' | 'indexing' | 'github' | 'system' | 'files'
  position: { x: number; y: number }
  size: { width: number; height: number }
  request: any
  response: any
  performance: { metric: string; value: string }[]
  security: string[]
  errors: string[]
}



const APIEndpointsDiagram: React.FC = () => {
  const [animationState, setAnimationState] = useState<'playing' | 'paused'>('paused')
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showRequestResponse, setShowRequestResponse] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const apiEndpoints: APIEndpoint[] = [
    {
      id: 'search-semantic',
      method: 'POST',
      path: '/api/search/semantic',
      name: 'Semantic Search',
      description: 'Execute semantic search with dual-model AI processing',
      category: 'search',
      position: { x: 50, y: 50 },
      size: { width: 360, height: 140 },
      request: {
        query: "machine learning optimization",
        mode: "gist",
        max_results: 20,
        confidence_threshold: 0.3
      },
      response: {
        results: [
          {
            file_path: "ml/optimization.py",
            confidence: 0.87,
            snippet: "# Advanced optimization techniques...",
            line_start: 45,
            line_end: 52
          }
        ],
        search_id: "search_123",
        total_found: 15,
        processing_time_ms: 125
      },
      performance: [
        { metric: 'Avg Response Time', value: '125ms' },
        { metric: 'Throughput', value: '500 req/min' },
        { metric: 'Success Rate', value: '99.8%' },
        { metric: 'AI Processing', value: '75ms' }
      ],
      security: ['API Key Required', 'Rate Limited', 'Input Sanitization'],
      errors: ['400: Invalid Query', '429: Rate Limited', '500: AI Model Error']
    },
    {
      id: 'search-filters',
      method: 'POST',
      path: '/api/search/filters',
      name: 'Advanced Filtering',
      description: 'Apply advanced filters and sorting to search results',
      category: 'search',
      position: { x: 450, y: 50 },
      size: { width: 340, height: 140 },
      request: {
        search_id: "search_123",
        filters: {
          file_types: [".py", ".js"],
          date_range: "last_30_days",
          min_confidence: 0.5
        },
        sort_by: "confidence",
        limit: 10
      },
      response: {
        filtered_results: [],
        total_filtered: 8,
        applied_filters: ["file_types", "confidence"],
        processing_time_ms: 15
      },
      performance: [
        { metric: 'Filter Time', value: '15ms' },
        { metric: 'Cache Hit Rate', value: '85%' },
        { metric: 'Memory Usage', value: '50MB' }
      ],
      security: ['Session Validation', 'Result Ownership'],
      errors: ['404: Search Not Found', '400: Invalid Filters']
    },
    {
      id: 'index-folder',
      method: 'POST',
      path: '/api/index/folder',
      name: 'Index Local Folder',
      description: 'Index files from local folder with progress tracking',
      category: 'indexing',
      position: { x: 830, y: 50 },
      size: { width: 360, height: 140 },
      request: {
        folder_path: "/Users/dev/projects",
        recursive: true,
        file_types: ["*"],
        exclude_patterns: ["node_modules", ".git"]
      },
      response: {
        indexing_job_id: "job_456",
        status: "started",
        estimated_files: 1250,
        estimated_time_minutes: 15
      },
      performance: [
        { metric: 'Indexing Speed', value: '2.8k files/min' },
        { metric: 'Concurrency', value: '4 workers' },
        { metric: 'Memory Usage', value: '200MB max' }
      ],
      security: ['Path Validation', 'File System Permissions'],
      errors: ['403: Access Denied', '413: Folder Too Large']
    },
    {
      id: 'index-status',
      method: 'GET',
      path: '/api/index/status/{job_id}',
      name: 'Indexing Status',
      description: 'Get real-time indexing progress and statistics',
      category: 'indexing',
      position: { x: 50, y: 220 },
      size: { width: 340, height: 140 },
      request: {},
      response: {
        job_id: "job_456",
        status: "processing",
        progress: {
          files_processed: 842,
          total_files: 1250,
          percentage: 67.4,
          current_file: "src/algorithms/search.py"
        },
        performance: {
          files_per_minute: 2850,
          chunks_created: 15420,
          errors_count: 3
        }
      },
      performance: [
        { metric: 'Status Update', value: '5s intervals' },
        { metric: 'Real-time Accuracy', value: '99.9%' },
        { metric: 'WebSocket Support', value: 'Yes' }
      ],
      security: ['Job Ownership', 'Progress Isolation'],
      errors: ['404: Job Not Found', '410: Job Expired']
    },
    {
      id: 'github-connect',
      method: 'POST',
      path: '/api/github/connect',
      name: 'GitHub OAuth Connect',
      description: 'Initiate GitHub OAuth device flow authentication',
      category: 'github',
      position: { x: 430, y: 220 },
      size: { width: 360, height: 140 },
      request: {
        scopes: ["repo", "read:user"],
        device_name: "FileHawk Desktop"
      },
      response: {
        device_code: "3584-BDGS-8543-HTYU",
        user_code: "WDJB-MJHT",
        verification_uri: "https://github.com/login/device",
        expires_in: 900,
        interval: 5
      },
      performance: [
        { metric: 'Auth Time', value: '15-45 seconds' },
        { metric: 'Success Rate', value: '99.2%' },
        { metric: 'Token Refresh', value: '8 hours' }
      ],
      security: ['OAuth 2.0 Device Flow', 'Scope Limiting', 'Token Encryption'],
      errors: ['401: Invalid Credentials', '429: Rate Limited']
    },
    {
      id: 'github-repos',
      method: 'GET',
      path: '/api/github/repositories',
      name: 'List Repositories',
      description: 'Get accessible GitHub repositories with metadata',
      category: 'github',
      position: { x: 830, y: 220 },
      size: { width: 340, height: 140 },
      request: {},
      response: {
        repositories: [
          {
            id: 123456,
            name: "awesome-project",
            full_name: "user/awesome-project",
            private: false,
            language: "Python",
            size: 2048,
            updated_at: "2024-01-15T10:30:00Z"
          }
        ],
        total_count: 45,
        rate_limit_remaining: 4950
      },
      performance: [
        { metric: 'API Response', value: '150ms avg' },
        { metric: 'Rate Limit', value: '5000/hour' },
        { metric: 'Cache Duration', value: '10 minutes' }
      ],
      security: ['Bearer Token Auth', 'Scope Validation'],
      errors: ['401: Token Expired', '403: Insufficient Scope']
    },
    {
      id: 'system-health',
      method: 'GET',
      path: '/api/system/health',
      name: 'System Health Check',
      description: 'Get comprehensive system status and performance metrics',
      category: 'system',
      position: { x: 50, y: 390 },
      size: { width: 360, height: 140 },
      request: {},
      response: {
        status: "healthy",
        version: "1.0.0",
        components: {
          ai_models: "operational",
          database: "operational",
          github_integration: "operational"
        },
        performance: {
          cpu_usage: 15.3,
          memory_usage: 245.8,
          disk_usage: 12.1
        },
        uptime_seconds: 86400
      },
      performance: [
        { metric: 'Response Time', value: '<10ms' },
        { metric: 'Monitoring Interval', value: '30 seconds' },
        { metric: 'Availability', value: '99.9%' }
      ],
      security: ['Internal Access Only', 'Rate Limited'],
      errors: ['503: Service Unavailable']
    },
    {
      id: 'files-list',
      method: 'GET',
      path: '/api/files/indexed',
      name: 'List Indexed Files',
      description: 'Get paginated list of indexed files with metadata',
      category: 'files',
      position: { x: 450, y: 390 },
      size: { width: 340, height: 140 },
      request: {},
      response: {
        files: [
          {
            file_path: "src/main.py",
            file_size: 15420,
            indexed_at: "2024-01-15T14:20:00Z",
            chunk_count: 25,
            file_type: "python"
          }
        ],
        pagination: {
          page: 1,
          per_page: 50,
          total: 1250,
          total_pages: 25
        }
      },
      performance: [
        { metric: 'Query Time', value: '25ms' },
        { metric: 'Max Per Page', value: '100' },
        { metric: 'Index Size', value: '2.5GB' }
      ],
      security: ['User Isolation', 'Path Sanitization'],
      errors: ['400: Invalid Pagination']
    },
    {
      id: 'config-settings',
      method: 'PUT',
      path: '/api/config/settings',
      name: 'Update Configuration',
      description: 'Update application configuration and AI model settings',
      category: 'system',
      position: { x: 830, y: 390 },
      size: { width: 340, height: 140 },
      request: {
        ai_settings: {
          gist_model_temperature: 0.1,
          max_tokens: 512,
          confidence_threshold: 0.3
        },
        indexing_settings: {
          max_concurrent_jobs: 4,
          chunk_size_gist: 35,
          chunk_size_pinpoint: 10
        }
      },
      response: {
        settings_updated: ["ai_settings", "indexing_settings"],
        requires_restart: false,
        updated_at: "2024-01-15T15:45:00Z"
      },
      performance: [
        { metric: 'Update Time', value: '50ms' },
        { metric: 'Validation', value: '15ms' },
        { metric: 'Config Reload', value: 'Hot reload' }
      ],
      security: ['Admin Access Required', 'Setting Validation'],
      errors: ['403: Admin Required', '422: Invalid Settings']
    }
  ]

  const categories = {
    search: { name: 'Search APIs', color: '#3B82F6', count: 2 },
    indexing: { name: 'Indexing APIs', color: '#10B981', count: 2 },
    github: { name: 'GitHub APIs', color: '#7B1FA2', count: 2 },
    system: { name: 'System APIs', color: '#F59E0B', count: 2 },
    files: { name: 'File APIs', color: '#EF4444', count: 1 }
  }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const getMethodColor = (method: string) => {
    const colors = {
      GET: '#10B981',
      POST: '#3B82F6', 
      PUT: '#F59E0B',
      DELETE: '#EF4444'
    }
    return colors[method as keyof typeof colors] || '#6B7280'
  }

  const getCategoryColor = (category: string) => {
    return categories[category as keyof typeof categories]?.color || '#6B7280'
  }

  const filteredEndpoints = selectedCategory === 'all' 
    ? apiEndpoints 
    : apiEndpoints.filter(ep => ep.category === selectedCategory)

  const toggleAnimation = () => {
    setAnimationState(animationState === 'playing' ? 'paused' : 'playing')
  }

  const resetAnimation = () => {
    setAnimationState('paused')
    setTimeout(() => setAnimationState('playing'), 100)
  }

  return (
    <div className="w-full space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div>
          <h3 className="text-3xl font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
            Production API Endpoints
          </h3>
          <p className="text-lg max-w-3xl" style={{ color: 'var(--fg-secondary)' }}>
            Complete REST API architecture with 25+ endpoints, comprehensive request/response examples, and enterprise-grade error handling
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm"
            style={{ 
              backgroundColor: 'var(--bg-app)', 
              borderColor: 'var(--border-subtle)',
              color: 'var(--fg-primary)'
            }}
          >
            <option value="all">All Categories ({apiEndpoints.length})</option>
            {Object.entries(categories).map(([key, cat]) => (
              <option key={key} value={key}>{cat.name} ({cat.count})</option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowRequestResponse(!showRequestResponse)}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                showRequestResponse 
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
              {animationState === 'playing' ? 'Pause' : 'Demo'}
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

      {/* API Categories Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(selectedCategory === key ? 'all' : key)}
            className={`p-4 rounded-lg border text-sm transition-all duration-300 ${
              selectedCategory === key ? 'ring-2 ring-brand-gold-500' : ''
            }`}
            style={{ 
              backgroundColor: selectedCategory === key ? category.color + '20' : 'var(--bg-app)',
              borderColor: category.color,
              color: 'var(--fg-primary)'
            }}
          >
            <div className="font-bold text-lg">{category.count}</div>
            <div className="text-xs mt-1">{category.name}</div>
          </button>
        ))}
      </div>

      {/* API Endpoints Diagram */}
      <div className="relative w-full rounded-xl overflow-auto border" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)', height: '720px' }}>
        <svg width="100%" height="100%" viewBox="0 0 1300 680" className="absolute inset-0">
          {/* Background Grid */}
          <defs>
            <pattern id="apiGrid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(156, 163, 175, 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#apiGrid)" />

          {/* API Endpoints */}
          <AnimatePresence>
            {filteredEndpoints.map((endpoint, index) => {
              const isSelected = selectedEndpoint === endpoint.id
              const methodColor = getMethodColor(endpoint.method)
              const categoryColor = getCategoryColor(endpoint.category)
              
              return (
                <g key={endpoint.id}>
                  {/* Endpoint Background */}
                  <motion.rect
                    x={endpoint.position.x}
                    y={endpoint.position.y}
                    width={endpoint.size.width}
                    height={endpoint.size.height}
                    rx="12"
                    fill="var(--bg-elevated)"
                    stroke={isSelected ? '#F59E0B' : categoryColor}
                    strokeWidth={isSelected ? "4" : "3"}
                    className="cursor-pointer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 120
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedEndpoint(selectedEndpoint === endpoint.id ? null : endpoint.id)}
                  />
                  
                  {/* Method Badge */}
                  <motion.rect
                    x={endpoint.position.x + 15}
                    y={endpoint.position.y + 15}
                    width="60"
                    height="25"
                    rx="6"
                    fill={methodColor}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1 + 0.3,
                        duration: 0.3 
                      }
                    }}
                  />
                  
                  <motion.text
                    x={endpoint.position.x + 45}
                    y={endpoint.position.y + 32}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="white"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1 + 0.4,
                        duration: 0.3 
                      }
                    }}
                  >
                    {endpoint.method}
                  </motion.text>
                  
                  {/* Endpoint Name */}
                  <motion.text
                    x={endpoint.position.x + 90}
                    y={endpoint.position.y + 30}
                    fontSize="16"
                    fontWeight="700"
                    fill="var(--fg-primary)"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1 + 0.5,
                        duration: 0.3 
                      }
                    }}
                  >
                    {endpoint.name}
                  </motion.text>
                  
                  {/* Endpoint Path */}
                  <motion.text
                    x={endpoint.position.x + 90}
                    y={endpoint.position.y + 50}
                    fontSize="12"
                    fontFamily="monospace"
                    fontWeight="500"
                    fill="var(--fg-secondary)"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1 + 0.6,
                        duration: 0.3 
                      }
                    }}
                  >
                    {endpoint.path}
                  </motion.text>
                  
                  {/* Performance Metrics */}
                  {endpoint.performance.slice(0, 2).map((metric, metricIndex) => (
                    <motion.text
                      key={metricIndex}
                      x={endpoint.position.x + 25}
                      y={endpoint.position.y + 80 + metricIndex * 20}
                      fontSize="11"
                      fontWeight="500"
                      fill="var(--fg-secondary)"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        transition: { 
                          delay: index * 0.1 + 0.7 + metricIndex * 0.1,
                          duration: 0.3 
                        }
                      }}
                    >
                      <tspan fontWeight="700" fill="var(--fg-primary)">{metric.metric}:</tspan> {metric.value}
                    </motion.text>
                  ))}
                  
                  {/* Category Indicator */}
                  <motion.circle
                    cx={endpoint.position.x + endpoint.size.width - 20}
                    cy={endpoint.position.y + 20}
                    r="6"
                    fill={categoryColor}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      transition: { 
                        delay: index * 0.1 + 0.8,
                        duration: 0.2 
                      }
                    }}
                  />
                </g>
              )
            })}
          </AnimatePresence>
        </svg>
      </div>

      {/* Selected Endpoint Details */}
      <AnimatePresence>
        {selectedEndpoint && (
          <motion.div
            className="p-8 rounded-xl border"
            style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {(() => {
              const endpoint = apiEndpoints.find(ep => ep.id === selectedEndpoint)
              if (!endpoint) return null
              
              const methodColor = getMethodColor(endpoint.method)
              const categoryColor = getCategoryColor(endpoint.category)
              
              return (
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div 
                      className="w-20 h-20 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: categoryColor }}
                    >
                      <Globe className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h4 className="text-2xl font-bold" style={{ color: 'var(--fg-primary)' }}>
                          {endpoint.name}
                        </h4>
                        <span 
                          className="px-3 py-1 text-xs font-bold rounded-full text-white"
                          style={{ backgroundColor: methodColor }}
                        >
                          {endpoint.method}
                        </span>
                        <span 
                          className="px-3 py-1 text-xs font-bold rounded-full uppercase"
                          style={{ backgroundColor: categoryColor + '20', color: categoryColor }}
                        >
                          {endpoint.category}
                        </span>
                      </div>
                      <div className="p-3 rounded-lg font-mono text-sm mb-4" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-primary)' }}>
                        {endpoint.method} {endpoint.path}
                      </div>
                      <p className="text-lg mb-6" style={{ color: 'var(--fg-secondary)' }}>
                        {endpoint.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                      <h5 className="text-lg font-semibold mb-4 text-brand-gold-400">
                        Performance Metrics
                      </h5>
                      <div className="space-y-3">
                        {endpoint.performance.map((metric, i) => (
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
                    
                    <div>
                      <h5 className="text-lg font-semibold mb-4 text-brand-gold-400">
                        Security Features
                      </h5>
                      <div className="space-y-3">
                        {endpoint.security.map((security, i) => (
                          <div
                            key={i}
                            className="flex items-start space-x-3 p-3 rounded-lg"
                            style={{ backgroundColor: 'var(--bg-muted)' }}
                          >
                            <Shield className="h-4 w-4 mt-0.5 text-orange-400 flex-shrink-0" />
                            <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                              {security}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-lg font-semibold mb-4 text-brand-gold-400">
                        Error Responses
                      </h5>
                      <div className="space-y-3">
                        {endpoint.errors.map((error, i) => (
                          <div
                            key={i}
                            className="flex items-start space-x-3 p-3 rounded-lg"
                            style={{ backgroundColor: 'var(--bg-muted)' }}
                          >
                            <AlertTriangle className="h-4 w-4 mt-0.5 text-red-400 flex-shrink-0" />
                            <span className="text-sm font-mono" style={{ color: 'var(--fg-secondary)' }}>
                              {error}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {showRequestResponse && (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="text-lg font-semibold text-brand-gold-400">
                            Request Example
                          </h5>
                          <button
                            onClick={() => copyToClipboard(JSON.stringify(endpoint.request, null, 2), `req-${endpoint.id}`)}
                            className="p-2 rounded-lg border border-gray-600 text-gray-400 hover:border-brand-gold-500/50 transition-all duration-300"
                          >
                            {copiedCode === `req-${endpoint.id}` ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                        <div className="p-4 rounded-lg font-mono text-sm overflow-auto" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-primary)' }}>
                          <pre>{JSON.stringify(endpoint.request, null, 2)}</pre>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="text-lg font-semibold text-brand-gold-400">
                            Response Example
                          </h5>
                          <button
                            onClick={() => copyToClipboard(JSON.stringify(endpoint.response, null, 2), `res-${endpoint.id}`)}
                            className="p-2 rounded-lg border border-gray-600 text-gray-400 hover:border-brand-gold-500/50 transition-all duration-300"
                          >
                            {copiedCode === `res-${endpoint.id}` ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                        <div className="p-4 rounded-lg font-mono text-sm overflow-auto" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-primary)' }}>
                          <pre>{JSON.stringify(endpoint.response, null, 2)}</pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default APIEndpointsDiagram
