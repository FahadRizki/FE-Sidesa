// utils/letterConfig.js
export const LETTER_CONFIG = {
  'surat ahli waris': {
    requiresApplicant: true,
    requiresDeceased: true,
    component: 'AhliWarisForm'
  },
  'surat pengantar nikah': {
    requiresApplicant: true,
    requiresDeceased: false,
    component: 'PengantarNikahForm'
  },
  'surat izin menikah': {
    requiresApplicant: true,
    requiresDeceased: false,
    component: 'SuratIzinMenikahForm'
  },
  'surat persetujuan calon pengantin': {
    requiresApplicant: true,
    requiresDeceased: false,
    component: 'PersetujuanCalonPengantinForm'
  },
  'surat domisili yayasan': {
    requiresApplicant: false,
    requiresDeceased: false,
    component: 'DomisiliYayasan'
  },
  'surat domisili perusahaan': {
    requiresApplicant: false,
    requiresDeceased: false,
    component: 'DomisiliPerusahaan'
  },
  'surat domisili sementara': {
    requiresApplicant: false,
    requiresDeceased: false,
    component: 'DomisiliSementara'
  },
  'surat domisili tetap': {
    requiresApplicant: false,
    requiresDeceased: false,
    component: 'DomisiliTetap'
  },
  'sktm': {
    requiresApplicant: false,
    requiresDeceased: false,
    component: 'SktmForm'
  },
  'surat keterangan': {
    requiresApplicant: false,
    requiresDeceased: false,
    component: 'Sk'
  },
  'surat kematian': {
    requiresApplicant: false,
    requiresDeceased: true,
    component: 'Kematian'
  },
  'surat izin orang tua': {
    requiresApplicant: true,
    requiresDeceased: false,
    component: 'IzinOrtu'
  }
};

export const getLetterConfig = (letterType) => {
  const lowerType = (letterType || '').toLowerCase();
  return LETTER_CONFIG[lowerType] || {
    requiresApplicant: false,
    requiresDeceased: false,
    component: null
  };
};