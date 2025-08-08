import Struktur from '../../../assets/img/struktur organisasi pemerintah desa.png';
import { Users } from "lucide-react"
const StrukturOrganisasi = () => {
  

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2 mb-4">
          <Users className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-800">Struktur Organisasi</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Pemerintahan Desa Batununggal</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Mengenal para pemimpin dan pengurus yang mengabdi untuk kemajuan desa
        </p>
      </div>

     <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Struktur Organisasi Desa</h2>
    <img
      src={Struktur}
      alt="Struktur Organisasi Desa Batununggal"
      className="mx-auto max-w-full rounded-lg shadow-lg"
    />

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Jam Pelayanan</h3>
          <p className="text-gray-600">Kantor Desa Batununggal</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-300">
            <h4 className="font-semibold text-gray-900 mb-2">Hari Kerja</h4>
            <p className="text-gray-600">Senin - Jumat</p>
            <p className="text-lg font-bold text-blue-600">08:00 - 16:00 WIB</p>
          </div>

          <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-300">
            <h4 className="font-semibold text-gray-900 mb-2">Hari Sabtu</h4>
            <p className="text-gray-600">Pelayanan Terbatas</p>
            <p className="text-lg font-bold text-green-600">08:00 - 12:00 WIB</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StrukturOrganisasi
