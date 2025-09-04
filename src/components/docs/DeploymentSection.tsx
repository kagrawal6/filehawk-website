import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  CheckCircle,
  Server,
  Copy,
  AlertTriangle,
  Zap
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { CodeExample, BashExamples } from './CodeExamples'

const DeploymentSection: React.FC = () => {
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

  const installationSteps = [
    {
      title: "Prerequisites",
      description: "Install required software components",
      commands: [
        {
          title: "Python 3.8+",
          code: `# Windows (download from python.org)
# macOS (using Homebrew)
brew install python@3.9

# Ubuntu/Debian
sudo apt update
sudo apt install python3.9 python3.9-pip python3.9-venv

# Verify installation
python3 --version`,
          platform: "cross-platform"
        },
        {
          title: "Node.js 16+",
          code: `# Windows (download from nodejs.org)
# macOS (using Homebrew)
brew install node@16

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version`,
          platform: "cross-platform"
        }
      ]
    },
    {
      title: "Source Installation",
      description: "Clone and setup the FileHawk repository",
      commands: [
        {
          title: "Clone Repository",
          code: `git clone https://github.com/your-org/filevate.git
cd filevate`,
          platform: "all"
        },
        {
          title: "Python Environment Setup",
          code: `# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# Windows
venv\\Scripts\\activate
# macOS/Linux  
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt`,
          platform: "all"
        },
        {
          title: "Desktop App Setup",
          code: `cd desktop-app

# Install Node.js dependencies
npm install

# Verify installation
npm list --depth=0`,
          platform: "all"
        }
      ]
    },
    {
      title: "AI Models Download",
      description: "Download and cache the required AI models",
      commands: [
        {
          title: "Download Models",
          code: `# Pre-download models (recommended for first-time setup)
python -c "
from sentence_transformers import SentenceTransformer
print('Downloading Gist model...')
SentenceTransformer('sentence-transformers/msmarco-MiniLM-L6-cos-v5')
print('Downloading Pinpoint model...')
SentenceTransformer('all-MiniLM-L6-v2')
print('Models downloaded successfully!')
"`,
          platform: "all"
        }
      ]
    },
    {
      title: "First Run",
      description: "Start the backend API and desktop application",
      commands: [
        {
          title: "Start Backend API",
          code: `# In project root with activated venv
python api.py

# You should see:
# Model loading and initialization messages
# "Running on http://localhost:5000"`,
          platform: "backend"
        },
        {
          title: "Start Desktop App",
          code: `# In new terminal window
cd desktop-app
npm start

# Electron app should open automatically`,
          platform: "frontend"
        },
        {
          title: "Verify Installation",
          code: `# Test API health
curl http://localhost:5000/api/health

# Expected response:
# {"status": "healthy", "version": "1.0.0", ...}`,
          platform: "verification"
        }
      ]
    }
  ]

  const configurationOptions = {
    basic: {
      title: "Basic Configuration",
      description: "Essential settings for FileHawk",
      config: `# config.py - Key settings
FOLDER_TO_INDEX = "./test_confidence_files"  # Your documents folder
GIST_EMBEDDING_MODEL = "sentence-transformers/msmarco-MiniLM-L6-cos-v5"
PINPOINT_EMBEDDING_MODEL = "all-MiniLM-L6-v2"

# Performance settings
MAX_FILE_SIZE_MB = 100
ENABLE_GRANULAR_CHUNKING = True`,
      notes: [
        "Change FOLDER_TO_INDEX to your documents directory",
        "Adjust MAX_FILE_SIZE_MB based on your system capacity",
        "ENABLE_GRANULAR_CHUNKING improves accuracy but uses more memory"
      ]
    },
    performance: {
      title: "Performance Optimization",
      description: "Settings for optimal performance",
      config: `# Performance-optimized configuration
MAX_WORKERS = 4  # Adjust based on CPU cores
INDEXING_BATCH_SIZE = 50  # Larger batches for better throughput
CHUNK_OVERLAP_LINES = 5  # Context preservation

# Memory management
ENABLE_MEMORY_OPTIMIZATION = True
CACHE_SIZE_LIMIT_MB = 512

# Search performance
ENABLE_RESULT_CACHING = True
MAX_CACHED_QUERIES = 1000`,
      notes: [
        "Increase MAX_WORKERS for faster indexing (max = CPU cores)",
        "Larger INDEXING_BATCH_SIZE improves throughput",
        "Enable caching for repeated query performance"
      ]
    },
    enterprise: {
      title: "Enterprise Configuration",
      description: "Production deployment settings",
      config: `# Enterprise deployment configuration
# Security settings
ENABLE_API_KEY_AUTH = True
API_KEY_HEADER = "X-FileHawk-API-Key"
ENABLE_RATE_LIMITING = True
RATE_LIMIT_PER_MINUTE = 100

# Logging and monitoring
LOG_LEVEL = "INFO"
ENABLE_DETAILED_LOGGING = True
LOG_FILE_PATH = "/var/log/filehawk/api.log"

# High availability
ENABLE_HEALTH_CHECKS = True
HEALTH_CHECK_INTERVAL_SECONDS = 30`,
      notes: [
        "API key authentication for production security",
        "Rate limiting prevents API abuse",
        "Comprehensive logging for monitoring and debugging"
      ]
    }
  }

  const troubleshootingIssues = [
    {
      category: "Installation Issues",
      icon: AlertTriangle,
      problems: [
        {
          problem: "Module not found errors",
          solution: `# Ensure virtual environment is activated
source venv/bin/activate  # macOS/Linux
venv\\Scripts\\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt`,
          type: "Python Environment"
        },
        {
          problem: "npm install fails",
          solution: `# Clear npm cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install`,
          type: "Node.js"
        },
        {
          problem: "Model download fails",
          solution: `# Manual download with error handling
python -c "
import os
os.environ['TRANSFORMERS_CACHE'] = './model_cache'
from sentence_transformers import SentenceTransformer
try:
    model = SentenceTransformer('sentence-transformers/msmarco-MiniLM-L6-cos-v5')
    print('Model downloaded successfully')
except Exception as e:
    print(f'Download failed: {e}')
"`,
          type: "AI Models"
        }
      ]
    },
    {
      category: "Runtime Issues", 
      icon: Server,
      problems: [
        {
          problem: "API server won't start",
          solution: `# Check if port 5000 is already in use
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill existing process if needed
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows`,
          type: "Port Conflicts"
        },
        {
          problem: "Desktop app can't connect to API",
          solution: `# Verify API is running
curl http://localhost:5000/api/health

# Check firewall settings
# Ensure localhost connections are allowed`,
          type: "Connection Issues"
        }
      ]
    },
    {
      category: "Performance Issues",
      icon: Zap,
      problems: [
        {
          problem: "Slow indexing performance",
          solution: `# Adjust config.py settings
MAX_WORKERS = 2  # Reduce if system is struggling
INDEXING_BATCH_SIZE = 25  # Reduce batch size
ENABLE_GRANULAR_CHUNKING = False  # Disable for speed`,
          type: "Configuration"
        },
        {
          problem: "High memory usage",
          solution: `# Reduce memory-intensive operations
MAX_FILE_SIZE_MB = 50  # Reduce max file size
CHUNK_OVERLAP_LINES = 1  # Reduce overlap`,
          type: "Memory Management"
        }
      ]
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6" 
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <Settings className="h-5 w-5 mr-2 text-brand-gold-400" />
          <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
            Installation & Deployment Guide
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          <span style={{ color: 'var(--fg-primary)' }}>Installation &</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            Deployment
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Complete installation guide for setting up FileHawk semantic search on Windows, macOS, and Linux.
          From source installation to configuration and troubleshooting.
        </p>
      </motion.div>

      {/* System Requirements */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--fg-primary)' }}>
          System Requirements
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Minimum Requirements */}
          <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <h3 className="text-xl font-bold mb-6 text-brand-gold-400">
              Minimum Requirements
            </h3>
            <div className="space-y-4">
              {[
                { component: "Operating System", spec: "Windows 10+, macOS 10.15+, Ubuntu 18.04+", note: "Cross-platform support" },
                { component: "Memory (RAM)", spec: "4GB minimum", note: "8GB recommended for large collections" },
                { component: "Storage", spec: "5GB free space", note: "Additional space for document indexing" },
                { component: "CPU", spec: "2 cores, 2.0 GHz", note: "AI model inference requires decent CPU" },
                { component: "Network", spec: "Internet for setup", note: "Optional after initial model download" }
              ].map((req, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{req.component}</span>
                    <span className="text-sm font-mono text-brand-gold-400">{req.spec}</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--fg-secondary)' }}>{req.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Specifications */}
          <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
            <h3 className="text-xl font-bold mb-6 text-brand-gold-400">
              Recommended Specifications
            </h3>
            <div className="space-y-4">
              {[
                { component: "Memory (RAM)", spec: "16GB+", benefit: "Better performance with large document sets" },
                { component: "Storage", spec: "SSD", benefit: "Faster indexing and search response times" },
                { component: "CPU", spec: "4+ cores, 3.0 GHz+", benefit: "Improved AI model inference speed" },
                { component: "GPU", spec: "Optional", benefit: "Can accelerate AI model inference (future support)" }
              ].map((rec, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{rec.component}</span>
                    <span className="text-sm font-mono text-brand-gold-400">{rec.spec}</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--fg-secondary)' }}>{rec.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Installation Steps */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--fg-primary)' }}>
          Installation Guide
        </h2>
        
        <div className="space-y-8">
          {installationSteps.map((step, stepIndex) => (
            <motion.div
              key={stepIndex}
              className="p-8 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isAnimated ? 1 : 0, x: isAnimated ? 0 : -20 }}
              transition={{ duration: 0.8, delay: 0.6 + stepIndex * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-brand-gold-500 text-white flex items-center justify-center font-bold mr-4">
                  {stepIndex + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--fg-primary)' }}>{step.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{step.description}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {step.commands.map((command, cmdIndex) => (
                  <div key={cmdIndex} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{command.title}</h4>
                      <button
                        onClick={() => copyToClipboard(command.code, `${stepIndex}-${cmdIndex}`)}
                        className="flex items-center text-xs text-brand-gold-400 hover:text-brand-gold-300 transition-colors"
                      >
                        {copiedCode === `${stepIndex}-${cmdIndex}` ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Copy className="h-3 w-3 mr-1" />
                        )}
                        {copiedCode === `${stepIndex}-${cmdIndex}` ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="text-xs font-mono overflow-x-auto p-3 rounded border" 
                         style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)', color: 'var(--fg-secondary)' }}>
                      {command.code}
                    </pre>
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 rounded" 
                            style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--fg-muted)' }}>
                        {command.platform}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Configuration Section */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--fg-primary)' }}>
          Configuration Options
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {Object.entries(configurationOptions).map(([key, config]) => (
            <motion.div
              key={key}
              className="p-6 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.0 + Object.keys(configurationOptions).indexOf(key) * 0.1 }}
            >
              <h3 className="text-lg font-bold mb-3 text-brand-gold-400">{config.title}</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--fg-secondary)' }}>{config.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold" style={{ color: 'var(--fg-primary)' }}>Configuration</span>
                  <button
                    onClick={() => copyToClipboard(config.config, key)}
                    className="text-xs text-brand-gold-400 hover:text-brand-gold-300"
                  >
                    {copiedCode === key ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
                <pre className="text-xs font-mono overflow-x-auto p-3 rounded border max-h-48"
                     style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)', color: 'var(--fg-secondary)' }}>
                  {config.config}
                </pre>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>Notes</h4>
                <ul className="space-y-1">
                  {config.notes.map((note, noteIndex) => (
                    <li key={noteIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 mr-2 flex-shrink-0"></div>
                      <span className="text-xs" style={{ color: 'var(--fg-secondary)' }}>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Troubleshooting */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--fg-primary)' }}>
          Troubleshooting Guide
        </h2>
        
        <div className="space-y-8">
          {troubleshootingIssues.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="p-8 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.4 + categoryIndex * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-brand-gold-500/20 text-brand-gold-400 mr-4">
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--fg-primary)' }}>{category.category}</h3>
              </div>
              
              <div className="space-y-6">
                {category.problems.map((issue, issueIndex) => (
                  <div key={issueIndex} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-muted)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{issue.problem}</h4>
                      <span className="text-xs px-2 py-1 rounded bg-brand-gold-500/20 text-brand-gold-400">
                        {issue.type}
                      </span>
                    </div>
                    <pre className="text-xs font-mono overflow-x-auto p-3 rounded border"
                         style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-subtle)', color: 'var(--fg-secondary)' }}>
                      {issue.solution}
                    </pre>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Installation Scripts & Examples */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--fg-primary)' }}>
          Installation & Deployment Scripts
        </h2>
        
        <div className="space-y-8">
          {/* Quick Installation Script */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isAnimated ? 1 : 0, x: isAnimated ? 0 : -20 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <CodeExample
              title={BashExamples.installation.title}
              description={BashExamples.installation.description}
              language={BashExamples.installation.language}
              category={BashExamples.installation.category}
              code={BashExamples.installation.code}
              output={BashExamples.installation.output}
              interactive={BashExamples.installation.interactive}
            />
          </motion.div>

          {/* Production Deployment Script */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isAnimated ? 1 : 0, x: isAnimated ? 0 : -20 }}
            transition={{ duration: 0.8, delay: 2.0 }}
          >
            <CodeExample
              title={BashExamples.deployment.title}
              description={BashExamples.deployment.description}
              language={BashExamples.deployment.language}
              category={BashExamples.deployment.category}
              code={BashExamples.deployment.code}
              output={BashExamples.deployment.output}
              interactive={BashExamples.deployment.interactive}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Installation Summary */}
      <motion.section 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
            Cross-Platform Installation Guide
          </h3>
          <p className="mb-8 max-w-3xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
            FileHawk supports source installation on Windows, macOS, and Linux with comprehensive 
            configuration options, troubleshooting guides, and performance optimization settings.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { metric: '3 Platforms', label: 'OS Support', description: 'Windows, macOS, Linux compatibility' },
              { metric: '4 Steps', label: 'Installation', description: 'Prerequisites → Setup → Models → Run' },
              { metric: '3 Configs', label: 'Configuration', description: 'Basic, Performance, Enterprise options' },
              { metric: '3 Categories', label: 'Troubleshooting', description: 'Installation, Runtime, Performance' }
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
            Source installation with Python 3.8+, Node.js 16+, and automated AI model downloading
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default DeploymentSection
