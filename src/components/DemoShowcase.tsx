import React from 'react'
import { Monitor, Play, FileText, Search, Database, Zap } from 'lucide-react'
import SoftCard from './ui/SoftCard'
import GoldButton from './ui/GoldButton'

const DemoShowcase: React.FC = () => {
  const demoScenarios = [
    {
      title: "Developer Workflow",
      description: "Finding authentication bugs across a large codebase",
      query: "authentication bug in login system",
      files: ["auth/login-handler.js", "tests/auth-test.js", "docs/troubleshooting.md"],
      duration: "1.2 seconds"
    },
    {
      title: "Research Assistant", 
      description: "Locating specific research papers by topic and methodology",
      query: "machine learning paper about transformer architecture",
      files: ["papers/attention-is-all.pdf", "notes/transformer-summary.md", "code/transformer-impl.py"],
      duration: "0.8 seconds"
    },
    {
      title: "Business Intelligence",
      description: "Finding contract mentions and legal documents",
      query: "contract with ABC Corp about data processing",
      files: ["contracts/abc-corp-2024.pdf", "legal/data-processing-agreement.docx", "emails/abc-negotiations.eml"],
      duration: "0.6 seconds"
    }
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-brand-onyx to-brand-coal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-6">
            See FileHawk in Action
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
            Real scenarios showing how FileHawk's semantic understanding revolutionizes file discovery
          </p>
        </div>

        {/* Main Desktop App Showcase */}
        <div className="mb-16">
          <SoftCard className="p-8 md:p-12">
            {/* PLACEHOLDER: Main Application Screenshot */}
            <div className="bg-gradient-to-br from-black/40 to-brand-onyx/60 p-8 rounded-lg border-2 border-dashed border-brand-gold-500/30 mb-8">
              <div className="text-center">
                <Monitor className="mx-auto h-20 w-20 text-brand-gold-400 mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">FileHawk Desktop Application</h3>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                  Modern Electron app with React frontend, real-time indexing progress, and semantic search interface
                </p>
                
                {/* Screenshot placeholder with features */}
                <div className="bg-black/40 p-6 rounded-lg mb-6 text-left max-w-4xl mx-auto">
                  <div className="text-brand-gold-400 font-medium mb-4 text-center">PLACEHOLDER: Main Interface Screenshot</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="text-white font-medium">UI Features to Highlight:</div>
                      <div className="text-gray-300 space-y-1">
                        <div>• Clean search interface with natural language input</div>
                        <div>• Real-time indexing progress with file counts</div>
                        <div>• Expandable search results with context snippets</div>
                        <div>• File type filters and advanced options</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-white font-medium">Technical Elements:</div>
                      <div className="text-gray-300 space-y-1">
                        <div>• Dual chunking mode toggle (Gist/Granular)</div>
                        <div>• Background processing status</div>
                        <div>• File management and reindexing options</div>
                        <div>• Performance metrics display</div>
                      </div>
                    </div>
                  </div>
                </div>

                <GoldButton
                  variant="solid"
                  size="lg"
                  href="#download"
                  className="shadow-gold-glow"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Download & Try It
                </GoldButton>
              </div>
            </div>
          </SoftCard>
        </div>

        {/* Demo Scenarios */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {demoScenarios.map((scenario, index) => (
            <SoftCard key={index} className="p-6 h-full" hover>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-brand-gold-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-brand-gold-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{scenario.title}</h3>
                <p className="text-sm text-gray-400">{scenario.description}</p>
              </div>

              {/* PLACEHOLDER for scenario video/GIF */}
              <div className="bg-black/30 p-4 rounded-lg mb-4 border border-dashed border-gray-600/30">
                <div className="text-center">
                  <Play className="mx-auto h-8 w-8 text-gray-500 mb-2" />
                  <div className="text-xs text-gray-500 mb-2">PLACEHOLDER: Scenario Video/GIF</div>
                  <div className="text-xs text-brand-gold-400 font-mono">"{scenario.query}"</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs text-gray-400 font-medium">Found Files:</div>
                {scenario.files.map((file, fileIndex) => (
                  <div key={fileIndex} className="flex items-center space-x-2 text-xs">
                    <FileText className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-300 font-mono">{file}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                  <span className="text-xs text-gray-500">Search Time:</span>
                  <span className="text-xs text-brand-gold-400 font-medium">{scenario.duration}</span>
                </div>
              </div>
            </SoftCard>
          ))}
        </div>

        {/* Performance Showcase */}
        <SoftCard className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Performance Benchmarks</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real-world performance data from FileHawk processing large document collections
            </p>
          </div>

          {/* PLACEHOLDER: Performance charts/metrics */}
          <div className="bg-gradient-to-br from-black/40 to-brand-onyx/60 p-8 rounded-lg border-2 border-dashed border-brand-gold-500/30">
            <div className="text-center">
              <Zap className="mx-auto h-16 w-16 text-brand-gold-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-4">Performance Analytics</h4>
              <div className="text-sm text-brand-gold-400 mb-4">
                PLACEHOLDER: Interactive charts showing indexing speed, search latency, memory usage
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div>
                  <div className="text-2xl font-bold text-brand-gold-300 mb-1">2.1M</div>
                  <div className="text-xs text-gray-400">Files Processed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-gold-300 mb-1">47ms</div>
                  <div className="text-xs text-gray-400">Avg Search Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-gold-300 mb-1">98.7%</div>
                  <div className="text-xs text-gray-400">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-gold-300 mb-1">15GB</div>
                  <div className="text-xs text-gray-400">Data Indexed</div>
                </div>
              </div>
            </div>
          </div>
        </SoftCard>
      </div>
    </section>
  )
}

export default DemoShowcase
