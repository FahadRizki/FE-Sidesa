import { Bell } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "../../../context/AuthContext"
import StatusStats from "../components/status-components/StatusStats"
import StatusCard from "../components/status-components/StatusCard"
import LoadingState from "../../../components/status/LoadingState"
import FilterBar from "../components/status-components/Filterbar"
import Pagination from "../../../components/status/Pagination"
import ErrorState from "../../../components/status/ErrorStats"
import { getDownloadLetter } from "../services/letterService"
import { NoDataState, NoFilterResultsState } from "../../../components/status/EmptyState"

// Hooks
import { useLetterStatus, useFiltering, usePagination } from "../hooks/useLetterStatus"

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function LetterStatusList() {
  const { token } = useAuth()
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  
  // Download state
  const [downloadingId, setDownloadingId] = useState(null)
  
  // Data fetching
  const { allStatuses, letterTypes, error, loading, refetch } = useLetterStatus(token)
  
  // Filtering and pagination
  const filteredStatuses = useFiltering(allStatuses, statusFilter, typeFilter)
  const { currentPageStatuses, totalPages } = usePagination(filteredStatuses, currentPage)
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [statusFilter, typeFilter])
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      scrollToTop()
    }
  }
  
  // Handle download function
  const handleDownload = async (letterId) => {
    try {
      setDownloadingId(letterId);
      console.log("Downloading letter ID:", letterId);

      const response = await getDownloadLetter(letterId); // blob

      // Buat blob URL dari file
      const blobUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

      // Buat elemen link download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', `surat_${letterId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Hapus blob URL dari memori
      window.URL.revokeObjectURL(blobUrl);

      console.log("Download started successfully");
    } catch (error) {
      console.error("Download error:", error);
      alert("Terjadi kesalahan saat mengunduh surat");
    } finally {
      setDownloadingId(null);
    }
  };

  
  if (error) {
    return <ErrorState error={error} onRetry={refetch} />
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-blue-200 to-pink-100 py-20">
      <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Status Pengajuan Surat</h1>
              <p className="text-gray-600 mt-1">Pantau status pengajuan surat</p>
            </div>
          </div>
           {!loading && !allStatuses.length === 0 && <StatusStats allStatuses={allStatuses} />}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingState />
        ) : allStatuses.length === 0 ? (
          <NoDataState type={"Pengajuan Surat"} url={"/letter"}/>
        ) : (
          <>
            <FilterBar
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              letterTypes={letterTypes}
            />
            
            {filteredStatuses.length === 0 ? (
              <NoFilterResultsState />
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-gray-600">
                    Menampilkan {((currentPage - 1) * 5) + 1}-{Math.min(currentPage * 5, filteredStatuses.length)} dari {filteredStatuses.length} pengajuan
                  </p>
                </div>
                
                <div className="space-y-6">
                  {currentPageStatuses.map((item) => (
                    <StatusCard 
                      key={item.id} 
                      data={item} 
                      downloadingId={downloadingId}
                      onDownload={handleDownload}
                    />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}