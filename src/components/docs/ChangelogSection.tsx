import React from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const ChangelogSection: React.FC = () => {
  const isAnimated = useScrollAnimation()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6" 
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <Activity className="h-5 w-5 mr-2 text-brand-gold-400" />
          <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
            Version History
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          <span style={{ color: 'var(--fg-primary)' }}>Changelog</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            & Releases
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Version history, release notes, feature evolution, and migration guides for FileHawk.
        </p>
      </motion.div>

      <motion.div 
        className="text-center p-12 rounded-xl border"
        style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold-500/20 text-brand-gold-400 mb-4">
            <Activity className="h-8 w-8" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
          Version History & Release Notes
        </h2>
        
        <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Comprehensive changelog with feature additions, improvements, and migration guides.
        </p>
        
        <div className="text-sm text-brand-gold-400">
          📋 Coming Soon - Release Notes, Version History & Migration Guides
        </div>
      </motion.div>
    </div>
  )
}

export default ChangelogSection
