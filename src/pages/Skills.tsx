import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import { skills } from '../data';
import { Server, Shield, Zap, Activity } from 'lucide-react';
import javaImg from '../assets/java.png';
import javascriptImg from '../assets/javascript.webp';
import nodejsImg from '../assets/nodejs.webp';
import cssImg from '../assets/CSS.png';
import htmlImg from '../assets/html.webp';
import reactImg from '../assets/React.png';
import gitImg from '../assets/git.png';
import cppImg from '../assets/C++.png';
import cImg from '../assets/C_Logo.png';
import mysqlImg from '../assets/Mysql_logo.png';
import mongodbImg from '../assets/MongoDB.png';
import tailwindImg from '../assets/Tailwind.png';

const assetMap: Record<string, string> = {
  "java.png": javaImg,
  "javascript.webp": javascriptImg,
  "nodejs.webp": nodejsImg,
  "CSS.png": cssImg,
  "html.webp": htmlImg,
  "React.png": reactImg,
  "git.png": gitImg,
  "C++.png": cppImg,
  "C_Logo.png": cImg,
  "Mysql_logo.png": mysqlImg,
  "MongoDB.png": mongodbImg,
  "Tailwind.png": tailwindImg,
};

const Skills: React.FC = () => {
  return (
    <div className="relative text-text-primary selection:bg-accent-primary/30 transition-colors duration-500 min-h-screen">
      <Background />
      <Navbar />
      
      <main className="relative z-10 container mx-auto px-6 pt-48 pb-24">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 inline-flex px-4 py-1.5 rounded-full bg-accent-primary/5 border border-accent-primary/20"
          >
            <span className="text-accent-primary text-[10px] font-black tracking-[0.4em]">Expertise</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="heading-xl mb-6"
          >
            System <span className="gradient-text">Architecture</span>
          </motion.h1>
          <p className="text-text-secondary text-lg max-w-2xl font-medium leading-relaxed">
            I engineer complex, highly scalable systems capable of handling massive workloads with robust security and real-time synchronization.
          </p>
        </div>

        {/* Complexity Showcase Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2.5rem] glass border border-accent-primary/20 hover:border-accent-primary/50 transition-colors duration-500 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Zap className="text-accent-primary" size={28} />
            </div>
            <h3 className="text-4xl font-black text-text-primary mb-2">High Volume</h3>
            <p className="text-sm font-bold text-accent-primary tracking-widest uppercase mb-4">Traffic Scaling</p>
            <p className="text-text-secondary font-medium leading-relaxed">
              Designed architecture optimized for high-throughput, supporting millions of concurrent requests with sub-second latency and zero downtime.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-[2.5rem] glass border border-accent-primary/20 hover:border-accent-primary/50 transition-colors duration-500 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Server className="text-accent-primary" size={28} />
            </div>
            <h3 className="text-4xl font-black text-text-primary mb-2">Distributed</h3>
            <p className="text-sm font-bold text-accent-primary tracking-widest uppercase mb-4">Microservices</p>
            <p className="text-text-secondary font-medium leading-relaxed">
              Built fault-tolerant, decentralized backend systems using Docker and Kubernetes to ensure seamless horizontal scaling across data centers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-[2.5rem] glass border border-accent-primary/20 hover:border-accent-primary/50 transition-colors duration-500 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Shield className="text-accent-primary" size={28} />
            </div>
            <h3 className="text-4xl font-black text-text-primary mb-2">Secure</h3>
            <p className="text-sm font-bold text-accent-primary tracking-widest uppercase mb-4">Data Integrity</p>
            <p className="text-text-secondary font-medium leading-relaxed">
              Implemented enterprise-grade security protocols, E2E encryption, and strict identity management to protect highly sensitive architecture.
            </p>
          </motion.div>
        </div>

        {/* Technology Grid */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tighter mb-4"
          >
            Core Technology Stack
          </motion.h2>
          <p className="text-text-secondary text-lg font-medium">Tools & languages I use to build scalable products.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative p-8 glass glass-hover rounded-[2.5rem] flex flex-col items-center justify-center gap-6 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 w-24 h-24 p-4 flex items-center justify-center bg-white/5 dark:bg-black/20 rounded-3xl group-hover:scale-110 transition-all duration-500">
                <img 
                  src={assetMap[skill.icon]} 
                  alt={skill.name} 
                  className="w-full h-full object-contain filter drop-shadow-xl"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-xs font-bold">${skill.name}</span>`;
                  }}
                />
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
          ))}
        </div>
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

export default Skills;
