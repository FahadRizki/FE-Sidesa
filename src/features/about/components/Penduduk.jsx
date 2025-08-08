import { Building, Users, Mars, Venus, User } from "lucide-react"

export default function Penduduk() {
  return (
    <div>
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-orange-100 rounded-full px-4 py-2 mb-4">
                <Users className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium text-indigo-800">Populasi Penduduk</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Penduduk Desa Batununggal</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Desa Batununggal memiliki populasi penduduk sebanyak 7rb orang, data akan terupdate setiap tahun
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-12">
        {[
          { icon: Building, label: "Total Penduduk", value: "7rb +", color: "from-blue-500 to-cyan-500" },
          { icon: User, label: "Kepala Keluarga", value: "800 +", color: "from-green-500 to-emerald-500" },
          { icon: Mars, label: "Pria", value: "4rb +", color: "from-blue-500 to-cyan-500" },
          { icon: Venus, label: "Wanita", value: "3rb +", color: "from-pink-500 to-rose-500" },
        ].map((stat, index) => (
          <div key={index} className="group relative">
            <div
              className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
              style={{
                background: `linear-gradient(to right, ${stat.color.split(" ")[1]}, ${stat.color.split(" ")[3]})`,
              }}
            ></div>
            <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 text-center">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-md text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
