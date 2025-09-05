import React from 'react'
import { Github, Twitter, Mail } from 'lucide-react'
import HawkIcon from './ui/HawkIcon'
import { useHawk } from './ui/HawkProvider'

const Footer: React.FC = () => {
  const { setMood } = useHawk()

  const links = {
    essential: [
      { name: 'Documentation', href: '/documentation' },
      { name: 'GitHub Repository', href: 'https://github.com/Aducj1910/FileHawk' },
      { name: 'Changelog', href: '/documentation/changelog' },
      { name: 'System Requirements', href: '/documentation/installation' }
    ],
    team: [
      { name: 'Adish Jain', href: 'https://www.linkedin.com/in/adishcjain/' },
      { name: 'Kushal Agrawal', href: 'https://www.linkedin.com/in/kushal200903/' }
    ]
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/Aducj1910/FileHawk' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/filehawk' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@filehawk.dev' }
  ]

  return (
    <footer className="transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
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
                  Local Semantic Search
                </span>
              </div>
            </div>

            <div className="flex space-x-4 mb-16">
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
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--fg-primary)' }}>Resources</h4>
              <ul className="space-y-3">
                {links.essential.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
              <h4 className="font-semibold mb-4" style={{ color: 'var(--fg-primary)' }}>Team</h4>
              <ul className="space-y-3">
                {links.team.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
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


      </div>
    </footer>
  )
}

export default Footer
