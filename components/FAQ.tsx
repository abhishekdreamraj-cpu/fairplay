
import React, { useState } from 'react';

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border-b border-gray-800">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-brand-orange transition-colors"
      >
        <span className="text-xl font-bold">{question}</span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-brand-green`}></i>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-400 text-lg leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How do I create a Fairplay-247 account?",
      answer: "Click on the 'Join Now' button. You'll be redirected to our registration portal where you can provide basic details or connect via WhatsApp to get your ID instantly."
    },
    {
      question: "Is Fairplay-247 legal and safe?",
      answer: "Yes, Fairplay-247 is a fully licensed and encrypted gaming platform. We use advanced SSL technology to protect your data and ensure fair play across all games."
    },
    {
      question: "What is the minimum withdrawal amount?",
      answer: "We offer very low withdrawal limits starting from just ₹500, making it easy for players to access their funds quickly."
    },
    {
      question: "How long do deposits take?",
      answer: "Most deposits are processed instantly via UPI, Net Banking, or popular wallets. Your balance will reflect in your game wallet as soon as the transaction is confirmed."
    },
    {
      question: "Can I play on my mobile phone?",
      answer: "Absolutely! Our website is fully mobile-responsive, and you can also download our dedicated app for a faster, more convenient experience."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-brand-orange font-bold uppercase tracking-widest mb-2">Questions?</h2>
          <h3 className="text-4xl md:text-5xl font-black">Frequently Asked <span className="text-brand-green">Questions</span></h3>
        </div>
        
        <div className="bg-black/50 p-8 rounded-3xl border border-gray-900 shadow-2xl">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};
