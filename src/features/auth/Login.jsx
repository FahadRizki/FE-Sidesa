import { useForm, FormProvider } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { login as loginService } from "./authService";
import InputField from "../../components/form/InputField";
import SubmitButton from "../../components/buttons/SubmitButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSchema } from "./validations/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const methods = useForm({
      resolver: yupResolver(loginSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await loginService(data);
      const { access_token, user } = response.data;

      login({ user, token: access_token });

      toast.success("Login berhasil! Anda akan diarahkan...", {
        onClose: () => navigate("/"),
        delay: 500, // opsional delay untuk UX yang lebih smooth
      });
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 422) {
        const message =
          err.response.data.message || "Email atau password salah";
        setError("email", { message });
        toast.error(message);
      } else {
        toast.error("Login gagal. Silakan coba lagi nanti.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-cyan-300 px-4 py-20">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-teal-400/20 to-blue-600/20 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Selamat Datang
            </h1>
            <p className="text-gray-600">Masuk ke akun Anda</p>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="kamu@email.com"
                  error={errors.email}
                />

                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  error={errors.password}
                />
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Lupa password?
                </Link>
              </div>

              <SubmitButton isSubmitting={isSubmitting} label="Masuk" />

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">atau</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600">
                  Belum punya akun?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    Daftar sekarang
                  </Link>
                </p>
              </div>
            </form>
          </FormProvider>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Dengan masuk, Anda menyetujui{" "}
            <Link to="/terms" className="underline hover:text-gray-700">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link to="/privacy" className="underline hover:text-gray-700">
              Kebijakan Privasi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
