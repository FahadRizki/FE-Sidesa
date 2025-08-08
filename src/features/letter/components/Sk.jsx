
import InputField from "../../../components/form/InputField";
import TextareaField from "../../../components/form/TextareaField";
import { useFormContext, useWatch } from "react-hook-form";
import SelectField from "../../../components/form/SelectField";


const Sk = () => {
  const { control, formState: { errors } } = useFormContext();
  const selectedType = useWatch({ control, name: "sk.type" });
  return (
    <div className="space-y-6">

        <div className="bg-gray-50 p-4 rounded-md border">
            <h4 className="font-semibold mb-2 text-gray-800">Data Pemohon (Dari Sistem)</h4>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
            <SelectField placeholder="Pilih Jenis Surat Keterangan" label="Jenis Surat Keterangan" name="sk.type" options={["Usaha", "Duda", "Janda", "Cerai", "Lainnya"]} error={errors.sk?.type} />
            {selectedType === "Lainnya" && (
              <InputField 
                label="Jenis Surat Keterangan Lainnya" 
                name="sk.type_other" 
                placeholder="Usahakan Huruf Kapital"
                error={errors.sk?.type_other} 
              />
            )}
            <InputField label="Nama Lengkap" name="sk.name" placeholder={"Masukkan nama sesuai KTP/KK"}  error={errors.sk?.name}/>
            <InputField label="NIK" name="sk.nik" error={errors.sk?.nik}/>
            <SelectField label="Agama" name="sk.religion" placeholder="Agama Sesuai KTP/KK" options={["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"]} error={errors.sk?.religion} />
            <SelectField label="Jenis Kelamin" name="sk.gender" placeholder="Jenis Kelamin Sesuai KTP/KK" options={["Laki-laki", "Perempuan"]} error={errors.sk?.gender} />
            <InputField label="Tempat Lahir" name="sk.birth_place" placeholder={"Masukkan tempat lahir sesuai KTP/KK"} error={errors.sk?.birth_place}/>
            <InputField label="Tanggal Lahir" name="sk.birth_date" placeholder={"Masukkan tanggal lahir sesuai KTP/KK"} type="date"  error={errors.sk?.birth_date}/>
            <InputField label="Pekerjaan" name="sk.occupation" placeholder={"Masukkan pekerjaan sesuai KTP/KK"}  error={errors.sk?.occupation}/>
            <SelectField label="Status Perkawinan" name="sk.marital_status" placeholder="Status Perkawinan Sesuai KTP/KK" options={["Menikah", "Belum Menikah", "Cerai Hidup", "Cerai Mati"]} error={errors.sk?.marital_status}/>
            <TextareaField label="Alamat" name="sk.address"  error={errors.sk?.address} placeholder={"Masukkan alamat sesuai KTP/KK"}/>
            </div>
        </div>

    </div>
  );
};

export default Sk;
