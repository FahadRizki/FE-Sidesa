import InputField from "../../../components/form/InputField"
import TextareaField from "../../../components/form/TextareaField"
import SelectField from "../../../components/form/SelectField"
import { useFormContext } from "react-hook-form"

export default function DomisiliTetap() {
  const { formState: { errors } } = useFormContext();
  return (
    <div>
        <div className="bg-gray-50 p-4 rounded-md border">
            <h4 className="font-semibold mb-2 text-gray-800">Data Pemohon (Dari Sistem)</h4>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <InputField label="Nama Lengkap" name="domisili.name" error={errors.domisili?.name} placeholder={"Masukkan nama sesuai KTP/KK"}/>
                <InputField label="NIK" name="domisili.nik" error={errors.domisili?.nik} placeholder={"Masukkan NIK sesuai KTP/KK"}/>
                <SelectField label="Agama" name="domisili.religion" options={["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"]} placeholder={"Masukkan agama sesuai KTP/KK"} error={errors.domisili?.religion} />
                <SelectField label="Jenis Kelamin" name="domisili.gender" options={["Laki-laki", "Perempuan"]} error={errors.domisili?.gender} placeholder={"Masukkan jenis kelamin sesuai KTP/KK"} />
                <InputField label="Tempat Lahir" name="domisili.birth_place" error={errors.domisili?.birth_place} placeholder={"Masukkan tempat lahir sesuai KTP/KK"}/>
                <InputField label="Tanggal Lahir" name="domisili.birth_date" type="date" error={errors.domisili?.birth_date} placeholder={"Masukkan tanggal lahir sesuai KTP/KK"}/>
                <InputField label="Pekerjaan" name="domisili.occupation" error={errors.domisili?.occupation} placeholder={"Masukkan pekerjaan sesuai KTP/KK"}/>
                <SelectField label="Status Perkawinan" name="domisili.marital_status" options={["Menikah", "Belum Menikah", "Cerai Hidup", "Cerai Mati"]} placeholder={"Masukkan status perkawinan sesuai KTP/KK"} error={errors.domisili?.marital_status}/>
                <TextareaField label="Alamat" name="domisili.address"  error={errors.domisili?.address} placeholder={"Masukkan alamat sesuai KTP/KK"}/>
            </div>
        </div>
    </div>
  )
}
