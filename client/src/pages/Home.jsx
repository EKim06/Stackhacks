import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import RadialOrbitalTimeline from '../components/Radial-orbital-timeline'
import { Button } from '../components/Button'
import { Code2, Brain, Shield, Repeat } from 'lucide-react'
import { TextEffect } from '../components/Text'

const projectTeamData = [
  {
    id: 1,
    title: 'Web Development',
    orbitLabel: 'Web',
    icon: Code2,
    date: 'Current',
    content: 'Build full-stack websites, dashboards, and real-world applications.',
    category: 'Web',
    relatedIds: [2, 4],
    status: 'in-progress',
    energy: 90,
  },
  {
    id: 2,
    title: 'AI',
    orbitLabel: 'AI',
    icon: Brain,
    date: 'Current',
    content: 'Work on machine learning models and intelligent systems.',
    category: 'AI',
    relatedIds: [1],
    status: 'in-progress',
    energy: 80,
  },
  {
    id: 3,
    title: 'Cybersecurity',
    orbitLabel: 'Cyber',
    icon: Shield,
    date: 'Current',
    content: 'Explore security concepts and build defensive tools.',
    category: 'Security',
    relatedIds: [1],
    status: 'pending',
    energy: 65,
  },
  {
    id: 4,
    title: 'Recreating Apps',
    orbitLabel: 'Recreating Apps',
    icon: Repeat,
    date: 'Current',
    content: 'Rebuild popular apps to learn real-world architecture and design.',
    category: 'Projects',
    relatedIds: [1],
    status: 'in-progress',
    energy: 85,
  },
]

function Home() {
  const heroRef = useRef(null)

  return (
    <div className="relative min-h-[100dvh] bg-background">
      <div className="bg-background text-primary">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div ref={heroRef}>
            <Hero />
          </div>
        </motion.div>

        <section className="px-4 py-14 text-center sm:px-6">
          <TextEffect
            as="h2"
            per="word"
            preset="slide"
            inView
            className="mb-4 text-4xl font-bold text-primary md:text-5xl"
          >
            Get involved
          </TextEffect>

          <TextEffect
            as="p"
            per="word"
            preset="fade"
            inView
            delay={0.2}
            className="mx-auto mb-8 max-w-2xl text-lg text-secondary"
          >
            We are a computer science club where you can build projects, learn new skills, and connect with other students.
          </TextEffect>

          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild variant="primary" className="m-0">
              <Link to="/events">View upcoming events</Link>
            </Button>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold text-primary md:text-4xl">Project Team</h2>
              <p className="mx-auto max-w-xl text-base text-secondary md:text-lg">
                Explore the different tracks and click to learn more.
              </p>
            </div>

            <RadialOrbitalTimeline timelineData={projectTeamData} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
