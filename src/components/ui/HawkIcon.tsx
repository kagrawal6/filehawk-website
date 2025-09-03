import React from 'react'
import { useHawk } from './HawkProvider'
import { useTheme } from '../../contexts/ThemeContext'

interface HawkIconProps {
  className?: string
  size?: number
}

const HawkIcon: React.FC<HawkIconProps> = ({ className = '', size = 24 }) => {
  const { mood } = useHawk()
  const { theme } = useTheme()
  
  const getAnimationClass = () => {
    switch (mood) {
      case 'hover':
        return 'animate-hawk-hover'
      case 'search':
        return 'animate-hawk-fly'
      case 'happy':
        return 'animate-bounce-gentle'
      default:
        return ''
    }
  }

  // Use burgundy hawk in light mode, gold hawk in dark mode (like desktop app)
  const src = theme === 'light' ? '/hawkburgundy.png' : '/hawk.png'

  return (
    <img
      src={src}
      alt="FileHawk"
      width={size}
      height={size}
      className={`${className} ${getAnimationClass()} transition-all duration-300`}
      onError={(e) => {
        // Fallback to default hawk if burgundy fails
        if (e.currentTarget.src.indexOf('hawk.png') === -1) {
          e.currentTarget.src = '/hawk.png'
        }
      }}
    />
  )
}

export default HawkIcon
