import * as yup from "yup";

export const ahliWarisSchema = {
  deceased_resident_id: yup.string().required("Pewaris wajib dipilih"),
  heirs: yup.array().min(1, "Minimal 1 ahli waris harus diisi").of(
    yup.object().shape({
      name: yup.string().required("Nama wajib diisi"),
      gender: yup.string().required("Jenis kelamin wajib"),
      birth_date: yup.string().required("Tanggal lahir wajib"),
      relation: yup.string().required("Hubungan wajib"),
      address: yup.string().required("Alamat wajib"),
    })
  ),
};

export default yup.object().shape(ahliWarisSchema);