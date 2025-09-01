import React from 'react'

interface SoftCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  style?: React.CSSProperties
}

const SoftCard: React.FC<SoftCardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  style 
}) => {
  const hoverClasses = hover ? 'hover:border-gray-600 hover:shadow-subtle' : ''
  
  return (
    <div className={`soft-card ${hoverClasses} ${className}`} style={style}>
      {children}
    </div>
  )
}

export default SoftCard
