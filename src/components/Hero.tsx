import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../data';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative container mx-auto min-h-screen flex flex-col justify-center px-6 pt-32 lg:pt-0 overflow-hidden"
    >
      <motion.div 
        style={{ y: y1, opacity, scale }}
        className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10"
      >
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-accent-primary mb-2 tracking-[0.3em] uppercase">Creative Developer</h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-text-primary leading-none mb-6 tracking-tighter">
              {personalInfo.name.split(' ')[0]}<br/>
              <span className="bg-gradient-to-r from-text-primary via-text-primary/50 to-transparent bg-clip-text text-transparent">
                {personalInfo.name.split(' ')[1]}
              </span>
            </h1>
            <h3 className="text-2xl md:text-4xl font-bold text-text-secondary mb-8 max-w-2xl">
              Building <span className="text-text-primary underline decoration-accent-primary underline-offset-8">Scalable</span> & <span className="text-text-primary">Immersive</span> digital experiences.
            </h3>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <button className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <a href="#contact" className="relative px-10 py-5 bg-bg-primary rounded-2xl text-text-primary font-black text-lg block border border-black/10 dark:border-white/10 hover:border-transparent transition-all">
                  HIRE ME
                </a>
              </button>
              <a href="#education" className="px-10 py-5 bg-card-bg border border-black/10 dark:border-white/10 rounded-2xl text-text-primary font-black hover:bg-black/10 dark:hover:bg-white/10 transition-all backdrop-blur-sm">
                PORTFOLIO
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3D Abstract Element (Replacing Image) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 w-full max-w-lg lg:max-w-xl perspective-2000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="relative aspect-square rounded-[3rem] bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-black/10 dark:border-white/10 backdrop-blur-3xl flex items-center justify-center transition-transform duration-200 ease-out preserve-3d shadow-2xl"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* Abstract 3D Shapes */}
            <div className="relative preserve-3d">
              <div className="w-48 h-48 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full blur-[40px] opacity-20 animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-text-primary/10 rounded-[2rem] rotate-45 translate-z-20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-text-primary/20 rounded-[2rem] -rotate-12 translate-z-40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-black text-text-primary opacity-5 select-none translate-z-60">
                S
              </div>
            </div>

            <div className="absolute bottom-10 left-10 right-10 p-8 bg-card-bg backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-[2rem] translate-z-40">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-accent-primary animate-pulse" />
                <span className="text-text-secondary font-bold text-xs tracking-widest">OPEN TO PROJECTS</span>
              </div>
              <h4 className="text-text-primary font-black text-3xl mb-1 tracking-tight">Full-Stack Engineer</h4>
              <p className="text-accent-primary font-bold text-sm tracking-[0.2em]">SHUBHAM YADAV</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
};

export default Hero;
