const buildFormData = (obj) => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (key === "umkm_image") {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, ""); // penting agar dikirim sebagai kosong
      }
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return formData;
};

export default buildFormData;
