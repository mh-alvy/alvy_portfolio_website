import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import SectionTitle from './SectionTitle';
import { ExternalLink, Play, Eye, X, Sparkles, Film, Globe, Palette, Layers, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const FiverrLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    <path 
      d="M7.1 17.5h1.9v-5.6h1.9v-1.6H9V9.1c0-.4.1-.7.2-.8.1-.1.4-.2.8-.2h1v-1.7H10c-1 0-1.8.3-2.3.8-.5.5-.7 1.2-.7 2.2v.9H5.8v1.6h1.3v5.6zm7.2 0h1.9v-5.6h-1.9v5.6zm0-6.6c0-.3.1-.6.3-.8.2-.2.5-.3.8-.3s.6.1.8.3c.2.2.3.5.3.8s-.1.6-.3.8c-.2.2-.5.3-.8.3s-.6-.1-.8-.3c-.2-.2-.3-.5-.3-.8z" 
      fill="#030014" 
    />
  </svg>
);

const BehanceLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M22 7h-7v1.5h7V7zm-7 3.5c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5H15zm2.25 0h4.5c0 1.2-.8 2.25-2.25 2.25s-2.25-1.05-2.25-2.25zM0 17h6c3.3 0 6-2.7 6-6s-2.7-6-6-6H0v12zm3-9h3c1.65 0 3 1.35 3 3s-1.35 3-3 3H3V8zm0 4.5h3c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5H3v3z" />
  </svg>
);

const ITEMS_PER_PAGE = 3;

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'Web' | 'Video' | 'Design'>('ALL');
  const [page, setPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'ALL') return true;
    return p.category === filter;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const visibleProjects = filteredProjects.slice(
    safePage * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const handleFilterChange = (tab: 'ALL' | 'Web' | 'Video' | 'Design') => {
    sounds.playClick();
    setFilter(tab);
    setPage(0);
  };

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
      case 'Web': return <Globe size={12} className="text-cyan-400" />;
      case 'Video': return <Film size={12} className="text-purple-400" />;
      case 'Design': return <Palette size={12} className="text-pink-400" />;
      default: return <Layers size={12} className="text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      <SectionTitle 
        title="PROJECT ARCHIVES" 
        subtitle="Engineered Digital Solutions & High-End Motion" 
        badge={`${PROJECTS.length} REPOSITORIES`}
      />

      {/* Interactive Cyber Filter Tabs + Deck Pagination Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          {(['ALL', 'Web', 'Video', 'Design'] as const).map((tab) => {
            const count = tab === 'ALL' ? PROJECTS.length : PROJECTS.filter(p => p.category === tab).length;
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => handleFilterChange(tab)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-mono-code font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_20px_rgba(0,242,255,0.25)]'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
                data-cursor="FILTER"
              >
                <span>{tab === 'ALL' ? 'ALL ARCHIVES' : tab === 'Web' ? 'WEB APPS' : tab === 'Video' ? 'MOTION & VFX' : 'BRAND DESIGN'}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono-code ${isActive ? 'bg-cyan-400 text-black' : 'bg-white/10 text-gray-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cyber Deck Page Switcher */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setPage((p) => (p - 1 + totalPages) % totalPages);
              }}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 transition-all"
              data-cursor="PREV"
              title="Previous Archive Deck"
            >
              <ChevronLeft size={15} />
            </button>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/50 border border-white/10 text-[10px] font-mono-code font-bold text-cyan-300">
              <span>DECK 0{safePage + 1} / 0{totalPages}</span>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setPage((p) => (p + 1) % totalPages);
              }}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 transition-all"
              data-cursor="NEXT"
              title="Next Archive Deck"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Futuristic Single-Row 3-Column Project Grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, idx) => {
            const isVideo = project.category === 'Video';
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -12 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="group relative glass-panel rounded-3xl overflow-hidden border border-white/10 cyber-corner flex flex-col h-full shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:border-cyan-500/40 transition-all duration-500"
              >
                {/* Clickable Media Preview */}
                <div
                  className="relative h-40 sm:h-44 overflow-hidden bg-black/60 cursor-pointer shrink-0"
                  onClick={() => handleOpenModal(project)}
                  data-cursor="INSPECT"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
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
                  <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono-code font-bold uppercase tracking-wider text-gray-300">
                    {getCategoryIcon(project.category)}
                    <span>{project.category || 'PROJECT'}</span>
                  </div>

                  {/* Play / View Overlay Hover Indicator */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 z-20">
                    <div className="p-2.5 rounded-full bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,242,255,0.7)] group-hover:scale-110 transition-transform">
                      {isVideo ? <Play size={18} fill="currentColor" /> : <Eye size={18} />}
                    </div>
                    <span className="text-[10px] font-mono-code font-bold tracking-widest text-cyan-300 uppercase">
                      {isVideo ? 'WATCH REEL' : 'INSPECT SPECS'}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 sm:p-5 space-y-2.5 flex flex-col flex-grow relative">
                  {/* Tech Pill List */}
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono-code font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors font-heading tracking-tight leading-snug line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-xs leading-relaxed flex-grow line-clamp-2">
                    {project.description}
                  </p>

                  {/* Action Footer */}
                  <div className="pt-2.5 flex items-center justify-between border-t border-white/5 mt-auto text-[11px] font-mono-code">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 group/btn"
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
                      <ExternalLink size={11} />
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
              <div className="overflow-y-auto p-6 space-y-6 allow-inner-scroll">
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

      {/* Compact Ecosystem Hub Strip */}
      <div className="mt-5 p-4 rounded-2xl glass-panel border border-white/10 cyber-corner flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center lg:text-left">
          <span className="text-[10px] font-mono-code text-cyan-400 font-bold uppercase tracking-[0.25em] px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            ECOSYSTEM DIRECTORIES
          </span>
          <span className="text-xs sm:text-sm font-bold font-heading text-gray-200">
            Direct access to verified code repositories & portfolios
          </span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          <a
            href="https://github.com/mh-alvy"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="group px-4 py-2 rounded-xl bg-[#080816] border border-white/10 hover:border-cyan-400 text-white font-mono-code text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(0,242,255,0.25)]"
            data-cursor="GITHUB"
          >
            <Github size={15} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>GITHUB PROFILE</span>
          </a>

          <a
            href="https://fiverr.com/alvy_vfx"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="group px-4 py-2 rounded-xl bg-[#080816] border border-white/10 hover:border-emerald-400 text-white font-mono-code text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.25)]"
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
            className="group px-4 py-2 rounded-xl bg-[#080816] border border-white/10 hover:border-blue-400 text-white font-mono-code text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
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