import InputField from "../../../components/form/InputField"
import TextareaField from "../../../components/form/TextareaField"
import SelectField from "../../../components/form/SelectField"
import { useFormContext } from "react-hook-form"
export default function IzinOrtu({ applicant }) {
    const { formState: { errors } } = useFormContext();
  return (
    <div>

        { applicant && (<div className="bg-gray-50 p-4 rounded-md border">
            <h4 className="font-semibold mb-2 text-gray-800">Data Pemohon (Dari Sistem)</h4>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <InputField label="Nama Lengkap" name="izin.nama_pemohon" defaultValue={applicant.name} readOnly />
                <InputField label="NIK" name="nik" defaultValue={applicant.nik} readOnly />
                <InputField label="Agama" name="izin.agama_pemohon" defaultValue={applicant.religion} readOnly />
                <InputField label="Tempat Lahir" name="izin.tempat_lahir_pemohon" defaultValue={applicant.birth_place} readOnly />
                <InputField label="Tanggal Lahir" name="izin.tanggal_lahir_pemohon" defaultValue={applicant.birth_date} readOnly />
                <InputField label="Pekerjaan" name="izin.pekerjaan_pemohon" defaultValue={applicant.occupation} readOnly />
                <InputField label="Status Pernikahan" name="izin.status_pernikahan_pemohon" defaultValue={applicant.marital_status} readOnly />
                <TextareaField label="Alamat" name="izin.alamat_pemohon" defaultValue={applicant.address} readOnly />
            </div>
        </div>
    ) }

        <div className="border p-4 rounded bg-white shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Yang memberikan izin</h4>
            <InputField label="Nama" name="izin.nama_ortu" error={errors.izin?.nama_ortu} />
            <InputField label="NIK" name="izin.nik_ortu"  error={errors.izin?.nik_ortu}/>
            <SelectField label="Agama" name="izin.agama_ortu" options={["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"]}  error={errors.izin?.agama_ortu}/>
            <InputField label="Tempat Lahir" name="izin.tempat_lahir_ortu"  error={errors.izin?.tempat_lahir_ortu}/>
            <InputField label="Tanggal Lahir" name="izin.tanggal_lahir_ortu" type="date" error={errors.izin?.tanggal_lahir_ortu} />
            <SelectField label="Status Pernikahan" name="izin.status_pernikahan_ortu" options={["Belum Kawin", "Kawin", "Cerai Hidup", "Cerai Mati"]}  error={errors.izin?.status_pernikahan_ortu}/>
            <InputField label="Pekerjaan" name="izin.pekerjaan_ortu"  error={errors.izin?.pekerjaan_ortu}/>
            <TextareaField label="Alamat" name="izin.alamat_ortu"  error={errors.izin?.alamat_ortu}/>
            <TextareaField label="Untuk Izin" placeholder="izin bekerja, izin merantau, dll" name="izin.tujuan"  error={errors.izin?.tujuan}/>
        </div>

    </div>
  )
}
