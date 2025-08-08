
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import umkmSchema from "../validations/umkmSchema";
import { useAuth } from "../../../context/AuthContext";
import { storeUmkm } from "../umkmService";
import useResidentSearch from "../../../hooks/useResidentSearch";
import ApplicantSelector from "../../../components/ApplicantSelector";
import InputField from "../../../components/form/InputField";
import TextareaField from "../../../components/form/TextareaField";
import buildFormData from "../utils/bulidFormData";
import SubmitButton from "../../../components/buttons/SubmitButton";
import ImgInput from "../../../components/form/ImgInput";
import SelectField from "../../../components/form/SelectField";

const UmkmForm = () => {
  const { user } = useAuth();
  const { residents, search } = useResidentSearch();
  const [image, setImage] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    resolver: yupResolver(umkmSchema),
    defaultValues: {
      resident_id: "",
      umkm_name: "",
      umkm_category: "",
      umkm_address: "",
      umkm_social_media: "",
      umkm_description: "",
      umkm_phone_number: "",
      umkm_image: null,
    },
  });

  const { handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = methods;

  useEffect(() => {
    if (user) {
      setValue("user_id", user.id);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const formData = buildFormData({
      ...data,
      umkm_image: image,
    });
    try {
      await storeUmkm(formData);
      toast.success("Promosi UMKM berhasil diajukan!");
      reset();
      setImage(null);
      setCurrentStep(0);
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error(err.response?.data?.message || "Terjadi kesalahan saat menyimpan UMKM.");
    }
  };

  const formSteps = [
    {
      title: "Informasi Dasar",
      icon: "👤",
      fields: ["resident_id", "umkm_name", "umkm_category"]
    },
    {
      title: "Detail UMKM",
      icon: "🏪", 
      fields: ["umkm_address", "umkm_phone_number", "umkm_social_media"]
    },
    {
      title: "Deskripsi & Media",
      icon: "📝",
      fields: ["umkm_description", "umkm_image"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-green-400/15 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mb-6 shadow-xl">
              <span className="text-4xl">🏪</span>
            </div>
            <h1 className="text-4xl font-black text-white mb-3 drop-shadow-lg">
              Daftarkan UMKM Anda
            </h1>
            <p className="text-white/90 text-lg max-w-md mx-auto leading-relaxed">
              Promosikan usaha Anda kepada masyarakat dan tingkatkan visibilitas bisnis
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center space-x-4">
              {formSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 ${
                    index <= currentStep 
                      ? 'bg-white text-emerald-600 shadow-lg transform scale-110' 
                      : 'bg-white/30 text-white/70'
                  }`}>
                    <span className="text-lg font-bold">{step.icon}</span>
                    {index <= currentStep && (
                      <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
                    )}
                  </div>
                  {index < formSteps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-500 ${
                      index < currentStep ? 'bg-white' : 'bg-white/30'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="relative">
            {/* Glassmorphism Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              
              {/* Card Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-xl">{formSteps[currentStep]?.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{formSteps[currentStep]?.title}</h2>
                      <p className="text-white/80 text-sm">Langkah {currentStep + 1} dari {formSteps.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">

                <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative min-h-[400px]">
                  
                  {/* Step 1: Basic Information */}
                  <div className={`space-y-6 transition-all duration-500 ${
                    currentStep === 0 
                      ? 'opacity-100 translate-x-0 pointer-events-auto relative' 
                      : 'opacity-0 translate-x-4 pointer-events-none absolute inset-0'
                  }`}>
                    <div className="grid gap-6">
                      <div className="relative">
                        <div className="absolute -left-2 top-3 w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                        <ApplicantSelector options={residents} onSearch={search} error={errors.resident_id} />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <InputField 
                          name="umkm_name" 
                          label="Nama UMKM" 
                          error={errors.umkm_name}
                        />
                        <SelectField 
                          name="umkm_category" 
                          label="Kategori UMKM" 
                          options={[ 'Kuliner',
                                    'Fashion',
                                    'Pertanian',
                                    'Jasa',
                                    'Teknologi',
                                    'Kesehatan',
                                    'Kerajinan',
                                    'Olahraga',
                                    'Kecantikan',
                                    'Rekreasi']}
                          error={errors.umkm_category}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Contact Details */}
                  <div className={`space-y-6 transition-all duration-500 ${
                    currentStep === 1 
                      ? 'opacity-100 translate-x-0 pointer-events-auto relative' 
                      : 'opacity-0 translate-x-4 pointer-events-none absolute inset-0'
                  }`}>
                    <div className="grid gap-6">
                      <div className="relative">
                        <div className="absolute -left-2 top-3 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                        <InputField 
                          name="umkm_address" 
                          label="Alamat Usaha" 
                          error={errors.umkm_address}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <InputField 
                          name="umkm_phone_number" 
                          label="Nomor Telepon" 
                          error={errors.umkm_phone_number}
                        />
                        <TextareaField 
                          name="umkm_social_media" 
                          label="Sosial Media" 
                          error={errors.umkm_social_media} 
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Description & Media */}
                  <div className={`space-y-6 transition-all duration-500 ${
                    currentStep === 2 
                      ? 'opacity-100 translate-x-0 pointer-events-auto relative' 
                      : 'opacity-0 translate-x-4 pointer-events-none absolute inset-0'
                  }`}>
                    <div className="grid gap-6">
                      <div className="relative">
                        <div className="absolute -left-2 top-3 w-1 h-12 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                        <TextareaField 
                          name="umkm_description" 
                          label="Deskripsi Usaha" 
                          error={errors.umkm_description} 
                          rows={4}
                        />
                      </div>

                      <div className="relative">
                        <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-300">
                          <ImgInput
                            label="Foto UMKM"
                            name="umkm_image"
                            onChange={(e) => {
                              setImage(e.target.files[0]);
                              setValue("umkm_image", e.target.files[0]);
                            }}
                            error={errors.umkm_image}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                    {currentStep > 0 && (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-300 group"
                      >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                      </button>
                    )}

                    {currentStep < formSteps.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(prev => prev + 1)}
                        className="ml-auto flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 group"
                      >
                        Selanjutnya
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        label="🚀 Kirim Pengajuan"
                        submittingLabel="📤 Mengirim..."
                        className="ml-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 font-bold text-lg"
                      />
                    )}
                  </div>
                </form>
                </FormProvider>

              </div>
            </div>

            {/* Floating Action Hints */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm text-gray-600 shadow-lg">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Isi form dengan lengkap untuk hasil terbaik
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmkmForm;