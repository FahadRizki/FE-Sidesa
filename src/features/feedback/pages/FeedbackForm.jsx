import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { storeFeedback } from "../feedbackService";
import { useAuth } from "../../../context/AuthContext";
import TextareaField from "../../../components/form/TextareaField";
import { ToastContainer, toast } from "react-toastify";
import objectToFormData from "../utils/objectToFormData";
import "react-toastify/dist/ReactToastify.css";
import feedbackSchema from "../validations/feedbackSchema";
import SubmitButton from "../../../components/buttons/SubmitButton";

const FeedbackForm = () => {
  const { user } = useAuth();
  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      description: "",
      rating: 0,
    },
  });


  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = methods;

  useEffect(() => {
    if (user) {
      setValue("user_id", user.id);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = objectToFormData(data);
      await storeFeedback(formData);
      toast.success("Terima kasih atas feedback-nya!");
      reset({ description: "", rating: 0 });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error.response?.data?.message || "Terjadi kesalahan.");
    }
  };

  const currentRating = watch("rating");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#91eae4] via-[#86fde8] to-[#7efff5] relative overflow-hidden flex flex-col items-center justify-center py-20">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-2xl"></div>
      </div>
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/30 backdrop-blur-md rounded-2xl mb-4 shadow-xl">
          <span className="text-4xl">📝</span>
        </div>
        <h1 className="text-4xl font-extrabold text-violet-600 drop-shadow-md mb-2">
          Form Feedback
        </h1>
        <p className="text-gray-700 text-md max-w-xl mx-auto leading-relaxed">
          Kami sangat menghargai masukan Anda! Silakan berikan feedback tentang desa Batununggal.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* Card Container */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-6 rounded-t-3xl flex items-center gap-4 shadow-md">
            <div className="bg-white/20 w-12 h-12 flex items-center justify-center rounded-xl">
              <span className="text-2xl">💬</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Form Feedback</h2>
              <p className="text-white/80 text-sm">Bantu kami menjadi lebih baik!</p>
            </div>
          </div>

          {/* Card Content */}
          <div className="px-8 py-6">
           {/* <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}/> */}

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <TextareaField
                  name="description"
                  label="Deskripsi Feedback"
                  placeholder="Tulis masukan Anda di sini..."
                  error={errors.description}
                  rows={4}
                />

                {/* Rating Stars */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex space-x-1 text-yellow-400 cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        onClick={() => setValue("rating", star)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={currentRating >= star ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className={`w-7 h-7 transition-all duration-200 hover:scale-125 ${
                          currentRating >= star ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.287 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.42 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.287-3.966z"
                        />
                      </svg>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className="text-sm text-red-500 mt-1">{errors.rating.message}</p>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    label="📩 Kirim Feedback"
                    submittingLabel="Mengirim..."
                    className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-md font-semibold text-lg"
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
