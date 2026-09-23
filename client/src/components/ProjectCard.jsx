import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { X, Code2 } from "lucide-react"

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [onClose])

  if (!project) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-[#141416] border border-white/15 shadow-2xl overflow-hidden"
      >
        {/* Cover Image */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0 bg-white/[0.02]">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/20 via-[#1a1a1c] to-background flex items-center justify-center">
              <Code2 className="w-16 h-16 text-accent/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full border border-white/15 bg-black/60 backdrop-blur-md text-secondary hover:text-white hover:border-white/30 transition-all duration-150 cursor-pointer z-20"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content with Custom Scrollbar */}
        <div className="p-6 sm:p-8 space-y-5 overflow-y-auto">
          <div className="space-y-1.5 border-b border-white/[0.08] pb-4">
            {project.date && (
              <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                {project.date}
              </p>
            )}
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight">
              {project.title}
            </h2>
          </div>

          <div className="text-secondary text-sm sm:text-base leading-relaxed space-y-4 [&_h4]:text-primary [&_h4]:font-semibold [&_h4]:text-base [&_h4]:mt-4">
            {project.description && (
              <p className="text-secondary leading-relaxed">{project.description}</p>
            )}
            {project.sections?.map((section, i) => (
              <div key={i} className="space-y-1 pt-2">
                <h4 className="font-semibold text-primary text-base">{section.heading}</h4>
                <p className="text-secondary text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
            {project.children}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

const ProjectCard = ({ title, date, image, children, className, index = 0, onClick }) => {
  const [internalActive, setInternalActive] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      setInternalActive(true)
    }
  }

  return (
    <>
      {/* Collapsed Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.06 }}
        className="group h-full"
      >
        <div
          onClick={handleClick}
          className={`tech-card flex flex-col h-full overflow-hidden cursor-pointer hover:border-accent/60 hover:shadow-[0_0_28px_rgba(254,178,58,0.25)] hover:-translate-y-1 transition-all duration-300 ${className || ""}`}
        >
          {/* Cover Image */}
          <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-white/[0.02]">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent/20 via-[#1a1a1c] to-background flex items-center justify-center">
                <Code2 className="w-12 h-12 text-accent/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0e] via-black/20 to-transparent" />
          </div>

          {/* Card Body */}
          <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
            <div className="space-y-1.5">
              {date && (
                <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {date}
                </p>
              )}
              <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Standalone Modal fallback if onClick is not provided */}
      {!onClick && (
        <AnimatePresence>
          {internalActive && (
            <ProjectModal
              project={{ title, date, image, children }}
              onClose={() => setInternalActive(false)}
            />
          )}
        </AnimatePresence>
      )}
    </>
  )
}

export default ProjectCard