"use client"

import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Users, Store, Home, TrendingUp, Award, MapPin } from "lucide-react"
import CountUp from "./CountUp"
import Aos from "aos"
import "aos/dist/aos.css"

export default function VillageStats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    })
  }, [])

  const stats = [
    {
      id: "population",
      icon: Users,
      value: 3642,
      suffix: "",
      label: "Total Penduduk",
      description: "Jiwa terdaftar di desa",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "umkm",
      icon: Store,
      value: 287,
      suffix: "+",
      label: "UMKM Aktif",
      description: "Usaha berkembang di desa",
      color: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-50 to-green-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "families",
      icon: Home,
      value: 952,
      suffix: "",
      label: "Kepala Keluarga",
      description: "KK terdaftar di desa",
      color: "from-purple-500 to-indigo-500",
      bgColor: "from-purple-50 to-indigo-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100/50 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-100/30 rounded-full blur-3xl"></div>
      </div>

      <div ref={ref} className="relative container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Data Statistik</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Statistik Desa Batununggal
          </h2>
         <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
            Data terkini mengenai demografi dan perkembangan ekonomi desa
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative"
            >
              {/* Glow efek dikurangi di mobile */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl blur-xl sm:blur-2xl`}
              ></div>

              <div
                className={`relative bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-lg border border-white/50 transition-all duration-300 transform hover:-translate-y-1`}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 ${stat.iconBg} rounded-xl sm:rounded-2xl flex items-center justify-center shadow group-hover:scale-105 transition-transform`}
                  >
                    <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.iconColor}`} />
                  </div>
                </div>

                {/* Angka */}
                <div className="text-center mb-2 sm:mb-4">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
                    {inView && <CountUp end={stat.value} duration={2000} suffix={stat.suffix} />}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{stat.label}</h3>
                  <p className="text-gray-600 text-sm sm:text-sm mt-1">{stat.description}</p>
                </div>

                {/* Progress bar */}
                <div className="mt-4 sm:mt-6">
                  <div className="w-full bg-white/50 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-2000 ease-out`}
                      style={{
                        width: inView ? "100%" : "0%",
                        transitionDelay: `${index * 200}ms`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Additional Info Cards */}
      <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              { icon: Award, label: "Prestasi", value: "15+", desc: "Penghargaan desa" },
              { icon: MapPin, label: "Wilayah", value: "15.2", desc: "Kilometer persegi" },
              { icon: TrendingUp, label: "Pertumbuhan", value: "12%", desc: "Ekonomi per tahun" },
              { icon: Users, label: "Partisipasi", value: "85%", desc: "Warga aktif" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-200 transition-all duration-300 text-center group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 group-hover:bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3 transition-colors duration-300">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  {inView && (
                    <CountUp
                      end={Number.parseInt(item.value)}
                      duration={1500}
                      suffix={item.value.replace(/\d/g, "")}
                    />
                  )}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base mt-1">{item.label}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>


        {/* Bottom CTA */}
        <div data-aos="fade-up" data-aos-delay="600" className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">Data diperbarui secara berkala</span>
          </div>
        </div>
      </div>
    </section>
  )
}
