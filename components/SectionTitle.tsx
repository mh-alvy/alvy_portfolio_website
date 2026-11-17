import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
  badge?: string;
}

const SectionTitle: React.FC<Props> = ({ title, subtitle, badge }) => {
  return (
    <div className="mb-10 md:mb-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-3"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-cyan-400 rotate-45 shadow-[0_0_8px_#00f2ff]"></span>
          <span className="w-8 h-px bg-gradient-to-r from-cyan-400 to-transparent"></span>
        </div>
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-cyan-400 font-mono-code">
          {title}
        </span>
        {badge && (
          <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
            {badge}
          </span>
        )}
      </motion.div>

      {subtitle && (
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading leading-tight max-w-4xl"
        >
          {subtitle}
        </motion.h2>
      )}
    </div>
  );
};

export default SectionTitle;
