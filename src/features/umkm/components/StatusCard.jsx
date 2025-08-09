import {
  Store,
  Calendar,
  MessageSquare,
  FileText,
  RefreshCw,
} from "lucide-react"
import { STATUS_CONFIG } from "../../../config/statusConfig"
import { formatDate } from "../../../utils/dateUlits"
import { Link } from "react-router-dom"

export default function StatusCard({ data }) {
  const status = data?.status?.toLowerCase() || "pending"
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  const StatusIcon = config.icon

  return (
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`${config.bgColor} ${config.borderColor} border-b px-4 sm:px-6 py-3 sm:py-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Status */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white shadow-sm">
              <StatusIcon className={`w-5 h-5 ${config.color}`} />
            </div>
            <div>
              <span className={`${config.color} font-semibold text-xs sm:text-sm`}>{config.label}</span>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${config.dotColor}`}></div>
                <span className="text-xs text-gray-500">
                  Diperbarui {formatDate(data.updated_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Kategori */}
          <div className="text-left sm:text-right">
            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
              {data.umkm_category}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Icon UMKM */}
          <div className="p-3 bg-blue-50 rounded-2xl self-start sm:self-auto">
            <Store className="w-6 h-6 text-blue-600" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors break-words">
              {data.umkm_name}
            </h3>

            {/* Tanggal */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Diajukan {formatDate(data.created_at)}</span>
              </div>
            </div>

            {/* Remarks */}
            {data.remarks && (
              <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 mb-4">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
                    {data.remarks}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* <button className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 sm:px-4 py-2 rounded-xl transition-all">
                <FileText className="w-4 h-4" />
                Lihat Detail
              </button> */}
              {status === "rejected" && (
                <Link to={`/umkm-form`} className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 sm:px-4 py-2 rounded-xl transition-all">
                  <RefreshCw className="w-4 h-4" />
                  Ajukan Ulang
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
