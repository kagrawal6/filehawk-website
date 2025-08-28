import React from 'react'

interface SoftCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

const SoftCard: React.FC<SoftCardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  const hoverClasses = hover ? 'hover:border-gray-600 hover:shadow-subtle' : ''
  
  return (
    <div className={`soft-card ${hoverClasses} ${className}`}>
      {children}
    </div>
  )
}

export default SoftCard
