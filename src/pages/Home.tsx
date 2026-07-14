import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ArchitectureProcess from '../components/ArchitectureProcess';
import ComplexityHandling from '../components/ComplexityHandling';
import DeploymentPipeline from '../components/DeploymentPipeline';
import Background from '../components/Background';
import { projects } from '../data';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';

const FeaturedProjects: React.FC = () => {
 const featured = projects.filter(p => p.featured);
 return (
 <section className="container mx-auto py-40 px-6">
 <motion.div
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
 >
 <div>
 <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-text-primary ">
 Featured <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Projects</span>
 </h2>
 </div>
 <Link
 to="/projects"
 className="inline-flex items-center gap-3 text-text-secondary hover:text-accent-primary font-bold tracking-widest text-sm transition-colors group"
 >
 View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
 </Link>
 </motion.div>

 <div className="grid md:grid-cols-2 gap-8">
 {featured.map((project, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 60 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.15 }}
 whileHover={{ y: -6 }}
 className="group relative p-10 bg-card-bg border border-text-primary/5 rounded-[2.5rem] backdrop-blur-xl hover:border-accent-primary/30 transition-all duration-500 overflow-hidden"
 >
 <div
 className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]"
 style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.color}12, transparent 70%)` }}
 />
 
 <h3 className="text-3xl font-black text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
 {project.title}
 </h3>
 <p className="text-text-secondary leading-relaxed mb-8">{project.description}</p>
 <div className="flex gap-3">
 
 <a href={project.link}
 className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border border-accent-primary/20 text-accent-primary text-sm font-bold transition-all">
 <ExternalLink size={15} /> Demo
 </a>
 </div>
 </motion.div>
 ))}
 </div>
 </section>
 );
};

const Home: React.FC = () => {
 return (
 <div className="relative text-text-primary selection:bg-accent-primary/30 transition-colors duration-500">
 <Background />
 <Navbar />
 <main className="relative z-10">
 <Hero />
 <ArchitectureProcess />
 <FeaturedProjects />
 <ComplexityHandling />
 <DeploymentPipeline />
 </main>

 <footer className="container mx-auto py-12 px-6 border-t border-black/10 dark:border-white/10 text-center transition-colors duration-500">
 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
 <p className="text-text-secondary/40 text-sm font-bold tracking-widest ">
 © {new Date().getFullYear()} Shubham Yadav | Crafted with Passion
 </p>
 <div className="flex gap-8 text-text-secondary/40 text-xs font-bold tracking-[0.2em]">
 <Link to="/about" className="hover:text-text-primary transition-colors">About</Link>
 <Link to="/projects" className="hover:text-text-primary transition-colors">Projects</Link>
 <Link to="/contact" className="hover:text-text-primary transition-colors">Contact</Link>
 </div>
 </div>
 </footer>
 </div>
 );
};

export default Home;
