import { useFormContext } from "react-hook-form";
import { useState } from "react";

const SupportingFileUpload = () => {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const [allFiles, setAllFiles] = useState([]);

  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  const handleChange = (e) => {
    const newFiles = Array.from(e.target.files);

    // Filter hanya file yang valid
    const validFiles = newFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );

    // Gabungkan file lama + baru (hindari duplikat berdasarkan nama)
    const mergedFiles = [...allFiles, ...validFiles];
    const uniqueFiles = Array.from(new Map(mergedFiles.map(f => [f.name, f])).values());

    setAllFiles(uniqueFiles);         // simpan ke state lokal
    setValue("supporting_files", uniqueFiles); // set ke react-hook-form
  };

  const removeFile = (name) => {
    const updated = allFiles.filter((file) => file.name !== name);
    setAllFiles(updated);
    setValue("supporting_files", updated);
  };

  const selectedFiles = watch("supporting_files");

  return (
    <div className="space-y-2">
      <label className="block font-medium text-sm text-gray-700">
        File Pendukung
      </label>
      <input
        name="supporting_files[]"
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.pdf"
        className="w-full border p-2"
        onChange={handleChange}
      />

      {selectedFiles && selectedFiles.length > 0 && (
        <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
          {selectedFiles.map((file, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span>{file.name}</span>
              <button
                type="button"
                className="text-red-500 text-xs ml-2"
                onClick={() => removeFile(file.name)}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors.supporting_files && (
        <p className="text-red-500 text-sm mt-1">
          {errors.supporting_files.message}
        </p>
      )}
    </div>
  );
};

export default SupportingFileUpload;
