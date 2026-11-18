import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';
import SectionTitle from './SectionTitle';
import { GraduationCap, Award, BookOpen, Star, Calendar } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <SectionTitle 
        title="ACADEMIC FOUNDATION" 
        subtitle="Formal Computer Science & Science Curriculum" 
        badge="CUET UNDERGRADUATE"
      />

      <div className="grid lg:grid-cols-3 gap-5 mt-4">
        {EDUCATION.map((edu) => (
          <div
            key={edu.school}
            className="group relative glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 cyber-corner hover:border-cyan-500/40 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            <div className="flex flex-col gap-4">
              {/* Top Period Badge + Icon */}
              <div className="flex items-center justify-between gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <GraduationCap size={20} />
                </div>
                <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-gray-400 bg-black/50 px-2.5 py-1 rounded-xl border border-white/10">
                  {edu.period}
                </span>
              </div>

              {/* School & Degree */}
              <div className="pb-3 border-b border-white/10 space-y-1">
                <h3 className="text-base sm:text-lg font-black text-white font-heading tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">
                  {edu.school}
                </h3>
                <p className="text-xs font-semibold text-cyan-300 font-mono-code">
                  {edu.degree}
                </p>
              </div>

              {/* School Description */}
              {edu.description && (
                <p className="text-gray-300 text-xs leading-relaxed">
                  {edu.description}
                </p>
              )}

              {/* Grade and Activities */}
              {(edu.grade || edu.activities) && (
                <div className="space-y-2 text-xs font-mono-code">
                  {edu.grade && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 font-bold text-[11px]">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span>GRADE: {edu.grade}</span>
                    </div>
                  )}

                  {edu.activities && (
                    <div className="flex items-start gap-2 text-gray-400 text-[11px]">
                      <Award size={13} className="text-purple-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        <strong className="text-gray-300 uppercase mr-1">LEADERSHIP:</strong>
                        {edu.activities}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Skills Tags */}
            {edu.skills && (
              <div className="flex flex-wrap items-center gap-1.5 pt-3 mt-4 border-t border-white/5">
                {edu.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[9px] font-mono-code text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;