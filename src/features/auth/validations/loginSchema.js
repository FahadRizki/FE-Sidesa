import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().required("Email wajib diisi").email("Format email tidak valid").email("password salah").email("email atau password salah"),
    password: yup.string().required("Password wajib diisi").min(8, "Minimal 8 karakter"),
});