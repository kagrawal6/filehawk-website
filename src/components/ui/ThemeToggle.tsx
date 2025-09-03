import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-2 rounded-lg transition-all duration-300 hover:bg-gray-800/50 dark:hover:bg-gray-700/50 light:hover:bg-gray-100/50"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun icon for light mode */}
        <Sun 
          className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
            theme === 'light' 
              ? 'rotate-0 scale-100' 
              : 'rotate-90 scale-0 text-gray-400'
          }`}
          style={{ color: theme === 'light' ? '#8c1d18' : undefined }}
        />
        
        {/* Moon icon for dark mode */}
        <Moon 
          className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
            theme === 'dark' 
              ? 'rotate-0 scale-100 text-brand-gold-400' 
              : '-rotate-90 scale-0 text-gray-400'
          }`}
        />
      </div>
      
      {/* Subtle glow effect */}
      <div 
        className="absolute inset-0 rounded-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          backgroundColor: theme === 'light' 
            ? 'rgba(140, 29, 24, 0.12)' 
            : 'var(--accent-soft)'
        }}
      />
    </button>
  )
}

export default ThemeToggle
