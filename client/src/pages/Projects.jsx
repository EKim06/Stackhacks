import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { client } from '../sanityClient'
import { motion } from 'framer-motion'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(_createdAt asc) {
          _id,
          title,
          date,
          description,
          "image": image.asset->url,
          sections
        }`

        const data = await client.fetch(query)
        setProjects(data || [])
      } catch (e) {
        console.error("Failed to fetch projects from Sanity: ", e)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      {/* Page Header with Woosh-in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16 space-y-3"
      >
        <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-accent">
          Showcase
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-primary">
          Member Projects
        </h1>
        <p className="text-secondary text-base leading-relaxed">
          Real-world applications, tools, and platforms engineered by StackHacks project teams throughout the academic year.
        </p>
      </motion.div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {loading ? ( 
          <div className="col-span-full text-center text-secondary/50 py-16">
            Loading projects...
          </div>
        ) : projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard 
              key={project._id || index}
              title={project.title} 
              date={project.date} 
              image={project.image}
              index={index}
            > 
              {project.description && (
                <p className="text-secondary leading-relaxed">{project.description}</p>
              )}
              {project.sections?.map((section, i) => (
                <div key={i} className="space-y-1 pt-2">
                  <h4 className="font-semibold text-primary text-base">{section.heading}</h4>
                  <p className="text-secondary text-sm leading-relaxed">{section.body}</p>
                </div>
              ))}
            </ProjectCard>
          ))
        ) : (
          <div className="col-span-full text-center text-secondary/50 py-16 border border-white/5 rounded-2xl bg-white/[0.01]">
            No projects found. Check back soon for new project releases!
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects