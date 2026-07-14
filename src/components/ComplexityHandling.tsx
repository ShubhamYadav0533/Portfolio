import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, ShieldCheck } from 'lucide-react';

const ComplexityHandling: React.FC = () => {
  return (
    <section className="container mx-auto py-32 px-6">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-6 inline-flex px-4 py-1.5 rounded-full bg-accent-primary/5 border border-accent-primary/20"
        >
          <span className="text-accent-primary text-[10px] font-black tracking-[0.4em]">Engineering</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6"
        >
          Mastering <span className="gradient-text">Complexity</span>
        </motion.h2>
        <p className="text-text-secondary max-w-2xl text-lg font-medium leading-relaxed">
          I thrive in building resilient systems that handle massive concurrency, intensive computations, and strict security compliance without breaking a sweat.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Scalability */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative p-8 glass glass-hover rounded-[2rem] border border-text-primary/5 hover:border-accent-primary/30 transition-all duration-500 overflow-hidden flex flex-col"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/5 dark:bg-black/20 flex items-center justify-center mb-6 border border-text-primary/10 group-hover:border-accent-primary/30 transition-colors duration-500">
              <Activity className="text-text-primary group-hover:text-accent-primary transition-colors duration-500" size={24} />
            </div>
            <h3 className="text-2xl font-black text-text-primary mb-3">
              Infinite Scalability
            </h3>
            <p className="text-text-secondary text-sm font-medium leading-relaxed mb-6">
              Designing distributed systems utilizing stateless microservices and dynamic horizontal pod autoscaling to seamlessly absorb massive traffic spikes.
            </p>
          </div>
          
          <div className="mt-auto relative z-10 flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-white/5 dark:bg-black/20 border border-text-primary/10 rounded-lg text-[10px] font-black tracking-widest text-text-tertiary">Kubernetes</span>
            <span className="px-3 py-1 bg-white/5 dark:bg-black/20 border border-text-primary/10 rounded-lg text-[10px] font-black tracking-widest text-text-tertiary">Docker</span>
          </div>
        </motion.div>

        {/* Performance Optimization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="group relative p-8 glass glass-hover rounded-[2rem] border border-text-primary/5 hover:border-accent-primary/30 transition-all duration-500 overflow-hidden flex flex-col"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/5 dark:bg-black/20 flex items-center justify-center mb-6 border border-text-primary/10 group-hover:border-accent-primary/30 transition-colors duration-500">
              <Cpu className="text-text-primary group-hover:text-accent-primary transition-colors duration-500" size={24} />
            </div>
            <h3 className="text-2xl font-black text-text-primary mb-3">
              Sub-second Latency
            </h3>
            <p className="text-text-secondary text-sm font-medium leading-relaxed mb-6">
              Optimizing database queries, implementing multi-layer caching strategies, and utilizing edge networks to ensure instantaneous response times globally.
            </p>
          </div>

          <div className="mt-auto relative z-10 flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-white/5 dark:bg-black/20 border border-text-primary/10 rounded-lg text-[10px] font-black tracking-widest text-text-tertiary">Redis</span>
            <span className="px-3 py-1 bg-white/5 dark:bg-black/20 border border-text-primary/10 rounded-lg text-[10px] font-black tracking-widest text-text-tertiary">CDN</span>
          </div>
        </motion.div>

        {/* Security Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="group relative p-8 glass glass-hover rounded-[2rem] border border-text-primary/5 hover:border-accent-primary/30 transition-all duration-500 overflow-hidden flex flex-col"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/5 dark:bg-black/20 flex items-center justify-center mb-6 border border-text-primary/10 group-hover:border-accent-primary/30 transition-colors duration-500">
              <ShieldCheck className="text-text-primary group-hover:text-accent-primary transition-colors duration-500" size={24} />
            </div>
            <h3 className="text-2xl font-black text-text-primary mb-3">
              Zero-Trust Security
            </h3>
            <p className="text-text-secondary text-sm font-medium leading-relaxed mb-6">
              Engineering secure platforms with end-to-end encryption, strict role-based access controls (RBAC), and robust protection against OWASP top 10 vulnerabilities.
            </p>
          </div>

          <div className="mt-auto relative z-10 flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-white/5 dark:bg-black/20 border border-text-primary/10 rounded-lg text-[10px] font-black tracking-widest text-text-tertiary">JWT/OAuth</span>
            <span className="px-3 py-1 bg-white/5 dark:bg-black/20 border border-text-primary/10 rounded-lg text-[10px] font-black tracking-widest text-text-tertiary">E2EE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplexityHandling;
