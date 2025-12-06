import React from 'react';
import { STYLES } from '../constants';
import { ArtStyle } from '../types';
import { Search } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStyle: ArtStyle;
  setSelectedStyle: (style: ArtStyle) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedStyle, 
  setSelectedStyle 
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-900/50 p-4 rounded-xl backdrop-blur-sm border border-gray-800">
      
      {/* Search Input */}
      <div className="relative w-full md:w-1/3">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search artist or title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-800 text-white border border-gray-700 rounded-full pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent placeholder-gray-500 transition-all"
        />
      </div>

      {/* Style Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {STYLES.map((style) => (
          <button
            key={style}
            onClick={() => setSelectedStyle(style)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
              ${selectedStyle === style
                ? 'bg-gold-500 text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }
            `}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;