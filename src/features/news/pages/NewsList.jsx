import { useEffect, useState, useCallback } from "react";
import { getNews } from "../newsServices";
import SearchNews from "../components/SearchNews";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../config";
import { Calendar, Sparkles, ArrowRight, Newspaper } from "lucide-react";

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [bannerNews, setBannerNews] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 6;

  // Helper function for time ago
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const publishDate = new Date(dateString);
    const diffInMs = now - publishDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInHours < 1) return "Baru saja";
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    if (diffInDays < 7) return `${diffInDays} hari yang lalu`;
    
    return publishDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const fetchNews = useCallback((page) => {
    setLoading(true);
    getNews(page, limit)
      .then((res) => {
        const data = res.data;
        let result = [];

        if (data?.data && Array.isArray(data.data)) {
          result = data.data;
          setTotalPages(data.total ? Math.ceil(data.total / limit) : (data.totalPages || 1));
        } else if (Array.isArray(data)) {
          result = data;
          setTotalPages(1);
        }

        setNews(Array.isArray(result) ? result : []);
        
        // Set banner news (random from first page)
        if (page === 1 && result.length > 0 && !isSearching) {
          const randomIndex = Math.floor(Math.random() * Math.min(result.length, 3));
          setBannerNews(result[randomIndex]);
        }
      })
      .catch((err) => {
        console.error(err);
        setNews([]);
        setTotalPages(1);
        setBannerNews(null);
      })
      .finally(() => setLoading(false));
  }, [limit, isSearching]);

  useEffect(() => {
    fetchNews(page);
  }, [page, fetchNews]);

  const handleSearchResult = useCallback(
    (result, query = "") => {
      setSearchQuery(query);
      setIsSearching(query.length > 0);
      
      if (result.length === 0 && query.length === 0) {
        fetchNews(1);
      } else {
        setNews(result);
        setTotalPages(1);
        if (page !== 1) setPage(1);
        if (query.length > 0) {
          setBannerNews(null); // Hide banner news during search
        }
      }
    },
    [fetchNews, page]
  );

  const EmptySearchState = () => (
    <div className="text-center py-16 px-6">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <svg className="mx-auto h-24 w-24 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-300 mb-3">
          Tidak ada hasil untuk "{searchQuery}"
        </h3>
        <p className="text-gray-500 mb-6">
          Coba gunakan kata kunci lain atau periksa ejaan pencarian Anda
        </p>
        <button
          onClick={() => handleSearchResult([], "")}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Tampilkan Semua Berita
        </button>
      </div>
    </div>
  );

  const SkeletonCard = () => (
    <div className="bg-gray-800/50 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-700/50"></div>
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-700/50 rounded w-24"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/50 rounded"></div>
          <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-700/50 rounded"></div>
          <div className="h-3 bg-gray-700/50 rounded"></div>
          <div className="h-3 bg-gray-700/50 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-screen py-12">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              📰 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Berita Desa Terkini
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Dapatkan informasi terbaru dan terpercaya seputar perkembangan desa
            </p>
          </div>
          {bannerNews && !isSearching ? (
          <div className="mb-12  px-1 md:px-20 md:mb-16">
            <div className="relative group">
              <Link to={`/news/${bannerNews.id}`} className="block">
                <div className="relative overflow-hidden rounded-3xl shadow-xl">
                  {/* Gambar Banner */}
                  <div className="aspect-[16/9] sm:aspect-[16/7] md:aspect-[21/9] overflow-hidden">
                    <img
                      src={`${BASE_URL}/storage/content_images/${bannerNews.image}`}
                      alt={bannerNews.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Konten */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 lg:p-12">
                    <div className="max-w-5xl">
                      {/* Info Meta */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                          <Calendar className="w-3 h-3 text-white/80" />
                          <span className="text-xs text-white/80">
                            {getTimeAgo(bannerNews.publish_date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-3 py-1">
                          <Sparkles className="w-3 h-3 text-blue-300" />
                          <span className="text-xs text-blue-200">Berita Utama</span>
                        </div>
                      </div>

                      {/* Judul */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                        {bannerNews.title}
                      </h3>

                      {/* Ringkasan Konten */}
                      <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed line-clamp-3 mb-6">
                        {bannerNews.content}
                      </p>

                      {/* Tombol Baca Selengkapnya */}
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5">
                        <span>Baca Selengkapnya</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          ) : !isSearching && !loading && (
            <div className="mb-12">
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Newspaper className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Berita</h3>
                <p className="text-gray-600">Berita utama akan segera hadir</p>
              </div>
            </div>
          )}
          <div className="max-w-2xl mx-auto">
            <SearchNews onSearchResult={handleSearchResult} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-20 pb-16">
        {/* New Banner News Section */}
        


        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : news.length === 0 ? (
          isSearching ? (
            <EmptySearchState />
          ) : (
            <div className="text-center py-16">
              <div className="mb-6">
                <svg className="mx-auto h-24 w-24 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-3">Belum ada berita tersedia</h3>
              <p className="text-gray-500">Berita akan muncul di sini setelah dipublikasikan</p>
            </div>
          )
        ) : (
          <>
            {/* Section Header */}
            {!isSearching && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Semua Berita</h2>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <article
                  key={item.id}
                  className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={`${BASE_URL}/public/storage/content_images/${item.image}`}
                      alt={item.title}
                      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <time>
                        {new Date(item.publish_date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white leading-tight group-hover:text-blue-400 transition-colors duration-200">
                      <Link to={`/news/${item.id}`} className="line-clamp-2">
                        {item.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {item.content}
                    </p>
                    
                    <Link
                      to={`/news/${item.id}`}
                      className="inline-flex items-center text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors group/link"
                    >
                      Baca selengkapnya
                      <svg className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* Enhanced Pagination */}
        {totalPages > 1 && !isSearching && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1 || loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Sebelumnya
            </button>

            <div className="flex items-center gap-1 mx-4">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                      page === pageNum
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages || loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}