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

        <div className="space-y-24">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Dot */}
              <div className={`absolute left-0 md:left-1/2 top-0 w-5 h-5 bg-black border-2 rounded-full z-10 transform -translate-x-1/2 translate-y-2 hidden md:block shadow-[0_0_15px_rgba(255,255,255,0.2)] ${
                exp.color === 'cyan' ? 'border-cyan-400 shadow-cyan-400/50' : 
                exp.color === 'purple' ? 'border-purple-400 shadow-purple-400/50' : 
                exp.color === 'red' ? 'border-red-500 shadow-red-500/50' :
                'border-green-400 shadow-green-400/50'
              }`}></div>

              <div className="w-full md:w-1/2 space-y-6">
                <div className={`group/exp p-8 glass rounded-3xl border-l-4 transition-all duration-500 hover:bg-white/[0.04] ${
                  exp.color === 'cyan' ? 'border-cyan-500 shadow-cyan-500/10' : 
                  exp.color === 'purple' ? 'border-purple-500 shadow-purple-500/10' : 
                  exp.color === 'red' ? 'border-red-500 shadow-red-500/10' :
                  'border-green-500 shadow-green-500/10'
                }`}>
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <h3 className="text-2xl font-black text-white tracking-tight leading-tight group-hover/exp:text-white transition-colors">
                        {exp.role}
                      </h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/5">
                        {exp.period}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <h4 className={`text-lg font-bold font-heading ${
                        exp.color === 'cyan' ? 'text-cyan-400' : 
                        exp.color === 'purple' ? 'text-purple-400' : 
                        exp.color === 'red' ? 'text-red-400' :
                        'text-green-400'
                      }`}>
                        {exp.company}
                      </h4>
                      {exp.location && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                          <MapPin size={14} className="opacity-50" />
                          {exp.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {exp.description.map((point, j) => (
                      <li key={j} className="text-gray-400 flex items-start gap-4 text-sm leading-relaxed font-light">
                        <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse ${
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
                    <div className="flex flex-wrap gap-2 mb-8">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="text-[10px] font-bold text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                          <Sparkles size={10} className="opacity-40" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Attachments / Link */}
                  {(exp.image || exp.link) && (
                    <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-6">
                      {exp.image && (
                        <div className="flex items-center gap-4 p-2 bg-black/40 rounded-2xl border border-white/5 group/img overflow-hidden">
                           <img 
                            src={exp.image} 
                            alt="Experience Detail" 
                            className="w-16 h-12 object-cover rounded-xl filter grayscale group-hover/img:grayscale-0 transition-all"
                           />
                           <div className="pr-4">
                              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Featured Media</p>
                              <p className="text-xs text-white font-bold">Experience Highlight</p>
                           </div>
                        </div>
                      )}
                      {exp.link && (
                        <a 
                          href={exp.link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-3 rounded-2xl border border-white/10 hover:border-white/20"
                        >
                          <ExternalLink size={14} />
                          {exp.link.text}
                        </a>
                      )}
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