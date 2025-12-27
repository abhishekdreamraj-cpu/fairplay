
import React from 'react';
import { REDIRECT_URL } from '../constants';

interface ButtonProps {
  text: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'brand-split';
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ text, className = '', variant = 'primary', href = REDIRECT_URL }) => {
  const baseStyles = "px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 active:scale-95 text-center inline-block whitespace-nowrap overflow-hidden relative group";
  
  const variants = {
    primary: "bg-brand-orange hover:bg-orange-500 text-white shadow-[0_10px_20px_rgba(255,102,0,0.3)] hover:shadow-[0_20px_40px_rgba(255,102,0,0.6)]",
    secondary: "bg-brand-green hover:bg-green-500 text-white shadow-[0_10px_20px_rgba(0,204,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,204,0,0.5)]",
    outline: "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white shadow-none hover:shadow-[0_15px_30px_rgba(0,204,0,0.4)]",
    'brand-split': "bg-gradient-to-r from-brand-orange from-50% to-brand-green to-50% text-white shadow-[0_10px_30px_rgba(255,102,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,204,0,0.4)]"
  };

  return (
    <a 
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{text}</span>
      {variant === 'brand-split' && (
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      )}
    </a>
  );
};
