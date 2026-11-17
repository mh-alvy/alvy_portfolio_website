import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';
import SectionTitle from './SectionTitle';
import { GraduationCap, Award, BookOpen, Star, Calendar } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle 
        title="ACADEMIC FOUNDATION" 
        subtitle="Formal Computer Science & Science Curriculum" 
        badge="CUET UNDERGRADUATE"
      />

      <div className="grid gap-8 mt-12">
        {EDUCATION.map((edu, i) => (
          <motion.div
            key={edu.school}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 cyber-corner hover:border-cyan-500/40 transition-all duration-300 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-5">
              {/* Header with School and Period */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight">
                      {edu.school}
                    </h3>
                    <p className="text-sm font-semibold text-cyan-300 font-mono-code">
                      {edu.degree}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-gray-400 bg-black/50 px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-center">
                  {edu.period}
                </span>
              </div>

              {/* School Description */}
              {edu.description && (
                <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
                  {edu.description}
                </p>
              )}

              {/* Grade and Activities Row */}
              {(edu.grade || edu.activities) && (
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code">
                  {edu.grade && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 font-bold">
                      <Star size={13} className="fill-yellow-400 text-yellow-400" />
                      <span>GRADE: {edu.grade}</span>
                    </div>
                  )}

                  {edu.activities && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Award size={14} className="text-purple-400 shrink-0" />
                      <span className="leading-snug">
                        <strong className="text-gray-300 uppercase mr-1">LEADERSHIP:</strong>
                        {edu.activities}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Skills Tags */}
              {edu.skills && (
                <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/5">
                  <span className="text-[10px] font-mono-code text-gray-500 uppercase tracking-widest mr-2">
                    FOCUS AREAS:
                  </span>
                  {edu.skills.map((skill, sIdx) => (
                    <React.Fragment key={skill}>
                      <span className="text-[10px] font-mono-code text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {skill}
                      </span>
                      {sIdx < edu.skills.length - 1 && <span className="text-gray-600">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;