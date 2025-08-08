import Select from "react-select";
import { Controller, useFormContext } from "react-hook-form";


const LetterTypeSelector = ({ letterTypes }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: errors.letter_type_id ? "#f87171" : base.borderColor,
      boxShadow: errors.letter_type_id
        ? "0 0 0 1px #f87171"
        : state.isFocused
        ? "0 0 0 1px #3b82f6"
        : base.boxShadow,
      "&:hover": {
        borderColor: errors.letter_type_id ? "#f87171" : "#3b82f6",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Jenis Surat
      </label>
      <Controller
        name="letter_type_id"
        control={control}
        render={({ field }) => {
          const selected =
            letterTypes.find((opt) => opt.value === field.value) || null;
          return (
            <Select
              styles={customStyles}
              options={letterTypes}
              placeholder="Pilih jenis surat"
              value={selected}
              onChange={(option) => field.onChange(option?.value || "")}
              isSearchable
              isClearable
              getOptionLabel={(option) => option?.label || ""}
              getOptionValue={(option) => option?.value || ""}
            />
          );
        }}
      />
      {errors.letter_type_id && (
        <p className="text-red-500 text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.letter_type_id.message}
        </p>
      )}
    </div>
  );
};

export default LetterTypeSelector;
