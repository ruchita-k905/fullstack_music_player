import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import '../../css/search/SearchBar.css';
import axios from 'axios';

const SearchBar = ({ setSearchSongs }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setSearchSongs([]);
      return;
    }

    const fetchSongs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/songs/playlistByTag/${encodeURIComponent(query)}`,
        );

        setSearchSongs(res.data.results);
      } catch (error) {
        console.error('Jamendo search failed', error);
        setSearchSongs([]);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchSongs, 500);
    return () => clearInterval(debounce);
  }, [query, setSearchSongs]);

  return (
    <div className="searchbar-root">
      <div className="searchbar-input-wrapper">
        <input
          type="text"
          placeholder="Search songs..."
          className="searchbar-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <FiSearch size={20} className="searchbar-icon" />
      </div>
      {!query && !loading && (
        <p className="searchbar-empty">Search sonngs to display</p>
      )}
      {loading && <p className="searchbar-loading">Searching...</p>}
    </div>
  );
};

export default SearchBar;
