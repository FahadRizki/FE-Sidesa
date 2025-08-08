import { useState } from "react";
import { searchResidents } from "../services/api";

const useResidentSearch = () => {
  const [residents, setResidents] = useState([]);

  const search = async (query) => {
    if (query.length < 10) return;
    try {
      const res = await searchResidents(query);
      setResidents(
        res.data.residents.map((r) => ({
          label: r.name,
          value: r.id,
          original: r
        }))
      );
    } catch (error) {
      console.error("Gagal mencari warga:", error);
      setResidents([]);
    }
  };

  return { residents, search };
};

export default useResidentSearch;