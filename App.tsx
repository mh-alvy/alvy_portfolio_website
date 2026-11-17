import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import BackgroundEffects from './components/BackgroundEffects';
import CustomCursor from './components/CustomCursor';
import { Terminal, ArrowUp } from 'lucide-react';
import { sounds } from './utils/soundEffects';

const SECTIONS = [
  { id: 'hero', code: '01', label: 'COMMAND' },
  { id: 'about', code: '02', label: 'DOSSIER' },
  { id: 'education', code: '03', label: 'ACADEMICS' },
  { id: 'skills', code: '04', label: 'ARSENAL' },
  { id: 'experience', code: '05', label: 'TIMELINE' },
  { id: 'projects', code: '06', label: 'ARCHIVES' },
  { id: 'certificates', code: '07', label: 'CREDENTIALS' },
  { id: 'contact', code: '08', label: 'UPLINK' },
];

const App: React.FC = () => {
  const location = useLocation();
  const [booting, setBooting] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [transitionBanner, setTransitionBanner] = useState<string | null>(null);
  const isGlidingRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Track active section and assist smooth section-to-section wheel transitions at boundaries
  useEffect(() => {
    const handleScroll = () => {
      const scrollCenter = window.scrollY + window.innerHeight * 0.38;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollCenter) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    const triggerSectionGlide = (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= SECTIONS.length) return;
      const targetSec = SECTIONS[targetIndex];
      const el = document.getElementById(targetSec.id);
      if (!el) return;

      isGlidingRef.current = true;
      setActiveSection(targetSec.id);
      setTransitionBanner(`${targetSec.code} // ${targetSec.label}`);

      const navbarOffset = targetSec.id === 'hero' ? 0 : 72;
      const targetTop = Math.max(0, el.offsetTop - navbarOffset);

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });

      setTimeout(() => {
        setTransitionBanner(null);
      }, 650);

      setTimeout(() => {
        isGlidingRef.current = false;
      }, 850);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isGlidingRef.current) return;
      // Ignore tiny trackpad jitter
      if (Math.abs(e.deltaY) < 28) return;

      const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
      if (currentIndex === -1) return;

      const currentEl = document.getElementById(SECTIONS[currentIndex].id);
      if (!currentEl) return;

      const rect = currentEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (e.deltaY > 0 && currentIndex < SECTIONS.length - 1) {
        // Scrolling DOWN: if near the bottom of the current section, glide smoothly to the next section
        const distanceToSectionBottom = rect.bottom - viewportHeight;
        if (distanceToSectionBottom <= 90) {
          e.preventDefault();
          triggerSectionGlide(currentIndex + 1);
        }
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scrolling UP: if near the top of the current section, glide smoothly to the previous section
        const distanceToSectionTop = rect.top;
        if (distanceToSectionTop >= -60) {
          e.preventDefault();
          triggerSectionGlide(currentIndex - 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection]);

  const handleScrollTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpSection = (sec: typeof SECTIONS[0]) => {
    sounds.playClick();
    const el = document.getElementById(sec.id);
    if (!el) return;
    setTransitionBanner(`${sec.code} // ${sec.label}`);
    const navbarOffset = sec.id === 'hero' ? 0 : 72;
    window.scrollTo({
      top: Math.max(0, el.offsetTop - navbarOffset),
      behavior: 'smooth',
    });
    setTimeout(() => setTransitionBanner(null), 650);
  };

  return (
    <div className="relative min-h-screen bg-[#03030c] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      <CustomCursor />
      <BackgroundEffects />
      <Navbar />

      {/* Section Transition HUD Telemetry Toast */}
      <AnimatePresence>
        {transitionBanner && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9000] pointer-events-none px-4 py-1.5 rounded-full bg-[#060618]/90 border border-cyan-400/50 backdrop-blur-md shadow-[0_0_25px_rgba(0,242,255,0.4)] flex items-center gap-2.5"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-mono-code font-extrabold tracking-[0.25em] text-cyan-300 uppercase">
              SECTOR SHIFT // {transitionBanner}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right-Side Floating Section Pager Rail */}
      <div className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => handleJumpSection(sec)}
              data-cursor={sec.label}
              className="group flex items-center gap-2.5 py-0.5 focus:outline-none"
            >
              <span
                className={`text-[9px] font-mono-code font-bold tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? 'opacity-100 text-cyan-400 translate-x-0'
                    : 'opacity-0 group-hover:opacity-80 text-gray-400 translate-x-2 group-hover:translate-x-0'
                }`}
              >
                {sec.code}.{sec.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-6 bg-gradient-to-b from-cyan-400 to-purple-500 shadow-[0_0_12px_#00f2ff]'
                    : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-cyan-400/70'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Instant Futuristic Boot Overlay */}
      <AnimatePresence>
        {booting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            onClick={() => setBooting(false)}
            className="fixed inset-0 z-[10000] bg-[#03030c] flex flex-col items-center justify-center p-6 cursor-pointer"
          >
            <motion.div
              animate={{ rotate: 360, scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full border-2 border-cyan-400 border-t-purple-500 shadow-[0_0_25px_rgba(0,242,255,0.7)] mb-4"
            />
            <p className="text-cyan-400 font-mono-code text-xs font-bold tracking-[0.3em] uppercase animate-pulse">
              INITIALIZING SYSTEM MATRIX // 60 FPS
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomeWrapper />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Futuristic Cyber Footer */}
      <footer className="relative z-10 py-12 border-t border-white/10 bg-[#050514]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            {/* Brand Logo & Tagline */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Terminal size={20} />
              </div>
              <div>
                <span className="font-heading font-black text-lg text-white tracking-tight">
                  MAHAMUDUL HASAN ALVY
                </span>
                <p className="text-xs font-mono-code text-gray-400">
                  Full-Stack Engineer · Motion Designer · CUET CSE Undergrad
                </p>
              </div>
            </div>

            {/* Quick Navigation Anchors */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono-code text-gray-400">
              <a href="#about" className="hover:text-cyan-400 transition-colors">ABOUT</a>
              <a href="#skills" className="hover:text-cyan-400 transition-colors">SKILLS</a>
              <a href="#experience" className="hover:text-cyan-400 transition-colors">EXPERIENCE</a>
              <a href="#projects" className="hover:text-cyan-400 transition-colors">PROJECTS</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">CONTACT</a>
            </div>

            {/* Back to Top Rocket */}
            <button
              onClick={handleScrollTop}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400 text-xs font-mono-code font-bold text-gray-300 hover:text-cyan-300 transition-all flex items-center gap-2 group"
              data-cursor="TOP"
            >
              <span>RETURN TO APEX</span>
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-gray-500">
            <p>
              © 2026 <span className="text-gray-300 font-bold">Mahamudul Hasan Alvy</span>. Designed & Engineered with precision.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>ALL SERVICES OPERATIONAL</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface CyberSectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  showDivider?: boolean;
}

const CyberSection: React.FC<CyberSectionProps> = ({
  id,
  className = '',
  children,
  showDivider = true,
}) => {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      {showDivider && (
        <div className="max-w-7xl mx-auto px-6 mb-6 md:mb-8">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent origin-center relative"
          >
            <span className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-cyan-400/80 shadow-[0_0_10px_#00f2ff]" />
          </motion.div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.985, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.12, margin: '-40px 0px -40px 0px' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
};

const HomeWrapper: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <section id="hero">
        <Hero />
      </section>

      <CyberSection id="about" className="pt-4 pb-14 md:pt-6 md:pb-16 px-6">
        <About />
      </CyberSection>

      <CyberSection id="education" className="py-14 md:py-16 px-6 bg-white/[0.01]">
        <Education />
      </CyberSection>

      <CyberSection id="skills" className="py-14 md:py-16 px-6">
        <Skills />
      </CyberSection>

      <CyberSection id="experience" className="py-14 md:py-16 px-6 bg-white/[0.01]">
        <Experience />
      </CyberSection>

      <CyberSection id="projects" className="py-14 md:py-16 px-6">
        <Projects />
      </CyberSection>

      <CyberSection id="certificates" className="py-14 md:py-16 px-6 bg-white/[0.01]">
        <Certificates />
      </CyberSection>

      <CyberSection id="contact" className="py-14 md:py-16 px-6">
        <Contact />
      </CyberSection>
    </motion.div>
  );
};

export default App;