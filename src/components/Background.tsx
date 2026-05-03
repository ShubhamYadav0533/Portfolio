import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Background: React.FC = () => {
  const { theme } = useTheme();
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string; delay: string }[]>([]);
  const { scrollY } = useScroll();
  const yGrid = useTransform(scrollY, [0, 3000], [0, -700]);
  const rotateX = useTransform(scrollY, [0, 3000], [60, 40]);
  const orbY1 = useTransform(scrollY, [0, 2000], [0, -200]);
  const orbY2 = useTransform(scrollY, [0, 2000], [0, -100]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2.5 + 0.5}px`,
      duration: `${Math.random() * 4 + 2}s`,
      delay: `${Math.random() * 3}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-bg-primary transition-colors duration-500">
      {/* Perspective Grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.06]"
        style={{
          backgroundImage: theme === 'dark'
            ? `linear-gradient(rgba(0,210,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.6) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)`,
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
          className={`absolute rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
          style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
          animate={{ opacity: theme === 'dark' ? [0.1, 0.5, 0.1] : [0.03, 0.12, 0.03], scale: [1, 1.3, 1] }}
          transition={{ duration: parseFloat(star.duration), repeat: Infinity, ease: 'easeInOut', delay: parseFloat(star.delay) }}
        />
      ))}

      {/* Primary glow orb top-right */}
      <motion.div
        style={{ y: orbY1 }}
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(157,80,187,0.07)_0%,_transparent_65%)] blur-[60px]"
      />

      {/* Secondary glow orb bottom-left */}
      <motion.div
        style={{ y: orbY2 }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(0,210,255,0.06)_0%,_transparent_65%)] blur-[60px]"
      />

      {/* Center ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[radial-gradient(ellipse,_rgba(0,210,255,0.03)_0%,_transparent_70%)] blur-[80px]" />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} 
      />
    </div>
  );
};

export default Background;
