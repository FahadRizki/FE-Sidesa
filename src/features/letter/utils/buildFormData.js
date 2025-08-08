// utils/buildFormData.js - Fixed version
import { getLetterRequirements } from "../validations/baseSchema";

export function buildFormData(data, selectedLetterType) {
  console.log("=== BUILD FORM DATA DEBUG ===");
  console.log("Input data:", data);
  console.log("Selected letter type:", selectedLetterType);
  
  const formData = new FormData();
  const lower = (selectedLetterType?.label || "").toLowerCase();
  
  // Dapatkan requirements untuk surat ini
  const requirements = getLetterRequirements(selectedLetterType?.label);
  console.log("Letter requirements:", requirements);

  // Field dasar yang SELALU ada
  formData.append("letter_type_id", data.letter_type_id || "");
  formData.append("purpose", data.purpose || "");
  
  // no_hp opsional
  if (data.no_hp) {
    formData.append("no_hp", data.no_hp);
  }

  // resident_id - HANYA jika diperlukan
  if (requirements.requiresResident) {
    if (data.resident_id) {
      // Convert ke string untuk konsistensi
      formData.append("resident_id", data.resident_id.toString());
      console.log("✅ Added resident_id:", data.resident_id);
    } else {
      console.error("❌ resident_id required but not provided");
      throw new Error("resident_id is required for this letter type");
    }
  } else {
    console.log("ℹ️ resident_id not required for this letter type");
  }

  // deceased_resident_id - HANYA jika diperlukan
  if (requirements.requiresDeceased) {
    if (data.deceased_resident_id) {
      formData.append("deceased_resident_id", data.deceased_resident_id.toString());
      console.log("✅ Added deceased_resident_id:", data.deceased_resident_id);
    } else {
      console.error("❌ deceased_resident_id required but not provided");
      throw new Error("deceased_resident_id is required for this letter type");
    }
  }

  // Upload file
  if (data.supporting_files?.length) {
    data.supporting_files.forEach((file, index) => {
      if (file instanceof File) {
        formData.append("supporting_files[]", file);
        console.log(`✅ Added file ${index + 1}:`, file.name);
      }
    });
  }

  // Handle surat-specific fields
  switch (lower) {
    case "surat ahli waris":
      if (data.heirs && Array.isArray(data.heirs)) {
        data.heirs.forEach((heir, i) => {
          Object.entries(heir).forEach(([k, v]) => {
            if (v !== null && v !== undefined && v !== "") {
              formData.append(`heirs[${i}][${k}]`, v);
            }
          });
        });
        console.log("✅ Added heirs data");
      }
      break;

    case "surat domisili tetap":
    case "surat domisili sementara":
    case "surat domisili perusahaan":
    case "surat domisili yayasan":
      if (data.domisili && typeof data.domisili === 'object') {
        Object.entries(data.domisili).forEach(([k, v]) => {
          if (v !== null && v !== undefined && v !== "") {
            formData.append(`domisili[${k}]`, v);
          }
        });
        console.log("✅ Added domisili data");
      }
      break;

    case "surat pengantar nikah":
    case "surat izin menikah":
    case "surat persetujuan calon pengantin":
      if (data.marriage_request && typeof data.marriage_request === 'object') {
        Object.entries(data.marriage_request).forEach(([k, v]) => {
          if (v !== null && v !== undefined && v !== "") {
            formData.append(`marriage_request[${k}]`, v);
          }
        });
        console.log("✅ Added marriage_request data");
      }
      break;

    case "sktm":
      if (data.sktm && typeof data.sktm === 'object') {
        Object.entries(data.sktm).forEach(([k, v]) => {
          if (v !== null && v !== undefined && v !== "") {
            formData.append(`sktm[${k}]`, v);
          }
        });
        console.log("✅ Added sktm data");
      }
      break;

    case "surat keterangan":
      if (data.sk && typeof data.sk === 'object') {
        Object.entries(data.sk).forEach(([k, v]) => {
          if (v !== null && v !== undefined && v !== "") {
            formData.append(`sk[${k}]`, v);
          }
        });
        console.log("✅ Added sk data");
      }
      break;

    case "surat kematian":
      if (data.die && typeof data.die === 'object') {
        Object.entries(data.die).forEach(([k, v]) => {
          if (v !== null && v !== undefined && v !== "") {
            formData.append(`die[${k}]`, v);
          }
        });
        console.log("✅ Added die data");
      }
      break;

    case "surat izin orang tua":
      if (data.izin && typeof data.izin === 'object') {
        Object.entries(data.izin).forEach(([k, v]) => {
          if (v !== null && v !== undefined && v !== "") {
            formData.append(`izin[${k}]`, v);
          }
        });
        console.log("✅ Added izin data");
      }
      break;

    default:
      console.log("ℹ️ No specific fields to add for this letter type");
  }

  // Debug: Log all FormData entries
  console.log("=== FINAL FORM DATA ===");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  return formData;
}