import { getTypeConfig } from "../../../config/statusConfig";

const ComplaintTypeChip = ({ type }) => {
  const typeInfo = getTypeConfig(type);
  const TypeIcon = typeInfo.icon;

  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${typeInfo.bgColor} ${typeInfo.color}`}>
      <TypeIcon className="w-3 h-3 inline mr-1" />
      {typeInfo.label}
    </span>
  );
};

export default ComplaintTypeChip