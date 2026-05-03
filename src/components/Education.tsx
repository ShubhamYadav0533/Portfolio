import React from 'react';
import { motion } from 'framer-motion';
import { education } from '../data';

const Education: React.FC = () => {
  return (
    <section id="education" className="container mx-auto py-48 px-6 perspective-2000">
      <div className="text-center mb-32">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-6xl md:text-9xl font-black text-white/5 tracking-tighter absolute left-1/2 -translate-x-1/2 -top-10 select-none"
        >
          HISTORY
        </motion.h2>
        <h2 className="text-5xl md:text-7xl font-black text-white relative z-10">
          Academic <span className="bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] bg-clip-text text-transparent">Milestones</span>
        </h2>
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        {/* Animated Central Line */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-[#00d2ff] via-[#9d50bb] to-transparent" 
        />

        <div className="space-y-32">
          {education.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: index % 2 === 0 ? 45 : -45 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className={`flex items-center justify-between w-full relative ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Floating Year Node */}
              <div className="absolute left-1/2 -translate-x-1/2 w-20 h-20 bg-[#030303] border border-white/10 rounded-full flex items-center justify-center z-20 shadow-[0_0_30px_rgba(0,210,255,0.2)]">
                <span className="text-[#00d2ff] font-black text-xs tracking-tighter">{item.year}</span>
              </div>

              {/* 3D Content Card */}
              <div className={`w-[42%] group perspective-1000`}>
                <motion.div 
                  whileHover={{ 
                    rotateY: index % 2 === 0 ? 10 : -10,
                    translateZ: 30,
                    scale: 1.02
                  }}
                  className="p-10 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[3rem] hover:bg-white/10 transition-all duration-500 preserve-3d"
                >
                  <h3 className="text-white text-3xl font-black mb-4 tracking-tight group-hover:text-[#00d2ff] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-lg font-medium">
                    {item.description}
                  </p>
                  
                  {/* Decorative number */}
                  <span className="absolute -top-6 -right-6 text-8xl font-black text-white/5 select-none">
                    0{index + 1}
                  </span>
                </motion.div>
              </div>

              {/* Spacer for the other side */}
              <div className="w-[42%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
