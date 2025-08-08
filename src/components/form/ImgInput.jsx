import { useFormContext } from "react-hook-form";

const ImgInput = ({ label = "Upload Gambar", name, onChange }) => {

    const { formState: { errors } } = useFormContext();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative w-full border border-gray-300 rounded-md p-3 bg-white hover:border-blue-400 transition">
        <input
          type="file"
          accept="image/*"
          name={name}
          onChange={onChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default ImgInput;
