
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getApbdes, getApbdesDetail } from "../contentService"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  ArrowRight,
  Sparkles,
  PieChart,
  Activity,
} from "lucide-react"
import Aos from "aos"
import "aos/dist/aos.css"

const formatRupiah = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num)

const formatShortRupiah = (num) => {
  if (num >= 1_000_000_000) {
    return `Rp ${(num / 1_000_000_000).toFixed(1)}M`
  } else if (num >= 1_000_000) {
    return `Rp ${(num / 1_000_000).toFixed(1)}Jt`
  } else if (num >= 1_000) {
    return `Rp ${(num / 1_000).toFixed(1)}K`
  }
  return formatRupiah(num)
}

export default function ApbdesPreview() {
  const [availableYears, setAvailableYears] = useState([])
  const [selectedYear, setSelectedYear] = useState("")
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Initialize AOS
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    })
  }, [])

  // Ambil daftar tahun
  useEffect(() => {
    getApbdes().then((res) => {
      console.log(res.data)
      const years = res.data.map((item) => item.tahun).sort((a, b) => b - a)
      setAvailableYears(years)
      if (years.length > 0) {
        setSelectedYear(years[0]) // auto-select tahun terbaru
      }
    })
  }, [])

  // Fetch data detail saat tahun dipilih
  useEffect(() => {
    if (!selectedYear) return
    console.log(selectedYear)
    setLoading(true)
    getApbdesDetail(selectedYear)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false))
  }, [selectedYear])

  const surplus = data ? data.pendapatan - data.belanja : 0
  const efficiency = data ? ((data.belanja / data.pendapatan) * 100).toFixed(1) : 0

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header Section */}
        <div data-aos="fade-down" className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-8 shadow-2xl">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 text-sm font-medium tracking-wide">Anggaran Desa</span>
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"> 
            APBDes <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Desa Batununggal
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Transparansi anggaran untuk
            <span className="font-semibold text-blue-600"> pembangunan berkelanjutan </span>
            dan kesejahteraan masyarakat
          </p>

          {/* Year Selector */}
          <div className="relative inline-block">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="pl-12 pr-8 py-4 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-gray-700 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 text-lg min-w-[200px]"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  Tahun {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div data-aos="fade-up" className="text-center py-20">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <p className="text-xl font-medium text-gray-600 animate-pulse">Memuat data APBDes...</p>
            </div>
          ) : data ? (
            <div data-aos="fade-up" className="space-y-8">
              {/* Main Stats Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <DollarSign className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">APBDes {data.tahun}</h3>
                        <p className="text-gray-600">Anggaran Pendapatan dan Belanja Desa</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      {
                        label: "Total Pendapatan",
                        value: data.pendapatan,
                        shortValue: formatShortRupiah(data.pendapatan),
                        icon: TrendingUp,
                        color: "from-green-500 to-emerald-600",
                        bg: "from-green-50 to-emerald-50",
                      },
                      {
                        label: "Total Belanja",
                        value: data.belanja,
                        shortValue: formatShortRupiah(data.belanja),
                        icon: TrendingDown,
                        color: "from-red-500 to-pink-600",
                        bg: "from-red-50 to-pink-50",
                      },
                      {
                        label: "Surplus/Defisit",
                        value: surplus,
                        shortValue: formatShortRupiah(Math.abs(surplus)),
                        icon: surplus >= 0 ? TrendingUp : TrendingDown,
                        color: surplus >= 0 ? "from-blue-500 to-cyan-600" : "from-orange-500 to-red-600",
                        bg: surplus >= 0 ? "from-blue-50 to-cyan-50" : "from-orange-50 to-red-50",
                      },
                      {
                        label: "Efisiensi",
                        value: `${efficiency}%`,
                        shortValue: `${efficiency}%`,
                        icon: Activity,
                        color: "from-purple-500 to-indigo-600",
                        bg: "from-purple-50 to-indigo-50",
                      },
                    ].map((stat, index) => (
                      <div key={index} className="group/stat relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover/stat:opacity-10 transition-opacity duration-300 rounded-2xl blur`}
                        ></div>
                        <div
                          className={`relative bg-gradient-to-br ${stat.bg} backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/50 transition-all duration-300 transform hover:-translate-y-1`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                            >
                              <stat.icon className="w-6 h-6 text-white" />
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                            <p className="text-xl font-black text-gray-900 mb-1">{stat.shortValue}</p>
                            <p className="text-xs text-gray-500">
                              {typeof stat.value === "number" ? formatRupiah(stat.value) : stat.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4 mb-8">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Realisasi Belanja</span>
                        <span className="text-sm font-bold text-gray-900">{efficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${Math.min(efficiency, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Status Anggaran</span>
                        <span className={`text-sm font-bold ${surplus >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {surplus >= 0 ? "Surplus" : "Defisit"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            surplus >= 0
                              ? "bg-gradient-to-r from-green-500 to-emerald-600"
                              : "bg-gradient-to-r from-red-500 to-pink-600"
                          }`}
                          style={{ width: `${Math.abs((surplus / data.pendapatan) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to={`/apbdes-detail/${data.tahun}`}
                      className="group flex-1 relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <span className="relative flex items-center justify-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Lihat Detail Lengkap
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Link>

                    <button className="group px-6 py-4 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-gray-700 hover:text-gray-900 font-semibold rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <span className="flex items-center justify-center gap-2">
                        <PieChart className="w-5 h-5" />
                        Unduh Laporan
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    title: "Transparansi",
                    description: "Data anggaran terbuka untuk publik",
                    icon: "🔍",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    title: "Akuntabilitas",
                    description: "Pertanggungjawaban penggunaan dana",
                    icon: "📊",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    title: "Partisipasi",
                    description: "Melibatkan masyarakat dalam perencanaan",
                    icon: "🤝",
                    color: "from-purple-500 to-pink-500",
                  },
                ].map((item, index) => (
                  <div key={index} className="group relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur`}
                    ></div>
                    <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/50 transition-all duration-300 transform hover:-translate-y-1 text-center">
                      <div className="text-3xl mb-4">{item.icon}</div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div data-aos="fade-up" className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak Ada Data</h3>
              <p className="text-gray-600 mb-8">Data APBDes untuk tahun yang dipilih tidak tersedia</p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Muat Ulang Data
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
