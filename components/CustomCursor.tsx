import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for raw mouse position - these update instantly
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Super-tight spring configuration for high-performance trail
  const springConfig = { damping: 35, stiffness: 800, mass: 0.1 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Direct updates to motion values bypass React render cycle for position
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null; // Hide on touch devices
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Glow Trail - Tightly coupled spring */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ scale: { duration: 0.2 }, opacity: { duration: 0.2 } }}
        className="absolute w-12 h-12 rounded-full border border-cyan-500/40 bg-cyan-500/5 blur-[1px]"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 animate-pulse" />
      </motion.div>

      {/* Main Cursor Dot - Zero latency (no spring) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={{
          scale: isHovering ? 0.6 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1),0_0_30px_rgba(0,242,255,1)] mix-blend-screen"
      />

      {/* Decorative Rotating Ring - Tight spring with rotation */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={{
          rotate: 360,
          scale: isHovering ? 1.4 : 0.8,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 }
        }}
        className="absolute w-16 h-16 border-t border-l border-purple-500/50 rounded-full"
      />
    </div>
  );
};

export default CustomCursor;