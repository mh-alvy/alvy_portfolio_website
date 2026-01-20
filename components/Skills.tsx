
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import SectionTitle from './SectionTitle';

const Skills: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="EXPERTISE" subtitle="Forged in Code and Motion" />

      <div className="grid lg:grid-cols-2 gap-16">
        {categories.map((cat, idx) => (
          <div key={cat} className="space-y-8">
            <motion.h4
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xl font-bold text-cyan-400 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-cyan-500"></span>
              {cat}
            </motion.h4>
            
            <div className="space-y-6">
              {SKILLS.filter(s => s.category === cat).map((skill, i) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-xs text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full bg-gradient-to-r ${idx % 2 === 0 ? 'from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'from-purple-600 to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
