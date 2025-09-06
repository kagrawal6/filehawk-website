import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Monitor, 
  Apple, 
  Terminal,
  Copy,
  CheckCircle,
  ExternalLink,
  AlertCircle,
  Play,
  FolderOpen,
  Clock,
  Search,
  Lightbulb
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const DownloadSection: React.FC = () => {
  const isAnimated = useScrollAnimation()
  const [activeTab, setActiveTab] = useState<'windows' | 'mac' | 'linux'>('windows')
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

  const tabs = [
    { id: 'windows' as const, label: 'Windows', icon: Monitor },
    { id: 'mac' as const, label: 'macOS', icon: Apple },
    { id: 'linux' as const, label: 'Linux', icon: Terminal }
  ]

  const getInstructions = () => {
    const baseSteps = {
      clone: 'git clone https://github.com/Aducj1910/FileHawk.git\ncd FileHawk',
      pythonDeps: 'pip install -r requirements.txt',
      nodeDeps: 'cd desktop-app\nnpm install\nnpm run build',
      run: 'npm start'
    }

    switch (activeTab) {
      case 'windows':
        return {
          ...baseSteps,
          venv: 'python -m venv venv\nvenv\\Scripts\\activate',
          python: 'python --version',
          node: 'node --version'
        }
      case 'mac':
      case 'linux':
        return {
          ...baseSteps,
          venv: 'python3 -m venv venv\nsource venv/bin/activate',
          python: 'python3 --version',
          node: 'node --version'
        }
    }
  }

  const instructions = getInstructions()

  const CodeBlock: React.FC<{ code: string; id: string; title: string }> = ({ code, id, title }) => (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>{title}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="flex items-center px-2 py-1 text-xs rounded transition-colors hover:bg-brand-gold-500/20"
          style={{ color: 'var(--fg-muted)' }}
        >
          {copiedCode === id ? (
            <>
              <CheckCircle className="h-3 w-3 mr-1 text-green-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="p-4 rounded-lg font-mono text-sm overflow-x-auto" style={{ backgroundColor: 'var(--bg-muted)' }}>
        <pre style={{ color: 'var(--fg-primary)' }}>{code}</pre>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 mt-8">
          <span style={{ color: 'var(--fg-primary)' }}>Download</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            FileHawk
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8" style={{ color: 'var(--fg-secondary)' }}>
          Get FileHawk running on your system in minutes. Currently available to <strong>install from source</strong> - 
          full installer packages coming soon!
        </p>

        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a 
            href="https://github.com/Aducj1910/FileHawk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-gold-500/25 transition-all duration-300 flex items-center justify-center"
          >
            <Download className="mr-2 h-5 w-5" />
            View on GitHub
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </motion.div>

      {/* Prerequisites Alert */}
      <motion.div 
        className="mb-12 p-6 rounded-xl border border-blue-500/30 bg-blue-500/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-400 mb-2">Prerequisites Required</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--fg-secondary)' }}>
              Before installing FileHawk, make sure you have:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold text-blue-400">Python 3.8+</span>
                <div style={{ color: 'var(--fg-muted)' }}>From python.org</div>
              </div>
              <div>
                <span className="font-semibold text-blue-400">Node.js 16+</span>
                <div style={{ color: 'var(--fg-muted)' }}>From nodejs.org</div>
              </div>
              <div>
                <span className="font-semibold text-blue-400">Git</span>
                <div style={{ color: 'var(--fg-muted)' }}>From git-scm.com</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Platform Tabs */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl" style={{ backgroundColor: 'var(--bg-elevated)' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${activeTab === tab.id 
                    ? 'bg-brand-gold-500 text-black shadow-lg' 
                    : 'hover:bg-gray-700/50'
                  }
                `}
                style={{ color: activeTab === tab.id ? 'black' : 'var(--fg-secondary)' }}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Installation Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Step 1: Verify Prerequisites */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center mr-4">
                  1
                </div>
                <h3 className="text-xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
                  Verify Prerequisites
                </h3>
              </div>
              <p className="mb-4" style={{ color: 'var(--fg-secondary)' }}>
                Check that you have the required tools installed:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <CodeBlock 
                  code={instructions.python}
                  id="check-python"
                  title="Check Python"
                />
                <CodeBlock 
                  code={instructions.node}
                  id="check-node"
                  title="Check Node.js"
                />
              </div>
            </div>

            {/* Step 2: Clone Repository */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white text-sm font-bold flex items-center justify-center mr-4">
                  2
                </div>
                <h3 className="text-xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
                  Clone Repository
                </h3>
              </div>
              <p className="mb-4" style={{ color: 'var(--fg-secondary)' }}>
                Download the latest FileHawk source code:
              </p>
              <CodeBlock 
                code={instructions.clone}
                id="clone-repo"
                title="Clone from GitHub"
              />
            </div>

            {/* Step 3: Setup Python Backend */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white text-sm font-bold flex items-center justify-center mr-4">
                  3
                </div>
                <h3 className="text-xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
                  Setup Python Backend
                </h3>
              </div>
              <p className="mb-4" style={{ color: 'var(--fg-secondary)' }}>
                Create virtual environment and install dependencies:
              </p>
              <div className="space-y-4">
                <CodeBlock 
                  code={instructions.venv}
                  id="setup-venv"
                  title="Create Virtual Environment"
                />
                <CodeBlock 
                  code={instructions.pythonDeps}
                  id="install-python-deps"
                  title="Install Python Dependencies"
                />
              </div>
            </div>

            {/* Step 4: Build Desktop App */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center mr-4">
                  4
                </div>
                <h3 className="text-xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
                  Build Desktop App
                </h3>
              </div>
              <p className="mb-4" style={{ color: 'var(--fg-secondary)' }}>
                Install Node.js dependencies and build the application:
              </p>
              <CodeBlock 
                code={instructions.nodeDeps}
                id="build-app"
                title="Build Application"
              />
            </div>

            {/* Step 5: Launch FileHawk */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-brand-gold-500 text-black text-sm font-bold flex items-center justify-center mr-4">
                  5
                </div>
                <h3 className="text-xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
                  Launch FileHawk
                </h3>
              </div>
              <p className="mb-4" style={{ color: 'var(--fg-secondary)' }}>
                Start the application:
              </p>
              <CodeBlock 
                code={instructions.run}
                id="run-app"
                title="Start FileHawk"
              />
              <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center mb-2">
                  <Play className="h-5 w-5 text-green-400 mr-2" />
                  <span className="font-semibold text-green-400">Ready to Search!</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                  FileHawk will open automatically. Select folders to index, then start searching with natural language queries like 
                  "machine learning research papers" or "budget planning spreadsheets".
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--fg-primary)' }}>
          First Time Usage Tips
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { 
              title: "Select Relevant Folders", 
              tip: "Focus on folders with documents, code, or text files you search",
              icon: FolderOpen,
              color: "text-blue-400"
            },
            { 
              title: "Be Patient on First Run", 
              tip: "AI models download (~100MB) and indexing takes time",
              icon: Clock,
              color: "text-orange-400"
            },
            { 
              title: "Use Descriptive Queries", 
              tip: "Instead of 'code', try 'python machine learning algorithms'",
              icon: Search,
              color: "text-green-400"
            },
            { 
              title: "Try Different Terms", 
              tip: "AI understands context and synonyms - experiment!",
              icon: Lightbulb,
              color: "text-purple-400"
            }
          ].map((tip, index) => (
            <div key={index} className="p-6 rounded-xl border text-center" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-gold-500/20 mb-4`}>
                <tip.icon className={`h-6 w-6 ${tip.color}`} />
              </div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>{tip.title}</h4>
              <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{tip.tip}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Need Help */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Need Help?
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            Having trouble with installation? Check our troubleshooting guide or visit the GitHub repository for support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://github.com/Aducj1910/FileHawk/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-brand-gold-500 text-brand-gold-400 font-semibold rounded-lg hover:bg-brand-gold-500/10 transition-all duration-300 flex items-center justify-center"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Report Issue
            </a>
            <a 
              href="https://github.com/Aducj1910/FileHawk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-brand-gold-500 text-brand-gold-400 font-semibold rounded-lg hover:bg-brand-gold-500/10 transition-all duration-300 flex items-center justify-center"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Documentation
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DownloadSection
