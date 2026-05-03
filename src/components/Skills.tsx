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
  Figma,
  Cloud
} from 'lucide-react';

// Map skill names to icons if images are removed
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
  "Tailwind CSS": Figma // Using Figma icon as a placeholder for creative styling if needed, or just Layers
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
          className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter"
        >
          CORE <span className="bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] bg-clip-text text-transparent">STACK</span>
        </motion.h2>
        <p className="text-white/40 max-w-xl mx-auto text-lg">
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
                boxShadow: "0 25px 50px -12px rgba(0, 210, 255, 0.25)"
              }}
              className="group relative p-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] flex flex-col items-center justify-center gap-6 cursor-pointer preserve-3d transition-all duration-300"
            >
              {/* 3D Depth Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity" />
              
              {/* Icon in 3D */}
              <div className="relative z-10 w-20 h-20 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 group-hover:border-[#00d2ff]/50 transition-colors shadow-inner">
                <Icon size={40} className="text-white group-hover:text-[#00d2ff] transition-colors" />
              </div>
              
              <div className="relative z-10 text-center">
                <h4 className="text-white font-black text-lg tracking-widest uppercase mb-1">
                  {skill.name}
                </h4>
                <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] transition-all duration-500 mx-auto rounded-full" />
              </div>

              {/* Floating Reflection */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
