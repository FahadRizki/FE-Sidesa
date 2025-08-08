import api from "../../services/api";

export const getNews = (limit = 4) => api.get(`/content?type=news&limit=${limit}`);
export const getApbdes = () => api.get(`/apbdes-preview`);
export const getApbdesDetail = (tahun) => api.get(`/apbdes-detail/${tahun}`);
export const getBanners = () => api.get(`/content?type=banner`);
export const getFeedbacks = () => api.get(`/feedbacks`);
export const getUmkmLimited = (limit) => {
  const url = limit ? `/umkm-limited?limit=${limit}` : '/umkm-limited';
  return api.get(url);
};

