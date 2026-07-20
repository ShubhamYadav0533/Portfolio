import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Database, ShieldAlert, BarChart3 } from 'lucide-react';

const challenges = [
  {
    id: 1,
    title: "Distributed Data Race Conditions",
    difficulty: "Extreme",
    difficultyColor: "bg-red-500/10 text-red-500 border-red-500/20",
    hoverBorder: "hover:border-red-500/50",
    icon: <AlertTriangle className="text-red-500" size={24} />,
    danger: "Concurrent updates across microservices in ERP systems leading to phantom reads and corrupt financial ledgers.",
    solution: "Implemented distributed locking using Redis Redlock and Event Sourcing to maintain immutable audit trails and ensure eventual consistency.",
    metrics: { severity: 95, probability: 85, complexity: 90 },
    color: "#ef4444"
  },
  {
    id: 2,
    title: "High-Volume Event Bottlenecks",
    difficulty: "High",
    difficultyColor: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    hoverBorder: "hover:border-orange-500/50",
    icon: <Database className="text-orange-500" size={24} />,
    danger: "Massive spikes in webhook payloads crashing CRM synchronization queues and dropping critical customer data.",
    solution: "Decoupled monolithic processing by introducing Kafka message brokers with dead-letter queues and auto-scaling consumer groups.",
    metrics: { severity: 80, probability: 75, complexity: 70 },
    color: "#f97316"
  },
  {
    id: 3,
    title: "Multi-Tenant Data Isolation Leaks",
    difficulty: "Advanced",
    difficultyColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    hoverBorder: "hover:border-purple-500/50",
    icon: <ShieldAlert className="text-purple-500" size={24} />,
    danger: "Improperly scoped queries exposing sensitive corporate data across different tenants in a shared database architecture.",
    solution: "Enforced Row-Level Security (RLS) at the database level and injected tenant-specific connection contexts on every API request.",
    metrics: { severity: 98, probability: 45, complexity: 85 },
    color: "#a855f7"
  }
];

const EnterpriseChallenges: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'severity' | 'probability' | 'complexity'>('severity');

  const metricDescriptions = {
    severity: "Potential impact on business continuity, financial accuracy, and data compliance if the issue occurs.",
    probability: "Likelihood of encountering this vulnerability in a standard, high-scale multi-tenant environment.",
    complexity: "Relative engineering effort, architectural planning, and testing required to implement a robust resolution."
  };

  return (
    <section className="container mx-auto pb-40 px-6">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-text-primary"
        >
          Enterprise <span className="gradient-text">Challenges</span>
        </motion.h2>
        <p className="text-text-secondary text-lg font-medium max-w-2xl">
          Critical issues resolved in large-scale ERP & CRM deployments.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {challenges.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: c.id * 0.1 }}
            className={`p-8 rounded-[2rem] bg-card-bg border border-text-primary/10 ${c.hoverBorder} transition-colors duration-500 group relative overflow-hidden backdrop-blur-xl`}
          >
            <div className="absolute top-0 right-0 p-4">
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${c.difficultyColor}`}>
                Difficulty: {c.difficulty}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              {c.icon}
            </div>
            <h3 className="text-2xl font-black text-text-primary mb-3">{c.title}</h3>
            <p className="text-sm font-bold text-text-secondary/60 uppercase tracking-wider mb-4">The Danger</p>
            <p className="text-text-secondary font-medium leading-relaxed mb-6">
              {c.danger}
            </p>
            <div className="pt-6 border-t border-black/10 dark:border-white/10">
              <p className="text-sm font-bold text-accent-primary uppercase tracking-wider mb-2">Effective Solution</p>
              <p className="text-text-secondary font-medium text-sm">
                {c.solution}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visual Graph Component */}
      <div className="max-w-6xl mx-auto glass p-8 md:p-12 rounded-[2.5rem] border border-text-primary/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h3 className="text-2xl font-black text-text-primary mb-2 flex items-center gap-3">
              <BarChart3 className="text-accent-primary" size={24} />
              Vulnerability Metrics Analysis
            </h3>
            <p className="text-text-secondary text-sm max-w-xl">
              {metricDescriptions[activeMetric]}
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex bg-black/10 dark:bg-white/5 p-1 rounded-2xl border border-text-primary/5 self-start md:self-auto">
            {(['severity', 'probability', 'complexity'] as const).map((metric) => (
              <button
                key={metric}
                onClick={() => setActiveMetric(metric)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                  activeMetric === metric 
                    ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {metric}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Graph */}
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Bar Chart SVG */}
          <div className="md:col-span-2 bg-black/5 dark:bg-black/20 p-6 md:p-8 rounded-3xl border border-text-primary/5 min-h-[320px] flex flex-col justify-end relative overflow-hidden">
            
            {/* Grid Lines */}
            <div className="absolute inset-x-8 top-8 bottom-20 flex flex-col justify-between pointer-events-none opacity-20">
              {[100, 75, 50, 25, 0].map((val) => (
                <div key={val} className="flex items-center gap-4 w-full">
                  <span className="text-[10px] font-bold text-text-secondary w-8 text-right">{val}%</span>
                  <div className="flex-1 border-t border-text-secondary" />
                </div>
              ))}
            </div>

            {/* Bars Container */}
            <div className="relative z-10 flex justify-around items-end h-[180px] px-8 mb-6">
              {challenges.map((c) => {
                const value = c.metrics[activeMetric];
                return (
                  <div key={c.id} className="flex flex-col justify-end items-center group w-1/4 relative h-[140px]">
                    {/* Tooltip */}
                    <div 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bg-text-primary text-bg-primary px-3 py-1.5 rounded-lg text-xs font-black shadow-xl z-20 whitespace-nowrap pointer-events-none"
                      style={{ 
                        bottom: `${value}%`,
                        transform: 'translateY(-8px)'
                      }}
                    >
                      {value}%
                    </div>
                    
                    {/* Bar */}
                    <div className="w-12 md:w-16 bg-black/10 dark:bg-white/5 rounded-t-2xl h-full flex items-end overflow-hidden relative">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${value}%` }}
                        transition={{ type: "spring", damping: 15, stiffness: 100 }}
                        className="w-full rounded-t-2xl relative"
                        style={{ 
                          background: `linear-gradient(to top, ${c.color}20, ${c.color})`,
                          boxShadow: `0 0 20px ${c.color}30`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X Axis Labels */}
            <div className="flex justify-around px-8 border-t border-text-primary/10 pt-4">
              {challenges.map((c) => (
                <span key={c.id} className="text-[10px] font-black uppercase tracking-wider text-text-secondary w-1/4 text-center truncate px-1">
                  {c.title.split(' ').slice(-2).join(' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar Insights */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-accent-primary">
              Metric Insights
            </h4>
            <div className="space-y-4">
              {challenges.map((c) => (
                <div key={c.id} className="flex items-start gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-text-primary/5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0" style={{ backgroundColor: `${c.color}15`, color: c.color }}>
                    {c.metrics[activeMetric]}%
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-text-primary mb-1">{c.title}</h5>
                    <p className="text-xs text-text-secondary font-medium leading-relaxed">
                      {activeMetric === 'severity' && `Severe risk of ${c.title.toLowerCase()} requiring immediate isolation.`}
                      {activeMetric === 'probability' && `Commonly triggers under load tests representing a ${c.metrics.probability}% risk area.`}
                      {activeMetric === 'complexity' && `Requires advanced synchronization mechanisms and dedicated QA pipelines.`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseChallenges;
