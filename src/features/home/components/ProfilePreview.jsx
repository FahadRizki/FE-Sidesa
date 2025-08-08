"use client"

import { useEffect } from "react"
import Village from "../../../assets/img/village.jpg"
import { Link } from "react-router-dom"
import { MapPin, Users, Award, ArrowRight, Sparkles } from "lucide-react"
import Aos from "aos"
import "aos/dist/aos.css"

export default function ProfilePreview() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    })
  }, [])

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Profil Desa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Desa Batununggal</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mengenal lebih dekat desa yang kaya akan potensi dan inovasi
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <div data-aos="fade-right" className="relative">
            <div className="group relative overflow-hidden rounded-2xl shadow-xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={Village || "/placeholder.svg"}
                  alt="Desa Batununggal"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 right-6">
                  <Link
                    to="/profile-desa"
                    className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>Jelajahi Profil Desa</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-80"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-500 rounded-full opacity-60"></div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Penduduk</p>
                  <p className="font-bold text-gray-900">2,500+</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div data-aos="fade-left" className="space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Tentang Desa Batununggal</h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Desa Batununggal merupakan desa yang berkembang dengan berbagai potensi lokal, mulai dari UMKM, budaya,
                hingga pelayanan publik digital.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Kami berkomitmen memberikan layanan terbaik bagi masyarakat melalui sistem yang transparan, cepat, dan
                mudah diakses oleh semua warga.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Award,
                  title: "Inovasi Digital",
                  description: "Pelayanan publik berbasis teknologi",
                },
                {
                  icon: Users,
                  title: "Partisipasi Aktif",
                  description: "Melibatkan seluruh lapisan masyarakat",
                },
                {
                  icon: Sparkles,
                  title: "Potensi UMKM",
                  description: "Mendukung ekonomi kreatif lokal",
                },
                {
                  icon: MapPin,
                  title: "Lokasi Strategis",
                  description: "Akses mudah dan infrastruktur baik",
                },
              ].map((feature, index) => (
                <div key={index} className="group p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <feature.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                to="/profile-desa"
                className="group inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Pelajari Lebih Lanjut</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        {/* <div data-aos="fade-up" className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Tahun Berdiri", value: "1900-an" },
              { label: "Jumlah RT", value: "12 RT" },
              { label: "Luas Wilayah", value: "15.2 km²" },
              { label: "UMKM Aktif", value: "50+" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <p className="font-bold text-gray-900 text-xl mb-1">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  )
}
