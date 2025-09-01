import React from 'react'
import { Github, Twitter, Mail, Heart } from 'lucide-react'
import HawkIcon from './ui/HawkIcon'
import { useHawk } from './ui/HawkProvider'

const Footer: React.FC = () => {
  const { setMood } = useHawk()

  const links = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Download', href: '#download' },
      { name: 'Changelog', href: '#' },
      { name: 'Roadmap', href: '#' }
    ],
    support: [
      { name: 'Documentation', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Bug Reports', href: '#' }
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'License', href: '#' }
    ]
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/your-org/filehawk' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/filehawk' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@filehawk.dev' }
  ]

  return (
    <footer className="border-t transition-colors duration-300" 
            style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div 
              className="flex items-center space-x-3 mb-4 cursor-pointer"
              onMouseEnter={() => setMood('hover')}
              onMouseLeave={() => setMood('idle')}
            >
              <HawkIcon size={28} />
              <div className="flex flex-col">
                <h3 className="font-display text-xl text-brand-gold-300">
                  FileHawk
                </h3>
                <span className="text-xs uppercase tracking-[.2em] text-brand-gold-600">
                  Semantic Search
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--fg-secondary)' }}>
              Revolutionizing file search with AI-powered semantic understanding. 
              Find files by meaning, not just filename.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-brand-gold-300"
                    style={{ color: 'var(--fg-muted)' }}
                    title={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--fg-primary)' }}>Product</h4>
              <ul className="space-y-3">
                {links.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-brand-gold-300 transition-colors duration-200 text-sm"
                      style={{ color: 'var(--fg-muted)' }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--fg-primary)' }}>Support</h4>
              <ul className="space-y-3">
                {links.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-brand-gold-300 transition-colors duration-200 text-sm"
                      style={{ color: 'var(--fg-muted)' }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--fg-primary)' }}>Company</h4>
              <ul className="space-y-3">
                {links.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-brand-gold-300 transition-colors duration-200 text-sm"
                      style={{ color: 'var(--fg-muted)' }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
              © 2024 FileHawk. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm" style={{ color: 'var(--fg-muted)' }}>
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>for developers and content creators</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
