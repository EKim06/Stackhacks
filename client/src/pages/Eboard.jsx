import React, { useState, useEffect } from "react"
import { client } from "../sanityClient"
import { motion, AnimatePresence } from "framer-motion"
import { X, Linkedin, Instagram, Github, Mail } from "lucide-react"

function MemberModal({ member, onClose }) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-[#141416] border border-white/15 flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl max-h-[85vh]"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Member Portrait */}
        <div className="md:w-5/12 w-full shrink-0 bg-white/[0.02] border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center p-6">
          <div className="w-44 h-44 rounded-full overflow-hidden border-2 border-accent/40 shadow-xl">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Details & Bio */}
        <div className="flex flex-col justify-center p-6 sm:p-8 md:w-7/12 space-y-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {member.title}
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary mt-1">
              {member.name}
            </h2>
          </div>

          <div className="w-10 h-0.5 bg-accent/60 rounded-full" />

          <p className="text-secondary leading-relaxed text-sm">
            {member.description || "Active leader and contributor to StackHacks community initiatives."}
          </p>

          {/* Social Row in Modal */}
          {(() => {
            const hasAnyCustom = Boolean(member.linkedin || member.instagram || member.github || member.email)
            const linkedinUrl = member.linkedin || (!hasAnyCustom ? "https://www.linkedin.com/company/stackhacks" : null)
            const instagramUrl = member.instagram || (!hasAnyCustom ? "https://www.instagram.com/stackhacksbu/?hl=en" : null)
            const githubUrl = member.github || (!hasAnyCustom ? "https://github.com/stackhacksbu" : null)
            const emailUrl = member.email
              ? (member.email.startsWith("mailto:") ? member.email : `mailto:${member.email}`)
              : (!hasAnyCustom ? "mailto:stackhacksbu@gmail.com" : null)

            return (
              <div className="flex items-center gap-3 pt-2 text-secondary">
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2 rounded-lg bg-white/[0.04] border border-white/10 hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-2 rounded-lg bg-white/[0.04] border border-white/10 hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2 rounded-lg bg-white/[0.04] border border-white/10 hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {emailUrl && (
                  <a
                    href={emailUrl}
                    aria-label="Email"
                    className="p-2 rounded-lg bg-white/[0.04] border border-white/10 hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            )
          })()}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-secondary hover:text-white hover:border-white/30 transition-all duration-150 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  )
}

function MemberCard({ member, onClick, index }) {
  const hasAnyCustom = Boolean(member.linkedin || member.instagram || member.github || member.email)
  const linkedinUrl = member.linkedin || (!hasAnyCustom ? "https://www.linkedin.com/company/stackhacks" : null)
  const instagramUrl = member.instagram || (!hasAnyCustom ? "https://www.instagram.com/stackhacksbu/?hl=en" : null)
  const githubUrl = member.github || (!hasAnyCustom ? "https://github.com/stackhacksbu" : null)
  const emailUrl = member.email
    ? (member.email.startsWith("mailto:") ? member.email : `mailto:${member.email}`)
    : (!hasAnyCustom ? "mailto:stackhacksbu@gmail.com" : null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      onClick={onClick}
      className="tech-card p-6 flex flex-col items-center text-center space-y-4 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
    >
      {/* Circular Avatar Matching Attached Reference */}
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-accent/60 shadow-xl mx-auto bg-white/[0.02] shrink-0">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Member Details */}
      <div className="space-y-1 w-full">
        <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors leading-tight">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-accent">
          {member.title}
        </p>
      </div>

      {/* Bio / Snippet */}
      <p className="text-xs text-secondary leading-relaxed line-clamp-2 px-1">
        {member.description || "Leading technical projects and student development at Binghamton."}
      </p>

      {/* Social Links Row Matching Reference */}
      <div
        className="flex items-center justify-center gap-3 pt-3 border-t border-white/[0.08] w-full text-secondary"
        onClick={(e) => e.stopPropagation()}
      >
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn`}
            className="p-1.5 rounded-md hover:text-accent hover:bg-white/[0.05] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} Instagram`}
            className="p-1.5 rounded-md hover:text-accent hover:bg-white/[0.05] transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} GitHub`}
            className="p-1.5 rounded-md hover:text-accent hover:bg-white/[0.05] transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
        )}
        {emailUrl && (
          <a
            href={emailUrl}
            aria-label={`Email ${member.name}`}
            className="p-1.5 rounded-md hover:text-accent hover:bg-white/[0.05] transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  )
}

const Eboard = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await client.fetch(`*[_type == "eboard"] | order(date asc) {
          _id, name, title, description,
          linkedin, instagram, github, email,
          "image": image.asset->url,
        }`)
        setMembers(data || [])
      } catch (e) {
        console.error("Failed to fetch eboard from Sanity: ", e)
      } finally {
        setLoading(false)
      }
    }
    fetchMembers()
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
          Leadership Team
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-primary">
          Executive Board
        </h1>
        <p className="text-secondary text-base leading-relaxed">
          Meet the student engineers and organizers driving technical tracks, hackathon initiatives, and community mentorship at Binghamton University.
        </p>
      </motion.div>

      {/* Grid of Team Member Cards (Matching Reference Image) */}
      <div className="w-full">
        {loading ? (
          <div className="text-center text-secondary/50 py-20">Loading Executive Board...</div>
        ) : members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
            {members.map((member, index) => (
              <MemberCard
                key={member._id}
                member={member}
                index={index}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-secondary/50 py-20">No eboard members found.</div>
        )}
      </div>

      {/* Detailed Modal on Card Click */}
      <AnimatePresence>
        {selectedMember && (
          <MemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Eboard