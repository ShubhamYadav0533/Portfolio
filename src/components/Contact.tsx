import React from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { personalInfo } from '../data';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="container mx-auto py-32 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-card-bg border border-black/5 dark:border-white/10 backdrop-blur-2xl rounded-[3rem] overflow-hidden shadow-2xl transition-colors duration-500"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/5 p-12 lg:p-16 bg-bg-primary/20 border-b lg:border-b-0 lg:border-r border-black/5 dark:border-white/10 transition-colors duration-500">
            <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6 leading-tight uppercase tracking-tighter">
              Ready to <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Innovate?</span>
            </h2>
            <p className="text-text-secondary text-lg mb-12">
              Let's build something extraordinary together. Reach out for collaborations or just a friendly tech chat.
            </p>
            
            <div className="space-y-8 mb-16">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-text-secondary/40 text-xs font-bold uppercase tracking-widest">Email</p>
                  <p className="text-text-primary font-bold text-lg">shubham@example.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-accent-secondary/10 flex items-center justify-center text-accent-secondary group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-text-secondary/40 text-xs font-bold uppercase tracking-widest">Location</p>
                  <p className="text-text-primary font-bold text-lg">Jaunpur, India</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {personalInfo.socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  className="w-12 h-12 rounded-xl bg-bg-primary/50 border border-black/5 dark:border-white/10 flex items-center justify-center text-text-secondary hover:bg-accent-primary hover:text-white hover:border-transparent transition-all duration-300"
                >
                  {social.name === 'GitHub' && <Github size={20} />}
                  {social.name === 'LinkedIn' && <Linkedin size={20} />}
                  {social.name === 'Twitter' && <Twitter size={20} />}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:w-3/5 p-12 lg:p-16">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-text-secondary/40 text-xs font-bold uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-bg-primary/50 border border-black/5 dark:border-white/10 rounded-2xl p-4 text-text-primary outline-none focus:border-accent-primary/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-text-secondary/40 text-xs font-bold uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-bg-primary/50 border border-black/5 dark:border-white/10 rounded-2xl p-4 text-text-primary outline-none focus:border-accent-primary/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-text-secondary/40 text-xs font-bold uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  rows={5}
                  className="w-full bg-bg-primary/50 border border-black/5 dark:border-white/10 rounded-2xl p-4 text-text-primary outline-none focus:border-accent-primary/50 transition-all resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              <button className="w-full py-5 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-accent-primary/20">
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
