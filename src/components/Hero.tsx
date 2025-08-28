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
          
          {/* Hero Subtext - Improved description */}
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed">
            FileHawk revolutionizes file search with AI-powered semantic understanding. 
            Find files by describing what they contain, not just their names.
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
        </div>
      </div>
    </section>
  )
}

export default Hero
