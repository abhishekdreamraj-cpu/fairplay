
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Button } from './Button';
import { REDIRECT_URL, WHATSAPP_URL } from '../constants';

const FALLBACK_POSTERS = [
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=95&w=1920", // Stadium
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=95&w=1920", // Cricket
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=95&w=1920", // Football
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=95&w=1920"  // Multi-sport
];

const getRandomFallback = () => FALLBACK_POSTERS[Math.floor(Math.random() * FALLBACK_POSTERS.length)];

export const Hero: React.FC = () => {
  const [bgImage, setBgImage] = useState<string>(getRandomFallback());
  const [isLoading, setIsLoading] = useState(true);
  const [trendTitle, setTrendTitle] = useState("LIVE NOW: GLOBAL CRICKET CHAMPIONSHIP");
  const generationInterval = useRef<number | null>(null);
  const retryCount = useRef(0);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const syncVisualsWithTrends = async () => {
    try {
      setIsLoading(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Step 1: Get Match Context and Time Context using Gemini 3 Flash
      // This part usually has higher quota limits
      const contextResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Identify the top major sports match (Cricket/Football) involving India or a global championship happening right now or today. Also, determine the current time of day lighting (Dawn, Midday, Sunset, or Late Night) for an epic stadium photo. Return ONLY the match and lighting, e.g. 'India vs England, Sunset Lighting'.",
        config: { tools: [{ googleSearch: {} }] }
      });
      
      const context = contextResponse.text?.trim() || "Elite Sports Championship, Night Lighting";
      const [matchName, lighting] = context.split(',').map(s => s.trim());
      
      setTrendTitle(`LIVE NOW: ${matchName.toUpperCase()}`);

      // Step 2: Generate unique cinematic background using Imagen
      // We implement a wrap with error handling for 429
      const generateImageWithFallback = async () => {
        try {
          const imageResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `A hyper-realistic 8k cinematic poster-style wide shot of a professional sports stadium for ${matchName}. The scene is illuminated by dramatic ${lighting}. Atmospheric stadium smoke, intense floodlights, professional broadcast camera angle, sharp textures, premium aesthetic, no text or watermarks.`,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '16:9',
            },
          });

          if (imageResponse.generatedImages && imageResponse.generatedImages[0]) {
            const base64 = imageResponse.generatedImages[0].image.imageBytes;
            setBgImage(`data:image/jpeg;base64,${base64}`);
            retryCount.current = 0; // Reset on success
          }
        } catch (imgError: any) {
          const isQuotaError = imgError?.status === "RESOURCE_EXHAUSTED" || imgError?.message?.includes("429");
          
          if (isQuotaError && retryCount.current < 2) {
            retryCount.current++;
            const backoffTime = Math.pow(2, retryCount.current) * 2000;
            console.warn(`Imagen quota exceeded. Retrying in ${backoffTime}ms...`);
            await sleep(backoffTime);
            return generateImageWithFallback();
          }
          
          throw imgError; // Propagate to outer catch if retries fail or not quota error
        }
      };

      await generateImageWithFallback();

    } catch (error: any) {
      console.error("Hero Sync Logic Error:", error);
      // If we hit any error (429 or otherwise), we use our high-quality curated poster set
      setBgImage(getRandomFallback());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    syncVisualsWithTrends();
    // Refresh every 15 minutes to keep it dynamic, or longer if we hit quota issues
    generationInterval.current = window.setInterval(syncVisualsWithTrends, 900000); 
    return () => {
      if (generationInterval.current) clearInterval(generationInterval.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-orange/10 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-green/10 rounded-full blur-[180px]"></div>
        
        <div className={`w-full h-full transition-all duration-[3000ms] ease-out ${isLoading ? 'scale-110 opacity-30 blur-md' : 'scale-100 opacity-50'}`}>
          <img 
            src={bgImage} 
            className="w-full h-full object-cover transition-opacity duration-1000"
            alt="Real-time Sports Visual"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_POSTERS[0];
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-left relative">
          {/* Trend Badge */}
          <div className="inline-flex items-center space-x-5 bg-white/5 backdrop-blur-3xl border border-white/10 px-8 py-4 rounded-3xl mb-16 animate-fade-in group cursor-default shadow-2xl">
            <div className="relative flex">
              <span className="h-4 w-4 rounded-full bg-brand-orange shadow-[0_0_15px_#FF6600] animate-pulse"></span>
              <span className="absolute inset-0 h-4 w-4 rounded-full bg-brand-orange animate-ping opacity-20"></span>
            </div>
            <span className="text-[13px] font-black tracking-[0.3em] text-white uppercase whitespace-nowrap">
              {trendTitle}
            </span>
          </div>

          <div className="mb-16">
            <h1 className="text-8xl md:text-[11rem] font-black leading-[0.75] tracking-tighter">
              <span className="block text-white transition-all hover:translate-x-4 duration-700">Experience</span>
              <span className="block text-white italic transition-all hover:-translate-x-4 duration-700">Next-Gen</span>
            </h1>
            <div className="mt-10 flex items-center gap-6">
              <span className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter flex items-center">
                <span className="text-brand-orange">FAIR</span>
                <span className="text-brand-green">PLAY</span>
                <span className="text-white">-247</span>
              </span>
              <div className="hidden lg:block h-2 bg-gradient-to-r from-brand-orange to-brand-green flex-1 rounded-full opacity-30"></div>
            </div>
          </div>

          <p className="text-2xl md:text-3xl text-gray-400 mb-20 max-w-3xl leading-tight font-bold tracking-tight">
            Redefining the standard of <span className="text-brand-orange underline decoration-8 underline-offset-[12px] decoration-brand-orange/20">Excellence</span> and <span className="text-brand-green underline decoration-8 underline-offset-[12px] decoration-brand-green/20">Integrity</span> in Indian Gaming.
          </p>

          <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-12 justify-start items-center">
            <Button 
              text="PLAY NOW" 
              variant="brand-split" 
              href={REDIRECT_URL} 
              className="text-3xl px-24 py-10 uppercase font-black tracking-widest min-w-[320px] shadow-[0_25px_60px_rgba(255,102,0,0.3)]" 
            />
            <a 
              href={WHATSAPP_URL}
              className="flex items-center gap-6 text-2xl font-black text-white hover:text-brand-green transition-all group"
            >
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-green group-hover:scale-110 transition-all duration-500 shadow-xl">
                <i className="fab fa-whatsapp text-3xl"></i>
              </div>
              <span className="uppercase tracking-widest border-b-4 border-transparent group-hover:border-brand-green pb-1 transition-all">Get ID Instantly</span>
            </a>
          </div>
          
          <div className="mt-32 pt-16 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2">
                <span className="text-brand-orange font-black text-xs uppercase tracking-widest">Support</span>
                <span className="text-gray-400 font-bold text-sm">24/7 INSTANT WHATSAPP</span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-brand-green font-black text-xs uppercase tracking-widest">Withdrawal</span>
                <span className="text-gray-400 font-bold text-sm">30-SEC AUTOMATED</span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-brand-orange font-black text-xs uppercase tracking-widest">Security</span>
                <span className="text-gray-400 font-bold text-sm">PROVABLY FAIR TECH</span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-brand-green font-black text-xs uppercase tracking-widest">Bonus</span>
                <span className="text-gray-400 font-bold text-sm">500% JOINING OFFER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
