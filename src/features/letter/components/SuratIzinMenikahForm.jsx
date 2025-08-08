import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import InputField from "../../../components/form/InputField";
import TextareaField from "../../../components/form/TextareaField";
import SelectField from "../../../components/form/SelectField";

const SectionCard = ({ title, bgColor = 'bg-white', children }) => (
  <div className={`${bgColor} rounded-xl p-5 shadow-md space-y-4`}>
    <h3 className="text-base font-semibold text-gray-800">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const SuratIzinMenikahForm = ({ applicant }) => {
  const { setValue, formState: { errors } } = useFormContext();

  useEffect(() => {
    if (!applicant) return;
    
    const fields = [
      "name", "nik", "religion", "birth_place", "birth_date",
      "occupation", "address", "nationality"
    ];

    
    fields.forEach((field) => {
      if (applicant[field]) {
        setValue(`marriage_request.applicant.${field}`, applicant[field]);
      }
    });
  }, [applicant, setValue]);

  if (!applicant) return null;

  return (
    <div className="space-y-6">
      {/* Data Pemohon */}
      <SectionCard title="Data Pemohon (Otomatis)" bgColor="bg-blue-50">
        <InputField label="Nama" name="marriage_request.applicant.name" defaultValue={applicant.name} readOnly />
        <InputField label="NIK" name="marriage_request.applicant.nik" defaultValue={applicant.nik} readOnly />
        <InputField label="Tempat Lahir" name="marriage_request.applicant.birth_place" defaultValue={applicant.birth_place} readOnly />
        <InputField label="Tanggal Lahir" name="marriage_request.applicant.birth_date" type="date" defaultValue={applicant.birth_date} readOnly />
        <InputField label="Agama" name="marriage_request.applicant.religion" defaultValue={applicant.religion} readOnly />
        <InputField label="Pekerjaan" name="marriage_request.applicant.occupation" defaultValue={applicant.occupation} readOnly />
        <InputField label="Kewarganegaraan" name="marriage_request.applicant.nationality" defaultValue="Indonesia" readOnly />
        <TextareaField label="Alamat" name="marriage_request.applicant.address" defaultValue={applicant.address} readOnly />
      </SectionCard>

      {/* Data Ayah */}
      <SectionCard title="Data Ayah" bgColor="bg-gray-50">
        <InputField label="Nama Ayah" name="marriage_request.father_name"  error={errors.marriage_request?.father_name}/>
        <InputField label="Bin" name="marriage_request.bin"  error={errors.marriage_request?.bin}/>
        <InputField label="NIK Ayah" name="marriage_request.father_nik"  error={errors.marriage_request?.father_nik}/>
        <InputField label="Tempat Lahir Ayah" name="marriage_request.father_birth_place"  error={errors.marriage_request?.father_birth_place}/>
        <InputField label="Tanggal Lahir Ayah" name="marriage_request.father_birth_date" type="date"  error={errors.marriage_request?.father_birth_date}/>
        <SelectField label="Agama Ayah" name="marriage_request.father_religion" options={["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"]}  error={errors.marriage_request?.father_religion}/>
        <InputField label="Kewarganegaraan Ayah" name="marriage_request.father_nationality"  />
        <InputField label="Pekerjaan Ayah" name="marriage_request.father_occupation"  />
        <TextareaField label="Alamat Ayah" name="marriage_request.father_address"  error={errors.marriage_request?.father_address}/>
      </SectionCard>

      {/* Data Ibu */}
      <SectionCard title="Data Ibu" bgColor="bg-gray-50">
        <InputField label="Nama Ibu" name="marriage_request.mother_name" error={errors.marriage_request?.mother_name}/>
        <InputField label="Binti" name="marriage_request.binti"  error={errors.marriage_request?.binti}/>
        <InputField label="NIK Ibu" name="marriage_request.mother_nik"  error={errors.marriage_request?.mother_nik}/>
        <InputField label="Tempat Lahir Ibu" name="marriage_request.mother_birth_place"  error={errors.marriage_request?.mother_birth_place}/>
        <InputField label="Tanggal Lahir Ibu" name="marriage_request.mother_birth_date" type="date"  error={errors.marriage_request?.mother_birth_date}/>
        <SelectField label="Agama Ibu" name="marriage_request.mother_religion" options={["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"]}  error={errors.marriage_request?.mother_religion}/>
        <InputField label="Kewarganegaraan Ibu" name="marriage_request.mother_nationality" />
        <InputField label="Pekerjaan Ibu" name="marriage_request.mother_occupation" />
        <TextareaField label="Alamat Ibu" name="marriage_request.mother_address"  error={errors.marriage_request?.mother_address}/>
      </SectionCard>

      {/* Data Pasangan */}
      <SectionCard title="Data Pasangan (Manual)" bgColor="bg-green-50">
        <InputField label="Nama Pasangan" name="marriage_request.partner_name"  error={errors.marriage_request?.partner_name}/>
        <InputField label="NIK Pasangan" name="marriage_request.partner_nik" error={ errors.marriage_request?.partner_nik}/>
        <InputField label="Bin/Binti" name="marriage_request.partner_bin_binti"  error={errors.marriage_request?.partner_bin_binti}/>
        <InputField label="Tempat Lahir" name="marriage_request.partner_birth_place"  error={errors.marriage_request?.partner_birth_place}/>
        <InputField label="Tanggal Lahir" name="marriage_request.partner_birth_date" type="date"  error={errors.marriage_request?.partner_birth_date}/>
        <SelectField label="Agama" name="marriage_request.partner_religion" options={["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"]}  error={errors.marriage_request?.partner_religion}/>
        <InputField label="Kewarganegaraan" name="marriage_request.partner_nationality" />
        <InputField label="Pekerjaan" name="marriage_request.partner_occupation" />
        <TextareaField label="Alamat" name="marriage_request.partner_address"  error={errors.marriage_request?.partner_address}/>
      </SectionCard>
    </div>
  );
};

export default SuratIzinMenikahForm;
