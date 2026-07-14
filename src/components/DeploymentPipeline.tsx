import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Database, Globe, Layers, Shield, X, ArrowRight, ChevronDown } from 'lucide-react';

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
    title: "CI/CD pipeline",
    subtitle: "GitHub Actions",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    position: "left-[25%] top-[20%]",
    details: {
      overview: "Automated linting, testing, and Docker image building upon every code push.",
      problemSolved: "Prevents broken code from reaching production. Eliminates manual deployment errors and ensures strict code quality checks before any infrastructure modification.",
      technologies: ["GitHub Actions", "Docker", "Jest", "SonarQube"]
    }
  },
  {
    id: "edge",
    icon: Globe,
    title: "Edge network",
    subtitle: "AWS CloudFront",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    position: "left-[75%] top-[20%]",
    details: {
      overview: "Global Content Delivery Network (CDN) coupled with Web Application Firewall (WAF).",
      problemSolved: "Drastically reduces global latency by caching static assets at edge locations. Protects backend systems from massive DDoS attacks and malicious bot traffic.",
      technologies: ["AWS CloudFront", "AWS WAF", "Route53"]
    }
  },
  {
    id: "gateway",
    icon: Shield,
    title: "API gateway",
    subtitle: "Load balancer",
    color: "from-lime-500/20 to-emerald-500/20 border-lime-500/30 text-lime-400",
    position: "left-[50%] top-[50%]",
    details: {
      overview: "The central nervous system for traffic routing, rate limiting, and SSL termination.",
      problemSolved: "Handles sudden traffic spikes smoothly without crashing backend services. Provides a unified entry point, abstracting internal microservice complexity from clients.",
      technologies: ["AWS ALB", "Nginx", "Kong API Gateway"]
    }
  },
  {
    id: "compute",
    icon: Layers,
    title: "Compute cluster",
    subtitle: "AWS EKS (K8s)",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    position: "left-[37%] top-[80%]",
    details: {
      overview: "Elastic Kubernetes Service managing containerized microservices across multiple availability zones.",
      problemSolved: "Ensures Zero-Downtime deployments via Rolling Updates. Automatically scales pods horizontally based on CPU/Memory metrics (HPA), and handles node failures transparently.",
      technologies: ["Kubernetes", "Docker", "Helm", "Prometheus"]
    }
  },
  {
    id: "data",
    icon: Database,
    title: "Data layer",
    subtitle: "AWS RDS and Redis",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    position: "left-[63%] top-[80%]",
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
      <div className="relative w-full max-w-5xl mx-auto h-[600px] bg-[#07110e] rounded-[2.5rem] border border-[#142e27] overflow-hidden hidden md:block shadow-2xl">
        
        {/* Background Grid */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(16,185,129,0.07) 1px, transparent 1px)', backgroundSize: '35px 35px' }}></div>
        
        {/* Central Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* SVG Connections & Pulses */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <defs>
            <filter id="pulseGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection 1: CI/CD (ci) -> Compute (compute) */}
          <motion.path 
            d="M 250 166 L 370 454" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="1.5"
            strokeOpacity="0.15"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <circle r="3.5" fill="#34d399" filter="url(#pulseGlow)">
            <animateMotion dur="4.2s" repeatCount="indefinite" path="M 250 166 L 370 454" />
          </circle>

          {/* Connection 2: CI/CD (ci) -> Gateway (gateway) */}
          <motion.path 
            d="M 250 166 L 500 274" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="1.5"
            strokeOpacity="0.15"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.1, ease: "easeInOut" }}
          />
          <circle r="3.5" fill="#34d399" filter="url(#pulseGlow)">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M 250 166 L 500 274" />
          </circle>

          {/* Connection 3: Edge (edge) -> Gateway (gateway) */}
          <motion.path 
            d="M 750 166 L 500 274" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="1.5"
            strokeOpacity="0.15"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
          />
          <circle r="3.5" fill="#34d399" filter="url(#pulseGlow)">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M 750 166 L 500 274" />
          </circle>

          {/* Connection 4: Edge (edge) -> Data (data) */}
          <motion.path 
            d="M 750 166 L 630 454" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="1.5"
            strokeOpacity="0.15"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />
          <circle r="3.5" fill="#34d399" filter="url(#pulseGlow)">
            <animateMotion dur="4.8s" repeatCount="indefinite" path="M 750 166 L 630 454" />
          </circle>

          {/* Connection 5: Gateway (gateway) -> Compute (compute) */}
          <motion.path 
            d="M 500 346 L 370 454" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="1.5"
            strokeOpacity="0.15"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
          />
          <circle r="3.5" fill="#34d399" filter="url(#pulseGlow)">
            <animateMotion dur="3.5s" repeatCount="indefinite" path="M 500 346 L 370 454" />
          </circle>

          {/* Connection 6: Gateway (gateway) -> Data (data) */}
          <motion.path 
            d="M 500 346 L 630 454" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="1.5"
            strokeOpacity="0.15"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
          <circle r="3.5" fill="#34d399" filter="url(#pulseGlow)">
            <animateMotion dur="3.8s" repeatCount="indefinite" path="M 500 346 L 630 454" />
          </circle>

          {/* Connection Ports (Glowing dots at borders) */}
          <circle cx="250" cy="166" r="4.5" fill="#10b981" filter="url(#pulseGlow)" />
          <circle cx="750" cy="166" r="4.5" fill="#10b981" filter="url(#pulseGlow)" />
          <circle cx="500" cy="274" r="4.5" fill="#10b981" filter="url(#pulseGlow)" />
          <circle cx="500" cy="346" r="4.5" fill="#10b981" filter="url(#pulseGlow)" />
          <circle cx="370" cy="454" r="4.5" fill="#10b981" filter="url(#pulseGlow)" />
          <circle cx="630" cy="454" r="4.5" fill="#10b981" filter="url(#pulseGlow)" />
        </svg>

        {/* Cards */}
        {nodes.map((node) => {
          const isGateway = node.id === 'gateway';
          
          const cardBorderClass = isGateway 
            ? "border-lime-500/30 hover:border-lime-400 hover:shadow-lime-500/20" 
            : "border-emerald-500/30 hover:border-emerald-400 hover:shadow-emerald-500/20";
            
          const cardBgClass = isGateway 
            ? "bg-[#182a06]/85" 
            : "bg-[#041d16]/85";
            
          const subtitleColor = isGateway 
            ? "text-lime-400/80" 
            : "text-emerald-400/80";

          return (
            <div key={node.id} className={`absolute ${node.position} -translate-x-1/2 -translate-y-1/2 z-20`}>
              <motion.button
                onClick={() => setActiveNode(node)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className={`w-64 h-[72px] rounded-2xl ${cardBgClass} border-2 ${cardBorderClass} flex flex-col items-center justify-center p-4 transition-all duration-300 shadow-xl cursor-pointer`}
              >
                <p className="font-bold text-white text-base tracking-tight mb-1">{node.title}</p>
                <p className={`font-semibold ${subtitleColor} text-xs tracking-wide`}>{node.subtitle}</p>
              </motion.button>
            </div>
          );
        })}

        {/* Down Arrow / Scroll Indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full bg-slate-900 border border-[#142e27] flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] z-30">
          <ChevronDown size={20} />
        </div>
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

