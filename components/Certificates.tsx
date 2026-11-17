import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATES } from '../constants';
import SectionTitle from './SectionTitle';
import { Award, ShieldCheck, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const Certificates: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle 
        title="VERIFIED CREDENTIALS" 
        subtitle="Industry Certifications & Professional Accreditations" 
        badge="SECURITY VERIFIED"
      />

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {CERTIFICATES.map((cert, i) => (
          <motion.div
            key={cert.title + i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 cyber-corner hover:border-purple-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-5">
              {/* Top Certificate Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                    <Award size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-purple-400 block">
                      {cert.issuer}
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-white font-heading tracking-tight leading-snug group-hover:text-purple-300 transition-colors">
                      {cert.title}
                    </h4>
                  </div>
                </div>

                <span className="text-[10px] font-mono-code font-bold text-gray-400 bg-black/50 px-2.5 py-1 rounded-lg border border-white/10 whitespace-nowrap shrink-0">
                  {cert.date}
                </span>
              </div>

              {/* Credential ID Badge */}
              {cert.credentialId && (
                <div className="flex items-center gap-2 text-[11px] font-mono-code text-gray-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 w-fit">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>ID: <strong className="text-white">{cert.credentialId}</strong></span>
                </div>
              )}

              {/* Skills Covered */}
              {cert.skills && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono-code text-gray-500 uppercase tracking-widest block">
                    COMPETENCIES ASSESSED
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono-code text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Verification Link Button */}
            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono-code text-emerald-400 flex items-center gap-1.5 font-bold">
                <CheckCircle2 size={12} />
                AUTHENTICATED
              </span>

              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:border-purple-400 text-xs font-mono-code font-bold transition-all"
                data-cursor="VERIFY"
              >
                <span>VERIFY</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;