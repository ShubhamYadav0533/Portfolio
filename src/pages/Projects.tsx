import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import { projects } from '../data';
import { ExternalLink, Github, Tag } from 'lucide-react';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))];

  const filtered = filter === 'All' ? projects : projects.filter(p => p.tags.includes(filter));

  return (
    <div className="relative text-text-primary selection:bg-accent-primary/30 transition-colors duration-500 min-h-screen">
      <Background />
      <Navbar />
      <main className="relative z-10 container mx-auto px-6 pt-40 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-accent-primary font-bold text-sm tracking-[0.3em] uppercase mb-4">Portfolio</p>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-text-primary leading-tight mb-6">
            Featured{' '}
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Work
            </span>
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            A curated selection of projects that demonstrate my expertise in building scalable, modern applications.
          </p>
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-5 py-2 rounded-xl font-bold text-sm uppercase tracking-wider border transition-all duration-300 ${
                filter === tag
                  ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-transparent'
                  : 'border-text-primary/10 text-text-secondary bg-card-bg hover:border-accent-primary/40'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -8, rotateX: 4 }}
              className="group relative p-8 bg-card-bg border border-text-primary/5 rounded-[2rem] backdrop-blur-xl hover:border-accent-primary/30 transition-all duration-500 preserve-3d cursor-pointer overflow-hidden"
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${project.color}15, transparent 70%)`,
                }}
              />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
              />

              {/* Featured badge */}
              {project.featured && (
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                  <span className="text-accent-primary text-xs font-bold tracking-wider uppercase">Featured</span>
                </div>
              )}

              <h3 className="text-2xl font-black text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6 text-sm">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-bg-primary/40 text-text-secondary border border-text-primary/5"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-text-primary/10 bg-bg-primary/30 text-text-secondary hover:text-text-primary hover:border-text-primary/30 transition-all text-sm font-bold"
                >
                  <Github size={15} /> Code
                </a>
                <a
                  href={project.link}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border border-accent-primary/20 text-accent-primary hover:border-accent-primary/50 transition-all text-sm font-bold"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
