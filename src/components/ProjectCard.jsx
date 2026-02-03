import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group/card bg-card hover:bg-zinc-900/50 border border-border rounded-xl transition-all duration-500 hover:border-zinc-500/50 hover:shadow-2xl flex flex-col h-full overflow-hidden"
    >
      {project.image_url && (
        <div className="w-full h-48 overflow-hidden relative">
          <img 
            src={project.image_url} 
            alt={project.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4 gap-4">
          <div className="min-w-0">
            <h3 className="font-bold text-lg text-primary truncate pr-2" title={project.name}>{project.name}</h3>
            <p className="text-xs text-muted-foreground mt-1 font-mono">{project.duration}</p>
          </div>
          <div className="flex gap-3 shrink-0 pt-1">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-white transition-colors"
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
                className="text-muted-foreground hover:text-white transition-colors"
                title="Visit Website"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-sm text-zinc-400 mb-6 flex-grow leading-relaxed line-clamp-3">
          {project.highlights?.[0] || "A significant project showcasing technical skills."}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies?.map((tech, i) => (
            <span 
              key={i}
              className="text-xs font-mono bg-zinc-800/50 text-zinc-400 px-2 py-1 rounded border border-zinc-700/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
