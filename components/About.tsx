import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';
import SectionTitle from './SectionTitle';
import { 
  ShieldCheck, 
  Terminal, 
  Award, 
  Globe, 
  Code, 
  Zap, 
  Cpu, 
  Crosshair,
  ExternalLink
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bio' | 'vision' | 'philosophy'>('bio');

  // Interactive 3D Card Tilt for Profile Hologram
  const photoCardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoCardRef.current) return;
    const rect = photoCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      <SectionTitle 
        title="AGENT DOSSIER" 
        subtitle="A Fusion of Engineering Precision & Visual Craft" 
        badge="SYS_ID: ALVY-CSE"
      />

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Futuristic Biometric ID Card */}
        <div
          className="lg:col-span-5 relative perspective-[1000px]"
        >
          {/* Holographic Glow Aura */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-600/20 to-blue-500/20 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>

          <motion.div
            ref={photoCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative glass-panel p-3 rounded-3xl overflow-hidden shadow-2xl border border-white/10 cyber-corner group"
          >
            {/* Holographic Laser Scanline */}
            <div className="scan-overlay"></div>

            {/* Top HUD Telemetry Bar */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-black/60 rounded-xl mb-2.5 border border-white/5 text-[10px] font-mono-code">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Crosshair size={12} className="animate-spin text-cyan-400" style={{ animationDuration: '6s' }} />
                <span>BIOMETRIC SCAN: VERIFIED</span>
              </div>
              <span className="text-gray-400">LAT 23.46° N // LON 91.18° E</span>
            </div>

            {/* Photo Container Frame with Laser Border */}
            <div className="relative h-[200px] sm:h-[260px] lg:h-[300px] overflow-hidden rounded-2xl bg-black shadow-inner border border-white/10">
              <picture>
                <source srcSet="/assets/aistudio/alvy_hero.webp" type="image/webp" />
                <img
                  src="/assets/aistudio/alvy_hero.webp"
                  alt="Mahamudul Hasan Alvy"
                  width={750}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain object-bottom filter contrast-[1.08] brightness-[1.02] group-hover:scale-105 transition-transform duration-700 pt-2"
                />
              </picture>

              {/* Digital Grid Hologram Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle at 50% 50%, #00f2ff 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              ></div>

              {/* Verified Identity Badge Overlay */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[9px] font-mono-code font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,242,255,0.3)]">
                <ShieldCheck size={12} className="text-cyan-400" />
                <span>MAHAMUDUL HASAN ALVY</span>
              </div>

              {/* Specialization Badge */}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[8px] font-mono-code text-gray-400 uppercase tracking-widest block">Primary Track</span>
                  <span className="text-xs font-black text-white font-heading tracking-wide">SOFTWARE & MOTION DESIGN</span>
                </div>
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Zap size={14} />
                </div>
              </div>
            </div>

            {/* Quick Stat Tiles Under Portrait */}
            <div className="grid grid-cols-2 gap-2.5 mt-2.5">
              <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 text-center">
                <span className="text-xl font-black font-heading text-cyan-400 tabular-nums">500+</span>
                <p className="text-[9px] font-mono-code uppercase tracking-wider text-gray-400">Orders Delivered</p>
              </div>
              <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 text-center">
                <span className="text-xl font-black font-heading text-purple-400 tabular-nums">100%</span>
                <p className="text-[9px] font-mono-code uppercase tracking-wider text-gray-400">Job Success Rate</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Dossier Content & Interactive Tabs */}
        <div className="lg:col-span-7 space-y-5">
          {/* Futuristic Tab Switcher */}
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-white/5 border border-white/10 max-w-md">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('bio');
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono-code font-bold tracking-wider uppercase transition-all ${
                activeTab === 'bio'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              01. DOSSIER
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('vision');
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono-code font-bold tracking-wider uppercase transition-all ${
                activeTab === 'vision'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              02. VISION
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('philosophy');
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono-code font-bold tracking-wider uppercase transition-all ${
                activeTab === 'philosophy'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              03. STACK
            </button>
          </div>

          {/* Dynamic Tab Body */}
          {activeTab === 'bio' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono-code text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} />
                  <span>TRANSMISSION: GREETINGS</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                  {PERSONAL_INFO.aboutGreetings} I'm Alvy.
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-gray-300 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  I am a Computer Science & Engineering undergraduate at CUET and Level 2 Seller on Fiverr with over 5 years of professional production experience across dynamic web systems, motion graphics, video editing, and VFX.
                </p>
                <p>
                  Having delivered over 500 projects for clients in North America, Europe, Asia, and worldwide, I specialize in combining rigorous engineering principles with cinematic storytelling to produce software and visuals that leave a lasting mark.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'vision' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono-code text-purple-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Cpu size={14} />
                  <span>CORE MISSION // OBJECTIVES</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                  Engineering Software with Visual Soul.
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-gray-300 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  As Chief Technology Officer at Break The Fear Edtech, I guide technical architecture and product design to empower thousands of students across Bangladesh.
                </p>
                <p>
                  My goal is to bridge the gap between engineering and art: building scalable full-stack applications with high aesthetic finish, silky 60fps micro-interactions, and flawless usability.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'philosophy' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono-code text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Code size={14} />
                  <span>SYSTEM PRINCIPLES // TECHNICAL EXCELLENCE</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                  Clean Architectures, Cinematic Polish.
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-gray-300 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Every pixel and line of code must serve a deliberate function. I build with modern TypeScript, React, Next.js, and performant backend APIs, pairing them with Adobe Creative Suite & motion engines for unprecedented visual impact.
                </p>
              </div>
            </motion.div>
          )}

          {/* Clean 4-Column Credential Highlights Strip */}
          <div className="grid sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all flex items-center gap-3.5 group">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                <Code size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono-code text-gray-500 uppercase tracking-widest block">Academic</span>
                <span className="text-xs sm:text-sm font-bold text-white font-heading">CUET Computer Science</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all flex items-center gap-3.5 group">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                <Award size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono-code text-gray-500 uppercase tracking-widest block">Freelance Rank</span>
                <span className="text-xs sm:text-sm font-bold text-white font-heading">Level 2 Seller @ Fiverr</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all flex items-center gap-3.5 group">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <Globe size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono-code text-gray-500 uppercase tracking-widest block">Leadership</span>
                <span className="text-xs sm:text-sm font-bold text-white font-heading">CTO @ Break The Fear</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-pink-500/30 transition-all flex items-center gap-3.5 group">
              <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 group-hover:scale-110 transition-transform">
                <Zap size={18} />
              </div>
              <div>
                <span className="text-[9px] font-mono-code text-gray-500 uppercase tracking-widest block">Instruction</span>
                <span className="text-xs sm:text-sm font-bold text-white font-heading">Physics & ICT Educator</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;