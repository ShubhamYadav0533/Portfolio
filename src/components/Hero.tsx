import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../data';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import Birds3D from './Birds3D';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);
  const textY = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* 3D Birds Canvas — full section background */}
      <Birds3D />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-bg-primary to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-bg-primary/50 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-primary/30 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-primary/30 to-transparent" />
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 container mx-auto px-6 pt-36 pb-28 flex flex-col items-center text-center"
      >
        {/* Available Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-accent-primary/30 bg-accent-primary/10 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
          <span className="text-accent-primary font-bold text-sm tracking-[0.25em] uppercase">Available for Work</span>
        </motion.div>

        {/* Tag line */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl font-bold text-accent-primary tracking-[0.35em] uppercase mb-4"
        >
          Creative Developer
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(4rem,13vw,10rem)] font-black leading-[0.9] tracking-tighter text-text-primary mb-8"
        >
          {personalInfo.name.split(' ')[0]}<br />
          <span className="bg-gradient-to-r from-text-primary via-text-primary/60 to-accent-primary/30 bg-clip-text text-transparent">
            {personalInfo.name.split(' ')[1]}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-xl md:text-3xl font-semibold text-text-secondary max-w-2xl mb-12 leading-relaxed"
        >
          Building{' '}
          <span className="text-text-primary font-black underline decoration-accent-primary underline-offset-8">Scalable</span>
          {' '}&{' '}
          <span className="text-text-primary font-black">Immersive</span>
          {' '}digital experiences.
        </motion.h2>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-5 mb-14"
        >
          <a
            href="#contact"
            className="relative group px-10 py-4 rounded-2xl font-black text-base uppercase tracking-widest overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-125" />
            <span className="relative text-white">Hire Me</span>
          </a>
          <a
            href="/projects"
            className="px-10 py-4 rounded-2xl font-black text-base uppercase tracking-widest border border-text-primary/20 bg-card-bg backdrop-blur-sm text-text-primary hover:border-accent-primary/50 hover:bg-accent-primary/5 transition-all duration-300"
          >
            View Work
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-4"
        >
          {personalInfo.socials.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl border border-text-primary/10 bg-card-bg backdrop-blur-sm flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 transition-all duration-300 hover:scale-110"
            >
              {s.name === 'GitHub' && <Github size={18} />}
              {s.name === 'LinkedIn' && <Linkedin size={18} />}
              {s.name === 'Twitter' && <Twitter size={18} />}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-text-secondary/40 text-xs font-bold tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} className="text-text-secondary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
