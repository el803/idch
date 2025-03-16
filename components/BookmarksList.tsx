import React from 'react';
import { useDictionary } from '../context/DictionaryContext';
import DictionaryEntry from './DictionaryEntry';

const BookmarksList: React.FC = () => {
  const { bookmarks, entries } = useDictionary();

  // Get the full entry data for each bookmark
  const bookmarkedEntries = bookmarks
    .map(bookmark => entries.find(entry => entry.id === bookmark.entryId))
    .filter(entry => entry !== undefined);

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No bookmarks yet</p>
        <p className="text-sm text-gray-400 mt-2">
          Bookmark entries by clicking the bookmark icon when viewing a dictionary entry
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Bookmarks</h2>
      <div className="space-y-6">
        {bookmarkedEntries.map(entry => (
          entry && <DictionaryEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default BookmarksList;
