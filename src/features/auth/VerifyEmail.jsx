import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "./authService"; // pastikan path benar

const VerifyEmail = () => {
  const { id, hash } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyEmail(id, hash);
        setMessage(response.data.message);
        setLoading(false);
        // Jika mau, redirect otomatis setelah 3 detik
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        if (err.response && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Verifikasi email gagal. Silakan coba lagi.");
        }
        setLoading(false);
      }
    };

    verify();
  }, [id, hash, navigate]);

  if (loading) return <p className="text-center mt-10">Memverifikasi email...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-gray-100 text-center">
        {message && (
            <div className="flex flex-col items-center text-green-600">
            <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-lg font-semibold">{message}</p>
            </div>
        )}

        {error && (
            <div className="flex flex-col items-center text-red-600">
            <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-lg font-semibold">{error}</p>
            </div>
        )}

        {!error && message && (
            <p className="mt-6 text-sm text-gray-600">
            Anda akan diarahkan ke halaman login dalam beberapa detik...
            </p>
        )}
        </div>
    </div>

  );
};

export default VerifyEmail;
