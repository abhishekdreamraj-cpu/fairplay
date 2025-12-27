
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { REDIRECT_URL, BRAND_NAME } from '../constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Welcome to ${BRAND_NAME}! I'm your real-time AI assistant. How can I help you win today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `You are the Official AI Support Assistant for ${BRAND_NAME}. 
          Our main site is ${REDIRECT_URL}. 
          Key Features: Instant 30-second cashouts, 24/7 WhatsApp ID support, India's most liquid exchange, best odds.
          Tone: Professional, high-energy, helpful.
          If users ask for an ID, direct them to click 'GET WHATSAPP ID'.
          Keep responses concise.`,
        },
      });

      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      for await (const chunk of responseStream) {
        const text = (chunk as GenerateContentResponse).text;
        if (text) {
          fullResponse += text;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = fullResponse;
            return newMessages;
          });
        }
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having a quick technical timeout. Please use our WhatsApp support for immediate help!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] md:bottom-10 md:left-10">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 w-[90vw] md:w-[400px] h-[500px] bg-zinc-950 border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300 backdrop-blur-xl">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-brand-orange to-brand-green flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <h4 className="text-white font-black text-sm uppercase">AI Assistant</h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  <span className="text-[10px] text-white/80 font-bold uppercase">Online & Realtime</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar bg-black/40"
          >
            {messages.map((msg, i) => (
              msg.content || (isTyping && i === messages.length - 1) ? (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-brand-green text-white rounded-tr-none shadow-lg' 
                        : 'bg-zinc-900 text-gray-200 border border-white/5 rounded-tl-none'
                    }`}
                  >
                    {msg.content || (
                      <div className="flex flex-col gap-2 py-1">
                         <div className="h-2 w-24 bg-white/10 rounded overflow-hidden relative">
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                         </div>
                         <div className="h-2 w-32 bg-white/10 rounded overflow-hidden relative">
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ animationDelay: '0.2s' }}></div>
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null
            ))}
            
            {isTyping && !messages[messages.length - 1].content && (
              <div className="flex flex-col items-start gap-2 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center gap-2 ml-2">
                   <i className="fas fa-sparkles text-[10px] text-brand-orange animate-spin duration-[3000ms]"></i>
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">AI is thinking...</span>
                </div>
                <div className="bg-zinc-900 border border-white/10 p-5 rounded-2xl rounded-tl-none shadow-xl w-48">
                  <div className="space-y-3">
                    <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent animate-shimmer"></div>
                    </div>
                    <div className="h-2.5 w-4/5 bg-white/5 rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-green/20 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-zinc-900/50 border-t border-white/5">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about matches, odds, or IDs..."
                className="w-full bg-black border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group ${
          isOpen ? 'bg-zinc-800' : 'bg-gradient-to-br from-brand-orange to-brand-green'
        }`}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-headset'} transition-transform duration-500 ${isOpen ? 'rotate-90' : 'group-hover:rotate-12'}`}></i>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 border-2 border-black rounded-full animate-pulse flex items-center justify-center text-[10px] font-black">1</span>
        )}
        <div className="absolute -inset-2 bg-brand-orange/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
