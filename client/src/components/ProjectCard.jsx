import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const ProjectCard = ({ title, date, image, children, className, index = 0 }) => {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className={`bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 ${className || ''}`}>
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
          
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#D4AF37] transition-colors">
            {title}
          </h3>
          
          <p className="text-secondary text-sm">
            {date}
          </p>
          
          <div className="text-secondary text-sm">
            {children}
          </div>
          
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;