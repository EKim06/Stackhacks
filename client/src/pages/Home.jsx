import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import RadialOrbitalTimeline from '../components/Radial-orbital-timeline'
import { Code2, Brain, Shield, Repeat, ArrowRight } from 'lucide-react'
import { TextEffect } from '../components/Text'
import Constellation from '../components/Constellation'

const projectTeamData = [
  {
    id: 1,
    title: 'Web Development',
    orbitLabel: 'Web',
    icon: Code2,
    date: 'Current',
    content: 'Build full-stack websites, dashboards, and real-world web applications with modern tech stacks.',
    category: 'Web',
    relatedIds: [2, 4],
    status: 'in-progress',
    energy: 90,
  },
  {
    id: 2,
    title: 'Artificial Intelligence',
    orbitLabel: 'AI',
    icon: Brain,
    date: 'Current',
    content: 'Explore machine learning models, neural networks, and intelligent multi-agent systems.',
    category: 'AI',
    relatedIds: [1],
    status: 'in-progress',
    energy: 80,
  },
  {
    id: 3,
    title: 'Cybersecurity',
    orbitLabel: 'Security',
    icon: Shield,
    date: 'Current',
    content: 'Master defensive tools, vulnerability testing, and ethical offensive security practices.',
    category: 'Security',
    relatedIds: [1],
    status: 'pending',
    energy: 65,
  },
  {
    id: 4,
    title: 'Recreating Apps',
    orbitLabel: 'App Decon',
    icon: Repeat,
    date: 'Current',
    content: 'Deconstruct and rebuild production apps to understand real-world system design and architectures.',
    category: 'Projects',
    relatedIds: [1],
    status: 'in-progress',
    energy: 85,
  },
]

function Home() {
  const heroRef = useRef(null)

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

            <RadialOrbitalTimeline timelineData={projectTeamData} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
