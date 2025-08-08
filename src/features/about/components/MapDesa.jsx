"use client"

import { MapPin, Navigation, Locate, Layers } from "lucide-react"

const MapDesa = () => {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-4 py-2 mb-4">
          <MapPin className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Peta Desa</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Lokasi Desa Batununggal</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Jelajahi wilayah desa dan temukan berbagai fasilitas serta landmark penting
        </p>
      </div>

      {/* Map Container */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Map Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Peta Desa Batununggal</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="relative h-[500px]">
            <iframe
              title="Peta Desa Batununggal"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.53273195436!2d106.81652529517572!3d-6.904570389515212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6836cfcb11d8d1%3A0x6995c26df9b8cd45!2sBatununggal%2C%20Kec.%20Cibadak%2C%20Kabupaten%20Sukabumi%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1747548122883!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-none"
            ></iframe>

            
          </div>

          {/* Map Info */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Luas Wilayah", value: "15.2 km²", icon: Layers },
                { label: "Koordinat", value: "-6.9045, 106.8165", icon: Navigation },
                { label: "Ketinggian", value: "650 mdpl", icon: MapPin },
                { label: "Zona Waktu", value: "WIB (UTC+7)", icon: Locate },
              ].map((info, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <info.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{info.label}</p>
                    <p className="text-sm font-bold text-gray-900">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapDesa
