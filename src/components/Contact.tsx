import React from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { personalInfo } from '../data';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="container mx-auto py-32 px-6">
      <div className="max-w-6xl mx-auto bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row">
          {/* Info Side */}
          <div className="lg:w-2/5 p-12 lg:p-16 bg-gradient-to-br from-white/5 to-transparent border-b lg:border-b-0 lg:border-r border-white/10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ready to <span className="bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] bg-clip-text text-transparent">Innovate?</span>
            </h2>
            <p className="text-white/60 text-lg mb-12">
              Let's build something extraordinary together. Reach out for collaborations or just a friendly tech chat.
            </p>
            
            <div className="space-y-8 mb-16">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-[#00d2ff]/10 flex items-center justify-center text-[#00d2ff] group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Email</p>
                  <p className="text-white font-medium text-lg">shubham@example.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-[#9d50bb]/10 flex items-center justify-center text-[#9d50bb] group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Location</p>
                  <p className="text-white font-medium text-lg">Jaunpur, India</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {personalInfo.socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#00d2ff] hover:text-white transition-all duration-300"
                >
                  {social.name === 'GitHub' && <Github size={20} />}
                  {social.name === 'LinkedIn' && <Linkedin size={20} />}
                  {social.name === 'Twitter' && <Twitter size={20} />}
                </a>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-12 lg:p-16">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#00d2ff]/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#00d2ff]/50 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Subject</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#00d2ff]/50 transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#00d2ff]/50 transition-colors resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              <button className="w-full py-5 bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] rounded-2xl text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-cyan-500/20">
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
