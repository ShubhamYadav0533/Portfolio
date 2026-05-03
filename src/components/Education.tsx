import React from 'react';
import { education } from '../data';

const Education: React.FC = () => {
  return (
    <section id="education" className="container mx-auto py-32 px-6">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          My <span className="bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] bg-clip-text text-transparent">Journey</span>
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] mx-auto rounded-full" />
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Central Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d2ff] via-[#9d50bb] to-transparent opacity-30" />

        <div className="space-y-12">
          {education.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between w-full relative ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#00d2ff] rounded-full shadow-[0_0_15px_rgba(0,210,255,0.5)] z-10" />

              {/* Content Card */}
              <div className={`w-[45%] group`}>
                <div className="p-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-white/20">
                  <span className="text-[#00d2ff] font-black text-xl mb-4 block">{item.year}</span>
                  <h3 className="text-white text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Spacer for the other side */}
              <div className="w-[45%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
