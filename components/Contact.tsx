import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { SOCIAL_LINKS } from '../constants';
import { 
  Mail, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Briefcase, 
  Palette, 
  Facebook, 
  Instagram, 
  MessageCircle 
} from 'lucide-react';

const Contact: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'briefcase': return <Briefcase size={22} />;
      case 'linkedin': return <Linkedin size={22} />;
      case 'palette': return <Palette size={22} />;
      case 'github': return <Github size={22} />;
      case 'facebook': return <Facebook size={22} />;
      case 'instagram': return <Instagram size={22} />;
      case 'message-circle': return <MessageCircle size={22} />;
      default: return <Github size={22} />;
    }
  };

  const getColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'fiverr': return '#1dbf73';
      case 'linkedin': return '#0077b5';
      case 'behance': return '#0057ff';
      case 'github': return '#ffffff';
      case 'facebook': return '#1877f2';
      case 'instagram': return '#e4405f';
      case 'whatsapp': return '#25d366';
      default: return '#00f2ff';
    }
  };

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
                <a href="mailto:mhalvytech24@gmail.com" className="text-lg font-bold text-white hover:text-cyan-400 transition-colors">
                  mhalvytech24@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Location</p>
                <p className="text-lg font-bold text-white">Comilla, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
            {SOCIAL_LINKS.map((link) => {
              const color = getColor(link.name);
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="p-4 glass rounded-2xl text-gray-400 hover:text-white transition-all duration-300 border border-transparent"
                >
                  <div style={{ color: color }}>
                    {getIcon(link.icon)}
                  </div>
                </motion.a>
              );
            })}
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