import React from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Terminal, 
  Mail, 
  Zap, 
  RefreshCw,
  Sparkles
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

interface FutureChange {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: 'distribution' | 'tools' | 'integrations' | 'performance'
}

const futureChanges: FutureChange[] = [
  {
    id: 'standalone-distribution',
    title: 'Standalone Distribution',
    description: 'Native Apple DMG installer for macOS, Windows executable installer, and Linux tarball distribution package',
    icon: Package,
    category: 'distribution'
  },
  {
    id: 'cli-tool',
    title: 'Command Line Interface',
    description: 'Terminal-based CLI tool for all platform features',
    icon: Terminal,
    category: 'tools'
  },
  {
    id: 'outlook-connector',
    title: 'Email Integration',
    description: 'Outlook connector for email search and indexing capabilities',
    icon: Mail,
    category: 'integrations'
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    description: 'Multi-threaded parallelization, device-specific optimization, and GPU-accelerated vectorization for enhanced search performance',
    icon: Zap,
    category: 'performance'
  },
  {
    id: 'automatic-sync',
    title: 'Automatic Synchronization',
    description: 'Background sync capabilities for seamless file updates',
    icon: RefreshCw,
    category: 'performance'
  }
]

const categoryColors = {
  distribution: 'from-blue-500 to-blue-600',
  tools: 'from-green-500 to-green-600',
  integrations: 'from-purple-500 to-purple-600',
  performance: 'from-orange-500 to-orange-600'
}

const FutureChangesSection: React.FC = () => {
  const isAnimated = useScrollAnimation()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-8 w-8 text-brand-gold-400 mr-3" />
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight">
            <span style={{ color: 'var(--fg-primary)' }}>Future </span>
            <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
              Changes
            </span>
          </h1>
        </div>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Planned enhancements and upcoming features for FileHawk's semantic search platform. 
          These improvements will expand distribution options, enhance performance, and provide new integration capabilities.
        </p>
      </motion.div>

      {/* Future Changes Grid */}
      <motion.div 
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {futureChanges.map((change, index) => (
          <motion.div
            key={change.id}
            className="p-8 rounded-xl border transition-all duration-300 hover:border-brand-gold-500/40 hover:shadow-lg hover:shadow-brand-gold-500/10 hover:-translate-y-1"
            style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${categoryColors[change.category]} bg-opacity-20`}>
                <change.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--fg-primary)' }}>
                  {change.title}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${categoryColors[change.category]} text-white font-medium`}>
                  {change.category.toUpperCase()}
                </span>
              </div>
            </div>
            
            <p className="leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
              {change.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Coming Soon Notice */}
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Stay Updated
          </h3>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            These features are currently in development. Follow our{' '}
            <a 
              href="https://github.com/Aducj1910/FileHawk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-gold-400 hover:text-brand-gold-300 transition-colors"
            >
              GitHub repository
            </a>{' '}
            for updates and release announcements.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default FutureChangesSection