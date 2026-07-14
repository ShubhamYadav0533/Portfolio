import React from 'react';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import ContactSection from '../components/Contact';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  return (
    <div className="relative text-text-primary selection:bg-accent-primary/30 transition-colors duration-500 min-h-screen">
      <Background />
      <Navbar />
      <main className="relative z-10 pt-20">
        <ContactSection />
      </main>
      
      <footer className="container mx-auto py-12 px-6 border-t border-black/10 dark:border-white/10 text-center transition-colors duration-500 mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-text-secondary/40 text-sm font-bold tracking-widest ">
            © {new Date().getFullYear()} Shubham Yadav | Crafted with Passion
          </p>
          <div className="flex gap-8 text-text-secondary/40 text-xs font-bold tracking-[0.2em]">
            <Link to="/about" className="hover:text-text-primary transition-colors">About</Link>
            <Link to="/projects" className="hover:text-text-primary transition-colors">Projects</Link>
            <Link to="/contact" className="hover:text-text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
