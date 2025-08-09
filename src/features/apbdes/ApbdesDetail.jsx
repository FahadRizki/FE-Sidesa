"use client"

import { useEffect, useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getApbdesDetail, getApbdesYears } from "./services/apbdesServices"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowLeft,
  Calendar,
  PieChartIcon,
  BarChart3,
  Sparkles,
} from "lucide-react"

const formatRupiah = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num)

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#84cc16", "#f97316"]

export default function ApbdesDetail() {
  const { tahun } = useParams()
  const navigate = useNavigate()
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [years, setYears] = useState([])
  const [activeChart, setActiveChart] = useState("bar")

  useEffect(() => {
    setLoading(true)
    Promise.all([getApbdesDetail(tahun), getApbdesYears()])
      .then(([resDetail, resYears]) => {
        setDetail(resDetail.data)
        setYears(resYears.data)
      })
      .finally(() => setLoading(false))
  }, [tahun])

  const chartBelanja = useMemo(() => {
    return (
      detail?.penggunaan?.map((item) => ({
        name: item.uraian,
        jumlah: Number(item.jumlah),
      })) || []
    )
  }, [detail])

  const chartPendapatan = useMemo(() => {
    return (
      detail?.pendapatan_rinci?.map((item) => ({
        name: item.uraian,
        jumlah: Number(item.jumlah),
      })) || []
    )
  }, [detail])

  const handleChangeTahun = (e) => {
    const selected = e.target.value
    if (selected !== tahun) {
      navigate(`/apbdes/${selected}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg font-medium text-gray-600 animate-pulse">Memuat detail APBDes...</p>
        </div>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center ">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Data Tidak Ditemukan</h3>
          <p className="text-gray-600 mb-6">APBDes untuk tahun yang dipilih tidak tersedia</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
        </div>
      </div>
    )
  }

  return (
     <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-violet-400 to-cyan-200 relative overflow-hidden mx-auto p-4 sm:p-6 lg:p-10 py-8 sm:py-12 lg:py-20">
      {/* Animated Background Elements */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full px-4 py-2 mb-2">
          <DollarSign className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-800">APBDes Desa</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 text-center">Anggaran Desa {tahun}</h1>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Year Selector & Actions */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="pl-10 pr-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-700 font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  value={tahun}
                  onChange={handleChangeTahun}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      Tahun {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {[
            {
              label: "Total Pendapatan",
              value: detail.pendapatan,
              icon: TrendingUp,
              color: "from-green-500 to-emerald-600",
              bg: "from-green-50 to-emerald-50",
              change: "+12.5%",
            },
            {
              label: "Total Belanja",
              value: detail.belanja,
              icon: TrendingDown,
              color: "from-red-500 to-pink-600",
              bg: "from-red-50 to-pink-50",
              change: "+8.3%",
            },
            {
              label: "Pembiayaan",
              value: detail.pembiayaan,
              icon: DollarSign,
              color: "from-yellow-500 to-orange-600",
              bg: "from-yellow-50 to-orange-50",
              change: "+5.7%",
            },
          ].map((item, index) => (
            <div key={index} className="group relative">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl sm:rounded-3xl blur-xl`}
              ></div>
              <div
                className={`relative bg-gradient-to-br ${item.bg} backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl border border-white/50 transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      {item.change}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2">{item.label}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-black text-gray-900 mb-1 leading-tight">{formatRupiah(item.value)}</p>
                  <p className="text-xs text-gray-500">Tahun {tahun}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Visualisasi Data</h2>
            <p className="text-sm sm:text-base text-gray-600">Analisis detail pendapatan dan belanja desa</p>
          </div>

          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl p-1 border border-gray-200/50 shadow-lg">
            {[
              { id: "bar", label: "Bar Chart", icon: BarChart3 },
              { id: "pie", label: "Pie Chart", icon: PieChart },
            ].map((chart) => (
              <button
                key={chart.id}
                onClick={() => setActiveChart(chart.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                  activeChart === chart.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
              >
                <chart.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{chart.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Charts Section - Mobile Optimized */}
        <div className="space-y-6 sm:space-y-8">
          {/* Belanja Chart - Full Width on Mobile */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Grafik Belanja</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Distribusi pengeluaran desa</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              {chartBelanja.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Tidak ada data belanja</p>
                </div>
              ) : (
                <div className="h-64 sm:h-80 lg:h-96">
                  {activeChart === "bar" ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartBelanja} margin={{ bottom: 80, left: 20, right: 20, top: 20 }}>
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          interval={0}
                          height={100}
                          fontSize={10}
                          tick={{ fill: "#6b7280" }}
                        />
                        <YAxis
                          tickFormatter={(v) => (v / 1_000_000).toFixed(0) + "M"}
                          fontSize={10}
                          tick={{ fill: "#6b7280" }}
                          width={60}
                        />
                        <Tooltip
                          formatter={(v) => [formatRupiah(v), "Jumlah"]}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                            fontSize: "12px"
                          }}
                        />
                        <Bar dataKey="jumlah" fill="url(#redGradient)" radius={[4, 4, 0, 0]} />
                        <defs>
                          <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#dc2626" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartBelanja}
                          dataKey="jumlah"
                          nameKey="name"
                          cx="50%"
                          cy="45%"
                          outerRadius="60%"
                          innerRadius="25%"
                          paddingAngle={2}
                          stroke="#fff"
                          strokeWidth={2}
                          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {chartBelanja.map((_, index) => (
                            <Cell
                              key={index}
                              fill={COLORS[index % COLORS.length]}
                              stroke="#fff"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(v) => [formatRupiah(v), "Jumlah"]}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                            fontSize: "12px"
                          }}
                        />
                        <Legend 
                          verticalAlign="bottom" 
                          height={60} 
                          wrapperStyle={{ fontSize: "10px", paddingTop: "20px" }}
                          iconSize={8}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Pendapatan Chart - Full Width on Mobile */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Grafik Pendapatan</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Sumber pemasukan desa</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              {chartPendapatan.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Tidak ada data pendapatan</p>
                </div>
              ) : (
                <div className="h-64 sm:h-80 lg:h-96">
                  {activeChart === "bar" ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartPendapatan} margin={{ bottom: 80, left: 20, right: 20, top: 20 }}>
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          interval={0}
                          height={100}
                          fontSize={10}
                          tick={{ fill: "#6b7280" }}
                        />
                        <YAxis
                          tickFormatter={(v) => (v / 1_000_000).toFixed(0) + "M"}
                          fontSize={10}
                          tick={{ fill: "#6b7280" }}
                          width={60}
                        />
                        <Tooltip
                          formatter={(v) => [formatRupiah(v), "Jumlah"]}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                            fontSize: "12px"
                          }}
                        />
                        <Bar dataKey="jumlah" fill="url(#greenGradient)" radius={[4, 4, 0, 0]} />
                        <defs>
                          <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#059669" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartPendapatan}
                          dataKey="jumlah"
                          nameKey="name"
                          cx="50%"
                          cy="45%"
                          outerRadius="60%"
                          innerRadius="25%"
                          paddingAngle={2}
                          stroke="#fff"
                          strokeWidth={2}
                          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {chartPendapatan.map((_, index) => (
                            <Cell
                              key={index}
                              fill={COLORS[index % COLORS.length]}
                              stroke="#fff"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(v) => [formatRupiah(v), "Jumlah"]}
                          contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                            fontSize: "12px"
                          }}
                        />
                        <Legend 
                          verticalAlign="bottom" 
                          height={60} 
                          wrapperStyle={{ fontSize: "10px", paddingTop: "20px" }}
                          iconSize={8}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Summary Analysis */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">Ringkasan Analisis</h3>
                <p className="text-white/80 text-xs sm:text-sm">APBDes Tahun {tahun}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Efisiensi Anggaran</h4>
                <p className="text-xl sm:text-2xl font-bold mb-1">{((detail.belanja / detail.pendapatan) * 100).toFixed(1)}%</p>
                <p className="text-white/70 text-xs sm:text-sm">Rasio belanja terhadap pendapatan</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Surplus/Defisit</h4>
                <p className="text-lg sm:text-2xl font-bold mb-1 leading-tight">{formatRupiah(detail.pendapatan - detail.belanja)}</p>
                <p className="text-white/70 text-xs sm:text-sm">
                  {detail.pendapatan > detail.belanja ? "Surplus anggaran" : "Defisit anggaran"}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Total Anggaran</h4>
                <p className="text-lg sm:text-2xl font-bold mb-1 leading-tight">{formatRupiah(detail.pendapatan + detail.pembiayaan)}</p>
                <p className="text-white/70 text-xs sm:text-sm">Pendapatan + Pembiayaan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
