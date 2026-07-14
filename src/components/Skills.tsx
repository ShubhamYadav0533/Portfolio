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
 <section id="skills" className="container mx-auto py-40 px-6">
 <div className="flex flex-col items-center text-center mb-24">
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 className="mb-6 inline-flex px-4 py-1.5 rounded-full bg-accent-primary/5 border border-accent-primary/20"
 >
 <span className="text-accent-primary text-[10px] font-black tracking-[0.4em]">Expertise</span>
 </motion.div>
 
 <motion.h2 
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="heading-xl mb-6"
 >
 Core <span className="gradient-text">Stack</span>
 </motion.h2>
 <p className="text-text-secondary max-w-2xl text-lg font-medium leading-relaxed">
 I specialize in building robust and scalable applications using modern technologies and industry best practices.
 </p>
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
 {skills.map((skill, index) => {
 const Icon = iconMap[skill.name] || Code2;
 
 return (
 <motion.div 
 key={index} 
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: index * 0.05 }}
 className="group relative p-8 glass glass-hover rounded-[2.5rem] flex flex-col items-center justify-center gap-6 cursor-pointer overflow-hidden"
 >
 <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 
 <div className="relative z-10 w-20 h-20 flex items-center justify-center bg-white dark:bg-bg-secondary rounded-3xl shadow-xl shadow-black/5 group-hover:scale-110 group-hover:shadow-accent-primary/20 transition-all duration-500">
 <Icon size={36} className="text-text-primary group-hover:text-accent-primary transition-colors" />
 </div>
 
 <div className="relative z-10 text-center">
 <h4 className="text-text-primary font-black text-xs tracking-[0.2em] mb-1">
 {skill.name}
 </h4>
 <div className="flex justify-center gap-1">
 <div className="h-0.5 w-4 bg-accent-primary/30 rounded-full group-hover:w-8 group-hover:bg-accent-primary transition-all duration-500" />
 </div>
 </div>
 </motion.div>
 );
 })}
 </div>
 </section>
 );
};

export default Skills;
