import axios from "axios";
import { BASE_URL } from "../config";
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, // ini penting untuk Sanctum
});

// Tambahkan Authorization header jika token ada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const searchResidents = (search) => api.get(`/search-residents?search=${search}`);

export default api;