export interface Painting {
  id: string;
  title: string;
  artist: string;
  year: string;
  style: string;
  biography: string;
  analysis: string;
  imageUrl: string;
  thumbnailUrl: string;
  // New educational fields
  colorPalette: string[];
  technique: string;
  details: string;
}

export type ArtStyle = 
  | 'All' 
  | 'Renaissance' 
  | 'Baroque' 
  | 'Rococo' 
  | 'Neoclassicism' 
  | 'Romanticism' 
  | 'Realism' 
  | 'Impressionism' 
  | 'Post-Impressionism' 
  | 'Symbolism' 
  | 'Expressionism'
  | 'Surrealism'
  | 'Pre-Raphaelite';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}