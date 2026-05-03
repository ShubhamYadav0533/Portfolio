import React, { useEffect, useState } from 'react';

const Background: React.FC = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#030303]">
      {/* 3D Perspective Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 210, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 210, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          perspective: '1000px',
          transform: 'rotateX(60deg) translateY(-200px)'
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white opacity-50 animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.duration
          }}
        />
      ))}

      {/* Glowing Orbs */}
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_rgba(157,80,187,0.15)_0%,_transparent_70%)] blur-[50px]" />
      <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(0,210,255,0.1)_0%,_transparent_70%)] blur-[60px]" />
    </div>
  );
};

export default Background;
