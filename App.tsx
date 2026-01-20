import React, { useState, useEffect } from 'react';
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

const App: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#030014] flex flex-col items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-16 h-16 border-4 border-cyan-500 border-t-purple-500 rounded-full mb-4 shadow-[0_0_20px_rgba(0,242,255,0.6)]"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-cyan-400 font-heading tracking-widest text-xl animate-pulse"
        >
          INITIALIZING_SYSTEM...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen cursor-none">
      <CustomCursor />
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10 pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomeWrapper />} />
          </Routes>
        </AnimatePresence>
      </main>
      <footer className="relative z-10 py-12 border-t border-white/5 bg-black/40 text-center">
        <p className="text-gray-500 font-light">
          © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">Mahamudul Hasan Alvy</span>. Designed with Neon & Logic.
        </p>
      </footer>
    </div>
  );
};

const HomeWrapper: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section id="hero"><Hero /></section>
      <section id="about" className="py-24 px-4"><About /></section>
      <section id="education" className="py-24 px-4 bg-black/20"><Education /></section>
      <section id="skills" className="py-24 px-4"><Skills /></section>
      <section id="experience" className="py-24 px-4 bg-black/20"><Experience /></section>
      <section id="projects" className="py-24 px-4"><Projects /></section>
      <section id="certificates" className="py-24 px-4 bg-black/20"><Certificates /></section>
      <section id="contact" className="py-24 px-4"><Contact /></section>
    </motion.div>
  );
};

export default App;