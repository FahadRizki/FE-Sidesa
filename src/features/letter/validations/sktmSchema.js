import * as yup from "yup";

// Perbaikan: Ekspor object schema yang benar
export const sktmSchema = {
  sktm: yup.object().shape({
    name: yup.string().required("Nama wajib diisi"),
        nik: yup
          .string()
          .required("NIK wajib diisi")
          .matches(/^\d{16}$/, "NIK harus 16 digit angka"),
        birth_place: yup.string().required("Tempat lahir wajib diisi"),
        birth_date: yup.string().required("Tanggal lahir wajib diisi"),
        gender: yup
          .string()
          .oneOf(["Laki-laki", "Perempuan"], "Pilih jenis kelamin yang valid")
          .required("Jenis kelamin wajib dipilih"),
        religion: yup
          .string()
          .oneOf(["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"], "Agama tidak valid")
          .required("Agama wajib dipilih"),
        marital_status: yup
          .string()
          .oneOf(["Belum Menikah", "Menilah", "Cerai Hidup", "Cerai Mati"], "Status perkawinan tidak valid")
          .required("Status perkawinan wajib dipilih"),
        occupation: yup.string().required("Pekerjaan wajib diisi"),
        address: yup.string().required("Alamat wajib diisi"),
    no_kk: yup
      .string()
      .required("No KK wajib diisi")
      .matches(/^\d{16}$/, "No KK harus berupa 16 digit angka")
      .test('no-kk-format', 'No KK tidak boleh sama dengan contoh', function(value) {
        if (value && value.startsWith('3210') && value.length === 16) {
          // Jika user memasukkan contoh persis
          if (value === '3210xxxxxxxxxxxx' || /^3210x+$/.test(value)) {
            return this.createError({ message: 'Harap masukkan No KK yang sebenarnya, bukan contoh' });
          }
        }
        return true;
      }),
    bin_binti: yup
      .string()
      .required("Bin/Binti wajib diisi")
      .min(2, "Bin/Binti minimal 2 karakter")
      .max(50, "Bin/Binti maksimal 50 karakter"),
  }),
};

// Default export untuk kompatibilitas
export default sktmSchema;