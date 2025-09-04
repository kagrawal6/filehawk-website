import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Info, Clock, Zap } from 'lucide-react'

interface SectionSummaryCardProps {
  title: string
  subtitle?: string
  description: string
  keyPoints: string[]
  estimatedTime?: string
  complexity?: 'beginner' | 'intermediate' | 'advanced'
  isExpanded?: boolean
  className?: string
  children?: React.ReactNode
}

export const SectionSummaryCard: React.FC<SectionSummaryCardProps> = ({
  title,
  subtitle,
  description,
  keyPoints,
  estimatedTime,
  complexity = 'beginner',
  isExpanded = false,
  className = '',
  children
}) => {
  const [expanded, setExpanded] = useState(isExpanded)

  const complexityColors = {
    beginner: 'text-green-400 bg-green-500/10 border-green-500/20',
    intermediate: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    advanced: 'text-red-400 bg-red-500/10 border-red-500/20'
  }

  const complexityLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate', 
    advanced: 'Advanced'
  }

  return (
    <div className={`rounded-xl border mb-6 overflow-hidden ${className}`} 
         style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
      
      {/* Header */}
      <div 
        className="p-6 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-bold" style={{ color: 'var(--fg-primary)' }}>
                {title}
              </h3>
              
              {/* Complexity Badge */}
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${complexityColors[complexity]}`}>
                {complexityLabels[complexity]}
              </span>
            </div>
            
            {subtitle && (
              <p className="text-sm mb-3 font-medium text-brand-gold-400">
                {subtitle}
              </p>
            )}
            
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--fg-secondary)' }}>
              {description}
            </p>
            
            {/* Meta Information */}
            <div className="flex items-center space-x-4 text-xs" style={{ color: 'var(--fg-muted)' }}>
              {estimatedTime && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{estimatedTime}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Info className="h-4 w-4" />
                <span>{keyPoints.length} key concepts</span>
              </div>
            </div>
          </div>
          
          {/* Expand/Collapse Icon */}
          <div className="flex-shrink-0 ml-2">
            <motion.div
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="p-2 rounded-lg hover:bg-brand-gold-500/10 transition-colors"
            >
              <ChevronRight className="h-5 w-5" style={{ color: 'var(--fg-secondary)' }} />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Expandable Content */}
      <motion.div
        initial={false}
        animate={{ 
          height: expanded ? 'auto' : 0,
          opacity: expanded ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <div className="border-t pt-4 mb-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <h4 className="flex items-center text-sm font-semibold mb-3" style={{ color: 'var(--fg-primary)' }}>
              <Zap className="h-4 w-4 mr-2 text-brand-gold-400" />
              Key Points You'll Learn
            </h4>
            
            <div className="grid md:grid-cols-2 gap-2">
              {keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start space-x-2 text-sm p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--bg-muted)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 flex-shrink-0"></div>
                  <span style={{ color: 'var(--fg-secondary)' }}>{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {children && (
            <div className="pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              {children}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default SectionSummaryCard