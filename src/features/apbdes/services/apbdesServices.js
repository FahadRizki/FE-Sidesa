import api from "../../../services/api";


export const getApbdesDetail = (tahun) => api.get(`/apbdes-detail/${tahun}`);
export const getApbdesYears = () => api.get(`/apbdes-years`);