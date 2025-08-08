import { useFormContext } from "react-hook-form";

const TextareaField = ({ 
  label, 
  name, 
  placeholder, 
  error, 
  rows = 3,
  maxLength,
  disabled = false,
  ...props 
}) => {
  const { register } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {/* Indikator field required */}
        <span className="text-red-500 ml-1">*</span>
      </label>
      
      <textarea
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        {...register(name)}
        className={`w-full border rounded-md px-3 py-2 text-sm ${
          error
            ? "border-red-500 focus:border-red-500 bg-red-50"
            : "border-gray-300 focus:border-blue-500"
        } ${
          disabled 
            ? "bg-gray-100 cursor-not-allowed" 
            : "bg-white"
        } focus:outline-none transition-colors resize-none`}
        {...props}
      />
      
      {/* Character counter jika ada maxLength */}
      {maxLength && (
        <div className="text-xs text-gray-500 text-right">
          {/* Ini membutuhkan watch untuk menghitung karakter, untuk sekarang kita skip */}
          Max {maxLength} karakter
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default TextareaField;