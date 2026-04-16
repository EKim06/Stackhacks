import * as React from 'react'

function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

const variants = {
  primary:
    'bg-accent text-black border border-accent hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  secondary:
    'border border-secondary text-secondary bg-transparent hover:brightness-125',
  ghost: 'bg-transparent text-primary hover:bg-white/5',
}

const Button = React.forwardRef(
  ({ className = '', children, variant = 'primary', asChild = false, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-out disabled:pointer-events-none disabled:opacity-50',
      variants[variant] ?? variants.primary,
      className
    )

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(classes, children.props.className),
        ref,
        ...props,
      })
    }

    return (
      <button ref={ref} type="button" className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
