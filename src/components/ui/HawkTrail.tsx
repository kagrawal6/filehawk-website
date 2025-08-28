import React from 'react'

interface HawkTrailProps {
  className?: string
}

const HawkTrail: React.FC<HawkTrailProps> = ({ className = '' }) => {
  return (
    <div className={`hawk-trail ${className}`}>
      {/* The trail is created by CSS pseudo-elements */}
    </div>
  )
}

export default HawkTrail
