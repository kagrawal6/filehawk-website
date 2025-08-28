import React from 'react'
import { useHawk } from './HawkProvider'

interface HawkIconProps {
  className?: string
  size?: number
}

const HawkIcon: React.FC<HawkIconProps> = ({ className = '', size = 24 }) => {
  const { mood } = useHawk()
  
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

  return (
    <img
      src="/hawk.png"
      alt="FileHawk"
      width={size}
      height={size}
      className={`${className} ${getAnimationClass()} transition-all duration-300`}
      onError={(e) => {
        // Fallback if image fails to load
        e.currentTarget.style.display = 'none'
      }}
    />
  )
}

export default HawkIcon
