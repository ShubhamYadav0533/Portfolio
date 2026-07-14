import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../data';
import { ArrowDown, Github, Linkedin, Twitter, Rocket } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);
  const textY = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-bg-primary/80 to-transparent" />
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 container mx-auto px-6 pt-20 flex flex-col items-center text-center"
      >
        {/* Available Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-10 inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass border-accent-primary/20 shadow-xl shadow-accent-primary/5"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-primary"></span>
          </span>
          <span className="text-accent-primary font-black text-[11px] tracking-[0.3em] uppercase">Ready for new challenges</span>
        </motion.div>

        {/* Tag line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="subheading"
        >
          {personalInfo.role}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="heading-xl mb-10"
        >
          {personalInfo.name.split(' ')[0]}<br />
          <span className="gradient-text">
            {personalInfo.name.split(' ')[1]}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl font-medium text-text-secondary max-w-2xl mb-14 leading-relaxed"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-20"
        >
          <a
            href="#contact"
            className="group relative px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-accent-primary/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative text-white flex items-center gap-3">
              Start a Project <Rocket size={16} />
            </span>
          </a>
          <a
            href="/projects"
            className="px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] glass border-text-primary/10 text-text-primary hover:border-accent-primary/40 hover:bg-accent-primary/5 transition-all duration-300 active:scale-95"
          >
            Explore Work
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex gap-5"
        >
          {personalInfo.socials.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl glass border-text-primary/5 flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 hover:-translate-y-1 transition-all duration-300"
            >
              {s.name === 'GitHub' && <Github size={20} />}
              {s.name === 'LinkedIn' && <Linkedin size={20} />}
              {s.name === 'Twitter' && <Twitter size={20} />}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-text-tertiary text-[10px] font-black tracking-[0.4em] uppercase">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-text-tertiary/20 flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 rounded-full bg-accent-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
