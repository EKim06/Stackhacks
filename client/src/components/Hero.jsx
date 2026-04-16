import React from 'react'
import { useState, useEffect } from 'react'
import { client } from '../sanityClient'


// --- Utility ---
function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}


// --- Button ---
function Button({ asChild, children, size = 'md', variant = 'default', className, ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer'
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }
  const variants = {
    default: 'bg-foreground text-background hover:bg-foreground/90',
    outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  }
  const classes = cn(base, sizes[size], variants[variant], className)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
      ...props,
    })
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

// --- InfiniteSlider ---
function InfiniteSlider({ children, speed = 40, speedOnHover = 20, gap = 112 }) {
  const [hovered, setHovered] = React.useState(false)
  const items = React.Children.toArray(children)
  const doubled = [...items, ...items]
  const duration = hovered ? speed * 2 : speed

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ '--slider-gap': `${gap}px`, '--slider-duration': `${duration}s` }}
    >
      <style>{`
        @keyframes infinite-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .slider-track {
          display: flex;
          width: max-content;
          animation: infinite-slide var(--slider-duration, 40s) linear infinite;
          gap: var(--slider-gap, 112px);
          align-items: center;
        }
      `}</style>

      <div className="slider-track">
        {doubled.map((child, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

// --- ProgressiveBlur ---
function ProgressiveBlur({ className, direction = 'left', blurIntensity = 1 }) {
  const gradient =
    direction === 'left'
      ? 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))'
      : 'linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))'

  return (
    <div
      className={className}
      style={{
        backdropFilter: `blur(${blurIntensity * 4}px)`,
        WebkitMaskImage: gradient,
        maskImage: gradient,
      }}
    />
  )
}

export default function Hero() {

    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(true)

    // FETCH EVENTS
    useEffect(() => {
    const fetchCompanies = async () => {
        try {
        const query = `*[_type == "company"] | order(_createdAt asc) {
            _id,
            title,
            "image": image.asset->url,
        }`;

        const data = await client.fetch(query);
        setCompanies(data);
        } catch (e) {
        console.error("Failed to fetch companies from Sanity: ", e);
        } finally {
        setLoading(false);
        }
    };

    fetchCompanies();
    }, []);

  return (
    <main className="overflow-x-hidden">
      <section>
        <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
          <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
              <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                Ship 10x Faster with NS
              </h1>

              <p className="mt-8 max-w-2xl text-pretty text-lg">
                Highly customizable components for building modern websites and applications that
                look and feel the way you mean it.
              </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                <Button size="lg" className="px-5 text-base">
                  <a href="#link">
                    <span className="text-nowrap">Start Building</span>
                  </a>
                </Button>

                <Button size="lg" variant="ghost" className="px-5 text-base">
                  <a href="#link">
                    <span className="text-nowrap">Request a demo</span>
                  </a>
                </Button>
              </div>
            </div>

            <img
              className="pointer-events-none order-first ml-auto h-56 w-full object-cover invert sm:h-96 lg:absolute lg:inset-0 lg:-right-20 lg:-top-96 lg:order-last lg:h-max lg:w-2/3 lg:object-contain dark:mix-blend-lighten dark:invert-0"
              src="https://ik.imagekit.io/lrigu76hy/tailark/abstract-bg.jpg?updatedAt=1745733473768"
              alt="Abstract Object"
              height="4000"
              width="3000"
            />
          </div>
        </div>
      </section>

      <section className="bg-background pb-16 md:pb-32">
        <div className="group relative m-auto max-w-6xl px-6">
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:max-w-44 md:border-r md:pr-6">
              <p className="text-end text-sm">Powering the best teams</p>
            </div>

            <div className="relative py-6 md:w-[calc(100%-11rem)]">
              <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              {loading ? (
                  <p className="text-sm text-secondary">Loading...</p>
                ) : (
                  companies.map((company) => (
                    <img
                      key={company._id}
                      className="mx-auto h-5 w-fit dark:invert"
                      src={company.image}
                      alt={`${company.title} Logo`}
                    />
                  ))
                )}
              </InfiniteSlider>

              <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
              <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>

              <ProgressiveBlur
                className="pointer-events-none absolute left-0 top-0 h-full w-20"
                direction="left"
                blurIntensity={1}
              />
              <ProgressiveBlur
                className="pointer-events-none absolute right-0 top-0 h-full w-20"
                direction="right"
                blurIntensity={1}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}