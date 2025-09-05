import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

import HawkIcon from './ui/HawkIcon'
import GoldButton from './ui/GoldButton'
import ThemeToggle from './ui/ThemeToggle'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Documentation', href: '/documentation', type: 'route' },
    { name: 'GitHub', href: 'https://github.com/Aducj1910/FileHawk', target: '_blank', type: 'external' },
  ]

  return (
    <header className="sticky top-0 z-50 transition-all duration-100" 
            style={{ 
              background: isScrolled ? 'var(--bg-app)' : 'transparent',
              borderBottom: `1px solid var(--border-subtle)`,
              borderBottomColor: isScrolled ? 'var(--border-subtle)' : 'transparent'
            }}>
      <div className="mx-0 mt-0 rounded-none transition-all duration-300" 
           style={{ 
             background: 'transparent'
           }}>
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <HawkIcon size={32} className="transition-all duration-300" />
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
                    className="transition-colors duration-200 text-base font-medium hover:text-brand-gold-400"
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
                    className="transition-colors duration-200 text-base font-medium hover:text-brand-gold-400"
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
              size="lg"
              href="#download"
              className="shadow-md"
            >
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


      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden"
             style={{ 
               backgroundColor: 'var(--bg-elevated)'
             }}>
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => {
              if (item.type === 'route') {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-gray-300 hover:text-brand-gold-300 transition-colors duration-200 text-base font-medium"
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
                    className="block text-gray-300 hover:text-brand-gold-300 transition-colors duration-200 text-base font-medium"
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
      </div>
    </header>
  )
}

export default Header
