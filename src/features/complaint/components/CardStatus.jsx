import { Calendar, MessageSquare, RefreshCw } from "lucide-react";
import { formatDate } from "../../../utils/dateUlits";
import StatusHeader from "../components/Header";

const ComplaintCard = ({ complaint }) => {
  const isRejected = complaint.status?.toLowerCase() === "rejected";

  return (
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden">
      <StatusHeader complaint={complaint} />

      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-orange-50 rounded-2xl">
            <MessageSquare className="w-6 h-6 text-orange-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-orange-600 transition-colors">
              {complaint.title}
            </h3>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Diajukan {formatDate(complaint.created_at)}</span>
              </div>
            </div>

            {complaint.remarks && (
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {complaint.remarks}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-xl transition-all">
                <MessageSquare className="w-4 h-4" />
                Lihat Detail
              </button>
              
              {isRejected && (
                <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">
                  <RefreshCw className="w-4 h-4" />
                  Ajukan Ulang
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard