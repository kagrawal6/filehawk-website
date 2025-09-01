import React, { useState } from 'react'
import { Monitor, Database, Cpu, FileText, Zap } from 'lucide-react'

interface DiagramNode {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  category: string
  position: { x: number; y: number }
  connections: string[]
}

const ArchitectureDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const nodes: DiagramNode[] = [
    {
      id: 'electron',
      title: 'Electron App',
      description: 'Cross-platform desktop application with React frontend',
      icon: Monitor,
      category: 'Frontend',
      position: { x: 20, y: 20 },
      connections: ['flask-api']
    },
    {
      id: 'flask-api',
      title: 'Flask API',
      description: 'Python backend handling file processing and search requests',
      icon: Cpu,
      category: 'Backend',
      position: { x: 50, y: 50 },
      connections: ['file-processor', 'ai-engine', 'chromadb']
    },
    {
      id: 'file-processor',
      title: 'File Parser',
      description: 'Multi-format text extraction engine',
      icon: FileText,
      category: 'Processing',
      position: { x: 20, y: 80 },
      connections: ['ai-engine']
    },
    {
      id: 'ai-engine',
      title: 'AI Engine',
      description: 'SentenceTransformers model for semantic embeddings',
      icon: Zap,
      category: 'AI/ML',
      position: { x: 50, y: 80 },
      connections: ['chromadb']
    },
    {
      id: 'chromadb',
      title: 'ChromaDB',
      description: 'Vector database for similarity search',
      icon: Database,
      category: 'Database',
      position: { x: 80, y: 50 },
      connections: []
    }
  ]

  const getCategoryColor = (category: string) => {
    const colors = {
      'Frontend': 'from-blue-500/20 to-blue-600/30 border-blue-500/40',
      'Backend': 'from-green-500/20 to-green-600/30 border-green-500/40',
      'Processing': 'from-yellow-500/20 to-yellow-600/30 border-yellow-500/40',
      'AI/ML': 'from-orange-500/20 to-orange-600/30 border-orange-500/40',
      'Database': 'from-purple-500/20 to-purple-600/30 border-purple-500/40'
    }
    return colors[category as keyof typeof colors] || colors.Frontend
  }

  const getConnectionPath = (from: DiagramNode, to: DiagramNode) => {
    const fromX = from.position.x + 10 // Center of node
    const fromY = from.position.y + 5
    const toX = to.position.x + 10
    const toY = to.position.y + 5
    
    // Simple curved line
    const midX = (fromX + toX) / 2
    const midY = Math.min(fromY, toY) - 5
    
    return `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Diagram Container */}
      <div className="relative w-full h-96 p-8 rounded-2xl border"
           style={{ 
             backgroundColor: 'var(--bg-elevated)', 
             borderColor: 'var(--border-subtle)' 
           }}>
        
        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map(node => 
            node.connections.map(connId => {
              const targetNode = nodes.find(n => n.id === connId)
              if (!targetNode) return null
              
              return (
                <path
                  key={`${node.id}-${connId}`}
                  d={getConnectionPath(node, targetNode)}
                  stroke="var(--accent-solid)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.4"
                  className="transition-opacity duration-300"
                  style={{
                    opacity: (hoveredNode === node.id || hoveredNode === connId) ? 0.8 : 0.4
                  }}
                />
              )
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map(node => {
          const Icon = node.icon
          const isSelected = selectedNode === node.id
          const isHovered = hoveredNode === node.id
          
          return (
            <div
              key={node.id}
              className={`absolute cursor-pointer transition-all duration-300 transform ${
                isSelected || isHovered ? 'scale-110 z-10' : 'hover:scale-105'
              }`}
              style={{
                left: `${node.position.x}%`,
                top: `${node.position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className={`w-20 h-20 rounded-xl border-2 bg-gradient-to-br ${getCategoryColor(node.category)} 
                              flex items-center justify-center transition-all duration-300 ${
                isSelected ? 'ring-2 ring-brand-gold-500' : ''
              }`}>
                <Icon className="h-8 w-8" style={{ color: 'var(--accent-solid)' }} />
              </div>
              
              {/* Node Label */}
              <div className="mt-2 text-center">
                <div className="text-xs font-medium" style={{ color: 'var(--fg-primary)' }}>
                  {node.title}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <div className="mt-6 p-6 rounded-xl border transition-all duration-300"
             style={{ 
               backgroundColor: 'var(--bg-elevated)', 
               borderColor: 'var(--border-subtle)' 
             }}>
          {(() => {
            const node = nodes.find(n => n.id === selectedNode)
            if (!node) return null
            
            const Icon = node.icon
            return (
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${getCategoryColor(node.category)}`}>
                  <Icon className="h-6 w-6" style={{ color: 'var(--accent-solid)' }} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--fg-primary)' }}>
                      {node.title}
                    </h3>
                    <span className="px-2 py-1 text-xs font-medium rounded-full"
                          style={{ 
                            backgroundColor: 'var(--accent-soft)', 
                            color: 'var(--accent-solid)' 
                          }}>
                      {node.category}
                    </span>
                  </div>
                  
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
                    {node.description}
                  </p>
                  
                  {node.connections.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs font-medium mb-2" style={{ color: 'var(--fg-muted)' }}>
                        Connected to:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {node.connections.map(connId => {
                          const connNode = nodes.find(n => n.id === connId)
                          return connNode ? (
                            <button
                              key={connId}
                              onClick={() => setSelectedNode(connId)}
                              className="px-2 py-1 text-xs rounded-md transition-colors duration-200 hover:bg-opacity-80"
                              style={{ 
                                backgroundColor: 'var(--bg-muted)', 
                                color: 'var(--fg-primary)' 
                              }}
                            >
                              {connNode.title}
                            </button>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center">
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
          Click on any component to see details and connections
        </p>
      </div>
    </div>
  )
}

export default ArchitectureDiagram
