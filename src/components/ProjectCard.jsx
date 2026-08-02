import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { getGoogleDriveDirectLink } from '../utils/imageUtils';

const ProjectCard = ({ project, index }) => {
  const imageUrl = getGoogleDriveDirectLink(project.image_url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative group w-full h-[450px] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/10"
    >
      {/* Background Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
      )}

      {/* 
        Overlays: 
        1. A permanent bottom-heavy gradient to ensure text readability 
        2. A hover-triggered overlay to dim the image further when reading text 
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        
        {/* Header Section (Always visible) */}
        <div className="flex justify-between items-end gap-4 relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
          <div>
            <p className="text-primary font-mono text-xs font-semibold tracking-widest uppercase mb-2">
              {project.duration}
            </p>
            <h3 className="text-3xl font-bold text-white tracking-tight leading-none">
              {project.name}
            </h3>
          </div>

          <div className="flex gap-3 shrink-0 pb-1">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300"
                title="View Source"
              >
                <Github size={18} />
              </a>
            )}
            {project.deployed && (
              <a 
                href={project.deployed} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                title="Visit Website"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Expandable Body Section */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
          <div className="overflow-hidden">
            <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <p className="text-zinc-300 text-sm leading-relaxed mb-6 line-clamp-3">
                {project.highlights?.[0] || "A significant project showcasing technical skills."}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, i) => (
                  <span 
                    key={i} 
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 text-zinc-200 backdrop-blur-md border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectCard;
