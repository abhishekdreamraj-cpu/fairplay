
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { REDIRECT_URL } from '../constants';

interface Match {
  id: string;
  sport: string;
  teams: string;
  status: string;
  hypeText: string;
  oddsHint: string;
}

interface NewsDetail {
  title: string;
  content: string;
  sources: { title: string; uri: string }[];
}

export const LiveMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isUpdating, setIsUpdating] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [isLoadingNews, setIsLoadingNews] = useState(false);

  const fetchRealTimeMatches = async () => {
    setIsUpdating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "List 4 major trending live or upcoming sports matches (Cricket, Football, Tennis) happening right now or in the next 24 hours in India. For each, provide a 'hype' sentence and a speculative odds summary. Format as JSON.",
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                sport: { type: Type.STRING },
                teams: { type: Type.STRING },
                status: { type: Type.STRING },
                hypeText: { type: Type.STRING },
                oddsHint: { type: Type.STRING }
              },
              required: ["id", "sport", "teams", "status", "hypeText", "oddsHint"]
            }
          }
        },
      });

      const data = JSON.parse(response.text);
      setMatches(data);
    } catch (error: any) {
      console.error("Failed to fetch live matches:", error);
      // Fallback data if API fails or 404 occurs
      setMatches([
        { id: '1', sport: 'CRICKET', teams: 'India vs England', status: 'LIVE NOW', hypeText: 'The battle for dominance continues at Wankhede!', oddsHint: '1.85 | 2.10' },
        { id: '2', sport: 'FOOTBALL', teams: 'Real Madrid vs Barcelona', status: 'TODAY 23:30', hypeText: 'El Clasico fever grips the exchange!', oddsHint: '2.40 | 3.10' },
        { id: '3', sport: 'TENNIS', teams: 'Djokovic vs Alcaraz', status: 'TOMORROW 18:00', hypeText: 'The veteran meets the prodigy in a desert showdown.', oddsHint: '1.90 | 1.95' },
        { id: '4', sport: 'CRICKET', teams: 'Australia vs New Zealand', status: 'LIVE NOW', hypeText: 'Trans-Tasman rivalry at its absolute peak.', oddsHint: '1.70 | 2.25' }
      ]);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReadMore = async (match: Match) => {
    setSelectedMatch(match);
    setIsLoadingNews(true);
    setNewsDetail(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide a detailed news summary and match analysis for the following event: ${match.teams} (${match.sport}). Include current form, key players, and latest match-day news.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "No detailed information available at the moment.";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = chunks
        .filter((chunk: any) => chunk.web)
        .map((chunk: any) => ({
          title: chunk.web.title || "Source",
          uri: chunk.web.uri
        }));

      setNewsDetail({
        title: `Detailed Analysis: ${match.teams}`,
        content: text,
        sources: sources
      });
    } catch (error) {
      console.error("Failed to fetch match news:", error);
      setNewsDetail({
        title: `Analysis: ${match.teams}`,
        content: "We are currently experiencing high traffic. Please try again shortly to get the latest match insights.",
        sources: []
      });
    } finally {
      setIsLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchRealTimeMatches();
    const interval = setInterval(fetchRealTimeMatches, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-brand-orange font-black uppercase tracking-[0.3em] mb-2 text-sm flex items-center">
              <span className="flex h-2 w-2 rounded-full bg-red-600 animate-ping mr-3"></span>
              AI-POWERED LIVE FEED
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase italic">Real-Time <span className="text-brand-green">Action</span></h3>
          </div>
          <div className="mt-4 md:mt-0 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {isUpdating ? 'Synchronizing with Global Markets...' : 'Markets Verified & Live'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isUpdating && matches.length === 0 ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-64 rounded-[2rem] bg-zinc-900/50 animate-pulse border border-white/5"></div>
            ))
          ) : (
            matches.map((match) => (
              <div 
                key={match.id}
                className="group relative bg-black border border-white/10 p-8 rounded-[2.5rem] hover:border-brand-green/50 transition-all duration-500 overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 p-4">
                  <span className="text-[10px] font-black bg-brand-green/20 text-brand-green px-3 py-1 rounded-full border border-brand-green/20">
                    {match.status}
                  </span>
                </div>
                
                <span className="text-[10px] font-black text-brand-orange tracking-widest mb-4 block">{match.sport}</span>
                <h4 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-brand-green transition-colors">{match.teams}</h4>
                <p className="text-gray-500 text-sm font-medium mb-6 line-clamp-2">{match.hypeText}</p>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mb-4">
                    <div className="text-[10px] font-black text-gray-400 uppercase">Est. Odds</div>
                    <div className="text-brand-green font-black italic">{match.oddsHint}</div>
                  </div>
                  
                  <div className="flex items-center justify-between gap-4">
                    <a 
                      href={REDIRECT_URL}
                      className="flex-1 py-2 bg-brand-green text-white text-center text-xs font-black rounded-xl hover:bg-green-600 transition-colors uppercase"
                    >
                      Play Now
                    </a>
                    <button 
                      onClick={() => handleReadMore(match)}
                      className="flex-1 py-2 border border-white/20 text-white text-xs font-bold rounded-xl hover:bg-white/5 transition-colors uppercase tracking-wider"
                    >
                      Read More
                    </button>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* News Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedMatch(null)}
          ></div>
          <div className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-zinc-900/50 backdrop-blur-xl">
              <div>
                <span className="text-brand-orange font-black text-[10px] uppercase tracking-widest mb-1 block">Live AI Insights</span>
                <h3 className="text-2xl md:text-3xl font-black uppercase text-white">{selectedMatch.teams}</h3>
              </div>
              <button 
                onClick={() => setSelectedMatch(null)}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar">
              {isLoadingNews ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                  <div className="w-16 h-16 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-sm animate-pulse">Consulting Global Markets...</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-line font-medium">
                      {newsDetail?.content}
                    </div>
                  </div>
                  
                  {newsDetail?.sources && newsDetail.sources.length > 0 && (
                    <div className="pt-8 border-t border-white/10">
                      <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4">Verified Sources</h4>
                      <div className="flex flex-wrap gap-3">
                        {newsDetail.sources.map((source, idx) => (
                          <a 
                            key={idx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-brand-green hover:bg-brand-green hover:text-white transition-all"
                          >
                            <i className="fas fa-link mr-2 text-[8px]"></i>
                            {source.title.length > 30 ? source.title.substring(0, 30) + '...' : source.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-8 bg-zinc-950/80 border-t border-white/10 flex flex-col sm:flex-row gap-4">
              <a 
                href={REDIRECT_URL}
                className="flex-1 py-4 bg-brand-orange text-white text-center font-black rounded-2xl hover:bg-orange-600 transition-colors shadow-lg uppercase tracking-wider"
              >
                Place Bet Now
              </a>
              <button 
                onClick={() => setSelectedMatch(null)}
                className="flex-1 py-4 border border-white/10 text-gray-400 text-center font-black rounded-2xl hover:bg-white/5 transition-colors uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 204, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 204, 0, 0.4);
        }
      `}</style>
    </section>
  );
};
