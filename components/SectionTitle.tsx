import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
  badge?: string;
}

const SectionTitle: React.FC<Props> = ({ title, subtitle, badge }) => {
  return (
    <div className="mb-2 sm:mb-3 md:mb-4">
      <div className="flex items-center gap-2 sm:gap-3 mb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-cyan-400 rotate-45 shadow-[0_0_8px_#00f2ff]"></span>
          <span className="w-6 sm:w-8 h-px bg-gradient-to-r from-cyan-400 to-transparent"></span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-cyan-400 font-mono-code">
          {title}
        </span>
        {badge && (
          <span className="text-[9px] sm:text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
            {badge}
          </span>
        )}
      </div>

      {subtitle && (
        <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-tight font-heading leading-tight max-w-4xl">
          {subtitle}
        </h2>
      )}
    </div>
  );
};

export default SectionTitle;
