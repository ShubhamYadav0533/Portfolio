import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, animate } from 'framer-motion';
import { personalInfo } from '../data';
import { Github, Linkedin, Twitter, Rocket, GitCommit, Trophy, Flame } from 'lucide-react';

const AnimatedCounter = ({ from, to }: { from: number, to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    
    const controls = animate(from, to, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.round(value).toLocaleString();
      }
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef}>{from}</span>;
};

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

      <div className="relative z-10 container mx-auto px-6 pt-40 md:pt-48 pb-20 lg:pt-32 lg:pb-20 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen">
        
        {/* Left Column (Content) */}
        <motion.div
          style={{ y: textY, opacity }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Tag line */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 gradient-text leading-[1.1]"
          >
            {personalInfo.role}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl font-medium text-text-secondary max-w-2xl mb-12 leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-16"
          >
            <a
              href="#contact"
              className="group relative px-10 py-5 rounded-2xl font-black text-xs tracking-[0.2em] overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-accent-primary/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <span className="relative text-white flex items-center gap-3">
                Start a Project <Rocket size={16} />
              </span>
            </a>
            <a
              href="/projects"
              className="px-10 py-5 rounded-2xl font-black text-xs tracking-[0.2em] glass border-text-primary/10 text-text-primary hover:border-accent-primary/40 hover:bg-accent-primary/5 transition-all duration-300 active:scale-95"
            >
              Explore Work
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex gap-5 justify-center lg:justify-start"
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

        {/* Right Column (GitHub Stats) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ y: textY, opacity }}
          className="relative flex justify-center lg:justify-end w-full mt-10 lg:mt-0"
        >
          {/* Glass Card for GitHub Stats */}
          <div className="w-full max-w-md p-8 rounded-[2.5rem] glass border-text-primary/10 shadow-2xl shadow-accent-primary/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-colors duration-500 group-hover:bg-accent-primary/20" />
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-text-primary text-bg-primary flex items-center justify-center shadow-lg">
                <Github size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-text-primary tracking-tight">GitHub Status</h3>
                <p className="text-sm font-bold text-accent-primary tracking-widest ">@TechDev0001</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="p-5 rounded-2xl bg-bg-primary/50 border border-text-primary/5 hover:border-accent-primary/30 transition-colors">
                <GitCommit className="text-accent-primary mb-3" size={24} />
                <p className="text-3xl font-black text-text-primary mb-1"><AnimatedCounter from={0} to={4070} /></p>
                <p className="text-[10px] font-bold text-text-tertiary tracking-[0.2em] ">Total Contributions</p>
              </div>
              <div className="p-5 rounded-2xl bg-bg-primary/50 border border-text-primary/5 hover:border-accent-primary/30 transition-colors">
                <Flame className="text-accent-primary mb-3" size={24} />
                <p className="text-3xl font-black text-text-primary mb-1"><AnimatedCounter from={0} to={9} /></p>
                <p className="text-[10px] font-bold text-text-tertiary tracking-[0.2em] ">Current Streak</p>
              </div>
              <div className="col-span-2 p-5 rounded-2xl bg-bg-primary/50 border border-text-primary/5 flex items-center justify-between hover:border-accent-primary/30 transition-colors">
                <div>
                  <Trophy className="text-accent-primary mb-3" size={24} />
                  <p className="text-3xl font-black text-text-primary mb-1"><AnimatedCounter from={0} to={53} /></p>
                  <p className="text-[10px] font-bold text-text-tertiary tracking-[0.2em] ">Longest Streak</p>
                </div>
                {/* Mini Graph simulation */}
                <div className="flex gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  {Array.from({ length: 6 }).map((_, col) => (
                    <div key={col} className="flex flex-col gap-1.5">
                      {Array.from({ length: 5 }).map((_, row) => {
                        const intensity = Math.random();
                        let bgClass = "bg-text-primary/5 dark:bg-text-primary/10";
                        if (intensity > 0.8) bgClass = "bg-accent-primary shadow-[0_0_8px_rgba(44,230,124,0.6)]";
                        else if (intensity > 0.5) bgClass = "bg-accent-primary/60";
                        else if (intensity > 0.2) bgClass = "bg-accent-primary/30";
                        
                        return (
                          <div key={row} className={`w-3 h-3 rounded-sm ${bgClass} transition-all duration-500`} />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 hidden lg:flex"
      >
        <span className="text-text-tertiary text-[10px] font-black tracking-[0.4em] ">Scroll Down</span>
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
