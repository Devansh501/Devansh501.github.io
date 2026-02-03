import React from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const { data, loading, error } = usePortfolioData();

  if (loading) return <div className="flex justify-center pt-20"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"/></div>;
  if (error) return <div className="text-red-500 pt-20 text-center">Failed to load projects.</div>;
  
  const projects = data?.projects || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-zinc-400">A collection of things I've built successfully.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
