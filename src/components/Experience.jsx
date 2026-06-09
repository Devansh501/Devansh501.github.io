import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { getGoogleDriveDirectLink } from '../utils/imageUtils';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, ExternalLink, ChevronRight } from 'lucide-react';

const TimelineSection = ({ items, type }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const isWork = type === 'work';

  return (
    <div ref={containerRef} className="relative py-4">
      {/* Background Track */}
      <div className="absolute left-[20px] sm:left-[40px] top-6 bottom-0 w-[2px] bg-zinc-800/80 rounded-full" />
      
      {/* Animated Scroll Track */}
      <motion.div 
        style={{ scaleY: scrollYProgress, originY: 0 }}
        className="absolute left-[20px] sm:left-[40px] top-6 bottom-0 w-[2px] bg-primary rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)] z-0"
      />

      <div className="space-y-8 sm:space-y-10">
        {items.map((item, idx) => {
          const logoUrl = isWork ? getGoogleDriveDirectLink(item.logo_url) : null;
          
          return (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group"
            >
              {/* Timeline Node */}
              <motion.div 
                initial={{ backgroundColor: '#09090b', borderColor: 'rgba(34,197,94,0.3)', scale: 1 }}
                whileInView={{ backgroundColor: 'rgba(34,197,94,1)', borderColor: 'rgba(34,197,94,1)', scale: 1.25, boxShadow: '0 0 20px rgba(34,197,94,0.8)' }}
                viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
                className="absolute left-[13px] sm:left-[33px] top-[30px] w-4 h-4 rounded-full border-2 z-10"
              />

              {/* Card Container */}
              <div className="ml-10 sm:ml-16 relative">
                {/* Connector Line (visible on hover) */}
                <div className="absolute top-[37px] -left-10 sm:-left-16 w-10 sm:w-16 h-[1px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="p-5 sm:p-7 rounded-2xl bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-white/15 transition-all duration-300 shadow-xl shadow-black/20 group-hover:-translate-y-1 overflow-hidden">
                  {/* Inner subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                    {/* Icon / Logo */}
                    <div className="shrink-0">
                      {isWork ? (
                        logoUrl ? (
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-zinc-800 shadow-lg group-hover:scale-105 transition-transform duration-300 border border-white/10">
                            <img
                              src={logoUrl}
                              alt={item.company}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-zinc-800/80 flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <Briefcase size={24} className="text-zinc-400 group-hover:text-primary transition-colors duration-300" />
                          </div>
                        )
                      ) : (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-zinc-800/80 flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                          <GraduationCap size={26} className="text-zinc-400 group-hover:text-primary transition-colors duration-300" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors duration-300 tracking-tight">
                            {isWork ? item.title : item.institution}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-zinc-400 font-medium text-base">
                            <span className="text-primary">{isWork ? item.company : item.degree}</span>
                            {isWork && item.website && (
                              <a
                                href={item.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-full bg-white/5 hover:bg-primary/20 text-zinc-400 hover:text-primary transition-all duration-300 ml-1"
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-1.5">
                          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-300 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-inner whitespace-nowrap shrink-0">
                            <Calendar size={12} className="text-primary shrink-0" />
                            <span className="font-semibold">{item.duration}</span>
                          </div>
                          {item.location && (
                            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium px-2">
                              <MapPin size={12} />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content specific to Work or Education */}
                      {isWork ? (
                        <ul className="space-y-3 mt-4">
                          {item.highlights?.map((point, i) => (
                            <li key={i} className="text-zinc-300/90 text-sm sm:text-base leading-relaxed flex items-start gap-3 group/item">
                              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0 group-hover/item:bg-primary transition-colors duration-300 shadow-[0_0_8px_rgba(255,255,255,0)] group-hover/item:shadow-primary/50" />
                              <span className="group-hover/item:text-zinc-200 transition-colors duration-300">{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-zinc-300 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5 hover:border-white/10 transition-colors w-fit mt-2">
                          <Award size={16} className="text-primary/70" />
                          <span className="font-medium">GPA: <span className="text-white font-bold">{item.gpa}</span></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const Experience = ({ experience = [], education = {}, certifications = [] }) => {
  const [activeTab, setActiveTab] = useState('work');

  const tabs = [
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="mt-8 sm:mt-12">
      <div className="flex flex-wrap justify-center gap-2 p-1 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-xl w-full sm:w-fit mb-10 shadow-xl mx-auto relative z-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-4 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap flex-1 sm:flex-none justify-center overflow-hidden
                ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                >
                  <div className="absolute inset-0 bg-primary/20 blur-md rounded-lg" />
                </motion.div>
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon size={16} className={`transition-colors duration-300 ${isActive ? 'text-primary' : ''}`} />
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'work' && (
            <motion.div key="work" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <TimelineSection items={experience} type="work" />
            </motion.div>
          )}

          {activeTab === 'education' && (
            <motion.div key="education" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <TimelineSection items={[education]} type="education" />
            </motion.div>
          )}

          {activeTab === 'certifications' && (
            <motion.div
              key="certifications"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid gap-5 sm:grid-cols-2 pt-2"
            >
              {certifications.map((cert, idx) => (
                <motion.a
                  key={idx}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-zinc-900/30 backdrop-blur-xl border border-white/5 hover:border-primary/50 hover:bg-zinc-800/40 transition-all duration-500 shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-0 translate-x-4 group-hover:rotate-12">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <ExternalLink size={14} className="text-primary" />
                    </div>
                  </div>

                  <div className="mb-6 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800/50 backdrop-blur-md flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500 border border-white/5">
                      <Award size={24} className="text-zinc-400 group-hover:text-primary transition-colors duration-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-100 group-hover:text-white transition-colors duration-300 mb-2 leading-tight tracking-tight pr-6">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-primary/80 font-medium">{cert.issuer}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 group-hover:text-primary transition-colors duration-300 relative z-10">
                    <span className="uppercase tracking-wider">Verify Credential</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-500" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Experience;
