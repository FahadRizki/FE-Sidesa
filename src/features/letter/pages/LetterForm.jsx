import { useForm, FormProvider } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMemo } from "react";
import * as yup from "yup"; // Pastikan yup sudah diinstall

// Components & Helpers
import LetterTypeSelector from "../components/LetterTypeSelector";
import LetterInfoBox from "../components/LetterInfoBox";
import ApplicantSelector from "../../../components/ApplicantSelector";
import SupportingFileUpload from "../components/SupportingFileUpload";
import DynamicFormRenderer from "../components/DynamicFormRenderer";
import useLetterTypes from "../hooks/useLetterType";
import useResidentSearch from "../../../hooks/useResidentSearch";
import useDeceasedSearch from "../hooks/useDeceasedSearch";
import { buildLetterSchema } from "../validations/buildLetterSchema";
import { buildFormData } from "../utils/buildFormData";
import { storeLetter } from "../services/letterService";
import { getLetterConfig } from "../utils/letterConfig";
import TextareaField from "../../../components/form/TextareaField";
import InputField from "../../../components/form/InputField";
import SubmitButton from "../../../components/buttons/SubmitButton";

const LetterForm = () => {
  const letterTypes = useLetterTypes();
  const { residents, search: searchResidents, isLoading } = useResidentSearch();
  const { deceasedOptions, search: searchDeceased } = useDeceasedSearch();

  const methods = useForm({ defaultValues: {}, mode: "onChange" });

  const {
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const typeId = watch("letter_type_id");
  const residentId = watch("resident_id");
  const selectedLetterType = letterTypes.find((lt) => String(lt.value) === String(typeId));
  const applicant = residents.find((r) => r.value === residentId)?.original;

  // Get letter configuration
  const letterConfig = getLetterConfig(selectedLetterType?.label);

  // Schema dasar untuk field yang wajib diisi
  const baseSchema = yup.object().shape({
    letter_type_id: yup
      .string()
      .required("Jenis surat harus dipilih")
      .test('not-empty', 'Jenis surat harus dipilih', value => value && value.trim() !== ''),
    purpose: yup
      .string()
      .required("Keperluan harus diisi")
      .min(10, "Keperluan minimal 10 karakter"),
    no_hp: yup
      .string()
      .required("Nomor HP harus diisi")
      .matches(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, "Format nomor HP tidak valid"),
  });

  // Schema gabungan: base + dynamic schema
  const fullSchema = useMemo(() => {
    if (!selectedLetterType?.label) {
      return baseSchema;
    }
    
    const dynamicSchema = buildLetterSchema(selectedLetterType.label);
    
    // Gabungkan baseSchema dengan dynamicSchema
    return baseSchema.concat(dynamicSchema);
  }, [selectedLetterType?.label]);

  const onSubmit = async (data) => {
    try {
      console.log("Form data before validation:", data);

      // Selalu validasi menggunakan fullSchema (base + dynamic)
      try {
        await fullSchema.validate(data, { abortEarly: false });
        console.log("Validation passed!");
      } catch (validationError) {
        console.log("Validation errors:", validationError.inner);

        // Set error untuk setiap field yang tidak valid
        validationError.inner?.forEach((err) => {
          setError(err.path, { message: err.message });
        });

        // Toast error untuk field pertama
        if (validationError.inner && validationError.inner.length > 0) {
          toast.error(validationError.inner[0].message);
        }

        return;
      }

      const formData = buildFormData(data, selectedLetterType);
      await storeLetter(formData);
      toast.success("Pengajuan berhasil dikirim!");
      reset();
    } catch (err) {
      console.error("Submit error:", err);

      if (err.response?.status === 422) {
        const serverErrors = err.response.data.errors;

        if (serverErrors) {
          Object.entries(serverErrors).forEach(([field, messages]) => {
            setError(field, { message: messages[0] });
            toast.error(messages[0]);
          });
        }

        if (err.response.data.message) {
          console.error("Message:", err.response.data.message);
          toast.error(err.response.data.message);
        }
      } else {
        toast.error("Gagal mengirim surat. Silakan coba lagi nanti.");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gradient-to-br from-[hsl(108,85%,74%)] via-[rgb(194,241,180)] to-white relative overflow-hidden py-20 px-4">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-3xl mx-auto z-10">
          {/* Form Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/30 backdrop-blur-md rounded-2xl mb-4 shadow-xl">
              <span className="text-4xl">📄</span>
            </div>
            <h1 className="text-4xl font-extrabold text-emerald-700 drop-shadow-md mb-2">
              Formulir Permohonan Surat
            </h1>
            <p className="text-gray-700 text-md max-w-xl mx-auto leading-relaxed">
              Silakan isi data dengan lengkap dan benar sesuai kebutuhan administrasi Anda. Pastikan semua kolom yang wajib terisi agar proses dapat berjalan dengan lancar.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/90 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <LetterTypeSelector letterTypes={letterTypes} error={errors.letter_type_id} />

              {selectedLetterType && <LetterInfoBox letterType={selectedLetterType} />}

              {/* Conditional ApplicantSelector berdasarkan konfigurasi */}
              {letterConfig.requiresApplicant && (
                <ApplicantSelector 
                  options={residents} 
                  onSearch={searchResidents} 
                  error={errors.resident_id} 
                  isLoading={isLoading}
                />
              )}

              {/* Dynamic Form Renderer berdasarkan konfigurasi */}
              {letterConfig.component && (
                <DynamicFormRenderer
                  componentName={letterConfig.component}
                  applicant={letterConfig.requiresApplicant ? applicant : null}
                  deceasedOptions={letterConfig.requiresDeceased ? deceasedOptions : null}
                  onSearchDeceased={letterConfig.requiresDeceased ? searchDeceased : null}
                />
              )}

              <TextareaField
                name="purpose"
                label="Keperluan"
                placeholder="Tuliskan keperluan Anda dengan jelas dan spesifik"
                error={errors.purpose}
              />

              <InputField
                name="no_hp"
                label="Nomor HP / WhatsApp Aktif"
                placeholder="Contoh: 085712345678"
                error={errors.no_hp}
              />

              <SupportingFileUpload error={errors.supporting_files} />

              <div className="pt-4">
                <SubmitButton
                  isSubmitting={isSubmitting}
                  label="Ajukan Permohonan"
                  submittingLabel="Mengirim..."
                  className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-transform transform hover:scale-105 shadow-lg text-lg font-semibold"
                />
              </div>
            </form>
          </div>

          {/* Info Footer */}
          <div className="text-center text-sm text-gray-500 mt-8">
            Semua informasi yang Anda berikan akan dijaga kerahasiaannya dan hanya digunakan untuk keperluan pelayanan administrasi desa.
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default LetterForm;