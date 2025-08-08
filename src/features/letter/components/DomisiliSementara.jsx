import InputField from "../../../components/form/InputField";
import TextareaField from "../../../components/form/TextareaField";
import SelectField from "../../../components/form/SelectField";
import { useFormContext } from "react-hook-form";
const DomisiliSementara = () => {
    const { formState: { errors } } = useFormContext();
  return (
    <div className="bg-gray-50 p-4 rounded-md border space-y-3">
      <h4 className="font-semibold text-gray-800 mb-2">Data Pemohon Domisili Sementara</h4>
      <InputField label="Nama" name="domisili.name"  error={errors.domisili?.name}/>
      <InputField label="NIK" name="domisili.nik"  error={errors.domisili?.nik}/>
      <InputField label="Tempat Lahir" name="domisili.birth_place"  error={errors.domisili?.birth_place}/>
      <InputField label="Tanggal Lahir" name="domisili.birth_date" type="date"  error={errors.domisili?.birth_date}/>
      <SelectField
        label="Jenis Kelamin"
        name="domisili.gender"
        options={["Laki-laki", "Perempuan"]}
        error={errors.domisili?.gender}
      />
      <SelectField
        label="Agama"
        name="domisili.religion"
        options={["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"]}
        error={errors.domisili?.religion}
      />
      <SelectField
        label="Status Perkawinan"
        name="domisili.marital_status"
        options={["Belum Menikah", "Menikah", "Cerai Hidup", "Cerai Mati"]}
        error={errors.domisili?.marital_status}
      />
      <InputField label="Pekerjaan" name="domisili.occupation"  error={errors.domisili?.occupation}/>
      <TextareaField label="Alamat Asal" name="domisili.address_original" error={errors.domisili?.address_original} />
      <TextareaField label="Alamat Sekarang" name="domisili.address_now"  error={errors.domisili?.address_now}/>
    </div>
  );
};

export default DomisiliSementara;
