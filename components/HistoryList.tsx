import React from 'react';
import { useDictionary } from '../context/DictionaryContext';
import { formatDistanceToNow } from '../utils/dateUtils';

const HistoryList: React.FC = () => {
  const { searchHistory, clearHistory, setSearchTerm, search } = useDictionary();

  const handleSearchHistoryItem = (term: string) => {
    setSearchTerm(term);
    search(term);
  };

  if (searchHistory.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No search history yet</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Search History</h2>
        <button
          onClick={clearHistory}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Clear History
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {searchHistory.map(item => (
            <li key={item.id} className="p-4 hover:bg-gray-50">
              <button
                onClick={() => handleSearchHistoryItem(item.term)}
                className="w-full text-left"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{item.term}</span>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(item.timestamp)}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {item.direction === 'indonesian-to-chinese' 
                    ? 'Indonesian → Chinese' 
                    : 'Chinese → Indonesian'}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryList;
