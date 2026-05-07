import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import { projects } from '../data';
import { ExternalLink, Github, ArrowRight, Tag } from 'lucide-react';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))];

  const filtered = filter === 'All' ? projects : projects.filter(p => p.tags.includes(filter));

  return (
    <div className="relative text-text-primary selection:bg-accent-primary/30 transition-colors duration-500 min-h-screen">
      <Background />
      <Navbar />
      <main className="relative z-10 container mx-auto px-6 pt-48 pb-24">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 inline-flex px-4 py-1.5 rounded-full bg-accent-primary/5 border border-accent-primary/20"
          >
            <span className="text-accent-primary text-[10px] font-black uppercase tracking-[0.4em]">Portfolio</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="heading-xl mb-6"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h1>
          <p className="text-text-secondary text-lg max-w-2xl font-medium leading-relaxed">
            A showcase of my recent work, blending design thinking with powerful engineering.
          </p>
        </div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-20"
        >
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border transition-all duration-300 active:scale-95 ${
                filter === tag
                  ? 'bg-text-primary text-bg-primary border-transparent shadow-xl'
                  : 'glass border-glass-border text-text-secondary hover:border-accent-primary/40'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative p-10 glass glass-hover rounded-[3rem] flex flex-col h-full overflow-hidden"
              >
                {/* Glow Backdrop */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${project.color}10, transparent 70%)`,
                  }}
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white/50 dark:bg-black/20 border border-glass-border text-text-tertiary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-3xl font-black text-text-primary mb-4 group-hover:text-accent-primary transition-colors relative z-10 leading-tight">
                  {project.title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-10 text-lg font-medium relative z-10">
                  {project.description}
                </p>

                {/* Bottom Section */}
                <div className="mt-auto pt-8 border-t border-glass-border flex items-center justify-between relative z-10">
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-tertiary hover:text-text-primary transition-colors p-1"
                      aria-label="View Github"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.link}
                      className="text-text-tertiary hover:text-accent-primary transition-colors p-1"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                  
                  <a
                    href={project.link}
                    className="flex items-center gap-2 text-text-primary font-black text-[10px] uppercase tracking-widest group/btn"
                  >
                    Details <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Projects;
