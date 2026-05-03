import React from 'react';
import { motion } from 'framer-motion';
import { education } from '../data';

const Education: React.FC = () => {
  return (
    <section id="education" className="container mx-auto py-48 px-6 perspective-2000">
      <div className="text-center mb-32 relative">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-6xl md:text-9xl font-black text-text-primary/5 tracking-tighter absolute left-1/2 -translate-x-1/2 -top-10 select-none uppercase"
        >
          History
        </motion.h2>
        <h2 className="text-5xl md:text-7xl font-black text-text-primary relative z-10 uppercase tracking-tighter">
          Academic <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Milestones</span>
        </h2>
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-accent-primary via-accent-secondary to-transparent opacity-30" 
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
              <div className="absolute left-1/2 -translate-x-1/2 w-20 h-20 bg-bg-primary border border-black/5 dark:border-white/10 rounded-full flex items-center justify-center z-20 shadow-xl transition-colors duration-500">
                <span className="text-accent-primary font-black text-xs tracking-tighter">{item.year}</span>
              </div>

              <div className={`w-[42%] group perspective-1000`}>
                <motion.div 
                  whileHover={{ 
                    rotateY: index % 2 === 0 ? 10 : -10,
                    translateZ: 30,
                    scale: 1.02
                  }}
                  className="p-10 bg-card-bg border border-black/5 dark:border-white/10 backdrop-blur-2xl rounded-[3rem] hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-500 preserve-3d"
                >
                  <h3 className="text-text-primary text-3xl font-black mb-4 tracking-tight group-hover:text-accent-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-lg font-medium">
                    {item.description}
                  </p>
                  
                  <span className="absolute -top-6 -right-6 text-8xl font-black text-text-primary/5 select-none transition-colors duration-500">
                    0{index + 1}
                  </span>
                </motion.div>
              </div>

              <div className="w-[42%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
