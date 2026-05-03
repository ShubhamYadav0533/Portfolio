import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Background from '../components/Background';

const Home: React.FC = () => {
  return (
    <div className="relative text-white selection:bg-[#00d2ff]/30">
      <Background />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Education />
        <Skills />
        <Contact />
      </main>
      
      <footer className="container mx-auto py-12 px-6 border-t border-white/10 text-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm font-medium tracking-wider uppercase">
            © {new Date().getFullYear()} Shubham Yadav | Crafted with Passion
          </p>
          <div className="flex gap-8 text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Credits</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
