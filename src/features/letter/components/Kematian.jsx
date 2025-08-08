import InputField from "../../../components/form/InputField"
import TextareaField from "../../../components/form/TextareaField"
import SelectField from "../../../components/form/SelectField"
import { useFormContext } from "react-hook-form"
export default function Kematian() {
  const { formState: { errors } } = useFormContext();
  return (
    <div>
        <div className="bg-gray-50 p-4 rounded-md border">
            <h4 className="font-semibold mb-2 text-gray-800">Data Jenazah</h4>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <InputField label="Nama Lengkap" name="die.name"  error={errors.die?.name}/>
                <InputField label="NIK" name="die.nik"  error={errors.die?.nik}/>
                <SelectField label="Jenis Kelamin" name="die.gender" options={["Laki-laki", "Perempuan"]} error={errors.die?.gender} />
                <InputField label="Tempat Lahir" name="die.birth_place"  error={errors.die?.birth_place}/>
                <InputField label="Tanggal Lahir" name="die.birth_date" type="date"  error={errors.die?.birth_date}/>
                <InputField label="Pekerjaan" name="die.occupation"  error={errors.die?.occupation}/>
                <TextareaField label="Alamat" name="die.address"  error={errors.die?.address}/>
            </div>
            <h4 className="font-semibold mb-2 text-gray-800 mt-4"> Telah Meninggal Pada</h4>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <InputField label="Tempat" name="die.place_of_death"  error={errors.die?.place_of_death}/>
                <InputField label="Tanggal" name="die.date_of_death" type="date"  error={errors.die?.date_of_death}/>
                <InputField label="Hari" name="die.day_of_death"  error={errors.die?.day_of_death}/>
                <InputField label="Penyebab" name="die.cause_of_death"  error={errors.die?.cause_of_death}/>
            </div>
        </div>

    </div>
  )
}
