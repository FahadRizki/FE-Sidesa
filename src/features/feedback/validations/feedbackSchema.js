import * as yup from "yup";

const feedbackSchema = yup.object({
  description: yup
    .string()
    .required("Deskripsi wajib diisi")
    .max(500, "Deskripsi maksimal 500 karakter")
    .min(10, "Minimal 10 karakter atau lebih"),

  rating: yup
    .number()
    .typeError("Rating wajib diisi")
    .required("Rating wajib diisi")
    .min(1, "Minimal rating 1")
    .max(5, "Maksimal rating 5"),
});

export default feedbackSchema;
