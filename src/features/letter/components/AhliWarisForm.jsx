import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import Select from "react-select";
import InputField from "../../../components/form/InputField";
import TextareaField from "../../../components/form/TextareaField";
import SelectField from "../../../components/form/SelectField";
const AhliWarisForm = ({ options, onSearch }) => {
  const { control, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "heirs" });
    const handleInputChange = (inputValue) => {
    if (onSearch && typeof onSearch === "function") {
      onSearch(inputValue);
    }
  };
  return (
    <div className="space-y-4">
       <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pewaris</label>
        <Controller
          name="deceased_resident_id"
          control={control}
          render={({ field }) => {
            const selected = options?.find((opt) => opt.value === field.value) || null;

            return (
              <Select
                options={options || []}
                value={selected}
                onInputChange={handleInputChange}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    field.onChange(selectedOption.value);
                  } else {
                    field.onChange('');
                  }
                }}
                isSearchable
                isClearable
                placeholder="Ketik minimal 3 huruf..."
                isLoading={false}
                loadingMessage={() => "Mencari..."}
                noOptionsMessage={({ inputValue }) =>
                  inputValue.length < 3
                    ? "Ketik minimal 3 huruf"
                    : "Tidak ada data ditemukan"
                }
                getOptionLabel={(option) => option?.label || ''}
                getOptionValue={(option) => option?.value || ''}
              />
            );
          }}
        />
        {errors.deceased_resident_id && <p className="text-red-500 text-sm mt-1">{errors.deceased_resident_id.message}</p>}
      </div>

      <div className="border p-3 rounded bg-gray-50">
        <label className="block font-semibold mb-2">Daftar Ahli Waris</label>
        {fields.map((item, index) => (
          <div key={item.id} className="mb-4 border rounded p-2 bg-white shadow-sm">
            <InputField label="Nama" name={`heirs.${index}.name`} error={errors.heirs?.[index]?.name} />
            <SelectField label="Jenis Kelamin" name={`heirs.${index}.gender`} options={["Laki-laki", "Perempuan"]} error={errors.heirs?.[index]?.gender} />
            <InputField label="Tanggal Lahir" name={`heirs.${index}.birth_date`} type="date" error={errors.heirs?.[index]?.birth_date} />
            <InputField label="Hubungan" name={`heirs.${index}.relation`} error={errors.heirs?.[index]?.relation} />
            <TextareaField label="Alamat" name={`heirs.${index}.address`} error={errors.heirs?.[index]?.address} />
            <button type="button" onClick={() => remove(index)} className="text-red-500 text-sm mt-2">Hapus</button>
          </div>
        ))}
        <button type="button" onClick={() => append({})} className="bg-green-600 text-white px-3 py-1 rounded">Tambah Ahli Waris</button>
      </div>
    </div>
  );
};

export default AhliWarisForm;
