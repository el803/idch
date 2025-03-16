import React, { useState } from 'react';
import { useDictionary } from '../context/DictionaryContext';

const SearchBar: React.FC = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    search, 
    translationDirection, 
    setTranslationDirection 
  } = useDictionary();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(searchTerm);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Search Dictionary</h2>
        <div className="flex items-center">
          <label className="mr-2 text-sm text-gray-600">Translation:</label>
          <select
            value={translationDirection}
            onChange={(e) => setTranslationDirection(e.target.value as any)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="indonesian-to-chinese">Indonesian → Chinese</option>
            <option value="chinese-to-indonesian">Chinese → Indonesian</option>
          </select>
        </div>
      </div>
      
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={translationDirection === 'indonesian-to-chinese' 
            ? "Enter Indonesian word..." 
            : "Enter Chinese word or pinyin..."}
          className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
