import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  DictionaryEntry, 
  TranslationDirection, 
  ChineseVariant,
  SearchHistory,
  Bookmark
} from '../types/dictionary';
import { sampleDictionary } from '../data/sampleDictionary';

interface DictionaryContextType {
  entries: DictionaryEntry[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: DictionaryEntry[];
  search: (term: string) => void;
  translationDirection: TranslationDirection;
  setTranslationDirection: (direction: TranslationDirection) => void;
  chineseVariant: ChineseVariant;
  setChineseVariant: (variant: ChineseVariant) => void;
  searchHistory: SearchHistory[];
  clearHistory: () => void;
  bookmarks: Bookmark[];
  toggleBookmark: (entryId: string) => void;
  isBookmarked: (entryId: string) => boolean;
  isOfflineMode: boolean;
  toggleOfflineMode: () => void;
}

const DictionaryContext = createContext<DictionaryContextType | undefined>(undefined);

interface DictionaryProviderProps {
  children: ReactNode;
}

export const DictionaryProvider: React.FC<DictionaryProviderProps> = ({ children }) => {
  // Dictionary data
  const [entries] = useState<DictionaryEntry[]>(sampleDictionary);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<DictionaryEntry[]>([]);
  const [translationDirection, setTranslationDirection] = useState<TranslationDirection>('indonesian-to-chinese');
  
  // User preferences
  const [chineseVariant, setChineseVariant] = useState<ChineseVariant>('simplified');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  
  // History and bookmarks
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  
  // Load saved preferences and data from localStorage
  useEffect(() => {
    const savedVariant = localStorage.getItem('chineseVariant');
    if (savedVariant) {
      setChineseVariant(savedVariant as ChineseVariant);
    }
    
    const savedOfflineMode = localStorage.getItem('offlineMode');
    if (savedOfflineMode) {
      setIsOfflineMode(savedOfflineMode === 'true');
    }
    
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
    
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);
  
  // Save preferences and data to localStorage when they change
  useEffect(() => {
    localStorage.setItem('chineseVariant', chineseVariant);
  }, [chineseVariant]);
  
  useEffect(() => {
    localStorage.setItem('offlineMode', String(isOfflineMode));
  }, [isOfflineMode]);
  
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);
  
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  // Search function
  const search = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    const normalizedTerm = term.toLowerCase().trim();
    
    let results: DictionaryEntry[];
    if (translationDirection === 'indonesian-to-chinese') {
      results = entries.filter(entry => 
        entry.indonesian.toLowerCase().includes(normalizedTerm)
      );
    } else {
      results = entries.filter(entry => 
        entry.chineseSimplified.includes(normalizedTerm) || 
        entry.chineseTraditional.includes(normalizedTerm) || 
        entry.pinyin.toLowerCase().includes(normalizedTerm)
      );
    }
    
    setSearchResults(results);
    
    // Add to search history
    if (results.length > 0) {
      const newHistoryItem: SearchHistory = {
        id: uuidv4(),
        term: normalizedTerm,
        timestamp: Date.now(),
        direction: translationDirection
      };
      
      setSearchHistory(prev => {
        // Remove duplicates and keep most recent 20 searches
        const filteredHistory = prev.filter(item => item.term !== normalizedTerm);
        return [newHistoryItem, ...filteredHistory].slice(0, 20);
      });
    }
  };
  
  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
  };
  
  // Bookmark functions
  const toggleBookmark = (entryId: string) => {
    if (isBookmarked(entryId)) {
      setBookmarks(prev => prev.filter(bookmark => bookmark.entryId !== entryId));
    } else {
      const newBookmark: Bookmark = {
        id: uuidv4(),
        entryId,
        timestamp: Date.now()
      };
      setBookmarks(prev => [...prev, newBookmark]);
    }
  };
  
  const isBookmarked = (entryId: string) => {
    return bookmarks.some(bookmark => bookmark.entryId === entryId);
  };
  
  // Toggle offline mode
  const toggleOfflineMode = () => {
    setIsOfflineMode(prev => !prev);
  };
  
  const value = {
    entries,
    searchTerm,
    setSearchTerm,
    searchResults,
    search,
    translationDirection,
    setTranslationDirection,
    chineseVariant,
    setChineseVariant,
    searchHistory,
    clearHistory,
    bookmarks,
    toggleBookmark,
    isBookmarked,
    isOfflineMode,
    toggleOfflineMode
  };
  
  return (
    <DictionaryContext.Provider value={value}>
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (context === undefined) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
};
