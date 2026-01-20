import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';
import SectionTitle from './SectionTitle';
import { User, Award, Globe, Code, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="WHO AM I" subtitle="A Creative Mindset" />
      
      <div className="grid lg:grid-cols-12 gap-12 items-start -mt-8">
        {/* Profile Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-5 relative group order-2 lg:order-1"
        >
          {/* Enhanced Neon Glow Container */}
          <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500/20 via-purple-600/20 to-pink-500/20 rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative glass p-2 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* Holographic Overlays */}
            <div className="scan-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none z-20"></div>
            
            {/* The Photo Frame */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-black/40">
                <img
                    src="https://iili.io/frFRNcl.jpg"
                    alt="Mahamudul Hasan Alvy"
                    className="w-full h-full object-cover filter brightness-105 contrast-105 group-hover:scale-105 transition-all duration-1000"
                />
            </div>

            {/* Instructor Badge - Matches the shirt in the photo */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 left-6 z-40 px-3 py-1.5 glass border border-red-400/30 rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              <Zap size={14} className="text-red-400 animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest font-mono-code">INSTRUCTOR</span>
            </motion.div>
          </div>
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="glass p-5 rounded-2xl border-cyan-500/10 border text-center group/card overflow-hidden relative">
              <div className="absolute inset-0 bg-cyan-500/5 translate-y-full group-hover/card:translate-y-0 transition-transform duration-500"></div>
              <div className="relative z-10 text-3xl font-black text-cyan-400 mb-1 font-heading">500+</div>
              <div className="relative z-10 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold font-mono-code">Global Clients</div>
            </div>
            <div className="glass p-5 rounded-2xl border-purple-500/10 border text-center group/card overflow-hidden relative">
              <div className="absolute inset-0 bg-purple-500/5 translate-y-full group-hover/card:translate-y-0 transition-transform duration-500"></div>
              <div className="relative z-10 text-3xl font-black text-purple-400 mb-1 font-heading">5+</div>
              <div className="relative z-10 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold font-mono-code">Exp Years</div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-10 order-1 lg:order-2"
        >
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 font-heading group">
              <span className="text-cyan-500 font-mono-code group-hover:translate-x-1 transition-transform">&gt;</span> 
              {PERSONAL_INFO.aboutGreetings}
            </h3>
            <p className="text-gray-400 text-xl leading-relaxed whitespace-pre-line font-medium italic border-l-4 border-purple-500/40 pl-6 py-2 bg-gradient-to-r from-purple-500/5 to-transparent rounded-r-2xl">
              "Level 2 Seller & Multidisciplinary Creative solving problems through high-end Motion, VFX, and Logic."
            </p>
          </div>

          <p className="text-gray-300 leading-relaxed text-lg font-light tracking-wide max-w-3xl">
            {PERSONAL_INFO.aboutLong}
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8 pt-6">
            <div className="flex gap-5 items-center group/item p-4 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
              <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 group-hover/item:rotate-12 group-hover/item:scale-110 transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <Code size={24} />
              </div>
              <div>
                <span className="block text-[10px] text-gray-500 uppercase tracking-[0.25em] font-bold font-mono-code">Education</span>
                <p className="text-white font-black text-base font-heading">BSc CSE @ CUET</p>
              </div>
            </div>
            
            <div className="flex gap-5 items-center group/item p-4 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
              <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400 group-hover/item:-rotate-12 group-hover/item:scale-110 transition-all shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                <Award size={24} />
              </div>
              <div>
                <span className="block text-[10px] text-gray-500 uppercase tracking-[0.25em] font-bold font-mono-code">Ranked</span>
                <p className="text-white font-black text-base font-heading">Fiverr Lvl 2</p>
              </div>
            </div>

            <div className="flex gap-5 items-center group/item p-4 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
              <div className="p-4 bg-green-500/10 rounded-2xl text-green-400 group-hover/item:scale-125 transition-all">
                <Globe size={24} />
              </div>
              <div>
                <span className="block text-[10px] text-gray-500 uppercase tracking-[0.25em] font-bold font-mono-code">Location</span>
                <p className="text-white font-black text-base font-heading">Bangladesh</p>
              </div>
            </div>

            <div className="flex gap-5 items-center group/item p-4 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
              <div className="p-4 bg-red-500/10 rounded-2xl text-red-400 group-hover/item:animate-pulse transition-all">
                <User size={24} />
              </div>
              <div>
                <span className="block text-[10px] text-gray-500 uppercase tracking-[0.25em] font-bold font-mono-code">Venture</span>
                <p className="text-white font-black text-base font-heading">Break The Fear</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;