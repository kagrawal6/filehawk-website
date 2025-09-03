import React, { useState } from 'react'
import { Download as DownloadIcon, Apple, Monitor, Smartphone } from 'lucide-react'
import GoldButton from './ui/GoldButton'
import { useHawk } from './ui/HawkProvider'

const Download: React.FC = () => {
  const { setMood } = useHawk()

  const downloads = [
    {
      platform: 'Windows',
      icon: Monitor,
      version: 'v1.0.0',
      size: '45 MB',
      format: '.exe',
      description: 'Windows 10, 11 (64-bit)',
      primary: true,
      downloadUrl: '#'
    },
    {
      platform: 'macOS',
      icon: Apple,
      version: 'v1.0.0',
      size: '52 MB',
      format: '.dmg',
      description: 'macOS 11.0+ (Intel & Apple Silicon)',
      primary: true,
      downloadUrl: '#'
    }
  ]

  const handleDownload = (platform: string) => {
    setMood('happy')
    // Here you would trigger the actual download
    console.log(`Downloading for ${platform}`)
  }

  // Download Card Component with consistent hover behavior
  const DownloadCard: React.FC<{ download: typeof downloads[0] }> = ({ download }) => {
    const [isHovered, setIsHovered] = useState(false)
    const Icon = download.icon

    return (
      <div
        className="group relative h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative h-full p-8 rounded-xl transition-all duration-300 cursor-pointer ${
          isHovered ? 'z-20' : ''
        }`}
        style={{
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          boxShadow: isHovered ? '0 0 0 2px var(--accent-solid)' : 'none'
        }}>
          <div className="flex flex-col items-center space-y-6">
            {/* Platform Icon */}
            <div 
              className={`p-4 rounded-xl transition-all duration-300 ${
                isHovered ? 'scale-110' : ''
              }`}
              style={{
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent-solid)'
              }}
            >
              <Icon className="h-8 w-8" />
            </div>
            
            {/* Platform Info */}
            <div className="space-y-2 text-center">
              <h3 className={`text-xl font-semibold transition-all duration-300 origin-center ${
                isHovered ? 'scale-105' : ''
              }`} style={{ color: 'var(--fg-primary)' }}>
                {download.platform}
              </h3>
              <p className={`text-sm transition-all duration-300 origin-center ${
                isHovered ? 'scale-105' : ''
              }`} style={{ color: 'var(--fg-secondary)' }}>
                {download.description}
              </p>
              <div className={`flex items-center justify-center space-x-2 text-xs transition-all duration-300 origin-center ${
                isHovered ? 'scale-105' : ''
              }`} style={{ color: 'var(--fg-muted)' }}>
                <span>{download.version}</span>
                <span>•</span>
                <span>{download.size}</span>
                <span>•</span>
                <span>{download.format}</span>
              </div>
            </div>

            {/* Download Button */}
            <GoldButton
              variant="solid"
              size="md"
              onClick={() => handleDownload(download.platform)}
              className={`w-full transition-all duration-300 origin-center ${
                isHovered ? 'scale-105' : ''
              }`}
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              Download
            </GoldButton>
          </div>
        </div>
      </div>
    )
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {downloads.map((download, index) => (
            <DownloadCard key={index} download={download} />
          ))}
        </div>

        {/* Release Information */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm" style={{ color: 'var(--fg-secondary)' }}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Latest Release: v1.0.0</span>
            </div>
            <div className="flex items-center space-x-2">
              <DownloadIcon className="h-4 w-4" />
              <span>Released: December 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>System Requirements: 8GB RAM, 500MB Storage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Download
