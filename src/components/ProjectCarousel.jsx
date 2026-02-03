import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectCarousel = ({ projects }) => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [projects]);

  const scrollLink = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  if (!projects || projects.length === 0) return null;

  return (
    <div className="relative group">
       <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => scrollLink('left')}
              disabled={!canScrollLeft}
              className="p-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scrollLink('right')}
              disabled={!canScrollRight}
              className="p-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
       </div>

      <div 
        ref={containerRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, index) => (
          <div key={index} className="min-w-[300px] sm:min-w-[350px] snap-center">
            <ProjectCard project={project} index={index} />
          </div>
        ))}
        {projects.length < 3 && (
            // Spacer to keep alignment if few projects
             <div className="min-w-[50px]"></div>
        )}
      </div>
    </div>
  );
};

export default ProjectCarousel;
