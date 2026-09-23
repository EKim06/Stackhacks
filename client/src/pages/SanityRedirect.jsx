import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Terminal, Sparkles, ArrowRight } from 'lucide-react'

const SANITY_PROJECT_ID = 'c40cpl3j'
const LOCAL_STUDIO_URL = 'http://localhost:3333'
const HOSTED_STUDIO_URL = 'https://stackhacks.sanity.studio'
const SANITY_MANAGE_URL = `https://www.sanity.io/manage/project/${SANITY_PROJECT_ID}`

export default function SanityRedirect() {
  const isLocal = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  )

  const targetUrl = isLocal ? LOCAL_STUDIO_URL : HOSTED_STUDIO_URL
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    // Attempt automatic redirect to local studio or hosted studio
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = targetUrl
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetUrl])

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="tech-card p-8 sm:p-10 max-w-xl w-full text-center space-y-6 border border-white/15 bg-[#141416]/90 shadow-2xl"
      >
        <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(254,178,58,0.2)]">
          <Sparkles className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-primary">
            Connecting to Sanity Studio
          </h1>
          <p className="text-sm text-secondary leading-relaxed">
            Redirecting to your content management studio in{' '}
            <span className="text-accent font-semibold">{countdown}s</span>...
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={targetUrl}
            className="btn-primary w-full sm:w-auto"
          >
            <span>Launch Studio ({isLocal ? 'Local:3333' : 'Hosted'})</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={SANITY_MANAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto text-xs"
          >
            <span>Sanity Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Studio Dev Tip */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-left space-y-2 text-xs text-secondary">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Terminal className="w-4 h-4 text-accent" />
            <span>How to run Sanity Studio:</span>
          </div>
          <p className="font-mono bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 text-accent/90">
            cd studio && npm run dev
          </p>
          <p className="text-[11px] text-secondary/70">
            To deploy your studio to the web so it is accessible from anywhere: run{' '}
            <code className="text-accent">cd studio && npm run deploy</code>.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
