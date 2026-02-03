import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Footer = () => {
  const { data } = usePortfolioData();
  
  // If data isn't loaded yet, show a simple skeleton or just emptiness to avoid layout shift
  if (!data) return null;

  const { personal_information } = data;

  return (
    <footer className="mt-auto py-8 mb-4">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-6">
        
        {/* Dock-like Social Links */}
        <div className="flex items-center gap-1 p-2 rounded-full border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl">
          <a 
            href={personal_information.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all hover:scale-110"
            title="GitHub"
          >
            <Github size={20} />
          </a>
          <a 
            href={personal_information.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all hover:scale-110"
            title="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href={`mailto:${personal_information.email}`} 
            className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all hover:scale-110"
            title="Email"
          >
            <Mail size={20} />
          </a>
          <a 
            href={`tel:${personal_information.phone}`} 
            className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all hover:scale-110"
            title="Phone"
          >
            <Phone size={20} />
          </a>
        </div>

        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} {personal_information.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
