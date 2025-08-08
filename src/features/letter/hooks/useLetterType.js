import { useEffect, useState } from "react";
import { getLetterTypes } from "../services/letterService";

const useLetterTypes = () => {
  const [letterTypes, setLetterTypes] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getLetterTypes();
        const formatted = res.data.map((item) => ({
          value: item.id,
          label: item.name,
          code: item.code, // gunakan kode unik untuk tiap jenis surat
          description: item.description,
          processing_time: item.processing_time,
          requirements: item.requirements,
        }));
        setLetterTypes(formatted);
      } catch (error) {
        console.error("Gagal mengambil jenis surat:", error);
      }
    };
    fetch();
  }, []);

  return letterTypes;
};

export default useLetterTypes;