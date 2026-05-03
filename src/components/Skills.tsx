import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data';
import { 
  Code2, 
  Database, 
  Globe, 
  Layers, 
  Cpu, 
  GitBranch, 
  Terminal, 
  Box, 
  Zap,
  Coffee,
  Cloud,
  Wind
} from 'lucide-react';

const iconMap: Record<string, any> = {
  "Java": Coffee,
  "JavaScript": Terminal,
  "Node.js": Zap,
  "CSS": Layers,
  "HTML": Globe,
  "React": Box,
  "GitHub": GitBranch,
  "C++": Cpu,
  "C": Code2,
  "MySQL": Database,
  "MongoDB": Cloud,
  "Tailwind CSS": Wind
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="container mx-auto py-32 px-6 perspective-2000">
      <div className="text-center mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 50, rotateX: -45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-black text-text-primary mb-6 tracking-tighter"
        >
          CORE <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">STACK</span>
        </motion.h2>
        <p className="text-text-secondary max-w-xl mx-auto text-lg">
          Transforming complex problems into elegant, three-dimensional digital solutions.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {skills.map((skill, index) => {
          const Icon = iconMap[skill.name] || Code2;
          
          return (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, z: -100, rotateY: 30 }}
              whileInView={{ opacity: 1, z: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 15, 
                rotateX: -10,
                translateZ: 50,
              }}
              className="group relative p-10 bg-card-bg border border-black/5 dark:border-white/10 backdrop-blur-xl rounded-[2.5rem] flex flex-col items-center justify-center gap-6 cursor-pointer preserve-3d transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-text-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity" />
              
              <div className="relative z-10 w-20 h-20 flex items-center justify-center bg-bg-primary/50 rounded-2xl border border-black/5 dark:border-white/10 group-hover:border-accent-primary/50 transition-colors shadow-inner">
                <Icon size={40} className="text-text-primary group-hover:text-accent-primary transition-colors" />
              </div>
              
              <div className="relative z-10 text-center">
                <h4 className="text-text-primary font-black text-lg tracking-widest uppercase mb-1">
                  {skill.name}
                </h4>
                <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-500 mx-auto rounded-full" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
