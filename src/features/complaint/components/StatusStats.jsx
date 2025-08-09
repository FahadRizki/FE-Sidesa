const normalizeStatus = (status) => {
  if (!status) return '';
  return status.toString().toLowerCase().trim();
}

const getStatusCounts = (complaints) => {
  const statusCounts = {
    total: complaints.length,
    completed: 0,
    pending: 0,
    review: 0,
    rejected: 0,
  }
  
  complaints.forEach((complaint) => {
    const status = normalizeStatus(complaint.status);
    
    switch (status) {
      case 'disetujui':
        statusCounts.completed++;
        break;
      case 'pending':
        statusCounts.pending++;
        break;
      case 'ditinjau':
        statusCounts.review++;
        break;
      case 'ditolak':
        statusCounts.rejected++;
        break;
      default:
        console.warn(`Unknown status: "${complaint.status}" for complaint ID: ${complaint.id}`);
    }
  });
  
  return statusCounts;
}

const STAT_ITEMS = [
  { key: "total", label: "Total Pengajuan", color: "text-blue-600", bg: "bg-blue-50" },
  { key: "completed", label: "Disetujui", color: "text-green-600", bg: "bg-green-50" },
  { key: "review", label: "Ditinjau", color: "text-blue-600", bg: "bg-blue-50" },
  { key: "pending", label: "Menunggu", color: "text-orange-600", bg: "bg-orange-50" },
  { key: "rejected", label: "Ditolak", color: "text-red-600", bg: "bg-red-50" },
]

export default function StatusStats({ complaints }) {
  const stats = getStatusCounts(complaints)
  
  // Debug: Log untuk melihat status yang sebenarnya
  console.log('Complaint statuses:', complaints.map(c => ({
    id: c.id,
    status: c.status,
    statusLower: c.status?.toLowerCase().trim()
  })))
  
  console.log('Status counts:', stats)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {STAT_ITEMS.map((statItem) => (
        <div key={statItem.key} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className={`w-10 h-10 ${statItem.bg} rounded-xl flex items-center justify-center mb-3`}>
            <span className={`font-bold text-lg ${statItem.color}`}>{stats[statItem.key]}</span>
          </div>
          <p className="text-sm font-medium text-gray-700">{statItem.label}</p>
        </div>
      ))}
    </div>
  )
}