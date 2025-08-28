import React, { useState, useEffect } from 'react'
import { Search, Zap } from 'lucide-react'

const SolutionDemo: React.FC = () => {
  const [currentExample, setCurrentExample] = useState(0)
  const [isSearching, setIsSearching] = useState(false)

  const examples = [
    {
      query: "authentication bug in login system",
      thinking: "Looking for authentication-related files with error handling...",
      results: [
        { file: "auth/login-handler.js", reason: "Contains authentication logic and error cases" },
        { file: "tests/auth-error-test.js", reason: "Tests for authentication failure scenarios" },
        { file: "docs/troubleshooting.md", reason: "Documents common authentication issues" }
      ]
    },
    {
      query: "database connection timeout",
      thinking: "Finding database connection configurations and timeout settings...", 
      results: [
        { file: "config/database.yml", reason: "Database connection timeout configuration" },
        { file: "lib/db-pool.js", reason: "Connection pool with timeout handling" },
        { file: "logs/db-errors.log", reason: "Recent database timeout errors" }
      ]
    },
    {
      query: "email template for password reset",
      thinking: "Searching for email templates related to password functionality...",
      results: [
        { file: "templates/reset-password.html", reason: "Password reset email template" },
        { file: "mailers/auth-mailer.rb", reason: "Handles password reset email sending" },
        { file: "locales/en/emails.yml", reason: "Email text content and translations" }
      ]
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSearching(true)
      setTimeout(() => {
        setCurrentExample((prev) => (prev + 1) % examples.length)
        setIsSearching(false)
      }, 1500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const current = examples[currentExample]

  return (
    <section className="py-16 sm:py-20 bg-brand-onyx">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            This is how FileHawk thinks
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Instead of matching exact words, FileHawk understands the meaning behind your search 
            and finds files based on their actual content and purpose.
          </p>
        </div>

        {/* Demo Interface */}
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 p-4 bg-brand-coal rounded-lg border border-gray-700/50">
              <Search className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300 flex-1">{current.query}</span>
              <div className="px-4 py-2 bg-brand-gold-600 text-brand-onyx rounded text-sm font-medium">
                {isSearching ? (
                  <span className="flex items-center space-x-2">
                    <span className="w-3 h-3 border-2 border-brand-onyx border-t-transparent rounded-full animate-spin"></span>
                    <span>Thinking...</span>
                  </span>
                ) : (
                  'Search'
                )}
              </div>
            </div>
          </div>

          {/* AI Thinking Process */}
          {isSearching ? (
            <div className="mb-8 p-4 bg-brand-coal/50 rounded-lg border border-brand-gold-500/20">
              <div className="flex items-center space-x-3">
                <Zap className="h-5 w-5 text-brand-gold-400" />
                <span className="text-brand-gold-300 font-medium">FileHawk AI:</span>
                <span className="text-gray-300">{current.thinking}</span>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <div className="text-sm text-gray-500 mb-4">Found {current.results.length} relevant files in 0.03s</div>
              
              {/* Results */}
              <div className="space-y-3">
                {current.results.map((result, index) => (
                  <div
                    key={index}
                    className="p-4 bg-brand-coal rounded-lg border border-gray-700/50 hover:border-brand-gold-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-brand-gold-300 font-medium">{result.file}</span>
                      <span className="text-xs text-gray-500">98% match</span>
                    </div>
                    <p className="text-gray-400 text-sm italic">
                      Why this matches: {result.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Value Proposition */}
          <div className="text-center pt-8 border-t border-gray-700/50">
            <p className="text-gray-300 mb-4">
              <span className="text-brand-gold-400 font-medium">The magic:</span> FileHawk doesn't just match words. 
              It understands context, relationships, and meaning.
            </p>
            <div className="inline-flex items-center space-x-6 text-sm text-gray-400">
              <span>⚡ 0.03s search time</span>
              <span>🔒 100% local processing</span>
              <span>🧠 Semantic understanding</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionDemo
