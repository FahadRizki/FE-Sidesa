import {
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  AlertTriangle
} from "lucide-react"

export const STATUS_CONFIG = {
  completed: {
    label: "Disetujui",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    borderColor: "border-green-200",
    dotColor: "bg-green-500",
  },
  rejected: {
    label: "Ditolak",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
    borderColor: "border-red-200",
    dotColor: "bg-red-500",
  },
  pending: {
    label: "Menunggu",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-200",
    dotColor: "bg-orange-500",
  },
  review: {
    label: "Dalam Review",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-200",
    dotColor: "bg-blue-500",
  },

  processing: {
    label: "Di Proses",
    icon: Clock,
    color: "text-blue-800",
    bgColor: "bg-blue-300",
    borderColor: "border-blue-100",
    dotColor: "bg-blue-500",
  },
}


const TYPE_CONFIG = {
  'normal': {
    label: 'Normal',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    icon: MessageSquare,
  },
  'sedang': {
    label: 'Sedang',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    icon: AlertTriangle,
  },
  'darurat': {
    label: 'Darurat',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    icon: AlertTriangle,
  },
  'sangat darurat': {
    label: 'Sangat Darurat',
    color: 'text-red-800',
    bgColor: 'bg-red-200',
    icon: AlertTriangle,
  },
};


export const getStatusConfig = (status) => {
  const normalizedStatus = status?.toLowerCase().trim();

  // Mapping alias status API → key STATUS_CONFIG
  const aliasMap = {
    disetujui: "completed",
    ditolak: "rejected",
    pending: "pending",
    ditinjau: "review",
    diproses: "processing"
  };

  const key = aliasMap[normalizedStatus] || "pending";
  return STATUS_CONFIG[key] || STATUS_CONFIG.pending;
};

export const getTypeConfig = (type) => {
  const normalizedType = type?.toLowerCase() || 'normal';
  return TYPE_CONFIG[normalizedType] || TYPE_CONFIG.normal;
};


export const ITEMS_PER_PAGE = 5