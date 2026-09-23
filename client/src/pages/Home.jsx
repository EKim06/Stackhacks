import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import RadialOrbitalTimeline from '../components/Radial-orbital-timeline'
import { icons, ArrowRight, Code } from 'lucide-react'
import { TextEffect } from '../components/Text'
import Constellation from '../components/Constellation'
import { client } from '../sanityClient'

// Smart dynamic icon resolver: access ANY Lucide icon by name without manual imports
const getTrackIcon = (name) => {
  if (!name) return Code
  if (name === 'Code2') return icons.CodeXml || Code
  return icons[name] || Code
}

function Home() {
  const heroRef = useRef(null)
  const [tracks, setTracks] = useState([])
  const [loadingTracks, setLoadingTracks] = useState(true)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const query = `*[_type == "projectTrack"] | order(order asc, _createdAt asc) {
          _id,
          title,
          orbitLabel,
          icon,
          content,
          order,
          "relatedIds": relatedTracks[]->._id
        }`
        const data = await client.fetch(query)
        if (data && data.length > 0) {
          const formatted = data.map((track, idx) => ({
            id: track._id || idx + 1,
            title: track.title,
            orbitLabel: track.orbitLabel || track.title,
            icon: getTrackIcon(track.icon),
            content: track.content || '',
            relatedIds: track.relatedIds ? track.relatedIds.filter(Boolean) : [],
          }))
          setTracks(formatted)
        } else {
          setTracks([])
        }
      } catch (err) {
        console.error('Failed to fetch project tracks from Sanity:', err)
      } finally {
        setLoadingTracks(false)
      }
    }

    fetchTracks()
  }, [])

  return (
    <div className="relative min-h-screen bg-background">
      <Constellation />
      
      <div className="relative z-10 text-primary">
        <div ref={heroRef}>
          <Hero />
        </div>

        {/* Get Involved Section */}
        <section className="px-6 py-20 text-center max-w-4xl mx-auto space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-accent mb-2"
          >
            Join Our Community
          </motion.p>

          <TextEffect
            as="h2"
            per="word"
            preset="slide"
            inView
            className="text-4xl sm:text-5xl font-semibold tracking-tight text-primary"
          >
            Built for creators, hackers, and leaders.
          </TextEffect>

          <TextEffect
            as="p"
            per="word"
            preset="fade"
            inView
            delay={0.2}
            className="mx-auto max-w-2xl text-base sm:text-lg text-secondary leading-relaxed"
          >
            We are a project-oriented engineering collective where you collaborate on real production code, learn high-demand tech stacks, and network with driven peers.
          </TextEffect>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/events" className="btn-primary">
              <span>View Upcoming Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/projects" className="btn-secondary">
              <span>Explore Projects</span>
            </Link>
          </motion.div>
        </section>

        {/* Project Teams / Tracks Section */}
        <section className="px-6 py-16 sm:py-20 border-t border-white/[0.08]">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center space-y-2"
            >
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-accent">
                Focus Tracks
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
                Active Project Teams
              </h2>
              <p className="mx-auto max-w-lg text-sm sm:text-base text-secondary leading-relaxed">
                Explore our current tracks. Select any orbital node to inspect goals, technologies, and active projects.
              </p>
            </motion.div>

            {tracks.length > 0 ? (
              <RadialOrbitalTimeline timelineData={tracks} />
            ) : loadingTracks ? (
              <div className="py-24 text-center text-sm text-secondary/60">
                Loading active tracks...
              </div>
            ) : (
              <div className="py-24 text-center text-sm text-secondary/50">
                No active project tracks published yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
