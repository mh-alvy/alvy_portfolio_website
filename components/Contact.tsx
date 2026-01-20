
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { Mail, MapPin, Send, Instagram, Facebook, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="GET IN TOUCH" subtitle="Let's Build Something Legendary" />

      <div className="grid lg:grid-cols-3 gap-12 mt-10">
        <div className="lg:col-span-1 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-black text-white">Let's connect.</h3>
            <p className="text-gray-400 leading-relaxed">
              I'm always open to new opportunities, collaborations, or just a friendly chat about tech and motion graphics.
            </p>
          </motion.div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 group">
              <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Email Me</p>
                <p className="text-lg font-bold text-white">hello@alvy.tech</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Location</p>
                <p className="text-lg font-bold text-white">Chittagong, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            {[Github, Linkedin, Instagram, Facebook].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="p-4 glass rounded-2xl text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass p-8 md:p-12 rounded-3xl border border-white/5 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Your Name</label>
              <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Your Email</label>
              <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Subject</label>
            <input type="text" placeholder="Project Inquiry" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Message</label>
            <textarea rows={5} placeholder="How can I help you?" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"></textarea>
          </div>
          <button className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-black py-5 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm">
            SEND MESSAGE
            <Send size={18} />
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
