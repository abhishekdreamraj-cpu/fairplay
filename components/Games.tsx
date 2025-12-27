
import React from 'react';
import { REDIRECT_URL } from '../constants';

const GameCard: React.FC<{ title: string, img: string, category: string, accent: 'orange' | 'green' }> = ({ title, img, category, accent }) => (
  <a 
    href={REDIRECT_URL}
    className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 transition-all duration-700 hover:-translate-y-4 block shadow-2xl border border-white/5"
  >
    <div className="aspect-[16/10] overflow-hidden">
      <img 
        src={`${img}?auto=format&fit=crop&q=95&w=1200&h=750`} 
        alt={`${title} - Premium Gaming Experience`} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-8">
      <span className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 block ${accent === 'orange' ? 'text-brand-orange' : 'text-brand-green'}`}>{category}</span>
      <h3 className="text-3xl font-black text-white group-hover:text-brand-green transition-colors uppercase italic tracking-tighter">{title}</h3>
    </div>
    <div className={`absolute top-6 right-6 text-white w-14 h-14 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-xl ${accent === 'orange' ? 'bg-brand-orange shadow-brand-orange/20' : 'bg-brand-green shadow-brand-green/20'}`}>
      <i className="fas fa-play text-xl ml-1"></i>
    </div>
  </a>
);

export const Games: React.FC = () => {
  const games = [
    { 
      title: "Cricket Pro", 
      img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e", 
      category: "Sports Exchange", 
      accent: "orange" 
    },
    { 
      title: "Live Roulette", 
      img: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317", 
      category: "Live Casino", 
      accent: "green" 
    },
    { 
      title: "Teen Patti", 
      img: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c", 
      category: "Indian Originals", 
      accent: "orange" 
    },
    { 
      title: "Baccarat Live", 
      img: "https://images.unsplash.com/photo-1511193311914-0346f16efe90", 
      category: "Live Casino", 
      accent: "green" 
    },
    { 
      title: "Football Elite", 
      img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018", 
      category: "Sports Exchange", 
      accent: "orange" 
    },
    { 
      title: "Andar Bahar", 
      img: "https://images.unsplash.com/photo-1626775238053-4315516eedc9", 
      category: "Live Casino", 
      accent: "green" 
    },
  ] as const;

  return (
    <section id="sports" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div id="casino" className="absolute -top-32"></div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-brand-green/10 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div className="mb-8 md:mb-0">
            <h2 className="text-brand-orange font-black uppercase tracking-[0.4em] mb-4 text-xs">ELITE GAME LIBRARY</h2>
            <h3 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter">Global <span className="text-brand-green italic">Gaming</span><br />Authority</h3>
          </div>
          <a href={REDIRECT_URL} className="group flex flex-col items-end">
            <span className="text-brand-orange font-black uppercase tracking-widest text-xs mb-2 group-hover:text-brand-green transition-colors">Explore All Markets</span>
            <div className="w-48 h-1 bg-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-orange w-1/2 group-hover:translate-x-full transition-transform duration-500"></div>
            </div>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {games.map((game, idx) => (
            <GameCard key={idx} {...game} />
          ))}
        </div>
      </div>
    </section>
  );
};
