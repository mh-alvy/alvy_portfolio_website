import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { SOCIAL_LINKS } from '../constants';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Terminal, 
  Copy, 
  Check, 
  MessageSquare,
  Sparkles,
  Radio,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [transmissionStatus, setTransmissionStatus] = useState<'idle' | 'encrypting' | 'sent'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sounds.playScan();
    setTransmissionStatus('encrypting');

    setTimeout(() => {
      sounds.playChirp();
      setTransmissionStatus('sent');
      // Construct mailto link as fallback to ensure the user's transmission reaches Alvy
      const mailtoUrl = `mailto:mhalvytech24@gmail.com?subject=${encodeURIComponent(
        formData.subject || 'Project Inquiry from ' + formData.name
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 1200);
  };

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText('mhalvytech24@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle 
        title="COMMUNICATIONS RELAY" 
        subtitle="Establish Direct Link for Collaboration & Inquiries" 
        badge="RESPONSE TIME < 12H"
      />

      <div className="grid lg:grid-cols-12 gap-12 mt-12 items-start">
        {/* Left Column: Direct Frequency Channels */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 cyber-corner space-y-6">
            <div className="space-y-2 pb-4 border-b border-white/10">
              <span className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                <Radio size={12} className="animate-pulse" />
                <span>DIRECT FREQUENCIES</span>
              </span>
              <h3 className="text-2xl font-black text-white font-heading tracking-tight">
                Let's Build Something Legendary.
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Available for full-stack engineering contracts, motion graphics direction, visual effects production, and academic tech instruction.
              </p>
            </div>

            {/* Email Channel */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-code text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail size={12} className="text-cyan-400" />
                  <span>PRIMARY TRANSMISSION</span>
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="text-[10px] font-mono-code text-cyan-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copiedEmail ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <a
                href="mailto:mhalvytech24@gmail.com"
                onClick={() => sounds.playClick()}
                className="text-base font-bold text-white hover:text-cyan-300 transition-colors block font-heading truncate"
              >
                mhalvytech24@gmail.com
              </a>
            </div>

            {/* WhatsApp Quick Link */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <span className="text-[10px] font-mono-code text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare size={12} className="text-emerald-400" />
                <span>INSTANT COMMS // WHATSAPP</span>
              </span>
              <a
                href="https://wa.me/01521706839?text=Hi%20Alvy,%20I%20saw%20your%20portfolio..."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="text-base font-bold text-white hover:text-emerald-300 transition-colors flex items-center justify-between font-heading"
                data-cursor="WHATSAPP"
              >
                <span>+880 1521-706839</span>
                <ExternalLink size={14} className="text-gray-400" />
              </a>
            </div>

            {/* Location Coordinate */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono-code text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={12} className="text-purple-400" />
                <span>PHYSICAL BASE</span>
              </span>
              <p className="text-sm font-bold text-white font-heading">
                Comilla & Chittagong (CUET), Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: High-Tech Cyber Console Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 cyber-corner relative overflow-hidden">
            {/* Top Terminal Bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono-code">
              <div className="flex items-center gap-2 text-cyan-400">
                <Terminal size={14} />
                <span className="font-bold tracking-widest">DISPATCH_CONSOLE.EXE</span>
              </div>
              <span className="text-gray-500 text-[10px]">ENCRYPTION: AES-256</span>
            </div>

            <AnimatePresence mode="wait">
              {transmissionStatus === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-white font-heading">
                      TRANSMISSION DISPATCHED
                    </h4>
                    <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-cyan-300">{formData.name}</strong>. Your message has been prepared for dispatch. I will review and respond promptly.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setTransmissionStatus('idle');
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono-code text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    SEND ANOTHER PACKET
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-gray-400">
                        &gt; YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Matrix"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono-code text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-gray-400">
                        &gt; YOUR EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. client@organization.com"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono-code text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-gray-400">
                      &gt; SUBJECT LINE
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Full-Stack Web Development Project / VFX Showcase"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono-code text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-gray-400">
                      &gt; MESSAGE PAYLOAD *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your goals, project scope, timeline, and requirements..."
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono-code text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={transmissionStatus === 'encrypting'}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-400 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold text-xs sm:text-sm uppercase tracking-[0.2em] font-mono-code transition-all shadow-[0_0_25px_rgba(0,242,255,0.4)] hover:shadow-[0_0_35px_rgba(0,242,255,0.7)] flex items-center justify-center gap-2 disabled:opacity-50"
                    data-cursor="DISPATCH"
                  >
                    {transmissionStatus === 'encrypting' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                        <span>ENCRYPTING & RELAYING...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT DISPATCH PACKET</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;