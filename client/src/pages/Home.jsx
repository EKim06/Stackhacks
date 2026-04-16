import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import Hero from '../components/Hero'



const teamMembers = [
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
]

const HOME_HEADER_LOGO_THRESHOLD_PX = 100

function Home() {

  const heroRef = useRef(null)
  return (
    <div className="relative min-h-[100dvh] bg-background">
      <div className="bg-background text-primary">
        {/* Hero Section */}
        <div ref={heroRef}>
          <Hero />
        </div>

        {/* Intro CTA Section */}
        <section className="px-4 py-14 text-center sm:px-6">
          <h2 className="mb-4 text-4xl font-bold text-primary md:text-5xl">Get involved</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-secondary">
            We are a computer science club where you can build projects, learn new skills, and connect
            with other students.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/events" className="btn-primary transition-all">
              View upcoming events
            </Link>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-background px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-primary md:text-5xl">Team</h2>
              <p className="mx-auto max-w-2xl text-xl text-secondary">
                Meet the people behind StackHacks
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {teamMembers.slice(0, 3).map((card, index) => (
                <div key={`${card.title}-${index}`}>
                  <div className="flex min-h-[220px] flex-col items-center rounded-2xl border border-white/15 bg-tertiary p-8 text-center transition-colors hover:border-white/25">
                    {card.img && (
                      <img
                        src={card.img}
                        alt=""
                        className="mb-4 h-16 w-16 rounded-full object-cover"
                      />
                    )}
                    <h3 className="mb-3 text-xl font-bold text-white">{card.title}</h3>
                    <p className="max-w-sm text-base leading-relaxed text-gray-300">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home