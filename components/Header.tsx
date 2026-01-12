import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleNavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const href = (e.target as HTMLAnchorElement).getAttribute('href');
    if (href) {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference text-white"
      >
        <div className="text-2xl font-display font-bold tracking-tighter uppercase cursor-pointer">
          SAM'S <span className="text-sanctum-orange">FITNESS</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              className="text-xs font-bold tracking-widest hover:text-sanctum-orange transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? "0%" : "100%" }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[60] bg-sanctum-black text-white flex flex-col justify-center items-center"
        style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
      >
        <button 
          className="absolute top-6 right-6"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="w-8 h-8 text-white" />
        </button>
        
        <div className="flex flex-col gap-8 text-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-sanctum-orange transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Header;