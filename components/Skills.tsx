import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import SectionTitle from './SectionTitle';
import { Cpu, Terminal, Search, Flame, Code, Video, Palette, BookOpen } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const Skills: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = Array.from(new Set(SKILLS.map((s) => s.category)));

  const getCategoryIcon = (category: string) => {
    if (category.includes('Development')) return <Code size={16} className="text-cyan-400" />;
    if (category.includes('Creative')) return <Video size={16} className="text-purple-400" />;
    if (category.includes('Design')) return <Palette size={16} className="text-pink-400" />;
    return <BookOpen size={16} className="text-emerald-400" />;
  };

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || skill.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle 
        title="TECHNICAL ARSENAL" 
        subtitle="Mastery Across Engineering, Motion & Visual Systems" 
        badge={`${SKILLS.length} CAPABILITIES`}
      />

      {/* Control Strip: Search & Category Filter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 p-4 rounded-2xl glass-panel border border-white/10 cyber-corner">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveCategory('ALL');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code font-bold uppercase tracking-wider transition-all ${
              activeCategory === 'ALL'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            ALL [{SKILLS.length}]
          </button>
          {categories.map((cat) => {
            const count = SKILLS.filter((s) => s.category === cat).length;
            const isCatActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  isCatActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
                }`}
              >
                {getCategoryIcon(cat)}
                <span className="truncate max-w-[140px] sm:max-w-none">{cat.replace('Creative (Video Editing & Motion Graphics)', 'Motion & VFX')}</span>
                <span className="text-[10px] text-gray-500">[{count}]</span>
              </button>
            );
          })}
        </div>

        {/* Live Filter Input */}
        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search capability..."
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs font-mono-code text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs font-mono-code"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid of Grouped Matrix Panels */}
      <div className="grid lg:grid-cols-2 gap-8">
        {categories
          .filter((cat) => activeCategory === 'ALL' || activeCategory === cat)
          .map((cat, idx) => {
            const categorySkills = filteredSkills.filter((s) => s.category === cat);
            if (categorySkills.length === 0) return null;

            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 cyber-corner space-y-6"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      {getCategoryIcon(cat)}
                    </div>
                    <div>
                      <span className="text-[9px] font-mono-code uppercase tracking-widest text-gray-400 block">
                        CLUSTER // 0{idx + 1}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                        {cat}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-mono-code text-cyan-400 font-bold">
                    {categorySkills.length} MODULES
                  </span>
                </div>

                {/* Skill Bars List */}
                <div className="space-y-5">
                  {categorySkills.map((skill, i) => (
                    <div key={skill.name} className="space-y-1.5 group">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-gray-200 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5 font-mono-code">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60 group-hover:opacity-100"></span>
                          {skill.name}
                        </span>
                        <span className="font-mono-code font-bold text-gray-400 tabular-nums">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Glowing Cyber Meter */}
                      <div className="h-2 bg-black/60 rounded-full overflow-hidden border border-white/5 p-[1px]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: i * 0.05, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${
                            isEven
                              ? 'from-cyan-600 to-cyan-400 shadow-[0_0_12px_rgba(0,242,255,0.6)]'
                              : 'from-purple-600 via-pink-500 to-cyan-400 shadow-[0_0_12px_rgba(188,19,254,0.6)]'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default Skills;
