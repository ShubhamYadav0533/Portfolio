import React from 'react';
import { motion } from 'framer-motion';
import { education } from '../data';
import { GraduationCap } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section id="education" className="container mx-auto py-40 px-6">
      <div className="flex flex-col items-center text-center mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-6 inline-flex px-4 py-1.5 rounded-full bg-accent-primary/5 border border-accent-primary/20"
        >
          <span className="text-accent-primary text-[10px] font-black uppercase tracking-[0.4em]">Milestones</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="heading-xl mb-6"
        >
          Academic <span className="gradient-text">Journey</span>
        </motion.h2>
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Central Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-primary via-accent-secondary to-transparent opacity-20 hidden md:block" />

        <div className="space-y-20 md:space-y-32">
          {education.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Year Bubble */}
              <div className="md:absolute md:left-1/2 md:-translate-x-1/2 z-20">
                <div className="w-16 h-16 rounded-2xl glass border-accent-primary/20 flex items-center justify-center shadow-xl shadow-accent-primary/5 group transition-all duration-500">
                  <GraduationCap size={24} className="text-accent-primary" />
                </div>
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-[42%] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-8 md:p-10 glass glass-hover rounded-[2.5rem] relative overflow-hidden"
                >
                  <span className="text-accent-primary font-black text-xs tracking-widest uppercase mb-4 block">
                    {item.year}
                  </span>
                  <h3 className="text-text-primary text-2xl md:text-3xl font-black mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-lg font-medium">
                    {item.description}
                  </p>
                  
                  {/* Background Number */}
                  <span className="absolute -bottom-4 -right-2 text-9xl font-black text-text-primary/[0.03] select-none pointer-events-none">
                    0{index + 1}
                  </span>
                </motion.div>
              </div>

              {/* Spacer for MD screens */}
              <div className="hidden md:block md:w-[42%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
