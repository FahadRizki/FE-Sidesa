"use client"

import { useState, useEffect } from "react"
import { getUmkmLimited } from "../contentService"
import { Link } from "react-router-dom"
import UmkmCard from "../../../components/cards/UmkmCard"
import { Store, ArrowRight, Sparkles, TrendingUp, Users, Star } from "lucide-react"
import Aos from "aos"
import "aos/dist/aos.css"

export default function UmkmPreview() {
  const [umkms, setUmkms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Aos.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    })
  }, [])

  useEffect(() => {
    getUmkmLimited(4)
      .then(({ data }) => setUmkms(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div data-aos="fade-up" className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-2 mb-6">
            <Store className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">UMKM Lokal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">UMKM Desa Batununggal</h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Dukung ekonomi lokal dengan produk berkualitas dari pelaku usaha desa
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: Store, label: "50+ UMKM", color: "text-blue-600" },
              { icon: Star, label: "4.8 Rating", color: "text-yellow-600" },
              { icon: TrendingUp, label: "95% Aktif", color: "text-purple-600" },
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="font-medium text-gray-700">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="group relative" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Image Skeleton */}
                  <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shimmer"></div>
                  </div>

                  {/* Content Skeleton */}
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-2/3"></div>
                    <div className="space-y-2 pt-2">
                      <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : umkms.length > 0 ? (
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {umkms.map((umkm, index) => (
              <div
                key={umkm.id}
                className="group transform hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 overflow-hidden">
                  <UmkmCard umkm={umkm} />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div data-aos="fade-up" className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Store className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada UMKM</h3>
            <p className="text-gray-600 mb-6">Saat ini belum ada UMKM yang terdaftar</p>
            <Link to="/umkm" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              Daftarkan UMKM Anda
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* CTA Section */}
        {umkms.length > 0 && (
          <div data-aos="fade-up" data-aos-delay="400" className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/umkm"
                className="group inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Store className="w-5 h-5" />
                <span>Jelajahi Semua UMKM</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span>Temukan produk lokal terbaik</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Features
        <div data-aos="fade-up" data-aos-delay="600" className="mt-16 pt-12 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "🏪",
                title: "Produk Berkualitas",
                description: "Produk lokal dengan standar kualitas tinggi",
              },
              {
                icon: "🚚",
                title: "Pengiriman Cepat",
                description: "Layanan antar langsung dari produsen",
              },
              {
                icon: "💝",
                title: "Harga Terjangkau",
                description: "Harga bersahabat langsung dari sumber",
              },
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div> */}
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
