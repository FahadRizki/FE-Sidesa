import React, { useState, useCallback, useEffect } from "react";
import { searchNews, getNews } from "../newsServices";
import debounce from "lodash.debounce";

export default function SearchNews({ onSearchResult }) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [clear, setClear] = useState(false);

  // Helper function to normalize data structure
  const normalizeData = (data) => {
    if (data?.data && Array.isArray(data.data)) {
      return data.data;
    } else if (Array.isArray(data)) {
      return data;
    }
    return [];
  };

  useEffect(() => {
    if (clear) {
      getNews()
        .then((res) => {
          const normalizedData = normalizeData(res.data);
          onSearchResult(normalizedData, "");
          setClear(false);
        })
        .catch((err) => {
          console.error("Gagal mengambil semua berita:", err);
          onSearchResult([], "");
        });
    }
  }, [clear, onSearchResult]);

  const handleClear = () => {
    setQuery("");
    setIsSearching(false);
    setClear(true);
  };

  const handleSearch = async (search) => {
    if (!search || search.trim() === "") {
      setIsSearching(false);
      try {
        const res = await getNews();
        const normalizedData = normalizeData(res.data);
        onSearchResult(normalizedData, "");
      } catch (error) {
        console.error("Gagal mengambil semua berita:", error);
        onSearchResult([], "");
      }
      return;
    }

    setIsSearching(true);
    try {
      const { data } = await searchNews(search);
      const normalizedData = normalizeData(data);
      onSearchResult(normalizedData, search);
    } catch (error) {
      console.error("Error searching news:", error);
      onSearchResult([], search);
    }
  };

  // Debounce agar tidak spam request saat ketik
  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <svg 
            className={`w-5 h-5 transition-colors duration-200 ${
              isSearching ? 'text-blue-400 animate-pulse' : 'text-gray-400'
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          value={query}
          onChange={handleChange}
          className="w-full pl-12 pr-12 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          placeholder="Cari berita... (contoh: pembangunan, kesehatan, pendidikan)"
          type="text"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-200 transition-colors duration-200 rounded-full hover:bg-gray-700/50"
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Search Status Indicator */}
        {isSearching && (
          <div className="absolute -bottom-8 left-0 text-sm text-blue-400 flex items-center gap-2">
            <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            Mencari...
          </div>
        )}
      </div>

      {/* Search Suggestions/Hints */}
      {!query && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {['pembangunan', 'kesehatan', 'pendidikan', 'ekonomi', 'lingkungan'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setQuery(suggestion);
                debouncedSearch(suggestion);
              }}
              className="px-3 py-1 text-xs bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-full transition-colors duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}