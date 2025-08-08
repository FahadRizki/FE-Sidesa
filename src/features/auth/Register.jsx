import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./validations/registerSchema";
import InputField from "../../components/form/InputField";
import SubmitButton from "../../components/buttons/SubmitButton";
import { toast, ToastContainer } from "react-toastify";
import { register } from "./authService";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const methods = useForm({
    resolver: yupResolver(registerSchema),
  });
  const navigate = useNavigate();
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await register(data);
      toast.success("Pendaftaran berhasil. Silakan cek email verifikasi.");
      navigate("/resend-verification");
    } catch (err) {
      if (err.response?.status === 422) {
        const serverErrors = err.response.data.errors;
        Object.entries(serverErrors).forEach(([field, messages]) => {
          setError(field, { message: messages[0] });
          toast.error(messages[0]);
        });
        if (serverErrors.email && serverErrors.email[0].includes("sudah ada")) {
          toast.error("Email sudah digunakan, silakan gunakan email lain.");
        }
      } else {
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-green-200 to-cyan-50 px-4 py-20">
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-400/20 to-blue-600/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-600/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-600/10 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Buat Akun Baru</h1>
            <p className="text-gray-600 text-sm">
              Bergabunglah dengan kami dan nikmati layanan terbaik
            </p>
          </div>

          {/* Form */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  name="name"
                  label="Nama Lengkap"
                  placeholder="Masukkan nama lengkap"
                  error={errors.name}
                />

                <InputField
                  name="email"
                  label="Alamat Email"
                  type="email"
                  placeholder="kamu@email.com"
                  error={errors.email}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Minimal 8 karakter"
                  error={errors.password}
                />

                <InputField
                  name="password_confirmation"
                  label="Konfirmasi Password"
                  type="password"
                  placeholder="Ulangi password yang sama"
                  error={errors.password_confirmation}
                />
              </div>

              {/* Password Requirements */}
              <div className="bg-blue-50/50 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Persyaratan Password:</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li className="flex items-center">
                    <svg className="w-3 h-3 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Minimal 8 karakter
                  </li>
                  <li className="flex items-center">
                    <svg className="w-3 h-3 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Kombinasi huruf dan angka
                  </li>
                </ul>
              </div>

              {/* Terms and Privacy */}
              <div className="flex items-start space-x-3 p-4 bg-gray-50/50 backdrop-blur-sm rounded-xl border border-gray-200">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed">
                  Dengan mendaftar, saya menyetujui{" "}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium underline">
                    Syarat & Ketentuan
                  </Link>
                  {" "}dan{" "}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium underline">
                    Kebijakan Privasi
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <SubmitButton 
                  isSubmitting={isSubmitting} 
                  label={isSubmitting ? "Memproses..." : "Buat Akun"} 
                />
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">atau</span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Sudah punya akun?{" "}
                  <Link 
                    to="/login" 
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Data Aman
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Proses Cepat
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Support 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;