import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'

const EventCard = ({ title, date, image, children, className, index = 0 }) => {
  const eventDate = date ? new Date(date) : null
  const isPast = eventDate ? eventDate < new Date() : false
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group h-full"
    >
      <div className={`tech-card flex flex-col h-full overflow-hidden hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${isPast ? 'opacity-75 hover:opacity-100' : ''} ${className || ''}`}>
        {/* Cover Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-white/[0.02]">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/20 via-[#1a1a1c] to-background flex items-center justify-center">
              <Calendar className="w-12 h-12 text-accent/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0e] via-black/20 to-transparent" />
          
          {/* Calendar Badge */}
          {eventDate && !isNaN(eventDate.getTime()) && (
            <div className="absolute bottom-3 left-4 bg-[#141416]/90 backdrop-blur-md rounded-xl px-3 py-1.5 border border-white/10 shadow-lg flex items-center gap-2.5">
              <div className="text-xl font-bold font-mono text-accent leading-none">
                {eventDate.getDate()}
              </div>
              <div className="text-[10px] font-mono text-secondary uppercase tracking-wider leading-tight">
                <div>{eventDate.toLocaleDateString('en-US', { month: 'short' })}</div>
                <div className="text-white/40">{eventDate.getFullYear()}</div>
              </div>
            </div>
          )}

          {/* Status Tag */}
          <div className="absolute top-3 right-3">
            {isPast ? (
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-secondary/70">
                Completed
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full border border-accent/40 bg-accent/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-accent font-semibold">
                Upcoming
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
          <div className="space-y-2.5">
            <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
              {title}
            </h3>
            
            {eventDate && !isNaN(eventDate.getTime()) && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-secondary/80">
                <Clock className="w-3.5 h-3.5 text-accent/80" />
                <span>
                  {eventDate.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    hour: 'numeric', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            )}
            
            <div className="text-secondary text-sm leading-relaxed line-clamp-3">
              {children}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EventCard