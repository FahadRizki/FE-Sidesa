import { Link } from "react-router-dom"
import { STATUS_CONFIG } from "../../../../config/statusConfig"
import { formatDate } from "../../../../utils/dateUlits"
import {
  Store,
  Calendar,
  MessageSquare,
  FileText,
  RefreshCw,
  Download,
  Loader2 // Tambahkan import ini
} from "lucide-react"
import { Link } from "react-router-dom"
export default function StatusCard({ data, downloadingId, onDownload }) {
  const status = data?.status?.toLowerCase() || "pending"
  console.log("Status data:", status, data) // Debug log
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  const StatusIcon = config.icon

  const isDownloading = downloadingId === data.id
  const canDownload = status === "completed" 
  
  console.log("Can download:", canDownload, "Status:", status) // Debug log
  
  return (
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden">
      <div className={`${config.bgColor} ${config.borderColor} border-b px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white shadow-sm">
              <StatusIcon className={`w-5 h-5 ${config.color}`} />
            </div>
            <div>
              <span className={`${config.color} font-semibold text-sm`}>{config.label}</span>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${config.dotColor}`}></div>
                <span className="text-xs text-gray-500">Diperbarui {formatDate(data.updated_at)}</span>
              </div>
            </div>
          </div>
          <div className="text-center sm:text-right mt-2">
            <span className="text-xs w-auto text-gray-500 bg-white px-2 py-1 rounded-full inline-block">
              {data.letter_type?.name}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-2xl">
            <Store className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
              {data.letter_type?.name}
            </h3>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Diajukan {formatDate(data.created_at)}</span>
              </div>
            </div>

            {data.remarks && (
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed">{data.remarks}</p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {status === "rejected" && (
                <Link to={'/letter'} className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">
                  <RefreshCw className="w-4 h-4" />
                  Ajukan Ulang
                </Link>
              )}
              
              {/* Tombol Unduh - dipindah ke dalam flex gap-3 */}
              {canDownload && onDownload && (
                <button
                  onClick={() => onDownload(data.id)}
                  disabled={isDownloading}
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl text-white bg-green-600 hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4" />
                      Mengunduh...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Unduh Surat
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}