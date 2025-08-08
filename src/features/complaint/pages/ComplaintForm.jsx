import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/AuthContext";
import { stroreComplaint } from "../complaintService";
import useResidentSearch from "../../../hooks/useResidentSearch";
import ApplicantSelector from "../../../components/ApplicantSelector";
import InputField from "../../../components/form/InputField";
import TextareaField from "../../../components/form/TextareaField";
import objectToForm from "../utils/objectToForm";
import complaintSchema from "../validations/complaintSchema";
import SubmitButton from "../../../components/buttons/SubmitButton";
import ImgInput from "../../../components/form/ImgInput";

const ComplaintForm = () => {
  const { user } = useAuth();
  const { residents, search } = useResidentSearch();
  const [image, setImage] = useState(null);

  const methods = useForm({
    resolver: yupResolver(complaintSchema),
    defaultValues: {
      resident_id: "",
      title: "",
      address: "",
      phone: "",
      description: "",
      type_complaint: "normal",
      image: null,
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  useEffect(() => {
    if (user) {
      setValue("user_id", user.id);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const formData = objectToForm({ ...data, image });
    try {
      await stroreComplaint(formData);
      toast.success("Aduan berhasil diajukan!");
      reset();
      setImage(null);
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error(err.response?.data?.message || "Terjadi kesalahan.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-rose-200 to-orange-100 relative overflow-hidden">
      {/* Decorative Background */}
       <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-400/15 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mb-6 shadow-xl">
              <span className="text-4xl">📢</span>
            </div>
            <h1 className="text-4xl font-black text-gray-800 mb-3 drop-shadow-lg">
              Form Pengaduan Warga
            </h1>
            <p className="text-gray-700 text-lg max-w-md mx-auto leading-relaxed">
              Sampaikan keluhan atau masalah yang Anda alami agar segera ditindaklanjuti.
            </p>
          </div>

          {/* Card Form */}
          <div className="relative">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-xl">📄</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Detail Pengaduan</h2>
                      <p className="text-white/80 text-sm">Mohon isi data secara lengkap</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
               

                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <ApplicantSelector options={residents} onSearch={search} error={errors.resident_id} />
                    <InputField name="title" label="Aduan" error={errors.title} />
                    <TextareaField name="address" label="Alamat" error={errors.address} rows={2} />
                    <InputField name="phone" label="No. HP" error={errors.phone} />
                    <TextareaField name="description" label="Deskripsi" error={errors.description} rows={4} />

                    <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:border-rose-400 hover:bg-rose-50 transition-all duration-300">
                      <ImgInput
                        label="Upload Bukti Foto"
                        name="image"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          setValue("image", e.target.files[0]);
                        }}
                        error={errors.image}
                      />
                    </div>

                    <div className="pt-4">
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        label="🚀 Kirim Aduan"
                        submittingLabel="📤 Mengirim..."
                        className="w-full px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/30 font-bold text-lg"
                      />
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>

            {/* Floating Hint */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm text-gray-600 shadow-lg">
                <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></span>
                Isi data dengan benar agar aduan bisa segera ditindaklanjuti.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
