import React from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  FileSearch, 
  Bookmark, 
  Github, 
  Settings, 
  Command, 
  Activity,
  FolderOpen
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { useTheme } from '../../contexts/ThemeContext'

interface ApplicationPage {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  features: string[]
}

const applicationPages: ApplicationPage[] = [
  {
    id: 'home-page',
    title: 'Home Page (Search & Index)',
    description: 'The main interface for semantic file search and indexing operations',
    icon: Home,
    features: [
      'Semantic file search using AI-powered models (MSMarco-MiniLM-L6 for Gist mode, AllMiniLM-L6-v2 for Pinpoint mode)',
      'Dual search modes: Gist (broader search) and Pinpoint (precise search)',
      'Multi-tab search interface to run multiple searches simultaneously',
      'Real-time indexing status showing progress and current files being processed',
      'Advanced filtering by file types, date ranges, and specific folders',
      'Paginated results with load more functionality',
      'Quick actions on results: open file, re-index, toggle granular tracking'
    ]
  },
  {
    id: 'track-files',
    title: 'Track Files Page',
    description: 'Monitor and manage all indexed files with real-time sync status',
    icon: FileSearch,
    features: [
      'Monitor all indexed files with sync status in real-time',
      'File metadata display: size, last indexed time, sync status',
      'Search and filter tracked files by name or folder',
      'Sorting options by name, size, or last indexed date',
      'Real-time sync monitoring with automatic status updates every 3 seconds',
      'Pagination for handling large file collections',
      'Quick file access to open files directly from the interface'
    ]
  },
  {
    id: 'saved-page',
    title: 'Saved Page',
    description: 'Organize and manage saved search results and bookmarks',
    icon: Bookmark,
    features: [
      'Organize search results into custom folders for later reference',
      'Bookmark system to mark important findings as favorites',
      'Folder management: create, rename, and delete folders',
      'Move items between folders with drag-and-drop functionality',
      'Search within saved items to quickly find stored results',
      'Persistent storage that maintains saved items across sessions'
    ]
  },
  {
    id: 'github-connector',
    title: 'GitHub Connector Page',
    description: 'Integrate and manage GitHub repositories with semantic search capabilities',
    icon: Github,
    features: [
      'GitHub OAuth integration with device flow authentication',
      'Repository browser to view and search all GitHub repositories',
      'Clone and index repositories locally for semantic search',
      'Branch management with ability to switch, sync, and track multiple branches',
      'Real-time change detection showing modified files since last sync',
      'Batch operations for managing multiple repositories',
      'Progress tracking for cloning and indexing operations',
      'Repository caching for faster loading and offline access'
    ]
  },
  {
    id: 'settings-page',
    title: 'Settings Page',
    description: 'Configure application preferences and customize FileHawk behavior',
    icon: Settings,
    features: [
      'Appearance settings: Dark/Light/System theme selection',
      'Search preferences: Configure search behavior and result display',
      'Indexing configuration: Set file exclusion patterns and size limits',
      'Auto-indexing rules for automatic file tracking',
      'Keyboard shortcuts reference for power users',
      'Search history management with ability to clear or export',
      'Danger zone with options to delete all indexed data or reset settings',
      'Performance tuning options for indexing speed and resource usage'
    ]
  },
  {
    id: 'command-palette',
    title: 'Command Palette (Cmd/Ctrl+K)',
    description: 'Quick navigation and search interface accessible from anywhere',
    icon: Command,
    features: [
      'Quick navigation to any page or setting',
      'Global search from anywhere in the app',
      'Recent searches for quick re-run',
      'Settings jump to specific configuration sections',
      'Keyboard-driven interface for efficient navigation'
    ]
  },
  {
    id: 'status-bar',
    title: 'Status Bar (Bottom)',
    description: 'Live status indicators and quick controls at the bottom of the application',
    icon: Activity,
    features: [
      'Live indexing status with file count and progress',
      'Current search mode indicator (Gist/Pinpoint)',
      'Active model display showing which AI model is in use',
      'Quick mode toggle to switch between search modes',
      'Repository count for GitHub connections',
      'Navigation breadcrumbs showing current location'
    ]
  }
]

