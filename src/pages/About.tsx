import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import { personalInfo, services, education } from '../data';
import { Github, Linkedin, Twitter, Download, Code2, Server, Shield, TestTube } from 'lucide-react';

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
      <main className="relative z-10 container mx-auto px-6 pt-40 pb-24">
        {/* Hero Block */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent-primary font-bold text-sm tracking-[0.3em] uppercase mb-4">About Me</p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-primary leading-tight mb-8">
              The Developer<br />
              <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                Behind the Code
              </span>
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-xl">
              {personalInfo.bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl text-white font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
              >
                <Download size={18} /> Download CV
              </a>
              <div className="flex gap-3">
                {personalInfo.socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl border border-text-primary/10 bg-card-bg flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 transition-all"
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
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { label: 'Years Experience', value: '3+' },
              { label: 'Projects Completed', value: '20+' },
              { label: 'Technologies', value: '12+' },
              { label: 'Happy Clients', value: '15+' },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-8 bg-card-bg border border-text-primary/5 rounded-3xl backdrop-blur-xl flex flex-col gap-2 hover:border-accent-primary/30 transition-colors"
              >
                <span className="text-5xl font-black bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-text-secondary font-bold text-sm uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Services */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text-primary uppercase mb-4">
              What I <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Do</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-8">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.title] || Shield;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-10 bg-card-bg border border-text-primary/5 rounded-[2.5rem] backdrop-blur-xl hover:border-accent-primary/30 hover:bg-accent-primary/5 transition-all duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={30} className="text-accent-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-text-primary mb-4">{service.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Education Timeline */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text-primary uppercase mb-4">
              My <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Journey</span>
            </h2>
          </motion.div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-primary via-accent-secondary to-transparent opacity-30" />
            <div className="space-y-10">
              {education.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-8 pl-20 relative"
                >
                  <div className="absolute left-4 top-6 w-9 h-9 rounded-full bg-bg-primary border border-accent-primary/50 flex items-center justify-center shadow-lg shadow-accent-primary/10">
                    <span className="text-accent-primary font-black text-[10px]">{item.year}</span>
                  </div>
                  <div className="flex-1 p-8 bg-card-bg border border-text-primary/5 rounded-3xl hover:border-accent-primary/20 transition-colors">
                    <h3 className="text-xl font-black text-text-primary mb-2">{item.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
