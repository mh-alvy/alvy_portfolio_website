import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';
import SectionTitle from './SectionTitle';
import { GraduationCap, Award, BookOpen, Star } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="ACADEMIC_PATH" subtitle="Educational Foundation" />

      <div className="grid gap-8 mt-12">
        {EDUCATION.map((edu, i) => (
          <motion.div
            key={edu.school}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`group relative glass p-8 md:p-10 rounded-3xl border-l-4 transition-all duration-500 hover:bg-white/[0.04] ${
              edu.color === 'cyan' ? 'border-cyan-500 shadow-cyan-500/10' : 
              edu.color === 'purple' ? 'border-purple-500 shadow-purple-500/10' : 
              'border-green-500 shadow-green-500/10'
            }`}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className={`p-5 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform duration-500 ${
                edu.color === 'cyan' ? 'text-cyan-400' : 
                edu.color === 'purple' ? 'text-purple-400' : 
                'text-green-400'
              }`}>
                {i === 0 ? <GraduationCap size={32} /> : i === 1 ? <BookOpen size={32} /> : <Award size={32} />}
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 className="text-2xl font-black text-white font-heading uppercase tracking-tight">
                    {edu.school}
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>

                <p className={`text-lg font-bold ${
                  edu.color === 'cyan' ? 'text-cyan-400' : 
                  edu.color === 'purple' ? 'text-purple-400' : 
                  'text-green-400'
                }`}>
                  {edu.degree}
                </p>

                {edu.description && (
                  <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
                    {edu.description}
                  </p>
                )}

                {(edu.grade || edu.activities) && (
                  <div className="flex flex-wrap gap-6 pt-2">
                    {edu.grade && (
                      <div className="flex items-center gap-2">
                        <Star size={14} className="text-yellow-500 fill-yellow-500/20" />
                        <span className="text-xs font-bold text-gray-300">Grade: <span className="text-white">{edu.grade}</span></span>
                      </div>
                    )}
                    {edu.activities && (
                      <div className="flex items-start gap-2 max-w-xl">
                        <Award size={14} className="text-purple-400 mt-0.5" />
                        <span className="text-xs font-medium text-gray-400 leading-tight">
                          <span className="text-gray-300 font-bold mr-1">Activities:</span> {edu.activities}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {edu.skills && (
                  <div className="flex flex-wrap gap-2 pt-4">
                    {edu.skills.map(skill => (
                      <span key={skill} className="text-[10px] font-bold text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md uppercase tracking-tighter">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className={`absolute -right-4 -bottom-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-1000 ${
              edu.color === 'cyan' ? 'text-cyan-500' : 
              edu.color === 'purple' ? 'text-purple-500' : 
              'text-green-500'
            }`}>
              <GraduationCap size={160} strokeWidth={1} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;