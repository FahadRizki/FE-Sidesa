import { ChevronLeft, ChevronRight } from "lucide-react"

const PaginationButton = ({ onClick, disabled, children, isActive = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    {children}
  </button>
)

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4 inline mr-1" />
        Sebelumnya
      </PaginationButton>
      
      {pages.map((page) => (
        <PaginationButton
          key={page}
          onClick={() => onPageChange(page)}
          isActive={currentPage === page}
        >
          {page}
        </PaginationButton>
      ))}
      
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Selanjutnya
        <ChevronRight className="w-4 h-4 inline ml-1" />
      </PaginationButton>
    </div>
  )
}