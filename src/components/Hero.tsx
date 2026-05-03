import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../data';
import profileImg from '../assets/backhome.png';

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
        className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 relative z-10"
      >
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-[#00d2ff] mb-2 tracking-[0.3em] uppercase">Welcome</h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-6 tracking-tighter">
              {personalInfo.name.split(' ')[0]}<br/>
              <span className="bg-gradient-to-r from-white via-white/50 to-transparent bg-clip-text text-transparent">
                {personalInfo.name.split(' ')[1]}
              </span>
            </h1>
            <h3 className="text-2xl md:text-4xl font-bold text-white/40 mb-8 max-w-2xl">
              Building <span className="text-white">Scalable</span> & <span className="text-white">Immersive</span> digital experiences.
            </h3>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <button className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <a href="#contact" className="relative px-10 py-5 bg-[#030303] rounded-2xl text-white font-black text-lg block border border-white/10 hover:border-transparent transition-all">
                  HIRE ME
                </a>
              </button>
              <a href="#education" className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-black hover:bg-white/10 transition-all backdrop-blur-sm">
                PORTFOLIO
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3D Profile Card with Scroll Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 w-full max-w-lg lg:max-w-2xl perspective-2000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="relative aspect-[4/5] rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-3xl p-6 transition-transform duration-200 ease-out preserve-3d shadow-[0_0_100px_rgba(0,210,255,0.1)]"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative preserve-3d">
              <img 
                src={profileImg} 
                alt={personalInfo.name} 
                className="w-full h-full object-cover translate-z-20 scale-110 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/20 to-transparent" />
              
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] translate-z-40">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-white/40 font-bold text-xs tracking-widest">AVAILABLE FOR WORK</span>
                </div>
                <h4 className="text-white font-black text-3xl mb-1 tracking-tight">Full-Stack Engineer</h4>
                <p className="text-[#00d2ff] font-bold text-sm tracking-[0.2em]">SHUBHAM YADAV</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
};

export default Hero;
