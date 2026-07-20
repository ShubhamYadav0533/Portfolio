import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Background: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string; delay: string }[]>([]);
  const { scrollY } = useScroll();
  const yGrid = useTransform(scrollY, [0, 3000], [0, -700]);
  const rotateX = useTransform(scrollY, [0, 3000], [60, 40]);
  const orbY1 = useTransform(scrollY, [0, 2000], [0, -200]);
  const orbY2 = useTransform(scrollY, [0, 2000], [0, -100]);

  // Track mouse coordinates for parallax & particle push
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const newStars = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 0.5}px`,
      duration: `${Math.random() * 4 + 2}s`,
      delay: `${Math.random() * 3}s`,
    }));
    setStars(newStars);
  }, []);

  // Canvas-based Floating Network Nodes & Mouse Interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse push effect
        const mouse = mouseRef.current;
        if (mouse.x > -500 && mouse.y > -500) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            this.x += (dx / dist) * force * 1.5;
            this.y += (dy / dist) * force * 1.5;
          }
        }
      }

      draw(c: CanvasRenderingContext2D, color: string) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = color;
        c.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => new Particle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse positions for smooth springy feel
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      const particleColor = theme === 'dark' ? 'rgba(44, 230, 124, 0.4)' : 'rgba(15, 23, 42, 0.15)';
      const lineColor = theme === 'dark' ? 'rgba(44, 230, 124, 0.06)' : 'rgba(15, 23, 42, 0.03)';

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx, particleColor);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 - dist / 110;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-bg-primary transition-colors duration-500">
      {/* Interactive Network Nodes Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Perspective Grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.06]"
        style={{
          backgroundImage: theme === 'dark'
            ? `linear-gradient(rgba(44,230,124,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(44,230,124,0.3) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          perspective: '1800px',
          y: yGrid,
          rotateX: rotateX,
          translateY: '-25%',
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={`absolute rounded-full ${theme === 'dark' ? 'bg-[#2ce67c]' : 'bg-black'}`}
          style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
          animate={{ opacity: theme === 'dark' ? [0.1, 0.7, 0.1] : [0.03, 0.15, 0.03], scale: [1, 1.4, 1] }}
          transition={{ duration: parseFloat(star.duration), repeat: Infinity, ease: 'easeInOut', delay: parseFloat(star.delay) }}
        />
      ))}

      {/* Primary glow orb top-right */}
      <motion.div
        style={{ y: orbY1 }}
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(44,230,124,0.05)_0%,_transparent_65%)] blur-[60px]"
      />

      {/* Secondary glow orb bottom-left */}
      <motion.div
        style={{ y: orbY2 }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(44,230,124,0.04)_0%,_transparent_65%)] blur-[60px]"
      />

      {/* Center ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[radial-gradient(ellipse,_rgba(44,230,124,0.02)_0%,_transparent_70%)] blur-[80px]" />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} 
      />
    </div>
  );
};

export default Background;
