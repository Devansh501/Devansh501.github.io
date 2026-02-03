import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Experience = ({ experience = [], education = {}, certifications = [] }) => {
  const [activeTab, setActiveTab] = useState('work');

  const tabs = [
    { id: 'work', label: 'Work' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'education', label: 'Education' },
  ];

  return (
    <div className="mt-12">
      <div className="flex space-x-1 bg-zinc-900/50 p-1 rounded-xl w-fit mb-8 border border-zinc-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative px-6 py-2 text-sm font-medium rounded-lg transition-colors
              ${activeTab === tab.id ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}
            `}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-zinc-800 rounded-lg shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === 'work' ? (
            <motion.div
              key="work"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                },
                exit: { opacity: 0 }
              }}
            >
              {experience.map((job, idx) => (
                <motion.div 
                  key={idx} 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: -20 }
                  }}
                  className="relative pl-8 border-l border-zinc-800 ml-3 pb-12 last:pb-0"
                >
                  {job.logo_url ? (
                    <div className="absolute -left-5 top-0 w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-900 z-10">
                      <img 
                        src={job.logo_url} 
                        alt={job.company} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-700 border-2 border-background z-10" />
                  )}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h3 className="text-lg font-medium text-primary">{job.company}</h3>
                    <span className="text-sm text-zinc-500">{job.duration}</span>
                  </div>
                  <div className="text-sm text-zinc-400 font-medium mb-3">{job.title}</div>
                  <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-zinc-400">
                    {job.highlights?.map((point, i) => (
                      <li key={i} className="pl-1">{point}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          ) : activeTab === 'education' ? (
            <motion.div
              key="education"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/20"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-primary">{education.institution}</h3>
                <p className="text-zinc-400">{education.degree}</p>
                <div className="flex gap-4 mt-2 text-sm text-zinc-500">
                  <span>{education.duration}</span>
                  <span>•</span>
                  <span>{education.location}</span>
                  <span>•</span>
                  <span className="text-zinc-300 font-medium">{education.gpa}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {certifications.map((cert, idx) => (
                <a 
                  key={idx}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-zinc-800 rounded-xl bg-zinc-900/20 hover:bg-zinc-800/40 hover:border-zinc-700 transition-all group"
                >
                  <h3 className="font-medium text-zinc-200 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{cert.issuer}</p>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Experience;
