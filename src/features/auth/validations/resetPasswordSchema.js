import * as yup from "yup";

export const ResetPasswordSchema = yup.object().shape({
    email: yup.string().required("Email wajib diisi").email("Format email tidak valid"),
    password: yup.string().required("Password wajib diisi").min(8, "Minimal 8 karakter"),
    password_confirmation: yup
        .string()
        .required("Konfirmasi password wajib diisi")
        .oneOf([yup.ref("password")], "Konfirmasi password tidak cocok"),
});