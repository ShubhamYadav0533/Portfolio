import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Rocket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
 { label: 'Home', href: '/', exact: true },
 { label: 'About', href: '/about', exact: false },
 { label: 'Projects', href: '/projects', exact: false },
 { label: 'Skills', href: '/skills', exact: false },
 { label: 'Contact', href: '/contact', exact: false },
];

const Navbar: React.FC = () => {
 const { theme, toggleTheme } = useTheme();
 const [mobileOpen, setMobileOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const location = useLocation();

 useEffect(() => {
 const onScroll = () => setScrolled(window.scrollY > 20);
 window.addEventListener('scroll', onScroll, { passive: true });
 return () => window.removeEventListener('scroll', onScroll);
 }, []);

 const isActive = (href: string, exact: boolean) => {
 if (href.startsWith('/#')) return false;
 if (exact) return location.pathname === href;
 return location.pathname.startsWith(href);
 };

 return (
 <>
 <motion.nav
 initial={{ y: -100 }}
 animate={{ y: 0 }}
 transition={{ type: 'spring', stiffness: 100, damping: 20 }}
 className={`fixed top-6 left-0 right-0 mx-auto z-[1000] w-[92%] max-w-6xl px-4 md:px-8 py-3 flex justify-between items-center glass rounded-2xl shadow-xl transition-all duration-300 ${
 scrolled ? 'py-2.5 w-[90%] shadow-2xl' : 'py-4'
 }`}
 >
 {/* Logo Section */}
 <Link to="/" className="group flex items-center gap-2">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
 <Rocket className="text-white w-5 h-5" />
 </div>
 <div className="flex flex-col -gap-1">
 <span className="text-lg font-black tracking-tight text-text-primary leading-none">
 SHUBHAM <span className="text-accent-primary">YADAV</span>
 </span>
 <span className="text-[10px] font-bold text-text-tertiary tracking-[0.2em]">Creative Dev</span>
 </div>
 </Link>

 {/* Desktop Nav Links */}
 <div className="hidden md:flex items-center gap-1">
 {navLinks.map(link => {
 const active = isActive(link.href, link.exact);
 return (
 <div key={link.label} className="relative px-4 py-2">
 {link.href.startsWith('/#') ? (
 <a
 href={link.href}
 className="relative z-10 text-[11px] font-black tracking-[0.15em] text-text-secondary hover:text-accent-primary transition-colors duration-300"
 >
 {link.label}
 </a>
 ) : (
 <Link
 to={link.href}
 className={`relative z-10 text-[11px] font-black tracking-[0.15em] transition-colors duration-300 ${
 active ? 'text-accent-primary' : 'text-text-secondary hover:text-accent-primary'
 }`}
 >
 {link.label}
 </Link>
 )}
 {active && (
 <motion.div
 layoutId="nav-active"
 className="absolute inset-0 bg-accent-primary/5 rounded-xl border border-accent-primary/10"
 transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
 />
 )}
 </div>
 );
 })}
 </div>

 {/* Actions */}
 <div className="flex items-center gap-2">
 <button
 onClick={toggleTheme}
 className="p-2.5 rounded-xl text-text-secondary hover:text-accent-primary hover:bg-accent-primary/5 transition-all active:scale-90"
 aria-label="Toggle theme"
 >
 {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
 </button>
 
 <Link
 to="/#contact"
 className="hidden md:flex px-6 py-2.5 rounded-xl bg-text-primary text-bg-primary text-[11px] font-black tracking-widest hover:bg-accent-primary hover:scale-105 transition-all duration-300 active:scale-95"
 >
 Let's Talk
 </Link>

 <button
 onClick={() => setMobileOpen(!mobileOpen)}
 className="md:hidden p-2.5 rounded-xl text-text-primary hover:bg-accent-primary/5 transition-all"
 aria-label="Menu"
 >
 {mobileOpen ? <X size={24} /> : <Menu size={24} />}
 </button>
 </div>
 </motion.nav>

 {/* Mobile Menu */}
 <AnimatePresence>
 {mobileOpen && (
 <motion.div
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 className="fixed inset-0 z-[999] bg-bg-primary/95 backdrop-blur-2xl md:hidden pt-32 px-8 flex flex-col gap-8"
 >
 {navLinks.map((link, i) => (
 <motion.div
 key={link.label}
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: i * 0.05 }}
 >
 {link.href.startsWith('/#') ? (
 <a
 href={link.href}
 onClick={() => setMobileOpen(false)}
 className="text-4xl font-black tracking-tight text-text-primary hover:text-accent-primary transition-colors"
 >
 {link.label}
 </a>
 ) : (
 <Link
 to={link.href}
 onClick={() => setMobileOpen(false)}
 className={`text-4xl font-black tracking-tight hover:text-accent-primary transition-colors ${
 isActive(link.href, link.exact) ? 'text-accent-primary' : 'text-text-primary'
 }`}
 >
 {link.label}
 </Link>
 )}
 </motion.div>
 ))}
 </motion.div>
 )}
 </AnimatePresence>
 </>
 );
};

export default Navbar;
