import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATES } from '../constants';
import SectionTitle from './SectionTitle';
import { Award, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';

const Certificates: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="CERTIFICATIONS" subtitle="Verified Professional Expertise" />

      <div className="grid gap-8 mt-12">
        {CERTIFICATES.map((cert, i) => (
          <motion.div
            key={cert.title + i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group glass p-8 md:p-10 rounded-3xl border-l-4 border-purple-500 hover:bg-white/[0.04] transition-all duration-500 shadow-xl"
          >
            <div className="flex flex-col gap-6">
              {/* Header Info */}
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <h4 className="text-xl md:text-2xl font-black text-white group-hover:text-purple-400 transition-colors leading-tight font-heading uppercase tracking-tight">
                    {cert.title}
                  </h4>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 whitespace-nowrap self-start">
                    Issued {cert.date}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <p className="text-base font-bold text-purple-300/80">
                    {cert.issuer}
                  </p>
                  
                  {cert.credentialId && (
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono-code uppercase tracking-widest bg-white/5 w-fit px-3 py-1 rounded-md">
                      <ShieldCheck size={12} className="text-purple-500" />
                      Credential ID {cert.credentialId}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border-2 border-purple-500/30 text-white font-bold text-xs hover:bg-purple-500/10 hover:border-purple-500/60 transition-all duration-300"
                >
                  Show credential
                  <ExternalLink size={14} />
                </motion.a>
              </div>

              {/* Skills Section - Mirroring Screenshot Layout */}
              {cert.skills && (
                <div className="pt-6 border-t border-white/5 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles size={12} className="text-purple-400 opacity-60" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Skills:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {cert.skills.map((skill, sIdx) => (
                      <React.Fragment key={skill}>
                        <span className="text-[11px] font-bold text-gray-300 hover:text-white transition-colors cursor-default">
                          {skill}
                        </span>
                        {sIdx < cert.skills.length - 1 && (
                          <span className="text-gray-600 font-black">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Subtle background decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-1000 text-purple-500">
              <Award size={180} strokeWidth={0.5} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;