import { Filter } from "lucide-react";
import { getTypeConfig } from "../../../config/statusConfig";
const FilterBar = ({ filters, onFilterChange, complaintTypes }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
    <div className="flex items-center gap-4 mb-4">
      <Filter className="w-5 h-5 text-gray-600" />
      <h3 className="font-semibold text-gray-900">Filter & Cari</h3>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="">Semua Status</option>
          <option value="pending">Menunggu</option>
          <option value="processing">Ditinjau</option>
          <option value="completed">Selesai</option>
          <option value="rejected">Ditolak</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tingkat Aduan</label>
        <select
          value={filters.type}
          onChange={(e) => onFilterChange('type', e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="">Semua Tingkat</option>
          {complaintTypes.map((type) => (
            <option key={type} value={type}>
              {getTypeConfig(type).label}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

export default FilterBar;