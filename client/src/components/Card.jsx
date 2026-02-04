import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const Card = ({ title, date, image, children, className, index = 0 }) => {
  // Check if date is in the past
  const isPast = date ? new Date(date) < new Date() : false;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className={`bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 ${isPast ? 'opacity-70' : ''} ${className || ''}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#D4AF37]/30 to-black flex items-center justify-center">
              <Calendar className="w-16 h-16 text-[#D4AF37]/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          
          {/* Date Badge */}
          {date && (
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
              <div className="text-2xl font-bold text-[#D4AF37]">
                {new Date(date).getDate()}
              </div>
              <div className="text-xs text-white/60 uppercase tracking-wider">
                {new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#D4AF37] transition-colors">
            {title}
          </h3>
          
          {date && (
            <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  hour: 'numeric', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          )}
          
          <div className="text-secondary text-sm">
            {children}
          </div>
          
          {isPast && (
            <span className="text-secondary/50 text-sm mt-4 block">Event has ended</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;