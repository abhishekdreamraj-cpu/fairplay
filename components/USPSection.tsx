
import React from 'react';

const USPItem: React.FC<{ 
  title: string; 
  desc: string; 
  icon: string; 
  badge: string; 
  color: 'orange' | 'green' 
}> = ({ title, desc, icon, badge, color }) => (
  <div className="relative group bg-zinc-900/30 border border-white/5 p-8 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:bg-zinc-900/60 hover:border-white/10">
    <div className={`absolute -right-4 -top-4 w-32 h-32 blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${color === 'orange' ? 'bg-brand-orange' : 'bg-brand-green'}`}></div>
    
    <div className="flex flex-col h-full relative z-10">
      <div className="flex justify-between items-start mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${color === 'orange' ? 'bg-brand-orange text-white' : 'bg-brand-green text-white'}`}>
          <i className={icon}></i>
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${color === 'orange' ? 'border-brand-orange/30 text-brand-orange' : 'border-brand-green/30 text-brand-green'}`}>
          {badge}
        </span>
      </div>
      
      <h4 className="text-2xl font-black mb-4 tracking-tight uppercase italic">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i === 0 && color === 'orange' ? 'text-brand-orange' : i === 0 && color === 'green' ? 'text-brand-green' : 'text-white'}>
            {word}{' '}
          </span>
        ))}
      </h4>
      
      <p className="text-gray-400 font-medium leading-relaxed mt-auto">
        {desc}
      </p>
    </div>
  </div>
);

export const USPSection: React.FC = () => {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <USPItem 
            title="Instant Settlements"
            desc="Experience zero-lag market settlements. Your winnings are updated in real-time, every time."
            icon="fas fa-bolt-lightning"
            badge="Performance"
            color="orange"
          />
          <USPItem 
            title="Global Markets"
            desc="Access thousands of international sports markets with the highest liquidity in the industry."
            icon="fas fa-globe"
            badge="Coverage"
            color="green"
          />
          <USPItem 
            title="Provably Fair"
            desc="Our advanced algorithms ensure 100% transparency in every card dealt and every spin made."
            icon="fas fa-scale-balanced"
            badge="Trust"
            color="orange"
          />
          <USPItem 
            title="VIP Treatment"
            desc="Exclusive limits, faster processing, and dedicated hosts for our high-tier exchange players."
            icon="fas fa-crown"
            badge="Premium"
            color="green"
          />
        </div>
      </div>
    </section>
  );
};
