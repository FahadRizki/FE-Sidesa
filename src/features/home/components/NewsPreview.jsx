"use client"

import { useEffect, useState } from "react"
import { getNews } from "../contentService"
import { Link } from "react-router-dom"
import { BASE_URL } from "../../../config"
import NewsCard from "./NewsCard"
import { Newspaper, Calendar, ArrowRight, Clock, Eye, Sparkles } from "lucide-react"
import Aos from "aos"
import "aos/dist/aos.css"

export default function NewsPreview() {
  const [bannerNews, setBannerNews] = useState(null)
  const [listNews, setListNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Aos.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    })
  }, [])

  useEffect(() => {
    getNews()
      .then(({ data }) => {
        const newsArray = data.data || []
        if (newsArray.length > 0) {
          setBannerNews(newsArray[0])
          setListNews(newsArray.slice(1, 4))
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Baru saja"
    if (diffInHours < 24) return `${diffInHours} jam lalu`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} hari lalu`
    return formatDate(dateString)
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
            <Newspaper className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Berita Terkini</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Berita Desa Batununggal</h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Informasi terkini dan terpercaya untuk masyarakat desa
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: Newspaper, label: "50+ Artikel", color: "text-blue-600" },
              { icon: Eye, label: "10K+ Pembaca", color: "text-green-600" },
              { icon: Clock, label: "Update Harian", color: "text-purple-600" },
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="font-medium text-gray-700">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-12">
            {/* Banner Skeleton */}
            <div data-aos="fade-up" className="relative">
              <div className="aspect-[16/9] lg:aspect-[21/9] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shimmer"></div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 space-y-3">
                <div className="h-4 bg-white/20 rounded animate-pulse w-32"></div>
                <div className="h-8 bg-white/20 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-white/20 rounded animate-pulse w-1/2"></div>
              </div>
            </div>

            {/* List Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shimmer"></div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-16 px-4 md:px-20">
            {/* Banner News */}
           {bannerNews ? (
              <div data-aos="fade-up" className="relative group mb-12">
                <Link to={`/news/${bannerNews.id}`} className="block">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    {/* Gambar */}
                    <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
                      <img
                        src={`${BASE_URL}/public/storage/content_images/${bannerNews.image}`}
                        alt={bannerNews.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Overlay Gradasi */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {/* Konten */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-12">
                      <div className="max-w-4xl">
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                          <div className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3">
                            <Calendar className="w-3 h-3 text-white/80" />
                            <span className="text-[10px] sm:text-xs text-white/80">
                              {getTimeAgo(bannerNews.publish_date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3">
                            <Sparkles className="w-3 h-3 text-blue-300" />
                            <span className="text-[10px] sm:text-xs text-blue-200">Berita Utama</span>
                          </div>
                        </div>

                        {/* Judul */}
                        <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight line-clamp-2">
                          {bannerNews.title}
                        </h3>

                        {/* Kutipan */}
                        <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6">
                          {bannerNews.content}
                        </p>

                        {/* Tombol */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm sm:text-base font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5">
                          <span>Baca Selengkapnya</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div data-aos="fade-up" className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Newspaper className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Berita</h3>
                <p className="text-gray-600">Berita utama akan segera hadir</p>
              </div>
            )}


            {/* Related News */}
            {listNews.length > 0 && (
              <div data-aos="fade-up" data-aos-delay="200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Berita Terkait</h3>
                    <p className="text-gray-600">Informasi penting lainnya untuk Anda</p>
                  </div>

                  {/* <Link
                    to="/news"
                    className="group inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>Lihat Semua</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link> */}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listNews.map((item, index) => (
                    <div
                      key={item.id}
                      className="group transform hover:-translate-y-1 transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 overflow-hidden h-full">
                        <NewsCard item={item} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom CTA */}
            {(bannerNews || listNews.length > 0) && (
              <div data-aos="fade-up" data-aos-delay="400" className="text-center">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
                  <div className="max-w-2xl mx-auto">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Newspaper className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Tetap Terhubung</h4>
                    <p className="text-gray-600 mb-6">Dapatkan informasi terbaru langsung dari pemerintah desa</p>
                    <Link
                      to="/news"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <Newspaper className="w-5 h-5" />
                      <span>Jelajahi Semua Berita</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Custom Styles for Shimmer Effect */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  )
}
