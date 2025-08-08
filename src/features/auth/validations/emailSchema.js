import * as yup from "yup";

export const emailSchema = yup.object().shape({
    email: yup.string().required("Email wajib diisi").email("Format email tidak valid"),
})