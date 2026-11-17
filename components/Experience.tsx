import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import SectionTitle from './SectionTitle';
import { MapPin, ExternalLink, Sparkles, Briefcase, Calendar } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const Experience: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle 
        title="EXPERIENCE TIMELINE" 
        subtitle="Professional Tenures & Leadership Deployments" 
        badge="PRODUCTION TRACK RECORD"
      />

      <div className="relative mt-16">
        {/* Central Circuit Beam */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent -translate-x-1/2 opacity-30"></div>

        <div className="space-y-12">
          {EXPERIENCES.map((exp, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Node Beacon along the Circuit */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-8 w-6 h-6 rounded-full bg-black border-2 border-cyan-400 shadow-[0_0_15px_#00f2ff] flex items-center justify-center z-20">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                </div>

                {/* Card Container */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 cyber-corner hover:border-cyan-500/40 transition-all duration-300 shadow-xl group">
                    {/* Header */}
                    <div className="flex flex-col gap-2 pb-4 border-b border-white/10">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                          <Briefcase size={12} />
                          {exp.period}
                        </span>
                        {exp.location && (
                          <span className="text-[10px] font-mono-code text-gray-400 flex items-center gap-1">
                            <MapPin size={10} className="text-purple-400" />
                            {exp.location}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight">
                        {exp.role}
                      </h3>

                      <h4 className="text-sm font-bold text-purple-300 font-mono-code">
                        {exp.company}
                      </h4>
                    </div>

                    {/* Bullet Points */}
                    <ul className="my-5 space-y-3">
                      {exp.description.map((point, j) => (
                        <li key={j} className="text-gray-300 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_6px_#00f2ff]"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skills Tags */}
                    {exp.skills && (
                      <div className="pt-4 border-t border-white/5 space-y-2">
                        <span className="text-[9px] font-mono-code text-gray-500 uppercase tracking-widest block">
                          SKILLS DEPLOYED
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] font-mono-code text-gray-300 bg-white/5 px-2.5 py-0.5 rounded border border-white/5"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* External Link Action */}
                    {exp.link && (
                      <div className="pt-4 mt-2">
                        <a
                          href={exp.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sounds.playClick()}
                          className="inline-flex items-center gap-2 text-xs font-mono-code font-bold text-cyan-400 hover:text-white transition-colors"
                          data-cursor="PROFILE"
                        >
                          <ExternalLink size={12} />
                          <span>{exp.link.text} ↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Blank other half for desktop zig-zag */}
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;