import React, { useEffect, useState } from 'react';
import { Painting } from '../types';
import { Calendar, User, Palette, Brush, Eye, ImageOff } from 'lucide-react';


interface PaintingDetailProps {
  painting: Painting;
}

type TabType = 'palette' | 'technique' | 'details';

const PaintingDetail: React.FC<PaintingDetailProps> = ({ painting }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('palette');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    setActiveTab('palette');
    setImgError(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [painting.id]);

  return (
    <div className={`
      grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-6 
      transition-opacity duration-700 ease-in-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}>
      {/* Image & Toolkit Section */}
      <div className="lg:col-span-5 flex flex-col items-center gap-6">
        <div className="relative group w-full rounded-lg overflow-hidden shadow-2xl shadow-black/50 border-4 border-gray-800 bg-black min-h-[300px] flex items-center justify-center">
          {!imgError ? (
            <img 
              src={painting.imageUrl} 
              alt={painting.title}
              className="w-full h-auto max-h-[70vh] object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="text-gray-500 flex flex-col items-center p-8 text-center">
              <ImageOff className="w-12 h-12 mb-2 opacity-50" />
              <p className="font-serif italic">Image currently unavailable</p>
            </div>
          )}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none"></div>
        </div>

        {/* Artist's Toolkit (Below Image) */}
        <div className="w-full bg-gray-900/80 rounded-xl border border-gray-700 overflow-hidden shadow-lg backdrop-blur-sm">
          <div className="flex border-b border-gray-700">
            <button 
              onClick={() => setActiveTab('palette')}
              className={`flex-1 py-3 px-2 flex items-center justify-center gap-2 text-xs md:text-sm font-medium transition-colors ${activeTab === 'palette' ? 'bg-gold-500/10 text-gold-500 border-b-2 border-gold-500' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
            >
              <Palette className="w-4 h-4" /> Color Palette
            </button>
            <button 
              onClick={() => setActiveTab('technique')}
              className={`flex-1 py-3 px-2 flex items-center justify-center gap-2 text-xs md:text-sm font-medium transition-colors ${activeTab === 'technique' ? 'bg-gold-500/10 text-gold-500 border-b-2 border-gold-500' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
            >
              <Brush className="w-4 h-4" /> Technique
            </button>
            <button 
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-3 px-2 flex items-center justify-center gap-2 text-xs md:text-sm font-medium transition-colors ${activeTab === 'details' ? 'bg-gold-500/10 text-gold-500 border-b-2 border-gold-500' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
            >
              <Eye className="w-4 h-4" /> Details
            </button>
          </div>
          
          <div className="p-5 min-h-[120px] flex items-center justify-center">
            {activeTab === 'palette' && (
              <div className="w-full">
                 <p className="text-gray-400 text-xs mb-3 text-center uppercase tracking-widest">Master's Palette</p>
                 <div className="flex justify-center gap-4 flex-wrap">
                  {painting.colorPalette.map((color, idx) => (
                    <div key={idx} className="group relative flex flex-col items-center gap-1">
                      <div 
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg ring-2 ring-white/10 transition-transform hover:scale-110 cursor-help"
                        style={{ backgroundColor: color }}
                      />
                      <span className="opacity-0 group-hover:opacity-100 absolute -bottom-6 text-[10px] bg-black text-white px-2 py-0.5 rounded transition-opacity whitespace-nowrap z-10">
                        {color}
                      </span>
                    </div>
                  ))}
                 </div>
              </div>
            )}

            {activeTab === 'technique' && (
              <div className="text-center animate-in fade-in duration-300">
                <p className="text-gray-400 text-xs mb-2 uppercase tracking-widest">Methodology</p>
                <p className="text-gray-200 font-serif italic text-lg">{painting.technique}</p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="text-center animate-in fade-in duration-300">
                 <p className="text-gray-400 text-xs mb-2 uppercase tracking-widest">Critical Detail</p>
                 <p className="text-gray-300 text-sm leading-relaxed">{painting.details}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="lg:col-span-7 flex flex-col text-left">
        <div className="border-b border-gray-800 pb-6 mb-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gold-500 mb-2 leading-tight">
            {painting.title}
          </h1>
          <div className="flex flex-wrap gap-4 mt-4 text-gray-400 text-sm font-sans tracking-wide uppercase">
            <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1 rounded">
              <User className="w-4 h-4" />
              <span>{painting.artist}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1 rounded">
              <Calendar className="w-4 h-4" />
              <span>{painting.year}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1 rounded">
              <Palette className="w-4 h-4" />
              <span>{painting.style}</span>
            </div>
          </div>
        </div>

        <div className="space-y-8 pr-4 overflow-y-auto max-h-[calc(100vh-300px)] hide-scrollbar">
          {/* Analysis */}
          <section>
            <h2 className="text-2xl font-serif text-gray-100 mb-3 border-l-4 border-gold-500 pl-4">
              The Masterpiece
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              {painting.analysis}
            </p>
          </section>

          {/* Biography */}
          <section>
            <h2 className="text-2xl font-serif text-gray-100 mb-3 border-l-4 border-gray-700 pl-4">
              About the Artist
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              {painting.biography}
            </p>
          </section>

     
        </div>
      </div>
    </div>
  );
};

export default PaintingDetail;
