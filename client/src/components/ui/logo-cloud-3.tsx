import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type Logo = {
  src: string
  alt: string
  width?: number
  height?: number
  /** Black/dark SVGs need invert on dark bg. White SVGs and color PNG/ICO should be false. */
  monochrome?: boolean
}

type LogoCloudProps = ComponentProps<'div'> & {
  logos: Logo[]
}

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        'overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]',
        className
      )}
    >
      <InfiniteSlider
        gap={42}
        reverse
        duration={40}
        durationOnHover={18}
      >
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className={cn(
              // Fixed box for every logo so none reads smaller than others; art scales inside.
              'pointer-events-none h-11 w-36 shrink-0 select-none object-contain object-center sm:h-12 sm:w-40 md:h-14 md:w-44',
              logo.monochrome !== false &&
                'brightness-0 invert dark:brightness-0 dark:invert'
            )}
            height={logo.height ?? undefined}
            key={`logo-${logo.alt}`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            src={logo.src}
            width={logo.width ?? undefined}
          />
        ))}
      </InfiniteSlider>
    </div>
  )
}
