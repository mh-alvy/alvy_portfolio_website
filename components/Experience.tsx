import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import SectionTitle from './SectionTitle';
import { MapPin, ExternalLink, Sparkles } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="EXPERIENCE" subtitle="A Proven Track Record" />

      <div className="relative mt-20">
        {/* Central Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent transform -translate-x-1/2 hidden md:block opacity-30"></div>

        <div className="space-y-12">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-black border-2 rounded-full z-10 transform -translate-x-1/2 translate-y-3 hidden md:block ${
                exp.color === 'cyan' ? 'border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 
                exp.color === 'purple' ? 'border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 
                exp.color === 'red' ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                'border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
              }`}></div>

              <div className="w-full md:w-1/2">
                <div className={`group/exp p-8 glass rounded-3xl border-l-4 transition-all duration-500 hover:bg-white/[0.04] ${
                  exp.color === 'cyan' ? 'border-cyan-500 shadow-cyan-500/10' : 
                  exp.color === 'purple' ? 'border-purple-500 shadow-purple-500/10' : 
                  exp.color === 'red' ? 'border-red-500 shadow-red-500/10' :
                  'border-green-500 shadow-green-500/10'
                }`}>
                  <div className="space-y-4 mb-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h3 className="text-xl font-black text-white tracking-tight leading-tight uppercase font-heading">
                          {exp.role}
                        </h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 whitespace-nowrap self-start md:self-center">
                          {exp.period}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h4 className={`text-base font-bold ${
                          exp.color === 'cyan' ? 'text-cyan-400' : 
                          exp.color === 'purple' ? 'text-purple-400' : 
                          exp.color === 'red' ? 'text-red-400' :
                          'text-green-400'
                        }`}>
                          {exp.company}
                        </h4>
                      </div>

                      {exp.location && (
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium uppercase tracking-widest mt-1">
                          <MapPin size={10} className="opacity-50" />
                          {exp.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 pl-1">
                    {exp.description.map((point, j) => (
                      <li key={j} className="text-gray-400 flex items-start gap-4 text-sm leading-relaxed font-light">
                        <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          exp.color === 'cyan' ? 'bg-cyan-500' : 
                          exp.color === 'purple' ? 'bg-purple-500' : 
                          exp.color === 'red' ? 'bg-red-500' :
                          'bg-green-500'
                        }`}></span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Skills Pills */}
                  {exp.skills && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="text-[10px] font-bold text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                          <Sparkles size={10} className="opacity-40" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Link Button */}
                  {exp.link && (
                    <div className="pt-6 border-t border-white/5">
                      <a 
                        href={exp.link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-3 rounded-2xl border border-white/10 hover:border-white/20"
                      >
                        <ExternalLink size={14} />
                        {exp.link.text}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;