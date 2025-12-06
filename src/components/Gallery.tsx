import React, { useRef, useEffect } from 'react';
import { Painting } from '../types';

interface GalleryProps {
  paintings: Painting[];
  onSelect: (painting: Painting) => void;
  selectedId: string | null;
}

const Gallery: React.FC<GalleryProps> = ({ paintings, onSelect, selectedId }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // If the scroll is vertical (standard mouse wheel), map it to horizontal scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="w-full py-6 group">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 px-4 pb-4 hide-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
      >
        {paintings.map((painting) => (
          <div
            key={painting.id}
            onClick={() => onSelect(painting)}
            className={`
              flex-shrink-0 cursor-pointer snap-center
              relative overflow-hidden rounded-lg shadow-lg 
              transition-all duration-300 transform
              w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56
              ${selectedId === painting.id 
                ? 'ring-4 ring-gold-500 scale-105 z-10' 
                : 'opacity-70 hover:opacity-100 hover:scale-105'
              }
            `}
          >
            <img 
              src={painting.thumbnailUrl} 
              alt={painting.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                // Fallback or visual indication if image fails
                e.currentTarget.style.opacity = '0.5';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-2 md:p-3">
              <p className="text-white text-xs md:text-sm font-serif font-bold truncate">
                {painting.title}
              </p>
              <p className="text-gray-300 text-[10px] md:text-xs truncate">
                {painting.artist}
              </p>
            </div>
          </div>
        ))}
        {paintings.length === 0 && (
          <div className="w-full text-center text-gray-500 italic py-8">
            No masterpieces found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;