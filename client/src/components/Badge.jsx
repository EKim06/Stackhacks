import * as React from 'react'

function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

const variants = {
  default: 'border border-white/20 bg-tertiary text-primary',
  secondary: 'border border-secondary/50 bg-transparent text-secondary',
  accent: 'border border-accent/60 bg-accent/15 text-accent',
  outline: 'border border-white/40 bg-transparent text-primary',
  success: 'border border-emerald-500/40 bg-emerald-950/40 text-emerald-200',
}

/**
 * Small pill label (status, tags). `variant` picks preset colors.
 */
function Badge({ className = '', variant = 'default', ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide',
        variants[variant] ?? variants.default,
        className
      )}
      {...props}
    />
  )
}

export { Badge }
