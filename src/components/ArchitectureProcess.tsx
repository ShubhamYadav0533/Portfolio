import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Shield, Globe } from 'lucide-react';

const steps = [
  {
    icon: Server,
    title: "System Design",
    description: "Architecting highly scalable, fault-tolerant infrastructures using modern design patterns and best practices."
  },
  {
    icon: Database,
    title: "Microservices",
    description: "Decoupling monolithic architectures into independent, highly cohesive, and deployable microservices."
  },
  {
    icon: Shield,
    title: "Security",
    description: "Implementing enterprise-grade security protocols, E2E encryption, and robust identity management systems."
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Deploying via Docker and Kubernetes to ensure seamless horizontal scaling and zero-downtime global availability."
  }
];

const ArchitectureProcess: React.FC = () => {
  return (
    <section className="container mx-auto py-20 px-6">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-6 inline-flex px-4 py-1.5 rounded-full bg-accent-primary/5 border border-accent-primary/20"
        >
          <span className="text-accent-primary text-[10px] font-black tracking-[0.4em]">Workflow</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6"
        >
          The <span className="gradient-text">Architecture</span> Process
        </motion.h2>
        <p className="text-text-secondary max-w-2xl text-lg font-medium leading-relaxed">
          How I approach building complex, enterprise-ready platforms from the ground up.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group p-8 rounded-[2rem] glass border border-text-primary/5 hover:border-accent-primary/50 transition-all duration-500 relative overflow-hidden"
            >
              {/* Hover glowing background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 dark:bg-black/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-text-primary/10 group-hover:border-accent-primary/30">
                  <Icon className="text-text-primary group-hover:text-accent-primary transition-colors duration-500" size={24} />
                </div>
                
                <h3 className="text-2xl font-black text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Floating Step Number */}
              <span className="absolute top-6 right-6 text-6xl font-black text-text-primary/[0.03] select-none pointer-events-none group-hover:text-accent-primary/10 transition-colors duration-500">
                0{index + 1}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ArchitectureProcess;
