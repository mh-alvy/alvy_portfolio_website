import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';
import { 
  Github, 
  Linkedin, 
  Briefcase, 
  Palette, 
  Facebook, 
  Instagram, 
  MessageCircle,
  ArrowRight,
  Cpu,
  Layers,
  Code2,
  Video,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Star,
  Zap,
  Activity,
  Sliders
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const Hero: React.FC = () => {

  const [typewrittenText, setTypewrittenText] = useState('');
  const fullText = "Full-Stack Software Engineer · Motion Graphics Designer · VFX Creator";
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 45;
  const deletingSpeed = 20;
  const pauseDuration = 2200;

  // 3D Tilt Card Motion Values for the Right Holographic Terminal
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { damping: 20, stiffness: 200 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        if (typewrittenText.length < fullText.length) {
          setTypewrittenText(fullText.slice(0, typewrittenText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (typewrittenText.length > 0) {
          setTypewrittenText(fullText.slice(0, typewrittenText.length - 1));
        } else {
          setIsDeleting(false);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [typewrittenText, isDeleting]);

  const handleScrollTo = (id: string) => {
    sounds.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'briefcase': return <Briefcase size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      case 'palette': return <Palette size={20} />;
      case 'github': return <Github size={20} />;
      case 'facebook': return <Facebook size={20} />;
      case 'instagram': return <Instagram size={20} />;
      case 'message-circle': return <MessageCircle size={20} />;
      default: return <Github size={20} />;
    }
  };

  const getColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'fiverr': return '#1dbf73';
      case 'linkedin': return '#0077b5';
      case 'behance': return '#0057ff';
      case 'github': return '#ffffff';
      case 'facebook': return '#1877f2';
      case 'instagram': return '#e4405f';
      case 'whatsapp': return '#25d366';
      default: return '#00f2ff';
    }
  };

  return (
    <div className="relative min-h-[88vh] flex flex-col justify-center pt-24 pb-4 px-6 max-w-7xl mx-auto">
      {/* Dynamic Grid Alignment Overlay */}
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Command Telemetry & Headline */}
        <div className="lg:col-span-6 space-y-8 z-10">
          {/* Status Kicker */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-xs font-mono-code font-bold tracking-widest shadow-[0_0_15px_rgba(0,242,255,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>AVAILABLE FOR CONTRACTS & PROJECTS</span>
          </motion.div>

          {/* Main Giant Futuristic Headline */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black font-heading tracking-tight leading-[0.95]"
            >
              <span className="block text-white hover:text-cyan-200 transition-colors">MAHAMUDUL</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,242,255,0.3)]">
                HASAN ALVY
              </span>
            </motion.h1>

            {/* Typewritten Cyber Specialization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="min-h-[2.5rem] flex items-center pt-2"
            >
              <p className="font-mono-code text-cyan-400 text-sm sm:text-base md:text-lg font-bold tracking-tight">
                <span className="text-purple-400 mr-2 font-mono-code">&gt;&gt;</span>
                {typewrittenText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-4 sm:h-5 bg-cyan-400 ml-1 align-middle shadow-[0_0_8px_#00f2ff]"
                />
              </p>
            </motion.div>
          </div>

          {/* Bio Lead Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light"
          >
            Computer Science undergraduate at CUET & Level 2 Fiverr Seller with 5+ years crafting high-impact full-stack web applications, cinematic visual effects, dynamic motion graphics, and tech ventures.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={() => handleScrollTo('projects')}
              className="group relative px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-extrabold text-sm tracking-wider uppercase font-mono-code shadow-[0_0_25px_rgba(0,242,255,0.4)] hover:shadow-[0_0_35px_rgba(0,242,255,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              data-cursor="PROJECTS"
            >
              <span>EXPLORE WORK</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleScrollTo('contact')}
              className="px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm tracking-wider uppercase font-mono-code border border-white/10 hover:border-cyan-500/50 transition-all flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,242,255,0.2)]"
              data-cursor="CONTACT"
            >
              <span>INITIALIZE CONTACT</span>
            </button>
          </motion.div>

          {/* Full-width Key Metric Badges Strip (§2.B) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10"
          >
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-black font-heading text-cyan-400 tabular-nums">500+</span>
              <p className="text-[11px] font-mono-code uppercase tracking-wider text-gray-400">Global Clients</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-black font-heading text-purple-400 tabular-nums">5+ Yrs</span>
              <p className="text-[11px] font-mono-code uppercase tracking-wider text-gray-400">Production Exp</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-black font-heading text-emerald-400 tabular-nums">CUET</span>
              <p className="text-[11px] font-mono-code uppercase tracking-wider text-gray-400">CSE Department</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-black font-heading text-yellow-400 tabular-nums">Lvl 2</span>
              <p className="text-[11px] font-mono-code uppercase tracking-wider text-gray-400">Fiverr Top Seller</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Direct Hero Portrait with Responsive Flanking & Floating Cyber Pointers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[500px] sm:min-h-[560px] lg:min-h-[640px] px-2 sm:px-4"
        >
          {/* Ambient Cyber Aura Radiating Directly Behind Alvy (No Card Borders) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] lg:w-[480px] h-[320px] sm:h-[420px] lg:h-[480px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-600/20 to-pink-500/15 blur-3xl opacity-60 pointer-events-none animate-pulse" />

          {/* Concentric Rotating Cyber Holographic Reticles Behind Alvy */}
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[380px] lg:w-[440px] h-[300px] sm:h-[380px] lg:h-[440px] pointer-events-none opacity-30 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-[spin_36s_linear_infinite]" />
            <div className="absolute inset-10 rounded-full border border-purple-500/35 animate-[spin_24s_linear_infinite_reverse]" />
            <div className="absolute inset-20 rounded-full border border-dashed border-cyan-500/25 animate-[spin_18s_linear_infinite]" />
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
          </div>

          {/* === MOBILE-ONLY FLANKING TAGS: TOP ROW (ABOVE SHOULDERS) === */}
          <div className="grid grid-cols-2 gap-2.5 w-full max-w-[440px] mb-2 lg:hidden z-30">
            {/* Mobile Tag 1: CS Engineer */}
            <motion.div 
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="px-2.5 py-1.5 rounded-xl bg-[#060614]/90 backdrop-blur-md border border-cyan-500/40 shadow-[0_0_15px_rgba(0,242,255,0.2)] flex items-center gap-2 cursor-default"
              data-cursor="CS_ENG"
              onClick={() => sounds.playClick()}
            >
              <div className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                <Cpu size={14} />
              </div>
              <div className="leading-tight overflow-hidden">
                <span className="font-heading font-black text-[10px] sm:text-xs text-white block truncate">
                  CS Engineer
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono-code text-cyan-400/90 font-bold block truncate">
                  CUET // CSE Dept.
                </span>
              </div>
            </motion.div>

            {/* Mobile Tag 2: Fiverr Lvl 2 */}
            <motion.div 
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              className="px-2.5 py-1.5 rounded-xl bg-[#060614]/90 backdrop-blur-md border border-emerald-500/40 shadow-[0_0_15px_rgba(34,197,94,0.2)] flex items-center gap-2 cursor-default"
              data-cursor="FIVERR_PRO"
              onClick={() => sounds.playClick()}
            >
              <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                <Star size={14} className="fill-emerald-400" />
              </div>
              <div className="leading-tight overflow-hidden">
                <span className="font-heading font-black text-[10px] sm:text-xs text-white block truncate">
                  Fiverr Lvl 2
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono-code text-emerald-400/90 font-bold block truncate">
                  ★ 5.0 · 500+ Orders
                </span>
              </div>
            </motion.div>
          </div>

          {/* Interactive 3D Parallax Container */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[540px] flex items-end justify-center select-none"
          >
            {/* The Cutout Portrait Image of Alvy - COMPLETELY UNOBSTRUCTED, ZERO OVERLAPPING TAGS */}
            <div className="relative z-10 w-full flex items-end justify-center">
              <img
                src="/assets/aistudio/Untitled_design__3__6b5e178f.png"
                alt="Mahamudul Hasan Alvy"
                className="relative z-10 w-auto h-[400px] sm:h-[480px] lg:h-[600px] max-w-full object-contain object-bottom filter contrast-[1.06] brightness-[1.02] transition-all duration-300 pointer-events-none"
                style={{
                  filter: 'drop-shadow(0 0 35px rgba(0, 242, 255, 0.4)) drop-shadow(0 15px 40px rgba(0, 0, 0, 0.95))',
                  maskImage: 'linear-gradient(to bottom, black 84%, transparent 99%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 84%, transparent 99%)',
                }}
                referrerPolicy="no-referrer"
              />

              {/* Glowing Tactical Target Points on Body (Desktop only) */}
              {/* Point 1: Left Collar / CS Engineer */}
              <div className="absolute top-[26%] left-[36%] z-20 pointer-events-none hidden lg:flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400 shadow-[0_0_8px_#00f2ff]" />
              </div>

              {/* Point 2: Right Shoulder / Fiverr Lvl 2 */}
              <div className="absolute top-[28%] right-[32%] z-20 pointer-events-none hidden lg:flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 shadow-[0_0_8px_#22c55e]" />
              </div>

              {/* Point 3: Left Chest / Govt. Authorized Freelancer */}
              <div className="absolute top-[52%] left-[40%] z-20 pointer-events-none hidden lg:flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              </div>

              {/* Point 4: Right Waist / Motion Graphics Designer */}
              <div className="absolute top-[58%] right-[36%] z-20 pointer-events-none hidden lg:flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-400 shadow-[0_0_8px_#c084fc]" />
              </div>
            </div>

            {/* === DESKTOP-ONLY FLOATING POINTER TAGS AROUND BODY === */}

            {/* 1. CS Engineer (Top-Left) */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(45px)' }}
              className="hidden lg:block absolute top-[10%] -left-8 xl:-left-14 z-30"
            >
              <div 
                className="group relative px-3.5 py-2 rounded-2xl bg-[#060614]/90 backdrop-blur-md border border-cyan-500/40 shadow-[0_0_20px_rgba(0,242,255,0.25)] flex items-center gap-2.5 hover:scale-105 hover:border-cyan-400 transition-all cursor-default"
                data-cursor="CS_ENG"
                onMouseEnter={() => sounds.playHover()}
              >
                <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(0,242,255,0.35)] group-hover:scale-110 transition-transform">
                  <Cpu size={15} />
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-black text-xs text-white tracking-wide whitespace-nowrap">
                      CS Engineer
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  </div>
                  <span className="text-[10px] font-mono-code text-cyan-400/90 font-bold tracking-wider block whitespace-nowrap mt-0.5">
                    CUET // Dept. of CSE
                  </span>
                </div>
              </div>

              {/* Glowing Pointer Line from Card to Shoulder */}
              <div className="hidden lg:flex items-center absolute left-full top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-6 xl:w-10 h-[1.5px] bg-gradient-to-r from-cyan-400 to-cyan-400/80 shadow-[0_0_8px_#00f2ff]" />
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2ff]" />
              </div>
            </motion.div>

            {/* 2. Fiverr Lvl 2 Seller (Top-Right) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              style={{ transform: 'translateZ(45px)' }}
              className="hidden lg:block absolute top-[16%] -right-8 xl:-right-14 z-30"
            >
              <div 
                className="group relative px-3.5 py-2 rounded-2xl bg-[#060614]/90 backdrop-blur-md border border-emerald-500/40 shadow-[0_0_20px_rgba(34,197,94,0.25)] flex items-center gap-2.5 hover:scale-105 hover:border-emerald-400 transition-all cursor-default"
                data-cursor="FIVERR_PRO"
                onMouseEnter={() => sounds.playHover()}
              >
                {/* Glowing Pointer Line from Card leftward to Right Shoulder */}
                <div className="hidden lg:flex items-center absolute right-full top-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#22c55e]" />
                  <div className="w-6 xl:w-10 h-[1.5px] bg-gradient-to-r from-emerald-400/80 to-emerald-400 shadow-[0_0_8px_#22c55e]" />
                </div>

                <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.35)] group-hover:scale-110 transition-transform">
                  <Star size={15} className="fill-emerald-400" />
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-black text-xs text-white tracking-wide whitespace-nowrap">
                      Fiverr Lvl 2 Seller
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <span className="text-[10px] font-mono-code text-emerald-400/90 font-bold tracking-wider block whitespace-nowrap mt-0.5">
                    Top Rated · 500+ Orders
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 3. Govt. Authorized Freelancer (Mid-Left) */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              style={{ transform: 'translateZ(50px)' }}
              className="hidden lg:block absolute top-[50%] -left-10 xl:-left-16 z-30"
            >
              <div 
                className="group relative px-3.5 py-2 rounded-2xl bg-[#060614]/90 backdrop-blur-md border border-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)] flex items-center gap-2.5 hover:scale-105 hover:border-sky-400 transition-all cursor-default"
                data-cursor="GOVT_AUTH"
                onMouseEnter={() => sounds.playHover()}
              >
                <div className="p-1.5 rounded-xl bg-sky-500/20 text-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.35)] group-hover:scale-110 transition-transform">
                  <ShieldCheck size={15} />
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-black text-xs text-white tracking-wide whitespace-nowrap">
                      Govt. Authorized Freelancer
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                  </div>
                  <span className="text-[10px] font-mono-code text-sky-400/90 font-bold tracking-wider block whitespace-nowrap mt-0.5">
                    ICT Division Verified ID
                  </span>
                </div>
              </div>

              {/* Glowing Pointer Line from Card to Suit Torso */}
              <div className="hidden lg:flex items-center absolute left-full top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-6 xl:w-12 h-[1.5px] bg-gradient-to-r from-sky-400 to-sky-400/80 shadow-[0_0_8px_#38bdf8]" />
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              </div>
            </motion.div>

            {/* 4. Motion Graphics Designer (Mid-Right) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
              style={{ transform: 'translateZ(55px)' }}
              className="hidden lg:block absolute top-[58%] -right-10 xl:-right-16 z-30"
            >
              <div 
                className="group relative px-3.5 py-2 rounded-2xl bg-[#060614]/90 backdrop-blur-md border border-purple-500/40 shadow-[0_0_20px_rgba(192,132,252,0.25)] flex items-center gap-2.5 hover:scale-105 hover:border-purple-400 transition-all cursor-default"
                data-cursor="MOTION_DES"
                onMouseEnter={() => sounds.playHover()}
              >
                {/* Glowing Pointer Line from Card leftward to Right Arm */}
                <div className="hidden lg:flex items-center absolute right-full top-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
                  <div className="w-6 xl:w-12 h-[1.5px] bg-gradient-to-r from-purple-400/80 to-purple-400 shadow-[0_0_8px_#c084fc]" />
                </div>

                <div className="p-1.5 rounded-xl bg-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.35)] group-hover:scale-110 transition-transform">
                  <Video size={15} />
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-black text-xs text-white tracking-wide whitespace-nowrap">
                      Motion Graphics Designer
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                  </div>
                  <span className="text-[10px] font-mono-code text-purple-400/90 font-bold tracking-wider block whitespace-nowrap mt-0.5">
                    VFX & 3D Animation Specialist
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* === MOBILE-ONLY FLANKING TAGS: BOTTOM ROW (BELOW TORSO) === */}
          <div className="grid grid-cols-2 gap-2.5 w-full max-w-[440px] mt-2 lg:hidden z-30">
            {/* Mobile Tag 3: Govt. Authorized Freelancer */}
            <motion.div 
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="px-2.5 py-1.5 rounded-xl bg-[#060614]/90 backdrop-blur-md border border-sky-500/40 shadow-[0_0_15px_rgba(56,189,248,0.2)] flex items-center gap-2 cursor-default"
              data-cursor="GOVT_AUTH"
              onClick={() => sounds.playClick()}
            >
              <div className="p-1 rounded-lg bg-sky-500/20 text-sky-400 shrink-0">
                <ShieldCheck size={14} />
              </div>
              <div className="leading-tight overflow-hidden">
                <span className="font-heading font-black text-[10px] sm:text-xs text-white block truncate">
                  Govt. Authorized
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono-code text-sky-400/90 font-bold block truncate">
                  ICT Division Verified
                </span>
              </div>
            </motion.div>

            {/* Mobile Tag 4: Motion Graphics Designer */}
            <motion.div 
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="px-2.5 py-1.5 rounded-xl bg-[#060614]/90 backdrop-blur-md border border-purple-500/40 shadow-[0_0_15px_rgba(192,132,252,0.2)] flex items-center gap-2 cursor-default"
              data-cursor="MOTION_DES"
              onClick={() => sounds.playClick()}
            >
              <div className="p-1 rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                <Video size={14} />
              </div>
              <div className="leading-tight overflow-hidden">
                <span className="font-heading font-black text-[10px] sm:text-xs text-white block truncate">
                  Motion Graphics
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono-code text-purple-400/90 font-bold block truncate">
                  VFX & 3D Specialist
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Social Transmission Deck */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 pt-6 border-t border-white/10"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono-code font-bold uppercase tracking-[0.3em] text-gray-500">
            CONNECT VIA NETWORK FREQUENCIES
          </span>
          <span className="text-[10px] font-mono-code text-cyan-500/60 hidden sm:inline">
            [7 CHANNELS DETECTED]
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {SOCIAL_LINKS.map((link) => {
            const color = getColor(link.name);
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="group relative p-3 rounded-xl bg-[#080816]/80 hover:bg-[#101026] border border-white/5 hover:border-white/20 transition-all duration-300 flex items-center gap-3 overflow-hidden shadow-lg"
                data-cursor={link.name.toUpperCase()}
              >
                {/* Glow accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                ></div>

                <div
                  className="p-1.5 rounded-lg bg-white/5 group-hover:scale-110 transition-transform"
                  style={{ color }}
                >
                  {getIcon(link.icon)}
                </div>

                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors truncate font-heading">
                    {link.name}
                  </span>
                  <span className="text-[9px] font-mono-code text-gray-500 group-hover:text-cyan-400 transition-colors uppercase">
                    Launch ↗
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </motion.div>

      {/* Down Scroll Arrow */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handleScrollTo('about')}
          className="text-cyan-400/70 hover:text-cyan-300 transition-colors animate-bounce p-1.5"
          title="Scroll down to Agent Dossier"
          data-cursor="NEXT_SEC"
        >
          <ChevronDown size={20} />
        </button>
      </div>
    </div>
  );
};

export default Hero;