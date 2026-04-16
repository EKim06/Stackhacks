import React, { useState, useEffect, useRef } from 'react'
import { client } from '../sanityClient'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

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
    ghost: 'hover:bg-tertiary hover:text-accent-foreground',
    accent: 'bg-accent text-background border border-accent hover:bg-accent/80'
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
function InfiniteSlider({ children, speed = 30, speedOnHover = 60, gap = 112 }) {
  const trackRef = useRef(null)
  const posRef = useRef(0)
  const hoveredRef = useRef(false)
  const rafRef = useRef(null)

  useEffect(() => {
    const animate = () => {
      const track = trackRef.current
      if (!track) { rafRef.current = requestAnimationFrame(animate); return }

      const half = track.scrollWidth / 2
      if (half === 0) { rafRef.current = requestAnimationFrame(animate); return }

      const pxPerFrame = half / ((hoveredRef.current ? speedOnHover : speed) * 60)
      posRef.current = (posRef.current + pxPerFrame) % half
      track.style.transform = `translateX(-${posRef.current}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [speed, speedOnHover])

  const items = React.Children.toArray(children)
  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => { hoveredRef.current = true }}
      onMouseLeave={() => { hoveredRef.current = false }}
    >
      <div
        ref={trackRef}
        style={{ display: 'flex', width: 'max-content', gap: `${gap}px`, alignItems: 'center', willChange: 'transform' }}
      >
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

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const query = `*[_type == "company"] | order(_createdAt asc) {
          _id,
          title,
          "image": image.asset->url,
        }`
        const data = await client.fetch(query)
        setCompanies(data)
      } catch (e) {
        console.error("Failed to fetch companies from Sanity: ", e)
      } finally {
        setLoading(false)
      }
    }
    fetchCompanies()
  }, [])

  return (
    <main className="overflow-x-hidden">
      <section>
        <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-30">
          <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
              <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                Welcome to <span className='text-accent font-bold'>StackHacks!</span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="mt-8 max-w-2xl text-pretty text-lg">
                  Build coding projects with real-world impact while receiving professional development mentorship from distinguished student leaders at Binghamton University.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button size="lg" className="px-5 text-base" variant="accent">
                      <Link to="/projects">
                        Our Projects
                      </Link>
                  </Button>

                  <Button size="lg" variant="ghost" className="px-5 text-base">
                    <a href='https://www.instagram.com/stackhacksbu/?hl=en' target="_blank" rel="noopener noreferrer">
                      <span className="text-nowrap">View Latest Updates</span>
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>

            <img
              className=" pointer-events-none order-first lg:ml-auto h-40 w-auto object-contain sm:h-56 lg:absolute lg:inset-0 lg:-right-10 lg:-top-20 lg:h-[500px] lg:w-auto lg:order-last"
              src='/SH.png'
              alt="StackHacks Logo"
            />
          </div>
        </div>
      </section>

      <section className="bg-background pb-16 md:pb-32">
        <div className="group relative m-auto max-w-6xl px-6">
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:max-w-44 md:border-r md:pr-6">
              <p className="text-end text-sm">Our Professional Experience</p>
            </div>

            <div className="relative py-6 md:w-[calc(100%-11rem)]">
              <InfiniteSlider speed={30} speedOnHover={10} gap={112}>
                {!loading && companies.map((company) => (
                  <div key={company._id} className="flex items-center justify-center w-32 h-12">
                    <img
                      className=" max-w-full max-h-full object-contain"
                      src={company.image}
                      alt={`${company.title} Logo`}
                    />
                  </div>
                ))}
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