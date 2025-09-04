import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  path: string
  icon?: React.ComponentType<{ className?: string }>
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      <Link 
        to="/"
        className="flex items-center text-brand-gold-400 hover:text-brand-gold-300 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          <ChevronRight className="h-4 w-4 mx-1" style={{ color: 'var(--fg-muted)' }} />
          
          {index === items.length - 1 ? (
            <span 
              className="flex items-center font-medium"
              style={{ color: 'var(--fg-primary)' }}
            >
              {item.icon && <item.icon className="h-4 w-4 mr-2" />}
              {item.label}
            </span>
          ) : (
            <Link 
              to={item.path}
              className="flex items-center hover:text-brand-gold-400 transition-colors"
              style={{ color: 'var(--fg-secondary)' }}
            >
              {item.icon && <item.icon className="h-4 w-4 mr-2" />}
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumbs