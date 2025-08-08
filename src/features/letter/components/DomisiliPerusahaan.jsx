import { useFormContext } from "react-hook-form";
import InputField from "../../../components/form/InputField";
import TextareaField from "../../../components/form/TextareaField";

const DomisiliPerusahaan = () => {
  const { formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      {/* SECTION: Data Pemilik Perusahaan */}
      <div className="bg-gray-50 p-4 rounded-md border">
        <h4 className="font-semibold mb-4 text-gray-800 border-b pb-2">
          👤 Data Pemilik Perusahaan
        </h4>
        <div className="space-y-4">
          <InputField 
            label="Nama Pemilik" 
            name="domisili.nama_pemilik"
            placeholder="Masukkan nama lengkap pemilik"
            error={errors.domisili?.nama_pemilik}
          />
          <InputField 
            label="NIK Pemilik" 
            name="domisili.nik_pemilik"
            placeholder="Contoh: 1234567890123456"
            maxLength={16}
            error={errors.domisili?.nik_pemilik}
          />
          <TextareaField 
            label="Alamat Pemilik" 
            name="domisili.alamat_pemilik"
            placeholder="Masukkan alamat lengkap pemilik"
            rows={3}
            error={errors.domisili?.alamat_pemilik}
          />
        </div>
      </div>

      {/* SECTION: Data Perusahaan */}
      <div className="bg-gray-50 p-4 rounded-md border">
        <h4 className="font-semibold mb-4 text-gray-800 border-b pb-2">
          🏢 Data Perusahaan
        </h4>
        <div className="space-y-4">
          <InputField 
            label="Nama Usaha" 
            name="domisili.nama_usaha"
            placeholder="Masukkan nama perusahaan/usaha"
            error={errors.domisili?.nama_usaha}
          />
          <InputField 
            label="Jenis Usaha" 
            name="domisili.jenis_usaha"
            placeholder="Contoh: Perdagangan, Jasa, Manufaktur"
            error={errors.domisili?.jenis_usaha}
          />
          <TextareaField 
            label="Alamat Usaha" 
            name="domisili.alamat_usaha"
            placeholder="Masukkan alamat lengkap lokasi usaha"
            rows={3}
            error={errors.domisili?.alamat_usaha}
          />
          <InputField 
            label="Luas Tempat (m²)" 
            name="domisili.luas_tempat"
            type="number"
            placeholder="Masukkan luas dalam meter persegi"
            min="1"
            error={errors.domisili?.luas_tempat}
          />
        </div>
      </div>

    </div>
  );
};

export default DomisiliPerusahaan;