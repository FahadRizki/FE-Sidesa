import { useState, useCallback, useEffect } from "react";
import { getUmkms, searchUmkm } from "../umkmService";
import debounce from "lodash.debounce";

export default function SearchUmkm({ onSearchResult }) {
  const [query, setQuery] = useState("");
  const [clear, setClear] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (clear) {
      setIsLoading(true);
      getUmkms()
        .then((res) => {
          onSearchResult(res.data);
          setClear(false);
        })
        .catch((err) => {
          console.error("Gagal mengambil semua umkm:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [clear, onSearchResult]);

  const handleClear = () => {
    setQuery("");
    setClear(!clear);
  };

  const handleSearch = async (search) => {
    setIsLoading(true);
    
    if (!search || search.trim() === "") {
      try {
        const res = await getUmkms();
        onSearchResult(res.data);
      } catch (error) {
        console.error("Gagal mengambil semua berita:", error);
      }
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await searchUmkm(search);
      onSearchResult(data);
    } catch (error) {
      console.error("Error searching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="max-w-2xl mx-auto mb-8 px-4">
      <div className="relative group">
        {/* Background glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-20 transition-opacity duration-300 ${
          isFocused ? 'opacity-30' : ''
        }`}></div>
        
        {/* Main search container */}
        <div className={`relative bg-white rounded-2xl shadow-lg transition-all duration-300 transform ${
          isFocused ? 'shadow-2xl scale-[1.02]' : 'hover:shadow-xl'
        } border-2 ${isFocused ? 'border-green-400' : 'border-gray-200'}`}>
          
          {/* Search icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className={`p-2 rounded-full transition-colors duration-300 ${
              isFocused ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg 
                  width={20} 
                  height={20} 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`transition-colors duration-300 ${
                    isFocused ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  <path 
                    d="M9 17A8 8 0 109 1a8 8 0 000 16zM20 20l-4.35-4.35" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Input field */}
          <input
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full py-5 pl-20 pr-16 text-lg text-gray-800 bg-transparent rounded-2xl placeholder-gray-400 focus:outline-none transition-all duration-300"
            placeholder="Cari UMKM favorit Anda..."
            type="text"
            disabled={isLoading}
          />

          {/* Clear/Close button */}
          {query && (
            <button
              onClick={handleClear}
              type="button"
              disabled={isLoading}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-red-100 transition-all duration-300 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5 text-gray-500 group-hover/btn:text-red-500 transition-colors duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          )}

          {/* Bottom gradient line */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-b-2xl transition-opacity duration-300 ${
            isFocused ? 'opacity-100' : 'opacity-0'
          }`}></div>
        </div>

        {/* Search suggestions/hint */}
        {!query && !isLoading && (
          <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
            <p className="text-sm text-gray-600 text-center">
              💡 Ketik nama UMKM, kategori, atau lokasi untuk mencari
            </p>
          </div>
        )}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center justify-center mt-4 space-x-2 text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <span className="text-sm font-medium">Mencari UMKM...</span>
        </div>
      )}
    </div>
  );
}