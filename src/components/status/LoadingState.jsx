export default function LoadingState() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-200 rounded-xl animate-pulse"></div>
                <div>
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="flex-1">
                <div className="w-48 h-5 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex gap-3">
                  <div className="w-20 h-8 bg-gray-200 rounded-xl animate-pulse"></div>
                  <div className="w-24 h-8 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}