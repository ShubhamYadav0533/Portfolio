import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Background: React.FC = () => {
  const { theme } = useTheme();
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);
  const { scrollY } = useScroll();
  const yGrid = useTransform(scrollY, [0, 2000], [0, -500]);
  const rotateX = useTransform(scrollY, [0, 2000], [60, 45]);

  useEffect(() => {
    const newStars = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-bg-primary transition-colors duration-500">
      {/* 3D Perspective Grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.1] dark:opacity-[0.07]"
        style={{
          backgroundImage: theme === 'dark' 
            ? `linear-gradient(rgba(0, 210, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 210, 255, 0.5) 1px, transparent 1px)`
            : `linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          perspective: '1500px',
          y: yGrid,
          rotateX: rotateX,
          translateY: '-20%'
        }}
      />

      {/* Parallax Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={`absolute rounded-full transition-colors duration-500 ${theme === 'dark' ? 'bg-white opacity-40' : 'bg-black opacity-10'}`}
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: theme === 'dark' ? [0.2, 0.6, 0.2] : [0.05, 0.15, 0.05],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: parseFloat(star.duration),
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating 3D Orbs */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          x: [0, 20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(157,80,187,0.05)_0%,_transparent_70%)] blur-[80px]" 
      />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default Background;
