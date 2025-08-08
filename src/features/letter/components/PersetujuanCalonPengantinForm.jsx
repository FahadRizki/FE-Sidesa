// PersetujuanCalonPengantinForm.jsx
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import InputField from "../../../components/form/InputField";
import TextareaField from "../../../components/form/TextareaField";
import SelectField from "../../../components/form/SelectField";

const PersetujuanCalonPengantinForm = ({ applicant }) => {
  const { setValue, formState: { errors } } = useFormContext();

  // Fixed religion options to match validation rules
  const religionOptions = ["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"];

  useEffect(() => {
    if (!applicant) return;

    const isFemale = applicant.gender?.toLowerCase() === "perempuan";
    const prefix = isFemale ? "bride" : "groom";

    // Set otomatis untuk pemohon
    setValue(`marriage_request.${prefix}_name`, applicant.name);
    setValue(`marriage_request.${prefix}_nik`, applicant.nik);
    setValue(`marriage_request.${prefix}_religion`, applicant.religion);
    setValue(`marriage_request.${prefix}_birth_place`, applicant.birth_place);
    setValue(`marriage_request.${prefix}_birth_date`, applicant.birth_date);
    setValue(`marriage_request.${prefix}_occupation`, applicant.occupation);
    setValue(`marriage_request.${prefix}_address`, applicant.address);
    setValue(`marriage_request.${prefix}_nationality`, applicant.nationality || "Indonesia");
    setValue(`marriage_request.${prefix}_bin_binti`, applicant.bin_binti || ""); 
  }, [applicant, setValue]);

  if (!applicant) return null;

  const isFemale = applicant.gender?.toLowerCase() === "perempuan";
  const pemohonPrefix = isFemale ? "bride" : "groom";
  const pasanganPrefix = isFemale ? "groom" : "bride";

  return (
    <div className="space-y-6 mt-4">
      {/* Pemohon */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded">
        <h4 className="font-semibold mb-2">Data Pemohon (Otomatis dari sistem)</h4>
        <InputField 
          label="Nama" 
          name={`marriage_request.${pemohonPrefix}_name`} 
          defaultValue={applicant.name} 
          readOnly 
        />
        <InputField 
          label="NIK" 
          name={`marriage_request.${pemohonPrefix}_nik`} 
          defaultValue={applicant.nik} 
          readOnly 
        />
        <InputField 
          label="Agama" 
          name={`marriage_request.${pemohonPrefix}_religion`} 
          defaultValue={applicant.religion} 
          readOnly 
        />
        <InputField 
          label="Kewarganegaraan" 
          name={`marriage_request.${pemohonPrefix}_nationality`}
          defaultValue="Indonesia"
          error={errors.marriage_request?.[`${pemohonPrefix}_nationality`]}
        />
        <InputField 
          label="Tempat Lahir" 
          name={`marriage_request.${pemohonPrefix}_birth_place`} 
          defaultValue={applicant.birth_place} 
          readOnly 
        />
        <InputField 
          label="Tanggal Lahir" 
          name={`marriage_request.${pemohonPrefix}_birth_date`} 
          type="date" 
          defaultValue={applicant.birth_date} 
          readOnly 
        />
        <InputField 
          label="Pekerjaan" 
          name={`marriage_request.${pemohonPrefix}_occupation`} 
          defaultValue={applicant.occupation} 
          readOnly 
        />
        <TextareaField 
          label="Alamat" 
          name={`marriage_request.${pemohonPrefix}_address`} 
          defaultValue={applicant.address} 
          readOnly 
        />
        <InputField 
          label="Nama Ayah (Bin/Binti)" 
          name={`marriage_request.${pemohonPrefix}_bin_binti`}
          error={errors.marriage_request?.[`${pemohonPrefix}_bin_binti`]}
        />
      </div>

      {/* Pasangan */}
      <div className="bg-green-50 border border-green-200 p-4 rounded">
        <h4 className="font-semibold mb-2">Data Calon Pasangan (Diisi Manual)</h4>
        <InputField 
          label="Nama" 
          name={`marriage_request.${pasanganPrefix}_name`} 
          error={errors.marriage_request?.[`${pasanganPrefix}_name`]} 
        />
        <InputField 
          label="NIK" 
          name={`marriage_request.${pasanganPrefix}_nik`}  
          error={errors.marriage_request?.[`${pasanganPrefix}_nik`]}
        />
        <SelectField 
          label="Agama" 
          name={`marriage_request.${pasanganPrefix}_religion`} 
          options={religionOptions} 
          error={errors.marriage_request?.[`${pasanganPrefix}_religion`]} 
        />
        <InputField 
          label="Kewarganegaraan" 
          name={`marriage_request.${pasanganPrefix}_nationality`}  
          error={errors.marriage_request?.[`${pasanganPrefix}_nationality`]}
          defaultValue="Indonesia"
        />
        <InputField 
          label="Tempat Lahir" 
          name={`marriage_request.${pasanganPrefix}_birth_place`}  
          error={errors.marriage_request?.[`${pasanganPrefix}_birth_place`]}
        />
        <InputField 
          label="Tanggal Lahir" 
          name={`marriage_request.${pasanganPrefix}_birth_date`} 
          type="date"  
          error={errors.marriage_request?.[`${pasanganPrefix}_birth_date`]}
        />
        <InputField 
          label="Pekerjaan" 
          name={`marriage_request.${pasanganPrefix}_occupation`}
          error={errors.marriage_request?.[`${pasanganPrefix}_occupation`]}
        />
        <TextareaField 
          label="Alamat" 
          name={`marriage_request.${pasanganPrefix}_address`}
          error={errors.marriage_request?.[`${pasanganPrefix}_address`]}
        />
        {/* ✅ FIXED: Field name dan error harus konsisten */}
        <InputField 
          label="Nama Ayah (Bin/Binti)" 
          name={`marriage_request.${pasanganPrefix}_bin_binti`}  
          error={errors.marriage_request?.[`${pasanganPrefix}_bin_binti`]}
        />
      </div>
    </div>
  );
};

export default PersetujuanCalonPengantinForm;