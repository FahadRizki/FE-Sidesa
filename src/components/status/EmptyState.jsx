import { Frown, TrendingUp, Search, Sparkles } from "lucide-react"

export function NoDataState({ type }) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Frown className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Belum Ada Pengajuan</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {`Nampaknya, Belum ada ${type} untuk saat ini.`}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
          <Sparkles className="w-5 h-5 inline mr-2" />
          {`Daftar atau ajukan ${type}`}
        </button>
        <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
          <TrendingUp className="w-5 h-5 inline mr-2" />
          Pelajari Lebih Lanjut
        </button>
      </div>
    </div>
  )
}

export function NoFilterResultsState() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak Ada Data</h3>
      <p className="text-gray-600">Tidak ada pengajuan yang sesuai dengan filter yang dipilih.</p>
    </div>
  )
}