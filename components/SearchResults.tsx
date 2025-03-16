import React from 'react';
import { useDictionary } from '../context/DictionaryContext';
import DictionaryEntry from './DictionaryEntry';

const SearchResults: React.FC = () => {
  const { searchResults, searchTerm } = useDictionary();

  if (!searchTerm) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Enter a word to search in the dictionary</p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No results found for "{searchTerm}"</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Results for "{searchTerm}"</h2>
      <div className="space-y-6">
        {searchResults.map(entry => (
          <DictionaryEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
