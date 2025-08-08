import { Filter } from "lucide-react"

const STATUS_OPTIONS = [
  { value: "pending", label: "Menunggu" },
  { value: "review", label: "Dalam Review" },
  { value: "completed", label: "Disetujui" },
  { value: "rejected", label: "Ditolak" },
  { value: "processing", label: "Diproses" },
]

const SelectField = ({ label, value, onChange, options, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value || option} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  </div>
)

export default function FilterBar({ 
  statusFilter, 
  setStatusFilter, 
  categoryFilter, 
  setCategoryFilter, 
  categories ,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">Filter & Cari</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={STATUS_OPTIONS}
          placeholder="Semua Status"
        />
        
        <SelectField
          label="Kategori"
          value={categoryFilter }
          onChange={(e) => setCategoryFilter(e.target.value) }
          options={categories}
          placeholder="Semua Kategori"
        />
      </div>
    </div>
  )
}

