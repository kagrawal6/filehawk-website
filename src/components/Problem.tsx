import React from 'react'
import { Clock, Search, FolderX } from 'lucide-react'

const Problem: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-brand-coal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Problem Statement */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            You know the file exists. You just can't find it.
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Sound familiar? You're looking for that config file, that API documentation, 
            or that piece of code you wrote last month. You know it's there, but...
          </p>
        </div>

        {/* Pain Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="p-3 bg-red-500/10 text-red-400 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-white font-semibold">You waste 20+ minutes</h3>
            <p className="text-gray-400 text-sm">
              Clicking through folders, trying different search terms, asking teammates
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="p-3 bg-red-500/10 text-red-400 rounded-lg">
                <Search className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-white font-semibold">Keyword search fails</h3>
            <p className="text-gray-400 text-sm">
              You remember what it does, not what it's called. "Database stuff" finds nothing.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="p-3 bg-red-500/10 text-red-400 rounded-lg">
                <FolderX className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-white font-semibold">You give up and recreate</h3>
            <p className="text-gray-400 text-sm">
              Faster to write it again than find it. Until you discover the original later.
            </p>
          </div>
        </div>

        {/* Transition */}
        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <p className="text-gray-300 mb-8">
            <span className="text-brand-gold-400 font-medium">What if</span> you could just describe what you're looking for 
            and find it instantly?
          </p>
          
          {/* Trust indicators in a better context */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>100% Local & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-brand-gold-500 rounded-full"></div>
              <span>Lightning Fast Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>AI-Powered Understanding</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Problem
