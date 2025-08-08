import { useFormContext } from "react-hook-form";
const SelectField = ({ label, name, options }) => {
  const { register } = useFormContext();
  return (
    <div className="mb-3">
      <label className="block font-medium text-sm mb-1">{label}</label>
      <select {...register(name)} className="w-full border rounded px-3 py-2">
        <option value="">Pilih</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;