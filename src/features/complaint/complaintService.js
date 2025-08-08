import api from "../../services/api";

export const stroreComplaint = (data) => api.post(`/complaint-store`, data);
export const getComplaintStatus = () => api.get(`/complaint-status`);
export const searchResidents = (search) => api.get(`/search-residents?search=${search}`);

