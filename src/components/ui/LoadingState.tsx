import React from 'react'

interface LoadingStateProps {
  className?: string
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  className = '', 
  text = 'Loading...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8'
  }

  return (
    <div className={`flex items-center justify-center space-x-3 ${className}`}>
      {/* Animated spinner */}
      <div className={`animate-spin rounded-full border-2 border-transparent ${sizeClasses[size]}`}
           style={{ 
             borderTopColor: 'var(--accent-solid)',
             borderRightColor: 'var(--accent-solid)'
           }} />
      
      {/* Loading text */}
      {text && (
        <span className="text-sm font-medium animate-pulse" 
              style={{ color: 'var(--fg-secondary)' }}>
          {text}
        </span>
      )}
    </div>
  )
}

export default LoadingState

// Skeleton loader component
export const SkeletonLoader: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`loading-shimmer rounded ${className}`} 
         style={{ backgroundColor: 'var(--accent-soft)' }} />
  )
}

// Card skeleton for loading states
export const CardSkeleton: React.FC = () => {
  return (
    <div className="p-8 rounded-2xl border card-shadow"
         style={{
           backgroundColor: 'var(--bg-elevated)',
           borderColor: 'var(--border-subtle)',
         }}>
      <SkeletonLoader className="w-14 h-14 rounded-xl mb-6" />
      <SkeletonLoader className="h-8 w-16 mb-2" />
      <SkeletonLoader className="h-4 w-24 mb-4" />
      <SkeletonLoader className="h-6 w-32 mb-3" />
      <SkeletonLoader className="h-4 w-full mb-2" />
      <SkeletonLoader className="h-4 w-3/4" />
    </div>
  )
}
