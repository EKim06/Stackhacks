import React, { useState, useEffect, useRef } from 'react'
import { client } from '../sanityClient'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

function InfiniteSlider({ children, speed = 35, speedOnHover = 70, gap = 72 }) {
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

function ProgressiveBlur({ className, direction = 'left' }) {
  const gradient =
    direction === 'left'
      ? 'linear-gradient(to right, rgba(13,13,14,1), rgba(13,13,14,0))'
      : 'linear-gradient(to left, rgba(13,13,14,1), rgba(13,13,14,0))'

  return (
    <div
      className={className}
      style={{
        backdropFilter: 'blur(8px)',
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
        setCompanies(data || [])
      } catch (e) {
        console.error("Failed to fetch companies from Sanity: ", e)
      } finally {
        setLoading(false)
      }
    }
    fetchCompanies()
  }, [])

  return (
    <section className="overflow-x-hidden">
      {/* Hero Content Section */}
      <div className="pb-20 pt-10 sm:pt-16 md:pb-28 lg:pb-36 border-b border-white/[0.08] relative">
        <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
          <div className="mx-auto max-w-xl text-center lg:ml-0 lg:w-3/5 lg:text-left z-10 relative">
            
            {/* Clean Typographic Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-accent mb-4"
            >
              Binghamton University &middot; Student Tech Collective
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-primary leading-[1.08]"
            >
              Welcome to <br />
              <span className="text-accent font-semibold">StackHacks.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-xl text-secondary text-base sm:text-lg leading-relaxed"
            >
              Build engineering projects with real-world impact while receiving hands-on mentorship, industry networking, and collaborative development at Binghamton University.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5"
            >
              <Link to="/about" className="btn-primary w-full sm:w-auto">
                <span>About Our Club</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://www.instagram.com/stackhacksbu/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto"
              >
                <span>Latest Updates</span>
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </a>
            </motion.div>
          </div>

          {/* Right Hero Visual: Ambient Glow + Logo */}
          <div className="order-first lg:order-last mb-8 lg:mb-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 flex items-center justify-center pointer-events-none">
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
            <img
              className="relative h-44 sm:h-64 lg:h-[460px] w-auto object-contain drop-shadow-[0_20px_50px_rgba(254,178,58,0.15)]"
              src="/SHTrans.png"
              alt="StackHacks Emblem"
            />
          </div>
        </div>
      </div>

      {/* Professional Experience Logos Marquee */}
      <div className="bg-background py-10 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:max-w-44 md:border-r border-white/10 md:pr-6 shrink-0 text-center md:text-right">
              <span className="text-xs uppercase tracking-wider text-secondary/70 font-semibold block">
                Members Alumni At
              </span>
            </div>

            <div className="relative py-2 w-full overflow-hidden">
              <InfiniteSlider speed={35} speedOnHover={15} gap={48}>
                {!loading && companies.map((company) => (
                  <div
                    key={company._id}
                    className="flex items-center justify-center w-36 h-16 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 group"
                  >
                    <img
                      className="max-h-9 max-w-[110px] object-contain opacity-50 grayscale contrast-125 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-110"
                      src={company.image}
                      alt={`${company.title} Logo`}
                    />
                  </div>
                ))}
              </InfiniteSlider>

              <ProgressiveBlur
                className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
                direction="left"
              />
              <ProgressiveBlur
                className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10"
                direction="right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}