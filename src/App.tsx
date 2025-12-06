import React, { useState, useMemo, useEffect } from 'react';
import { PAINTINGS } from './constants';
import { Painting, ArtStyle } from './types';
import Gallery from './components/Gallery';
import FilterBar from './components/FilterBar';
import PaintingDetail from './components/PaintingDetail';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [selectedPaintingId, setSelectedPaintingId] = useState<string | null>(PAINTINGS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>('All');

  // Filter Logic
  const filteredPaintings = useMemo(() => {
    return PAINTINGS.filter((p) => {
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.artist.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStyle = selectedStyle === 'All' || p.style === selectedStyle;

      return matchesSearch && matchesStyle;
    });
  }, [searchQuery, selectedStyle]);

  const selectedPainting = useMemo(() => 
    PAINTINGS.find(p => p.id === selectedPaintingId) || null, 
  [selectedPaintingId]);

  // Effect to select the first painting if the current selection is filtered out
  useEffect(() => {
    if (filteredPaintings.length > 0) {
       const isCurrentVisible = filteredPaintings.some(p => p.id === selectedPaintingId);
       if (!isCurrentVisible && selectedPaintingId !== null) {
          // Optional: setSelectedPaintingId(filteredPaintings[0].id);
       }
    }
  }, [filteredPaintings, selectedPaintingId]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col relative">
      {/* Landing Page Buffer */}
      {showLanding && (
        <LandingPage onExplore={() => setShowLanding(false)} />
      )}

      {/* Header / Nav */}
      <header className="sticky top-0 z-30 bg-gray-950/90 backdrop-blur-md border-b border-gray-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wider">
                MUSEUM <span className="text-gold-500 italic">of</span> CLASSICS
              </h1>
              <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-1">
                Interactive Art Collection
              </p>
            </div>
          </div>
          
          <FilterBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col max-w-7xl mx-auto w-full px-4 pb-12">
        {/* Gallery Strip */}
        <section className="mt-4 border-b border-gray-800/50">
          <Gallery 
            paintings={filteredPaintings}
            selectedId={selectedPaintingId}
            onSelect={(p) => setSelectedPaintingId(p.id)}
          />
        </section>

        {/* Dynamic Detail View */}
        <section className="flex-grow relative min-h-[500px]">
          {selectedPainting ? (
            <PaintingDetail painting={selectedPainting} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-serif text-xl italic">
              Select a masterpiece to begin your journey.
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Classic Art Explorer. Educational Demonstration.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;