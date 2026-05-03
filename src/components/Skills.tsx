import React from 'react';
import { skills } from '../data';

const getAssetUrl = (name: string) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="container mx-auto py-32 px-6">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          Technical <span className="bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] bg-clip-text text-transparent">Arsenal</span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          A comprehensive suite of technologies I use to build robust and scalable digital solutions.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="group relative p-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center gap-6 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:border-[#00d2ff]/30 cursor-pointer overflow-hidden"
          >
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00d2ff]/5 to-[#9d50bb]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-16 h-16 relative z-10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
              <img 
                src={getAssetUrl(skill.icon)} 
                alt={skill.name} 
                className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
              />
            </div>
            
            <h4 className="text-white font-bold text-sm tracking-widest uppercase relative z-10">
              {skill.name}
            </h4>
            
            {/* Animated border bottom */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] transition-all duration-500 w-0 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
