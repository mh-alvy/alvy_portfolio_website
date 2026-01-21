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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group relative glass p-8 md:p-10 rounded-3xl border-l-4 transition-all duration-500 hover:bg-white/[0.04] ${
              edu.color === 'cyan' ? 'border-cyan-500 shadow-cyan-500/10' : 
              edu.color === 'purple' ? 'border-purple-500 shadow-purple-500/10' : 
              'border-green-500 shadow-green-500/10'
            }`}
          >
            <div className="flex flex-col gap-4">
              {/* Header with School and Period */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-2xl font-black text-white font-heading tracking-tight leading-tight">
                  {edu.school}
                </h3>
                <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 whitespace-nowrap self-start md:self-center">
                  {edu.period}
                </span>
              </div>

              {/* Degree Title */}
              <p className={`text-lg font-bold leading-tight ${
                edu.color === 'cyan' ? 'text-cyan-400' : 
                edu.color === 'purple' ? 'text-purple-400' : 
                'text-green-400'
              }`}>
                {edu.degree}
              </p>

              {/* School Description */}
              {edu.description && (
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
                  {edu.description}
                </p>
              )}

              {/* Grade and Activities */}
              {(edu.grade || edu.activities) && (
                <div className="space-y-3 pt-1">
                  {edu.grade && (
                    <div className="flex items-center gap-2">
                      <Star size={14} className="text-yellow-500 fill-yellow-500/20" />
                      <span className="text-xs font-bold text-gray-300 tracking-wide">Grade: <span className="text-white ml-1">{edu.grade}</span></span>
                    </div>
                  )}
                  {edu.activities && (
                    <div className="flex items-start gap-2 max-w-2xl">
                      <Award size={14} className={`mt-0.5 shrink-0 ${
                        edu.color === 'cyan' ? 'text-cyan-400' : 
                        edu.color === 'purple' ? 'text-purple-400' : 
                        'text-green-400'
                      }`} />
                      <span className="text-xs font-medium text-gray-400 leading-relaxed">
                        <span className="text-gray-300 font-bold mr-1.5 uppercase tracking-tighter">Activities and societies:</span> {edu.activities}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Skills Tags */}
              {edu.skills && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mr-1">Skills:</span>
                  {edu.skills.map((skill, sIdx) => (
                    <React.Fragment key={skill}>
                      <span className="text-[10px] font-bold text-gray-300">{skill}</span>
                      {sIdx < edu.skills.length - 1 && <span className="text-gray-600 font-bold">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* Subtle background decoration icon (keeps the theme without being a 'logo') */}
            <div className={`absolute -right-4 -bottom-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-1000 ${
              edu.color === 'cyan' ? 'text-cyan-500' : 
              edu.color === 'purple' ? 'text-purple-500' : 
              'text-green-500'
            }`}>
              {i === 0 ? <GraduationCap size={160} strokeWidth={0.5} /> : <BookOpen size={160} strokeWidth={0.5} />}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;