import { useForm, FormProvider } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "./authService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../components/form/InputField";
import SubmitButton from "../../components/buttons/SubmitButton";
import { ResetPasswordSchema } from "./validations/resetPasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await resetPassword({ ...data, token });
      toast.success("Reset password berhasil! Redirect ke login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      if (err.response?.data?.errors) {
        const messages = Object.values(err.response.data.errors).flat().join(" ");
        toast.error(messages);
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 py-20 relative">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-indigo-300/20 to-blue-600/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-red-600/20 blur-3xl rounded-full"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.105.895-2 2-2s2 .895 2 2v2h-4v-2zM6 12v1a4 4 0 004 4h4a4 4 0 004-4v-1"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
            <p className="text-sm text-gray-600 mt-2">Silakan masukkan email dan password baru Anda</p>
          </div>

          {/* Form with React Hook Form */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="email@example.com"
                error={errors.email}
              />

              <InputField
                label="Password Baru"
                name="password"
                type="password"
                placeholder="********"
                error={errors.password}
              />

              <InputField
                label="Konfirmasi Password"
                name="password_confirmation"
                type="password"
                placeholder="********"
                error={errors.password_confirmation}
              />

              <SubmitButton isSubmitting={isSubmitting} label="Reset Password" submittingLabel="Menyimpan..." />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
