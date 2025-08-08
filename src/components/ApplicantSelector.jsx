import Select from "react-select";
import { Controller, useFormContext } from "react-hook-form";

const ApplicantSelector = ({ options, onSearch, isLoading }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleInputChange = (inputValue) => {
    if (onSearch && typeof onSearch === "function") {
      onSearch(inputValue);
    }
  };

  // Custom styles untuk react-select
  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "40px",
      borderColor: errors.resident_id ? "#f87171" : state.isFocused ? "#3b82f6" : "#d1d5db",
      boxShadow: errors.resident_id 
        ? "0 0 0 1px #f87171" 
        : state.isFocused 
        ? "0 0 0 1px #3b82f6" 
        : "none",
      "&:hover": {
        borderColor: errors.resident_id ? "#f87171" : "#3b82f6",
      },
      transition: "all 0.2s ease",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
      fontSize: "14px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? "#3b82f6" 
        : state.isFocused 
        ? "#f3f4f6" 
        : "white",
      color: state.isSelected ? "white" : "#374151",
      padding: "8px 12px",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 50,
    }),
    noOptionsMessage: (base) => ({
      ...base,
      color: "#6b7280",
      fontSize: "14px",
    }),
    loadingMessage: (base) => ({
      ...base,
      color: "#6b7280",
      fontSize: "14px",
    }),
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        NIK Warga/Pengaju
        <span className="text-red-500 ml-1">*</span>
      </label>

      <Controller
        name="resident_id"
        control={control}
        rules={{
          required: "NIK warga harus dipilih",
        }}
        render={({ field }) => {
          // Cari selected option berdasarkan value
          const selected = options?.find((opt) => opt?.value === field.value) || null;

          return (
            <Select
              {...field}
              styles={customStyles}
              options={options || []}
              onInputChange={handleInputChange}
              placeholder="Ketik NIK untuk mencari warga..."
              isSearchable
              isClearable
              value={selected}
              onChange={(selectedOption) => {
                field.onChange(selectedOption ? selectedOption.value : "");
              }}
              isLoading={isLoading}
              loadingMessage={() => "Mencari warga..."}
              noOptionsMessage={({ inputValue }) => {
                if (!inputValue || inputValue.length < 3) {
                  return "Ketik minimal 10 angka NIK";
                }
                return "Tidak ada warga ditemukan";
              }}
              getOptionLabel={(option) => option?.label || ""}
              getOptionValue={(option) => option?.value || ""}
              filterOption={() => true}
              menuShouldScrollIntoView={false}
              // Format tampilan option - PERBAIKAN DI SINI
              formatOptionLabel={(option, { context }) => {
                if (context === 'menu') {
                  return (
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {option.label || option.original?.name || 'Nama tidak tersedia'}
                      </span>
                      {option.original?.nik && (
                        <span className="text-sm text-gray-500">
                          NIK: {option.original.nik}
                        </span>
                      )}
                    </div>
                  );
                }
                return option.label || option.original?.name || 'Nama tidak tersedia';
              }}
            />
          );
        }}
      />

      {errors.resident_id && (
        <div className="mt-2 flex items-center text-red-600">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="text-sm">{errors.resident_id.message}</span>
        </div>
      )}
    </div>
  );
};

export default ApplicantSelector;