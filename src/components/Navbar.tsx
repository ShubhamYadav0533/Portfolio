import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-4xl p-4 md:px-8 flex justify-between items-center bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl transition-colors duration-500">
      <div className="text-xl font-black tracking-tighter text-text-primary">
        SHUBHAM <span className="bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] bg-clip-text text-transparent">YADAV</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-bold text-text-primary/70">
        <a href="#home" className="hover:text-accent-primary transition-colors uppercase tracking-widest">Home</a>
        <a href="#education" className="hover:text-accent-primary transition-colors uppercase tracking-widest">Education</a>
        <a href="#skills" className="hover:text-accent-primary transition-colors uppercase tracking-widest">Skills</a>
        <a href="#contact" className="hover:text-accent-primary transition-colors uppercase tracking-widest">Contact</a>
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all active:scale-95"
        >
          {theme === 'light' ? <Moon size={18} className="text-text-primary" /> : <Sun size={18} className="text-text-primary" />}
        </button>
      </div>

      <div className="md:hidden flex items-center gap-4">
        <button onClick={toggleTheme} className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <button className="text-text-primary/70">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
