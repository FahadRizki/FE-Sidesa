import * as yup from "yup";

const umkmSchema = yup.object().shape({
    resident_id: yup.string().required("Nama warga wajib dipilih"),
    umkm_name: yup.string().required("Nama UMKM wajib diisi"),
    umkm_category: yup.string().required("Kategori wajib diisi"),
    umkm_address: yup.string().required("Alamat wajib diisi").min(10, "Minimal 10 karakter"),
    umkm_social_media: yup.string().required("Sosial media wajib diisi"),
    umkm_description: yup.string().required("Deskripsi wajib diisi").min(10, "Minimal 10 karakter"),
    umkm_phone_number: yup.string().required("Nomor HP wajib diisi"),
    umkm_image: yup
    .mixed()
    .nullable()
    .test("fileSize", "Ukuran gambar maksimal 2MB", (file) =>
        !file || (file && file.size <= 2 * 1024 * 1024)
    )
    .test("fileType", "Format gambar tidak didukung", (file) =>
        !file || (file && ["image/jpeg", "image/png", "image/webp"].includes(file.type))
    ),

});

export default umkmSchema;