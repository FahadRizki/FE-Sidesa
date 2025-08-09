const getStatusCounts = (complaints) => {
  const statusColors = {
    disetujui: { color: "text-green-600", bg: "bg-green-50", label: "Disetujui" },
    pending: { color: "text-orange-600", bg: "bg-orange-50", label: "Menunggu" },
    ditinjau: { color: "text-blue-600", bg: "bg-blue-50", label: "Ditinjau" },
    ditolak: { color: "text-red-600", bg: "bg-red-50", label: "Ditolak" }
  }

  const counts = {
    total: complaints.length,
    ...Object.keys(statusColors).reduce((acc, key) => {
      acc[key] = complaints.filter(
        (s) => s.status?.toLowerCase().trim() === key
      ).length
      return acc
    }, {})
  }

  return { counts, statusColors }
}

export default function StatusStats({ complaints }) {
  const { counts, statusColors } = getStatusCounts(complaints)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {/* Total */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
          <span className="font-bold text-lg text-blue-600">{counts.total}</span>
        </div>
        <p className="text-sm font-medium text-gray-700">Total Pengajuan</p>
      </div>

      {/* Status lainnya */}
      {Object.entries(statusColors).map(([key, { color, bg, label }]) => (
        <div key={key} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
            <span className={`font-bold text-lg ${color}`}>{counts[key]}</span>
          </div>
          <p className="text-sm font-medium text-gray-700">{label}</p>
        </div>
      ))}
    </div>
  )
}
