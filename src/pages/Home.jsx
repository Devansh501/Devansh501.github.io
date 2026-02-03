import React from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import Experience from '../components/Experience';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { FaJava, FaPython, FaNode, FaReact, FaAws, FaDatabase, FaCode, FaWhatsapp } from "react-icons/fa6";
import { SiJavascript, SiTypescript, SiCplusplus, SiSpringboot, SiNestjs, SiNextdotjs, SiFastapi, SiPostgresql, SiDjango, SiElectron, SiHibernate, SiSpring, SiMui, SiGooglecloud } from "react-icons/si";
import ProjectCarousel from '../components/ProjectCarousel';
import { getGoogleDriveDirectLink } from '../utils/imageUtils';

const skillIcons = {
  "Java": <FaJava />,
  "JavaScript": <SiJavascript />,
  "TypeScript": <SiTypescript />,
  "Python": <FaPython />,
  "SQL": <FaDatabase />,
  "C++": <SiCplusplus />,
  "Springboot": <SiSpringboot />,
  "NodeJs": <FaNode />,
  "NestJs": <SiNestjs />,
  "ReactJs": <FaReact />,
  "NextJs": <SiNextdotjs />,
  "FastAPI": <SiFastapi />,
  "PostgresSQL": <SiPostgresql />,
  "Django": <SiDjango />,
  "Electron": <SiElectron />,
  "Hibernate": <SiHibernate />,
  "Spring JPA": <SiSpring />,
  "TypeORM": <FaCode />,
  "MaterialUI": <SiMui />,
  "Spring Security": <SiSpring />,
  "Google Cloud Platform": <SiGooglecloud />,
  "Amazon Web Services": <FaAws />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const Home = () => {
  const { data, loading, error } = usePortfolioData();

  if (loading) return <div className="flex justify-center pt-20"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"/></div>;
  if (error) return <div className="text-red-500 pt-20 text-center">Failed to load content.</div>;
  if (!data) return null;

  const { personal_information, professional_experience, education, skills, certifications } = data;

  const rawProfileImage = personal_information.profile_image_url || (personal_information.github ? `${personal_information.github}.png` : '');
  const profileImage = getGoogleDriveDirectLink(rawProfileImage);

  const currentJob = professional_experience.find(job => job.duration.toLowerCase().includes('present'));
  const currentCompany = currentJob ? currentJob.company : 'Freelance Gigs';

  return (
    <div className="space-y-16">
      <section className="flex flex-col gap-6">
        <motion.div

          className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-8"
        >
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Available for work</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              hi, {personal_information.name.split(' ')[0].toLowerCase()} here. <span className="animate-wave inline-block origin-[70%_70%]">👋</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
              I'm a {personal_information.role.toLowerCase()} who enjoys building 
              robust systems and intuitive interfaces. Currently building innovative software solutions at <span className="text-zinc-200 font-medium">{currentCompany}</span>.
            </p>
          </div>
          
          <div className="shrink-0">
             <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-zinc-800 shadow-xl relative group">
                <img 
                  src={profileImage} 
                  alt={personal_information.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
             </div>
          </div>
        </motion.div>

        <motion.div 
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <a
            href={personal_information.resume_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <FileText size={16} />
            Resume
          </a>
          <a
            href="#experience"
            className="flex items-center gap-2 px-5 py-2.5 border border-zinc-700 hover:bg-zinc-800 rounded-full font-medium text-sm transition-colors text-zinc-300"
          >
             View Work
             <ArrowRight size={16} />
          </a>
          
          <div className="flex items-center gap-2 px-2 sm:ml-2 border-l border-zinc-800 pl-4 py-1">
            <a 
              href={personal_information.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href={personal_information.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href={`mailto:${personal_information.email}`} 
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
              title="Email"
            >
              <Mail size={18} />
            </a>
            <a 
              href={`https://wa.me/${personal_information.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
              title="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
            <a 
              href={`tel:${personal_information.phone}`} 
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors flex items-center gap-2"
              title="Phone"
            >
              <Phone size={18} />
              <span className="text-sm font-medium">{personal_information.phone}</span>
            </a>
          </div>
        </motion.div>
      </section>

      <section id="experience">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Experience</h2>
         <Experience experience={professional_experience} education={education} certifications={certifications} />
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Skills</h2>
        <div className="grid gap-8">
           {Object.entries(skills).map(([category, items]) => (
             <div key={category}>
               <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">{category}</h3>
               <motion.div 
                  className="flex flex-wrap gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
               >
                 {items.map((skill) => (
                   <motion.div 
                    key={skill}
                    variants={itemVariants}
                    className="group"
                   >
                     <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-300 group-hover:border-zinc-700 group-hover:bg-zinc-800/50 transition-all cursor-default relative overflow-hidden">
                       <span className="text-zinc-400 group-hover:text-zinc-100 transition-colors text-lg">
                          {skillIcons[skill] || <FaCode />}
                       </span>
                       <span className="relative z-10">{skill}</span>
                     </div>
                   </motion.div>
                 ))}
               </motion.div>
             </div>
           ))}
        </div>
      </section>

      <section>
        <ProjectCarousel projects={data.projects} />
      </section>
    </div>
  );
};

export default Home;
