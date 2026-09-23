import * as React from 'react'

function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

const Card = React.forwardRef(({ className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-2xl border border-white/10 bg-[#141416] text-primary shadow-xl backdrop-blur-sm', className)}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ className = '', ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-2 p-6', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef(({ className = '', ...props }, ref) => (
  <h3 ref={ref} className={cn('text-xl font-semibold leading-tight tracking-tight text-primary', className)} {...props} />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef(({ className = '', ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-secondary leading-relaxed', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef(({ className = '', ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0 text-sm leading-relaxed', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef(({ className = '', ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0 border-t border-white/[0.08] mt-4', className)} {...props} />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
