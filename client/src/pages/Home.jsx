import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import RadialOrbitalTimeline from '../components/Radial-orbital-timeline'
import { Button } from '../components/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card'
import { Code2, Brain, Shield, Repeat } from 'lucide-react'

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

const teamMembers = [
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
  { title: 'TBD', text: 'Core team add your execs here once you have them.', img: null },
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
          <h2 className="mb-4 text-4xl font-bold text-primary md:text-5xl">Get involved</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-secondary">
            We are a computer science club where you can build projects, learn new skills, and connect
            with other students.
          </p>
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

        <section className="bg-background px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-primary md:text-5xl">Team</h2>
              <p className="mx-auto max-w-2xl text-xl text-secondary">Meet the people behind StackHacks</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {teamMembers.slice(0, 3).map((card, index) => (
                <Card key={`${card.title}-${index}`} className="flex min-h-[220px] flex-col items-center text-center transition-colors hover:border-white/25">
                  <CardHeader className="flex w-full flex-col items-center pb-2">
                    {card.img ? (
                      <img src={card.img} alt="" className="mb-4 h-16 w-16 rounded-full object-cover" />
                    ) : null}
                    <CardTitle className="text-xl text-white">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-base leading-relaxed text-gray-300">{card.text}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
