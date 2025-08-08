// components/BackButton.jsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Jika tidak mau pakai icon, bisa ganti dengan teks biasa

export default function BackButton({ to = "", className = "" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center gap-2 text-md font-medium text-gray-600 hover:bg-gray-100 py-2 px-4 rounded-md ${className}`}
    >
      <ArrowLeft size={18} />
      <span>Kembali</span>
    </button>
  );
}
