
import React from 'react';
import { REDIRECT_URL, WHATSAPP_URL } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <h4 className="text-3xl font-black italic mb-8 uppercase tracking-tighter">
              <span className="text-brand-orange">FAIR</span>
              <span className="text-brand-green">PLAY</span>
              <span className="text-white">-247</span>
            </h4>
            <p className="text-gray-500 mb-10 leading-relaxed font-medium">
              India's premium sports and casino exchange. We set the standard for transparency, security, and gaming variety.
            </p>
            <div className="flex space-x-5">
              <a href={REDIRECT_URL} className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all transform hover:-translate-y-1">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href={REDIRECT_URL} className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all transform hover:-translate-y-1">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={REDIRECT_URL} className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-gray-400 hover:bg-brand-green hover:text-white transition-all transform hover:-translate-y-1">
                <i className="fab fa-instagram"></i>
              </a>
              <a href={WHATSAPP_URL} className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-gray-400 hover:bg-brand-green hover:text-white transition-all transform hover:-translate-y-1">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-black mb-8 text-brand-orange uppercase tracking-widest">Navigation</h5>
            <ul className="space-y-4 text-gray-500 font-bold">
              <li><a href="#sports" className="hover:text-brand-green transition-colors">CRICKET EXCHANGE</a></li>
              <li><a href="#casino" className="hover:text-brand-green transition-colors">LIVE CASINO</a></li>
              <li><a href={REDIRECT_URL} className="hover:text-brand-green transition-colors">PROMOTIONS</a></li>
              <li><a href={REDIRECT_URL} className="hover:text-brand-green transition-colors">VIP PROGRAM</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-black mb-8 text-brand-green uppercase tracking-widest">Legal & Help</h5>
            <ul className="space-y-4 text-gray-500 font-bold">
              <li><a href={REDIRECT_URL} className="hover:text-brand-orange transition-colors">HELP CENTER</a></li>
              <li><a href={REDIRECT_URL} className="hover:text-brand-orange transition-colors">PRIVACY POLICY</a></li>
              <li><a href={REDIRECT_URL} className="hover:text-brand-orange transition-colors">COOKIES POLICY</a></li>
              <li><a href={REDIRECT_URL} className="hover:text-brand-orange transition-colors">GAME INTEGRITY</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-black mb-8 text-white uppercase tracking-widest">Join The Winning Team</h5>
            <p className="text-gray-500 mb-6 font-medium">Ready to claim your exclusive joining bonus? Connect with us on WhatsApp now.</p>
            <a href={WHATSAPP_URL} className="flex items-center justify-center space-x-3 w-full py-4 bg-brand-green text-white font-black rounded-xl hover:bg-green-600 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-green/30 transition-all group">
              <i className="fab fa-whatsapp text-xl"></i>
              <span>INSTANT WHATSAPP ID</span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 text-center">
          <div className="flex flex-wrap justify-center gap-10 mb-12 opacity-30 grayscale contrast-150">
             <i className="fab fa-cc-visa text-4xl"></i>
             <i className="fab fa-cc-mastercard text-4xl"></i>
             <i className="fab fa-google-pay text-4xl"></i>
             <i className="fab fa-bitcoin text-4xl"></i>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-2xl mb-10 max-w-5xl mx-auto border border-white/5">
            <p className="text-gray-500 text-xs font-bold leading-relaxed uppercase tracking-wider">
              Responsible Gaming: Online gaming involves financial risk. Participate only if you are 18+. Setting limits is recommended. If you experience gaming-related issues, please reach out to our support team immediately. 
            </p>
          </div>
          <p className="text-gray-700 text-[10px] font-bold tracking-[0.2em] uppercase">
            © 2024 <span className="text-brand-orange">FAIR</span><span className="text-brand-green">PLAY</span>-247 • ALL SYSTEMS OPERATIONAL • SECURE REDIRECT TO FAIRPLAY247.GOLD
          </p>
        </div>
      </div>
    </footer>
  );
};
