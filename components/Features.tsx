
import React from 'react';

const FeatureItem: React.FC<{ icon: string, title: string, desc: string, color: 'orange' | 'green' }> = ({ icon, title, desc, color }) => (
  <div className="p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-all duration-500 group relative overflow-hidden">
    <div className={`absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity ${color === 'orange' ? 'bg-brand-orange' : 'bg-brand-green'}`}></div>
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${color === 'orange' ? 'bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white group-hover:rotate-6' : 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white group-hover:-rotate-6'}`}>
      <i className={`${icon} text-3xl`}></i>
    </div>
    <h4 className="text-2xl font-black mb-4 tracking-tight group-hover:text-white transition-colors">{title}</h4>
    <p className="text-gray-500 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">{desc}</p>
  </div>
);

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-brand-orange font-black uppercase tracking-widest text-sm mb-4">THE FAIRPLAY EDGE</h2>
          <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight uppercase tracking-tighter">
            Why Experience Matters at <br />
            <span className="italic">
              <span className="text-brand-orange">FAIR</span>
              <span className="text-brand-green">PLAY</span>
              <span className="text-white">-247</span>
            </span>
          </h3>
          <p className="text-gray-500 text-xl font-medium">We've built a legacy on trust, speed, and providing the best gaming environment for our players since day one.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureItem 
            icon="fas fa-bolt-lightning" 
            title="Express Cashout" 
            desc="Our proprietary automated withdrawal engine ensures your winnings are in your bank in record time." 
            color="orange"
          />
          <FeatureItem 
            icon="fas fa-trophy" 
            title="Premium Odds" 
            desc="Don't settle for less. We provide the industry's highest value odds across every major sport exchange market." 
            color="green"
          />
          <FeatureItem 
            icon="fas fa-shield-halved" 
            title="Secure Infrastructure" 
            desc="Military-grade encryption protects every transaction and piece of data on our decentralized platform." 
            color="orange"
          />
          <FeatureItem 
            icon="fas fa-mobile-screen" 
            title="Native Experience" 
            desc="Switch between desktop and mobile with zero lag. Our platform is built for high-performance mobile gaming." 
            color="green"
          />
          <FeatureItem 
            icon="fas fa-gift" 
            title="Loyalty Rebates" 
            desc="The more you play, the more you earn. Our rebate system rewards consistent players with weekly cashbacks." 
            color="orange"
          />
          <FeatureItem 
            icon="fas fa-headset" 
            title="Personal VIP Host" 
            desc="High-volume players enjoy dedicated account managers available via direct call and WhatsApp 24/7." 
            color="green"
          />
        </div>
      </div>
    </section>
  );
};
