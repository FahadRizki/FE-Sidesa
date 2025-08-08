const LetterInfoBox = ({ letterType }) => {
  if (!letterType) return null;

  return (
    <div className="bg-gray-100 border border-gray-300 p-4 rounded-md">
      <h3 className="font-semibold text-lg mb-2">Informasi Surat</h3>
      <p className="mb-2 text-sm text-gray-700">
        <strong>Deskripsi:</strong> {letterType.description || "Tidak ada deskripsi."}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Lama Waktu:</strong> {letterType.processing_time || "Tidak ada lama waktu."}
      </p>
      <div>
        <strong className="text-sm">Persyaratan:</strong>
        <ul className="list-disc list-inside text-sm mt-1">
          {(letterType.requirements || "").split("\n").map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LetterInfoBox;