import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/', exact: true },
  { label: 'About', href: '/about', exact: false },
  { label: 'Projects', href: '/projects', exact: false },
  { label: 'Skills', href: '/#skills', exact: false },
  { label: 'Contact', href: '/#contact', exact: false },
];

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string, exact: boolean) => {
    if (href.startsWith('/#')) return false;
    if (exact) return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`fixed top-5 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-5xl px-6 md:px-8 py-4 flex justify-between items-center backdrop-blur-xl border rounded-2xl shadow-2xl transition-all duration-500 ${
        scrolled
          ? 'bg-bg-primary/80 dark:bg-black/60 border-black/10 dark:border-white/10'
          : 'bg-white/5 dark:bg-black/20 border-black/10 dark:border-white/10'
      }`}>
        {/* Logo */}
        <Link to="/" className="text-xl font-black tracking-tighter text-text-primary hover:opacity-80 transition-opacity">
          SHUBHAM <span className="bg-gradient-to-r from-[#00d2ff] to-[#9d50bb] bg-clip-text text-transparent">YADAV</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-text-primary/70">
          {navLinks.map(link =>
            link.href.startsWith('/#') ? (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-accent-primary transition-colors uppercase tracking-widest"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={`hover:text-accent-primary transition-colors uppercase tracking-widest ${
                  isActive(link.href, link.exact) ? 'text-accent-primary' : ''
                }`}
              >
                {link.label}
              </Link>
            )
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all active:scale-95"
          >
            {theme === 'light' ? <Moon size={18} className="text-text-primary" /> : <Sun size={18} className="text-text-primary" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button onClick={() => setMobileOpen(v => !v)} className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-text-primary">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] flex flex-col pt-28 px-6 bg-bg-primary/95 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map(link =>
              link.href.startsWith('/#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-black tracking-tighter text-text-primary hover:text-accent-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-3xl font-black tracking-tighter hover:text-accent-primary transition-colors ${
                    isActive(link.href, link.exact) ? 'text-accent-primary' : 'text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
