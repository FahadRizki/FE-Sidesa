

import { History, Calendar, Users, Building, Mars, Venus } from "lucide-react"

const SejarahDesa = () => {
  const timelineEvents = [
    {
      year: "1900-an",
      title: "Pendirian Desa",
      description: "Desa Batununggal didirikan sebagai pusat pertanian dan budaya tradisional",
    },
    {
      year: "1950-an",
      title: "Perkembangan Awal",
      description: "Mulai berkembang dengan sistem pertanian yang lebih terorganisir",
    },
    {
      year: "2000-an",
      title: "Era Modernisasi",
      description: "Implementasi program pembangunan dan inovasi teknologi",
    },
    {
      year: "Sekarang",
      title: "Desa Digital",
      description: "Transformasi menuju desa cerdas dengan teknologi modern",
    },
  ]

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full px-4 py-2 mb-4">
          <History className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-800">Sejarah Desa</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Perjalanan Desa Batununggal</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Menelusuri jejak sejarah dan perkembangan desa dari masa ke masa
        </p>
      </div>

      {/* Main Story Card */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <History className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Sejarah Singkat</h3>
              <p className="text-sm text-gray-500">Asal Usul & Perkembangan</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Desa Batununggal didirikan pada tahun 1900-an dan memiliki sejarah panjang sebagai pusat pertanian dan
              budaya tradisional di wilayah ini.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Masyarakat desa sangat menjaga tradisi dan nilai-nilai kearifan lokal yang diwariskan secara
              turun-temurun.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Seiring waktu, desa terus berkembang dengan meningkatkan kualitas kehidupan warganya melalui berbagai
              program pembangunan dan inovasi.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Timeline Perkembangan</h3>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-semibold text-amber-600">{event.year}</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="relative z-10 w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full border-4 border-white shadow-lg"></div>

                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default SejarahDesa
