import { formatDate } from "../../../utils/dateUlits";
import { getStatusConfig } from "../../../config/statusConfig";
import ComplaintTypeChip from "./TypeChip";
const StatusHeader = ({ complaint }) => {
  const config = getStatusConfig(complaint.status);
  const StatusIcon = config.icon;

  return (
    <div className={`${config.bgColor} ${config.borderColor} border-b px-6 py-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white shadow-sm">
            <StatusIcon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div>
            <span className={`${config.color} font-semibold text-sm`}>
              {config.label}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />
              <span className="text-xs text-gray-500">
                Diperbarui {formatDate(complaint.updated_at || complaint.created_at)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <ComplaintTypeChip type={complaint.type_complaint} />
        </div>
      </div>
    </div>
  );
};

export default StatusHeader;