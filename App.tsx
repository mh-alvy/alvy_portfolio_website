import React, { useState, useEffect, useRef, useCallback } from 'react';
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

interface SectionMeta {
  id: string;
  code: string;
  label: string;
}

const SECTIONS: SectionMeta[] = [
  { id: 'hero', code: '01', label: 'COMMAND' },
  { id: 'about', code: '02', label: 'DOSSIER' },
  { id: 'education', code: '03', label: 'ACADEMICS' },
  { id: 'skills', code: '04', label: 'ARSENAL' },
  { id: 'experience', code: '05', label: 'TIMELINE' },
  { id: 'projects', code: '06', label: 'ARCHIVES' },
  { id: 'certificates', code: '07', label: 'CREDENTIALS' },
  { id: 'contact', code: '08', label: 'UPLINK' },
];

interface TransitionState {
  code: string;
  label: string;
  direction: 'down' | 'up';
}

const App: React.FC = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('hero');
  const [transitionState, setTransitionState] = useState<TransitionState | null>(null);

  const isGlidingRef = useRef(false);
  const activeIndexRef = useRef(0);

  // Unified section glide controller:
  // Glides completely to the target section with a futuristic cyber laser wipe & telemetry HUD
  const triggerSectionGlide = useCallback((targetIndex: number, direction?: 'down' | 'up') => {
    if (targetIndex < 0 || targetIndex >= SECTIONS.length) return;
    if (isGlidingRef.current) return;

    const targetSec = SECTIONS[targetIndex];
    const el = document.getElementById(targetSec.id);
    if (!el) return;

    const currentIdx = activeIndexRef.current;
    if (targetIndex === currentIdx && isGlidingRef.current) return;

    const dir = direction || (targetIndex > currentIdx ? 'down' : 'up');

    isGlidingRef.current = true;
    activeIndexRef.current = targetIndex;
    setActiveSection(targetSec.id);

    setTransitionState({
      code: targetSec.code,
      label: targetSec.label,
      direction: dir,
    });

    sounds.playScan();

    window.scrollTo({
      top: el.offsetTop,
      behavior: 'smooth',
    });

    setTimeout(() => {
      setTransitionState(null);
    }, 650);

    setTimeout(() => {
      isGlidingRef.current = false;
    }, 750);
  }, []);

  // Universal gesture listeners: every single scroll/swipe/key initiates full section transition
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Allow scrolling inside dialogs or sub-containers marked with .allow-inner-scroll
      if ((e.target as HTMLElement)?.closest?.('.allow-inner-scroll')) {
        return;
      }

      e.preventDefault();

      if (isGlidingRef.current) return;
      if (Math.abs(e.deltaY) < 18) return;

      const currentIdx = activeIndexRef.current;
      if (e.deltaY > 0 && currentIdx < SECTIONS.length - 1) {
        triggerSectionGlide(currentIdx + 1, 'down');
      } else if (e.deltaY < 0 && currentIdx > 0) {
        triggerSectionGlide(currentIdx - 1, 'up');
      }
    };

    let touchStartY = 0;
    let touchStartX = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if ((e.target as HTMLElement)?.closest?.('.allow-inner-scroll')) {
        return;
      }
      if (isGlidingRef.current && e.cancelable) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length !== 1) return;
      if ((e.target as HTMLElement)?.closest?.('.allow-inner-scroll')) {
        return;
      }

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY - touchEndY;
      const deltaX = touchStartX - touchEndX;
      const duration = Date.now() - touchStartTime;

      // Vertical swipe detection (>35px displacement, primarily vertical, within 900ms)
      if (Math.abs(deltaY) > 35 && Math.abs(deltaY) > Math.abs(deltaX) && duration < 900) {
        if (isGlidingRef.current) return;
        const currentIdx = activeIndexRef.current;
        if (deltaY > 0 && currentIdx < SECTIONS.length - 1) {
          triggerSectionGlide(currentIdx + 1, 'down');
        } else if (deltaY < 0 && currentIdx > 0) {
          triggerSectionGlide(currentIdx - 1, 'up');
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (isGlidingRef.current) return;
      const currentIdx = activeIndexRef.current;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        if (currentIdx < SECTIONS.length - 1) {
          e.preventDefault();
          triggerSectionGlide(currentIdx + 1, 'down');
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIdx > 0) {
          e.preventDefault();
          triggerSectionGlide(currentIdx - 1, 'up');
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        triggerSectionGlide(0, 'up');
      } else if (e.key === 'End') {
        e.preventDefault();
        triggerSectionGlide(SECTIONS.length - 1, 'down');
      }
    };

    const handleScroll = () => {
      if (isGlidingRef.current) return;
      const scrollMid = window.scrollY + window.innerHeight * 0.4;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollMid) {
          if (activeIndexRef.current !== i) {
            activeIndexRef.current = i;
            setActiveSection(SECTIONS[i].id);
          }
          break;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggerSectionGlide]);

  const handleNavNavigate = (targetId: string) => {
    const idx = SECTIONS.findIndex((s) => s.id === targetId);
    if (idx !== -1) {
      triggerSectionGlide(idx);
    }
  };

  const handleScrollTop = () => {
    triggerSectionGlide(0, 'up');
  };

  return (
    <div className="relative min-h-screen bg-[#03030c] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      <CustomCursor />
      <BackgroundEffects />
      <Navbar activeSection={activeSection} onNavigate={handleNavNavigate} />

      {/* Cyber Laser Warp Beam and HUD Telemetry Pill on Every Section Transition */}
      <AnimatePresence>
        {transitionState && (
          <React.Fragment key="section-transition-system">
            {/* Directional Cyber Laser Wipe Beam */}
            <motion.div
              key={`warp-beam-${transitionState.direction}`}
              initial={{
                top: transitionState.direction === 'down' ? '-10%' : '110%',
                opacity: 0,
              }}
              animate={{
                top: transitionState.direction === 'down' ? '110%' : '-10%',
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 right-0 z-[8000] pointer-events-none"
            >
              <div
                className={`w-full h-[3px] bg-gradient-to-r ${
                  transitionState.direction === 'down'
                    ? 'from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#00f2ff,0_0_40px_#bc13fe,0_0_80px_#00f2ff]'
                    : 'from-transparent via-purple-400 to-transparent shadow-[0_0_20px_#bc13fe,0_0_40px_#00f2ff,0_0_80px_#bc13fe]'
                }`}
              />
              <div
                className={`w-full h-32 -mt-16 bg-gradient-to-b ${
                  transitionState.direction === 'down'
                    ? 'from-transparent via-cyan-500/20 to-transparent'
                    : 'from-transparent via-purple-500/20 to-transparent'
                } blur-md`}
              />
            </motion.div>

            {/* Instantaneous Quantum Scanline Flash */}
            <motion.div
              key="warp-flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.22, 0] }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-[7999] pointer-events-none bg-gradient-to-b from-cyan-500/15 via-purple-500/10 to-cyan-500/15"
            />

            {/* HUD Telemetry Sector Shift Badge */}
            <motion.div
              key="hud-badge"
              initial={{
                opacity: 0,
                y: transitionState.direction === 'down' ? 24 : -24,
                scale: 0.9,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: transitionState.direction === 'down' ? -16 : 16,
                scale: 0.95,
              }}
              transition={{ duration: 0.25 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[8500] pointer-events-none px-5 py-2 rounded-2xl bg-[#030312]/95 border border-cyan-400/60 shadow-[0_0_35px_rgba(0,242,255,0.45)] backdrop-blur-xl flex items-center gap-3"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-mono-code font-extrabold tracking-[0.25em] text-cyan-300 uppercase">
                  SECTOR SHIFT // {transitionState.code}
                </span>
                <span className="text-xs sm:text-sm font-heading font-black tracking-widest text-white uppercase">
                  {transitionState.label}
                </span>
              </div>
              <div className="w-2 h-2 rotate-45 bg-purple-500 shadow-[0_0_10px_#bc13fe]" />
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>

      {/* Right-Side Floating Section Pager Rail */}
      <div className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3">
        {SECTIONS.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => triggerSectionGlide(idx)}
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
 * ViewportFitSection guarantees that on ANY screen size (phones, tablets, laptops, ultrawides),
 * each section fits 100% inside the visible screen height (100dvh) without its bottom
 * or sides ever getting cut off or overflowing outside the screen.
 */
const ViewportFitSection: React.FC<ViewportFitSectionProps> = ({
  id,
  className = '',
  children,
  showDivider = true,
  isHero = false,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const calculateFit = useCallback(() => {
    const content = contentRef.current;
    if (!content) return;

    // Reset transform to measure unscaled natural dimensions
    content.style.transform = 'none';

    const naturalHeight = content.scrollHeight;
    const naturalWidth = content.scrollWidth;

    const vh = window.innerHeight;
    const vw = window.innerWidth;

    // Clearance for fixed navbar and top/bottom padding
    const navHeight = isHero ? (vw < 768 ? 58 : 72) : (vw < 768 ? 64 : 76);
    const verticalSafetyPadding = vw < 768 ? 16 : 24;
    const horizontalSafetyPadding = vw < 768 ? 16 : 36;

    const availableHeight = Math.max(260, vh - navHeight - verticalSafetyPadding);
    const availableWidth = Math.max(280, vw - horizontalSafetyPadding);

    const scaleY = naturalHeight > availableHeight ? availableHeight / naturalHeight : 1;
    const scaleX = naturalWidth > availableWidth ? availableWidth / naturalWidth : 1;

    // Minimum scale guarantees neither vertical nor horizontal overflow occurs
    let fitScale = Math.min(1, scaleY, scaleX);

    // Limit floor to maintain high readability
    fitScale = Math.max(0.44, Number(fitScale.toFixed(3)));

    setScale(fitScale);
    content.style.transform = fitScale < 1 ? `scale(${fitScale})` : '';
  }, [isHero]);

  useEffect(() => {
    calculateFit();

    const resizeObserver = new ResizeObserver(() => {
      calculateFit();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }
    window.addEventListener('resize', calculateFit);
    window.addEventListener('orientationchange', calculateFit);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateFit);
      window.removeEventListener('orientationchange', calculateFit);
    };
  }, [calculateFit]);

  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative w-full h-dvh max-h-dvh min-h-dvh overflow-hidden flex flex-col items-center justify-center snap-start snap-always ${
        isHero ? 'pt-14 sm:pt-20 pb-2 sm:pb-4' : 'pt-16 sm:pt-20 pb-2 sm:pb-4'
      } px-3 sm:px-6 ${className}`}
    >
      {showDivider && (
        <div className="max-w-7xl w-full mx-auto px-6 absolute top-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent relative">
            <span className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-cyan-400/80 shadow-[0_0_10px_#00f2ff]" />
          </div>
        </div>
      )}

      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <div
          ref={contentRef}
          style={{
            transform: scale < 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'center center',
          }}
          className="w-full max-w-7xl mx-auto flex flex-col justify-center transition-transform duration-200 will-change-transform"
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
