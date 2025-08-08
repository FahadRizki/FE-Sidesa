import api from "../../services/api";

export const getUmkms = () => api.get(`/umkms`);

// export const getUmkmsShow = (id) => api.get(`/umkm-show/${id}`);
export const getUmkmStatus = () => {
  return api.get(`/status-umkms`);
};
export const storeUmkm = (data) => api.post(`/umkm-store`, data);
export const searchResidents = (search) => api.get(`/search-residents?search=${search}`);
export const searchUmkm = (search) => api.get(`/search-umkms?search=${search}`);
