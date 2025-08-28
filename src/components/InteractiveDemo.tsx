import React, { useState, useEffect } from 'react'
import { Search, FileText, Code, File, ChevronRight } from 'lucide-react'
import SoftCard from './ui/SoftCard'

const InteractiveDemo: React.FC = () => {
  const [currentQuery, setCurrentQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedExample, setSelectedExample] = useState(0)

  // Example searches with realistic results
  const searchExamples = [
    {
      query: 'authentication code',
      results: [
        {
          file: 'src/auth/jwt-handler.ts',
          type: 'TypeScript',
          snippet: 'export class JwtHandler { private validateToken(token: string): boolean { const decoded = jwt.verify(token, process.env.JWT_SECRET);',
          match: 98,
          icon: Code
        },
        {
          file: 'docs/authentication.md',
          type: 'Markdown',
          snippet: '## JWT Authentication Flow The application uses JSON Web Tokens for stateless authentication. When a user logs in successfully...',
          match: 95,
          icon: FileText
        },
        {
          file: 'backend/middleware/auth.py',
          type: 'Python',
          snippet: 'def verify_auth_token(token): """Verify JWT authentication token and return user data""" try: payload = jwt.decode(token, SECRET_KEY)',
          match: 92,
          icon: Code
        }
      ]
    },
    {
      query: 'database connection',
      results: [
        {
          file: 'config/database.js',
          type: 'JavaScript',
          snippet: 'const mongoose = require("mongoose"); const connectDB = async () => { try { await mongoose.connect(process.env.MONGO_URI, {',
          match: 96,
          icon: Code
        },
        {
          file: 'models/User.js',
          type: 'JavaScript',
          snippet: 'const userSchema = new mongoose.Schema({ username: { type: String, required: true, unique: true }, email: { type: String,',
          match: 89,
          icon: Code
        },
        {
          file: 'docs/database-setup.md',
          type: 'Markdown',
          snippet: '# Database Setup Guide This document explains how to set up the MongoDB connection for the application. ## Prerequisites',
          match: 87,
          icon: FileText
        }
      ]
    },
    {
      query: 'error handling',
      results: [
        {
          file: 'utils/errorHandler.js',
          type: 'JavaScript',
          snippet: 'class CustomError extends Error { constructor(message, statusCode) { super(message); this.statusCode = statusCode; this.status = `${statusCode}`.startsWith("4")',
          match: 94,
          icon: Code
        },
        {
          file: 'middleware/globalErrorHandler.js',
          type: 'JavaScript',
          snippet: 'const globalErrorHandler = (err, req, res, next) => { let error = { ...err }; error.message = err.message; if (err.name === "CastError") {',
          match: 91,
          icon: Code
        },
        {
          file: 'docs/error-handling.md',
          type: 'Markdown',
          snippet: '# Error Handling Strategy Our application implements a comprehensive error handling system that catches and processes different types of errors',
          match: 88,
          icon: FileText
        }
      ]
    }
  ]

  const currentExample = searchExamples[selectedExample]

  // Auto-cycle through examples
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedExample((prev) => (prev + 1) % searchExamples.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Typewriter effect for current query
  useEffect(() => {
    setIsTyping(true)
    setCurrentQuery('')
    
    const targetQuery = currentExample.query
    let currentIndex = 0
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= targetQuery.length) {
        setCurrentQuery(targetQuery.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [selectedExample])

  const handleExampleClick = (index: number) => {
    setSelectedExample(index)
  }

  const handleManualSearch = (query: string) => {
    setCurrentQuery(query)
    setIsTyping(false)
  }

  return (
    <div className="mt-16 relative">
      <div className="max-w-6xl mx-auto">
        {/* Demo Header */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-white mb-2">
            Try FileHawk's Semantic Search
          </h3>
          <p className="text-gray-400 text-sm">
            See how natural language queries find relevant code and documentation
          </p>
        </div>

        {/* Quick Example Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {searchExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(index)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                selectedExample === index
                  ? 'bg-brand-gold-600 text-brand-onyx font-medium'
                  : 'bg-brand-coal text-gray-300 hover:bg-gray-700'
              }`}
            >
              "{example.query}"
            </button>
          ))}
        </div>

        {/* Interactive Search Interface */}
        <SoftCard className="p-6 bg-gradient-to-r from-brand-coal to-brand-onyx border-brand-gold-700/20">
          <div className="space-y-3">
            {/* Search Bar - exactly like FileHawk */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="block text-[13px] font-semibold text-neutral-200">
                    Search Files
                  </label>
                  <div className="flex items-center space-x-1.5">
                    <button className="p-1.5 rounded-sm border border-brand-border text-neutral-300 hover:text-neutral-100 hover:border-neutral-500 transition-colors">
                      <Search className="w-4 h-4" />
                    </button>
                    
                    <div className="px-4 py-2 bg-brand-gold-600 text-brand-onyx rounded text-sm font-medium cursor-pointer hover:bg-brand-gold-500 transition-colors">
                      {isTyping ? (
                        <span className="flex items-center space-x-2">
                          <span className="w-3 h-3 border-2 border-brand-onyx border-t-transparent rounded-full animate-spin"></span>
                          <span>Searching...</span>
                        </span>
                      ) : (
                        <>
                          <Search className="-ml-1 mr-2 h-4 w-4 inline" />
                          Search
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-neutral-500 group-focus-within:text-neutral-300 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={currentQuery}
                    onChange={(e) => handleManualSearch(e.target.value)}
                    placeholder="Enter your search query (e.g., 'machine learning algorithms', 'database connection issues')"
                    className="block w-full pl-10 pr-3 py-2 border rounded-sm leading-5 placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-2 focus:ring-neutral-400 focus:border-neutral-500 transition-colors bg-brand-coal border-brand-border text-neutral-200"
                    disabled={isTyping}
                  />
                  {isTyping && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-1 h-4 bg-brand-gold-400 animate-pulse"></div>
                    </div>
                  )}
                </div>
                <p className="mt-1.5 text-[12px] leading-5 text-neutral-500">
                  Use natural language to search through your indexed files. The search is semantic, so it understands context and meaning.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={true}
                    readOnly
                    className="h-4 w-4 text-neutral-300 focus:ring-neutral-400 border-brand-border rounded-sm bg-brand-coal"
                  />
                  <span className="ml-2 text-[12px] text-neutral-300">
                    Include granular chunks
                  </span>
                </label>
              </div>
            </div>

            {/* Search Results - exactly like FileHawk */}
            {currentQuery && (
              <div className="mt-6 space-y-4">
                <div className="text-xs text-neutral-500 flex items-center justify-between px-1">
                  <span>Found {currentExample.results.length} results in 0.03s</span>
                  <span>Showing top matches</span>
                </div>
                
                {currentExample.results.map((result, index) => {
                  const Icon = result.icon
                  return (
                    <div
                      key={`${selectedExample}-${index}`}
                      className="border border-brand-border rounded-sm bg-brand-coal hover:bg-neutral-800 transition-colors cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4 text-brand-gold-400" />
                            <span className="text-brand-gold-300 font-medium text-sm">
                              {result.file}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs rounded">
                              {result.type}
                            </span>
                            <span className="text-xs text-brand-gold-400 font-medium">
                              {result.match}%
                            </span>
                          </div>
                        </div>
                        <div className="text-neutral-300 text-sm leading-relaxed font-mono bg-brand-onyx p-3 rounded border border-brand-border/50">
                          {result.snippet}
                        </div>
                      </div>
                    </div>
                  )
                })}
                
                <div className="text-center pt-2">
                  <button className="text-brand-gold-400 text-sm hover:text-brand-gold-300 transition-colors">
                    Load more results...
                  </button>
                </div>
              </div>
            )}
          </div>
        </SoftCard>


      </div>
    </div>
  )
}

export default InteractiveDemo