const ApplicationPagesSection: React.FC = () => {
  const isAnimated = useScrollAnimation()
  const { theme } = useTheme()
  
  // Function to get the appropriate screenshot based on page and theme
  const getPageScreenshot = (pageId: string): string | null => {
    
    const screenshots: Record<string, { light: string; dark: string }> = {
      'settings-page': {
        light: '/screenshots/settings_light.png',
        dark: '/screenshots/settings_dark.png'
      },
      'github-connector': {
        light: '/screenshots/github_light.png',
        dark: '/screenshots/github_dark.png'
      },
      'track-files': {
        light: '/screenshots/trackfiles_light.png',
        dark: '/screenshots/trackfiles_dark.png'
      },
      'saved-page': {
        light: '/screenshots/saved_light.png',
        dark: '/screenshots/saved_dark.png'
      },
      'home-page': {
        light: '/screenshots/home_light.png',
        dark: '/screenshots/home_dark.png'
      }
    }
    
    const pageScreenshots = screenshots[pageId]
    if (!pageScreenshots) return null
    
    return theme === 'dark' ? pageScreenshots.dark : pageScreenshots.light
  }

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
          <FolderOpen className="h-8 w-8 text-brand-gold-400 mr-3" />
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight">
            <span style={{ color: 'var(--fg-primary)' }}>Application </span>
            <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
              Pages
            </span>
          </h1>
        </div>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Complete overview of FileHawk's user interface, featuring detailed descriptions of each application page, 
          their core functionalities, and how they work together to provide a seamless semantic search experience.
        </p>
      </motion.div>

      {/* Application Pages */}
      <div className="space-y-12">
        {applicationPages.map((page, pageIndex) => (
          <motion.div
            key={page.id}
            className="p-8 rounded-xl border"
            style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 + pageIndex * 0.1 }}
          >
            {/* Page Header */}
            <div className="flex items-center mb-6">
              <div className="p-4 rounded-xl bg-brand-gold-500/20 text-brand-gold-400">
                <page.icon className="h-8 w-8" />
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
                  {page.title}
                </h2>
                <p className="text-lg" style={{ color: 'var(--fg-secondary)' }}>
                  {page.description}
                </p>
              </div>
            </div>

            {/* Page Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Features List */}
              <div className="space-y-4">
              {page.features.map((feature, featureIndex) => (
                <motion.div
                  key={featureIndex}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isAnimated ? 1 : 0, x: isAnimated ? 0 : -10 }}
                  transition={{ duration: 0.5, delay: 0.3 + pageIndex * 0.1 + featureIndex * 0.05 }}
                >
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-gold-400 mt-3 mr-4" />
                  <p className="leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
                    {feature}
                  </p>
                </motion.div>
              ))}
              </div>

              {/* Screenshot - only show for certain pages */}
              {(['settings-page', 'github-connector', 'track-files', 'saved-page', 'home-page'].includes(page.id)) && getPageScreenshot(page.id) && (
                <motion.div
                  className="lg:sticky lg:top-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: isAnimated ? 1 : 0, x: isAnimated ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.4 + pageIndex * 0.1 }}
                >
                  <div className="relative overflow-hidden rounded-xl border shadow-lg" style={{ borderColor: 'var(--border-subtle)' }}>
                    <img
                      src={getPageScreenshot(page.id)!}
                      alt={`${page.title} screenshot`}
                      className="w-full h-auto object-contain max-h-[600px]"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/screenshots/placeholder.svg'
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Info */}
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Seamless Integration
          </h3>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            All application pages are designed to work together seamlessly, providing a unified experience 
            for managing, searching, and organizing your files with AI-powered semantic intelligence. 
            Navigate between pages effortlessly using the command palette (Cmd/Ctrl+K) or the intuitive sidebar navigation.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default ApplicationPagesSection