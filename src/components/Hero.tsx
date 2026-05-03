import React, { useState } from 'react';
import { personalInfo } from '../data';
import profileImg from '../assets/backhome.png';

const Hero: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="container mx-auto min-h-screen flex flex-col justify-center px-6 pt-32 md:pt-0">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-xl md:text-2xl font-medium text-white/60 mb-2">Hi, I'm</h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-4 tracking-tighter">
            {personalInfo.name}
          </h1>
          <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] bg-clip-text text-transparent mb-6">
            {personalInfo.role}
          </h3>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
            {personalInfo.bio}
          </p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <a href="#contact" className="px-8 py-4 bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] rounded-xl text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20">
              Hire Me
            </a>
            <a href="#education" className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 transition-colors backdrop-blur-sm">
              View Journey
            </a>
          </div>
        </div>

        {/* 3D Profile Card */}
        <div 
          className="flex-1 w-full max-w-md lg:max-w-xl perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="relative aspect-square rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl p-4 transition-transform duration-100 ease-out preserve-3d shadow-2xl"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
              <img 
                src={profileImg} 
                alt={personalInfo.name} 
                className="w-full h-full object-cover translate-z-10 scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl translate-z-20">
                <h4 className="text-white font-bold text-xl mb-1">Creative Developer</h4>
                <p className="text-white/60 text-sm">Based in India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
