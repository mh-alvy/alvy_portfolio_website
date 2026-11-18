import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Volume2, VolumeX, Sparkles, Radio } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection: parentActiveSection, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [localActiveSection, setLocalActiveSection] = useState('hero');
  const [audioEnabled, setAudioEnabled] = useState(sounds.isEnabled());
  const [currentTime, setCurrentTime] = useState('');

  const currentSection = parentActiveSection || localActiveSection;

  // Live Bangladesh time (UTC+6)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 40);
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);

      // Section spy
      const sections = ['contact', 'certificates', 'projects', 'experience', 'skills', 'education', 'about', 'hero'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setLocalActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Certificates', href: '#certificates', id: 'certificates' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    sounds.playClick();
    const targetId = href.replace('#', '');
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleAudioToggle = () => {
    const next = sounds.toggle();
    setAudioEnabled(next);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-[#03030c]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'py-5 bg-gradient-to-b from-[#03030c]/90 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center gap-6">
        {/* Zone 1: Wordmark Brand Lockup */}
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            sounds.playClick();
            if (onNavigate) {
              onNavigate('hero');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 shrink-0 group"
          data-cursor="HOME"
        >
          <div className="relative p-2 bg-gradient-to-br from-cyan-500/20 to-purple-600/30 rounded-xl border border-cyan-500/40 shadow-[0_0_15px_rgba(0,242,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,242,255,0.6)] group-hover:scale-105 transition-all">
            <Terminal size={18} className="text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black tracking-tight text-lg text-white group-hover:text-cyan-300 transition-colors">
              ALVY<span className="text-cyan-400">.DEV</span>
            </span>
            <span className="text-[9px] font-mono-code font-bold tracking-[0.2em] text-gray-500 uppercase -mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              SYS: ONLINE
            </span>
          </div>
        </motion.a>

        {/* Zone 2: Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item, i) => {
            const isActive = currentSection === item.id;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap shrink-0 relative group font-mono-code ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,242,255,0.15)] border border-cyan-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-1 left-2 right-2 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full"
                  />
                )}
              </motion.a>
            );
          })}
        </div>

        {/* Zone 3: HUD Tools & Primary Action */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {/* Live UTC+6 Telemetry */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono-code text-gray-400">
            <Radio size={12} className="text-purple-400 animate-pulse" />
            <span>DAC {currentTime || '00:00:00'}</span>
          </div>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all font-mono-code ${
              audioEnabled
                ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300 shadow-[0_0_12px_rgba(0,242,255,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
            title={audioEnabled ? 'Mute futuristic audio effects' : 'Enable futuristic audio effects'}
            data-cursor="AUDIO"
          >
            {audioEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span className="text-[10px] font-bold tracking-wider">{audioEnabled ? 'FX:ON' : 'FX:OFF'}</span>
          </button>

          {/* Primary Action Button */}
          <a
            href="https://www.linkedin.com/in/mahamudul-alvy/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="group relative px-5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase font-mono-code overflow-hidden border border-cyan-500/50 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-white hover:border-cyan-400 transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:shadow-[0_0_30px_rgba(0,242,255,0.5)] flex items-center gap-2 shrink-0"
            data-cursor="CONTACT"
          >
            <Sparkles size={14} className="text-cyan-400 group-hover:rotate-45 transition-transform" />
            <span className="relative z-10">HIRE ME</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </a>
        </div>

        {/* Mobile Toggle & Audio Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={handleAudioToggle}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-400"
          >
            {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            className="p-2 text-white bg-white/5 border border-white/10 rounded-xl"
            onClick={() => {
              sounds.playClick();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Cyber Scroll Progress Beam */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-300 shadow-[0_0_10px_#00f2ff]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050514]/95 backdrop-blur-2xl border-b border-cyan-500/30 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider font-mono-code transition-colors flex items-center justify-between ${
                    currentSection === item.id
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-[10px] text-cyan-500/60 font-mono-code">/0{item.name.length}</span>
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="https://www.linkedin.com/in/mahamudul-alvy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs uppercase tracking-widest font-mono-code shadow-[0_0_20px_rgba(0,242,255,0.4)]"
                >
                  HIRE ME NOW
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;