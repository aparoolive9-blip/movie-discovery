import { useState, useEffect } from 'react';

const STORAGE_KEY = 'moviebox-watchlist';

function loadWatchlist() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState(loadWatchlist);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch {
      // storage unavailable, the list just won't persist
    }
  }, [watchlist]);

  function isInWatchlist(id, mediaType) {
    return watchlist.some((item) => item.id === id && item.mediaType === mediaType);
  }

  function addItem(item) {
    setWatchlist((prev) =>
      prev.some((p) => p.id === item.id && p.mediaType === item.mediaType)
        ? prev
        : [...prev, item]
    );
  }

  function removeItem(id, mediaType) {
    setWatchlist((prev) =>
      prev.filter((item) => !(item.id === id && item.mediaType === mediaType))
    );
  }

  return { watchlist, addItem, removeItem, isInWatchlist };
}