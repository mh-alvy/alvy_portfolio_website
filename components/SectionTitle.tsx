
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-4"
      >
        <span className="w-12 h-px bg-gradient-to-r from-cyan-500 to-transparent"></span>
        <span className="text-xs font-black tracking-[0.4em] uppercase text-cyan-500 font-mono-code">{title}</span>
      </motion.div>
      {subtitle && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white tracking-tight"
        >
          {subtitle}
        </motion.h2>
      )}
    </div>
  );
};

export default SectionTitle;
