
import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('cookies-accepted');
    if (!hasAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-slide-up">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-lg font-black text-white mb-2 tracking-tight flex items-center justify-center md:justify-start">
              <i className="fas fa-cookie-bite text-brand-orange mr-2"></i>
              WE VALUE YOUR PRIVACY
            </h4>
            <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
              Fairplay-247 uses cookies to enhance your gaming experience, analyze traffic, and personalize content. By clicking "Accept All", you agree to our use of cookies in accordance with our <a href="#" className="text-brand-green hover:underline">Privacy Policy</a>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button 
              onClick={() => {}} 
              className="px-8 py-3 rounded-full border border-brand-green text-brand-green font-bold text-sm hover:bg-brand-green hover:text-white hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
            >
              MANAGE SETTINGS
            </button>
            <button 
              onClick={handleAccept}
              className="px-8 py-3 rounded-full bg-brand-orange text-white font-black text-sm shadow-[0_10px_20px_rgba(255,102,0,0.3)] hover:shadow-[0_15px_30px_rgba(255,102,0,0.5)] hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
            >
              ACCEPT ALL
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};
