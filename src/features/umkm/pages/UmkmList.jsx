"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getUmkms } from "../umkmService"
import { useAuth } from "../../../context/AuthContext"
import SearchUmkm from "../components/SearchUmkm"
import UmkmCard from "../../../components/cards/UmkmCard"
import { Plus, Store, Filter, ChevronLeft, ChevronRight } from "lucide-react"

export default function UmkmList() {
  const [umkm, setUmkm] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const { user } = useAuth()

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = umkm && Array.isArray(umkm) ? umkm.slice(indexOfFirstItem, indexOfLastItem) : []
  const totalPages = umkm && Array.isArray(umkm) ? Math.ceil(umkm.length / itemsPerPage) : 0

  useEffect(() => {
    setLoading(true)
    getUmkms()
      .then(({ data }) => {
        console.log("Fetched UMKM:", data)
        setUmkm(data)
      })
      .catch((err) => {
        console.error("Failed to fetch UMKM:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Reset to first page when umkm data changes (from search)
  useEffect(() => {
    if (umkm && Array.isArray(umkm)) {
      setCurrentPage(1)
    }
  }, [umkm])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }
    
    return pageNumbers
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-4 mb-6">
              <Store className="w-5 h-5 text-white" />
              <span className="text-white/90 text-sm font-medium">Desa Batununggal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              UMKM <br />
              <span className=" bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Desa Batununggal
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Temukan dan dukung usaha mikro, kecil, dan menengah terbaik di desa kami
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Actions Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-10 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 flex-wrap">
            {/* Pencarian */}
            <div className="w-full md:flex-1 md:max-w-lg md:mt-7">
              <SearchUmkm onSearchResult={setUmkm} />
            </div>

            {/* Aksi */}
            <div className="flex gap-3 flex-wrap items-center">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 border border-gray-200 rounded-lg transition-all shadow-sm hover:shadow-md">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>

              {user && (
                <Link to="/umkm-form">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-0.5">
                    <Plus className="w-5 h-5" />
                    <span>Promosikan UMKM</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Results Info */}
        {!loading && umkm && Array.isArray(umkm) && umkm.length > 0 && (
          <div className="flex justify-between items-center mb-6 px-16">
            <p className="text-gray-600">
              Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, umkm.length)} dari {umkm.length} UMKM
            </p>
            <p className="text-sm text-gray-500">
              Halaman {currentPage} dari {totalPages}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse mb-4 w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* UMKM Grid */}
        {!loading && (
          <>
            {umkm && Array.isArray(umkm) && umkm.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 px-16">
                  {currentItems.map((umkmItem) => (
                    <div key={umkmItem.id} className="transform hover:-translate-y-1 transition-all duration-300">
                      <UmkmCard umkm={umkmItem} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                    {/* Previous Button */}
                    <button
                      onClick={handlePrevious}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Sebelumnya</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((pageNumber, index) => (
                        <button
                          key={index}
                          onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)}
                          disabled={pageNumber === '...'}
                          className={`w-10 h-10 rounded-lg font-medium transition-all ${
                            pageNumber === currentPage
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                              : pageNumber === '...'
                              ? 'text-gray-400 cursor-default'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <span className="hidden sm:inline">Selanjutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Store className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada UMKM</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Saat ini belum ada UMKM yang terdaftar. Jadilah yang pertama untuk mempromosikan usaha Anda!
                </p>
                {user && (
                  <Link to="/umkm-form">
                    <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <Plus className="w-5 h-5" />
                      Daftarkan UMKM Pertama
                    </button>
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Call to Action Section */}
      {!loading && umkm && Array.isArray(umkm) && umkm.length > 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 mt-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Punya Usaha? Promosikan Sekarang!</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan komunitas UMKM Desa Batununggal dan jangkau lebih banyak pelanggan
            </p>
            {user ? (
              <Link to="/umkm-form">
                <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  Daftarkan UMKM Anda
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  Masuk untuk Daftarkan UMKM
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}