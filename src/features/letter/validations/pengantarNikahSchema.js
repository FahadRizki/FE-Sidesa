import * as yup from "yup";
import { nikValidator } from "./nikValidator";

export const pengantarNikahSchema = {
  marriage_request: yup.object().shape({
    // Ayah
    father_name: yup.string().required("Nama ayah wajib diisi"),
    father_nik: nikValidator,
    father_birth_place: yup.string().required("Tempat lahir ayah wajib diisi"),
    father_birth_date: yup.date().required("Tanggal lahir ayah wajib diisi"),
    father_nationality: yup.string().required("Kewarganegaraan ayah wajib diisi"),
    father_religion: yup.string()
      .oneOf(["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"], "Agama tidak valid")
      .required("Agama ayah wajib dipilih"),
    father_occupation: yup.string().required("Pekerjaan ayah wajib diisi"),
    father_address: yup.string().required("Alamat ayah wajib diisi"),

    // Ibu
    mother_name: yup.string().required("Nama ibu wajib diisi"),
    mother_nik: nikValidator,
    mother_birth_place: yup.string().required("Tempat lahir ibu wajib diisi"),
    mother_birth_date: yup.date().required("Tanggal lahir ibu wajib diisi"),
    mother_nationality: yup.string().required("Kewarganegaraan ibu wajib diisi"),
    mother_religion: yup.string()
      .oneOf(["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"], "Agama tidak valid")
      .required("Agama ibu wajib dipilih"),
    mother_occupation: yup.string().required("Pekerjaan ibu wajib diisi"),
    mother_address: yup.string().required("Alamat ibu wajib diisi"),
  }),
};
