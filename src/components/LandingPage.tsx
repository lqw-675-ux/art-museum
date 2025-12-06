import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore }) => {
  const [isFading, setIsFading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Staggered animation on mount
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsFading(true);
    setTimeout(onExplore, 800); // Wait for transition to finish before unmounting
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-0 left-0 w-64 h-64 border-t border-l border-gold-500/30 rounded-tl-3xl m-8"></div>
         <div className="absolute bottom-0 right-0 w-64 h-64 border-b border-r border-gold-500/30 rounded-br-3xl m-8"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className={`relative z-10 text-center px-6 transition-all duration-1000 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <p className="text-gold-500 text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-light">
          Welcome to the
        </p>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
          Western Art <br/>
          <span className="italic text-gold-500">Time Machine</span>
        </h1>

        <div className="w-24 h-px bg-gold-500/50 mx-auto my-8"></div>

        <p className="max-w-xl mx-auto text-gray-400 text-lg font-light leading-relaxed mb-12">
          Step into a curated sanctuary of color, shadow, and history. 
          Discover the techniques and stories behind humanity's greatest visual achievements.
        </p>

        <button 
          onClick={handleClick}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-gold-500 text-gold-500 text-sm md:text-base uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-all duration-500 ease-out overflow-hidden"
        >
          <span className="relative z-10 font-bold">Explore Collection</span>
          <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;