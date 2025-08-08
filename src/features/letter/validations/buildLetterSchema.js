// buildLetterSchema.js - Fixed version with better debugging
import * as yup from "yup";
import { baseSchema, conditionalSchemas, getLetterRequirements } from "./baseSchema";

// Import semua schema spesifik
import { ahliWarisSchema } from "./ahliWarisSchema";
import { sktmSchema } from "./sktmSchema";
import { domisiliPerusahaanSchema } from "./domisiliPerusahaanSchema";
import { domisiliSementaraSchema } from "./domisiliSementaraSchema";
import { domisiliYayasanSchema } from "./domisiliYayasanSchema";
import { izinOrtuSchema } from "./izinOrtuSchema";
import { kematianSchema } from "./kematianSchema";
import { pengantarNikahSchema } from "./pengantarNikahSchema";
import { suratKeteranganSchema } from "./suratKeteranganSchema";
import { izinMenikahSchema } from "./izinMenikahSchema";
import { persetujuanCalonPengantinSchema } from "./persetujuanCalonPengantinSchema";
import { domisiliTetapSchema } from "./domisliTetapSchema";

export function buildLetterSchema(letterTypeName) {
  const lower = (letterTypeName || "").toLowerCase();
  
  console.log(`🔍 Building schema for: "${letterTypeName}" (lowercase: "${lower}")`);
  
  // Mulai dengan base schema
  let schemaFields = { ...baseSchema };
  
  // Dapatkan requirements untuk surat ini
  const requirements = getLetterRequirements(letterTypeName);
  console.log(`📋 Requirements:`, requirements);
  
  // Tambahkan resident_id jika diperlukan
  if (requirements.requiresResident) {
    schemaFields = { ...schemaFields, ...conditionalSchemas.requiresResident };
    console.log(`✅ Added resident_id requirement`);
  }
  
  // Tambahkan deceased_id jika diperlukan
  if (requirements.requiresDeceased) {
    schemaFields = { ...schemaFields, ...conditionalSchemas.requiresDeceased };
    console.log(`✅ Added deceased_id requirement`);
  }
  
  // Tambahkan schema spesifik per jenis surat
  let extraFields = {};
  
  switch (lower) {
    case "surat ahli waris":
      extraFields = ahliWarisSchema.fields || ahliWarisSchema;
      console.log(`📄 Added ahli waris schema`);
      break;
    case "sktm":
      extraFields = sktmSchema.fields || sktmSchema;
      console.log(`📄 Added SKTM schema`);
      break;
    case "surat domisili perusahaan":
      extraFields = domisiliPerusahaanSchema.fields || domisiliPerusahaanSchema;
      console.log(`📄 Added domisili perusahaan schema`);
      break;
    case "surat domisili sementara":
      extraFields = domisiliSementaraSchema.fields || domisiliSementaraSchema;
      console.log(`📄 Added domisili sementara schema`);
      break;
    case "surat domisili yayasan":
      extraFields = domisiliYayasanSchema.fields || domisiliYayasanSchema;
      console.log(`📄 Added domisili yayasan schema`);
      break;
    case "surat domisili tetap":
      // Tidak ada schema tambahan untuk domisili tetap
      extraFields = domisiliTetapSchema.fields || domisiliTetapSchema;
      console.log(`📄 Added domisili tetap schema`);
      break;
    case "surat izin orang tua":
      extraFields = izinOrtuSchema.fields || izinOrtuSchema;
      console.log(`📄 Added izin orang tua schema`);
      break;
    case "surat kematian":
      extraFields = kematianSchema.fields || kematianSchema;
      console.log(`📄 Added kematian schema`);
      break;
    case "surat pengantar nikah":
      extraFields = pengantarNikahSchema.fields || pengantarNikahSchema;
      console.log(`📄 Added pengantar nikah schema`);
      break;
    case "surat keterangan":
      extraFields = suratKeteranganSchema.fields || suratKeteranganSchema;
      console.log(`📄 Added surat keterangan schema`);
      break;
    case "surat izin menikah":
      extraFields = izinMenikahSchema.fields || izinMenikahSchema;
      console.log(`📄 Added izin menikah schema`);
      break;
    case "surat persetujuan calon pengantin":
      extraFields = persetujuanCalonPengantinSchema.fields || persetujuanCalonPengantinSchema;
      console.log(`📄 Added persetujuan calon pengantin schema`);
      break;
    default:
      console.log(`⚠️  No specific schema found for: "${lower}"`);
      extraFields = {};
  }
  
  // Debug: tampilkan field yang akan digunakan
  const finalFields = { ...schemaFields, ...extraFields };
  console.log(`🔧 Final schema fields:`, Object.keys(finalFields));
  
  // Gabungkan semua schema
  const finalSchema = yup.object().shape(finalFields);
  
  console.log(`✅ Schema built successfully for "${letterTypeName}"`);
  
  return finalSchema;
}

export default buildLetterSchema;