// validations/baseSchema.js - Updated with proper requirements
import * as yup from "yup";

// Schema yang SELALU diperlukan untuk semua surat
export const baseSchema = {
  letter_type_id: yup.string().required("Jenis surat wajib dipilih"),
  purpose: yup.string().required("Keperluan wajib diisi"),
  supporting_files: yup
    .array()
    .nullable()
    .of(
      yup
        .mixed()
        .test("fileType", "Format file tidak didukung", (file) =>
          file ? ["image/jpeg", "image/png", "application/pdf", "image/jpg"].includes(file.type) : true
        )
        .test("fileSize", "Ukuran file maksimal 3MB", (file) =>
          file ? file.size <= 3 * 1024 * 1024 : true
        )
    ),
  no_hp: yup
    .string()
    .nullable()
    .matches(/^[0-9+\-()\s]*$/, "Format nomor HP tidak valid"),
};

// Schema kondisional yang bisa ditambahkan sesuai kebutuhan
export const conditionalSchemas = {
  // Schema untuk surat yang memerlukan data warga
  requiresResident: {
    resident_id: yup.string().required("Nama warga wajib dipilih"),
  },
  
  // Schema untuk surat yang memerlukan data almarhum
  requiresDeceased: {
    deceased_resident_id: yup.string().required("Data almarhum wajib dipilih"),
  },
};

// Konfigurasi surat mana yang memerlukan resident_id dan deceased_id
export const LETTER_REQUIREMENTS = {
  "surat ahli waris": {
    requiresResident: true,
    requiresDeceased: true,  // Perlu data almarhum
  },
  "surat pengantar nikah": {
    requiresResident: true,
    requiresDeceased: false,
  },
  "surat izin menikah": {
    requiresResident: true,
    requiresDeceased: false,
  },
  "surat persetujuan calon pengantin": {
    requiresResident: true,
    requiresDeceased: false,
  },
  "surat domisili tetap": {
    requiresResident: false,   // Perlu data warga
    requiresDeceased: false,
  },
  "sktm": {
    requiresResident: false,   // Perlu data warga
    requiresDeceased: false,
  },
  "surat keterangan": {
    requiresResident: false,   // Perlu data warga
    requiresDeceased: false,
  },
  "surat izin orang tua": {
    requiresResident: true,   // Perlu data warga
    requiresDeceased: false,
  },
  
  // Surat yang TIDAK memerlukan resident_id
  "surat domisili yayasan": {
    requiresResident: false,  // ❌ Tidak perlu data warga
    requiresDeceased: false,
  },
  "surat domisili perusahaan": {
    requiresResident: false,  // ❌ Tidak perlu data warga
    requiresDeceased: false,
  },
  "surat domisili sementara": {
    requiresResident: false,  // ❌ Tidak perlu data warga
    requiresDeceased: false,
  },
  "surat kematian": {
    requiresResident: false,  // ❌ Tidak perlu data warga
    requiresDeceased: false,   // ✅ Perlu data almarhum
  },
};

// Helper function untuk mendapatkan requirements
export const getLetterRequirements = (letterType) => {
  const lowerType = (letterType || "").toLowerCase();
  return LETTER_REQUIREMENTS[lowerType] || {
    requiresResident: false,
    requiresDeceased: false,
  };
};

// Helper untuk debugging
export const debugLetterRequirements = (letterType) => {
  const requirements = getLetterRequirements(letterType);
  console.log(`Letter: ${letterType}`);
  console.log(`Requires Resident: ${requirements.requiresResident}`);
  console.log(`Requires Deceased: ${requirements.requiresDeceased}`);
  return requirements;
};