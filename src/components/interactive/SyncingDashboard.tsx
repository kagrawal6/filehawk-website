import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  FileText,
  FolderOpen,
  Database,
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2,
  Edit3,
  Plus,
  Move,
  Eye,
  Settings,
  Zap,
  Layers,
  Info
} from 'lucide-react'

interface FileEvent {
  id: string
  timestamp: number
  path: string
  fileName: string
  eventType: 'created' | 'modified' | 'deleted' | 'moved'
  mode: 'gist' | 'pinpoint' | 'both'
  status: 'pending' | 'processing' | 'completed' | 'error'
  processingTime?: number
  chunks?: number
  embeddings?: number
}

interface FolderStats {
  path: string
  gistChanges: number
  pinpointChanges: number
  lastUpdate: number
}

interface SyncingDashboardProps {
  className?: string
}

const SyncingDashboard: React.FC<SyncingDashboardProps> = ({ className = '' }) => {
  const [isRunning, setIsRunning] = useState(false)
  const [events, setEvents] = useState<FileEvent[]>([])
  const [folderStats, setFolderStats] = useState<FolderStats[]>([])
  const [selectedMode, setSelectedMode] = useState<'all' | 'gist' | 'pinpoint'>('all')
  const [showCompleted, setShowCompleted] = useState(true)
  const [autoScroll, setAutoScroll] = useState(true)
  
  // Performance metrics
  const [metrics, setMetrics] = useState({
    totalEvents: 0,
    avgProcessingTime: 0,
    throughput: 0,
    errorRate: 0
  })

  // Mock file paths for realistic simulation
  const mockPaths = [
    '/docs/ai/machine_learning.md',
    '/docs/ai/neural_networks.py',
    '/src/components/SearchEngine.tsx',
    '/src/utils/TextProcessor.py',
    '/data/datasets/training_data.csv',
    '/README.md',
    '/docs/api/endpoints.md',
    '/src/models/embedding_model.py',
    '/tests/unit/search_tests.py',
    '/config/app_settings.json',
    '/docs/deployment/docker_guide.md',
    '/src/database/vector_store.py'
  ]

  // Generate realistic file event
  const generateFileEvent = useCallback((): FileEvent => {
    const eventTypes: FileEvent['eventType'][] = ['created', 'modified', 'deleted', 'moved']
    const modes: FileEvent['mode'][] = ['gist', 'pinpoint', 'both']
    
    const path = mockPaths[Math.floor(Math.random() * mockPaths.length)]
    const fileName = path.split('/').pop() || 'unknown'
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    const mode = modes[Math.floor(Math.random() * modes.length)]
    
    return {
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      path,
      fileName,
      eventType,
      mode,
      status: 'pending',
      chunks: eventType !== 'deleted' ? Math.floor(Math.random() * 20) + 5 : 0,
      embeddings: eventType !== 'deleted' ? Math.floor(Math.random() * 15) + 3 : 0
    }
  }, [])

  // Process event (simulate processing time)
  const processEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId && event.status === 'pending') {
        return { ...event, status: 'processing' }
      }
      return event
    }))

    // Simulate processing delay
    const processingTime = Math.random() * 2000 + 500 // 500ms to 2.5s
    
    setTimeout(() => {
      setEvents(prev => prev.map(event => {
        if (event.id === eventId) {
          const hasError = Math.random() < 0.05 // 5% error rate
          return { 
            ...event, 
            status: hasError ? 'error' : 'completed',
            processingTime: Math.round(processingTime)
          }
        }
        return event
      }))
    }, processingTime)
  }, [])

  // Update folder stats
  const updateFolderStats = useCallback((event: FileEvent) => {
    const folderPath = event.path.substring(0, event.path.lastIndexOf('/')) || '/'
    
    setFolderStats(prev => {
      const existing = prev.find(stat => stat.path === folderPath)
      if (existing) {
        return prev.map(stat => {
          if (stat.path === folderPath) {
            return {
              ...stat,
              gistChanges: stat.gistChanges + (event.mode === 'gist' || event.mode === 'both' ? 1 : 0),
              pinpointChanges: stat.pinpointChanges + (event.mode === 'pinpoint' || event.mode === 'both' ? 1 : 0),
              lastUpdate: event.timestamp
            }
          }
          return stat
        })
      } else {
        return [...prev, {
          path: folderPath,
          gistChanges: event.mode === 'gist' || event.mode === 'both' ? 1 : 0,
          pinpointChanges: event.mode === 'pinpoint' || event.mode === 'both' ? 1 : 0,
          lastUpdate: event.timestamp
        }]
      }
    })
  }, [])

  // Start/stop simulation
  const toggleSimulation = () => {
    setIsRunning(!isRunning)
  }

  // Reset dashboard
  const resetDashboard = () => {
    setIsRunning(false)
    setEvents([])
    setFolderStats([])
    setMetrics({
      totalEvents: 0,
      avgProcessingTime: 0,
      throughput: 0,
      errorRate: 0
    })
  }

  // Add random events when running
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const event = generateFileEvent()
      setEvents(prev => [...prev, event])
      updateFolderStats(event)
      
      // Auto-process after debounce delay (500ms)
      setTimeout(() => {
        processEvent(event.id)
      }, 500)
    }, Math.random() * 3000 + 1000) // Random interval 1-4 seconds

    return () => clearInterval(interval)
  }, [isRunning, generateFileEvent, processEvent, updateFolderStats])

  // Update metrics
  useEffect(() => {
    const completedEvents = events.filter(e => e.status === 'completed' || e.status === 'error')
    const errorEvents = events.filter(e => e.status === 'error')
    const processingTimes = completedEvents.map(e => e.processingTime).filter(Boolean) as number[]
    
    setMetrics({
      totalEvents: events.length,
      avgProcessingTime: processingTimes.length > 0 
        ? Math.round(processingTimes.reduce((sum, time) => sum + time, 0) / processingTimes.length)
        : 0,
      throughput: completedEvents.length,
      errorRate: events.length > 0 ? Math.round((errorEvents.length / events.length) * 100) : 0
    })
  }, [events])

  // Filter events based on selected mode
  const filteredEvents = events.filter(event => {
    const modeFilter = selectedMode === 'all' || 
                      event.mode === selectedMode || 
                      event.mode === 'both'
    const statusFilter = showCompleted || event.status !== 'completed'
    return modeFilter && statusFilter
  })

  // Get event icon and color
  const getEventIcon = (eventType: FileEvent['eventType']) => {
    switch (eventType) {
      case 'created': return { icon: Plus, color: 'text-green-400' }
      case 'modified': return { icon: Edit3, color: 'text-blue-400' }
      case 'deleted': return { icon: Trash2, color: 'text-red-400' }
      case 'moved': return { icon: Move, color: 'text-yellow-400' }
    }
  }

  const getStatusIcon = (status: FileEvent['status']) => {
    switch (status) {
      case 'pending': return { icon: Clock, color: 'text-gray-400' }
      case 'processing': return { icon: Zap, color: 'text-brand-gold-400 animate-pulse' }
      case 'completed': return { icon: CheckCircle, color: 'text-green-400' }
      case 'error': return { icon: AlertCircle, color: 'text-red-400' }
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Algorithm Steps - First */}
      <div className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <h4 className="font-medium text-indigo-400 mb-2">Algorithm Steps:</h4>
        <ol className="list-decimal list-inside text-sm space-y-1" style={{ color: 'var(--fg-secondary)' }}>
          <li>Monitor file system events (create, modify, delete, move)</li>
          <li>Debounce rapid changes with 500ms intelligent delay</li>
          <li>Queue events by processing mode (Gist/Pinpoint)</li>
          <li>Extract and chunk modified content incrementally</li>
          <li>Update vector index with batched operations</li>
        </ol>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
            Real-Time Sync Dashboard
          </h3>
          <p style={{ color: 'var(--fg-secondary)' }}>
            Monitor file system events and indexing operations in real-time
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border" style={{ borderColor: 'var(--border-subtle)' }}>
            <button
              onClick={() => setSelectedMode('all')}
              className={`px-3 py-2 rounded-l-lg text-sm transition-all ${
                selectedMode === 'all' 
                  ? 'bg-brand-gold-500/20 text-brand-gold-400' 
                  : 'hover:bg-gray-700/50'
              }`}
              style={{ color: selectedMode === 'all' ? '' : 'var(--fg-secondary)' }}
            >
              All
            </button>
            <button
              onClick={() => setSelectedMode('gist')}
              className={`px-3 py-2 border-x text-sm transition-all ${
                selectedMode === 'gist' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'hover:bg-gray-700/50'
              }`}
              style={{ 
                borderColor: 'var(--border-subtle)',
                color: selectedMode === 'gist' ? '' : 'var(--fg-secondary)' 
              }}
            >
              Gist
            </button>
            <button
              onClick={() => setSelectedMode('pinpoint')}
              className={`px-3 py-2 rounded-r-lg text-sm transition-all ${
                selectedMode === 'pinpoint' 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'hover:bg-gray-700/50'
              }`}
              style={{ color: selectedMode === 'pinpoint' ? '' : 'var(--fg-secondary)' }}
            >
              Pinpoint
            </button>
          </div>
          
          <button
            onClick={toggleSimulation}
            className={`px-4 py-2 rounded-lg flex items-center transition-all ${
              isRunning 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
            }`}
          >
            {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isRunning ? 'Pause' : 'Start'} Simulation
          </button>
          
          <button
            onClick={resetDashboard}
            className="px-4 py-2 rounded-lg bg-gray-600/20 text-gray-400 hover:bg-gray-600/30 transition-colors flex items-center"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </button>
        </div>
      </div>

      {/* Metrics Overview - Main Visualization */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center mb-6">
          <Activity className="h-6 w-6 text-indigo-400 mr-3" />
          <h3 className="text-xl font-semibold text-primary">Real-Time Processing Metrics</h3>
          <div className="ml-auto flex items-center text-sm text-muted">
            <Info className="h-4 w-4 mr-1" />
            Live system performance
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Events', value: metrics.totalEvents, icon: Activity, color: 'text-brand-gold-400' },
            { label: 'Avg Processing', value: `${metrics.avgProcessingTime}ms`, icon: Clock, color: 'text-blue-400' },
            { label: 'Completed', value: metrics.throughput, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Error Rate', value: `${metrics.errorRate}%`, icon: AlertCircle, color: 'text-red-400' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              className="p-6 rounded-xl border text-center"
              style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <metric.icon className={`h-8 w-8 mx-auto mb-3 ${metric.color}`} />
              <div className={`text-2xl font-bold mb-1 ${metric.color}`}>
                {metric.value}
              </div>
              <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Control Panel */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Settings className="h-5 w-5 text-brand-gold-400 mr-2" />
            <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
              Sync Configuration
            </h4>
          </div>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                Show Completed
              </span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={(e) => setAutoScroll(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                Auto Scroll
              </span>
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h5 className="text-sm font-medium" style={{ color: 'var(--fg-primary)' }}>
              Debounce Settings
            </h5>
            <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
              <div>• Debounce Time: 500ms</div>
              <div>• Batch Size: 10 events</div>
              <div>• Max Queue Size: 1000</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h5 className="text-sm font-medium" style={{ color: 'var(--fg-primary)' }}>
              Processing Config
            </h5>
            <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
              <div>• Concurrent Workers: 4</div>
              <div>• Retry Attempts: 3</div>
              <div>• Timeout: 30s</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h5 className="text-sm font-medium" style={{ color: 'var(--fg-primary)' }}>
              Storage Status
            </h5>
            <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
              <div>• ChromaDB: Connected</div>
              <div>• Index Size: 2.4GB</div>
              <div>• Last Backup: 2h ago</div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Stream */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Events */}
        <div className="lg:col-span-2 p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-brand-gold-400 mr-2" />
              <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
                File System Events
              </h4>
              {isRunning && (
                <div className="ml-3 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                  <span className="text-xs text-green-400">Live</span>
                </div>
              )}
            </div>
            
            <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
              {filteredEvents.length} events
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredEvents.slice(-20).reverse().map((event) => {
                const eventIconInfo = getEventIcon(event.eventType)
                const statusIconInfo = getStatusIcon(event.status)
                const EventIcon = eventIconInfo.icon
                const StatusIcon = statusIconInfo.icon

                return (
                  <motion.div
                    key={event.id}
                    className="p-4 rounded-lg border flex items-center justify-between"
                    style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center flex-1">
                      <EventIcon className={`h-4 w-4 mr-3 ${eventIconInfo.color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium truncate" style={{ color: 'var(--fg-primary)' }}>
                            {event.fileName}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300 capitalize">
                            {event.eventType}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            event.mode === 'gist' ? 'bg-blue-500/20 text-blue-400' :
                            event.mode === 'pinpoint' ? 'bg-red-500/20 text-red-400' :
                            'bg-purple-500/20 text-purple-400'
                          }`}>
                            {event.mode}
                          </span>
                        </div>
                        <div className="text-xs truncate" style={{ color: 'var(--fg-muted)' }}>
                          {event.path}
                        </div>
                        {event.chunks !== undefined && event.eventType !== 'deleted' && (
                          <div className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>
                            {event.chunks} chunks • {event.embeddings} embeddings
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center ml-4">
                      <div className="text-right mr-3">
                        <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </div>
                        {event.processingTime && (
                          <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                            {event.processingTime}ms
                          </div>
                        )}
                      </div>
                      <StatusIcon className={`h-4 w-4 ${statusIconInfo.color}`} />
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12" style={{ color: 'var(--fg-muted)' }}>
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No file events yet. Start the simulation to see real-time sync activity.</p>
              </div>
            )}
          </div>
        </div>

        {/* Folder Statistics */}
        <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-6">
            <FolderOpen className="h-5 w-5 text-brand-gold-400 mr-2" />
            <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
              Folder Activity
            </h4>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {folderStats
              .sort((a, b) => b.lastUpdate - a.lastUpdate)
              .slice(0, 10)
              .map((folder) => (
                <motion.div
                  key={folder.path}
                  className="p-3 rounded-lg border"
                  style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="font-medium text-sm mb-2 truncate" style={{ color: 'var(--fg-primary)' }}>
                    {folder.path}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-400">
                        Gist: {folder.gistChanges}
                      </span>
                      <span className="text-red-400">
                        Pin: {folder.pinpointChanges}
                      </span>
                    </div>
                    <span style={{ color: 'var(--fg-muted)' }}>
                      {new Date(folder.lastUpdate).toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}

            {folderStats.length === 0 && (
              <div className="text-center py-8" style={{ color: 'var(--fg-muted)' }}>
                <FolderOpen className="h-8 w-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No folder activity detected</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System Architecture Info */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center mb-4">
          <Info className="h-5 w-5 text-brand-gold-400 mr-2" />
          <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>
            Sync Architecture Overview
          </h4>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h5 className="font-medium mb-3 flex items-center" style={{ color: 'var(--fg-primary)' }}>
              <Eye className="h-4 w-4 mr-2 text-blue-400" />
              File Watching
            </h5>
            <div className="space-y-1 text-sm" style={{ color: 'var(--fg-secondary)' }}>
              <div>• System-level file watchers</div>
              <div>• Cross-platform compatibility</div>
              <div>• Recursive directory monitoring</div>
              <div>• Intelligent exclusion patterns</div>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium mb-3 flex items-center" style={{ color: 'var(--fg-primary)' }}>
              <Layers className="h-4 w-4 mr-2 text-green-400" />
              Event Processing
            </h5>
            <div className="space-y-1 text-sm" style={{ color: 'var(--fg-secondary)' }}>
              <div>• Debouncing and batching</div>
              <div>• Dual-mode queue management</div>
              <div>• Priority-based processing</div>
              <div>• Error handling and retries</div>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium mb-3 flex items-center" style={{ color: 'var(--fg-primary)' }}>
              <Database className="h-4 w-4 mr-2 text-purple-400" />
              Index Updates
            </h5>
            <div className="space-y-1 text-sm" style={{ color: 'var(--fg-secondary)' }}>
              <div>• Incremental re-indexing</div>
              <div>• Vector database updates</div>
              <div>• Metadata synchronization</div>
              <div>• Consistency guarantees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SyncingDashboard