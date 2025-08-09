import { useState, useEffect } from "react"
import { useAuth } from "../../../context/AuthContext"
import { Bell } from "lucide-react"
// Components
import StatusStats from "../components/StatusStats"
import StatusCard from "../components/StatusCard"
import LoadingState from "../../../components/status/LoadingState"
import FilterBar from "../components/FilterBar"
import Pagination from "../../../components/status/Pagination"
import ErrorState from "../../../components/status/ErrorStats"
import { NoDataState, NoFilterResultsState } from "../../../components/status/EmptyState"

// Hooks
import { useUmkmStatus, useFiltering, usePagination } from "../hooks/useUmkmStatus"

export default function UmkmStatusList() {
  const { token } = useAuth()
  
  const [statusFilter, setStatusFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const { allStatuses, categories, error, loading, refetch } = useUmkmStatus(token)
  
  // Safe filtering dengan default value
  const filteredStatuses = useFiltering(allStatuses || [], statusFilter, categoryFilter)
  const { currentPageStatuses, totalPages } = usePagination(filteredStatuses || [], currentPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [statusFilter, categoryFilter])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Safe check untuk allStatuses
  const hasData = allStatuses && Array.isArray(allStatuses) && allStatuses.length > 0
  const hasFilteredData = filteredStatuses && Array.isArray(filteredStatuses) && filteredStatuses.length > 0

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-100 to-purple-300 p-4 sm:p-8 py-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="p-2 sm:p-3 bg-blue-100 rounded-2xl self-start">
            <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Status Pengajuan UMKM
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Pantau status pengajuan UMKM Anda
            </p>
          </div>
        </div>
        
        {/* Safe rendering untuk StatusStats */}
        {!loading && hasData && <StatusStats allStatuses={allStatuses} />}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {loading ? (
          <LoadingState />
        ) : !hasData ? (
          <NoDataState type="pengajuan UMKM" />
        ) : (
          <>
            <FilterBar
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              categories={categories || []}
            />

            {!hasFilteredData ? (
              <NoFilterResultsState />
            ) : (
              <>
                {/* Info jumlah data */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Menampilkan {((currentPage - 1) * 5) + 1}-
                    {Math.min(currentPage * 5, filteredStatuses.length)} dari {filteredStatuses.length} pengajuan
                  </p>
                </div>

                {/* Card list */}
                <div className="grid gap-4 sm:gap-6">
                  {(currentPageStatuses || []).map((item) => (
                    <StatusCard key={item.id} data={item} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-6 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}