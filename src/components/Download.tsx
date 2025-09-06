import React, { useState } from 'react'
import { Download as DownloadIcon, Apple, Monitor, Github } from 'lucide-react'
import GoldButton from './ui/GoldButton'
import { useHawk } from './ui/HawkProvider'
import { Link } from 'react-router-dom'

const Download: React.FC = () => {
  const { setMood } = useHawk()

  const downloads = [
    {
      platform: 'Windows',
      icon: Monitor,
      format: '.exe',
      description: 'Coming Soon',
      primary: false,
      downloadUrl: '#',
      disabled: true
    },
    {
      platform: 'macOS',
      icon: Apple,
      format: '.dmg',
      description: 'Coming Soon',
      primary: false,
      downloadUrl: '#',
      disabled: true
    },
    {
      platform: 'Install from Source',
      icon: Github,
      format: 'All Platforms',
      description: 'Windows, macOS & Linux',
      primary: true,
      downloadUrl: '/documentation/download',
      disabled: false
    }
  ]

  const handleDownload = (download: typeof downloads[0]) => {
    if (download.disabled) return
    
    setMood('happy')
    
    if (download.downloadUrl.startsWith('/')) {
      // Internal link - will be handled by Link component
      return
    }
    
    // External link or actual download
    console.log(`Downloading for ${download.platform}`)
  }

  // Download Card Component with consistent hover behavior
  const DownloadCard: React.FC<{ download: typeof downloads[0] }> = ({ download }) => {
    const [isHovered, setIsHovered] = useState(false)
    const Icon = download.icon
    const isDisabled = download.disabled

    const cardContent = (
      <div
        className={`group relative h-full ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative h-full p-8 rounded-xl transition-all duration-300 ${
          isDisabled ? 'opacity-50' : ''
        } ${
          isHovered && !isDisabled ? 'z-20' : ''
        }`}
        style={{
          backgroundColor: isDisabled ? 'var(--bg-muted)' : 'var(--bg-elevated)',
          border: `1px solid ${isDisabled ? 'var(--border-muted)' : 'var(--border-subtle)'}`,
          boxShadow: isHovered && !isDisabled ? '0 0 0 2px var(--accent-solid)' : 'none'
        }}>
          <div className="flex flex-col items-center space-y-6">
            {/* Platform Icon */}
            <div 
              className={`p-4 rounded-xl transition-all duration-300 ${
                isHovered && !isDisabled ? 'scale-110' : ''
              }`}
              style={{
                backgroundColor: isDisabled ? 'var(--bg-app)' : 'var(--accent-soft)',
                color: isDisabled ? 'var(--fg-muted)' : 'var(--accent-solid)'
              }}
            >
              <Icon className="h-8 w-8" />
            </div>
            
            {/* Platform Info */}
            <div className="space-y-2 text-center">
              <h3 className={`text-xl font-semibold transition-all duration-300 origin-center ${
                isHovered && !isDisabled ? 'scale-105' : ''
              }`} style={{ color: isDisabled ? 'var(--fg-muted)' : 'var(--fg-primary)' }}>
                {download.platform}
              </h3>
              <p className={`text-sm transition-all duration-300 origin-center ${
                isHovered && !isDisabled ? 'scale-105' : ''
              }`} style={{ color: isDisabled ? 'var(--fg-muted)' : 'var(--fg-secondary)' }}>
                {download.description}
              </p>
              <div className={`flex items-center justify-center space-x-2 text-xs transition-all duration-300 origin-center ${
                isHovered && !isDisabled ? 'scale-105' : ''
              }`} style={{ color: 'var(--fg-muted)' }}>
                <span>{download.format}</span>
              </div>
            </div>

            {/* Download Button */}
            {download.downloadUrl.startsWith('/') && !isDisabled ? (
              <Link 
                to={download.downloadUrl}
                className="w-full"
                onClick={() => handleDownload(download)}
              >
                <GoldButton
                  variant="solid"
                  size="md"
                  className={`w-full transition-all duration-300 origin-center ${
                    isHovered ? 'scale-105' : ''
                  }`}
                >
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Download
                </GoldButton>
              </Link>
            ) : (
              <GoldButton
                variant={isDisabled ? "ghost" : "solid"}
                size="md"
                onClick={() => handleDownload(download)}
                disabled={isDisabled}
                className={`w-full transition-all duration-300 origin-center ${
                  isHovered && !isDisabled ? 'scale-105' : ''
                } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                {isDisabled ? 'Coming Soon' : 'Download'}
              </GoldButton>
            )}
          </div>
        </div>
      </div>
    )

    return cardContent
  }

  return (
    <section id="download" className="py-16 relative overflow-hidden content-flow">
      {/* Subtle section overlay */}
      <div className="absolute inset-0 section-overlay" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight">
            <span style={{ color: 'var(--fg-primary)' }}>Download</span>{' '}
            <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
              FileHawk
            </span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-xl leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
            Get started with FileHawk on your preferred platform. 
            All versions include the same powerful semantic search capabilities.
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {downloads.map((download, index) => (
            <DownloadCard key={index} download={download} />
          ))}
        </div>

        {/* Release Information */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm" style={{ color: 'var(--fg-secondary)' }}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Latest Release: v1.0</span>
            </div>
            <div className="flex items-center space-x-2">
              <DownloadIcon className="h-4 w-4" />
              <span>Released: September 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>System Requirements: 8GB RAM, 500MB Storage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Download
