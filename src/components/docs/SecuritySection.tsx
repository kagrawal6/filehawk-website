import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Key, 
  Server, 
  Monitor, 
  Database, 
  Cloud, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  EyeOff,
  Copy,
  Home,
  Globe,
  HardDrive
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const SecuritySection: React.FC = () => {
  const isAnimated = useScrollAnimation()
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Local-First Architecture Diagram
  const LocalFirstDiagram = () => (
    <div className="w-full" style={{ height: '600px' }}>
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-brand-gold-400 mb-2">Local-First Security Architecture</h3>
        <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
          All processing, AI inference, and data storage happens locally on the user's machine
        </p>
      </div>
      
      <div className="relative w-full h-full border rounded-lg p-6" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)' }}>
        {/* User's Machine Container */}
        <div className="absolute inset-4 border-2 border-dashed rounded-lg p-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="text-sm font-semibold mb-4 text-brand-gold-400">User's Local Machine</div>
          
          {/* Desktop App */}
          <div className="absolute top-12 left-6 w-32 h-20 border rounded-lg p-2 flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <Monitor className="h-6 w-6 text-brand-gold-400 mb-1" />
            <span className="text-xs font-semibold" style={{ color: 'var(--fg-primary)' }}>Desktop App</span>
            <span className="text-xs" style={{ color: 'var(--fg-secondary)' }}>Electron + React</span>
          </div>
          
          {/* API Server */}
          <div className="absolute top-12 left-44 w-32 h-20 border rounded-lg p-2 flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <Server className="h-6 w-6 text-brand-gold-400 mb-1" />
            <span className="text-xs font-semibold" style={{ color: 'var(--fg-primary)' }}>Local API</span>
            <span className="text-xs" style={{ color: 'var(--fg-secondary)' }}>Flask Server</span>
          </div>
          
          {/* AI Models */}
          <div className="absolute top-40 left-6 w-32 h-20 border rounded-lg p-2 flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <div className="text-xs font-semibold mb-1" style={{ color: 'var(--fg-primary)' }}>AI Models</div>
            <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>MSMarco + AllMiniLM</div>
            <div className="text-xs text-brand-gold-400">Local Cache</div>
          </div>
          
          {/* ChromaDB */}
          <div className="absolute top-40 left-44 w-32 h-20 border rounded-lg p-2 flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <Database className="h-6 w-6 text-brand-gold-400 mb-1" />
            <span className="text-xs font-semibold" style={{ color: 'var(--fg-primary)' }}>ChromaDB</span>
            <span className="text-xs" style={{ color: 'var(--fg-secondary)' }}>Vector Database</span>
          </div>
          
          {/* User Documents */}
          <div className="absolute top-40 left-82 w-32 h-20 border rounded-lg p-2 flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <FileText className="h-6 w-6 text-brand-gold-400 mb-1" />
            <span className="text-xs font-semibold" style={{ color: 'var(--fg-primary)' }}>Documents</span>
            <span className="text-xs" style={{ color: 'var(--fg-secondary)' }}>Read-only Access</span>
          </div>
          
          {/* Local Connections */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {/* Desktop to API */}
            <line x1="140" y1="62" x2="190" y2="62" stroke="var(--brand-gold-400)" strokeWidth="2" />
            {/* API to AI Models */}
            <line x1="210" y1="92" x2="140" y2="190" stroke="var(--brand-gold-400)" strokeWidth="2" />
            {/* API to ChromaDB */}
            <line x1="210" y1="92" x2="210" y2="190" stroke="var(--brand-gold-400)" strokeWidth="2" />
            {/* API to Documents */}
            <line x1="260" y1="92" x2="350" y2="190" stroke="var(--brand-gold-400)" strokeWidth="2" />
          </svg>
        </div>
        
        {/* External Services */}
        <div className="absolute bottom-6 left-6 right-6 h-16 border rounded-lg p-2" style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}>
          <div className="text-xs font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>Limited External Communication (Optional)</div>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <Globe className="h-4 w-4 text-brand-gold-400 mr-1" />
              <span className="text-xs" style={{ color: 'var(--fg-secondary)' }}>GitHub OAuth (Optional)</span>
            </div>
            <div className="flex items-center">
              <Cloud className="h-4 w-4 text-brand-gold-400 mr-1" />
              <span className="text-xs" style={{ color: 'var(--fg-secondary)' }}>Model Downloads (One-time)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Data Flow Security Diagram
  const DataFlowDiagram = () => (
    <div className="w-full" style={{ height: '500px' }}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-brand-gold-400 mb-2">Data Flow & Privacy Protection</h3>
        <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
          No document content or search queries leave the user's machine
        </p>
      </div>
      
      <div className="relative w-full h-full">
        {/* Local Zone */}
        <div className="absolute left-0 top-0 w-2/3 h-full border-2 border-green-500 rounded-lg p-4" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
          <div className="text-sm font-semibold text-green-500 mb-4">SECURE LOCAL ZONE</div>
          
          {/* Document Processing Flow */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-12 border rounded p-2 flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--fg-primary)' }}>
                Documents
              </div>
              <div className="text-xs text-green-500">→</div>
              <div className="w-24 h-12 border rounded p-2 flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--fg-primary)' }}>
                Text Extract
              </div>
              <div className="text-xs text-green-500">→</div>
              <div className="w-24 h-12 border rounded p-2 flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--fg-primary)' }}>
                AI Processing
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-24 h-12 border rounded p-2 flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--fg-primary)' }}>
                Search Query
              </div>
              <div className="text-xs text-green-500">→</div>
              <div className="w-24 h-12 border rounded p-2 flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--fg-primary)' }}>
                Vector Search
              </div>
              <div className="text-xs text-green-500">→</div>
              <div className="w-24 h-12 border rounded p-2 flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--fg-primary)' }}>
                Results
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <div className="text-xs font-semibold text-green-500">ALL DATA PROCESSING STAYS LOCAL</div>
          </div>
        </div>
        
        {/* External Zone */}
        <div className="absolute right-0 top-0 w-1/3 h-full border-2 border-red-500 rounded-lg p-4" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
          <div className="text-sm font-semibold text-red-500 mb-4">EXTERNAL SERVICES</div>
          
          <div className="space-y-4">
            <div className="w-full h-12 border rounded p-2 flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--fg-primary)' }}>
              GitHub OAuth
            </div>
            <div className="w-full h-12 border rounded p-2 flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--fg-primary)' }}>
              Model Downloads
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <div className="text-xs font-semibold text-red-500">NO DOCUMENT DATA</div>
          </div>
        </div>
        
        {/* Barrier */}
        <div className="absolute left-2/3 top-0 w-px h-full bg-brand-gold-400"></div>
        <div className="absolute left-2/3 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <Shield className="h-8 w-8 text-brand-gold-400" />
        </div>
      </div>
    </div>
  )

  const securityPrinciples = [
    {
      id: 'local-first',
      title: 'Local-First Processing',
      icon: Home,
      description: 'All core operations happen entirely on the user\'s machine',
      details: [
        'Document processing and text extraction performed locally',
        'AI inference using locally cached SentenceTransformers models',
        'ChromaDB vector search executed on local database',
        'No document content transmitted to external services'
      ],
      status: 'implemented'
    },
    {
      id: 'data-sovereignty', 
      title: 'Complete Data Sovereignty',
      icon: Lock,
      description: 'Users maintain full control over their documents and search data',
      details: [
        'All indexed data stored in user-controlled local database',
        'File metadata tracked locally without external synchronization',
        'Search history and preferences stored on local machine',
        'Complete data removal via local cleanup tools'
      ],
      status: 'implemented'
    },
    {
      id: 'minimal-external',
      title: 'Minimal External Communication',
      icon: EyeOff,
      description: 'Limited external communication only for optional features',
      details: [
        'GitHub OAuth for optional repository integration only',
        'One-time AI model downloads cached locally for offline use',
        'No telemetry, analytics, or usage data transmission',
        'No search queries or document content sent externally'
      ],
      status: 'implemented'
    },
    {
      id: 'secure-storage',
      title: 'Secure Token Storage',
      icon: Key,
      description: 'OAuth tokens stored securely using system keyring',
      details: [
        'GitHub tokens stored in OS keyring (Windows Credential Manager, macOS Keychain)',
        'Tokens encrypted at rest using system-level security',
        'No plaintext credential storage in application files',
        'Secure token retrieval for API authentication'
      ],
      status: 'implemented'
    }
  ]

  const dataStorageLocations = [
    {
      platform: 'Windows',
      icon: Monitor,
      path: '%APPDATA%\\Filevate\\',
      description: 'Application data stored in user\'s AppData directory'
    },
    {
      platform: 'macOS',
      icon: Monitor,
      path: '~/Library/Application Support/Filevate/',
      description: 'Data stored in standard macOS application support directory'
    },
    {
      platform: 'Linux',
      icon: Monitor,
      path: '~/.local/share/Filevate/',
      description: 'Follows XDG Base Directory specification for user data'
    }
  ]

  const securityImplementation = {
    tokenStorage: `# GitHub token storage using system keyring
import keyring

# Store token securely
keyring.set_password("filesearcher", "github_token", token)

# Retrieve token
token = keyring.get_password("filesearcher", "github_token")

# Delete token (cleanup)
keyring.delete_password("filesearcher", "github_token")`,
    
    filePermissions: `# File system permissions - read-only access
import os
import stat

def ensure_readonly_access(file_path):
    """Ensure we only have read access to user documents"""
    try:
        # Check if file is readable
        if not os.access(file_path, os.R_OK):
            return False
            
        # Verify we're not modifying source documents
        file_stats = os.stat(file_path)
        return stat.S_ISREG(file_stats.st_mode)
    except (OSError, IOError):
        return False`,
    
    networkAccess: `# Network access control - limited external communication
ALLOWED_HOSTS = [
    "api.github.com",              # GitHub API only
    "github.com",                  # OAuth flow only
    "huggingface.co",              # Model downloads only
]

def validate_external_request(url):
    """Validate external requests against whitelist"""
    from urllib.parse import urlparse
    
    parsed = urlparse(url)
    hostname = parsed.hostname
    
    if hostname not in ALLOWED_HOSTS:
        raise SecurityError(f"External request blocked: {hostname}")
    
    return True`
  }

  const currentLimitations = [
    {
      limitation: 'No encryption at rest',
      description: 'Relies on OS-level security for local data protection',
      impact: 'Medium',
      mitigation: 'Users can enable disk encryption (BitLocker, FileVault, LUKS)'
    },
    {
      limitation: 'No multi-user access control',
      description: 'Designed for single-user desktop application',
      impact: 'Low',
      mitigation: 'Use separate user accounts on shared machines'
    },
    {
      limitation: 'Basic application logging only',
      description: 'No comprehensive audit logging for enterprise use',
      impact: 'Low',
      mitigation: 'OS-level access logging can be enabled separately'
    },
    {
      limitation: 'No enterprise authentication integration',
      description: 'No SAML, LDAP, or SSO integration',
      impact: 'Medium',
      mitigation: 'Planned for future enterprise releases'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6" 
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <Shield className="h-5 w-5 mr-2 text-brand-gold-400" />
          <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
            Security & Data Privacy
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          <span style={{ color: 'var(--fg-primary)' }}>Security &</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            Privacy
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Local-first, privacy-by-design architecture ensuring complete data sovereignty and user control.
          All document processing, AI inference, and search operations happen entirely on your machine.
        </p>
      </motion.div>

      {/* Local-First Architecture Diagram */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <LocalFirstDiagram />
      </motion.section>

      {/* Security Principles */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--fg-primary)' }}>
          Core Security Principles
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {securityPrinciples.map((principle, index) => (
            <motion.div
              key={principle.id}
              className="p-6 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 mr-4">
                  <principle.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-gold-400">{principle.title}</h3>
                  <div className="flex items-center mt-1">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-500 capitalize">{principle.status}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm mb-4" style={{ color: 'var(--fg-secondary)' }}>
                {principle.description}
              </p>
              
              <ul className="space-y-2">
                {principle.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Data Flow Security Diagram */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <DataFlowDiagram />
      </motion.section>

      {/* Security Implementation */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--fg-primary)' }}>
          Security Implementation Details
        </h2>
        
        <div className="space-y-8">
          {Object.entries(securityImplementation).map(([key, code], index) => (
            <motion.div
              key={key}
              className="p-6 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-brand-gold-400">
                  {key === 'tokenStorage' ? 'Secure Token Storage' :
                   key === 'filePermissions' ? 'File System Permissions' :
                   'Network Access Control'}
                </h3>
                <button
                  onClick={() => copyToClipboard(code, key)}
                  className="flex items-center text-xs text-brand-gold-400 hover:text-brand-gold-300 transition-colors"
                >
                  {copiedCode === key ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <Copy className="h-3 w-3 mr-1" />
                  )}
                  {copiedCode === key ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="text-sm font-mono overflow-x-auto p-4 rounded border"
                   style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)', color: 'var(--fg-secondary)' }}>
                {code}
              </pre>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Data Storage Locations */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--fg-primary)' }}>
          Local Data Storage Locations
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {dataStorageLocations.map((location, index) => (
            <motion.div
              key={location.platform}
              className="p-6 rounded-xl border text-center"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.6 + index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 mb-4">
                <location.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-brand-gold-400">{location.platform}</h3>
              <div className="text-sm font-mono mb-3 p-2 rounded" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-secondary)' }}>
                {location.path}
              </div>
              <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                {location.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-4">
            <HardDrive className="h-5 w-5 text-brand-gold-400 mr-2" />
            <h3 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>Additional Cache Locations</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>AI Model Cache</h4>
              <div className="text-sm font-mono p-2 rounded" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-secondary)' }}>
                ~/.cache/huggingface/transformers/
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--fg-secondary)' }}>
                Pre-trained models cached locally for offline operation
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>System Keyring</h4>
              <div className="text-sm font-mono p-2 rounded" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-secondary)' }}>
                OS-managed secure storage
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--fg-secondary)' }}>
                OAuth tokens stored using system security mechanisms
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Current Limitations */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--fg-primary)' }}>
          Current Security Limitations
        </h2>
        
        <div className="space-y-6">
          {currentLimitations.map((limitation, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 2.0 + index * 0.1 }}
            >
              <div className="flex items-start">
                <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400 mr-4 mt-1">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{limitation.limitation}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      limitation.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                      limitation.impact === 'Medium' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {limitation.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--fg-secondary)' }}>
                    {limitation.description}
                  </p>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                    <span className="text-xs font-semibold" style={{ color: 'var(--fg-primary)' }}>Mitigation: </span>
                    <span className="text-xs" style={{ color: 'var(--fg-secondary)' }}>{limitation.mitigation}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="text-center">
            <h3 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>Enterprise Security Roadmap</h3>
            <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
              Future releases will address these limitations with enterprise authentication integration,
              encryption at rest, comprehensive audit logging, and multi-user access control.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Security Summary */}
      <motion.section 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Local-First Security & Privacy Architecture
          </h3>
          <p className="mb-8 max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            FileHawk implements a comprehensive local-first security model where all document processing,
            AI inference, and search operations remain on the user's machine. Complete data sovereignty
            with minimal external communication only for optional features.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { metric: '0%', label: 'Data Transmission', description: 'No document content sent externally' },
              { metric: '100%', label: 'Local Processing', description: 'All AI inference happens on-device' },
              { metric: 'OS-Level', label: 'Token Security', description: 'System keyring for credential storage' },
              { metric: 'Read-Only', label: 'File Access', description: 'No modification of source documents' }
            ].map((metric) => (
              <div key={metric.metric} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}>
                <div className="text-2xl font-bold text-brand-gold-400 mb-2">
                  {metric.metric}
                </div>
                <div className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                  {metric.label}
                </div>
                <div className="text-xs" style={{ color: 'var(--fg-secondary)' }}>
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-sm text-brand-gold-400">
            Privacy-by-design architecture with complete user control and data sovereignty
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default SecuritySection
