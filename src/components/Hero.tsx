import React from 'react'
import { Search, Zap, Shield, ArrowRight } from 'lucide-react'
import GoldButton from './ui/GoldButton'
import { useHawk } from './ui/HawkProvider'

const Hero: React.FC = () => {
  const { setMood } = useHawk()

  return (
    <section className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-onyx via-brand-coal to-brand-onyx opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--brand-glow)_0%,_transparent_50%)] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="text-center">
          {/* Hero Headline - Back to the preferred version */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
            Stop hunting for files.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-300 to-brand-gold-500">
              Start finding.
            </span>
          </h1>
          
          {/* Hero Subtext - Technical positioning */}
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed">
            Advanced semantic search powered by local AI processing. Our neural embedding engine 
            understands content meaning across 15+ file formats - completely offline and private.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <GoldButton
              variant="solid"
              size="lg"
              href="#download"
              className="min-w-[200px] shadow-gold-glow"
              onClick={() => setMood('search')}
            >
              <Search className="mr-2 h-5 w-5" />
              Download Now
            </GoldButton>
            <GoldButton
              variant="ghost"
              size="lg"
              href="#features"
              className="min-w-[200px]"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </GoldButton>
          </div>

          {/* Technical highlights for recruiters */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-gold-300 mb-2">10,000+</div>
              <div className="text-sm text-gray-400">Files Indexed</div>
              <div className="text-xs text-gray-500">Under 2 minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-gold-300 mb-2">15+</div>
              <div className="text-sm text-gray-400">File Formats</div>
              <div className="text-xs text-gray-500">Specialized extraction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-gold-300 mb-2">100%</div>
              <div className="text-sm text-gray-400">Local Processing</div>
              <div className="text-xs text-gray-500">Privacy-first AI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-gold-300 mb-2">&lt;50ms</div>
              <div className="text-sm text-gray-400">Search Latency</div>
              <div className="text-xs text-gray-500">Semantic queries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
