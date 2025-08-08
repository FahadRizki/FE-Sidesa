const objectToForm = (obj) => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (key === "image") {
      if (value instanceof File) {
        formData.append(key, value);
      }
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return formData;
};

export default objectToForm;
