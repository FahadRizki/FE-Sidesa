import * as yup from "yup";

export const nikValidator = yup
  .string()
  .required("NIK wajib diisi")
  .matches(/^\d{16}$/, "NIK harus terdiri dari 16 digit angka")

