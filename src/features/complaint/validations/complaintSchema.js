
import * as yup from "yup";

const complaintSchema = yup.object({
    resident_id: yup.string().required("Nama warga wajib dipilih"),
    title: yup.string().required("Nama aduan wajib diisi"),
    address: yup.string().required("Alamat wajib diisi").min(10, "Minimal 10 karakter atau lebih"),
    phone: yup.string().required("Nomor HP wajib diisi"),
    description: yup.string().required("Deskripsi wajib diisi").min(10, "Minimal 10 karakter atau lebih"),
    type_complaint: yup.string(),
    image: yup
    .mixed()
    .required("Foto bukti wajib diunggah")
    .test("fileType", "Hanya file gambar yang diperbolehkan", (value) =>
      value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
    ),
});

export default complaintSchema;