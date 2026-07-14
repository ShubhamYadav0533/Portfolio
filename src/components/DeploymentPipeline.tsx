import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Server, Database, Globe, Layers, Shield, X, ArrowRight } from 'lucide-react';

interface NodeData {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
  position: string; 
  details: {
    overview: string;
    problemSolved: string;
    technologies: string[];
  }
}

const nodes: NodeData[] = [
  {
    id: "ci",
    icon: Github,
    title: "CI/CD Pipeline",
    subtitle: "GitHub Actions",
    color: "text-blue-400",
    position: "top-[15%] left-[15%]",
    details: {
      overview: "Automated linting, testing, and Docker image building upon every code push.",
      problemSolved: "Prevents broken code from reaching production. Eliminates manual deployment errors and ensures strict code quality checks before any infrastructure modification.",
      technologies: ["GitHub Actions", "Docker", "Jest", "SonarQube"]
    }
  },
  {
    id: "edge",
    icon: Globe,
    title: "Edge Network",
    subtitle: "AWS CloudFront",
    color: "text-purple-400",
    position: "top-[15%] right-[15%]",
    details: {
      overview: "Global Content Delivery Network (CDN) coupled with Web Application Firewall (WAF).",
      problemSolved: "Drastically reduces global latency by caching static assets at edge locations. Protects backend systems from massive DDoS attacks and malicious bot traffic.",
      technologies: ["AWS CloudFront", "AWS WAF", "Route53"]
    }
  },
  {
    id: "gateway",
    icon: Shield,
    title: "API Gateway",
    subtitle: "Load Balancer",
    color: "text-emerald-400",
    position: "top-[50%] left-[50%]",
    details: {
      overview: "The central nervous system for traffic routing, rate limiting, and SSL termination.",
      problemSolved: "Handles sudden traffic spikes smoothly without crashing backend services. Provides a unified entry point, abstracting internal microservice complexity from clients.",
      technologies: ["AWS ALB", "Nginx", "Kong API Gateway"]
    }
  },
  {
    id: "compute",
    icon: Layers,
    title: "Compute Cluster",
    subtitle: "AWS EKS (K8s)",
    color: "text-accent-primary",
    position: "bottom-[15%] left-[25%]",
    details: {
      overview: "Elastic Kubernetes Service managing containerized microservices across multiple availability zones.",
      problemSolved: "Ensures Zero-Downtime deployments via Rolling Updates. Automatically scales pods horizontally based on CPU/Memory metrics (HPA), and handles node failures transparently.",
      technologies: ["Kubernetes", "Docker", "Helm", "Prometheus"]
    }
  },
  {
    id: "data",
    icon: Database,
    title: "Data Layer",
    subtitle: "AWS RDS & Redis",
    color: "text-rose-400",
    position: "bottom-[15%] right-[25%]",
    details: {
      overview: "Multi-AZ PostgreSQL cluster coupled with Redis for high-speed in-memory caching.",
      problemSolved: "Prevents database bottlenecks by offloading read-heavy queries to Redis. Multi-AZ replication ensures data remains safe and instantly available even during complete datacenter failure.",
      technologies: ["PostgreSQL", "Redis", "AWS RDS", "Prisma"]
    }
  }
];

