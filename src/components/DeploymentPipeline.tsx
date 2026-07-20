import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Database, Globe, Layers, Shield, X, ArrowRight, 
  Cpu, Zap, Activity, HardDrive, Terminal, Check, RefreshCw, 
  Server, User, ShieldAlert, Cloud, Play, CheckCircle2, MapPin
} from 'lucide-react';

// Region configuration
const regions = [
  { id: 'fra', name: 'Frankfurt', latency: 32, label: 'Primary (Active)' },
  { id: 'ams', name: 'Amsterdam', latency: 45, label: 'Secondary (Backup)' },
  { id: 'sin', name: 'Singapore', latency: 185, label: 'Edge Replica' },
  { id: 'bom', name: 'Mumbai', latency: 98, label: 'Edge Replica' }
];

// Infra Node Type
interface InfraNode {
  id: string;
  name: string;
  subtitle: string;
  x: number; // Desktop positioning coordinates
  y: number;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  techs: string[];
  metrics: { label: string; value: string; unit: string }[];
  details: {
    purpose: string;
    impact: string;
  };
}

const infraNodes: InfraNode[] = [
  {
    id: "user",
    name: "Client Request",
    subtitle: "Web / Mobile Browser",
    x: 500,
    y: 60,
    icon: User,
    color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400",
    glowColor: "rgba(59, 130, 246, 0.4)",
    techs: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
    metrics: [
      { label: "DNS Resolve", value: "8", unit: "ms" },
      { label: "Active Clients", value: "1,245", unit: "" }
    ],
    details: {
      purpose: "Represents the user's browser initiating a secure HTTPS handshake to access the ArthQuest portal.",
      impact: "Client-side rendering optimized for core web vitals, pre-fetching routes via React Router for instant transitions."
    }
  },
  {
    id: "cloudflare",
    name: "Cloudflare DNS & CDN",
    subtitle: "Global Edge Network",
    x: 500,
    y: 180,
    icon: Cloud,
    color: "from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-400",
    glowColor: "rgba(249, 115, 22, 0.4)",
    techs: ["Cloudflare DNS", "Global CDN", "Anycast Network", "SSL/TLS Offload"],
    metrics: [
      { label: "Edge Hit Rate", value: "76.4", unit: "%" },
      { label: "Threats Blocked", value: "184", unit: "/hr" }
    ],
    details: {
      purpose: "Resolves the URL at edge servers and serves cached static assets (JS, CSS, static images) instantly without reaching the origin server.",
      impact: "Bypasses origin servers for ~75% of static traffic, lowering server costs and slashing page load times globally."
    }
  },
  {
    id: "waf",
    name: "Security Shield / WAF",
    subtitle: "SSL & Firewall Enforcement",
    x: 500,
    y: 300,
    icon: Shield,
    color: "from-red-500/20 to-rose-500/20 border-red-500/30 text-red-400",
    glowColor: "rgba(239, 68, 68, 0.4)",
    techs: ["Cloudflare WAF", "DDoS Protection", "SQLi & XSS Filters", "IP Rate Limiter"],
    metrics: [
      { label: "SSL Handshake", value: "12", unit: "ms" },
      { label: "Filter Rules", value: "48", unit: "active" }
    ],
    details: {
      purpose: "Inspects incoming requests for malicious patterns, enforcing strict firewall rules, HTTP rate limiting, and mitigating Layer 3/4/7 DDoS attacks.",
      impact: "Guarantees high system availability during attacks and blocks automated vulnerability scanners before they reach application layer."
    }
  },
  {
    id: "nginx",
    name: "Nginx Reverse Proxy",
    subtitle: "DigitalOcean Droplet Gateway",
    x: 500,
    y: 420,
    icon: Server,
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.4)",
    techs: ["Nginx", "Ubuntu 24.04 LTS", "GZIP/Brotli", "CORS Headers"],
    metrics: [
      { label: "Memory Usage", value: "182", unit: "MB" },
      { label: "Network IO", value: "42.8", unit: "MB/s" }
    ],
    details: {
      purpose: "Serves as the Entry Droplet. Handles SSL certificate termination, proxy buffering, CORS headers enforcement, and redirects traffic to the inner load balancer.",
      impact: "Decrypts SSL payloads at the network edge so internal API gateway and node clusters do not waste CPU cycles on encryption overhead."
    }
  },
  {
    id: "gateway",
    name: "Load Balancer & Gateway",
    subtitle: "JWT Authentication & Routing",
    x: 500,
    y: 540,
    icon: ShieldAlert,
    color: "from-lime-500/20 to-emerald-500/20 border-lime-500/30 text-lime-400",
    glowColor: "rgba(132, 204, 22, 0.4)",
    techs: ["Express Gateway", "JWT Verification", "IP Throttle", "JSON Compression"],
    metrics: [
      { label: "Auth Latency", value: "4.2", unit: "ms" },
      { label: "Rate Limit cap", value: "100", unit: "req/min" }
    ],
    details: {
      purpose: "Decrypts user tokens, verifies signatures, extracts user metadata, handles route multiplexing, and acts as the gatekeeper for private API endpoints.",
      impact: "Centralizes security constraints, ensuring microservices are only accessed by validated requests with proper scopes."
    }
  },
  {
    id: "api1",
    name: "Node.js API Server #1",
    subtitle: "Express Cluster - PM2 Thread 0",
    x: 280,
    y: 670,
    icon: Cpu,
    color: "from-teal-500/20 to-cyan-500/20 border-teal-500/30 text-teal-400",
    glowColor: "rgba(20, 184, 166, 0.4)",
    techs: ["Node.js", "Express.js", "PM2 Cluster Mode", "TypeScript", "Docker"],
    metrics: [
      { label: "CPU Usage", value: "12", unit: "%" },
      { label: "RAM Allocation", value: "2.1", unit: "GB / 8GB" }
    ],
    details: {
      purpose: "Handles primary business logic, processes REST API endpoints, coordinates database queries, and interacts with Redis and Cloudinary.",
      impact: "Runs multi-threaded cluster mode via PM2 utilizing all available CPU cores of the DigitalOcean Droplet."
    }
  },
  {
    id: "api2",
    name: "Node.js API Server #2",
    subtitle: "Express Cluster - PM2 Thread 1",
    x: 720,
    y: 670,
    icon: Cpu,
    color: "from-teal-500/20 to-cyan-500/20 border-teal-500/30 text-teal-400",
    glowColor: "rgba(20, 184, 166, 0.4)",
    techs: ["Node.js", "Express.js", "PM2 Cluster Mode", "TypeScript", "Docker"],
    metrics: [
      { label: "CPU Usage", value: "11", unit: "%" },
      { label: "RAM Allocation", value: "2.2", unit: "GB / 8GB" }
    ],
    details: {
      purpose: "Secondary Node.js worker handling concurrent requests. Load balancer routes requests round-robin style to balance workload.",
      impact: "Provides server-side redundancy. If one thread crashes, PM2 restarts it in milliseconds while the other instance continues serving traffic."
    }
  },
  {
    id: "redis",
    name: "Redis Cache Layer",
    subtitle: "High-Speed Key-Value Store",
    x: 500,
    y: 800,
    icon: Zap,
    color: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400",
    glowColor: "rgba(236, 72, 153, 0.4)",
    techs: ["Redis Cluster", "In-Memory Caching", "Session Store", "Key Expiry TTL"],
    metrics: [
      { label: "Cache Hit Rate", value: "89.4", unit: "%" },
      { label: "Cache Read", value: "0.8", unit: "ms" }
    ],
    details: {
      purpose: "Intercepts database requests. Stores session tokens, route query cache, and frequent lookups (like property details) in-memory for microsecond reading.",
      impact: "Drastically offloads PostgreSQL read traffic, preventing Supabase connection pool exhaustion during peak loads."
    }
  },
  {
    id: "database",
    name: "Supabase PostgreSQL DB",
    subtitle: "Primary Relational DB",
    x: 280,
    y: 930,
    icon: Database,
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.4)",
    techs: ["PostgreSQL 16", "Supabase", "Row Level Security (RLS)", "Prisma ORM", "Connection Pooling"],
    metrics: [
      { label: "Active Pools", value: "24", unit: "/ 50" },
      { label: "Query Rate", value: "324", unit: "/sec" }
    ],
    details: {
      purpose: "Stores secure structured data (seller profiles, transactions, admin logs) with Row-Level Security (RLS) tables preventing unauthorized row reading.",
      impact: "Maintains relational transactional integrity (ACID) with regular point-in-time recovery and database replica failover mechanisms."
    }
  },
  {
    id: "cloudinary",
    name: "Cloudinary Object Storage",
    subtitle: "Asset Storage CDN",
    x: 720,
    y: 930,
    icon: HardDrive,
    color: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400",
    glowColor: "rgba(99, 102, 241, 0.4)",
    techs: ["Cloudinary Storage", "S3 Compatible API", "Media Optimization CDN", "Auto-WebP Transform"],
    metrics: [
      { label: "Storage Used", value: "42.1", unit: "GB" },
      { label: "Avg Delivery", value: "24", unit: "ms" }
    ],
    details: {
      purpose: "Stores user avatars, property catalog photos, payslips, and Institutional PDF files. Automatically transforms and compresses media files.",
      impact: "Saves up to 60% bandwidth by dynamically converting large JPG images into compressed next-gen WebP/AVIF formats based on client browser capability."
    }
  },
  {
    id: "monitoring",
    name: "Monitoring & Telemetry",
    subtitle: "Sentry • Grafana • Logs",
    x: 500,
    y: 1060,
    icon: Activity,
    color: "from-purple-500/20 to-fuchsia-500/20 border-purple-500/30 text-purple-400",
    glowColor: "rgba(168, 85, 247, 0.4)",
    techs: ["Sentry SDK", "Grafana Dashboards", "Prometheus Metrics", "Winston Logger"],
    metrics: [
      { label: "Errors Logged", value: "0", unit: "fatal" },
      { label: "Health State", value: "100", unit: "% ok" }
    ],
    details: {
      purpose: "Scrapes application system metrics, aggregates logs, and alerts devs via Webhooks on error occurrences or latency spikes.",
      impact: "Provides full production visibility, reducing Mean Time to Resolution (MTTR) from hours to minutes when errors are caught in real-time."
    }
  }
];

