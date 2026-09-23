import * as React from 'react'

function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

const variants = {
  primary:
    'bg-accent text-black border border-accent hover:bg-[#ffbe4a] hover:shadow-[0_0_24px_rgba(254,178,58,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 active:scale-[0.98]',
  secondary:
    'border border-white/15 bg-white/[0.03] text-primary hover:border-white/30 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 active:scale-[0.98]',
  ghost:
    'bg-transparent text-secondary hover:text-primary hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 active:scale-[0.98]',
}

const Button = ({ className = '', children, variant = 'primary', asChild = false, ...props }) => {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50',
    variants[variant] ?? variants.primary,
    className
  )

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
      ...props,
    })
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}

export { Button }
