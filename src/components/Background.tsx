import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Background: React.FC = () => {
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
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#030303]">
      {/* 3D Perspective Grid with Scroll Link */}
      <motion.div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 210, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 210, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          perspective: '1500px',
          y: yGrid,
          rotateX: rotateX,
          translateY: '-20%'
        }}
      />

      {/* Parallax Dust / Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white opacity-40"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
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
        className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(157,80,187,0.08)_0%,_transparent_70%)] blur-[80px]" 
      />
      <motion.div 
        animate={{ 
          y: [0, 30, 0],
          x: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[5%] left-[5%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(0,210,255,0.06)_0%,_transparent_70%)] blur-[100px]" 
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default Background;
