import { useState } from "react";
import { searchResidents } from "../services/letterService";

const useDeceasedSearch = () => {
  const [deceasedOptions, setDeceasedOptions] = useState([]);

  const search = async (query) => {
    if (query.length < 3) return;
    try {
      const res = await searchResidents(query);
      setDeceasedOptions(
        res.data.residents.map((r) => ({
          label: r.name,
          value: r.id,
        }))
      );
    } catch (error) {
      console.error("Gagal mencari data pewaris:", error);
      setDeceasedOptions([]);
    }
  };

  return { deceasedOptions, search };
};

export default useDeceasedSearch;
