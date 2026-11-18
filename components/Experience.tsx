import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import SectionTitle from './SectionTitle';
import { MapPin, ExternalLink, Sparkles, Briefcase, Calendar } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const Experience: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <SectionTitle 
        title="EXPERIENCE TIMELINE" 
        subtitle="Professional Tenures & Leadership Deployments" 
        badge="PRODUCTION TRACK RECORD"
      />

      <div className="grid md:grid-cols-2 gap-4 lg:gap-5 mt-4">
        {EXPERIENCES.map((exp, i) => (
          <div
            key={exp.role + exp.company}
            className="glass-panel p-5 rounded-3xl border border-white/10 cyber-corner hover:border-cyan-500/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex flex-col gap-1.5 pb-3 border-b border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-[9px] font-mono-code font-black text-cyan-300">
                      0{i + 1}
                    </span>
                    <span className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1">
                      <Briefcase size={11} />
                      {exp.period}
                    </span>
                  </div>
                  {exp.location && (
                    <span className="text-[10px] font-mono-code text-gray-400 flex items-center gap-1">
                      <MapPin size={10} className="text-purple-400" />
                      {exp.location}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between gap-2 pt-0.5">
                  <h3 className="text-base sm:text-lg font-black text-white font-heading tracking-tight group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h3>
                  <h4 className="text-xs font-bold text-purple-300 font-mono-code shrink-0">
                    {exp.company}
                  </h4>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="my-3 space-y-1.5">
                {exp.description.map((point, j) => (
                  <li key={j} className="text-gray-300 text-xs leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_6px_#00f2ff]"></span>
                    <span className="line-clamp-2">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer: Skills Tags + External Link */}
            <div className="pt-2.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
              {exp.skills ? (
                <div className="flex flex-wrap gap-1">
                  {exp.skills.slice(0, 5).map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-mono-code text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : <div />}

              {exp.link && (
                <a
                  href={exp.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono-code font-bold text-cyan-400 hover:text-white transition-colors shrink-0"
                  data-cursor="PROFILE"
                >
                  <ExternalLink size={11} />
                  <span>{exp.link.text} ↗</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;