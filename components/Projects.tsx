import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import SectionTitle from './SectionTitle';
import { ExternalLink, Play, Eye, X, Sparkles, Film, Globe, Palette, Layers, Github } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const FiverrLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    <path 
      d="M7.1 17.5h1.9v-5.6h1.9v-1.6H9V9.1c0-.4.1-.7.2-.8.1-.1.4-.2.8-.2h1v-1.7H10c-1 0-1.8.3-2.3.8-.5.5-.7 1.2-.7 2.2v.9H5.8v1.6h1.3v5.6zm7.2 0h1.9v-5.6h-1.9v5.6zm0-6.6c0-.3.1-.6.3-.8.2-.2.5-.3.8-.3s.6.1.8.3c.2.2.3.5.3.8s-.1.6-.3.8c-.2.2-.5.3-.8.3s-.6-.1-.8-.3c-.2-.2-.3-.5-.3-.8z" 
      fill="#030014" 
    />
  </svg>
);

const BehanceLogo = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M22 7h-7v1.5h7V7zm-7 3.5c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5H15zm2.25 0h4.5c0 1.2-.8 2.25-2.25 2.25s-2.25-1.05-2.25-2.25zM0 17h6c3.3 0 6-2.7 6-6s-2.7-6-6-6H0v12zm3-9h3c1.65 0 3 1.35 3 3s-1.35 3-3 3H3V8zm0 4.5h3c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5H3v3z" />
  </svg>
);

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'Web' | 'Video' | 'Design'>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'ALL') return true;
    return p.category === filter;
  });

  const handleOpenModal = (project: Project) => {
    sounds.playChirp();
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    sounds.playClick();
    setSelectedProject(null);
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'Web': return <Globe size={13} className="text-cyan-400" />;
      case 'Video': return <Film size={13} className="text-purple-400" />;
      case 'Design': return <Palette size={13} className="text-pink-400" />;
      default: return <Layers size={13} className="text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle 
        title="PROJECT ARCHIVES" 
        subtitle="Engineered Digital Solutions & High-End Motion" 
        badge={`${PROJECTS.length} REPOSITORIES`}
      />

      {/* Interactive Cyber Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          {(['ALL', 'Web', 'Video', 'Design'] as const).map((tab) => {
            const count = tab === 'ALL' ? PROJECTS.length : PROJECTS.filter(p => p.category === tab).length;
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  sounds.playClick();
                  setFilter(tab);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono-code font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_20px_rgba(0,242,255,0.25)]'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
                data-cursor="FILTER"
              >
                <span>{tab === 'ALL' ? 'ALL ARCHIVES' : tab === 'Web' ? 'WEB APPS' : tab === 'Video' ? 'MOTION & VFX' : 'BRAND DESIGN'}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono-code ${isActive ? 'bg-cyan-400 text-black' : 'bg-white/10 text-gray-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono-code text-gray-500 hidden md:block">
          CLICK CARD TO EXPAND INTERACTIVE HUD VIEWER
        </span>
      </div>

      {/* Futuristic Project Grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => {
            const isVideo = project.category === 'Video';
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative glass-panel rounded-3xl overflow-hidden border border-white/10 cyber-corner flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-cyan-500/40 transition-all duration-500"
              >
                {/* Clickable Media Preview */}
                <div
                  className="relative aspect-video overflow-hidden bg-black/60 cursor-pointer"
                  onClick={() => handleOpenModal(project)}
                  data-cursor="INSPECT"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('picsum')) {
                        target.src = "https://picsum.photos/seed/" + project.id + "/800/450";
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.95] group-hover:brightness-105"
                  />

                  {/* Scanline Sweep */}
                  <div className="scan-overlay opacity-25"></div>

                  {/* Category Chip Badge */}
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono-code font-bold uppercase tracking-wider text-gray-300">
                    {getCategoryIcon(project.category)}
                    <span>{project.category || 'PROJECT'}</span>
                  </div>

                  {/* Play / View Overlay Hover Indicator */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 z-20">
                    <div className="p-3.5 rounded-full bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,242,255,0.7)] group-hover:scale-110 transition-transform">
                      {isVideo ? <Play size={22} fill="currentColor" /> : <Eye size={22} />}
                    </div>
                    <span className="text-[11px] font-mono-code font-bold tracking-widest text-cyan-300 uppercase">
                      {isVideo ? 'WATCH REEL' : 'INSPECT SPECS'}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 space-y-4 flex flex-col flex-grow relative">
                  {/* Tech Pill List */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors font-heading tracking-tight leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-grow line-clamp-2">
                    {project.description}
                  </p>

                  {/* Action Footer */}
                  <div className="pt-4 flex items-center justify-between border-t border-white/5 mt-auto text-xs font-mono-code">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 group/btn"
                    >
                      <span>HUD VIEWER</span>
                      <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                    </button>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playClick();
                      }}
                      className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                      data-cursor="LAUNCH"
                    >
                      <span>DIRECT</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Project Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden border border-cyan-500/40 shadow-[0_0_50px_rgba(0,242,255,0.2)] cyber-corner flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code text-cyan-400 uppercase tracking-widest block">
                      TELEMETRY_ID // {selectedProject.id}
                    </span>
                    <h4 className="text-base font-bold text-white font-heading truncate max-w-md sm:max-w-lg">
                      {selectedProject.title}
                    </h4>
                  </div>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  data-cursor="CLOSE"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Media Body */}
              <div className="overflow-y-auto p-6 space-y-6">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                  {selectedProject.embedUrl ? (
                    <iframe
                      src={selectedProject.embedUrl}
                      title={selectedProject.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Tech Stack Breakdown */}
                <div className="space-y-3">
                  <span className="text-xs font-mono-code text-gray-400 uppercase tracking-widest block">
                    SYSTEM ARCHITECTURE // APPLIED TECHNOLOGIES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono-code font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-500/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Full Description */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono-code text-gray-400 uppercase tracking-widest block">
                    PROJECT BRIEF & EXECUTION
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
                  <span className="text-xs font-mono-code text-gray-500">
                    CATEGORY: <strong className="text-white">{selectedProject.category || 'GENERAL'}</strong>
                  </span>

                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs uppercase tracking-wider font-mono-code shadow-[0_0_20px_rgba(0,242,255,0.4)] flex items-center gap-2 hover:scale-[1.02] transition-transform"
                    data-cursor="LAUNCH"
                  >
                    <span>LAUNCH EXTERNAL RESOURCE</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ecosystem Hub Footer */}
      <div className="mt-32 p-8 sm:p-12 rounded-3xl glass-panel border border-white/10 cyber-corner text-center space-y-8">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono-code text-cyan-400 font-bold uppercase tracking-[0.3em] block">
            ECOSYSTEM DIRECTORIES
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
            Explore My Repositories & Profiles
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Direct access to verified platforms where my code repositories, client reviews, and motion design portfolios live.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          <a
            href="https://github.com/mh-alvy"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="group px-6 py-3.5 rounded-2xl bg-[#080816] border border-white/10 hover:border-cyan-400 text-white font-mono-code text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all shadow-lg hover:shadow-[0_0_25px_rgba(0,242,255,0.3)]"
            data-cursor="GITHUB"
          >
            <Github size={20} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>GITHUB PROFILE</span>
          </a>

          <a
            href="https://fiverr.com/alvy_vfx"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="group px-6 py-3.5 rounded-2xl bg-[#080816] border border-white/10 hover:border-emerald-400 text-white font-mono-code text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]"
            data-cursor="FIVERR"
          >
            <div className="text-emerald-400 group-hover:scale-110 transition-transform">
              <FiverrLogo />
            </div>
            <span>FIVERR LEVEL 2</span>
          </a>

          <a
            href="https://www.behance.net/mahamudulalvy"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="group px-6 py-3.5 rounded-2xl bg-[#080816] border border-white/10 hover:border-blue-400 text-white font-mono-code text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
            data-cursor="BEHANCE"
          >
            <div className="text-blue-400 group-hover:scale-110 transition-transform">
              <BehanceLogo />
            </div>
            <span>BEHANCE PORTFOLIO</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;