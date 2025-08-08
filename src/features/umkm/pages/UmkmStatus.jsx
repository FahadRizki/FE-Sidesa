
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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function UmkmStatusList() {
  const { token } = useAuth()
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Data fetching
  const { allStatuses, categories, error, loading, refetch } = useUmkmStatus(token)
  
  // Filtering and pagination
  const filteredStatuses = useFiltering(allStatuses, statusFilter, categoryFilter)
  const { currentPageStatuses, totalPages } = usePagination(filteredStatuses, currentPage)

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [statusFilter, categoryFilter])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      scrollToTop()
    }
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-100 to-purple-300 p-20">
      <div >
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Status Pengajuan UMKM</h1>
              <p className="text-gray-600 mt-1">Pantaun status pengajuan UMKM</p>
            </div>
          </div>

          <StatusStats  statuses={allStatuses} />
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingState />
        ) : allStatuses.length === 0 ? (
          <NoDataState type={"pengajuan UMKM"}/>
        ) : (
          <>
            <FilterBar
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              categories={categories}
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
                    <StatusCard key={item.id} data={item} />
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