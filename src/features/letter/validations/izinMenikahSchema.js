import * as yup from "yup";

import { nikValidator } from "./nikValidator";

export const izinMenikahSchema = {
  marriage_request: yup.object().shape({
    // Ayah
    father_name: yup.string().required("Nama ayah wajib diisi"),
    father_nik: nikValidator,
    bin: yup.string().required("Bin/binti wajib diisi"),
    father_birth_place: yup.string().required("Tempat lahir ayah wajib diisi"),
    father_birth_date: yup.string().required("Tanggal lahir ayah wajib diisi"),
    father_nationality: yup.string().required("Kewarganegaraan ayah wajib diisi"),
    father_religion: yup
      .string()
      .required("Agama ayah wajib dipilih")
      .oneOf(["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"]),
    father_occupation: yup.string().required("Pekerjaan ayah wajib diisi"),
    father_address: yup.string().required("Alamat ayah wajib diisi"),

    // Ibu
    mother_name: yup.string().required("Nama ibu wajib diisi"),
    mother_nik: nikValidator,
    binti: yup.string().required("Bin/binti wajib diisi"),
    mother_birth_place: yup.string().required("Tempat lahir ibu wajib diisi"),
    mother_birth_date: yup.string().required("Tanggal lahir ibu wajib diisi"),
    mother_nationality: yup.string().required("Kewarganegaraan ibu wajib diisi"),
    mother_religion: yup
      .string()
      .required("Agama ibu wajib dipilih")
      .oneOf(["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"]),
    mother_occupation: yup.string().required("Pekerjaan ibu wajib diisi"),
    mother_address: yup.string().required("Alamat ibu wajib diisi"),

    //pasangan 
    partner_name: yup.string().required("Nama pasangan wajib diisi"),
    partner_nik: nikValidator,
    partner_bin_binti: yup.string().required("Bin/binti wajib diisi"),
    partner_birth_place: yup.string().required("Tempat lahir pasangan wajib diisi"),
    partner_birth_date: yup.string().required("Tanggal lahir pasangan wajib diisi"),
    partner_nationality: yup.string().required("Kewarganegaraan pasangan wajib diisi"),
    partner_religion: yup
      .string()
      .required("Agama pasangan wajib dipilih")
      .oneOf(["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Konghucu"]),
    partner_occupation: yup.string().required("Pekerjaan pasangan wajib diisi"),
    partner_address: yup.string().required("Alamat pasangan wajib diisi"),

  }),
};
