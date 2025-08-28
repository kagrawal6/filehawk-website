import React from 'react'

interface GoldButtonProps {
  variant?: 'solid' | 'ghost' | 'chip'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  title?: string
  href?: string
  target?: string
}

const GoldButton: React.FC<GoldButtonProps> = ({
  variant = 'solid',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  title,
  href,
  target
}) => {
  const baseClasses = 'gold-button transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400 focus-visible:ring-offset-1 focus-visible:ring-offset-brand-coal inline-flex items-center justify-center font-medium'
  
  const variantClasses = {
    solid: 'gold-button--solid',
    ghost: 'gold-button--ghost',
    chip: 'gold-button--chip'
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`

  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={classes}
        title={title}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  )
}

export default GoldButton
