import React from 'react'
import { Download as DownloadIcon, Apple, Monitor, Smartphone } from 'lucide-react'
import GoldButton from './ui/GoldButton'
import SoftCard from './ui/SoftCard'
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
    },
    {
      platform: 'Linux',
      icon: Monitor,
      version: 'v1.0.0',
      size: '48 MB',
      format: '.AppImage',
      description: 'Ubuntu 20.04+, Fedora 35+',
      primary: false,
      downloadUrl: '#'
    }
  ]

  const handleDownload = (platform: string) => {
    setMood('happy')
    // Here you would trigger the actual download
    console.log(`Downloading for ${platform}`)
  }

  return (
    <section id="download" className="py-8 relative overflow-hidden content-flow">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {downloads.map((download, index) => {
            const Icon = download.icon
            return (
              <SoftCard 
                key={index}
                className={`p-8 text-center transition-all duration-300 hover:border-brand-gold-500/40 group ${
                  download.primary ? 'ring-1 ring-brand-gold-500/30 bg-gradient-to-br from-brand-coal to-brand-onyx' : ''
                }`}
                hover
              >
                <div className="flex flex-col items-center space-y-6">
                  {/* Platform Icon */}
                  <div className={`p-4 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                    download.primary 
                      ? 'bg-brand-gold-600/20 text-brand-gold-300 ring-1 ring-brand-gold-500/30' 
                      : 'bg-gray-800 text-gray-300 group-hover:bg-brand-gold-600/10 group-hover:text-brand-gold-400'
                  }`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  {/* Platform Info */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-brand-gold-200 transition-colors">
                      {download.platform}
                    </h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      {download.description}
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <span>{download.version}</span>
                      <span>•</span>
                      <span>{download.size}</span>
                      <span>•</span>
                      <span>{download.format}</span>
                    </div>
                  </div>

                  {/* Download Button */}
                  <GoldButton
                    variant={download.primary ? 'solid' : 'ghost'}
                    size="md"
                    className="w-full"
                    onClick={() => handleDownload(download.platform)}
                    href={download.downloadUrl}
                  >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Download
                  </GoldButton>
                </div>
              </SoftCard>
            )
          })}
        </div>

        {/* Release Information */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
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

          {/* Additional Download Options */}
          <div className="pt-8 border-t border-brand-border/30">
            <p className="text-gray-400 text-sm mb-4">
              Looking for other options?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <GoldButton
                variant="ghost"
                size="sm"
                href="https://github.com/your-org/filehawk/releases"
                target="_blank"
              >
                View All Releases
              </GoldButton>
              <GoldButton
                variant="ghost"
                size="sm"
                href="https://github.com/your-org/filehawk"
                target="_blank"
              >
                Source Code
              </GoldButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Download
