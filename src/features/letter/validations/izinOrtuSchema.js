import * as yup from "yup";

export const izinOrtuSchema = {
    izin: yup.object().shape({
        // Data ortu (wajib diisi manual)
    nama_ortu: yup.string().required("Nama orang tua wajib diisi"),
    nik_ortu: yup
      .string()
      .required("NIK orang tua wajib diisi")
      .matches(/^\d{16}$/, "NIK harus terdiri dari 16 digit angka"),
    //   .test("valid-nik", "Format NIK tidak valid", (value) => {
    //     if (!value) return false;
    //     // Validasi ringan berbasis struktur umum NIK
    //     const day = parseInt(value.substr(6, 2), 10);
    //     const month = parseInt(value.substr(8, 2), 10);
    //     const year = parseInt(value.substr(10, 2), 10);
    //     const validDay = day >= 1 && day <= 71; // 01–31 atau 41–71 untuk perempuan
    //     const validMonth = month >= 1 && month <= 12;
    //     return validDay && validMonth;
    //   }),
    agama_ortu: yup
      .string()
      .oneOf(["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"], "Agama tidak valid")
      .required("Agama wajib dipilih"),
    tempat_lahir_ortu: yup.string().required("Tempat lahir orang tua wajib diisi"),
    tanggal_lahir_ortu: yup.string().required("Tanggal lahir orang tua wajib diisi"),
    status_pernikahan_ortu: yup
      .string()
      .oneOf(["Belum Kawin", "Kawin", "Cerai Hidup", "Cerai Mati"], "Status pernikahan tidak valid")
      .required("Status pernikahan wajib dipilih"),
    pekerjaan_ortu: yup.string().required("Pekerjaan orang tua wajib diisi"),
    alamat_ortu: yup.string().required("Alamat orang tua wajib diisi"),
    tujuan: yup.string().required("Tujuan izin wajib diisi"),
  }),
}