// Timeline stages for CI/CD
const pipelineSteps = [
  { id: 0, label: "Developer", desc: "Git Push", icon: User },
  { id: 1, label: "Review", desc: "PR & Merge", icon: Github },
  { id: 2, label: "Static Check", desc: "Lint & TS Check", icon: ShieldAlert },
  { id: 3, label: "Test Suite", desc: "Unit Tests", icon: Activity },
  { id: 4, label: "Container", desc: "Docker Build & Push", icon: Layers },
  { id: 5, label: "DO Droplet", desc: "PM2 Hot Reload", icon: Server },
  { id: 6, label: "Production", desc: "Health Check & Live", icon: Globe }
];

// Live command logs simulation
const deploymentLogs = [
  { text: "$ git push origin main", delay: 400, step: 0 },
  { text: "Enumerating objects: 7, done.", delay: 250, step: 0 },
  { text: "Counting objects: 100% (7/7), done.", delay: 200, step: 0 },
  { text: "Delta compression using up to 16 threads", delay: 200, step: 0 },
  { text: "Writing objects: 100% (4/4), 621 bytes, done.", delay: 200, step: 0 },
  { text: "To github.com:shubhamyadav/portfolio.git", delay: 250, step: 0 },
  { text: "   c3b8a12..a4d9e0f  main -> main", delay: 100, step: 0 },
  { text: "✓ Git push complete.", delay: 300, step: 1 },
  { text: "", delay: 100, step: 1 },
  { text: "✓ GitHub Actions workflow triggered: deploy.yml", delay: 450, step: 1 },
  { text: "Running Job: Lint & Static Analysis", delay: 300, step: 1 },
  { text: "$ npm run lint && npm run typecheck", delay: 550, step: 2 },
  { text: "  eslint: 0 errors, 2 warnings. Style checks passed.", delay: 450, step: 2 },
  { text: "  tsc: TypeScript compilation check passed.", delay: 450, step: 2 },
  { text: "✓ Static checks completed successfully.", delay: 200, step: 2 },
  { text: "", delay: 100, step: 2 },
  { text: "Running Job: Unit Tests", delay: 300, step: 3 },
  { text: "$ npm run test", delay: 600, step: 3 },
  { text: "  PASS  src/tests/auth.test.ts (0.9s)", delay: 350, step: 3 },
  { text: "  PASS  src/tests/api.test.ts (0.6s)", delay: 300, step: 3 },
  { text: "  Tests:       42 passed, 42 total", delay: 200, step: 3 },
  { text: "  Time:        1.98s", delay: 150, step: 3 },
  { text: "✓ Unit tests passed.", delay: 300, step: 3 },
  { text: "", delay: 100, step: 3 },
  { text: "Running Job: Build & Containerize", delay: 350, step: 4 },
  { text: "$ docker build -t arthquest-api:latest .", delay: 700, step: 4 },
  { text: "  Step 1/8 : FROM node:20-alpine", delay: 350, step: 4 },
  { text: "  Step 5/8 : RUN npm run build", delay: 600, step: 4 },
  { text: "  Successfully tagged arthquest-api:latest", delay: 200, step: 4 },
  { text: "$ docker push registry.digitalocean.com/arthquest/api:latest", delay: 700, step: 4 },
  { text: "  latest: digest: sha256:f728c3... size: 142MB", delay: 300, step: 4 },
  { text: "✓ Docker image pushed to DigitalOcean Registry.", delay: 200, step: 4 },
  { text: "", delay: 100, step: 4 },
  { text: "Running Job: Deploy to DigitalOcean Droplet", delay: 400, step: 5 },
  { text: "  SSH connecting to Ubuntu 24.04 droplet...", delay: 450, step: 5 },
  { text: "  Pulling latest Docker image...", delay: 350, step: 5 },
  { text: "  Restarting PM2 cluster instance...", delay: 250, step: 5 },
  { text: "$ pm2 reload ecosystem.config.js", delay: 500, step: 5 },
  { text: "  PM2 Reload Success (zero-downtime hot reload)", delay: 350, step: 5 },
  { text: "✓ Droplet service reload successful.", delay: 200, step: 5 },
  { text: "", delay: 100, step: 5 },
  { text: "Running Job: Health Verification", delay: 400, step: 6 },
  { text: "  Checking https://api.arthquest.com/health...", delay: 450, step: 6 },
  { text: "  HTTP/1.1 200 OK | { status: healthy, uptime: 99.98% }", delay: 350, step: 6 },
  { text: "✓ Health checks passed successfully.", delay: 200, step: 6 },
  { text: "", delay: 100, step: 6 },
  { text: "🚀 Live Production: Deployment Successful!", delay: 500, step: 6 }
];

const DeploymentPipeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'infra' | 'cicd'>('infra');
  const [activeNode, setActiveNode] = useState<InfraNode | null>(null);
  const [activeRegion, setActiveRegion] = useState(regions[0]); // Default to Frankfurt
  
  // Real-time counter states
  const [totalRequests, setTotalRequests] = useState(18458322);
  const [queryRate, setQueryRate] = useState(324);
  const [activeLatency, setActiveLatency] = useState(32);
  
  // Fluctuating metric values
  const [api1Cpu, setApi1Cpu] = useState(12);
  const [api2Cpu, setApi2Cpu] = useState(11);
  const [api1Ram, setApi1Ram] = useState(2.1);
  const [api2Ram, setApi2Ram] = useState(2.2);

  // Intersection Observer for animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Terminal Simulator states
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [activePipelineStep, setActivePipelineStep] = useState<number>(-1);
  const [isDeploying, setIsDeploying] = useState(false);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Scroll only the terminal container internally
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [terminalLines]);

  // Handle in-view observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Fluctuating Stats Simulation (only when section in view)
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      // Total Requests increment
      setTotalRequests(prev => prev + Math.floor(Math.random() * 8) + 2);
      // DB query rate fluctuation
      setQueryRate(Math.floor(Math.random() * 35) + 310);
      // Latency fluctuation slightly based on region
      setActiveLatency(activeRegion.latency + Math.floor(Math.random() * 4) - 2);
      
      // Node server CPU/RAM fluctuations
      setApi1Cpu(Math.floor(Math.random() * 6) + 9); // 9-14%
      setApi2Cpu(Math.floor(Math.random() * 5) + 10); // 10-14%
      setApi1Ram(parseFloat((2.1 + (Math.random() * 0.15 - 0.07)).toFixed(2)));
      setApi2Ram(parseFloat((2.2 + (Math.random() * 0.15 - 0.07)).toFixed(2)));
    }, 1200);

    return () => clearInterval(interval);
  }, [isInView, activeRegion]);

  // Synchronized Latency updater on region change
  useEffect(() => {
    setActiveLatency(activeRegion.latency);
  }, [activeRegion]);

  // CI/CD simulator typing controller
  const startDeploymentSimulation = () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setTerminalLines([]);
    setActivePipelineStep(-1);

    let logIdx = 0;
    const runStep = () => {
      if (logIdx >= deploymentLogs.length) {
        setIsDeploying(false);
        return;
      }
      const item = deploymentLogs[logIdx];
      setTerminalLines(prev => [...prev, item.text]);
      if (item.step !== undefined) {
        setActivePipelineStep(item.step);
      }
      logIdx++;
      setTimeout(runStep, item.delay);
    };

    runStep();
  };

  // Trigger terminal deploy once when scrolled in and tab switched to cicd
  useEffect(() => {
    if (isInView && activeTab === 'cicd' && terminalLines.length === 0 && !isDeploying) {
      // Small buffer before starting
      const timer = setTimeout(() => {
        startDeploymentSimulation();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, activeTab]);

  return (
    <section ref={sectionRef} className="container mx-auto py-24 px-6 relative" id="infrastructure">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-4 inline-flex px-4 py-1.5 rounded-full bg-accent-primary/5 border border-accent-primary/20"
        >
          <span className="text-accent-primary text-[10px] font-black tracking-[0.4em] ">Operations Dashboard</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4"
        >
          Interactive <span className="gradient-text">DevOps</span> Console
        </motion.h2>
        <p className="text-text-secondary max-w-2xl text-lg font-medium leading-relaxed">
          Explore the exact request flow of my production systems or inspect the automated CI/CD pipeline simulating deployment.
        </p>

        {/* View Selection Toggle */}
        <div className="flex p-1.5 bg-card-bg border border-text-primary/5 rounded-2xl mt-10 backdrop-blur-xl relative shadow-lg">
          <button
            onClick={() => setActiveTab('infra')}
            className={`px-6 py-3 rounded-xl font-extrabold text-sm tracking-wide transition-all ${
              activeTab === 'infra' 
                ? 'bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border border-accent-primary/30 text-accent-primary shadow-inner scale-[1.02]' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Live Request Topology
          </button>
          <button
            onClick={() => setActiveTab('cicd')}
            className={`px-6 py-3 rounded-xl font-extrabold text-sm tracking-wide transition-all ${
              activeTab === 'cicd' 
                ? 'bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border border-accent-primary/30 text-accent-primary shadow-inner scale-[1.02]' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            CI/CD Pipeline Run
          </button>
        </div>
      </div>

      {/* Global Status Bar Card */}
      <div className="w-full max-w-5xl mx-auto mb-8 p-6 glass rounded-3xl border border-text-primary/5 shadow-2xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center md:text-left">
          
          <div className="flex flex-col md:border-r border-text-primary/5 px-2">
            <span className="text-text-secondary text-xs font-black tracking-widest  mb-1">Total Requests</span>
            <span className="text-2xl font-black text-text-primary tracking-tight font-mono">
              {totalRequests.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col md:border-r border-text-primary/5 px-2">
            <span className="text-text-secondary text-xs font-black tracking-widest  mb-1">Application Uptime</span>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#2ce67c]" />
              <span className="text-2xl font-black text-text-primary tracking-tight font-mono">99.98%</span>
            </div>
          </div>

          <div className="flex flex-col md:border-r border-text-primary/5 px-2">
            <span className="text-text-secondary text-xs font-black tracking-widest  mb-1">Active Region</span>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <MapPin size={15} className="text-accent-primary" />
              <span className="text-xl font-black text-text-primary tracking-tight">{activeRegion.name}</span>
            </div>
          </div>

          <div className="flex flex-col px-2">
            <span className="text-text-secondary text-xs font-black tracking-widest  mb-1">Simulated Latency</span>
            <span className="text-2xl font-black text-text-primary tracking-tight font-mono text-accent-primary">
              {activeLatency}ms
            </span>
          </div>

        </div>
      </div>

      {/* Main Interactive Work Area */}
      <div className="relative w-full max-w-5xl mx-auto min-h-[600px] z-10">
        <AnimatePresence mode="wait">
          
          {/* Tab 1: Live Infrastructure Map */}
          {activeTab === 'infra' && (
            <motion.div
              key="infra"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col gap-8"
            >
              
              {/* Region Selector HUD */}
              <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-100/50 dark:bg-slate-950/40 rounded-2xl border border-text-primary/5 w-fit mx-auto md:mx-0">
                <span className="text-text-secondary text-xs font-bold mr-2">Deploy Region:</span>
                {regions.map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => setActiveRegion(reg)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeRegion.id === reg.id
                        ? 'bg-accent-primary/20 border border-accent-primary/30 text-accent-primary'
                        : 'bg-white/50 dark:bg-white/5 border border-transparent text-text-secondary hover:text-text-primary hover:bg-white/80 dark:hover:bg-white/10'
                    }`}
                  >
                    {reg.name}
                  </button>
                ))}
              </div>

              {/* Main SVG/HTML Canvas Map */}
              <div className="relative w-full overflow-x-auto md:overflow-visible pb-12">
                <div className="relative w-[1000px] h-[1140px] mx-auto bg-slate-50/50 dark:bg-slate-950/50 rounded-[2.5rem] border border-text-primary/5 overflow-hidden shadow-2xl backdrop-blur-md">
                  
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(44,230,124,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(44,230,124,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                  {/* SVG Paths and Packets */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1140">
                    <defs>
                      <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* SVG Connection Paths */}
                    {/* User -> Cloudflare */}
                    <path d="M 500 60 L 500 180" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />
                    {/* Cloudflare -> WAF */}
                    <path d="M 500 180 L 500 300" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />
                    {/* WAF -> Nginx */}
                    <path d="M 500 300 L 500 420" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />
                    {/* Nginx -> Gateway */}
                    <path d="M 500 420 L 500 540" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />
                    {/* Gateway -> API 1 */}
                    <path d="M 500 540 L 280 670" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />
                    {/* Gateway -> API 2 */}
                    <path d="M 500 540 L 720 670" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />
                    {/* API 1 -> Redis */}
                    <path d="M 280 670 L 500 800" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />
                    {/* API 2 -> Redis */}
                    <path d="M 720 670 L 500 800" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />
                    {/* Redis -> Supabase */}
                    <path d="M 500 800 L 280 930" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />
                    {/* Redis -> Cloudinary */}
                    <path d="M 500 800 L 720 930" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />
                    {/* Supabase -> Monitoring */}
                    <path d="M 280 930 L 500 1060" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />
                    {/* Cloudinary -> Monitoring */}
                    <path d="M 720 930 L 500 1060" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />

                    {/* Animated Data Packets (only when inView is true) */}
                    {isInView && (
                      <>
                        {/* User -> CF */}
                        <circle r="4" fill="#3b82f6" filter="url(#glowFilter)">
                          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 500 60 L 500 180" />
                        </circle>
                        <circle r="2.5" fill="#10b981" filter="url(#glowFilter)">
                          <animateMotion dur="3.6s" begin="0.8s" repeatCount="indefinite" path="M 500 60 L 500 180" />
                        </circle>

                        {/* CF -> WAF */}
                        <circle r="3.5" fill="#f97316" filter="url(#glowFilter)">
                          <animateMotion dur="1.8s" repeatCount="indefinite" path="M 500 180 L 500 300" />
                        </circle>

                        {/* WAF -> Nginx */}
                        <circle r="3.5" fill="#ef4444" filter="url(#glowFilter)">
                          <animateMotion dur="2.2s" repeatCount="indefinite" path="M 500 300 L 500 420" />
                        </circle>

                        {/* Nginx -> Gateway */}
                        <circle r="3.5" fill="#10b981" filter="url(#glowFilter)">
                          <animateMotion dur="2s" repeatCount="indefinite" path="M 500 420 L 500 540" />
                        </circle>

                        {/* Gateway -> API 1 */}
                        <circle r="3" fill="#84cc16" filter="url(#glowFilter)">
                          <animateMotion dur="2.6s" repeatCount="indefinite" path="M 500 540 L 280 670" />
                        </circle>
                        {/* Gateway -> API 2 */}
                        <circle r="3" fill="#14b8a6" filter="url(#glowFilter)">
                          <animateMotion dur="3.1s" begin="0.5s" repeatCount="indefinite" path="M 500 540 L 720 670" />
                        </circle>

                        {/* API 1 -> Redis */}
                        <circle r="3.5" fill="#14b8a6" filter="url(#glowFilter)">
                          <animateMotion dur="2.8s" repeatCount="indefinite" path="M 280 670 L 500 800" />
                        </circle>
                        {/* API 2 -> Redis */}
                        <circle r="3.5" fill="#3b82f6" filter="url(#glowFilter)">
                          <animateMotion dur="2.4s" begin="0.7s" repeatCount="indefinite" path="M 720 670 L 500 800" />
                        </circle>

                        {/* Redis -> Supabase */}
                        <circle r="3" fill="#ec4899" filter="url(#glowFilter)">
                          <animateMotion dur="3.5s" repeatCount="indefinite" path="M 500 800 L 280 930" />
                        </circle>
                        {/* Redis -> Cloudinary */}
                        <circle r="3" fill="#6366f1" filter="url(#glowFilter)">
                          <animateMotion dur="4.2s" begin="1.2s" repeatCount="indefinite" path="M 500 800 L 720 930" />
                        </circle>

                        {/* DB -> Monitoring */}
                        <circle r="2.5" fill="#10b981" filter="url(#glowFilter)">
                          <animateMotion dur="4s" repeatCount="indefinite" path="M 280 930 L 500 1060" />
                        </circle>
                        {/* Storage -> Monitoring */}
                        <circle r="2.5" fill="#a855f7" filter="url(#glowFilter)">
                          <animateMotion dur="4.8s" begin="0.9s" repeatCount="indefinite" path="M 720 930 L 500 1060" />
                        </circle>
                      </>
                    )}
                  </svg>

                  {/* Flow Text Labels */}
                  <div className="absolute top-[840px] left-[310px] pointer-events-none text-[10px] font-black  text-rose-500/60 tracking-wider">
                    Cache Miss
                  </div>
                  <div className="absolute top-[840px] left-[590px] pointer-events-none text-[10px] font-black  text-[#2ce67c]/60 tracking-wider">
                    Media Pull
                  </div>

                  {/* Render Node Cards */}
                  {infraNodes.map((node) => {
                    const Icon = node.icon;
                    const isHovered = activeNode?.id === node.id;
                    
                    // Fetch dynamic fluctuating values for specific nodes
                    let cpuText = "";
                    let ramText = "";
                    if (node.id === 'api1') {
                      cpuText = `${api1Cpu}%`;
                      ramText = `${api1Ram} GB`;
                    } else if (node.id === 'api2') {
                      cpuText = `${api2Cpu}%`;
                      ramText = `${api2Ram} GB`;
                    } else if (node.id === 'database') {
                      cpuText = "8%";
                      ramText = `${queryRate} q/s`;
                    }

                    return (
                      <div
                        key={node.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                        style={{ left: `${node.x}px`, top: `${node.y}px` }}
                      >
                        <motion.button
                          onClick={() => setActiveNode(node)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            boxShadow: isHovered ? `0 0 25px ${node.glowColor}` : 'none'
                          }}
                          className={`w-[260px] py-4.5 px-5 rounded-[1.25rem] bg-white/90 dark:bg-slate-900/90 border-2 ${
                            isHovered ? 'border-accent-primary' : 'border-text-primary/10'
                          } flex items-center gap-4 transition-all duration-300 shadow-xl cursor-pointer hover:border-accent-primary/40`}
                        >
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-r ${node.color} flex items-center justify-center shrink-0 border border-white/5`}>
                            <Icon size={20} />
                          </div>
                          <div className="text-left">
                            <p className="font-extrabold text-text-primary text-sm tracking-tight">{node.name}</p>
                            <p className="text-text-secondary text-[11px] font-bold mt-0.5 tracking-wide">{node.subtitle}</p>
                            
                            {/* Live mini hud */}
                            {(node.id === 'api1' || node.id === 'api2' || node.id === 'database') && (
                              <div className="flex gap-3 mt-1.5 font-mono text-[9px] font-bold text-accent-primary">
                                <span>CPU: {cpuText || "5%"}</span>
                                <span>{node.id === 'database' ? `QPS: ${ramText}` : `RAM: ${ramText}`}</span>
                              </div>
                            )}
                          </div>
                        </motion.button>

                        {/* Subtle Glow Ring */}
                        <div className={`absolute -inset-0.5 rounded-[1.25rem] -z-10 bg-gradient-to-r ${node.color} opacity-0 group-hover:opacity-40 blur transition-all duration-500 pointer-events-none`} />
                      </div>
                    );
                  })}

                </div>
              </div>

              {/* Dedicated Node Details Panel (Glassmorphism Overlay Card) */}
              <AnimatePresence>
                {activeNode && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="p-8 rounded-[2rem] bg-white/85 dark:bg-slate-900/85 border border-accent-primary/20 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                  >
                    {/* Corner Ambient Glow */}
                    <div 
                      className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[60px] pointer-events-none"
                      style={{ background: activeNode.glowColor }}
                    />
                    
                    <button 
                      onClick={() => setActiveNode(null)}
                      className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <X size={16} />
                    </button>

                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8 border-b border-text-primary/5 pb-6">
                      <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${activeNode.color} flex items-center justify-center border border-white/5 shadow-xl`}>
                          {React.createElement(activeNode.icon, { size: 30 })}
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-text-primary tracking-tight">{activeNode.name}</h3>
                          <p className="text-accent-primary font-black tracking-widest text-[10px]  mt-1">
                            {activeNode.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Region Badge */}
                      <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-xs font-bold text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Region: {activeRegion.name}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Left: Purpose */}
                      <div className="md:col-span-2 space-y-6">
                        <div>
                          <h4 className="text-text-primary font-black text-xs tracking-wider  mb-2">Technical Overview</h4>
                          <p className="text-text-secondary text-sm font-medium leading-relaxed">
                            {activeNode.details.purpose}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-text-primary font-black text-xs tracking-wider  mb-2">Production Benefits</h4>
                          <p className="text-text-secondary text-sm font-medium leading-relaxed">
                            {activeNode.details.impact}
                          </p>
                        </div>
                      </div>

                      {/* Right: Specs & Stack */}
                      <div className="space-y-6 bg-slate-50/50 dark:bg-slate-950/40 p-6 rounded-2xl border border-text-primary/5">
                        <div>
                          <h4 className="text-text-primary font-black text-xs tracking-wider  mb-3">Live Node Metrics</h4>
                          <div className="space-y-3 font-mono">
                            {activeNode.metrics.map((met, i) => (
                              <div key={i} className="flex justify-between text-xs border-b border-text-primary/5 pb-2">
                                <span className="text-text-secondary">{met.label}</span>
                                <span className="text-text-primary font-bold">
                                  {/* Handle fluctuating display values */}
                                  {met.label === "CPU Usage" && activeNode.id === 'api1' ? `${api1Cpu}%` :
                                   met.label === "CPU Usage" && activeNode.id === 'api2' ? `${api2Cpu}%` :
                                   met.label === "RAM Allocation" && activeNode.id === 'api1' ? `${api1Ram} GB` :
                                   met.label === "RAM Allocation" && activeNode.id === 'api2' ? `${api2Ram} GB` :
                                   met.label === "Query Rate" ? `${queryRate}/s` :
                                   `${met.value}${met.unit}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-text-primary font-black text-xs tracking-wider  mb-3">Tech Stack</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {activeNode.techs.map((tech) => (
                              <span key={tech} className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 border border-text-primary/10 rounded-lg text-[10px] font-black text-text-secondary tracking-wider">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}

          {/* Tab 2: CI/CD Deployment Timeline & Simulator */}
          {activeTab === 'cicd' && (
            <motion.div
              key="cicd"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Pipeline Left: Visual Steps Timeline (cols 5) */}
              <div className="lg:col-span-5 flex flex-col gap-5 p-6 glass rounded-3xl border border-text-primary/5 relative">
                
                <div className="flex items-center justify-between border-b border-text-primary/5 pb-4 mb-2">
                  <h3 className="font-extrabold text-text-primary text-lg tracking-tight">Deployment Pipeline</h3>
                  {isDeploying ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      Run Active
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 size={13} /> Pipeline Idle
                    </span>
                  )}
                </div>

                <div className="relative pl-6 space-y-6">
                  {/* Timeline Glowing Path Line */}
                  <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-800" />
                  <div 
                    className="absolute left-3 top-2 w-0.5 bg-accent-primary transition-all duration-700" 
                    style={{ height: `${Math.max(0, (activePipelineStep / (pipelineSteps.length - 1)) * 96)}%` }}
                  />

                  {pipelineSteps.map((step) => {
                    const isPending = activePipelineStep < step.id;
                    const isRunning = activePipelineStep === step.id && isDeploying;
                    const isCompleted = activePipelineStep > step.id || (!isDeploying && activePipelineStep === 6);
                    
                    const StepIcon = step.icon;

                    return (
                      <div key={step.id} className="relative flex gap-5 items-start">
                        {/* Step Bullet Icon Indicator */}
                        <div 
                          className={`absolute -left-6 transform -translate-x-1/2 w-6.5 h-6.5 rounded-full border flex items-center justify-center transition-all duration-300 z-10 ${
                            isCompleted 
                              ? 'bg-accent-primary/20 border-accent-primary text-accent-primary shadow-[0_0_8px_rgba(44,230,124,0.4)]' 
                              : isRunning 
                                ? 'bg-amber-400/20 border-amber-400 text-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)] animate-pulse'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-text-secondary'
                          }`}
                        >
                          {isCompleted ? <Check size={11} strokeWidth={4} /> : <span className="text-[10px] font-bold">{step.id + 1}</span>}
                        </div>

                        {/* Step Details */}
                        <div className="flex gap-4 items-center">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300 ${
                            isCompleted 
                              ? 'bg-accent-primary/10 border-accent-primary/30 text-accent-primary'
                              : isRunning 
                                ? 'bg-amber-400/10 border-amber-400/30 text-amber-400'
                                : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-900 text-text-secondary'
                          }`}>
                            <StepIcon size={18} />
                          </div>
                          <div>
                            <p className={`text-sm font-black transition-colors ${isPending ? 'text-text-tertiary' : 'text-text-primary'}`}>
                              {step.label}
                            </p>
                            <p className={`text-xs mt-0.5 font-bold transition-colors ${
                              isCompleted ? 'text-accent-primary' : isRunning ? 'text-amber-400' : 'text-text-secondary'
                            }`}>
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pipeline Right: Interactive Terminal (cols 7) */}
              <div className="lg:col-span-7 flex flex-col glass rounded-3xl border border-text-primary/5 overflow-hidden shadow-2xl relative">
                
                {/* Terminal Header Tab bar */}
                <div className="bg-slate-900 dark:bg-slate-950/80 px-6 py-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Terminal size={15} className="text-accent-primary" />
                    <span className="font-mono text-xs font-black tracking-wider text-slate-200">production_deploy.sh</span>
                  </div>
                  
                  {/* Action Replay button */}
                  <button
                    onClick={startDeploymentSimulation}
                    disabled={isDeploying}
                    className={`px-3 py-1.5 rounded-lg border font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all ${
                      isDeploying
                        ? 'border-slate-800 text-text-tertiary cursor-not-allowed'
                        : 'border-accent-primary/30 text-accent-primary hover:bg-accent-primary/10 hover:border-accent-primary/50'
                    }`}
                  >
                    <RefreshCw size={11} className={isDeploying ? 'animate-spin' : ''} />
                    Deploy Simulation
                  </button>
                </div>

                {/* Terminal Screen Console */}
                <div ref={terminalContainerRef} className="bg-slate-950/90 p-6 min-h-[420px] max-h-[420px] overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed space-y-2 select-text">
                  
                  {terminalLines.map((line, idx) => {
                    const isCommand = line.startsWith('$');
                    const isSuccess = line.startsWith('✓') || line.startsWith('🚀');
                    const isTable = line.includes('│');

                    let colorClass = "text-slate-300";
                    if (isCommand) colorClass = "text-cyan-400 font-extrabold";
                    else if (isSuccess) colorClass = "text-accent-primary font-bold";
                    else if (isTable) colorClass = "text-slate-500 font-medium text-[10px]";

                    return (
                      <div key={idx} className={`${colorClass} whitespace-pre-wrap`}>
                        {line}
                      </div>
                    );
                  })}

                  {/* Typing flashing block */}
                  {isDeploying && (
                    <span className="inline-block w-2 h-4 bg-accent-primary animate-pulse ml-0.5 vertical-middle" />
                  )}

                  {/* Empty state prompt */}
                  {terminalLines.length === 0 && !isDeploying && (
                    <div className="text-slate-500 italic text-center pt-32">
                      Click "Deploy Simulation" to trigger the CI/CD timeline run.
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};

export default DeploymentPipeline;
