import { useFormContext } from "react-hook-form";
import InputField from "../../../components/form/InputField";
import TextareaField from "../../../components/form/TextareaField";
import SelectField from "../../../components/form/SelectField";

const PengantarNikahForm = ({ applicant }) => {
  const { formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Otomatis dari data pemohon */}
      {applicant && (
        <div className="bg-gray-50 p-4 rounded-md border">
            <h4 className="font-semibold mb-2 text-gray-800">Data Pengantin/Pemohon (Dari Sistem)</h4>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
            <InputField label="Nama Lengkap" name="marriage_request.name" defaultValue={applicant.name} readOnly />
            <InputField label="NIK" name="marriage_request.nik" defaultValue={applicant.nik} readOnly />
            <InputField label="Agama" name="marriage_request.religion" defaultValue={applicant.religion} readOnly />
            <InputField label="Kewarganegaraan" name="marriage_request.nationality" />
            <InputField label="Tempat Lahir" name="marriage_request.birth_place" defaultValue={applicant.birth_place} readOnly />
            <InputField label="Tanggal Lahir" name="marriage_request.birth_date" defaultValue={applicant.birth_date} readOnly />
            <InputField label="Pekerjaan" name="marriage_request.occupation" defaultValue={applicant.occupation} readOnly />
            <InputField label="Status Pernikahan" name="marriage_request.marital_status" defaultValue={applicant.marital_status} readOnly />
            <TextareaField label="Alamat" name="marriage_request.address" defaultValue={applicant.address} readOnly />
            </div>
        </div>
        )}


      {/* Input Ayah */}
      <div className="border p-4 rounded bg-white shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-2">Informasi Ayah</h4>
        <InputField label="Nama Ayah" name="marriage_request.father_name"  error={errors.marriage_request?.father_name}/>
        <InputField label="NIK Ayah" name="marriage_request.father_nik" error={errors.marriage_request?.father_nik}/>
        <InputField label="Tempat Lahir" name="marriage_request.father_birth_place"  error={errors.marriage_request?.father_birth_place}/>
        <InputField label="Tanggal Lahir" name="marriage_request.father_birth_date" type="date"  error={errors.marriage_request?.father_birth_date}/>
        <InputField label="Kewarganegaraan" name="marriage_request.father_nationality" defaultValue="Indonesia" />  
        <SelectField label="Agama" name="marriage_request.father_religion" options={["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"]} error={errors.father_religion} />
        <InputField label="Pekerjaan" name="marriage_request.father_occupation"  />
        <TextareaField label="Alamat" name="marriage_request.father_address"  error={errors.marriage_request?.father_address}/>

      </div>

      {/* Input Ibu */}
      <div className="border p-4 rounded bg-white shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-2">Informasi Ibu</h4>
        <InputField label="Nama Ibu" name="marriage_request.mother_name"  error={errors.marriage_request?.mother_name}/>
        <InputField label="NIK Ibu" name="marriage_request.mother_nik"  error={errors.marriage_request?.mother_nik}/>
        <InputField label="Tempat Lahir" name="marriage_request.mother_birth_place"  error={errors.marriage_request?.mother_birth_place}/>
        <InputField label="Tanggal Lahir" name="marriage_request.mother_birth_date" type="date"  error={errors.marriage_request?.mother_birth_date}/>
        <InputField label="Kewarganegaraan" name="marriage_request.mother_nationality" defaultValue="Indonesia" />  
        <SelectField label="Agama" name="marriage_request.mother_religion" options={["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"]} error={errors.marriage_request?.mother_religion} />
        <InputField label="Pekerjaan" name="marriage_request.mother_occupation" />
        <TextareaField label="Alamat" name="marriage_request.mother_address"  error={errors.marriage_request?.mother_address}/>
      </div>
    </div>
  );
};

export default PengantarNikahForm;
