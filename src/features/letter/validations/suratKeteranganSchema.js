import * as yup from "yup";

export const suratKeteranganSchema = {
    sk: yup.object().shape({
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
              .oneOf(["Belum Menikah", "Menikah", "Cerai Hidup", "Cerai Mati"], "Status perkawinan tidak valid")
              .required("Status perkawinan wajib dipilih"),
            occupation: yup.string().required("Pekerjaan wajib diisi"),
            address: yup.string().required("Alamat wajib diisi"),
        type: yup.string().required("Jenis Surat keterangan wajib diisi"),
    }),
};

