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
  const [activeSection, setActiveSection] = useState('hero');
  const [transitionBanner, setTransitionBanner] = useState<string | null>(null);
  const isGlidingRef = useRef(false);

  // Track active section and assist smooth section-to-section wheel transitions
  useEffect(() => {
    const handleScroll = () => {
      const scrollCenter = window.scrollY + window.innerHeight * 0.42;
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
      }, 800);
    };

    const handleWheel = (e: WheelEvent) => {
      // Only use full-viewport glide on desktop screens where sections are locked to 100dvh
      if (
        window.innerWidth < 768 ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      ) return;
      if (isGlidingRef.current) {
        e.preventDefault();
        return;
      }
      // Ignore tiny trackpad jitter
      if (Math.abs(e.deltaY) < 22) return;

      const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
      if (currentIndex === -1) return;

      const currentEl = document.getElementById(SECTIONS[currentIndex].id);
      if (!currentEl) return;

      const rect = currentEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (e.deltaY > 0 && currentIndex < SECTIONS.length - 1) {
        const distanceToSectionBottom = rect.bottom - viewportHeight;
        if (distanceToSectionBottom <= 95) {
          e.preventDefault();
          triggerSectionGlide(currentIndex + 1);
        }
      } else if (e.deltaY < 0 && currentIndex > 0) {
        const distanceToSectionTop = rect.top;
        if (distanceToSectionTop >= -75) {
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
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9000] pointer-events-none px-4 py-1.5 rounded-full bg-[#060618]/90 border border-cyan-400/50 backdrop-blur-md shadow-[0_0_25px_rgba(0,242,255,0.4)] flex items-center gap-2.5"
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

      <main className="relative z-10">
        <Routes location={location}>
          <Route path="/" element={<HomeWrapper onScrollTop={handleScrollTop} />} />
        </Routes>
      </main>
    </div>
  );
};

interface ViewportFitSectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  showDivider?: boolean;
  isHero?: boolean;
}

/**
 * ViewportFitSection guarantees that on any screen size (laptop, desktop, ultrawide, tablet),
 * each section's block fits 100% inside the visible screen height (100dvh minus navbar)
 * without its bottom portion ever getting cut off or overflowing outside the screen.
 * On mobile phones, it renders immediately with zero opacity/blur traps so there is never a black screen.
 */
const ViewportFitSection: React.FC<ViewportFitSectionProps> = ({
  id,
  className = '',
  children,
  showDivider = true,
  isHero = false,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Mobile devices use natural vertical document flow without scaling
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    const updateScale = () => {
      const el = contentRef.current;
      if (!el || window.innerWidth < 768) {
        setScale(1);
        return;
      }

      const navbarHeight = 76;
      const verticalBreathingRoom = 20;
      const availableHeight = window.innerHeight - navbarHeight - verticalBreathingRoom;
      const naturalHeight = el.offsetHeight;

      if (naturalHeight > availableHeight && availableHeight > 320) {
        const nextScale = Math.max(0.66, Number((availableHeight / naturalHeight).toFixed(3)));
        setScale(nextScale);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <section
      id={id}
      className={`relative overflow-x-hidden md:overflow-hidden flex flex-col justify-center ${
        isHero
          ? 'min-h-screen md:min-h-dvh md:h-dvh pt-20 pb-6 md:pb-3 px-4 sm:px-6'
          : 'py-10 md:py-4 md:min-h-[calc(100dvh-72px)] md:h-[calc(100dvh-72px)] px-4 sm:px-6'
      } ${className}`}
    >
      {showDivider && (
        <div className="max-w-7xl w-full mx-auto px-6 absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent relative">
            <span className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-cyan-400/80 shadow-[0_0_10px_#00f2ff]" />
          </div>
        </div>
      )}

      <div className="w-full flex items-center justify-center flex-1">
        <div
          ref={contentRef}
          style={{
            transform: scale < 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'center center',
          }}
          className="w-full transition-transform duration-200"
        >
          {children}
        </div>
      </div>
    </section>
  );
};

const HomeWrapper: React.FC<{ onScrollTop: () => void }> = ({ onScrollTop }) => {
  return (
    <div>
      <ViewportFitSection id="hero" isHero showDivider={false}>
        <Hero />
      </ViewportFitSection>

      <ViewportFitSection id="about">
        <About />
      </ViewportFitSection>

      <ViewportFitSection id="education" className="bg-white/[0.01]">
        <Education />
      </ViewportFitSection>

      <ViewportFitSection id="skills">
        <Skills />
      </ViewportFitSection>

      <ViewportFitSection id="experience" className="bg-white/[0.01]">
        <Experience />
      </ViewportFitSection>

      <ViewportFitSection id="projects">
        <Projects />
      </ViewportFitSection>

      <ViewportFitSection id="certificates" className="bg-white/[0.01]">
        <Certificates />
      </ViewportFitSection>

      <ViewportFitSection id="contact">
        <div className="space-y-4 w-full">
          <Contact />

          {/* Integrated Single-Line Cyber Footer inside Final Screen */}
          <div className="max-w-7xl mx-auto pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono-code text-gray-400">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Terminal size={14} />
              </div>
              <span>
                © 2026 <strong className="text-white">Mahamudul Hasan Alvy</strong> · Full-Stack Engineer & Motion Designer
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1.5 text-emerald-400 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ALL SYSTEMS OPERATIONAL</span>
              </div>

              <button
                onClick={onScrollTop}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400 text-[10px] font-mono-code font-bold text-gray-300 hover:text-cyan-300 transition-all flex items-center gap-1.5 group"
                data-cursor="TOP"
              >
                <span>RETURN TO APEX</span>
                <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </ViewportFitSection>
    </div>
  );
};

export default App;