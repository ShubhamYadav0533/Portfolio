import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-4xl p-4 md:px-8 flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
      <div className="text-xl font-black tracking-tighter text-white">
        SHUBHAM <span className="bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] bg-clip-text text-transparent">YADAV</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
        <a href="#home" className="hover:text-[#00d2ff] transition-colors">Home</a>
        <a href="#education" className="hover:text-[#00d2ff] transition-colors">Education</a>
        <a href="#skills" className="hover:text-[#00d2ff] transition-colors">Skills</a>
        <a href="#contact" className="hover:text-[#00d2ff] transition-colors">Contact</a>
      </div>
      {/* Mobile Menu Button - Minimal version */}
      <button className="md:hidden text-white/70">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg></button>
    </nav>
  );
};

export default Navbar;
