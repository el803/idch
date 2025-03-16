import React from 'react';
import { DictionaryEntry as DictionaryEntryType } from '../types/dictionary';
import { useDictionary } from '../context/DictionaryContext';

interface DictionaryEntryProps {
  entry: DictionaryEntryType;
}

const DictionaryEntry: React.FC<DictionaryEntryProps> = ({ entry }) => {
  const { 
    chineseVariant, 
    toggleBookmark, 
    isBookmarked 
  } = useDictionary();

  const chineseText = chineseVariant === 'simplified' 
    ? entry.chineseSimplified 
    : entry.chineseTraditional;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{entry.indonesian}</h3>
          <div className="mt-1 text-gray-600">
            <span className="text-xs bg-gray-200 rounded px-2 py-1">
              {entry.partOfSpeech}
            </span>
          </div>
        </div>
        <button
          onClick={() => toggleBookmark(entry.id)}
          className={`p-2 rounded-full ${
            isBookmarked(entry.id) 
              ? 'text-yellow-500 hover:text-yellow-600' 
              : 'text-gray-400 hover:text-gray-500'
          }`}
          aria-label={isBookmarked(entry.id) ? "Remove bookmark" : "Add bookmark"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </button>
      </div>

      <div className="mt-3">
        <div className="flex items-center">
          <span className="text-xl font-medium mr-2">{chineseText}</span>
          <span className="text-gray-500">{entry.pinyin}</span>
          {entry.audioUrl && (
            <button 
              className="ml-2 text-blue-500 hover:text-blue-600"
              aria-label="Play pronunciation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="mt-3">
        <h4 className="font-semibold text-sm text-gray-700">Definitions:</h4>
        <ul className="list-disc list-inside mt-1 text-gray-700">
          {entry.definitions.map((def, index) => (
            <li key={index}>{def}</li>
          ))}
        </ul>
      </div>

      {entry.examples.length > 0 && (
        <div className="mt-3">
          <h4 className="font-semibold text-sm text-gray-700">Examples:</h4>
          <div className="mt-1 space-y-2">
            {entry.examples.map((example, index) => (
              <div key={index} className="text-sm">
                <p className="text-gray-700">{example.indonesian}</p>
                <p className="text-gray-600">{chineseVariant === 'simplified' ? example.chineseSimplified : example.chineseTraditional}</p>
                <p className="text-gray-500 text-xs">{example.pinyin}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DictionaryEntry;
