import React, { useState } from 'react'
import { Menu, X, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import HawkTrail from './ui/HawkTrail'
import GoldButton from './ui/GoldButton'
import ThemeToggle from './ui/ThemeToggle'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'How It Works', href: '#how-it-works', type: 'scroll' },
    { name: 'Technical', href: '/technical', type: 'route' },
    { name: 'Download', href: '#download', type: 'scroll' },
    { name: 'GitHub', href: 'https://github.com/kagrawal6/filehawk-website', target: '_blank', type: 'external' },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg border-b transition-colors duration-300" 
            style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/hawk.png"
                alt="FileHawk"
                width={32}
                height={32}
                className="transition-all duration-300"
              />
              <div className="flex flex-col">
                <h1 className="font-display text-2xl tracking-[-0.01em] text-brand-gold-300">
                  FileHawk
                </h1>
                <span className="text-xs uppercase tracking-[.25em] text-brand-gold-600 font-medium">
                  Local Semantic Search
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              if (item.type === 'route') {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="transition-colors duration-200 text-sm font-medium hover:text-brand-gold-400"
                    style={{ color: 'var(--fg-secondary)' }}
                  >
                    {item.name}
                  </Link>
                )
              } else {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.target}
                    className="transition-colors duration-200 text-sm font-medium hover:text-brand-gold-400"
                    style={{ color: 'var(--fg-secondary)' }}
                  >
                    {item.name}
                  </a>
                )
              }
            })}
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Download CTA */}
            <GoldButton
              variant="solid"
              size="sm"
              href="#download"
              className="shadow-md"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </GoldButton>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Hawk Trail */}
        <div className="pb-4">
          <HawkTrail />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-onyx border-t border-brand-border">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => {
              if (item.type === 'route') {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-gray-300 hover:text-brand-gold-300 transition-colors duration-200 text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              } else {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.target}
                    className="block text-gray-300 hover:text-brand-gold-300 transition-colors duration-200 text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              }
            })}

          </div>
        </div>
      )}
    </header>
  )
}

export default Header
