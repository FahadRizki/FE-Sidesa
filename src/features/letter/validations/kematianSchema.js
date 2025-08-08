import * as yup from "yup";

export const kematianSchema = {
  die: yup.object().shape({
    name: yup.string().required("Nama jenazah wajib diisi"),
    nik: yup
      .string()
      .required("NIK jenazah wajib diisi")
      .matches(/^\d{16}$/, "NIK harus terdiri dari 16 digit angka"),
    gender: yup
      .string()
      .required("Jenis kelamin wajib dipilih")
      .oneOf(["Laki-laki", "Perempuan"], "Jenis kelamin tidak valid"),
    birth_place: yup.string().required("Tempat lahir wajib diisi"),
    birth_date: yup.string().required("Tanggal lahir wajib diisi"),
    occupation: yup.string().required("Pekerjaan wajib diisi"),
    address: yup.string().required("Alamat wajib diisi"),

    place_of_death: yup.string().required("Tempat meninggal wajib diisi"),
    date_of_death: yup.string().required("Tanggal meninggal wajib diisi"),
    day_of_death: yup.string().required("Hari meninggal wajib diisi"),
    cause_of_death: yup.string().required("Penyebab meninggal wajib diisi"),
  }),
};
