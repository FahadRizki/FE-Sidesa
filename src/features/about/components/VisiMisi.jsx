"use client"

import { Target, Eye, CheckCircle, Sparkles } from "lucide-react"

const VisiMisi = () => {
  const misiItems = [
    "Meningkatkan kualitas pendidikan dan kesehatan masyarakat",
    "Mendorong pengembangan ekonomi lokal berbasis potensi desa",
    "Memperkuat partisipasi masyarakat dalam pembangunan desa",
  ]

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-4">
          <Target className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Visi & Misi</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Arah & Tujuan Desa Batununggal</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Komitmen kami dalam membangun desa yang mandiri, berkelanjutan, dan sejahtera
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Visi Card */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Visi</h3>
                <p className="text-sm text-gray-500">Pandangan Masa Depan</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              <p className="text-lg text-gray-700 leading-relaxed pl-6 font-medium">
                "Menjadi desa mandiri, berdaya saing, dan sejahtera secara berkelanjutan."
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-blue-600">
              <Sparkles className="w-4 h-4" />
              <span>Visi 2030</span>
            </div>
          </div>
        </div>

        {/* Misi Card */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Misi</h3>
                <p className="text-sm text-gray-500">Langkah Strategis</p>
              </div>
            </div>

            <div className="space-y-4">
              {misiItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4 group/item">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors duration-200">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>3 Fokus Utama</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisiMisi
