import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Sparkles } from 'lucide-react'

const LOCAL_STUDIO_URL = 'http://localhost:3333'
const HOSTED_STUDIO_URL = 'https://stackhacks.sanity.studio'

export default function SanityRedirect() {
  const isLocal = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  )

  const targetUrl = isLocal ? LOCAL_STUDIO_URL : HOSTED_STUDIO_URL

  useEffect(() => {
    // Jump straight to Sanity Studio immediately
    window.location.replace(targetUrl)
  }, [targetUrl])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="tech-card p-8 max-w-sm w-full text-center space-y-4 border border-white/10 bg-[#141416]/90 shadow-2xl"
      >
        <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(254,178,58,0.2)]">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-primary">
            Opening Sanity Studio...
          </h2>
          <p className="text-xs text-secondary">
            Redirecting to {isLocal ? 'local studio (port 3333)' : 'hosted studio'}
          </p>
        </div>

        <div className="pt-2">
          <a
            href={targetUrl}
            className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
          >
            <span>Click here if not redirected automatically</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.div>
    </div>
  )
}

