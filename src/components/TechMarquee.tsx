import React from 'react';
import { motion } from 'framer-motion';

const techList = [
  "React", "Node.js", "TypeScript", "MongoDB", "PostgreSQL", 
  "Docker", "Kubernetes", "GraphQL", "AWS", "Next.js", 
  "Tailwind CSS", "Redis", "Kafka", "Prisma", "Express"
];

const TechMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-10 bg-bg-primary/50 border-y border-text-primary/5 my-10">
      {/* Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-primary to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-primary to-transparent z-10" />

      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex gap-16 min-w-max px-8"
        >
          {/* Double the list for seamless infinite loop */}
          {[...techList, ...techList].map((tech, index) => (
            <span 
              key={index} 
              className="text-2xl md:text-4xl font-black text-text-primary/20 hover:text-accent-primary transition-colors duration-300 select-none uppercase tracking-widest"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechMarquee;
