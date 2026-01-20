import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';
import { 
  Github, 
  Linkedin, 
  Briefcase, 
  MousePointer2, 
  Palette, 
  Facebook, 
  Instagram, 
  MessageCircle 
} from 'lucide-react';
import SparkleButton from './SparkleButton';

const Hero: React.FC = () => {
  const [typewrittenText, setTypewrittenText] = useState('');
  const fullText = "Crafting Digital Experiences through Code, Motion, and Vision.";
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const typingSpeed = 50; // Increased speed from 80
  const deletingSpeed = 25; // Increased speed from 40
  const pauseDuration = 2000;

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
          setLoopIndex(prev => prev + 1);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [typewrittenText, isDeleting]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'briefcase': return <Briefcase size={22} />;
      case 'linkedin': return <Linkedin size={22} />;
      case 'palette': return <Palette size={22} />;
      case 'github': return <Github size={22} />;
      case 'facebook': return <Facebook size={22} />;
      case 'instagram': return <Instagram size={22} />;
      case 'message-circle': return <MessageCircle size={22} />;
      default: return <Github size={22} />;
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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at 50% 50%, #00f2ff 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* Floating Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="z-10 text-center px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase font-mono-code"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Level 2 Seller @ Fiverr
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight font-heading leading-tight"
        >
          <span className="block text-white hover:animate-[glitch_500ms_infinite] transition-all cursor-default uppercase">MAHAMUDUL</span>
          <span className="block lights-animation uppercase">HASAN ALVY</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4 font-mono-code leading-relaxed"
        >
          <span className="text-cyan-500 mr-2">&gt;</span>
          {PERSONAL_INFO.tagline}
        </motion.div>

        {/* Typewriter Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="h-12 md:h-8 mb-12 flex justify-center items-center"
        >
          <p className="font-mono-code text-cyan-400 text-sm md:text-base tracking-tight font-bold">
            {typewrittenText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2.5 h-4 bg-cyan-400 ml-1 align-middle shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-6 mt-4 mb-20"
        >
          <SparkleButton text="VIEW_PROJECTS" onClick={() => handleScrollTo('projects')} />
          
          <a
            href="https://www.linkedin.com/in/mahamudul-alvy/"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-3.5 border border-white/10 hover:border-cyan-500/50 text-white font-bold rounded-full transition-all glass hover:bg-white/5 font-mono-code text-sm flex items-center gap-2 overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-2">
              HIRE_ME()
              <MousePointer2 size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </a>
        </motion.div>

        {/* Enhanced Social Hub with Amazing Neon Effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-4 md:gap-10"
        >
          {SOCIAL_LINKS.map((link, idx) => {
            const color = getColor(link.name);
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + idx * 0.1, type: 'spring', stiffness: 200 }}
                className="group relative flex flex-col items-center gap-3"
              >
                {/* Glow Ring Backdrop */}
                <div 
                  className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ backgroundColor: color }}
                ></div>

                {/* Main Icon Container */}
                <motion.div
                  whileHover={{ 
                    y: -10,
                    scale: 1.15,
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative p-4 md:p-5 bg-[#0a0a1a] rounded-2xl border border-white/10 group-hover:border-white/40 transition-all duration-300 shadow-2xl z-10 overflow-hidden"
                  style={{ 
                    boxShadow: `0 0 0 0px ${color}00`,
                  }}
                >
                  {/* Neon Overlay on Hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: color }}
                  ></div>

                  {/* Icon itself */}
                  <div 
                    className="transition-all duration-300 text-gray-400 group-hover:text-white"
                    style={{ 
                      filter: 'drop-shadow(0 0 8px rgba(255,255,255,0))',
                    }}
                  >
                    <div className="group-hover:scale-110 transition-transform duration-300" style={{ color: color === '#ffffff' ? 'white' : 'inherit' }}>
                      {getIcon(link.icon)}
                    </div>
                  </div>

                  {/* Reflection Streak */}
                  <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>
                </motion.div>

                {/* Label with Neon Text Effect */}
                <span 
                  className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black font-mono-code transition-all duration-300 text-gray-500 group-hover:translate-y-1"
                  style={{ 
                    color: 'inherit',
                    textShadow: `0 0 10px ${color}00`
                  }}
                >
                  <motion.span
                    whileHover={{ color: color, textShadow: `0 0 8px ${color}80` }}
                  >
                    {link.name}
                  </motion.span>
                </span>

                {/* Underline Indicator */}
                <motion.div 
                  className="w-0 h-[2px] rounded-full group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                />
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer hidden md:block"
        onClick={() => handleScrollTo('about')}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-cyan-500 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;