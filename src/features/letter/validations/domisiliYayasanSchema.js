import * as yup from "yup";

// Perbaikan 1: Ekspor dengan format yang konsisten dengan schema lain
export const domisiliYayasanSchema = {
  domisili: yup.object().shape({
    nama_pemilik: yup
      .string()
      .required("Nama pemilik wajib diisi")
      .min(2, "Nama pemilik minimal 2 karakter")
      .max(100, "Nama pemilik maksimal 100 karakter"),
    
    tempat_lahir_pemilik: yup
      .string()
      .required("Tempat lahir pemilik wajib diisi"),
     tanggal_lahir_pemilik: yup
      .string()
      .required("Tanggal lahir pemilik wajib diisi"),


    
    nik_pemilik: yup
      .string()
      .required("NIK pemilik wajib diisi")
      .matches(/^\d{16}$/, "NIK harus berupa 16 digit angka")
      .test('nik-valid', 'NIK tidak valid', function(value) {
        if (value && value.length === 16) {
          // Cek apakah semua digit sama (NIK palsu)
          if (/^(\d)\1{15}$/.test(value)) {
            return this.createError({ message: 'NIK tidak boleh berupa angka yang sama semua' });
          }
        }
        return true;
      }),
    
    alamat_pemilik: yup
      .string()
      .required("Alamat pemilik wajib diisi")
      .min(10, "Alamat pemilik minimal 10 karakter")
      .max(255, "Alamat pemilik maksimal 255 karakter"),
    
    nama_usaha: yup
      .string()
      .required("Nama usaha wajib diisi")
      .min(2, "Nama usaha minimal 2 karakter")
      .max(100, "Nama usaha maksimal 100 karakter"),
    
    jenis_usaha: yup
      .string()
      .required("Jenis usaha wajib diisi")
      .min(2, "Jenis usaha minimal 2 karakter")
      .max(100, "Jenis usaha maksimal 100 karakter"),
    
    alamat_usaha: yup
      .string()
      .required("Alamat usaha wajib diisi")
      .min(10, "Alamat usaha minimal 10 karakter")
      .max(255, "Alamat usaha maksimal 255 karakter"),
    
    luas_tempat: yup
      .number()
      .typeError("Luas tempat harus berupa angka")
      .required("Luas tempat wajib diisi")
      .min(1, "Luas tempat minimal 1 m²")
      .max(999999, "Luas tempat terlalu besar"),
  }),
};

// Default export untuk kompatibilitas
export default domisiliYayasanSchema;