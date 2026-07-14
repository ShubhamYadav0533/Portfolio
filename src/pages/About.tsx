import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import { personalInfo, services } from '../data';
import { Github, Linkedin, Twitter, Download, Code2, Server, Shield, TestTube, ArrowUpRight } from 'lucide-react';
import Education from '../components/Education';

const serviceIcons: Record<string, any> = {
 "Full-Stack Development": Code2,
 "Frontend Development": Code2,
 "Backend Development": Server,
 "Testing & Quality Assurance": TestTube,
};

const About: React.FC = () => {
 return (
 <div className="relative text-text-primary selection:bg-accent-primary/30 transition-colors duration-500 min-h-screen">
 <Background />
 <Navbar />
 <main className="relative z-10 container mx-auto px-6 pt-48 pb-24">
 {/* Hero Block */}
 <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
 <motion.div
 initial={{ opacity: 0, x: -40 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.8 }}
 >
 <p className="subheading">The Journey</p>
 <h1 className="heading-xl mb-8">
 The Developer<br />
 <span className="gradient-text">Behind the Code</span>
 </h1>
 <p className="text-text-secondary text-lg leading-relaxed mb-12 max-w-xl font-medium">
 {personalInfo.bio}
 </p>
 <div className="flex flex-wrap gap-5">
 <a
 href="#"
 className="group inline-flex items-center gap-3 px-8 py-4 bg-text-primary text-bg-primary rounded-2xl font-black tracking-widest text-xs hover:bg-accent-primary hover:text-white transition-all duration-300"
 >
 <Download size={18} /> Download Resume
 </a>
 <div className="flex gap-3">
 {personalInfo.socials.map((s, i) => (
 <a
 key={i}
 href={s.url}
 target="_blank"
 rel="noopener noreferrer"
 className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 transition-all duration-300"
 >
 {s.name === 'GitHub' && <Github size={20} />}
 {s.name === 'LinkedIn' && <Linkedin size={20} />}
 {s.name === 'Twitter' && <Twitter size={20} />}
 </a>
 ))}
 </div>
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.8, delay: 0.2 }}
 className="grid grid-cols-2 gap-6"
 >
 {[
 { label: 'Years Experience', value: '3+' },
 { label: 'Projects Done', value: '25+' },
 { label: 'Tech Stack', value: '15+' },
 { label: 'Success Rate', value: '100%' },
 ].map((stat, i) => (
 <div
 key={i}
 className="p-10 glass glass-hover rounded-[2.5rem] flex flex-col gap-3"
 >
 <span className="text-5xl font-black gradient-text">
 {stat.value}
 </span>
 <span className="text-text-tertiary font-black text-[10px] tracking-[0.2em]">{stat.label}</span>
 </div>
 ))}
 </motion.div>
 </div>

 {/* Services */}
 <div className="mb-40">
 <div className="flex flex-col items-center text-center mb-20">
 <p className="subheading text-center">Services</p>
 <h2 className="heading-xl">
 What I <span className="gradient-text">Offer</span>
 </h2>
 </div>
 <div className="grid sm:grid-cols-2 gap-8">
 {services.map((service, i) => {
 const Icon = serviceIcons[service.title] || Shield;
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="group p-12 glass glass-hover rounded-[3rem] relative overflow-hidden"
 >
 <div className="w-16 h-16 rounded-2xl bg-white dark:bg-bg-secondary flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500">
 <Icon size={30} className="text-accent-primary" />
 </div>
 <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-6 group-hover:text-accent-primary transition-colors">
 {service.title}
 </h3>
 <p className="text-text-secondary leading-relaxed text-lg font-medium mb-8">
 {service.description}
 </p>
 <a href="#contact" className="inline-flex items-center gap-2 text-accent-primary font-black text-xs tracking-widest group/link">
 Inquire Now <ArrowUpRight size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
 </a>
 </motion.div>
 );
 })}
 </div>
 </div>

 {/* Journey/Education */}
 <div className="-mx-6">
  <Education />
 </div>
 </main>
 </div>
 );
};

export default About;
