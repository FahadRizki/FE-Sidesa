import InputField from "../../../components/form/InputField";
import TextareaField from "../../../components/form/TextareaField";
import { useFormContext } from "react-hook-form";

const DomisiliYayasan = () => {
  const { formState: { errors } } = useFormContext();
  return (
    <div className="space-y-4">

      <div className="bg-gray-50 p-4 rounded-md border">
        <h4 className="font-semibold mb-2 text-gray-800">Data Pemilik Yayasan</h4>
        <InputField label="Nama Pemilik" name="domisili.nama_pemilik"  error={errors.domisili?.nama_pemilik}/>
        <InputField label="NIK Pemilik" name="domisili.nik_pemilik"  error={errors.domisili?.nik_pemilik}/>
        <InputField label="Tempat Lahir" name="domisili.tempat_lahir_pemilik"  error={errors.domisili?.tempat_lahir_pemilik}/>
        <InputField label="Tanggal Lahir" name="domisili.tanggal_lahir_pemilik" type="date"  error={errors.domisili?.tanggal_lahir_pemilik}/>
        <InputField label="Pekerjaan" name="domisili.pekerjaan_pemilik"  />
        <TextareaField label="Alamat Pemilik" name="domisili.alamat_pemilik"  error={errors.domisili?.alamat_pemilik}/>
      </div>

      <div className="bg-gray-50 p-4 rounded-md border">
        <h4 className="font-semibold mb-2 text-gray-800">Data Yayasan</h4>
        <InputField label="Nama Usaha" name="domisili.nama_usaha"  error={errors.domisili?.nama_usaha}/>
        <InputField label="Jenis Usaha" name="domisili.jenis_usaha"  error={errors.domisili?.jenis_usaha}/>
        <TextareaField label="Alamat Usaha" name="domisili.alamat_usaha"  error={errors.domisili?.alamat_usaha}/>
        <InputField label="Luas Tempat (m²)" name="domisili.luas_tempat"  error={errors.domisili?.luas_tempat}/>
      </div>

    </div>
  );
};

export default DomisiliYayasan;
