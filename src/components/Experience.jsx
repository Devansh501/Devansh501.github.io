import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGoogleDriveDirectLink } from '../utils/imageUtils';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, ExternalLink, ChevronRight } from 'lucide-react';

const Experience = ({ experience = [], education = {}, certifications = [] }) => {
  const [activeTab, setActiveTab] = useState('work');

  const tabs = [
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="mt-12">
      <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl w-full sm:w-fit mb-12">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-4 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-medium rounded-xl transition-all duration-300 flex items-center gap-2 sm:gap-2.5 whitespace-nowrap flex-1 sm:flex-none justify-center
                ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-zinc-800 shadow-md rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2 sm:gap-2.5">
                <Icon size={16} className={`sm:w-[18px] sm:h-[18px] ${isActive ? 'text-primary' : ''}`} />
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'work' && (
            <motion.div
              key="work"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6 sm:space-y-8"
            >
              {experience.map((job, idx) => {
                const logoUrl = getGoogleDriveDirectLink(job.logo_url);
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="relative group"
                  >
                    <div className="relative p-5 sm:p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300 backdrop-blur-sm group-hover:shadow-xl group-hover:shadow-primary/5">
                      <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 mb-4 sm:mb-6">
                        <div className="shrink-0">
                          {logoUrl ? (
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-white p-1.5 border border-zinc-700 shadow-lg">
                              <img
                                src={logoUrl}
                                alt={job.company}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-800 flex items-center justify-center border border-zinc-700">
                              <Briefcase size={28} className="text-zinc-500" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
                            <div>
                              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-primary transition-colors duration-300 mb-1">{job.title}</h3>
                              <div className="flex flex-wrap items-center gap-2 text-zinc-400 font-medium text-base sm:text-lg">
                                <span>{job.company}</span>
                                {job.website && (
                                  <a
                                    href={job.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-500 hover:text-primary transition-colors"
                                  >
                                    <ExternalLink size={16} />
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-500 bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-800 self-start mt-2 sm:mt-0">
                              <Calendar size={14} />
                              <span className="whitespace-nowrap font-medium">{job.duration}</span>
                            </div>
                          </div>

                          {job.location && (
                            <div className="flex items-center gap-1.5 text-sm text-zinc-500 mb-4">
                              <MapPin size={16} />
                              <span>{job.location}</span>
                            </div>
                          )}

                          <ul className="space-y-3 mt-4">
                            {job.highlights?.map((point, i) => (
                              <li key={i} className="text-zinc-300 text-base leading-relaxed flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 group-hover:bg-primary transition-colors duration-300" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'education' && (
            <motion.div
              key="education"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6 sm:space-y-8"
            >
              <motion.div variants={itemVariants} className="relative p-5 sm:p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300 backdrop-blur-sm group">
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
                  <div className="shrink-0 pt-1">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-800/80 flex items-center justify-center border border-zinc-700 text-zinc-400 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                      <GraduationCap size={32} />
                    </div>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-1 group-hover:text-primary transition-colors duration-300">{education.institution}</h3>
                      <p className="text-lg sm:text-xl text-zinc-300">{education.degree}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-base text-zinc-400 bg-zinc-800/30 px-4 py-3 rounded-xl border border-zinc-800/50">
                        <Calendar size={18} className="text-zinc-500" />
                        <span>{education.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-base text-zinc-400 bg-zinc-800/30 px-4 py-3 rounded-xl border border-zinc-800/50">
                        <MapPin size={18} className="text-zinc-500" />
                        <span>{education.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-base text-zinc-400 bg-zinc-800/30 px-4 py-3 rounded-xl border border-zinc-800/50 sm:col-span-2">
                        <Award size={18} className="text-zinc-500" />
                        <span>GPA: <span className="text-zinc-200 font-semibold">{education.gpa}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'certifications' && (
            <motion.div
              key="certifications"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid gap-6 sm:grid-cols-2"
            >
              {certifications.map((cert, idx) => (
                <motion.a
                  key={idx}
                  variants={itemVariants}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800/60 hover:border-primary/50 hover:bg-zinc-900/60 transition-all duration-300 backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-0 translate-x-4">
                    <ExternalLink size={20} className="text-primary" />
                  </div>

                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <Award size={24} className="text-zinc-400 group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-200 group-hover:text-primary transition-colors duration-300 mb-2 leading-relaxed">
                      {cert.name}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-500">{cert.issuer}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300">
                    <span>View Certificate</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
