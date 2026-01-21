import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import SectionTitle from './SectionTitle';
import { ExternalLink, Github, Play, Eye } from 'lucide-react';
import SparkleButton from './SparkleButton';

const FiverrLogo = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    <path 
      d="M7.1 17.5h1.9v-5.6h1.9v-1.6H9V9.1c0-.4.1-.7.2-.8.1-.1.4-.2.8-.2h1v-1.7H10c-1 0-1.8.3-2.3.8-.5.5-.7 1.2-.7 2.2v.9H5.8v1.6h1.3v5.6zm7.2 0h1.9v-5.6h-1.9v5.6zm0-6.6c0-.3.1-.6.3-.8.2-.2.5-.3.8-.3s.6.1.8.3c.2.2.3.5.3.8s-.1.6-.3.8c-.2.2-.5.3-.8.3s-.6-.1-.8-.3c-.2-.2-.3-.5-.3-.8z" 
      fill="#030014" 
    />
  </svg>
);

const BehanceLogo = ({ className = "w-9 h-9" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M22 7h-7v1.5h7V7zm-7 3.5c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5H15zm2.25 0h4.5c0 1.2-.8 2.25-2.25 2.25s-2.25-1.05-2.25-2.25zM0 17h6c3.3 0 6-2.7 6-6s-2.7-6-6-6H0v12zm3-9h3c1.65 0 3 1.35 3 3s-1.35 3-3 3H3V8zm0 4.5h3c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5H3v3z" />
  </svg>
);

const Projects: React.FC = () => {
  const handleOpenProject = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="MY WORK" subtitle="Fusion of Engineering & Design" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative glass rounded-3xl overflow-hidden border border-white/5 flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Clickable Media Area */}
            <div 
              className="relative aspect-video overflow-hidden bg-black/40 cursor-pointer"
              onClick={() => handleOpenProject(project.link)}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 opacity-100 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-950 to-purple-950">
                   <Play size={48} className="text-white/20" />
                </div>
              )}
              <div className="scan-overlay opacity-30"></div>
              
              {/* Hover Interaction Layer */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 z-20"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-cyan-500 rounded-full text-black shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center justify-center"
                >
                  <Eye size={24} />
                </motion.div>
                <p className="text-cyan-400 font-mono-code text-[10px] font-black tracking-widest uppercase animate-pulse">
                  Open Project Site
                </p>
              </motion.div>

              {/* External Link Badge (Visible by default) */}
              <div className="absolute top-4 right-4 z-30">
                <div className="p-2.5 bg-black/80 backdrop-blur-md rounded-xl text-white group-hover:text-cyan-400 transition-colors border border-white/10">
                  <ExternalLink size={16} />
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-4 flex flex-col flex-grow relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>
              <div className="flex flex-wrap gap-2 relative z-10">
                {project.tech.map(t => (
                  <span key={t} className="text-[9px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors font-heading uppercase relative z-10 tracking-tight">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-grow relative z-10 line-clamp-2">
                {project.description}
              </p>
              <div className="pt-4 flex items-center justify-between mt-auto border-t border-white/5 relative z-10">
                <SparkleButton 
                    text="PREVIEW" 
                    onClick={() => handleOpenProject(project.link)} 
                    className="!text-[10px] !px-6 !py-2.5" 
                />
                <button 
                  onClick={() => handleOpenProject(project.link)}
                  className="flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
                >
                  Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-40 text-center space-y-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex flex-col items-center gap-6">
          <div className="h-px w-64 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div className="relative">
             <p className="text-base md:text-2xl font-black tracking-[0.5em] text-white uppercase font-mono-code drop-shadow-[0_0_15px_rgba(6,182,212,1)] lights-animation">
                EXPLORE_HUB_ECOSYSTEM
             </p>
             <div className="absolute -inset-4 bg-cyan-500/5 blur-2xl rounded-full -z-10 animate-pulse"></div>
          </div>
          <div className="h-px w-64 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        </motion.div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <SparkleButton text="GITHUB" href="https://github.com/mh-alvy" icon={<Github size={24} />} />
          <SparkleButton text="FIVERR" href="https://fiverr.com/alvy_vfx" icon={<FiverrLogo className="w-7 h-7" />} />
          <SparkleButton text="BEHANCE" href="https://www.behance.net/mahamudulalvy" icon={<BehanceLogo className="w-9 h-9" />} />
        </div>
      </div>
    </div>
  );
};

export default Projects;