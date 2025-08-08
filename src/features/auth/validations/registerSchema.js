// validations/registerSchema.js
import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi"),
  email: yup.string().required("Email wajib diisi").email("Format email tidak valid").email("email telah digunakan"),
  password: yup.string().required("Password wajib diisi").min(8, "Minimal 8 karakter"),
  password_confirmation: yup
    .string()
    .required("Konfirmasi password wajib diisi")
    .oneOf([yup.ref("password")], "Konfirmasi password tidak cocok"),
});