const DeploymentPipeline: React.FC = () => {
  const [activeNode, setActiveNode] = useState<NodeData | null>(null);

  return (
    <section className="container mx-auto py-24 px-6 relative">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-6 inline-flex px-4 py-1.5 rounded-full bg-accent-primary/5 border border-accent-primary/20"
        >
          <span className="text-accent-primary text-[10px] font-black tracking-[0.4em]">Architecture</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6"
        >
          Cloud <span className="gradient-text">Topology</span>
        </motion.h2>
        <p className="text-text-secondary max-w-2xl text-lg font-medium leading-relaxed">
          Interactive deep dive into how I engineer, deploy, and scale enterprise applications. Click any node to explore technical specifics.
        </p>
      </div>

      {/* Interactive Topology Area (Desktop) */}
      <div className="relative w-full max-w-5xl mx-auto h-[800px] md:h-[600px] glass rounded-[3rem] border border-text-primary/10 overflow-hidden hidden md:block">
        
        {/* Background Grid */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }}></div>
        
        {/* Animated SVG Connections (Circuit Wires) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(44,230,124,0.3))' }}>
          {/* Wire from CI to Gateway */}
          <motion.path 
            d="M 15% 15% L 50% 15% L 50% 50%" 
            fill="transparent" 
            stroke="url(#wireGradient)" 
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {/* Signal from CI to Gateway */}
          <motion.circle r="4" fill="#2ce67c" style={{ filter: 'blur(2px)' }}>
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path="M 15% 15% L 50% 15% L 50% 50%"
            />
          </motion.circle>

          {/* Wire from Gateway to Edge */}
          <motion.path 
            d="M 50% 50% L 85% 50% L 85% 15%" 
            fill="transparent" 
            stroke="url(#wireGradient)" 
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
          />
          <motion.circle r="4" fill="#2ce67c" style={{ filter: 'blur(2px)' }}>
            <animateMotion dur="4s" repeatCount="indefinite" path="M 50% 50% L 85% 50% L 85% 15%" />
          </motion.circle>

          {/* Wire from Gateway to Compute */}
          <motion.path 
            d="M 50% 50% L 50% 85% L 25% 85%" 
            fill="transparent" 
            stroke="url(#wireGradient)" 
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.circle r="4" fill="#2ce67c" style={{ filter: 'blur(2px)' }}>
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 50% 50% L 50% 85% L 25% 85%" />
          </motion.circle>

          {/* Wire from Compute to Data */}
          <motion.path 
            d="M 25% 85% L 75% 85%" 
            fill="transparent" 
            stroke="url(#wireGradient)" 
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
          />
          <motion.circle r="4" fill="#2ce67c" style={{ filter: 'blur(2px)' }}>
            <animateMotion dur="3s" repeatCount="indefinite" path="M 25% 85% L 75% 85%" />
          </motion.circle>
          
          <defs>
            <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(44,230,124,0.1)" />
              <stop offset="50%" stopColor="rgba(44,230,124,0.6)" />
              <stop offset="100%" stopColor="rgba(44,230,124,0.1)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const Icon = node.icon;
          return (
            <div key={node.id} className={`absolute ${node.position} -translate-x-1/2 -translate-y-1/2`}>
              <motion.button
                onClick={() => setActiveNode(node)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group flex flex-col items-center gap-4 z-20"
              >
                {/* Glowing ring */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-accent-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Hardware Node UI */}
                <div className="w-24 h-24 rounded-2xl bg-bg-primary border border-text-primary/10 group-hover:border-accent-primary/50 flex items-center justify-center relative shadow-2xl transition-colors duration-300">
                  <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center border border-white/5">
                    <Icon className={`${node.color} drop-shadow-md group-hover:text-accent-primary transition-colors`} size={32} />
                  </div>
                </div>
                
                {/* Label */}
                <div className="text-center bg-bg-primary/90 backdrop-blur-md px-5 py-2.5 rounded-xl border border-text-primary/10 shadow-xl">
                  <p className="font-black text-text-primary text-sm whitespace-nowrap leading-tight mb-1">{node.title}</p>
                  <p className="font-bold text-text-tertiary text-[10px] tracking-widest uppercase leading-none">{node.subtitle}</p>
                </div>
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Mobile Fallback Layout (List view) */}
      <div className="md:hidden flex flex-col gap-6">
        {nodes.map((node) => (
          <button 
            key={node.id}
            onClick={() => setActiveNode(node)}
            className="w-full text-left p-6 glass rounded-3xl border border-text-primary/10 flex items-center gap-5 active:scale-95 transition-transform shadow-lg"
          >
            <div className={`w-16 h-16 rounded-2xl bg-bg-primary flex flex-shrink-0 items-center justify-center border border-text-primary/10 shadow-inner ${node.color}`}>
              <node.icon size={28} />
            </div>
            <div>
              <p className="font-black text-text-primary text-lg">{node.title}</p>
              <p className="font-bold text-text-tertiary text-xs tracking-widest uppercase mt-1">{node.subtitle}</p>
            </div>
            <ArrowRight className="ml-auto text-text-primary/30" />
          </button>
        ))}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {activeNode && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveNode(null)}
              className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-bg-primary border border-text-primary/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <button 
                onClick={() => setActiveNode(null)}
                className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-text-secondary hover:text-text-primary transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-6 mb-10 relative z-10">
                <div className={`w-20 h-20 shrink-0 rounded-2xl bg-bg-primary flex items-center justify-center border border-text-primary/10 shadow-xl ${activeNode.color}`}>
                  <activeNode.icon size={36} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight leading-tight">{activeNode.title}</h3>
                  <p className="text-accent-primary font-bold tracking-widest text-xs uppercase mt-2">{activeNode.subtitle}</p>
                </div>
              </div>

              <div className="space-y-8 relative z-10">
                <div>
                  <h4 className="text-text-primary font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                    Architecture Detail
                  </h4>
                  <p className="text-text-secondary leading-relaxed font-medium">
                    {activeNode.details.overview}
                  </p>
                </div>

                <div>
                  <h4 className="text-text-primary font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(44,230,124,0.8)]" />
                    Problem Solved
                  </h4>
                  <p className="text-text-primary leading-relaxed font-medium bg-accent-primary/10 p-6 rounded-2xl border border-accent-primary/20">
                    {activeNode.details.problemSolved}
                  </p>
                </div>

                <div>
                  <h4 className="text-text-primary font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeNode.details.technologies.map(tech => (
                      <span key={tech} className="px-4 py-2 bg-white/5 border border-text-primary/10 rounded-xl text-xs font-black tracking-widest text-text-secondary shadow-inner">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default DeploymentPipeline;
