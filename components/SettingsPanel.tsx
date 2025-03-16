import React from 'react';
import { useDictionary } from '../context/DictionaryContext';

const SettingsPanel: React.FC = () => {
  const { 
    chineseVariant, 
    setChineseVariant,
    isOfflineMode,
    toggleOfflineMode
  } = useDictionary();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Settings</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Display Preferences</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chinese Character Variant
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    checked={chineseVariant === 'simplified'}
                    onChange={() => setChineseVariant('simplified')}
                  />
                  <span className="ml-2">Simplified (简体字)</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    checked={chineseVariant === 'traditional'}
                    onChange={() => setChineseVariant('traditional')}
                  />
                  <span className="ml-2">Traditional (繁體字)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium mb-3">Application Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-sm font-medium text-gray-700">Offline Mode</span>
                <span className="text-sm text-gray-500">
                  Use the dictionary without an internet connection
                </span>
              </div>
              <button
                onClick={toggleOfflineMode}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isOfflineMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={isOfflineMode}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                    isOfflineMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
