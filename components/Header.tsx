
import React, { useState, useEffect } from 'react';
import { REDIRECT_URL } from '../constants';
import { Button } from './Button';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg border-b border-gray-800' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href={REDIRECT_URL} className="flex items-center group border border-blue-500/30 px-2 py-1">
          <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">
            <span className="text-brand-orange">FAIR</span>
            <span className="text-brand-green">PLAY</span>
            <span className="text-white">-247</span>
          </span>
        </a>
        
        <nav className="hidden lg:flex items-center space-x-10 font-bold text-sm tracking-widest text-white/90">
          <a href="#sports" className="hover:text-brand-orange transition-colors">SPORTS</a>
          <a href="#casino" className="hover:text-brand-green transition-colors">CASINO</a>
          <a href="#features" className="hover:text-brand-orange transition-colors">FEATURES</a>
          <a href="#faq" className="hover:text-brand-green transition-colors">FAQ</a>
          <a href={REDIRECT_URL} className="hover:text-brand-orange transition-colors">LOGIN</a>
        </nav>

        <div className="flex items-center">
          <Button text="JOIN NOW" variant="primary" className="py-2 px-10 text-sm font-black rounded-full shadow-[0_0_20px_rgba(255,102,0,0.4)]" />
        </div>
      </div>
    </header>
  );
};
