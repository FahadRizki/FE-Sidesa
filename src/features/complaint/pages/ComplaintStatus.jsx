import { useFilters, usePagination, useComplaintData,  } from "../hooks/useComplaintStatus";
import StatusStats from "../components/StatusStats"
import FilterBar from "../components/FilterBar"
import Pagination from "../../../components/status/Pagination"
import ErrorState from "../../../components/status/ErrorStats"
import LoadingState from "../../../components/status/LoadingState";
import ComplaintCard from "../components/CardStatus";
import { NoDataState, NoFilterResultsState } from "../../../components/status/EmptyState"
import { Bell } from "lucide-react";

const ComplaintStatusList = () => {
  const { complaints, complaintTypes, loading, error, refetch } = useComplaintData();
  const { filters, filteredComplaints, updateFilter } = useFilters(complaints);
  const { currentPage, totalPages, paginatedItems, goToPage } = usePagination(filteredComplaints);

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-violet-200 to-green-100 py-20">
      {/* Header */}
      <div >
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-100 rounded-2xl">
              <Bell className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Status Aduan Warga</h1>
              <p className="text-gray-600 mt-1">Pantau perkembangan aduan dan keluhan Anda</p>
            </div>
          </div>

          {!loading && complaints.length > 0 && <StatusStats complaints={complaints} />}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingState />
        ) : complaints.length === 0 ? (
          <NoDataState  type={"Aduan"} url={"/complaint-form"}/>
        ) : (
          <>
            <FilterBar
              filters={filters}
              onFilterChange={updateFilter}
              complaintTypes={complaintTypes}
            />

            {filteredComplaints.length === 0 ? (
              <NoFilterResultsState />
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-gray-600">
                    Menampilkan {paginatedItems.length} dari {filteredComplaints.length} aduan</p>
                </div>

                <div className="space-y-6">
                  {paginatedItems.map((complaint) => (
                    <ComplaintCard key={complaint.id} complaint={complaint} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ComplaintStatusList;


