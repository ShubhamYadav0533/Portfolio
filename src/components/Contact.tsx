import React from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { personalInfo } from '../data';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
 return (
 <section id="contact" className="container mx-auto py-40 px-6">
 <motion.div 
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="max-w-6xl mx-auto glass rounded-[3rem] overflow-hidden shadow-2xl"
 >
 <div className="flex flex-col lg:flex-row">
 <div className="lg:w-2/5 p-12 lg:p-16 bg-accent-primary/5 border-b lg:border-b-0 lg:border-r border-glass-border">
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 className="mb-8 inline-flex px-4 py-1.5 rounded-full bg-accent-primary/5 border border-accent-primary/20"
 >
 <span className="text-accent-primary text-[10px] font-black tracking-[0.4em]">Get in touch</span>
 </motion.div>
 
 <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6 leading-tight tracking-tighter">
 Ready to <span className="gradient-text">Collaborate?</span>
 </h2>
 <p className="text-text-secondary text-lg mb-12 font-medium">
 I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
 </p>
 
 <div className="space-y-8 mb-16">
 <div className="flex items-center gap-6 group">
 <div className="w-14 h-14 rounded-2xl bg-white dark:bg-bg-secondary flex items-center justify-center text-accent-primary group-hover:scale-110 shadow-lg transition-transform">
 <Mail size={24} />
 </div>
 <div>
 <p className="text-text-tertiary text-xs font-bold tracking-widest mb-1">Email</p>
 <p className="text-text-primary font-bold text-lg">shubham@example.com</p>
 </div>
 </div>
 
 <div className="flex items-center gap-6 group">
 <div className="w-14 h-14 rounded-2xl bg-white dark:bg-bg-secondary flex items-center justify-center text-accent-secondary group-hover:scale-110 shadow-lg transition-transform">
 <MapPin size={24} />
 </div>
 <div>
 <p className="text-text-tertiary text-xs font-bold tracking-widest mb-1">Location</p>
 <p className="text-text-primary font-bold text-lg">Jaunpur, India</p>
 </div>
 </div>
 </div>

 <div className="flex gap-4">
 {personalInfo.socials.map((social, i) => (
 <a 
 key={i} 
 href={social.url} 
 className="w-12 h-12 rounded-xl glass flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 transition-all duration-300"
 >
 {social.name === 'GitHub' && <Github size={20} />}
 {social.name === 'LinkedIn' && <Linkedin size={20} />}
 {social.name === 'Twitter' && <Twitter size={20} />}
 </a>
 ))}
 </div>
 </div>

 <div className="lg:w-3/5 p-12 lg:p-16 bg-white/30 dark:bg-bg-secondary/30">
 <form className="space-y-8">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="space-y-3">
 <label className="text-text-primary font-black text-xs tracking-widest ml-1">Full Name</label>
 <input 
 type="text" 
 className="w-full bg-white/50 dark:bg-black/20 border border-glass-border rounded-2xl p-5 text-text-primary outline-none focus:border-accent-primary/50 focus:bg-white dark:focus:bg-black/40 transition-all shadow-inner"
 placeholder="John Doe"
 />
 </div>
 <div className="space-y-3">
 <label className="text-text-primary font-black text-xs tracking-widest ml-1">Email Address</label>
 <input 
 type="email" 
 className="w-full bg-white/50 dark:bg-black/20 border border-glass-border rounded-2xl p-5 text-text-primary outline-none focus:border-accent-primary/50 focus:bg-white dark:focus:bg-black/40 transition-all shadow-inner"
 placeholder="john@example.com"
 />
 </div>
 </div>
 
 <div className="space-y-3">
 <label className="text-text-primary font-black text-xs tracking-widest ml-1">Message</label>
 <textarea 
 rows={6}
 className="w-full bg-white/50 dark:bg-black/20 border border-glass-border rounded-2xl p-5 text-text-primary outline-none focus:border-accent-primary/50 focus:bg-white dark:focus:bg-black/40 transition-all shadow-inner resize-none"
 placeholder="Tell me about your project..."
 />
 </div>

 <button className="w-full py-6 bg-text-primary text-bg-primary rounded-2xl font-black tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-accent-primary hover:text-white transition-all duration-300 shadow-2xl shadow-black/10 active:scale-[0.98]">
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
