import * as yup from "yup";

export const persetujuanCalonPengantinSchema = yup.object().shape({
  // Schema harus sesuai dengan struktur nested marriage_request
  marriage_request: yup.object().shape({
    groom_name: yup.string().required("Nama pengantin pria wajib diisi").max(100),
    groom_nik: yup.string().required("NIK pengantin pria wajib diisi").length(16, "NIK harus 16 digit"),
    groom_birth_place: yup.string().required("Tempat lahir pengantin pria wajib diisi").max(100),
    groom_birth_date: yup.date().required("Tanggal lahir pengantin pria wajib diisi").max(new Date(), "Tanggal lahir tidak boleh di masa depan"),
    groom_occupation: yup.string().required("Pekerjaan pengantin pria wajib diisi").max(100),
    groom_address: yup.string().required("Alamat pengantin pria wajib diisi").max(255),
    groom_religion: yup.string().oneOf(["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"], "Pilih agama yang valid").required("Agama pengantin pria wajib dipilih"),
    groom_nationality: yup.string().required("Kewarganegaraan pengantin pria wajib diisi").max(100),
    groom_bin_binti: yup.string().required("Nama ayah pengantin pria wajib diisi").max(100),

    bride_name: yup.string().required("Nama pengantin wanita wajib diisi").max(100),
    bride_nik: yup.string().required("NIK pengantin wanita wajib diisi").length(16, "NIK harus 16 digit"),
    bride_nationality: yup.string().required("Kewarganegaraan pengantin wanita wajib diisi").max(100),
    bride_religion: yup.string().oneOf(["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"], "Pilih agama yang valid").required("Agama pengantin wanita wajib dipilih"),
    bride_birth_place: yup.string().required("Tempat lahir pengantin wanita wajib diisi").max(100),
    bride_birth_date: yup.date().required("Tanggal lahir pengantin wanita wajib diisi").max(new Date(), "Tanggal lahir tidak boleh di masa depan"),
    bride_occupation: yup.string().required("Pekerjaan pengantin wanita wajib diisi").max(100),
    bride_address: yup.string().required("Alamat pengantin wanita wajib diisi").max(255),
    bride_bin_binti: yup.string().required("Nama ayah pengantin wanita wajib diisi").max(100),
  }).required(),
});
