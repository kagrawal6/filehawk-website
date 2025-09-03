import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

interface DiagramNode {
  id: string
  label: string
  type: 'ai' | 'database' | 'api' | 'frontend' | 'integration' | 'process'
  position: { x: number; y: number }
  icon: React.ComponentType<any>
  description: string
}

interface DiagramConnection {
  from: string
  to: string
  label: string
  type: 'data' | 'control' | 'trigger'
}

interface CleanFlowDiagramProps {
  title: string
  description: string
  nodes: DiagramNode[]
  connections: DiagramConnection[]
  width?: number
  height?: number
}

const CleanFlowDiagram: React.FC<CleanFlowDiagramProps> = ({
  title,
  description,
  nodes,
  connections,
  width = 800,
  height = 400
}) => {
  const [animationState, setAnimationState] = useState<'playing' | 'paused'>('paused')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const toggleAnimation = () => {
    setAnimationState(animationState === 'playing' ? 'paused' : 'playing')
  }

  const resetAnimation = () => {
    setAnimationState('paused')
    setTimeout(() => setAnimationState('playing'), 100)
  }

  const getNodeColor = (type: string) => {
    const colors = {
      ai: { bg: '#8B5CF6', border: '#A78BFA', light: '#EDE9FE' },
      database: { bg: '#10B981', border: '#34D399', light: '#D1FAE5' },
      api: { bg: '#3B82F6', border: '#60A5FA', light: '#DBEAFE' },
      frontend: { bg: '#EF4444', border: '#F87171', light: '#FEE2E2' },
      integration: { bg: '#F59E0B', border: '#FBBF24', light: '#FEF3C7' },
      process: { bg: '#6B7280', border: '#9CA3AF', light: '#F3F4F6' }
    }
    return colors[type as keyof typeof colors] || colors.process
  }

  const getConnectionColor = (type: string) => {
    const colors = {
      data: '#3B82F6',
      control: '#10B981', 
      trigger: '#F59E0B'
    }
    return colors[type as keyof typeof colors] || '#6B7280'
  }

  return (
    <div className="w-full p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
            {title}
          </h3>
          <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
            {description}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleAnimation}
            className="p-2 rounded-lg border border-brand-gold-500 text-brand-gold-400 hover:bg-brand-gold-500/10 transition-all duration-300"
          >
            {animationState === 'playing' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={resetAnimation}
            className="p-2 rounded-lg border border-gray-600 text-gray-400 hover:border-brand-gold-500/50 transition-all duration-300"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Clean SVG Diagram */}
      <div className="relative w-full rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-app)', height: `${height}px` }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="absolute inset-0">
          {/* Background Grid */}
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(156, 163, 175, 0.1)" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)"/>
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(156, 163, 175, 0.2)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Connection Lines */}
          {connections.map((connection, index) => {
            const fromNode = nodes.find(n => n.id === connection.from)
            const toNode = nodes.find(n => n.id === connection.to)
            
            if (!fromNode || !toNode) return null
            
            const color = getConnectionColor(connection.type)
            const isDashed = connection.type === 'trigger'
            
            return (
              <g key={`connection-${index}`}>
                <motion.line
                  x1={fromNode.position.x}
                  y1={fromNode.position.y}
                  x2={toNode.position.x}
                  y2={toNode.position.y}
                  stroke={color}
                  strokeWidth="2"
                  strokeDasharray={isDashed ? "5,5" : "none"}
                  opacity="0.8"
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: animationState === 'playing' ? 1 : 0,
                    transition: { 
                      delay: index * 0.2,
                      duration: 0.8 
                    }
                  }}
                />
                {/* Arrow Head */}
                <motion.polygon
                  points={`${toNode.position.x-8},${toNode.position.y-4} ${toNode.position.x-8},${toNode.position.y+4} ${toNode.position.x-2},${toNode.position.y}`}
                  fill={color}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: animationState === 'playing' ? 0.8 : 0,
                    transition: { 
                      delay: index * 0.2 + 0.5,
                      duration: 0.3 
                    }
                  }}
                />
                {/* Connection Label */}
                <motion.text
                  x={(fromNode.position.x + toNode.position.x) / 2}
                  y={(fromNode.position.y + toNode.position.y) / 2 - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fill={color}
                  fontWeight="500"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: animationState === 'playing' ? 1 : 0,
                    transition: { 
                      delay: index * 0.2 + 0.8,
                      duration: 0.3 
                    }
                  }}
                >
                  {connection.label}
                </motion.text>
              </g>
            )
          })}

          {/* Nodes */}
          {nodes.map((node, index) => {
            const colors = getNodeColor(node.type)
            const isSelected = selectedNode === node.id
            
            return (
              <g key={node.id}>
                {/* Node Background */}
                <motion.rect
                  x={node.position.x - 60}
                  y={node.position.y - 25}
                  width="120"
                  height="50"
                  rx="8"
                  fill={colors.light}
                  stroke={isSelected ? '#F59E0B' : colors.border}
                  strokeWidth={isSelected ? "3" : "2"}
                  className="cursor-pointer"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    transition: { 
                      delay: index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 120
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                />
                
                {/* Node Icon */}
                <motion.circle
                  cx={node.position.x - 30}
                  cy={node.position.y}
                  r="12"
                  fill={colors.bg}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    transition: { 
                      delay: index * 0.1 + 0.2,
                      duration: 0.3 
                    }
                  }}
                />
                
                {/* Icon placeholder - we'll render the actual icon separately */}
                <motion.circle
                  cx={node.position.x - 30}
                  cy={node.position.y}
                  r="6"
                  fill="white"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    transition: { 
                      delay: index * 0.1 + 0.3,
                      duration: 0.2 
                    }
                  }}
                />
                
                {/* Node Label */}
                <motion.text
                  x={node.position.x + 10}
                  y={node.position.y - 5}
                  fontSize="14"
                  fontWeight="600"
                  fill="var(--fg-primary)"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: { 
                      delay: index * 0.1 + 0.4,
                      duration: 0.3 
                    }
                  }}
                >
                  {node.label}
                </motion.text>
                
                {/* Node Type */}
                <motion.text
                  x={node.position.x + 10}
                  y={node.position.y + 10}
                  fontSize="10"
                  fill="var(--fg-secondary)"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: { 
                      delay: index * 0.1 + 0.5,
                      duration: 0.3 
                    }
                  }}
                >
                  {node.type.toUpperCase()}
                </motion.text>
              </g>
            )
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 p-3 rounded-lg border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="text-xs font-medium mb-2" style={{ color: 'var(--fg-primary)' }}>
            Connection Types
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-xs">
              <div className="w-4 h-0.5 bg-blue-500 mr-2"></div>
              <span style={{ color: 'var(--fg-secondary)' }}>Data Flow</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-4 h-0.5 bg-green-500 mr-2"></div>
              <span style={{ color: 'var(--fg-secondary)' }}>Control</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-4 h-0.5 bg-yellow-500 mr-2 opacity-75" style={{ backgroundImage: 'repeating-linear-gradient(to right, currentColor 0, currentColor 2px, transparent 2px, transparent 4px)' }}></div>
              <span style={{ color: 'var(--fg-secondary)' }}>Trigger</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <motion.div
          className="mt-4 p-4 rounded-lg border"
          style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {(() => {
            const node = nodes.find(n => n.id === selectedNode)
            if (!node) return null
            
            const colors = getNodeColor(node.type)
            
            return (
              <div className="flex items-start space-x-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.bg }}
                >
                  <node.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--fg-primary)' }}>
                    {node.label}
                  </h4>
                  <div className="text-xs text-brand-gold-400 mb-2 uppercase font-medium">
                    {node.type} Component
                  </div>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                    {node.description}
                  </p>
                </div>
              </div>
            )
          })()}
        </motion.div>
      )}
    </div>
  )
}

export default CleanFlowDiagram
