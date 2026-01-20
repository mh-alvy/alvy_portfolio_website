
import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATES } from '../constants';
import SectionTitle from './SectionTitle';
import { Award, ShieldCheck, Tag } from 'lucide-react';

const Certificates: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="CERTIFICATIONS" subtitle="Verified Professional Expertise" />

      <div className="grid gap-6">
        {CERTIFICATES.map((cert, i) => (
          <motion.div
            key={cert.title + i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group glass p-6 md:p-8 rounded-3xl border-l-4 border-purple-500 hover:bg-white/[0.04] transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
              <div className="flex flex-col md:flex-row md:items-center gap-6 flex-1">
                <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:scale-110 transition-transform flex-shrink-0 self-start md:self-center">
                  <Award size={36} />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-tight">
                    {cert.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="text-xs text-gray-400 font-black uppercase tracking-widest">
                      {cert.issuer}
                    </span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full hidden sm:block"></span>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                      Issued {cert.date}
                    </span>
                    {cert.credentialId && (
                      <>
                        <span className="w-1 h-1 bg-gray-700 rounded-full hidden sm:block"></span>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono-code">
                          <ShieldCheck size={12} className="text-purple-500/50" />
                          ID: {cert.credentialId}
                        </div>
                      </>
                    )}
                  </div>

                  {cert.skills && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-md border border-white/5 flex items-center gap-1 uppercase tracking-tighter">
                          <Tag size={8} />
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
