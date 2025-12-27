
import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LiveMatches } from './components/LiveMatches';
import { Games } from './components/Games';
import { Features } from './components/Features';
import { USPSection } from './components/USPSection';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Button } from './components/Button';
import { CookieBanner } from './components/CookieBanner';
import { REDIRECT_URL } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-orange selection:text-white">
      <Header />
      
      <main>
        <Hero />
        
        {/* Animated Trust Streamer */}
        <div className="relative py-8 bg-black border-y border-white/5 overflow-hidden group">
          <div className="animate-marquee inline-block whitespace-nowrap">
            {[1, 2, 3, 4].map((i) => (
              <React.Fragment key={i}>
                <span className="mx-12 text-brand-orange font-black uppercase text-2xl italic tracking-tighter">FAIRPLAY-247.GOLD</span>
                <span className="mx-12 text-white/40 font-black uppercase text-2xl tracking-tighter">INSTANT CASH OUT ⚡</span>
                <span className="mx-12 text-brand-green font-black uppercase text-2xl italic tracking-tighter">LIVE MATCHES 24/7</span>
                <span className="mx-12 text-white/40 font-black uppercase text-2xl tracking-tighter">BEST EXCHANGE ODDS 🏆</span>
              </React.Fragment>
            ))}
          </div>
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-25%); }
            }
            .animate-marquee {
              display: inline-block;
              animation: marquee 40s linear infinite;
            }
          `}</style>
        </div>

        <LiveMatches />
        <Games />
        <Features />
        <USPSection />
        
        {/* High-Contrast Brand Section */}
        <section className="py-32 relative overflow-hidden bg-zinc-950">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[150px] -mr-96"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[150px] -ml-96"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[3rem] text-center shadow-2xl">
              <h3 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase">
                Ready to Join <br />
                The <span className="text-brand-orange italic">ELITE</span> Exchange?
              </h3>
              <p className="text-gray-400 text-xl md:text-2xl mb-14 font-medium max-w-3xl mx-auto leading-relaxed">
                Experience the perfect blend of technology and entertainment. Our platform is engineered for those who demand <span className="text-brand-green font-bold">FAIR PLAY</span> and <span className="text-brand-orange font-bold">FAST RESULTS</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button text="PLAY NOW @ FAIRPLAY247.GOLD" variant="brand-split" className="text-xl px-12 py-6 shadow-[0_20px_40px_rgba(255,102,0,0.3)] w-full sm:w-auto" />
                <Button text="LOGIN VIA WHATSAPP" variant="secondary" className="text-xl px-12 py-6 shadow-[0_20px_40px_rgba(0,204,0,0.2)] w-full sm:w-auto" />
              </div>
              <p className="mt-10 text-gray-600 font-bold uppercase tracking-widest text-xs">OFFICIAL DOMAIN: FAIRPLAY247.GOLD</p>
            </div>
          </div>
        </section>

        <FAQ />
      </main>

      <Footer />
      
      <CookieBanner />

      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="flex gap-2">
          <Button text="PLAY NOW" variant="brand-split" className="flex-1 py-4 text-[10px] font-black shadow-lg" />
          <Button text="REGISTER" variant="secondary" className="flex-1 py-4 text-[10px] font-black shadow-lg" />
        </div>
      </div>

      <a 
        href={REDIRECT_URL} 
        className="fixed bottom-24 right-6 z-50 w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center text-white text-3xl shadow-[0_15px_30px_rgba(0,204,0,0.4)] hover:scale-110 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,204,0,0.6)] active:scale-95 transition-all md:bottom-10 md:right-10 group"
      >
        <i className="fab fa-whatsapp group-hover:rotate-12 transition-transform"></i>
        <div className="absolute -inset-2 bg-brand-green/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="absolute right-full mr-4 bg-brand-green text-white text-[10px] font-black py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-xl whitespace-nowrap hidden lg:block uppercase">GET INSTANT ID</span>
      </a>
    </div>
  );
};

export default App;
