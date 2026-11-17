import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { sounds } from '../utils/soundEffects';

interface ClickPulse {
  id: number;
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [pulses, setPulses] = useState<ClickPulse[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Responsive dual-stage springs: tight inner HUD & trailing outer telemetry ring
  const fastSpring = { damping: 26, stiffness: 550, mass: 0.12 };
  const slowSpring = { damping: 22, stiffness: 260, mass: 0.25 };

  const reticleX = useSpring(mouseX, fastSpring);
  const reticleY = useSpring(mouseY, fastSpring);

  const trailX = useSpring(mouseX, slowSpring);
  const trailY = useSpring(mouseY, slowSpring);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none) and (pointer: coarse)').matches
    ) {
      setIsTouchDevice(true);
      return;
    }

    let frameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      if (!frameId) {
        frameId = requestAnimationFrame(() => {
          setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
          frameId = null;
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      sounds.playClick();
      const newPulse = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setPulses((prev) => [...prev.slice(-3), newPulse]);
      setTimeout(() => {
        setPulses((prev) => prev.filter((p) => p.id !== newPulse.id));
      }, 650);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== 'function') return;

      const clickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button' ||
        target.hasAttribute('data-cursor') ||
        target.closest('[data-cursor]');

      if (clickable) {
        setIsHovering(true);
        const dataAction =
          target.getAttribute('data-cursor') ||
          target.closest('[data-cursor]')?.getAttribute('data-cursor');
        if (dataAction) {
          setHoverText(dataAction);
        } else if (target.tagName === 'A' || target.closest('a')) {
          setHoverText('LINK // EXEC');
        } else if (target.tagName === 'BUTTON' || target.closest('button')) {
          setHoverText('CMD // RUN');
        } else {
          setHoverText('TARGET // LOCK');
        }
      } else {
        setIsHovering(false);
        setHoverText(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {/* Click Energy Shockwave Ripples */}
      <AnimatePresence>
        {pulses.map((pulse) => (
          <motion.div
            key={pulse.id}
            initial={{ scale: 0.4, opacity: 0.9 }}
            animate={{ scale: 2.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ left: pulse.x, top: pulse.y }}
            className="fixed -ml-6 -mt-6 w-12 h-12 rounded-full border border-cyan-400 shadow-[0_0_20px_#00f2ff]"
          />
        ))}
      </AnimatePresence>

      {/* Outer Trailing Hex/Orbital Radar Ring */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
        }}
        animate={{
          rotate: isHovering ? -180 : 360,
          scale: isClicking ? 0.8 : isHovering ? 1.35 : 1,
          opacity: isVisible ? (isHovering ? 0.9 : 0.45) : 0,
        }}
        transition={{
          rotate: { duration: isHovering ? 4 : 12, repeat: Infinity, ease: 'linear' },
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 },
        }}
        className="fixed top-0 left-0 -ml-7 -mt-7 w-14 h-14 flex items-center justify-center"
      >
        <svg viewBox="0 0 60 60" className="w-full h-full overflow-visible">
          {/* Segmented Tech Arc */}
          <circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke={isHovering ? '#bc13fe' : '#00f2ff'}
            strokeWidth="1"
            strokeDasharray="14 8 4 8"
            className=" opacity-70"
          />
          {/* Opposite Inner Arc */}
          <circle
            cx="30"
            cy="30"
            r="20"
            fill="none"
            stroke={isHovering ? '#00f2ff' : '#bc13fe'}
            strokeWidth="0.8"
            strokeDasharray="6 12"
            className="opacity-50"
          />
        </svg>
      </motion.div>

      {/* Primary Tactical Target-Lock Brackets */}
      <motion.div
        style={{
          x: reticleX,
          y: reticleY,
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovering ? 1.25 : 1,
          rotate: isHovering ? 45 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="fixed top-0 left-0 -ml-5 -mt-5 w-10 h-10 flex items-center justify-center"
      >
        {/* Top-Left Bracket */}
        <div
          className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 transition-colors duration-200 ${
            isHovering
              ? 'border-cyan-300 shadow-[-2px_-2px_8px_rgba(0,242,255,0.6)]'
              : 'border-cyan-400/80'
          }`}
        />
        {/* Top-Right Bracket */}
        <div
          className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 transition-colors duration-200 ${
            isHovering
              ? 'border-purple-400 shadow-[2px_-2px_8px_rgba(188,19,254,0.6)]'
              : 'border-cyan-400/80'
          }`}
        />
        {/* Bottom-Left Bracket */}
        <div
          className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 transition-colors duration-200 ${
            isHovering
              ? 'border-purple-400 shadow-[-2px_2px_8px_rgba(188,19,254,0.6)]'
              : 'border-cyan-400/80'
          }`}
        />
        {/* Bottom-Right Bracket */}
        <div
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 transition-colors duration-200 ${
            isHovering
              ? 'border-cyan-300 shadow-[2px_2px_8px_rgba(0,242,255,0.6)]'
              : 'border-cyan-400/80'
          }`}
        />

        {/* Center Micro Crosshair */}
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${
            isClicking
              ? 'bg-purple-400 scale-150 shadow-[0_0_12px_#bc13fe]'
              : isHovering
              ? 'bg-cyan-300 scale-125 shadow-[0_0_10px_#00f2ff]'
              : 'bg-cyan-400/70'
          }`}
        />
      </motion.div>

      {/* Live Cyber Telemetry Readout & Action Tag */}
      <motion.div
        style={{
          x: reticleX,
          y: reticleY,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        className="fixed top-0 left-0 ml-6 mt-4 flex flex-col items-start gap-0.5 pointer-events-none"
      >
        {/* Coordinates Telemetry */}
        <div className="flex items-center gap-1 text-[8px] font-mono-code tracking-wider text-cyan-400/75 bg-[#03030c]/80 px-1.5 py-0.5 rounded border border-cyan-500/20 backdrop-blur-sm">
          <span>X:{String(coords.x).padStart(4, '0')}</span>
          <span className="text-purple-400">/</span>
          <span>Y:{String(coords.y).padStart(4, '0')}</span>
        </div>

        {/* Active Target Lock Action Label */}
        <AnimatePresence>
          {hoverText && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.12 }}
              className="text-[9px] font-mono-code font-extrabold tracking-widest text-black bg-gradient-to-r from-cyan-400 to-purple-400 px-2 py-0.5 rounded shadow-[0_0_12px_rgba(0,242,255,0.5)] whitespace-nowrap"
            >
              [{hoverText}]
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CustomCursor;