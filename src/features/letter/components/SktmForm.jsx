import { useFormContext } from "react-hook-form";
import InputField from "../../../components/form/InputField";
import TextareaField from "../../../components/form/TextareaField";
import SelectField from "../../../components/form/SelectField";

const SktmForm = () => {
  const {formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      {/* SECTION: Data Pemohon */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          👤 Data Pemohon (Otomatis)
        </h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Nama Lengkap" name="sktm.name" placeholder="Masukkan nama sesuai KTP/KK"  error={errors.sktm?.name} />
              <InputField label="NIK" name="sktm.nik" placeholder="Masukkan NIK sesuai KTP/KK" error={errors.sktm?.nik} />
              <SelectField label="Agama" name="sktm.religion" options={["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"]} error={errors.sktm?.religion} />
              <SelectField label="Jenis Kelamin" name="sktm.gender" options={["Laki-laki", "Perempuan"]} error={errors.sktm?.gender} />
              <InputField label="Tempat Lahir" name="sktm.birth_place" placeholder="Masukkan tempat lahir sesuai KTP/KK" error={errors.sktm?.birth_place}  />
              <InputField label="Tanggal Lahir" name="sktm.birth_date" type="date" placeholder="Masukkan tanggal lahir sesuai KTP/KK" error={errors.sktm?.birth_date}  />
              <InputField label="Pekerjaan" name="sktm.occupation" placeholder="Masukkan pekerjaan sesuai KTP/KK" error={errors.sktm?.occupation} />
              <TextareaField label="Alamat" name="sktm.address" placeholder="Masukkan alamat sesuai KTP/KK" error={errors.sktm?.address} />
              <SelectField label="Status Perkawinan" name="sktm.marital_status" options={["Belum Menikah", "Menikah", "Cerai Hidup", "Cerai Mati"]} error={errors.sktm?.marital_status} />
              <InputField
              label="No KK"
              name="sktm.no_kk"
              placeholder="masukkan no KK"
              error={errors.sktm?.no_kk}
            />
             <InputField
              label="Bin/Binti"
              name="sktm.bin_binti"
              placeholder="Contoh: Budi"
              error={errors.sktm?.bin_binti}
            />
          </div>       
      </div>

    </div>
  );
};


export default SktmForm;
